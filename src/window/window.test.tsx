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

  expect(screen.getByText("My Computer")).toHaveClass("title-bar-text");
  expect(screen.getByRole("button", { name: "Close" })).toHaveClass("button");
  expect(screen.getByText("Body")).toHaveClass("window-body");
});
