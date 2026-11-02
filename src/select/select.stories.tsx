import { createSignal } from "solid-js";
import { fn } from "storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Select, type SelectOption } from "./select";

const options: SelectOption[] = [
  { value: "xp", label: "Windows XP" },
  { value: "classic", label: "Windows Classic" },
  { value: "olive", label: "Olive Green" },
];

const meta = {
  title: "Forms/Select",
  component: Select,
  tags: ["autodocs"],
  args: {
    label: "Theme",
    options,
    onChange: fn(),
  },
  render: (args) => {
    const [value, setValue] = createSignal<SelectOption | null>(options[0]);
    const onChange = args.onChange as ((value: SelectOption | null) => void) | undefined;

    return (
      <Select
        {...args}
        options={options}
        value={value()}
        onChange={(option) => {
          setValue(option);
          onChange?.(option);
        }}
      />
    );
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    description: "Changes the look of the operating system.",
  },
};

export const WithError: Story = {
  args: {
    errorMessage: "Choose a supported theme.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
