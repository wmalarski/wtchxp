import * as stylex from "@stylexjs/stylex";
import {
  backgroundColors,
  colors,
  fontSizes,
  fonts,
  radii,
  textColors,
} from "../variables/variables.stylex";

export const textFieldStyles = stylex.create({
  base: {
    width: "100%",
    padding: "3px 4px",
    border: `1px solid ${colors.inputBorder}`,
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
  input: {
    height: 21,
  },
  inputTall: {
    height: 23,
  },
});
