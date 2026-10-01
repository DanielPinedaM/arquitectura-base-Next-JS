---
title: Minimiza la serialización en los límites de RSC
impact: HIGH
impactDescription: reduce el tamaño de la transferencia de datos
tags: server, rsc, serialization, props
---

## Minimiza la serialización en los límites de RSC

El límite Server/Client de React serializa todas las propiedades de los objetos en strings y las incrusta en la respuesta HTML y en las peticiones RSC posteriores. Estos datos serializados impactan directamente en el peso de la página y en el tiempo de carga, por lo que **el tamaño importa mucho**. Pasa solo los campos que el cliente realmente usa.

**Incorrecto (serializa los 50 campos):**

```tsx
async function Page() {
  const user = await fetchUser()  // 50 campos
  return <Profile user={user} />
}

'use client'
function Profile({ user }: { user: User }) {
  return <div>{user.name}</div>  // usa 1 campo
}
```

**Correcto (serializa solo 1 campo):**

```tsx
async function Page() {
  const user = await fetchUser()
  return <Profile name={user.name} />
}

'use client'
function Profile({ name }: { name: string }) {
  return <div>{name}</div>
}
```
