---
title: Evita el hydration mismatch sin parpadeos
impact: MEDIUM
impactDescription: evita el parpadeo visual y los errores de hydration
tags: rendering, ssr, hydration, localStorage, flicker
---

## Evita el hydration mismatch sin parpadeos

Al renderizar contenido que depende del almacenamiento del lado del cliente (localStorage, cookies), evita tanto la ruptura del SSR como el parpadeo posterior a la hydration inyectando un script síncrono que actualice el DOM antes de que React haga la hydration.

**Incorrecto (rompe el SSR):**

```tsx
function ThemeWrapper({ children }: { children: ReactNode }) {
  // localStorage no está disponible en el servidor - lanza un error
  const theme = localStorage.getItem('theme') || 'light'
  
  return (
    <div className={theme}>
      {children}
    </div>
  )
}
```

El server-side rendering fallará porque `localStorage` es undefined.

**Incorrecto (parpadeo visual):**

```tsx
function ThemeWrapper({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('light')
  
  useEffect(() => {
    // Se ejecuta después de la hydration - provoca un destello visible
    const stored = localStorage.getItem('theme')
    if (stored) {
      setTheme(stored)
    }
  }, [])
  
  return (
    <div className={theme}>
      {children}
    </div>
  )
}
```

El componente primero se renderiza con el valor por defecto (`light`) y luego se actualiza después de la hydration, lo que provoca un destello visible de contenido incorrecto.

**Correcto (sin parpadeo, sin hydration mismatch):**

```tsx
function ThemeWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <div id="theme-wrapper">
        {children}
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var theme = localStorage.getItem('theme') || 'light';
                var el = document.getElementById('theme-wrapper');
                if (el) el.className = theme;
              } catch (e) {}
            })();
          `,
        }}
      />
    </>
  )
}
```

El script inline se ejecuta de forma síncrona antes de mostrar el elemento, lo que asegura que el DOM ya tenga el valor correcto. Sin parpadeo, sin hydration mismatch.

Este patrón es especialmente útil para los toggles de tema, las preferencias del usuario, los estados de autenticación y cualquier dato solo del cliente que deba renderizarse de inmediato sin mostrar destellos de valores por defecto.
