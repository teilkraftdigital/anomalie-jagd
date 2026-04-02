import type { Patch } from "../../../engine/Scene";
import type { FormModel } from "../model";

export const patchLabelNotLinked: Patch<FormModel> = {
  id: "form-patch-label-not-linked",
  scene: "form",
  severity: "easy",
  apply(model) {
    return {
      ...model,
      blocks: model.blocks.map((block) => {
        if (block.type !== "input") return block;
        return {
          ...block,
          content: {
            ...block.content,
            labelAttrs: { ...block.content.labelAttrs, htmlFor: undefined },
          },
        };
      }),
    };
  },
};
