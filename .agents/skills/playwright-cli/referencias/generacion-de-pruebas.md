# Generación de pruebas (planificar → generar → reparar)

Flujo de trabajo de extremo a extremo para crear y mantener pruebas de Playwright con `playwright-cli`. Cada acción de `playwright-cli` emite el TypeScript de Playwright equivalente, y ese código generado es la materia prima de toda prueba. Las secciones siguientes se pueden usar de forma independiente:

- **Cómo funciona la generación** — la mecánica central en la que se apoya todo lo demás: las acciones se convierten en TypeScript, además de cómo agregar aserciones.
- **Planificar** — explorar la aplicación y producir un archivo de especificación (spec) que describa qué probar.
- **Generar** — convertir un spec en archivos de pruebas de Playwright. Actualizar el spec si es vago o está desactualizado.
- **Reparar** — diagnosticar las pruebas que fallan, corregir el código y conciliar el spec con la realidad.

Planificar / generar / reparar se apoyan en la misma mecánica: ejecutar `pnpm exec playwright test --debug=cli` en segundo plano y luego `pnpm exec playwright-cli attach tw-XXXX` para manejar de forma interactiva la página pausada. Consulta [pruebas-de-playwright.md](pruebas-de-playwright.md) para la mecánica de depurar/adjuntar (debug/attach).

---

## 0. Cómo funciona la generación

Cada acción que realizas con `playwright-cli` genera el código TypeScript de Playwright correspondiente. Este código aparece en la salida y se puede copiar directamente a tus archivos de pruebas.

```bash
# Iniciar una sesión
pnpm exec playwright-cli open https://example.com/login

# Tomar un snapshot para ver los elementos
pnpm exec playwright-cli snapshot
# La salida muestra: e1 [textbox "Email"], e2 [textbox "Password"], e3 [button "Sign In"]

# Rellenar los campos del formulario - genera código automáticamente
pnpm exec playwright-cli fill e1 "user@example.com"
# Ran Playwright code:
# await page.getByRole('textbox', { name: 'Email' }).fill('user@example.com');

pnpm exec playwright-cli fill e2 "password123"
# Ran Playwright code:
# await page.getByRole('textbox', { name: 'Password' }).fill('password123');

pnpm exec playwright-cli click e3
# Ran Playwright code:
# await page.getByRole('button', { name: 'Sign In' }).click();
```

### Construir un archivo de pruebas

Reúne el código generado en una prueba de Playwright:

```typescript
import { test, expect } from '@playwright/test';

test('login flow', async ({ page }) => {
  // Código generado a partir de la sesión de pnpm exec playwright-cli:
  await page.goto('https://example.com/login');
  await page.getByRole('textbox', { name: 'Email' }).fill('user@example.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('password123');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Agregar aserciones
  await expect(page).toHaveURL(/.*dashboard/);
});
```

### Usa locators semánticos

El código generado usa locators basados en roles cuando es posible, que son más resistentes:

```typescript
// Generado (bueno - semántico)
await page.getByRole('button', { name: 'Submit' }).click();

// Evitar (frágil - selectores CSS)
await page.locator('#submit-btn').click();
```

### Explora antes de grabar

Toma snapshots para entender la estructura de la página antes de grabar las acciones:

```bash
pnpm exec playwright-cli open https://example.com
pnpm exec playwright-cli snapshot
# Revisar la estructura de los elementos
pnpm exec playwright-cli click e5
```

### Agrega las aserciones manualmente

El código generado captura las acciones pero no las aserciones. Agrega las expectativas en tu prueba usando uno de los matchers recomendados:

- `toBeVisible()` — el elemento está renderizado y es visible
- `toHaveText(text)` — el contenido de texto del elemento coincide
- `toHaveValue(value) / toBeEmpty()` — el valor del input/select coincide
- `toBeChecked() / toBeUnchecked()` — el estado del checkbox coincide
- `toMatchAriaSnapshot(snapshot)` — la página (o el locator) coincide con un snapshot de accesibilidad parcial

