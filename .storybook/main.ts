import type { StorybookConfig } from "storybook-solidjs-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "storybook-solidjs-vite",
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  async viteFinal(config) {
    // The project's vite.config.ts is a library build. Storybook supplies its
    // own bundle inputs, so drop the library-specific build options.
    const build = config.build as Record<string, unknown> | undefined;
    if (build) {
      delete build.lib;
      delete build.rolldownOptions;
    }

    return config;
  },
};

export default config;
