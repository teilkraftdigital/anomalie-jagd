import type { Patch } from "../../../engine/Scene";
import type { FormModel } from "../model";

export const patchNoLabel: Patch<FormModel> = {
  id: "form-patch-no-label",
  label: "Kein Label am Name-Feld",
  severity: "easy",
  explanation:
    "Alle Inputs ohne zugehöriges <label> haben keinen zugänglichen Namen. Screenreader können den Zweck des Feldes nicht kommunizieren.",
  apply(model) {
    return {
      ...model,
      blocks: model.blocks.map((block) => {
        if (block.type !== "input") return block;
        return {
          ...block,
          content: {
            ...block.content,
            label: undefined,
            labelAttrs: undefined,
          },
        };
      }),
    };
  },
};
