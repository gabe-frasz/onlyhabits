import { defineConfig } from "unlighthouse";

export default defineConfig({
  ci: {
    budget: {
      performance: 90,
      accessibility: 95,
      "best-practices": 95,
      seo: 90,
    },
  },
});
