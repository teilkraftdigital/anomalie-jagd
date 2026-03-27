import type { Patch } from "../../../engine/Scene";
import { patchAttrs } from "../../../engine/patchEngine";
import type { ButtonModel } from "../model";

export const patchDivButton: Patch<ButtonModel> = {
  id: "patch-div-button",
  label: "<div> statt <button>",
  severity: "easy",
  explanation:
    "Ein <div> ist kein interaktives Element. Es ist nicht per Tastatur fokussierbar, sendet kein click-Event bei Enter/Space und wird von Screenreadern nicht als solches angekündigt.",
  apply(model) {
    return {
      ...model,
      blocks: model.blocks.map((block) => {
        if (block.type !== "button") return block;
        return {
          ...block,
          content: {
            ...block.content,
            as: "div",
            attrs: patchAttrs(block.content.attrs, {
              remove: ["type"],
            }),
          },
        };
      }),
    };
  },
} as const;
