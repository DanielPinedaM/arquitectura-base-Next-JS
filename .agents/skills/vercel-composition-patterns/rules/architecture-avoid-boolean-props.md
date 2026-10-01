---
title: Evita la proliferación de props booleanas
impact: CRITICAL
impactDescription: evita variantes de componentes inmantenibles
tags: composition, props, architecture
---

## Evita la proliferación de props booleanas

No agregues props booleanas como `isThread`, `isEditing`, `isDMThread` para personalizar
el comportamiento de un componente. Cada booleano duplica los estados posibles y crea
lógica condicional inmantenible. Usa composición en su lugar.

**Incorrecto (las props booleanas crean una complejidad exponencial):**

```tsx
function Composer({
  onSubmit,
  isThread,
  channelId,
  isDMThread,
  dmId,
  isEditing,
  isForwarding,
}: Props) {
  return (
    <form>
      <Header />
      <Input />
      {isDMThread ? (
        <AlsoSendToDMField id={dmId} />
      ) : isThread ? (
        <AlsoSendToChannelField id={channelId} />
      ) : null}
      {isEditing ? (
        <EditActions />
      ) : isForwarding ? (
        <ForwardActions />
      ) : (
        <DefaultActions />
      )}
      <Footer onSubmit={onSubmit} />
    </form>
  )
}
```

**Correcto (la composición elimina los condicionales):**

```tsx
// Composer de canal
function ChannelComposer() {
  return (
    <Composer.Frame>
      <Composer.Header />
      <Composer.Input />
      <Composer.Footer>
        <Composer.Attachments />
        <Composer.Formatting />
        <Composer.Emojis />
        <Composer.Submit />
      </Composer.Footer>
    </Composer.Frame>
  )
}

// Composer de hilo - agrega el campo "también enviar al canal"
function ThreadComposer({ channelId }: { channelId: string }) {
  return (
    <Composer.Frame>
      <Composer.Header />
      <Composer.Input />
      <AlsoSendToChannelField id={channelId} />
      <Composer.Footer>
        <Composer.Formatting />
        <Composer.Emojis />
        <Composer.Submit />
      </Composer.Footer>
    </Composer.Frame>
  )
}

// Composer de edición - acciones diferentes en el footer
function EditComposer() {
  return (
    <Composer.Frame>
      <Composer.Input />
      <Composer.Footer>
        <Composer.Formatting />
        <Composer.Emojis />
        <Composer.CancelEdit />
        <Composer.SaveEdit />
      </Composer.Footer>
    </Composer.Frame>
  )
}
```

Cada variante es explícita sobre lo que renderiza. Podemos compartir los elementos internos sin
compartir un único padre monolítico.
