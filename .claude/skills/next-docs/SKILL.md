---
name: next-docs
description: Official Next.js 16 documentation (App Router and Pages Router) mirrored locally as markdown, with a table of contents that maps every page to the moment it becomes relevant. Use this skill whenever a task touches Next.js at all - routing, layouts, Server and Client Components, data fetching, caching and revalidation, Server Actions and forms, metadata and SEO, next.config.js options, the next CLI, proxy/middleware, deployment, testing setup, or migrations and version upgrades - and always consult it before answering a Next.js API question from memory, because Next.js 16 renamed, deprecated and removed APIs that older training data still recommends.
---

# ¿que es esto?

Every `.md` file under `.claude/skills/next-docs/docs/` is a local, offline copy of the **official Next.js documentation** published at <https://nextjs.org/docs>. The folder tree mirrors the sections of the website, and each file keeps its original frontmatter (`title`, `description`, `related`) followed by the full page body.

This project runs **Next.js 16**, whose breaking changes may contradict your training data. Treat these files as the source of truth: when a file and your memory disagree, the file wins, and every deprecation notice inside them applies.

The documentation is split into two routers, and picking the wrong one produces code that does not work:

- **`docs/01-app/` — App Router**: the `app/` directory, Server and Client Components, Server Actions, `use cache`. This is the default for new code.
- **`docs/02-pages/` — Pages Router**: the `pages/` directory, `getStaticProps`, `getServerSideProps`, API Routes. Read it only when the code you are touching already lives in `pages/`, or when migrating away from it.

`docs/03-architecture/` and `docs/04-community/` apply to both routers.

# The `index.md` files

Every folder inside `docs/` has an `index.md`. It is the landing page of that section, never a page about one specific API. Two kinds exist:

- **Stubs** — only frontmatter, no body (for example `docs/01-app/02-guides/index.md`). The rows below already tell you what the section contains, so opening them adds nothing.
- **Section overviews** — a real page that explains the model the whole folder assumes and compares the siblings inside it (for example `docs/01-app/02-guides/testing/index.md` weighs Cypress, Playwright, Vitest and Jest against each other before you pick one).

**Read an `index.md` when** you must *choose* among the files of a folder, or when you need the shared mental model a section takes for granted. **Skip it when** you already know which page you need: open that page directly.

