# Grabación de video

Captura las sesiones de automatización del navegador como video para depuración, documentación o verificación. Produce WebM (códec VP8/VP9).

## Grabación básica

```bash
# Abrir primero el navegador
pnpm exec playwright-cli open

# Iniciar la grabación, --cursor dibuja un cursor de mouse animado que viaja hasta cada punto de acción
# y espacia las acciones 800ms para que tenga tiempo de desplazarse
pnpm exec playwright-cli video-start demo.webm --cursor --fps=60

# Agregar un marcador de capítulo para las transiciones entre secciones
pnpm exec playwright-cli video-chapter "Getting Started" --description="Opening the homepage" --duration=2000

# Navegar y realizar acciones
pnpm exec playwright-cli goto https://example.com
pnpm exec playwright-cli snapshot
pnpm exec playwright-cli click e1

# Agregar otro capítulo
pnpm exec playwright-cli video-chapter "Filling Form" --description="Entering test data" --duration=2000
pnpm exec playwright-cli fill e2 "test input"

# Detener y guardar
pnpm exec playwright-cli video-stop
```

## Cursor, resaltado del objetivo y punto de click

Se pueden dibujar tres decoraciones por cada acción: el **cursor** del mouse, un recuadro de **resaltado** alrededor del
elemento objetivo y un marcador de **punto** en el punto de click. Un globo de **título** que nombra la acción viene
con `video-show-actions`. El cursor es lo único que activa `video-start --cursor`; el resto son
opcionales y se les da estilo con declaraciones CSS simples, para que se vean exactamente como quieras.

```bash
# Solo el cursor, nada más en pantalla
pnpm exec playwright-cli video-start demo.webm --cursor

# Globo de la acción, más un punto de click rojo y un marco oscuro alrededor del objetivo
pnpm exec playwright-cli video-show-actions --duration=800 --position=top-right \
  --point-style="width: 20px; height: 20px; border-radius: 50%; background: rgba(255,0,0,.7)" \
  --highlight-style="outline: 2px solid #333; background: rgba(0,128,255,.15)" \
  --title-style="font-size: 16px"

# Dejar de anotar las acciones
pnpm exec playwright-cli video-hide-actions
```

Las mismas opciones están disponibles de forma programática, que es la mejor opción para los hero scripts:

```js
await page.screencast.showActions({
  // 'pointer' (por defecto) anima el cursor desde el punto de la acción anterior, 'none' lo oculta.
  cursor: 'pointer',
  // Cuánto tiempo permanecen las decoraciones en pantalla. Las acciones se espacian según este retraso, 500ms por defecto.
  duration: 800,
  // Dónde va el título de la acción: top-left, top, top-right, bottom-left, bottom, bottom-right.
  position: 'top-right',
  style: {
    // Marcador en el punto de click. El elemento tiene tamaño cero y está centrado en el punto,
    // así que dale un tamaño, o dibuja alrededor del punto con box-shadow. Oculto cuando se omite.
    point: 'width: 20px; height: 20px; border-radius: 50%; background: rgba(255, 0, 0, .7)',
    // Recuadro que cubre el elemento objetivo. Oculto cuando se omite.
    // Prefiere `outline` sobre `border`, no reduce el recuadro.
    highlight: 'outline: 2px solid #333; background: rgba(0, 128, 255, .15)',
    // El título de la acción. Usa 'display: none' para conservar el cursor pero quitar el globo.
    title: 'font-size: 16px',
  },
});
```

Notas:
- Todas las decoraciones se desvanecen durante `duration`. Sobrescribe `animation` en un estilo para hacer otra cosa.
- El cursor permanece en pantalla en el último punto de acción entre acciones y a través de las navegaciones,
  y viaja por una trayectoria ligeramente curva, de modo que parece una mano moviendo un mouse.
- Llama a `page.screencast.hideActions()` para dejar de anotar y ocultar el cursor.

## Mejores prácticas

### 1. Usa nombres de archivo descriptivos

```bash
# Incluir contexto en el nombre del archivo
pnpm exec playwright-cli video-start recordings/login-flow-2024-01-15.webm
pnpm exec playwright-cli video-start recordings/checkout-test-run-42.webm
```

### 2. Graba hero scripts completos.

Cuando grabes un video para el usuario o como prueba de trabajo, lo mejor es crear un fragmento de código y ejecutarlo con run-code.
Esto permite insertar pausas apropiadas entre las acciones y anotar el video. Hay nuevas APIs de Playwright para eso.

1) Realiza el escenario usando la CLI y toma nota de todos los locators y acciones. Necesitarás esos locators para solicitar sus bounding boxes para el resaltado.
2) Crea un archivo con el script previsto para el video (abajo). Usa pressSequentially con delay para una escritura agradable, haz pausas razonables.
3) Usa pnpm exec playwright-cli run-code --filename your-script.js

**Importante**: Los overlays son `pointer-events: none` — no interfieren con las interacciones de la página. Puedes mantener de forma segura los overlays fijos (sticky) visibles mientras haces click, rellenas o realizas cualquier acción en la página.

