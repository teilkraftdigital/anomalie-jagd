import type { Patch } from "../../../engine/Scene";
import type { ButtonModel } from "../model";

export const patchDivButton: Patch<ButtonModel> = {
  id: "patch-div-button",
  label: "<div> statt <button>",
  severity: "easy",
  explanation:
    "Ein <div> ist kein interaktives Element. Es ist nicht per Tastatur fokussierbar, sendet kein click-Event bei Enter/Space und wird von Screenreadern nicht als Button angekündigt.",
  apply(model) {
    return {
      ...model,
      blocks: model.blocks.map((buttonBlock) => ({
        ...buttonBlock,
        blocks: [
          {
            ...buttonBlock.blocks[0],
            content: {
              ...buttonBlock.blocks[0].content,
              as: "div" as const,
            },
          },
        ],
      })),
    };
  },
};