Usa `pnpm exec playwright-cli generate-locator <target>` para producir la expresión del locator para la aserción, y los comandos snapshot/eval para capturar el valor esperado.

Al hacer aserciones sobre el contenido de texto, asegúrate de que el locator generado no contenga texto del propio elemento. `getByTestId()` o `getByLabel()` suelen funcionar bien para hacer aserciones sobre el texto. Cuando el locator está basado en texto, prefiere `toBeVisible()` en su lugar.

El snapshot que se va a comparar no tiene que contener toda la información - captura solo lo necesario para la aserción. Puedes usar expresiones regulares para los valores inestables.

```bash
# Obtener un locator estable para una ref de elemento para usarlo en la aserción
pnpm exec playwright-cli --raw generate-locator e5
# getByRole('button', { name: 'Submit' })

# Capturar el contenido de texto esperado para toHaveText
pnpm exec playwright-cli --raw eval "el => el.textContent" e5

# Capturar el valor esperado del input para toHaveValue/toBeEmpty
pnpm exec playwright-cli --raw eval "el => el.value" e5

# Capturar el aria snapshot esperado para toMatchAriaSnapshot/toBeChecked
# (toda la página, o usa una ref para acotar a una región)
pnpm exec playwright-cli --raw snapshot
pnpm exec playwright-cli --raw snapshot e5
```

```typescript
// Acción generada
await page.getByRole('button', { name: 'Submit' }).click();

// Aserciones manuales usando las salidas anteriores:
await expect(page.getByRole('alert', { name: 'Success' })).toBeVisible();
await expect(page.getByTestId('main-header')).toHaveText('Welcome, user');
await expect(page.getByRole('textbox', { name: 'Email' })).toHaveValue('user@example.com');
await expect(page.getByRole('checkbox', { name: 'Enable notifications' })).toBeChecked();

// toMatchAriaSnapshot sobre toda la página, encuentra una región coincidente
await expect(page).toMatchAriaSnapshot(`
  - heading "Welcome, user"
  - link /\\d+ new messages?/
  - button "Sign out"
`);

// toMatchAriaSnapshot acotado a una región
await expect(page.getByRole('navigation')).toMatchAriaSnapshot(`
  - link "Home"
  - link /\\d+ new messages?/
  - link "Profile"
`);
```

---

## 1. Planificación

Objetivo: producir un archivo de spec (p. ej. `specs/<feature>.plan.md`) que enumere los escenarios a probar. **Siempre** escribe el spec en un archivo.

### 1.1 Prerrequisito: workspace

Comprueba que el workspace tenga Playwright instalado antes que nada:

```bash
# Cualquiera de estos confirma un workspace:
test -f playwright.config.ts || test -f playwright.config.js
pnpm exec playwright --version
```

Si no hay una instalación de Playwright, inicializa una y deja que el usuario elija los valores por defecto:

```bash
pnpm create playwright
```

### 1.2 Prerrequisito: seed test

Un **seed test** es una prueba mínima que deja la página en el estado desde el que parte cada escenario: navegación a la aplicación, cualquier inicio de sesión requerido, feature flags, etc. Los escenarios asumen un inicio limpio *después* del seed. `--debug=cli` pausa *dentro* de esta prueba, por lo que el seed es donde comienza cada sesión de planificación y generación.

Seed mínimo viable:

```ts
// tests/seed.spec.ts
import { test } from '@playwright/test';

test('seed', async ({ page }) => {
  await page.goto('https://example.com/');
});
```

Preferido — llevar la navegación a un fixture para que las pruebas de los escenarios la reutilicen:

```ts
// tests/fixtures.ts
import { test as baseTest } from '@playwright/test';
export { expect } from '@playwright/test';

export const test = baseTest.extend({
  page: async ({ page }, use) => {
    await page.goto('https://example.com/');
    await use(page);
  },
});
```

