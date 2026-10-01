---
title: Evita el estado compartido del módulo para los datos de la petición
impact: HIGH
impactDescription: evita bugs de concurrencia y fugas de datos entre peticiones
tags: server, rsc, ssr, concurrency, security, state
---

## Evita el estado compartido del módulo para los datos de la petición

En los React Server Components y en los client components renderizados durante el SSR, evita usar variables mutables a nivel de módulo para compartir datos con alcance de petición. Los renders del servidor pueden ejecutarse de forma concurrente en el mismo proceso. Si un render escribe en el estado compartido del módulo y otro render lo lee, puedes obtener race conditions, contaminación entre peticiones y bugs de seguridad en los que los datos de un usuario aparecen en la respuesta de otro usuario.

Trata el scope del módulo en el servidor como memoria compartida de todo el proceso, no como estado local de la petición.

**Incorrecto (los datos de la petición se filtran entre renders concurrentes):**

```tsx
let currentUser: User | null = null

export default async function Page() {
  currentUser = await auth()
  return <Dashboard />
}

async function Dashboard() {
  return <div>{currentUser?.name}</div>
}
```

Si dos peticiones se superponen, la petición A puede establecer `currentUser`, y luego la petición B lo sobrescribe antes de que la petición A termine de renderizar `Dashboard`.

**Correcto (mantén los datos de la petición locales al árbol de render):**

```tsx
export default async function Page() {
  const user = await auth()
  return <Dashboard user={user} />
}

function Dashboard({ user }: { user: User | null }) {
  return <div>{user?.name}</div>
}
```

Excepciones seguras:

- Assets estáticos inmutables o configuración cargados una vez en el scope del módulo
- Cachés compartidas diseñadas intencionalmente para reutilizarse entre peticiones y con las keys correctas
- Singletons de todo el proceso que no almacenan datos mutables específicos de la petición o del usuario

Para los assets estáticos y la configuración, consulta [Haz hoisting de la I/O estática al nivel del módulo](./server-hoist-static-io.md).
