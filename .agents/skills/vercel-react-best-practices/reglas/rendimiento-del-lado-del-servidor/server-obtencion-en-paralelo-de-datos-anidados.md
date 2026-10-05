---
title: Obtención en paralelo de datos anidados
impact: CRITICAL
impactDescription: elimina los waterfalls del lado del servidor
tags: server, rsc, parallel-fetching, promise-chaining
---

## Obtención en paralelo de datos anidados

Al obtener datos anidados en paralelo, encadena los fetches dependientes dentro de la promise de cada elemento para que un elemento lento no bloquee al resto.

**Incorrecto (un solo elemento lento bloquea todos los fetches anidados):**

```tsx
const chats = await Promise.all(
  chatIds.map(id => getChat(id))
)

const chatAuthors = await Promise.all(
  chats.map(chat => getUser(chat.author))
)
```

Si un `getChat(id)` de 100 es extremadamente lento, los autores de los otros 99 chats no pueden empezar a cargarse aunque sus datos estén listos.

**Correcto (cada elemento encadena su propio fetch anidado):**

```tsx
const chatAuthors = await Promise.all(
  chatIds.map(id => getChat(id).then(chat => getUser(chat.author)))
)
```

Cada elemento encadena de forma independiente `getChat` → `getUser`, de modo que un chat lento no bloquea los fetches de los autores de los demás.
