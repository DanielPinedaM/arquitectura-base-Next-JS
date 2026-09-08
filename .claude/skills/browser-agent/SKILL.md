---
name: browser-agent
description: Depura bugs y automatiza flujos de UI ejecutando la app real en el navegador con playwright-cli, de forma agnóstica al framework (Angular, React/Next, Vue/Nuxt, Svelte, Astro, vanilla). Úsala siempre que el usuario reporte un bug de interfaz, diga que algo "no funciona", "no carga", "no guarda", "da error" o "se ve mal", pida reproducir o diagnosticar un fallo, pida verificar visualmente un cambio de maquetación, o pida automatizar o ejecutar un flujo de la app (login, alta de registro, checkout, wizard). NO es para escribir tests de Jest, Vitest o Playwright Test: es para depuración interactiva y automatización asistida por agente contra la app corriendo.
when_to_use: Frases típicas que la disparan - "hay un bug en X", "no me funciona el formulario", "revisa por qué falla", "reprodúcelo y dime qué pasa", "prueba el flujo completo de", "automatiza el proceso de", "toma un screenshot de", "mira la consola del navegador", "el botón no hace nada".
allowed-tools: Read, Edit, Write, Grep, Glob, Bash(pnpm exec playwright-cli *), Bash(pnpm run *), Bash(pnpm install), Bash(curl *), Bash(grep *), Bash(netstat *), Bash(taskkill *), Bash(git status *), Bash(git diff *), Bash(git stash *), AskUserQuestion, TaskStop
---

# Depuración y automatización de frontend con `playwright-cli`

Verifica el comportamiento contra la app corriendo en un navegador real, no contra suposiciones sobre el código. Leer el código dice qué *debería* pasar; ejecutar el flujo dice qué *pasa*.

## 1. Elegir el modo — pregúntalo antes de ejecutar nada

Hay exactamente dos modos y se comportan distinto:

| | Modo AUTOMATIZAR | Modo DEPURAR |
|---|---|---|
| Para qué sirve | ejecutar o automatizar un flujo de la app | encontrar la causa de un bug o de un comportamiento incorrecto |
| Modifica código fuente | **no** | sí, en dos casos |
| Diagnostica (`console`, `requests`, `eval`, `screenshot`) | **no** | sí |
| ¿Ejecuta ESLint? | **no** | sí, pero solo si ESLint está configurado |
| ¿Genera el build de la aplicación? | **no** | sí |
| ¿Abre el navegador y usa comandos de `playwright-cli`? | sí | sí |

Los dos casos en que el modo DEPURAR escribe en el código fuente:

1. **Instrumentación temporal** — `console.log` marcados con `// DBG-<id>`, y `throw` para forzar un `catch` cuando el fallo no se puede inducir desde la red. No cambia el comportamiento de la app, se aplica sin preguntar y **se borra en la misma respuesta** (sección "7.2 Borrar la instrumentación").
2. **La corrección del bug** — solo la opción que el usuario autorizó al responder el `AskUserQuestion` de la sección "6.7 PARAR y preguntar — nunca corregir por tu cuenta". Permanece en el repo.

Cualquier otra edición está prohibida, incluidos los bugs que encuentres de paso mientras depuras: repórtalos y sigue con el autorizado.

**El modo lo elige el usuario, no tú.** Preguntar con `AskUserQuestion`. No lo deduzcas de cómo redactó la petición, ni siquiera cuando uno de los dos parezca evidente: "prueba el login" puede ser ejecutar el flujo o averiguar por qué falla, y equivocarse cuesta una sesión entera de instrumentación que nadie pidió.

La pregunta lleva dos opciones, y en cada descripción lo que ese modo implica de verdad — si va a tocar el código y si va a parar a preguntar antes de corregir:

- **AUTOMATIZAR** — ejecuta el flujo de punta a punta y reporta el estado final. No toca el código ni diagnostica.
- **DEPURAR** — reproduce el fallo, observa, instrumenta si hace falta, y **para** a preguntar antes de aplicar cualquier corrección.

Anque el usuario lo haya dicho explícitamente en la conversación ("automatiza el alta de usuario", "depura por qué falla el guardado"). Tienes que preguntar ¿cual es el modo a ejecutar?

