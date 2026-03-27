import type { Patch } from "../../../engine/Scene";
import type { FormModel } from "../model";

export const patchNoErrorSummary: Patch<FormModel> = {
  id: "form-patch-no-error-summary",
  label: "Fehlerzusammenfassung fehlt",
  severity: "medium",
  explanation:
    "Nach dem Absenden eines Formulars mit Fehlern sollte eine Fehlerzusammenfassung angezeigt werden, auf die der Fokus gesetzt wird. Ohne sie müssen Screenreader-Nutzer das gesamte Formular durchsuchen, um Fehler zu finden.",
  apply(model) {
    return {
      ...model,
      blocks: model.blocks.filter((block) => block.type !== "error-summary"),
    };
  },
};
