import type { FormSceneLocale } from "./types";

const de: FormSceneLocale = {
  scene: {
    name: "Registrierungsformular",
    description:
      "Ein Registrierungsformular mit Name, E-Mail, Passwort und AGB.",
  },
  renderer: {
    heading: "Registrieren",
    errorSummary: {
      label: "Fehlerübersicht",
      intro: "Bitte korrigiere die folgenden Fehler:",
    },
    requiredNote: "Alle Felder sind Pflichtfelder",
    submitFallback: "Absenden",
    fields: {
      name: {
        label: "Name",
        placeholder: "Max Mustermann",
        validation: {
          required: "Bitte gib deinen Namen ein.",
          minLength: "Name muss mindestens 2 Zeichen lang sein.",
        },
      },
      email: {
        label: "E-Mail",
        placeholder: "max@example.com",
        validation: {
          required: "Bitte gib deine E-Mail-Adresse ein.",
          pattern: "Bitte gib eine gültige E-Mail-Adresse ein.",
        },
      },
      password: {
        label: "Passwort",
        placeholder: "••••••••",
        revealLabel: "Passwort anzeigen",
        validation: {
          required: "Bitte gib ein Passwort ein.",
          minLength: "Passwort muss mindestens 8 Zeichen lang sein.",
        },
      },
      passwordRepeat: {
        label: "Passwort wiederholen",
        placeholder: "••••••••",
        hint: "Passwort muss mit dem oberen übereinstimmen.",
        revealLabel: "Passwort anzeigen",
        validation: {
          required: "Bitte wiederhole dein Passwort.",
          match: "Die Passwörter stimmen nicht überein.",
        },
      },
      agb: {
        checkboxLabel: "Ich stimme den AGB zu",
        validation: {
          required: "Bitte stimme den AGB zu.",
        },
      },
      submit: { label: "Registrieren" },
    },
  },
  patches: {
    "form-patch-no-label": {
      label: "Keine Label an Input-Feldern",
      explanation:
        "Alle Inputs ohne zugehöriges <label> haben keinen zugänglichen Namen. Screenreader können den Zweck des Feldes nicht kommunizieren.",
    },
    "form-patch-wrong-input-type": {
      label: "Falscher input type (text statt email)",
      explanation:
        'type="email" aktiviert die E-Mail-Tastatur auf Mobilgeräten, validiert das Format und hilft Passwortmanagern. type="text" deaktiviert all das.',
    },
    "form-patch-label-not-linked": {
      label: "Label nicht mit Input verknüpft",
      explanation:
        "Ohne for-Attribut am <label> und passendem id am <input> ist die Verknüpfung nicht vorhanden. Klick auf den Label fokussiert das Feld nicht, Screenreader lesen den Label möglicherweise nicht vor.",
    },
    "form-patch-no-required": {
      label: "Pflichtfeld ohne required-Attribut",
      explanation:
        "Ohne required können assistive Technologien das Feld nicht als Pflichtfeld ankündigen. Nutzer von Screenreadern wissen nicht, dass das Feld ausgefüllt werden muss. Es gibt zwar eine visuelle Kennzeichnung, aber sie ist nicht ausreichend.",
    },
    "form-patch-no-autocomplete": {
      label: "Kein autocomplete am Passwort-Feld",
      explanation:
        'Ohne autocomplete="new-password" können Passwortmanager das Feld nicht korrekt befüllen. Nutzer mit kognitiven Einschränkungen sind besonders auf Passwortmanager angewiesen.',
    },
    "form-patch-checkbox-no-name": {
      label: "Checkbox ohne zugänglichen Namen",
      explanation:
        "Eine Checkbox mit sichtbarem Label-Text jedoch ohne aria-label oder label-Element hat keinen zugänglichen Namen. Screenreader können den Zweck der Checkbox nicht kommunizieren.",
    },
    "form-patch-password-reveal-div": {
      label: "Password-Reveal als nicht-interaktives div",
      explanation:
        "Ein <div> als Klick-Ziel ist nicht per Tastatur fokussierbar, sendet kein click-Event bei Enter/Space und wird von Screenreadern nicht als Button angekündigt.",
    },
    "form-patch-no-aria-describedby": {
      label: "Passwort-Wiederholung ohne aria-describedby",
      explanation:
        "Ohne aria-describedby erhält der Screenreader-Nutzer keinen Hinweis, dass das Feld mit dem Passwort-Feld übereinstimmen muss. Der Hinweistext existiert im DOM, ist aber nicht mit dem Input verknüpft.",
    },
    "form-patch-no-error-summary": {
      label: "Fehlerzusammenfassung fehlt",
      explanation:
        "Nach dem Absenden eines Formulars mit Fehlern sollte eine Fehlerzusammenfassung angezeigt werden, auf die der Fokus gesetzt wird. Ohne sie müssen Screenreader-Nutzer das gesamte Formular durchsuchen, um Fehler zu finden.",
    },
    "form-patch-error-border-only": {
      label:
        "Fehler nur als roter Rand, ohne Hilfetext und Fehlerzusammenfassung",
      explanation:
        "Fehlermeldungen dürfen nicht ausschließlich durch Farbe kommuniziert werden. Ein roter Rand ohne erklärenden Text ist für Menschen mit Farbenblindheit nicht erkennbar und bietet Screenreader-Nutzern keine Information darüber, was falsch ist.",
    },
    "form-patch-no-required-note": {
      label: "Kein Pflichtfeld-Hinweis",
      explanation:
        'Der Hinweis "* Alle Felder sind Pflichtfelder" fehlt. Nutzer — besonders mit kognitiven Einschränkungen — wissen dann nicht, dass alle Felder ausgefüllt werden müssen, bevor sie das Formular absenden.',
    },
    "form-patch-submit-no-type": {
      label: 'Absenden-Button ohne explizites type="submit"',
      explanation:
        'Ohne type="submit" hat ein <button> im Formular standardmäßig den Typ "submit". Wenn jedoch JavaScript zur Handhabung der Formularübermittlung verwendet wird, löst der Button möglicherweise nicht wie erwartet die Formularübermittlung aus. Dies kann zu Verwirrung bei Nutzern führen, die auf assistive Technologien angewiesen sind.',
    },
    "form-patch-low-contrast-label": {
      label: "Zu geringer Kontrast bei Beschriftungen",
      explanation:
        "Die Label-Texte sind zu hell und erfüllen nicht das WCAG-Kontrastmindestmaß von 4,5:1 für normalen Text. Menschen mit Sehbeeinträchtigungen oder in hellem Umfeld können die Beschriftungen nicht lesen.",
    },
    "form-patch-low-contrast-inputs": {
      label: "Zu geringer Kontrast bei Eingabefeldern",
      explanation:
        "Die Rahmen der Eingabefelder sind zu hell. WCAG 1.4.11 fordert einen Kontrast von mindestens 3:1 für UI-Komponenten. Die Felder sind kaum erkennbar — besonders für Menschen mit Sehbeeinträchtigungen.",
    },
    "form-patch-heading-div": {
      label: "Formular-Überschrift als div statt hX",
      explanation:
        "Ein <div> hat keine semantische Bedeutung. Screenreader erkennen ihn nicht als Überschrift und listen ihn nicht in der Überschriften-Navigation auf. Nutzer, die per Überschrift navigieren, können das Formular nicht direkt anspringen.",
    },
    "form-patch-low-contrast-hint": {
      label: "Zu geringer Kontrast beim Hinweistext",
      explanation:
        "Der Hinweistext unter dem Passwort-Wiederholung-Feld ist zu hell. WCAG 1.4.3 gilt auch für kleingedruckte Hinweise: 4,5:1 Kontrast für Text unter 18pt. Menschen mit Sehbeeinträchtigungen können den Hinweis nicht lesen.",
    },
  },
};

export default de;