Esta pregunta es independiente de las del entorno —la del que se ejecuta y la del build, que son dos preguntas diferentes—, que llegan después, en el paso 2 de la sección "4. Detectar el entorno (nunca asumirlo)". Lo que no puedes es empezar a ejecutar sin tener la respuesta del modo.

Si en modo AUTOMATIZAR el flujo se rompe, no lo arregles por tu cuenta: reporta dónde se rompió y pregunta si quieres que pase a modo DEPURAR.

## 2. Ante ambigüedad, detente y pregunta — nunca asumas

Si en cualquier momento de la ejecución —leyendo, editando o creando código, ejecutando el flujo o interpretando estas mismas reglas— aparece una ambigüedad, un error, una limitación, una contradicción, un solapamiento de ideas, un caso que las reglas no contemplan, un conflicto entre dos reglas o cualquier duda técnica que pueda cambiar el resultado, tienes **PROHIBIDO** resolverlo por tu cuenta y seguir adelante.

Detente en ese punto exacto y usa `AskUserQuestion`:

1. **Para.** No generes ni edites nada más relacionado con esa duda hasta tener la respuesta.
2. **Explica la duda:** en qué consiste, y por qué la información disponible no basta para resolverla.
3. **Formúlala como pregunta explícita**, con:
   - Dos o más opciones concretas, cada una con su consecuencia real (qué cambia, qué más podría romper).
   - Una marcada como **recomendada**, con el motivo de la recomendación.
   - Una opción abierta del tipo "Otra — la describo yo", para que el usuario proponga su propio enfoque si ninguna encaja.
4. **Espera la respuesta** y aplica solo la opción elegida.

Ninguna otra sección de este documento te autoriza a rellenar vacíos, inventar comportamiento, deducir requisitos ni tomar decisiones de diseño que no estén especificadas explícitamente. Ante la duda, se pregunta.

Los cuatro momentos en que preguntar ya está fijado por el procedimiento —el modo (sección "1. Elegir el modo — pregúntalo antes de ejecutar nada"), el entorno de ejecución y de build (sección "4. Detectar el entorno (nunca asumirlo)", paso 2), el diagnóstico antes de corregir (sección "6.7 PARAR y preguntar — nunca corregir por tu cuenta") y el fallo del build (sección "7.4 Ejecutar el build")— son casos particulares de esta regla, no la lista completa de cuándo aplicarla.

## 3. Mecánica de playwright-cli

Antes de la primera invocación de esta sesión, en este orden:

1. **Consulta la skill oficial de Microsoft**, instalada en `.claude/skills/playwright-cli/SKILL.md` y `.claude/skills/playwright-cli/references/`. Ahí están los detalles de comandos, refs (`e15`), snapshots y sesiones.

2. **Ejecuta el `--help` del binario local**, siempre:

   ```bash
   pnpm exec playwright-cli --help
   ```

Las dos skills son **DIFERENTES** y ninguna sustituye a la otra:

* **`playwright-cli`**: lista y explicación de los comandos que permiten a la IA controlar el navegador — sintaxis, refs (`e15`), snapshots, sesiones. Es el **catálogo de comandos**: qué se puede teclear y con qué flags.

* **`browser-agent`** (este documento): llama a la skill `playwright-cli` y le explica a la IA **cómo usar** esos comandos para automatizar un proceso o solucionar un bug — en qué orden, en qué momento, cuándo parar y qué está prohibido. Es el **criterio**, no el catálogo.

Consecuencia práctica: este documento **no repite** la mecánica de los comandos, así que leerlo solo no basta para teclear nada. Y `playwright-cli` **no decide** nada sobre cuándo aplicarlos, así que leerlo solo tampoco basta: sabrías ejecutar comandos, pero no cuál usar en cada paso, ni cuándo dejar de instrumentar, ni cuándo preguntar antes de corregir. Se usan **juntas**.

### El binario ya está instalado — no lo instales

`@playwright/cli` está declarado en las `devDependencies` del `package.json` del proyecto, así que el binario `playwright-cli` ya existe en `node_modules/.bin/` y se ejecuta con `pnpm exec`:

```bash
pnpm exec playwright-cli --help
```

Por eso **todos** los comandos de este documento van con `pnpm exec` y nunca invocan `playwright-cli` a secas: el binario es local del proyecto, no un comando global del `PATH`.

