import type { Patch } from "../../../engine/Scene";
import type { FormModel } from "../model";

export const patchLowContrastInputs = {
  id: "form-patch-low-contrast-inputs",
  scene: "form",
  severity: "easy",
  apply(model) {
    return {
      ...model,
      blocks: model.blocks.map((block) => {
        if (block.type !== "input") return block;
        if (block.content.inputType === "checkbox") return block;
        return {
          ...block,
          content: { ...block.content, inputClass: "border-slate-200" },
        };
      }),
    };
  },
} as const satisfies Patch<FormModel>;
