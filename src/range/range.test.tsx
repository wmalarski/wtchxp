import { render, screen } from "@solidjs/testing-library";
import { expect, test } from "vite-plus/test";
import { Range } from "./range";

test("Range renders the vertical wrapper around a native input", () => {
  render(() => <Range vertical min={0} max={10} value={5} />);

  const input = screen.getByRole("slider");
  expect(input).toHaveAttribute("type", "range");
  expect(input).toHaveAttribute("min", "0");
  expect(input.parentElement).toBeInTheDocument();
});
