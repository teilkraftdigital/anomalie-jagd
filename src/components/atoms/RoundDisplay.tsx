import { useTranslation } from "react-i18next";
import { GAME_ROUNDS } from "../../app/engine/roundLogic";

type Props = {
  currentRound: number;
};

export function RoundDisplay({ currentRound }: Props) {
  const { t } = useTranslation();
  return (
    <output className="text-sm font-mono text-slate-400">
      {t("round.label", { current: currentRound, total: GAME_ROUNDS })}
    </output>
  );
}
