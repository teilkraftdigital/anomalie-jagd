import type { Patch } from "../../../engine/Scene";
import type { FormModel } from "../model";

export const patchHeadingDiv = {
  id: "form-patch-heading-div",
  scene: "form",
  severity: "medium",
  apply(model) {
    return {
      ...model,
      blocks: model.blocks.map((block) => {
        if (block.type !== "heading") return block;
        return {
          ...block,
          content: { ...block.content, as: "div" },
        };
      }),
    };
  },
} as const satisfies Patch<FormModel>;