**Ignora la sección «Installation» de la skill oficial de Microsoft.** Esa sección asume un binario global y manda hacer `npm install -g @playwright/cli@latest`. Aquí está **prohibido**: traería una versión distinta de la que fija `pnpm-lock.yaml`, con otros comandos y otras flags, y el diagnóstico dejaría de ser reproducible. Lo mismo vale para `pnpm dlx`, `npx` y `bunx`, que resuelven el paquete fuera del lockfile.

- Si `pnpm exec playwright-cli --help` no imprime la lista de comandos → faltan las dependencias del proyecto: `pnpm install`. Nunca `pnpm add` ni `npm install -g`, el paquete ya está declarado. Júzgalo por la salida, no por el código de salida: en Windows `--help` imprime la ayuda correcta y aun así termina en `127` con un `Assertion failed: !(handle->flags & UV_HANDLE_CLOSING)`; eso no es un fallo y no justifica reinstalar nada.
- Si al ejecutarlo avisa de que hay una versión más nueva → **no actualices**. Subir la versión es tocar las dependencias del proyecto, y la sección "8. Límites" lo prohíbe sin preguntar antes.

### Los comandos de este documento son ejemplos, no una lista blanca

Esta skill **NO limita** qué comandos de `playwright-cli` puedes ejecutar. Los que aparecen aquí — `open`, `snapshot`, `click`, `console`, `requests`, `request`, `eval`, `screenshot`, `route`, `close` — son los que resuelven la mayoría de los casos, nada más.

Si necesitas otro, **búscalo en `.claude/skills/playwright-cli/SKILL.md` o en `pnpm exec playwright-cli --help` y ejecútalo.** Hay muchos que este documento no menciona y que resuelven una situación concreta mejor que cualquier rodeo

Usar el comando adecuado siempre es mejor que forzar uno de los ejemplos de este documento.

El catálogo está **siempre** abierto, en todo momento y a tu elección: esta skill no cierra ningún comando ni te obliga a pedir permiso para usarlo. Lo único que hace es decirte **cuáles usar en cada momento** — qué mirar primero al depurar, en la sección "6.2 Observar desde fuera (antes de tocar el código)"; qué no aporta nada cuando solo te piden ejecutar un flujo, en la sección "5. Modo AUTOMATIZAR". Es criterio sobre el orden y la utilidad, nunca una lista blanca.

## 4. Detectar el entorno (nunca asumirlo)

El proyecto puede ser de cualquier framework. Deduce, no adivines:

**Gestor de paquetes** — el proyecto usa **pnpm**, y no hay alternativa: lo fijan `pnpm-lock.yaml` en la raíz, el campo `packageManager` del `package.json` y el `AGENTS.md` del repo. Son solo dos comandos:

| Para | Comando |
|---|---|
| Ejecutar el binario de `playwright-cli` | `pnpm exec playwright-cli <comando>` |
| Arrancar un script del `package.json` | `pnpm run <script>` |

**Prohibido** `npm`, `yarn`, `bun`, `npx` y `bunx` en este repo: escribirían otro lockfile o resolverían versiones que `pnpm-lock.yaml` no fija. Lo único agnóstico de esta skill es el framework, no el gestor de paquetes.

**Puerto del dev server** — lee `package.json` (scripts), y la config del framework (`angular.json`, `next.config.*`, `vite.config.*`, `nuxt.config.*`). Defaults habituales: Angular 4200, Next/Nuxt/CRA 3000, Vite 5173, Astro 4321. Confirma el puerto real en la salida del dev server antes de abrir el navegador; abrir un puerto equivocado produce un diagnóstico falso.

### Arrancar el dev server — lo arrancas tú, el entorno lo elige el usuario

Levantar el frontend es tarea tuya. **Prohibido** pedirle al usuario que lo arranque, y prohibido abrir el navegador dando por hecho que ya está arriba. Lo único que decide el usuario es **qué entorno** se levanta (paso 2); ejecutarlo y esperarlo lo haces tú.

**1. Comprueba si ya hay algo corriendo en el puerto**, para no levantar una segunda instancia sobre un puerto ocupado.

```bash
curl -sS -o /dev/null -w "%{http_code}" http://localhost:<puerto>
```

- **La conexión falla** → el puerto está libre. Sigue con el paso 2.
- **Responde algo** → hay un proceso escuchando ahí. **Deténlo** localizándolo por el puerto con `netstat` y matándolo con `taskkill`, igual que en la sección "7.1 Cerrar los procesos que abriste", vuelve a lanzar el `curl` hasta que la conexión falle, y sigue con el paso 2.

