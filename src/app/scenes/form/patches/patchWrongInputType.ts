import type { Patch } from "../../../engine/Scene";
import type { FormModel } from "../model";

export const patchWrongInputType: Patch<FormModel> = {
  id: "form-patch-wrong-input-type",
  label: "Falscher input type (text statt email)",
  severity: "medium",
  explanation:
    'type="email" aktiviert die E-Mail-Tastatur auf Mobilgeräten, validiert das Format und hilft Passwortmanagern. type="text" deaktiviert all das.',
  apply(model) {
    return {
      ...model,
      blocks: model.blocks.map((block) => {
        if (block.type !== "input") return block;
        if (block.content.inputType !== "email") return block;
        return {
          ...block,
          content: { ...block.content, inputType: "text" as const },
        };
      }),
    };
  },
};
