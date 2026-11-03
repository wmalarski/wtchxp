import { type Component } from "solid-js";
import { HelpIcon } from "./icons/help-icon";
import { WindowControlBase } from "./window-control-base";
import type { WindowControlButtonProps } from "./window-control-button";

export type HelpControlProps = WindowControlButtonProps;

/** A title bar control that opens help. */
export const HelpControl: Component<HelpControlProps> = (props) => (
  <WindowControlBase {...props} label={props.label ?? "Help"} icon={HelpIcon} />
);
