import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { RadioGroup as KobalteRadioGroup } from "@kobalte/core/radio-group";
import type {
  RadioGroupDescriptionProps as KobalteRadioGroupDescriptionProps,
  RadioGroupErrorMessageProps as KobalteRadioGroupErrorMessageProps,
  RadioGroupItemProps as KobalteRadioGroupItemProps,
  RadioGroupItemDescriptionProps as KobalteRadioGroupItemDescriptionProps,
  RadioGroupItemInputProps as KobalteRadioGroupItemInputProps,
  RadioGroupItemLabelProps as KobalteRadioGroupItemLabelProps,
  RadioGroupLabelProps as KobalteRadioGroupLabelProps,
  RadioGroupRootProps as KobalteRadioGroupRootProps,
} from "@kobalte/core/radio-group";
import type { JSX } from "@solidjs/web";
import { omit, Show, type Component, type ParentProps } from "solid-js";
import { sx } from "../sx";
import { radioInputMarker, radioStyles } from "./radio.styles";
import { fieldStyles } from "../field/field.styles";
import classes from "./radio.module.css";

export type RadioGroupRootProps = Omit<
  PolymorphicProps<"div", KobalteRadioGroupRootProps<"div">>,
  "as"
>;

/** The radio group root container. */
export const RadioGroupRoot: Component<RadioGroupRootProps> = (props) => {
  const others = omit(props, "class");

  return <KobalteRadioGroup {...others} class={[sx(radioStyles.group), props.class]} />;
};

export type RadioGroupLabelProps = Omit<
  PolymorphicProps<"span", KobalteRadioGroupLabelProps<"span">>,
  "as"
>;

/** The label rendered above a radio group. */
export const RadioGroupLabel: Component<RadioGroupLabelProps> = (props) => {
  const others = omit(props, "class");

  return (
    <KobalteRadioGroup.Label
      {...others}
      class={[sx(fieldStyles.label), sx(radioStyles.groupLabel), props.class]}
    />
  );
};

export type RadioGroupDescriptionProps = Omit<
  PolymorphicProps<"div", KobalteRadioGroupDescriptionProps>,
  "as"
>;

/** Secondary text rendered below a radio group. */
export const RadioGroupDescription: Component<RadioGroupDescriptionProps> = (props) => {
  const others = omit(props, "class");

  return (
    <KobalteRadioGroup.Description {...others} class={[sx(fieldStyles.description), props.class]} />
  );
};

export type RadioGroupErrorMessageProps = Omit<
  PolymorphicProps<"div", KobalteRadioGroupErrorMessageProps>,
  "as"
>;

/** Validation message rendered below a radio group. */
export const RadioGroupErrorMessage: Component<RadioGroupErrorMessageProps> = (props) => {
  const others = omit(props, "class");

  return (
    <KobalteRadioGroup.ErrorMessage {...others} class={[sx(fieldStyles.error), props.class]} />
  );
};

export type RadioItemProps = Omit<PolymorphicProps<"div", KobalteRadioGroupItemProps<"div">>, "as">;

/** A single radio item inside a `RadioGroup`. */
export const RadioItem: Component<RadioItemProps> = (props) => {
  const others = omit(props, "class");

  return <KobalteRadioGroup.Item {...others} class={[sx(radioStyles.item), props.class]} />;
};

export type RadioInputProps = Omit<
  PolymorphicProps<"input", KobalteRadioGroupItemInputProps<"input">>,
  "as"
>;

/** The hidden input backing a radio item. */
export const RadioInput: Component<RadioInputProps> = (props) => {
  const others = omit(props, "class");

  return <KobalteRadioGroup.ItemInput {...others} class={[sx(radioInputMarker), props.class]} />;
};

export type RadioLabelProps = Omit<
  PolymorphicProps<"label", KobalteRadioGroupItemLabelProps<"label">>,
  "as"
>;

/** The label rendered next to a radio item. */
export const RadioLabel: Component<RadioLabelProps> = (props) => {
  const others = omit(props, "class");

  return (
    <KobalteRadioGroup.ItemLabel
      {...others}
      class={[classes["radio-label"], sx(fieldStyles.label), sx(radioStyles.label), props.class]}
    />
  );
};

export type RadioDescriptionProps = Omit<
  PolymorphicProps<"div", KobalteRadioGroupItemDescriptionProps<"div">>,
  "as"
>;

/** Secondary text rendered below a radio item. */
export const RadioDescription: Component<RadioDescriptionProps> = (props) => {
  const others = omit(props, "class");

  return (
    <KobalteRadioGroup.ItemDescription
      {...others}
      class={[sx(radioStyles.description), props.class]}
    />
  );
};

export type RadioGroupProps = ParentProps<
  Omit<PolymorphicProps<"div", KobalteRadioGroupRootProps<"div">>, "as" | "children"> & {
    /** Label rendered above the group. */
    label?: JSX.Element;
    /** Secondary text rendered below the group. */
    description?: JSX.Element;
    /** Validation message rendered below the group. */
    errorMessage?: JSX.Element;
  }
>;

/** A Kobalte radio group skinned with the XP form styles. */
export const RadioGroup: Component<RadioGroupProps> = (props) => {
  const others = omit(
    props,
    "class",
    "label",
    "description",
    "errorMessage",
    "children",
    "validationState",
  );
  const validationState = () =>
    props.validationState ?? (props.errorMessage ? "invalid" : undefined);

  return (
    <RadioGroupRoot {...others} validationState={validationState()} class={props.class}>
      <Show when={props.label}>
        <RadioGroupLabel>{props.label}</RadioGroupLabel>
      </Show>
      {props.children}
      <Show when={props.description}>
        <RadioGroupDescription>{props.description}</RadioGroupDescription>
      </Show>
      <Show when={props.errorMessage}>
        <RadioGroupErrorMessage>{props.errorMessage}</RadioGroupErrorMessage>
      </Show>
    </RadioGroupRoot>
  );
};

export type RadioProps = ParentProps<
  Omit<PolymorphicProps<"div", KobalteRadioGroupItemProps<"div">>, "as" | "children"> & {
    /** Label rendered next to the radio button. */
    label?: JSX.Element;
    /** Secondary text rendered below the label. */
    description?: JSX.Element;
  }
>;

/** A single radio button inside a `RadioGroup`. */
export const Radio: Component<RadioProps> = (props) => {
  const others = omit(props, "class", "label", "description", "children");

  return (
    <RadioItem {...others} class={props.class}>
      <RadioInput />
      <RadioLabel>{props.label ?? props.children}</RadioLabel>
      <Show when={props.description}>
        <RadioDescription>{props.description}</RadioDescription>
      </Show>
    </RadioItem>
  );
};
