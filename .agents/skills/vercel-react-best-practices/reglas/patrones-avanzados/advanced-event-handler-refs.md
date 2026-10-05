---
title: Almacena los event handlers en refs
impact: LOW
impactDescription: suscripciones estables
tags: advanced, hooks, refs, event-handlers, optimization
---

## Almacena los event handlers en refs

Almacena los callbacks en refs cuando se usen en effects que no deban volver a suscribirse cuando el callback cambie.

**Incorrecto (se vuelve a suscribir en cada render):**

```tsx
function useWindowEvent(event: string, handler: (e) => void) {
  useEffect(() => {
    window.addEventListener(event, handler)
    return () => window.removeEventListener(event, handler)
  }, [event, handler])
}
```

**Correcto (suscripción estable):**

```tsx
function useWindowEvent(event: string, handler: (e) => void) {
  const handlerRef = useRef(handler)
  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    const listener = (e) => handlerRef.current(e)
    window.addEventListener(event, listener)
    return () => window.removeEventListener(event, listener)
  }, [event])
}
```

**Alternativa: usa `useEffectEvent` si estás en la última versión de React:**

```tsx
import { useEffectEvent } from 'react'

function useWindowEvent(event: string, handler: (e) => void) {
  const onEvent = useEffectEvent(handler)

  useEffect(() => {
    window.addEventListener(event, onEvent)
    return () => window.removeEventListener(event, onEvent)
  }, [event])
}
```

`useEffectEvent` proporciona una API más limpia para el mismo patrón: crea una referencia de función estable que siempre llama a la última versión del handler.
