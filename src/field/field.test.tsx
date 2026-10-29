import { render, screen } from "@solidjs/testing-library";
import { expect, test } from "vite-plus/test";
import { Field } from "./field";

test("Field renders the label, description and error message", () => {
  render(() => (
    <Field id="theme" label="Theme" description="Pick one." errorMessage="Required.">
      <input id="theme" type="text" />
    </Field>
  ));

  expect(screen.getByLabelText("Theme")).toHaveAttribute("id", "theme");
  expect(screen.getByText("Pick one.")).toHaveAttribute("id", "theme-description");
  expect(screen.getByText("Required.")).toHaveAttribute("id", "theme-error");
});

test("Field omits the label and the messages when none are provided", () => {
  render(() => (
    <Field>
      <input id="theme" type="text" />
    </Field>
  ));

  expect(screen.queryByLabelText("Theme")).toBeNull();
});
