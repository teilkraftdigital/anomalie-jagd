import type { HTMLAttributes, ElementType } from "react";
import type { BaseModel } from "../../engine/models/BaseModel";

export type InputContent = {
  inputType: "text" | "email" | "password" | "checkbox";
  label?: string;
  labelAttrs?: { htmlFor?: string; [key: string]: any };
  placeholder?: string;
  required?: boolean;
  autocomplete?: string;
  attrs?: HTMLAttributes<HTMLInputElement> & Record<string, any>;
  revealButton?: {
    as?: ElementType;
    attrs?: Record<string, any>;
  };
  checkboxLabel?: string;
};

export type FormBlock =
  | { type: "input"; content: InputContent }
  | {
      type: "submit";
      content: {
        label?: string;
        attrs?: HTMLAttributes<HTMLButtonElement> & Record<string, any>;
      };
    };

export type FormModel = BaseModel<FormBlock>;
