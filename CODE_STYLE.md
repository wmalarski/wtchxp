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

- `src/styles.css` is the single source of global CSS. It holds only rules that
  cannot be expressed by StyleX or scoped to a component: `@font-face`, native
  `option` styling and scrollbar pseudo-elements.
- Theme values live in `src/variables/variables.stylex.ts`. Use the tokens in
  `stylex.create` calls instead of hard-coded values.
- Component styles live in the component folder. Move every `stylex.create`
  definition into a `<component>.styles.ts` file and export it as
  `<component>Styles`; the component file should only consume it.
- Use a colocated `*.module.css` file when a rule needs a bundler asset URL
  (for example an icon) that StyleX cannot resolve. CSS modules keep the class
  names hashed and scoped to the component.
- Shared field primitives (`Field`'s wrapper, label, description and error
  message) live in `src/field/field.styles.ts` and are imported by other form
  controls.
