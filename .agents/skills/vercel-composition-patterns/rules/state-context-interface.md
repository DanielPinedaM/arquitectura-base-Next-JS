---
title: Define interfaces de context genéricas para la inyección de dependencias
impact: HIGH
impactDescription: permite un estado inyectable como dependencia en distintos casos de uso
tags: composition, context, state, typescript, dependency-injection
---

## Define interfaces de context genéricas para la inyección de dependencias

Define una **interfaz genérica** para el context de tu componente con tres partes:
`state`, `actions` y `meta`. Esta interfaz es un contrato que cualquier provider
puede implementar, lo que permite que los mismos componentes de UI funcionen con implementaciones
de estado completamente diferentes.

**Principio fundamental:** Levanta el estado, compón los elementos internos, haz que el estado sea
inyectable como dependencia.

**Incorrecto (UI acoplada a una implementación de estado específica):**

```tsx
function ComposerInput() {
  // Fuertemente acoplado a un hook específico
  const { input, setInput } = useChannelComposerState()
  return <TextInput value={input} onChangeText={setInput} />
}
```

**Correcto (una interfaz genérica permite la inyección de dependencias):**

```tsx
// Define una interfaz GENÉRICA que cualquier provider puede implementar
interface ComposerState {
  input: string
  attachments: Attachment[]
  isSubmitting: boolean
}

interface ComposerActions {
  update: (updater: (state: ComposerState) => ComposerState) => void
  submit: () => void
}

interface ComposerMeta {
  inputRef: React.RefObject<TextInput>
}

interface ComposerContextValue {
  state: ComposerState
  actions: ComposerActions
  meta: ComposerMeta
}

const ComposerContext = createContext<ComposerContextValue | null>(null)
```

**Los componentes de UI consumen la interfaz, no la implementación:**

```tsx
function ComposerInput() {
  const {
    state,
    actions: { update },
    meta,
  } = use(ComposerContext)

  // Este componente funciona con CUALQUIER provider que implemente la interfaz
  return (
    <TextInput
      ref={meta.inputRef}
      value={state.input}
      onChangeText={(text) => update((s) => ({ ...s, input: text }))}
    />
  )
}
```

**Diferentes providers implementan la misma interfaz:**

```tsx
// Provider A: estado local para formularios efímeros
function ForwardMessageProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState(initialState)
  const inputRef = useRef(null)
  const submit = useForwardMessage()

  return (
    <ComposerContext
      value={{
        state,
        actions: { update: setState, submit },
        meta: { inputRef },
      }}
    >
      {children}
    </ComposerContext>
  )
}

// Provider B: estado global sincronizado para canales
function ChannelProvider({ channelId, children }: Props) {
  const { state, update, submit } = useGlobalChannel(channelId)
  const inputRef = useRef(null)

  return (
    <ComposerContext
      value={{
        state,
        actions: { update, submit },
        meta: { inputRef },
      }}
    >
      {children}
    </ComposerContext>
  )
}
```

**La misma UI compuesta funciona con ambos:**

```tsx
// Funciona con ForwardMessageProvider (estado local)
<ForwardMessageProvider>
  <Composer.Frame>
    <Composer.Input />
    <Composer.Submit />
  </Composer.Frame>
</ForwardMessageProvider>

// Funciona con ChannelProvider (estado global sincronizado)
<ChannelProvider channelId="abc">
  <Composer.Frame>
    <Composer.Input />
    <Composer.Submit />
  </Composer.Frame>
</ChannelProvider>
```

**La UI personalizada fuera del componente puede acceder al estado y a las acciones:**

Lo que importa es el límite del provider, no el anidamiento visual. Los componentes que
necesitan estado compartido no tienen que estar dentro del `Composer.Frame`. Solo necesitan
estar dentro del provider.

```tsx
function ForwardMessageDialog() {
  return (
    <ForwardMessageProvider>
      <Dialog>
        {/* La UI del composer */}
        <Composer.Frame>
          <Composer.Input placeholder="Add a message, if you'd like." />
          <Composer.Footer>
            <Composer.Formatting />
            <Composer.Emojis />
          </Composer.Footer>
        </Composer.Frame>

        {/* UI personalizada FUERA del composer, pero DENTRO del provider */}
        <MessagePreview />

        {/* Acciones en la parte inferior del diálogo */}
        <DialogActions>
          <CancelButton />
          <ForwardButton />
        </DialogActions>
      </Dialog>
    </ForwardMessageProvider>
  )
}

// ¡Este botón vive FUERA de Composer.Frame, pero aun así puede hacer submit según su context!
function ForwardButton() {
  const {
    actions: { submit },
  } = use(ComposerContext)
  return <Button onPress={submit}>Forward</Button>
}

// ¡Esta vista previa vive FUERA de Composer.Frame, pero puede leer el estado del composer!
function MessagePreview() {
  const { state } = use(ComposerContext)
  return <Preview message={state.input} attachments={state.attachments} />
}
```

El `ForwardButton` y el `MessagePreview` no están visualmente dentro de la caja del
composer, pero aun así pueden acceder a su estado y a sus acciones. Este es el poder de
levantar el estado a los providers.

La UI son piezas reutilizables que compones juntas. El estado se inyecta como dependencia
desde el provider. Cambia el provider, conserva la UI.
