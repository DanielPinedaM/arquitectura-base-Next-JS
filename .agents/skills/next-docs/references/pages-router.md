# Pages Router

Fundamentals, guides, routing, rendering and data fetching for `pages/`. Covers `docs/02-pages/` except its API reference.

Part of the `next-docs` skill. Open only the rows this task needs; paths are relative to this file.
## 02-pages/ — Pages Router

Only relevant when the code already lives in `pages/`, or when migrating away from it. For new code use the App Router above.

| Title and file path | When to read it |
| --- | --- |
| [Pages Router](../docs/02-pages/index.md) | When you need the short definition of the Pages Router and how it differs from `app/` |

### 02-pages/01-getting-started/ — Core concepts

| Title and file path | When to read it |
| --- | --- |
| [Getting Started - Pages Router](../docs/02-pages/01-getting-started/index.md) | When onboarding onto an existing Pages Router codebase |
| [Create a new Next.js application](../docs/02-pages/01-getting-started/01-installation.md) | When scaffolding a Pages Router app and configuring TypeScript, ESLint and `next.config.js` — **stub**: the body lives in [docs/01-app/01-getting-started/01-installation.md](../docs/01-app/01-getting-started/01-installation.md) |
| [Project Structure and Organization](../docs/02-pages/01-getting-started/02-project-structure.md) | Before adding folders or special files under `pages/` — **stub**: the body lives in [docs/01-app/01-getting-started/02-project-structure.md](../docs/01-app/01-getting-started/02-project-structure.md) |
| [Image Optimization](../docs/02-pages/01-getting-started/04-images.md) | When adding images with `next/image` in the Pages Router — **stub**: the body lives in [docs/01-app/01-getting-started/12-images.md](../docs/01-app/01-getting-started/12-images.md) |
| [How to use fonts](../docs/02-pages/01-getting-started/05-fonts.md) | When loading fonts in the Pages Router — **stub**: the body lives in [docs/01-app/01-getting-started/13-fonts.md](../docs/01-app/01-getting-started/13-fonts.md) |
| [How to use CSS in your application](../docs/02-pages/01-getting-started/06-css.md) | When setting up CSS Modules, global CSS or Tailwind in the Pages Router |
| [How to deploy your Next.js application](../docs/02-pages/01-getting-started/11-deploying.md) | When shipping a Pages Router app — **stub**: the body lives in [docs/01-app/01-getting-started/17-deploying.md](../docs/01-app/01-getting-started/17-deploying.md) |

### 02-pages/02-guides/ — Task-oriented guides

