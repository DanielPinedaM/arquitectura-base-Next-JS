---
title: Prefiere componer children en lugar de render props
impact: MEDIUM
impactDescription: composición más limpia, mejor legibilidad
tags: composition, children, render-props
---

## Prefiere children en lugar de render props

Usa `children` para la composición en lugar de props `renderX`. Los children son más
legibles, se componen de forma natural y no requieren entender las firmas de los
callbacks.

**Incorrecto (render props):**

```tsx
function Composer({
  renderHeader,
  renderFooter,
  renderActions,
}: {
  renderHeader?: () => React.ReactNode
  renderFooter?: () => React.ReactNode
  renderActions?: () => React.ReactNode
}) {
  return (
    <form>
      {renderHeader?.()}
      <Input />
      {renderFooter ? renderFooter() : <DefaultFooter />}
      {renderActions?.()}
    </form>
  )
}

// El uso es incómodo e inflexible
return (
  <Composer
    renderHeader={() => <CustomHeader />}
    renderFooter={() => (
      <>
        <Formatting />
        <Emojis />
      </>
    )}
    renderActions={() => <SubmitButton />}
  />
)
```

**Correcto (compound components con children):**

```tsx
function ComposerFrame({ children }: { children: React.ReactNode }) {
  return <form>{children}</form>
}

function ComposerFooter({ children }: { children: React.ReactNode }) {
  return <footer className='flex'>{children}</footer>
}

// El uso es flexible
return (
  <Composer.Frame>
    <CustomHeader />
    <Composer.Input />
    <Composer.Footer>
      <Composer.Formatting />
      <Composer.Emojis />
      <SubmitButton />
    </Composer.Footer>
  </Composer.Frame>
)
```

**Cuándo son apropiadas las render props:**

```tsx
// Las render props funcionan bien cuando necesitas pasar datos de vuelta
<List
  data={items}
  renderItem={({ item, index }) => <Item item={item} index={index} />}
/>
```

Usa render props cuando el padre necesite proporcionar datos o estado al hijo.
Usa children al componer una estructura estática.
