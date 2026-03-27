# anomalie jagd

Ein Lernspiel rund um Barrierefreiheit im Web. Spieler:innen sehen eine simulierte Webkomponente und entscheiden pro Runde: Enthält sie eine Accessibility-Anomalie oder nicht?

## Spielprinzip

- **6 Runden** pro Spiel
- Runde 1 ist immer sauber (kein Fehler) — zur Orientierung
- Runden 2–6: 50/50 — entweder sauber oder eine zufällige Anomalie
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

## Debug-Modus

Einzelne Anomalien lassen sich direkt über URL-Parameter testen — kein aktives Spiel nötig:

```
/spiel?debug=true&scene=button&patch=patch-id
```

Die URLs sind bookmarkbar.

## Szenen

| Szene | Beschreibung |
|---|---|
| Button | Simulierte Button-Komponente (fehlende Labels, falsche Rollen, Kontrast, …) |
| Formular | Registrierungsformular mit Validierung (fehlende Labels, Autocomplete, Fehlerzusammenfassung, …) |

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/) — State Management
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
