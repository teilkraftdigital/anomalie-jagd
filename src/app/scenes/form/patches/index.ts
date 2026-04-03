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
import { patchSubmitNoType } from "./patchSubmitNoType";
import { patchLowContrastLabel } from "./patchLowContrastLabel";
import { patchLowContrastInputs } from "./patchLowContrastInputs";
import { patchHeadingDiv } from "./patchHeadingDiv";
import { patchLowContrastHint } from "./patchLowContrastHint";

export const patches = [
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
  patchSubmitNoType,
  patchLowContrastLabel,
  patchLowContrastInputs,
  patchHeadingDiv,
  patchLowContrastHint,
];
