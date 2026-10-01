---
title: Dynamic imports para los componentes pesados
impact: CRITICAL
impactDescription: afecta directamente al TTI y al LCP
tags: bundle, dynamic-import, code-splitting, next-dynamic
---

## Dynamic imports para los componentes pesados

Usa `next/dynamic` para hacer lazy-load de los componentes grandes que no se necesitan en el render inicial.

**Incorrecto (Monaco se incluye en el chunk principal, ~300KB):**

```tsx
import { MonacoEditor } from './monaco-editor'

function CodePanel({ code }: { code: string }) {
  return <MonacoEditor value={code} />
}
```

**Correcto (Monaco se carga bajo demanda):**

```tsx
import dynamic from 'next/dynamic'

const MonacoEditor = dynamic(
  () => import('./monaco-editor').then(m => m.MonacoEditor),
  { ssr: false }
)

function CodePanel({ code }: { code: string }) {
  return <MonacoEditor value={code} />
}
```
