---
title: Usa toSorted() en lugar de sort() para la inmutabilidad
impact: MEDIUM-HIGH
impactDescription: evita bugs de mutación en el estado de React
tags: javascript, arrays, immutability, react, state, mutation
---

## Usa toSorted() en lugar de sort() para la inmutabilidad

`.sort()` muta el array in-place, lo que puede provocar bugs con el estado y las props de React. Usa `.toSorted()` para crear un nuevo array ordenado sin mutación.

**Incorrecto (muta el array original):**

```typescript
function UserList({ users }: { users: User[] }) {
  // ¡Muta el array de la prop users!
  const sorted = useMemo(
    () => users.sort((a, b) => a.name.localeCompare(b.name)),
    [users]
  )
  return <div>{sorted.map(renderUser)}</div>
}
```

**Correcto (crea un nuevo array):**

```typescript
function UserList({ users }: { users: User[] }) {
  // Crea un nuevo array ordenado, el original no cambia
  const sorted = useMemo(
    () => users.toSorted((a, b) => a.name.localeCompare(b.name)),
    [users]
  )
  return <div>{sorted.map(renderUser)}</div>
}
```

**Por qué es importante en React:**

1. Las mutaciones de props/estado rompen el modelo de inmutabilidad de React: React espera que las props y el estado se traten como de solo lectura
2. Provoca bugs de stale closures: mutar arrays dentro de closures (callbacks, effects) puede llevar a un comportamiento inesperado

**Soporte de navegadores (fallback para navegadores antiguos):**

`.toSorted()` está disponible en todos los navegadores modernos (Chrome 110+, Safari 16+, Firefox 115+, Node.js 20+). Para entornos más antiguos, usa el spread operator:

```typescript
// Fallback para navegadores antiguos
const sorted = [...items].sort((a, b) => a.value - b.value)
```

**Otros métodos inmutables de arrays:**

- `.toSorted()` - sort inmutable
- `.toReversed()` - reverse inmutable
- `.toSpliced()` - splice inmutable
- `.with()` - reemplazo inmutable de elementos
