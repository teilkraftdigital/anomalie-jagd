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
          label: f("renderer.fields.name.label"),
          labelAttrs: { htmlFor: "name" },
          placeholder: f("renderer.fields.name.placeholder"),
          required: true,
          requiredLabel: undefined,
          autocomplete: "name",
          attrs: { id: "name" },
          validation: {
            required: { message: f("renderer.fields.name.validation.required") },
            minLength: {
              value: 2,
              message: f("renderer.fields.name.validation.minLength"),
            },
          },
        },
      },
      {
        type: "input",
        content: {
          inputType: "email",
          label: f("renderer.fields.email.label"),
          labelAttrs: { htmlFor: "email" },
          placeholder: f("renderer.fields.email.placeholder"),
          required: true,
          requiredLabel: undefined,
          autocomplete: "email",
          attrs: { id: "email" },
          validation: {
            required: { message: f("renderer.fields.email.validation.required") },
            pattern: {
              value: "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$",
              message: f("renderer.fields.email.validation.pattern"),
            },
          },
        },
      },
      {
        type: "input",
        content: {
          inputType: "password",
          label: f("renderer.fields.password.label"),
          labelAttrs: { htmlFor: "password" },
          required: true,
          requiredLabel: undefined,
          placeholder: f("renderer.fields.password.placeholder"),
          autocomplete: "new-password",
          attrs: { id: "password" },
          revealButton: {
            as: "button",
            attrs: { type: "button", "aria-label": f("renderer.fields.password.revealLabel") },
          },
          validation: {
            required: { message: f("renderer.fields.password.validation.required") },
            minLength: {
              value: 8,
              message: f("renderer.fields.password.validation.minLength"),
            },
          },
        },
      },
      {
        type: "input",
        content: {
          inputType: "password",
          label: f("renderer.fields.passwordRepeat.label"),
          labelAttrs: { htmlFor: "password-repeat" },
          required: true,
          requiredLabel: undefined,
          placeholder: f("renderer.fields.passwordRepeat.placeholder"),
          autocomplete: "new-password",
          attrs: {
            id: "password-repeat",
            "aria-describedby": "password-repeat-hint",
          },
          hint: f("renderer.fields.passwordRepeat.hint"),
          revealButton: {
            as: "button",
            attrs: {
              type: "button",
              "aria-label": f("renderer.fields.passwordRepeat.revealLabel"),
            },
          },
          validation: {
            required: {
              message: f("renderer.fields.passwordRepeat.validation.required"),
            },
            match: {
              fieldId: "password",
              message: f("renderer.fields.passwordRepeat.validation.match"),
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
          checkboxLabel: f("renderer.fields.agb.checkboxLabel"),
          attrs: { id: "agb", "aria-label": f("renderer.fields.agb.checkboxLabel") },
          validation: {
            required: { message: f("renderer.fields.agb.validation.required") },
          },
        },
      },
      {
        type: "submit",
        content: {
          label: f("renderer.fields.submit.label"),
          attrs: { type: "submit" },
        },
      },
    ],
  };
}
