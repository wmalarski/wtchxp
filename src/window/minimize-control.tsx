import { type Component } from "solid-js";
import { MinimizeIcon } from "./icons/minimize-icon";
import { WindowControlBase } from "./window-control-base";
import type { WindowControlButtonProps } from "./window-control-button";

export type MinimizeControlProps = WindowControlButtonProps;

/** A title bar control that minimizes the window. */
export const MinimizeControl: Component<MinimizeControlProps> = (props) => (
  <WindowControlBase {...props} label={props.label ?? "Minimize"} icon={MinimizeIcon} />
);
