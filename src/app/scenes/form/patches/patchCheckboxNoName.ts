import type { Patch } from "../../../engine/Scene";
import type { FormModel } from "../model";
import { patchAttrs } from "../../../engine/patchEngine";

export const patchCheckboxNoName: Patch<FormModel> = {
  id: "form-patch-checkbox-no-name",
  label: "Checkbox ohne zugänglichen Namen",
  severity: "hard",
  explanation:
    "Eine Checkbox mit sichtbarem Label-Text jedoch ohne aria-label oder label-Element hat keinen zugänglichen Namen. Screenreader können den Zweck der Checkbox nicht kommunizieren.",
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
            attrs: patchAttrs(block.content.attrs, { remove: ["aria-label"] }),
          },
        };
      }),
    };
  },
};
