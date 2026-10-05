---
title: Usa after() para operaciones no bloqueantes
impact: MEDIUM
impactDescription: tiempos de respuesta más rápidos
tags: server, async, logging, analytics, side-effects
---

## Usa after() para operaciones no bloqueantes

Usa `after()` de Next.js para programar el trabajo que debe ejecutarse después de enviar una respuesta. Esto evita que el logging, las analíticas y otros efectos secundarios bloqueen la respuesta.

**Incorrecto (bloquea la respuesta):**

```tsx
import { logUserAction } from '@/app/utils'

export async function POST(request: Request) {
  // Realiza la mutación
  await updateDatabase(request)
  
  // El logging bloquea la respuesta
  const userAgent = request.headers.get('user-agent') || 'unknown'
  await logUserAction({ userAgent })
  
  return new Response(JSON.stringify({ status: 'success' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}
```

**Correcto (no bloqueante):**

```tsx
import { after } from 'next/server'
import { headers, cookies } from 'next/headers'
import { logUserAction } from '@/app/utils'

export async function POST(request: Request) {
  // Realiza la mutación
  await updateDatabase(request)
  
  // Hace el log después de enviar la respuesta
  after(async () => {
    const userAgent = (await headers()).get('user-agent') || 'unknown'
    const sessionCookie = (await cookies()).get('session-id')?.value || 'anonymous'
    
    logUserAction({ sessionCookie, userAgent })
  })
  
  return new Response(JSON.stringify({ status: 'success' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}
```

La respuesta se envía de inmediato mientras el logging ocurre en segundo plano.

**Casos de uso comunes:**

- Seguimiento de analíticas
- Logging de auditoría
- Envío de notificaciones
- Invalidación de la caché
- Tareas de limpieza

**Notas importantes:**

- `after()` se ejecuta aunque la respuesta falle o redirija
- Funciona en Server Actions, Route Handlers y Server Components

Referencia: [https://nextjs.org/docs/app/api-reference/functions/after](https://nextjs.org/docs/app/api-reference/functions/after)
