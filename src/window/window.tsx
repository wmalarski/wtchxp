import type { JSX } from "@solidjs/web";
import * as stylex from "@stylexjs/stylex";
import { omit } from "solid-js";
import type { ButtonProps } from "../button/button";
import { sx } from "../styles/sx";

const titleBarBackground =
  "linear-gradient(180deg, #0997ff 0%, #0053ee 8%, #0050ee 40%, #0066ff 88% 93%, #005bff 95%, #003dd7 96% 100%)";

const styles = stylex.create({
  window: {
    display: "flex",
    flexDirection: "column",
    padding: "0 0 3px",
    boxShadow:
      "inset -1px -1px #00138c, inset 1px 1px #0831d9, inset -2px -2px #001ea0, inset 2px 2px #166aee, inset -3px -3px #003bda, inset 3px 3px #0855dd",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "var(--surface)",
    fontSize: 11,
    WebkitFontSmoothing: "antialiased",
  },
  body: {
    flexGrow: 1,
    minHeight: 0,
    margin: "var(--element-spacing)",
  },
  titleBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexShrink: 0,
    height: 28,
    padding: "3px 5px 3px 3px",
    borderTop: "1px solid #0831d9",
    borderLeft: "1px solid #0831d9",
    borderRight: "1px solid #001ea0",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 7,
    background: titleBarBackground,
    color: "var(--button-highlight)",
    fontFamily: '"Trebuchet MS"',
    fontSize: 13,
    textShadow: "1px 1px #0f1089",
    userSelect: "none",
  },
  titleBarText: {
    marginRight: 24,
    paddingLeft: 3,
    fontWeight: "bold",
  },
  titleBarControls: {
    display: "flex",
  },
  statusBar: {
    display: "flex",
    flexShrink: 0,
    gap: 0,
    margin: "0 3px",
    padding: "2px 1px",
    boxShadow: "inset 0 1px 2px var(--button-shadow)",
  },
  statusBarField: {
    flexGrow: 1,
    margin: 0,
    padding: "1px 2px",
    borderLeft: "1px solid rgba(255, 255, 255, 0.75)",
    borderRight: "1px solid rgba(208, 206, 191, 0.75)",
    boxShadow: "none",
    fontFamily: "var(--sans-serif)",
    WebkitFontSmoothing: "antialiased",
    ":first-of-type": {
      borderLeft: "none",
    },
    ":last-of-type": {
      borderRight: "none",
    },
  },
  control: {
    minWidth: 21,
    minHeight: 21,
    marginLeft: 2,
    padding: 0,
    border: "none",
    backgroundImage: "var(--xp-control-icon)",
    backgroundColor: "#0050ee",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    boxShadow: "none",
    boxSizing: "border-box",
    cursor: "default",
    transition: "background 100ms",
    ":hover": {
      backgroundImage: "var(--xp-control-icon-hover)",
      boxShadow: "none",
    },
    ":not(:disabled):active": {
      backgroundImage: "var(--xp-control-icon-active)",
      boxShadow: "none",
    },
    ":focus": {
      boxShadow: "none",
    },
    "::-moz-focus-inner": {
      border: 0,
    },
  },
});

export type WindowProps = JSX.HTMLAttributes<HTMLDivElement>;

/**
 * The window frame. Compose it with `TitleBar`, `WindowBody` and `StatusBar`.
 */
export function Window(props: WindowProps) {
  const others = omit(props, "class");

  return <div {...others} class={["window", sx(styles.window), props.class]} />;
}

export type TitleBarProps = JSX.HTMLAttributes<HTMLDivElement>;

export function TitleBar(props: TitleBarProps) {
  const others = omit(props, "class");

  return <div {...others} class={["title-bar", sx(styles.titleBar), props.class]} />;
}

export type TitleBarTextProps = JSX.HTMLAttributes<HTMLSpanElement>;

export function TitleBarText(props: TitleBarTextProps) {
  const others = omit(props, "class");

  return <span {...others} class={["title-bar-text", sx(styles.titleBarText), props.class]} />;
}

export type TitleBarControlsProps = JSX.HTMLAttributes<HTMLDivElement>;

export function TitleBarControls(props: TitleBarControlsProps) {
  const others = omit(props, "class");

  return (
    <div {...others} class={["title-bar-controls", sx(styles.titleBarControls), props.class]} />
  );
}

export type WindowBodyProps = JSX.HTMLAttributes<HTMLDivElement>;

export function WindowBody(props: WindowBodyProps) {
  const others = omit(props, "class");

  return <div {...others} class={["window-body", sx(styles.body), props.class]} />;
}

export type StatusBarProps = JSX.HTMLAttributes<HTMLDivElement>;

export function StatusBar(props: StatusBarProps) {
  const others = omit(props, "class");

  return <div {...others} class={["status-bar", sx(styles.statusBar), props.class]} />;
}

export type StatusBarFieldProps = JSX.HTMLAttributes<HTMLDivElement>;

export function StatusBarField(props: StatusBarFieldProps) {
  const others = omit(props, "class");

  return <div {...others} class={["status-bar-field", sx(styles.statusBarField), props.class]} />;
}

export type WindowControlAction = "Minimize" | "Maximize" | "Restore" | "Help" | "Close";

export interface WindowControlProps extends Omit<
  ButtonProps,
  "aria-label" | "children" | "active" | "block"
> {
  action: WindowControlAction;
}

/** A title bar control button. */
export function WindowControl(props: WindowControlProps) {
  const others = omit(props, "action", "class");

  return (
    <button
      {...others}
      type="button"
      aria-label={props.action}
      class={["button", "window-control", sx(styles.control), props.class]}
    />
  );
}
