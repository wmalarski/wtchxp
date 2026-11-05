import { fireEvent, render, screen } from "@solidjs/testing-library";
import { flush } from "solid-js";
import { expect, test } from "vite-plus/test";
import { Tab, TabList, TabPanel, Tabs } from "./tabs";

test("Tabs switch panels and use the menu tablist contract", () => {
  render(() => (
    <Tabs defaultValue="one">
      <TabList>
        <Tab value="one">One</Tab>
        <Tab value="two">Two</Tab>
      </TabList>
      <TabPanel value="one">First panel</TabPanel>
      <TabPanel value="two">Second panel</TabPanel>
    </Tabs>
  ));

  const tablist = screen.getByRole("tablist");
  expect(tablist.tagName).toBe("MENU");
  expect(screen.getByRole("tab", { name: "One" })).toBeInTheDocument();
  expect(screen.getByText("First panel")).toBeInTheDocument();
  expect(screen.getByText("Second panel")).toBeInTheDocument();
  expect(screen.getByText("Second panel").closest('[role="tabpanel"]')).not.toHaveAttribute(
    "data-selected",
  );

  fireEvent.click(screen.getByRole("tab", { name: "Two" }));
  flush();

  expect(screen.getByText("Second panel")).toBeInTheDocument();
  expect(screen.getByText("First panel").closest('[role="tabpanel"]')).not.toHaveAttribute(
    "data-selected",
  );
  expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute("aria-selected", "true");
});

test("Tab forwards the disabled state", () => {
  render(() => (
    <Tabs defaultValue="one">
      <TabList>
        <Tab value="one">One</Tab>
        <Tab value="two" disabled>
          Two
        </Tab>
      </TabList>
      <TabPanel value="one">First panel</TabPanel>
      <TabPanel value="two">Second panel</TabPanel>
    </Tabs>
  ));

  expect(screen.getByRole("tab", { name: "Two" })).toBeDisabled();
});
