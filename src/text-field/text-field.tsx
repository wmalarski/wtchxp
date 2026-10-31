import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { TextField as KobalteTextField } from "@kobalte/core/text-field";
import type { TextFieldRootProps } from "@kobalte/core/text-field";
import type { ComponentProps, JSX } from "@solidjs/web";
import { omit, Show, type Component } from "solid-js";
import { sx } from "../sx";
import { fieldStyles } from "../field/field.styles";
import { textFieldStyles } from "./text-field.styles";

export type TextFieldProps = Omit<
  PolymorphicProps<"div", TextFieldRootProps<"div">>,
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
  const isTallInput = () => {
    const type = props.type ?? "text";
    return type === "text" || type === "password" || type === "email";
  };
  const inputClass = () => [
    sx(isTallInput() ? textFieldStyles.inputTall : textFieldStyles.input),
    props.inputClass,
  ];
  const textareaClass = () => [sx(textFieldStyles.textarea), props.inputClass];

  return (
    <KobalteTextField {...others} class={[sx(fieldStyles.root), props.class]}>
      <Show when={props.label}>
        <KobalteTextField.Label class={sx(fieldStyles.label)}>{props.label}</KobalteTextField.Label>
      </Show>
      <Show
        when={props.multiline}
        fallback={
          <KobalteTextField.Input
            {...(props.inputProps ?? {})}
            class={inputClass()}
            type={props.type ?? "text"}
            placeholder={props.placeholder}
            autocomplete={props.autocomplete}
            maxlength={props.maxLength}
            inputmode={props.inputmode}
          />
        }
      >
        <KobalteTextField.TextArea
          {...(props.textareaProps ?? {})}
          class={textareaClass()}
          rows={props.rows}
          cols={props.cols}
          placeholder={props.placeholder}
          autocomplete={props.autocomplete}
          maxlength={props.maxLength}
        />
      </Show>
      <Show when={props.description}>
        <KobalteTextField.Description class={sx(fieldStyles.description)}>
          {props.description}
        </KobalteTextField.Description>
      </Show>
      <Show when={props.errorMessage}>
        <KobalteTextField.ErrorMessage class={sx(fieldStyles.error)}>
          {props.errorMessage}
        </KobalteTextField.ErrorMessage>
      </Show>
    </KobalteTextField>
  );
};
