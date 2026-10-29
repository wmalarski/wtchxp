import type { ComponentProps, JSX } from "@solidjs/web";
import * as stylex from "@stylexjs/stylex";
import {
  createContext,
  createSignal,
  omit,
  Show,
  useContext,
  type Component,
  type ParentProps,
} from "solid-js";
import { sx } from "../styles/sx";
import {
  backgroundColors,
  fontSizes,
  fonts,
  lineHeights,
  textColors,
} from "../variables/variables.stylex";

const TreeDepthContext = createContext(0);

const styles = stylex.create({
  tree: {
    display: "block",
    margin: 0,
    padding: "2px 5px",
    border: "1px solid #7f9db9",
    backgroundColor: backgroundColors.surface,
    fontFamily: fonts.sansSerif,
    fontSize: fontSizes.base,
    userSelect: "none",
  },
  item: {
    marginTop: 3,
    listStyleType: "none",
  },
  nestedItem: {
    position: "relative",
    "::before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 6,
      left: -16,
      width: 12,
      borderBottom: "1px dotted gray",
    },
    ":last-child::after": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 7,
      bottom: 0,
      left: -20,
      width: 8,
      backgroundColor: backgroundColors.surface,
    },
  },
  leaf: {
    color: textColors.primary,
    textDecoration: "none",
    ":focus": {
      backgroundColor: backgroundColors.selection,
      color: textColors.inverse,
    },
    ":is([aria-selected='true'])": {
      backgroundColor: backgroundColors.selection,
      color: textColors.inverse,
    },
  },
  group: {
    marginTop: 3,
    marginLeft: 16,
    paddingLeft: 16,
    borderLeft: "1px dotted gray",
  },
  details: {
    marginTop: 0,
  },
  summary: {
    listStyle: "none",
    "::-webkit-details-marker": {
      display: "none",
    },
    ":focus": {
      outline: `1px dotted ${textColors.primary}`,
      outlineOffset: -2,
    },
  },
  nestedMarker: {
    "::before": {
      position: "relative",
      zIndex: 1,
      marginLeft: -22,
    },
  },
  marker: {
    "::before": {
      content: '"+"',
      display: "block",
      float: "left",
      width: 8,
      height: 9,
      marginRight: 5,
      paddingLeft: 1,
      border: "1px solid gray",
      backgroundColor: backgroundColors.surface,
      textAlign: "center",
      lineHeight: lineHeights.marker,
    },
  },
  markerOpen: {
    "::before": {
      content: '"-"',
      display: "block",
      float: "left",
      width: 8,
      height: 9,
      marginRight: 5,
      paddingLeft: 1,
      border: "1px solid gray",
      backgroundColor: backgroundColors.surface,
      textAlign: "center",
      lineHeight: lineHeights.marker,
    },
  },
});

export type TreeViewProps = ComponentProps<"ul"> & {
  /** Accessible name for the tree. */
  label?: string;
};

/** A tree view built from `<ul class="tree-view">`, `<details>` and `<summary>`. */
export const TreeView: Component<TreeViewProps> = (props) => {
  const others = omit(props, "class", "label");

  return (
    <ul
      {...others}
      role="tree"
      aria-label={props.label}
      class={["tree-view", sx(styles.tree), props.class]}
    />
  );
};

export type TreeItemProps = ParentProps<
  Omit<ComponentProps<"li">, "title" | "children" | "onSelect"> & {
    /** Text (or markup) of the item. */
    label?: JSX.Element;
    /** Alias for `label`, matching the native `title` attribute. */
    title?: JSX.Element;
    /** Renders the item as selected. */
    selected?: boolean;
    /** Called when a leaf item is activated. */
    onSelect?: (event: MouseEvent) => void;
    /** Initial open state of a branch. Defaults to `true`. */
    defaultOpen?: boolean;
    /** Controlled open state of a branch. */
    open?: boolean;
    /** Called when a branch is expanded or collapsed. */
    onOpenChange?: (open: boolean) => void;
  }
>;

/**
 * A tree item. Items with children render an expandable branch, items without
 * children render a selectable leaf.
 */
export const TreeItem: Component<TreeItemProps> = (props) => {
  const [localOpen, setLocalOpen] = createSignal(props.defaultOpen ?? true);
  const depth = useContext(TreeDepthContext);
  const isOpen = () => props.open ?? localOpen();
  const others = omit(
    props,
    "class",
    "label",
    "title",
    "selected",
    "onSelect",
    "defaultOpen",
    "open",
    "onOpenChange",
    "children",
  );

  const content = () => props.label ?? props.title;

  return (
    <li
      {...others}
      role="none"
      class={[sx(styles.item), depth > 0 && sx(styles.nestedItem), props.class]}
    >
      <Show
        when={props.children}
        fallback={
          <a
            href="#"
            role="treeitem"
            aria-selected={props.selected ? "true" : undefined}
            class={["tree-item-label", sx(styles.leaf)]}
            onClick={(event) => {
              event.preventDefault();
              props.onSelect?.(event);
            }}
          >
            {content()}
          </a>
        }
      >
        <details
          open={isOpen()}
          class={sx(styles.details)}
          onToggle={(event) => {
            const open = event.currentTarget.open;
            if (props.open === undefined) setLocalOpen(open);
            props.onOpenChange?.(open);
          }}
        >
          <summary
            role="treeitem"
            aria-expanded={isOpen() ? "true" : "false"}
            class={[
              sx(styles.summary),
              depth > 0 && sx(styles.nestedMarker),
              isOpen() ? sx(styles.markerOpen) : sx(styles.marker),
            ]}
          >
            {content()}
          </summary>
          <ul role="group" class={sx(styles.group)}>
            <TreeDepthContext value={depth + 1}>{props.children}</TreeDepthContext>
          </ul>
        </details>
      </Show>
    </li>
  );
};
