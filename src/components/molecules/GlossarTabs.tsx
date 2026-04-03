import { useTranslation } from "react-i18next";
import type { Patch } from "../../app/engine/Scene";

type SceneTab = {
  id: string;
  patches: Patch<any>[];
};

type Props = {
  scenes: SceneTab[];
  discoveredPatchIds: Record<string, string[]>;
  activeTab: string;
  onTabChange: (sceneId: string) => void;
};

export function GlossarTabs({
  scenes,
  discoveredPatchIds,
  activeTab,
  onTabChange,
}: Props) {
  const { t } = useTranslation();
  return (
    <div
      role="tablist"
      aria-label="Scenes"
      className="bg-slate-900 border-t border-slate-700 px-6 flex gap-1"
    >
      {scenes.map((scene) => {
        const discovered = (discoveredPatchIds[scene.id] ?? []).length;
        const total = scene.patches.length;
        const isActive = activeTab === scene.id;
        return (
          <button
            key={scene.id}
            role="tab"
            id={`tab-${scene.id}`}
            aria-selected={isActive}
            aria-controls={`tabpanel-${scene.id}`}
            onClick={() => onTabChange(scene.id)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              isActive
                ? "border-white text-white"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            {t("scene.name", { ns: `scene-${scene.id}` })}
            <span className="ml-2 text-xs font-mono opacity-60">
              {discovered}/{total}
            </span>
          </button>
        );
      })}
    </div>
  );
}
