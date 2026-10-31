import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { RadioGroup as KobalteRadioGroup } from "@kobalte/core/radio-group";
import type { RadioGroupItemProps, RadioGroupRootProps } from "@kobalte/core/radio-group";
import type { JSX } from "@solidjs/web";
import { createSignal, omit, Show, type Component, type ParentProps } from "solid-js";
import { sx } from "../sx";
import classes from "./radio.module.css";
import { radioStyles } from "./radio.styles";
import { fieldStyles } from "../field/field.styles";

export type RadioGroupProps = ParentProps<
  Omit<PolymorphicProps<"div", RadioGroupRootProps<"div">>, "as" | "children"> & {
    /** Label rendered above the group. */
    label?: JSX.Element;
    description?: JSX.Element;
  }
>;

/** A Kobalte radio group skinned with the XP form styles. */
export const RadioGroup: Component<RadioGroupProps> = (props) => {
  const others = omit(props, "class", "label", "description", "children");

  return (
    <KobalteRadioGroup {...others} class={[sx(radioStyles.group), props.class]}>
      <Show when={props.label}>
        <KobalteRadioGroup.Label class={[sx(fieldStyles.label), sx(radioStyles.groupLabel)]}>
          {props.label}
        </KobalteRadioGroup.Label>
      </Show>
      {props.children}
      <Show when={props.description}>
        <KobalteRadioGroup.Description>{props.description}</KobalteRadioGroup.Description>
      </Show>
    </KobalteRadioGroup>
  );
};

export type RadioProps = ParentProps<
  Omit<PolymorphicProps<"div", RadioGroupItemProps<"div">>, "as" | "children"> & {
    /** Label rendered next to the radio button. */
    label?: JSX.Element;
    /** Secondary text rendered below the label. */
    description?: JSX.Element;
  }
>;

/** A single radio button inside a `RadioGroup`. */
export const Radio: Component<RadioProps> = (props) => {
  const [focused, setFocused] = createSignal(false);
  const others = omit(props, "class", "label", "description", "children");

  return (
    <KobalteRadioGroup.Item {...others} class={[sx(radioStyles.item), props.class]}>
      <KobalteRadioGroup.ItemInput
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <KobalteRadioGroup.ItemLabel
        class={[
          classes["radio-label"],
          sx(fieldStyles.label),
          sx(radioStyles.label),
          focused() && sx(radioStyles.focused),
        ]}
      >
        {props.label ?? props.children}
      </KobalteRadioGroup.ItemLabel>
      <Show when={props.description}>
        <KobalteRadioGroup.ItemDescription class={sx(radioStyles.description)}>
          {props.description}
        </KobalteRadioGroup.ItemDescription>
      </Show>
    </KobalteRadioGroup.Item>
  );
};