**Que hubiera algo corriendo no te salta ningún paso.** Los pasos 2 a 5 se ejecutan completos igual: se pregunta el entorno, lo arrancas tú, esperas a que acepte conexiones y lees su salida. Ese proceso que estaba ahí lo levantó otra sesión o el propio usuario, así que no sabes con qué entorno arrancó ni si su build corresponde al código actual, y todo lo que observes contra él es un diagnóstico falso.

**2. Pregunta al usuario qué entornos usar.** Son **dos preguntas DIFERENTES**, cada una con su propia lista de opciones y su propia respuesta, y las dos se hacen aquí, antes de empezar a ejecutar el modo AUTOMATIZAR o DEPURAR, nunca al llegar al build. Una respuesta no se deduce de la otra:

1. **Qué entorno se ejecuta** — el dev server del paso 3.
2. **A qué entorno se le hace el build** — la sección "7.4 Ejecutar el build".

Lee los scripts de `package.json` — **no asumas que existe `dev` ni `start`, ni un `build` a secas** — y **no elijas los entornos por tu cuenta**, ni siquiera cuando uno parezca el obvio. La decisión es del usuario: pregúntasela con `AskUserQuestion` antes de ejecutar nada.

- En la pregunta del entorno que se ejecuta, una opción por cada script del `package.json` que levante la app, con el nombre exacto del script como etiqueta. En la descripción, lo que ese script implica de verdad: qué configuración pasa —dedúcelo de lo que ejecuta y de la config del framework, nunca de su nombre—, puerto, y contra qué backend apunta si puedes deducirlo de los archivos de environment. El usuario elige un entorno, no un string.
- En la pregunta del entorno del build, una opción por cada script del `package.json` que compile el proyecto, con el nombre exacto del script como etiqueta. En la descripción, a qué entorno apunta, deducido igual: de lo que el script ejecuta, nunca de su nombre.
- En las dos, una opción final "Otra — la indico yo", para un script o unos flags que no estén en la lista.
- Los nombres de todos esos scripts se leen del `package.json`, no se dan por sabidos.

Pregunta también cuando en cualquiera de las dos solo haya un candidato: el usuario puede querer otro puerto u otra configuración. La única excepción es que ya te haya dicho en la conversación qué entorno quiere para esa pregunta concreta; entonces úsalo y dilo, sin volver a preguntar.

**3. Arranca el script elegido en background** (`run_in_background: true`, nunca en foreground: el dev server no termina y bloquearía la sesión). **Anota el `task_id` que devuelve la llamada**: sin él no puedes cerrarlo en el paso 7.

```bash
pnpm run <script-elegido>
```

**4. Espera a que acepte conexiones** antes de abrir el navegador — el proceso arranca mucho antes de que el primer build termine. Sin `sleep`, deja que `curl` reintente:

```bash
curl -sS --retry 60 --retry-delay 2 --retry-connrefused -o /dev/null http://localhost:<puerto>
```

**5. Lee la salida del proceso en background** para confirmar el puerto real y que el build compiló. Si el arranque falla (puerto ocupado, error de compilación, `node_modules` sin instalar), reporta el error exacto de esa salida y detente: no abras el navegador contra un server que no está, porque todo lo que observes después será un diagnóstico falso.

**6. Abre el navegador** en modo visible, para que el usuario vea lo que ocurre:

```bash
pnpm exec playwright-cli open --headed http://localhost:<puerto>
```

**7. Ciérralo todo antes de terminar la respuesta.** El dev server y el navegador viven lo que dura *la respuesta*, no la sesión: los abriste tú y los cierras tú, en el mismo turno, sin esperar a que el usuario lo pida. Nada tuyo queda corriendo entre turnos. El procedimiento está en la sección "7.1 Cerrar los procesos que abriste" y es obligatorio.

Si el usuario sigue con el mismo bug en el turno siguiente, vuelves a arrancarlo desde el paso 1 reutilizando el entorno que ya eligió — arrancar de nuevo cuesta segundos; un proceso huérfano ocupando el puerto cuesta un diagnóstico falso.

## 5. Modo AUTOMATIZAR

