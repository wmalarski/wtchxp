// @vitest-environment node
import { renderToString } from "@solidjs/web";
import { expect, test } from "vite-plus/test";
import {
  Button,
  Checkbox,
  CloseControl,
  GroupBox,
  StatusBar,
  StatusBarField,
  TitleBar,
  TitleBarControls,
  TitleBarText,
  Window,
  WindowBody,
} from "../src";

test("renders the window composition to HTML", () => {
  const html = renderToString(() => (
    <Window>
      <TitleBar>
        <TitleBarText>Server</TitleBarText>
        <TitleBarControls>
          <CloseControl />
        </TitleBarControls>
      </TitleBar>
      <WindowBody>
        <GroupBox legend="Form">
          <Button>OK</Button>
          <Checkbox checked label="Enabled" />
        </GroupBox>
      </WindowBody>
      <StatusBar>
        <StatusBarField>Ready</StatusBarField>
      </StatusBar>
    </Window>
  ));

  expect(html).toContain("Server");
  expect(html).toContain("Enabled");
  expect(html).toContain('type="button"');
});
