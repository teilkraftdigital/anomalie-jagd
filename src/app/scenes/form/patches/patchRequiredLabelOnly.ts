import type { Patch } from "../../../engine/Scene";
import type { FormModel } from "../model";

export const patchRequiredLabelOnly = {
  id: "form-patch-required-label-only",
  scene: "form",
  severity: "medium",
  apply(model) {
    return {
      ...model,
      blocks: model.blocks.map((block) => {
        if (block.type !== "input") return block;
        return {
          ...block,
          content: {
            ...block.content,
            requiredLabel: "*",
            required: false,
          },
        };
      }),
    };
  },
} satisfies Patch<FormModel>;
