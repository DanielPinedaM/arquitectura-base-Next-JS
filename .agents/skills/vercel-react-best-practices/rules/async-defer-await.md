---
title: Difiere el await hasta que sea necesario
impact: HIGH
impactDescription: evita bloquear code paths que no se usan
tags: async, await, conditional, optimization
---

## Difiere el await hasta que sea necesario

Mueve las operaciones `await` a las ramas donde realmente se usan para evitar bloquear code paths que no las necesitan.

**Incorrecto (bloquea ambas ramas):**

```typescript
async function handleRequest(userId: string, skipProcessing: boolean) {
  const userData = await fetchUserData(userId)
  
  if (skipProcessing) {
    // Retorna de inmediato, pero aun así esperó a userData
    return { skipped: true }
  }
  
  // Solo esta rama usa userData
  return processUserData(userData)
}
```

**Correcto (solo bloquea cuando es necesario):**

```typescript
async function handleRequest(userId: string, skipProcessing: boolean) {
  if (skipProcessing) {
    // Retorna de inmediato sin esperar
    return { skipped: true }
  }
  
  // Obtiene los datos solo cuando es necesario
  const userData = await fetchUserData(userId)
  return processUserData(userData)
}
```

**Otro ejemplo (optimización con early return):**

```typescript
// Incorrecto: siempre obtiene los permisos
async function updateResource(resourceId: string, userId: string) {
  const permissions = await fetchPermissions(userId)
  const resource = await getResource(resourceId)
  
  if (!resource) {
    return { error: 'Not found' }
  }
  
  if (!permissions.canEdit) {
    return { error: 'Forbidden' }
  }
  
  return await updateResourceData(resource, permissions)
}

// Correcto: obtiene los datos solo cuando es necesario
async function updateResource(resourceId: string, userId: string) {
  const resource = await getResource(resourceId)
  
  if (!resource) {
    return { error: 'Not found' }
  }
  
  const permissions = await fetchPermissions(userId)
  
  if (!permissions.canEdit) {
    return { error: 'Forbidden' }
  }
  
  return await updateResourceData(resource, permissions)
}
```

Esta optimización es especialmente valiosa cuando la rama omitida se toma con frecuencia, o cuando la operación diferida es costosa.

Para `await getFlag()` combinado con un guard síncrono barato (`flag && someCondition`), consulta [Verifica las condiciones baratas antes de los flags asíncronos](./async-cheap-condition-before-await.md).
