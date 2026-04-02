import type { SceneLocale } from "../../../engine/locale/types";
import { patches } from "../patches";

type PatchId = (typeof patches)[number]["id"];

type FormRenderer = {
  heading: string;
  errorSummary: { label: string; intro: string };
  requiredNote: string;
  submitFallback: string;
};

type FormFields = {
  name: {
    label: string;
    placeholder: string;
    validation: { required: string; minLength: string };
  };
  email: {
    label: string;
    placeholder: string;
    validation: { required: string; pattern: string };
  };
  password: {
    label: string;
    placeholder: string;
    revealLabel: string;
    validation: { required: string; minLength: string };
  };
  passwordRepeat: {
    label: string;
    placeholder: string;
    hint: string;
    revealLabel: string;
    validation: { required: string; match: string };
  };
  agb: {
    checkboxLabel: string;
    validation: { required: string };
  };
  submit: { label: string };
};

export type FormSceneLocale = SceneLocale<
  FormRenderer & { fields: FormFields },
  PatchId
>;
