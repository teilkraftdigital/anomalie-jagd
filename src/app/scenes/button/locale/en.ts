import type { ButtonSceneLocale } from "./types";

const en: ButtonSceneLocale = {
  scene: {
    name: "Button",
    description: "A simple button that can be clicked.",
  },
  renderer: {
    heading: "Button Scene",
    buttonLabel: "A suspicious button",
    alertMessage: "Button clicked!",
  },
  patches: {
    "patch-no-label": {
      label: "No accessible name",
      explanation:
        "A button without visible text and without an aria-label has no accessible name. Screen readers cannot communicate the purpose of the button.",
    },
    "patch-div-button": {
      label: "<div> instead of <button>",
      explanation:
        "A <div> is not an interactive element. It is not keyboard-focusable, does not fire a click event on Enter/Space, and is not announced as a button by screen readers.",
    },
    "patch-role-attribute": {
      label: "Wrong role attribute",
      explanation:
        'role="link" on a <button> is semantically incorrect. Assistive technologies then expect navigation behaviour (href), but find none.',
    },
    "patch-no-type": {
      label: 'Missing type="button"',
      explanation:
        'Without type="button", a <button> inside a form defaults to type="submit". This can trigger unintended form submissions and is hard to trace for developers and users.',
    },
    "patch-tab-index": {
      label: "tabIndex=−1 (not keyboard-reachable)",
      explanation:
        "tabIndex=-1 removes the button from the tab order. Keyboard users and screen reader users can no longer focus or activate the button.",
    },
    "patch-low-contrast": {
      label: "Insufficient colour contrast",
      explanation:
        "The contrast ratio between the text colour and background is below the WCAG minimum of 4.5:1. For users with low vision, the button text is barely readable.",
    },
  },
};

export default en;
