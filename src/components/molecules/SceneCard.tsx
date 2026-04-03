import { useTranslation } from "react-i18next";
import type { Scene } from "../../app/engine/Scene";

export type SceneCardProps = {
  scene: Pick<Scene<any>, "id" | "patches">;
  isSelected: boolean;
  discovered: number;
  total: number;
  onClick: (sceneId: string) => void;
};

export default function SceneCard({
  scene,
  isSelected,
  discovered,
  total,
  onClick,
}: SceneCardProps) {
  const { t } = useTranslation();
  return (
    <button
      key={scene.id}
      onClick={() => onClick(scene.id)}
      className={`text-left rounded-xl border px-5 py-4 transition-all ${
        isSelected
          ? "border-white bg-slate-700"
          : "border-slate-600 bg-slate-800 hover:bg-slate-700"
      }`}
    >
      <div className="font-bold text-lg">
        {t("scene.name", { ns: `scene-${scene.id}` })}
      </div>
      <div className="text-slate-200 text-base mt-0.5">
        {t("scene.description", { ns: `scene-${scene.id}` })}
      </div>
      <div className="text-slate-300 text-sm mt-2 font-mono">
        {t("pages.levelSelect.discovered", { discovered, total })}
      </div>
    </button>
  );
}
