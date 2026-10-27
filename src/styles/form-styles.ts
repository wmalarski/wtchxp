import * as stylex from "@stylexjs/stylex";
import { colors, fonts } from "../variables/variables.stylex";

/**
 * Shared form-control skin. StyleX owns the layout and theme; the only native
 * rules left in CSS are for elements we do not render ourselves (`option`).
 */
export const formStyles = stylex.create({
  label: {
    display: "inline-flex",
    alignItems: "center",
    fontFamily: fonts.sansSerif,
    fontSize: 11,
    WebkitFontSmoothing: "antialiased",
  },
  input: {
    height: 21,
    padding: "3px 4px",
    border: "1px solid #7f9db9",
    backgroundColor: colors.buttonHighlight,
    boxSizing: "border-box",
    borderRadius: 0,
    appearance: "none",
    fontFamily: fonts.sansSerif,
    fontSize: 11,
    WebkitFontSmoothing: "antialiased",
    ":focus": {
      outline: "none",
    },
    "::selection": {
      backgroundColor: colors.dialogBlue,
      color: "white",
    },
  },
  inputTall: {
    height: 23,
    padding: "3px 4px",
    border: "1px solid #7f9db9",
    backgroundColor: colors.buttonHighlight,
    boxSizing: "border-box",
    borderRadius: 0,
    appearance: "none",
    fontFamily: fonts.sansSerif,
    fontSize: 11,
    WebkitFontSmoothing: "antialiased",
    ":focus": {
      outline: "none",
    },
    "::selection": {
      backgroundColor: colors.dialogBlue,
      color: "white",
    },
  },
  textarea: {
    padding: "3px 4px",
    border: "1px solid #7f9db9",
    backgroundColor: colors.buttonHighlight,
    boxSizing: "border-box",
    borderRadius: 0,
    appearance: "none",
    fontFamily: fonts.sansSerif,
    fontSize: 11,
    WebkitFontSmoothing: "antialiased",
    ":focus": {
      outline: "none",
    },
    "::selection": {
      backgroundColor: colors.dialogBlue,
      color: "white",
    },
  },
  select: {
    height: 23,
    minHeight: 21,
    padding: "3px 32px 3px 4px",
    border: "1px solid #7f9db9",
    backgroundColor: colors.buttonHighlight,
    backgroundImage: "var(--xp-select-icon)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top 2px right 2px",
    backgroundSize: "15px",
    boxSizing: "border-box",
    borderRadius: 0,
    appearance: "none",
    fontFamily: fonts.sansSerif,
    fontSize: 11,
    WebkitFontSmoothing: "antialiased",
    ":focus": {
      outline: "none",
      boxShadow: "inset 2px 2px white, inset -2px -2px white",
    },
    ":hover": {
      backgroundImage: "var(--xp-select-icon-hover)",
    },
    ":active": {
      backgroundImage: "var(--xp-select-icon-active)",
    },
  },
});
