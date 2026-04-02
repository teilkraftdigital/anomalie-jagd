import type { Patch } from "../../../engine/Scene";
import { patchAttrs } from "../../../engine/patchEngine";
import type { ButtonModel } from "../model";

export const patchDivButton = {
  id: "patch-div-button",
  scene: "button",
  severity: "easy",
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
} satisfies Patch<ButtonModel>;
