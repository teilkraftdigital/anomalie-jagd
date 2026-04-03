import type { Patch } from "../../../engine/Scene";
import type { FormModel } from "../model";

export const patchLowContrastHint = {
  id: "form-patch-low-contrast-hint",
  scene: "form",
  severity: "medium",
  apply(model) {
    return {
      ...model,
      blocks: model.blocks.map((block) => {
        if (block.type !== "input") return block;
        if (!block.content.hint) return block;
        return {
          ...block,
          content: { ...block.content, hintClass: "text-slate-300" },
        };
      }),
    };
  },
} as const satisfies Patch<FormModel>;
