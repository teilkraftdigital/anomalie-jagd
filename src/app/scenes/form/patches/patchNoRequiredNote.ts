import type { Patch } from "../../../engine/Scene";
import type { FormModel } from "../model";

export const patchNoRequiredNote: Patch<FormModel> = {
  id: "form-patch-no-required-note",
  label: "Kein Pflichtfeld-Hinweis",
  severity: "easy",
  explanation:
    'Der Hinweis "* Alle Felder sind Pflichtfelder" fehlt. Nutzer — besonders mit kognitiven Einschränkungen oder Screenreader — wissen dann nicht, dass alle Felder ausgefüllt werden müssen, bevor sie das Formular absenden.',
  apply(model) {
    return {
      ...model,
      blocks: model.blocks.filter((block) => block.type !== "required-note"),
    };
  },
};
