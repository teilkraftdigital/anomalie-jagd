import type { Patch } from "../../../engine/Scene";
import type { ButtonModel } from "../model";

export const patchRoleAttribute = {
  id: "patch-role-attribute",
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
            attrs: { ...block.content.attrs, role: "link" },
          },
        };
      }),
    };
  },
} satisfies Patch<ButtonModel>;
