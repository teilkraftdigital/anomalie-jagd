import { Link } from "react-router-dom";

const steps = [
  {
    number: "1",
    text: "Du siehst eine simulierte Webkomponente — interagiere damit und schau genau hin.",
  },
  {
    number: "2",
    text: 'Entscheide: Enthält sie eine Barrierefreiheits-Anomalie? Klick auf "Anomalie gefunden" oder "Keine Anomalie".',
  },
  {
    number: "3",
    text: "Richtig → nächste Runde. Falsch → von vorne. Schaffst du alle 6 Runden?",
  },
];

export function StartPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white px-4">
      <h1 className="text-5xl font-bold mb-4 tracking-tight">anomalie jagd</h1>
      <p className="text-slate-400 text-lg mb-10 max-w-md text-center">
        Kannst du die Barrierefreiheits-Fehler finden, bevor sie anderen
        auffallen?
      </p>

      <ol className="flex flex-col gap-3 mb-10 max-w-md w-full">
        {steps.map((step) => (
          <li key={step.number} className="flex gap-4 items-start">
            <span className="shrink-0 w-7 h-7 rounded-full bg-slate-700 text-slate-300 text-sm font-bold flex items-center justify-center" aria-hidden="true">
              {step.number}
            </span>
            <p className="text-slate-300 text-sm leading-relaxed">{step.text}</p>
          </li>
        ))}
      </ol>

      <Link
        to="/level-select"
        className="bg-white text-slate-900 font-bold px-8 py-3 rounded-lg hover:bg-slate-200 transition-colors"
      >
        Spielen
      </Link>
      <Link
        to="/glossar"
        className="mt-4 text-slate-400 hover:text-white text-sm transition-colors"
      >
        Glossar ansehen
      </Link>
    </div>
  );
}
