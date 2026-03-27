import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GameLayout } from "../app/layout/GameShell";
import { Toolbar } from "../app/layout/Toolbar";
import { getScene } from "../app/engine/sceneRegistry";
import useGameStore from "../store/useGameStore";

export function GamePage() {
  const navigate = useNavigate();
  const currentSceneId = useGameStore((s) => s.currentSceneId);
  const activePatchId = useGameStore((s) => s.activePatchId);
  const allPatches = useGameStore((s) => s.allPatches);
  const currentRound = useGameStore((s) => s.currentRound);
  const lastGuessResult = useGameStore((s) => s.lastGuessResult);
  const clearLastGuessResult = useGameStore((s) => s.clearLastGuessResult);

  // Guard: redirect if no active game
  useEffect(() => {
    if (!currentSceneId) navigate("/level-select", { replace: true });
  }, [currentSceneId]);

  // Auto-advance after feedback toast
  useEffect(() => {
    if (lastGuessResult === null) return;
    const t = setTimeout(() => {
      clearLastGuessResult();
      if (currentRound > 6) {
        navigate("/glossar");
      }
    }, 1500);
    return () => clearTimeout(t);
  }, [lastGuessResult]);

  if (!currentSceneId) return null;

  const scene = getScene(currentSceneId);
  const baseModel = scene.createBaseModel();
  const activePatch = activePatchId
    ? allPatches.find((p) => p.id === activePatchId)
    : null;
  const model = activePatch ? activePatch.apply(baseModel) : baseModel;
  const SceneRenderer = scene.render;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Toolbar />
      <GameLayout>
        <SceneRenderer model={model} />
      </GameLayout>

      {/* Feedback toast */}
      {lastGuessResult !== null && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`text-white text-2xl font-bold px-8 py-4 rounded-2xl shadow-xl ${
              lastGuessResult === "correct" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {lastGuessResult === "correct" ? "Richtig!" : "Leider falsch!"}
          </div>
        </div>
      )}
    </div>
  );
}
