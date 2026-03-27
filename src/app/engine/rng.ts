import { patchesForDifficulty } from "./patchesForDifficulty";
import type { Difficulty, Patch } from "./Scene";

export function buildPool(
  patches: Patch<any>[],
  difficulty: Difficulty,
): string[] {
  return shuffle(patchesForDifficulty(patches, difficulty).map((p) => p.id));
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
