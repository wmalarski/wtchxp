import { createSignal } from "solid-js";
import { fn } from "storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Range } from "./range";

const meta = {
  title: "Forms/Range",
  component: Range,
  tags: ["autodocs"],
  args: {
    min: 0,
    max: 100,
    onInput: fn(),
  },
  render: (args) => {
    const [value, setValue] = createSignal(35);
    const onInput = args.onInput as ((event: InputEvent) => void) | undefined;

    return (
      <Range
        {...args}
        value={value()}
        onInput={(event) => {
          setValue(Number(event.currentTarget.value));
          onInput?.(event);
        }}
      />
    );
  },
} satisfies Meta<typeof Range>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const BoxIndicator: Story = {
  args: {
    boxIndicator: true,
  },
};

export const Vertical: Story = {
  args: {
    vertical: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
