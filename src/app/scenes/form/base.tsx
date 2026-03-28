import type { FormModel } from "./model";

export const formScene: FormModel = {
  title: "Registrierungsformular",
  blocks: [
    {
      type: "error-summary",
    },
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
        validation: {
          required: { message: "Bitte gib deinen Namen ein." },
          minLength: {
            value: 2,
            message: "Name muss mindestens 2 Zeichen lang sein.",
          },
        },
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
        validation: {
          required: { message: "Bitte gib deine E-Mail-Adresse ein." },
          pattern: {
            value: "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$",
            message: "Bitte gib eine gültige E-Mail-Adresse ein.",
          },
        },
      },
    },
    {
      type: "input",
      content: {
        inputType: "password",
        label: "Passwort",
        labelAttrs: { htmlFor: "password" },
        required: true,
        placeholder: "••••••••",
        autocomplete: "new-password",
        attrs: { id: "password" },
        revealButton: {
          as: "button",
          attrs: { type: "button", "aria-label": "Passwort anzeigen" },
        },
        validation: {
          required: { message: "Bitte gib ein Passwort ein." },
          minLength: {
            value: 8,
            message: "Passwort muss mindestens 8 Zeichen lang sein.",
          },
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
        placeholder: "••••••••",
        autocomplete: "new-password",
        attrs: { id: "password-repeat", "aria-describedby": "password-hint" },
        hint: "Passwort muss mit dem oberen übereinstimmen.",
        revealButton: {
          as: "button",
          attrs: { type: "button", "aria-label": "Passwort anzeigen" },
        },
        validation: {
          required: { message: "Bitte wiederhole dein Passwort." },
          match: {
            fieldId: "password",
            message: "Die Passwörter stimmen nicht überein.",
          },
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
        validation: {
          required: { message: "Bitte stimme den AGB zu." },
        },
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