Ejecutar el flujo, nada más. Aquí **no se diagnostica**: sin `screenshot`, sin `console`, sin `requests`, sin `eval`. Esas son las herramientas del modo DEPURAR, descritas en la sección "6.2 Observar desde fuera (antes de tocar el código)", y aquí solo añaden ruido a un flujo que se pidió *ejecutar*, no auditar.

1. Abre la app y toma un `snapshot` para obtener los refs.
2. Ejecuta el flujo completo de punta a punta con los comandos de interacción. Re-snapshot después de cada navegación o cambio grande del DOM: los refs se invalidan.
3. Reporta: pasos ejecutados y estado final, leído del último `snapshot`.
4. Cierra navegador y dev server siguiendo la sección "7.1 Cerrar los procesos que abriste" antes de entregar el reporte.

Única excepción: que el usuario pida explícitamente una captura ("toma un screenshot de la pantalla de X"). Entonces el screenshot *es* el encargo, no diagnóstico — tómalo y sigue.

Si el flujo se rompe, no te pongas a investigar por tu cuenta: eso ya es depurar. Reporta en qué paso se rompió y qué esperabas que pasara, y aplica el traspaso de modo de la sección "1. Elegir el modo — pregúntalo antes de ejecutar nada".

## 6. Modo DEPURAR

El orden importa. Cada paso descarta hipótesis antes de tocar código.

### 6.1 Reproducir

Ejecuta el flujo hasta el punto de fallo. Si no puedes reproducirlo, dilo y pide los pasos exactos en lugar de instrumentar a ciegas.

### 6.2 Observar desde fuera (antes de tocar el código)

La mayoría de los bugs se identifican aquí sin editar nada:

```bash
pnpm exec playwright-cli console error     # errores de la consola del navegador
pnpm exec playwright-cli console           # todo lo que loguea la app
pnpm exec playwright-cli requests           # lista numerada de las peticiones reales
pnpm exec playwright-cli request 5         # detalle de la petición nº5
pnpm exec playwright-cli eval "() => ..."  # inspeccionar DOM o estado global
pnpm exec playwright-cli screenshot        # bugs visuales o de maquetación
```

Las peticiones reales son **dos comandos, no uno**: `requests` lista todo lo que pidió el navegador desde que cargó la página, numerado; `request <n>` abre una de esas por su número y te da URL, método, status, tiempo y los headers de ida y vuelta. Eso reemplaza a la mayoría de los `console.log` alrededor de llamadas HTTP. Úsalo primero.

- Por defecto omite recursos estáticos (imágenes, fuentes, scripts). Agrega `--static` solo si sospechas de uno.
- `request <n>` **no trae los cuerpos**: pídelos aparte con `request-body <n>` y `response-body <n>`. Si el detalle es demasiado grande, pide solo la parte que necesitas: `request-headers <n>`, `response-headers <n>`.

**Solo pasa a instrumentar el código si esto no basta.**

### 6.3 Aislar frontend vs backend

Si el fallo involucra una API, repite la petición desde la terminal con `curl`, copiando el método, el cuerpo y los headers de auth exactos que te devolvió `request <n>`:

- El endpoint responde bien por `curl` pero mal en la app → el bug es del frontend.
- El endpoint responde mal por `curl` → el bug es del backend; deja de instrumentar el frontend.

Prueba los tres casos cuando apliquen: caso feliz, datos inválidos (400/422), y sin token de auth (401/403).

### 6.4 Inspeccionar `node_modules` (opcional)

**Este paso es opcional: no hay ninguna obligación de ejecutarlo.** Solo aporta cuando el bug apunta a una librería o dependencia; si el fallo está en el código del proyecto, sáltalo y sigue con el paso siguiente.

Las razones por las que se lee `node_modules` son:

- **Buscar los tipos de datos de la librería o dependencia relacionada con el bug**: la firma real de la función, la forma del objeto que devuelve, qué campos son opcionales. Los tipos que hay ahí son los de la versión instalada, que es la que el proyecto está usando de verdad.
- **Entender el funcionamiento de la librería o dependencia**: leer su implementación cuando lo que hace no coincide con lo que esperabas.

**Está prohibido leer la carpeta `node_modules` por completo**, porque llena el contexto de la IA y consume muchos tokens. Solamente si es necesario, leer específicamente las dependencias o librerías relacionadas con el bug a solucionar.

