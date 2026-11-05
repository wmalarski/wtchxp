import * as stylex from "@stylexjs/stylex";
import { fonts } from "../variables/variables.stylex";

export const dialogStyles = stylex.create({
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 1000,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },
  content: {
    position: "fixed",
    top: "50%",
    left: "50%",
    zIndex: 1001,
    transform: "translate(-50%, -50%)",
    outline: "none",
  },
  description: {
    fontFamily: fonts.sansSerif,
  },
});
