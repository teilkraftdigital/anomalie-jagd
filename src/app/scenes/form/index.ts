import type { Scene } from "../../engine/Scene";
import type { FormModel } from "./model";
import { createFormBaseModel } from "./base";
import { FormSceneRenderer } from "./renderer";
import { patches } from "./patches";
import de from "./locale/de";
import en from "./locale/en";

export const formScene: Scene<FormModel> = {
  id: "form",
  patches,
  createBaseModel: createFormBaseModel,
  render: FormSceneRenderer,
};

export const locales = { de, en };
