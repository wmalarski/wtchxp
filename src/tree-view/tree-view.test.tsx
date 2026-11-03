import { fireEvent, render, screen } from "@solidjs/testing-library";
import { createSignal, flush } from "solid-js";
import { expect, test, vi } from "vite-plus/test";
import { TreeItem, TreeView } from "./tree-view";

test("TreeView renders branches and activates leaves", () => {
  const onSelect = vi.fn();
  render(() => (
    <TreeView label="Files">
      <TreeItem label="Desktop">
        <TreeItem label="readme.txt" onSelect={onSelect} />
      </TreeItem>
    </TreeView>
  ));

  const branch = screen.getByRole("treeitem", { name: "Desktop" });
  expect(branch).toHaveAttribute("aria-expanded", "true");

  const leaf = screen.getByRole("treeitem", { name: "readme.txt" });
  fireEvent.click(leaf);

  expect(onSelect).toHaveBeenCalledTimes(1);
  expect(screen.getByRole("tree")).toHaveAccessibleName("Files");
});

test("TreeItem marks only selected leaves", () => {
  render(() => (
    <TreeView>
      <TreeItem label="selected.txt" selected />
      <TreeItem label="other.txt" />
    </TreeView>
  ));

  expect(screen.getByRole("treeitem", { name: "selected.txt" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  expect(screen.getByRole("treeitem", { name: "other.txt" })).not.toHaveAttribute("aria-selected");
});

test("TreeView keeps a caller-provided aria-label", () => {
  render(() => (
    <TreeView aria-label="Files">
      <TreeItem label="readme.txt" />
    </TreeView>
  ));

  expect(screen.getByRole("tree", { name: "Files" })).toBeInTheDocument();
});

test("TreeItem applies its class to the item, not the leaf link", () => {
  render(() => (
    <TreeView>
      <TreeItem label="readme.txt" class="custom-item" />
    </TreeView>
  ));

  const leaf = screen.getByRole("treeitem", { name: "readme.txt" });
  expect(leaf).not.toHaveClass("custom-item");
  expect(leaf.parentElement).toHaveClass("custom-item");
});

test("TreeItem honours a controlled open state", () => {
  const [open, setOpen] = createSignal(false);
  render(() => (
    <TreeView>
      <TreeItem label="Branch" open={open()} onOpenChange={setOpen}>
        <TreeItem label="Child" />
      </TreeItem>
    </TreeView>
  ));

  const branch = screen.getByRole("treeitem", { name: "Branch" });
  expect(branch).toHaveAttribute("aria-expanded", "false");

  fireEvent.click(branch);
  flush();

  expect(branch).toHaveAttribute("aria-expanded", "true");
});

test("TreeItem stays closed when a controlled parent ignores the change", () => {
  const onOpenChange = vi.fn();
  render(() => (
    <TreeView>
      <TreeItem label="Branch" open={false} onOpenChange={onOpenChange}>
        <TreeItem label="Child" />
      </TreeItem>
    </TreeView>
  ));

  const branch = screen.getByRole("treeitem", { name: "Branch" });
  fireEvent.click(branch);

  expect(onOpenChange).toHaveBeenCalledWith(true);
  expect(branch).toHaveAttribute("aria-expanded", "false");
});
