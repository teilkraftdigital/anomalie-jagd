import { twMerge } from "tailwind-merge";
import type { Patch } from "../../../engine/Scene";
import type { ButtonModel } from "../model";

export const patchLowContrast: Patch<ButtonModel> = {
  id: "patch-low-contrast",
  label: "Zu geringer Farbkontrast",
  severity: "easy",
  explanation:
    "Das Kontrastverhältnis zwischen Textfarbe und Hintergrund liegt unter dem WCAG-Mindestwert von 4,5:1. Für Nutzer mit Sehschwäche ist der Button-Text kaum lesbar.",
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
};
