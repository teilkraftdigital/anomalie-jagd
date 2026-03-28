import type { Scene, Patch } from "../app/engine/Scene";

type TestModel = { value: string };

const testPatches: Patch<TestModel>[] = [
  {
    id: "test-patch-easy",
    label: "Easy Patch",
    severity: "easy",
    explanation: "A simple easy patch for testing.",
    apply: (model) => ({ ...model, value: "easy-applied" }),
  },
  {
    id: "test-patch-medium",
    label: "Medium Patch",
    severity: "medium",
    explanation: "A medium patch for testing.",
    apply: (model) => ({ ...model, value: "medium-applied" }),
  },
  {
    id: "test-patch-hard",
    label: "Hard Patch",
    severity: "hard",
    explanation: "A hard patch for testing.",
    apply: (model) => ({ ...model, value: "hard-applied" }),
  },
];

export const testScene: Scene<TestModel> = {
  id: "test-scene",
  name: "Test Scene",
  description: "Minimal stub scene for tests.",
  createBaseModel: () => ({ value: "base" }),
  patches: testPatches,
  render: () => null,
};

export { testPatches };
export const testPatchIds = testPatches.map((p) => p.id);
