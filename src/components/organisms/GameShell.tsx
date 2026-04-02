import { useState, useRef, useEffect, type ReactNode } from "react";
import { html as beautifyHtml } from "js-beautify";
import { useShikiHighlight } from "../../hooks/useShikiHighlight";

type Tab = "vorschau" | "quellcode";

function serializeScene(innerHTML: string, sceneName: string): string {
  const stub = `<!DOCTYPE html>
<html lang="de">
  <head>
    <title>${sceneName}</title>
  </head>
  <body>
    <main>
      ${innerHTML}
    </main>
  </body>
</html>`;
  return beautifyHtml(stub, {
    indent_size: 2,
    wrap_line_length: 0,
    end_with_newline: true,
  });
}

function stripClasses(html: string): string {
  return html.replace(/class="[^"]*"/g, 'class="…"');
}

export function GameLayout({
  children,
  sceneName,
}: {
  children: ReactNode;
  sceneName: string;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("vorschau");
  const [serializedHtml, setSerializedHtml] = useState<string>("");
  const [showClasses, setShowClasses] = useState(false);
  const vorschauTabRef = useRef<HTMLButtonElement>(null);
  const quellcodeTabRef = useRef<HTMLButtonElement>(null);
  const sceneContentRef = useRef<HTMLDivElement>(null);

  const displayHtml = showClasses
    ? serializedHtml
    : stripClasses(serializedHtml);
  const highlightedHtml = useShikiHighlight(displayHtml);

  useEffect(() => {
    if (activeTab === "quellcode" && sceneContentRef.current) {
      setSerializedHtml(serializeScene(sceneContentRef.current.innerHTML, sceneName));
    }
  }, [activeTab, sceneName]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      setActiveTab("quellcode");
      quellcodeTabRef.current?.focus();
    } else if (e.key === "ArrowLeft") {
      setActiveTab("vorschau");
      vorschauTabRef.current?.focus();
    }
  };

  const codeClasses =
    "overflow-auto p-4 text-xs font-mono leading-relaxed whitespace-pre-wrap break-words";

  return (
    <section
      className="flex-1 flex items-start justify-center p-8"
      aria-label="Spielbereich"
    >
      <div className="w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl border border-slate-300">
        <div className="bg-slate-200 px-4 py-2 flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="w-3 h-3 rounded-full bg-red-400 block" />
            <span className="w-3 h-3 rounded-full bg-yellow-400 block" />
            <span className="w-3 h-3 rounded-full bg-green-400 block" />
          </div>
          <div
            role="tablist"
            aria-label="Ansicht wählen"
            className="flex gap-1"
            onKeyDown={handleKeyDown}
          >
            <button
              ref={vorschauTabRef}
              role="tab"
              id="tab-vorschau"
              aria-selected={activeTab === "vorschau"}
              aria-controls="panel-vorschau"
              tabIndex={activeTab === "vorschau" ? 0 : -1}
              onClick={() => setActiveTab("vorschau")}
              className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                activeTab === "vorschau"
                  ? "bg-white text-slate-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Vorschau
            </button>
            <button
              ref={quellcodeTabRef}
              role="tab"
              id="tab-quellcode"
              aria-selected={activeTab === "quellcode"}
              aria-controls="panel-quellcode"
              tabIndex={activeTab === "quellcode" ? 0 : -1}
              onClick={() => setActiveTab("quellcode")}
              className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                activeTab === "quellcode"
                  ? "bg-white text-slate-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Quellcode
            </button>
          </div>
          <div
            className="flex-1 bg-white rounded px-3 py-1 text-xs text-slate-500 font-mono select-none"
            aria-hidden="true"
          >
            https://anomalie-jagd.local
          </div>
        </div>

        <div
          role="tabpanel"
          id="panel-vorschau"
          aria-labelledby="tab-vorschau"
          hidden={activeTab !== "vorschau"}
        >
          <div ref={sceneContentRef} className="bg-white">
            {children}
          </div>
        </div>

        <div
          role="tabpanel"
          id="panel-quellcode"
          aria-labelledby="tab-quellcode"
          hidden={activeTab !== "quellcode"}
          className="bg-white"
        >
          <div className="flex items-center gap-2 px-4 pt-3 pb-1 border-b border-slate-100">
            <button
              aria-pressed={!showClasses}
              aria-label={
                showClasses ? "CSS-Klassen ausblenden" : "CSS-Klassen anzeigen"
              }
              onClick={() => setShowClasses((v) => !v)}
              className={`px-2 py-0.5 text-xs rounded border font-mono transition-colors ${
                !showClasses
                  ? "bg-slate-700 text-white border-slate-700"
                  : "bg-white text-slate-500 border-slate-300 hover:border-slate-400"
              }`}
            >
              class="…"
            </button>
          </div>
          {highlightedHtml ? (
            <div
              className={`${codeClasses} [&_pre]:bg-white! [&_pre]:m-0! [&_pre]:p-0! [&_pre]:whitespace-pre-wrap! [&_pre]:wrap-break-word!`}
              dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            />
          ) : (
            <pre className={`${codeClasses} text-slate-800`}>
              <code>{displayHtml}</code>
            </pre>
          )}
        </div>
      </div>
    </section>
  );
}
