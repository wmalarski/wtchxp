import * as stylex from "@stylexjs/stylex";
import type { JSX } from "@solidjs/web/jsx-runtime";
import { sx } from "../sx";
import {
  backgroundColors,
  fontSizes,
  fonts,
  radii,
  textColors,
} from "../variables/variables.stylex";

export const textFieldStyles = stylex.create({
  input: {
    width: "100%",
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
    width: "100%",
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
    width: "100%",
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
});

type TextFieldInputRecipeArgs = {
  class?: JSX.ClassValue;
  tall?: boolean;
};

export const textFieldInputRecipe = ({
  tall,
  class: className,
}: TextFieldInputRecipeArgs): JSX.ClassValue[] => {
  return [sx(tall ? textFieldStyles.inputTall : textFieldStyles.input), className];
};

type TextFieldTextareaRecipeArgs = {
  class?: JSX.ClassValue;
};

export const textFieldTextareaRecipe = ({
  class: className,
}: TextFieldTextareaRecipeArgs): JSX.ClassValue[] => {
  return [sx(textFieldStyles.textarea), className];
};
