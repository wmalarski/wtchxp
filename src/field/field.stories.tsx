import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Field } from "./field";

const meta = {
  title: "Forms/Field",
  component: Field,
  tags: ["autodocs"],
  args: {
    label: "Theme",
    description: "Changes the look of the operating system.",
    errorMessage: "Choose a supported theme.",
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    description: "Changes the look of the operating system.",
    errorMessage: undefined,
  },
};

export const WithError: Story = {
  args: {
    errorMessage: "Choose a supported theme.",
  },
};

export const WithoutMessages: Story = {
  args: {
    label: undefined,
    description: undefined,
    errorMessage: undefined,
  },
};
