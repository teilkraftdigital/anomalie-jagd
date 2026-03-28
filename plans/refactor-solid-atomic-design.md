# Plan: Refactor — SOLID & Atomic Design

> Quelle: Grill-Me-Session 2026-03-28

## Architekturentscheidungen

Gelten für alle Phasen:

- **Dependency-Richtung**: `Pages/Components → Store → Engine` — keine Umkehrung erlaubt
- **Engine**: `src/app/engine/` enthält ausschließlich pure Logik ohne UI-Abhängigkeiten
- **Scenes**: `src/app/scenes/` wird nicht angefasst — geschlossene Einheiten außerhalb von Atomic Design
- **Components**: `src/components/atoms|molecules|organisms/` — Atomic Design als Ordnungsprinzip
  - Atom = semantische Einheit mit eigener ARIA-Verantwortung
  - Molecule = Komposition aus Atoms
  - Organism = wiederverwendbare, in sich vollständige UI-Einheit
- **Hooks**: alle Custom Hooks in `src/hooks/` — kein Co-location mit Pages
- **Store**: `src/store/` als eigenständige Kommunikationsschicht zwischen UI und Core
- **Branch**: `refactor/solid-atomic-design`
- **Commits**: jede Phase als eigene Commit-Serie, kein Mega-Commit
- **CHANGELOG**: wird pro Phase aktualisiert

### Zielstruktur

```
src/
  app/
    engine/       — Core-Logik (pure Funktionen, keine UI)
      poolLogic.ts
      discoveryLogic.ts
      roundLogic.ts
      sessionLogic.ts
      patchEngine.ts
      patchesForDifficulty.ts
      rng.ts
      sceneRegistry.ts
      Scene.ts
      models/
    scenes/       — unverändert, geschlossene Einheiten
  components/
    atoms/        — SeverityBadge, RoundDisplay
    molecules/    — DifficultyCard, SceneCard, PatchCard, GlossarTabs
    organisms/    — Toolbar, GameShell, DebugBar
  hooks/          — useGameSession, useDebugMode
  pages/          — reine Render-Kompositionen
  store/          — useGameStore (Kommunikationsschicht)
```

---

## Phase 1: Engine aufteilen

**Ziel**: Store-interne Spiellogik in pure, testbare Funktionen auslagern.

### Was zu bauen ist

Die Datei `useGameStore.tsx` enthält aktuell vier Verantwortlichkeiten. Diese werden in separate Module mit klar benannten Verantwortlichkeiten extrahiert:

- `poolLogic.ts` — `buildPool`, Pool-Rotation, Refill-Logik
- `discoveryLogic.ts` — `trackDiscovery`, `isNewlyDiscovered`
- `roundLogic.ts` — `pickNextPatch`, `isGameOver`, Anomalie-Chance
- `sessionLogic.ts` — `initSession` (Startparameter zusammenbauen)

Der Store delegiert danach alle Berechnungen an diese Funktionen und hält nur noch State. Kein UI-Eingriff, kein visueller Impact.

### Akzeptanzkriterien

- [ ] `poolLogic.ts`, `discoveryLogic.ts`, `roundLogic.ts`, `sessionLogic.ts` existieren in `src/app/engine/`
- [ ] Alle exportierten Funktionen sind pure (keine Abhängigkeit von Store, React oder Browser-APIs)
- [ ] `useGameStore.tsx` importiert aus diesen Modulen und enthält keine eigene Berechnungslogik mehr
- [ ] `buildPool` ist aus `useGameStore.tsx` entfernt
- [ ] `npm run build` läuft ohne Fehler durch
- [ ] Spielverhalten ist identisch (kein funktionaler Unterschied)
- [ ] CHANGELOG.md aktualisiert

---

## Phase 2: Hooks extrahieren

**Ziel**: `GamePage` wird zur reinen Render-Komponente; Logik wandert in testbare Hooks.

### Was zu bauen ist

`GamePage.tsx` enthält aktuell zwei vermischte Verantwortlichkeiten: Spielzustand-Verwaltung und Debug-Modus-Logik. Beide werden in Custom Hooks ausgelagert:

- `useGameSession` — kapselt alle Store-Selektoren und -Aktionen für den Spielmodus (Guard-Redirect, `lastGuessResult`-Effekt, Szenen-Auflösung)
- `useDebugMode` — kapselt URL-Parameter-Logik für Debug-Modus (Scene/Patch aus `searchParams`, `handleDebugSceneChange`, `handleDebugPatchChange`)

`GamePage.tsx` konsumiert nur noch diese beiden Hooks und rendert.

### Akzeptanzkriterien

