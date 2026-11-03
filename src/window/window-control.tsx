import type { ComponentProps } from "@solidjs/web";
import { omit, type Component } from "solid-js";
import type { ButtonProps } from "../button/button";
import { CloseIcon, HelpIcon, MaximizeIcon, MinimizeIcon, RestoreIcon } from "./icons";
import { WindowControlBase } from "./window-control-base";

export type WindowControlAction = "Minimize" | "Maximize" | "Restore" | "Help" | "Close";

const windowControlIcons = {
  Minimize: MinimizeIcon,
  Maximize: MaximizeIcon,
  Restore: RestoreIcon,
  Help: HelpIcon,
  Close: CloseIcon,
} satisfies Record<WindowControlAction, Component<ComponentProps<"svg">>>;

export type WindowControlProps = Omit<
  ButtonProps,
  "aria-label" | "children" | "active" | "block"
> & {
  action: WindowControlAction;
};

/**
 * A title bar control selected with a string action.
 *
 * The dynamic `action` lookup needs every icon to be present at runtime, so
 * prefer the statically typed `MinimizeControl`, `MaximizeControl`,
 * `RestoreControl`, `HelpControl` and `CloseControl` exports when bundle size
 * matters.
 */
export const WindowControl: Component<WindowControlProps> = (props) => {
  const others = omit(props, "action", "class");

  return (
    <WindowControlBase
      {...others}
      class={props.class}
      label={props.action}
      icon={windowControlIcons[props.action]}
    />
  );
};
