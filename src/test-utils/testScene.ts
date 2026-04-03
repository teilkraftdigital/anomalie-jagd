import type { Scene, Patch } from "../app/engine/Scene";

type TestModel = { value: string };

const testPatches: Patch<TestModel>[] = [
  {
    id: "test-patch-easy",
    scene: "test-scene",
    severity: "easy",
    apply: (model) => ({ ...model, value: "easy-applied" }),
  },
  {
    id: "test-patch-medium",
    scene: "test-scene",
    severity: "medium",
    apply: (model) => ({ ...model, value: "medium-applied" }),
  },
  {
    id: "test-patch-hard",
    scene: "test-scene",
    severity: "hard",
    apply: (model) => ({ ...model, value: "hard-applied" }),
  },
];

export const testScene: Scene<TestModel> = {
  id: "test-scene",
  createBaseModel: () => ({ value: "base" }),
  patches: testPatches,
  render: () => null,
};

export { testPatches };
export const testPatchIds = testPatches.map((p) => p.id);
