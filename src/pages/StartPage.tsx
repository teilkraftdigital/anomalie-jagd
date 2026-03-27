import { Link } from "react-router-dom";

export function StartPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="text-5xl font-bold mb-4 tracking-tight">a11y hunt</h1>
      <p className="text-slate-400 text-lg mb-12 max-w-md text-center">
        Kannst du die Barrierefreiheits-Fehler finden, bevor sie anderen
        auffallen?
      </p>
      <Link
        to="/level-select"
        className="bg-white text-slate-900 font-bold px-8 py-3 rounded-lg hover:bg-slate-200 transition-colors"
      >
        Spielen
      </Link>
    </div>
  );
}
