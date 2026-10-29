import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Tab, TabList, TabPanel, Tabs } from "./tabs";

const meta = {
  title: "Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: {
    defaultValue: "controls",
  },
  render: (args) => (
    <Tabs {...args}>
      <TabList>
        <Tab value="controls">Controls</Tab>
        <Tab value="data">Data</Tab>
        <Tab value="about">About</Tab>
      </TabList>
      <TabPanel value="controls">
        <p>Buttons, checkboxes, radios and other form controls.</p>
      </TabPanel>
      <TabPanel value="data">
        <p>Tree views and other ways to browse structured data.</p>
      </TabPanel>
      <TabPanel value="about">
        <p>A Windows XP themed component library for SolidJS.</p>
      </TabPanel>
    </Tabs>
  ),
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Justified: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList justified>
        <Tab value="controls">Controls</Tab>
        <Tab value="data">Data</Tab>
        <Tab value="about">About</Tab>
      </TabList>
      <TabPanel value="controls">Controls content</TabPanel>
      <TabPanel value="data">Data content</TabPanel>
      <TabPanel value="about">About content</TabPanel>
    </Tabs>
  ),
};

export const DisabledTab: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList>
        <Tab value="controls">Controls</Tab>
        <Tab value="data" disabled>
          Data
        </Tab>
        <Tab value="about">About</Tab>
      </TabList>
      <TabPanel value="controls">Controls content</TabPanel>
      <TabPanel value="data">Data content</TabPanel>
      <TabPanel value="about">About content</TabPanel>
    </Tabs>
  ),
};
