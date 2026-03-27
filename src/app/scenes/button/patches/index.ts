import type { Patch } from "../../../engine/Scene";
import { patchNoLabel } from "./patchNoLabel";
import { patchDivButton } from "./patchDivButton";
import { patchRoleAttribute } from "./patchRoleAttribute";
import { patchNoType } from "./patchNoType";
import { patchTabIndex } from "./patchTabIndex";
import { patchLowContrast } from "./patchLowContrast";

export const patches: Patch<any>[] = [
  patchNoLabel,
  patchDivButton,
  patchRoleAttribute,
  patchNoType,
  patchTabIndex,
  patchLowContrast,
];
