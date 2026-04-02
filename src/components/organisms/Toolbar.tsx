import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useGameStore from "../../store/useGameStore";
import { RoundDisplay } from "../atoms/RoundDisplay";

export function Toolbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentRound = useGameStore((s) => s.currentRound);
  const difficulty = useGameStore((s) => s.difficulty);
  const lastGuessResult = useGameStore((s) => s.lastGuessResult);
  const guess = useGameStore((s) => s.guess);
  const quitGame = useGameStore((s) => s.quitGame);

  const disabled = lastGuessResult !== null || currentRound === 0;

  function handleQuit() {
    quitGame();
    navigate("/level-select");
  }

  return (
    <header className="bg-slate-900 text-white px-6 py-3">
      <div className="grid grid-cols-3 items-center gap-3">
        <div className="flex items-center gap-4">
          <button
            onClick={handleQuit}
            aria-label={t("toolbar.quit")}
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >
            <span aria-hidden="true">←</span> {t("toolbar.quit")}
          </button>
          <RoundDisplay currentRound={currentRound} />
        </div>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => guess(true)}
            disabled={disabled}
            className="bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-5 py-2 rounded-lg transition-colors"
          >
            {t("toolbar.anomaly")}
          </button>
          <button
            onClick={() => guess(false)}
            disabled={disabled}
            className="bg-green-700 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-5 py-2 rounded-lg transition-colors"
          >
            {t("toolbar.noAnomaly")}
          </button>
        </div>
        <span className="text-sm text-slate-400 capitalize text-right">
          {difficulty ? t(`difficulty.${difficulty}.label`) : "–"}
        </span>
      </div>
    </header>
  );
}
