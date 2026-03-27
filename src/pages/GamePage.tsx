import { GameLayout } from "../app/layout/GameShell";
import { Toolbar } from "../app/layout/Toolbar";

export function GamePage() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Toolbar />
      <GameLayout>
        <h1 className="text-3xl font-bold mb-4 tracking-tight">Spielseite</h1>
      </GameLayout>
    </div>
  );
}
