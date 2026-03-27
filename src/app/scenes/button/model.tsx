import type { HTMLAttributes, ElementType } from "react";
import type { BaseModel } from "../../engine/models/BaseModel";

export type ButtonBlock = {
  title: string;
  blocks: {
    type: "button";
    content: {
      label?: string;
      as?: ElementType;
      onClick: () => void;
      attrs?: HTMLAttributes<HTMLButtonElement> & Record<string, any>;
    };
  }[];
};

export type ButtonModel = BaseModel<ButtonBlock>;
