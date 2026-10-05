---
title: Early return en las funciones
impact: LOW-MEDIUM
impactDescription: evita cómputos innecesarios
tags: javascript, functions, optimization, early-return
---

## Early return en las funciones

Retorna temprano cuando el resultado ya está determinado para omitir el procesamiento innecesario.

**Incorrecto (procesa todos los elementos incluso después de encontrar la respuesta):**

```typescript
function validateUsers(users: User[]) {
  let hasError = false
  let errorMessage = ''
  
  for (const user of users) {
    if (!user.email) {
      hasError = true
      errorMessage = 'Email required'
    }
    if (!user.name) {
      hasError = true
      errorMessage = 'Name required'
    }
    // Sigue verificando todos los usuarios incluso después de encontrar un error
  }
  
  return hasError ? { valid: false, error: errorMessage } : { valid: true }
}
```

**Correcto (retorna de inmediato en el primer error):**

```typescript
function validateUsers(users: User[]) {
  for (const user of users) {
    if (!user.email) {
      return { valid: false, error: 'Email required' }
    }
    if (!user.name) {
      return { valid: false, error: 'Name required' }
    }
  }

  return { valid: true }
}
```
