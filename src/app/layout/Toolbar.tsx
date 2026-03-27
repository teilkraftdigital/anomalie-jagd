export function Toolbar() {
  return (
    <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between">
      <p className="text-sm font-mono text-slate-400">
        Runde <span className="text-white font-bold">0</span>
        /0
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => {}}
          disabled={() => {}}
          className="bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-semibold px-5 py-2 rounded-lg transition-colors"
        >
          Anomalie gefunden
        </button>
        <button
          onClick={() => {}}
          disabled={() => {}}
          className="bg-green-700 hover:bg-green-600 disabled:opacity-50 text-white font-semibold px-5 py-2 rounded-lg transition-colors"
        >
          Keine Anomalie
        </button>
      </div>

      <span className="text-sm text-slate-400 capitalize">Difficulty</span>
    </div>
  );
}
