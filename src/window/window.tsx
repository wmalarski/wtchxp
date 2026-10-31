import type { ComponentProps } from "@solidjs/web";
import { omit, type Component } from "solid-js";
import type { ButtonProps } from "../button/button";
import { sx } from "../sx";
import classes from "./window.module.css";
import { windowStyles } from "./window.styles";

export type WindowProps = ComponentProps<"div">;

/**
 * The window frame. Compose it with `TitleBar`, `WindowBody` and `StatusBar`.
 */
export const Window: Component<WindowProps> = (props) => {
  const others = omit(props, "class");

  return <div {...others} class={[sx(windowStyles.window), props.class]} />;
};

export type TitleBarProps = ComponentProps<"div">;

export const TitleBar: Component<TitleBarProps> = (props) => {
  const others = omit(props, "class");

  return <div {...others} class={[sx(windowStyles.titleBar), props.class]} />;
};

export type TitleBarTextProps = ComponentProps<"span">;

export const TitleBarText: Component<TitleBarTextProps> = (props) => {
  const others = omit(props, "class");

  return <span {...others} class={[sx(windowStyles.titleBarText), props.class]} />;
};

export type TitleBarControlsProps = ComponentProps<"div">;

export const TitleBarControls: Component<TitleBarControlsProps> = (props) => {
  const others = omit(props, "class");

  return <div {...others} class={[sx(windowStyles.titleBarControls), props.class]} />;
};

export type WindowBodyProps = ComponentProps<"div">;

export const WindowBody: Component<WindowBodyProps> = (props) => {
  const others = omit(props, "class");

  return <div {...others} class={[sx(windowStyles.body), props.class]} />;
};

export type StatusBarProps = ComponentProps<"div">;

export const StatusBar: Component<StatusBarProps> = (props) => {
  const others = omit(props, "class");

  return <div {...others} class={[sx(windowStyles.statusBar), props.class]} />;
};

export type StatusBarFieldProps = ComponentProps<"div">;

export const StatusBarField: Component<StatusBarFieldProps> = (props) => {
  const others = omit(props, "class");

  return <div {...others} class={[sx(windowStyles.statusBarField), props.class]} />;
};

export type WindowControlAction = "Minimize" | "Maximize" | "Restore" | "Help" | "Close";

export type WindowControlProps = Omit<
  ButtonProps,
  "aria-label" | "children" | "active" | "block"
> & {
  action: WindowControlAction;
};

/** A title bar control button. */
export const WindowControl: Component<WindowControlProps> = (props) => {
  const others = omit(props, "action", "class");

  return (
    <button
      {...others}
      type="button"
      aria-label={props.action}
      class={[classes["window-control"], sx(windowStyles.control), props.class]}
    />
  );
};
