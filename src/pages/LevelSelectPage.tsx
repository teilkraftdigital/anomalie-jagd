import { useState } from "react";
import { listScenes } from "../app/engine/sceneRegistry";
import useGameStore from "../store/useGameStore";

export function LevelSelectPage() {
  const discoveredPatchIds = useGameStore((s) => s.discoveredPatchIds);
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null);

  const scenes = listScenes();

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center py-16 px-4">
      <h2 className="text-3xl font-bold mb-2">Level auswählen</h2>
      <p className="text-slate-400 mb-10">
        Wähle eine Scene und einen Schwierigkeitsgrad.
      </p>

      {/* Scene selection */}
      <div className="w-full max-w-2xl mb-10">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Scene
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {scenes.map((scene) => {
            const discovered = (discoveredPatchIds[scene.id] ?? []).length;
            const total = scene.patches.length;
            const isSelected = selectedSceneId === scene.id;

            return (
              <button
                key={scene.id}
                onClick={() => setSelectedSceneId(scene.id)}
                className={`text-left rounded-xl border px-5 py-4 transition-all ${
                  isSelected
                    ? "border-white bg-slate-700"
                    : "border-slate-600 bg-slate-800 hover:bg-slate-700"
                }`}
              >
                <div className="font-bold text-lg">{scene.name}</div>
                <div className="text-slate-400 text-sm mt-0.5">
                  {scene.description}
                </div>
                <div className="text-slate-500 text-xs mt-2 font-mono">
                  {discovered}/{total} Anomalien entdeckt
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
