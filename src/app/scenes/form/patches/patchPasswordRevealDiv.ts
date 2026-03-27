import type { Patch } from "../../../engine/Scene";
import type { FormModel } from "../model";

export const patchPasswordRevealDiv: Patch<FormModel> = {
  id: "form-patch-password-reveal-div",
  label: "Password-Reveal als nicht-interaktives div",
  severity: "medium",
  explanation:
    "Ein <div> als Klick-Ziel ist nicht per Tastatur fokussierbar, sendet kein click-Event bei Enter/Space und wird von Screenreadern nicht als Button angekündigt.",
  apply(model) {
    return {
      ...model,
      blocks: model.blocks.map((block) => {
        if (block.type !== "input") return block;
        if (block.content.attrs?.id !== "password") return block;
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
};
