import { listScenes, getScene } from "../../engine/sceneRegistry";

type Props = {
  sceneId: string;
  patchId: string | null;
  onSceneChange: (sceneId: string) => void;
  onPatchChange: (patchId: string | null) => void;
};

export function DebugBar({ sceneId, patchId, onSceneChange, onPatchChange }: Props) {
  const scenes = listScenes();
  const scene = scenes.find((s) => s.id === sceneId);
  const patches = scene ? getScene(sceneId).patches : [];
  const activePatch = patches.find((p) => p.id === patchId) ?? null;

  return (
    <div className="bg-amber-400 text-slate-900 px-4 py-2 flex flex-col gap-2">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-bold text-xs uppercase tracking-wider">Debug</span>

        <select
          value={sceneId}
          onChange={(e) => {
            onSceneChange(e.target.value);
            onPatchChange(null);
          }}
          className="text-sm rounded px-2 py-1 bg-amber-100 border border-amber-500"
        >
          {scenes.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <select
          value={patchId ?? ""}
          onChange={(e) => onPatchChange(e.target.value || null)}
          className="text-sm rounded px-2 py-1 bg-amber-100 border border-amber-500"
        >
          <option value="">Kein Patch (clean)</option>
          {patches.map((p) => (
            <option key={p.id} value={p.id}>
              [{p.severity}] {p.label}
            </option>
          ))}
        </select>
      </div>

      {activePatch && (
        <div className="text-xs bg-amber-200 rounded px-3 py-2 flex gap-4">
          <span className="font-mono font-bold">{activePatch.id}</span>
          <span className="opacity-70">{activePatch.explanation}</span>
        </div>
      )}
    </div>
  );
}
