import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { listScenes } from "../app/engine/sceneRegistry";
import useGameStore from "../store/useGameStore";
import DifficultyCard from "../components/molecules/DifficultyCard";
import SceneCard from "../components/molecules/SceneCard";
import { type Difficulty, DIFFICULTIES } from "../app/engine/Scene";

export function LevelSelectPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const discoveredPatchIds = useGameStore((s) => s.discoveredPatchIds);
  const startGame = useGameStore((s) => s.startGame);

  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty | null>(null);

  const scenes = listScenes();

  function handleStart() {
    if (!selectedSceneId || !selectedDifficulty) return;
    startGame(selectedSceneId, selectedDifficulty);
    navigate("/spiel");
  }

  const handleSceneClick = (sceneId: string) => {
    setSelectedSceneId(sceneId);
    setSelectedDifficulty(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center py-16 px-4 relative">
      <nav aria-label="Navigation">
        <Link
          to="/"
          className="absolute top-4 left-6 text-slate-400 hover:text-white text-sm transition-colors"
        >
          <span aria-hidden="true">←</span> {t("pages.levelSelect.back")}
        </Link>
      </nav>
      <main className="w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-2">{t("pages.levelSelect.title")}</h1>
        <p className="text-slate-400 mb-10">{t("pages.levelSelect.subtitle")}</p>

        {/* Scene selection */}
        <div className="w-full max-w-2xl mb-8">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
            {t("pages.levelSelect.sceneHeading")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {scenes.map((scene) => {
              const discovered = (discoveredPatchIds[scene.id] ?? []).length;
              const total = scene.patches.length;
              const isSelected = selectedSceneId === scene.id;

              return (
                <SceneCard
                  key={scene.id}
                  scene={scene}
                  isSelected={isSelected}
                  discovered={discovered}
                  total={total}
                  onClick={handleSceneClick}
                />
              );
            })}
          </div>
        </div>

        {/* Difficulty selection — appears after scene is selected */}
        {selectedSceneId && (
          <div className="w-full max-w-2xl mb-10">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
              {t("pages.levelSelect.difficultyHeading")}
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {DIFFICULTIES.map(({ value }) => {
                const isSelected = selectedDifficulty === value;
                return (
                  <DifficultyCard
                    key={value}
                    value={value}
                    isSelected={isSelected}
                    onChange={(val) => setSelectedDifficulty(val)}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Start button — appears when both are selected */}
        {selectedSceneId && selectedDifficulty && (
          <button
            onClick={handleStart}
            className="bg-white text-slate-900 font-bold text-lg px-10 py-3 rounded-xl hover:bg-slate-200 transition-colors"
          >
            {t("pages.levelSelect.play")}
          </button>
        )}
      </main>
    </div>
  );
}
