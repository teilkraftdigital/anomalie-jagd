import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import type { Scene } from "./app/engine/Scene";
// import { buttonScene, locales as buttonLocales } from "./app/scenes/button";
import { formScene, locales as formLocales } from "./app/scenes/form";
import { StartPage } from "./pages/StartPage";
import { GamePage } from "./pages/GamePage";
import { LevelSelectPage } from "./pages/LevelSelectPage";
import { GlossarPage } from "./pages/GlossarPage";
import { sceneRegistry, registerScene } from "./app/engine/sceneRegistry";
import i18n from "./i18n/config";

// Register i18n namespaces for scenes
// i18n.addResourceBundle("de", "scene-button", buttonLocales.de);
// i18n.addResourceBundle("en", "scene-button", buttonLocales.en);
i18n.addResourceBundle("de", "scene-form", formLocales.de);
i18n.addResourceBundle("en", "scene-form", formLocales.en);

// Register scenes at module load time so they are available before first render
// if (!sceneRegistry.has(buttonScene.id))
//   registerScene(buttonScene as Scene<any>);
if (!sceneRegistry.has(formScene.id)) registerScene(formScene as Scene<any>);

export default function App() {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/level-select" element={<LevelSelectPage />} />
          <Route path="/glossar" element={<GlossarPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
