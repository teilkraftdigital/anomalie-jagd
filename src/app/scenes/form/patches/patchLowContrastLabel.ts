import type { Patch } from "../../../engine/Scene";
import type { FormModel } from "../model";

export const patchLowContrastLabel = {
  id: "form-patch-low-contrast-label",
  scene: "form",
  severity: "easy",
  apply(model) {
    return {
      ...model,
      blocks: model.blocks.map((block) => {
        if (block.type !== "input") return block;
        return {
          ...block,
          content: { ...block.content, labelClass: "text-slate-300" },
        };
      }),
    };
  },
} as const satisfies Patch<FormModel>;
