import type { Patch } from "./Scene";
import { shuffle } from "./rng";

/**
 * Builds a patch pool with undiscovered-first ordering.
 * If all patches are discovered, the full list is used.
 */
export function buildPool(
  allPatches: Patch<any>[],
  discoveredIds: string[],
): string[] {
  const undiscovered = allPatches.filter((p) => !discoveredIds.includes(p.id));
  const source = undiscovered.length > 0 ? undiscovered : allPatches;
  return shuffle(source.map((p) => p.id));
}

/**
 * Refills an exhausted pool from the full patch list.
 */
export function refillPool(allPatches: Patch<any>[]): string[] {
  return shuffle(allPatches.map((p) => p.id));
}
