import { render, screen } from "@solidjs/testing-library";
import { expect, test } from "vite-plus/test";
import {
  TitleBar,
  TitleBarControls,
  TitleBarText,
  Window,
  WindowBody,
  WindowControl,
} from "./window";

test("Window composition renders the title bar and XP classes", () => {
  render(() => (
    <Window>
      <TitleBar>
        <TitleBarText>My Computer</TitleBarText>
        <TitleBarControls>
          <WindowControl action="Close" />
        </TitleBarControls>
      </TitleBar>
      <WindowBody>Body</WindowBody>
    </Window>
  ));

  expect(screen.getByText("My Computer")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  expect(screen.getByText("Body")).toBeInTheDocument();
});

test("WindowControl renders an inline icon with every interaction state", () => {
  render(() => <WindowControl action="Close" />);

  const button = screen.getByRole("button", { name: "Close" });
  const icon = button.querySelector("svg");

  expect(icon).toHaveAttribute("aria-hidden", "true");
  expect(icon?.querySelectorAll("[data-icon-state]")).toHaveLength(3);
});
