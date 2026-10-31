import * as stylex from "@stylexjs/stylex";
import type { JSX } from "@solidjs/web/jsx-runtime";
import { sx } from "../sx";
import {
  backgrounds,
  fontSizes,
  fonts,
  radii,
  shadows,
  tabs,
  textColors,
} from "../variables/variables.stylex";

export const tabsStyles = stylex.create({
  root: {
    fontFamily: fonts.sansSerif,
    fontSize: fontSizes.base,
  },
  list: {
    position: "relative",
    display: "flex",
    margin: "0 0 -2px",
    paddingLeft: 3,
    listStyleType: "none",
    textIndent: 0,
    cursor: "default",
  },
  trigger: {
    zIndex: 1,
    display: "block",
    minWidth: "unset",
    marginLeft: -1,
    marginRight: 2,
    padding: "0 12px 3px",
    border: "1px solid #91a7b4",
    borderRadius: `${radii.medium} ${radii.medium} 0 0`,
    background: backgrounds.tab,
    boxShadow: shadows.none,
    color: textColors.strong,
    textDecoration: "none",
    boxSizing: "border-box",
    fontFamily: fonts.sansSerif,
    fontSize: fontSizes.base,
    WebkitFontSmoothing: "antialiased",
    cursor: "default",
    userSelect: "none",
    ":hover": {
      boxShadow: shadows.tabHover,
      borderTop: "1px solid #e68b2c",
    },
    ":is([aria-selected='true'])": {
      zIndex: 8,
      position: "relative",
      marginTop: -2,
      marginBottom: 1,
      marginLeft: -3,
      marginRight: -1,
      paddingBottom: 2,
      border: "1px solid #919b9c",
      borderTop: "1px solid #e68b2c",
      borderBottom: "1px solid transparent",
      background: backgrounds.tabSelected,
      boxShadow: shadows.tabHover,
    },
    ":is([aria-selected='true']):first-of-type::before": {
      content: '""',
      display: "block",
      position: "absolute",
      zIndex: -1,
      top: "100%",
      left: -1,
      width: 0,
      height: 2,
      borderLeft: tabs.border,
    },
    ":focus": {
      outline: `1px dotted ${textColors.strong}`,
      outlineOffset: -4,
    },
    "::-moz-focus-inner": {
      border: 0,
    },
  },
  justified: {
    flexGrow: 1,
    textAlign: "center",
  },
  panel: {
    position: "relative",
    zIndex: 2,
    clear: "both",
    marginBottom: 9,
    padding: 14,
    background: backgrounds.tabPanel,
    border: tabs.border,
    boxShadow: shadows.tabPanel,
  },
});

type TabRecipeArgs = {
  class?: JSX.ClassValue;
  justified?: boolean;
};

export const tabRecipe = ({ justified, class: className }: TabRecipeArgs): JSX.ClassValue[] => {
  return [sx(tabsStyles.trigger), justified && sx(tabsStyles.justified), className];
};
