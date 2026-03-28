import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GlossarPage } from "./GlossarPage";
import useGameStore from "../store/useGameStore";
import { registerScene, sceneRegistry } from "../app/engine/sceneRegistry";
import { testScene } from "../test-utils/testScene";
import { renderWithRouter } from "../test-utils/renderWithRouter";

beforeEach(() => {
  registerScene(testScene);
  useGameStore.setState({
    discoveredPatchIds: {},
    newlyDiscoveredPatchIds: [],
    currentSceneId: testScene.id,
  });
  localStorage.clear();
});

afterEach(() => {
  sceneRegistry.delete(testScene.id);
});

describe("GlossarPage — Sortierung", () => {
  it("zeigt neu entdeckte Patches zuerst an", () => {
    useGameStore.setState({
      newlyDiscoveredPatchIds: ["test-patch-hard"],
      discoveredPatchIds: {
        "test-scene": ["test-patch-easy", "test-patch-medium", "test-patch-hard"],
      },
    });

    renderWithRouter(<GlossarPage />);

    const patches = screen.getAllByRole("listitem");
    expect(patches[0]).toHaveTextContent("Hard Patch");
  });

  it("sortiert nach Schweregrad wenn keine neu entdeckten vorhanden", () => {
    useGameStore.setState({
      newlyDiscoveredPatchIds: [],
      discoveredPatchIds: {
        "test-scene": ["test-patch-easy", "test-patch-medium", "test-patch-hard"],
      },
    });

    renderWithRouter(<GlossarPage />);

    const patches = screen.getAllByRole("listitem");
    expect(patches[0]).toHaveTextContent("Easy Patch");
    expect(patches[1]).toHaveTextContent("Medium Patch");
    expect(patches[2]).toHaveTextContent("Hard Patch");
  });
});

describe("GlossarPage — Tab-Navigation", () => {
  it("rendert Tab für die registrierte Scene", () => {
    renderWithRouter(<GlossarPage />);
    expect(screen.getByRole("tab", { name: /Test Scene/ })).toBeInTheDocument();
  });

  it("wechselt aktiven Tab per Klick", async () => {
    const user = userEvent.setup();

    // Zweite Scene für Tab-Wechsel registrieren
    const secondScene = { ...testScene, id: "test-scene-2", name: "Second Scene" };
    registerScene(secondScene);

    renderWithRouter(<GlossarPage />);

    const secondTab = screen.getByRole("tab", { name: /Second Scene/ });
    await user.click(secondTab);
    expect(secondTab).toHaveAttribute("aria-selected", "true");

    sceneRegistry.delete("test-scene-2");
  });
});
