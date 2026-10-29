import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { ProgressBar } from "./progress-bar";

const meta = {
  title: "Forms/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  args: {
    value: 35,
    max: 100,
    label: "Disk usage",
    style: { width: "240px" },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    value: 0,
  },
};

export const Full: Story = {
  args: {
    value: 100,
  },
};

export const Indeterminate: Story = {
  args: {
    value: undefined,
  },
};

export const CustomMax: Story = {
  args: {
    value: 7,
    max: 12,
    label: "Copied 7 of 12 files",
  },
};
