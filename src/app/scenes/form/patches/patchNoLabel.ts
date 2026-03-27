import type { Patch } from "../../../engine/Scene";
import type { FormModel } from "../model";

export const patchNoLabel: Patch<FormModel> = {
  id: "form-patch-no-label",
  label: "Kein Label am Name-Feld",
  severity: "easy",
  explanation:
    "Ein Input ohne zugehöriges <label> hat keinen zugänglichen Namen. Screenreader können den Zweck des Feldes nicht kommunizieren.",
  apply(model) {
    return {
      ...model,
      blocks: model.blocks.map((block) => {
        if (block.type !== "input") return block;
        if (block.content.inputType !== "text") return block;
        return {
          ...block,
          content: { ...block.content, label: undefined, labelAttrs: undefined },
        };
      }),
    };
  },
};
