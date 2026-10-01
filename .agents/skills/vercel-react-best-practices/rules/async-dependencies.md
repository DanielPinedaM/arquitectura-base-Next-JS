---
title: Paralelización basada en dependencias
impact: CRITICAL
impactDescription: mejora de 2-10×
tags: async, parallelization, dependencies, better-all
---

## Paralelización basada en dependencias

Para operaciones con dependencias parciales, usa `better-all` para maximizar el paralelismo. Inicia automáticamente cada tarea en el momento más temprano posible.

**Incorrecto (profile espera a config innecesariamente):**

```typescript
const [user, config] = await Promise.all([
  fetchUser(),
  fetchConfig()
])
const profile = await fetchProfile(user.id)
```

**Correcto (config y profile se ejecutan en paralelo):**

```typescript
import { all } from 'better-all'

const { user, config, profile } = await all({
  async user() { return fetchUser() },
  async config() { return fetchConfig() },
  async profile() {
    return fetchProfile((await this.$.user).id)
  }
})
```

**Alternativa sin dependencias adicionales:**

También podemos crear primero todas las promises y hacer `Promise.all()` al final.

```typescript
const userPromise = fetchUser()
const profilePromise = userPromise.then(user => fetchProfile(user.id))

const [user, config, profile] = await Promise.all([
  userPromise,
  fetchConfig(),
  profilePromise
])
```

Referencia: [https://github.com/shuding/better-all](https://github.com/shuding/better-all)