| Title and file path | When to read it |
| --- | --- |
| [Guides](../docs/02-pages/02-guides/index.md) | Landing page only; the rows below already cover its contents |
| [How to set up analytics](../docs/02-pages/02-guides/analytics.md) | When measuring page performance in the Pages Router — **stub**: the body lives in [docs/01-app/02-guides/analytics.md](../docs/01-app/02-guides/analytics.md) |
| [How to implement authentication in Next.js](../docs/02-pages/02-guides/authentication.md) | When building login, session management and route protection in `pages/` — **stub**: the body lives in [docs/01-app/02-guides/authentication.md](../docs/01-app/02-guides/authentication.md) |
| [How to configure Babel in Next.js](../docs/02-pages/02-guides/babel.md) | When the project still uses Babel and its preset must be extended |
| [How to configure Continuous Integration (CI) build caching](../docs/02-pages/02-guides/ci-build-caching.md) | When CI rebuilds everything from scratch — **stub**: the body lives in [docs/01-app/02-guides/ci-build-caching.md](../docs/01-app/02-guides/ci-build-caching.md) |
| [How to set a Content Security Policy (CSP)](../docs/02-pages/02-guides/content-security-policy.md) | When adding CSP headers or nonces in the Pages Router — **stub**: the body lives in [docs/01-app/02-guides/content-security-policy.md](../docs/01-app/02-guides/content-security-policy.md) |
| [How to use CSS-in-JS libraries](../docs/02-pages/02-guides/css-in-js.md) | When wiring styled-components or Emotion with `_document` — **stub**: the body lives in [docs/01-app/02-guides/css-in-js.md](../docs/01-app/02-guides/css-in-js.md) |
| [How to set up a custom server in Next.js](../docs/02-pages/02-guides/custom-server.md) | When Next.js must be started programmatically — **stub**: the body lives in [docs/01-app/02-guides/custom-server.md](../docs/01-app/02-guides/custom-server.md) |
| [How to use debugging tools with Next.js](../docs/02-pages/02-guides/debugging.md) | When attaching a debugger from VS Code or Chrome DevTools — **stub**: the body lives in [docs/01-app/02-guides/debugging.md](../docs/01-app/02-guides/debugging.md) |
| [How to preview content with Draft Mode](../docs/02-pages/02-guides/draft-mode.md) | When editors must preview unpublished content — the modern replacement for Preview Mode |
| [How to use environment variables in Next.js](../docs/02-pages/02-guides/environment-variables.md) | When adding env vars, or when one is `undefined` on the client — **stub**: the body lives in [docs/01-app/02-guides/environment-variables.md](../docs/01-app/02-guides/environment-variables.md) |
| [How to create forms with API Routes](../docs/02-pages/02-guides/forms.md) | When a form submits to an API Route, since `pages/` has no Server Actions |
| [How to implement Incremental Static Regeneration (ISR)](../docs/02-pages/02-guides/incremental-static-regeneration.md) | When static pages must refresh at runtime via `revalidate` — **stub**: the body lives in [docs/01-app/02-guides/incremental-static-regeneration.md](../docs/01-app/02-guides/incremental-static-regeneration.md) |
| [How to set up instrumentation](../docs/02-pages/02-guides/instrumentation.md) | When code must run once at server startup — **stub**: the body lives in [docs/01-app/02-guides/instrumentation.md](../docs/01-app/02-guides/instrumentation.md) |
| [How to implement internationalization in Next.js](../docs/02-pages/02-guides/internationalization.md) | When using the built-in i18n routing and locale detection of the Pages Router |
| [How to lazy load Client Components and libraries](../docs/02-pages/02-guides/lazy-loading.md) | When a heavy component or library inflates the bundle — **stub**: the body lives in [docs/01-app/02-guides/lazy-loading.md](../docs/01-app/02-guides/lazy-loading.md) |
| [How to use markdown and MDX in Next.js](../docs/02-pages/02-guides/mdx.md) | When rendering MDX content in the Pages Router — **stub**: the body lives in [docs/01-app/02-guides/mdx.md](../docs/01-app/02-guides/mdx.md) |
| [How to build micro-frontends using multi-zones](../docs/02-pages/02-guides/multi-zones.md) | When several Next.js apps must live under one domain — **stub**: the body lives in [docs/01-app/02-guides/multi-zones.md](../docs/01-app/02-guides/multi-zones.md) |
| [How to instrument your Next.js app with OpenTelemetry](../docs/02-pages/02-guides/open-telemetry.md) | When exporting traces to an observability backend — **stub**: the body lives in [docs/01-app/02-guides/open-telemetry.md](../docs/01-app/02-guides/open-telemetry.md) |
| [How to optimize package bundling](../docs/02-pages/02-guides/package-bundling.md) | When reducing server and client bundle size — **stub**: the body lives in [docs/01-app/02-guides/package-bundling.md](../docs/01-app/02-guides/package-bundling.md) |
| [How to configure PostCSS in Next.js](../docs/02-pages/02-guides/post-css.md) | When adding or reordering PostCSS plugins |
| [How to preview content with Preview Mode](../docs/02-pages/02-guides/preview-mode.md) | Only for legacy code; new work should use Draft Mode instead |
| [How to optimize your Next.js application for production](../docs/02-pages/02-guides/production-checklist.md) | As a pre-launch checklist — **stub**: the body lives in [docs/01-app/02-guides/production-checklist.md](../docs/01-app/02-guides/production-checklist.md) |
| [How to handle redirects in Next.js](../docs/02-pages/02-guides/redirecting.md) | When choosing between config redirects, `getServerSideProps` redirects and client navigation — **stub**: the body lives in [docs/01-app/02-guides/redirecting.md](../docs/01-app/02-guides/redirecting.md) |
| [How to use Sass in Next.js](../docs/02-pages/02-guides/sass.md) | When styling with Sass — **stub**: the body lives in [docs/01-app/02-guides/sass.md](../docs/01-app/02-guides/sass.md) |
| [How to load and optimize scripts](../docs/02-pages/02-guides/scripts.md) | When adding third-party scripts with `next/script` — **stub**: the body lives in [docs/01-app/02-guides/scripts.md](../docs/01-app/02-guides/scripts.md) |
| [How to self-host your Next.js application](../docs/02-pages/02-guides/self-hosting.md) | When deploying to your own server, Docker or static HTML — **stub**: the body lives in [docs/01-app/02-guides/self-hosting.md](../docs/01-app/02-guides/self-hosting.md) |
| [How to create a static export](../docs/02-pages/02-guides/static-exports.md) | When the output must be static files with no Node.js server — **stub**: the body lives in [docs/01-app/02-guides/static-exports.md](../docs/01-app/02-guides/static-exports.md) |
| [Tailwind CSS](../docs/02-pages/02-guides/tailwind-v3-css.md) | When setting up Tailwind in the Pages Router — **stub**: the body lives in [docs/01-app/02-guides/tailwind-v3-css.md](../docs/01-app/02-guides/tailwind-v3-css.md) |
| [How to optimize third-party libraries](../docs/02-pages/02-guides/third-party-libraries.md) | When embedding analytics, maps or widgets through `@next/third-parties` — **stub**: the body lives in [docs/01-app/02-guides/third-party-libraries.md](../docs/01-app/02-guides/third-party-libraries.md) |

