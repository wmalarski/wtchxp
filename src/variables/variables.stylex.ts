import * as stylex from "@stylexjs/stylex";

/**
 * Design tokens for the Windows XP skin.
 *
 * StyleX compiles each group to uniquely named CSS custom properties which are
 * emitted once, globally. Consume the tokens from `stylex.create` calls instead
 * of writing `var(--…)` strings by hand, and override them per subtree with
 * `stylex.createTheme` when a different skin is needed.
 */

export const colors = stylex.defineVars({
  surface: "#ece9d8",
  buttonHighlight: "#ffffff",
  buttonFace: "#dfdfdf",
  buttonShadow: "#808080",
  windowFrame: "#0a0a0a",
  dialogBlue: "#2267cb",
  inputBorder: "#789dbc",
});

export const fonts = stylex.defineVars({
  sansSerif: '"Pixelated MS Sans Serif", Arial',
});

export const spacing = stylex.defineVars({
  element: "8px",
  groupedButton: "4px",
  groupedElement: "6px",
  range: "10px",
  rangeTrackHeight: "4px",
});

export const forms = stylex.defineVars({
  checkboxWidth: "13px",
  checkmarkWidth: "11px",
  checkmarkTop: "1px",
  checkmarkLeft: "3px",
  radioWidth: "13px",
  radioLabelSpacing: "6px",
  radioDotWidth: "5px",
  radioDotTop: "5px",
  radioInnerShadowHover: "inset -2px -2px #f8b636, inset 2px 2px #fedf9c",
  radioBgActive: "linear-gradient(135deg, rgba(176, 176, 167, 1) 0%, rgba(227, 225, 210, 1) 100%)",
  radioBg: "linear-gradient(135deg, rgba(220, 220, 215, 1) 0%, rgba(255, 255, 255, 1) 100%)",
  radioBorder: "1px solid #1d5281",
  radioBorderDisabled: "1px solid #cac8bb",
});

export const tabs = stylex.defineVars({
  background: "linear-gradient(180deg, rgba(252, 252, 254, 1) 0%, rgba(244, 243, 238, 1) 100%)",
  border: "1px solid #919b9c",
});

export const scrollbar = stylex.defineVars({
  background:
    "linear-gradient(90deg, rgba(197, 213, 255, 1) 0%, rgba(181, 211, 255, 1) 86%, rgba(182, 202, 247, 1) 100%)",
  shadow:
    "inset 1px 1px white, inset -1px -1px white, inset 2px 2px #b9cdfa, inset -2px -2px #b6c9f7",
});

export const borders = stylex.defineVars({
  width: "1px",
  raisedOuter: () =>
    `inset -1px -1px ${colors.windowFrame}, inset 1px 1px ${colors.buttonHighlight}`,
  raisedInner: () => `inset -2px -2px ${colors.buttonShadow}, inset 2px 2px ${colors.buttonFace}`,
  sunkenOuter: () =>
    `inset -1px -1px ${colors.buttonHighlight}, inset 1px 1px ${colors.windowFrame}`,
  sunkenInner: () => `inset -2px -2px ${colors.buttonFace}, inset 2px 2px ${colors.buttonShadow}`,
  windowOuter: () => `inset -1px -1px ${colors.windowFrame}, inset 1px 1px ${colors.buttonFace}`,
  windowInner: () =>
    `inset -2px -2px ${colors.buttonShadow}, inset 2px 2px ${colors.buttonHighlight}`,
  field: () =>
    `inset -1px -1px ${colors.buttonHighlight}, inset 1px 1px ${colors.buttonShadow}, inset -2px -2px ${colors.buttonFace}, inset 2px 2px ${colors.windowFrame}`,
  statusBarField: () =>
    `inset -1px -1px ${colors.buttonFace}, inset 1px 1px ${colors.buttonShadow}`,
});
