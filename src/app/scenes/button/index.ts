import type { Scene } from "../../engine/Scene";
import type { ButtonModel } from "./model";
import { createButtonBaseModel } from "./base";
import { ButtonSceneRenderer } from "./renderer";
import { patches } from "./patches";
import de from "./locale/de";
import en from "./locale/en";

export const buttonScene: Scene<ButtonModel> = {
  id: "button",
  patches,
  createBaseModel: createButtonBaseModel,
  render: ButtonSceneRenderer,
};

export const locales = { de, en };
