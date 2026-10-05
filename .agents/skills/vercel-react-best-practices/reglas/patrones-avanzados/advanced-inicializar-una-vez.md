---
title: Inicializa la app una vez, no en cada montaje
impact: LOW-MEDIUM
impactDescription: evita la inicialización duplicada en desarrollo
tags: initialization, useEffect, app-startup, side-effects
---

## Inicializa la app una vez, no en cada montaje

No pongas la inicialización de toda la app que debe ejecutarse una vez por carga de la app dentro del `useEffect([])` de un componente. Los componentes pueden volver a montarse y los effects se volverán a ejecutar. En su lugar, usa un guard a nivel de módulo o una inicialización de nivel superior en el módulo de entrada.

**Incorrecto (se ejecuta dos veces en dev, se vuelve a ejecutar al volver a montarse):**

```tsx
function Comp() {
  useEffect(() => {
    loadFromStorage()
    checkAuthToken()
  }, [])

  // ...
}
```

**Correcto (una vez por carga de la app):**

```tsx
let didInit = false

function Comp() {
  useEffect(() => {
    if (didInit) return
    didInit = true
    loadFromStorage()
    checkAuthToken()
  }, [])

  // ...
}
```

Referencia: [Inicializar la aplicación](https://react.dev/learn/you-might-not-need-an-effect#initializing-the-application)
