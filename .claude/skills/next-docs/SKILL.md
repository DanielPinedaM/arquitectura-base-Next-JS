---
name: next-docs
description: Official Next.js 16 documentation (App Router and Pages Router) mirrored locally as markdown, with a table of contents that maps every page to the moment it becomes relevant. Use this skill whenever a task touches Next.js at all - routing, layouts, Server and Client Components, data fetching, caching and revalidation, Server Actions and forms, metadata and SEO, next.config.js options, the next CLI, proxy/middleware, deployment, testing setup, or migrations and version upgrades - and always consult it before answering a Next.js API question from memory, because Next.js 16 renamed, deprecated and removed APIs that older training data still recommends.
---

# What is this?

Every `.md` file under `.claude/skills/next-docs/docs/` is a local, offline copy of the **official Next.js documentation** published at <https://nextjs.org/docs>. The folder tree mirrors the sections of the website, and each file keeps its original frontmatter (`title`, `description`, `related`) followed by the full page body.

This project runs **Next.js 16**, whose breaking changes may contradict your training data. Treat these files as the source of truth: when a file and your memory disagree, the file wins, and every deprecation notice inside them applies.

The documentation is split into two routers, and picking the wrong one produces code that does not work:

- **`docs/01-app/` — App Router**: the `app/` directory, Server and Client Components, Server Actions, `use cache`. This is the default for new code.
- **`docs/02-pages/` — Pages Router**: the `pages/` directory, `getStaticProps`, `getServerSideProps`, API Routes. Read it only when the code you are touching already lives in `pages/`, or when migrating away from it.

`docs/03-architecture/` and `docs/04-community/` apply to both routers.

# The `index.md` files

Every folder inside `docs/` has an `index.md`. It is the landing page of that section, never a page about one specific API. Two kinds exist:

- **Listing pages** — only frontmatter, no body (for example `docs/01-app/02-guides/index.md`). The reference files already tell you what the section contains, so opening them adds nothing.
- **Section overviews** — a real page that explains the model the whole folder assumes and compares the siblings inside it (for example `docs/01-app/02-guides/testing/index.md` weighs Cypress, Playwright, Vitest and Jest against each other before you pick one).

**Read an `index.md` when** you must *choose* among the files of a folder, or when you need the shared mental model a section takes for granted. **Skip it when** you already know which page you need: open that page directly.

# How to read the documentation
Read the `.md` files located in `/skills/next-docs/docs/` **on demand**: use the [Table of Contents](#table-of-contents) as a reference to infer which files the task you are solving needs, and open only those files.

**Reason**: reading every file consumes context and tokens unnecessarily.

Finding a page takes two hops, for that same reason:

1. The [Table of Contents](#table-of-contents) below lists **reference files**, not documentation pages. Pick the single one whose area matches the task, and read it.
2. That reference file lists every page of its area, one row per page, with the reason to open it. Open only the rows the task actually needs — normally one to three.

Reading a second reference file is usually a sign the area was misidentified, not a sign that more context is needed. Before reaching for one, use the shortcut the pages themselves provide: **a concept page's `related:` frontmatter lists the exact API pages that belong to it**, as full paths. Going from `09-revalidating.md` to `revalidateTag.md` costs one `related:` link, not a second reference file. Open a second reference deliberately only when the task genuinely straddles two areas.

## Three traps in the corpus

**112 of the 164 Pages Router pages are empty husks.** They carry a `source:` key in the frontmatter, this notice, and nothing else:

> `{/* DO NOT EDIT. The content of this doc is generated from the source above. To edit the content of this page, navigate to the source page in your editor. */}`

That notice speaks to whoever maintains the Next.js repository, not to you. It means *this file is an auto-generated copy; edit the page named in `source:` instead*. What it tells a reader is that the body lives elsewhere — and in these 112 files nothing was copied at all, so opening one yields 8–13 lines of frontmatter and this comment. Every affected row in the two Pages Router references is marked `**stub**` with a direct link to the real page; follow that link. Only 51 pages under `docs/02-pages/` have a body of their own.

**60 App Router pages carry content for both routers at once.** These are the source pages those copies are generated from, so router-specific sections inside them are wrapped in JSX tags:

```
<AppOnly>   … applies to app/ only   … </AppOnly>
<PagesOnly> … applies to pages/ only … </PagesOnly>
```

Anything not wrapped applies to both. When reading one of these pages for App Router work, skip every `<PagesOnly>` block — it describes `pages/`, and following it produces code that does not belong in `app/`. The same page may open with a note saying its content is shared between both routers; that is the marker.

**Caching pages assume Cache Components.** `08-caching.md` and `09-revalidating.md` document the `use cache` model. If `cacheComponents` is not enabled in `next.config.js`, the page that applies is *Caching and Revalidating (Previous Model)* in `references/app-router-guides.md`. Check the flag before writing caching code, or the snippet will not apply to the project.

# Table of Contents

The 455 documentation pages are indexed across these eight reference files.

| Reference file | When to open it | Pages |
| --- | --- | --- |
| [App Router — fundamentals](references/app-router-fundamentals.md) | Scaffolding a project, or working with the core concepts of `app/`: project structure, layouts and pages, navigation, Server and Client Components, fetching and mutating data, caching, revalidating, error handling, CSS, images, fonts, metadata, Route Handlers, proxy, deploying, upgrading | 21 |
| [App Router — guides](references/app-router-guides.md) | Solving a concrete task end to end: authentication, forms, internationalization, ISR, streaming, prefetching, bundle optimization, self-hosting, PWA, MDX, CSP, analytics, debugging, test tooling setup, migrating from CRA/Vite/Pages Router, and version upgrades | 78 |
| [App Router — API reference](references/app-router-api.md) | You need an exact signature or option: the `use` directives, `next/image`, `next/link`, `next/font`, `layout.js`, `page.js`, `route.js`, `error.js`, parallel and intercepting routes, metadata files, route segment config, `cookies()`, `generateMetadata`, `revalidateTag`, and the client hooks | 92 |
| [App Router — configuration](references/app-router-config.md) | Editing `next.config.js` — one page per option — or setting up TypeScript and the ESLint plugin | 76 |
| [App Router — CLI and deployment adapters](references/app-router-cli-and-adapters.md) | You need the flags of `next` or `create-next-app`, or you are integrating Next.js into a hosting platform through the adapter interface | 16 |
| [Pages Router](references/pages-router.md) | The code lives in `pages/`: routing, `_app`, `_document`, API Routes, SSR/SSG/CSR, `getStaticProps`, `getServerSideProps`, plus the guides and upgrade paths for that router | 76 |
| [Pages Router — API reference](references/pages-router-api.md) | You need an exact signature, component prop or `next.config.js` option specific to `pages/` | 88 |
| [Architecture and community](references/architecture-and-community.md) | Explaining behavior rather than changing code — Fast Refresh, the Rust compiler, supported browsers, built-in accessibility — or contributing to the docs and using `next-rspack` | 8 |
