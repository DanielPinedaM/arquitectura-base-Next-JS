---
title: Caching LRU entre peticiones
impact: HIGH
impactDescription: cachea entre peticiones
tags: server, cache, lru, cross-request
---

## Caching LRU entre peticiones

`React.cache()` solo funciona dentro de una petición. Para los datos compartidos entre peticiones secuenciales (el usuario hace clic en el botón A y luego en el botón B), usa una caché LRU.

**Implementación:**

```typescript
import { LRUCache } from 'lru-cache'

const cache = new LRUCache<string, any>({
  max: 1000,
  ttl: 5 * 60 * 1000  // 5 minutos
})

export async function getUser(id: string) {
  const cached = cache.get(id)
  if (cached) return cached

  const user = await db.user.findUnique({ where: { id } })
  cache.set(id, user)
  return user
}

// Petición 1: query a la base de datos, resultado cacheado
// Petición 2: cache hit, sin query a la base de datos
```

Úsala cuando las acciones secuenciales del usuario llamen a múltiples endpoints que necesiten los mismos datos en cuestión de segundos.

**Con [Fluid Compute](https://vercel.com/docs/fluid-compute) de Vercel:** El caching LRU es especialmente efectivo porque múltiples peticiones concurrentes pueden compartir la misma instancia de la función y la caché. Esto significa que la caché persiste entre peticiones sin necesitar un almacenamiento externo como Redis.

**En serverless tradicional:** Cada invocación se ejecuta de forma aislada, así que considera Redis para el caching entre procesos.

Referencia: [https://github.com/isaacs/node-lru-cache](https://github.com/isaacs/node-lru-cache)
