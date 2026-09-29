# App Router — configuration

One page per `next.config.js` option, plus TypeScript and ESLint setup. Covers `docs/01-app/03-api-reference/05-config/`.

Part of the `next-docs` skill. Open only the rows this task needs; paths are relative to this file.
## 01-app/03-api-reference/05-config/ — Project configuration

| Title and file path | When to read it |
| --- | --- |
| [Configuration](../docs/01-app/03-api-reference/05-config/index.md) | Landing page only; pick the config surface below |
| [TypeScript](../docs/01-app/03-api-reference/05-config/02-typescript.md) | When setting up TypeScript, typed routes, or the generated types Next.js emits |
| [ESLint Plugin](../docs/01-app/03-api-reference/05-config/03-eslint.md) | When configuring `eslint-config-next` or silencing one of its rules |

### 01-app/03-api-reference/05-config/01-next-config-js/ — One page per `next.config.js` option

| Title and file path | When to read it |
| --- | --- |
| [next.config.js](../docs/01-app/03-api-reference/05-config/01-next-config-js/index.md) | When you need the full list of options before editing the config file |
| [adapterPath](../docs/01-app/03-api-reference/05-config/01-next-config-js/adapterPath.md) | When pointing the build at a custom deployment adapter |
| [allowedDevOrigins](../docs/01-app/03-api-reference/05-config/01-next-config-js/allowedDevOrigins.md) | When the dev server rejects requests from another origin, such as a tunnel or LAN device |
| [appDir](../docs/01-app/03-api-reference/05-config/01-next-config-js/appDir.md) | When enabling or reasoning about the App Router flag |
| [assetPrefix](../docs/01-app/03-api-reference/05-config/01-next-config-js/assetPrefix.md) | When static assets must be served from a CDN host |
| [authInterrupts](../docs/01-app/03-api-reference/05-config/01-next-config-js/authInterrupts.md) | Before using `forbidden()` or `unauthorized()`, which this experimental flag gates |
| [basePath](../docs/01-app/03-api-reference/05-config/01-next-config-js/basePath.md) | When the app is served under a sub-path instead of the domain root |
| [cacheComponents](../docs/01-app/03-api-reference/05-config/01-next-config-js/cacheComponents.md) | When enabling Cache Components — check this first, since it changes how caching pages apply |
| [cacheHandlers](../docs/01-app/03-api-reference/05-config/01-next-config-js/cacheHandlers.md) | When `use cache` must be backed by a custom store such as Redis |
| [cacheLife](../docs/01-app/03-api-reference/05-config/01-next-config-js/cacheLife.md) | When defining reusable cache profiles instead of repeating durations |
| [cacheMaxMemorySize](../docs/01-app/03-api-reference/05-config/01-next-config-js/cacheMaxMemorySize.md) | When the in-memory cache per instance must be resized or disabled |
| [compress](../docs/01-app/03-api-reference/05-config/01-next-config-js/compress.md) | When gzip must be disabled because a proxy already compresses responses |
| [crossOrigin](../docs/01-app/03-api-reference/05-config/01-next-config-js/crossOrigin.md) | When generated script tags need a `crossOrigin` attribute |
| [cssChunking](../docs/01-app/03-api-reference/05-config/01-next-config-js/cssChunking.md) | When CSS load order breaks or you want fewer stylesheet requests |
| [deploymentId](../docs/01-app/03-api-reference/05-config/01-next-config-js/deploymentId.md) | When protecting against version skew between deployments |
| [devIndicators](../docs/01-app/03-api-reference/05-config/01-next-config-js/devIndicators.md) | When the on-screen dev indicator gets in the way |
| [distDir](../docs/01-app/03-api-reference/05-config/01-next-config-js/distDir.md) | When the build output must go somewhere other than `.next` |
| [env](../docs/01-app/03-api-reference/05-config/01-next-config-js/env.md) | When inlining build-time environment values through the config file |
| [expireTime](../docs/01-app/03-api-reference/05-config/01-next-config-js/expireTime.md) | When tuning the stale-while-revalidate window of ISR pages |
| [exportPathMap](../docs/01-app/03-api-reference/05-config/01-next-config-js/exportPathMap.md) | Only for legacy `next export` setups |
| [generateBuildId](../docs/01-app/03-api-reference/05-config/01-next-config-js/generateBuildId.md) | When multiple instances must share a stable build id, for example behind a load balancer |
| [generateEtags](../docs/01-app/03-api-reference/05-config/01-next-config-js/generateEtags.md) | When ETags must be disabled for caching reasons upstream |
| [headers](../docs/01-app/03-api-reference/05-config/01-next-config-js/headers.md) | When adding security or caching headers declaratively instead of in the proxy |
| [htmlLimitedBots](../docs/01-app/03-api-reference/05-config/01-next-config-js/htmlLimitedBots.md) | When specific crawlers must receive blocking metadata rather than streamed HTML |
| [httpAgentOptions](../docs/01-app/03-api-reference/05-config/01-next-config-js/httpAgentOptions.md) | When outbound HTTP Keep-Alive must be tuned or disabled |
| [images](../docs/01-app/03-api-reference/05-config/01-next-config-js/images.md) | When handing optimization over to a third-party CDN through a custom loader — Cloudinary, Imgix, Akamai, Fastly, Supabase and friends. It does **not** document `remotePatterns`: for a rejected remote hostname, or for formats, sizes and qualities, go to **Image Component** in [app-router-api.md](app-router-api.md) |
| [Custom Next.js Cache Handler](../docs/01-app/03-api-reference/05-config/01-next-config-js/incrementalCacheHandlerPath.md) | When the ISR cache must live in an external service so instances share it |
| [inlineCss](../docs/01-app/03-api-reference/05-config/01-next-config-js/inlineCss.md) | When inlining critical CSS into the HTML |
| [instrumentationClientInject](../docs/01-app/03-api-reference/05-config/01-next-config-js/instrumentationClientInject.md) | When extra client instrumentation must run before the user's own instrumentation file |
| [logging](../docs/01-app/03-api-reference/05-config/01-next-config-js/logging.md) | When you want fetch calls, incoming requests or browser console output visible in the terminal |
| [mdxRs](../docs/01-app/03-api-reference/05-config/01-next-config-js/mdxRs.md) | When compiling MDX with the Rust compiler instead of the JS one |
| [onDemandEntries](../docs/01-app/03-api-reference/05-config/01-next-config-js/onDemandEntries.md) | When dev keeps recompiling pages you are still working on |
| [optimizePackageImports](../docs/01-app/03-api-reference/05-config/01-next-config-js/optimizePackageImports.md) | When a barrel-file package such as an icon library bloats the bundle |
| [output](../docs/01-app/03-api-reference/05-config/01-next-config-js/output.md) | When producing a `standalone` server bundle or a static `export` |
| [outputHashSalt](../docs/01-app/03-api-reference/05-config/01-next-config-js/outputHashSalt.md) | When output filenames must differ between builds or environments |
| [pageExtensions](../docs/01-app/03-api-reference/05-config/01-next-config-js/pageExtensions.md) | When routes must be resolved from non-default file extensions |
| [partialPrefetching](../docs/01-app/03-api-reference/05-config/01-next-config-js/partialPrefetching.md) | When links should prefetch only the static part of each route by default |
| [poweredByHeader](../docs/01-app/03-api-reference/05-config/01-next-config-js/poweredByHeader.md) | When the `x-powered-by` header must be removed |
| [prefetchInlining](../docs/01-app/03-api-reference/05-config/01-next-config-js/prefetchInlining.md) | When many small prefetch responses should be bundled differently |
| [productionBrowserSourceMaps](../docs/01-app/03-api-reference/05-config/01-next-config-js/productionBrowserSourceMaps.md) | When production stack traces must be readable |
| [proxyClientMaxBodySize](../docs/01-app/03-api-reference/05-config/01-next-config-js/proxyClientMaxBodySize.md) | When large uploads are rejected by the proxy body-size limit |
| [reactCompiler](../docs/01-app/03-api-reference/05-config/01-next-config-js/reactCompiler.md) | When enabling the React Compiler so memoization becomes automatic |
| [reactMaxHeadersLength](../docs/01-app/03-api-reference/05-config/01-next-config-js/reactMaxHeadersLength.md) | When React-emitted headers, such as preload hints, exceed a proxy limit |
| [reactStrictMode](../docs/01-app/03-api-reference/05-config/01-next-config-js/reactStrictMode.md) | When enabling Strict Mode, or when double-invocation in dev is confusing you |
| [redirects](../docs/01-app/03-api-reference/05-config/01-next-config-js/redirects.md) | When redirects are static rules rather than runtime decisions |
| [rewrites](../docs/01-app/03-api-reference/05-config/01-next-config-js/rewrites.md) | When a URL must map to a different path or an external backend without changing the address bar |
| [sassOptions](../docs/01-app/03-api-reference/05-config/01-next-config-js/sassOptions.md) | When Sass needs include paths, variables or a specific implementation |
| [serverActions](../docs/01-app/03-api-reference/05-config/01-next-config-js/serverActions.md) | When Server Actions need larger body limits or a list of allowed origins |
| [serverComponentsHmrCache](../docs/01-app/03-api-reference/05-config/01-next-config-js/serverComponentsHmrCache.md) | When dev refreshes refetch too much, or when they reuse stale data |
| [serverExternalPackages](../docs/01-app/03-api-reference/05-config/01-next-config-js/serverExternalPackages.md) | When a server-only dependency breaks once bundled and must stay external |
| [skipProxyUrlNormalize](../docs/01-app/03-api-reference/05-config/01-next-config-js/skipProxyUrlNormalize.md) | When the proxy must see the raw URL instead of the normalized one |
| [skipTrailingSlashRedirect](../docs/01-app/03-api-reference/05-config/01-next-config-js/skipTrailingSlashRedirect.md) | When you handle trailing slashes yourself and the automatic redirect interferes |
| [staleTimes](../docs/01-app/03-api-reference/05-config/01-next-config-js/staleTimes.md) | When the client-side router cache serves data that feels too stale or too fresh |
| [staticGeneration*](../docs/01-app/03-api-reference/05-config/01-next-config-js/staticGeneration.md) | When tuning build-time static generation: concurrency, retries and timeouts |
| [supportsImmutableAssets](../docs/01-app/03-api-reference/05-config/01-next-config-js/supportsImmutableAssets.md) | When the host can serve content-addressed assets as immutable |
| [taint](../docs/01-app/03-api-reference/05-config/01-next-config-js/taint.md) | When enabling React tainting so sensitive objects cannot reach the client |
| [trailingSlash](../docs/01-app/03-api-reference/05-config/01-next-config-js/trailingSlash.md) | When URLs must consistently end with or without a slash |
| [transpilePackages](../docs/01-app/03-api-reference/05-config/01-next-config-js/transpilePackages.md) | When a monorepo package or a dependency ships untranspiled TypeScript or JSX |
| [turbopack](../docs/01-app/03-api-reference/05-config/01-next-config-js/turbopack.md) | When Turbopack needs loaders, aliases or resolve options |
| [turbopackChunking](../docs/01-app/03-api-reference/05-config/01-next-config-js/turbopackChunking.md) | When production chunking produces too many or too few client bundles |
| [Turbopack FileSystem Caching](../docs/01-app/03-api-reference/05-config/01-next-config-js/turbopackFileSystemCache.md) | When builds should reuse a persistent on-disk cache between runs |
| [turbopack.ignoreIssue](../docs/01-app/03-api-reference/05-config/01-next-config-js/turbopackIgnoreIssue.md) | When a known Turbopack warning must be suppressed from the overlay and CLI |
| [turbopackLocalPostcssConfig](../docs/01-app/03-api-reference/05-config/01-next-config-js/turbopackLocalPostcssConfig.md) | When different directories need their own PostCSS config |
| [Turbopack Memory Eviction](../docs/01-app/03-api-reference/05-config/01-next-config-js/turbopackMemoryEviction.md) | When the persistent Turbopack cache consumes too much memory |
| [turbopackRustReactCompiler](../docs/01-app/03-api-reference/05-config/01-next-config-js/turbopackRustReactCompiler.md) | When the React Compiler should run natively instead of through Babel |
| [typedRoutes](../docs/01-app/03-api-reference/05-config/01-next-config-js/typedRoutes.md) | When link `href` values should be type-checked against real routes |
| [typescript](../docs/01-app/03-api-reference/05-config/01-next-config-js/typescript.md) | When the build must tolerate type errors, or must use a custom `tsconfig` |
| [urlImports](../docs/01-app/03-api-reference/05-config/01-next-config-js/urlImports.md) | When importing modules directly from a URL |
| [useLightningcss](../docs/01-app/03-api-reference/05-config/01-next-config-js/useLightningcss.md) | When processing CSS with Lightning CSS instead of the default pipeline |
| [useOffline](../docs/01-app/03-api-reference/05-config/01-next-config-js/useOffline.md) | Before using the `useOffline` hook, which this experimental flag gates |
| [useTypeScriptCli](../docs/01-app/03-api-reference/05-config/01-next-config-js/useTypeScriptCli.md) | When production type checking must run the project's own `tsc` |
| [Custom Webpack Config](../docs/01-app/03-api-reference/05-config/01-next-config-js/webpack.md) | Only when the project still builds with webpack instead of Turbopack |
| [webVitalsAttribution](../docs/01-app/03-api-reference/05-config/01-next-config-js/webVitalsAttribution.md) | When a Web Vitals score is bad and you need to know which element caused it |

