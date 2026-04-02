import { patches } from "../patches";

type PatchId = (typeof patches)[number]["id"];

export type ButtonSceneLocale = {
  scene: { name: string; description: string };
  renderer: { heading: string; buttonLabel: string; alertMessage: string };
  patches: Record<PatchId, { label: string; explanation: string }>;
};
