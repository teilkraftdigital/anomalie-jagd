# Changelog

Alle nennenswerten Änderungen am Projekt werden in dieser Datei dokumentiert.

Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/).
Versionierung folgt [Semantic Versioning](https://semver.org/lang/de/).

---

## [0.1.0] — 2026-03-28 — MVP

Erster spielbarer Stand. Vollständiger Game Loop, zwei Szenen, Glossar und Debug-Modus.

### Hinzugefügt

**Game Loop**

- 6-Runden-Spielablauf: Runde 1 immer sauber (mit Hinweis-Banner), Runden 2–6 zufällig sauber oder mit einer Anomalie
- Korrekte Antwort → nächste Runde; falsche Antwort → Neustart ab Runde 1 mit neu gemischtem Pool
- Nach Runde 6: Navigation zum Glossar mit Hervorhebung neu entdeckter Anomalien
- `newlyDiscoveredPatchIds` akkumuliert über Neustarts hinweg; wird erst beim Glossar-Aufruf geleert

**Pool-Mechanik**

- `patchPool` mit Undiscovered-First-Logik: noch nicht entdeckte Anomalien kommen zuerst
- Pool leert sich pro Zyklus (jede Anomalie max. einmal), danach automatisches Neubefüllen
- `discoveredPatchIds` wird in localStorage persistiert

**Szene: Button** (5 Anomalien)

- `patchDivButton` — Button als `<div>` statt `<button>` (schwer)
- `patchNoLabel` — Button ohne sichtbares Label (schwer)
- `patchTabIndex` — `tabindex="-1"` entfernt den Button aus dem Fokus (mittel)
- `patchNoType` — fehlendes `type`-Attribut (leicht)
- `patchLowContrast` — zu geringer Farbkontrast (leicht)
- `patchRoleAttribute` — falsches `role`-Attribut (mittel)

**Szene: Registrierungsformular** (11 Anomalien)

- `patchNoLabel` — Eingabefeld ohne `<label>` (schwer)
- `patchLabelNotLinked` — Label nicht mit `for`/`id` verknüpft (mittel)
- `patchNoRequired` — Pflichtfeld ohne `required`-Attribut (leicht)
- `patchRequiredLabelOnly` — Pflichtfeld nur im Label markiert, kein `required` (mittel)
- `patchNoAutocomplete` — fehlendes `autocomplete`-Attribut (leicht)
- `patchWrongInputType` — falscher `type` (z. B. `text` statt `email`) (leicht)
- `patchNoAriaDescribedby` — Fehlermeldung ohne `aria-describedby`-Verknüpfung (mittel)
- `patchCheckboxNoName` — Checkbox ohne `name`-Attribut (mittel)
- `patchPasswordRevealDiv` — Passwort-Sichtbarkeit-Toggle als `<div>` (schwer)
- `patchNoErrorSummary` — Fehler-Zusammenfassung fehlt komplett (schwer)
- `patchErrorBorderOnly` — Fehler nur durch roten Rand signalisiert, kein Text (mittel)

**Schwierigkeitsgrade**

- Leicht: nur Anomalien der Stufe `easy`
- Mittel: `easy` + `medium`
- Schwer: alle Anomalien

**Seiten & Navigation**

- Startseite mit Spielbeschreibung und -anleitung
- Level-Auswahl: Szene und Schwierigkeitsgrad wählbar
- Spielseite mit Toolbar (Anomalie/Kein Fehler, Aufgeben, Glossar-Link)
- Glossar: alle entdeckten Anomalien mit Beschreibung, sortiert nach Schweregrad
- Zurück-Link von Level-Auswahl zur Startseite

**Debug-Modus**

- `/spiel?debug=true&scene=...&patch=...` — Szene und Patch per URL-Parameter steuerbar
- DebugBar ersetzt die Toolbar; URLs sind bookmarkbar
- Kein aktiver Spielstand nötig

**Technische Grundlagen**

- Szenen-/Patch-System (`Scene<TModel>`, `Patch<TModel>`) mit `sceneRegistry`
- Zustand-Store (Zustand) mit devtools; nur `discoveredPatchIds` persistiert
- React Router v7, React 19, Tailwind CSS v4
- TypeScript-Build ohne Fehler

---

## [0.2.0] — unveröffentlicht

### Hinzugefügt

- Versionsnummer wird dezent auf der Startseite angezeigt (aus `package.json`, zur Build-Zeit injiziert)

### Verbessert

- Semantic HTML und ARIA-Rollen in allen Seiten und Layout-Komponenten:
  - `GameShell`: `div` → `section[aria-label]`, dekorative Elemente `aria-hidden`
  - `Toolbar`: `div` → `header`, Rundenanzeige `p` → `output`, Pfeil `aria-hidden`
  - `GamePage`: `main`-Wrapper, `role="status"` auf Hinweis-Banner, `role="status"` auf Feedback-Toast
  - `GlossarPage`: `div` → `header`, `role="tablist/tab/tabpanel"`, Toast `role="status"`, Patch-Liste `ul/li`
  - `LevelSelectPage`: `main`-Wrapper, Überschriften auf `h2` korrigiert, Rücklink in `nav`, Schwierigkeitsgrad-Buttons als Radio-Inputs mit `label`

### Behoben

- `aira-controls`-Tippfehler in `DebugBar` (war ein stilles No-op; Screenreader konnten das Panel nicht finden)
- `DebugBar`-Panel nutzt jetzt `hidden`-Attribut statt bedingtem Render — Panel bleibt im DOM und ist für assistive Technologien zugänglich

### Geändert

- Anomalie-Wahrscheinlichkeit pro Runde von 50 % auf 75 % erhöht — sorgt für mehr Trainingsmomente pro Spieldurchlauf
- `DIFFICULTIES`-Konstante aus `LevelSelectPage` nach `Scene.ts` verschoben (shared, nicht mehr lokal)
- Button-Szene: Label und Alert-Text eingedeutscht ("Eine verdächtige Schaltfläche")
- Passwort-Wiederholung-Feld erhält jetzt einen sichtbaren Hinweistext ("Passwort muss mit dem oberen übereinstimmen") via neuem optionalem `hint`-Feld in `InputContent`

### Refactoring (Phase 1 — Engine aufteilen)

- `poolLogic.ts` — `buildPool` (Undiscovered-First-Logik) und `refillPool` als pure Funktionen
- `discoveryLogic.ts` — `trackDiscovery` als pure Funktion; neuer Typ `DiscoveredPatchIds`
- `roundLogic.ts` — `isGameOver`, `pickNextPatch`, Konstanten `GAME_ROUNDS` / `GAME_ANOMALY_CHANCE`
- `sessionLogic.ts` — `initSession` bündelt Scene-Auflösung, Difficulty-Filter und Pool-Aufbau
- `useGameStore` delegiert alle Berechnungen an diese Module; enthält keine eigene Spiellogik mehr
- `rng.ts` bereinigt: ungenutztes `buildPool` entfernt, nur `shuffle` verbleibt

### Refactoring (Phase 2 — Hooks extrahieren)

- `src/hooks/useGameSession.ts` — kapselt Store-Selektoren, Guard-Redirect und Toast-Effekt
- `src/hooks/useDebugMode.ts` — kapselt URL-Parameter-Logik für den Debug-Modus
- `GamePage.tsx` ist jetzt eine reine Render-Komponente ohne `useEffect`- oder Store-Logik

### Refactoring (Phase 3 — Organisms einführen)

- `src/components/organisms/` angelegt
- `Toolbar`, `GameShell`, `DebugBar` aus `src/app/layout/` dorthin verschoben
- `src/app/layout/` enthält nur noch `partials/` mit `DifficultyCard` und `SceneCard` (folgen in Phase 4)

### Refactoring (Phase 4 — Molecules & Atoms extrahieren)

- `src/components/atoms/SeverityBadge.tsx` — Severity-Label mit easy/medium/hard-Varianten
- `src/components/atoms/RoundDisplay.tsx` — `<output>`-Element mit Rundenanzeige, nutzt `GAME_ROUNDS`
- `src/components/molecules/PatchCard.tsx` — Einzelner Patch-Eintrag inkl. `SeverityBadge`
- `src/components/molecules/GlossarTabs.tsx` — Tab-Navigation mit vollständiger ARIA-Semantik
- `DifficultyCard` und `SceneCard` nach `src/components/molecules/` verschoben
- `src/app/layout/` vollständig aufgelöst

### Refactoring (Phase 5 — Aufräumen)

- `CLAUDE.md` aktualisiert: neue Ordnerstruktur, Atomic Design Konventionen, Hook-Richtlinie, Engine-Module
- `plans/refactor-solid-atomic-design.md` als abgeschlossen markiert
- `src/app/` enthält ausschließlich `engine/` und `scenes/` — keine Layout-Reste
