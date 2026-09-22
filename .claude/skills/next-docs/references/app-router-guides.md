# App Router — guides

Task-oriented how-to guides, plus client-side data fetching, migrations from other stacks, testing setup and version upgrades. Covers `docs/01-app/02-guides/`.

Part of the `next-docs` skill. Open only the rows this task needs; paths are relative to this file.
## 01-app/02-guides/ — Task-oriented guides

| Title and file path | When to read it |
| --- | --- |
| [Guides](../docs/01-app/02-guides/index.md) | Landing page only; the rows below already cover its contents |
| [Adopting Partial Prefetching](../docs/01-app/02-guides/adopting-partial-prefetching.md) | When enabling Partial Prefetching and you need to know what changes for `<Link>` |
| [How to set up your Next.js project for AI coding agents](../docs/01-app/02-guides/ai-agents.md) | When configuring the repo so coding agents read current docs instead of stale training data |
| [How to add analytics to your Next.js application](../docs/01-app/02-guides/analytics.md) | When measuring page performance or wiring Speed Insights |
| [How to implement authentication in Next.js](../docs/01-app/02-guides/authentication.md) | When building login, sessions or route protection — start here before writing any auth code |
| [How to implement authentication with Cache Components](../docs/01-app/02-guides/authentication-with-cache-components.md) | When Cache Components is enabled and session-dependent UI must not slow the page down or leak between users |
| [How to use Next.js as a backend for your frontend](../docs/01-app/02-guides/backend-for-frontend.md) | When Next.js itself is the API layer, not just the UI |
| [Building your application](../docs/01-app/02-guides/building.md) | When `next build` output is confusing, or you need to read which routes came out static and which dynamic |
| [Caching and Revalidating (Previous Model)](../docs/01-app/02-guides/caching-without-cache-components.md) | When the project does **not** use Cache Components and relies on `fetch` options, `unstable_cache` or route segment config |
| [Using a CDN with Next.js](../docs/01-app/02-guides/cdn-caching.md) | When a CDN sits in front of the app and responses are cached or varied incorrectly |
| [How to configure Continuous Integration (CI) build caching](../docs/01-app/02-guides/ci-build-caching.md) | When CI rebuilds everything from scratch and builds are slow |
| [How to set a Content Security Policy (CSP)](../docs/01-app/02-guides/content-security-policy.md) | When adding CSP headers or nonces, especially with inline scripts and styles |
| [How to use CSS-in-JS libraries](../docs/01-app/02-guides/css-in-js.md) | When integrating styled-components, Emotion or similar with Server Components |
| [How to set up a custom server in Next.js](../docs/01-app/02-guides/custom-server.md) | When Next.js must be started programmatically instead of through the CLI, and to learn what you lose by doing so |
| [How to think about data security in Next.js](../docs/01-app/02-guides/data-security.md) | Before exposing data through Server Components or Server Actions; covers tainting and accidental client leaks |
| [How to use debugging tools with Next.js](../docs/01-app/02-guides/debugging.md) | When attaching a debugger from VS Code, Chrome or Firefox DevTools |
| [Deploying Next.js to different platforms](../docs/01-app/02-guides/deploying-to-platforms.md) | When choosing a host and you need to know which features require which platform capabilities |
| [How to preview content with Draft Mode](../docs/01-app/02-guides/draft-mode.md) | When editors must preview unpublished CMS content by bypassing the cache |
| [How to use environment variables in Next.js](../docs/01-app/02-guides/environment-variables.md) | When adding env vars, or when a variable is `undefined` on the client or at build time |
| [How to create forms with Server Actions](../docs/01-app/02-guides/forms.md) | When a form submits through a Server Function, including validation errors and pending state |
| [How revalidation works in Next.js](../docs/01-app/02-guides/how-revalidation-works.md) | When revalidation misbehaves and you need the tag system, cache consistency and multi-instance details |
| [How to implement Incremental Static Regeneration (ISR)](../docs/01-app/02-guides/incremental-static-regeneration.md) | When static pages must be created or refreshed at runtime |
| [Incremental Static Regeneration with Cache Components](../docs/01-app/02-guides/incremental-static-regeneration-cache-components.md) | When doing ISR with Cache Components enabled: prerendering a subset of dynamic routes and serving App Shells |
| [Ensuring instant navigations](../docs/01-app/02-guides/instant-navigation.md) | When navigations are not instant and the app must be restructured for prefetching and prerendering |
| [How to set up instrumentation](../docs/01-app/02-guides/instrumentation.md) | When code must run once at server startup |
| [Building interactive apps](../docs/01-app/02-guides/interactive-apps.md) | When building responsive interactions: transitions, optimistic UI and pending feedback |
| [Internationalization](../docs/01-app/02-guides/internationalization.md) | When adding multiple languages, locale routing or localized content |
| [How to implement JSON-LD](../docs/01-app/02-guides/json-ld.md) | When adding structured data for search engines and AI crawlers |
| [How to lazy load Client Components and libraries](../docs/01-app/02-guides/lazy-loading.md) | When a heavy component or library inflates the client bundle |
| [How to optimize your local development environment](../docs/01-app/02-guides/local-development.md) | When `next dev` is slow or recompiles too much |
| [Enabling Next.js MCP Server for Coding Agents](../docs/01-app/02-guides/mcp.md) | When giving a coding agent live access to the running application state |
| [How to use markdown and MDX in Next.js](../docs/01-app/02-guides/mdx.md) | When rendering `.md` or `.mdx` content as pages or components |
| [How to optimize memory usage](../docs/01-app/02-guides/memory-usage.md) | When the dev server or the production process runs out of memory |
| [Migrating to Cache Components](../docs/01-app/02-guides/migrating-to-cache-components.md) | When converting route segment config into Cache Components |
| [How to build multi-tenant apps in Next.js](../docs/01-app/02-guides/multi-tenant.md) | When one deployment serves many tenants by domain or path |
| [How to build micro-frontends using multi-zones](../docs/01-app/02-guides/multi-zones.md) | When several independent Next.js apps must live under one domain |
| [Handling connectivity drops](../docs/01-app/02-guides/offline-support.md) | When the network can fail mid-fetch or mid-Server Action and the UI must recover |
| [How to set up instrumentation with OpenTelemetry](../docs/01-app/02-guides/open-telemetry.md) | When exporting traces and spans to an observability backend |
| [Optimizing prefetching](../docs/01-app/02-guides/optimizing-prefetching.md) | When tuning the `prefetch` prop per link, or putting session data in the App Shell |
| [Optimizing package bundling](../docs/01-app/02-guides/package-bundling.md) | When analyzing bundle size with the Turbopack or webpack bundle analyzer |
| [Implementing Partial Prerendering on your platform](../docs/01-app/02-guides/ppr-platform-guide.md) | Only when building PPR support into a hosting platform or CDN, not when building an app |
| [Prefetching](../docs/01-app/02-guides/prefetching.md) | When you need the conceptual model of prefetching before changing any link |
| [How Next.js preserves UI state with Activity](../docs/01-app/02-guides/preserving-ui-state.md) | When UI state unexpectedly resets, or fails to reset, across navigations |
| [How to prevent flash before hydration](../docs/01-app/02-guides/preventing-flash-before-hydration.md) | When a theme or locale flashes the wrong value before the page hydrates |
| [How to optimize your Next.js application for production](../docs/01-app/02-guides/production-checklist.md) | As a pre-launch checklist before shipping |
| [How to build a Progressive Web Application (PWA)](../docs/01-app/02-guides/progressive-web-apps.md) | When adding a manifest, service worker, installability or push notifications |
| [Building public pages](../docs/01-app/02-guides/public-static-pages.md) | When building landing, marketing, blog or listing pages whose data is shared across users |
| [How to handle redirects in Next.js](../docs/01-app/02-guides/redirecting.md) | When choosing between `redirect()`, `next.config.js` redirects, proxy redirects and client navigation |
| [Next.js Rendering Philosophy](../docs/01-app/02-guides/rendering-philosophy.md) | When you need the reasoning behind static and dynamic as a per-component spectrum, before making architectural decisions |
| [How to use Sass](../docs/01-app/02-guides/sass.md) | When styling with `.scss` or `.sass` |
| [How to load and optimize scripts](../docs/01-app/02-guides/scripts.md) | When adding third-party scripts and choosing a loading strategy |
| [How to self-host your Next.js application](../docs/01-app/02-guides/self-hosting.md) | When deploying to your own Node.js server, a Docker image or static HTML |
| [Server Actions and Mutations](../docs/01-app/02-guides/server-actions.md) | When you need the deep model of Server Actions: response roundtrip, sequential dispatch, security and cache integration |
| [The Server and Client Boundary](../docs/01-app/02-guides/server-and-client-boundary.md) | When a module crosses the boundary and imports, props or serialization break |
| [How to build single-page applications with Next.js](../docs/01-app/02-guides/single-page-applications.md) | When the product is an SPA and you want Next.js without per-route server rendering |
| [How to create a static export](../docs/01-app/02-guides/static-exports.md) | When the output must be plain HTML, CSS and JS with no Node.js server |
| [Streaming](../docs/01-app/02-guides/streaming.md) | When rendering UI progressively as data resolves, with `Suspense` and `loading.js` |
| [How to install Tailwind CSS v3](../docs/01-app/02-guides/tailwind-v3-css.md) | Only when pinned to Tailwind v3 for browser-support reasons; otherwise use the CSS page |
| [How to optimize third-party libraries](../docs/01-app/02-guides/third-party-libraries.md) | When embedding analytics, maps or widgets through `@next/third-parties` |
| [How to use and optimize videos](../docs/01-app/02-guides/videos.md) | When self-hosting or embedding video |
| [Designing view transitions](../docs/01-app/02-guides/view-transitions.md) | When animating between routes or content states with View Transitions |

