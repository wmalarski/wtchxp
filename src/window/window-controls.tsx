import { type Component } from "solid-js";
import type { ButtonProps } from "../button/button";
import { CloseIcon, HelpIcon, MaximizeIcon, MinimizeIcon, RestoreIcon } from "./icons";
import { WindowControlBase } from "./window-control-base";

/** Props shared by the statically typed title bar controls. */
export type WindowControlButtonProps = Omit<
  ButtonProps,
  "aria-label" | "children" | "active" | "block"
> & {
  /** Accessible name. Defaults to the control action. */
  label?: string;
};

export type MinimizeControlProps = WindowControlButtonProps;

/** A title bar control that minimizes the window. */
export const MinimizeControl: Component<MinimizeControlProps> = (props) => (
  <WindowControlBase {...props} label={props.label ?? "Minimize"} icon={MinimizeIcon} />
);

export type MaximizeControlProps = WindowControlButtonProps;

/** A title bar control that maximizes the window. */
export const MaximizeControl: Component<MaximizeControlProps> = (props) => (
  <WindowControlBase {...props} label={props.label ?? "Maximize"} icon={MaximizeIcon} />
);

export type RestoreControlProps = WindowControlButtonProps;

/** A title bar control that restores the window. */
export const RestoreControl: Component<RestoreControlProps> = (props) => (
  <WindowControlBase {...props} label={props.label ?? "Restore"} icon={RestoreIcon} />
);

export type HelpControlProps = WindowControlButtonProps;

/** A title bar control that opens help. */
export const HelpControl: Component<HelpControlProps> = (props) => (
  <WindowControlBase {...props} label={props.label ?? "Help"} icon={HelpIcon} />
);

export type CloseControlProps = WindowControlButtonProps;

/** A title bar control that closes the window. */
export const CloseControl: Component<CloseControlProps> = (props) => (
  <WindowControlBase {...props} label={props.label ?? "Close"} icon={CloseIcon} />
);
