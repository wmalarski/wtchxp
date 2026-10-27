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
