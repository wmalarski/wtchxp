import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import {
  Tabs as KobalteTabs,
  type TabsContentProps,
  type TabsListProps,
  type TabsRootProps,
  type TabsTriggerProps,
} from "@kobalte/core/tabs";
import * as stylex from "@stylexjs/stylex";
import { createContext, omit, useContext } from "solid-js";
import { sx } from "../styles/sx";

const tabBackground = "linear-gradient(180deg, #ffffff 0%, #fafaf9 26%, #f0f0ea 95%, #ecebe5 100%)";

const TabListContext = createContext(false);

const styles = stylex.create({
  root: {
    fontFamily: "var(--sans-serif)",
    fontSize: 11,
  },
  list: {
    position: "relative",
    display: "flex",
    margin: "0 0 -2px",
    paddingLeft: 3,
    listStyleType: "none",
    textIndent: 0,
    cursor: "default",
  },
  trigger: {
    zIndex: 1,
    display: "block",
    minWidth: "unset",
    marginLeft: -1,
    marginRight: 2,
    padding: "0 12px 3px",
    border: "1px solid #91a7b4",
    borderRadius: "3px 3px 0 0",
    background: tabBackground,
    boxShadow: "none",
    color: "#222222",
    textDecoration: "none",
    boxSizing: "border-box",
    fontFamily: "var(--sans-serif)",
    fontSize: 11,
    WebkitFontSmoothing: "antialiased",
    cursor: "default",
    userSelect: "none",
    ":hover": {
      boxShadow: "inset 0 2px #ffc73c",
      borderTop: "1px solid #e68b2c",
    },
    ":is([aria-selected='true'])": {
      zIndex: 8,
      position: "relative",
      marginTop: -2,
      marginBottom: 1,
      marginLeft: -3,
      marginRight: -1,
      paddingBottom: 2,
      border: "1px solid #919b9c",
      borderTop: "1px solid #e68b2c",
      borderBottom: "1px solid transparent",
      background: "#fcfcfe",
      boxShadow: "inset 0 2px #ffc73c",
    },
    ":is([aria-selected='true']):first-of-type::before": {
      content: '""',
      display: "block",
      position: "absolute",
      zIndex: -1,
      top: "100%",
      left: -1,
      width: 0,
      height: 2,
      borderLeft: "var(--tab-border)",
    },
    ":focus": {
      outline: "1px dotted #222222",
      outlineOffset: -4,
    },
    "::-moz-focus-inner": {
      border: 0,
    },
  },
  justified: {
    flexGrow: 1,
    textAlign: "center",
  },
  panel: {
    position: "relative",
    zIndex: 2,
    clear: "both",
    marginBottom: 9,
    padding: 14,
    background: "var(--tab-bg)",
    border: "var(--tab-border)",
    boxShadow:
      "inset 1px 1px #fcfcfe, inset -1px -1px #fcfcfe, 1px 2px 2px 0 rgba(208, 206, 191, 0.75)",
  },
});

export type TabsProps = Omit<PolymorphicProps<"div", TabsRootProps<"div">>, "as">;

/** A tab set powered by Kobalte. */
export function Tabs(props: TabsProps) {
  const others = omit(props, "class");

  return <KobalteTabs {...others} class={[sx(styles.root), props.class]} />;
}

export type TabListProps = Omit<PolymorphicProps<"menu", TabsListProps<"menu">>, "as"> & {
  /** Makes every tab share the available width. */
  justified?: boolean;
};

/**
 * The tab strip. Rendered as `<menu role="tablist">`, which is the element the
 * XP tab styles are written for.
 */
export function TabList(props: TabListProps) {
  const others = omit(props, "class", "justified");

  return (
    <KobalteTabs.List as="menu" {...others} class={[sx(styles.list), props.class]}>
      <TabListContext value={props.justified ?? false}>{props.children}</TabListContext>
    </KobalteTabs.List>
  );
}

export type TabProps = Omit<PolymorphicProps<"button", TabsTriggerProps<"button">>, "as">;

/** A single tab button. */
export function Tab(props: TabProps) {
  const others = omit(props, "class");
  const justified = useContext(TabListContext);

  return (
    <KobalteTabs.Trigger
      {...others}
      class={["button", sx(styles.trigger), justified && sx(styles.justified), props.class]}
    />
  );
}

export type TabPanelProps = Omit<PolymorphicProps<"div", TabsContentProps<"div">>, "as">;

/** The content associated with a tab. */
export function TabPanel(props: TabPanelProps) {
  const others = omit(props, "class");

  return <KobalteTabs.Content {...others} class={[sx(styles.panel), props.class]} />;
}

export { KobalteTabs };
