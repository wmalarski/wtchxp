import * as stylex from "@stylexjs/stylex";
import {
  backgroundColors,
  backgrounds,
  fontSizes,
  fonts,
  forms,
  lineHeights,
  shadows,
  textColors,
} from "../variables/variables.stylex";
import type { JSX } from "@solidjs/web/jsx-runtime";
import classes from "./checkbox.module.css";
import { fieldStyles } from "../field/field.styles";
import { sx } from "../sx";

const checkboxBorderWidth = "1px";
const checkboxTotalWidth = `calc(${forms.checkboxWidth} + ${forms.radioLabelSpacing})`;
const checkboxLeft = `calc(-1 * (${forms.checkboxWidth} + ${forms.radioLabelSpacing}))`;
const checkboxCheckmarkLeft = `calc(${checkboxLeft} + (${forms.checkboxWidth} + 2 * ${checkboxBorderWidth} - ${forms.checkmarkWidth}) / 2)`;

export const checkboxStyles = stylex.create({
  root: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontFamily: fonts.sansSerif,
    fontSize: fontSizes.base,
  },
  label: {
    position: "relative",
    marginBottom: 0,
    marginLeft: checkboxTotalWidth,
    lineHeight: lineHeights.tight,
    "::before": {
      content: '""',
      display: "inline-block",
      position: "absolute",
      top: 0,
      left: checkboxLeft,
      width: forms.checkboxWidth,
      height: forms.checkboxWidth,
      border: forms.radioBorder,
      backgroundColor: backgrounds.control,
      boxShadow: shadows.none,
    },
    "::after": {
      content: '""',
      display: "block",
      position: "absolute",
      top: forms.checkmarkTop,
      left: checkboxCheckmarkLeft,
      width: forms.checkmarkWidth,
      height: forms.checkmarkWidth,
    },
    ":not([data-disabled]):not(:active):hover::before": {
      boxShadow: shadows.controlHover,
    },
    ":not([data-disabled]):active::before": {
      background: backgrounds.controlActive,
    },
    ":is([data-checked])::after": {
      backgroundImage: "var(--xp-checkbox-icon)",
    },
    ":is([data-disabled])::before": {
      border: forms.radioBorderDisabled,
      backgroundColor: backgroundColors.surface,
    },
    ":is([data-disabled][data-checked])::after": {
      backgroundImage: "var(--xp-checkbox-icon-disabled)",
    },
  },
  focused: {
    outline: `1px dotted ${textColors.primary}`,
  },
  description: {
    marginLeft: checkboxTotalWidth,
    marginTop: 2,
    color: textColors.secondary,
  },
  error: {
    marginLeft: checkboxTotalWidth,
    marginTop: 2,
    color: textColors.error,
  },
});

type CheckboxRecipeArgs = {
  class?: JSX.ClassValue;
  focused?: boolean;
};

export const checkboxRecipe = ({
  focused,
  class: className,
}: CheckboxRecipeArgs): JSX.ClassValue[] => {
  return [
    classes["checkbox-label"],
    sx(fieldStyles.label),
    sx(checkboxStyles.label),
    focused && sx(checkboxStyles.focused),
    className,
  ];
};
