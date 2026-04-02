# Plan: Test-Infrastruktur (v0.3.0)

> Quelle: Grill-Me-Session 2026-03-28 — Issues #2, #3

## Architekturentscheidungen

Gelten für alle Phasen:

- **Test-Runner**: Vitest (nativ zu Vite, kein Extra-Config-Overhead)
- **Component-Tests**: @testing-library/react + @testing-library/user-event
- **Umgebung**: jsdom durchgehend (Engine, Store, Components — kein Environment-Routing)
- **Testdateien**: Co-located neben der Implementation (z.B. `poolLogic.test.ts` neben `poolLogic.ts`)
- **Teststrategie**: Kritische Pfade mit Rot/Grün — Happy-path + die drei gefährlichsten Invarianten
- **Test-Isolation**: `beforeEach` lokal pro `describe`-Block — kein globales Setup, jeder Test erschafft seine eigene Welt
- **Scene-Fixture**: Minimal-Stub statt echter Szenen — Fixture-Patches haben bekannte IDs, stabil gegenüber Scene-Änderungen
- **Shuffle-Tests**: Invarianten testen (Membership, Länge, undiscovered-first), nicht exakte Reihenfolge
- **Anomalie-Chance**: `vi.spyOn(Math, 'random')` für deterministisches Testen von `pickNextPatch`

---

## Phase 1: Setup & rng.ts bereinigen

### Was zu bauen ist

Vitest und RTL installieren, `vitest.config.ts` anlegen, `npm test` ausführbar machen. Parallel dazu `rng.ts` auf `shuffle` reduzieren (seeded RNG entfernen — wird in keiner Engine-Funktion benutzt und würde Tests verkomplizieren). Eine wiederverwendbare Stub-Scene-Fixture anlegen, die in Store- und Component-Tests als kontrolliertes Testsubjekt dient.

### Akzeptanzkriterien

- [ ] `vitest`, `@testing-library/react`, `@testing-library/user-event`, `jsdom` installiert
- [ ] `vitest.config.ts` konfiguriert mit `environment: "jsdom"`
- [ ] `npm test` läuft durch (auch ohne Tests — kein Fehler)
- [ ] `rng.ts` enthält nur noch `shuffle` — `setSeed`, `random`, `randomInt`, `randomChoice`, `randomBool` entfernt
- [ ] `src/test-utils/testScene.ts` existiert: Stub-Scene mit 3 Patches bekannter IDs (`easy`, `medium`, `hard`)
- [ ] `npm run build` und `npm run lint` laufen weiterhin fehlerfrei

---

## Phase 2: Engine-Tests

### Was zu bauen ist

Kritische Pfade der vier Engine-Module als Rot/Grün-Tests abdecken. Fokus auf Invarianten, nicht auf Implementierungsdetails. Besonderes Gewicht auf den gemeldeten Bug-Fall: Pool-Refill wenn alle Patches bereits entdeckt wurden.

**Kritische Invarianten:**

- `buildPool`: Alle Patch-IDs sind enthalten; wenn alle entdeckt → volles Set wird genutzt
- `pickNextPatch`: Pool füllt sich auf wenn leer + Anomalie gezogen; gibt `null` zurück bei Clean-Round
- `isGameOver`: Schlägt genau ab Runde 7 an (nicht schon bei 6)
- `trackDiscovery`: Akkumuliert `newlyDiscoveredPatchIds` über Neustarts hinweg ohne Reset

### Akzeptanzkriterien

- [ ] `poolLogic.test.ts`: `buildPool` enthält alle IDs; Fallback auf volles Set wenn alle entdeckt
- [ ] `roundLogic.test.ts`: `isGameOver(6)` → false, `isGameOver(7)` → true; Pool-Refill-Pfad via `vi.spyOn`
- [ ] `discoveryLogic.test.ts`: `trackDiscovery` akkumuliert korrekt; keine Doppeleinträge
- [ ] `sessionLogic.test.ts`: `initSession` gibt Pool und gefilterte Patches zurück
- [ ] Alle Tests grün, `npm test` ohne Fehler

---

## Phase 3: Store-Tests

### Was zu bauen ist

Store-Aktionen direkt über `useGameStore.getState()` testen — ohne React-Kontext, ohne DOM. Stub-Scene im `sceneRegistry` registrieren als Test-Setup. `beforeEach` setzt Store und `localStorage` zurück — jeder Test startet mit leerem State.

**Kritische Pfade:**

- `startGame`: Pool wird korrekt aufgebaut (undiscovered-first)
- `guess` correct: `currentRound` erhöht, Discovery getrackt
- `guess` wrong: Neustart ab Runde 1, Pool neu gemischt
- Game-Over bei Runde 6: Navigation-State korrekt gesetzt

### Akzeptanzkriterien

- [ ] `useGameStore.test.ts` existiert neben dem Store
- [ ] Stub-Scene wird im `beforeEach` im `sceneRegistry` registriert und danach wieder entfernt
- [ ] `startGame` baut Pool mit allen Fixture-Patch-IDs auf
- [ ] `guess(true)` erhöht `currentRound`, setzt `lastGuessResult: "correct"`
- [ ] `guess(false)` setzt `currentRound` auf 1 zurück, mischt Pool neu
- [ ] Nach Runde 6 ist `isGameOver`-Zustand korrekt erkennbar
- [ ] Alle Tests grün

---

## Phase 4: Component-Tests (light)

### Was zu bauen ist

Leichte RTL-Abdeckung für die kritischsten UI-Invarianten. `Toolbar` als Hauptziel (disabled-State während Feedback-Toast). `GlossarPage` für Sortierlogik. `GamePage` und `LevelSelectPage` nur als Smoke-Tests (rendert ohne Crash).

**Priorität:**
1. `Toolbar` — Buttons disabled während `lastGuessResult !== null`
2. `GlossarPage` — Sortierung: neu entdeckt → Schweregrad → alphabetisch
3. `GamePage` — Smoke: rendert ohne Crash bei aktivem Store-State
4. `LevelSelectPage` — Smoke: rendert ohne Crash

### Akzeptanzkriterien

- [ ] `Toolbar.test.tsx`: Buttons disabled wenn `lastGuessResult !== null`; Rundenanzeige zeigt korrekten Text
- [ ] `GlossarPage.test.tsx`: Neu-entdeckte Patches erscheinen zuerst; Tab-Wechsel zeigt andere Patches
- [ ] `GamePage.test.tsx`: Rendert ohne Crash wenn Store aktives Spiel enthält
- [ ] `LevelSelectPage.test.tsx`: Rendert ohne Crash
- [ ] Alle Tests grün, `npm test` ohne Fehler
- [ ] CHANGELOG.md für v0.3.0 aktualisiert
