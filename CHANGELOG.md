# Changelog

Alle nennenswerten Änderungen am Projekt werden in dieser Datei dokumentiert.

Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/).
Versionierung folgt [Semantic Versioning](https://semver.org/lang/de/).

## [0.5.2] — 2026-04-03

### Hinzugefügt

- `BaseLayout`-Organism: gemeinsamer Seitenwrapper mit Header (Nav + Sprachumschalter) und Footer (Version, Impressum, Datenschutz) — `StartPage` und `LevelSelectPage` nutzen ihn
- Footer: Impressum- und Datenschutz-Links mit `ExternalLink`-Icon und `sr-only`-Hinweis „öffnet in neuem Tab"
- `lucide-react` für Icons hinzugefügt
- Plausible Analytics nur im Production-Build geladen (`import.meta.env.PROD`) — kein Tracking im Dev-Server

### Geändert

- Sprachumschalter: ein Toggle-Button → zwei separate Buttons „DE / EN" mit `aria-pressed` und `lang`-Attribut
- Locale: neue Keys `pages.common.{back,openInNewTab,navigation}`, `pages.start.{footerImprint,footerPrivacy}`, `lang.{switchToEn,switchToDe,labelEn,labelDe}`
- `SceneCard` / `DifficultyCard`: Schriftgrößen leicht angehoben (`text-xs` → `text-sm/base`)

---

## [0.5.1] — 2026-04-03

### Geändert

- Route `/spiel` umbenannt zu `/game` — einheitliche Englisch-Konvention für alle Pfade

---

## [0.5.0] — 2026-04-03

### Hinzugefügt

**Internationalisierung (react-i18next)**

- `react-i18next` + `i18next` eingerichtet; Sprachumschalter (DE/EN) in der Toolbar
- `common`-Namespace für globale UI-Strings (Toolbar, Seiten, Glossar, Schwierigkeitsgrade)
- Pro-Szene-Namespaces (`scene-button`, `scene-form`) mit `i18n.addResourceBundle()` in `App.tsx` registriert
- Szenen-Locale-Dateien: `de.ts` / `en.ts` pro Szene unter `src/app/scenes/{id}/locale/`
- Alle Szenen-Strings (Scenenname, -beschreibung, Renderer-Labels, Patch-Label + -Erklärung) vollständig übersetzt

**Domain-Typen**

- `src/app/engine/locale/types.ts` — generischer `SceneLocale<TRenderer, TPatches extends string>` als Engine-seitige Basis für alle Szenen-Locale-Typen
- `ButtonSceneLocale` / `FormSceneLocale` nutzen den generischen Typ; `TPatches` wird aus den `patches`-Arrays inferiert

### Geändert

- `Scene<TModel>`: `name` und `description` entfernt — gehören jetzt in die Locale-Dateien, nicht mehr ins Scene-Objekt
- `Patch<TModel>`: `label` und `explanation` entfernt, `scene: string` hinzugefügt (wird für Locale-Namespace-Zuordnung benötigt)
- Alle Patches umgestellt auf `as const satisfies Patch<TModel>` — `as const` erhält Literal-Typen für volle Autocomplete-Unterstützung auf `PatchId`; `satisfies` validiert die Struktur
- `patches/index.ts` beider Szenen: explizite `: Patch<any>[]`-Annotation entfernt — notwendig damit `(typeof patches)[number]["id"]` als Union der Literal-Typen auflöst statt `string`
- `createButtonBaseModel()` / `createFormBaseModel()` sind jetzt Funktionen statt Konstanten — Übersetzungen werden zur Spielstart-Zeit aufgelöst, nicht beim Modul-Load

### Behoben

- Tests: `setup.ts` setzt `i18n.changeLanguage("de")` — verhindert, dass jsdom-Standard (`en`) alle deutschen Textassertionen brechen lässt

---

## [0.4.2] — 2026-04-02

### Verbessert

- Shiki: `codeToHtml()` durch `createHighlighterCore()` + `createJavaScriptRegexEngine()` mit expliziten Imports ersetzt (`shiki/langs/html.mjs`, `shiki/themes/github-light.mjs`) — nur HTML-Grammatik und github-light-Theme im Bundle statt alle ~50 Sprachen
- Shiki: statische Imports → dynamische `import()` — Highlighting-Code wird erst geladen wenn der Quellcode-Tab erstmals geöffnet wird (~96 kB gz on demand)
- Highlighter als Modul-Singleton: wird einmal initialisiert und für alle nachfolgenden Renders wiederverwendet
- Bundle: 1 Chunk à 854 kB / 215 kB gz → Haupt-Bundle 274 kB / 87 kB gz + Shiki-Chunks on demand

---

## [0.4.1] — 2026-04-02

### Behoben

- `patchNoAriaDescribedby`: Patch hatte keine Wirkung — Renderer generierte `aria-describedby` automatisch aus `content.hint`, sodass `patchAttrs(remove: ["aria-describedby"])` wirkungslos war. Fix: `aria-describedby` aus `{...attrs}`-Spread herausgelöst; Verknüpfung erfolgt jetzt ausschließlich über explizites `modelDescribedBy` im Modell
- `base.tsx`: `"aria-describedby": "password-hint"` referenzierte eine nie existierende ID — korrigiert auf `"password-repeat-hint"` (passend zur gerenderten `<p id="password-repeat-hint">`)

### Geändert

**Patches**

- `patchNoRequired`: betrifft jetzt alle Pflichtfelder (nicht nur E-Mail) — der Patch modelliert „alle Pflichtfelder ohne `required`-Attribut"
- `patchErrorBorderOnly`: entfernt zusätzlich die `error-summary` — border-only-Fehler mit sichtbarer Summary wäre inkonsistent; die Anomalie ist jetzt klarer abgegrenzt
- `patchRequiredLabelOnly`: vorerst auskommentiert — Abgrenzung zu `patchNoRequired` nach `required-note`-Einführung unklar; wird in 0.4.x überarbeitet

**Renderer**

- `error-summary`: `role="alert"` → `role="status"` — `alert` unterbricht sofort alle laufenden Screen-Reader-Ankündigungen; `status` wartet auf eine Pause und ist bei Formular-Submit semantisch korrekt
- Inline-Fehler-`<p>`: `role="status"` entfernt — Verknüpfung via `aria-describedby` ist ausreichend; doppeltes `role="status"` würde Fehler zweimal ankündigen

---

## [0.4.0] — 2026-04-02

### Hinzugefügt

**Quellcode-Ansicht**

- `GameShell` erhält Vorschau/Quellcode-Tab-Toggle direkt in der Browser-Titelleiste
- ARIA-Tabs-Pattern: `role="tablist/tab/tabpanel"`, `aria-selected`, `aria-controls`, Roving Tabindex (Pfeil-Links/Rechts)
- Scene-Inhalt bleibt immer im DOM; inaktives Panel mit `hidden` für Screen Reader ausgeblendet
- HTML-Serialisierung: `ref` auf Scene-Content, `innerHTML` in vollständigen HTML-Stub eingebettet (`<!DOCTYPE html>`, `<html lang="de">`, `<body><main>`)
- Stub-Titel zeigt den Namen der aktiven Szene (z. B. „Registrierungsformular")
- `js-beautify` formatiert den HTML-Output mit konsistenter Einrückung; alle Elemente auf eigener Zeile (`inline: []`)
- `useShikiHighlight` Hook (`src/hooks/`) — async Syntax-Highlighting via Shiki (`github-light` Theme, Inline-Styles, kein Tailwind-Konflikt)
- Fallback auf ungehighlighteten `<pre><code>`-Block bis Shiki geladen hat
- CSS-Klassen-Toggle: Button `class="…"` ersetzt alle `class`-Attributwerte durch `…` — reduziert Rauschen durch Tailwind-Klassen
- word-wrap (`whitespace-pre-wrap`) verhindert horizontalen Overflow bei langen Klassen-Strings
- Quellcode-Ansicht synct automatisch bei Rundenwechsel, auch wenn der Tab bereits aktiv ist

**Szene: Registrierungsformular**

- Neuer Block-Typ `required-note`: zeigt `* Alle Felder sind Pflichtfelder` im Formular — Basismodell ist damit WCAG-konform bezüglich Pflichtfeld-Kennzeichnung
- `patchNoRequiredNote` (easy) — entfernt den Pflichtfeld-Hinweis; Spieler muss erkennen, dass kein Hinweis vorhanden ist

### Verbessert

- `Toolbar`: 3-Spalten-Grid-Layout — „Aufgeben"/Rundenanzeige links, Aktions-Buttons mittig, Schwierigkeitsgrad rechts
- Abhängigkeiten: `js-beautify`, `@types/js-beautify`, `shiki` hinzugefügt

---

## [0.3.0] — 2026-04-01

### Hinzugefügt

**Test-Infrastruktur**

- Vitest + jsdom + @testing-library/react + @testing-library/user-event eingerichtet
- `npm test` als Script in `package.json`
- `src/test-utils/`: `testScene.ts` (Minimal-Stub-Fixture), `renderWithRouter.tsx`, `setup.ts`
- 49 Tests in 4 Schichten: Engine, Store, Components (Toolbar, GlossarPage, GamePage, LevelSelectPage)

**Engine-Tests** (`src/app/engine/`)

- `poolLogic`: `buildPool`-Invarianten — Membership, undiscovered-first, Fallback wenn alle entdeckt
- `roundLogic`: `isGameOver`-Grenzwerte, `pickNextPatch`-Pool-Refill via `vi.spyOn(Math, 'random')`
- `discoveryLogic`: `trackDiscovery`-Akkumulation über Neustarts, kein Doppeleintrag
- `sessionLogic`: `initSession`-Difficulty-Filter, undiscovered-first Pool, Unknown-Scene-Fehler

**Store-Tests** (`src/store/`)

- `startGame`: Pool-Aufbau, Difficulty-Filter, State-Reset
- `guess` correct/wrong: `lastGuessResult`, `currentRound`, Discovery-Tracking, Neustart-Logik
- Game-Over-Erkennung bei Runde `GAME_ROUNDS`

**Component-Tests**

- `Toolbar`: Buttons disabled während `lastGuessResult !== null` oder `currentRound === 0`
- `GlossarPage`: Sortierung (neu entdeckt zuerst, dann Schweregrad), Tab-Wechsel per Klick
- `GamePage`: Smoke-Test mit aktivem Spielstand
- `LevelSelectPage`: Smoke-Test, Start-Button ohne Auswahl nicht vorhanden

### Geändert

- `rng.ts`: seeded-RNG-Erweiterungen entfernt (`setSeed`, `random`, `randomInt`, `randomChoice`, `randomBool`) — nur `shuffle` verbleibt

---

## [0.2.0] — 2026-03-28

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

- `/game?debug=true&scene=...&patch=...` — Szene und Patch per URL-Parameter steuerbar
- DebugBar ersetzt die Toolbar; URLs sind bookmarkbar
- Kein aktiver Spielstand nötig

**Technische Grundlagen**

- Szenen-/Patch-System (`Scene<TModel>`, `Patch<TModel>`) mit `sceneRegistry`
- Zustand-Store (Zustand) mit devtools; nur `discoveredPatchIds` persistiert
- React Router v7, React 19, Tailwind CSS v4
- TypeScript-Build ohne Fehler

---
