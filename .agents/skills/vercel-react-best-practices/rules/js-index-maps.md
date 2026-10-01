---
title: Construye index maps para búsquedas repetidas
impact: LOW-MEDIUM
impactDescription: de 1M operaciones a 2K operaciones
tags: javascript, map, indexing, optimization, performance
---

## Construye index maps para búsquedas repetidas

Múltiples llamadas a `.find()` por la misma key deben usar un Map.

**Incorrecto (O(n) por búsqueda):**

```typescript
function processOrders(orders: Order[], users: User[]) {
  return orders.map(order => ({
    ...order,
    user: users.find(u => u.id === order.userId)
  }))
}
```

**Correcto (O(1) por búsqueda):**

```typescript
function processOrders(orders: Order[], users: User[]) {
  const userById = new Map(users.map(u => [u.id, u]))

  return orders.map(order => ({
    ...order,
    user: userById.get(order.userId)
  }))
}
```

Construye el map una vez (O(n)), y luego todas las búsquedas son O(1).
Para 1000 órdenes × 1000 usuarios: 1M operaciones → 2K operaciones.
