import type { Patch } from "../../../engine/Scene";
import type { FormModel } from "../model";

export const patchNoAutocomplete: Patch<FormModel> = {
  id: "form-patch-no-autocomplete",
  scene: "form",
  severity: "hard",
  apply(model) {
    return {
      ...model,
      blocks: model.blocks.map((block) => {
        if (block.type !== "input") return block;
        if (block.content.attrs?.id !== "password") return block;
        return {
          ...block,
          content: { ...block.content, autocomplete: undefined },
        };
      }),
    };
  },
};
