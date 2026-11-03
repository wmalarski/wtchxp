# Code style

## Components

Define every component as a typed `const` arrow function:

```tsx
import type { ComponentProps } from "@solidjs/web";
import { type Component } from "solid-js";

export type ButtonProps = ComponentProps<"button"> & {
  active?: boolean;
};

export const Button: Component<ButtonProps> = (props) => {
  return <button {...props} />;
};
```

- Always annotate the component with `Component<Props>` from `solid-js`.
- Components without props use the default: `const App: Component = () => {}`.
- Do not use `export function Component(props: Props) {}` for components.

### Props types

- Always define props with `export type`, never `export interface`.
- Name the props type `<ComponentName>Props`.
- Extend intrinsic element props with `ComponentProps<"tag">` from
  `@solidjs/web`, not `JSX.*HTMLAttributes`.

```tsx
export type ButtonProps = ComponentProps<"button"> & {
  active?: boolean;
};
```

- Keep `JSX.Element` for individual prop values such as `label` or
  `description`; use `ComponentProps` for the element's full prop surface.

When a component accepts children, wrap its props with `ParentProps` from
`solid-js` instead of adding `children?: JSX.Element`:

```tsx
import { type Component, type ParentProps } from "solid-js";

export type PanelProps = ParentProps<{
  title: string;
}>;

export const Panel: Component<PanelProps> = (props) => (
  <section>
    <h2>{props.title}</h2>
    {props.children}
  </section>
);
```

- `ParentProps<P>` adds the optional `children` prop to `P`.
- Do not redeclare `children` in the props type.
- When extending a props type that already declares `children`, omit it first,
  for example `ParentProps<Omit<ComponentProps<"li">, "children"> & { ... }>`.

### Oxlint enforcement

The rules are configured in `vite.config.ts`:

- `react/function-component-definition` requires arrow-function components.
- `typescript/consistent-type-definitions` requires `type` over `interface`.
- `wtchxp/use-component-props` rejects `JSX.*HTMLAttributes` types.
- `wtchxp/component-props-name` requires `Component<NameProps>` to match the
  component name.

Oxlint has no native rule for `ComponentProps` usage or for the
`{ComponentName}Props` relationship, so those two are implemented in the local
plugin `lint/component-props.js`. The `Component<Props>` annotation itself is
checked during type checking.

Non-component helpers may remain regular function declarations.

## Styling

- `src/styles.css` is the base global stylesheet. It holds only rules that
  cannot be expressed by StyleX or scoped to a component: `@font-face`. The
  scrollbar pseudo-elements live in `src/scrollbar/scrollbar.css`, which is
  compiled separately and is opt-in through `wtchxp/scrollbars.css`.
- Theme values live in `src/variables/variables.stylex.ts`. Use the tokens in
  `stylex.create` calls instead of hard-coded values.
- Component styles live in the component folder. Move every `stylex.create`
  definition into a `<component>.styles.ts` file and export it as
  `<component>Styles`; the component file should only consume it.
- Use a colocated `*.module.css` file when a rule needs a bundler asset URL
  (for example an icon) that StyleX cannot resolve, or a selector StyleX cannot
  express, such as switching image or inline SVG states on an ancestor's
  `:hover`/`:active`. CSS modules keep the class names hashed and scoped to the
  component.
- Shared field primitives (the wrapper, label, description and error message)
  live in `src/field/field.styles.ts` and are imported by the form controls.
- Shared styles must only declare properties the local component styles do not
  override. When composing StyleX styles across modules, never set the same
  property in both places: CSS module order is not the class-attribute order.
  Put spacing and other variants in local styles instead.
- Do not import `src/styles.css` from a component. The build emits one shared
  base stylesheet and one stylesheet per component, then injects those imports
  into the built component modules so only used CSS reaches the consumer.

## Icons

- Component icons live in `<component>/icons/*.svg`. Global scrollbar icons
  live in `src/scrollbar/icons/*.svg` alongside `src/scrollbar/scrollbar.css`
  because they are painted by scrollbar selectors rather than by a component.
  Icons are source assets, not bundle entries: assets referenced by CSS are
  inlined into the owning component's stylesheet by the build and are not
  emitted as separate SVG requests.
- Prefer small raster images for dense pixel art, and inline SVG components for
  simple shapes. Raster images avoid a separate request when the bundler inlines
  them, cannot cause layout shift, and tree-shake with the component that uses
  them.
- Keep one icon per module. A module that imports several icons from a barrel
  causes every one of those icons to be retained when that module is used. The
  static title bar controls are split into one module each so that, for example,
  `CloseControl` only imports the close icon states.
- Prefer statically typed components over a string-based icon lookup. Each
  static title bar control imports only its own icon; the dynamic
  `WindowControl action="…"` lookup needs every action icon at runtime.
- Keep an icon as a CSS `url()` when CSS paints it and the paint target cannot
  contain DOM:
  - checkbox and radio marks (`::before`/`::after`)
  - range thumbs (native `::-webkit-slider-thumb`)
  - scrollbar tracks, thumbs and arrows
  - select trigger and item-indicator backgrounds
    Converting those to components would not tree-shake better: the owning
    component already needs every state, and pseudo-elements/native controls
    cannot render child SVG nodes.
- Give every DOM icon an explicit `viewBox` and fixed `width`/`height` (or
  style the SVG box in CSS). Mark decorative icons with `aria-hidden="true"`;
  the surrounding control supplies the accessible name.
- The title bar icons are generated from `src/window/icons/*.svg` by
  `scripts/generate-window-icons.mjs` into `src/window/icons/*.png` and
  `src/window/icons/*-icon.tsx`. Run `vp run generate:icons` after changing
  those assets instead of editing the generated files; it rasterizes the PNGs
  with Playwright/Chromium and formats the generated components.
- Do not inline large multicolor pixel-art icons by hand; add them to the
  generator when they need to be components.
