import type { JSX } from "@solidjs/web";
import * as stylex from "@stylexjs/stylex";
import { omit, Show } from "solid-js";
import { sx } from "../styles/sx";

const styles = stylex.create({
  root: {
    margin: 0,
    padding: 10,
    border: "1px solid #d0d0bf",
    borderRadius: 4,
    backgroundColor: "#ffffff",
    boxShadow: "none",
    boxSizing: "border-box",
    fontFamily: "var(--sans-serif)",
    fontSize: 11,
  },
  legend: {
    color: "#0046d5",
    backgroundColor: "transparent",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "var(--grouped-element-spacing)",
  },
  stacked: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--grouped-element-spacing)",
  },
});

export type GroupBoxProps = JSX.FieldsetHTMLAttributes<HTMLFieldSetElement> & {
  /** Content rendered inside the `legend` element. */
  legend?: JSX.Element;
};

/** A themed `fieldset` with an optional `legend`. */
export function GroupBox(props: GroupBoxProps) {
  const others = omit(props, "class", "legend", "children");

  return (
    <fieldset {...others} class={["group-box", sx(styles.root), props.class]}>
      <Show when={props.legend}>
        <legend class={sx(styles.legend)}>{props.legend}</legend>
      </Show>
      {props.children}
    </fieldset>
  );
}

export type FieldRowProps = JSX.HTMLAttributes<HTMLDivElement>;

/** A horizontal row of form controls. */
export function FieldRow(props: FieldRowProps) {
  const others = omit(props, "class");

  return <div {...others} class={["field-row", sx(styles.row), props.class]} />;
}

export type FieldRowStackedProps = JSX.HTMLAttributes<HTMLDivElement>;

/** A vertical row of form controls. */
export function FieldRowStacked(props: FieldRowStackedProps) {
  const others = omit(props, "class");

  return <div {...others} class={["field-row-stacked", sx(styles.stacked), props.class]} />;
}
