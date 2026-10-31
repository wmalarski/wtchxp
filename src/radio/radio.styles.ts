import * as stylex from "@stylexjs/stylex";
import type { JSX } from "@solidjs/web/jsx-runtime";
import classes from "./radio.module.css";
import { fieldStyles } from "../field/field.styles";
import { sx } from "../sx";
import {
  backgroundColors,
  backgrounds,
  fontSizes,
  fonts,
  forms,
  lineHeights,
  radii,
  shadows,
  textColors,
} from "../variables/variables.stylex";

const radioBorderWidth = "1px";
const radioTotalWidth = `calc(${forms.radioWidth} + ${forms.radioLabelSpacing})`;
const radioLeft = `calc(-1 * (${forms.radioWidth} + ${forms.radioLabelSpacing}))`;
const radioDotLeft = `calc(${radioLeft} + (${forms.radioWidth} + 2 * ${radioBorderWidth} - ${forms.radioDotWidth}) / 2)`;

export const radioStyles = stylex.create({
  group: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontFamily: fonts.sansSerif,
    fontSize: fontSizes.base,
  },
  groupLabel: {
    marginBottom: 4,
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  label: {
    position: "relative",
    marginBottom: 0,
    marginLeft: radioTotalWidth,
    lineHeight: lineHeights.base,
    "::before": {
      content: '""',
      display: "inline-block",
      position: "absolute",
      top: 0,
      left: radioLeft,
      width: forms.radioWidth,
      height: forms.radioWidth,
      border: forms.radioBorder,
      borderRadius: radii.round,
      background: backgrounds.control,
    },
    "::after": {
      content: '""',
      display: "block",
      position: "absolute",
      top: forms.radioDotTop,
      left: radioDotLeft,
      width: forms.radioDotWidth,
      height: forms.radioDotWidth,
    },
    ":not([data-disabled]):not(:active):hover::before": {
      boxShadow: shadows.controlHover,
    },
    ":not([data-disabled]):active::before": {
      background: backgrounds.controlActive,
    },
    ":is([data-checked])::after": {
      backgroundImage: "var(--xp-radio-icon)",
    },
    ":is([data-disabled])::before": {
      border: forms.radioBorderDisabled,
      backgroundColor: backgroundColors.surface,
    },
    ":is([data-disabled][data-checked])::after": {
      backgroundImage: "var(--xp-radio-icon-disabled)",
    },
  },
  focused: {
    outline: `1px dotted ${textColors.primary}`,
  },
  description: {
    marginLeft: radioTotalWidth,
    marginTop: 2,
    color: textColors.secondary,
  },
});

type RadioRecipeArgs = {
  class?: JSX.ClassValue;
  focused?: boolean;
};

export const radioRecipe = ({ focused, class: className }: RadioRecipeArgs): JSX.ClassValue[] => {
  return [
    classes["radio-label"],
    sx(fieldStyles.label),
    sx(radioStyles.label),
    focused && sx(radioStyles.focused),
    className,
  ];
};
