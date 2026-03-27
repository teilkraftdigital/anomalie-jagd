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
- Round 1 is always a clean render (no patch); a blue hint banner informs the player
- Rounds 2–6: 50/50 random — either clean or one patch from the pool
- Correct → `currentRound + 1`. Wrong → restart from round 1, pool reshuffled
- After round 6: navigate to `/glossar`, newly discovered patches highlighted
- A patch is "discovered" only when the player correctly identifies it
- `newlyDiscoveredPatchIds` accumulates across restarts; cleared only on glossar navigation

### Pool mechanics
`patchPool` in the store holds IDs of undiscovered patches for the current cycle. Each patch appears at most once per cycle. When the pool empties mid-game, it refills with all difficulty-filtered patches and reshuffles. `discoveredPatchIds` (persisted to localStorage) is never reset — it drives the undiscovered-first pool logic.

### Scene / Patch system (`src/app/engine/`)
- `Scene<TModel>` — a simulated page: `createBaseModel()`, `patches[]`, `render` component
- `Patch<TModel>` — pure function `apply(model) => model` that injects one anomaly
- `sceneRegistry` — global Map; scenes are registered at app startup in `App.tsx`
- `patchesForDifficulty(patches, difficulty)` — filters by severity: easy = easy only, medium = easy+medium, hard = all
- `patchAttrs(base, mutation)` — helper for set/remove on HTML attribute objects
- `shuffle(arr)` / `buildPool(patches, difficulty)` — in `rng.ts`

### State (`src/store/useGameStore.tsx`)
Zustand store with devtools + localStorage persistence. Only `discoveredPatchIds` is persisted. Session reloads redirect to `/level-select` (no session persistence by design).

Key fields:
- `allPatches` — difficulty-filtered patches for the current session
- `activePatchId` — null = clean round, string = patch applied this round
- `patchPool` — IDs of undiscovered patches not yet shown this cycle
- `lastGuessResult` — `"correct" | "wrong" | null`; drives the feedback toast and disables toolbar buttons while set

Key actions:
- `startGame(sceneId, difficulty)` — sets up session, builds pool (undiscovered-first)
- `guess(playerSaidAnomaly)` — evaluates answer, sets `lastGuessResult`, calls `advanceRound` or `restartGame`
- `quitGame()` — resets session state, used by Toolbar "Aufgeben" button

### Routes
| Path | Description |
|---|---|
| `/` | StartPage |
| `/level-select` | Scene + difficulty selection, calls `startGame()` |
| `/spiel` | GamePage — requires active game (guard redirects to `/level-select`) |
| `/spiel?debug=true&scene=button&patch=patch-id` | Debug mode — bypasses guard, replaces Toolbar with DebugBar |
| `/glossar` | Always-accessible glossar, shows discovered anomalies |

### Debug mode
`/spiel?debug=true` replaces the Toolbar with `DebugBar` (`src/app/layout/partials/DebugBar.tsx`). Scene and patch are controlled via URL params — URLs are bookmarkable. No game state needed.

### Scene model types
Each scene defines its own model extending `BaseModel<TBlock>` (from `src/app/engine/models/BaseModel.ts`), which is `{ title: string; blocks: TBlock[] }`. Block types are discriminated unions on `type`:
- **button scene**: single block type `{ type: "button"; content: { label?, as?, onClick, attrs? } }`
- **form scene**: three block types — `{ type: "input"; content: InputContent }`, `{ type: "error-summary" }`, `{ type: "submit"; content: { label?, attrs? } }`. `InputContent` carries `validation?: ValidationRules` used by `validation.ts` (`validateForm`) at runtime in the renderer.

### Adding a new scene
1. Create `src/app/scenes/{id}/` with `model.tsx`, `base.tsx`, `renderer.tsx`, `patches/`
2. Model: `BaseModel<YourBlock>` — flat block structure, no nesting
3. Each patch maps over `model.blocks`, guards on `block.type`, returns a new block with mutated `content` (or filters/removes blocks — see `patchNoErrorSummary` for a removal example)
4. Export a `Scene<TModel>` from `index.ts` and register it in `App.tsx`

### Adding a patch
Each patch lives in its own file under `patches/`. The `apply` function must be pure. Map over `model.blocks`, guard with `if (block.type !== "yourtype") return block`, then spread and override `content`. Use `patchAttrs` for HTML attribute set/remove. Export all patches from `patches/index.ts` as `Patch<any>[]`.

### GamePage rendering details
`SceneRenderer` receives a `key` prop — `currentRound` in game mode, `${sceneId}-${patchId}` in debug mode — to force a full remount between rounds (resetting local state like form values).

### Ubiquitous language
See `UBIQUITOUS_LANGUAGE.md` for canonical German domain terms. Key distinction: **Anomalie** is the domain concept (what the player hunts), **Patch** is the technical implementation (the function). Use "Anomalie" in UI and docs, "Patch" in code.
