import type { ComponentProps } from "@solidjs/web";
import * as stylex from "@stylexjs/stylex";
import { omit, type Component } from "solid-js";
import type { ButtonProps } from "../button/button";
import { sx } from "../styles/sx";
import {
  backgroundColors,
  backgrounds,
  fontSizes,
  fontWeights,
  fonts,
  radii,
  shadows,
  spacing,
  textColors,
  textShadows,
} from "../variables/variables.stylex";

const styles = stylex.create({
  window: {
    display: "flex",
    flexDirection: "column",
    padding: "0 0 3px",
    boxShadow: shadows.window,
    borderTopLeftRadius: radii.window,
    borderTopRightRadius: radii.window,
    backgroundColor: backgroundColors.window,
    fontSize: fontSizes.base,
    WebkitFontSmoothing: "antialiased",
  },
  body: {
    flexGrow: 1,
    minHeight: 0,
    margin: spacing.element,
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
    borderTopLeftRadius: radii.window,
    borderTopRightRadius: radii.windowTitleBar,
    background: backgrounds.titleBar,
    color: textColors.inverse,
    fontFamily: fonts.titleBar,
    fontSize: fontSizes.large,
    textShadow: textShadows.titleBar,
    userSelect: "none",
  },
  titleBarText: {
    marginRight: 24,
    paddingLeft: 3,
    fontWeight: fontWeights.bold,
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
    boxShadow: shadows.statusBar,
  },
  statusBarField: {
    flexGrow: 1,
    margin: 0,
    padding: "1px 2px",
    borderLeft: "1px solid rgba(255, 255, 255, 0.75)",
    borderRight: "1px solid rgba(208, 206, 191, 0.75)",
    boxShadow: shadows.none,
    fontFamily: fonts.sansSerif,
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
    backgroundColor: backgroundColors.windowControl,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    boxShadow: shadows.none,
    boxSizing: "border-box",
    cursor: "default",
    transition: "background 100ms",
    ":hover": {
      backgroundImage: "var(--xp-control-icon-hover)",
      boxShadow: shadows.none,
    },
    ":not(:disabled):active": {
      backgroundImage: "var(--xp-control-icon-active)",
      boxShadow: shadows.none,
    },
    ":focus": {
      boxShadow: shadows.none,
    },
    "::-moz-focus-inner": {
      border: 0,
    },
  },
});

export type WindowProps = ComponentProps<"div">;

/**
 * The window frame. Compose it with `TitleBar`, `WindowBody` and `StatusBar`.
 */
export const Window: Component<WindowProps> = (props) => {
  const others = omit(props, "class");

  return <div {...others} class={[sx(styles.window), props.class]} />;
};

export type TitleBarProps = ComponentProps<"div">;

export const TitleBar: Component<TitleBarProps> = (props) => {
  const others = omit(props, "class");

  return <div {...others} class={[sx(styles.titleBar), props.class]} />;
};

export type TitleBarTextProps = ComponentProps<"span">;

export const TitleBarText: Component<TitleBarTextProps> = (props) => {
  const others = omit(props, "class");

  return <span {...others} class={[sx(styles.titleBarText), props.class]} />;
};

export type TitleBarControlsProps = ComponentProps<"div">;

export const TitleBarControls: Component<TitleBarControlsProps> = (props) => {
  const others = omit(props, "class");

  return <div {...others} class={[sx(styles.titleBarControls), props.class]} />;
};

export type WindowBodyProps = ComponentProps<"div">;

export const WindowBody: Component<WindowBodyProps> = (props) => {
  const others = omit(props, "class");

  return <div {...others} class={[sx(styles.body), props.class]} />;
};

export type StatusBarProps = ComponentProps<"div">;

export const StatusBar: Component<StatusBarProps> = (props) => {
  const others = omit(props, "class");

  return <div {...others} class={[sx(styles.statusBar), props.class]} />;
};

export type StatusBarFieldProps = ComponentProps<"div">;

export const StatusBarField: Component<StatusBarFieldProps> = (props) => {
  const others = omit(props, "class");

  return <div {...others} class={[sx(styles.statusBarField), props.class]} />;
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
      class={[sx(styles.control), props.class]}
    />
  );
};
