# App Router — API reference

Directives, built-in components, file-system conventions, metadata files, route segment config, functions and hooks. Covers `docs/01-app/03-api-reference/` except configuration, CLI and adapters.

Part of the `next-docs` skill. Open only the rows this task needs; paths are relative to this file.
## 01-app/03-api-reference/ — Exact signatures and options

| Title and file path | When to read it |
| --- | --- |
| [API Reference](../docs/01-app/03-api-reference/index.md) | When you know the feature but not which reference page documents it |
| [Edge Runtime](../docs/01-app/03-api-reference/07-edge.md) | When code must run on the Edge Runtime and you need the list of supported APIs |
| [Turbopack](../docs/01-app/03-api-reference/08-turbopack.md) | When the bundler itself is the subject: supported features, unsupported ones, known limitations |

### 01-app/03-api-reference/01-directives/ — The `'use ...'` strings

| Title and file path | When to read it |
| --- | --- |
| [Directives](../docs/01-app/03-api-reference/01-directives/index.md) | When comparing the directives before choosing one |
| [use cache](../docs/01-app/03-api-reference/01-directives/use-cache.md) | Before caching a function, component or route with `'use cache'` |
| [use cache: private](../docs/01-app/03-api-reference/01-directives/use-cache-private.md) | When caching something that reads request APIs such as cookies or headers, and must stay per-user |
| [use cache: remote](../docs/01-app/03-api-reference/01-directives/use-cache-remote.md) | When the cache must be shared and persistent across instances through a remote cache handler |
| [use client](../docs/01-app/03-api-reference/01-directives/use-client.md) | Before adding `'use client'`, to know exactly where the boundary lands |
| [use server](../docs/01-app/03-api-reference/01-directives/use-server.md) | Before declaring a Server Function, at file level or inline |

### 01-app/03-api-reference/02-components/ — Built-in components

| Title and file path | When to read it |
| --- | --- |
| [Components](../docs/01-app/03-api-reference/02-components/index.md) | Landing page only; pick the component below |
| [Font Module](../docs/01-app/03-api-reference/02-components/font.md) | When you need the full `next/font` options for Google or local fonts |
| [Form Component](../docs/01-app/03-api-reference/02-components/form.md) | When using `<Form>` for submissions or search-param updates with client-side navigation |
| [Image Component](../docs/01-app/03-api-reference/02-components/image.md) | When you need every `next/image` prop and every `images` key of `next.config.js`: sizes, placeholders, priority, qualities, and `remotePatterns` — this is where a rejected remote hostname is fixed, not in the config reference |
| [Link Component](../docs/01-app/03-api-reference/02-components/link.md) | When you need every `next/link` prop, especially `prefetch`, `replace` and `scroll` |
| [Script Component](../docs/01-app/03-api-reference/02-components/script.md) | When you need the `next/script` strategies and event handlers |

### 01-app/03-api-reference/03-file-conventions/ — Special files and folders

| Title and file path | When to read it |
| --- | --- |
| [File-system conventions](../docs/01-app/03-api-reference/03-file-conventions/index.md) | When you need the full catalog of special files before creating one |
| [default.js](../docs/01-app/03-api-reference/03-file-conventions/default.md) | When a parallel route needs a fallback slot on hard navigation |
| [Dynamic Route Segments](../docs/01-app/03-api-reference/03-file-conventions/dynamic-routes.md) | When creating `[param]`, `[...slug]` or `[[...slug]]` routes and reading their values |
| [error.js](../docs/01-app/03-api-reference/03-file-conventions/error.md) | When adding an error boundary to a segment, with `reset()` |
| [forbidden.js](../docs/01-app/03-api-reference/03-file-conventions/forbidden.md) | When rendering the 403 UI triggered by `forbidden()` |
| [instrumentation.js](../docs/01-app/03-api-reference/03-file-conventions/instrumentation.md) | When you need the exact hooks of the server-side instrumentation file |
| [instrumentation-client.js](../docs/01-app/03-api-reference/03-file-conventions/instrumentation-client.md) | When adding client-side monitoring that must run before the app boots |
| [Intercepting Routes](../docs/01-app/03-api-reference/03-file-conventions/intercepting-routes.md) | When a route must render inside the current layout while the URL changes — the modal pattern |
| [layout.js](../docs/01-app/03-api-reference/03-file-conventions/layout.md) | When writing a layout and you need its props, caveats and what it may not do |
| [loading.js](../docs/01-app/03-api-reference/03-file-conventions/loading.md) | When adding an automatic `Suspense` fallback to a segment |
| [mdx-components.js](../docs/01-app/03-api-reference/03-file-conventions/mdx-components.md) | When overriding the components MDX renders |
| [middleware.js](../docs/01-app/03-api-reference/03-file-conventions/middleware.md) | Only for legacy code: this file is deprecated and renamed to `proxy.js`. Read it to migrate away |
| [not-found.js](../docs/01-app/03-api-reference/03-file-conventions/not-found.md) | When rendering the 404 UI triggered by `notFound()` or by an unmatched URL |
| [page.js](../docs/01-app/03-api-reference/03-file-conventions/page.md) | When writing a page and you need its props, including `params` and `searchParams` |
| [Parallel Routes](../docs/01-app/03-api-reference/03-file-conventions/parallel-routes.md) | When one view must render several independently navigable pages through named slots |
| [proxy.js](../docs/01-app/03-api-reference/03-file-conventions/proxy.md) | When writing the proxy file: matchers, request rewriting, headers, redirects. This replaces `middleware.js` |
| [public Folder](../docs/01-app/03-api-reference/03-file-conventions/public-folder.md) | When serving static assets straight from `public/` |
| [route.js](../docs/01-app/03-api-reference/03-file-conventions/route.md) | When writing a Route Handler and you need the supported HTTP methods and their signatures |
| [Route Groups](../docs/01-app/03-api-reference/03-file-conventions/route-groups.md) | When organizing folders with `(group)` without affecting the URL |
| [src Folder](../docs/01-app/03-api-reference/03-file-conventions/src-folder.md) | When the app lives under `src/` and you need the resolution rules |
| [template.js](../docs/01-app/03-api-reference/03-file-conventions/template.md) | When a layout must remount on every navigation instead of persisting |
| [unauthorized.js](../docs/01-app/03-api-reference/03-file-conventions/unauthorized.md) | When rendering the 401 UI triggered by `unauthorized()` |

