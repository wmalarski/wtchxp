import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Button } from "../button";
import { FieldRow, GroupBox } from "../group-box";
import {
  StatusBar,
  StatusBarField,
  TitleBar,
  TitleBarControls,
  TitleBarText,
  Window,
  WindowBody,
  WindowControl,
} from "./window";

const meta = {
  title: "Windows/Window",
  component: Window,
  tags: ["autodocs"],
  args: {
    style: { width: "520px" },
  },
  render: (args) => (
    <Window {...args}>
      <TitleBar>
        <TitleBarText>wtchxp</TitleBarText>
        <TitleBarControls>
          <WindowControl action="Minimize" />
          <WindowControl action="Maximize" />
          <WindowControl action="Close" />
        </TitleBarControls>
      </TitleBar>
      <WindowBody>
        <GroupBox legend="Welcome">
          <p>A Windows XP themed component library for SolidJS.</p>
          <FieldRow>
            <Button>OK</Button>
            <Button>Cancel</Button>
          </FieldRow>
        </GroupBox>
      </WindowBody>
      <StatusBar>
        <StatusBarField>Ready</StatusBarField>
        <StatusBarField>Solid 2 RC</StatusBarField>
      </StatusBar>
    </Window>
  ),
} satisfies Meta<typeof Window>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutStatusBar: Story = {
  render: (args) => (
    <Window {...args}>
      <TitleBar>
        <TitleBarText>Untitled</TitleBarText>
        <TitleBarControls>
          <WindowControl action="Minimize" />
          <WindowControl action="Close" />
        </TitleBarControls>
      </TitleBar>
      <WindowBody>
        <p>This window has no status bar.</p>
      </WindowBody>
    </Window>
  ),
};

export const Dialog: Story = {
  args: {
    style: { width: "360px" },
  },
  render: (args) => (
    <Window {...args}>
      <TitleBar>
        <TitleBarText>Confirm</TitleBarText>
        <TitleBarControls>
          <WindowControl action="Close" />
        </TitleBarControls>
      </TitleBar>
      <WindowBody>
        <p>Are you sure you want to continue?</p>
        <FieldRow style={{ "justify-content": "flex-end" }}>
          <Button>Yes</Button>
          <Button>No</Button>
        </FieldRow>
      </WindowBody>
    </Window>
  ),
};

export const HelpAndRestoreControls: Story = {
  render: (args) => (
    <Window {...args}>
      <TitleBar>
        <TitleBarText>Controls</TitleBarText>
        <TitleBarControls>
          <WindowControl action="Help" />
          <WindowControl action="Minimize" />
          <WindowControl action="Restore" />
          <WindowControl action="Close" />
        </TitleBarControls>
      </TitleBar>
      <WindowBody>
        <p>Every title bar control action is available.</p>
      </WindowBody>
    </Window>
  ),
};
