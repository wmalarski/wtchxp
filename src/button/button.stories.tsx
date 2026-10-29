import { fn } from "storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Button } from "./button";

const meta = {
  title: "Buttons/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "OK",
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active: Story = {
  args: {
    active: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Block: Story = {
  args: {
    block: true,
    children: "Full width button",
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "6px" }}>
      <Button>OK</Button>
      <Button>Cancel</Button>
      <Button active>Active</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
};
