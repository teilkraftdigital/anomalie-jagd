import type { Patch } from "../../../engine/Scene";
import type { FormModel } from "../model";

export const patchSubmitNoType = {
  id: "form-patch-submit-no-type",
  scene: "form",
  severity: "easy",
  apply(model) {
    return {
      ...model,
      blocks: model.blocks.map((block) => {
        if (block.type !== "submit") return block;
        return {
          ...block,
          content: {
            ...block.content,
            attrs: { ...block.content.attrs, type: "button" },
          },
        };
      }),
    };
  },
} as const satisfies Patch<FormModel>;
