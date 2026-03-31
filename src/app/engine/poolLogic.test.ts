import { describe, it, expect } from "vitest";
import { buildPool, refillPool } from "./poolLogic";
import { testPatches, testPatchIds } from "../../test-utils/testScene";

describe("buildPool", () => {
  it("enthält alle Patch-IDs wenn keine entdeckt", () => {
    const result = buildPool(testPatches, []);
    expect(result).toHaveLength(testPatches.length);
    expect(result).toEqual(expect.arrayContaining(testPatchIds));
  });

  it("enthält nur undiscovered Patches wenn einige entdeckt", () => {
    const discovered = ["test-patch-easy"];
    const result = buildPool(testPatches, discovered);
    expect(result).toHaveLength(2);
    expect(result).not.toContain("test-patch-easy");
    expect(result).toContain("test-patch-medium");
    expect(result).toContain("test-patch-hard");
  });

  it("fällt auf alle Patches zurück wenn alle entdeckt", () => {
    const result = buildPool(testPatches, testPatchIds);
    expect(result).toHaveLength(testPatches.length);
    expect(result).toEqual(expect.arrayContaining(testPatchIds));
  });

  it("gibt leeres Array zurück bei leeren Patches", () => {
    const result = buildPool([], []);
    expect(result).toHaveLength(0);
  });
});

describe("refillPool", () => {
  it("enthält alle Patch-IDs", () => {
    const result = refillPool(testPatches);
    expect(result).toHaveLength(testPatches.length);
    expect(result).toEqual(expect.arrayContaining(testPatchIds));
  });
});
