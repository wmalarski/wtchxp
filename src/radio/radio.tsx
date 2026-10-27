import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { RadioGroup as KobalteRadioGroup } from "@kobalte/core/radio-group";
import type { RadioGroupItemProps, RadioGroupRootProps } from "@kobalte/core/radio-group";
import type { JSX } from "@solidjs/web";
import * as stylex from "@stylexjs/stylex";
import { createSignal, omit, Show } from "solid-js";
import { sx } from "../styles/sx";
import { fonts, forms } from "../variables/variables.stylex";
import { formStyles } from "../styles/form-styles";

const radioTotalWidth = `calc(${forms.radioWidth} + ${forms.radioLabelSpacing})`;
const radioLeft = `calc(-1 * (${forms.radioWidth} + ${forms.radioLabelSpacing}))`;
const radioDotLeft = `calc(-1 * (${forms.radioWidth} + ${forms.radioLabelSpacing}) + ${forms.radioWidth} / 2 - ${forms.radioDotWidth} / 2)`;

const styles = stylex.create({
  group: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontFamily: fonts.sansSerif,
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
    marginLeft: radioTotalWidth,
    lineHeight: "16px",
    "::before": {
      content: '""',
      display: "inline-block",
      position: "absolute",
      top: 0,
      left: radioLeft,
      width: forms.radioWidth,
      height: forms.radioWidth,
      border: forms.radioBorder,
      borderRadius: "50%",
      background: forms.radioBg,
    },
    "::after": {
      content: '""',
      display: "block",
      position: "absolute",
      top: forms.radioDotTop,
      left: radioDotLeft,
      width: forms.radioDotWidth,
      height: forms.radioDotWidth,
    },
    ":not([data-disabled]):not(:active):hover::before": {
      boxShadow: forms.radioInnerShadowHover,
    },
    ":not([data-disabled]):active::before": {
      background: forms.radioBgActive,
    },
    ":is([data-checked])::after": {
      backgroundImage: "var(--xp-radio-icon)",
    },
    ":is([data-disabled])::before": {
      border: forms.radioBorderDisabled,
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
    marginLeft: radioTotalWidth,
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
