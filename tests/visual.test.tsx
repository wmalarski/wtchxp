import { render, screen } from "@solidjs/testing-library";
import { expect, test } from "vite-plus/test";
import { Checkbox, Radio, RadioGroup, Tab, TabList, TabPanel, Tabs, TextField } from "../src";

test("shared label styles do not override local checkbox and radio spacing", () => {
  render(() => (
    <>
      <Checkbox label="Enable" />
      <RadioGroup label="Pick one">
        <Radio value="a" label="Option A" />
      </RadioGroup>
    </>
  ));

  expect(getComputedStyle(screen.getByText("Enable")).marginBottom).toBe("0px");
  expect(getComputedStyle(screen.getByText("Option A")).marginBottom).toBe("0px");
});

test("field labels keep their shared spacing", () => {
  render(() => <TextField label="Name" />);

  expect(getComputedStyle(screen.getByText("Name")).marginBottom).toBe("2px");
});

test("selected tabs use the hover border token", () => {
  render(() => (
    <Tabs defaultValue="one">
      <TabList>
        <Tab value="one">One</Tab>
      </TabList>
      <TabPanel value="one">Content</TabPanel>
    </Tabs>
  ));

  expect(getComputedStyle(screen.getByRole("tab", { name: "One" })).borderTopColor).toBe(
    "rgb(230, 139, 44)",
  );
});
