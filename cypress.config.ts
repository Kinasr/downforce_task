import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://carbon-registry.downforce.tech",
    defaultCommandTimeout: 10000
  },
});
