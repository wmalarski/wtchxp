import { fireEvent, render, screen, waitFor } from "@solidjs/testing-library";
import { flush } from "solid-js";
import { expect, test } from "vite-plus/test";
import { Window, TitleBar, TitleBarText, WindowBody } from "../window";
import {
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  TitleBarCloseButton,
} from "./dialog";

test("Dialog opens a Window and closes with its close button", async () => {
  render(() => (
    <Dialog>
      <DialogTrigger>Open window</DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <Window>
            <TitleBar>
              <TitleBarText>Settings</TitleBarText>
              <TitleBarCloseButton />
            </TitleBar>
            <WindowBody>
              Dialog contents
              <DialogDescription>Dialog description</DialogDescription>
            </WindowBody>
            <DialogTitle>Settings</DialogTitle>
            <DialogCloseButton aria-label="Close dialog">Close</DialogCloseButton>
          </Window>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  ));

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Open window" }).className).not.toBe("");
  fireEvent.click(screen.getByRole("button", { name: "Open window" }));
  flush();

  expect(screen.getByRole("dialog", { name: "Settings" })).toBeInTheDocument();
  expect(screen.getByText("Dialog contents")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Close" }).querySelector("svg")).toBeInTheDocument();
  expect(getComputedStyle(screen.getByText("Dialog description")).fontFamily).toContain(
    "Pixelated MS Sans Serif",
  );

  fireEvent.click(screen.getByRole("button", { name: "Close" }));
  flush();

  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());

  fireEvent.click(screen.getByRole("button", { name: "Open window" }));
  flush();
  fireEvent.click(screen.getByRole("button", { name: "Close dialog" }));
  flush();

  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
});
