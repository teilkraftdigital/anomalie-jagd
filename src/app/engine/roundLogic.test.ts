import { describe, it, expect, vi, afterEach } from "vitest";
import { isGameOver, pickNextPatch, GAME_ROUNDS } from "./roundLogic";
import { testPatches } from "../../test-utils/testScene";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("isGameOver", () => {
  it("gibt false zurück für alle Runden bis einschließlich GAME_ROUNDS", () => {
    for (let r = 1; r <= GAME_ROUNDS; r++) {
      expect(isGameOver(r)).toBe(false);
    }
  });

  it("gibt true zurück ab Runde GAME_ROUNDS + 1", () => {
    expect(isGameOver(GAME_ROUNDS + 1)).toBe(true);
  });
});

describe("pickNextPatch — Clean Round", () => {
  it("gibt null zurück wenn kein Anomalie gezogen wird", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.99); // > 0.75 → kein Anomalie
    const { patchId, pool } = pickNextPatch(testPatches, ["test-patch-easy"]);
    expect(patchId).toBeNull();
    expect(pool).toEqual(["test-patch-easy"]); // Pool unverändert
  });
});

describe("pickNextPatch — Anomalie gezogen", () => {
  it("gibt ersten Patch aus dem Pool zurück", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.1); // < 0.75 → Anomalie
    const pool = ["test-patch-easy", "test-patch-medium"];
    const { patchId, pool: newPool } = pickNextPatch(testPatches, pool);
    expect(patchId).toBe("test-patch-easy");
    expect(newPool).toEqual(["test-patch-medium"]);
  });

  it("füllt Pool auf wenn leer und gibt Patch zurück", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.1); // < 0.75 → Anomalie
    const { patchId, pool: newPool } = pickNextPatch(testPatches, []);
    expect(patchId).not.toBeNull();
    // Pool wurde aufgefüllt und ein Patch entnommen
    expect(newPool).toHaveLength(testPatches.length - 1);
  });

  it("gibt null zurück wenn allPatches leer ist", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.1);
    const { patchId } = pickNextPatch([], []);
    expect(patchId).toBeNull();
  });
});