## ¿Como leer la documentacion?
Leer **bajo demanda** los archivos `.md` ubicados en `/skills/next-docs/docs/`: usa la [Tabla de Contenido](#tabla-de-contenido) como referencia para inferir cuales archivos son necesarios para la tarea que estas resolviendo, y accede unicamente a esos archivos.

**Razon**: Leer todos los archivos consume contexto y tokens innecesariamente.

# Tabla de Contenido

## 01-app/ — App Router

| Title and file path | When to read it |
| --- | --- |
| [App Router](docs/01-app/index.md) | When deciding whether a task belongs to the App Router at all, or when you need the one-paragraph definition of what `app/` is |
| [Next.js Glossary](docs/01-app/04-glossary.md) | When a Next.js term (prerendering, App Shell, dynamic hole, revalidation, PPR) appears and you are not certain what it means |

### 01-app/01-getting-started/ — Core concepts, in the order you meet them

| Title and file path | When to read it |
| --- | --- |
| [Getting Started](docs/01-app/01-getting-started/index.md) | When you need the reading order of the fundamentals, or are onboarding onto the App Router from scratch |
| [Installation](docs/01-app/01-getting-started/01-installation.md) | When scaffolding a new app with `create-next-app`, or wiring TypeScript, ESLint and path aliases for the first time |
| [Project structure and organization](docs/01-app/01-getting-started/02-project-structure.md) | Before creating a new folder or special file, or when deciding where colocated components, tests and utilities may live |
| [Layouts and Pages](docs/01-app/01-getting-started/03-layouts-and-pages.md) | When creating a route, a nested layout, or a dynamic segment for the first time |
| [Linking and Navigating](docs/01-app/01-getting-started/04-linking-and-navigating.md) | When navigation feels slow, or before tuning prefetching, prerendering and client-side transitions |
| [Server and Client Components](docs/01-app/01-getting-started/05-server-and-client-components.md) | Before adding `'use client'`, or when unsure which side a component runs on and what it may import |
| [Fetching Data](docs/01-app/01-getting-started/06-fetching-data.md) | When loading data for a page, streaming with `Suspense`, or choosing between fetching on the server and on the client |
| [Mutating Data](docs/01-app/01-getting-started/07-mutating-data.md) | When writing data from a form or an event handler through Server Functions |
| [Caching](docs/01-app/01-getting-started/08-caching.md) | When a value is stale or unexpectedly shared between users, or before adding `use cache` |
| [Revalidating](docs/01-app/01-getting-started/09-revalidating.md) | When cached content must refresh on a schedule or right after a mutation |
| [Error Handling](docs/01-app/01-getting-started/10-error-handling.md) | When adding `error.js`, distinguishing expected errors from uncaught exceptions, or surfacing failures to the user |
| [CSS](docs/01-app/01-getting-started/11-css.md) | When setting up styling: Tailwind, CSS Modules, global stylesheets or external packages |
| [Image Optimization](docs/01-app/01-getting-started/12-images.md) | When adding images and you need the `next/image` basics before the full API |
| [Font Optimization](docs/01-app/01-getting-started/13-fonts.md) | When loading Google or local fonts without layout shift |
| [Metadata and OG images](docs/01-app/01-getting-started/14-metadata-and-og-images.md) | When adding titles, descriptions, favicons or social preview images |
| [Route Handlers](docs/01-app/01-getting-started/15-route-handlers.md) | When building an HTTP endpoint inside `app/` with `route.ts` |
| [Proxy](docs/01-app/01-getting-started/16-proxy.md) | When code must run before a request completes: rewrites, redirects, header changes, auth gates |
| [Deploying](docs/01-app/01-getting-started/17-deploying.md) | When shipping the app, or comparing managed hosting, self-hosting and static export |
| [Upgrading](docs/01-app/01-getting-started/18-upgrading.md) | When moving to a newer Next.js release or trying a canary build |

### 01-app/02-guides/ — Task-oriented guides

| Title and file path | When to read it |
| --- | --- |
| [Guides](docs/01-app/02-guides/index.md) | Stub landing page; the rows below already cover its contents |
| [Adopting Partial Prefetching](docs/01-app/02-guides/adopting-partial-prefetching.md) | When enabling Partial Prefetching and you need to know what changes for `<Link>` |
| [How to set up your Next.js project for AI coding agents](docs/01-app/02-guides/ai-agents.md) | When configuring the repo so coding agents read current docs instead of stale training data |
| [How to add analytics to your Next.js application](docs/01-app/02-guides/analytics.md) | When measuring page performance or wiring Speed Insights |
| [How to implement authentication in Next.js](docs/01-app/02-guides/authentication.md) | When building login, sessions or route protection — start here before writing any auth code |
| [How to implement authentication with Cache Components](docs/01-app/02-guides/authentication-with-cache-components.md) | When Cache Components is enabled and session-dependent UI must not slow the page down or leak between users |
| [How to use Next.js as a backend for your frontend](docs/01-app/02-guides/backend-for-frontend.md) | When Next.js itself is the API layer, not just the UI |
| [Building your application](docs/01-app/02-guides/building.md) | When `next build` output is confusing, or you need to read which routes came out static and which dynamic |
| [Caching and Revalidating (Previous Model)](docs/01-app/02-guides/caching-without-cache-components.md) | When the project does **not** use Cache Components and relies on `fetch` options, `unstable_cache` or route segment config |
| [Using a CDN with Next.js](docs/01-app/02-guides/cdn-caching.md) | When a CDN sits in front of the app and responses are cached or varied incorrectly |
| [How to configure Continuous Integration (CI) build caching](docs/01-app/02-guides/ci-build-caching.md) | When CI rebuilds everything from scratch and builds are slow |
| [How to set a Content Security Policy (CSP)](docs/01-app/02-guides/content-security-policy.md) | When adding CSP headers or nonces, especially with inline scripts and styles |
| [How to use CSS-in-JS libraries](docs/01-app/02-guides/css-in-js.md) | When integrating styled-components, Emotion or similar with Server Components |
| [How to set up a custom server in Next.js](docs/01-app/02-guides/custom-server.md) | When Next.js must be started programmatically instead of through the CLI, and to learn what you lose by doing so |
| [How to think about data security in Next.js](docs/01-app/02-guides/data-security.md) | Before exposing data through Server Components or Server Actions; covers tainting and accidental client leaks |
| [How to use debugging tools with Next.js](docs/01-app/02-guides/debugging.md) | When attaching a debugger from VS Code, Chrome or Firefox DevTools |
| [Deploying Next.js to different platforms](docs/01-app/02-guides/deploying-to-platforms.md) | When choosing a host and you need to know which features require which platform capabilities |
| [How to preview content with Draft Mode](docs/01-app/02-guides/draft-mode.md) | When editors must preview unpublished CMS content by bypassing the cache |
| [How to use environment variables in Next.js](docs/01-app/02-guides/environment-variables.md) | When adding env vars, or when a variable is `undefined` on the client or at build time |
| [How to create forms with Server Actions](docs/01-app/02-guides/forms.md) | When a form submits through a Server Function, including validation errors and pending state |
| [How revalidation works in Next.js](docs/01-app/02-guides/how-revalidation-works.md) | When revalidation misbehaves and you need the tag system, cache consistency and multi-instance details |
| [How to implement Incremental Static Regeneration (ISR)](docs/01-app/02-guides/incremental-static-regeneration.md) | When static pages must be created or refreshed at runtime |
| [Incremental Static Regeneration with Cache Components](docs/01-app/02-guides/incremental-static-regeneration-cache-components.md) | When doing ISR with Cache Components enabled: prerendering a subset of dynamic routes and serving App Shells |
| [Ensuring instant navigations](docs/01-app/02-guides/instant-navigation.md) | When navigations are not instant and the app must be restructured for prefetching and prerendering |
| [How to set up instrumentation](docs/01-app/02-guides/instrumentation.md) | When code must run once at server startup |
| [Building interactive apps](docs/01-app/02-guides/interactive-apps.md) | When building responsive interactions: transitions, optimistic UI and pending feedback |
| [Internationalization](docs/01-app/02-guides/internationalization.md) | When adding multiple languages, locale routing or localized content |
| [How to implement JSON-LD](docs/01-app/02-guides/json-ld.md) | When adding structured data for search engines and AI crawlers |
| [How to lazy load Client Components and libraries](docs/01-app/02-guides/lazy-loading.md) | When a heavy component or library inflates the client bundle |
| [How to optimize your local development environment](docs/01-app/02-guides/local-development.md) | When `next dev` is slow or recompiles too much |
| [Enabling Next.js MCP Server for Coding Agents](docs/01-app/02-guides/mcp.md) | When giving a coding agent live access to the running application state |
| [How to use markdown and MDX in Next.js](docs/01-app/02-guides/mdx.md) | When rendering `.md` or `.mdx` content as pages or components |
| [How to optimize memory usage](docs/01-app/02-guides/memory-usage.md) | When the dev server or the production process runs out of memory |
| [Migrating to Cache Components](docs/01-app/02-guides/migrating-to-cache-components.md) | When converting route segment config into Cache Components |
| [How to build multi-tenant apps in Next.js](docs/01-app/02-guides/multi-tenant.md) | When one deployment serves many tenants by domain or path |
| [How to build micro-frontends using multi-zones](docs/01-app/02-guides/multi-zones.md) | When several independent Next.js apps must live under one domain |
| [Handling connectivity drops](docs/01-app/02-guides/offline-support.md) | When the network can fail mid-fetch or mid-Server Action and the UI must recover |
| [How to set up instrumentation with OpenTelemetry](docs/01-app/02-guides/open-telemetry.md) | When exporting traces and spans to an observability backend |
| [Optimizing prefetching](docs/01-app/02-guides/optimizing-prefetching.md) | When tuning the `prefetch` prop per link, or putting session data in the App Shell |
| [Optimizing package bundling](docs/01-app/02-guides/package-bundling.md) | When analyzing bundle size with the Turbopack or webpack bundle analyzer |
| [Implementing Partial Prerendering on your platform](docs/01-app/02-guides/ppr-platform-guide.md) | Only when building PPR support into a hosting platform or CDN, not when building an app |
| [Prefetching](docs/01-app/02-guides/prefetching.md) | When you need the conceptual model of prefetching before changing any link |
| [How Next.js preserves UI state with Activity](docs/01-app/02-guides/preserving-ui-state.md) | When UI state unexpectedly resets, or fails to reset, across navigations |
| [How to prevent flash before hydration](docs/01-app/02-guides/preventing-flash-before-hydration.md) | When a theme or locale flashes the wrong value before the page hydrates |
| [How to optimize your Next.js application for production](docs/01-app/02-guides/production-checklist.md) | As a pre-launch checklist before shipping |
| [How to build a Progressive Web Application (PWA)](docs/01-app/02-guides/progressive-web-apps.md) | When adding a manifest, service worker, installability or push notifications |
| [Building public pages](docs/01-app/02-guides/public-static-pages.md) | When building landing, marketing, blog or listing pages whose data is shared across users |
| [How to handle redirects in Next.js](docs/01-app/02-guides/redirecting.md) | When choosing between `redirect()`, `next.config.js` redirects, proxy redirects and client navigation |
| [Next.js Rendering Philosophy](docs/01-app/02-guides/rendering-philosophy.md) | When you need the reasoning behind static and dynamic as a per-component spectrum, before making architectural decisions |
| [How to use Sass](docs/01-app/02-guides/sass.md) | When styling with `.scss` or `.sass` |
| [How to load and optimize scripts](docs/01-app/02-guides/scripts.md) | When adding third-party scripts and choosing a loading strategy |
| [How to self-host your Next.js application](docs/01-app/02-guides/self-hosting.md) | When deploying to your own Node.js server, a Docker image or static HTML |
| [Server Actions and Mutations](docs/01-app/02-guides/server-actions.md) | When you need the deep model of Server Actions: response roundtrip, sequential dispatch, security and cache integration |
| [The Server and Client Boundary](docs/01-app/02-guides/server-and-client-boundary.md) | When a module crosses the boundary and imports, props or serialization break |
| [How to build single-page applications with Next.js](docs/01-app/02-guides/single-page-applications.md) | When the product is an SPA and you want Next.js without per-route server rendering |
| [How to create a static export](docs/01-app/02-guides/static-exports.md) | When the output must be plain HTML, CSS and JS with no Node.js server |
| [Streaming](docs/01-app/02-guides/streaming.md) | When rendering UI progressively as data resolves, with `Suspense` and `loading.js` |
| [How to install Tailwind CSS v3](docs/01-app/02-guides/tailwind-v3-css.md) | Only when pinned to Tailwind v3 for browser-support reasons; otherwise use the CSS page |
| [How to optimize third-party libraries](docs/01-app/02-guides/third-party-libraries.md) | When embedding analytics, maps or widgets through `@next/third-parties` |
| [How to use and optimize videos](docs/01-app/02-guides/videos.md) | When self-hosting or embedding video |
| [Designing view transitions](docs/01-app/02-guides/view-transitions.md) | When animating between routes or content states with View Transitions |

#### 01-app/02-guides/client-side-data-fetching/ — Fetching from Client Components

| Title and file path | When to read it |
| --- | --- |
| [Client-side data fetching](docs/01-app/02-guides/client-side-data-fetching/index.md) | When deciding whether data belongs on the client at all, and how to seed it from a Server Component |
| [How to fetch client-side data with SWR](docs/01-app/02-guides/client-side-data-fetching/swr.md) | When the project uses SWR and server and client caches must stay coordinated |
| [How to fetch client-side data with TanStack Query](docs/01-app/02-guides/client-side-data-fetching/tanstack-query.md) | When the project uses TanStack Query and server and client caches must stay coordinated |

#### 01-app/02-guides/migrating/ — Coming from another stack

| Title and file path | When to read it |
| --- | --- |
| [Migrating](docs/01-app/02-guides/migrating/index.md) | Stub landing page; pick the specific migration below |
| [How to migrate from Pages to the App Router](docs/01-app/02-guides/migrating/app-router-migration.md) | When moving an existing `pages/` app to `app/`, incrementally or wholesale |
| [How to migrate from Create React App to Next.js](docs/01-app/02-guides/migrating/from-create-react-app.md) | When porting a CRA codebase into Next.js |
| [How to migrate from Vite to Next.js](docs/01-app/02-guides/migrating/from-vite.md) | When porting a Vite + React codebase into Next.js |

#### 01-app/02-guides/testing/ — Test tooling setup

| Title and file path | When to read it |
| --- | --- |
| [Testing](docs/01-app/02-guides/testing/index.md) | When choosing a test tool: it compares unit, component, integration and E2E testing and warns about `async` Server Components |
| [How to set up Cypress with Next.js](docs/01-app/02-guides/testing/cypress.md) | When configuring Cypress for E2E or component tests |
| [How to set up Jest with Next.js](docs/01-app/02-guides/testing/jest.md) | When configuring Jest for unit and snapshot tests |
| [How to set up Playwright with Next.js](docs/01-app/02-guides/testing/playwright.md) | When configuring Playwright for E2E tests |
| [How to set up Vitest with Next.js](docs/01-app/02-guides/testing/vitest.md) | When configuring Vitest for unit tests |

#### 01-app/02-guides/upgrading/ — Version upgrades

| Title and file path | When to read it |
| --- | --- |
| [Upgrade Guides](docs/01-app/02-guides/upgrading/index.md) | When planning an upgrade and you need to know which version guides apply |
| [Codemods](docs/01-app/02-guides/upgrading/codemods.md) | When an upgrade requires mechanical code changes that a codemod can automate |
| [How to upgrade to version 14](docs/01-app/02-guides/upgrading/version-14.md) | When upgrading from Next.js 13 to 14 |
| [How to upgrade to version 15](docs/01-app/02-guides/upgrading/version-15.md) | When upgrading from Next.js 14 to 15 |
| [How to upgrade to version 16](docs/01-app/02-guides/upgrading/version-16.md) | When upgrading from Next.js 15 to 16 — also the fastest way to see what 16 broke or renamed |

### 01-app/03-api-reference/ — Exact signatures and options

| Title and file path | When to read it |
| --- | --- |
| [API Reference](docs/01-app/03-api-reference/index.md) | When you know the feature but not which reference page documents it |
| [Edge Runtime](docs/01-app/03-api-reference/07-edge.md) | When code must run on the Edge Runtime and you need the list of supported APIs |
| [Turbopack](docs/01-app/03-api-reference/08-turbopack.md) | When the bundler itself is the subject: supported features, unsupported ones, known limitations |

#### 01-app/03-api-reference/01-directives/ — The `'use ...'` strings

| Title and file path | When to read it |
| --- | --- |
| [Directives](docs/01-app/03-api-reference/01-directives/index.md) | When comparing the directives before choosing one |
| [use cache](docs/01-app/03-api-reference/01-directives/use-cache.md) | Before caching a function, component or route with `'use cache'` |
| [use cache: private](docs/01-app/03-api-reference/01-directives/use-cache-private.md) | When caching something that reads request APIs such as cookies or headers, and must stay per-user |
| [use cache: remote](docs/01-app/03-api-reference/01-directives/use-cache-remote.md) | When the cache must be shared and persistent across instances through a remote cache handler |
| [use client](docs/01-app/03-api-reference/01-directives/use-client.md) | Before adding `'use client'`, to know exactly where the boundary lands |
| [use server](docs/01-app/03-api-reference/01-directives/use-server.md) | Before declaring a Server Function, at file level or inline |

#### 01-app/03-api-reference/02-components/ — Built-in components

| Title and file path | When to read it |
| --- | --- |
| [Components](docs/01-app/03-api-reference/02-components/index.md) | Stub landing page; pick the component below |
| [Font Module](docs/01-app/03-api-reference/02-components/font.md) | When you need the full `next/font` options for Google or local fonts |
| [Form Component](docs/01-app/03-api-reference/02-components/form.md) | When using `<Form>` for submissions or search-param updates with client-side navigation |
| [Image Component](docs/01-app/03-api-reference/02-components/image.md) | When you need every `next/image` prop: sizes, loaders, placeholders, priority, remote patterns |
| [Link Component](docs/01-app/03-api-reference/02-components/link.md) | When you need every `next/link` prop, especially `prefetch`, `replace` and `scroll` |
| [Script Component](docs/01-app/03-api-reference/02-components/script.md) | When you need the `next/script` strategies and event handlers |

#### 01-app/03-api-reference/03-file-conventions/ — Special files and folders

| Title and file path | When to read it |
| --- | --- |
| [File-system conventions](docs/01-app/03-api-reference/03-file-conventions/index.md) | When you need the full catalog of special files before creating one |
| [default.js](docs/01-app/03-api-reference/03-file-conventions/default.md) | When a parallel route needs a fallback slot on hard navigation |
| [Dynamic Route Segments](docs/01-app/03-api-reference/03-file-conventions/dynamic-routes.md) | When creating `[param]`, `[...slug]` or `[[...slug]]` routes and reading their values |
| [error.js](docs/01-app/03-api-reference/03-file-conventions/error.md) | When adding an error boundary to a segment, with `reset()` |
| [forbidden.js](docs/01-app/03-api-reference/03-file-conventions/forbidden.md) | When rendering the 403 UI triggered by `forbidden()` |
| [instrumentation.js](docs/01-app/03-api-reference/03-file-conventions/instrumentation.md) | When you need the exact hooks of the server-side instrumentation file |
| [instrumentation-client.js](docs/01-app/03-api-reference/03-file-conventions/instrumentation-client.md) | When adding client-side monitoring that must run before the app boots |
| [Intercepting Routes](docs/01-app/03-api-reference/03-file-conventions/intercepting-routes.md) | When a route must render inside the current layout while the URL changes — the modal pattern |
| [layout.js](docs/01-app/03-api-reference/03-file-conventions/layout.md) | When writing a layout and you need its props, caveats and what it may not do |
| [loading.js](docs/01-app/03-api-reference/03-file-conventions/loading.md) | When adding an automatic `Suspense` fallback to a segment |
| [mdx-components.js](docs/01-app/03-api-reference/03-file-conventions/mdx-components.md) | When overriding the components MDX renders |
| [middleware.js](docs/01-app/03-api-reference/03-file-conventions/middleware.md) | Only for legacy code: this file is deprecated and renamed to `proxy.js`. Read it to migrate away |
| [not-found.js](docs/01-app/03-api-reference/03-file-conventions/not-found.md) | When rendering the 404 UI triggered by `notFound()` or by an unmatched URL |
| [page.js](docs/01-app/03-api-reference/03-file-conventions/page.md) | When writing a page and you need its props, including `params` and `searchParams` |
| [Parallel Routes](docs/01-app/03-api-reference/03-file-conventions/parallel-routes.md) | When one view must render several independently navigable pages through named slots |
| [proxy.js](docs/01-app/03-api-reference/03-file-conventions/proxy.md) | When writing the proxy file: matchers, request rewriting, headers, redirects. This replaces `middleware.js` |
| [public Folder](docs/01-app/03-api-reference/03-file-conventions/public-folder.md) | When serving static assets straight from `public/` |
| [route.js](docs/01-app/03-api-reference/03-file-conventions/route.md) | When writing a Route Handler and you need the supported HTTP methods and their signatures |
| [Route Groups](docs/01-app/03-api-reference/03-file-conventions/route-groups.md) | When organizing folders with `(group)` without affecting the URL |
| [src Folder](docs/01-app/03-api-reference/03-file-conventions/src-folder.md) | When the app lives under `src/` and you need the resolution rules |
| [template.js](docs/01-app/03-api-reference/03-file-conventions/template.md) | When a layout must remount on every navigation instead of persisting |
| [unauthorized.js](docs/01-app/03-api-reference/03-file-conventions/unauthorized.md) | When rendering the 401 UI triggered by `unauthorized()` |

##### 01-app/03-api-reference/03-file-conventions/01-metadata/ — Metadata files

| Title and file path | When to read it |
| --- | --- |
| [Metadata Files API Reference](docs/01-app/03-api-reference/03-file-conventions/01-metadata/index.md) | When you need the catalog of metadata file conventions before adding one |
| [favicon, icon, and apple-icon](docs/01-app/03-api-reference/03-file-conventions/01-metadata/app-icons.md) | When adding favicons or app icons, statically or generated in code |
| [manifest.json](docs/01-app/03-api-reference/03-file-conventions/01-metadata/manifest.md) | When adding a web app manifest, typically for a PWA |
| [opengraph-image and twitter-image](docs/01-app/03-api-reference/03-file-conventions/01-metadata/opengraph-image.md) | When producing social preview images, static or generated per route |
| [robots.txt](docs/01-app/03-api-reference/03-file-conventions/01-metadata/robots.md) | When controlling what crawlers may index |
| [sitemap.xml](docs/01-app/03-api-reference/03-file-conventions/01-metadata/sitemap.md) | When emitting a sitemap, static or generated from data |

##### 01-app/03-api-reference/03-file-conventions/02-route-segment-config/ — Per-segment exports

| Title and file path | When to read it |
| --- | --- |
| [Route Segment Config](docs/01-app/03-api-reference/03-file-conventions/02-route-segment-config/index.md) | When you need the list of config exports a segment accepts, and which ones Cache Components replaces |
| [dynamicParams](docs/01-app/03-api-reference/03-file-conventions/02-route-segment-config/dynamicParams.md) | When deciding what happens for params not returned by `generateStaticParams` |
| [instant](docs/01-app/03-api-reference/03-file-conventions/02-route-segment-config/instant.md) | When a segment must be served instantly from the prerendered shell |
| [maxDuration](docs/01-app/03-api-reference/03-file-conventions/02-route-segment-config/maxDuration.md) | When a route needs a longer execution limit on the hosting platform |
| [preferredRegion (deprecated)](docs/01-app/03-api-reference/03-file-conventions/02-route-segment-config/preferredRegion.md) | Only when removing this deprecated export from existing code |
| [prefetch](docs/01-app/03-api-reference/03-file-conventions/02-route-segment-config/prefetch.md) | When overriding prefetch behavior for a whole segment rather than per link |
| [runtime](docs/01-app/03-api-reference/03-file-conventions/02-route-segment-config/runtime.md) | When a segment must run on Node.js or on the Edge Runtime |

#### 01-app/03-api-reference/04-functions/ — Functions and hooks

| Title and file path | When to read it |
| --- | --- |
| [Functions](docs/01-app/03-api-reference/04-functions/index.md) | When you know what you want to do but not which function does it |
| [after](docs/01-app/03-api-reference/04-functions/after.md) | When work must run after the response is sent, such as logging or analytics |
| [cacheLife](docs/01-app/03-api-reference/04-functions/cacheLife.md) | When setting how long a `use cache` entry stays fresh |
| [cacheTag](docs/01-app/03-api-reference/04-functions/cacheTag.md) | When tagging cached output so it can be invalidated later by tag |
| [catchError](docs/01-app/03-api-reference/04-functions/catchError.md) | When you must catch an error without swallowing the control-flow errors Next.js throws internally |
| [connection](docs/01-app/03-api-reference/04-functions/connection.md) | When a component must opt out of prerendering and wait for an actual request |
| [cookies](docs/01-app/03-api-reference/04-functions/cookies.md) | When reading or writing cookies on the server, and you need the read/write rules per context |
| [draftMode](docs/01-app/03-api-reference/04-functions/draft-mode.md) | When enabling, disabling or checking draft mode in code |
| [fetch](docs/01-app/03-api-reference/04-functions/fetch.md) | When you need the Next.js extensions to `fetch`, including its caching options |
| [forbidden](docs/01-app/03-api-reference/04-functions/forbidden.md) | When code must stop and render the 403 UI |
| [generateImageMetadata](docs/01-app/03-api-reference/04-functions/generate-image-metadata.md) | When one metadata file must emit several images |
| [generateMetadata](docs/01-app/03-api-reference/04-functions/generate-metadata.md) | When page metadata depends on data — the full `Metadata` field reference lives here |
| [generateSitemaps](docs/01-app/03-api-reference/04-functions/generate-sitemaps.md) | When the site needs multiple sitemap files |
| [generateStaticParams](docs/01-app/03-api-reference/04-functions/generate-static-params.md) | When prerendering dynamic routes at build time |
| [generateViewport](docs/01-app/03-api-reference/04-functions/generate-viewport.md) | When setting viewport or theme color, statically or from data |
| [headers](docs/01-app/03-api-reference/04-functions/headers.md) | When reading incoming request headers on the server |
| [ImageResponse](docs/01-app/03-api-reference/04-functions/image-response.md) | When generating an image from JSX, typically for OG images |
| [io](docs/01-app/03-api-reference/04-functions/io.md) | When marking an operation as I/O so Next.js treats it as dynamic |
| [NextRequest](docs/01-app/03-api-reference/04-functions/next-request.md) | When you need the request object API in Route Handlers or the proxy |
| [NextResponse](docs/01-app/03-api-reference/04-functions/next-response.md) | When building responses, rewrites or redirects in Route Handlers or the proxy |
| [next/root-params](docs/01-app/03-api-reference/04-functions/next-root-params.md) | When a deeply nested component needs root-level route params without prop drilling |
| [notFound](docs/01-app/03-api-reference/04-functions/not-found.md) | When code must stop and render the 404 UI |
| [permanentRedirect](docs/01-app/03-api-reference/04-functions/permanentRedirect.md) | When redirecting with a 308, for example after a permanent URL change |
| [redirect](docs/01-app/03-api-reference/04-functions/redirect.md) | When redirecting from a Server Component, Route Handler or Server Action |
| [refresh](docs/01-app/03-api-reference/04-functions/refresh.md) | When the current route must re-render with fresh server data |
| [revalidatePath](docs/01-app/03-api-reference/04-functions/revalidatePath.md) | When a mutation invalidates a specific path |
| [revalidateTag](docs/01-app/03-api-reference/04-functions/revalidateTag.md) | When a mutation invalidates every entry carrying a tag |
| [unauthorized](docs/01-app/03-api-reference/04-functions/unauthorized.md) | When code must stop and render the 401 UI |
| [unstable_cache](docs/01-app/03-api-reference/04-functions/unstable_cache.md) | Only in the pre-Cache-Components model; prefer `use cache` in new code |
| [unstable_noStore](docs/01-app/03-api-reference/04-functions/unstable_noStore.md) | Only in the pre-Cache-Components model, to force a segment dynamic |
| [unstable_rethrow](docs/01-app/03-api-reference/04-functions/unstable_rethrow.md) | When a `try/catch` accidentally swallows Next.js control-flow errors such as `notFound()` or `redirect()` |
| [updateTag](docs/01-app/03-api-reference/04-functions/updateTag.md) | When a mutation must refresh tagged data immediately within the same request |
| [useLinkStatus](docs/01-app/03-api-reference/04-functions/use-link-status.md) | When showing pending feedback while a `<Link>` navigation is in flight |
| [useOffline](docs/01-app/03-api-reference/04-functions/use-offline.md) | When the UI must react to the connection dropping |
| [useParams](docs/01-app/03-api-reference/04-functions/use-params.md) | When a Client Component needs the dynamic route params |
| [usePathname](docs/01-app/03-api-reference/04-functions/use-pathname.md) | When a Client Component needs the current pathname, for example to highlight active links |
| [userAgent](docs/01-app/03-api-reference/04-functions/userAgent.md) | When branching on device, browser or bot detection from the request |
| [useReportWebVitals](docs/01-app/03-api-reference/04-functions/use-report-web-vitals.md) | When sending Core Web Vitals to an analytics backend |
| [useRouter](docs/01-app/03-api-reference/04-functions/use-router.md) | When a Client Component must navigate, refresh or prefetch programmatically |
| [useSearchParams](docs/01-app/03-api-reference/04-functions/use-search-params.md) | When a Client Component reads the query string — includes the `Suspense` requirement |
| [useSelectedLayoutSegment](docs/01-app/03-api-reference/04-functions/use-selected-layout-segment.md) | When a layout must know which single child segment is active |
| [useSelectedLayoutSegments](docs/01-app/03-api-reference/04-functions/use-selected-layout-segments.md) | When a layout needs the whole active segment chain, for example to build breadcrumbs |

#### 01-app/03-api-reference/05-config/ — Project configuration

| Title and file path | When to read it |
| --- | --- |
| [Configuration](docs/01-app/03-api-reference/05-config/index.md) | Stub landing page; pick the config surface below |
| [TypeScript](docs/01-app/03-api-reference/05-config/02-typescript.md) | When setting up TypeScript, typed routes, or the generated types Next.js emits |
| [ESLint Plugin](docs/01-app/03-api-reference/05-config/03-eslint.md) | When configuring `eslint-config-next` or silencing one of its rules |

##### 01-app/03-api-reference/05-config/01-next-config-js/ — One page per `next.config.js` option

| Title and file path | When to read it |
| --- | --- |
| [next.config.js](docs/01-app/03-api-reference/05-config/01-next-config-js/index.md) | When you need the full list of options before editing the config file |
| [adapterPath](docs/01-app/03-api-reference/05-config/01-next-config-js/adapterPath.md) | When pointing the build at a custom deployment adapter |
| [allowedDevOrigins](docs/01-app/03-api-reference/05-config/01-next-config-js/allowedDevOrigins.md) | When the dev server rejects requests from another origin, such as a tunnel or LAN device |
| [appDir](docs/01-app/03-api-reference/05-config/01-next-config-js/appDir.md) | When enabling or reasoning about the App Router flag |
| [assetPrefix](docs/01-app/03-api-reference/05-config/01-next-config-js/assetPrefix.md) | When static assets must be served from a CDN host |
| [authInterrupts](docs/01-app/03-api-reference/05-config/01-next-config-js/authInterrupts.md) | Before using `forbidden()` or `unauthorized()`, which this experimental flag gates |
| [basePath](docs/01-app/03-api-reference/05-config/01-next-config-js/basePath.md) | When the app is served under a sub-path instead of the domain root |
| [cacheComponents](docs/01-app/03-api-reference/05-config/01-next-config-js/cacheComponents.md) | When enabling Cache Components — check this first, since it changes how caching pages apply |
| [cacheHandlers](docs/01-app/03-api-reference/05-config/01-next-config-js/cacheHandlers.md) | When `use cache` must be backed by a custom store such as Redis |
| [cacheLife](docs/01-app/03-api-reference/05-config/01-next-config-js/cacheLife.md) | When defining reusable cache profiles instead of repeating durations |
| [cacheMaxMemorySize](docs/01-app/03-api-reference/05-config/01-next-config-js/cacheMaxMemorySize.md) | When the in-memory cache per instance must be resized or disabled |
| [compress](docs/01-app/03-api-reference/05-config/01-next-config-js/compress.md) | When gzip must be disabled because a proxy already compresses responses |
| [crossOrigin](docs/01-app/03-api-reference/05-config/01-next-config-js/crossOrigin.md) | When generated script tags need a `crossOrigin` attribute |
| [cssChunking](docs/01-app/03-api-reference/05-config/01-next-config-js/cssChunking.md) | When CSS load order breaks or you want fewer stylesheet requests |
| [deploymentId](docs/01-app/03-api-reference/05-config/01-next-config-js/deploymentId.md) | When protecting against version skew between deployments |
| [devIndicators](docs/01-app/03-api-reference/05-config/01-next-config-js/devIndicators.md) | When the on-screen dev indicator gets in the way |
| [distDir](docs/01-app/03-api-reference/05-config/01-next-config-js/distDir.md) | When the build output must go somewhere other than `.next` |
| [env](docs/01-app/03-api-reference/05-config/01-next-config-js/env.md) | When inlining build-time environment values through the config file |
| [expireTime](docs/01-app/03-api-reference/05-config/01-next-config-js/expireTime.md) | When tuning the stale-while-revalidate window of ISR pages |
| [exportPathMap](docs/01-app/03-api-reference/05-config/01-next-config-js/exportPathMap.md) | Only for legacy `next export` setups |
| [generateBuildId](docs/01-app/03-api-reference/05-config/01-next-config-js/generateBuildId.md) | When multiple instances must share a stable build id, for example behind a load balancer |
| [generateEtags](docs/01-app/03-api-reference/05-config/01-next-config-js/generateEtags.md) | When ETags must be disabled for caching reasons upstream |
| [headers](docs/01-app/03-api-reference/05-config/01-next-config-js/headers.md) | When adding security or caching headers declaratively instead of in the proxy |
| [htmlLimitedBots](docs/01-app/03-api-reference/05-config/01-next-config-js/htmlLimitedBots.md) | When specific crawlers must receive blocking metadata rather than streamed HTML |
| [httpAgentOptions](docs/01-app/03-api-reference/05-config/01-next-config-js/httpAgentOptions.md) | When outbound HTTP Keep-Alive must be tuned or disabled |
| [images](docs/01-app/03-api-reference/05-config/01-next-config-js/images.md) | When `next/image` rejects a remote host, or when configuring formats, sizes, loaders or the optimizer |
| [Custom Next.js Cache Handler](docs/01-app/03-api-reference/05-config/01-next-config-js/incrementalCacheHandlerPath.md) | When the ISR cache must live in an external service so instances share it |
| [inlineCss](docs/01-app/03-api-reference/05-config/01-next-config-js/inlineCss.md) | When inlining critical CSS into the HTML |
| [instrumentationClientInject](docs/01-app/03-api-reference/05-config/01-next-config-js/instrumentationClientInject.md) | When extra client instrumentation must run before the user's own instrumentation file |
| [logging](docs/01-app/03-api-reference/05-config/01-next-config-js/logging.md) | When you want fetch calls, incoming requests or browser console output visible in the terminal |
| [mdxRs](docs/01-app/03-api-reference/05-config/01-next-config-js/mdxRs.md) | When compiling MDX with the Rust compiler instead of the JS one |
| [onDemandEntries](docs/01-app/03-api-reference/05-config/01-next-config-js/onDemandEntries.md) | When dev keeps recompiling pages you are still working on |
| [optimizePackageImports](docs/01-app/03-api-reference/05-config/01-next-config-js/optimizePackageImports.md) | When a barrel-file package such as an icon library bloats the bundle |
| [output](docs/01-app/03-api-reference/05-config/01-next-config-js/output.md) | When producing a `standalone` server bundle or a static `export` |
| [outputHashSalt](docs/01-app/03-api-reference/05-config/01-next-config-js/outputHashSalt.md) | When output filenames must differ between builds or environments |
| [pageExtensions](docs/01-app/03-api-reference/05-config/01-next-config-js/pageExtensions.md) | When routes must be resolved from non-default file extensions |
| [partialPrefetching](docs/01-app/03-api-reference/05-config/01-next-config-js/partialPrefetching.md) | When links should prefetch only the static part of each route by default |
| [poweredByHeader](docs/01-app/03-api-reference/05-config/01-next-config-js/poweredByHeader.md) | When the `x-powered-by` header must be removed |
| [prefetchInlining](docs/01-app/03-api-reference/05-config/01-next-config-js/prefetchInlining.md) | When many small prefetch responses should be bundled differently |
| [productionBrowserSourceMaps](docs/01-app/03-api-reference/05-config/01-next-config-js/productionBrowserSourceMaps.md) | When production stack traces must be readable |
| [proxyClientMaxBodySize](docs/01-app/03-api-reference/05-config/01-next-config-js/proxyClientMaxBodySize.md) | When large uploads are rejected by the proxy body-size limit |
| [reactCompiler](docs/01-app/03-api-reference/05-config/01-next-config-js/reactCompiler.md) | When enabling the React Compiler so memoization becomes automatic |
| [reactMaxHeadersLength](docs/01-app/03-api-reference/05-config/01-next-config-js/reactMaxHeadersLength.md) | When React-emitted headers, such as preload hints, exceed a proxy limit |
| [reactStrictMode](docs/01-app/03-api-reference/05-config/01-next-config-js/reactStrictMode.md) | When enabling Strict Mode, or when double-invocation in dev is confusing you |
| [redirects](docs/01-app/03-api-reference/05-config/01-next-config-js/redirects.md) | When redirects are static rules rather than runtime decisions |
| [rewrites](docs/01-app/03-api-reference/05-config/01-next-config-js/rewrites.md) | When a URL must map to a different path or an external backend without changing the address bar |
| [sassOptions](docs/01-app/03-api-reference/05-config/01-next-config-js/sassOptions.md) | When Sass needs include paths, variables or a specific implementation |
| [serverActions](docs/01-app/03-api-reference/05-config/01-next-config-js/serverActions.md) | When Server Actions need larger body limits or a list of allowed origins |
| [serverComponentsHmrCache](docs/01-app/03-api-reference/05-config/01-next-config-js/serverComponentsHmrCache.md) | When dev refreshes refetch too much, or when they reuse stale data |
| [serverExternalPackages](docs/01-app/03-api-reference/05-config/01-next-config-js/serverExternalPackages.md) | When a server-only dependency breaks once bundled and must stay external |
| [skipProxyUrlNormalize](docs/01-app/03-api-reference/05-config/01-next-config-js/skipProxyUrlNormalize.md) | When the proxy must see the raw URL instead of the normalized one |
| [skipTrailingSlashRedirect](docs/01-app/03-api-reference/05-config/01-next-config-js/skipTrailingSlashRedirect.md) | When you handle trailing slashes yourself and the automatic redirect interferes |
| [staleTimes](docs/01-app/03-api-reference/05-config/01-next-config-js/staleTimes.md) | When the client-side router cache serves data that feels too stale or too fresh |
| [staticGeneration*](docs/01-app/03-api-reference/05-config/01-next-config-js/staticGeneration.md) | When tuning build-time static generation: concurrency, retries and timeouts |
| [supportsImmutableAssets](docs/01-app/03-api-reference/05-config/01-next-config-js/supportsImmutableAssets.md) | When the host can serve content-addressed assets as immutable |
| [taint](docs/01-app/03-api-reference/05-config/01-next-config-js/taint.md) | When enabling React tainting so sensitive objects cannot reach the client |
| [trailingSlash](docs/01-app/03-api-reference/05-config/01-next-config-js/trailingSlash.md) | When URLs must consistently end with or without a slash |
| [transpilePackages](docs/01-app/03-api-reference/05-config/01-next-config-js/transpilePackages.md) | When a monorepo package or a dependency ships untranspiled TypeScript or JSX |
| [turbopack](docs/01-app/03-api-reference/05-config/01-next-config-js/turbopack.md) | When Turbopack needs loaders, aliases or resolve options |
| [turbopackChunking](docs/01-app/03-api-reference/05-config/01-next-config-js/turbopackChunking.md) | When production chunking produces too many or too few client bundles |
| [Turbopack FileSystem Caching](docs/01-app/03-api-reference/05-config/01-next-config-js/turbopackFileSystemCache.md) | When builds should reuse a persistent on-disk cache between runs |
| [turbopack.ignoreIssue](docs/01-app/03-api-reference/05-config/01-next-config-js/turbopackIgnoreIssue.md) | When a known Turbopack warning must be suppressed from the overlay and CLI |
| [turbopackLocalPostcssConfig](docs/01-app/03-api-reference/05-config/01-next-config-js/turbopackLocalPostcssConfig.md) | When different directories need their own PostCSS config |
| [Turbopack Memory Eviction](docs/01-app/03-api-reference/05-config/01-next-config-js/turbopackMemoryEviction.md) | When the persistent Turbopack cache consumes too much memory |
| [turbopackRustReactCompiler](docs/01-app/03-api-reference/05-config/01-next-config-js/turbopackRustReactCompiler.md) | When the React Compiler should run natively instead of through Babel |
| [typedRoutes](docs/01-app/03-api-reference/05-config/01-next-config-js/typedRoutes.md) | When link `href` values should be type-checked against real routes |
| [typescript](docs/01-app/03-api-reference/05-config/01-next-config-js/typescript.md) | When the build must tolerate type errors, or must use a custom `tsconfig` |
| [urlImports](docs/01-app/03-api-reference/05-config/01-next-config-js/urlImports.md) | When importing modules directly from a URL |
| [useLightningcss](docs/01-app/03-api-reference/05-config/01-next-config-js/useLightningcss.md) | When processing CSS with Lightning CSS instead of the default pipeline |
| [useOffline](docs/01-app/03-api-reference/05-config/01-next-config-js/useOffline.md) | Before using the `useOffline` hook, which this experimental flag gates |
| [useTypeScriptCli](docs/01-app/03-api-reference/05-config/01-next-config-js/useTypeScriptCli.md) | When production type checking must run the project's own `tsc` |
| [Custom Webpack Config](docs/01-app/03-api-reference/05-config/01-next-config-js/webpack.md) | Only when the project still builds with webpack instead of Turbopack |
| [webVitalsAttribution](docs/01-app/03-api-reference/05-config/01-next-config-js/webVitalsAttribution.md) | When a Web Vitals score is bad and you need to know which element caused it |

#### 01-app/03-api-reference/06-cli/ — Command line

| Title and file path | When to read it |
| --- | --- |
| [CLI](docs/01-app/03-api-reference/06-cli/index.md) | Stub landing page; pick the command below |
| [create-next-app](docs/01-app/03-api-reference/06-cli/create-next-app.md) | When scaffolding a project and you need the flags or the available templates |
| [next CLI](docs/01-app/03-api-reference/06-cli/next.md) | When you need the flags of `next dev`, `next build`, `next start` or `next lint` |

#### 01-app/03-api-reference/07-adapters/ — Building a deployment adapter

Read this folder only when integrating Next.js into a hosting platform. Application code never needs it.

| Title and file path | When to read it |
| --- | --- |
| [Adapters](docs/01-app/03-api-reference/07-adapters/index.md) | When starting an adapter and you need the overall picture |
| [Configuration](docs/01-app/03-api-reference/07-adapters/01-configuration.md) | When wiring `adapterPath` or `NEXT_ADAPTER_PATH` |
| [Creating an Adapter](docs/01-app/03-api-reference/07-adapters/02-creating-an-adapter.md) | When implementing the `NextAdapter` interface |
| [API Reference](docs/01-app/03-api-reference/07-adapters/03-api-reference.md) | When you need the exact shape of `modifyConfig` and `onBuildComplete` |
| [Testing Adapters](docs/01-app/03-api-reference/07-adapters/04-testing-adapters.md) | When validating an adapter against the compatibility test harness |
| [Routing with @next/routing](docs/01-app/03-api-reference/07-adapters/05-routing-with-next-routing.md) | When the adapter must reproduce Next.js route matching |
| [Implementing PPR in an Adapter](docs/01-app/03-api-reference/07-adapters/06-implementing-ppr-in-an-adapter.md) | When adding Partial Prerendering support with fallback output and cache hooks |
| [Runtime Integration](docs/01-app/03-api-reference/07-adapters/07-runtime-integration.md) | When connecting build-time adapter output to runtime cache interfaces |
| [Invoking Entrypoints](docs/01-app/03-api-reference/07-adapters/08-invoking-entrypoints.md) | When the platform must invoke Node.js or Edge entrypoints with runtime context |
| [Output Types](docs/01-app/03-api-reference/07-adapters/09-output-types.md) | When interpreting the build output types exposed to adapters |
| [Routing Information](docs/01-app/03-api-reference/07-adapters/10-routing-information.md) | When reading routing phases and route fields from `onBuildComplete` |
| [Use Cases](docs/01-app/03-api-reference/07-adapters/11-use-cases.md) | When you want worked examples before designing your own adapter |
| [Supporting Immutable Static Assets](docs/01-app/03-api-reference/07-adapters/12-immutable-static-assets.md) | When the platform can serve immutable assets and the adapter must declare it |

## 02-pages/ — Pages Router

Only relevant when the code already lives in `pages/`, or when migrating away from it. For new code use the App Router above.

| Title and file path | When to read it |
| --- | --- |
| [Pages Router](docs/02-pages/index.md) | When you need the short definition of the Pages Router and how it differs from `app/` |

### 02-pages/01-getting-started/ — Core concepts

| Title and file path | When to read it |
| --- | --- |
| [Getting Started - Pages Router](docs/02-pages/01-getting-started/index.md) | When onboarding onto an existing Pages Router codebase |
| [Create a new Next.js application](docs/02-pages/01-getting-started/01-installation.md) | When scaffolding a Pages Router app and configuring TypeScript, ESLint and `next.config.js` |
| [Project Structure and Organization](docs/02-pages/01-getting-started/02-project-structure.md) | Before adding folders or special files under `pages/` |
| [Image Optimization](docs/02-pages/01-getting-started/04-images.md) | When adding images with `next/image` in the Pages Router |
| [How to use fonts](docs/02-pages/01-getting-started/05-fonts.md) | When loading fonts in the Pages Router |
| [How to use CSS in your application](docs/02-pages/01-getting-started/06-css.md) | When setting up CSS Modules, global CSS or Tailwind in the Pages Router |
| [How to deploy your Next.js application](docs/02-pages/01-getting-started/11-deploying.md) | When shipping a Pages Router app |

### 02-pages/02-guides/ — Task-oriented guides

| Title and file path | When to read it |
| --- | --- |
| [Guides](docs/02-pages/02-guides/index.md) | Stub landing page; the rows below already cover its contents |
| [How to set up analytics](docs/02-pages/02-guides/analytics.md) | When measuring page performance in the Pages Router |
| [How to implement authentication in Next.js](docs/02-pages/02-guides/authentication.md) | When building login, session management and route protection in `pages/` |
| [How to configure Babel in Next.js](docs/02-pages/02-guides/babel.md) | When the project still uses Babel and its preset must be extended |
| [How to configure Continuous Integration (CI) build caching](docs/02-pages/02-guides/ci-build-caching.md) | When CI rebuilds everything from scratch |
| [How to set a Content Security Policy (CSP)](docs/02-pages/02-guides/content-security-policy.md) | When adding CSP headers or nonces in the Pages Router |
| [How to use CSS-in-JS libraries](docs/02-pages/02-guides/css-in-js.md) | When wiring styled-components or Emotion with `_document` |
| [How to set up a custom server in Next.js](docs/02-pages/02-guides/custom-server.md) | When Next.js must be started programmatically |
| [How to use debugging tools with Next.js](docs/02-pages/02-guides/debugging.md) | When attaching a debugger from VS Code or Chrome DevTools |
| [How to preview content with Draft Mode](docs/02-pages/02-guides/draft-mode.md) | When editors must preview unpublished content — the modern replacement for Preview Mode |
| [How to use environment variables in Next.js](docs/02-pages/02-guides/environment-variables.md) | When adding env vars, or when one is `undefined` on the client |
| [How to create forms with API Routes](docs/02-pages/02-guides/forms.md) | When a form submits to an API Route, since `pages/` has no Server Actions |
| [How to implement Incremental Static Regeneration (ISR)](docs/02-pages/02-guides/incremental-static-regeneration.md) | When static pages must refresh at runtime via `revalidate` |
| [How to set up instrumentation](docs/02-pages/02-guides/instrumentation.md) | When code must run once at server startup |
| [How to implement internationalization in Next.js](docs/02-pages/02-guides/internationalization.md) | When using the built-in i18n routing and locale detection of the Pages Router |
| [How to lazy load Client Components and libraries](docs/02-pages/02-guides/lazy-loading.md) | When a heavy component or library inflates the bundle |
| [How to use markdown and MDX in Next.js](docs/02-pages/02-guides/mdx.md) | When rendering MDX content in the Pages Router |
| [How to build micro-frontends using multi-zones](docs/02-pages/02-guides/multi-zones.md) | When several Next.js apps must live under one domain |
| [How to instrument your Next.js app with OpenTelemetry](docs/02-pages/02-guides/open-telemetry.md) | When exporting traces to an observability backend |
| [How to optimize package bundling](docs/02-pages/02-guides/package-bundling.md) | When reducing server and client bundle size |
| [How to configure PostCSS in Next.js](docs/02-pages/02-guides/post-css.md) | When adding or reordering PostCSS plugins |
| [How to preview content with Preview Mode](docs/02-pages/02-guides/preview-mode.md) | Only for legacy code; new work should use Draft Mode instead |
| [How to optimize your Next.js application for production](docs/02-pages/02-guides/production-checklist.md) | As a pre-launch checklist |
| [How to handle redirects in Next.js](docs/02-pages/02-guides/redirecting.md) | When choosing between config redirects, `getServerSideProps` redirects and client navigation |
| [How to use Sass in Next.js](docs/02-pages/02-guides/sass.md) | When styling with Sass |
| [How to load and optimize scripts](docs/02-pages/02-guides/scripts.md) | When adding third-party scripts with `next/script` |
| [How to self-host your Next.js application](docs/02-pages/02-guides/self-hosting.md) | When deploying to your own server, Docker or static HTML |
| [How to create a static export](docs/02-pages/02-guides/static-exports.md) | When the output must be static files with no Node.js server |
| [Tailwind CSS](docs/02-pages/02-guides/tailwind-v3-css.md) | When setting up Tailwind in the Pages Router |
| [How to optimize third-party libraries](docs/02-pages/02-guides/third-party-libraries.md) | When embedding analytics, maps or widgets through `@next/third-parties` |

#### 02-pages/02-guides/migrating/ — Coming from another stack

| Title and file path | When to read it |
| --- | --- |
| [Migrating](docs/02-pages/02-guides/migrating/index.md) | Stub landing page; pick the specific migration below |
| [How to migrate from Pages to the App Router](docs/02-pages/02-guides/migrating/app-router-migration.md) | When moving this codebase from `pages/` to `app/` |
| [How to migrate from Create React App to Next.js](docs/02-pages/02-guides/migrating/from-create-react-app.md) | When porting a CRA codebase into the Pages Router |
| [How to migrate from Vite to Next.js](docs/02-pages/02-guides/migrating/from-vite.md) | When porting a Vite codebase into the Pages Router |

#### 02-pages/02-guides/testing/ — Test tooling setup

| Title and file path | When to read it |
| --- | --- |
| [Testing](docs/02-pages/02-guides/testing/index.md) | When choosing a test tool for a Pages Router project |
| [How to set up Cypress with Next.js](docs/02-pages/02-guides/testing/cypress.md) | When configuring Cypress for E2E or component tests |
| [How to set up Jest with Next.js](docs/02-pages/02-guides/testing/jest.md) | When configuring Jest for unit tests |
| [How to set up Playwright with Next.js](docs/02-pages/02-guides/testing/playwright.md) | When configuring Playwright for E2E and integration tests |
| [How to set up Vitest with Next.js](docs/02-pages/02-guides/testing/vitest.md) | When configuring Vitest with React Testing Library |

#### 02-pages/02-guides/upgrading/ — Version upgrades

| Title and file path | When to read it |
| --- | --- |
| [Upgrading](docs/02-pages/02-guides/upgrading/index.md) | When planning an upgrade of an older Pages Router app |
| [Codemods](docs/02-pages/02-guides/upgrading/codemods.md) | When an upgrade requires mechanical changes a codemod can automate |
| [How to upgrade to version 9](docs/02-pages/02-guides/upgrading/version-9.md) | When upgrading from Next.js 8 to 9 |
| [How to upgrade to version 10](docs/02-pages/02-guides/upgrading/version-10.md) | When upgrading from Next.js 9 to 10 |
| [How to upgrade to version 11](docs/02-pages/02-guides/upgrading/version-11.md) | When upgrading from Next.js 10 to 11 |
| [How to upgrade to version 12](docs/02-pages/02-guides/upgrading/version-12.md) | When upgrading from Next.js 11 to 12 |
| [How to upgrade to version 13](docs/02-pages/02-guides/upgrading/version-13.md) | When upgrading from Next.js 12 to 13 |
| [How to upgrade to version 14](docs/02-pages/02-guides/upgrading/version-14.md) | When upgrading from Next.js 13 to 14 |

### 02-pages/03-building-your-application/ — How a Pages Router app is built

| Title and file path | When to read it |
| --- | --- |
| [Building Your Application](docs/02-pages/03-building-your-application/index.md) | Stub landing page; pick the subsection below |

#### 02-pages/03-building-your-application/01-routing/ — Routing

| Title and file path | When to read it |
| --- | --- |
| [Routing](docs/02-pages/03-building-your-application/01-routing/index.md) | When you need the routing model of `pages/` as a whole |
| [Pages and Layouts](docs/02-pages/03-building-your-application/01-routing/01-pages-and-layouts.md) | When creating a page or sharing a layout across pages |
| [Dynamic Routes](docs/02-pages/03-building-your-application/01-routing/02-dynamic-routes.md) | When creating `[param]` or catch-all routes in `pages/` |
| [Linking and Navigating](docs/02-pages/03-building-your-application/01-routing/03-linking-and-navigating.md) | When navigating with `<Link>` or the `useRouter` hook |
| [Custom App](docs/02-pages/03-building-your-application/01-routing/05-custom-app.md) | When `_app` must wrap every page with providers or a persistent layout |
| [Custom Document](docs/02-pages/03-building-your-application/01-routing/06-custom-document.md) | When `_document` must change the `<html>` or `<body>` markup |
| [API Routes](docs/02-pages/03-building-your-application/01-routing/07-api-routes.md) | When building an endpoint under `pages/api` |
| [Custom Errors](docs/02-pages/03-building-your-application/01-routing/08-custom-error.md) | When customizing the 404 or 500 pages |

#### 02-pages/03-building-your-application/02-rendering/ — Rendering strategies

| Title and file path | When to read it |
| --- | --- |
| [Rendering](docs/02-pages/03-building-your-application/02-rendering/index.md) | When choosing a rendering strategy for a page — read before the four pages below |
| [Server-side Rendering (SSR)](docs/02-pages/03-building-your-application/02-rendering/01-server-side-rendering.md) | When a page must render per request |
| [Static Site Generation (SSG)](docs/02-pages/03-building-your-application/02-rendering/02-static-site-generation.md) | When a page can be prerendered at build time |
| [Automatic Static Optimization](docs/02-pages/03-building-your-application/02-rendering/04-automatic-static-optimization.md) | When a page unexpectedly became static, or unexpectedly did not |
| [Client-side Rendering (CSR)](docs/02-pages/03-building-your-application/02-rendering/05-client-side-rendering.md) | When a page must render entirely in the browser |

#### 02-pages/03-building-your-application/03-data-fetching/ — Data fetching

| Title and file path | When to read it |
| --- | --- |
| [Data Fetching](docs/02-pages/03-building-your-application/03-data-fetching/index.md) | When choosing among the `getX` functions — read before the four pages below |
| [getStaticProps](docs/02-pages/03-building-your-application/03-data-fetching/01-get-static-props.md) | When fetching data at build time for a static page |
| [getStaticPaths](docs/02-pages/03-building-your-application/03-data-fetching/02-get-static-paths.md) | When prerendering dynamic routes and choosing a `fallback` mode |
| [getServerSideProps](docs/02-pages/03-building-your-application/03-data-fetching/03-get-server-side-props.md) | When data must be fetched on every request |
| [Client-side Fetching](docs/02-pages/03-building-your-application/03-data-fetching/05-client-side.md) | When data belongs in the browser, typically with SWR |

#### 02-pages/03-building-your-application/06-configuring/ — Configuring

| Title and file path | When to read it |
| --- | --- |
| [Configuring](docs/02-pages/03-building-your-application/06-configuring/index.md) | Stub landing page for this subsection |
| [Error Handling](docs/02-pages/03-building-your-application/06-configuring/12-error-handling.md) | When handling runtime errors in development and production in `pages/` |

### 02-pages/04-api-reference/ — Exact signatures and options

| Title and file path | When to read it |
| --- | --- |
| [API Reference](docs/02-pages/04-api-reference/index.md) | When you know the Pages Router feature but not which reference page documents it |
| [Edge Runtime](docs/02-pages/04-api-reference/06-edge.md) | When code must run on the Edge Runtime and you need the supported APIs |
| [Turbopack](docs/02-pages/04-api-reference/08-turbopack.md) | When the bundler itself is the subject: supported features and limitations |

#### 02-pages/04-api-reference/01-components/ — Built-in components

| Title and file path | When to read it |
| --- | --- |
| [Components](docs/02-pages/04-api-reference/01-components/index.md) | Stub landing page; pick the component below |
| [Font Module](docs/02-pages/04-api-reference/01-components/font.md) | When you need the `next/font` options in the Pages Router |
| [Form](docs/02-pages/04-api-reference/01-components/form.md) | When using `<Form>` for submissions or search-param updates |
| [Head](docs/02-pages/04-api-reference/01-components/head.md) | When adding tags to `<head>`, the Pages Router equivalent of the Metadata API |
| [Image](docs/02-pages/04-api-reference/01-components/image.md) | When you need every `next/image` prop in the Pages Router |
| [Image (Legacy)](docs/02-pages/04-api-reference/01-components/image-legacy.md) | Only when the code still imports `next/legacy/image` |
| [Link](docs/02-pages/04-api-reference/01-components/link.md) | When you need every `<Link>` prop in the Pages Router |
| [Script](docs/02-pages/04-api-reference/01-components/script.md) | When you need the `next/script` strategies |

#### 02-pages/04-api-reference/02-file-conventions/ — Special files and folders

| Title and file path | When to read it |
| --- | --- |
| [File-system conventions](docs/02-pages/04-api-reference/02-file-conventions/index.md) | When you need the catalog of special files in the Pages Router |
| [instrumentation.js](docs/02-pages/04-api-reference/02-file-conventions/instrumentation.md) | When you need the hooks of the server instrumentation file |
| [Proxy](docs/02-pages/04-api-reference/02-file-conventions/proxy.md) | When code must run before a request completes; replaces `middleware.js` |
| [public Folder](docs/02-pages/04-api-reference/02-file-conventions/public-folder.md) | When serving static assets straight from `public/` |
| [src Directory](docs/02-pages/04-api-reference/02-file-conventions/src-folder.md) | When `pages/` lives under `src/` |

#### 02-pages/04-api-reference/03-functions/ — Functions and hooks

| Title and file path | When to read it |
| --- | --- |
| [Functions](docs/02-pages/04-api-reference/03-functions/index.md) | When you know what you want to do but not which function does it |
| [catchError](docs/02-pages/04-api-reference/03-functions/catchError.md) | When a `try/catch` must not swallow Next.js control-flow errors |
| [getInitialProps](docs/02-pages/04-api-reference/03-functions/get-initial-props.md) | Only for legacy pages, `_app` or `_document`; it opts the whole app out of static optimization |
| [getServerSideProps](docs/02-pages/04-api-reference/03-functions/get-server-side-props.md) | When you need the exact signature, context object and return shape |
| [getStaticPaths](docs/02-pages/04-api-reference/03-functions/get-static-paths.md) | When you need the exact `paths` and `fallback` semantics |
| [getStaticProps](docs/02-pages/04-api-reference/03-functions/get-static-props.md) | When you need the exact context, `revalidate`, `notFound` and `redirect` options |
| [NextRequest](docs/02-pages/04-api-reference/03-functions/next-request.md) | When you need the request object API in the proxy or API Routes |
| [NextResponse](docs/02-pages/04-api-reference/03-functions/next-response.md) | When building responses, rewrites or redirects in the proxy |
| [useParams](docs/02-pages/04-api-reference/03-functions/use-params.md) | When reading dynamic route params from a component in `pages/` |
| [userAgent](docs/02-pages/04-api-reference/03-functions/userAgent.md) | When branching on device, browser or bot detection |
| [useReportWebVitals](docs/02-pages/04-api-reference/03-functions/use-report-web-vitals.md) | When sending Core Web Vitals or custom metrics to analytics |
| [useRouter](docs/02-pages/04-api-reference/03-functions/use-router.md) | When navigating programmatically or reading `query`, `asPath` and router events |
| [useSearchParams](docs/02-pages/04-api-reference/03-functions/use-search-params.md) | When reading the query string with the App Router-style hook inside `pages/` |

#### 02-pages/04-api-reference/04-config/ — Project configuration

| Title and file path | When to read it |
| --- | --- |
| [Configuration](docs/02-pages/04-api-reference/04-config/index.md) | Stub landing page; pick the config surface below |
| [TypeScript](docs/02-pages/04-api-reference/04-config/01-typescript.md) | When setting up TypeScript in a Pages Router project |
| [ESLint](docs/02-pages/04-api-reference/04-config/02-eslint.md) | When configuring ESLint during builds, or opting out of it |

##### 02-pages/04-api-reference/04-config/01-next-config-js/ — One page per `next.config.js` option

These are the Pages Router copies of the config reference. When the project uses `app/`, prefer the App Router pages above.

| Title and file path | When to read it |
| --- | --- |
| [next.config.js Options](docs/02-pages/04-api-reference/04-config/01-next-config-js/index.md) | When you need the list of options that apply to the Pages Router |
| [adapterPath](docs/02-pages/04-api-reference/04-config/01-next-config-js/adapterPath.md) | When pointing the build at a custom deployment adapter |
| [allowedDevOrigins](docs/02-pages/04-api-reference/04-config/01-next-config-js/allowedDevOrigins.md) | When the dev server rejects requests from another origin |
| [assetPrefix](docs/02-pages/04-api-reference/04-config/01-next-config-js/assetPrefix.md) | When static assets must be served from a CDN host |
| [basePath](docs/02-pages/04-api-reference/04-config/01-next-config-js/basePath.md) | When the app is served under a sub-path |
| [bundlePagesRouterDependencies](docs/02-pages/04-api-reference/04-config/01-next-config-js/bundlePagesRouterDependencies.md) | When Pages Router server dependencies should be bundled automatically |
| [compress](docs/02-pages/04-api-reference/04-config/01-next-config-js/compress.md) | When gzip must be disabled because a proxy already compresses |
| [crossOrigin](docs/02-pages/04-api-reference/04-config/01-next-config-js/crossOrigin.md) | When script tags from `next/script` and `next/head` need `crossOrigin` |
| [deploymentId](docs/02-pages/04-api-reference/04-config/01-next-config-js/deploymentId.md) | When protecting against version skew between deployments |
| [devIndicators](docs/02-pages/04-api-reference/04-config/01-next-config-js/devIndicators.md) | When the static-optimization indicator gets in the way |
| [distDir](docs/02-pages/04-api-reference/04-config/01-next-config-js/distDir.md) | When build output must go somewhere other than `.next` |
| [env](docs/02-pages/04-api-reference/04-config/01-next-config-js/env.md) | When inlining build-time environment values through the config file |
| [exportPathMap](docs/02-pages/04-api-reference/04-config/01-next-config-js/exportPathMap.md) | Only for legacy `next export` setups |
| [generateBuildId](docs/02-pages/04-api-reference/04-config/01-next-config-js/generateBuildId.md) | When multiple instances must share a stable build id |
| [generateEtags](docs/02-pages/04-api-reference/04-config/01-next-config-js/generateEtags.md) | When ETags must be disabled |
| [headers](docs/02-pages/04-api-reference/04-config/01-next-config-js/headers.md) | When adding security or caching headers declaratively |
| [httpAgentOptions](docs/02-pages/04-api-reference/04-config/01-next-config-js/httpAgentOptions.md) | When outbound HTTP Keep-Alive must be tuned or disabled |
| [images](docs/02-pages/04-api-reference/04-config/01-next-config-js/images.md) | When `next/image` rejects a remote host, or when configuring formats, sizes and loaders |
| [logging](docs/02-pages/04-api-reference/04-config/01-next-config-js/logging.md) | When you want more or less dev logging in the terminal |
| [onDemandEntries](docs/02-pages/04-api-reference/04-config/01-next-config-js/onDemandEntries.md) | When dev keeps disposing pages you are still working on |
| [optimizePackageImports](docs/02-pages/04-api-reference/04-config/01-next-config-js/optimizePackageImports.md) | When a barrel-file package bloats the bundle |
| [output](docs/02-pages/04-api-reference/04-config/01-next-config-js/output.md) | When producing a `standalone` server bundle or a static `export` |
| [pageExtensions](docs/02-pages/04-api-reference/04-config/01-next-config-js/pageExtensions.md) | When routes must resolve from non-default file extensions |
| [poweredByHeader](docs/02-pages/04-api-reference/04-config/01-next-config-js/poweredByHeader.md) | When the `x-powered-by` header must be removed |
| [productionBrowserSourceMaps](docs/02-pages/04-api-reference/04-config/01-next-config-js/productionBrowserSourceMaps.md) | When production stack traces must be readable |
| [experimental.proxyClientMaxBodySize](docs/02-pages/04-api-reference/04-config/01-next-config-js/proxyClientMaxBodySize.md) | When large uploads hit the proxy body-size limit |
| [reactStrictMode](docs/02-pages/04-api-reference/04-config/01-next-config-js/reactStrictMode.md) | When enabling Strict Mode, or when dev double-invocation is confusing you |
| [redirects](docs/02-pages/04-api-reference/04-config/01-next-config-js/redirects.md) | When redirects are static rules rather than runtime decisions |
| [rewrites](docs/02-pages/04-api-reference/04-config/01-next-config-js/rewrites.md) | When a URL must map elsewhere without changing the address bar |
| [serverExternalPackages](docs/02-pages/04-api-reference/04-config/01-next-config-js/serverExternalPackages.md) | When a server dependency breaks once bundled and must stay external |
| [skipProxyUrlNormalize](docs/02-pages/04-api-reference/04-config/01-next-config-js/skipProxyUrlNormalize.md) | When the proxy must see the raw URL |
| [skipTrailingSlashRedirect](docs/02-pages/04-api-reference/04-config/01-next-config-js/skipTrailingSlashRedirect.md) | When you handle trailing slashes yourself |
| [trailingSlash](docs/02-pages/04-api-reference/04-config/01-next-config-js/trailingSlash.md) | When URLs must consistently end with or without a slash |
| [transpilePackages](docs/02-pages/04-api-reference/04-config/01-next-config-js/transpilePackages.md) | When a local or external package ships untranspiled code |
| [turbopack](docs/02-pages/04-api-reference/04-config/01-next-config-js/turbopack.md) | When Turbopack needs loaders, aliases or resolve options |
| [turbopackChunking](docs/02-pages/04-api-reference/04-config/01-next-config-js/turbopackChunking.md) | When production chunking produces too many or too few bundles |
| [typescript](docs/02-pages/04-api-reference/04-config/01-next-config-js/typescript.md) | When the build must tolerate type errors |
| [urlImports](docs/02-pages/04-api-reference/04-config/01-next-config-js/urlImports.md) | When importing modules directly from a URL |
| [useLightningcss](docs/02-pages/04-api-reference/04-config/01-next-config-js/useLightningcss.md) | When processing CSS with Lightning CSS |
| [useTypeScriptCli](docs/02-pages/04-api-reference/04-config/01-next-config-js/useTypeScriptCli.md) | When production type checking must run the project's own `tsc` |
| [Custom Webpack Config](docs/02-pages/04-api-reference/04-config/01-next-config-js/webpack.md) | Only when the project still builds with webpack |
| [webVitalsAttribution](docs/02-pages/04-api-reference/04-config/01-next-config-js/webVitalsAttribution.md) | When a Web Vitals score is bad and you need the element that caused it |

#### 02-pages/04-api-reference/05-cli/ — Command line

| Title and file path | When to read it |
| --- | --- |
| [CLI](docs/02-pages/04-api-reference/05-cli/index.md) | Stub landing page; pick the command below |
| [create-next-app CLI](docs/02-pages/04-api-reference/05-cli/create-next-app.md) | When scaffolding a project and you need the flags or templates |
| [next CLI](docs/02-pages/04-api-reference/05-cli/next.md) | When you need the flags of `next dev`, `next build` or `next start` |

#### 02-pages/04-api-reference/06-adapters/ — Building a deployment adapter

Read this folder only when integrating Next.js into a hosting platform. Application code never needs it.

| Title and file path | When to read it |
| --- | --- |
| [Adapters](docs/02-pages/04-api-reference/06-adapters/index.md) | When starting an adapter and you need the overall picture |
| [Configuration](docs/02-pages/04-api-reference/06-adapters/01-configuration.md) | When wiring `adapterPath` or `NEXT_ADAPTER_PATH` |
| [Creating an Adapter](docs/02-pages/04-api-reference/06-adapters/02-creating-an-adapter.md) | When implementing the `NextAdapter` interface |
| [API Reference](docs/02-pages/04-api-reference/06-adapters/03-api-reference.md) | When you need the exact shape of `modifyConfig` and `onBuildComplete` |
| [Testing Adapters](docs/02-pages/04-api-reference/06-adapters/04-testing-adapters.md) | When validating an adapter against the compatibility test harness |
| [Routing with @next/routing](docs/02-pages/04-api-reference/06-adapters/05-routing-with-next-routing.md) | When the adapter must reproduce Next.js route matching |
| [Runtime Integration](docs/02-pages/04-api-reference/06-adapters/06-runtime-integration.md) | When connecting build-time adapter output to runtime cache interfaces |
| [Invoking Entrypoints](docs/02-pages/04-api-reference/06-adapters/07-invoking-entrypoints.md) | When the platform must invoke Node.js or Edge entrypoints |
| [Output Types](docs/02-pages/04-api-reference/06-adapters/08-output-types.md) | When interpreting the build output types exposed to adapters |
| [Routing Information](docs/02-pages/04-api-reference/06-adapters/09-routing-information.md) | When reading routing phases and route fields from `onBuildComplete` |
| [Use Cases](docs/02-pages/04-api-reference/06-adapters/10-use-cases.md) | When you want worked examples before designing your own adapter |

## 03-architecture/ — How Next.js works internally

Applies to both routers. Read it when you need to explain behavior rather than change code.

| Title and file path | When to read it |
| --- | --- |
| [Architecture](docs/03-architecture/index.md) | Stub landing page; pick the page below |
| [Accessibility](docs/03-architecture/accessibility.md) | When you need the accessibility behavior Next.js provides out of the box, such as route announcements |
| [Fast Refresh](docs/03-architecture/fast-refresh.md) | When edits trigger a full reload instead of preserving state, or when state resets unexpectedly in dev |
| [Next.js Compiler](docs/03-architecture/nextjs-compiler.md) | When you need the transforms the Rust compiler applies, and their options |
| [Supported Browsers](docs/03-architecture/supported-browsers.md) | When deciding which browsers and JavaScript features are safe to target |

## 04-community/ — Community and ecosystem

| Title and file path | When to read it |
| --- | --- |
| [Next.js Community](docs/04-community/index.md) | When looking for where to ask questions or report issues |
| [Docs Contribution Guide](docs/04-community/01-contribution-guide.md) | When contributing changes back to the Next.js documentation |
| [Rspack Integration](docs/04-community/02-rspack.md) | When bundling with `next-rspack` instead of Turbopack or webpack |
