import type { ComponentProps } from "@solidjs/web";
import * as stylex from "@stylexjs/stylex";
import classes from "./range.module.css";
import { omit, Show, type Component } from "solid-js";
import { sx } from "../styles/sx";
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

const styles = stylex.create({
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

export type RangeProps = Omit<ComponentProps<"input">, "type"> & {
  /** Renders the track vertically. */
  vertical?: boolean;
  /** Uses the rectangular XP thumb instead of the default triangular one. */
  boxIndicator?: boolean;
};

/** A native `<input type="range">` with the XP track and thumb skin. */
export const Range: Component<RangeProps> = (props) => {
  const others = omit(props, "class", "vertical", "boxIndicator");

  const renderInput = () => (
    <input
      {...others}
      type="range"
      class={[
        classes["xp-range"],
        { [classes["has-box-indicator"]]: props.boxIndicator },
        sx(styles.range),
        props.vertical && sx(styles.verticalRange),
        props.boxIndicator && sx(styles.boxIndicator as stylex.StyleXStyles),
        props.class,
      ]}
    />
  );

  return (
    <Show when={props.vertical} fallback={renderInput()}>
      <div class={[sx(styles.verticalRoot), props.class]}>{renderInput()}</div>
    </Show>
  );
};
