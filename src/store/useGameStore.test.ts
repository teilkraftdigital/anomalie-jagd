import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import useGameStore from "./useGameStore";
import { registerScene, sceneRegistry } from "../app/engine/sceneRegistry";
import { testScene, testPatchIds } from "../test-utils/testScene";
import { GAME_ROUNDS } from "../app/engine/roundLogic";

const initialState = {
  allPatches: [],
  discoveredPatchIds: {},
  newlyDiscoveredPatchIds: [],
  currentSceneId: null,
  difficulty: null,
  currentRound: 0,
  patchPool: [],
  activePatchId: null,
  results: [],
  lastGuessResult: null,
};

beforeEach(() => {
  useGameStore.setState(initialState);
  localStorage.clear();
  registerScene(testScene);
});

afterEach(() => {
  sceneRegistry.delete(testScene.id);
  vi.restoreAllMocks();
});

describe("startGame", () => {
  it("setzt currentSceneId und startet bei Runde 1", () => {
    useGameStore.getState().startGame("test-scene", "hard");
    const state = useGameStore.getState();
    expect(state.currentSceneId).toBe("test-scene");
    expect(state.currentRound).toBe(1);
    expect(state.difficulty).toBe("hard");
  });

  it("baut Pool mit allen Patch-IDs auf (hard)", () => {
    useGameStore.getState().startGame("test-scene", "hard");
    const { allPatches, patchPool } = useGameStore.getState();
    expect(allPatches).toHaveLength(3);
    expect(patchPool).toEqual(expect.arrayContaining(testPatchIds));
  });

  it("filtert Pool auf easy-Patches bei difficulty easy", () => {
    useGameStore.getState().startGame("test-scene", "easy");
    const { allPatches } = useGameStore.getState();
    expect(allPatches).toHaveLength(1);
    expect(allPatches[0].id).toBe("test-patch-easy");
  });

  it("setzt lastGuessResult auf null", () => {
    useGameStore.setState({ lastGuessResult: "wrong" });
    useGameStore.getState().startGame("test-scene", "hard");
    expect(useGameStore.getState().lastGuessResult).toBeNull();
  });
});

describe("guess — korrektes Raten", () => {
  it("setzt lastGuessResult auf correct wenn Anomalie korrekt erkannt", () => {
    useGameStore.getState().startGame("test-scene", "hard");
    useGameStore.setState({ activePatchId: "test-patch-easy" });
    vi.spyOn(Math, "random").mockReturnValue(0.99); // clean round nach advance
    useGameStore.getState().guess(true);
    expect(useGameStore.getState().lastGuessResult).toBe("correct");
  });

  it("erhöht currentRound nach korrektem Raten", () => {
    useGameStore.getState().startGame("test-scene", "hard");
    useGameStore.setState({ activePatchId: "test-patch-easy" });
    vi.spyOn(Math, "random").mockReturnValue(0.99);
    useGameStore.getState().guess(true);
    expect(useGameStore.getState().currentRound).toBe(2);
  });

  it("trackt Discovery wenn Anomalie korrekt erkannt", () => {
    useGameStore.getState().startGame("test-scene", "hard");
    useGameStore.setState({ activePatchId: "test-patch-easy" });
    vi.spyOn(Math, "random").mockReturnValue(0.99);
    useGameStore.getState().guess(true);
    const { discoveredPatchIds, newlyDiscoveredPatchIds } =
      useGameStore.getState();
    expect(discoveredPatchIds["test-scene"]).toContain("test-patch-easy");
    expect(newlyDiscoveredPatchIds).toContain("test-patch-easy");
  });

  it("setzt lastGuessResult auf correct wenn clean round korrekt erkannt", () => {
    useGameStore.getState().startGame("test-scene", "hard");
    useGameStore.setState({ activePatchId: null });
    vi.spyOn(Math, "random").mockReturnValue(0.99);
    useGameStore.getState().guess(false); // kein Anomalie erwartet → correct
    expect(useGameStore.getState().lastGuessResult).toBe("correct");
  });
});

describe("guess — falsches Raten", () => {
  it("setzt lastGuessResult auf wrong", () => {
    useGameStore.getState().startGame("test-scene", "hard");
    useGameStore.setState({ activePatchId: "test-patch-easy" });
    useGameStore.getState().guess(false); // Anomalie vorhanden, aber nicht erkannt
    expect(useGameStore.getState().lastGuessResult).toBe("wrong");
  });

  it("setzt currentRound auf 1 zurück nach falschem Raten", () => {
    useGameStore.getState().startGame("test-scene", "hard");
    useGameStore.setState({ activePatchId: "test-patch-easy", currentRound: 3 });
    useGameStore.getState().guess(false);
    expect(useGameStore.getState().currentRound).toBe(1);
  });

  it("baut Pool nach Neustart neu auf", () => {
    useGameStore.getState().startGame("test-scene", "hard");
    useGameStore.setState({
      activePatchId: "test-patch-easy",
      patchPool: [], // leerer Pool
    });
    useGameStore.getState().guess(false);
    const { patchPool } = useGameStore.getState();
    // Pool sollte nach Neustart wieder gefüllt sein
    expect(patchPool.length).toBeGreaterThan(0);
  });
});

describe("advanceRound — Game Over", () => {
  it("erkennt Game Over wenn Runde GAME_ROUNDS abgeschlossen", () => {
    useGameStore.getState().startGame("test-scene", "hard");
    useGameStore.setState({
      currentRound: GAME_ROUNDS,
      activePatchId: null,
    });
    vi.spyOn(Math, "random").mockReturnValue(0.99);
    useGameStore.getState().guess(false); // clean round → correct → advanceRound
    const { currentRound } = useGameStore.getState();
    expect(currentRound).toBe(GAME_ROUNDS + 1);
  });
});

describe("quitGame", () => {
  it("setzt Session-State zurück", () => {
    useGameStore.getState().startGame("test-scene", "hard");
    useGameStore.getState().quitGame();
    const state = useGameStore.getState();
    expect(state.currentSceneId).toBeNull();
    expect(state.currentRound).toBe(0);
    expect(state.allPatches).toHaveLength(0);
  });
});