#### 01-app/03-api-reference/03-file-conventions/01-metadata/ — Metadata files

| Title and file path | When to read it |
| --- | --- |
| [Metadata Files API Reference](../docs/01-app/03-api-reference/03-file-conventions/01-metadata/index.md) | When you need the catalog of metadata file conventions before adding one |
| [favicon, icon, and apple-icon](../docs/01-app/03-api-reference/03-file-conventions/01-metadata/app-icons.md) | When adding favicons or app icons, statically or generated in code |
| [manifest.json](../docs/01-app/03-api-reference/03-file-conventions/01-metadata/manifest.md) | When adding a web app manifest, typically for a PWA |
| [opengraph-image and twitter-image](../docs/01-app/03-api-reference/03-file-conventions/01-metadata/opengraph-image.md) | When producing social preview images, static or generated per route |
| [robots.txt](../docs/01-app/03-api-reference/03-file-conventions/01-metadata/robots.md) | When controlling what crawlers may index |
| [sitemap.xml](../docs/01-app/03-api-reference/03-file-conventions/01-metadata/sitemap.md) | When emitting a sitemap, static or generated from data |

#### 01-app/03-api-reference/03-file-conventions/02-route-segment-config/ — Per-segment exports

| Title and file path | When to read it |
| --- | --- |
| [Route Segment Config](../docs/01-app/03-api-reference/03-file-conventions/02-route-segment-config/index.md) | When you need the list of config exports a segment accepts, and which ones Cache Components replaces |
| [dynamicParams](../docs/01-app/03-api-reference/03-file-conventions/02-route-segment-config/dynamicParams.md) | When deciding what happens for params not returned by `generateStaticParams` |
| [instant](../docs/01-app/03-api-reference/03-file-conventions/02-route-segment-config/instant.md) | When a segment must be served instantly from the prerendered shell |
| [maxDuration](../docs/01-app/03-api-reference/03-file-conventions/02-route-segment-config/maxDuration.md) | When a route needs a longer execution limit on the hosting platform |
| [preferredRegion (deprecated)](../docs/01-app/03-api-reference/03-file-conventions/02-route-segment-config/preferredRegion.md) | Only when removing this deprecated export from existing code |
| [prefetch](../docs/01-app/03-api-reference/03-file-conventions/02-route-segment-config/prefetch.md) | When overriding prefetch behavior for a whole segment rather than per link |
| [runtime](../docs/01-app/03-api-reference/03-file-conventions/02-route-segment-config/runtime.md) | When a segment must run on Node.js or on the Edge Runtime |

### 01-app/03-api-reference/04-functions/ — Functions and hooks

