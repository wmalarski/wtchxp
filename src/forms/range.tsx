import type { JSX } from "@solidjs/web";
import * as stylex from "@stylexjs/stylex";
import { omit, Show } from "solid-js";
import { sx } from "../styles/sx";

const horizontalTrackShadow =
  "1px 0 0 white, 1px 1px 0 white, 0 1px 0 white, -1px 0 0 #9d9c99, -1px -1px 0 #9d9c99, 0 -1px 0 #9d9c99, -1px 1px 0 white, 1px -1px #9d9c99";

const verticalTrackShadow =
  "-1px 0 0 white, -1px 1px 0 white, 0 1px 0 white, 1px 0 0 #9d9c99, 1px -1px 0 #9d9c99, 0 -1px 0 #9d9c99, 1px 1px 0 white, -1px -1px #9d9c99";

const trackStyles = {
  width: "100%",
  height: 2,
  boxSizing: "border-box",
  backgroundColor: "#ecebe4",
  borderRight: "var(--xp-range-track-border-right, 1px solid #f3f2ea)",
  borderBottom: "var(--xp-range-track-border-bottom, 1px solid #f3f2ea)",
  borderLeft: "var(--xp-range-track-border-left, 0)",
  borderRadius: 2,
  boxShadow: `var(--xp-range-track-shadow, ${horizontalTrackShadow})`,
} as const;

const styles = stylex.create({
  range: {
    width: "100%",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    background: "none",
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
      borderRadius: 0,
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
    margin: "0 calc(var(--grouped-element-spacing) + var(--range-spacing)) 0 var(--range-spacing)",
    transformOrigin: "0",
    transform: "rotate(270deg) translateX(calc(-50% + var(--element-spacing)))",
    "--xp-range-track-border-left": "1px solid #f3f2ea",
    "--xp-range-track-border-right": "0",
    "--xp-range-track-shadow": verticalTrackShadow,
  },
  verticalRoot: {
    display: "inline-block",
    width: 4,
    height: 150,
    transform: "translateY(50%)",
  },
});

export type RangeProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  /** Renders the track vertically. */
  vertical?: boolean;
  /** Uses the rectangular XP thumb instead of the default triangular one. */
  boxIndicator?: boolean;
};

/** A native `<input type="range">` with the XP track and thumb skin. */
export function Range(props: RangeProps) {
  const others = omit(props, "class", "vertical", "boxIndicator");

  const renderInput = () => (
    <input
      {...others}
      type="range"
      class={[
        "xp-range",
        { "has-box-indicator": props.boxIndicator },
        sx(styles.range),
        props.vertical && sx(styles.verticalRange),
        props.boxIndicator && sx(styles.boxIndicator as stylex.StyleXStyles),
        props.class,
      ]}
    />
  );

  return (
    <Show when={props.vertical} fallback={renderInput()}>
      <div class={["is-vertical", sx(styles.verticalRoot)]}>{renderInput()}</div>
    </Show>
  );
}
