import { createSignal } from "solid-js";
import { fn } from "storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { withLightSurface } from "../../.storybook/decorators";
import { Radio, RadioGroup } from "./radio";

const meta = {
  title: "Forms/Radio",
  component: RadioGroup,
  decorators: [withLightSurface],
  tags: ["autodocs"],
  args: {
    label: "Assignment",
    onChange: fn(),
  },
  render: (args) => {
    const [value, setValue] = createSignal("work");

    return (
      <RadioGroup
        {...args}
        value={value()}
        onChange={(next) => {
          setValue(next);
          args.onChange?.(next);
        }}
      >
        <Radio value="work" label="Work" />
        <Radio value="home" label="Home" />
        <Radio value="other" label="Other" description="Anything that is not work." />
      </RadioGroup>
    );
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Preselected: Story = {
  render: (args) => {
    const [value, setValue] = createSignal("home");

    return (
      <RadioGroup
        {...args}
        value={value()}
        onChange={(next) => {
          setValue(next);
          args.onChange?.(next);
        }}
      >
        <Radio value="work" label="Work" />
        <Radio value="home" label="Home" />
        <Radio value="other" label="Other" description="Anything that is not work." />
      </RadioGroup>
    );
  },
};

export const Disabled: Story = {
  render: (args) => (
    <RadioGroup {...args} disabled value="work">
      <Radio value="work" label="Work" />
      <Radio value="home" label="Home" />
    </RadioGroup>
  ),
};

export const DisabledItem: Story = {
  render: (args) => (
    <RadioGroup {...args} value="work">
      <Radio value="work" label="Work" />
      <Radio value="home" label="Home" disabled />
    </RadioGroup>
  ),
};
