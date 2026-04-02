import type { Patch } from "../../../engine/Scene";
import type { ButtonModel } from "../model";

export const patchNoLabel = {
  id: "patch-no-label",
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
            label: "",
          },
        };
      }),
    };
  },
} satisfies Patch<ButtonModel>;
