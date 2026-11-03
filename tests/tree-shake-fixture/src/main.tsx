import { render } from "@solidjs/web";
import { createSignal, type Component } from "solid-js";
import {
  Button,
  Checkbox,
  CloseControl,
  FieldRow,
  GroupBox,
  TitleBar,
  TitleBarControls,
  TitleBarText,
  Window,
  WindowBody,
} from "wtchxp";

const App: Component = () => {
  const [checked, setChecked] = createSignal(true);

  return (
    <Window style={{ width: "420px" }}>
      <TitleBar>
        <TitleBarText>wtchxp bundle fixture</TitleBarText>
        <TitleBarControls>
          <CloseControl />
        </TitleBarControls>
      </TitleBar>
      <WindowBody>
        <GroupBox legend="Bundle check">
          <FieldRow>
            <Button>OK</Button>
          </FieldRow>
          <Checkbox checked={checked()} onChange={setChecked} label="Enable system sounds" />
        </GroupBox>
      </WindowBody>
    </Window>
  );
};

render(() => <App />, document.getElementById("root")!);
