import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { Select as KobalteSelect } from "@kobalte/core/select";
import type {
  SelectArrowProps as KobalteSelectArrowProps,
  SelectContentProps as KobalteSelectContentProps,
  SelectDescriptionProps as KobalteSelectDescriptionProps,
  SelectErrorMessageProps as KobalteSelectErrorMessageProps,
  SelectHiddenSelectProps as KobalteSelectHiddenSelectProps,
  SelectIconProps as KobalteSelectIconProps,
  SelectItemDescriptionProps as KobalteSelectItemDescriptionProps,
  SelectItemIndicatorProps as KobalteSelectItemIndicatorProps,
  SelectItemLabelProps as KobalteSelectItemLabelProps,
  SelectItemProps as KobalteSelectItemProps,
  SelectLabelProps as KobalteSelectLabelProps,
  SelectListboxProps as KobalteSelectListboxProps,
  SelectPortalProps as KobalteSelectPortalProps,
  SelectRootItemComponentProps as KobalteSelectRootItemComponentProps,
  SelectRootProps as KobalteSelectRootProps,
  SelectSectionProps as KobalteSelectSectionProps,
  SelectTriggerProps as KobalteSelectTriggerProps,
  SelectValueProps as KobalteSelectValueProps,
} from "@kobalte/core/select";
import type { ComponentProps, JSX } from "@solidjs/web";
import { omit, Show, type Component } from "solid-js";
import { sx } from "../sx";
import { fieldStyles } from "../field/field.styles";
import { selectItemIndicatorRecipe, selectRecipe, selectStyles } from "./select.styles";

export type SelectRootProps<Option = any, OptGroup = never> = Omit<
  PolymorphicProps<"div", KobalteSelectRootProps<Option, OptGroup, "div">>,
  "as"
>;

/** The select root container. */
export const SelectRoot = <Option, OptGroup = never>(
  props: SelectRootProps<Option, OptGroup>,
): JSX.Element => {
  const others = omit(props, "class") as SelectRootProps<Option, OptGroup>;
  const Root = KobalteSelect as Component<SelectRootProps<Option, OptGroup>>;

  return <Root {...others} class={[sx(fieldStyles.root), props.class]} />;
};

export type SelectLabelProps = Omit<
  PolymorphicProps<"span", KobalteSelectLabelProps<"span">>,
  "as"
>;

/** The label rendered above a select. */
export const SelectLabel: Component<SelectLabelProps> = (props) => {
  const others = omit(props, "class");

  return <KobalteSelect.Label {...others} class={[sx(fieldStyles.label), props.class]} />;
};

export type SelectDescriptionProps = Omit<
  PolymorphicProps<"div", KobalteSelectDescriptionProps>,
  "as"
>;

/** Secondary text rendered below a select. */
export const SelectDescription: Component<SelectDescriptionProps> = (props) => {
  const others = omit(props, "class");

  return (
    <KobalteSelect.Description {...others} class={[sx(fieldStyles.description), props.class]} />
  );
};

export type SelectErrorMessageProps = Omit<
  PolymorphicProps<"div", KobalteSelectErrorMessageProps<"div">>,
  "as"
>;

/** Validation message rendered below a select. */
export const SelectErrorMessage: Component<SelectErrorMessageProps> = (props) => {
  const others = omit(props, "class");

  return <KobalteSelect.ErrorMessage {...others} class={[sx(fieldStyles.error), props.class]} />;
};

export type SelectTriggerProps = Omit<
  PolymorphicProps<"button", KobalteSelectTriggerProps<"button">>,
  "as"
>;

/** The button that opens the select. */
export const SelectTrigger: Component<SelectTriggerProps> = (props) => {
  const others = omit(props, "class");

  return <KobalteSelect.Trigger {...others} class={selectRecipe({ class: props.class })} />;
};

export type SelectValueProps<Option = any> = Omit<
  PolymorphicProps<"span", KobalteSelectValueProps<Option, "span">>,
  "as"
>;

/** The part that reflects the selected value. */
export const SelectValue: <Option>(props: SelectValueProps<Option>) => JSX.Element = (props) => {
  const others = omit(props, "class");

  return <KobalteSelect.Value {...others} class={[sx(selectStyles.value), props.class]} />;
};

export type SelectIconProps = Omit<PolymorphicProps<"span", KobalteSelectIconProps<"span">>, "as">;

/** The dropdown icon rendered next to the selected value. */
export const SelectIcon: Component<SelectIconProps> = (props) => {
  const others = omit(props, "class");

  return <KobalteSelect.Icon {...others} class={[sx(selectStyles.icon), props.class]} />;
};

export type SelectPortalProps = KobalteSelectPortalProps;

/** Portals the select content into the body when open. */
export const SelectPortal: Component<SelectPortalProps> = (props) => {
  return <KobalteSelect.Portal {...props} />;
};

