---
title: Desacopla la gestión del estado de la UI
impact: MEDIUM
impactDescription: permite intercambiar implementaciones de estado sin cambiar la UI
tags: composition, state, architecture
---

## Desacopla la gestión del estado de la UI

El componente provider debe ser el único lugar que sabe cómo se gestiona el estado.
Los componentes de UI consumen la interfaz del context; no saben si el estado viene de
useState, de Zustand o de una sincronización con el servidor.

**Incorrecto (UI acoplada a la implementación del estado):**

```tsx
function ChannelComposer({ channelId }: { channelId: string }) {
  // El componente de UI conoce la implementación del estado global
  const state = useGlobalChannelState(channelId)
  const { submit, updateInput } = useChannelSync(channelId)

  return (
    <Composer.Frame>
      <Composer.Input
        value={state.input}
        onChange={(text) => sync.updateInput(text)}
      />
      <Composer.Submit onPress={() => sync.submit()} />
    </Composer.Frame>
  )
}
```

**Correcto (gestión del estado aislada en el provider):**

```tsx
// El provider maneja todos los detalles de la gestión del estado
function ChannelProvider({
  channelId,
  children,
}: {
  channelId: string
  children: React.ReactNode
}) {
  const { state, update, submit } = useGlobalChannel(channelId)
  const inputRef = useRef(null)

  return (
    <Composer.Provider
      state={state}
      actions={{ update, submit }}
      meta={{ inputRef }}
    >
      {children}
    </Composer.Provider>
  )
}

// El componente de UI solo conoce la interfaz del context
function ChannelComposer() {
  return (
    <Composer.Frame>
      <Composer.Header />
      <Composer.Input />
      <Composer.Footer>
        <Composer.Submit />
      </Composer.Footer>
    </Composer.Frame>
  )
}

// Uso
function Channel({ channelId }: { channelId: string }) {
  return (
    <ChannelProvider channelId={channelId}>
      <ChannelComposer />
    </ChannelProvider>
  )
}
```

**Diferentes providers, la misma UI:**

```tsx
// Estado local para formularios efímeros
function ForwardMessageProvider({ children }) {
  const [state, setState] = useState(initialState)
  const forwardMessage = useForwardMessage()

  return (
    <Composer.Provider
      state={state}
      actions={{ update: setState, submit: forwardMessage }}
    >
      {children}
    </Composer.Provider>
  )
}

// Estado global sincronizado para canales
function ChannelProvider({ channelId, children }) {
  const { state, update, submit } = useGlobalChannel(channelId)

  return (
    <Composer.Provider state={state} actions={{ update, submit }}>
      {children}
    </Composer.Provider>
  )
}
```

El mismo componente `Composer.Input` funciona con ambos providers porque solo
depende de la interfaz del context, no de la implementación.
