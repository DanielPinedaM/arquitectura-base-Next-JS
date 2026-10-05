---
title: Suscríbete al estado derivado
impact: MEDIUM
impactDescription: reduce la frecuencia de los re-renders
tags: rerender, derived-state, media-query, optimization
---

## Suscríbete al estado derivado

Suscríbete a un estado booleano derivado en lugar de a valores continuos para reducir la frecuencia de los re-renders.

**Incorrecto (hace re-render en cada cambio de píxel):**

```tsx
function Sidebar() {
  const width = useWindowWidth()  // se actualiza continuamente
  const isMobile = width < 768
  return <nav className={isMobile ? 'mobile' : 'desktop'} />
}
```

**Correcto (hace re-render solo cuando cambia el booleano):**

```tsx
function Sidebar() {
  const isMobile = useMediaQuery('(max-width: 767px)')
  return <nav className={isMobile ? 'mobile' : 'desktop'} />
}
```
