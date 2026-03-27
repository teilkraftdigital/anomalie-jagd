import type { Scene } from "./Scene";

export const sceneRegistry = new Map<string, Scene<any>>();

export function registerScene<TModel>(scene: Scene<TModel>) {
  if (sceneRegistry.has(scene.id)) {
    throw new Error(`Scene already registered: ${scene.id}`);
  }
  sceneRegistry.set(scene.id, scene);
}

export function getScene(sceneId: string) {
  const scene = sceneRegistry.get(sceneId);
  if (!scene) throw new Error(`Unknown scene: ${sceneId}`);
  return scene;
}

export function listScenes() {
  return Array.from(sceneRegistry.values()).map((s) => ({
    id: s.id,
    name: s.name,
    description: s.description,
    patches: s.patches,
  }));
}
