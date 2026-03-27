import type { FormBlock, ValidationRules } from "./model";

export type FieldError = {
  fieldId: string;
  label: string;
  message: string;
};

export type FormValues = Record<string, string | boolean>;

function validateField(
  _id: string,
  label: string,
  value: string | boolean,
  rules: ValidationRules,
  allValues: FormValues
): string | null {
  if (rules.required) {
    const isEmpty =
      typeof value === "boolean" ? !value : value.trim() === "";
    if (isEmpty) {
      return rules.required.message ?? `${label} ist ein Pflichtfeld.`;
    }
  }

  if (rules.minLength && typeof value === "string") {
    if (value.trim().length < rules.minLength.value) {
      return (
        rules.minLength.message ??
        `${label} muss mindestens ${rules.minLength.value} Zeichen lang sein.`
      );
    }
  }

  if (rules.pattern && typeof value === "string") {
    const regex = new RegExp(rules.pattern.value);
    if (!regex.test(value)) {
      return rules.pattern.message ?? `${label} hat ein ungültiges Format.`;
    }
  }

  if (rules.match) {
    const otherValue = allValues[rules.match.fieldId];
    if (value !== otherValue) {
      return rules.match.message ?? `${label} stimmt nicht überein.`;
    }
  }

  return null;
}

export function validateForm(
  blocks: FormBlock[],
  values: FormValues
): FieldError[] {
  const errors: FieldError[] = [];

  for (const block of blocks) {
    if (block.type !== "input") continue;
    const { validation, attrs, label, checkboxLabel } = block.content;
    if (!validation) continue;

    const id = attrs?.id as string | undefined;
    if (!id) continue;

    const fieldLabel = label ?? checkboxLabel ?? id;
    const value = values[id] ?? (block.content.inputType === "checkbox" ? false : "");
    const message = validateField(id, fieldLabel, value, validation, values);

    if (message) {
      errors.push({ fieldId: id, label: fieldLabel, message });
    }
  }

  return errors;
}
