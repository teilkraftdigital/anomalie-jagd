import type { Patch } from "../../../engine/Scene";
import type { FormModel } from "../model";

export const patchLabelNotLinked: Patch<FormModel> = {
  id: "form-patch-label-not-linked",
  label: "Label nicht mit Input verknüpft",
  severity: "easy",
  explanation:
    "Ohne for-Attribut am <label> und passendem id am <input> ist die Verknüpfung nicht vorhanden. Klick auf den Label fokussiert das Feld nicht, Screenreader lesen den Label möglicherweise nicht vor.",
  apply(model) {
    return {
      ...model,
      blocks: model.blocks.map((block) => {
        if (block.type !== "input") return block;
        return {
          ...block,
          content: {
            ...block.content,
            labelAttrs: { ...block.content.labelAttrs, htmlFor: undefined },
          },
        };
      }),
    };
  },
};
