import type { Scene } from "../../engine/Scene";
import type { ButtonModel } from "./model";
import { buttonScene as buttonSceneBase } from "./base";
import { ButtonSceneRenderer } from "./renderer";
import { patches } from "./patches";

export const buttonScene: Scene<ButtonModel> = {
  id: "button",
  name: "Button",
  description: "Ein einfacher Button, der angeklickt werden kann.",
  patches,
  createBaseModel: () => buttonSceneBase,
  render: ButtonSceneRenderer,
};
