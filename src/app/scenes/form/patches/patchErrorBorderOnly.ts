import type { Patch } from "../../../engine/Scene";
import type { FormModel } from "../model";

export const patchErrorBorderOnly: Patch<FormModel> = {
  id: "form-patch-error-border-only",
  label: "Fehler nur als roter Rand, ohne Hilfetext und Fehlerzusammenfassung",
  severity: "hard",
  explanation:
    "Fehlermeldungen dürfen nicht ausschließlich durch Farbe kommuniziert werden. Ein roter Rand ohne erklärenden Text ist für Menschen mit Farbenblindheit nicht erkennbar und bietet Screenreader-Nutzern keine Information darüber, was falsch ist.",
  apply(model) {
    return {
      ...model,
      blocks: model.blocks
        .filter((block) => block.type !== "error-summary")
        .map((block) => {
          if (block.type !== "input") return block;
          return {
            ...block,
            content: { ...block.content, errorDisplay: "border-only" as const },
          };
        }),
    };
  },
};
