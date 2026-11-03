import { createSignal, type Component } from "solid-js";
import { render } from "@solidjs/web";
import {
  Button,
  Checkbox,
  CloseControl,
  FieldRow,
  FieldRowStacked,
  GroupBox,
  MaximizeControl,
  MinimizeControl,
  ProgressBar,
  Radio,
  RadioGroup,
  Range,
  Select,
  StatusBar,
  StatusBarField,
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
  type SelectOption,
} from "../../src";
import "../../src/styles.css";
import "../../src/scrollbar/scrollbar.css";
import "./demo.css";

const themeOptions: SelectOption[] = [
  { value: "xp", label: "Windows XP" },
  { value: "classic", label: "Windows Classic" },
  { value: "olive", label: "Olive Green" },
];

const Demo: Component = () => {
  const [checked, setChecked] = createSignal(true);
  const [radio, setRadio] = createSignal("work");
  const [text, setText] = createSignal("C:\\WINDOWS");
  const [progress, setProgress] = createSignal(35);
  const [theme, setTheme] = createSignal<SelectOption | null>(themeOptions[0]);
  const [selectedFile, setSelectedFile] = createSignal("readme.txt");

  return (
    <div class="desktop">
      <Window style={{ width: "660px" }}>
        <TitleBar>
          <TitleBarText>wtchxp — Component Gallery</TitleBarText>
          <TitleBarControls>
            <MinimizeControl />
            <MaximizeControl />
            <CloseControl />
          </TitleBarControls>
        </TitleBar>

        <WindowBody>
          <Tabs defaultValue="controls">
            <TabList>
              <Tab value="controls">Controls</Tab>
              <Tab value="data">Data</Tab>
              <Tab value="about">About</Tab>
            </TabList>

            <TabPanel value="controls">
              <div class="stack">
                <GroupBox legend="Buttons">
                  <FieldRow>
                    <Button>OK</Button>
                    <Button>Cancel</Button>
                    <Button active>Active</Button>
                    <Button disabled>Disabled</Button>
                  </FieldRow>
                  <FieldRow>
                    <Button block>Full width button</Button>
                  </FieldRow>
                </GroupBox>

                <GroupBox legend="Checkbox &amp; radios">
                  <Checkbox
                    checked={checked()}
                    onChange={setChecked}
                    label="Enable system sounds"
                    description="Plays a sound when an alert is shown."
                  />
                  <RadioGroup label="Assignment" value={radio()} onChange={setRadio}>
                    <Radio value="work" label="Work" />
                    <Radio value="home" label="Home" />
                    <Radio value="other" label="Other" description="Anything that is not work." />
                  </RadioGroup>
                </GroupBox>

                <GroupBox legend="Text">
                  <FieldRowStacked>
                    <TextField
                      label="Installation path"
                      value={text()}
                      onChange={setText}
                      description="The folder that contains the installed files."
                      inputProps={{ autocomplete: "off" }}
                    />
                    <TextField label="Notes" multiline rows={3} placeholder="Optional notes…" />
                  </FieldRowStacked>
                </GroupBox>

                <GroupBox legend="Select &amp; range">
                  <FieldRowStacked>
                    <Select
                      label="Theme"
                      options={themeOptions}
                      value={theme()}
                      onChange={setTheme}
                      description="Changes the look of the operating system."
                    />

                    <FieldRow>
                      <Range
                        min={0}
                        max={100}
                        value={progress()}
                        onInput={(event) => setProgress(Number(event.currentTarget.value))}
                      />
                      <ProgressBar
                        value={progress()}
                        label="Disk usage"
                        style={{ width: "140px" }}
                      />
                    </FieldRow>
                  </FieldRowStacked>
                </GroupBox>
              </div>
            </TabPanel>

            <TabPanel value="data">
              <TreeView label="Files">
                <TreeItem label="Desktop">
                  <TreeItem
                    label="readme.txt"
                    selected={selectedFile() === "readme.txt"}
                    onSelect={() => setSelectedFile("readme.txt")}
                  />
                  <TreeItem
                    label="budget.xls"
                    selected={selectedFile() === "budget.xls"}
                    onSelect={() => setSelectedFile("budget.xls")}
                  />
                </TreeItem>
                <TreeItem label="My Documents">
                  <TreeItem label="Projects">
                    <TreeItem label="wtchxp">
                      <TreeItem
                        label="notes.md"
                        selected={selectedFile() === "notes.md"}
                        onSelect={() => setSelectedFile("notes.md")}
                      />
                    </TreeItem>
                  </TreeItem>
                </TreeItem>
                <TreeItem label="My Computer" />
              </TreeView>
            </TabPanel>

            <TabPanel value="about">
              <p>
                A Windows XP themed component library for SolidJS, built on Kobalte and styled with
                the existing XP.css skin plus StyleX.
              </p>
            </TabPanel>
          </Tabs>
        </WindowBody>

        <StatusBar>
          <StatusBarField>Ready</StatusBarField>
          <StatusBarField>Selected: {selectedFile()}</StatusBarField>
          <StatusBarField>Solid 2 RC</StatusBarField>
        </StatusBar>
      </Window>
    </div>
  );
};

render(() => <Demo />, document.getElementById("root")!);
