import type { Patch } from "../../../engine/Scene";
import type { FormModel } from "../model";

export const patchCheckboxNoName = {
  id: "form-patch-checkbox-no-name",
  scene: "form",
  severity: "hard",
  apply(model) {
    return {
      ...model,
      blocks: model.blocks.map((block) => {
        if (block.type !== "input") return block;
        if (block.content.inputType !== "checkbox") return block;
        return {
          ...block,
          content: {
            ...block.content,
            labelTag: "div" as const,
          },
        };
      }),
    };
  },
} as const satisfies Patch<FormModel>;
