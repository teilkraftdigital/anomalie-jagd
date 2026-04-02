import type { Patch } from "../../../engine/Scene";
import type { FormModel } from "../model";

export const patchNoErrorSummary: Patch<FormModel> = {
  id: "form-patch-no-error-summary",
  scene: "form",
  severity: "medium",
  apply(model) {
    return {
      ...model,
      blocks: model.blocks.filter((block) => block.type !== "error-summary"),
    };
  },
};
