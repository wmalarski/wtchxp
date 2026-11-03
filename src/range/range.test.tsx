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

test("Range applies a vertical class to the wrapper only", () => {
  render(() => <Range vertical class="custom-range" min={0} max={10} value={5} />);

  const input = screen.getByRole("slider");
  expect(input).not.toHaveClass("custom-range");
  expect(input.parentElement).toHaveClass("custom-range");
});

test("Range applies a horizontal class to the input only", () => {
  render(() => <Range class="custom-range" min={0} max={10} value={5} />);

  const input = screen.getByRole("slider");
  expect(input).toHaveClass("custom-range");
  expect(input.parentElement).not.toHaveClass("custom-range");
});

test("Range forwards the disabled state", () => {
  render(() => <Range disabled min={0} max={10} value={5} />);

  expect(screen.getByRole("slider")).toBeDisabled();
});

test("Range associates its label with the native input", () => {
  render(() => <Range label="Volume" min={0} max={10} value={5} />);

  expect(screen.getByLabelText("Volume")).toHaveAttribute("type", "range");
});

test("Range links its description to the input", () => {
  render(() => (
    <Range label="Volume" description="Controls the output level." min={0} max={10} value={5} />
  ));

  const input = screen.getByRole("slider");
  const descriptionId = input.getAttribute("aria-describedby");

  expect(descriptionId).toBeTruthy();
  expect(document.getElementById(descriptionId!)).toHaveTextContent("Controls the output level.");
});

test("Range renders an error message without an explicit validationState", () => {
  render(() => <Range label="Volume" errorMessage="Volume is required." />);

  const input = screen.getByRole("slider");
  const error = screen.getByRole("alert");

  expect(input).toHaveAttribute("aria-invalid", "true");
  expect(error).toHaveTextContent("Volume is required.");
  expect(input.getAttribute("aria-describedby")).toContain(error.id);
});
