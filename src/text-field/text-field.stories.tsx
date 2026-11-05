import { createSignal } from "solid-js";
import { fn } from "storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { withLightSurface } from "../../.storybook/decorators";
import { TextField } from "./text-field";

const meta = {
  title: "Forms/TextField",
  component: TextField,
  decorators: [withLightSurface],
  tags: ["autodocs"],
  args: {
    label: "Installation path",
    placeholder: "C:\\WINDOWS",
    onChange: fn(),
  },
  render: (args) => {
    const [value, setValue] = createSignal("C:\\WINDOWS");

    return (
      <TextField
        {...args}
        value={value()}
        onChange={(next) => {
          setValue(next);
          args.onChange?.(next);
        }}
      />
    );
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    description: "The folder that contains the installed files.",
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "••••••••",
  },
};

export const Multiline: Story = {
  args: {
    label: "Notes",
    multiline: true,
    rows: 4,
    placeholder: "Optional notes…",
  },
};

export const WithError: Story = {
  args: {
    errorMessage: "The path does not exist.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
