---
title: Pon la lógica de interacción en los event handlers
impact: MEDIUM
impactDescription: evita re-ejecuciones del effect y efectos secundarios duplicados
tags: rerender, useEffect, events, side-effects, dependencies
---

## Pon la lógica de interacción en los event handlers

Si un efecto secundario lo dispara una acción específica del usuario (submit, click, drag), ejecútalo en ese event handler. No modeles la acción como estado + effect; eso hace que los effects se vuelvan a ejecutar ante cambios no relacionados y puede duplicar la acción.

**Incorrecto (evento modelado como estado + effect):**

```tsx
function Form() {
  const [submitted, setSubmitted] = useState(false)
  const theme = useContext(ThemeContext)

  useEffect(() => {
    if (submitted) {
      post('/api/register')
      showToast('Registered', theme)
    }
  }, [submitted, theme])

  return <button onClick={() => setSubmitted(true)}>Submit</button>
}
```

**Correcto (hazlo en el handler):**

```tsx
function Form() {
  const theme = useContext(ThemeContext)

  function handleSubmit() {
    post('/api/register')
    showToast('Registered', theme)
  }

  return <button onClick={handleSubmit}>Submit</button>
}
```

Referencia: [¿Debería este código moverse a un event handler?](https://react.dev/learn/removing-effect-dependencies#should-this-code-move-to-an-event-handler)
