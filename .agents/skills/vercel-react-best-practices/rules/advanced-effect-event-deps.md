---
title: No pongas los Effect Events en los arrays de dependencias
impact: LOW
impactDescription: evita re-ejecuciones innecesarias del effect y errores de lint
tags: advanced, hooks, useEffectEvent, dependencies, effects
---

## No pongas los Effect Events en los arrays de dependencias

Las funciones Effect Event no tienen una identidad estable. Su identidad cambia intencionalmente en cada render. No incluyas la función devuelta por `useEffectEvent` en el array de dependencias de un `useEffect`. Mantén los valores reactivos reales como dependencias y llama al Effect Event desde dentro del cuerpo del effect o desde las suscripciones creadas por ese effect.

**Incorrecto (Effect Event agregado como dependencia):**

```tsx
import { useEffect, useEffectEvent } from 'react'

function ChatRoom({ roomId, onConnected }: {
  roomId: string
  onConnected: () => void
}) {
  const handleConnected = useEffectEvent(onConnected)

  useEffect(() => {
    const connection = createConnection(roomId)
    connection.on('connected', handleConnected)
    connection.connect()

    return () => connection.disconnect()
  }, [roomId, handleConnected])
}
```

Incluir el Effect Event en las dependencias hace que el effect se vuelva a ejecutar en cada render y dispara la regla de lint de React Hooks.

**Correcto (depende de los valores reactivos, no del Effect Event):**

```tsx
import { useEffect, useEffectEvent } from 'react'

function ChatRoom({ roomId, onConnected }: {
  roomId: string
  onConnected: () => void
}) {
  const handleConnected = useEffectEvent(onConnected)

  useEffect(() => {
    const connection = createConnection(roomId)
    connection.on('connected', handleConnected)
    connection.connect()

    return () => connection.disconnect()
  }, [roomId])
}
```

Referencia: [React useEffectEvent: Effect Event en las dependencias](https://react.dev/reference/react/useEffectEvent#effect-event-in-deps)
