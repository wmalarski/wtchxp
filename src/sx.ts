import "./styles.css";
import * as stylex from "@stylexjs/stylex";

/**
 * Resolves StyleX styles to a `class` string.
 *
 * StyleX's `attrs` helper is used instead of `props` because Solid uses the
 * `class` attribute rather than React's `className`.
 */
export function sx(...styles: Array<stylex.StyleXStyles | true>): string {
  return stylex.attrs(...(styles.filter(Boolean) as stylex.StyleXStyles[])).class ?? "";
}
