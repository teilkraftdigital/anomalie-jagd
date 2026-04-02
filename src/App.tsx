import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import type { Scene } from "./app/engine/Scene";
import { buttonScene } from "./app/scenes/button";
import { formScene } from "./app/scenes/form";
import { sceneRegistry, registerScene } from "./app/engine/sceneRegistry";

// Register scenes at module load time so they are available before first render
if (!sceneRegistry.has(buttonScene.id))
  registerScene(buttonScene as Scene<any>);
if (!sceneRegistry.has(formScene.id))
  registerScene(formScene as Scene<any>);

const StartPage = lazy(() =>
  import("./pages/StartPage").then((m) => ({ default: m.StartPage })),
);
const GamePage = lazy(() =>
  import("./pages/GamePage").then((m) => ({ default: m.GamePage })),
);
const LevelSelectPage = lazy(() =>
  import("./pages/LevelSelectPage").then((m) => ({
    default: m.LevelSelectPage,
  })),
);
const GlossarPage = lazy(() =>
  import("./pages/GlossarPage").then((m) => ({ default: m.GlossarPage })),
);

export default function App() {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/spiel" element={<GamePage />} />
          <Route path="/level-select" element={<LevelSelectPage />} />
          <Route path="/glossar" element={<GlossarPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
