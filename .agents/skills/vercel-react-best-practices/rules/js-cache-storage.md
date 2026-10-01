---
title: Cachea las llamadas a la Storage API
impact: LOW-MEDIUM
impactDescription: reduce la I/O costosa
tags: javascript, localStorage, storage, caching, performance
---

## Cachea las llamadas a la Storage API

`localStorage`, `sessionStorage` y `document.cookie` son síncronos y costosos. Cachea las lecturas en memoria.

**Incorrecto (lee el storage en cada llamada):**

```typescript
function getTheme() {
  return localStorage.getItem('theme') ?? 'light'
}
// Llamada 10 veces = 10 lecturas del storage
```

**Correcto (caché con Map):**

```typescript
const storageCache = new Map<string, string | null>()

function getLocalStorage(key: string) {
  if (!storageCache.has(key)) {
    storageCache.set(key, localStorage.getItem(key))
  }
  return storageCache.get(key)
}

function setLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value)
  storageCache.set(key, value)  // mantén la caché sincronizada
}
```

Usa un Map (no un hook) para que funcione en todas partes: utilidades, event handlers, no solo en componentes de React.

**Caching de cookies:**

```typescript
let cookieCache: Record<string, string> | null = null

function getCookie(name: string) {
  if (!cookieCache) {
    cookieCache = Object.fromEntries(
      document.cookie.split('; ').map(c => c.split('='))
    )
  }
  return cookieCache[name]
}
```

**Importante (invalida ante cambios externos):**

Si el storage puede cambiar externamente (otra pestaña, cookies establecidas por el servidor), invalida la caché:

```typescript
window.addEventListener('storage', (e) => {
  if (e.key) storageCache.delete(e.key)
})

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    storageCache.clear()
  }
})
```
