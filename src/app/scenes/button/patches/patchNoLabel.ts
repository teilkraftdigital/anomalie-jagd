import type { Patch } from "../../../engine/Scene";
import type { ButtonModel } from "../model";

export const patchNoLabel: Patch<ButtonModel> = {
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
};
