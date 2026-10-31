import { render, screen } from "@solidjs/testing-library";
import { expect, test } from "vite-plus/test";
import { Button } from "../button";
import { FieldRow, GroupBox } from "./group-box";

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
  expect(screen.getByRole("button", { name: "OK" }).parentElement?.className).toMatch(/field-row/);
});
