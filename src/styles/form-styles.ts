import * as stylex from "@stylexjs/stylex";
import {
  backgroundColors,
  fontSizes,
  fonts,
  radii,
  shadows,
  textColors,
} from "../variables/variables.stylex";

/**
 * Shared form-control skin. StyleX owns the layout and theme; the only native
 * rules left in CSS are for elements we do not render ourselves (`option`).
 */
export const formStyles = stylex.create({
  label: {
    display: "inline-flex",
    alignItems: "center",
    fontFamily: fonts.sansSerif,
    fontSize: fontSizes.base,
    WebkitFontSmoothing: "antialiased",
  },
  input: {
    height: 21,
    padding: "3px 4px",
    border: "1px solid #7f9db9",
    backgroundColor: backgroundColors.surface,
    boxSizing: "border-box",
    borderRadius: radii.none,
    appearance: "none",
    fontFamily: fonts.sansSerif,
    fontSize: fontSizes.base,
    WebkitFontSmoothing: "antialiased",
    ":focus": {
      outline: "none",
    },
    "::selection": {
      backgroundColor: backgroundColors.selection,
      color: textColors.inverse,
    },
  },
  inputTall: {
    height: 23,
    padding: "3px 4px",
    border: "1px solid #7f9db9",
    backgroundColor: backgroundColors.surface,
    boxSizing: "border-box",
    borderRadius: radii.none,
    appearance: "none",
    fontFamily: fonts.sansSerif,
    fontSize: fontSizes.base,
    WebkitFontSmoothing: "antialiased",
    ":focus": {
      outline: "none",
    },
    "::selection": {
      backgroundColor: backgroundColors.selection,
      color: textColors.inverse,
    },
  },
  textarea: {
    padding: "3px 4px",
    border: "1px solid #7f9db9",
    backgroundColor: backgroundColors.surface,
    boxSizing: "border-box",
    borderRadius: radii.none,
    appearance: "none",
    fontFamily: fonts.sansSerif,
    fontSize: fontSizes.base,
    WebkitFontSmoothing: "antialiased",
    ":focus": {
      outline: "none",
    },
    "::selection": {
      backgroundColor: backgroundColors.selection,
      color: textColors.inverse,
    },
  },
  select: {
    height: 23,
    minHeight: 21,
    padding: "3px 32px 3px 4px",
    border: "1px solid #7f9db9",
    backgroundColor: backgroundColors.surface,
    backgroundImage: "var(--xp-select-icon)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top 2px right 2px",
    backgroundSize: "15px",
    boxSizing: "border-box",
    borderRadius: radii.none,
    appearance: "none",
    fontFamily: fonts.sansSerif,
    fontSize: fontSizes.base,
    WebkitFontSmoothing: "antialiased",
    ":focus": {
      outline: "none",
      boxShadow: shadows.selectFocus,
    },
    ":hover": {
      backgroundImage: "var(--xp-select-icon-hover)",
    },
    ":active": {
      backgroundImage: "var(--xp-select-icon-active)",
    },
  },
});
