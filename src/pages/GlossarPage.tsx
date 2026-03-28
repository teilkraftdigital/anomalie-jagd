import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGameStore from "../store/useGameStore";
import { listScenes } from "../app/engine/sceneRegistry";
import { GlossarTabs } from "../components/molecules/GlossarTabs";
import { PatchCard } from "../components/molecules/PatchCard";

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

      <GlossarTabs
        scenes={scenes}
        discoveredPatchIds={discoveredPatchIds}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Patch list */}
      <div
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="max-w-2xl mx-auto px-4 py-8"
      >
        <ul className="flex flex-col gap-4">
          {sortedPatches.map((patch) => (
            <PatchCard
              key={patch.id}
              patch={patch}
              discovered={sceneDiscovered.includes(patch.id)}
              isNew={newlyDiscoveredPatchIds.includes(patch.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
