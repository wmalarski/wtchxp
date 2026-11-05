import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { withLightSurface } from "../../.storybook/decorators";
import { Button } from "../button";
import { FieldRow, FieldRowStacked, GroupBox } from "./group-box";
import { TextField } from "../text-field";

const meta = {
  title: "Layout/GroupBox",
  component: GroupBox,
  decorators: [withLightSurface],
  tags: ["autodocs"],
  args: {
    legend: "Buttons",
  },
  render: (args) => (
    <GroupBox {...args}>
      <FieldRow>
        <Button>OK</Button>
        <Button>Cancel</Button>
      </FieldRow>
    </GroupBox>
  ),
} satisfies Meta<typeof GroupBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutLegend: Story = {
  args: {
    legend: undefined,
  },
};

export const StackedFields: Story = {
  args: {
    legend: "Text",
  },
  render: (args) => (
    <GroupBox {...args}>
      <FieldRowStacked>
        <TextField label="Installation path" placeholder="C:\\WINDOWS" />
        <TextField label="Notes" multiline rows={3} placeholder="Optional notes…" />
      </FieldRowStacked>
    </GroupBox>
  ),
};

export const MultipleRows: Story = {
  args: {
    legend: "Checkbox &amp; radios",
  },
  render: (args) => (
    <GroupBox {...args}>
      <FieldRow>
        <Button>OK</Button>
        <Button>Cancel</Button>
        <Button active>Active</Button>
        <Button disabled>Disabled</Button>
      </FieldRow>
      <FieldRow>
        <Button block>Full width button</Button>
      </FieldRow>
    </GroupBox>
  ),
};
