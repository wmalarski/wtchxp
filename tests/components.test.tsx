import { fireEvent, render, screen } from "@solidjs/testing-library";
import { createSignal, flush } from "solid-js";
import { expect, test, vi } from "vite-plus/test";
import {
  Button,
  Checkbox,
  FieldRow,
  GroupBox,
  ProgressBar,
  Radio,
  RadioGroup,
  Range,
  Select,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TextField,
  TitleBar,
  TitleBarControls,
  TitleBarText,
  TreeItem,
  TreeView,
  Window,
  WindowBody,
  WindowControl,
} from "../src";

test("Button defaults to type=button and forwards clicks", () => {
  const onClick = vi.fn();
  render(() => (
    <Button active onClick={onClick}>
      Go
    </Button>
  ));

  const button = screen.getByRole("button", { name: "Go" });
  expect(button).toHaveAttribute("type", "button");
  expect(button).toHaveClass("button", "active");

  fireEvent.click(button);
  expect(onClick).toHaveBeenCalledTimes(1);
});

test("Checkbox toggles through its label association", () => {
  const [checked, setChecked] = createSignal(false);
  render(() => <Checkbox checked={checked()} onChange={setChecked} label="System sounds" />);

  const checkbox = screen.getByRole("checkbox", { name: "System sounds" });
  expect(checkbox).not.toBeChecked();

  fireEvent.click(checkbox);
  flush();

  expect(checked()).toBe(true);
  expect(checkbox).toBeChecked();
});

test("TextField is controlled by the field value", () => {
  const [value, setValue] = createSignal("C:\\WINDOWS");
  render(() => <TextField label="Path" value={value()} onChange={setValue} />);

  const input = screen.getByLabelText("Path");
  expect(input).toHaveValue("C:\\WINDOWS");

  fireEvent.input(input, { target: { value: "C:\\WINNT" } });
  flush();

  expect(value()).toBe("C:\\WINNT");
  expect(input).toHaveValue("C:\\WINNT");
});

test("Select keeps native option behaviour and labels", () => {
  const onChange = vi.fn();
  render(() => (
    <Select label="Theme" onChange={onChange}>
      <option value="xp">Windows XP</option>
      <option value="classic">Windows Classic</option>
    </Select>
  ));

  const select = screen.getByLabelText("Theme");
  fireEvent.change(select, { target: { value: "classic" } });
  flush();

  expect(select).toHaveValue("classic");
  expect(onChange).toHaveBeenCalledTimes(1);
});

test("RadioGroup selects a single value", () => {
  const [value, setValue] = createSignal("a");
  render(() => (
    <RadioGroup label="Pick one" value={value()} onChange={setValue}>
      <Radio value="a" label="Option A" />
      <Radio value="b" label="Option B" />
    </RadioGroup>
  ));

  const optionB = screen.getByRole("radio", { name: "Option B" });
  fireEvent.click(optionB);
  flush();

  expect(value()).toBe("b");
  expect(optionB).toBeChecked();
});

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

test("ProgressBar exposes the native progress value", () => {
  render(() => <ProgressBar value={25} label="Disk usage" />);

  const bar = screen.getByRole("progressbar", { name: "Disk usage" }) as HTMLProgressElement;
  expect(bar.value).toBe(25);
  expect(bar.max).toBe(100);
});

test("Range renders the vertical wrapper around a native input", () => {
  render(() => <Range vertical min={0} max={10} value={5} />);

  const input = screen.getByRole("slider");
  expect(input).toHaveAttribute("type", "range");
  expect(input).toHaveAttribute("min", "0");
  expect(input.parentElement).toHaveClass("is-vertical");
});

test("Window composition renders the title bar and XP classes", () => {
  render(() => (
    <Window>
      <TitleBar>
        <TitleBarText>My Computer</TitleBarText>
        <TitleBarControls>
          <WindowControl action="Close" />
        </TitleBarControls>
      </TitleBar>
      <WindowBody>Body</WindowBody>
    </Window>
  ));

  expect(screen.getByText("My Computer")).toHaveClass("title-bar-text");
  expect(screen.getByRole("button", { name: "Close" })).toHaveClass("button");
  expect(screen.getByText("Body")).toHaveClass("window-body");
});

test("GroupBox and FieldRow use the skin's class contract", () => {
  render(() => (
    <GroupBox legend="Buttons">
      <FieldRow>
        <Button>OK</Button>
        <Button>Cancel</Button>
      </FieldRow>
    </GroupBox>
  ));

  expect(screen.getByText("Buttons").tagName).toBe("LEGEND");
  expect(screen.getByRole("button", { name: "OK" }).parentElement).toHaveClass("field-row");
});
