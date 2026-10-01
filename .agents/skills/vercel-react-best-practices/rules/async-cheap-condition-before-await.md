---
title: Verifica las condiciones baratas antes de los flags asíncronos
impact: HIGH
impactDescription: evita trabajo asíncrono innecesario cuando un guard síncrono ya falla
tags: async, await, feature-flags, short-circuit, conditional
---

## Verifica las condiciones baratas antes de los flags asíncronos

Cuando una rama usa `await` para un flag o un valor remoto y además requiere una condición **síncrona barata** (props locales, metadata de la petición, estado ya cargado), evalúa la condición barata **primero**. De lo contrario, pagas por la llamada asíncrona incluso cuando la condición compuesta nunca puede ser verdadera.

Esta es una especialización de [Difiere el await hasta que sea necesario](./async-defer-await.md) para verificaciones del estilo `flag && cheapCondition`.

**Incorrecto:**

```typescript
const someFlag = await getFlag()

if (someFlag && someCondition) {
  // ...
}
```

**Correcto:**

```typescript
if (someCondition) {
  const someFlag = await getFlag()
  if (someFlag) {
    // ...
  }
}
```

Esto es importante cuando `getFlag` accede a la red, a un servicio de feature flags o a trabajo de `React.cache` / base de datos: omitirlo cuando `someCondition` es false elimina ese costo en el cold path.

Mantén el orden original si `someCondition` es costosa, depende del flag o debes ejecutar efectos secundarios en un orden fijo.
