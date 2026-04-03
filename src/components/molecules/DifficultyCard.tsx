import { useTranslation } from "react-i18next";
import type { Difficulty } from "../../app/engine/Scene";

export type DifficultyCardProps = {
  isSelected: boolean;
  value: Difficulty;
  onChange: (value: Difficulty) => void;
};

export default function DifficultyCard({
  isSelected,
  value,
  onChange,
}: DifficultyCardProps) {
  const { t } = useTranslation();
  return (
    <label
      className={`text-left rounded-xl border px-4 py-3 transition-all ${
        isSelected
          ? "border-white bg-slate-700"
          : "border-slate-600 bg-slate-800 hover:bg-slate-700"
      }`}
    >
      <div className="font-bold">{t(`difficulty.${value}.label`)}</div>
      <div className="text-slate-300 text-xs mt-1">
        {t(`difficulty.${value}.description`)}
      </div>
      <input
        type="radio"
        id={`difficulty-${value}`}
        name="difficulty"
        value={value}
        checked={isSelected}
        key={value}
        onChange={() => onChange(value)}
        className="w-0 h-0 opacity-0 absolute"
      />
    </label>
  );
}
