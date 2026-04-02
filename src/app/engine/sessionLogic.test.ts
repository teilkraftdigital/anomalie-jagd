import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { initSession } from "./sessionLogic";
import { registerScene, sceneRegistry } from "./sceneRegistry";
import { testScene, testPatchIds } from "../../test-utils/testScene";

beforeEach(() => {
  registerScene(testScene);
});

afterEach(() => {
  sceneRegistry.delete(testScene.id);
});

describe("initSession", () => {
  it("gibt alle Patches für difficulty hard zurück", () => {
    const { allPatches, patchPool } = initSession("test-scene", "hard", []);
    expect(allPatches).toHaveLength(3);
    expect(patchPool).toHaveLength(3);
    expect(patchPool).toEqual(expect.arrayContaining(testPatchIds));
  });

  it("filtert auf easy-Patches bei difficulty easy", () => {
    const { allPatches } = initSession("test-scene", "easy", []);
    expect(allPatches).toHaveLength(1);
    expect(allPatches[0].id).toBe("test-patch-easy");
  });

  it("filtert auf easy + medium bei difficulty medium", () => {
    const { allPatches } = initSession("test-scene", "medium", []);
    expect(allPatches).toHaveLength(2);
    const ids = allPatches.map((p) => p.id);
    expect(ids).toContain("test-patch-easy");
    expect(ids).toContain("test-patch-medium");
  });

  it("baut undiscovered-first Pool auf", () => {
    const discovered = ["test-patch-easy", "test-patch-medium"];
    const { patchPool } = initSession("test-scene", "hard", discovered);
    // Nur hard ist undiscovered → Pool hat nur 1 Element
    expect(patchPool).toHaveLength(1);
    expect(patchPool[0]).toBe("test-patch-hard");
  });

  it("wirft wenn Scene nicht registriert", () => {
    expect(() => initSession("unknown-scene", "hard", [])).toThrow(
      "Unknown scene: unknown-scene",
    );
  });
});
