import type { ComponentProps, JSX } from "@solidjs/web";
import * as stylex from "@stylexjs/stylex";
import { createUniqueId, omit, Show, type Component } from "solid-js";
import { sx } from "../styles/sx";
import { fontSizes, fonts, textColors } from "../variables/variables.stylex";
import { formStyles } from "../styles/form-styles";

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontFamily: fonts.sansSerif,
    fontSize: fontSizes.base,
  },
  label: {
    marginBottom: 2,
  },
  select: {
    width: "100%",
    boxSizing: "border-box",
  },
  description: {
    marginTop: 2,
    color: textColors.secondary,
  },
  error: {
    marginTop: 2,
    color: textColors.error,
  },
});

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
 * A native `<select>` so the existing `select` rules (including the XP dropdown
 * glyph) apply unchanged.
 */
export const Select: Component<SelectProps> = (props) => {
  const fallbackId = createUniqueId();
  const id = () => props.id ?? fallbackId;
  const descriptionId = () => `${id()}-description`;
  const errorId = () => `${id()}-error`;

  const describedBy = () => {
    const ids: string[] = [];
    if (props.description) ids.push(descriptionId());
    if (props.errorMessage) ids.push(errorId());
    return ids.length > 0 ? ids.join(" ") : undefined;
  };

  const others = omit(
    props,
    "class",
    "label",
    "description",
    "errorMessage",
    "wrapperClass",
    "children",
  );

  return (
    <div class={[sx(styles.root), props.wrapperClass]}>
      <Show when={props.label}>
        <label for={id()} class={[sx(formStyles.label), sx(styles.label)]}>
          {props.label}
        </label>
      </Show>
      <select
        {...others}
        id={id()}
        aria-invalid={props.errorMessage ? "true" : undefined}
        aria-describedby={describedBy()}
        class={["xp-select", sx(formStyles.select), sx(styles.select), props.class]}
      >
        {props.children}
      </select>
      <Show when={props.description}>
        <div id={descriptionId()} class={sx(styles.description)}>
          {props.description}
        </div>
      </Show>
      <Show when={props.errorMessage}>
        <div id={errorId()} class={sx(styles.error)}>
          {props.errorMessage}
        </div>
      </Show>
    </div>
  );
};
