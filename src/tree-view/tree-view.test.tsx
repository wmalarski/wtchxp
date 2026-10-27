import { fireEvent, render, screen } from "@solidjs/testing-library";
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
