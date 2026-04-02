import type { Scene } from "../../engine/Scene";
import type { ButtonModel } from "./model";
import { buttonScene as buttonSceneBase } from "./base";
import { ButtonSceneRenderer } from "./renderer";
import { patches } from "./patches";

export const buttonScene: Scene<ButtonModel> = {
  id: "button",
  patches,
  createBaseModel: () => buttonSceneBase,
  render: ButtonSceneRenderer,
};
