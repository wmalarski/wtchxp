import type { ComponentProps, JSX } from "@solidjs/web";
import { createUniqueId, omit, Show, type Component } from "solid-js";
import { fieldStyles } from "../field/field.styles";
import { sx } from "../sx";
import { rangeRecipe, rangeStyles } from "./range.styles";

export type RangeProps = Omit<ComponentProps<"input">, "type"> & {
  /** Renders the track vertically. */
  vertical?: boolean;
  /** Uses the rectangular XP thumb instead of the default triangular one. */
  boxIndicator?: boolean;
  /** Label rendered above the range. */
  label?: JSX.Element;
  /** Secondary text rendered below the range. */
  description?: JSX.Element;
  /** Validation message rendered below the range. */
  errorMessage?: JSX.Element;
  /** Whether the range should display its valid or invalid styling. */
  validationState?: "valid" | "invalid";
  /** Class applied to the root element. */
  wrapperClass?: string;
};

/** A native `<input type="range">` with the XP track and thumb skin. */
export const Range: Component<RangeProps> = (props) => {
  const generatedId = createUniqueId();
  const descriptionId = createUniqueId();
  const errorId = createUniqueId();

  const id = () => props.id ?? generatedId;
  const isInvalid = () =>
    (props.validationState ?? (props.errorMessage !== undefined ? "invalid" : undefined)) ===
    "invalid";
  const hasError = () => isInvalid() && Boolean(props.errorMessage);
  const ariaInvalid = () => (isInvalid() ? "true" : props["aria-invalid"]);
  const describedBy = () =>
    [
      props["aria-describedby"],
      props.description ? descriptionId : undefined,
      hasError() ? errorId : undefined,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

  const others = omit(
    props,
    "class",
    "vertical",
    "boxIndicator",
    "label",
    "description",
    "errorMessage",
    "validationState",
    "wrapperClass",
    "id",
    "aria-describedby",
    "aria-invalid",
  );
  // In vertical mode the wrapper owns the layout class; the rotated input
  // itself must not receive it a second time.
  const inputClass = () => (props.vertical ? undefined : props.class);

  const renderInput = () => (
    <input
      {...others}
      id={id()}
      type="range"
      aria-invalid={ariaInvalid()}
      aria-describedby={describedBy()}
      class={rangeRecipe({
        vertical: props.vertical,
        boxIndicator: props.boxIndicator,
        class: inputClass(),
      })}
    />
  );

  return (
    <div class={[sx(fieldStyles.root), props.wrapperClass]}>
      <Show when={props.label}>
        <label for={id()} class={[sx(fieldStyles.label), sx(fieldStyles.labelSpacing)]}>
          {props.label}
        </label>
      </Show>
      <Show when={props.vertical} fallback={renderInput()}>
        <div class={[sx(rangeStyles.verticalRoot), props.class]}>{renderInput()}</div>
      </Show>
      <Show when={props.description}>
        <div id={descriptionId} class={sx(fieldStyles.description)}>
          {props.description}
        </div>
      </Show>
      <Show when={hasError()}>
        <div id={errorId} role="alert" class={sx(fieldStyles.error)}>
          {props.errorMessage}
        </div>
      </Show>
    </div>
  );
};
