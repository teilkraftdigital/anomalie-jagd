import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGameStore from "../store/useGameStore";
import { isGameOver } from "../app/engine/roundLogic";

/**
 * Manages the active game session: store selectors, guard redirect,
 * and auto-advance after the feedback toast.
 */
export function useGameSession() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isDebug = searchParams.get("debug") === "true";

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
    // navigate is a stable ref from react-router — safe to omit
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSceneId, isDebug]);

  // Auto-advance after feedback toast. navigate and clearLastGuessResult are
  // stable refs; currentRound is read only when lastGuessResult fires.
  useEffect(() => {
    if (lastGuessResult === null) return;
    if (isGameOver(currentRound)) {
      clearLastGuessResult();
      navigate("/glossar");
      return;
    }
    const t = setTimeout(() => clearLastGuessResult(), 2000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastGuessResult]);

  return {
    ready: isDebug || !!currentSceneId,
    currentSceneId,
    activePatchId,
    allPatches,
    currentRound,
    lastGuessResult,
  };
}
