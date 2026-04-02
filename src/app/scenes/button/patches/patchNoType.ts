import type { Patch } from "../../../engine/Scene";
import type { ButtonModel } from "../model";
import { patchAttrs } from "../../../engine/patchEngine";

export const patchNoType = {
  id: "patch-no-type",
  scene: "button",
  severity: "hard",
  apply(model) {
    return {
      ...model,
      blocks: model.blocks.map((block) => {
        if (block.type !== "button") return block;
        return {
          ...block,
          content: {
            ...block.content,
            attrs: patchAttrs(block.content.attrs, {
              remove: ["type"],
            }),
          },
        };
      }),
    };
  },
} as const satisfies Patch<ButtonModel>;
