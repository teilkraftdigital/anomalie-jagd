import { twMerge } from "tailwind-merge";
import type { ElementType } from "react";
import type { ButtonModel } from "./model";

export function ButtonSceneRenderer({ model }: { model: ButtonModel }) {
  const {
    label,
    as: Component = "button",
    attrs,
    onClick,
  } = model.blocks[0].content;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 tracking-tight">Button-Szene</h2>

      <Component {...attrs} onClick={onClick}>
        {label}
      </Component>
    </div>
  );
}
