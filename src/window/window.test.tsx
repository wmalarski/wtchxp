import { render, screen } from "@solidjs/testing-library";
import { createSignal, flush } from "solid-js";
import { expect, test } from "vite-plus/test";
import {
  CloseControl,
  TitleBar,
  TitleBarControls,
  TitleBarText,
  Window,
  WindowBody,
  WindowControl,
  type WindowControlAction,
} from "./index";

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

test("CloseControl renders the same close affordance without the action lookup", () => {
  render(() => <CloseControl />);

  const button = screen.getByRole("button", { name: "Close" });

  expect(button.querySelectorAll("[data-icon-state]")).toHaveLength(3);
});

test("WindowControl follows action changes", () => {
  const [action, setAction] = createSignal<WindowControlAction>("Close");
  render(() => <WindowControl action={action()} />);

  const initialIcon = screen.getByRole("button", { name: "Close" }).querySelector("svg")?.innerHTML;

  setAction("Minimize");
  flush();

  const button = screen.getByRole("button", { name: "Minimize" });
  expect(button.querySelector("svg")?.innerHTML).not.toBe(initialIcon);
});
