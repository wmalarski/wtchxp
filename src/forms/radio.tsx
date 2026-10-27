import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { RadioGroup as KobalteRadioGroup } from "@kobalte/core/radio-group";
import type { RadioGroupItemProps, RadioGroupRootProps } from "@kobalte/core/radio-group";
import type { JSX } from "@solidjs/web";
import * as stylex from "@stylexjs/stylex";
import { createSignal, omit, Show } from "solid-js";
import { sx } from "../styles/sx";
import { formStyles } from "./form-styles";

const styles = stylex.create({
  group: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontFamily: "var(--sans-serif)",
    fontSize: 11,
  },
  groupLabel: {
    marginBottom: 4,
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  label: {
    position: "relative",
    marginLeft: "var(--radio-total-width)",
    lineHeight: "16px",
    "::before": {
      content: '""',
      display: "inline-block",
      position: "absolute",
      top: 0,
      left: "var(--radio-left)",
      width: "var(--radio-width)",
      height: "var(--radio-width)",
      border: "var(--radio-border)",
      borderRadius: "50%",
      background: "var(--radio-bg)",
    },
    "::after": {
      content: '""',
      display: "block",
      position: "absolute",
      top: "var(--radio-dot-top)",
      left: "var(--radio-dot-left)",
      width: "var(--radio-dot-width)",
      height: "var(--radio-dot-width)",
    },
    ":not([data-disabled]):not(:active):hover::before": {
      boxShadow: "var(--radio-inner-shadow-hover)",
    },
    ":not([data-disabled]):active::before": {
      background: "var(--radio-bg-active)",
    },
    ":is([data-checked])::after": {
      backgroundImage: "var(--xp-radio-icon)",
    },
    ":is([data-disabled])::before": {
      border: "var(--radio-border-disabled)",
      backgroundColor: "#ffffff",
    },
    ":is([data-disabled][data-checked])::after": {
      backgroundImage: "var(--xp-radio-icon-disabled)",
    },
  },
  focused: {
    outline: "1px dotted #000000",
  },
  description: {
    marginLeft: "var(--radio-total-width)",
    marginTop: 2,
    color: "#4a4a4a",
  },
});

export type RadioGroupProps = Omit<
  PolymorphicProps<"div", RadioGroupRootProps<"div">>,
  "as" | "children"
> & {
  /** Label rendered above the group. */
  label?: JSX.Element;
  description?: JSX.Element;
  children?: JSX.Element;
};

/** A Kobalte radio group skinned with the XP form styles. */
export function RadioGroup(props: RadioGroupProps) {
  const others = omit(props, "class", "label", "description", "children");

  return (
    <KobalteRadioGroup {...others} class={[sx(styles.group), props.class]}>
      <Show when={props.label}>
        <KobalteRadioGroup.Label class={[sx(formStyles.label), sx(styles.groupLabel)]}>
          {props.label}
        </KobalteRadioGroup.Label>
      </Show>
      {props.children}
      <Show when={props.description}>
        <KobalteRadioGroup.Description>{props.description}</KobalteRadioGroup.Description>
      </Show>
    </KobalteRadioGroup>
  );
}

export type RadioProps = Omit<
  PolymorphicProps<"div", RadioGroupItemProps<"div">>,
  "as" | "children"
> & {
  /** Label rendered next to the radio button. */
  label?: JSX.Element;
  /** Secondary text rendered below the label. */
  description?: JSX.Element;
  children?: JSX.Element;
};

/** A single radio button inside a `RadioGroup`. */
export function Radio(props: RadioProps) {
  const [focused, setFocused] = createSignal(false);
  const others = omit(props, "class", "label", "description", "children");

  return (
    <KobalteRadioGroup.Item {...others} class={[sx(styles.item), props.class]}>
      <KobalteRadioGroup.ItemInput
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <KobalteRadioGroup.ItemLabel
        class={[
          "radio-label",
          sx(formStyles.label),
          sx(styles.label),
          focused() && sx(styles.focused),
        ]}
      >
        {props.label ?? props.children}
      </KobalteRadioGroup.ItemLabel>
      <Show when={props.description}>
        <KobalteRadioGroup.ItemDescription class={sx(styles.description)}>
          {props.description}
        </KobalteRadioGroup.ItemDescription>
      </Show>
    </KobalteRadioGroup.Item>
  );
}
