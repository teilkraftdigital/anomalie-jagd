import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Difficulty, Patch, Scene } from "../app/engine/Scene";

type RoundResult = {
  round: number;
  patchId: string | null;
  wasCorrect: boolean;
};

export type GameState = {
  // Patches for the current session (from the active scene)
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

  // Actions
  initScene: (scene: Scene<any>) => void;
  startGame: (sceneId: string, difficulty: Difficulty) => void;
  advanceRound: () => void;
  restartGame: () => void;
  clearNewlyDiscovered: () => void;
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

        initScene: (scene) => {},
        startGame: (sceneId, difficulty) => {},
        advanceRound: () => {},
        restartGame: () => {},
        clearNewlyDiscovered: () => {},
      }),
      {
        name: "game-storage",
        partialize: (state) => ({
          discoveredPatchIds: state.discoveredPatchIds,
        }),
      },
    ),
    { name: "GameStore" },
  ),
);

export default useGameStore;
