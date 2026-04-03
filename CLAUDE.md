# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Type-check + build
npm run lint      # ESLint
```

## Architecture

**anomalie-jagd** is an educational accessibility game. Players see a simulated web component and must decide each round whether it contains an accessibility anomaly or not.

### Folder structure

```
src/
  app/
    engine/       — Core domain logic (pure functions, no UI dependencies)
    scenes/       — Scene definitions (closed units, not part of Atomic Design)
  components/
    atoms/        — Smallest semantic UI units (own ARIA responsibility)
    molecules/    — Compositions of atoms
    organisms/    — Self-contained, reusable UI sections
  hooks/          — All custom hooks (no co-location with pages)
  pages/          — Route-level components (pure composition)
  store/          — Zustand store (communication layer between UI and engine)
```

**Dependency direction:** `pages/components → store → engine`. Never import UI into engine.

### Conventions

**Atomic Design rule:** A component is extracted when it owns a distinct ARIA role or landmark. Atom = one semantic unit, Molecule = atoms composed, Organism = reusable self-contained section.

**Hook rule:** All custom hooks live in `src/hooks/`. No co-location with pages, even if a hook is only used in one place.

**Scene rule:** `src/app/scenes/` is excluded from Atomic Design. Scenes are closed units — their purpose is to demonstrate anomalies, not to provide reusable UI.

### Game loop (6 rounds)
- Round 1 is always a clean render (no patch); a blue hint banner informs the player
- Rounds 2–6: 75% chance of anomaly — either clean or one patch from the pool
- Correct → `currentRound + 1`. Wrong → restart from round 1, pool reshuffled
- After round 6: navigate to `/glossar`, newly discovered patches highlighted
- A patch is "discovered" only when the player correctly identifies it
- `newlyDiscoveredPatchIds` accumulates across restarts; cleared only on glossar navigation

### Pool mechanics
`patchPool` in the store holds IDs of undiscovered patches for the current cycle. Each patch appears at most once per cycle. When the pool empties mid-game, it refills with all difficulty-filtered patches and reshuffles. `discoveredPatchIds` (persisted to localStorage) is never reset — it drives the undiscovered-first pool logic.

### Engine modules (`src/app/engine/`)
- `Scene.ts` — `Scene<TModel>`, `Patch<TModel>`, `Difficulty`, `DIFFICULTIES` types and constants
- `sceneRegistry.ts` — global Map; scenes registered at app startup in `App.tsx`
- `poolLogic.ts` — `buildPool` (undiscovered-first), `refillPool`
- `discoveryLogic.ts` — `trackDiscovery`, `DiscoveredPatchIds` type
- `roundLogic.ts` — `isGameOver`, `pickNextPatch`, `GAME_ROUNDS`, `GAME_ANOMALY_CHANCE`
- `sessionLogic.ts` — `initSession` (composes scene resolution, difficulty filter, pool build)
- `patchesForDifficulty.ts` — filters patches by severity level
- `patchEngine.ts` — `applyPatches`, `patchAttrs` helper
- `rng.ts` — `shuffle`

### State (`src/store/useGameStore.tsx`)
Zustand store with devtools + localStorage persistence. Only `discoveredPatchIds` is persisted. Session reloads redirect to `/level-select` (no session persistence by design). The store delegates all computation to engine modules — it holds state only.

Key fields:
- `allPatches` — difficulty-filtered patches for the current session
- `activePatchId` — null = clean round, string = patch applied this round
- `patchPool` — IDs of undiscovered patches not yet shown this cycle
- `lastGuessResult` — `"correct" | "wrong" | null`; drives the feedback toast and disables toolbar buttons while set

Key actions:
- `startGame(sceneId, difficulty)` — sets up session via `initSession`
- `guess(playerSaidAnomaly)` — evaluates answer, sets `lastGuessResult`, calls `advanceRound` or `restartGame`
- `quitGame()` — resets session state, used by Toolbar "Aufgeben" button

### Hooks (`src/hooks/`)
- `useGameSession` — store selectors, guard redirect to `/level-select`, toast auto-advance effect
- `useDebugMode` — URL param logic for debug scene/patch selection and change handlers

### Routes
| Path | Description |
|---|---|
| `/` | StartPage |
| `/level-select` | Scene + difficulty selection, calls `startGame()` |
| `/game` | GamePage — requires active game (guard in `useGameSession` redirects to `/level-select`) |
| `/game?debug=true&scene=button&patch=patch-id` | Debug mode — bypasses guard, replaces Toolbar with DebugBar |
| `/glossar` | Always-accessible glossar, shows discovered anomalies |

### Debug mode
`/game?debug=true` replaces the Toolbar with `DebugBar` (`src/components/organisms/DebugBar.tsx`). Scene and patch are controlled via URL params — URLs are bookmarkable. Logic is encapsulated in `useDebugMode` hook. No game state needed.

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
