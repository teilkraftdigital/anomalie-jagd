import { twMerge } from "tailwind-merge";
import type { Patch } from "../../../engine/Scene";
import type { ButtonModel } from "../model";

export const patchLowContrast = {
  id: "patch-low-contrast",
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
            attrs: {
              ...block.content.attrs,
              className: twMerge(
                block.content.attrs?.className,
                "text-blue-300",
              ),
            },
          },
        };
      }),
    };
  },
} as const satisfies Patch<ButtonModel>;
