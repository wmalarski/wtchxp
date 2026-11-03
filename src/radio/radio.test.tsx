import { fireEvent, render, screen } from "@solidjs/testing-library";
import { createSignal, flush } from "solid-js";
import { expect, test } from "vite-plus/test";
import { Radio, RadioGroup } from "./radio";

test("RadioGroup selects a single value", () => {
  const [value, setValue] = createSignal("a");
  render(() => (
    <RadioGroup label="Pick one" value={value()} onChange={setValue}>
      <Radio value="a" label="Option A" />
      <Radio value="b" label="Option B" />
    </RadioGroup>
  ));

  const optionB = screen.getByRole("radio", { name: "Option B" });
  fireEvent.click(optionB);
  flush();

  expect(value()).toBe("b");
  expect(optionB).toBeChecked();
});

test("RadioGroup renders an error message without an explicit validationState", () => {
  render(() => (
    <RadioGroup label="Pick one" errorMessage="Choose an option.">
      <Radio value="a" label="Option A" />
      <Radio value="b" label="Option B" />
    </RadioGroup>
  ));

  expect(screen.getByRole("radiogroup", { name: "Pick one" })).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  expect(screen.getByRole("alert")).toHaveTextContent("Choose an option.");
});

test("RadioGroup forwards the disabled state", () => {
  render(() => (
    <RadioGroup disabled label="Pick one">
      <Radio value="a" label="Option A" />
    </RadioGroup>
  ));

  expect(screen.getByRole("radio", { name: "Option A" })).toBeDisabled();
});
