---
title: Cachea el acceso a propiedades en los bucles
impact: LOW-MEDIUM
impactDescription: reduce las búsquedas
tags: javascript, loops, optimization, caching
---

## Cachea el acceso a propiedades en los bucles

Cachea las búsquedas de propiedades de objetos en los hot paths.

**Incorrecto (3 búsquedas × N iteraciones):**

```typescript
for (let i = 0; i < arr.length; i++) {
  process(obj.config.settings.value)
}
```

**Correcto (1 búsqueda en total):**

```typescript
const value = obj.config.settings.value
const len = arr.length
for (let i = 0; i < len; i++) {
  process(value)
}
```
