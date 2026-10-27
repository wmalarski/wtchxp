import { fireEvent, render, screen } from "@solidjs/testing-library";
import { createSignal, flush } from "solid-js";
import { expect, test } from "vite-plus/test";
import { Checkbox } from "./checkbox";

test("Checkbox toggles through its label association", () => {
  const [checked, setChecked] = createSignal(false);
  render(() => <Checkbox checked={checked()} onChange={setChecked} label="System sounds" />);

  const checkbox = screen.getByRole("checkbox", { name: "System sounds" });
  expect(checkbox).not.toBeChecked();

  fireEvent.click(checkbox);
  flush();

  expect(checked()).toBe(true);
  expect(checkbox).toBeChecked();
});
