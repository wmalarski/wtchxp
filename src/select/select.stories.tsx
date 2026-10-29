import { createSignal } from "solid-js";
import { fn } from "storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Select } from "./select";

const options = (
  <>
    <option value="xp">Windows XP</option>
    <option value="classic">Windows Classic</option>
    <option value="olive">Olive Green</option>
  </>
);

const meta = {
  title: "Forms/Select",
  component: Select,
  tags: ["autodocs"],
  args: {
    label: "Theme",
    onChange: fn(),
  },
  render: (args) => {
    const [value, setValue] = createSignal("xp");
    const onChange = args.onChange as ((event: Event) => void) | undefined;

    return (
      <Select
        {...args}
        value={value()}
        onChange={(event) => {
          setValue(event.currentTarget.value);
          onChange?.(event);
        }}
      >
        {options}
      </Select>
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
