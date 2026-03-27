import type { Patch } from "../../../engine/Scene";
import type { FormModel } from "../model";

export const patchRequiredLabelOnly: Patch<FormModel> = {
  id: "form-patch-required-label-only",
  label: "Pflichtfeld-Stern im Label, kein required-Attribut",
  severity: "medium",
  explanation:
    'Das visuelle "*" im Label täuscht ein Pflichtfeld vor, aber ohne required="true" erkennen Browser und assistive Technologien das Feld nicht als Pflichtfeld. Validierung funktioniert nicht.',
  apply(model) {
    return {
      ...model,
      blocks: model.blocks.map((block) => {
        if (block.type !== "input") return block;
        return {
          ...block,
          content: {
            ...block.content,
            label: block.content.label
              ? `${block.content.label} *`
              : block.content.label,
            required: false,
          },
        };
      }),
    };
  },
};
