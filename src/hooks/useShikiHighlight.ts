import { useState, useEffect } from "react";
import { codeToHtml } from "shiki";

export function useShikiHighlight(code: string) {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    if (!code) return;
    let cancelled = false;
    codeToHtml(code, { lang: "html", theme: "github-light" }).then((result) => {
      if (!cancelled) setHtml(result);
    });
    return () => {
      cancelled = true;
    };
  }, [code]);

  return html;
}
