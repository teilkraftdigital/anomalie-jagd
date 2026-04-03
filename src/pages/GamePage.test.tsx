import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen } from "@testing-library/react";
import { GamePage } from "./GamePage";
import useGameStore from "../store/useGameStore";
import { registerScene, sceneRegistry } from "../app/engine/sceneRegistry";
import { testScene } from "../test-utils/testScene";
import { renderWithRouter } from "../test-utils/renderWithRouter";

beforeEach(() => {
  registerScene(testScene);
  useGameStore.setState({
    currentSceneId: testScene.id,
    currentRound: 1,
    activePatchId: null,
    allPatches: testScene.patches,
    patchPool: ["test-patch-easy"],
    difficulty: "hard",
    lastGuessResult: null,
  });
  localStorage.clear();
});

afterEach(() => {
  sceneRegistry.delete(testScene.id);
});

describe("GamePage — Smoke", () => {
  it("rendert ohne Crash bei aktivem Spielstand", () => {
    renderWithRouter(<GamePage />, { route: "/game" });
    // Toolbar ist sichtbar → Spiel aktiv
    expect(screen.getByText("Anomalie gefunden")).toBeInTheDocument();
  });

  it("zeigt Runde-1-Hinweisbanner an", () => {
    renderWithRouter(<GamePage />, { route: "/game" });
    expect(screen.getByText(/Runde 1:/)).toBeInTheDocument();
  });
});
