---
title: Levanta el estado a componentes provider
impact: HIGH
impactDescription: permite compartir el estado fuera de los límites del componente
tags: composition, state, context, providers
---

## Levanta el estado a componentes provider

Mueve la gestión del estado a componentes provider dedicados. Esto permite que los componentes
hermanos fuera de la UI principal accedan al estado y lo modifiquen sin prop drilling
ni refs incómodas.

**Incorrecto (estado atrapado dentro del componente):**

```tsx
function ForwardMessageComposer() {
  const [state, setState] = useState(initialState)
  const forwardMessage = useForwardMessage()

  return (
    <Composer.Frame>
      <Composer.Input />
      <Composer.Footer />
    </Composer.Frame>
  )
}

// Problema: ¿cómo accede este botón al estado del composer?
function ForwardMessageDialog() {
  return (
    <Dialog>
      <ForwardMessageComposer />
      <MessagePreview /> {/* Necesita el estado del composer */}
      <DialogActions>
        <CancelButton />
        <ForwardButton /> {/* Necesita llamar a submit */}
      </DialogActions>
    </Dialog>
  )
}
```

**Incorrecto (useEffect para sincronizar el estado hacia arriba):**

```tsx
function ForwardMessageDialog() {
  const [input, setInput] = useState('')
  return (
    <Dialog>
      <ForwardMessageComposer onInputChange={setInput} />
      <MessagePreview input={input} />
    </Dialog>
  )
}

function ForwardMessageComposer({ onInputChange }) {
  const [state, setState] = useState(initialState)
  useEffect(() => {
    onInputChange(state.input) // Sincroniza en cada cambio 😬
  }, [state.input])
}
```

**Incorrecto (leer el estado desde una ref al hacer submit):**

```tsx
function ForwardMessageDialog() {
  const stateRef = useRef(null)
  return (
    <Dialog>
      <ForwardMessageComposer stateRef={stateRef} />
      <ForwardButton onPress={() => submit(stateRef.current)} />
    </Dialog>
  )
}
```

**Correcto (estado levantado al provider):**

```tsx
function ForwardMessageProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState(initialState)
  const forwardMessage = useForwardMessage()
  const inputRef = useRef(null)

  return (
    <Composer.Provider
      state={state}
      actions={{ update: setState, submit: forwardMessage }}
      meta={{ inputRef }}
    >
      {children}
    </Composer.Provider>
  )
}

function ForwardMessageDialog() {
  return (
    <ForwardMessageProvider>
      <Dialog>
        <ForwardMessageComposer />
        <MessagePreview /> {/* Los componentes personalizados pueden acceder al estado y a las acciones */}
        <DialogActions>
          <CancelButton />
          <ForwardButton /> {/* Los componentes personalizados pueden acceder al estado y a las acciones */}
        </DialogActions>
      </Dialog>
    </ForwardMessageProvider>
  )
}

function ForwardButton() {
  const { actions } = use(Composer.Context)
  return <Button onPress={actions.submit}>Forward</Button>
}
```

El ForwardButton vive fuera del Composer.Frame, pero aun así tiene acceso a la
acción submit porque está dentro del provider. Aunque es un componente
de un solo uso, aun así puede acceder al estado y a las acciones del composer desde fuera de la
propia UI.

**Idea clave:** Los componentes que necesitan estado compartido no tienen que estar visualmente
anidados unos dentro de otros; solo necesitan estar dentro del mismo provider.
