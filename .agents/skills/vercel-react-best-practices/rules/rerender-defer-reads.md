---
title: Difiere las lecturas del estado al punto de uso
impact: MEDIUM
impactDescription: evita suscripciones innecesarias
tags: rerender, searchParams, localStorage, optimization
---

## Difiere las lecturas del estado al punto de uso

No te suscribas a un estado dinámico (searchParams, localStorage) si solo lo lees dentro de callbacks.

**Incorrecto (se suscribe a todos los cambios de searchParams):**

```tsx
function ShareButton({ chatId }: { chatId: string }) {
  const searchParams = useSearchParams()

  const handleShare = () => {
    const ref = searchParams.get('ref')
    shareChat(chatId, { ref })
  }

  return <button onClick={handleShare}>Share</button>
}
```

**Correcto (lee bajo demanda, sin suscripción):**

```tsx
function ShareButton({ chatId }: { chatId: string }) {
  const handleShare = () => {
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')
    shareChat(chatId, { ref })
  }

  return <button onClick={handleShare}>Share</button>
}
```