```ts
// tests/seed.spec.ts
import { test } from './fixtures';

test('seed', async ({ page }) => {
  // El fixture ya navega. Este cuerpo vacío le indica a los agentes dónde empezar.
});
```

Si no existe un seed, crea uno que al menos navegue a la aplicación.

### 1.3 Explora la aplicación

Lanza la aplicación mediante el seed en segundo plano y adjúntate:

```bash
PLAYWRIGHT_HTML_OPEN=never pnpm exec playwright test tests/seed.spec.ts --debug=cli
# esperar a "Debugging Instructions" y al nombre de sesión tw-XXXX
pnpm exec playwright-cli attach tw-XXXX
```

Reanuda para que el seed se ejecute y luego sondea la aplicación:

```bash
pnpm exec playwright-cli resume                   # reanudar para que la prueba seed se ejecute por completo
pnpm exec playwright-cli snapshot                 # inventario de elementos interactivos
pnpm exec playwright-cli click e5                 # seguir un flujo
pnpm exec playwright-cli eval "location.href"     # leer la URL / el estado
pnpm exec playwright-cli show --annotate          # pedirle al usuario que señale algo
```

Mapea:

- Las superficies interactivas (formularios, botones, listas, filtros, modales).
- Los recorridos principales del usuario de extremo a extremo.
- Casos límite: estados vacíos, errores de validación, entradas muy largas, valores en los límites.
- Persistencia: recarga, almacenamiento local/de sesión, fragmentos de URL.
- Navegación: qué controles cambian la URL, comportamiento de atrás/adelante.

**Importante**: No abras simplemente la url de la aplicación con playwright-cli, pasa siempre por la prueba para capturar cualquier configuración personalizada que se haga allí.
**Importante**: Detén la prueba en segundo plano cuando termines de explorar.

### 1.4 Escribe el archivo de spec

Guárdalo en `specs/<feature>.plan.md`. Usa esta estructura:

```markdown
# Plan de pruebas de <Feature>

## Descripción general de la aplicación

<Un párrafo que describa qué hace la funcionalidad y por qué importa.>

## Escenarios de prueba

### 1. <Nombre del grupo>

**Seed:** `tests/seed.spec.ts`

#### 1.1. <nombre-del-escenario-en-kebab-case>

**File:** `tests/<grupo>/<nombre-del-escenario-en-kebab-case>.spec.ts`

**Steps:**
  1. <Paso concreto del usuario>
    - expect: <resultado observable>
    - expect: <otro resultado observable>
  2. <Siguiente paso>
    - expect: <resultado>

#### 1.2. <siguiente-escenario>
...

### 2. <Siguiente grupo>

**Seed:** `tests/seed.spec.ts`
...
```

Pautas:

- Cada escenario es independiente y parte del estado limpio del seed — nunca encadenes escenarios.
- Los nombres de los escenarios están en kebab-case y coinciden con el nombre del archivo de prueba (`should-add-single-todo` → `should-add-single-todo.spec.ts`).
- Cubre el camino feliz, los casos límite, la validación, los flujos negativos y la persistencia.
- Escribe los pasos a nivel de usuario ("Escribir 'Buy milk' en el input"), no a nivel de API ("llamar a `fill`").
- Pon los resultados observables en viñetas `- expect:`; cada una se convierte en una aserción durante la generación.

---

## 2. Generar

Objetivo: tomar un archivo de spec y producir archivos de pruebas de Playwright. Opcionalmente, actualizar el spec si se ha desviado.

### 2.1 Entradas

- **Archivo de spec**, p. ej. `specs/basic-operations.plan.md`.
- **Objetivo**: un solo escenario (p. ej. `1.2`), un grupo completo (`1`), o todos.
- **Archivo seed**, leído de la línea `**Seed:**` del grupo del escenario.

### 2.2 Generar un escenario