**Puedes leer `node_modules`, pero NO lo modifiques.** Es código de terceros que instala el gestor de paquetes: un cambio ahí no queda en el repo, no lo ve el resto del equipo y lo pisa el gestor en cuanto vuelva a resolver las dependencias. Si el diagnóstico apunta a una librería, eso se lleva a la pregunta de la sección "6.7 PARAR y preguntar — nunca corregir por tu cuenta".

### 6.5 Instrumentar con console.log temporal

**Formato obligatorio**, con marcador de limpieza al final:

```js
console.log('[ruta/relativa/desde/la/raiz/archivo.ext] [nombreFuncionOMetodo]:', valor); // DBG-<id>
```

Ejemplo real:

```js
console.log('[src/features/users/components/user-list/user-list.component.ts] [ngOnInit]:', this.users()); // DBG-a3f1
```

`<id>` es un hash corto de 4 caracteres, el mismo para toda la sesión de depuración. Existe para poder borrar todo después con un `grep`. Sin él, la instrumentación se queda en el repo.

Antes de instrumentar, ejecuta `git status`. Si el árbol está sucio, avisa al usuario: sin un diff limpio de referencia, no hay forma fiable de verificar la limpieza al final.

**Desenvuelve los valores reactivos.** Loguear el envoltorio (signal, ref, proxy, observable) no muestra el valor: `this.users()` en Angular, `.value` o `toRaw()` en Vue, el estado ya desestructurado en React. Un `console.log` de un Proxy no te dice nada.

#### Dónde poner los logs — por niveles

Instrumenta el **camino sospechoso**, no el archivo entero. Un log de más entierra la señal en ruido y te hace perder el bug.

**Nivel 1 — empieza siempre aquí:**
- Parámetros de entrada y valor de retorno de la función o método sospechoso.
- Justo antes y justo después de cada llamada HTTP (payload enviado / respuesta cruda recibida).
- Dentro de cada `catch` del flujo: loguea el objeto de error completo, no `error.message`.
- El handler del evento DOM que inicia el flujo (`onClick`, `onSubmit`, `onChange`).

**Nivel 2 — si el nivel 1 no localiza el fallo:**
- Estado después de cada mutación (`useState`, signals, store, `BehaviorSubject`, `ref`/`reactive`).
- Resultado de cada validación, junto con el input que la produjo.
- Rama tomada en los condicionales del camino.
- Hooks de ciclo de vida (`ngOnInit`, `useEffect`) con sus dependencias.
- Props/Inputs recibidos, y Outputs/callbacks en el momento de emitirse.
- Parámetros de ruta y query al cambiar de ruta.

**Nivel 3 — con cuidado:**
- Ciclos: loguea la colección completa antes y después del bucle, o solo las iteraciones que cumplen una condición. Nunca un log crudo por iteración sobre una colección grande.

**Nunca:**
- Dentro del render o template de un componente reactivo, ni en un `computed`/`getter` que se recalcula en cada render: genera cientos de líneas por interacción.
- En un handler de alta frecuencia (`scroll`, `mousemove`, `resize`, `input`) sin filtro.

Después de cada tanda de instrumentación: recarga, repite el flujo, y lee `pnpm exec playwright-cli console`. Ajusta y repite. Es un ciclo, no un volcado único.

### 6.6 Forzar la rama de error

Para probar el `catch` y no solo el `try`, **prefiere forzar el fallo desde la red**, sin tocar el código:

```bash
pnpm exec playwright-cli route "**/api/<recurso>" --status=500 --body='{"error":"forzado"}' --content-type=application/json
```

El `--status` de error es obligatorio: sin él `route` responde **200** y el flujo sigue por el camino feliz con un body raro, sin llegar nunca al `catch`. Consulta `pnpm exec playwright-cli route --help` para las opciones de headers y content-type de tu versión.

Y `route` no anula la petición: para simular una caída de red en lugar de una respuesta de error, usa `pnpm exec playwright-cli network-state-set offline` y restaura con `online`. Ambas cosas son reversibles, no dejan residuos en el repo y ejercitan el `catch` real.

Modifica el código para forzar un throw **solo** cuando el fallo no se pueda inducir desde fuera, y solo en el `catch` del flujo bajo investigación. No recorras el proyecto forzando todos los `catch`.

### 6.7 PARAR y preguntar — nunca corregir por tu cuenta

Cuando tengas el diagnóstico, **detente**. No apliques la corrección.

