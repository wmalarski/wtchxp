import type { ComponentProps } from "@solidjs/web";
import { omit, type Component } from "solid-js";
import { sx } from "../sx";
import { buttonStyles } from "./button.styles";

export type ButtonProps = ComponentProps<"button"> & {
  /** Keeps the button in its pressed ("active") state. */
  active?: boolean;
  /** Stretches the button to the full width of its container. */
  block?: boolean;
};

/** A Windows XP style push button. */
export const Button: Component<ButtonProps> = (props) => {
  const others = omit(props, "class", "active", "block", "type");

  return (
    <button
      {...others}
      type={props.type ?? "button"}
      data-active={props.active ? "true" : undefined}
      class={[{ [sx(buttonStyles.block)]: props.block }, sx(buttonStyles.root), props.class]}
    />
  );
};
