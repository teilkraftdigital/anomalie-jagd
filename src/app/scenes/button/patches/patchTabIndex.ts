import type { Patch } from "../../../engine/Scene";
import type { ButtonModel } from "../model";

export const patchTabIndex: Patch<ButtonModel> = {
  id: "patch-tab-index",
  label: "tabIndex=−1 (nicht per Tastatur erreichbar)",
  severity: "medium",
  explanation:
    "tabIndex=-1 entfernt den Button aus der Tab-Reihenfolge. Tastaturnutzer und Screenreader-Nutzer können den Button nicht mehr fokussieren oder aktivieren.",
  apply(model) {
    return {
      ...model,
      blocks: model.blocks.map((block) => {
        if (block.type !== "button") return block;
        return {
          ...block,
          content: {
            ...block.content,
            attrs: {
              ...block.content.attrs,
              tabIndex: -1,
            },
          },
        };
      }),
    };
  },
};
