import type { ComponentProps } from "@solidjs/web";
import { omit, Show, type Component } from "solid-js";
import { sx } from "../sx";
import { rangeRecipe, rangeStyles } from "./range.styles";

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
      class={rangeRecipe({
        vertical: props.vertical,
        boxIndicator: props.boxIndicator,
        class: props.class,
      })}
    />
  );

  return (
    <Show when={props.vertical} fallback={renderInput()}>
      <div class={[sx(rangeStyles.verticalRoot), props.class]}>{renderInput()}</div>
    </Show>
  );
};
