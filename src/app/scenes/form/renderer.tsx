import { useRef, useState } from "react";
import type { FormModel, InputContent } from "./model";
import { validateForm, type FieldError, type FormValues } from "./validation";

const labelClass = "block text-sm font-medium text-slate-700 mb-1 ";

function getInputClass(
  hasError: boolean,
  _errorDisplay: InputContent["errorDisplay"],
) {
  const base =
    "w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 placeholder-slate-500/80";
  if (hasError) {
    return `${base} border-red-500 focus:ring-red-500`;
  }
  return `${base} border-slate-400 focus:ring-blue-500`;
}

function InputField({
  content,
  value,
  onChange,
  error,
}: {
  content: InputContent;
  value: string | boolean;
  onChange: (val: string | boolean) => void;
  error?: FieldError;
}) {
  const [revealed, setRevealed] = useState(false);
  const {
    inputType,
    label,
    labelAttrs,
    placeholder,
    required,
    requiredLabel,
    autocomplete,
    attrs,
    revealButton,
    checkboxLabel,
    errorDisplay,
  } = content;

  const hasError = !!error;
  const showMessage = hasError && errorDisplay !== "border-only";
  const { "aria-describedby": modelDescribedBy, ...restAttrs } = attrs ?? {};

  if (inputType === "checkbox") {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 ">
          <input
            type="checkbox"
            required={required}
            checked={value as boolean}
            onChange={(e) => onChange(e.target.checked)}
            aria-invalid={hasError || undefined}
            aria-describedby={
              hasError && showMessage ? `${attrs?.id}-error` : undefined
            }
            {...attrs}
          />
          {checkboxLabel && (
            <span className="text-sm text-slate-700">
              {checkboxLabel}
              {requiredLabel && (
                <span className="text-gray-400 ml-1" aria-hidden="true">
                  {requiredLabel}
                </span>
              )}
            </span>
          )}
        </div>
        {showMessage && (
          <p
            id={`${attrs?.id}-error`}
            className="text-xs text-red-600"
            role="status"
          >
            {error!.message}
          </p>
        )}
      </div>
    );
  }

  const resolvedType =
    inputType === "password" && revealed ? "text" : inputType;
  const RevealAs = revealButton?.as ?? "button";
  const fieldId = attrs?.id as string | undefined;

  return (
    <div className="flex flex-col">
      {label && (
        <label className={labelClass} {...labelAttrs}>
          <span>{label}</span>
          {requiredLabel && (
            <span className="text-gray-400 ml-1" aria-hidden="true">
              {requiredLabel}
            </span>
          )}
        </label>
      )}
      <div className="relative">
        <input
          type={resolvedType}
          placeholder={placeholder}
          required={required}
          autoComplete={autocomplete}
          className={getInputClass(hasError, errorDisplay)}
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={hasError || undefined}
          aria-describedby={
            [
              hasError && showMessage ? `${fieldId}-error` : "",
              modelDescribedBy ?? "",
            ]
              .filter(Boolean)
              .join(" ") || undefined
          }
          {...restAttrs}
        />
        {revealButton && (
          <RevealAs
            onClick={() => setRevealed((r) => !r)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            {...revealButton.attrs}
          >
            {revealed ? "🙈" : "👁"}
          </RevealAs>
        )}
      </div>
      {content.hint && (
        <p id={`${fieldId}-hint`} className="text-xs text-slate-500 mt-1">
          {content.hint}
        </p>
      )}
      {showMessage && (
        <p
          id={`${fieldId}-error`}
          className="text-xs text-red-600 mt-1"
          role="status"
        >
          {error!.message}
        </p>
      )}
    </div>
  );
}

export function FormSceneRenderer({ model }: { model: FormModel }) {
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  const hasErrorSummary = model.blocks.some((b) => b.type === "error-summary");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = validateForm(model.blocks, values);
    setErrors(newErrors);
    setSubmitted(true);
    if (newErrors.length > 0 && hasErrorSummary) {
      summaryRef.current?.focus();
    }
  }

  function getError(id: string) {
    return errors.find((e) => e.fieldId === id);
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 tracking-tight">Registrieren</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        {model.blocks.map((block, i) => {
          if (block.type === "error-summary") {
            if (!submitted || errors.length === 0) return null;
            return (
              <div
                key={i}
                ref={summaryRef}
                tabIndex={-1}
                role="alert"
                aria-label="Fehlerübersicht"
                className="border border-red-400 bg-red-50 rounded-lg p-4 text-sm text-red-800 focus:outline-none"
              >
                <p className="font-semibold mb-2">
                  Bitte korrigiere die folgenden Fehler:
                </p>
                <ul className="list-disc list-inside flex flex-col gap-1">
                  {errors.map((err) => (
                    <li key={err.fieldId}>
                      <a
                        href={`#${err.fieldId}`}
                        className="underline hover:no-underline"
                      >
                        {err.message}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }

          if (block.type === "required-note") {
            return (
              <p key={i} className="text-xs text-slate-600">
                <span aria-hidden="true">*</span> Alle Felder sind Pflichtfelder
              </p>
            );
          }

          if (block.type === "input") {
            const id = block.content.attrs?.id as string | undefined;
            const error = id ? getError(id) : undefined;
            return (
              <InputField
                key={i}
                content={block.content}
                value={
                  values[id ?? ""] ??
                  (block.content.inputType === "checkbox" ? false : "")
                }
                onChange={(val) =>
                  setValues((prev) => ({ ...prev, [id ?? i]: val }))
                }
                error={error}
              />
            );
          }

          if (block.type === "submit") {
            return (
              <button
                key={i}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                {...block.content.attrs}
              >
                {block.content.label ?? "Absenden"}
              </button>
            );
          }

          return null;
        })}
      </form>
    </>
  );
}
