import type { Patch } from "../../../engine/Scene";
import type { FormModel } from "../model";

export const patchNoAutocomplete: Patch<FormModel> = {
  id: "form-patch-no-autocomplete",
  label: "Kein autocomplete am Passwort-Feld",
  severity: "medium",
  explanation:
    'Ohne autocomplete="new-password" können Passwortmanager das Feld nicht korrekt befüllen. Nutzer mit kognitiven Einschränkungen sind besonders auf Passwortmanager angewiesen.',
  apply(model) {
    return {
      ...model,
      blocks: model.blocks.map((block) => {
        if (block.type !== "input") return block;
        if (block.content.attrs?.id !== "password") return block;
        return {
          ...block,
          content: { ...block.content, autocomplete: undefined },
        };
      }),
    };
  },
};
