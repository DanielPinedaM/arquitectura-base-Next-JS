---
title: Deduplica los event listeners globales
impact: LOW
impactDescription: un solo listener para N componentes
tags: client, swr, event-listeners, subscription
---

## Deduplica los event listeners globales

Usa `useSWRSubscription()` para compartir los event listeners globales entre las instancias de un componente.

**Incorrecto (N instancias = N listeners):**

```tsx
function useKeyboardShortcut(key: string, callback: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === key) {
        callback()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [key, callback])
}
```

Al usar el hook `useKeyboardShortcut` varias veces, cada instancia registrará un nuevo listener.

**Correcto (N instancias = 1 listener):**

```tsx
import useSWRSubscription from 'swr/subscription'

// Map a nivel de módulo para rastrear los callbacks por key
const keyCallbacks = new Map<string, Set<() => void>>()

function useKeyboardShortcut(key: string, callback: () => void) {
  // Registra este callback en el Map
  useEffect(() => {
    if (!keyCallbacks.has(key)) {
      keyCallbacks.set(key, new Set())
    }
    keyCallbacks.get(key)!.add(callback)

    return () => {
      const set = keyCallbacks.get(key)
      if (set) {
        set.delete(callback)
        if (set.size === 0) {
          keyCallbacks.delete(key)
        }
      }
    }
  }, [key, callback])

  useSWRSubscription('global-keydown', () => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey && keyCallbacks.has(e.key)) {
        keyCallbacks.get(e.key)!.forEach(cb => cb())
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  })
}

function Profile() {
  // Múltiples shortcuts compartirán el mismo listener
  useKeyboardShortcut('p', () => { /* ... */ }) 
  useKeyboardShortcut('k', () => { /* ... */ })
  // ...
}
```
