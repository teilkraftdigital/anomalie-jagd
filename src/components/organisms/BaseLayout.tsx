import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink } from "lucide-react";

export function BaseLayout({
  navItems,
  children,
}: {
  navItems?: ReactNode;
  children: ReactNode;
}) {
  const { t, i18n } = useTranslation();

  function handleLangToggle(next: "en" | "de") {
    i18n.changeLanguage(next);
    localStorage.setItem("lang", next);
  }

  function isLangActive(lang: "en" | "de") {
    return i18n.language.startsWith(lang);
  }

  return (
    <div className="bg-slate-900 flex">
      <div className="mx-auto max-w-4xl container text-white px-4 min-h-screen flex flex-col">
        <header
          className={`py-4 flex ${navItems ? "justify-between" : "justify-end"} items-center`}
        >
          {navItems && (
            <nav aria-label={t("pages.common.navigation")} className="mr-auto">
              {navItems}
            </nav>
          )}
          <aside
            aria-label={t("lang.label")}
            className="flex items-center gap-2"
          >
            <button
              onClick={() => handleLangToggle("en")}
              aria-label={t("lang.labelEn")}
              className={`${isLangActive("en") ? "text-white" : "text-slate-400 hover:text-white"} text-sm font-mono transition-colors`}
              lang="en"
              aria-pressed={isLangActive("en") ? "true" : undefined}
            >
              {t("lang.switchToEn")}
            </button>
            <span className="text-slate-600" aria-hidden="true">
              /
            </span>
            <button
              onClick={() => handleLangToggle("de")}
              aria-label={t("lang.labelDe")}
              className={`${isLangActive("de") ? "text-white" : "text-slate-400 hover:text-white"} text-sm font-mono transition-colors`}
              lang="de"
              aria-pressed={isLangActive("de") ? "true" : undefined}
            >
              {t("lang.switchToDe")}
            </button>
          </aside>
        </header>

        <main className="min-h-[60vh] flex items-center flex-col grow">
          {children}
        </main>

        <footer className="text-slate-400 text-sm font-mono flex justify-between py-6  ">
          <div>
            v{__APP_VERSION__} - {t("pages.start.footerBy")}{" "}
            <a
              href="https://teilkraft.digital?utm_source=anomalie-jagd"
              className="underline hover:text-white"
            >
              teil:kraft digital
            </a>
          </div>
          <nav>
            <ul className="flex gap-4">
              <li className="">
                <a
                  href="https://teilkraft.digital/rechtliches/impressum"
                  target="_blank"
                  className="underline hover:text-white flex items-center gap-1"
                >
                  {t("pages.start.footerImprint")}
                  <span className="size-4 ml-0.5">
                    <ExternalLink size={16} aria-hidden="true" />
                    <span className="sr-only">
                      {t("pages.common.openInNewTab")}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://teilkraft.digital/rechtliches/datenschutz"
                  target="_blank"
                  className="underline hover:text-white flex items-center gap-1"
                >
                  {t("pages.start.footerPrivacy")}
                  <span className="size-4 ml-0.5">
                    <ExternalLink size={16} aria-hidden="true" />
                    <span className="sr-only">
                      {t("pages.common.openInNewTab")}
                    </span>
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </footer>
      </div>
    </div>
  );
}
