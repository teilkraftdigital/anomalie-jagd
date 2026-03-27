import type { Patch } from "../../../engine/Scene";
import type { ButtonModel } from "../model";

export const patchNoLabel: Patch<ButtonModel> = {
  id: "patch-no-label",
  label: "Kein zugänglicher Name",
  severity: "easy",
  explanation:
    "Ein Button ohne sichtbaren Text und ohne aria-label hat keinen zugänglichen Namen. Screenreader können den Zweck des Buttons nicht kommunizieren.",
  apply(model) {
    return {
      ...model,
      blocks: model.blocks.map((block) => {
        if (block.type !== "button") return block;
        return {
          ...block,
          content: {
            ...block.content,
            label: "",
          },
        };
      }),
    };
  },
};
