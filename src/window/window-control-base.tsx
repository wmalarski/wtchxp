import { dynamic, type ComponentProps } from "@solidjs/web";
import { createComponent, omit, type Component } from "solid-js";
import type { ButtonProps } from "../button/button";
import { windowControlRecipe } from "./window.styles";

export type WindowControlBaseProps = Omit<
  ButtonProps,
  "aria-label" | "children" | "active" | "block"
> & {
  /** Accessible name announced by screen readers. */
  label: string;
  /** Icon rendered inside the control. */
  icon: Component<ComponentProps<"svg">>;
};

/**
 * Shared title bar control chrome. Keeping the icon as a prop means the action
 * components can each import only the icon they render.
 */
export const WindowControlBase: Component<WindowControlBaseProps> = (props) => {
  const others = omit(props, "class", "icon", "label");
  const Icon = dynamic(() => props.icon);

  return (
    <button
      {...others}
      type="button"
      aria-label={props.label}
      class={windowControlRecipe({ class: props.class })}
    >
      {createComponent(Icon, {})}
    </button>
  );
};