### 01-app/02-guides/client-side-data-fetching/ — Fetching from Client Components

| Title and file path | When to read it |
| --- | --- |
| [Client-side data fetching](../docs/01-app/02-guides/client-side-data-fetching/index.md) | When deciding whether data belongs on the client at all, and how to seed it from a Server Component |
| [How to fetch client-side data with SWR](../docs/01-app/02-guides/client-side-data-fetching/swr.md) | When the project uses SWR and server and client caches must stay coordinated |
| [How to fetch client-side data with TanStack Query](../docs/01-app/02-guides/client-side-data-fetching/tanstack-query.md) | When the project uses TanStack Query and server and client caches must stay coordinated |

### 01-app/02-guides/migrating/ — Coming from another stack

| Title and file path | When to read it |
| --- | --- |
| [Migrating](../docs/01-app/02-guides/migrating/index.md) | Landing page only; pick the specific migration below |
| [How to migrate from Pages to the App Router](../docs/01-app/02-guides/migrating/app-router-migration.md) | When moving an existing `pages/` app to `app/`, incrementally or wholesale |
| [How to migrate from Create React App to Next.js](../docs/01-app/02-guides/migrating/from-create-react-app.md) | When porting a CRA codebase into Next.js |
| [How to migrate from Vite to Next.js](../docs/01-app/02-guides/migrating/from-vite.md) | When porting a Vite + React codebase into Next.js |