export type SelectContentProps = Omit<
  PolymorphicProps<"div", KobalteSelectContentProps<"div">>,
  "as"
>;

/** The content that pops out when the select is open. */
export const SelectContent: Component<SelectContentProps> = (props) => {
  const others = omit(props, "class");

  return <KobalteSelect.Content {...others} class={[sx(selectStyles.content), props.class]} />;
};

export type SelectListboxProps<Option = any, OptGroup = never> = Omit<
  PolymorphicProps<"ul", KobalteSelectListboxProps<Option, OptGroup, "ul">>,
  "as"
>;

/** The listbox containing the select items. */
export const SelectListbox: <Option, OptGroup = never>(
  props: SelectListboxProps<Option, OptGroup>,
) => JSX.Element = (props) => {
  const others = omit(props, "class");

  return <KobalteSelect.Listbox {...others} class={[sx(selectStyles.listbox), props.class]} />;
};

export type SelectItemProps = Omit<PolymorphicProps<"li", KobalteSelectItemProps<"li">>, "as">;

/** A single item inside the select listbox. */
export const SelectItem: Component<SelectItemProps> = (props) => {
  const others = omit(props, "class");

  return <KobalteSelect.Item {...others} class={[sx(selectStyles.item), props.class]} />;
};

export type SelectItemLabelProps = Omit<
  PolymorphicProps<"div", KobalteSelectItemLabelProps<"div">>,
  "as"
>;

/** The accessible label of a select item. */
export const SelectItemLabel: Component<SelectItemLabelProps> = (props) => {
  const others = omit(props, "class");

  return <KobalteSelect.ItemLabel {...others} class={[sx(selectStyles.itemLabel), props.class]} />;
};

export type SelectItemDescriptionProps = Omit<
  PolymorphicProps<"div", KobalteSelectItemDescriptionProps<"div">>,
  "as"
>;

/** Secondary text rendered below a select item label. */
export const SelectItemDescription: Component<SelectItemDescriptionProps> = (props) => {
  const others = omit(props, "class");

  return (
    <KobalteSelect.ItemDescription
      {...others}
      class={[sx(selectStyles.itemDescription), props.class]}
    />
  );
};

export type SelectItemIndicatorProps = Omit<
  PolymorphicProps<"div", KobalteSelectItemIndicatorProps<"div">>,
  "as"
>;

/** The checkmark rendered next to the selected item. */
export const SelectItemIndicator: Component<SelectItemIndicatorProps> = (props) => {
  const others = omit(props, "class");

  return (
    <KobalteSelect.ItemIndicator
      {...others}
      class={selectItemIndicatorRecipe({ class: props.class })}
    />
  );
};

export type SelectSectionProps = Omit<
  PolymorphicProps<"li", KobalteSelectSectionProps<"li">>,
  "as"
>;

/** The label of a select option group. */
export const SelectSection: Component<SelectSectionProps> = (props) => {
  const others = omit(props, "class");

  return <KobalteSelect.Section {...others} class={[sx(selectStyles.section), props.class]} />;
};

export type SelectArrowProps = Omit<PolymorphicProps<"div", KobalteSelectArrowProps<"div">>, "as">;

/** An optional arrow rendered alongside the select content. */
export const SelectArrow: Component<SelectArrowProps> = (props) => {
  const others = omit(props, "class");

  return <KobalteSelect.Arrow {...others} class={props.class} />;
};

export type SelectHiddenSelectProps = KobalteSelectHiddenSelectProps;

/** The hidden native select used for form submission and autofill. */
export const SelectHiddenSelect: Component<SelectHiddenSelectProps> = (props) => {
  return <KobalteSelect.HiddenSelect {...props} />;
};

/**
 * An option accepted by the high-level `Select`.
 *
 * Strings are used as both the option value and its label. Objects can provide
 * separate values, labels and disabled state.
 */
export type SelectOption =
  | string
  | number
  | {
      /** Value submitted with the form and used to identify the option. */
      value: string | number;
      /** Content rendered in the trigger and listbox. */
      label?: JSX.Element;
      /** Plain text used for typeahead and the native hidden select. */
      textValue?: string;
      /** Whether the option can be selected. */
      disabled?: boolean;
    };

const isSelectOptionObject = (
  option: SelectOption,
): option is Exclude<SelectOption, string | number> => {
  return typeof option === "object" && option !== null;
};

const selectOptionValue = (option: SelectOption): string | number => {
  return isSelectOptionObject(option) ? option.value : option;
};

const selectOptionText = (option: SelectOption): string => {
  if (!isSelectOptionObject(option)) return String(option);
  if (option.textValue !== undefined) return option.textValue;
  if (typeof option.label === "string" || typeof option.label === "number") {
    return String(option.label);
  }
  return String(option.value);
};

const selectOptionLabel = (option: SelectOption): JSX.Element => {
  if (!isSelectOptionObject(option)) return String(option);
  return option.label ?? selectOptionText(option);
};