#### 02-pages/02-guides/migrating/ — Coming from another stack

| Title and file path | When to read it |
| --- | --- |
| [Migrating](../docs/02-pages/02-guides/migrating/index.md) | Landing page only; pick the specific migration below |
| [How to migrate from Pages to the App Router](../docs/02-pages/02-guides/migrating/app-router-migration.md) | When moving this codebase from `pages/` to `app/` — **stub**: the body lives in [docs/01-app/02-guides/migrating/app-router-migration.md](../docs/01-app/02-guides/migrating/app-router-migration.md) |
| [How to migrate from Create React App to Next.js](../docs/02-pages/02-guides/migrating/from-create-react-app.md) | When porting a CRA codebase into the Pages Router — **stub**: the body lives in [docs/01-app/02-guides/migrating/from-create-react-app.md](../docs/01-app/02-guides/migrating/from-create-react-app.md) |
| [How to migrate from Vite to Next.js](../docs/02-pages/02-guides/migrating/from-vite.md) | When porting a Vite codebase into the Pages Router — **stub**: the body lives in [docs/01-app/02-guides/migrating/from-vite.md](../docs/01-app/02-guides/migrating/from-vite.md) |

#### 02-pages/02-guides/testing/ — Test tooling setup

| Title and file path | When to read it |
| --- | --- |
| [Testing](../docs/02-pages/02-guides/testing/index.md) | When choosing a test tool for a Pages Router project — **stub**: the body lives in [docs/01-app/02-guides/testing/index.md](../docs/01-app/02-guides/testing/index.md) |
| [How to set up Cypress with Next.js](../docs/02-pages/02-guides/testing/cypress.md) | When configuring Cypress for E2E or component tests — **stub**: the body lives in [docs/01-app/02-guides/testing/cypress.md](../docs/01-app/02-guides/testing/cypress.md) |
| [How to set up Jest with Next.js](../docs/02-pages/02-guides/testing/jest.md) | When configuring Jest for unit tests — **stub**: the body lives in [docs/01-app/02-guides/testing/jest.md](../docs/01-app/02-guides/testing/jest.md) |
| [How to set up Playwright with Next.js](../docs/02-pages/02-guides/testing/playwright.md) | When configuring Playwright for E2E and integration tests — **stub**: the body lives in [docs/01-app/02-guides/testing/playwright.md](../docs/01-app/02-guides/testing/playwright.md) |
| [How to set up Vitest with Next.js](../docs/02-pages/02-guides/testing/vitest.md) | When configuring Vitest with React Testing Library — **stub**: the body lives in [docs/01-app/02-guides/testing/vitest.md](../docs/01-app/02-guides/testing/vitest.md) |

#### 02-pages/02-guides/upgrading/ — Version upgrades

| Title and file path | When to read it |
| --- | --- |
| [Upgrading](../docs/02-pages/02-guides/upgrading/index.md) | When planning an upgrade of an older Pages Router app |
| [Codemods](../docs/02-pages/02-guides/upgrading/codemods.md) | When an upgrade requires mechanical changes a codemod can automate — **stub**: the body lives in [docs/01-app/02-guides/upgrading/codemods.md](../docs/01-app/02-guides/upgrading/codemods.md) |
| [How to upgrade to version 9](../docs/02-pages/02-guides/upgrading/version-9.md) | When upgrading from Next.js 8 to 9 |
| [How to upgrade to version 10](../docs/02-pages/02-guides/upgrading/version-10.md) | When upgrading from Next.js 9 to 10 |
| [How to upgrade to version 11](../docs/02-pages/02-guides/upgrading/version-11.md) | When upgrading from Next.js 10 to 11 |
| [How to upgrade to version 12](../docs/02-pages/02-guides/upgrading/version-12.md) | When upgrading from Next.js 11 to 12 |
| [How to upgrade to version 13](../docs/02-pages/02-guides/upgrading/version-13.md) | When upgrading from Next.js 12 to 13 |
| [How to upgrade to version 14](../docs/02-pages/02-guides/upgrading/version-14.md) | When upgrading from Next.js 13 to 14 — **stub**: the body lives in [docs/01-app/02-guides/upgrading/version-14.md](../docs/01-app/02-guides/upgrading/version-14.md) |

