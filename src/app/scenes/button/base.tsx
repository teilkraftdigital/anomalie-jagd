import type { ButtonModel } from "./model";

export const buttonScene: ButtonModel = {
  title: "Button",
  blocks: [
    {
      type: "button",
      content: {
        label: "Eine verdächtige Schaltfläche",
        onClick: () => alert("Schaltfläche geklickt!"),
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
