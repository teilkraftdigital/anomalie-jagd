import type { Patch } from "../../../engine/Scene";
import type { FormModel } from "../model";

export const patchNoRequiredNote = {
  id: "form-patch-no-required-note",
  scene: "form",
  severity: "easy",
  apply(model) {
    return {
      ...model,
      blocks: model.blocks.filter((block) => block.type !== "required-note"),
    };
  },
} satisfies Patch<FormModel>;
