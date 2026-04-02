import type { Patch } from "../../../engine/Scene";
import type { FormModel } from "../model";

export const patchErrorBorderOnly: Patch<FormModel> = {
  id: "form-patch-error-border-only",
  scene: "form",
  severity: "hard",
  apply(model) {
    return {
      ...model,
      blocks: model.blocks
        .filter((block) => block.type !== "error-summary")
        .map((block) => {
          if (block.type !== "input") return block;
          return {
            ...block,
            content: { ...block.content, errorDisplay: "border-only" as const },
          };
        }),
    };
  },
};
