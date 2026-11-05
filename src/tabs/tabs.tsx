import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import {
  Tabs as KobalteTabs,
  type TabsContentProps,
  type TabsListProps,
  type TabsRootProps,
  type TabsTriggerProps,
} from "@kobalte/core/tabs";
import {
  createContext,
  createMemo,
  omit,
  useContext,
  type Accessor,
  type Component,
} from "solid-js";
import { sx } from "../sx";
import { tabRecipe, tabsStyles } from "./tabs.styles";

const TabListContext = createContext<Accessor<boolean>>(() => false);

export type TabsProps = Omit<PolymorphicProps<"div", TabsRootProps<"div">>, "as">;

/** A tab set powered by Kobalte. */
export const Tabs: Component<TabsProps> = (props) => {
  const others = omit(props, "class");

  return <KobalteTabs {...others} class={[sx(tabsStyles.root), props.class]} />;
};

export type TabListProps = Omit<PolymorphicProps<"menu", TabsListProps<"menu">>, "as"> & {
  /** Makes every tab share the available width. */
  justified?: boolean;
};

/**
 * The tab strip. Rendered as `<menu role="tablist">`, which is the element the
 * XP tab styles are written for.
 */
export const TabList: Component<TabListProps> = (props) => {
  const others = omit(props, "class", "justified");
  const justified = createMemo(() => props.justified ?? false, {
    name: "TabList.justified",
  });

  return (
    <KobalteTabs.List as="menu" {...others} class={[sx(tabsStyles.list), props.class]}>
      <TabListContext value={justified}>{props.children}</TabListContext>
    </KobalteTabs.List>
  );
};

export type TabProps = Omit<PolymorphicProps<"button", TabsTriggerProps<"button">>, "as">;

/** A single tab button. */
export const Tab: Component<TabProps> = (props) => {
  const others = omit(props, "class");
  const justified = useContext(TabListContext);

  return (
    <KobalteTabs.Trigger
      {...others}
      class={tabRecipe({ justified: justified(), class: props.class })}
    />
  );
};

export type TabPanelProps = Omit<PolymorphicProps<"div", TabsContentProps<"div">>, "as">;

/** The content associated with a tab. */
export const TabPanel: Component<TabPanelProps> = (props) => {
  const others = omit(props, "class");

  return (
    <KobalteTabs.Content
      {...others}
      forceMount={props.forceMount ?? true}
      class={[sx(tabsStyles.panel), props.class]}
    />
  );
};
