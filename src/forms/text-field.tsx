import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { TextField as KobalteTextField } from "@kobalte/core/text-field";
import type { TextFieldRootProps } from "@kobalte/core/text-field";
import type { JSX } from "@solidjs/web";
import * as stylex from "@stylexjs/stylex";
import { omit, Show } from "solid-js";
import { sx } from "../styles/sx";
import { formStyles } from "./form-styles";

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontFamily: "var(--sans-serif)",
    fontSize: 11,
  },
  label: {
    marginBottom: 2,
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
  },
  description: {
    marginTop: 2,
    color: "#4a4a4a",
  },
  error: {
    marginTop: 2,
    color: "#a80000",
  },
});

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
  type?: JSX.InputHTMLAttributes<HTMLInputElement>["type"];
  /** Placeholder passed to the input element. */
  placeholder?: string;
  /** Autocomplete hint passed to the input element. */
  autocomplete?: string;
  /** Maximum number of characters accepted by the input element. */
  maxLength?: number;
  /** Input mode hint passed to the input element. */
  inputmode?: JSX.InputHTMLAttributes<HTMLInputElement>["inputmode"];
  /** Extra props for the input element. */
  inputProps?: Omit<
    JSX.InputHTMLAttributes<HTMLInputElement>,
    "id" | "onInput" | "aria-label" | "aria-labelledby" | "aria-describedby" | "ref"
  >;
  /** Extra props for the textarea element. */
  textareaProps?: Omit<
    JSX.TextareaHTMLAttributes<HTMLTextAreaElement>,
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
export function TextField(props: TextFieldProps) {
  const others = omit(props, ...INPUT_PROPS);
  const isTallInput = () => {
    const type = props.type ?? "text";
    return type === "text" || type === "password" || type === "email";
  };
  const inputClass = () => [
    sx(isTallInput() ? formStyles.inputTall : formStyles.input),
    sx(styles.input),
    props.inputClass,
  ];
  const textareaClass = () => [sx(formStyles.textarea), sx(styles.input), props.inputClass];

  return (
    <KobalteTextField {...others} class={[sx(styles.root), props.class]}>
      <Show when={props.label}>
        <KobalteTextField.Label class={[sx(formStyles.label), sx(styles.label)]}>
          {props.label}
        </KobalteTextField.Label>
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
        <KobalteTextField.Description class={sx(styles.description)}>
          {props.description}
        </KobalteTextField.Description>
      </Show>
      <Show when={props.errorMessage}>
        <KobalteTextField.ErrorMessage class={sx(styles.error)}>
          {props.errorMessage}
        </KobalteTextField.ErrorMessage>
      </Show>
    </KobalteTextField>
  );
}
