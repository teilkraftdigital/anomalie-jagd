export type SceneLocale<TRenderer, TPatches extends string> = {
  scene: { name: string; description: string };
  renderer: TRenderer;
  patches: Record<TPatches, { label: string; explanation: string }>;
};
