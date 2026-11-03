import type { ButtonProps } from "../button/button";

/** Props shared by the statically typed title bar controls. */
export type WindowControlButtonProps = Omit<
  ButtonProps,
  "aria-label" | "children" | "active" | "block"
> & {
  /** Accessible name. Defaults to the control action. */
  label?: string;
};
