import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGameStore from "../store/useGameStore";
import { listScenes } from "../app/engine/sceneRegistry";

export function GlossarPage() {
  const discoveredPatchIds = useGameStore((s) => s.discoveredPatchIds);
  const newlyDiscoveredPatchIds = useGameStore(
    (s) => s.newlyDiscoveredPatchIds,
  );
  const clearNewlyDiscovered = useGameStore((s) => s.clearNewlyDiscovered);
  const currentSceneId = useGameStore((s) => s.currentSceneId);
  const navigate = useNavigate();

  const scenes = listScenes();
  const [activeTab, setActiveTab] = useState(
    currentSceneId ?? scenes[0]?.id ?? "",
  );
  const [showToast, setShowToast] = useState(
    newlyDiscoveredPatchIds.length > 0,
  );

  useEffect(() => {
    if (newlyDiscoveredPatchIds.length > 0) {
      setShowToast(true);
      const t = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(t);
    }
  }, []);

  const activeScene = scenes.find((s) => s.id === activeTab);
  const sceneDiscovered = discoveredPatchIds[activeTab] ?? [];

  const severityOrder = { easy: 0, medium: 1, hard: 2 };

  const sortedPatches = activeScene
    ? [...activeScene.patches].sort((a, b) => {
        const aNew = newlyDiscoveredPatchIds.includes(a.id);
        const bNew = newlyDiscoveredPatchIds.includes(b.id);
        if (aNew && !bNew) return -1;
        if (!aNew && bNew) return 1;
        const severityDiff =
          severityOrder[a.severity] - severityOrder[b.severity];
        if (severityDiff !== 0) return severityDiff;
        return a.label.localeCompare(b.label);
      })
    : [];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Toast */}
      {showToast && (
        <div
          role="status"
          className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 font-semibold"
        >
          Geschafft!
          {newlyDiscoveredPatchIds.length > 0 &&
            ` ${newlyDiscoveredPatchIds.length} neue Anomalie(n) entdeckt.`}
        </div>
      )}

      {/* Header */}
      <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-slate-400 hover:text-white text-sm transition-colors"
        >
          <span aria-hidden="true">←</span> Start
        </Link>
        <h1 className="font-bold text-lg">Anomalien-Glossar</h1>
        <button
          onClick={() => {
            navigate("/level-select");
            clearNewlyDiscovered();
          }}
          className="bg-white text-slate-900 text-sm font-semibold px-4 py-1.5 rounded-lg hover:bg-slate-200 transition-colors"
        >
          Nochmal spielen
        </button>
      </header>

      {/* Tabs */}
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
              onClick={() => setActiveTab(scene.id)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                isActive
                  ? "border-white text-white"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              {scene.name}
              <span className="ml-2 text-xs font-mono opacity-60">
                {discovered}/{total}
              </span>
            </button>
          );
        })}
      </div>

      {/* Patch list */}
      <div
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="max-w-2xl mx-auto px-4 py-8"
      >
        <ul className="flex flex-col gap-4">
          {sortedPatches.map((patch) => {
            const discovered = sceneDiscovered.includes(patch.id);
            const isNew = newlyDiscoveredPatchIds.includes(patch.id);
            return (
              <li
                key={patch.id}
                className={`rounded-xl border p-5 transition-all ${
                  isNew
                    ? "border-green-400 bg-green-50 shadow-md"
                    : discovered
                      ? "border-slate-200 bg-white"
                      : "border-slate-200 bg-white opacity-40"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {isNew && (
                      <span className="inline-block bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded mb-2">
                        Neu entdeckt
                      </span>
                    )}
                    <h2 className="font-semibold text-slate-900">
                      {patch.label}
                    </h2>
                    {discovered ? (
                      <p className="text-slate-600 text-sm mt-1">
                        {patch.explanation}
                      </p>
                    ) : (
                      <p className="text-slate-400 text-sm mt-1 italic">
                        Noch nicht entdeckt
                      </p>
                    )}
                  </div>
                  <span
                    className={`shrink-0 text-xs font-mono px-2 py-1 rounded-full ${
                      patch.severity === "easy"
                        ? "bg-green-100 text-green-700"
                        : patch.severity === "medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {patch.severity}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
