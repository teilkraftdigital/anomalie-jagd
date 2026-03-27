import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GameLayout } from "../app/layout/GameShell";
import { Toolbar } from "../app/layout/Toolbar";
import { DebugBar } from "../app/layout/partials/DebugBar";
import { getScene, listScenes } from "../app/engine/sceneRegistry";
import useGameStore from "../store/useGameStore";

export function GamePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isDebug = searchParams.get("debug") === "true";

  // Debug state lives in URL params
  const scenes = listScenes();
  const debugSceneId = searchParams.get("scene") ?? scenes[0]?.id ?? "";
  const debugPatchId = searchParams.get("patch") ?? null;

  function handleDebugSceneChange(sceneId: string) {
    setSearchParams({ debug: "true", scene: sceneId });
  }

  function handleDebugPatchChange(patchId: string | null) {
    const next: Record<string, string> = { debug: "true", scene: debugSceneId };
    if (patchId) next.patch = patchId;
    setSearchParams(next);
  }

  // Game store
  const currentSceneId = useGameStore((s) => s.currentSceneId);
  const activePatchId = useGameStore((s) => s.activePatchId);
  const allPatches = useGameStore((s) => s.allPatches);
  const currentRound = useGameStore((s) => s.currentRound);
  const lastGuessResult = useGameStore((s) => s.lastGuessResult);
  const clearLastGuessResult = useGameStore((s) => s.clearLastGuessResult);

  // Guard: redirect if no active game (skipped in debug mode)
  useEffect(() => {
    if (!isDebug && !currentSceneId)
      navigate("/level-select", { replace: true });
  }, [currentSceneId, isDebug]);

  // Auto-advance after feedback toast
  useEffect(() => {
    if (lastGuessResult === null) return;
    const t = setTimeout(() => {
      clearLastGuessResult();
      if (currentRound > 6) navigate("/glossar");
    }, 1500);
    return () => clearTimeout(t);
  }, [lastGuessResult]);

  if (!isDebug && !currentSceneId) return null;

  // Resolve scene + model
  const sceneId = isDebug ? debugSceneId : currentSceneId!;
  const scene = getScene(sceneId);
  const baseModel = scene.createBaseModel();

  const resolvedPatchId = isDebug ? debugPatchId : activePatchId;
  const patchSource = isDebug ? scene.patches : allPatches;
  const activePatch = resolvedPatchId
    ? (patchSource.find((p) => p.id === resolvedPatchId) ?? null)
    : null;
  const model = activePatch ? activePatch.apply(baseModel) : baseModel;
  const SceneRenderer = scene.render;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {isDebug ? (
        <DebugBar
          sceneId={debugSceneId}
          patchId={debugPatchId}
          onSceneChange={handleDebugSceneChange}
          onPatchChange={handleDebugPatchChange}
        />
      ) : (
        <Toolbar />
      )}

      {/* Round 1 hint banner */}
      {!isDebug && currentRound === 1 && (
        <div className="bg-blue-50 border-b border-blue-200 text-blue-800 text-sm text-center py-2 px-4">
          Runde 1: Schau dir die Scene genau an — hier gibt es noch keine
          Anomalie.
        </div>
      )}

      <GameLayout>
        <SceneRenderer
          key={isDebug ? `${debugSceneId}-${debugPatchId}` : currentRound}
          model={model}
        />
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
