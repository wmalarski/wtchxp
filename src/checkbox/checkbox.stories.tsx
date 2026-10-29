import { createSignal } from "solid-js";
import { fn } from "storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Checkbox } from "./checkbox";

const meta = {
  title: "Forms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: {
    label: "Enable system sounds",
    description: "Plays a sound when an alert is shown.",
    onChange: fn(),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = createSignal(false);

    return (
      <Checkbox
        {...args}
        checked={checked()}
        onChange={(value) => {
          setChecked(value);
          args.onChange?.(value);
        }}
      />
    );
  },
};

export const Checked: Story = {
  render: (args) => {
    const [checked, setChecked] = createSignal(true);

    return (
      <Checkbox
        {...args}
        checked={checked()}
        onChange={(value) => {
          setChecked(value);
          args.onChange?.(value);
        }}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

export const WithError: Story = {
  args: {
    errorMessage: "This option is required.",
  },
};

export const WithoutDescription: Story = {
  args: {
    description: undefined,
  },
};
