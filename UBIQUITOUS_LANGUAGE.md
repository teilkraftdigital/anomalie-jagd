# Ubiquitous Language

## Spielwelt (Game World)

| Term | Definition | Aliases to avoid |
|---|---|---|
| **Anomalie** | Eine konkrete Barrierefreiheits-Verletzung, die in eine Scene eingebettet wird | Bug, Fehler, Issue, Patch |
| **Scene** | Eine simulierte Webseite mit einem Basismodell, einer Liste von Anomalien und einem Renderer | Level-Inhalt, UI |
| **Chrome** | Die Seitenstruktur einer Scene (Root, Header, Footer) — kann selbst Anomalien enthalten | Layout, Shell |
| **Block** | Ein typisiertes UI-Element innerhalb einer Scene (z. B. Button) | Element, Component |
| **Basismodell** | Eine vollständig barrierefreie Instanz einer Scene ohne Anomalien | Standardmodell, Default |
| **Patch** | Eine pure Funktion `(model) => model`, die eine Anomalie in ein Basismodell einbettet | Anomalie (im Code-Kontext), Mutation |

## Spielablauf (Game Flow)

| Term | Definition | Aliases to avoid |
|---|---|---|
| **Spiel** | Eine vollständige Spielsitzung mit einem gewählten Schwierigkeitsgrad und sechs Runden | Level, Session |
| **Runde** | Ein einzelner Spielschritt: der Spieler sieht eine Scene und trifft eine Entscheidung | Turn, Step |
| **Schwierigkeitsgrad** | Die Auswahl easy / medium / hard, die bestimmt welche Anomalien im Pool sind | Difficulty, Level |
| **Pool** | Die geordnete Menge noch nicht gezeigter Anomalien im aktuellen Zyklus | Queue, Bag |
| **Zyklus** | Ein vollständiger Durchlauf des Pools; nach Erschöpfung wird der Pool neu gemischt | Runde (Achtung: Verwechslungsgefahr!) |
| **Clean Round** | Eine Runde ohne Anomalie — der Spieler sieht das Basismodell | Leere Runde, Null-Runde |

## Spielerentscheidung (Player Decision)

| Term | Definition | Aliases to avoid |
|---|---|---|
| **"Anomalie gefunden"** | Die Entscheidung des Spielers, dass die aktuelle Scene eine Anomalie enthält | Richtig, Ja |
| **"Keine Anomalie"** | Die Entscheidung des Spielers, dass die aktuelle Scene anomaliefrei ist | Falsch, Nein |
| **Neustart** | Zurücksetzen der Rundenfolge auf Runde 1 bei einer falschen Entscheidung | Reset, Retry |

## Glossar & Persistenz

| Term | Definition | Aliases to avoid |
|---|---|---|
| **Glossar** | Die Seite, auf der alle Anomalien mit A11y-Erklärungen aufgelistet sind | Archiv, Liste |
| **Erklärung** | Der lehrende Text zu einer Anomalie, der im Glossar angezeigt wird sobald sie entdeckt wurde | Beschreibung, Hinweis |
| **Entdeckt** | Eine Anomalie, die der Spieler mindestens einmal korrekt identifiziert hat | Gefunden, Gesehen |
| **Neu entdeckt** | Anomalien, die im letzten abgeschlossenen Spiel erstmals entdeckt wurden | Highlighted |

## Entwicklung & Werkzeuge

| Term | Definition | Aliases to avoid |
|---|---|---|
| **Debug-Modus** | URL-basierter Modus (`?debug=true`) zum direkten Laden einer beliebigen Scene und eines Patches ohne Spielfluss | Dev-Mode, Preview |
| **Schweregrad** | Die Einordnung einer einzelnen Anomalie als easy / medium / hard — Eigenschaft des Patches | Difficulty, Level |

## Relationships

- Eine **Scene** enthält genau ein **Basismodell** und beliebig viele **Anomalien**.
- Ein **Patch** transformiert das **Basismodell** einer **Scene** zu einer Variante mit einer **Anomalie**.
- Ein **Spiel** besteht aus sechs **Runden**; jede Runde zeigt entweder eine **Clean Round** oder eine mit genau einer **Anomalie**.
- Der **Pool** entspricht dem Vorrat an **Anomalien** des gewählten **Schwierigkeitsgrads**, die noch nicht gezeigt wurden.
- Ein **Zyklus** umfasst alle **Anomalien** des Pools; nach einem **Neustart** beginnt ein neuer Zyklus, **Entdeckte** Anomalien bleiben erhalten.

## Example dialogue

> **Dev:** "Wenn der Spieler auf 'Anomalie gefunden' klickt — was genau prüfen wir?"

> **Domain expert:** "Ob im aktuellen Basismodell ein Patch angewendet wurde. Ist `activePatchId` nicht null, hat die Runde eine Anomalie."

> **Dev:** "Und wenn der Spieler falsch liegt — unterscheiden wir zwischen 'fälschlich Anomalie gemeldet' und 'Anomalie nicht erkannt'?"

> **Domain expert:** "Nein. Beides ist ein Neustart. Das Spiel macht keinen Unterschied — der Spieler muss alle sechs Runden korrekt entscheiden."

> **Dev:** "Was passiert mit dem Pool nach einem Neustart?"

> **Domain expert:** "Der Pool wird neu gemischt, aber die entdeckten Anomalien im Glossar bleiben. Der Neustart betrifft nur die Rundenfolge, nicht den Lernfortschritt."

> **Dev:** "Und was ist der Unterschied zwischen einer Runde und einem Zyklus?"

> **Domain expert:** "Eine Runde ist ein einzelner Spielschritt. Ein Zyklus ist ein vollständiger Durchlauf aller Anomalien im Pool — er kann viele Runden umfassen, weil auch Clean Rounds dabei sind."

## Flagged ambiguities

- **"Patch" vs. "Anomalie"**: Im Gespräch werden beide Begriffe für dasselbe Konzept verwendet. Kanonisch: **Anomalie** ist der Domänen-Begriff (was der Spieler identifiziert), **Patch** ist der technische Begriff (die Funktion im Code, die die Anomalie einbettet). In UI und Dokumentation immer **Anomalie** verwenden.
- **"Level" vs. "Spiel"**: "Level" wurde anfangs für eine Spielsitzung verwendet (Level-Select), ist aber mehrdeutig mit Schwierigkeitsgrad. Kanonisch: **Spiel** für die Sitzung, **Schwierigkeitsgrad** für easy/medium/hard. Der Route-Name `/level-select` ist ein Überbleibsel — sollte perspektivisch `/schwierigkeitsgrad` heißen.
- **"Schweregrad" vs. "Schwierigkeitsgrad"**: Zwei verwandte aber distinkte Begriffe. **Schweregrad** ist eine Eigenschaft jeder einzelnen Anomalie (easy/medium/hard). **Schwierigkeitsgrad** ist die Wahl des Spielers, die bestimmt welche Schweregrade im Pool erscheinen.
- **"Runde" vs. "Zyklus"**: Im Gespräch wurde "Runde" gelegentlich für beides verwendet. Kanonisch: **Runde** = einzelner Spielschritt, **Zyklus** = ein vollständiger Pool-Durchlauf.
