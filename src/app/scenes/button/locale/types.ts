import type { SceneLocale } from "../../../engine/locale/types";
import { patches } from "../patches";

type PatchId = (typeof patches)[number]["id"];

export type ButtonSceneLocale = SceneLocale<
  { heading: string; buttonLabel: string; alertMessage: string },
  PatchId
>;
