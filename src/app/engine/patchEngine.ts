import type { AttrMutation, Patch } from "./Scene";

export function applyPatches<T>(base: T, patches: Patch<T>[]): T {
  return patches.reduce((model, patch) => patch.apply(model), base);
}

export function applyPatches2<TModel>(
  base: TModel,
  patches: Patch<TModel>[],
  activePatchIds: string[],
) {
  const patchMap = new Map(patches.map((p) => [p.id, p]));

  return activePatchIds.reduce((model, patchId) => {
    const patch = patchMap.get(patchId);
    if (!patch) return model;
    return patch.apply(model);
  }, base);
}

export function patchAttrs(
  base: Record<string, any> | undefined,
  mutation: AttrMutation,
) {
  const next = { ...(base ?? {}) };

  // remove
  for (const key of mutation.remove ?? []) {
    delete next[key];
  }

  // set/override
  for (const [key, value] of Object.entries(mutation.set ?? {})) {
    if (value === undefined) {
      delete next[key];
    } else {
      next[key] = value;
    }
  }

  return next;
}
