import { type Component } from "solid-js";
import { MaximizeIcon } from "./icons/maximize-icon";
import { WindowControlBase } from "./window-control-base";
import type { WindowControlButtonProps } from "./window-control-button";

export type MaximizeControlProps = WindowControlButtonProps;

/** A title bar control that maximizes the window. */
export const MaximizeControl: Component<MaximizeControlProps> = (props) => (
  <WindowControlBase {...props} label={props.label ?? "Maximize"} icon={MaximizeIcon} />
);
