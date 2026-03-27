import { useState } from "react";
import type { FormModel, InputContent } from "./model";

const inputClass =
  "w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
const labelClass = "block text-sm font-medium text-slate-700 mb-1";

function InputField({ content }: { content: InputContent }) {
  const [revealed, setRevealed] = useState(false);
  const {
    inputType,
    label,
    labelAttrs,
    placeholder,
    required,
    autocomplete,
    attrs,
    revealButton,
    checkboxLabel,
  } = content;

  if (inputType === "checkbox") {
    return (
      <div className="flex items-center gap-2">
        <input type="checkbox" required={required} {...attrs} />
        {checkboxLabel && (
          <span className="text-sm text-slate-700">{checkboxLabel}</span>
        )}
      </div>
    );
  }

  const resolvedType =
    inputType === "password" && revealed ? "text" : inputType;
  const RevealAs = revealButton?.as ?? "button";

  return (
    <div className="flex flex-col">
      {label && (
        <label className={labelClass} {...labelAttrs}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={resolvedType}
          placeholder={placeholder}
          required={required}
          autoComplete={autocomplete}
          className={inputClass}
          {...attrs}
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
      {attrs?.id === "password-repeat" && (
        <p id="password-hint" className="text-xs text-slate-400 mt-1">
          Muss mit dem obigen Passwort übereinstimmen.
        </p>
      )}
    </div>
  );
}

export function FormSceneRenderer({ model }: { model: FormModel }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 tracking-tight">Registrieren</h2>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        {model.blocks.map((block, i) => {
          if (block.type === "input") {
            return <InputField key={i} content={block.content} />;
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
    </div>
  );
}
