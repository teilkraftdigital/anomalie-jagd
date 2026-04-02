import { useTranslation } from "react-i18next";
import type { Difficulty } from "../../app/engine/Scene";

type Props = {
  severity: Difficulty;
};

const variantClass: Record<Difficulty, string> = {
  easy: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  hard: "bg-red-100 text-red-700",
};

export function SeverityBadge({ severity }: Props) {
  const { t } = useTranslation();
  return (
    <span
      className={`shrink-0 text-xs font-mono px-2 py-1 rounded-full ${variantClass[severity]}`}
    >
      {t(`severity.${severity}`)}
    </span>
  );
}
