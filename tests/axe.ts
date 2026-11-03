import axe from "axe-core";
import { expect } from "vite-plus/test";

/**
 * Runs axe against a rendered subtree. Colour contrast is disabled because the
 * pixel font is rendered differently across platforms; region/page rules are
 * disabled because the test renders a fragment rather than a full document.
 * `aria-hidden-focus` is disabled because Kobalte's hidden native select uses
 * a focusable dummy input inside an aria-hidden wrapper for mobile form
 * navigation.
 */
export const expectNoA11yViolations = async (container: Element = document.body) => {
  const results = await axe.run(container, {
    rules: {
      "aria-hidden-focus": { enabled: false },
      "color-contrast": { enabled: false },
      region: { enabled: false },
    },
  });

  expect(results.violations).toEqual([]);
};
