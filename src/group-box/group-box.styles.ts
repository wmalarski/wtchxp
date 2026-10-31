import * as stylex from "@stylexjs/stylex";
import type { JSX } from "@solidjs/web/jsx-runtime";
import classes from "./group-box.module.css";
import { sx } from "../sx";
import {
  backgroundColors,
  fontSizes,
  fonts,
  radii,
  shadows,
  spacing,
  textColors,
} from "../variables/variables.stylex";

export const groupBoxStyles = stylex.create({
  root: {
    margin: 0,
    padding: 10,
    border: "1px solid #d0d0bf",
    borderRadius: radii.large,
    backgroundColor: backgroundColors.surface,
    boxShadow: shadows.none,
    boxSizing: "border-box",
    fontFamily: fonts.sansSerif,
    fontSize: fontSizes.base,
  },
  legend: {
    color: textColors.accent,
    backgroundColor: backgroundColors.transparent,
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: spacing.groupedElement,
  },
  stacked: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.groupedElement,
  },
});

type FieldRowRecipeArgs = {
  class?: JSX.ClassValue;
};

export const fieldRowRecipe = ({ class: className }: FieldRowRecipeArgs): JSX.ClassValue[] => {
  return [classes["field-row"], sx(groupBoxStyles.row), className];
};