- [ ] `src/hooks/useGameSession.ts` und `src/hooks/useDebugMode.ts` existieren
- [ ] `GamePage.tsx` enthält keine `useSearchParams`-, `useEffect`- oder Store-Logik mehr — nur Hooks-Aufruf und JSX
- [ ] Beide Hooks sind unabhängig voneinander importierbar
- [ ] Debug-Modus (`/spiel?debug=true`) funktioniert weiterhin korrekt
- [ ] Guard-Redirect bei fehlendem Spielstand funktioniert weiterhin
- [ ] `npm run build` läuft ohne Fehler durch
- [ ] CHANGELOG.md aktualisiert

---

## Phase 3: Organisms einführen

**Ziel**: `src/app/layout/` aufgelöst; bestehende Layout-Komponenten leben in `src/components/organisms/`.

### Was zu bauen ist

`src/components/organisms/` wird angelegt. Die drei bestehenden Layout-Komponenten werden verschoben — kein Neuschreiben, nur Umzug und Import-Pfad-Aktualisierung:

- `Toolbar` → `src/components/organisms/Toolbar.tsx`
- `GameShell` → `src/components/organisms/GameShell.tsx`
- `DebugBar` → `src/components/organisms/DebugBar.tsx`

Alle Consumer (`GamePage`, `App.tsx` o.ä.) aktualisieren ihre Import-Pfade.

### Akzeptanzkriterien

- [ ] `src/components/organisms/` existiert mit `Toolbar.tsx`, `GameShell.tsx`, `DebugBar.tsx`
- [ ] `src/app/layout/` ist leer (Dateien verschoben, nicht kopiert)
- [ ] Alle Import-Pfade in Pages und Hooks zeigen auf `src/components/organisms/`
- [ ] `npm run build` läuft ohne Fehler durch
- [ ] Visueller Output ist identisch
- [ ] CHANGELOG.md aktualisiert

---

## Phase 4: Molecules & Atoms extrahieren

**Ziel**: Bestehende Molecules verschieben, neue Atoms und Molecules aus Pages herauslösen.

### Was zu bauen ist

`src/components/molecules/` und `src/components/atoms/` werden angelegt.

**Verschieben (bereits vorhanden, neuer Ort):**
- `DifficultyCard` → `src/components/molecules/DifficultyCard.tsx`
- `SceneCard` → `src/components/molecules/SceneCard.tsx`

**Neu extrahieren aus `GlossarPage`:**
- `PatchCard` (molecule) — ein einzelner Patch-Eintrag mit Label, Erklärung, SeverityBadge, Neu-entdeckt-Badge
- `GlossarTabs` (molecule) — Tab-Navigation mit `role="tablist"`, verantwortet ihre eigene Accessibility-Semantik vollständig

**Neu extrahieren aus `Toolbar`:**
- `RoundDisplay` (atom) — `<output>`-Element mit Rundenanzeige
- `SeverityBadge` (atom) — Severity-Label mit Farb-Varianten (easy/medium/hard), genutzt in PatchCard und DebugBar

### Akzeptanzkriterien

- [ ] `src/components/atoms/SeverityBadge.tsx` und `src/components/atoms/RoundDisplay.tsx` existieren
- [ ] `src/components/molecules/PatchCard.tsx`, `GlossarTabs.tsx`, `DifficultyCard.tsx`, `SceneCard.tsx` existieren
- [ ] `GlossarPage.tsx` rendert `GlossarTabs` und `PatchCard` statt inline-JSX
- [ ] `Toolbar.tsx` rendert `RoundDisplay` statt inline-`<output>`
- [ ] `SeverityBadge` wird in `PatchCard` und `DebugBar` genutzt (kein doppeltes Styling)
- [ ] Jede Komponente verantwortet ihre eigene Accessibility-Semantik vollständig
- [ ] `npm run build` läuft ohne Fehler durch
- [ ] Visueller Output ist identisch
- [ ] CHANGELOG.md aktualisiert

---

## Phase 5: Aufräumen

**Ziel**: Ordner-Struktur finalisieren, Dokumentation aktualisieren.

### Was zu bauen ist

- `src/app/layout/` vollständig löschen (nach Phase 3 bereits leer, Ordner entfernen)
- Alle verbleibenden Import-Pfade auf neue Struktur prüfen und bereinigen
- `CLAUDE.md` aktualisieren: neue Ordnerstruktur, Atomic Design Konventionen, Hook-Konventionen dokumentieren
- `CHANGELOG.md` für Version `0.2.0` finalisieren

### Akzeptanzkriterien

- [ ] `src/app/layout/` existiert nicht mehr
- [ ] `src/app/` enthält nur noch `engine/` und `scenes/`
- [ ] Keine Import-Pfade zeigen noch auf `src/app/layout/`
- [ ] `CLAUDE.md` beschreibt die neue Ordnerstruktur, Atomic Design Konventionen und Hook-Richtlinie
- [ ] `npm run build` und `npm run lint` laufen ohne Fehler durch
- [ ] CHANGELOG.md aktualisiert
