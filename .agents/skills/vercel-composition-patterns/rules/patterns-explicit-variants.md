---
title: Crea variantes explícitas de componentes
impact: MEDIUM
impactDescription: código autodocumentado, sin condicionales ocultos
tags: composition, variants, architecture
---

## Crea variantes explícitas de componentes

En lugar de un solo componente con muchas props booleanas, crea componentes de variantes
explícitas. Cada variante compone las piezas que necesita. El código se documenta
a sí mismo.

**Incorrecto (un componente, muchos modos):**

```tsx
// ¿Qué renderiza realmente este componente?
<Composer
  isThread
  isEditing={false}
  channelId='abc'
  showAttachments
  showFormatting={false}
/>
```

**Correcto (variantes explícitas):**

```tsx
// Queda inmediatamente claro lo que esto renderiza
<ThreadComposer channelId="abc" />

// O
<EditMessageComposer messageId="xyz" />

// O
<ForwardMessageComposer messageId="123" />
```

Cada implementación es única, explícita y autocontenida. Aun así, cada una puede
usar partes compartidas.

**Implementación:**

```tsx
function ThreadComposer({ channelId }: { channelId: string }) {
  return (
    <ThreadProvider channelId={channelId}>
      <Composer.Frame>
        <Composer.Input />
        <AlsoSendToChannelField channelId={channelId} />
        <Composer.Footer>
          <Composer.Formatting />
          <Composer.Emojis />
          <Composer.Submit />
        </Composer.Footer>
      </Composer.Frame>
    </ThreadProvider>
  )
}

function EditMessageComposer({ messageId }: { messageId: string }) {
  return (
    <EditMessageProvider messageId={messageId}>
      <Composer.Frame>
        <Composer.Input />
        <Composer.Footer>
          <Composer.Formatting />
          <Composer.Emojis />
          <Composer.CancelEdit />
          <Composer.SaveEdit />
        </Composer.Footer>
      </Composer.Frame>
    </EditMessageProvider>
  )
}

function ForwardMessageComposer({ messageId }: { messageId: string }) {
  return (
    <ForwardMessageProvider messageId={messageId}>
      <Composer.Frame>
        <Composer.Input placeholder="Add a message, if you'd like." />
        <Composer.Footer>
          <Composer.Formatting />
          <Composer.Emojis />
          <Composer.Mentions />
        </Composer.Footer>
      </Composer.Frame>
    </ForwardMessageProvider>
  )
}
```

Cada variante es explícita sobre:

- Qué provider/estado usa
- Qué elementos de UI incluye
- Qué acciones están disponibles

No hay combinaciones de props booleanas sobre las que razonar. No hay estados imposibles.
