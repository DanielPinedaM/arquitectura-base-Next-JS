# App Router — CLI and deployment adapters

The `next` and `create-next-app` commands, and the adapter interface for integrating Next.js into a hosting platform. Covers `docs/01-app/03-api-reference/06-cli/` and `07-adapters/`.

Part of the `next-docs` skill. Open only the rows this task needs; paths are relative to this file.
## 01-app/03-api-reference/06-cli/ — Command line

| Title and file path | When to read it |
| --- | --- |
| [CLI](../docs/01-app/03-api-reference/06-cli/index.md) | Landing page only; pick the command below |
| [create-next-app](../docs/01-app/03-api-reference/06-cli/create-next-app.md) | When scaffolding a project and you need the flags or the available templates |
| [next CLI](../docs/01-app/03-api-reference/06-cli/next.md) | When you need the flags of `next dev`, `next build`, `next start` or `next lint` |

## 01-app/03-api-reference/07-adapters/ — Building a deployment adapter

Read this folder only when integrating Next.js into a hosting platform. Application code never needs it.

| Title and file path | When to read it |
| --- | --- |
| [Adapters](../docs/01-app/03-api-reference/07-adapters/index.md) | When starting an adapter and you need the overall picture |
| [Configuration](../docs/01-app/03-api-reference/07-adapters/01-configuration.md) | When wiring `adapterPath` or `NEXT_ADAPTER_PATH` |
| [Creating an Adapter](../docs/01-app/03-api-reference/07-adapters/02-creating-an-adapter.md) | When implementing the `NextAdapter` interface |
| [API Reference](../docs/01-app/03-api-reference/07-adapters/03-api-reference.md) | When you need the exact shape of `modifyConfig` and `onBuildComplete` |
| [Testing Adapters](../docs/01-app/03-api-reference/07-adapters/04-testing-adapters.md) | When validating an adapter against the compatibility test harness |
| [Routing with @next/routing](../docs/01-app/03-api-reference/07-adapters/05-routing-with-next-routing.md) | When the adapter must reproduce Next.js route matching |
| [Implementing PPR in an Adapter](../docs/01-app/03-api-reference/07-adapters/06-implementing-ppr-in-an-adapter.md) | When adding Partial Prerendering support with fallback output and cache hooks |
| [Runtime Integration](../docs/01-app/03-api-reference/07-adapters/07-runtime-integration.md) | When connecting build-time adapter output to runtime cache interfaces |
| [Invoking Entrypoints](../docs/01-app/03-api-reference/07-adapters/08-invoking-entrypoints.md) | When the platform must invoke Node.js or Edge entrypoints with runtime context |
| [Output Types](../docs/01-app/03-api-reference/07-adapters/09-output-types.md) | When interpreting the build output types exposed to adapters |
| [Routing Information](../docs/01-app/03-api-reference/07-adapters/10-routing-information.md) | When reading routing phases and route fields from `onBuildComplete` |
| [Use Cases](../docs/01-app/03-api-reference/07-adapters/11-use-cases.md) | When you want worked examples before designing your own adapter |
| [Supporting Immutable Static Assets](../docs/01-app/03-api-reference/07-adapters/12-immutable-static-assets.md) | When the platform can serve immutable assets and the adapter must declare it |

