import { describe, it, expect } from "vitest";
import { trackDiscovery } from "./discoveryLogic";

describe("trackDiscovery", () => {
  it("fügt neuen Patch zur Scene hinzu", () => {
    const result = trackDiscovery({}, [], "test-scene", "patch-1");
    expect(result.discoveredPatchIds["test-scene"]).toContain("patch-1");
    expect(result.newlyDiscoveredPatchIds).toContain("patch-1");
  });

  it("ist ein No-op wenn Patch bereits entdeckt", () => {
    const existing = { "test-scene": ["patch-1"] };
    const result = trackDiscovery(existing, [], "test-scene", "patch-1");
    expect(result.discoveredPatchIds["test-scene"]).toHaveLength(1);
    expect(result.newlyDiscoveredPatchIds).toHaveLength(0);
  });

  it("akkumuliert newlyDiscoveredPatchIds über Neustarts hinweg", () => {
    const result1 = trackDiscovery({}, [], "test-scene", "patch-1");
    const result2 = trackDiscovery(
      result1.discoveredPatchIds,
      result1.newlyDiscoveredPatchIds,
      "test-scene",
      "patch-2",
    );
    expect(result2.newlyDiscoveredPatchIds).toEqual(["patch-1", "patch-2"]);
  });

  it("verwaltet Discovery für mehrere Scenes unabhängig", () => {
    const r1 = trackDiscovery({}, [], "scene-a", "patch-1");
    const r2 = trackDiscovery(r1.discoveredPatchIds, r1.newlyDiscoveredPatchIds, "scene-b", "patch-2");
    expect(r2.discoveredPatchIds["scene-a"]).toContain("patch-1");
    expect(r2.discoveredPatchIds["scene-b"]).toContain("patch-2");
  });

  it("fügt Patch nicht doppelt hinzu", () => {
    const r1 = trackDiscovery({}, [], "test-scene", "patch-1");
    const r2 = trackDiscovery(r1.discoveredPatchIds, r1.newlyDiscoveredPatchIds, "test-scene", "patch-1");
    expect(r2.discoveredPatchIds["test-scene"]).toHaveLength(1);
  });
});
