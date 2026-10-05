---
title: Deduplicación por petición con React.cache()
impact: MEDIUM
impactDescription: deduplica dentro de la petición
tags: server, cache, react-cache, deduplication
---

## Deduplicación por petición con React.cache()

Usa `React.cache()` para la deduplicación de peticiones del lado del servidor. La autenticación y las queries a la base de datos son las que más se benefician.

**Uso:**

```typescript
import { cache } from 'react'

export const getCurrentUser = cache(async () => {
  const session = await auth()
  if (!session?.user?.id) return null
  return await db.user.findUnique({
    where: { id: session.user.id }
  })
})
```

Dentro de una sola petición, múltiples llamadas a `getCurrentUser()` ejecutan la query solo una vez.

**Evita los objetos inline como argumentos:**

`React.cache()` usa igualdad superficial (`Object.is`) para determinar los cache hits. Los objetos inline crean nuevas referencias en cada llamada, lo que impide los cache hits.

**Incorrecto (siempre cache miss):**

```typescript
const getUser = cache(async (params: { uid: number }) => {
  return await db.user.findUnique({ where: { id: params.uid } })
})

// Cada llamada crea un nuevo objeto, nunca hay cache hit
getUser({ uid: 1 })
getUser({ uid: 1 })  // Cache miss, ejecuta la query de nuevo
```

**Correcto (cache hit):**

```typescript
const getUser = cache(async (uid: number) => {
  return await db.user.findUnique({ where: { id: uid } })
})

// Los argumentos primitivos usan igualdad por valor
getUser(1)
getUser(1)  // Cache hit, devuelve el resultado cacheado
```

Si debes pasar objetos, pasa la misma referencia:

```typescript
const params = { uid: 1 }
getUser(params)  // Se ejecuta la query
getUser(params)  // Cache hit (misma referencia)
```

**Nota específica de Next.js:**

En Next.js, la API `fetch` se extiende automáticamente con request memoization. Las peticiones con la misma URL y las mismas opciones se deduplican automáticamente dentro de una sola petición, por lo que no necesitas `React.cache()` para las llamadas a `fetch`. Sin embargo, `React.cache()` sigue siendo esencial para otras tareas asíncronas:

- Queries a la base de datos (Prisma, Drizzle, etc.)
- Cómputos pesados
- Verificaciones de autenticación
- Operaciones del sistema de archivos
- Cualquier trabajo asíncrono que no sea fetch

Usa `React.cache()` para deduplicar estas operaciones a lo largo de tu árbol de componentes.

Referencia: [Documentación de React.cache](https://react.dev/reference/react/cache)
