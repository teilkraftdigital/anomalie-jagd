import { useState } from "react";
import { listScenes, getScene } from "../../engine/sceneRegistry";

type Props = {
  sceneId: string;
  patchId: string | null;
  onSceneChange: (sceneId: string) => void;
  onPatchChange: (patchId: string | null) => void;
};

export function DebugBar({
  sceneId,
  patchId,
  onSceneChange,
  onPatchChange,
}: Props) {
  const severityOrder = { easy: 0, medium: 1, hard: 2 };

  const scenes = listScenes();
  const scene = scenes.find((s) => s.id === sceneId);
  const patches = scene
    ? [...getScene(sceneId).patches].sort((a, b) => {
        const severityDiff = severityOrder[a.severity] - severityOrder[b.severity];
        if (severityDiff !== 0) return severityDiff;
        return a.label.localeCompare(b.label);
      })
    : [];
  const activePatch = patches.find((p) => p.id === patchId) ?? null;

  const [debugPanelOpen, setDebugPanelOpen] = useState(true);

  return (
    <div className="bg-amber-400 text-slate-900 px-4 py-2 flex flex-col gap-2">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-bold text-xs uppercase tracking-wider">
          ⚙ Debug
        </span>
        <button
          onClick={() => setDebugPanelOpen((open) => !open)}
          className="text-xs text-slate-900 bg-amber-200 rounded px-2 py-1"
          aria-expanded={debugPanelOpen}
          aria-controls="debug-panel"
        >
          {debugPanelOpen ? "einklappen" : "ausklappen"}
        </button>
      </div>

      <div
        id="debug-panel"
        hidden={!debugPanelOpen}
        className="flex flex-col gap-2"
      >
        <div className="border-t border-yellow-600 flex flex-wrap gap-4 pt-1.5">
          <div className="flex flex-col gap-1">
            <label className="text-yellow-900 text-sm" htmlFor="debug-scene">
              Scene
            </label>
            <select
              id="debug-scene"
              value={sceneId}
              onChange={(e) => onSceneChange(e.target.value)}
              className="text-sm rounded px-2 py-1 bg-amber-100 border border-amber-500"
            >
              {scenes.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-yellow-900 text-sm" htmlFor="debug-patch">
              Patch
            </label>
            <select
              id="debug-patch"
              value={patchId ?? ""}
              onChange={(e) => onPatchChange(e.target.value || null)}
              className="text-sm rounded px-2 py-1 bg-amber-100 border border-amber-500"
            >
              <option value="">— Kein Patch (clean) —</option>
              {patches.map((p) => (
                <option key={p.id} value={p.id}>
                  [{p.severity}] {p.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {activePatch && (
          <div className="text-xs bg-amber-200 rounded px-3 py-2 flex gap-1 flex-col">
            <span className="font-mono font-bold">Erklärung</span>
            <span className="opacity-70">{activePatch.explanation}</span>
          </div>
        )}
      </div>
    </div>
  );
}
