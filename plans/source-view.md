# Plan: Quellcode-Ansicht (v0.3.0)

> Quelle: Grill-Me-Session 2026-04-02

## Architekturentscheidungen

- **Tab-UI**: ARIA-Tabs-Pattern (`role="tablist"` / `role="tab"` / `role="tabpanel"`) mit Roving Tabindex (Pfeil-Links/Rechts-Navigation)
- **Tabs**: `Vorschau` | `Quellcode` — direkt in der GameShell-Titelleiste neben den Ampel-Dots
- **Children im DOM**: Scene-Inhalt bleibt immer gemountet; inaktives Panel wird mit `hidden`-Attribut ausgeblendet (Screen Reader + sichtbar)
- **Tab-State**: Lokaler `useState` in `GameShell` — kein Store, kein URL-Parameter; Reset erfolgt automatisch über den `key`-Prop beim Rundenwechsel
- **HTML-Generierung**: `ref` auf den Content-div der Scene; `innerHTML` serialisieren + in HTML-Stub einbetten
- **HTML-Stub**: `<!DOCTYPE html>` + `<html lang="de">` + minimaler `<head>` + `<body><main>` + Inhalt — lehrt semantische Dokumentstruktur als Nebeneffekt
- **Formatierung**: `js-beautify` für konsistente Einrückung
- **Highlighting**: Shiki (`codeToHtml`) — Inline-Styles, kein CSS-Konflikt mit Tailwind
- **CSS-Anomalien**: Kein CSS-Tab — visuell/interaktive Anomalien (Kontrast, Fokus) sind im Vorschau-Tab erkennbar; strukturelle/semantische im Quellcode-Tab
- **Scene-Authoring-Konvention**: Alle Anomalien müssen in HTML-Attributen oder -Struktur sichtbar sein (`class`, `role`, `aria-*`, Element-Tag) — keine reinen Pseudo-Klassen-Tricks außerhalb von Tailwind-Klassen
- **Raten**: Aus beiden Tabs möglich — Toolbar bleibt immer aktiv

---

## Phase 1: Abhängigkeiten installieren

### Was zu bauen ist

`js-beautify` und `shiki` als Produktionsabhängigkeiten installieren. Typen für `js-beautify` als Dev-Abhängigkeit. Sicherstellen dass `npm run build` und `npm run lint` danach weiterhin fehlerfrei laufen.

### Akzeptanzkriterien

- [ ] `js-beautify` und `@types/js-beautify` installiert
- [ ] `shiki` installiert
- [ ] `npm run build` fehlerfrei
- [ ] `npm run lint` fehlerfrei

---

## Phase 2: GameShell — Tab-UI

### Was zu bauen ist

`GameShell` erhält einen `useState<"vorschau" | "quellcode">("vorschau")`. In der Titelleiste (zwischen Ampel-Dots und URL-Bar) wird ein `role="tablist"` mit zwei `role="tab"`-Buttons eingefügt. Roving Tabindex: aktiver Tab hat `tabindex="0"`, inaktiver `tabindex="-1"`. Pfeiltasten-Handler wechselt den Tab und verschiebt den Fokus.

Die Scene-Children werden in ein `role="tabpanel"` eingebettet. Das Quellcode-Panel ist initial leer (`null`) — es wird erst in Phase 3 befüllt. Beide Panels bleiben im DOM; inaktives Panel erhält `hidden`.

```
GameShell
├── Titelleiste
│   ├── Ampel-Dots (aria-hidden)
│   ├── [role="tablist"] "Ansicht wählen"
│   │   ├── [role="tab"] "Vorschau"   aria-selected aria-controls="panel-vorschau"
│   │   └── [role="tab"] "Quellcode"  aria-selected aria-controls="panel-quellcode"
│   └── URL-Bar (aria-hidden)
├── [role="tabpanel" id="panel-vorschau"]  ← children (Scene)
└── [role="tabpanel" id="panel-quellcode"] ← Quellcode (Phase 3+4)
```

### Akzeptanzkriterien

