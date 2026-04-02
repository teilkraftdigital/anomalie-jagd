import type { Patch } from "../../../engine/Scene";
import type { FormModel } from "../model";

export const patchNoLabel = {
  id: "form-patch-no-label",
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
            label: undefined,
            labelAttrs: undefined,
          },
        };
      }),
    };
  },
} as const satisfies Patch<FormModel>;
