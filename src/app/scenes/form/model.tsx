import type { HTMLAttributes, ElementType } from "react";
import type { BaseModel } from "../../engine/models/BaseModel";

export type ValidationRules = {
  required?: { message?: string };
  minLength?: { value: number; message?: string };
  pattern?: { value: string; message?: string };
  match?: { fieldId: string; message?: string };
};

export type InputContent = {
  inputType: "text" | "email" | "password" | "checkbox";
  label?: string;
  labelAttrs?: { htmlFor?: string; [key: string]: any };
  labelClass?: string;
  inputClass?: string;
  hintClass?: string;
  placeholder?: string;
  required?: boolean;
  requiredLabel?: string;
  autocomplete?: string;
  hint?: string;
  attrs?: HTMLAttributes<HTMLInputElement> & Record<string, any>;
  revealButton?: {
    as?: ElementType;
    attrs?: Record<string, any>;
  };
  checkboxLabel?: string;
  validation?: ValidationRules;
  errorDisplay?: "full" | "border-only";
};

export type FormBlock =
  | { type: "input"; content: InputContent }
  | { type: "heading"; content: { as: "h1" | "h2" | "h3" | "div" | "p"; text?: string } }
  | { type: "error-summary" }
  | { type: "required-note" }
  | {
      type: "submit";
      content: {
        label?: string;
        attrs?: HTMLAttributes<HTMLButtonElement> & Record<string, any>;
      };
    };

export type FormModel = BaseModel<FormBlock>;
