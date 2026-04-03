import type { ButtonSceneLocale } from "./types";

const de: ButtonSceneLocale = {
  scene: {
    name: "Button",
    description: "Ein einfacher Button, der angeklickt werden kann.",
  },
  renderer: {
    heading: "Button-Szene",
    buttonLabel: "Eine verdächtige Schaltfläche",
    alertMessage: "Schaltfläche geklickt!",
  },
  patches: {
    "patch-no-label": {
      label: "Kein zugänglicher Name",
      explanation:
        "Ein Button ohne sichtbaren Text und ohne aria-label hat keinen zugänglichen Namen. Screenreader können den Zweck des Buttons nicht kommunizieren.",
    },
    "patch-div-button": {
      label: "<div> statt <button>",
      explanation:
        "Ein <div> ist kein interaktives Element. Es ist nicht per Tastatur fokussierbar, sendet kein click-Event bei Enter/Space und wird von Screenreadern nicht als solches angekündigt.",
    },
    "patch-role-attribute": {
      label: "Falsches role-Attribut",
      explanation:
        'role="link" auf einem <button> ist semantisch falsch. Assistive Technologien erwarten dann Navigationsverhalten (href), finden aber keines.',
    },
    "patch-no-type": {
      label: 'Fehlendes type="button"',
      explanation:
        'Ohne type="button" hat ein <button> in einem Formular automatisch type="submit". Das kann ungewollte Formular-Übermittlungen auslösen und ist für Entwickler und Nutzer schwer nachvollziehbar.',
    },
    "patch-tab-index": {
      label: "tabIndex=−1 (nicht per Tastatur erreichbar)",
      explanation:
        "tabIndex=-1 entfernt den Button aus der Tab-Reihenfolge. Tastaturnutzer und Screenreader-Nutzer können den Button nicht mehr fokussieren oder aktivieren.",
    },
    "patch-low-contrast": {
      label: "Zu geringer Farbkontrast",
      explanation:
        "Das Kontrastverhältnis zwischen Textfarbe und Hintergrund liegt unter dem WCAG-Mindestwert von 4,5:1. Für Nutzer mit Sehschwäche ist der Button-Text kaum lesbar.",
    },
  },
};

export default de;
