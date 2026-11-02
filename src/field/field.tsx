import type { ComponentProps, JSX } from "@solidjs/web";
import {
  createContext,
  createUniqueId,
  Show,
  useContext,
  type Accessor,
  type Component,
} from "solid-js";
import { sx } from "../sx";
import { fieldStyles } from "./field.styles";

/**
 * Reactive state shared by a `Field` and its control descendants.
 *
 * Bare controls rendered inside a `Field` (for example a native `<select>`)
 * use it to resolve their id, wire up `aria-describedby` and flag errors.
 */
export type FieldContextValue = {
  /** Resolves the id used to associate the label and the messages. */
  id: Accessor<string>;
  /** Ids of the rendered description and error messages, for `aria-describedby`. */
  describedBy: Accessor<string | undefined>;
  /** Whether the field is currently in an error state. */
  invalid: Accessor<boolean>;
};

export const FieldContext = createContext<FieldContextValue>({
  id: () => "",
  describedBy: () => undefined,
  invalid: () => false,
});

export const useFieldContext = () => useContext(FieldContext);

/**
 * Resolves the `aria-describedby` value for a field, based on the ids of its
 * rendered description and error messages.
 */
export const fieldDescribedBy = (
  id: string,
  description?: JSX.Element,
  errorMessage?: JSX.Element,
): string | undefined => {
  const ids: string[] = [];
  if (description) ids.push(`${id}-description`);
  if (errorMessage) ids.push(`${id}-error`);
  return ids.length > 0 ? ids.join(" ") : undefined;
};

export type FieldProps = ComponentProps<"div"> & {
  /** Unique id for the field; the label and the messages derive from it. */
  id?: string;
  /** Label rendered above the control. */
  label?: JSX.Element;
  /** Secondary text rendered below the control. */
  description?: JSX.Element;
  /** Validation message rendered below the control. */
  errorMessage?: JSX.Element;
  /** Class applied to the wrapping element. */
  wrapperClass?: string;
};

/**
 * The shared field primitive: wrapper layout, label, description and error
 * message wiring for a single form control.
 *
 * Render it with the control as children to get labels, error messages and
 * `aria` wiring for free:
 *
 * ```tsx
 * <Field label="Name" errorMessage="Pick one">
 *   <input />
 * </Field>
 * ```
 */
export const Field: Component<FieldProps> = (props) => {
  const fallbackId = createUniqueId();
  const id = () => props.id ?? fallbackId;
  const descriptionId = () => `${id()}-description`;
  const errorId = () => `${id()}-error`;

  const describedBy = () => fieldDescribedBy(id(), props.description, props.errorMessage);
  const invalid = () => !!props.errorMessage;

  return (
    <FieldContext
      value={{
        id: () => id(),
        describedBy: () => describedBy(),
        invalid: () => invalid(),
      }}
    >
      <div class={[sx(fieldStyles.root), props.wrapperClass]}>
        <Show when={props.label}>
          <label for={id()} class={sx(fieldStyles.label)}>
            {props.label}
          </label>
        </Show>
        {props.children}
        <Show when={props.description}>
          <div id={descriptionId()} class={sx(fieldStyles.description)}>
            {props.description}
          </div>
        </Show>
        <Show when={props.errorMessage}>
          <div id={errorId()} class={sx(fieldStyles.error)}>
            {props.errorMessage}
          </div>
        </Show>
      </div>
    </FieldContext>
  );
};
