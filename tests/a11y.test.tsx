import { render } from "@solidjs/testing-library";
import { createSignal } from "solid-js";
import { test } from "vite-plus/test";
import {
  Button,
  Checkbox,
  CloseControl,
  GroupBox,
  ProgressBar,
  Radio,
  RadioGroup,
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
} from "../src";
import { expectNoA11yViolations } from "./axe";

test("a composed form has no accessibility violations", async () => {
  const [checked, setChecked] = createSignal(true);
  const [choice, setChoice] = createSignal("work");

  render(() => (
    <GroupBox legend="Preferences">
      <Checkbox checked={checked()} onChange={setChecked} label="Enable system sounds" />
      <RadioGroup label="Assignment" value={choice()} onChange={setChoice}>
        <Radio value="work" label="Work" />
        <Radio value="home" label="Home" />
      </RadioGroup>
      <TextField label="Installation path" value="C:\\WINDOWS" />
      <Select label="Theme" options={["Windows XP", "Windows Classic"]} />
      <ProgressBar value={50} label="Disk usage" />
      <Button>OK</Button>
    </GroupBox>
  ));

  await expectNoA11yViolations();
});

test("navigation and window chrome have no accessibility violations", async () => {
  render(() => (
    <Window>
      <TitleBar>
        <TitleBarText>Application</TitleBarText>
        <TitleBarControls>
          <CloseControl />
        </TitleBarControls>
      </TitleBar>
      <WindowBody>
        <Tabs defaultValue="one">
          <TabList>
            <Tab value="one">One</Tab>
            <Tab value="two">Two</Tab>
          </TabList>
          <TabPanel value="one">First panel</TabPanel>
          <TabPanel value="two">Second panel</TabPanel>
        </Tabs>
        <TreeView label="Files">
          <TreeItem label="readme.txt" selected />
        </TreeView>
      </WindowBody>
    </Window>
  ));

  await expectNoA11yViolations();
});
