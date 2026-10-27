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
