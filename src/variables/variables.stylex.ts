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
  titleBar: '"Trebuchet MS"',
});

export const fontSizes = stylex.defineVars({
  base: "11px",
  large: "13px",
});

export const fontWeights = stylex.defineVars({
  normal: "normal",
  bold: "bold",
});

export const lineHeights = stylex.defineVars({
  base: "16px",
  tight: "13px",
  marker: "9px",
});

/** Text colors only. Palette values live in `colors`; background colors live in `backgroundColors`. */
export const textColors = stylex.defineVars({
  primary: "#000000",
  secondary: "#4a4a4a",
  strong: "#222222",
  accent: "#0046d5",
  error: "#a80000",
  disabled: () => colors.buttonShadow,
  inverse: () => colors.buttonHighlight,
});

export const textShadows = stylex.defineVars({
  titleBar: "1px 1px #0f1089",
});

/** Background shorthands: gradients and solid fills used with `background`. */
export const backgrounds = stylex.defineVars({
  none: "none",
  button: "linear-gradient(180deg, #ffffff 0%, #ecebe5 86%, #d8d0c4 100%)",
  buttonActive: "linear-gradient(180deg, #cdcac3 0%, #e3e3db 8%, #e5e5de 94%, #f2f2f1 100%)",
  tab: "linear-gradient(180deg, #ffffff 0%, #fafaf9 26%, #f0f0ea 95%, #ecebe5 100%)",
  tabPanel: "linear-gradient(180deg, rgba(252, 252, 254, 1) 0%, rgba(244, 243, 238, 1) 100%)",
  tabSelected: "#fcfcfe",
  titleBar:
    "linear-gradient(180deg, #0997ff 0%, #0053ee 8%, #0050ee 40%, #0066ff 88% 93%, #005bff 95%, #003dd7 96% 100%)",
  control: "linear-gradient(135deg, rgba(220, 220, 215, 1) 0%, rgba(255, 255, 255, 1) 100%)",
  controlActive: "linear-gradient(135deg, rgba(176, 176, 167, 1) 0%, rgba(227, 225, 210, 1) 100%)",
  progress:
    "repeating-linear-gradient(to right, #fff 0px, #fff 2px, transparent 2px, transparent 10px), linear-gradient(to bottom, #acedad 0%, #7be47d 14%, #4cda50 28%, #2ed330 42%, #42d845 57%, #76e275 71%, #8fe791 85%, #ffffff 100%)",
  progressIndeterminate:
    "repeating-linear-gradient(to right, transparent 0px, transparent 8px, #fff 8px, #fff 10px, transparent 10px, transparent 18px, #fff 18px, #fff 20px, transparent 20px, transparent 28px, #fff 28px, #fff 100%), linear-gradient(to bottom, #acedad 0%, #7be47d 14%, #4cda50 28%, #2ed330 42%, #42d845 57%, #76e275 71%, #8fe791 85%, #ffffff 100%)",
});

/** Background colors only. Palette values live in `colors`. */
export const backgroundColors = stylex.defineVars({
  surface: () => colors.buttonHighlight,
  window: () => colors.surface,
  selection: () => colors.dialogBlue,
  rangeTrack: "#ecebe4",
  windowControl: "#0050ee",
  transparent: "transparent",
});

/** Box shadows only. Inset border shadows live in `borders`. */
export const shadows = stylex.defineVars({
  none: "none",
  buttonHover:
    "inset -1px 1px #fff0cf, inset 1px 2px #fdd889, inset -2px 2px #fbc761, inset 2px -2px #e5a01a",
  buttonFocus:
    "inset -1px 1px #cee7ff, inset 1px 2px #98b8ea, inset -2px 2px #bcd4f6, inset 1px -1px #89ade4, inset 2px -2px #89ade4",
  tabHover: "inset 0 2px #ffc73c",
  tabPanel:
    "inset 1px 1px #fcfcfe, inset -1px -1px #fcfcfe, 1px 2px 2px 0 rgba(208, 206, 191, 0.75)",
  window:
    "inset -1px -1px #00138c, inset 1px 1px #0831d9, inset -2px -2px #001ea0, inset 2px 2px #166aee, inset -3px -3px #003bda, inset 3px 3px #0855dd",
  statusBar: () => `inset 0 1px 2px ${colors.buttonShadow}`,
  selectFocus: "inset 2px 2px white, inset -2px -2px white",
  progressBar: "inset 0 0 1px 0 #686868",
  controlHover: "inset -2px -2px #f8b636, inset 2px 2px #fedf9c",
  rangeTrackHorizontal:
    "1px 0 0 white, 1px 1px 0 white, 0 1px 0 white, -1px 0 0 #9d9c99, -1px -1px 0 #9d9c99, 0 -1px 0 #9d9c99, -1px 1px 0 white, 1px -1px #9d9c99",
  rangeTrackVertical:
    "-1px 0 0 white, -1px 1px 0 white, 0 1px 0 white, 1px 0 0 #9d9c99, 1px -1px 0 #9d9c99, 0 -1px 0 #9d9c99, 1px 1px 0 white, -1px -1px #9d9c99",
});

export const radii = stylex.defineVars({
  none: "0",
  small: "2px",
  medium: "3px",
  large: "4px",
  window: "8px",
  windowTitleBar: "7px",
  round: "50%",
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
  radioWidth: "13px",
  radioLabelSpacing: "6px",
  radioDotWidth: "5px",
  radioDotTop: "5px",
  radioBorder: "1px solid #1d5281",
  radioBorderDisabled: "1px solid #cac8bb",
});

export const tabs = stylex.defineVars({
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
