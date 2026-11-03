import { type Component } from "solid-js";
import { CloseIcon } from "./icons/close-icon";
import { WindowControlBase } from "./window-control-base";
import type { WindowControlButtonProps } from "./window-control-button";

export type CloseControlProps = WindowControlButtonProps;

/** A title bar control that closes the window. */
export const CloseControl: Component<CloseControlProps> = (props) => (
  <WindowControlBase {...props} label={props.label ?? "Close"} icon={CloseIcon} />
);
