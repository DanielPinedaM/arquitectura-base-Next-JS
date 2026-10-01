# Patrones de composición de React

**Versión 1.0.0**  
Ingeniería  
Enero de 2026

> **Nota:**  
> Este documento está pensado principalmente para que lo sigan agentes y LLMs al mantener,  
> generar o refactorizar codebases de React usando composición. Los humanos  
> también pueden encontrarlo útil, pero las indicaciones aquí están optimizadas para la automatización  
> y la consistencia en flujos de trabajo asistidos por IA.

---

## Resumen

Patrones de composición para construir componentes de React flexibles y mantenibles. Evita la proliferación de props booleanas usando compound components, levantando el estado y componiendo los elementos internos. Estos patrones hacen que los codebases sean más fáciles de trabajar, tanto para humanos como para agentes de IA, a medida que escalan.

---

## Tabla de contenidos

1. [Arquitectura de componentes](#1-arquitectura-de-componentes) — **HIGH**
   - 1.1 [Evita la proliferación de props booleanas](#11-evita-la-proliferación-de-props-booleanas)
   - 1.2 [Usa compound components](#12-usa-compound-components)
2. [Gestión del estado](#2-gestión-del-estado) — **MEDIUM**
   - 2.1 [Desacopla la gestión del estado de la UI](#21-desacopla-la-gestión-del-estado-de-la-ui)
   - 2.2 [Define interfaces de context genéricas para la inyección de dependencias](#22-define-interfaces-de-context-genéricas-para-la-inyección-de-dependencias)
   - 2.3 [Levanta el estado a componentes provider](#23-levanta-el-estado-a-componentes-provider)
3. [Patrones de implementación](#3-patrones-de-implementación) — **MEDIUM**
   - 3.1 [Crea variantes explícitas de componentes](#31-crea-variantes-explícitas-de-componentes)
   - 3.2 [Prefiere componer children en lugar de render props](#32-prefiere-componer-children-en-lugar-de-render-props)
4. [APIs de React 19](#4-apis-de-react-19) — **MEDIUM**
   - 4.1 [Cambios en la API de React 19](#41-cambios-en-la-api-de-react-19)

---

## 1. Arquitectura de componentes

**Impacto: HIGH**

Patrones fundamentales para estructurar componentes, evitar la proliferación
de props y permitir una composición flexible.

### 1.1 Evita la proliferación de props booleanas

**Impacto: CRITICAL (evita variantes de componentes inmantenibles)**

No agregues props booleanas como `isThread`, `isEditing`, `isDMThread` para personalizar

el comportamiento de un componente. Cada booleano duplica los estados posibles y crea

lógica condicional inmantenible. Usa composición en su lugar.

**Incorrecto: las props booleanas crean una complejidad exponencial**

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

**Correcto: la composición elimina los condicionales**

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

### 1.2 Usa compound components

**Impacto: HIGH (permite una composición flexible sin prop drilling)**

Estructura los componentes complejos como compound components con un context compartido. Cada

subcomponente accede al estado compartido mediante el context, no mediante props. Los consumidores componen las

piezas que necesitan.

**Incorrecto: componente monolítico con render props**

```tsx
function Composer({
  renderHeader,
  renderFooter,
  renderActions,
  showAttachments,
  showFormatting,
  showEmojis,
}: Props) {
  return (
    <form>
      {renderHeader?.()}
      <Input />
      {showAttachments && <Attachments />}
      {renderFooter ? (
        renderFooter()
      ) : (
        <Footer>
          {showFormatting && <Formatting />}
          {showEmojis && <Emojis />}
          {renderActions?.()}
        </Footer>
      )}
    </form>
  )
}
```

**Correcto: compound components con context compartido**

```tsx
const ComposerContext = createContext<ComposerContextValue | null>(null)

function ComposerProvider({ children, state, actions, meta }: ProviderProps) {
  return (
    <ComposerContext value={{ state, actions, meta }}>
      {children}
    </ComposerContext>
  )
}

function ComposerFrame({ children }: { children: React.ReactNode }) {
  return <form>{children}</form>
}

function ComposerInput() {
  const {
    state,
    actions: { update },
    meta: { inputRef },
  } = use(ComposerContext)
  return (
    <TextInput
      ref={inputRef}
      value={state.input}
      onChangeText={(text) => update((s) => ({ ...s, input: text }))}
    />
  )
}

function ComposerSubmit() {
  const {
    actions: { submit },
  } = use(ComposerContext)
  return <Button onPress={submit}>Send</Button>
}

// Exporta como compound component
const Composer = {
  Provider: ComposerProvider,
  Frame: ComposerFrame,
  Input: ComposerInput,
  Submit: ComposerSubmit,
  Header: ComposerHeader,
  Footer: ComposerFooter,
  Attachments: ComposerAttachments,
  Formatting: ComposerFormatting,
  Emojis: ComposerEmojis,
}
```

**Uso:**

```tsx
<Composer.Provider state={state} actions={actions} meta={meta}>
  <Composer.Frame>
    <Composer.Header />
    <Composer.Input />
    <Composer.Footer>
      <Composer.Formatting />
      <Composer.Submit />
    </Composer.Footer>
  </Composer.Frame>
</Composer.Provider>
```

Los consumidores componen explícitamente exactamente lo que necesitan. Sin condicionales ocultos. Y el state, las actions y la meta se inyectan como dependencias desde un provider padre, lo que permite múltiples usos de la misma estructura de componentes.

---

## 2. Gestión del estado

**Impacto: MEDIUM**

Patrones para levantar el estado y gestionar el context compartido entre
componentes compuestos.

### 2.1 Desacopla la gestión del estado de la UI

**Impacto: MEDIUM (permite intercambiar implementaciones de estado sin cambiar la UI)**

El componente provider debe ser el único lugar que sabe cómo se gestiona el estado.

Los componentes de UI consumen la interfaz del context; no saben si el estado viene de

useState, de Zustand o de una sincronización con el servidor.

**Incorrecto: UI acoplada a la implementación del estado**

```tsx
function ChannelComposer({ channelId }: { channelId: string }) {
  // El componente de UI conoce la implementación del estado global
  const state = useGlobalChannelState(channelId)
  const { submit, updateInput } = useChannelSync(channelId)

  return (
    <Composer.Frame>
      <Composer.Input
        value={state.input}
        onChange={(text) => sync.updateInput(text)}
      />
      <Composer.Submit onPress={() => sync.submit()} />
    </Composer.Frame>
  )
}
```

**Correcto: gestión del estado aislada en el provider**

```tsx
// El provider maneja todos los detalles de la gestión del estado
function ChannelProvider({
  channelId,
  children,
}: {
  channelId: string
  children: React.ReactNode
}) {
  const { state, update, submit } = useGlobalChannel(channelId)
  const inputRef = useRef(null)

  return (
    <Composer.Provider
      state={state}
      actions={{ update, submit }}
      meta={{ inputRef }}
    >
      {children}
    </Composer.Provider>
  )
}

// El componente de UI solo conoce la interfaz del context
function ChannelComposer() {
  return (
    <Composer.Frame>
      <Composer.Header />
      <Composer.Input />
      <Composer.Footer>
        <Composer.Submit />
      </Composer.Footer>
    </Composer.Frame>
  )
}

// Uso
function Channel({ channelId }: { channelId: string }) {
  return (
    <ChannelProvider channelId={channelId}>
      <ChannelComposer />
    </ChannelProvider>
  )
}
```

**Diferentes providers, la misma UI:**

```tsx
// Estado local para formularios efímeros
function ForwardMessageProvider({ children }) {
  const [state, setState] = useState(initialState)
  const forwardMessage = useForwardMessage()

  return (
    <Composer.Provider
      state={state}
      actions={{ update: setState, submit: forwardMessage }}
    >
      {children}
    </Composer.Provider>
  )
}

// Estado global sincronizado para canales
function ChannelProvider({ channelId, children }) {
  const { state, update, submit } = useGlobalChannel(channelId)

  return (
    <Composer.Provider state={state} actions={{ update, submit }}>
      {children}
    </Composer.Provider>
  )
}
```

El mismo componente `Composer.Input` funciona con ambos providers porque solo

depende de la interfaz del context, no de la implementación.

### 2.2 Define interfaces de context genéricas para la inyección de dependencias

**Impacto: HIGH (permite un estado inyectable como dependencia en distintos casos de uso)**

Define una **interfaz genérica** para el context de tu componente con tres partes:

`state`, `actions` y `meta`. Esta interfaz es un contrato que cualquier provider

puede implementar, lo que permite que los mismos componentes de UI funcionen con implementaciones

de estado completamente diferentes.

**Principio fundamental:** Levanta el estado, compón los elementos internos, haz que el estado sea

inyectable como dependencia.

**Incorrecto: UI acoplada a una implementación de estado específica**

```tsx
function ComposerInput() {
  // Fuertemente acoplado a un hook específico
  const { input, setInput } = useChannelComposerState()
  return <TextInput value={input} onChangeText={setInput} />
}
```

**Correcto: una interfaz genérica permite la inyección de dependencias**

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

Lo que importa es el límite del provider, no el anidamiento visual. Los componentes que

necesitan estado compartido no tienen que estar dentro del `Composer.Frame`. Solo necesitan

estar dentro del provider.

El `ForwardButton` y el `MessagePreview` no están visualmente dentro de la caja del

composer, pero aun así pueden acceder a su estado y a sus acciones. Este es el poder de

levantar el estado a los providers.

La UI son piezas reutilizables que compones juntas. El estado se inyecta como dependencia

desde el provider. Cambia el provider, conserva la UI.

### 2.3 Levanta el estado a componentes provider

**Impacto: HIGH (permite compartir el estado fuera de los límites del componente)**

Mueve la gestión del estado a componentes provider dedicados. Esto permite que los componentes

hermanos fuera de la UI principal accedan al estado y lo modifiquen sin prop drilling

ni refs incómodas.

**Incorrecto: estado atrapado dentro del componente**

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

**Incorrecto: useEffect para sincronizar el estado hacia arriba**

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

**Incorrecto: leer el estado desde una ref al hacer submit**

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

**Correcto: estado levantado al provider**

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

---

## 3. Patrones de implementación

**Impacto: MEDIUM**

Técnicas específicas para implementar compound components y
context providers.

### 3.1 Crea variantes explícitas de componentes

**Impacto: MEDIUM (código autodocumentado, sin condicionales ocultos)**

En lugar de un solo componente con muchas props booleanas, crea componentes de variantes

explícitas. Cada variante compone las piezas que necesita. El código se documenta

a sí mismo.

**Incorrecto: un componente, muchos modos**

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

**Correcto: variantes explícitas**

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

### 3.2 Prefiere componer children en lugar de render props

**Impacto: MEDIUM (composición más limpia, mejor legibilidad)**

Usa `children` para la composición en lugar de props `renderX`. Los children son más

legibles, se componen de forma natural y no requieren entender las firmas de los

callbacks.

**Incorrecto: render props**

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

**Correcto: compound components con children**

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

---

## 4. APIs de React 19

**Impacto: MEDIUM**

Solo React 19+. No uses `forwardRef`; usa `use()` en lugar de `useContext()`.

### 4.1 Cambios en la API de React 19

**Impacto: MEDIUM (definiciones de componentes y uso del context más limpios)**

> **⚠️ Solo React 19+.** Omite esto si estás en React 18 o una versión anterior.

En React 19, `ref` ahora es una prop normal (no se necesita el wrapper `forwardRef`), y `use()` reemplaza a `useContext()`.

**Incorrecto: forwardRef en React 19**

```tsx
const ComposerInput = forwardRef<TextInput, Props>((props, ref) => {
  return <TextInput ref={ref} {...props} />
})
```

**Correcto: ref como una prop normal**

```tsx
function ComposerInput({ ref, ...props }: Props & { ref?: React.Ref<TextInput> }) {
  return <TextInput ref={ref} {...props} />
}
```

**Incorrecto: useContext en React 19**

```tsx
const value = useContext(MyContext)
```

**Correcto: use en lugar de useContext**

```tsx
const value = use(MyContext)
```

`use()` también puede llamarse de forma condicional, a diferencia de `useContext()`.

---

## Referencias

1. [https://react.dev](https://react.dev)
2. [https://react.dev/learn/passing-data-deeply-with-context](https://react.dev/learn/passing-data-deeply-with-context)
3. [https://react.dev/reference/react/use](https://react.dev/reference/react/use)
