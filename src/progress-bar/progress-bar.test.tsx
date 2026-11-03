import { render, screen } from "@solidjs/testing-library";
import { expect, test } from "vite-plus/test";
import { ProgressBar } from "./progress-bar";

test("ProgressBar exposes the native progress value", () => {
  render(() => <ProgressBar value={25} label="Disk usage" />);

  const bar = screen.getByRole("progressbar", { name: "Disk usage" }) as HTMLProgressElement;
  expect(bar.value).toBe(25);
  expect(bar.max).toBe(100);
});

test("ProgressBar keeps a caller-provided aria-label", () => {
  render(() => <ProgressBar value={25} aria-label="Disk usage" />);

  expect(screen.getByRole("progressbar", { name: "Disk usage" })).toBeInTheDocument();
});
