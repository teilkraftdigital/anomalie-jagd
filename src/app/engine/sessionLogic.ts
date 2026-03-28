import type { Difficulty, Patch } from "./Scene";
import { getScene } from "./sceneRegistry";
import { patchesForDifficulty } from "./patchesForDifficulty";
import { buildPool } from "./poolLogic";

export type SessionInit = {
  allPatches: Patch<any>[];
  patchPool: string[];
};

/**
 * Initialises a new game session: resolves the scene, filters patches
 * by difficulty, and builds the undiscovered-first pool.
 */
export function initSession(
  sceneId: string,
  difficulty: Difficulty,
  discoveredIds: string[],
): SessionInit {
  const scene = getScene(sceneId);
  const allPatches = patchesForDifficulty(scene.patches, difficulty);
  const patchPool = buildPool(allPatches, discoveredIds);
  return { allPatches, patchPool };
}
