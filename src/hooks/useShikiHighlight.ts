import { useState, useEffect } from "react";

// Lazy singleton — wird erst geladen wenn der Quellcode-Tab erstmals geöffnet wird
let highlighterPromise: Promise<any> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = Promise.all([
      import("shiki/core"),
      import("shiki/engine/javascript"),
      import("shiki/langs/html.mjs"),
      import("shiki/themes/github-light.mjs"),
    ]).then(
      ([
        { createHighlighterCore },
        { createJavaScriptRegexEngine },
        htmlLang,
        githubLightTheme,
      ]) =>
        createHighlighterCore({
          langs: [htmlLang.default],
          themes: [githubLightTheme.default],
          engine: createJavaScriptRegexEngine(),
        }),
    );
  }
  return highlighterPromise;
}

export function useShikiHighlight(code: string) {
  const [highlighted, setHighlighted] = useState<string>("");

  useEffect(() => {
    if (!code) return;
    let cancelled = false;
    getHighlighter().then((highlighter) => {
      if (!cancelled) {
        setHighlighted(
          highlighter.codeToHtml(code, { lang: "html", theme: "github-light" }),
        );
      }
    });
    return () => {
      cancelled = true;
    };
  }, [code]);

  return highlighted;
}
