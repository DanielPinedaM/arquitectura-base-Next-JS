---
title: Combina múltiples iteraciones de arrays
impact: LOW-MEDIUM
impactDescription: reduce las iteraciones
tags: javascript, arrays, loops, performance
---

## Combina múltiples iteraciones de arrays

Múltiples llamadas a `.filter()` o `.map()` iteran el array varias veces. Combínalas en un solo bucle.

**Incorrecto (3 iteraciones):**

```typescript
const admins = users.filter(u => u.isAdmin)
const testers = users.filter(u => u.isTester)
const inactive = users.filter(u => !u.isActive)
```

**Correcto (1 iteración):**

```typescript
const admins: User[] = []
const testers: User[] = []
const inactive: User[] = []

for (const user of users) {
  if (user.isAdmin) admins.push(user)
  if (user.isTester) testers.push(user)
  if (!user.isActive) inactive.push(user)
}
```
