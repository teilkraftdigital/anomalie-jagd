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
  }, [currentSceneId, isDebug]);

  // Auto-advance after feedback toast
  useEffect(() => {
    if (lastGuessResult === null) return;
    if (isGameOver(currentRound)) {
      clearLastGuessResult();
      navigate("/glossar");
      return;
    }
    const t = setTimeout(() => {
      clearLastGuessResult();
    }, 2000);
    return () => clearTimeout(t);
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
