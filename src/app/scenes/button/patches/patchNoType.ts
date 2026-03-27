import type { Patch } from "../../../engine/Scene";
import type { ButtonModel } from "../model";
import { patchAttrs } from "../../../engine/patchEngine";

export const patchNoType: Patch<ButtonModel> = {
  id: "patch-no-type",
  label: 'Fehlendes type="button"',
  severity: "medium",
  explanation:
    'Ohne type="button" hat ein <button> in einem Formular automatisch type="submit". Das kann ungewollte Formular-Übermittlungen auslösen und ist für Entwickler und Nutzer schwer nachvollziehbar.',
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
              attrs: patchAttrs(buttonBlock.blocks[0].content.attrs, {
                remove: ["type"],
              }),
            },
          },
        ],
      })),
    };
  },
};
