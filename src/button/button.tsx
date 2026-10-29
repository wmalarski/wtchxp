import type { ComponentProps } from "@solidjs/web";
import * as stylex from "@stylexjs/stylex";
import { omit, type Component } from "solid-js";
import { sx } from "../styles/sx";
import {
  backgroundColors,
  backgrounds,
  fontSizes,
  fonts,
  radii,
  shadows,
  textColors,
} from "../variables/variables.stylex";

const styles = stylex.create({
  root: {
    minWidth: 75,
    minHeight: 23,
    padding: "0 12px",
    border: "1px solid #003c74",
    backgroundColor: backgroundColors.window,
    background: backgrounds.button,
    boxShadow: shadows.none,
    borderRadius: radii.medium,
    boxSizing: "border-box",
    fontFamily: fonts.sansSerif,
    fontSize: fontSizes.base,
    WebkitFontSmoothing: "antialiased",
    cursor: "default",
    userSelect: "none",
    ":disabled": {
      color: textColors.disabled,
      textShadow: `1px 1px 0 ${textColors.inverse}`,
    },
    ":not(:disabled):hover": {
      boxShadow: shadows.buttonHover,
    },
    ":not(:disabled):active": {
      boxShadow: shadows.none,
      background: backgrounds.buttonActive,
    },
    ":is([data-active])": {
      boxShadow: shadows.none,
      background: backgrounds.buttonActive,
    },
    ":focus": {
      boxShadow: shadows.buttonFocus,
    },
    "::-moz-focus-inner": {
      border: 0,
    },
  },
  block: {
    width: "100%",
  },
});

export type ButtonProps = ComponentProps<"button"> & {
  /** Keeps the button in its pressed ("active") state. */
  active?: boolean;
  /** Stretches the button to the full width of its container. */
  block?: boolean;
};

/** A Windows XP style push button. */
export const Button: Component<ButtonProps> = (props) => {
  const others = omit(props, "class", "active", "block", "type");

  return (
    <button
      {...others}
      type={props.type ?? "button"}
      data-active={props.active ? "true" : undefined}
      class={[{ [sx(styles.block)]: props.block }, sx(styles.root), props.class]}
    />
  );
};
