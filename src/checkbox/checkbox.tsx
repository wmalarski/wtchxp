import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { Checkbox as KobalteCheckbox } from "@kobalte/core/checkbox";
import type { CheckboxRootProps } from "@kobalte/core/checkbox";
import type { JSX } from "@solidjs/web";
import * as stylex from "@stylexjs/stylex";
import { createSignal, omit, Show, type Component, type ParentProps } from "solid-js";
import { sx } from "../styles/sx";
import classes from "./checkbox.module.css";
import {
  backgroundColors,
  backgrounds,
  fontSizes,
  fonts,
  forms,
  lineHeights,
  shadows,
  textColors,
} from "../variables/variables.stylex";
import { formStyles } from "../styles/form-styles";

const checkboxTotalWidth = `calc(${forms.checkboxWidth} + ${forms.radioLabelSpacing})`;
const checkboxLeft = `calc(-1 * (${forms.checkboxWidth} + ${forms.radioLabelSpacing}))`;

const styles = stylex.create({
  root: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontFamily: fonts.sansSerif,
    fontSize: fontSizes.base,
  },
  label: {
    position: "relative",
    marginBottom: 0,
    marginLeft: checkboxTotalWidth,
    lineHeight: lineHeights.tight,
    "::before": {
      content: '""',
      display: "inline-block",
      position: "absolute",
      top: 0,
      left: checkboxLeft,
      width: forms.checkboxWidth,
      height: forms.checkboxWidth,
      border: forms.radioBorder,
      backgroundColor: backgrounds.control,
      boxShadow: shadows.none,
    },
    "::after": {
      content: '""',
      display: "block",
      position: "absolute",
      top: forms.checkmarkTop,
      left: forms.checkmarkLeft,
      width: forms.checkmarkWidth,
      height: forms.checkmarkWidth,
    },
    ":not([data-disabled]):not(:active):hover::before": {
      boxShadow: shadows.controlHover,
    },
    ":not([data-disabled]):active::before": {
      background: backgrounds.controlActive,
    },
    ":is([data-checked])::after": {
      left: -17,
      backgroundImage: "var(--xp-checkbox-icon)",
    },
    ":is([data-disabled])::before": {
      border: forms.radioBorderDisabled,
      backgroundColor: backgroundColors.surface,
    },
    ":is([data-disabled][data-checked])::after": {
      backgroundImage: "var(--xp-checkbox-icon-disabled)",
    },
  },
  focused: {
    outline: `1px dotted ${textColors.primary}`,
  },
  description: {
    marginLeft: checkboxTotalWidth,
    marginTop: 2,
    color: textColors.secondary,
  },
  error: {
    marginLeft: checkboxTotalWidth,
    marginTop: 2,
    color: textColors.error,
  },
});

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
    <KobalteCheckbox {...others} class={[sx(styles.root), props.class]}>
      <KobalteCheckbox.Input onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      <Show when={props.label !== undefined} fallback={props.children}>
        <KobalteCheckbox.Label
          class={[
            classes["checkbox-label"],
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
};
