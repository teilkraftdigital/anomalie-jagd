import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Difficulty, Patch } from "../app/engine/Scene";
import { buildPool } from "../app/engine/poolLogic";
import { trackDiscovery } from "../app/engine/discoveryLogic";
import type { DiscoveredPatchIds } from "../app/engine/discoveryLogic";
import { isGameOver, pickNextPatch } from "../app/engine/roundLogic";
import { initSession } from "../app/engine/sessionLogic";

type RoundResult = {
  round: number;
  patchId: string | null;
  wasCorrect: boolean;
};

export type GameState = {
  // Patches for the current session (difficulty-filtered)
  allPatches: Patch<any>[];

  // Discovered patch IDs per scene (persisted in localStorage)
  discoveredPatchIds: DiscoveredPatchIds;

  // Newly discovered in the last completed game (for glossary highlight)
  newlyDiscoveredPatchIds: string[];

  // Current session
  currentSceneId: string | null;
  difficulty: Difficulty | null;
  currentRound: number;
  patchPool: string[];
  activePatchId: string | null;
  results: RoundResult[];
  lastGuessResult: "correct" | "wrong" | null;

  // Actions
  startGame: (sceneId: string, difficulty: Difficulty) => void;
  guess: (playerSaidAnomaly: boolean) => void;
  advanceRound: () => void;
  restartGame: () => void;
  quitGame: () => void;
  clearNewlyDiscovered: () => void;
  clearLastGuessResult: () => void;
};

const useGameStore = create<GameState>()(
  devtools(
    persist(
      (set, get) => ({
        allPatches: [],
        discoveredPatchIds: {},
        newlyDiscoveredPatchIds: [],
        currentSceneId: null,
        difficulty: null,
        currentRound: 0,
        patchPool: [],
        activePatchId: null,
        results: [],
        lastGuessResult: null,

        startGame: (sceneId, difficulty) => {
          const discoveredIds = get().discoveredPatchIds[sceneId] ?? [];
          const { allPatches, patchPool } = initSession(
            sceneId,
            difficulty,
            discoveredIds,
          );
          set({
            currentSceneId: sceneId,
            difficulty,
            currentRound: 1,
            activePatchId: null,
            results: [],
            allPatches,
            patchPool,
            lastGuessResult: null,
          });
        },

        advanceRound: () => {
          const {
            currentRound,
            activePatchId,
            currentSceneId,
            results,
            patchPool,
            allPatches,
            discoveredPatchIds,
            newlyDiscoveredPatchIds,
          } = get();

          const newResults = [
            ...results,
            { round: currentRound, patchId: activePatchId, wasCorrect: true },
          ];

          const discovery =
            activePatchId && currentSceneId
              ? trackDiscovery(
                  discoveredPatchIds,
                  newlyDiscoveredPatchIds,
                  currentSceneId,
                  activePatchId,
                )
              : { discoveredPatchIds, newlyDiscoveredPatchIds };

          const nextRound = currentRound + 1;

          if (isGameOver(nextRound)) {
            set({
              currentRound: nextRound,
              results: newResults,
              discoveredPatchIds: discovery.discoveredPatchIds,
              newlyDiscoveredPatchIds: discovery.newlyDiscoveredPatchIds,
            });
            return;
          }

          const { patchId: nextPatchId, pool: nextPool } = pickNextPatch(
            allPatches,
            patchPool,
          );

          set({
            currentRound: nextRound,
            activePatchId: nextPatchId,
            patchPool: nextPool,
            results: newResults,
            discoveredPatchIds: discovery.discoveredPatchIds,
            newlyDiscoveredPatchIds: discovery.newlyDiscoveredPatchIds,
          });
        },

        restartGame: () => {
          const { currentSceneId, allPatches, discoveredPatchIds } = get();
          if (!currentSceneId) return;

          const discoveredIds = discoveredPatchIds[currentSceneId] ?? [];
          const pool = buildPool(allPatches, discoveredIds);

          set({
            currentRound: 1,
            activePatchId: null,
            results: [],
            patchPool: pool,
          });
        },

        guess: (playerSaidAnomaly) => {
          const { activePatchId } = get();
          const isCorrect = playerSaidAnomaly === (activePatchId !== null);
          set({ lastGuessResult: isCorrect ? "correct" : "wrong" });
          if (isCorrect) {
            get().advanceRound();
          } else {
            get().restartGame();
          }
        },

        quitGame: () =>
          set({
            currentSceneId: null,
            difficulty: null,
            currentRound: 0,
            activePatchId: null,
            patchPool: [],
            results: [],
            allPatches: [],
            lastGuessResult: null,
          }),

        clearNewlyDiscovered: () => set({ newlyDiscoveredPatchIds: [] }),
        clearLastGuessResult: () => set({ lastGuessResult: null }),
      }),
      {
        name: "anomalie-jagd",
        partialize: (state) => ({
          discoveredPatchIds: state.discoveredPatchIds,
        }),
      },
    ),
    { name: "GameStore" },
  ),
);

export default useGameStore;
