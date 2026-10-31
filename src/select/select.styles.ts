import * as stylex from "@stylexjs/stylex";
import { backgroundColors, fontSizes, fonts, radii, shadows } from "../variables/variables.stylex";

export const selectStyles = stylex.create({
  select: {
    width: "100%",
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
