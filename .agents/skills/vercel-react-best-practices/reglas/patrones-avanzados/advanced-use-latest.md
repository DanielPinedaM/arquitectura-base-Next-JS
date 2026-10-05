---
title: useEffectEvent para refs de callbacks estables
impact: LOW
impactDescription: evita re-ejecuciones del effect
tags: advanced, hooks, useEffectEvent, refs, optimization
---

## useEffectEvent para refs de callbacks estables

Accede a los valores más recientes en los callbacks sin agregarlos a los arrays de dependencias. Evita re-ejecuciones del effect y, al mismo tiempo, evita stale closures.

**Incorrecto (el effect se vuelve a ejecutar en cada cambio del callback):**

```tsx
function SearchInput({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => onSearch(query), 300)
    return () => clearTimeout(timeout)
  }, [query, onSearch])
}
```

**Correcto (usando useEffectEvent de React):**

```tsx
import { useEffectEvent } from 'react';

function SearchInput({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState('')
  const onSearchEvent = useEffectEvent(onSearch)

  useEffect(() => {
    const timeout = setTimeout(() => onSearchEvent(query), 300)
    return () => clearTimeout(timeout)
  }, [query])
}
```
