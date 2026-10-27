import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { Checkbox as KobalteCheckbox } from "@kobalte/core/checkbox";
import type { CheckboxRootProps } from "@kobalte/core/checkbox";
import type { JSX } from "@solidjs/web";
import * as stylex from "@stylexjs/stylex";
import { createSignal, omit, Show } from "solid-js";
import { sx } from "../styles/sx";
import { formStyles } from "./form-styles";

const styles = stylex.create({
  root: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontFamily: "var(--sans-serif)",
    fontSize: 11,
  },
  label: {
    position: "relative",
    marginLeft: "var(--checkbox-total-width)",
    lineHeight: "13px",
    "::before": {
      content: '""',
      display: "inline-block",
      position: "absolute",
      top: 0,
      left: "var(--checkbox-left)",
      width: "var(--checkbox-width)",
      height: "var(--checkbox-width)",
      border: "var(--radio-border)",
      backgroundColor: "var(--radio-bg)",
      boxShadow: "none",
    },
    "::after": {
      content: '""',
      display: "block",
      position: "absolute",
      top: "var(--checkmark-top)",
      left: "var(--checkmark-left)",
      width: "var(--checkmark-width)",
      height: "var(--checkmark-width)",
    },
    ":not([data-disabled]):not(:active):hover::before": {
      boxShadow: "var(--radio-inner-shadow-hover)",
    },
    ":not([data-disabled]):active::before": {
      background: "var(--radio-bg-active)",
    },
    ":is([data-checked])::after": {
      left: -17,
      backgroundImage: "var(--xp-checkbox-icon)",
    },
    ":is([data-disabled])::before": {
      border: "var(--radio-border-disabled)",
      backgroundColor: "#ffffff",
    },
    ":is([data-disabled][data-checked])::after": {
      backgroundImage: "var(--xp-checkbox-icon-disabled)",
    },
  },
  focused: {
    outline: "1px dotted #000000",
  },
  description: {
    marginLeft: "var(--checkbox-total-width)",
    marginTop: 2,
    color: "#4a4a4a",
  },
  error: {
    marginLeft: "var(--checkbox-total-width)",
    marginTop: 2,
    color: "#a80000",
  },
});

export type CheckboxProps = Omit<
  PolymorphicProps<"div", CheckboxRootProps<"div">>,
  "as" | "children"
> & {
  /** Label rendered next to the checkbox. */
  label?: JSX.Element;
  /** Secondary text rendered below the label. */
  description?: JSX.Element;
  /** Validation message rendered below the label. */
  errorMessage?: JSX.Element;
  children?: JSX.Element;
};

/** A Kobalte checkbox skinned with the XP form styles. */
export function Checkbox(props: CheckboxProps) {
  const [focused, setFocused] = createSignal(false);
  const others = omit(props, "class", "label", "description", "errorMessage", "children");

  return (
    <KobalteCheckbox {...others} class={[sx(styles.root), props.class]}>
      <KobalteCheckbox.Input onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      <Show when={props.label !== undefined} fallback={props.children}>
        <KobalteCheckbox.Label
          class={[
            "checkbox-label",
            sx(formStyles.label),
            sx(styles.label),
            focused() && sx(styles.focused),
          ]}
        >
          {props.label}
        </KobalteCheckbox.Label>
      </Show>
      <Show when={props.description}>
        <KobalteCheckbox.Description class={sx(styles.description)}>
          {props.description}
        </KobalteCheckbox.Description>
      </Show>
      <Show when={props.errorMessage}>
        <KobalteCheckbox.ErrorMessage class={sx(styles.error)}>
          {props.errorMessage}
        </KobalteCheckbox.ErrorMessage>
      </Show>
    </KobalteCheckbox>
  );
}
