---
title: Difiere el trabajo no crítico con requestIdleCallback
impact: MEDIUM
impactDescription: mantiene la UI responsiva durante las tareas en segundo plano
tags: javascript, performance, idle, scheduling, analytics
---

## Difiere el trabajo no crítico con requestIdleCallback

**Impacto: MEDIUM (mantiene la UI responsiva durante las tareas en segundo plano)**

Usa `requestIdleCallback()` para programar el trabajo no crítico durante los periodos ociosos del navegador. Esto mantiene el main thread libre para las interacciones del usuario y las animaciones, reduciendo el jank y mejorando el rendimiento percibido.

**Incorrecto (bloquea el main thread durante la interacción del usuario):**

```typescript
function handleSearch(query: string) {
  const results = searchItems(query)
  setResults(results)

  // Esto bloquea el main thread de inmediato
  analytics.track('search', { query })
  saveToRecentSearches(query)
  prefetchTopResults(results.slice(0, 3))
}
```

**Correcto (difiere el trabajo no crítico al tiempo ocioso):**

```typescript
function handleSearch(query: string) {
  const results = searchItems(query)
  setResults(results)

  // Difiere el trabajo no crítico a los periodos ociosos
  requestIdleCallback(() => {
    analytics.track('search', { query })
  })

  requestIdleCallback(() => {
    saveToRecentSearches(query)
  })

  requestIdleCallback(() => {
    prefetchTopResults(results.slice(0, 3))
  })
}
```

**Con timeout para el trabajo obligatorio:**

```typescript
// Asegura que las analíticas se disparen en 2 segundos aunque el navegador siga ocupado
requestIdleCallback(
  () => analytics.track('page_view', { path: location.pathname }),
  { timeout: 2000 }
)
```

**Dividir tareas grandes en chunks:**

```typescript
function processLargeDataset(items: Item[]) {
  let index = 0

  function processChunk(deadline: IdleDeadline) {
    // Procesa elementos mientras haya tiempo ocioso (apunta a chunks de <50ms)
    while (index < items.length && deadline.timeRemaining() > 0) {
      processItem(items[index])
      index++
    }

    // Programa el siguiente chunk si quedan más elementos
    if (index < items.length) {
      requestIdleCallback(processChunk)
    }
  }

  requestIdleCallback(processChunk)
}
```

**Con fallback para navegadores sin soporte:**

```typescript
const scheduleIdleWork = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1))

scheduleIdleWork(() => {
  // Trabajo no crítico
})
```

**Cuándo usarlo:**

- Analíticas y telemetría
- Guardar el estado en localStorage/IndexedDB
- Hacer prefetch de recursos para las siguientes acciones probables
- Procesar transformaciones de datos no urgentes
- Inicialización lazy de funcionalidades no críticas

**Cuándo NO usarlo:**

- Acciones iniciadas por el usuario que necesitan feedback inmediato
- Actualizaciones de renderizado que el usuario está esperando
- Operaciones sensibles al tiempo