```js
async page => {
  await page.screencast.start({ path: 'video.webm', size: { width: 1280, height: 800 }, fps: 60 });
  // Mostrar el cursor y marcar el punto de click, y espaciar las acciones 800ms.
  await page.screencast.showActions({
    duration: 800,
    style: {
      point: 'width: 20px; height: 20px; border-radius: 50%; background: rgba(255, 0, 0, .7)',
      title: 'display: none',
    },
  });
  await page.goto('https://demo.playwright.dev/todomvc');

  // Mostrar una tarjeta de capítulo — desenfoca la página y muestra un diálogo.
  // Bloquea hasta que expire la duración, luego se elimina automáticamente.
  // Úsalo para casos de uso simples, pero siempre siéntete libre de crear a mano tu propio
  // overlay hermoso con await page.screencast.showOverlay().
  await page.screencast.showChapter('Adding Todo Items', {
    description: 'We will add several items to the todo list.',
    duration: 2000,
  });

  // Realizar una acción
  await page.getByRole('textbox', { name: 'What needs to be done?' }).pressSequentially('Walk the dog', { delay: 60 });
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.waitForTimeout(1000);

  // Mostrar el siguiente capítulo
  await page.screencast.showChapter('Verifying Results', {
    description: 'Checking the item appeared in the list.',
    duration: 2000,
  });

  // Agregar una anotación fija (sticky) que permanece mientras realizas acciones.
  // Los overlays son pointer-events: none, así que no bloquearán los clicks.
  const annotation = await page.screencast.showOverlay(`
    <div style="position: absolute; top: 8px; right: 8px;
      padding: 6px 12px; background: rgba(0,0,0,0.7);
      border-radius: 8px; font-size: 13px; color: white;">
      ✓ Item added successfully
    </div>
  `);

  // Realizar más acciones mientras la anotación está visible
  await page.getByRole('textbox', { name: 'What needs to be done?' }).pressSequentially('Buy groceries', { delay: 60 });
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.waitForTimeout(1500);

  // Quitar la anotación cuando termines
  await annotation.dispose();

  // También puedes resaltar locators relevantes y dar anotaciones contextuales.
  const bounds = await page.getByText('Walk the dog').boundingBox();
  await page.screencast.showOverlay(`
    <div style="position: absolute;
      top: ${bounds.y}px;
      left: ${bounds.x}px;
      width: ${bounds.width}px;
      height: ${bounds.height}px;
      border: 1px solid red;">
    </div>
    <div style="position: absolute;
      top: ${bounds.y + bounds.height + 5}px;
      left: ${bounds.x + bounds.width / 2}px;
      transform: translateX(-50%);
      padding: 6px;
      background: #808080;
      border-radius: 10px;
      font-size: 14px;
      color: white;">Check it out, it is right above this text
    </div>
  `, { duration: 2000 });

  await page.screencast.stop();
}
```

Abraza la creatividad, los overlays son poderosos.

### Resumen de la API de overlays

| Método | Caso de uso |
|--------|----------|
| `page.screencast.showChapter(title, { description?, duration?, styleSheet? })` | Tarjeta de capítulo a pantalla completa con fondo desenfocado — ideal para transiciones entre secciones |
| `page.screencast.showOverlay(html, { duration? })` | Overlay HTML personalizado — úsalo para globos, etiquetas, resaltados |
| `disposable.dispose()` | Quitar un overlay fijo (sticky) agregado sin duration |
| `page.screencast.hideOverlays()` / `page.screencast.showOverlays()` | Ocultar/mostrar temporalmente todos los overlays |
| `page.screencast.showActions({ cursor, duration, position, style })` | Cursor, punto de click, resaltado del objetivo y título de la acción |
| `page.screencast.hideActions()` | Dejar de anotar las acciones y ocultar el cursor |

### 3. Adjunta la grabación al pull request

La grabación de un hero script es la mejor prueba de trabajo para un cambio de cara al usuario. GitHub acepta WebM tal cual, así que una vez que la grabación se vea bien, adjúntala con `gh` 2.99+ en lugar de describir el flujo con palabras:

```bash
gh pr create --title "feat(todo): add items inline" --body-file body.md --attach ./demo.webm
gh pr comment 123 --body "Walkthrough of the new flow." --attach ./demo.webm
gh issue comment 456 --body "Recording of the repro steps." --attach ./repro.webm
```

`gh` agrega los adjuntos sin referenciar al final del body, que es el lugar correcto para un recorrido (walkthrough). Los videos están limitados a 10 MB en los planes gratuitos y 100 MB en los planes de pago, así que mantén el script enfocado, graba en un tamaño modesto como 1280x800 y elimina los capítulos que no aporten a la historia. Consulta [adjuntos-en-pull-requests.md](adjuntos-en-pull-requests.md) para el conjunto completo de comandos, incluido adjuntar artefactos de pruebas desde CI.

## Tracing vs Video

| Característica | Video | Tracing |
|---------|-------|---------|
| Salida | Archivo WebM | Archivo de traza (se puede ver en Trace Viewer) |
| Muestra | Grabación visual | Snapshots del DOM, red, consola, acciones |
| Caso de uso | Demos, documentación | Depuración, análisis |
| Tamaño | Mayor | Menor |

## Limitaciones

- La grabación agrega una ligera sobrecarga a la automatización
- Las grabaciones grandes pueden consumir un espacio considerable en disco
