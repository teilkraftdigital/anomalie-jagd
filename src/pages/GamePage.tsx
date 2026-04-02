import { GameLayout } from "../components/organisms/GameShell";
import { Toolbar } from "../components/organisms/Toolbar";
import { DebugBar } from "../components/organisms/DebugBar";
import { getScene } from "../app/engine/sceneRegistry";
import { useGameSession } from "../hooks/useGameSession";
import { useDebugMode } from "../hooks/useDebugMode";

export function GamePage() {
  const {
    ready,
    currentSceneId,
    activePatchId,
    allPatches,
    currentRound,
    lastGuessResult,
  } = useGameSession();

  const {
    isDebug,
    debugSceneId,
    debugPatchId,
    handleDebugSceneChange,
    handleDebugPatchChange,
  } = useDebugMode();

  if (!ready) return null;

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

      <main>
        {/* Round 1 hint banner */}
        {!isDebug && currentRound === 1 && (
          <div
            role="status"
            className="bg-blue-50 border-b border-blue-200 text-blue-800 text-sm text-center py-2 px-4"
          >
            Runde 1: Schau dir die Scene genau an — hier gibt es noch keine
            Anomalie.
          </div>
        )}

        <GameLayout sceneName={scene.name}>
          <SceneRenderer
            key={isDebug ? `${debugSceneId}-${debugPatchId}` : currentRound}
            model={model}
          />
        </GameLayout>
      </main>

      {/* Feedback toast */}
      {lastGuessResult !== null && (
        <div
          role="status"
          className="fixed inset-0 flex items-center justify-center pointer-events-none"
        >
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
