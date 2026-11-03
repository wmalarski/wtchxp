import * as stylex from "@stylexjs/stylex";
import { fontSizes, fonts, textColors } from "../variables/variables.stylex";

/**
 * Shared field primitives: the wrapper, label, description and error message
 * reused by the Kobalte-based form controls.
 */
export const fieldStyles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontFamily: fonts.sansSerif,
    fontSize: fontSizes.base,
  },
  label: {
    display: "inline-flex",
    alignItems: "center",
    fontFamily: fonts.sansSerif,
    fontSize: fontSizes.base,
    WebkitFontSmoothing: "antialiased",
  },
  labelSpacing: {
    marginBottom: 2,
  },
  description: {
    marginTop: 2,
    color: textColors.secondary,
  },
  error: {
    marginTop: 2,
    color: textColors.error,
  },
});
