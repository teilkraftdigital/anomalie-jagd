import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function StartPage() {
  const { t, i18n } = useTranslation();

  function handleLangToggle() {
    const next = i18n.language.startsWith("de") ? "en" : "de";
    i18n.changeLanguage(next);
    localStorage.setItem("lang", next);
  }

  const steps = t("pages.start.steps", { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white px-4">
      <button
        onClick={handleLangToggle}
        aria-label={t("lang.label")}
        className="absolute top-4 right-6 text-slate-400 hover:text-white text-sm font-mono transition-colors"
      >
        {t("lang.switchTo")}
      </button>

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
        className="bg-white text-slate-900 font-bold px-8 py-3 rounded-lg hover:bg-slate-200 transition-colors"
      >
        {t("pages.start.play")}
      </Link>
      <Link
        to="/glossar"
        className="mt-4 text-slate-400 hover:text-white text-sm transition-colors"
      >
        {t("pages.start.glossar")}
      </Link>

      <footer className="absolute bottom-4 text-slate-400 text-xs font-mono">
        v{__APP_VERSION__} - {t("pages.start.footerBy")}{" "}
        <a
          href="https://teilkraft.digital?utm_source=anomalie-jagd"
          className="underline hover:text-white"
        >
          teil:kraft digital
        </a>
      </footer>
    </div>
  );
}
