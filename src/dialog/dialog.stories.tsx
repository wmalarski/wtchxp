import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { FieldRow } from "../group-box";
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
import {
  StatusBar,
  StatusBarField,
  TitleBar,
  TitleBarControls,
  TitleBarText,
  Window,
  WindowBody,
} from "../window";

const meta = {
  title: "Windows/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  render: () => (
    <Dialog>
      <DialogTrigger>Open dialog</DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <Window style={{ width: "360px" }}>
            <TitleBar>
              <TitleBarText>
                <DialogTitle as="span">Confirm</DialogTitle>
              </TitleBarText>
              <TitleBarControls>
                <TitleBarCloseButton />
              </TitleBarControls>
            </TitleBar>
            <WindowBody>
              <DialogDescription>Are you sure you want to continue?</DialogDescription>
              <FieldRow style={{ "justify-content": "flex-end" }}>
                <DialogCloseButton>Yes</DialogCloseButton>
                <DialogCloseButton>No</DialogCloseButton>
              </FieldRow>
            </WindowBody>
            <StatusBar>
              <StatusBarField>Ready</StatusBarField>
            </StatusBar>
          </Window>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  ),
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
