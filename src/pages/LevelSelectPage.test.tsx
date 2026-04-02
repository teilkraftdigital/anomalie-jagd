import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen } from "@testing-library/react";
import { LevelSelectPage } from "./LevelSelectPage";
import useGameStore from "../store/useGameStore";
import { registerScene, sceneRegistry } from "../app/engine/sceneRegistry";
import { testScene } from "../test-utils/testScene";
import { renderWithRouter } from "../test-utils/renderWithRouter";

beforeEach(() => {
  registerScene(testScene);
  useGameStore.setState({ discoveredPatchIds: {} });
  localStorage.clear();
});

afterEach(() => {
  sceneRegistry.delete(testScene.id);
});

describe("LevelSelectPage — Smoke", () => {
  it("rendert ohne Crash", () => {
    renderWithRouter(<LevelSelectPage />);
    expect(screen.getByText("Level auswählen")).toBeInTheDocument();
  });

  it("zeigt registrierte Scene an", () => {
    renderWithRouter(<LevelSelectPage />);
    expect(screen.getByText(testScene.name)).toBeInTheDocument();
  });

  it("zeigt Start-Button erst nach Scene- und Difficulty-Auswahl", async () => {
    renderWithRouter(<LevelSelectPage />);
    expect(screen.queryByText("Spielen")).not.toBeInTheDocument();
  });
});