Usa `AskUserQuestion` con:
- Una explicación breve del bug: archivo, línea, causa raíz, y la evidencia que lo demuestra (el log, el status HTTP, el error de consola).
- **Mínimo 2 opciones de solución**, cada una con su consecuencia real (alcance del cambio, qué más podría romper).
- Una marcada explícitamente como **recomendada**, con el motivo.
- Una opción final del tipo "Otra — la describo yo" para que el usuario proponga su propio enfoque.

Un diagnóstico sin evidencia no es un diagnóstico. Si no puedes señalar el log o la respuesta HTTP que lo prueba, sigue depurando en lugar de preguntar.

### 6.8 Corregir y verificar

Aplica solo la opción elegida. Después, vuelve a ejecutar el flujo completo con playwright-cli: interacción, `console error` limpio, `requests` con el status esperado, y screenshot final. Repite hasta que pase. Un "ya debería funcionar" sin ejecución no cuenta como verificación.

## 7. Limpieza y verificación obligatorias

Se hace **en la misma respuesta**, antes de devolverle el turno al usuario. No en la siguiente, no "cuando termine el bug".

### 7.1 Cerrar los procesos que abriste

No dejes nada vivo en background. En este orden:

1. **El navegador:**

   ```bash
   pnpm exec playwright-cli close
   ```

   Si abriste sesiones con nombre o varias ventanas, `pnpm exec playwright-cli close-all`.

2. **El dev server:** `TaskStop` con el `task_id` del paso 3 de la sección "4. Detectar el entorno (nunca asumirlo)".

3. **Verifica que murió de verdad**, no que "debería" haber muerto:

   ```bash
   curl -sS -o /dev/null -w "%{http_code}" http://localhost:<puerto>
   ```

   La conexión tiene que fallar. Si el puerto sigue respondiendo, el proceso quedó vivo, y es lo normal: `TaskStop` mata el wrapper de `pnpm`, pero el dev server corre en un proceso hijo de Node que sobrevive, sea cual sea el framework. Localízalo por el puerto y mátalo con todo su árbol de hijos antes de dar nada por terminado:

   ```bash
   netstat -ano | grep ":<puerto>.*LISTENING"   # la última columna es el PID
   taskkill //PID <pid> //T //F                 # en PowerShell: taskkill /PID <pid> /T /F
   ```

   Vuelve a lanzar el `curl` y no sigas hasta que la conexión falle.

Esto aplica **siempre**, no solo cuando la tarea sale bien: también si abandonas el diagnóstico, si el arranque falló a medias, si el usuario cambia de tema, o si te quedas esperando su respuesta a un `AskUserQuestion`. Un dev server huérfano ocupa el puerto, así que el siguiente arranque falla o —peor— te conectas sin darte cuenta a la instancia vieja y depuras contra un build que ya no corresponde al código.

### 7.2 Borrar la instrumentación

```bash
grep -rn "DBG-<id>" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=.claude
```

Borra cada coincidencia, junto con cualquier `throw` temporal que hayas añadido para forzar un `catch`. Luego:

```bash
git diff
```

Revisa el diff completo. Lo único que debe quedar es la corrección autorizada. Si aparece cualquier `console.log` o cambio que no forma parte de la solución acordada, bórralo.

Reporta al usuario que la limpieza está verificada. Instrumentación olvidada en el repo es un fallo de la tarea, no un detalle menor.

### 7.3 Ejecutar el linter

Va **antes** del build a propósito: tarda segundos en vez de minutos, así que si algo está mal te enteras sin esperar a que compile el proyecto entero.

Solo si el proyecto tiene ESLint configurado. **Lee los scripts del `package.json`**: busca uno tipo `lint`, `lint:fix` o `eslint`, y ejecuta el nombre exacto que encuentres ahí.

```bash
pnpm run <script-de-lint>
```

Ni el script ni la configuración se asumen: el nombre del script sale de los scripts del `package.json`, y la configuración es el fichero `eslint.config.*` o `.eslintrc*` que exista en el proyecto. Los dos se deducen leyendo, no de memoria.

**Si no hay script de lint ni fichero de configuración** (`eslint.config.*`, `.eslintrc*`), **ignóralo y salta al paso siguiente**: no es un fallo. Menciónalo en el reporte en una línea, para que el usuario sepa que ese control no se ejecutó. Lo que **no** puedes hacer es instalar ESLint ni crear una configuración para poder correrlo: eso es cambiar dependencias del proyecto, prohibido por la sección "8. Límites".

