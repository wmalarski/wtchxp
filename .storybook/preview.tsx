import type { Preview } from "storybook-solidjs-vite";
import { createJSXDecorator } from "storybook-solidjs-vite";
import "../src/styles.css";
import "./storybook.css";

const withDesktop = createJSXDecorator((Story) => (
  <div class="storybook-desktop">
    <Story />
  </div>
));

const preview: Preview = {
  decorators: [withDesktop],
  parameters: {
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(?:background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ["Buttons", "Forms", "Layout", "Navigation", "Windows"],
      },
    },
  },
};

export default preview;
