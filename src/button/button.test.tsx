import { fireEvent, render, screen } from "@solidjs/testing-library";
import { expect, test, vi } from "vite-plus/test";
import { Button } from "./button";

test("Button defaults to type=button and forwards clicks", () => {
  const onClick = vi.fn();
  render(() => (
    <Button active onClick={onClick}>
      Go
    </Button>
  ));

  const button = screen.getByRole("button", { name: "Go" });
  expect(button).toHaveAttribute("type", "button");
  expect(button).toHaveAttribute("data-active", "true");

  fireEvent.click(button);
  expect(onClick).toHaveBeenCalledTimes(1);
});

test("Button forwards the disabled state", () => {
  render(() => <Button disabled>Go</Button>);

  expect(screen.getByRole("button", { name: "Go" })).toBeDisabled();
});
