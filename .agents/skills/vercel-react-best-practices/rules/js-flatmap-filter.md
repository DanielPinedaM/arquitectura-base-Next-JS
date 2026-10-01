---
title: Usa flatMap para hacer map y filter en una sola pasada
impact: LOW-MEDIUM
impactDescription: elimina el array intermedio
tags: javascript, arrays, flatMap, filter, performance
---

## Usa flatMap para hacer map y filter en una sola pasada

**Impacto: LOW-MEDIUM (elimina el array intermedio)**

Encadenar `.map().filter(Boolean)` crea un array intermedio e itera dos veces. Usa `.flatMap()` para transformar y filtrar en una sola pasada.

**Incorrecto (2 iteraciones, array intermedio):**

```typescript
const userNames = users
  .map(user => user.isActive ? user.name : null)
  .filter(Boolean)
```

**Correcto (1 iteración, sin array intermedio):**

```typescript
const userNames = users.flatMap(user =>
  user.isActive ? [user.name] : []
)
```

**Más ejemplos:**

```typescript
// Extrae los emails válidos de las respuestas
// Antes
const emails = responses
  .map(r => r.success ? r.data.email : null)
  .filter(Boolean)

// Después
const emails = responses.flatMap(r =>
  r.success ? [r.data.email] : []
)

// Parsea y filtra los números válidos
// Antes
const numbers = strings
  .map(s => parseInt(s, 10))
  .filter(n => !isNaN(n))

// Después
const numbers = strings.flatMap(s => {
  const n = parseInt(s, 10)
  return isNaN(n) ? [] : [n]
})
```

**Cuándo usarlo:**
- Al transformar elementos mientras se filtran algunos
- En mapeos condicionales donde algunos inputs no producen ningún output
- Al parsear/validar donde los inputs inválidos deben omitirse
