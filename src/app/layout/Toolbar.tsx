import { useNavigate } from "react-router-dom";
import useGameStore from "../../store/useGameStore";

export function Toolbar() {
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
    <header className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={handleQuit}
          aria-label="Aufgeben"
          className="text-slate-400 hover:text-white text-sm transition-colors"
        >
          <span aria-hidden="true">←</span> Aufgeben
        </button>
        <output className="text-sm font-mono text-slate-400">
          Runde <span className="text-white font-bold">{currentRound}</span>/6
        </output>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => guess(true)}
          disabled={disabled}
          className="bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-5 py-2 rounded-lg transition-colors"
        >
          Anomalie gefunden
        </button>
        <button
          onClick={() => guess(false)}
          disabled={disabled}
          className="bg-green-700 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-5 py-2 rounded-lg transition-colors"
        >
          Keine Anomalie
        </button>
      </div>

      <span className="text-sm text-slate-400 capitalize">
        {difficulty ?? "–"}
      </span>
    </header>
  );
}
