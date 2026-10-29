import { createSignal } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { TreeItem, TreeView } from "./tree-view";

const meta = {
  title: "Navigation/TreeView",
  component: TreeView,
  tags: ["autodocs"],
  args: {
    label: "Files",
  },
  render: (args) => {
    const [selected, setSelected] = createSignal("readme.txt");

    return (
      <TreeView {...args}>
        <TreeItem label="Desktop">
          <TreeItem
            label="readme.txt"
            selected={selected() === "readme.txt"}
            onSelect={() => setSelected("readme.txt")}
          />
          <TreeItem
            label="budget.xls"
            selected={selected() === "budget.xls"}
            onSelect={() => setSelected("budget.xls")}
          />
        </TreeItem>
        <TreeItem label="My Documents">
          <TreeItem label="Projects">
            <TreeItem label="wtchxp">
              <TreeItem
                label="notes.md"
                selected={selected() === "notes.md"}
                onSelect={() => setSelected("notes.md")}
              />
            </TreeItem>
          </TreeItem>
        </TreeItem>
        <TreeItem label="My Computer" />
      </TreeView>
    );
  },
} satisfies Meta<typeof TreeView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CollapsedBranches: Story = {
  render: (args) => (
    <TreeView {...args}>
      <TreeItem label="Desktop" defaultOpen={false}>
        <TreeItem label="readme.txt" />
        <TreeItem label="budget.xls" />
      </TreeItem>
      <TreeItem label="My Documents" defaultOpen={false}>
        <TreeItem label="Projects" defaultOpen={false}>
          <TreeItem label="notes.md" />
        </TreeItem>
      </TreeItem>
    </TreeView>
  ),
};

export const SelectedItem: Story = {
  render: (args) => (
    <TreeView {...args}>
      <TreeItem label="Desktop">
        <TreeItem label="readme.txt" selected />
        <TreeItem label="budget.xls" />
      </TreeItem>
      <TreeItem label="My Computer" />
    </TreeView>
  ),
};
