import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { Dialog as KobalteDialog } from "@kobalte/core/dialog";
import type {
  DialogCloseButtonProps as KobalteDialogCloseButtonProps,
  DialogContentProps as KobalteDialogContentProps,
  DialogDescriptionProps as KobalteDialogDescriptionProps,
  DialogOverlayProps as KobalteDialogOverlayProps,
  DialogPortalProps as KobalteDialogPortalProps,
  DialogRootProps as KobalteDialogRootProps,
  DialogTitleProps as KobalteDialogTitleProps,
  DialogTriggerProps as KobalteDialogTriggerProps,
} from "@kobalte/core/dialog";
import type { ValidComponent } from "@solidjs/web";
import { omit, type Component } from "solid-js";
import { Button } from "../button";
import { sx } from "../sx";
import { CloseControl } from "../window";
import { dialogStyles } from "./dialog.styles";

export type DialogProps = KobalteDialogRootProps;

/** A modal dialog root. Compose it with a trigger, portal, and content. */
export const Dialog: Component<DialogProps> = (props) => <KobalteDialog {...props} />;

type PrimitiveDialogTriggerProps<T extends ValidComponent> = PolymorphicProps<
  T,
  KobalteDialogTriggerProps<T>
>;

export type DialogTriggerProps = Omit<PrimitiveDialogTriggerProps<typeof Button>, "as">;

/** An XP push button that opens the dialog. */
export const DialogTrigger: Component<DialogTriggerProps> = (props) => (
  <KobalteDialog.Trigger as={Button} {...props} />
);

export type DialogPortalProps = KobalteDialogPortalProps;

/** Portals the dialog into the document body. */
export const DialogPortal: Component<DialogPortalProps> = (props) => (
  <KobalteDialog.Portal {...props} />
);

export type DialogOverlayProps = Omit<
  PolymorphicProps<"div", KobalteDialogOverlayProps<"div">>,
  "as"
>;

/** The dimmed layer behind the dialog window. */
export const DialogOverlay: Component<DialogOverlayProps> = (props) => {
  const others = omit(props, "class");

  return <KobalteDialog.Overlay {...others} class={[sx(dialogStyles.overlay), props.class]} />;
};

export type DialogContentProps = Omit<
  PolymorphicProps<"div", KobalteDialogContentProps<"div">>,
  "as"
>;

/** The centered dialog surface. Place a `Window` component inside it. */
export const DialogContent: Component<DialogContentProps> = (props) => {
  const others = omit(props, "class");

  return <KobalteDialog.Content {...others} class={[sx(dialogStyles.content), props.class]} />;
};

export type DialogTitleProps = PolymorphicProps<"h2", KobalteDialogTitleProps<"h2">>;

/** The accessible title for the dialog. */
export const DialogTitle: Component<DialogTitleProps> = (props) => (
  <KobalteDialog.Title {...props} />
);

export type DialogDescriptionProps = Omit<
  PolymorphicProps<"p", KobalteDialogDescriptionProps<"p">>,
  "as"
>;

/** The accessible description for the dialog. */
export const DialogDescription: Component<DialogDescriptionProps> = (props) => {
  const others = omit(props, "class");

  return (
    <KobalteDialog.Description {...others} class={[sx(dialogStyles.description), props.class]} />
  );
};

type PrimitiveDialogCloseButtonProps<T extends ValidComponent> = PolymorphicProps<
  T,
  KobalteDialogCloseButtonProps<T>
>;

export type TitleBarCloseButtonProps = Omit<
  PrimitiveDialogCloseButtonProps<typeof CloseControl>,
  "as"
>;

/** The XP title-bar close control, wired to close the dialog. */
export const TitleBarCloseButton: Component<TitleBarCloseButtonProps> = (props) => (
  <KobalteDialog.CloseButton
    as={CloseControl}
    {...props}
    label={props.label ?? "Close"}
    aria-label={props["aria-label"] ?? props.label ?? "Close"}
  />
);

export type DialogCloseButtonProps = Omit<PrimitiveDialogCloseButtonProps<typeof Button>, "as">;

/** An XP push button that closes the dialog. */
export const DialogCloseButton: Component<DialogCloseButtonProps> = (props) => (
  <KobalteDialog.CloseButton as={Button} {...props} />
);
