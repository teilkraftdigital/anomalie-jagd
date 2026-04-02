import i18n from "../../../i18n/config";
import type { FormModel } from "./model";

const ns = "scene-form";
const f = (key: string) => i18n.t(key, { ns });

export function createFormBaseModel(): FormModel {
  return {
    title: "form",
    blocks: [
      { type: "error-summary" },
      { type: "required-note" },
      {
        type: "input",
        content: {
          inputType: "text",
          label: f("fields.name.label"),
          labelAttrs: { htmlFor: "name" },
          placeholder: f("fields.name.placeholder"),
          required: true,
          requiredLabel: undefined,
          autocomplete: "name",
          attrs: { id: "name" },
          validation: {
            required: { message: f("fields.name.validation.required") },
            minLength: {
              value: 2,
              message: f("fields.name.validation.minLength"),
            },
          },
        },
      },
      {
        type: "input",
        content: {
          inputType: "email",
          label: f("fields.email.label"),
          labelAttrs: { htmlFor: "email" },
          placeholder: f("fields.email.placeholder"),
          required: true,
          requiredLabel: undefined,
          autocomplete: "email",
          attrs: { id: "email" },
          validation: {
            required: { message: f("fields.email.validation.required") },
            pattern: {
              value: "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$",
              message: f("fields.email.validation.pattern"),
            },
          },
        },
      },
      {
        type: "input",
        content: {
          inputType: "password",
          label: f("fields.password.label"),
          labelAttrs: { htmlFor: "password" },
          required: true,
          requiredLabel: undefined,
          placeholder: f("fields.password.placeholder"),
          autocomplete: "new-password",
          attrs: { id: "password" },
          revealButton: {
            as: "button",
            attrs: { type: "button", "aria-label": f("fields.password.revealLabel") },
          },
          validation: {
            required: { message: f("fields.password.validation.required") },
            minLength: {
              value: 8,
              message: f("fields.password.validation.minLength"),
            },
          },
        },
      },
      {
        type: "input",
        content: {
          inputType: "password",
          label: f("fields.passwordRepeat.label"),
          labelAttrs: { htmlFor: "password-repeat" },
          required: true,
          requiredLabel: undefined,
          placeholder: f("fields.passwordRepeat.placeholder"),
          autocomplete: "new-password",
          attrs: {
            id: "password-repeat",
            "aria-describedby": "password-repeat-hint",
          },
          hint: f("fields.passwordRepeat.hint"),
          revealButton: {
            as: "button",
            attrs: {
              type: "button",
              "aria-label": f("fields.passwordRepeat.revealLabel"),
            },
          },
          validation: {
            required: {
              message: f("fields.passwordRepeat.validation.required"),
            },
            match: {
              fieldId: "password",
              message: f("fields.passwordRepeat.validation.match"),
            },
          },
        },
      },
      {
        type: "input",
        content: {
          inputType: "checkbox",
          required: true,
          requiredLabel: undefined,
          checkboxLabel: f("fields.agb.checkboxLabel"),
          attrs: { id: "agb", "aria-label": f("fields.agb.checkboxLabel") },
          validation: {
            required: { message: f("fields.agb.validation.required") },
          },
        },
      },
      {
        type: "submit",
        content: {
          label: f("fields.submit.label"),
          attrs: { type: "submit" },
        },
      },
    ],
  };
}
