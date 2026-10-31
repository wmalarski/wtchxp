import type { ComponentProps, JSX } from "@solidjs/web";
import * as stylex from "@stylexjs/stylex";
import { omit, Show, type Component } from "solid-js";
import { sx } from "../styles/sx";
import classes from "./group-box.module.css";
import {
  backgroundColors,
  fontSizes,
  fonts,
  radii,
  shadows,
  spacing,
  textColors,
} from "../variables/variables.stylex";

const styles = stylex.create({
  root: {
    margin: 0,
    padding: 10,
    border: "1px solid #d0d0bf",
    borderRadius: radii.large,
    backgroundColor: backgroundColors.surface,
    boxShadow: shadows.none,
    boxSizing: "border-box",
    fontFamily: fonts.sansSerif,
    fontSize: fontSizes.base,
  },
  legend: {
    color: textColors.accent,
    backgroundColor: backgroundColors.transparent,
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
    <fieldset {...others} class={[sx(styles.root), props.class]}>
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

  return <div {...others} class={[classes["field-row"], sx(styles.row), props.class]} />;
};

export type FieldRowStackedProps = ComponentProps<"div">;

/** A vertical row of form controls. */
export const FieldRowStacked: Component<FieldRowStackedProps> = (props) => {
  const others = omit(props, "class");

  return <div {...others} class={[sx(styles.stacked), props.class]} />;
};
