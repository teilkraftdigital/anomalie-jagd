import type { Patch } from "./Scene";
import { refillPool } from "./poolLogic";

export const GAME_ROUNDS = 6;
export const GAME_ANOMALY_CHANCE = 0.75;

export function isGameOver(round: number): boolean {
  return round > GAME_ROUNDS;
}

export type NextRoundState = {
  patchId: string | null;
  pool: string[];
};

/**
 * Picks the next patch for a round.
 * Respects anomaly chance and refills the pool if exhausted.
 */
export function pickNextPatch(
  allPatches: Patch<any>[],
  patchPool: string[],
): NextRoundState {
  const hasAnomaly =
    Math.random() < GAME_ANOMALY_CHANCE && allPatches.length > 0;
  if (!hasAnomaly) {
    return { patchId: null, pool: patchPool };
  }
  const pool = patchPool.length > 0 ? patchPool : refillPool(allPatches);
  return { patchId: pool[0], pool: pool.slice(1) };
}
