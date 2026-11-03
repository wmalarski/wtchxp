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

test("Checkbox renders an error message without an explicit validationState", () => {
  render(() => <Checkbox label="System sounds" errorMessage="This option is required." />);

  expect(screen.getByRole("checkbox", { name: "System sounds" })).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  expect(screen.getByRole("alert")).toHaveTextContent("This option is required.");
});