- [ ] Zwei Tabs in der Titelleiste sichtbar und korrekt gestylt
- [ ] Aktiver Tab hat `aria-selected="true"`, inaktiver `aria-selected="false"`
- [ ] Roving Tabindex: Pfeil-Links/Rechts wechselt Tab und verschiebt Fokus
- [ ] `Tab`-Taste springt vom Tablist in den aktiven Panel-Inhalt
- [ ] Scene wird bei Tab-Wechsel nicht unmounted (kein State-Reset)
- [ ] Inaktives Panel hat `hidden`-Attribut
- [ ] `npm run build` und `npm run lint` fehlerfrei

---

## Phase 3: HTML-Serialisierung

### Was zu bauen ist

`GameShell` erhält einen `ref` auf den Content-div der Scene (das `<div className="bg-white">` das `children` enthält). Eine utility-Funktion `serializeScene(innerHTML: string): string` baut daraus den vollständigen HTML-Stub:

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <title>Anomalie-Jagd</title>
  </head>
  <body>
    <main>
      <!-- serialisierter innerHTML -->
    </main>
  </body>
</html>
```

Anschließend wird der String mit `js-beautify` (`html_beautify`) formatiert. Das Ergebnis wird im Quellcode-Panel als roher Text in einem `<pre><code>`-Block dargestellt (noch ohne Highlighting — kommt in Phase 4).

Der serialisierte HTML-String wird bei Tab-Wechsel zu "Quellcode" per `useEffect` neu berechnet.

### Akzeptanzkriterien

- [ ] `ref` auf Content-div gesetzt
- [ ] `serializeScene` utility existiert und gibt validen HTML-Stub zurück
- [ ] HTML ist mit `js-beautify` eingerückt (2-Space oder 4-Space, konsistent)
- [ ] Quellcode-Panel zeigt formatierten HTML-String in `<pre><code>`
- [ ] Bei Rundenwechsel (neuer `key`) wird der String verworfen und beim nächsten Tab-Wechsel neu berechnet
- [ ] `npm run build` und `npm run lint` fehlerfrei

---

## Phase 4: Shiki-Highlighting + Feinschliff

### Was zu bauen ist

Den `html_beautify`-Output durch `shiki`'s `codeToHtml` laufen lassen. Da Shiki async ist, braucht das Panel einen Loading-State (`"loading" | "ready"`). Während Shiki rechnet, zeigt das Panel den ungehighlighteten `<pre><code>`-Block aus Phase 3 (kein leerer Screen). Shiki rendert Inline-Styles — kein separates CSS nötig, kein Tailwind-Konflikt.

Theme-Empfehlung: `github-light` oder `vitesse-light` — passend zur hellen GameShell-Optik.

Den `codeToHtml`-Aufruf in einen eigenen Hook `useShikiHighlight(code: string)` extrahieren der `{ html: string; loading: boolean }` zurückgibt.

### Akzeptanzkriterien

- [ ] `useShikiHighlight` hook existiert in `src/hooks/`
- [ ] Hook gibt `loading: true` zurück während Shiki async arbeitet
- [ ] Sobald `loading: false` wird der Shiki-HTML via `dangerouslySetInnerHTML` gerendert
- [ ] Während Loading: ungehighlighteter `<pre><code>` sichtbar (kein leerer State)
- [ ] Theme ist konsistent mit der hellen GameShell-Optik
- [ ] Quellcode-Panel ist horizontal scrollbar bei langen Zeilen (kein Layout-Overflow)
- [ ] `npm run build`, `npm run lint`, `npm test` fehlerfrei
- [ ] CHANGELOG.md für v0.3.0 aktualisiert

---

## Designprinzip (für Review)

> Der Quellcode-Tab ist ein eingebautes DevTools-Fenster, kein Hint-System. Er macht das Spiel weder einfacher noch schwerer — er gibt dem Spieler dasselbe Werkzeug, das er in echten Projekten auch hätte.
>
> **Vorschau-Tab** entdeckt visuelle/interaktive Anomalien (Kontrast, Fokus, Verhalten).  
> **Quellcode-Tab** entdeckt strukturelle/semantische Anomalien (falsche Tags, fehlende Attribute).
>
> Beide Tabs ergänzen sich — manche Patches sind nur in einem der beiden offensichtlich.
