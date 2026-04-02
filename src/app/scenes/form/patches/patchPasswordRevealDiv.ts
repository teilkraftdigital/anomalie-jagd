import type { Patch } from "../../../engine/Scene";
import type { FormModel } from "../model";

export const patchPasswordRevealDiv = {
  id: "form-patch-password-reveal-div",
  scene: "form",
  severity: "medium",
  apply(model) {
    return {
      ...model,
      blocks: model.blocks.map((block) => {
        if (block.type !== "input") return block;
        if (block.content.inputType !== "password") return block;
        return {
          ...block,
          content: {
            ...block.content,
            revealButton: {
              ...block.content.revealButton,
              as: "div" as const,
              attrs: { "aria-label": "Passwort anzeigen" },
            },
          },
        };
      }),
    };
  },
} as const satisfies Patch<FormModel>;
