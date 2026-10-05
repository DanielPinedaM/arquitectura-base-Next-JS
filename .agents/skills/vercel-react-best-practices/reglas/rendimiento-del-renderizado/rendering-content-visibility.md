---
title: content-visibility de CSS para listas largas
impact: HIGH
impactDescription: render inicial más rápido
tags: rendering, css, content-visibility, long-lists
---

## content-visibility de CSS para listas largas

Aplica `content-visibility: auto` para diferir el renderizado de lo que está fuera de la pantalla.

**CSS:**

```css
.message-item {
  content-visibility: auto;
  contain-intrinsic-size: 0 80px;
}
```

**Ejemplo:**

```tsx
function MessageList({ messages }: { messages: Message[] }) {
  return (
    <div className="overflow-y-auto h-screen">
      {messages.map(msg => (
        <div key={msg.id} className="message-item">
          <Avatar user={msg.author} />
          <div>{msg.content}</div>
        </div>
      ))}
    </div>
  )
}
```

Para 1000 mensajes, el navegador omite el layout/paint de ~990 elementos fuera de la pantalla (render inicial 10× más rápido).