const selectOptionDisabled = (option: SelectOption): boolean => {
  return isSelectOptionObject(option) ? Boolean(option.disabled) : false;
};

type DefaultSelectItemProps = KobalteSelectRootItemComponentProps<SelectOption>;

const DefaultSelectItem: Component<DefaultSelectItemProps> = (itemProps) => {
  return (
    <SelectItem item={itemProps.item}>
      <SelectItemLabel>{selectOptionLabel(itemProps.item.rawValue)}</SelectItemLabel>
      <SelectItemIndicator />
    </SelectItem>
  );
};

export type SelectProps = Omit<ComponentProps<"div">, "children" | "onChange" | "defaultValue"> & {
  /** Options rendered by the select. Strings are used as both value and label. */
  options: readonly SelectOption[];
  /** The controlled value of the select. */
  value?: SelectOption | null;
  /** The value of the select when initially rendered. */
  defaultValue?: SelectOption;
  /** Event handler called when the value changes. */
  onChange?: (value: SelectOption | null) => void;
  /** The controlled open state of the select. */
  open?: boolean;
  /** The default open state when initially rendered. */
  defaultOpen?: boolean;
  /** Event handler called when the open state changes. */
  onOpenChange?: (isOpen: boolean) => void;
  /** Content rendered when no value is selected. */
  placeholder?: JSX.Element;
  /** Name submitted with the owning form. */
  name?: string;
  /** Whether the user must select an item before submitting the form. */
  required?: boolean;
  /** Whether the select is disabled. */
  disabled?: boolean;
  /** Whether the select is read only. */
  readOnly?: boolean;
  /** Whether the select should display its valid or invalid styling. */
  validationState?: "valid" | "invalid";
  /** Label rendered above the select. */
  label?: JSX.Element;
  /** Secondary text rendered below the select. */
  description?: JSX.Element;
  /** Validation message rendered below the select. */
  errorMessage?: JSX.Element;
  /** Class applied to the root element. */
  wrapperClass?: string;
  /** Custom renderer for each option in the listbox. */
  itemComponent?: Component<KobalteSelectRootItemComponentProps<SelectOption>>;
};

/** A Kobalte select skinned with the XP form styles. */
export const Select: Component<SelectProps> = (props) => {
  const others = omit(
    props,
    "class",
    "label",
    "description",
    "errorMessage",
    "wrapperClass",
    "options",
    "itemComponent",
    "value",
    "defaultValue",
    "onChange",
    "open",
    "defaultOpen",
    "onOpenChange",
    "placeholder",
    "name",
    "required",
    "disabled",
    "readOnly",
    "validationState",
  );

  const validationState = () =>
    props.validationState ?? (props.errorMessage ? "invalid" : undefined);

  return (
    <SelectRoot<SelectOption>
      {...(others as SelectRootProps<SelectOption>)}
      options={props.options as SelectOption[]}
      value={props.value}
      defaultValue={props.defaultValue}
      onChange={props.onChange}
      open={props.open}
      defaultOpen={props.defaultOpen}
      onOpenChange={props.onOpenChange}
      placeholder={props.placeholder}
      name={props.name}
      required={props.required}
      disabled={props.disabled}
      readOnly={props.readOnly}
      optionValue={selectOptionValue}
      optionTextValue={selectOptionText}
      optionDisabled={selectOptionDisabled}
      itemComponent={props.itemComponent ?? DefaultSelectItem}
      validationState={validationState()}
      class={[sx(fieldStyles.root), props.wrapperClass, props.class]}
    >
      <Show when={props.label}>
        <SelectLabel>{props.label}</SelectLabel>
      </Show>
      <SelectTrigger>
        <SelectValue<SelectOption>>
          {(state) => {
            const selected = state.selectedOption();
            return selected == null ? null : selectOptionLabel(selected);
          }}
        </SelectValue>
      </SelectTrigger>
      <SelectHiddenSelect />
      <Show when={props.description}>
        <SelectDescription>{props.description}</SelectDescription>
      </Show>
      <Show when={props.errorMessage}>
        <SelectErrorMessage forceMount>{props.errorMessage}</SelectErrorMessage>
      </Show>
      <SelectPortal>
        <SelectContent>
          <SelectListbox />
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  );
};

// Aliases for Kobalte-style and shorthand names.
export {
  SelectRoot as Root,
  SelectLabel as Label,
  SelectDescription as Description,
  SelectErrorMessage as ErrorMessage,
  SelectTrigger as Trigger,
  SelectValue as Value,
  SelectIcon as Icon,
  SelectPortal as Portal,
  SelectContent as Content,
  SelectListbox as Listbox,
  SelectItem as Item,
  SelectItemLabel as ItemLabel,
  SelectItemDescription as ItemDescription,
  SelectItemIndicator as ItemIndicator,
  SelectSection as Section,
  SelectArrow as Arrow,
  SelectHiddenSelect as HiddenSelect,
};
