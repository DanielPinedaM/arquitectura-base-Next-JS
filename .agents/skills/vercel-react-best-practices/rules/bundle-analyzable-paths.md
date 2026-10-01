---
title: Prefiere paths analizables estáticamente
impact: HIGH
impactDescription: evita bundles y file traces amplios accidentales
tags: bundle, nextjs, vite, webpack, rollup, esbuild, path
---

## Prefiere paths analizables estáticamente

Las herramientas de build funcionan mejor cuando los paths de import y del sistema de archivos son evidentes en tiempo de build. Si ocultas el path real dentro de una variable o lo compones de forma demasiado dinámica, la herramienta tiene que incluir un conjunto amplio de archivos posibles, advertir que no puede analizar el import o ampliar el file tracing para no correr riesgos.

Prefiere maps explícitos o paths literales para que el conjunto de archivos alcanzables se mantenga acotado y predecible. Es la misma regla tanto si eliges módulos con `import()` como si lees archivos en código del servidor o de build.

Cuando el análisis se vuelve demasiado amplio, el costo es real:
- Bundles del servidor más grandes
- Builds más lentos
- Peores cold starts
- Mayor uso de memoria

### Paths de import

**Incorrecto (el bundler no puede saber qué se puede importar):**

```ts
const PAGE_MODULES = {
  home: './pages/home',
  settings: './pages/settings',
} as const

const Page = await import(PAGE_MODULES[pageName])
```

**Correcto (usa un map explícito de los módulos permitidos):**

```ts
const PAGE_MODULES = {
  home: () => import('./pages/home'),
  settings: () => import('./pages/settings'),
} as const

const Page = await PAGE_MODULES[pageName]()
```

### Paths del sistema de archivos

**Incorrecto (un enum de 2 valores aun así oculta el path final al análisis estático):**

```ts
const baseDir = path.join(process.cwd(), 'content/' + contentKind)
```

**Correcto (haz que cada path final sea literal en el punto de llamada):**

```ts
const baseDir =
  kind === ContentKind.Blog
    ? path.join(process.cwd(), 'content/blog')
    : path.join(process.cwd(), 'content/docs')
```

En el código del servidor de Next.js, esto también es importante para el output file tracing. `path.join(process.cwd(), someVar)` puede ampliar el conjunto de archivos rastreados porque Next.js analiza estáticamente el uso de `import`, `require` y `fs`.

Referencia: [Next.js output](https://nextjs.org/docs/app/api-reference/config/next-config-js/output), [Dynamic imports de Next.js](https://nextjs.org/learn/seo/dynamic-imports), [Funcionalidades de Vite](https://vite.dev/guide/features.html), [API de esbuild](https://esbuild.github.io/api/), [Rollup dynamic import vars](https://www.npmjs.com/package/@rollup/plugin-dynamic-import-vars), [Gestión de dependencias de Webpack](https://webpack.js.org/guides/dependency-management/)
