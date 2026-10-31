import * as stylex from "@stylexjs/stylex";
import {
  backgroundColors,
  backgrounds,
  fontSizes,
  fonts,
  radii,
  shadows,
  textColors,
} from "../variables/variables.stylex";

export const buttonStyles = stylex.create({
  root: {
    minWidth: 75,
    minHeight: 23,
    padding: "0 12px",
    border: "1px solid #003c74",
    backgroundColor: backgroundColors.window,
    background: backgrounds.button,
    boxShadow: shadows.none,
    borderRadius: radii.medium,
    boxSizing: "border-box",
    fontFamily: fonts.sansSerif,
    fontSize: fontSizes.base,
    WebkitFontSmoothing: "antialiased",
    cursor: "default",
    userSelect: "none",
    ":disabled": {
      color: textColors.disabled,
      textShadow: `1px 1px 0 ${textColors.inverse}`,
    },
    ":not(:disabled):hover": {
      boxShadow: shadows.buttonHover,
    },
    ":not(:disabled):active": {
      boxShadow: shadows.none,
      background: backgrounds.buttonActive,
    },
    ":is([data-active])": {
      boxShadow: shadows.none,
      background: backgrounds.buttonActive,
    },
    ":focus": {
      boxShadow: shadows.buttonFocus,
    },
    "::-moz-focus-inner": {
      border: 0,
    },
  },
  block: {
    width: "100%",
  },
});
