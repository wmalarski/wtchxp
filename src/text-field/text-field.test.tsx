import { fireEvent, render, screen } from "@solidjs/testing-library";
import { createSignal, flush } from "solid-js";
import { expect, test } from "vite-plus/test";
import { TextField } from "./text-field";

test("TextField is controlled by the field value", () => {
  const [value, setValue] = createSignal("C:\\WINDOWS");
  render(() => <TextField label="Path" value={value()} onChange={setValue} />);

  const input = screen.getByLabelText("Path");
  expect(input).toHaveValue("C:\\WINDOWS");

  fireEvent.input(input, { target: { value: "C:\\WINNT" } });
  flush();

  expect(value()).toBe("C:\\WINNT");
  expect(input).toHaveValue("C:\\WINNT");
});

test("TextField renders an error message without an explicit validationState", () => {
  render(() => <TextField label="Path" errorMessage="The path does not exist." />);

  expect(screen.getByLabelText("Path")).toHaveAttribute("aria-invalid", "true");
  expect(screen.getByRole("alert")).toHaveTextContent("The path does not exist.");
});

test("TextField renders a textarea in multiline mode", () => {
  render(() => <TextField label="Notes" multiline rows={3} placeholder="Optional notes" />);

  const textarea = screen.getByLabelText("Notes");
  expect(textarea.tagName).toBe("TEXTAREA");
  expect(textarea).toHaveAttribute("rows", "3");
  expect(textarea).toHaveAttribute("placeholder", "Optional notes");
});
