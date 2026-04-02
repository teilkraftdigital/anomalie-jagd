import { useState, useRef, useEffect, type ReactNode } from "react";
import { html as beautifyHtml } from "js-beautify";

type Tab = "vorschau" | "quellcode";

function serializeScene(innerHTML: string): string {
  const stub = `<!DOCTYPE html>
<html lang="de">
  <head>
    <title>Anomalie-Jagd</title>
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

export function GameLayout({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<Tab>("vorschau");
  const [serializedHtml, setSerializedHtml] = useState<string>("");
  const vorschauTabRef = useRef<HTMLButtonElement>(null);
  const quellcodeTabRef = useRef<HTMLButtonElement>(null);
  const sceneContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab === "quellcode" && sceneContentRef.current) {
      setSerializedHtml(serializeScene(sceneContentRef.current.innerHTML));
    }
  }, [activeTab]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      setActiveTab("quellcode");
      quellcodeTabRef.current?.focus();
    } else if (e.key === "ArrowLeft") {
      setActiveTab("vorschau");
      vorschauTabRef.current?.focus();
    }
  };

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
          <pre className="overflow-auto p-4 text-xs leading-relaxed text-slate-800 font-mono">
            <code>{serializedHtml}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
