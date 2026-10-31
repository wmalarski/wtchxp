import * as stylex from "@stylexjs/stylex";
import type { JSX } from "@solidjs/web/jsx-runtime";
import classes from "./range.module.css";
import { sx } from "../sx";
import {
  backgroundColors,
  backgrounds,
  radii,
  shadows,
  spacing,
} from "../variables/variables.stylex";

const trackStyles = {
  width: "100%",
  height: 2,
  boxSizing: "border-box",
  backgroundColor: backgroundColors.rangeTrack,
  borderRight: "var(--xp-range-track-border-right, 1px solid #f3f2ea)",
  borderBottom: "var(--xp-range-track-border-bottom, 1px solid #f3f2ea)",
  borderLeft: "var(--xp-range-track-border-left, 0)",
  borderRadius: radii.small,
  boxShadow: `var(--xp-range-track-shadow, ${shadows.rangeTrackHorizontal})`,
} as const;

export const rangeStyles = stylex.create({
  range: {
    width: "100%",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    background: backgrounds.none,
    cursor: "default",
    ":focus": {
      outline: "none",
    },
    "::-webkit-slider-thumb": {
      appearance: "none",
      WebkitAppearance: "none",
      height: 21,
      width: 11,
      background: "var(--xp-range-thumb)",
      transform: "var(--xp-range-thumb-transform, translateY(-8px))",
    },
    "::-moz-range-thumb": {
      height: 21,
      width: 11,
      border: 0,
      borderRadius: radii.none,
      background: "var(--xp-range-thumb)",
      transform: "var(--xp-range-thumb-transform-moz, translateY(2px))",
    },
    "::-webkit-slider-runnable-track": trackStyles,
    "::-moz-range-track": trackStyles,
  },
  boxIndicator: {
    "--xp-range-thumb-transform": "translateY(-10px)",
    "--xp-range-thumb-transform-moz": "translateY(0px)",
  },
  verticalRange: {
    width: 150,
    height: 4,
    margin: `0 calc(${spacing.groupedElement} + ${spacing.range}) 0 ${spacing.range}`,
    transformOrigin: "0",
    transform: `rotate(270deg) translateX(calc(-50% + ${spacing.element}))`,
    "--xp-range-track-border-left": "1px solid #f3f2ea",
    "--xp-range-track-border-right": "0",
    "--xp-range-track-shadow": shadows.rangeTrackVertical,
  },
  verticalRoot: {
    display: "inline-block",
    width: 4,
    height: 150,
    transform: "translateY(50%)",
  },
});

type RangeRecipeArgs = {
  class?: JSX.ClassValue;
  vertical?: boolean;
  boxIndicator?: boolean;
};

export const rangeRecipe = ({
  vertical,
  boxIndicator,
  class: className,
}: RangeRecipeArgs): JSX.ClassValue[] => {
  return [
    classes["xp-range"],
    { [classes["has-box-indicator"]]: boxIndicator },
    sx(rangeStyles.range),
    vertical && sx(rangeStyles.verticalRange),
    boxIndicator && sx(rangeStyles.boxIndicator as stylex.StyleXStyles),
    className,
  ];
};
