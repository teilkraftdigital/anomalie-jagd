import type { Patch } from "../../../engine/Scene";
import type { ButtonModel } from "../model";

export const patchTabIndex = {
  id: "patch-tab-index",
  scene: "button",
  severity: "medium",
  apply(model) {
    return {
      ...model,
      blocks: model.blocks.map((block) => {
        if (block.type !== "button") return block;
        return {
          ...block,
          content: {
            ...block.content,
            attrs: {
              ...block.content.attrs,
              tabIndex: -1,
            },
          },
        };
      }),
    };
  },
} as const satisfies Patch<ButtonModel>;
