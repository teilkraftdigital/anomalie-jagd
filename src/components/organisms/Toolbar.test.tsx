import { describe, it, expect, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import { Toolbar } from "./Toolbar";
import useGameStore from "../../store/useGameStore";
import { renderWithRouter } from "../../test-utils/renderWithRouter";

const initialState = {
  currentRound: 3,
  difficulty: "hard" as const,
  lastGuessResult: null,
};

beforeEach(() => {
  useGameStore.setState(initialState);
});

describe("Toolbar — disabled State", () => {
  it("Buttons sind aktiv wenn lastGuessResult null ist", () => {
    renderWithRouter(<Toolbar />);
    expect(screen.getByText("Anomalie gefunden")).not.toBeDisabled();
    expect(screen.getByText("Keine Anomalie")).not.toBeDisabled();
  });

  it("Buttons sind disabled wenn lastGuessResult gesetzt ist", () => {
    useGameStore.setState({ lastGuessResult: "correct" });
    renderWithRouter(<Toolbar />);
    expect(screen.getByText("Anomalie gefunden")).toBeDisabled();
    expect(screen.getByText("Keine Anomalie")).toBeDisabled();
  });

  it("Buttons sind disabled auch bei lastGuessResult wrong", () => {
    useGameStore.setState({ lastGuessResult: "wrong" });
    renderWithRouter(<Toolbar />);
    expect(screen.getByText("Anomalie gefunden")).toBeDisabled();
    expect(screen.getByText("Keine Anomalie")).toBeDisabled();
  });

  it("Buttons sind disabled wenn currentRound 0 ist", () => {
    useGameStore.setState({ currentRound: 0, lastGuessResult: null });
    renderWithRouter(<Toolbar />);
    expect(screen.getByText("Anomalie gefunden")).toBeDisabled();
    expect(screen.getByText("Keine Anomalie")).toBeDisabled();
  });
});

describe("Toolbar — Rundenanzeige", () => {
  it("zeigt aktuelle Runde an", () => {
    useGameStore.setState({ currentRound: 4 });
    renderWithRouter(<Toolbar />);
    expect(screen.getByText(/4\/6/)).toBeInTheDocument();
  });

  it("zeigt Schwierigkeitsgrad an", () => {
    renderWithRouter(<Toolbar />);
    expect(screen.getByText("Hard")).toBeInTheDocument();
  });
});
