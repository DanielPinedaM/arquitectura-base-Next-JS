---
title: Autentica las Server Actions como las API routes
impact: CRITICAL
impactDescription: evita el acceso no autorizado a las mutaciones del servidor
tags: server, server-actions, authentication, security, authorization
---

## Autentica las Server Actions como las API routes

**Impacto: CRITICAL (evita el acceso no autorizado a las mutaciones del servidor)**

Las Server Actions (funciones con `"use server"`) se exponen como endpoints públicos, igual que las API routes. Verifica siempre la autenticación y la autorización **dentro** de cada Server Action; no dependas únicamente del middleware, de los guards del layout ni de las verificaciones a nivel de página, ya que las Server Actions pueden invocarse directamente.

La documentación de Next.js lo indica explícitamente: "Trata las Server Actions con las mismas consideraciones de seguridad que los endpoints de API públicos, y verifica si el usuario tiene permitido realizar una mutación."

**Incorrecto (sin verificación de autenticación):**

```typescript
'use server'

export async function deleteUser(userId: string) {
  // ¡Cualquiera puede llamar a esto! Sin verificación de autenticación
  await db.user.delete({ where: { id: userId } })
  return { success: true }
}
```

**Correcto (autenticación dentro de la action):**

```typescript
'use server'

import { verifySession } from '@/lib/auth'
import { unauthorized } from '@/lib/errors'

export async function deleteUser(userId: string) {
  // Verifica siempre la autenticación dentro de la action
  const session = await verifySession()
  
  if (!session) {
    throw unauthorized('Must be logged in')
  }
  
  // Verifica también la autorización
  if (session.user.role !== 'admin' && session.user.id !== userId) {
    throw unauthorized('Cannot delete other users')
  }
  
  await db.user.delete({ where: { id: userId } })
  return { success: true }
}
```

**Con validación del input:**

```typescript
'use server'

import { verifySession } from '@/lib/auth'
import { z } from 'zod'

const updateProfileSchema = z.object({
  userId: z.string().uuid(),
  name: z.string().min(1).max(100),
  email: z.string().email()
})

export async function updateProfile(data: unknown) {
  // Valida primero el input
  const validated = updateProfileSchema.parse(data)
  
  // Luego autentica
  const session = await verifySession()
  if (!session) {
    throw new Error('Unauthorized')
  }
  
  // Luego autoriza
  if (session.user.id !== validated.userId) {
    throw new Error('Can only update own profile')
  }
  
  // Finalmente realiza la mutación
  await db.user.update({
    where: { id: validated.userId },
    data: {
      name: validated.name,
      email: validated.email
    }
  })
  
  return { success: true }
}
```

Referencia: [https://nextjs.org/docs/app/guides/authentication](https://nextjs.org/docs/app/guides/authentication)
