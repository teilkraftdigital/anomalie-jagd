import type { Patch } from "../../../engine/Scene";
import { patchNoLabel } from "./patchNoLabel";
import { patchWrongInputType } from "./patchWrongInputType";
import { patchLabelNotLinked } from "./patchLabelNotLinked";
import { patchNoRequired } from "./patchNoRequired";
// import { patchRequiredLabelOnly } from "./patchRequiredLabelOnly";
import { patchNoAutocomplete } from "./patchNoAutocomplete";
import { patchCheckboxNoName } from "./patchCheckboxNoName";
import { patchPasswordRevealDiv } from "./patchPasswordRevealDiv";
import { patchNoAriaDescribedby } from "./patchNoAriaDescribedby";
import { patchNoErrorSummary } from "./patchNoErrorSummary";
import { patchErrorBorderOnly } from "./patchErrorBorderOnly";
import { patchNoRequiredNote } from "./patchNoRequiredNote";

export const patches: Patch<any>[] = [
  patchNoLabel,
  patchWrongInputType,
  patchLabelNotLinked,
  patchNoRequired,
  // patchRequiredLabelOnly,
  patchNoAutocomplete,
  patchCheckboxNoName,
  patchPasswordRevealDiv,
  patchNoAriaDescribedby,
  patchNoErrorSummary,
  patchErrorBorderOnly,
  patchNoRequiredNote,
];
