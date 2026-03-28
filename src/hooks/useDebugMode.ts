import { useSearchParams } from "react-router-dom";
import { listScenes } from "../app/engine/sceneRegistry";
import useGameStore from "../store/useGameStore";

export type DebugMode = {
  isDebug: boolean;
  debugSceneId: string;
  debugPatchId: string | null;
  handleDebugSceneChange: (sceneId: string) => void;
  handleDebugPatchChange: (patchId: string | null) => void;
};

/**
 * Encapsulates all URL-param logic for debug mode.
 * Falls back to the active game scene when no scene param is set.
 */
export function useDebugMode(): DebugMode {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSceneId = useGameStore((s) => s.currentSceneId);

  const isDebug = searchParams.get("debug") === "true";
  const scenes = listScenes();
  const debugSceneId =
    searchParams.get("scene") ?? currentSceneId ?? scenes[0]?.id ?? "";
  const debugPatchId = searchParams.get("patch") ?? null;

  function handleDebugSceneChange(sceneId: string) {
    setSearchParams({ debug: "true", scene: sceneId });
  }

  function handleDebugPatchChange(patchId: string | null) {
    const next: Record<string, string> = { debug: "true", scene: debugSceneId };
    if (patchId) next.patch = patchId;
    setSearchParams(next);
  }

  return {
    isDebug,
    debugSceneId,
    debugPatchId,
    handleDebugSceneChange,
    handleDebugPatchChange,
  };
}
