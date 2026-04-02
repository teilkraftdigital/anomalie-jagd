import i18n from "../../../i18n/config";
import type { ButtonModel } from "./model";

export function createButtonBaseModel(): ButtonModel {
  return {
    title: "button",
    blocks: [
      {
        type: "button",
        content: {
          label: i18n.t("renderer.buttonLabel", { ns: "scene-button" }),
          onClick: () =>
            alert(i18n.t("renderer.alertMessage", { ns: "scene-button" })),
          as: "button",
          attrs: {
            type: "button",
            className:
              "text-white inline-block bg-blue-500 box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none",
          },
        },
      },
    ],
  };
}
