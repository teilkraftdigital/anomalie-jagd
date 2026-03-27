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
      blocks: model.blocks.map((buttonBlock) => ({
        ...buttonBlock,
        blocks: [
          {
            ...buttonBlock.blocks[0],
            content: {
              ...buttonBlock.blocks[0].content,
              attrs: { ...buttonBlock.blocks[0].content.attrs, role: "link" },
            },
          },
        ],
      })),
    };
  },
};
