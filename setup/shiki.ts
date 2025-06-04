import { transformerNotationDiff } from "@shikijs/transformers";
import { defineShikiSetup } from "@slidev/types";

export default defineShikiSetup(() => {
  return {
    theme: {
      dark: "min-dark",
      light: "min-light",
    },
    langs: ["ts", "tsx", "vue", "json", "diff", "bash"],
    transformers: [transformerNotationDiff()],
  };
});
