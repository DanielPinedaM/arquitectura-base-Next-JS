# App Router — fundamentals

Installation, project structure and the core concepts of `app/`, in the order you meet them. Covers `docs/01-app/` and `docs/01-app/01-getting-started/`.

Part of the `next-docs` skill. Open only the rows this task needs; paths are relative to this file.
## 01-app/ — App Router

| Title and file path | When to read it |
| --- | --- |
| [App Router](../docs/01-app/index.md) | When deciding whether a task belongs to the App Router at all, or when you need the one-paragraph definition of what `app/` is |
| [Next.js Glossary](../docs/01-app/04-glossary.md) | When a Next.js term (prerendering, App Shell, dynamic hole, revalidation, PPR) appears and you are not certain what it means |

### 01-app/01-getting-started/ — Core concepts, in the order you meet them

| Title and file path | When to read it |
| --- | --- |
| [Getting Started](../docs/01-app/01-getting-started/index.md) | When you need the reading order of the fundamentals, or are onboarding onto the App Router from scratch |
| [Installation](../docs/01-app/01-getting-started/01-installation.md) | When scaffolding a new app with `create-next-app`, or wiring TypeScript, ESLint and path aliases for the first time |
| [Project structure and organization](../docs/01-app/01-getting-started/02-project-structure.md) | Before creating a new folder or special file, or when deciding where colocated components, tests and utilities may live |
| [Layouts and Pages](../docs/01-app/01-getting-started/03-layouts-and-pages.md) | When creating a route, a nested layout, or a dynamic segment for the first time |
| [Linking and Navigating](../docs/01-app/01-getting-started/04-linking-and-navigating.md) | When navigation feels slow, or before tuning prefetching, prerendering and client-side transitions |
| [Server and Client Components](../docs/01-app/01-getting-started/05-server-and-client-components.md) | Before adding `'use client'`, or when unsure which side a component runs on and what it may import |
| [Fetching Data](../docs/01-app/01-getting-started/06-fetching-data.md) | When loading data for a page, streaming with `Suspense`, or choosing between fetching on the server and on the client |
| [Mutating Data](../docs/01-app/01-getting-started/07-mutating-data.md) | When writing data from a form or an event handler through Server Functions |
| [Caching](../docs/01-app/01-getting-started/08-caching.md) | When a value is stale or unexpectedly shared between users, or before adding `use cache`. Documents the **Cache Components** model: check `cacheComponents` in `next.config.js` first — if it is off, the page that applies is **Caching and Revalidating (Previous Model)** in [app-router-guides.md](app-router-guides.md) |
| [Revalidating](../docs/01-app/01-getting-started/09-revalidating.md) | When cached content must refresh on a schedule or right after a mutation. Same Cache Components caveat as the row above. Its `related:` frontmatter links straight to `cacheLife`, `cacheTag`, `revalidateTag`, `updateTag` and `revalidatePath` |
| [Error Handling](../docs/01-app/01-getting-started/10-error-handling.md) | When adding `error.js`, distinguishing expected errors from uncaught exceptions, or surfacing failures to the user |
| [CSS](../docs/01-app/01-getting-started/11-css.md) | When setting up styling: Tailwind, CSS Modules, global stylesheets or external packages |
| [Image Optimization](../docs/01-app/01-getting-started/12-images.md) | When adding images and you need the `next/image` basics before the full API — also the shortest path to `remotePatterns` when a remote hostname is rejected |
| [Font Optimization](../docs/01-app/01-getting-started/13-fonts.md) | When loading Google or local fonts without layout shift |
| [Metadata and OG images](../docs/01-app/01-getting-started/14-metadata-and-og-images.md) | When adding titles, descriptions, favicons or social preview images |
| [Route Handlers](../docs/01-app/01-getting-started/15-route-handlers.md) | When building an HTTP endpoint inside `app/` with `route.ts` |
| [Proxy](../docs/01-app/01-getting-started/16-proxy.md) | When code must run before a request completes: rewrites, redirects, header changes, auth gates |
| [Deploying](../docs/01-app/01-getting-started/17-deploying.md) | When shipping the app, or comparing managed hosting, self-hosting and static export |
| [Upgrading](../docs/01-app/01-getting-started/18-upgrading.md) | When moving to a newer Next.js release or trying a canary build |