### 02-pages/03-building-your-application/ — How a Pages Router app is built

| Title and file path | When to read it |
| --- | --- |
| [Building Your Application](../docs/02-pages/03-building-your-application/index.md) | Landing page only; pick the subsection below |

#### 02-pages/03-building-your-application/01-routing/ — Routing

| Title and file path | When to read it |
| --- | --- |
| [Routing](../docs/02-pages/03-building-your-application/01-routing/index.md) | When you need the routing model of `pages/` as a whole |
| [Pages and Layouts](../docs/02-pages/03-building-your-application/01-routing/01-pages-and-layouts.md) | When creating a page or sharing a layout across pages |
| [Dynamic Routes](../docs/02-pages/03-building-your-application/01-routing/02-dynamic-routes.md) | When creating `[param]` or catch-all routes in `pages/` |
| [Linking and Navigating](../docs/02-pages/03-building-your-application/01-routing/03-linking-and-navigating.md) | When navigating with `<Link>` or the `useRouter` hook |
| [Custom App](../docs/02-pages/03-building-your-application/01-routing/05-custom-app.md) | When `_app` must wrap every page with providers or a persistent layout |
| [Custom Document](../docs/02-pages/03-building-your-application/01-routing/06-custom-document.md) | When `_document` must change the `<html>` or `<body>` markup |
| [API Routes](../docs/02-pages/03-building-your-application/01-routing/07-api-routes.md) | When building an endpoint under `pages/api` |
| [Custom Errors](../docs/02-pages/03-building-your-application/01-routing/08-custom-error.md) | When customizing the 404 or 500 pages |

#### 02-pages/03-building-your-application/02-rendering/ — Rendering strategies

| Title and file path | When to read it |
| --- | --- |
| [Rendering](../docs/02-pages/03-building-your-application/02-rendering/index.md) | When choosing a rendering strategy for a page — read before the four pages below |
| [Server-side Rendering (SSR)](../docs/02-pages/03-building-your-application/02-rendering/01-server-side-rendering.md) | When a page must render per request |
| [Static Site Generation (SSG)](../docs/02-pages/03-building-your-application/02-rendering/02-static-site-generation.md) | When a page can be prerendered at build time |
| [Automatic Static Optimization](../docs/02-pages/03-building-your-application/02-rendering/04-automatic-static-optimization.md) | When a page unexpectedly became static, or unexpectedly did not |
| [Client-side Rendering (CSR)](../docs/02-pages/03-building-your-application/02-rendering/05-client-side-rendering.md) | When a page must render entirely in the browser |

#### 02-pages/03-building-your-application/03-data-fetching/ — Data fetching

| Title and file path | When to read it |
| --- | --- |
| [Data Fetching](../docs/02-pages/03-building-your-application/03-data-fetching/index.md) | When choosing among the `getX` functions — read before the four pages below |
| [getStaticProps](../docs/02-pages/03-building-your-application/03-data-fetching/01-get-static-props.md) | When fetching data at build time for a static page |
| [getStaticPaths](../docs/02-pages/03-building-your-application/03-data-fetching/02-get-static-paths.md) | When prerendering dynamic routes and choosing a `fallback` mode |
| [getServerSideProps](../docs/02-pages/03-building-your-application/03-data-fetching/03-get-server-side-props.md) | When data must be fetched on every request |
| [Client-side Fetching](../docs/02-pages/03-building-your-application/03-data-fetching/05-client-side.md) | When data belongs in the browser, typically with SWR |

#### 02-pages/03-building-your-application/06-configuring/ — Configuring

| Title and file path | When to read it |
| --- | --- |
| [Configuring](../docs/02-pages/03-building-your-application/06-configuring/index.md) | Landing page only for this subsection |
| [Error Handling](../docs/02-pages/03-building-your-application/06-configuring/12-error-handling.md) | When handling runtime errors in development and production in `pages/` |