Para cada escenario objetivo, en secuencia (nunca en paralelo — los escenarios comparten la sesión del seed):

```bash
PLAYWRIGHT_HTML_OPEN=never pnpm exec playwright test <seed-file> --debug=cli   # en segundo plano
pnpm exec playwright-cli attach tw-XXXX
# reanudar
```

**No** abras simplemente la url de la aplicación con playwright-cli, pasa siempre por la prueba para capturar cualquier configuración personalizada que se haga allí.

Recorre los `Steps:` del escenario uno por uno con `playwright-cli`, tratando el spec como el plan y la aplicación en vivo como la fuente de verdad. Si un paso es vago ("hacer click en el botón" — ¿cuál botón?), hace referencia a un elemento que ya no existe, o contradice el comportamiento real de la aplicación, usa tu criterio: actualiza el spec para que coincida con lo que la aplicación realmente hace y luego continúa. Editar el spec durante la generación es lo esperado.

Cada acción imprime el TypeScript de Playwright equivalente (consulta [Cómo funciona la generación](#0-cómo-funciona-la-generación)):

```bash
pnpm exec playwright-cli snapshot                         # encontrar las refs
pnpm exec playwright-cli fill e3 "John Doe"               # -> page.getByRole('textbox', {...}).fill(...)
pnpm exec playwright-cli press Enter
pnpm exec playwright-cli click e7
```

Para cada viñeta `- expect:`, agrega una aserción explícita. Consulta [Cómo funciona la generación](#0-cómo-funciona-la-generación) para más detalles.

Reúne el código generado y escribe el archivo de prueba en la ruta indicada en el spec:

```ts
// spec: specs/basic-operations.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from './fixtures';   // o '@playwright/test' si no hay un archivo de fixtures

test.describe('Signing in and out', () => {
  test('should sign in', async ({ page }) => {
    // 1. Navegar a la aplicación
    // (lo maneja el fixture del seed)

    // 2. Escribir 'John Doe' en el campo de usuario
    await page.getByRole('textbox', { name: 'username' }).fill('John Doe');

    // 3. Escribir la contraseña
    await page.getByRole('textbox', { name: 'password' }).fill('TestPassword');

    // 4. Presionar Enter para enviar
    await page.getByRole('textbox', { name: 'password' }).press('Enter');

    await expect(page.getByRole('heading')).toContainText('Welcome, John Doe!');
  });
});
```

Reglas:

- **Una prueba por archivo.** La ruta del archivo, el nombre del describe y el nombre de la prueba provienen literalmente del spec (sin el ordinal).
- Antepón a cada paso numerado un comentario `// N. <texto del paso>` antes de sus acciones.
- Usa el nombre del grupo describe literalmente del spec (sin el ordinal `1.`).
- Importa desde `./fixtures` si el proyecto tiene uno; de lo contrario, desde `@playwright/test`.
- **Importante**: cierra la sesión de la CLI y detén la prueba en segundo plano antes de pasar al siguiente escenario.

### 2.3 Generar varios escenarios

Repite [2.2](#22-generar-un-escenario) sobre los escenarios objetivo de uno en uno, reiniciando el seed entre cada uno para que cada prueba parta de una página limpia. Asegúrate de que cada ejecución de prueba esté detenida antes de iniciar la siguiente.

### 2.4 Ejecutar las pruebas generadas

Después de la generación, ejecuta las pruebas nuevas una vez:

```bash
PLAYWRIGHT_HTML_OPEN=never pnpm exec playwright test tests/<group>/<scenario>.spec.ts
```

Cualquier fallo pasa a la [Sección 3](#3-reparar).

---

## 3. Reparar

Objetivo: corregir las pruebas que fallan y actualizar el spec si el comportamiento previsto de la aplicación cambió.

### 3.1 Encontrar las pruebas que fallan

```bash
PLAYWRIGHT_HTML_OPEN=never pnpm exec playwright test
```

Registra la lista de entradas `<file>:<line>` que fallan y procésalas de una en una. No intentes correcciones en paralelo — el estado compartido y la única sesión de la CLI lo hacen frágil.

### 3.2 Depurar un fallo

Ejecuta la única prueba que falla en modo debug en segundo plano y luego adjúntate:

```bash
PLAYWRIGHT_HTML_OPEN=never pnpm exec playwright test tests/<group>/<scenario>.spec.ts:<line> --debug=cli
# esperar a "Debugging Instructions" y al nombre de sesión tw-XXXX
pnpm exec playwright-cli attach tw-XXXX
```

La prueba está pausada al inicio. Avanza o ejecuta hasta justo antes de la acción o aserción que falla, y luego diagnostica:

```bash
pnpm exec playwright-cli snapshot                # ¿el elemento cambió / se movió / se renombró?
pnpm exec playwright-cli console                 # ¿errores del lado de la aplicación?
pnpm exec playwright-cli requests                # ¿petición fallida? ¿payload incorrecto?
pnpm exec playwright-cli show --annotate         # pedirle al usuario que señale algo
```

Causas comunes: deriva de selectores, un nuevo elemento contenedor, renombrado de label/ARIA, tiempos (transición, carga asíncrona), texto de la aserción actualizado en la aplicación, datos de prueba que se filtran entre ejecuciones.

Ensaya la interacción corregida con `playwright-cli` — el código generado en la salida es lo que pegas de vuelta en la prueba.

### 3.3 Aplicar la corrección

Edita el archivo de prueba: actualiza el locator, la aserción, el orden de los pasos o las entradas para que coincidan con el comportamiento corregido. Detén la ejecución de depuración en segundo plano. Vuelve a ejecutar la prueba individual para confirmar que pasa a verde.

Nunca omitas hooks ni agregues sleeps como corrección. Nunca uses `networkidle`.

### 3.4 Conciliar con el spec

Abre el spec referenciado por el encabezado `// spec:` del archivo de prueba y localiza el escenario que corresponde a la prueba.

- **La corrección fue puramente técnica** (deriva de locators, mejor forma de la aserción) y el comportamiento a nivel de usuario del spec todavía coincide con la aplicación → deja el spec como está.
- **La corrección cambió los pasos, entradas, orden o resultados esperados visibles para el usuario** que describe el spec → actualiza el spec para que coincida con la realidad. Mantén estables el id del escenario y la ruta del archivo; solo cambian las líneas de step / expect.
- **No está claro si el cambio en la aplicación es intencional** (el spec está desactualizado) **o una regresión** (la prueba tenía razón, la aplicación está mal) → **detente y pregunta al usuario**. Proporciona:
  - el id del escenario (p. ej. `2.3`),
  - las líneas del spec que ya no coinciden,
  - el comportamiento observado de la aplicación (cita un extracto del snapshot o un resultado concreto).

Solo después de que el usuario responda, actualiza el spec (cambio intencional) o registra/marca la prueba como cobertura de un bug (regresión).

### 3.5 Iteración y rendirse

- Corrige los fallos de uno en uno; vuelve a ejecutar después de cada uno.
- Si después de una investigación exhaustiva estás seguro de que la prueba es correcta pero la aplicación está mal *y* el usuario ha confirmado que es un bug: marca la prueba con `test.fixme(...)` con un comentario que apunte a la decisión del usuario o al enlace del issue. Nunca la omitas en silencio.

---

## Referencias cruzadas

| Para... | Ver |
|---|---|
| Mecánica de `--debug=cli` / attach | [pruebas-de-playwright.md](pruebas-de-playwright.md) |
| Mocking de peticiones durante la exploración/generación | [mocking-de-peticiones.md](mocking-de-peticiones.md) |
| Gestionar la sesión de navegador de la CLI | [gestion-de-sesiones.md](gestion-de-sesiones.md) |
