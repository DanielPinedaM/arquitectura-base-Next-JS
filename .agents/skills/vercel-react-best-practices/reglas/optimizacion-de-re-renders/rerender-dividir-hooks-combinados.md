---
title: Divide los cómputos combinados de los hooks
impact: MEDIUM
impactDescription: evita recalcular pasos independientes
tags: rerender, useMemo, useEffect, dependencies, optimization
---

## Divide los cómputos combinados de los hooks

Cuando un hook contiene múltiples tareas independientes con diferentes dependencias, divídelas en hooks separados. Un hook combinado vuelve a ejecutar todas las tareas cuando cambia cualquier dependencia, aunque algunas tareas no usen el valor que cambió.

**Incorrecto (cambiar `sortOrder` vuelve a calcular el filtrado):**

```tsx
const sortedProducts = useMemo(() => {
  const filtered = products.filter((p) => p.category === category)
  const sorted = filtered.toSorted((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  )
  return sorted
}, [products, category, sortOrder])
```

**Correcto (el filtrado solo se vuelve a calcular cuando cambian products o category):**

```tsx
const filteredProducts = useMemo(
  () => products.filter((p) => p.category === category),
  [products, category]
)

const sortedProducts = useMemo(
  () =>
    filteredProducts.toSorted((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    ),
  [filteredProducts, sortOrder]
)
```

Este patrón también aplica a `useEffect` al combinar efectos secundarios no relacionados:

**Incorrecto (ambos efectos se ejecutan cuando cambia cualquiera de las dependencias):**

```tsx
useEffect(() => {
  analytics.trackPageView(pathname)
  document.title = `${pageTitle} | My App`
}, [pathname, pageTitle])
```

**Correcto (los effects se ejecutan de forma independiente):**

```tsx
useEffect(() => {
  analytics.trackPageView(pathname)
}, [pathname])

useEffect(() => {
  document.title = `${pageTitle} | My App`
}, [pageTitle])
```

**Nota:** Si tu proyecto tiene [React Compiler](https://react.dev/learn/react-compiler) habilitado, este optimiza automáticamente el rastreo de dependencias y puede manejar algunos de estos casos por ti.
