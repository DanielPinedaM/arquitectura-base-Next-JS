---
title: Evita la serialización duplicada en las props de RSC
impact: LOW
impactDescription: reduce el payload de red al evitar la serialización duplicada
tags: server, rsc, serialization, props, client-components
---

## Evita la serialización duplicada en las props de RSC

**Impacto: LOW (reduce el payload de red al evitar la serialización duplicada)**

La serialización RSC→cliente deduplica por referencia de objeto, no por valor. Misma referencia = se serializa una vez; nueva referencia = se serializa de nuevo. Haz las transformaciones (`.toSorted()`, `.filter()`, `.map()`) en el cliente, no en el servidor.

**Incorrecto (duplica el array):**

```tsx
// RSC: envía 6 strings (2 arrays × 3 elementos)
<ClientList usernames={usernames} usernamesOrdered={usernames.toSorted()} />
```

**Correcto (envía 3 strings):**

```tsx
// RSC: envía una sola vez
<ClientList usernames={usernames} />

// Cliente: transforma ahí
'use client'
const sorted = useMemo(() => [...usernames].sort(), [usernames])
```

**Comportamiento de la deduplicación anidada:**

La deduplicación funciona de forma recursiva. El impacto varía según el tipo de dato:

- `string[]`, `number[]`, `boolean[]`: **Impacto HIGH** - el array + todos los primitivos se duplican por completo
- `object[]`: **Impacto LOW** - el array se duplica, pero los objetos anidados se deduplican por referencia

```tsx
// string[] - duplica todo
usernames={['a','b']} sorted={usernames.toSorted()} // envía 4 strings

// object[] - duplica solo la estructura del array
users={[{id:1},{id:2}]} sorted={users.toSorted()} // envía 2 arrays + 2 objetos únicos (no 4)
```

**Operaciones que rompen la deduplicación (crean nuevas referencias):**

- Arrays: `.toSorted()`, `.filter()`, `.map()`, `.slice()`, `[...arr]`
- Objetos: `{...obj}`, `Object.assign()`, `structuredClone()`, `JSON.parse(JSON.stringify())`

**Más ejemplos:**

```tsx
// ❌ Mal
<C users={users} active={users.filter(u => u.active)} />
<C product={product} productName={product.name} />

// ✅ Bien
<C users={users} />
<C product={product} />
// Haz el filtrado/la desestructuración en el cliente
```

**Excepción:** Pasa datos derivados cuando la transformación sea costosa o el cliente no necesite el original.
