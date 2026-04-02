import type { Patch } from "../../../engine/Scene";
import type { FormModel } from "../model";

export const patchNoRequired: Patch<FormModel> = {
  id: "form-patch-no-required",
  scene: "form",
  severity: "medium",
  apply(model) {
    return {
      ...model,
      blocks: model.blocks.map((block) => {
        if (block.type !== "input") return block;
        return {
          ...block,
          content: { ...block.content, required: false },
        };
      }),
    };
  },
};
