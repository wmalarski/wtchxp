import type { ComponentProps, JSX } from "@solidjs/web";
import { createUniqueId, omit, type Component } from "solid-js";
import { sx } from "../sx";
import classes from "./select.module.css";
import { selectStyles } from "./select.styles";
import { Field, fieldDescribedBy } from "../field/field";

export type SelectProps = ComponentProps<"select"> & {
  /** Label rendered above the select. */
  label?: JSX.Element;
  /** Secondary text rendered below the select. */
  description?: JSX.Element;
  /** Validation message rendered below the select. */
  errorMessage?: JSX.Element;
  /** Class applied to the wrapping element. */
  wrapperClass?: string;
};

/**
 * A native `<select>` skinned with the XP form styles, wrapped in a themed
 * field that renders the label, description and error message.
 */
export const Select: Component<SelectProps> = (props) => {
  const others = omit(
    props,
    "class",
    "label",
    "description",
    "errorMessage",
    "wrapperClass",
    "children",
  );
  const fallbackId = createUniqueId();
  const id = () => (typeof props.id === "string" ? props.id : fallbackId);

  const describedBy = () => fieldDescribedBy(id(), props.description, props.errorMessage);

  return (
    <Field
      id={id()}
      label={props.label}
      description={props.description}
      errorMessage={props.errorMessage}
      wrapperClass={props.wrapperClass}
    >
      <select
        {...others}
        id={id()}
        aria-invalid={props.errorMessage ? "true" : undefined}
        aria-describedby={describedBy()}
        class={[classes["xp-select"], sx(selectStyles.select), props.class]}
      >
        {props.children}
      </select>
    </Field>
  );
};
