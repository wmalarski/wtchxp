import type { ComponentProps } from "@solidjs/web";
import { omit, type Component } from "solid-js";
import { sx } from "../sx";
import { progressBarStyles } from "./progress-bar.styles";

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
      class={[sx(progressBarStyles.root), props.class]}
    />
  );
};
