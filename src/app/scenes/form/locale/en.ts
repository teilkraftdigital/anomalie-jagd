import type { FormSceneLocale } from "./types";

const en: FormSceneLocale = {
  scene: {
    name: "Registration Form",
    description: "A registration form with name, email, password, and terms.",
  },
  renderer: {
    heading: "Register",
    errorSummary: {
      label: "Error summary",
      intro: "Please correct the following errors:",
    },
    requiredNote: "All fields are required",
    submitFallback: "Submit",
    fields: {
      name: {
        label: "Name",
        placeholder: "Jane Doe",
        validation: {
          required: "Please enter your name.",
          minLength: "Name must be at least 2 characters long.",
        },
      },
      email: {
        label: "Email",
        placeholder: "jane@example.com",
        validation: {
          required: "Please enter your email address.",
          pattern: "Please enter a valid email address.",
        },
      },
      password: {
        label: "Password",
        placeholder: "••••••••",
        revealLabel: "Show password",
        validation: {
          required: "Please enter a password.",
          minLength: "Password must be at least 8 characters long.",
        },
      },
      passwordRepeat: {
        label: "Repeat password",
        placeholder: "••••••••",
        hint: "Password must match the one above.",
        revealLabel: "Show password",
        validation: {
          required: "Please repeat your password.",
          match: "Passwords do not match.",
        },
      },
      agb: {
        checkboxLabel: "I agree to the terms and conditions",
        validation: {
          required: "Please agree to the terms and conditions.",
        },
      },
      submit: { label: "Register" },
    },
  },
  patches: {
    "form-patch-no-label": {
      label: "No labels on input fields",
      explanation:
        "All inputs without an associated <label> have no accessible name. Screen readers cannot communicate the purpose of the field.",
    },
    "form-patch-wrong-input-type": {
      label: "Wrong input type (text instead of email)",
      explanation:
        'type="email" activates the email keyboard on mobile, validates the format, and helps password managers. type="text" disables all of that.',
    },
    "form-patch-label-not-linked": {
      label: "Label not linked to input",
      explanation:
        "Without a for attribute on <label> and a matching id on <input>, the association is missing. Clicking the label does not focus the field, and screen readers may not read the label.",
    },
    "form-patch-no-required": {
      label: "Required field without required attribute",
      explanation:
        "Without required, assistive technologies cannot announce the field as required. Screen reader users do not know the field must be filled in. There may be a visual indicator, but it is not sufficient.",
    },
    "form-patch-no-autocomplete": {
      label: "No autocomplete on password field",
      explanation:
        'Without autocomplete="new-password", password managers cannot correctly fill the field. Users with cognitive impairments rely particularly on password managers.',
    },
    "form-patch-checkbox-no-name": {
      label: "Checkbox without accessible name",
      explanation:
        "A checkbox with visible label text but without aria-label or a label element has no accessible name. Screen readers cannot communicate the purpose of the checkbox.",
    },
    "form-patch-password-reveal-div": {
      label: "Password reveal as non-interactive div",
      explanation:
        "A <div> as a click target is not keyboard-focusable, does not fire a click event on Enter/Space, and is not announced as a button by screen readers.",
    },
    "form-patch-no-aria-describedby": {
      label: "Password repeat without aria-describedby",
      explanation:
        "Without aria-describedby, screen reader users receive no hint that the field must match the password field. The hint text exists in the DOM but is not linked to the input.",
    },
    "form-patch-no-error-summary": {
      label: "Error summary missing",
      explanation:
        "After submitting a form with errors, an error summary should be displayed and receive focus. Without it, screen reader users must search the entire form to find errors.",
    },
    "form-patch-error-border-only": {
      label: "Error shown only as red border, without help text and summary",
      explanation:
        "Error messages must not be communicated by colour alone. A red border without explanatory text is not perceivable by people with colour blindness and provides screen reader users with no information about what went wrong.",
    },
    "form-patch-no-required-note": {
      label: "No required fields note",
      explanation:
        'The notice "* All fields are required" is missing. Users — especially those with cognitive impairments — do not know that all fields must be filled in before submitting the form.',
    },
    "form-patch-submit-no-type": {
      label: 'Submit button without explicit type="submit"',
      explanation:
        'Without type="submit", a <button> inside a form has a default type of "submit". However, if JavaScript is used to handle form submission, the button may not trigger form submission as expected. This can lead to confusion for users relying on assistive technologies.',
    },
    "form-patch-low-contrast-label": {
      label: "Low contrast on form labels",
      explanation:
        "The label texts are too light and do not meet the WCAG minimum contrast ratio of 4.5:1 for normal text. People with visual impairments or in bright environments cannot read the labels.",
    },
    "form-patch-low-contrast-inputs": {
      label: "Low contrast on input fields",
      explanation:
        "The borders of the input fields are too light. WCAG 1.4.11 requires a contrast ratio of at least 3:1 for UI components. The fields are barely visible — especially for people with visual impairments.",
    },
    "form-patch-heading-div": {
      label: "Form heading as div instead of hX",
      explanation:
        "A <div> has no semantic meaning. Screen readers do not recognise it as a heading and do not list it in heading navigation. Users who navigate by headings cannot jump directly to the form.",
    },
    "form-patch-low-contrast-hint": {
      label: "Low contrast on hint text",
      explanation:
        "The hint text below the password repeat field is too light. WCAG 1.4.3 applies to small print as well: 4.5:1 contrast for text below 18pt. People with visual impairments cannot read the hint.",
    },
  },
};

export default en;
