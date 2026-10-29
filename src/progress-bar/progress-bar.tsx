import type { ComponentProps } from "@solidjs/web";
import * as stylex from "@stylexjs/stylex";
import { omit, type Component } from "solid-js";
import { sx } from "../styles/sx";

const sliding = stylex.keyframes({
  from: {
    transform: "translateX(-30px)",
  },
  to: {
    transform: "translateX(100%)",
  },
});

const determinateTrack =
  "repeating-linear-gradient(to right, #fff 0px, #fff 2px, transparent 2px, transparent 10px), linear-gradient(to bottom, #acedad 0%, #7be47d 14%, #4cda50 28%, #2ed330 42%, #42d845 57%, #76e275 71%, #8fe791 85%, #ffffff 100%)";

const indeterminateTrack =
  "repeating-linear-gradient(to right, transparent 0px, transparent 8px, #fff 8px, #fff 10px, transparent 10px, transparent 18px, #fff 18px, #fff 20px, transparent 20px, transparent 28px, #fff 28px, #fff 100%), linear-gradient(to bottom, #acedad 0%, #7be47d 14%, #4cda50 28%, #2ed330 42%, #42d845 57%, #76e275 71%, #8fe791 85%, #ffffff 100%)";

const styles = stylex.create({
  root: {
    width: "100%",
    boxSizing: "border-box",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    height: 14,
    padding: "1px 2px 1px 0",
    border: "1px solid #686868",
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    boxShadow: "inset 0 0 1px 0 #686868",
    ":not([data-indeterminate])::-webkit-progress-bar": {
      backgroundColor: "transparent",
    },
    ":not([data-indeterminate])::-webkit-progress-value": {
      borderRadius: 2,
      background: determinateTrack,
    },
    ":not([data-indeterminate])::-moz-progress-bar": {
      borderRadius: 2,
      background: determinateTrack,
    },
    ":is([data-indeterminate])": {
      position: "relative",
    },
    ":is([data-indeterminate])::-webkit-progress-bar": {
      width: "100%",
      background: indeterminateTrack,
      animationName: sliding,
      animationDuration: "2s",
      animationTimingFunction: "linear",
      animationIterationCount: "infinite",
    },
    ":is([data-indeterminate])::before": {
      boxSizing: "border-box",
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "#ffffff",
      boxShadow: "inset 0 0 1px 0 #686868",
    },
    ":is([data-indeterminate])::after": {
      boxSizing: "border-box",
      content: '""',
      position: "absolute",
      top: 1,
      left: 2,
      width: "100%",
      height: "calc(100% - 2px)",
      padding: "1px 2px",
      borderRadius: 2,
      background: indeterminateTrack,
      animationName: sliding,
      animationDuration: "2s",
      animationTimingFunction: "linear",
      animationIterationCount: "infinite",
    },
    ":is([data-indeterminate])::-moz-progress-bar": {
      width: "100%",
      background: indeterminateTrack,
      animationName: sliding,
      animationDuration: "2s",
      animationTimingFunction: "linear",
      animationIterationCount: "infinite",
    },
  },
});

export type ProgressBarProps = ComponentProps<"progress"> & {
  /** Current value. Omit (or set `indeterminate`) for the animated bar. */
  value?: number;
  /** Upper bound of `value`. Defaults to `100`. */
  max?: number;
  /** Forces the indeterminate animation even when `value` is set. */
  indeterminate?: boolean;
  /** Accessible name for the progress bar. */
  label?: string;
};

/**
 * A native `<progress>` element, so the XP progress styling (including the
 * indeterminate animation) applies without extra markup.
 */
export const ProgressBar: Component<ProgressBarProps> = (props) => {
  const others = omit(props, "class", "value", "max", "indeterminate", "label");
  const isIndeterminate = () => props.indeterminate || props.value === undefined;

  return (
    <progress
      {...others}
      value={props.indeterminate ? undefined : props.value}
      max={props.max ?? 100}
      data-indeterminate={isIndeterminate() ? "true" : undefined}
      aria-label={props.label}
      class={[sx(styles.root), props.class]}
    />
  );
};
