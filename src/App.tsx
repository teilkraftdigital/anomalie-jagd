import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import type { Scene } from "./app/engine/Scene";
import { buttonScene } from "./app/scenes/button";
import { formScene } from "./app/scenes/form";
import { StartPage } from "./pages/StartPage";
import { GamePage } from "./pages/GamePage";
import { LevelSelectPage } from "./pages/LevelSelectPage";
import { GlossarPage } from "./pages/GlossarPage";
import { sceneRegistry, registerScene } from "./app/engine/sceneRegistry";

// Register scenes at module load time so they are available before first render
if (!sceneRegistry.has(buttonScene.id))
  registerScene(buttonScene as Scene<any>);
if (!sceneRegistry.has(formScene.id)) registerScene(formScene as Scene<any>);

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