### 01-app/02-guides/testing/ — Test tooling setup

| Title and file path | When to read it |
| --- | --- |
| [Testing](../docs/01-app/02-guides/testing/index.md) | When choosing a test tool: it compares unit, component, integration and E2E testing and warns about `async` Server Components |
| [How to set up Cypress with Next.js](../docs/01-app/02-guides/testing/cypress.md) | When configuring Cypress for E2E or component tests |
| [How to set up Jest with Next.js](../docs/01-app/02-guides/testing/jest.md) | When configuring Jest for unit and snapshot tests |
| [How to set up Playwright with Next.js](../docs/01-app/02-guides/testing/playwright.md) | When configuring Playwright for E2E tests |
| [How to set up Vitest with Next.js](../docs/01-app/02-guides/testing/vitest.md) | When configuring Vitest for unit tests |

### 01-app/02-guides/upgrading/ — Version upgrades

| Title and file path | When to read it |
| --- | --- |
| [Upgrade Guides](../docs/01-app/02-guides/upgrading/index.md) | When planning an upgrade and you need to know which version guides apply |
| [Codemods](../docs/01-app/02-guides/upgrading/codemods.md) | When an upgrade requires mechanical code changes that a codemod can automate |
| [How to upgrade to version 14](../docs/01-app/02-guides/upgrading/version-14.md) | When upgrading from Next.js 13 to 14 |
| [How to upgrade to version 15](../docs/01-app/02-guides/upgrading/version-15.md) | When upgrading from Next.js 14 to 15 |
| [How to upgrade to version 16](../docs/01-app/02-guides/upgrading/version-16.md) | When upgrading from Next.js 15 to 16 — also the fastest way to see what 16 broke or renamed |

