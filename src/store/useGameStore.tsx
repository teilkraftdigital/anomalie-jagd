import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Difficulty, Patch, Scene } from "../app/engine/Scene";
import { getScene } from "../app/engine/sceneRegistry";
import { patchesForDifficulty } from "../app/engine/patchesForDifficulty";
import { shuffle } from "../app/engine/rng";

const GAME_ROUNDS = 6;
const GAME_ANOMALY_CHANCE = 0.75;

type RoundResult = {
  round: number;
  patchId: string | null;
  wasCorrect: boolean;
};

export type GameState = {
  // Patches for the current session (difficulty-filtered)
  allPatches: Patch<any>[];

  // Discovered patch IDs per scene (persisted in localStorage)
  discoveredPatchIds: Record<string, string[]>;

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

function buildPool(
  allPatches: Patch<any>[],
  discoveredIds: string[],
): string[] {
  const undiscovered = allPatches.filter((p) => !discoveredIds.includes(p.id));
  const source = undiscovered.length > 0 ? undiscovered : allPatches;
  return shuffle(source.map((p) => p.id));
}

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
          const scene = getScene(sceneId) as Scene<any>;
          const allPatches = patchesForDifficulty(scene.patches, difficulty);
          const discoveredIds = get().discoveredPatchIds[sceneId] ?? [];
          const pool = buildPool(allPatches, discoveredIds);

          set({
            currentSceneId: sceneId,
            difficulty,
            currentRound: 1,
            activePatchId: null,
            results: [],
            allPatches,
            patchPool: pool,
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

          // Mark patch as discovered
          let newDiscovered = { ...discoveredPatchIds };
          let newlyDiscovered = [...newlyDiscoveredPatchIds];
          if (activePatchId && currentSceneId) {
            const sceneDiscovered = newDiscovered[currentSceneId] ?? [];
            if (!sceneDiscovered.includes(activePatchId)) {
              newDiscovered = {
                ...newDiscovered,
                [currentSceneId]: [...sceneDiscovered, activePatchId],
              };
              newlyDiscovered = [...newlyDiscovered, activePatchId];
            }
          }

          const nextRound = currentRound + 1;

          // Game over after GAME_ROUNDS
          if (nextRound > GAME_ROUNDS) {
            set({
              currentRound: nextRound,
              results: newResults,
              discoveredPatchIds: newDiscovered,
              newlyDiscoveredPatchIds: newlyDiscovered,
            });
            return;
          }

          // Prepare next round: anomaly or clean
          const hasAnomaly =
            Math.random() < GAME_ANOMALY_CHANCE && allPatches.length > 0;
          let nextPatchId: string | null = null;
          let nextPool = [...patchPool];

          if (hasAnomaly) {
            if (nextPool.length === 0) {
              nextPool = shuffle(allPatches.map((p) => p.id));
            }
            nextPatchId = nextPool[0];
            nextPool = nextPool.slice(1);
          }

          set({
            currentRound: nextRound,
            activePatchId: nextPatchId,
            patchPool: nextPool,
            results: newResults,
            discoveredPatchIds: newDiscovered,
            newlyDiscoveredPatchIds: newlyDiscovered,
          });
        },

        restartGame: () => {
          const { currentSceneId, difficulty, allPatches, discoveredPatchIds } =
            get();
          if (!currentSceneId || !difficulty) return;

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
