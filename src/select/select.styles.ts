import * as stylex from "@stylexjs/stylex";
import type { JSX } from "@solidjs/web/jsx-runtime";
import classes from "./select.module.css";
import { sx } from "../sx";
import {
  backgroundColors,
  colors,
  fontSizes,
  fonts,
  radii,
  shadows,
  textColors,
} from "../variables/variables.stylex";

export const selectStyles = stylex.create({
  trigger: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: 23,
    minHeight: 21,
    padding: "3px 32px 3px 4px",
    border: `1px solid ${colors.inputBorder}`,
    backgroundColor: backgroundColors.surface,
    backgroundImage: "var(--xp-select-icon)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top 2px right 2px",
    backgroundSize: "15px",
    boxSizing: "border-box",
    borderRadius: radii.none,
    appearance: "none",
    color: textColors.primary,
    cursor: "default",
    fontFamily: fonts.sansSerif,
    fontSize: fontSizes.base,
    textAlign: "left",
    WebkitFontSmoothing: "antialiased",
    ":focus": {
      outline: "none",
      boxShadow: shadows.selectFocus,
    },
    ":hover": {
      backgroundImage: "var(--xp-select-icon-hover)",
    },
    ":is([data-expanded])": {
      backgroundImage: "var(--xp-select-icon-active)",
    },
  },
  value: {
    flex: 1,
    overflow: "hidden",
    textAlign: "left",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  icon: {
    flex: "0 0 15px",
    width: 15,
    height: 17,
    backgroundImage: "var(--xp-select-icon)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "15px",
    color: "transparent",
    fontSize: 0,
  },
  content: {
    zIndex: 1000,
    minWidth: "var(--kb-popper-anchor-width)",
    padding: 2,
    border: `1px solid ${colors.inputBorder}`,
    backgroundColor: backgroundColors.surface,
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
    fontFamily: fonts.sansSerif,
    fontSize: fontSizes.base,
  },
  listbox: {
    maxHeight: 240,
    margin: 0,
    padding: 0,
    overflowY: "auto",
    listStyle: "none",
    outline: "none",
  },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    padding: "2px 6px",
    color: textColors.primary,
    cursor: "default",
    fontFamily: fonts.sansSerif,
    fontSize: fontSizes.base,
    userSelect: "none",
    ":is([data-highlighted])": {
      backgroundColor: backgroundColors.selection,
      color: textColors.inverse,
    },
    ":is([data-disabled])": {
      color: textColors.disabled,
    },
  },
  itemLabel: {
    flex: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  itemDescription: {
    color: textColors.secondary,
    fontSize: fontSizes.base,
  },
  itemIndicator: {
    flex: "0 0 11px",
    width: 11,
    height: 11,
  },
  section: {
    padding: "4px 6px 2px",
    color: textColors.secondary,
    fontFamily: fonts.sansSerif,
    fontSize: fontSizes.base,
    fontWeight: "bold",
  },
});

type SelectRecipeArgs = {
  class?: JSX.ClassValue;
};

/** The XP-styled trigger for a Kobalte select. */
export const selectRecipe = ({ class: className }: SelectRecipeArgs): JSX.ClassValue[] => {
  return [classes["xp-select"], sx(selectStyles.trigger), className];
};

/** The indicator rendered next to the selected select item. */
export const selectItemIndicatorRecipe = ({
  class: className,
}: SelectRecipeArgs): JSX.ClassValue[] => {
  return [classes["xp-select-item-indicator"], sx(selectStyles.itemIndicator), className];
};
