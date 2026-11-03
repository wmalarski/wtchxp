import type { ComponentProps, JSX } from "@solidjs/web";
import {
  createContext,
  createSignal,
  omit,
  Show,
  useContext,
  type Component,
  type ParentProps,
} from "solid-js";
import { sx } from "../sx";
import { treeItemRecipe, treeSummaryRecipe, treeViewStyles } from "./tree-view.styles";

const TreeDepthContext = createContext(0);

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
      aria-label={props.label ?? props["aria-label"]}
      class={[sx(treeViewStyles.tree), props.class]}
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
    <li {...others} role="none" class={treeItemRecipe({ nested: depth > 0, class: props.class })}>
      <Show
        when={props.children}
        fallback={
          <a
            href="#"
            role="treeitem"
            aria-selected={props.selected ? "true" : undefined}
            class={sx(treeViewStyles.leaf)}
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
          class={sx(treeViewStyles.details)}
          onToggle={(event) => {
            // Controlled branches never toggle natively; the parent owns the
            // state, so only the uncontrolled path updates the local signal.
            if (props.open !== undefined) return;
            const open = event.currentTarget.open;
            setLocalOpen(open);
            props.onOpenChange?.(open);
          }}
        >
          <summary
            role="treeitem"
            aria-expanded={isOpen() ? "true" : "false"}
            class={treeSummaryRecipe({ nested: depth > 0, open: isOpen() })}
            onClick={(event) => {
              if (props.open === undefined) return;
              event.preventDefault();
              props.onOpenChange?.(!props.open);
            }}
          >
            {content()}
          </summary>
          <ul role="group" class={sx(treeViewStyles.group)}>
            <TreeDepthContext value={depth + 1}>{props.children}</TreeDepthContext>
          </ul>
        </details>
      </Show>
    </li>
  );
};
