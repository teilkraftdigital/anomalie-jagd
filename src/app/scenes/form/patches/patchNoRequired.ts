import type { Patch } from "../../../engine/Scene";
import type { FormModel } from "../model";

export const patchNoRequired: Patch<FormModel> = {
  id: "form-patch-no-required",
  label: "Pflichtfeld ohne required-Attribut",
  severity: "medium",
  explanation:
    "Ohne required können assistive Technologien das Feld nicht als Pflichtfeld ankündigen. Nutzer von Screenreadern wissen nicht, dass das Feld ausgefüllt werden muss. Es gibt zwar eine visuelle Kennzeichnung, aber sie ist nicht ausreichend.",
  apply(model) {
    return {
      ...model,
      blocks: model.blocks.map((block) => {
        if (block.type !== "input") return block;
        return {
          ...block,
          content: { ...block.content, required: false },
        };
      }),
    };
  },
};
