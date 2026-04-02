# anomalie jagd

Ein Lernspiel rund um Barrierefreiheit im Web. Spieler:innen sehen eine simulierte Webkomponente und entscheiden pro Runde: Enthält sie eine Accessibility-Anomalie oder nicht?

## Neu in 0.4.x

- **Quellcode-Ansicht** — Tab-Toggle im Browser-Chrome zeigt das serialisierte HTML der aktuellen Scene mit Syntax-Highlighting (Shiki). CSS-Klassen lassen sich ausblenden um den Blick auf Struktur und ARIA-Attribute zu schärfen.
- **Pflichtfeld-Hinweis** im Registrierungsformular — neue Anomalie: Hinweis fehlt komplett
- **Bundle-Optimierung** — Shiki wird erst geladen wenn der Quellcode-Tab geöffnet wird (~96 kB gz on demand statt beim Start)

## Spielprinzip

- **6 Runden** pro Spiel
- Runde 1 ist immer sauber (kein Fehler) — zur Orientierung
- Runden 2–6: 75 % Wahrscheinlichkeit für eine Anomalie
- **Richtig** → nächste Runde
- **Falsch** → Neustart ab Runde 1
- Nach Runde 6: Glossar mit allen entdeckten Anomalien

Einmal entdeckte Anomalien werden lokal gespeichert und im Glossar angezeigt.

## Starten

```bash
npm install
npm run dev
```

| Befehl | Beschreibung |
|---|---|
| `npm run dev` | Vite Dev-Server starten |
| `npm run build` | Typ-Check + Build |
| `npm run lint` | ESLint |
| `npm test` | Vitest (49 Tests) |

## Debug-Modus

Einzelne Anomalien lassen sich direkt über URL-Parameter testen — kein aktives Spiel nötig:

```
/spiel?debug=true&scene=button&patch=patch-id
```

Die URLs sind bookmarkbar.

## Szenen

| Szene | Anomalien | Beschreibung |
|---|---|---|
| Button | 6 | Simulierte Button-Komponente (fehlende Labels, falsche Rollen, Kontrast, …) |
| Formular | 11 | Registrierungsformular mit Validierung (fehlende Labels, Autocomplete, Fehlerzusammenfassung, …) |

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/) — State Management
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Shiki](https://shiki.style/) — Syntax-Highlighting im Quellcode-Tab
- [js-beautify](https://github.com/beautify-web/js-beautify) — HTML-Formatierung
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) — Tests
