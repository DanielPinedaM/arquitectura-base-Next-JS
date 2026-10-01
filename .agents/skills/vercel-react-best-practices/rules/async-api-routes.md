---
title: Evita las cadenas de waterfalls en las API routes
impact: CRITICAL
impactDescription: mejora de 2-10×
tags: api-routes, server-actions, waterfalls, parallelization
---

## Evita las cadenas de waterfalls en las API routes

En las API routes y las Server Actions, inicia las operaciones independientes de inmediato, aunque todavía no hagas await de ellas.

**Incorrecto (config espera a auth, data espera a ambos):**

```typescript
export async function GET(request: Request) {
  const session = await auth()
  const config = await fetchConfig()
  const data = await fetchData(session.user.id)
  return Response.json({ data, config })
}
```

**Correcto (auth y config se inician de inmediato):**

```typescript
export async function GET(request: Request) {
  const sessionPromise = auth()
  const configPromise = fetchConfig()
  const session = await sessionPromise
  const [config, data] = await Promise.all([
    configPromise,
    fetchData(session.user.id)
  ])
  return Response.json({ data, config })
}
```

Para operaciones con cadenas de dependencias más complejas, usa `better-all` para maximizar automáticamente el paralelismo (consulta Paralelización basada en dependencias).
