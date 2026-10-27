import type { JSX } from "@solidjs/web";
import * as stylex from "@stylexjs/stylex";
import { omit } from "solid-js";
import { sx } from "../styles/sx";

const styles = stylex.create({
  root: {
    minWidth: 75,
    minHeight: 23,
    padding: "0 12px",
    border: "1px solid #003c74",
    backgroundColor: "var(--surface)",
    background: "linear-gradient(180deg, #ffffff 0%, #ecebe5 86%, #d8d0c4 100%)",
    boxShadow: "none",
    borderRadius: 3,
    boxSizing: "border-box",
    fontFamily: "var(--sans-serif)",
    fontSize: 11,
    WebkitFontSmoothing: "antialiased",
    cursor: "default",
    userSelect: "none",
    ":disabled": {
      color: "var(--button-shadow)",
      textShadow: "1px 1px 0 var(--button-highlight)",
    },
    ":not(:disabled):hover": {
      boxShadow:
        "inset -1px 1px #fff0cf, inset 1px 2px #fdd889, inset -2px 2px #fbc761, inset 2px -2px #e5a01a",
    },
    ":not(:disabled):active": {
      boxShadow: "none",
      background: "linear-gradient(180deg, #cdcac3 0%, #e3e3db 8%, #e5e5de 94%, #f2f2f1 100%)",
    },
    ":is([data-active])": {
      boxShadow: "none",
      background: "linear-gradient(180deg, #cdcac3 0%, #e3e3db 8%, #e5e5de 94%, #f2f2f1 100%)",
    },
    ":focus": {
      boxShadow:
        "inset -1px 1px #cee7ff, inset 1px 2px #98b8ea, inset -2px 2px #bcd4f6, inset 1px -1px #89ade4, inset 2px -2px #89ade4",
    },
    "::-moz-focus-inner": {
      border: 0,
    },
  },
  block: {
    width: "100%",
  },
});

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Keeps the button in its pressed ("active") state. */
  active?: boolean;
  /** Stretches the button to the full width of its container. */
  block?: boolean;
}

/** A Windows XP style push button. */
export function Button(props: ButtonProps) {
  const others = omit(props, "class", "active", "block", "type");

  return (
    <button
      {...others}
      type={props.type ?? "button"}
      data-active={props.active ? "true" : undefined}
      class={[
        "button",
        { active: props.active, [sx(styles.block)]: props.block },
        sx(styles.root),
        props.class,
      ]}
    />
  );
}
