---
title: Evita los imports desde barrel files
impact: CRITICAL
impactDescription: costo de import de 200-800ms, builds lentos
tags: bundle, imports, tree-shaking, barrel-files, performance
---

## Evita los imports desde barrel files

Importa directamente desde los archivos fuente en lugar de los barrel files para evitar cargar miles de módulos sin usar. Los **barrel files** son puntos de entrada que re-exportan múltiples módulos (p. ej., un `index.js` que hace `export * from './module'`).

Las librerías populares de íconos y componentes pueden tener **hasta 10,000 re-exports** en su archivo de entrada. En muchos paquetes de React, **solo importarlos toma 200-800ms**, lo que afecta tanto la velocidad de desarrollo como los cold starts en producción.

**Por qué el tree-shaking no ayuda:** Cuando una librería está marcada como external (no incluida en el bundle), el bundler no puede optimizarla. Si la incluyes en el bundle para habilitar el tree-shaking, los builds se vuelven considerablemente más lentos al analizar todo el grafo de módulos.

**Incorrecto (importa toda la librería):**

```tsx
import { Check, X, Menu } from 'lucide-react'
// Carga 1,583 módulos, toma ~2.8s extra en dev
// Costo en runtime: 200-800ms en cada cold start

import { Button, TextField } from '@mui/material'
// Carga 2,225 módulos, toma ~4.2s extra en dev
```

**Correcto - Next.js 13.5+ (recomendado):**

```js
// next.config.js - optimiza automáticamente los barrel imports en tiempo de build
module.exports = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@mui/material']
  }
}
```

```tsx
// Mantén los imports estándar - Next.js los transforma en imports directos
import { Check, X, Menu } from 'lucide-react'
// Soporte completo de TypeScript, sin manejo manual de paths
```

Este es el enfoque recomendado porque preserva la type safety de TypeScript y el autocompletado del editor, y aun así elimina el costo de los barrel imports.

**Correcto - Imports directos (proyectos que no son de Next.js):**

```tsx
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
// Carga solo lo que usas
```

> **Advertencia de TypeScript:** Algunas librerías (en particular `lucide-react`) no incluyen archivos `.d.ts` para sus paths de import profundos. Importar desde `lucide-react/dist/esm/icons/check` se resuelve a un tipo `any` implícito, lo que provoca errores con `strict` o `noImplicitAny`. Prefiere `optimizePackageImports` cuando esté disponible, o verifica que la librería exporte tipos para sus subpaths antes de usar imports directos.

Estas optimizaciones proporcionan un arranque en dev entre 15 y 70% más rápido, builds 28% más rápidos, cold starts 40% más rápidos y un HMR significativamente más rápido.

Librerías afectadas con frecuencia: `lucide-react`, `@mui/material`, `@mui/icons-material`, `@tabler/icons-react`, `react-icons`, `@headlessui/react`, `@radix-ui/react-*`, `lodash`, `ramda`, `date-fns`, `rxjs`, `react-use`.

Referencia: [Cómo optimizamos los imports de paquetes en Next.js](https://vercel.com/blog/how-we-optimized-package-imports-in-next-js)
