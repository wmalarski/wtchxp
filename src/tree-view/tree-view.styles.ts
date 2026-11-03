import * as stylex from "@stylexjs/stylex";
import type { JSX } from "@solidjs/web/jsx-runtime";
import { sx } from "../sx";
import {
  backgroundColors,
  colors,
  fontSizes,
  fonts,
  lineHeights,
  textColors,
} from "../variables/variables.stylex";

export const treeViewStyles = stylex.create({
  tree: {
    display: "block",
    margin: 0,
    padding: "2px 5px",
    border: `1px solid ${colors.inputBorder}`,
    backgroundColor: backgroundColors.surface,
    fontFamily: fonts.sansSerif,
    fontSize: fontSizes.base,
    userSelect: "none",
  },
  item: {
    marginTop: 3,
    listStyleType: "none",
  },
  nestedItem: {
    position: "relative",
    "::before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 6,
      left: -16,
      width: 12,
      borderBottom: "1px dotted gray",
    },
    ":last-child::after": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 7,
      bottom: 0,
      left: -20,
      width: 8,
      backgroundColor: backgroundColors.surface,
    },
  },
  leaf: {
    color: textColors.primary,
    textDecoration: "none",
    ":focus": {
      backgroundColor: backgroundColors.selection,
      color: textColors.inverse,
    },
    ":is([aria-selected='true'])": {
      backgroundColor: backgroundColors.selection,
      color: textColors.inverse,
    },
  },
  group: {
    marginTop: 3,
    marginLeft: 16,
    paddingLeft: 16,
    borderLeft: "1px dotted gray",
  },
  details: {
    marginTop: 0,
  },
  summary: {
    listStyle: "none",
    "::-webkit-details-marker": {
      display: "none",
    },
    ":focus": {
      outline: `1px dotted ${textColors.primary}`,
      outlineOffset: -2,
    },
  },
  nestedMarker: {
    "::before": {
      position: "relative",
      zIndex: 1,
      marginLeft: -22,
    },
  },
  marker: {
    "::before": {
      content: '"+"',
      display: "block",
      float: "left",
      width: 8,
      height: 9,
      marginRight: 5,
      paddingLeft: 1,
      border: "1px solid gray",
      backgroundColor: backgroundColors.surface,
      textAlign: "center",
      lineHeight: lineHeights.marker,
    },
  },
  markerOpen: {
    "::before": {
      content: '"-"',
      display: "block",
      float: "left",
      width: 8,
      height: 9,
      marginRight: 5,
      paddingLeft: 1,
      border: "1px solid gray",
      backgroundColor: backgroundColors.surface,
      textAlign: "center",
      lineHeight: lineHeights.marker,
    },
  },
});

type TreeItemRecipeArgs = {
  class?: JSX.ClassValue;
  nested?: boolean;
};

export const treeItemRecipe = ({
  nested,
  class: className,
}: TreeItemRecipeArgs): JSX.ClassValue[] => {
  return [sx(treeViewStyles.item), nested && sx(treeViewStyles.nestedItem), className];
};

type TreeSummaryRecipeArgs = {
  nested?: boolean;
  open?: boolean;
};

export const treeSummaryRecipe = ({ nested, open }: TreeSummaryRecipeArgs): JSX.ClassValue[] => {
  return [
    sx(treeViewStyles.summary),
    nested && sx(treeViewStyles.nestedMarker),
    open ? sx(treeViewStyles.markerOpen) : sx(treeViewStyles.marker),
  ];
};
