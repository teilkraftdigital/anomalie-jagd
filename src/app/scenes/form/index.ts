import type { Scene } from "../../engine/Scene";
import type { FormModel } from "./model";
import { formScene as formSceneBase } from "./base";
import { FormSceneRenderer } from "./renderer";
import { patches } from "./patches";

export const formScene: Scene<FormModel> = {
  id: "form",
  name: "Registrierungsformular",
  description: "Ein Registrierungsformular mit Name, E-Mail, Passwort und AGB.",
  patches,
  createBaseModel: () => formSceneBase,
  render: FormSceneRenderer,
};
