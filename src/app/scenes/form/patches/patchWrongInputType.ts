import type { Patch } from "../../../engine/Scene";
import type { FormModel } from "../model";

export const patchWrongInputType = {
  id: "form-patch-wrong-input-type",
  scene: "form",
  severity: "medium",
  apply(model) {
    return {
      ...model,
      blocks: model.blocks.map((block) => {
        if (block.type !== "input") return block;
        if (block.content.inputType !== "email") return block;
        return {
          ...block,
          content: { ...block.content, inputType: "text" as const },
        };
      }),
    };
  },
} satisfies Patch<FormModel>;
