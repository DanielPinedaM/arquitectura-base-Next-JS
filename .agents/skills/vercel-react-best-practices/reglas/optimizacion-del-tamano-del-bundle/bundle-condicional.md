---
title: Carga condicional de módulos
impact: HIGH
impactDescription: carga datos grandes solo cuando es necesario
tags: bundle, conditional-loading, lazy-loading
---

## Carga condicional de módulos

Carga datos o módulos grandes solo cuando se activa una funcionalidad.

**Ejemplo (lazy-load de los frames de una animación):**

```tsx
function AnimationPlayer({ enabled, setEnabled }: { enabled: boolean; setEnabled: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [frames, setFrames] = useState<Frame[] | null>(null)

  useEffect(() => {
    if (enabled && !frames && typeof window !== 'undefined') {
      import('./animation-frames.js')
        .then(mod => setFrames(mod.frames))
        .catch(() => setEnabled(false))
    }
  }, [enabled, frames, setEnabled])

  if (!frames) return <Skeleton />
  return <Canvas frames={frames} />
}
```

La verificación `typeof window !== 'undefined'` evita incluir este módulo en el bundle para SSR, optimizando el tamaño del bundle del servidor y la velocidad del build.
