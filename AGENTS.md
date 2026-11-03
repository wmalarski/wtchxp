<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Built-in Commands vs Scripts

`vp <name>` runs a built-in command. `vp run <name>` runs a `package.json` script or a `vite.config.ts` task. Scripts cannot overwrite built-ins, so `vp dev` and `vp run dev` may do different things. Check `package.json` and `vite.config.ts` first, and run `vp run <name>` when the project defines a script or task with that name.

## Running Scripts

Run TypeScript and JavaScript files with `vpx <file>`, for example `vpx ./scripts/seed.ts --dry-run`. It handles enums, decorators, JSX, and tsconfig `paths`, so do not add `tsx` or `ts-node` to run scripts. `vpx --watch <file>` reruns the file when a file it uses changes, in place of `tsx watch`. `vp node <file>` runs plain Node.js.

## Tool Versions

Run `vp toolchain` to show versions and relationships in the active Vite+
release. Add a tool name to select part of the graph. For example, run
`vp toolchain vite`. Use `--global` to ignore the local `vite-plus` package. Use
`vp why <package>` to show the package-manager dependency graph.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->

## Solid 2.0

This project uses Solid 2.0 (`solid-js` 2.x with `@solidjs/web`), not Solid 1.x
and not React. Components run once; there is no re-render. Read
`node_modules/solid-js/CHEATSHEET.md` before writing Solid code, especially its
last section, "What changed from 1.x".

Rules that matter most:

- Props are read, never destructured: `props.name` inside JSX, a memo, or an
  effect. `function Comp({ name })` loses reactivity. Pass values, not
  accessors, to value-typed props: `<Child count={count()} />`.
- `createEffect(compute, apply)` takes two functions. The first reads reactive
  values and returns a result; the second receives it and performs side effects.
  One argument is an error.
- Stores are written through the draft: `setStore(s => { s.user.name = "Ada" })`.
  There are no path setters and no `produce`.
- Read reactive values inside JSX, a memo, or an effect, never at the top of a
  component body.
- Do not write a signal or store from a memo, an effect's compute function, or a
  component body. Write from event handlers, `onSettled`, or actions.
- Name scopes so diagnostics reports are actionable: pass
  `{ name: "TabList.justified" }` to `createSignal`, `createMemo`, and
  `createEffect`.
- A value passed to `<Context value={...}>` is read once. When it derives from a
  prop, wrap it in `createMemo` and read the memo inside consumers.

Names that no longer exist, and what to use:

- `solid-js/web` -> `@solidjs/web`; `solid-js/store` -> `solid-js`
- `Suspense` -> `Loading`; `SuspenseList` -> `Reveal`; `ErrorBoundary` -> `Errored`
- `mergeProps` -> `merge`; `splitProps` -> `omit`; `unwrap` -> `snapshot`;
  `onMount` -> `onSettled`
- `createResource` -> an async `createMemo` or `createStore(fn)` read under
  `<Loading>`
- `createSelector` -> `createProjection`; `createComputed` -> `createMemo` or a
  two-function `createEffect`
- `batch` -> writes batch on a microtask (`flush()` applies them now); `on()` ->
  the compute half of `createEffect`
- `startTransition` / `useTransition` -> built in; `isPending()` reports an
  in-flight change
- `Index` -> `<For keyed={false}>`; `indexArray` -> `mapArray`; `createMutable`
  -> `createStore` with draft setters
- `onError` / `catchError` -> `<Errored>` or the `error` option of
  `createEffect`
- `classList` -> `class={{ active: isActive() }}`; `use:` directives ->
  `ref={factory(args)}`
- `Context.Provider` -> `<Context value={...}>`; `equalFn` -> `isEqual`;
  `getListener` -> `getObserver`

Project conventions live in `CODE_STYLE.md`: typed `const` arrow components,
`Component<Props>` annotations, `<Name>Props` types, `ComponentProps<"tag">` for
intrinsic props, and StyleX for styles.

Tooling:

- Skills: `node_modules/solid-js/skills/solid-2.0/SKILL.md` (primer),
  `node_modules/solid-js/skills/solid-2.0-cheatsheet/SKILL.md` (cheatsheet),
  `node_modules/solid-js/skills/reactivity-diagnostics/SKILL.md` (every warning
  code and its fix),
  `node_modules/@solidjs/diagnostics/skills/agent-loops/SKILL.md` (capture
  evidence, assert budgets), and
  `node_modules/@solidjs/web/skills/server-components/SKILL.md` (server
  components and slots).
- A console warning with a bracketed code, such as
  `[REACTIVE_WRITE_IN_OWNED_SCOPE]`, is a defect. Look it up in the repair
  guide; do not suppress it.
- Lint runs `eslint-plugin-solid/configs/v2-strict` through Vite+ (configured in
  `vite.config.ts`). Run `vp check` after an edit.
- Reactive changes are verified with `captureArtifact` and
  `expectNoDiagnostics` from `@solidjs/diagnostics`; the Vitest matcher is
  registered in `tests/setup.ts`. Add a scenario to
  `tests/diagnostics.test.tsx` when you change reactive code, or run
  `POST /__solid/diagnostics` against `vp dev` with `{"method":"begin"}` ...
  `{"method":"end"}`.
- Docs: https://v2.solidjs.com/llms.txt; append `.md` to any page URL for its
  Markdown.
