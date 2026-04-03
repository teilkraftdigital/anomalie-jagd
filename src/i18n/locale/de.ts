const de = {
  toolbar: {
    quit: "Aufgeben",
    anomaly: "Anomalie gefunden",
    noAnomaly: "Keine Anomalie",
  },
  gameshell: {
    gameArea: "Spielbereich",
    chooseView: "Ansicht wählen",
    preview: "Vorschau",
    source: "Quellcode",
    toggleClasses: 'class="…"',
    hideClasses: "CSS-Klassen ausblenden",
    showClasses: "CSS-Klassen anzeigen",
  },
  feedback: {
    correct: "Richtig!",
    wrong: "Leider falsch!",
  },
  round: {
    label: "Runde {{current}}/{{total}}",
    hint: "Runde 1: Schau dir die Scene genau an — hier gibt es noch keine Anomalie.",
  },
  difficulty: {
    easy: { label: "Easy", description: "Nur offensichtliche Anomalien" },
    medium: { label: "Medium", description: "Easy + mittelschwere Anomalien" },
    hard: { label: "Hard", description: "Alle Anomalien" },
  },
  severity: {
    easy: "Leicht",
    medium: "Mittel",
    hard: "Schwer",
  },
  pages: {
    common: {
      back: "Zurück",
      openInNewTab: " (öffnet in neuem Tab)",
      navigation: "Hauptnavigation",
    },
    start: {
      subtitle:
        "Kannst du die Barrierefreiheits-Fehler finden, bevor sie anderen auffallen?",
      play: "Spielen",
      glossar: "Glossar ansehen",
      footerBy: "Ein Projekt von",
      footerPrivacy: "Datenschutz",
      footerImprint: "Impressum",
      steps: [
        "Du siehst eine simulierte Webkomponente — interagiere damit und schau genau hin.",
        'Entscheide: Enthält sie eine Barrierefreiheits-Anomalie? Klick auf "Anomalie gefunden" oder "Keine Anomalie".',
        "Richtig → nächste Runde. Falsch → von vorne. Schaffst du alle 6 Runden?",
      ],
    },
    levelSelect: {
      title: "Level auswählen",
      subtitle: "Wähle eine Scene und einen Schwierigkeitsgrad.",
      back: "Start",
      sceneHeading: "Scene",
      difficultyHeading: "Schwierigkeitsgrad",
      play: "Spielen",
      discovered: "{{discovered}}/{{total}} Anomalien entdeckt",
    },
    glossar: {
      title: "Anomalien-Glossar",
      playAgain: "Nochmal spielen",
      back: "Start",
      toastSuccess: "Geschafft!",
      toastDiscovered: "{{count}} neue Anomalie(n) entdeckt.",
      notDiscovered: "Noch nicht entdeckt",
      newBadge: "Neu entdeckt",
    },
  },
  lang: {
    switchToEn: "EN",
    switchToDe: "DE",
    label: "Sprache wechseln",
  },
  debugBar: {
    debug: "Debug",
    toggle: {
      open: "einklappen",
      close: "ausklappen",
    },
    scene: "Scene",
    patch: "Patch",
    patchId: "Patch ID",
    patchExplanation: "Erklärung",
  },
} as const;

export default de;
