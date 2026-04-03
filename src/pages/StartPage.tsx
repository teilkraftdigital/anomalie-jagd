import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BaseLayout } from "../components/organisms/BaseLayout";

export function StartPage() {
  const { t } = useTranslation();

  const steps = t("pages.start.steps", { returnObjects: true }) as string[];

  return (
    <BaseLayout>
      <h1 className="text-5xl font-bold mb-4 tracking-tight">anomalie jagd</h1>
      <p className="text-slate-400 text-lg mb-10 max-w-md text-center">
        {t("pages.start.subtitle")}
      </p>

      <ol className="flex flex-col gap-3 mb-10 max-w-md w-full">
        {steps.map((text, i) => (
          <li key={i} className="flex gap-4 items-start">
            <span
              className="shrink-0 w-7 h-7 rounded-full bg-slate-700 text-slate-300 text-sm font-bold flex items-center justify-center"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <p className="text-slate-300 text-sm leading-relaxed">{text}</p>
          </li>
        ))}
      </ol>

      <Link
        to="/level-select"
        className="bg-white text-slate-900 font-bold px-8 py-3 rounded-lg hover:bg-slate-200 motion-safe:transition-colors"
      >
        {t("pages.start.play")}
      </Link>
      <Link
        to="/glossar"
        className="mt-4 text-slate-400 hover:text-white text-sm motion-safe:transition-colors"
      >
        {t("pages.start.glossar")}
      </Link>
    </BaseLayout>
  );
}
