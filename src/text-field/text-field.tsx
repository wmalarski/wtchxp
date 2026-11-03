import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { TextField as KobalteTextField } from "@kobalte/core/text-field";
import type {
  TextFieldDescriptionProps as KobalteTextFieldDescriptionProps,
  TextFieldErrorMessageProps as KobalteTextFieldErrorMessageProps,
  TextFieldInputProps as KobalteTextFieldInputProps,
  TextFieldLabelProps as KobalteTextFieldLabelProps,
  TextFieldRootProps as KobalteTextFieldRootProps,
  TextFieldTextAreaProps as KobalteTextFieldTextAreaProps,
} from "@kobalte/core/text-field";
import type { ComponentProps, JSX } from "@solidjs/web";
import { omit, Show, type Component } from "solid-js";
import { sx } from "../sx";
import { fieldStyles } from "../field/field.styles";
import { textFieldStyles } from "./text-field.styles";

export type TextFieldRootProps = Omit<
  PolymorphicProps<"div", KobalteTextFieldRootProps<"div">>,
  "as"
>;

/** The text field root container. */
export const TextFieldRoot: Component<TextFieldRootProps> = (props) => {
  const others = omit(props, "class");

  return <KobalteTextField {...others} class={[sx(fieldStyles.root), props.class]} />;
};

export type TextFieldLabelProps = Omit<
  PolymorphicProps<"label", KobalteTextFieldLabelProps<"label">>,
  "as"
>;

/** The label rendered above a text field. */
export const TextFieldLabel: Component<TextFieldLabelProps> = (props) => {
  const others = omit(props, "class");

  return (
    <KobalteTextField.Label
      {...others}
      class={[sx(fieldStyles.label), sx(fieldStyles.labelSpacing), props.class]}
    />
  );
};

export type TextFieldInputProps = Omit<
  PolymorphicProps<"input", KobalteTextFieldInputProps<"input">>,
  "as"
>;

/** The input element of a text field. */
export const TextFieldInput: Component<TextFieldInputProps> = (props) => {
  const isTall = () => {
    const type = props.type ?? "text";
    return type === "text" || type === "password" || type === "email";
  };
  const others = omit(props, "class");

  return (
    <KobalteTextField.Input
      {...others}
      class={[
        sx(textFieldStyles.base, isTall() ? textFieldStyles.inputTall : textFieldStyles.input),
        props.class,
      ]}
    />
  );
};

export type TextFieldTextAreaProps = Omit<
  PolymorphicProps<"textarea", KobalteTextFieldTextAreaProps<"textarea">>,
  "as"
>;

/** The textarea element of a text field. */
export const TextFieldTextArea: Component<TextFieldTextAreaProps> = (props) => {
  const others = omit(props, "class");

  return <KobalteTextField.TextArea {...others} class={[sx(textFieldStyles.base), props.class]} />;
};

export type TextFieldDescriptionProps = Omit<
  PolymorphicProps<"div", KobalteTextFieldDescriptionProps>,
  "as"
>;

/** Secondary text rendered below a text field. */
export const TextFieldDescription: Component<TextFieldDescriptionProps> = (props) => {
  const others = omit(props, "class");

  return (
    <KobalteTextField.Description {...others} class={[sx(fieldStyles.description), props.class]} />
  );
};

export type TextFieldErrorMessageProps = Omit<
  PolymorphicProps<"div", KobalteTextFieldErrorMessageProps<"div">>,
  "as"
>;

/** Validation message rendered below a text field. */
export const TextFieldErrorMessage: Component<TextFieldErrorMessageProps> = (props) => {
  const others = omit(props, "class");

  return <KobalteTextField.ErrorMessage {...others} class={[sx(fieldStyles.error), props.class]} />;
};

export type TextFieldProps = Omit<
  PolymorphicProps<"div", KobalteTextFieldRootProps<"div">>,
  "as" | "children"
> & {
  /** Label rendered above the input. */
  label?: JSX.Element;
  /** Secondary text rendered below the input. */
  description?: JSX.Element;
  /** Validation message rendered below the input. */
  errorMessage?: JSX.Element;
  /** Class applied to the input (or textarea) element. */
  inputClass?: string;
  /** Renders a `<textarea>` instead of an `<input>`. */
  multiline?: boolean;
  /** Number of visible text lines for `multiline`. */
  rows?: number;
  /** Visible width of a `multiline` textarea. */
  cols?: number;
  /** Native input type. Defaults to `"text"`. */
  type?: ComponentProps<"input">["type"];
  /** Placeholder passed to the input element. */
  placeholder?: string;
  /** Autocomplete hint passed to the input element. */
  autocomplete?: string;
  /** Maximum number of characters accepted by the input element. */
  maxLength?: number;
  /** Input mode hint passed to the input element. */
  inputmode?: ComponentProps<"input">["inputmode"];
  /** Extra props for the input element. */
  inputProps?: Omit<
    ComponentProps<"input">,
    "id" | "onInput" | "aria-label" | "aria-labelledby" | "aria-describedby" | "ref"
  >;
  /** Extra props for the textarea element. */
  textareaProps?: Omit<
    ComponentProps<"textarea">,
    "id" | "onInput" | "aria-label" | "aria-labelledby" | "aria-describedby" | "ref"
  >;
};

const INPUT_PROPS = [
  "class",
  "label",
  "description",
  "errorMessage",
  "inputClass",
  "multiline",
  "rows",
  "cols",
  "type",
  "placeholder",
  "autocomplete",
  "maxLength",
  "inputmode",
  "inputProps",
  "textareaProps",
] as const;

/** A Kobalte text field (input or textarea) skinned with the XP form styles. */
export const TextField: Component<TextFieldProps> = (props) => {
  const others = omit(props, ...INPUT_PROPS);
  const validationState = () =>
    props.validationState ?? (props.errorMessage ? "invalid" : undefined);

  return (
    <TextFieldRoot {...others} validationState={validationState()} class={props.class}>
      <Show when={props.label}>
        <TextFieldLabel>{props.label}</TextFieldLabel>
      </Show>
      <Show
        when={props.multiline}
        fallback={
          <TextFieldInput
            {...(props.inputProps ?? {})}
            class={props.inputClass}
            type={props.type ?? "text"}
            placeholder={props.placeholder}
            autocomplete={props.autocomplete}
            maxlength={props.maxLength}
            inputmode={props.inputmode}
          />
        }
      >
        <TextFieldTextArea
          {...(props.textareaProps ?? {})}
          class={props.inputClass}
          rows={props.rows}
          cols={props.cols}
          placeholder={props.placeholder}
          autocomplete={props.autocomplete}
          maxlength={props.maxLength}
        />
      </Show>
      <Show when={props.description}>
        <TextFieldDescription>{props.description}</TextFieldDescription>
      </Show>
      <Show when={props.errorMessage}>
        <TextFieldErrorMessage>{props.errorMessage}</TextFieldErrorMessage>
      </Show>
    </TextFieldRoot>
  );
};
