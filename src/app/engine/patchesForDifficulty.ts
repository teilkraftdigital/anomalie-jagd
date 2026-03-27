import type { Patch } from "./Scene";
import type { Difficulty } from "./Scene";

export function patchesForDifficulty(
  patches: Patch<any>[],
  difficulty: Difficulty,
): Patch<any>[] {
  if (difficulty === "easy")
    return patches.filter((p) => p.severity === "easy");
  if (difficulty === "medium")
    return patches.filter(
      (p) => p.severity === "easy" || p.severity === "medium",
    );
  return patches;
}
