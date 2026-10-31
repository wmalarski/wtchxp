import type { ComponentProps } from "@solidjs/web";
import type { StyleXStyles } from "@stylexjs/stylex";
import { omit, Show, type Component } from "solid-js";
import { sx } from "../sx";
import classes from "./range.module.css";
import { rangeStyles } from "./range.styles";

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
        sx(rangeStyles.range),
        props.vertical && sx(rangeStyles.verticalRange),
        props.boxIndicator && sx(rangeStyles.boxIndicator as StyleXStyles),
        props.class,
      ]}
    />
  );

  return (
    <Show when={props.vertical} fallback={renderInput()}>
      <div class={[sx(rangeStyles.verticalRoot), props.class]}>{renderInput()}</div>
    </Show>
  );
};
