---
title: Suprime los hydration mismatches esperados
impact: LOW-MEDIUM
impactDescription: evita advertencias de hydration ruidosas para diferencias conocidas
tags: rendering, hydration, ssr, nextjs
---

## Suprime los hydration mismatches esperados

En los frameworks con SSR (p. ej., Next.js), algunos valores son intencionalmente diferentes en el servidor y en el cliente (IDs aleatorios, fechas, formato de locale/zona horaria). Para estos mismatches *esperados*, envuelve el texto dinámico en un elemento con `suppressHydrationWarning` para evitar advertencias ruidosas. No uses esto para ocultar bugs reales. No abuses de ello.

**Incorrecto (advertencias de mismatches conocidos):**

```tsx
function Timestamp() {
  return <span>{new Date().toLocaleString()}</span>
}
```

**Correcto (suprime solo el mismatch esperado):**

```tsx
function Timestamp() {
  return (
    <span suppressHydrationWarning>
      {new Date().toLocaleString()}
    </span>
  )
}
```
