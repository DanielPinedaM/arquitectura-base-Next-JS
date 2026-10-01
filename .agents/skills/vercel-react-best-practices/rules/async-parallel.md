---
title: Promise.all() para operaciones independientes
impact: CRITICAL
impactDescription: mejora de 2-10×
tags: async, parallelization, promises, waterfalls
---

## Promise.all() para operaciones independientes

Cuando las operaciones asíncronas no tienen interdependencias, ejecútalas de forma concurrente usando `Promise.all()`.

**Incorrecto (ejecución secuencial, 3 round trips):**

```typescript
const user = await fetchUser()
const posts = await fetchPosts()
const comments = await fetchComments()
```

**Correcto (ejecución en paralelo, 1 round trip):**

```typescript
const [user, posts, comments] = await Promise.all([
  fetchUser(),
  fetchPosts(),
  fetchComments()
])
```
