import type { Patch } from "../../../engine/Scene";
import type { FormModel } from "../model";
import { patchAttrs } from "../../../engine/patchEngine";

export const patchNoAriaDescribedby: Patch<FormModel> = {
  id: "form-patch-no-aria-describedby",
  label: "Passwort-Wiederholung ohne aria-describedby",
  severity: "hard",
  explanation:
    "Ohne aria-describedby erhält der Screenreader-Nutzer keinen Hinweis, dass das Feld mit dem Passwort-Feld übereinstimmen muss. Der Hinweistext existiert im DOM, ist aber nicht mit dem Input verknüpft.",
  apply(model) {
    return {
      ...model,
      blocks: model.blocks.map((block) => {
        if (block.type !== "input") return block;
        if (block.content.attrs?.id !== "password-repeat") return block;
        return {
          ...block,
          content: {
            ...block.content,
            attrs: patchAttrs(block.content.attrs, {
              remove: ["aria-describedby"],
            }),
          },
        };
      }),
    };
  },
};
