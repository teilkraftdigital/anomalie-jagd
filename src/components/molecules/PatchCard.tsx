import { useTranslation } from "react-i18next";
import type { Patch } from "../../app/engine/Scene";
import { SeverityBadge } from "../atoms/SeverityBadge";

type Props = {
  patch: Patch<any>;
  discovered: boolean;
  isNew: boolean;
};

export function PatchCard({ patch, discovered, isNew }: Props) {
  const { t } = useTranslation();
  return (
    <li
      className={`rounded-xl border p-5 transition-all ${
        isNew
          ? "border-green-400 bg-green-50 shadow-md"
          : discovered
            ? "border-slate-200 bg-white"
            : "border-slate-200 bg-white opacity-40"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          {isNew && (
            <span className="inline-block bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded mb-2">
              {t("pages.glossar.newBadge")}
            </span>
          )}
          <h2 className="font-semibold text-slate-900">{patch.label}</h2>
          {discovered ? (
            <p className="text-slate-600 text-sm mt-1">{patch.explanation}</p>
          ) : (
            <p className="text-slate-400 text-sm mt-1 italic">
              {t("pages.glossar.notDiscovered")}
            </p>
          )}
        </div>
        <SeverityBadge severity={patch.severity} />
      </div>
    </li>
  );
}
