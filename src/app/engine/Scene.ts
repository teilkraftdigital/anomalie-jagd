import type { ComponentType } from "react";

export type Difficulty = "easy" | "medium" | "hard";

export type Patch<TModel> = {
  id: string;
  label: string;
  severity: Difficulty;
  explanation: string;
  apply: (model: TModel) => TModel;
};

export type AttrMutation = {
  set?: Record<string, any>;
  remove?: string[];
};

export type Scene<TModel> = {
  id: string;
  name: string;
  description: string;

  // erstellt das Ausgangsmodell (ohne Anomalien)
  createBaseModel: () => TModel;

  // alle möglichen Patches für diese Scene
  patches: Patch<TModel>[];

  // React Renderer für das Modell
  render: ComponentType<{ model: TModel }>;
};

export const DIFFICULTIES: {
  value: Difficulty;
  label: string;
  description: string;
}[] = [
  {
    value: "easy",
    label: "Easy",
    description: "Nur offensichtliche Anomalien",
  },
  {
    value: "medium",
    label: "Medium",
    description: "Easy + mittelschwere Anomalien",
  },
  { value: "hard", label: "Hard", description: "Alle Anomalien" },
];
