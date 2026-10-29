import type { ComponentProps, JSX } from "@solidjs/web";
import * as stylex from "@stylexjs/stylex";
import { omit, Show, type Component } from "solid-js";
import { sx } from "../styles/sx";
import { fonts, spacing } from "../variables/variables.stylex";

const styles = stylex.create({
  root: {
    margin: 0,
    padding: 10,
    border: "1px solid #d0d0bf",
    borderRadius: 4,
    backgroundColor: "#ffffff",
    boxShadow: "none",
    boxSizing: "border-box",
    fontFamily: fonts.sansSerif,
    fontSize: 11,
  },
  legend: {
    color: "#0046d5",
    backgroundColor: "transparent",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: spacing.groupedElement,
  },
  stacked: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.groupedElement,
  },
});

export type GroupBoxProps = ComponentProps<"fieldset"> & {
  /** Content rendered inside the `legend` element. */
  legend?: JSX.Element;
};

/** A themed `fieldset` with an optional `legend`. */
export const GroupBox: Component<GroupBoxProps> = (props) => {
  const others = omit(props, "class", "legend", "children");

  return (
    <fieldset {...others} class={["group-box", sx(styles.root), props.class]}>
      <Show when={props.legend}>
        <legend class={sx(styles.legend)}>{props.legend}</legend>
      </Show>
      {props.children}
    </fieldset>
  );
};

export type FieldRowProps = ComponentProps<"div">;

/** A horizontal row of form controls. */
export const FieldRow: Component<FieldRowProps> = (props) => {
  const others = omit(props, "class");

  return <div {...others} class={["field-row", sx(styles.row), props.class]} />;
};

export type FieldRowStackedProps = ComponentProps<"div">;

/** A vertical row of form controls. */
export const FieldRowStacked: Component<FieldRowStackedProps> = (props) => {
  const others = omit(props, "class");

  return <div {...others} class={["field-row-stacked", sx(styles.stacked), props.class]} />;
};
