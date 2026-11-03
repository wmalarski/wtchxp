import { fireEvent, render, screen } from "@solidjs/testing-library";
import { createSignal, flush } from "solid-js";
import { expect, test } from "vite-plus/test";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemLabel,
  SelectListbox,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  type SelectOption,
} from "./select";

const options: SelectOption[] = [
  { value: "xp", label: "Windows XP" },
  { value: "classic", label: "Windows Classic" },
];

test("Select selects an option through its trigger and listbox", () => {
  const [value, setValue] = createSignal<SelectOption | null>(options[0]);

  render(() => <Select label="Theme" options={options} value={value()} onChange={setValue} />);

  const trigger = screen.getByRole("button", { name: /Theme/ });
  expect(trigger).toHaveTextContent("Windows XP");

  fireEvent.pointerDown(trigger, { button: 0, pointerType: "mouse" });
  flush();

  const option = screen.getByRole("option", { name: "Windows Classic" });
  fireEvent.click(option);
  flush();

  expect(value()).toEqual(options[1]);
  expect(trigger).toHaveTextContent("Windows Classic");
});

test("Select exposes label, description and error message", () => {
  render(() => (
    <Select
      label="Theme"
      description="Changes the look of the operating system."
      errorMessage="Choose a supported theme."
      options={options}
    />
  ));

  expect(screen.getByText("Theme")).toBeInTheDocument();
  expect(screen.getByText("Changes the look of the operating system.")).toBeInTheDocument();
  expect(screen.getByText("Choose a supported theme.")).toBeInTheDocument();
});

test("Select forwards the disabled state to its trigger", () => {
  render(() => <Select label="Theme" options={options} disabled />);

  expect(screen.getByRole("button", { name: /Theme/ })).toBeDisabled();
});

test("Select primitives compose into a custom select", () => {
  const [value, setValue] = createSignal<string | null>("a");

  render(() => (
    <SelectRoot
      options={["a", "b"]}
      value={value()}
      onChange={setValue}
      itemComponent={(itemProps) => (
        <SelectItem item={itemProps.item}>
          <SelectItemLabel>{itemProps.item.rawValue}</SelectItemLabel>
        </SelectItem>
      )}
    >
      <SelectTrigger aria-label="Letter">
        <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
      </SelectTrigger>
      <SelectPortal>
        <SelectContent>
          <SelectListbox />
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  ));

  const trigger = screen.getByRole("button");
  fireEvent.pointerDown(trigger, { button: 0, pointerType: "mouse" });
  flush();

  fireEvent.click(screen.getByRole("option", { name: "b" }));
  flush();

  expect(value()).toBe("b");
});
