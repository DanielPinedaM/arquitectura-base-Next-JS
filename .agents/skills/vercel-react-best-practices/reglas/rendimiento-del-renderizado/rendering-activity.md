---
title: Usa el componente Activity para mostrar/ocultar
impact: MEDIUM
impactDescription: preserva el estado/DOM
tags: rendering, activity, visibility, state-preservation
---

## Usa el componente Activity para mostrar/ocultar

Usa el `<Activity>` de React para preservar el estado/DOM de los componentes costosos que alternan su visibilidad con frecuencia.

**Uso:**

```tsx
import { Activity } from 'react'

function Dropdown({ isOpen }: Props) {
  return (
    <Activity mode={isOpen ? 'visible' : 'hidden'}>
      <ExpensiveMenu />
    </Activity>
  )
}
```

Evita re-renders costosos y la pérdida del estado.
