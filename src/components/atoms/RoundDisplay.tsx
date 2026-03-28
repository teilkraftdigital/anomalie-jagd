import { GAME_ROUNDS } from "../../app/engine/roundLogic";

type Props = {
  currentRound: number;
};

export function RoundDisplay({ currentRound }: Props) {
  return (
    <output className="text-sm font-mono text-slate-400">
      Runde <span className="text-white font-bold">{currentRound}</span>/
      {GAME_ROUNDS}
    </output>
  );
}
