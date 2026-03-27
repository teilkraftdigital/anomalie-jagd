import type { ReactNode } from "react";

export function GameLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 flex items-start justify-center p-8">
      <div className="w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl border border-slate-300">
        <div className="bg-slate-200 px-4 py-2 flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400 block" />
            <span className="w-3 h-3 rounded-full bg-yellow-400 block" />
            <span className="w-3 h-3 rounded-full bg-green-400 block" />
          </div>
          <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-slate-400 font-mono">
            https://a11y-hunt.local
          </div>
        </div>
        <div className="bg-white">{children}</div>
      </div>
    </div>
  );
}
