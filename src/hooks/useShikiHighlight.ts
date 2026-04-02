import { useState, useEffect } from "react";
import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import html from "shiki/langs/html.mjs";
import githubLight from "shiki/themes/github-light.mjs";

const highlighterPromise = createHighlighterCore({
  langs: [html],
  themes: [githubLight],
  engine: createJavaScriptRegexEngine(),
});

export function useShikiHighlight(code: string) {
  const [highlighted, setHighlighted] = useState<string>("");

  useEffect(() => {
    if (!code) return;
    let cancelled = false;
    highlighterPromise.then((highlighter) => {
      if (!cancelled) {
        setHighlighted(
          highlighter.codeToHtml(code, {
            lang: "html",
            theme: "github-light",
          }),
        );
      }
    });
    return () => {
      cancelled = true;
    };
  }, [code]);

  return highlighted;
}
