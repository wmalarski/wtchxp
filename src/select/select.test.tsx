import { fireEvent, render, screen } from "@solidjs/testing-library";
import { flush } from "solid-js";
import { expect, test, vi } from "vite-plus/test";
import { Select } from "./select";

test("Select keeps native option behaviour and labels", () => {
  const onChange = vi.fn();
  render(() => (
    <Select label="Theme" onChange={onChange}>
      <option value="xp">Windows XP</option>
      <option value="classic">Windows Classic</option>
    </Select>
  ));

  const select = screen.getByLabelText("Theme");
  fireEvent.change(select, { target: { value: "classic" } });
  flush();

  expect(select).toHaveValue("classic");
  expect(onChange).toHaveBeenCalledTimes(1);
});
