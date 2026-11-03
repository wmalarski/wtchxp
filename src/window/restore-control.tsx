import { type Component } from "solid-js";
import { RestoreIcon } from "./icons/restore-icon";
import { WindowControlBase } from "./window-control-base";
import type { WindowControlButtonProps } from "./window-control-button";

export type RestoreControlProps = WindowControlButtonProps;

/** A title bar control that restores the window. */
export const RestoreControl: Component<RestoreControlProps> = (props) => (
  <WindowControlBase {...props} label={props.label ?? "Restore"} icon={RestoreIcon} />
);
