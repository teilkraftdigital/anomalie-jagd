import type { FormModel } from "./model";

export const formScene: FormModel = {
  title: "Registrierungsformular",
  blocks: [
    {
      type: "input",
      content: {
        inputType: "text",
        label: "Name",
        labelAttrs: { htmlFor: "name" },
        placeholder: "Max Mustermann",
        required: true,
        autocomplete: "name",
        attrs: { id: "name" },
      },
    },
    {
      type: "input",
      content: {
        inputType: "email",
        label: "E-Mail",
        labelAttrs: { htmlFor: "email" },
        placeholder: "max@example.com",
        required: true,
        autocomplete: "email",
        attrs: { id: "email" },
      },
    },
    {
      type: "input",
      content: {
        inputType: "password",
        label: "Passwort",
        labelAttrs: { htmlFor: "password" },
        required: true,
        autocomplete: "new-password",
        attrs: { id: "password" },
        revealButton: {
          as: "button",
          attrs: { type: "button", "aria-label": "Passwort anzeigen" },
        },
      },
    },
    {
      type: "input",
      content: {
        inputType: "password",
        label: "Passwort wiederholen",
        labelAttrs: { htmlFor: "password-repeat" },
        required: true,
        autocomplete: "new-password",
        attrs: { id: "password-repeat", "aria-describedby": "password-hint" },
        revealButton: {
          as: "button",
          attrs: { type: "button", "aria-label": "Passwort anzeigen" },
        },
      },
    },
    {
      type: "input",
      content: {
        inputType: "checkbox",
        required: true,
        checkboxLabel: "Ich stimme den AGB zu",
        attrs: { id: "agb", "aria-label": "Ich stimme den AGB zu" },
      },
    },
    {
      type: "submit",
      content: {
        label: "Registrieren",
        attrs: { type: "submit" },
      },
    },
  ],
};
