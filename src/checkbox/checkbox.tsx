import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { Checkbox as KobalteCheckbox } from "@kobalte/core/checkbox";
import type {
  CheckboxDescriptionProps as KobalteCheckboxDescriptionProps,
  CheckboxErrorMessageProps as KobalteCheckboxErrorMessageProps,
  CheckboxInputProps as KobalteCheckboxInputProps,
  CheckboxLabelProps as KobalteCheckboxLabelProps,
  CheckboxRootProps as KobalteCheckboxRootProps,
} from "@kobalte/core/checkbox";
import type { JSX } from "@solidjs/web";
import { omit, Show, type Component, type ParentProps } from "solid-js";
import { sx } from "../sx";
import { checkboxInputMarker, checkboxStyles } from "./checkbox.styles";
import { fieldStyles } from "../field/field.styles";
import classes from "./checkbox.module.css";

export type CheckboxRootProps = Omit<
  PolymorphicProps<"div", KobalteCheckboxRootProps<"div">>,
  "as"
>;

/** The checkbox root container. */
export const CheckboxRoot: Component<CheckboxRootProps> = (props) => {
  const others = omit(props, "class");

  return <KobalteCheckbox {...others} class={[sx(checkboxStyles.root), props.class]} />;
};

export type CheckboxInputProps = Omit<
  PolymorphicProps<"input", KobalteCheckboxInputProps<"input">>,
  "as"
>;

/** The hidden input that backs the checkbox. */
export const CheckboxInput: Component<CheckboxInputProps> = (props) => {
  const others = omit(props, "class");

  return <KobalteCheckbox.Input {...others} class={[sx(checkboxInputMarker), props.class]} />;
};

export type CheckboxLabelProps = Omit<
  PolymorphicProps<"label", KobalteCheckboxLabelProps<"label">>,
  "as"
>;

/** The clickable label rendered next to the checkbox. */
export const CheckboxLabel: Component<CheckboxLabelProps> = (props) => {
  const others = omit(props, "class");

  return (
    <KobalteCheckbox.Label
      {...others}
      class={[
        classes["checkbox-label"],
        sx(fieldStyles.label),
        sx(checkboxStyles.label),
        props.class,
      ]}
    />
  );
};

export type CheckboxDescriptionProps = Omit<
  PolymorphicProps<"div", KobalteCheckboxDescriptionProps<"div">>,
  "as"
>;

/** Secondary text rendered below the label. */
export const CheckboxDescription: Component<CheckboxDescriptionProps> = (props) => {
  const others = omit(props, "class");

  return (
    <KobalteCheckbox.Description
      {...others}
      class={[sx(checkboxStyles.description), props.class]}
    />
  );
};

export type CheckboxErrorMessageProps = Omit<
  PolymorphicProps<"div", KobalteCheckboxErrorMessageProps<"div">>,
  "as"
>;

/** Validation message rendered below the label. */
export const CheckboxErrorMessage: Component<CheckboxErrorMessageProps> = (props) => {
  const others = omit(props, "class");

  return (
    <KobalteCheckbox.ErrorMessage {...others} class={[sx(checkboxStyles.error), props.class]} />
  );
};

export type CheckboxProps = ParentProps<
  Omit<PolymorphicProps<"div", KobalteCheckboxRootProps<"div">>, "as" | "children"> & {
    /** Label rendered next to the checkbox. */
    label?: JSX.Element;
    /** Secondary text rendered below the label. */
    description?: JSX.Element;
    /** Validation message rendered below the label. */
    errorMessage?: JSX.Element;
  }
>;

/** A Kobalte checkbox skinned with the XP form styles. */
export const Checkbox: Component<CheckboxProps> = (props) => {
  const others = omit(props, "class", "label", "description", "errorMessage", "children");
  const validationState = () =>
    props.validationState ?? (props.errorMessage ? "invalid" : undefined);

  return (
    <CheckboxRoot {...others} validationState={validationState()} class={props.class}>
      <CheckboxInput />
      <Show when={props.label !== undefined} fallback={props.children}>
        <CheckboxLabel>{props.label}</CheckboxLabel>
      </Show>
      <Show when={props.description}>
        <CheckboxDescription>{props.description}</CheckboxDescription>
      </Show>
      <Show when={props.errorMessage}>
        <CheckboxErrorMessage>{props.errorMessage}</CheckboxErrorMessage>
      </Show>
    </CheckboxRoot>
  );
};