Si el linter marca errores en las líneas que tocaste, arréglalos. Si los marca en código que no tocaste, déjalos y menciónalo.

#### Cómo leer la salida — aplica al linter y al build

**Lee la salida completa de la terminal, no solo el código de salida.** Esta tabla se escribe una sola vez y vale para los dos pasos, "7.3 Ejecutar el linter" y "7.4 Ejecutar el build": los dos se recorren igual, buscando:

| En la salida | Qué significa |
|---|---|
| `Error:` / `ERROR in` | fallo real; trae archivo y línea, úsalos para diagnosticar |
| `error TS####` | error de TypeScript, con el código concreto que puedes consultar |
| `Warning:` / `WARNING in` | puede ser preexistente; contrástalo con los archivos que tocaste |
| Resumen de bundles / `budget` | tu cambio infló el tamaño y superó un presupuesto |

Diagnostica desde el archivo y la línea que da la propia salida, no adivinando. Si la salida es larga, no la resumas de memoria: vuelve a leerla y cita el mensaje exacto.

### 7.4 Ejecutar el build

El último control: con la instrumentación borrada y el linter ya resuelto según el paso anterior, comprueba que el proyecto compila. El script de build es el del entorno que el usuario ya eligió en el paso 2 de la sección "4. Detectar el entorno (nunca asumirlo)": aquí no se vuelve a preguntar ni se elige otro.

Son tres pasos y van en este orden:

**1. Busca la carpeta del build que le corresponde a este framework** — la que contiene los archivos compilados. Cada framework escribe en la suya y con su propio nombre, así que dedúcela: identifica qué framework usa el proyecto por las dependencias del `package.json`, y saca la ruta de su fichero de configuración o de la que el propio build imprime al terminar. Ni el framework ni la carpeta se dan por sabidos. **Nunca borres una carpeta que no hayas confirmado que es la del build de ese framework.**

**2. Solo cuando esa carpeta exista, bórrala.** Si no existe, no hay nada que borrar: pasa directo al paso 3 sin crear ni tocar nada.

**3. Ahora sí, ejecuta el build:**

```bash
pnpm run <script-de-build>
```

Recorre su salida con la tabla del paso anterior. Un build puede terminar sin fallar y aun así estar avisando de algo que rompiste: el dev server es más permisivo que el build, así que hay errores de tipos, plantillas o imports que solo aparecen aquí.

Si el build falla, aplica la sección "6.7 PARAR y preguntar — nunca corregir por tu cuenta" tal cual está escrita ahí. Lo único que este paso añade es qué llevar a esa pregunta, porque la salida del build mezcla dos tipos de error:

1. Los que **NO** están relacionados con el bug buscado por el usuario.
2. Los que **SÍ** están relacionados con el bug buscado por el usuario.

Sepáralos revisando el working directory, nunca suponiendo: `git stash` y build — lo que sigue fallando sin tus cambios es del tipo 1 —, luego `git stash pop` y build — lo que aparece solo con tus cambios aplicados es del tipo 2.

Lleva los dos tipos a la pregunta, en listas separadas, cada error con el archivo, la línea y el mensaje exacto de la salida. **Si un tipo no tiene errores, dilo y no inventes ninguno**: "no hay errores ajenos al bug buscado" y "no hay errores relacionados con el bug buscado" son las respuestas que corresponden cuando esa lista está vacía.

Los errores del tipo 1 son trabajo fuera de la corrección autorizada: no los toques salvo que el usuario elija arreglarlos en esa pregunta, ver la sección "8. Límites".

## 8. Límites

- No escribas tests de Jest, Vitest, Cypress ni Playwright Test. Si el usuario quiere cobertura permanente, dilo y pregunta; no lo hagas por iniciativa propia.
- No refactorices, renombres ni "mejores" código que no forma parte de la corrección autorizada.
- No alteres el proyecto original —configuración, funcionalidad, maquetación, dependencias ni variables de entorno— por iniciativa propia. Cámbialo solo si el usuario lo pidió explícitamente, o si preguntaste antes y autorizó ese cambio.
- No inventes la causa del bug. Si tras la instrumentación no está claro, reporta lo que descartaste y lo que falta por descartar.
