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
  expect(screen.getByRole("tab", { name: "One" })).toHaveClass("button");
  expect(screen.getByText("First panel")).toBeInTheDocument();

  fireEvent.click(screen.getByRole("tab", { name: "Two" }));
  flush();

  expect(screen.getByText("Second panel")).toBeInTheDocument();
  expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute("aria-selected", "true");
});
