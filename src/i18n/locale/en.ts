const en = {
  toolbar: {
    quit: "Quit",
    anomaly: "Anomaly found",
    noAnomaly: "No anomaly",
  },
  gameshell: {
    gameArea: "Game area",
    chooseView: "Choose view",
    preview: "Preview",
    source: "Source",
    toggleClasses: 'class="…"',
    hideClasses: "Hide CSS classes",
    showClasses: "Show CSS classes",
  },
  feedback: {
    correct: "Correct!",
    wrong: "Wrong!",
  },
  round: {
    label: "Round {{current}}/{{total}}",
    hint: "Round 1: Take a close look at the scene — there's no anomaly here yet.",
  },
  difficulty: {
    easy: { label: "Easy", description: "Obvious anomalies only" },
    medium: { label: "Medium", description: "Easy + medium anomalies" },
    hard: { label: "Hard", description: "All anomalies" },
  },
  severity: {
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
  },
  pages: {
    start: {
      subtitle:
        "Can you spot the accessibility issues before anyone else does?",
      play: "Play",
      glossar: "View glossary",
      footerBy: "A project by",
      steps: [
        "You see a simulated web component — interact with it and look closely.",
        'Decide: Does it contain an accessibility anomaly? Click "Anomaly found" or "No anomaly".',
        "Correct → next round. Wrong → start over. Can you complete all 6 rounds?",
      ],
    },
    levelSelect: {
      title: "Select level",
      subtitle: "Choose a scene and a difficulty level.",
      back: "Start",
      sceneHeading: "Scene",
      difficultyHeading: "Difficulty",
      play: "Play",
      discovered: "{{discovered}}/{{total}} anomalies discovered",
    },
    glossar: {
      title: "Anomaly Glossary",
      playAgain: "Play again",
      back: "Start",
      toastSuccess: "Done!",
      toastDiscovered: "{{count}} new anomaly/anomalies discovered.",
      notDiscovered: "Not yet discovered",
      newBadge: "Newly discovered",
    },
  },
  lang: {
    switchTo: "DE",
    label: "Switch language",
  },
} as const;

export default en;
