import type { ComponentProps, JSX } from "@solidjs/web";
import { omit, Show, type Component } from "solid-js";
import { sx } from "../sx";
import { fieldRowRecipe, groupBoxStyles } from "./group-box.styles";

export type GroupBoxProps = ComponentProps<"fieldset"> & {
  /** Content rendered inside the `legend` element. */
  legend?: JSX.Element;
};

/** A themed `fieldset` with an optional `legend`. */
export const GroupBox: Component<GroupBoxProps> = (props) => {
  const others = omit(props, "class", "legend", "children");

  return (
    <fieldset {...others} class={[sx(groupBoxStyles.root), props.class]}>
      <Show when={props.legend}>
        <legend class={sx(groupBoxStyles.legend)}>{props.legend}</legend>
      </Show>
      {props.children}
    </fieldset>
  );
};

export type FieldRowProps = ComponentProps<"div">;

/** A horizontal row of form controls. */
export const FieldRow: Component<FieldRowProps> = (props) => {
  const others = omit(props, "class");

  return <div {...others} class={fieldRowRecipe({ class: props.class })} />;
};

export type FieldRowStackedProps = ComponentProps<"div">;

/** A vertical row of form controls. */
export const FieldRowStacked: Component<FieldRowStackedProps> = (props) => {
  const others = omit(props, "class");

  return <div {...others} class={[sx(groupBoxStyles.stacked), props.class]} />;
};