| Title and file path | When to read it |
| --- | --- |
| [Functions](../docs/01-app/03-api-reference/04-functions/index.md) | When you know what you want to do but not which function does it |
| [after](../docs/01-app/03-api-reference/04-functions/after.md) | When work must run after the response is sent, such as logging or analytics |
| [cacheLife](../docs/01-app/03-api-reference/04-functions/cacheLife.md) | When setting how long a `use cache` entry stays fresh |
| [cacheTag](../docs/01-app/03-api-reference/04-functions/cacheTag.md) | When tagging cached output so it can be invalidated later by tag |
| [catchError](../docs/01-app/03-api-reference/04-functions/catchError.md) | When you must catch an error without swallowing the control-flow errors Next.js throws internally |
| [connection](../docs/01-app/03-api-reference/04-functions/connection.md) | When a component must opt out of prerendering and wait for an actual request |
| [cookies](../docs/01-app/03-api-reference/04-functions/cookies.md) | When reading or writing cookies on the server, and you need the read/write rules per context |
| [draftMode](../docs/01-app/03-api-reference/04-functions/draft-mode.md) | When enabling, disabling or checking draft mode in code |
| [fetch](../docs/01-app/03-api-reference/04-functions/fetch.md) | When you need the Next.js extensions to `fetch`, including its caching options |
| [forbidden](../docs/01-app/03-api-reference/04-functions/forbidden.md) | When code must stop and render the 403 UI |
| [generateImageMetadata](../docs/01-app/03-api-reference/04-functions/generate-image-metadata.md) | When one metadata file must emit several images |
| [generateMetadata](../docs/01-app/03-api-reference/04-functions/generate-metadata.md) | When page metadata depends on data — the full `Metadata` field reference lives here |
| [generateSitemaps](../docs/01-app/03-api-reference/04-functions/generate-sitemaps.md) | When the site needs multiple sitemap files |
| [generateStaticParams](../docs/01-app/03-api-reference/04-functions/generate-static-params.md) | When prerendering dynamic routes at build time |
| [generateViewport](../docs/01-app/03-api-reference/04-functions/generate-viewport.md) | When setting viewport or theme color, statically or from data |
| [headers](../docs/01-app/03-api-reference/04-functions/headers.md) | When reading incoming request headers on the server |
| [ImageResponse](../docs/01-app/03-api-reference/04-functions/image-response.md) | When generating an image from JSX, typically for OG images |
| [io](../docs/01-app/03-api-reference/04-functions/io.md) | When marking an operation as I/O so Next.js treats it as dynamic |
| [NextRequest](../docs/01-app/03-api-reference/04-functions/next-request.md) | When you need the request object API in Route Handlers or the proxy |
| [NextResponse](../docs/01-app/03-api-reference/04-functions/next-response.md) | When building responses, rewrites or redirects in Route Handlers or the proxy |
| [next/root-params](../docs/01-app/03-api-reference/04-functions/next-root-params.md) | When a deeply nested component needs root-level route params without prop drilling |
| [notFound](../docs/01-app/03-api-reference/04-functions/not-found.md) | When code must stop and render the 404 UI |
| [permanentRedirect](../docs/01-app/03-api-reference/04-functions/permanentRedirect.md) | When redirecting with a 308, for example after a permanent URL change |
| [redirect](../docs/01-app/03-api-reference/04-functions/redirect.md) | When redirecting from a Server Component, Route Handler or Server Action |
| [refresh](../docs/01-app/03-api-reference/04-functions/refresh.md) | When the current route must re-render with fresh server data |
| [revalidatePath](../docs/01-app/03-api-reference/04-functions/revalidatePath.md) | When a mutation invalidates a specific path |
| [revalidateTag](../docs/01-app/03-api-reference/04-functions/revalidateTag.md) | When a mutation invalidates every entry carrying a tag |
| [unauthorized](../docs/01-app/03-api-reference/04-functions/unauthorized.md) | When code must stop and render the 401 UI |
| [unstable_cache](../docs/01-app/03-api-reference/04-functions/unstable_cache.md) | Only in the pre-Cache-Components model; prefer `use cache` in new code |
| [unstable_noStore](../docs/01-app/03-api-reference/04-functions/unstable_noStore.md) | Only in the pre-Cache-Components model, to force a segment dynamic |
| [unstable_rethrow](../docs/01-app/03-api-reference/04-functions/unstable_rethrow.md) | When a `try/catch` accidentally swallows Next.js control-flow errors such as `notFound()` or `redirect()` |
| [updateTag](../docs/01-app/03-api-reference/04-functions/updateTag.md) | When a mutation must refresh tagged data immediately within the same request |
| [useLinkStatus](../docs/01-app/03-api-reference/04-functions/use-link-status.md) | When showing pending feedback while a `<Link>` navigation is in flight |
| [useOffline](../docs/01-app/03-api-reference/04-functions/use-offline.md) | When the UI must react to the connection dropping |
| [useParams](../docs/01-app/03-api-reference/04-functions/use-params.md) | When a Client Component needs the dynamic route params |
| [usePathname](../docs/01-app/03-api-reference/04-functions/use-pathname.md) | When a Client Component needs the current pathname, for example to highlight active links |
| [userAgent](../docs/01-app/03-api-reference/04-functions/userAgent.md) | When branching on device, browser or bot detection from the request |
| [useReportWebVitals](../docs/01-app/03-api-reference/04-functions/use-report-web-vitals.md) | When sending Core Web Vitals to an analytics backend |
| [useRouter](../docs/01-app/03-api-reference/04-functions/use-router.md) | When a Client Component must navigate, refresh or prefetch programmatically |
| [useSearchParams](../docs/01-app/03-api-reference/04-functions/use-search-params.md) | When a Client Component reads the query string — includes the `Suspense` requirement |
| [useSelectedLayoutSegment](../docs/01-app/03-api-reference/04-functions/use-selected-layout-segment.md) | When a layout must know which single child segment is active |
| [useSelectedLayoutSegments](../docs/01-app/03-api-reference/04-functions/use-selected-layout-segments.md) | When a layout needs the whole active segment chain, for example to build breadcrumbs |

