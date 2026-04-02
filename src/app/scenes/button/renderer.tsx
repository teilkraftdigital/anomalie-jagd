import { useTranslation } from "react-i18next";
import type { ButtonModel } from "./model";

export function ButtonSceneRenderer({ model }: { model: ButtonModel }) {
  const { t } = useTranslation("scene-button");
  const {
    label,
    as: Component = "button",
    attrs,
    onClick,
  } = model.blocks[0].content;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 tracking-tight">
        {t("renderer.heading")}
      </h2>

      <Component {...attrs} onClick={onClick}>
        {label}
      </Component>
    </div>
  );
}
