import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { Checkbox as KobalteCheckbox } from "@kobalte/core/checkbox";
import type {
  CheckboxControlProps as KobalteCheckboxControlProps,
  CheckboxDescriptionProps as KobalteCheckboxDescriptionProps,
  CheckboxErrorMessageProps as KobalteCheckboxErrorMessageProps,
  CheckboxIndicatorProps as KobalteCheckboxIndicatorProps,
  CheckboxInputProps as KobalteCheckboxInputProps,
  CheckboxLabelProps as KobalteCheckboxLabelProps,
  CheckboxRootProps as KobalteCheckboxRootProps,
} from "@kobalte/core/checkbox";
import type { JSX } from "@solidjs/web";
import { createSignal, omit, Show, type Component, type ParentProps } from "solid-js";
import { sx } from "../sx";
import { checkboxRecipe, checkboxStyles } from "./checkbox.styles";

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

  return <KobalteCheckbox.Input {...others} class={props.class} />;
};

export type CheckboxLabelProps = Omit<
  PolymorphicProps<"label", KobalteCheckboxLabelProps<"label">>,
  "as"
> & {
  /** Whether the associated input is focused. */
  focused?: boolean;
};

/** The clickable label rendered next to the checkbox. */
export const CheckboxLabel: Component<CheckboxLabelProps> = (props) => {
  const others = omit(props, "class", "focused");

  return (
    <KobalteCheckbox.Label
      {...others}
      class={checkboxRecipe({ focused: props.focused, class: props.class })}
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

export type CheckboxControlProps = Omit<
  PolymorphicProps<"div", KobalteCheckboxControlProps<"div">>,
  "as"
>;

/** The visual control box of the checkbox. */
export const CheckboxControl: Component<CheckboxControlProps> = (props) => {
  const others = omit(props, "class");

  return <KobalteCheckbox.Control {...others} class={props.class} />;
};

export type CheckboxIndicatorProps = Omit<
  PolymorphicProps<"div", KobalteCheckboxIndicatorProps<"div">>,
  "as"
>;

/** The checkmark indicator rendered inside the control. */
export const CheckboxIndicator: Component<CheckboxIndicatorProps> = (props) => {
  const others = omit(props, "class");

  return <KobalteCheckbox.Indicator {...others} class={props.class} />;
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
  const [focused, setFocused] = createSignal(false);
  const others = omit(props, "class", "label", "description", "errorMessage", "children");

  return (
    <CheckboxRoot {...others} class={props.class}>
      <CheckboxInput onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      <Show when={props.label !== undefined} fallback={props.children}>
        <CheckboxLabel focused={focused()}>{props.label}</CheckboxLabel>
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

// Aliases for Kobalte-style and shorthand names.
export {
  CheckboxRoot as Root,
  CheckboxInput as Input,
  CheckboxLabel as Label,
  CheckboxDescription as Description,
  CheckboxErrorMessage as ErrorMessage,
  CheckboxControl as Control,
  CheckboxIndicator as Indicator,
};
