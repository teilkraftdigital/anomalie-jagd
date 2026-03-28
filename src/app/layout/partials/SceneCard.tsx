import type { Scene } from "../../engine/Scene";

export type SceneCardProps = {
  scene: Pick<Scene<any>, "id" | "name" | "description">;
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
  return (
    <button
      key={scene.id}
      onClick={() => {
        onClick(scene.id);
        // setSelectedSceneId(scene.id);
        // setSelectedDifficulty(null);
      }}
      className={`text-left rounded-xl border px-5 py-4 transition-all ${
        isSelected
          ? "border-white bg-slate-700"
          : "border-slate-600 bg-slate-800 hover:bg-slate-700"
      }`}
    >
      <div className="font-bold text-lg">{scene.name}</div>
      <div className="text-slate-200 text-sm mt-0.5">{scene.description}</div>
      <div className="text-slate-300 text-xs mt-2 font-mono">
        {discovered}/{total} Anomalien entdeckt
      </div>
    </button>
  );
}
