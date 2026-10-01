---
title: Usa transitions para las actualizaciones no urgentes
impact: MEDIUM
impactDescription: mantiene la capacidad de respuesta de la UI
tags: rerender, transitions, startTransition, performance
---

## Usa transitions para las actualizaciones no urgentes

Marca las actualizaciones de estado frecuentes y no urgentes como transitions para mantener la capacidad de respuesta de la UI.

**Incorrecto (bloquea la UI en cada scroll):**

```tsx
function ScrollTracker() {
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const handler = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
}
```

**Correcto (actualizaciones no bloqueantes):**

```tsx
import { startTransition } from 'react'

function ScrollTracker() {
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const handler = () => {
      startTransition(() => setScrollY(window.scrollY))
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
}
```
