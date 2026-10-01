---
title: Acota las dependencias de los effects
impact: LOW
impactDescription: minimiza las re-ejecuciones del effect
tags: rerender, useEffect, dependencies, optimization
---

## Acota las dependencias de los effects

Especifica dependencias primitivas en lugar de objetos para minimizar las re-ejecuciones del effect.

**Incorrecto (se vuelve a ejecutar ante cualquier cambio en los campos de user):**

```tsx
useEffect(() => {
  console.log(user.id)
}, [user])
```

**Correcto (se vuelve a ejecutar solo cuando cambia id):**

```tsx
useEffect(() => {
  console.log(user.id)
}, [user.id])
```

**Para el estado derivado, calcúlalo fuera del effect:**

```tsx
// Incorrecto: se ejecuta con width=767, 766, 765...
useEffect(() => {
  if (width < 768) {
    enableMobileMode()
  }
}, [width])

// Correcto: se ejecuta solo en la transición del booleano
const isMobile = width < 768
useEffect(() => {
  if (isMobile) {
    enableMobileMode()
  }
}, [isMobile])
```
