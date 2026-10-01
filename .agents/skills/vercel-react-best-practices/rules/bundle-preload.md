---
title: Haz preload según la intención del usuario
impact: MEDIUM
impactDescription: reduce la latencia percibida
tags: bundle, preload, user-intent, hover
---

## Haz preload según la intención del usuario

Haz preload de los bundles pesados antes de que se necesiten para reducir la latencia percibida.

**Ejemplo (preload en hover/focus):**

```tsx
function EditorButton({ onClick }: { onClick: () => void }) {
  const preload = () => {
    if (typeof window !== 'undefined') {
      void import('./monaco-editor')
    }
  }

  return (
    <button
      onMouseEnter={preload}
      onFocus={preload}
      onClick={onClick}
    >
      Open Editor
    </button>
  )
}
```

**Ejemplo (preload cuando el feature flag está habilitado):**

```tsx
function FlagsProvider({ children, flags }: Props) {
  useEffect(() => {
    if (flags.editorEnabled && typeof window !== 'undefined') {
      void import('./monaco-editor').then(mod => mod.init())
    }
  }, [flags.editorEnabled])

  return <FlagsContext.Provider value={flags}>
    {children}
  </FlagsContext.Provider>
}
```

La verificación `typeof window !== 'undefined'` evita incluir en el bundle para SSR los módulos con preload, optimizando el tamaño del bundle del servidor y la velocidad del build.
