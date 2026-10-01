---
title: Usa Set/Map para búsquedas O(1)
impact: LOW-MEDIUM
impactDescription: de O(n) a O(1)
tags: javascript, set, map, data-structures, performance
---

## Usa Set/Map para búsquedas O(1)

Convierte los arrays en Set/Map para las verificaciones de pertenencia repetidas.

**Incorrecto (O(n) por verificación):**

```typescript
const allowedIds = ['a', 'b', 'c', ...]
items.filter(item => allowedIds.includes(item.id))
```

**Correcto (O(1) por verificación):**

```typescript
const allowedIds = new Set(['a', 'b', 'c', ...])
items.filter(item => allowedIds.has(item.id))
```
