import { createJSXDecorator, type Decorator } from "storybook-solidjs-vite";

export const withLightSurface = createJSXDecorator((Story) => (
  <div class="storybook-surface">
    <Story />
  </div>
)) as Decorator<any>;
