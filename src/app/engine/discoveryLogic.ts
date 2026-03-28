export type DiscoveredPatchIds = Record<string, string[]>;

export type DiscoveryResult = {
  discoveredPatchIds: DiscoveredPatchIds;
  newlyDiscoveredPatchIds: string[];
};

/**
 * Marks a patch as discovered for a given scene.
 * Returns updated state; is a no-op if already discovered.
 */
export function trackDiscovery(
  discoveredPatchIds: DiscoveredPatchIds,
  newlyDiscoveredPatchIds: string[],
  sceneId: string,
  patchId: string,
): DiscoveryResult {
  const sceneDiscovered = discoveredPatchIds[sceneId] ?? [];
  if (sceneDiscovered.includes(patchId)) {
    return { discoveredPatchIds, newlyDiscoveredPatchIds };
  }
  return {
    discoveredPatchIds: {
      ...discoveredPatchIds,
      [sceneId]: [...sceneDiscovered, patchId],
    },
    newlyDiscoveredPatchIds: [...newlyDiscoveredPatchIds, patchId],
  };
}
