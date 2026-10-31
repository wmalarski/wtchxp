import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { Checkbox as KobalteCheckbox } from "@kobalte/core/checkbox";
import type { CheckboxRootProps } from "@kobalte/core/checkbox";
import type { JSX } from "@solidjs/web";
import { createSignal, omit, Show, type Component, type ParentProps } from "solid-js";
import { sx } from "../sx";
import { checkboxRecipe, checkboxStyles } from "./checkbox.styles";

export type CheckboxProps = ParentProps<
  Omit<PolymorphicProps<"div", CheckboxRootProps<"div">>, "as" | "children"> & {
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
    <KobalteCheckbox {...others} class={[sx(checkboxStyles.root), props.class]}>
      <KobalteCheckbox.Input onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      <Show when={props.label !== undefined} fallback={props.children}>
        <KobalteCheckbox.Label class={checkboxRecipe({ focused: focused() })}>
          {props.label}
        </KobalteCheckbox.Label>
      </Show>
      <Show when={props.description}>
        <KobalteCheckbox.Description class={sx(checkboxStyles.description)}>
          {props.description}
        </KobalteCheckbox.Description>
      </Show>
      <Show when={props.errorMessage}>
        <KobalteCheckbox.ErrorMessage class={sx(checkboxStyles.error)}>
          {props.errorMessage}
        </KobalteCheckbox.ErrorMessage>
      </Show>
    </KobalteCheckbox>
  );
};
