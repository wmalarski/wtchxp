import { captureArtifact } from "@solidjs/diagnostics";
import { fireEvent, render, screen } from "@solidjs/testing-library";
import { createSignal, flush } from "solid-js";
import { expect, test } from "vite-plus/test";
import { Button } from "../src/button/button";
import { TreeItem, TreeView } from "../src/tree-view/tree-view";

test("toggling a prop-driven button runs without Solid diagnostics", async () => {
  const { artifact } = await captureArtifact(
    () => {
      const [active, setActive] = createSignal(false);
      render(() => <Button active={active()}>OK</Button>);

      setActive(true);
      flush();

      expect(screen.getByRole("button", { name: "OK" })).toHaveAttribute("data-active", "true");
    },
    { scenario: "button-active" },
  );

  expect(artifact).toHaveNoDiagnostics();
});

test("collapsing a tree branch runs without Solid diagnostics", async () => {
  const { artifact } = await captureArtifact(
    () => {
      render(() => (
        <TreeView label="Files">
          <TreeItem label="src" defaultOpen>
            <TreeItem label="index.ts" />
          </TreeItem>
        </TreeView>
      ));

      fireEvent.click(screen.getByText("src"));
      flush();
    },
    { scenario: "tree-view-collapse" },
  );

  expect(artifact).toHaveNoDiagnostics();
});
