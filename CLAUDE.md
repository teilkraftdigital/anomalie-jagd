# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Type-check + build
npm run lint      # ESLint
```

## Architecture

**a11y-hunt** is an educational accessibility game. Players see a simulated web component and must decide each round whether it contains an accessibility anomaly or not.

### Game loop (6 rounds)
- Round 1 is always a clean render (no patch)
- Rounds 2–6: 50/50 random — either clean or one patch from the pool
- Correct → `currentRound + 1`. Wrong → restart from round 1, pool reshuffled
- After round 6: navigate to `/glossar`, newly discovered patches highlighted
- A patch is "discovered" only when the player correctly identifies it

### Pool mechanics
`patchPool` in the store holds patch IDs not yet shown this cycle. Each patch appears at most once per cycle. When the pool empties mid-game, it refills with all difficulty-filtered patches and reshuffles. Discovered status (`discoveredPatchIds`, persisted) is never reset.

### Scene / Patch system (`src/app/engine/`)
- `Scene<TModel>` — a simulated page: `createBaseModel()`, `patches[]`, `render` component
- `Patch<TModel>` — pure function `apply(model) => model` that injects one anomaly
- `sceneRegistry` — global Map; scenes are registered at app startup in `App.tsx`
- `patchesForDifficulty(patches, difficulty)` — filters patches by severity (easy ⊂ medium ⊂ hard)
- `patchAttrs(base, mutation)` — helper for set/remove on HTML attribute objects

### State (`src/store/useGameStore.tsx`)
Zustand store with devtools + localStorage persistence. Only `discoveredPatchIds` is persisted. Store actions (`initScene`, `startGame`, `advanceRound`, `restartGame`, `clearNewlyDiscovered`) are currently stubs to be implemented.

Key fields:
- `activePatchId` — null = clean round, string = patch applied this round
- `patchPool` — IDs of patches not yet shown this cycle
- `results` — `RoundResult[]` per session for end-of-game summary

### Adding a new scene
1. Create `src/app/scenes/{id}/` with `model.tsx`, `base.tsx`, `renderer.tsx`, `patches/`
2. Export a `Scene<TModel>` from `index.ts`
3. Register it in `App.tsx` via `registerScene(...)`

### Adding a patch
Each patch lives in its own file under `patches/`. The `apply` function must be pure and return a new model. Use `patchAttrs` for HTML attribute mutations. Patches are exported from `patches/index.ts` as `Patch<any>[]`.

### Ubiquitous language
See `UBIQUITOUS_LANGUAGE.md` for canonical German domain terms. Key distinction: **Anomalie** is the domain concept (what the player hunts), **Patch** is the technical implementation (the function). Use "Anomalie" in UI and docs, "Patch" in code.
