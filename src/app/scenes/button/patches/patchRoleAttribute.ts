import type { Patch } from "../../../engine/Scene";
import type { ButtonModel } from "../model";

export const patchRoleAttribute: Patch<ButtonModel> = {
  id: "patch-role-attribute",
  label: "Falsches role-Attribut",
  severity: "medium",
  explanation:
    'role="link" auf einem <button> ist semantisch falsch. Assistive Technologien erwarten dann Navigationsverhalten (href), finden aber keines.',
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
} as const;
