---
title: Haz hoisting de los elementos JSX estáticos
impact: LOW
impactDescription: evita la recreación
tags: rendering, jsx, static, optimization
---

## Haz hoisting de los elementos JSX estáticos

Extrae el JSX estático fuera de los componentes para evitar su recreación.

**Incorrecto (recrea el elemento en cada render):**

```tsx
function LoadingSkeleton() {
  return <div className="animate-pulse h-20 bg-gray-200" />
}

function Container() {
  return (
    <div>
      {loading && <LoadingSkeleton />}
    </div>
  )
}
```

**Correcto (reutiliza el mismo elemento):**

```tsx
const loadingSkeleton = (
  <div className="animate-pulse h-20 bg-gray-200" />
)

function Container() {
  return (
    <div>
      {loading && loadingSkeleton}
    </div>
  )
}
```

Esto es especialmente útil para nodos SVG grandes y estáticos, que pueden ser costosos de recrear en cada render.

**Nota:** Si tu proyecto tiene [React Compiler](https://react.dev/learn/react-compiler) habilitado, el compiler hace hoisting automáticamente de los elementos JSX estáticos y optimiza los re-renders de los componentes, lo que hace innecesario el hoisting manual.
