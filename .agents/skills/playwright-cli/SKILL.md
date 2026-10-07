---
name: playwright-cli
description: 'Depura bugs y automatiza flujos de UI ejecutando la app real en el navegador con playwright-cli, de forma agnóstica al framework frontend. Úsala siempre que el usuario reporte un bug de interfaz, diga que algo "no funciona", "no carga", "no guarda", "da error" o "se ve mal", pida reproducir o diagnosticar un fallo, pida verificar visualmente un cambio de maquetación, o pida automatizar o ejecutar un flujo de la app (login, alta de registro, checkout, wizard). Es para depuración interactiva y automatización asistida por agente contra la app corriendo.'
when_to_use: 'Frases típicas que la disparan - "hay un bug en X", "no me funciona el formulario", "revisa por qué falla", "reprodúcelo y dime qué pasa", "prueba el flujo completo de", "automatiza el proceso de", "toma un screenshot de", "mira la consola del navegador", "el botón no hace nada".'
allowed-tools: Read, Edit, Write, Grep, Glob, Bash(pnpm exec playwright-cli *), Bash(pnpm exec playwright *), Bash(pnpm run *), Bash(pnpm install), Bash(curl *), Bash(grep *), Bash(netstat *), Bash(taskkill *), Bash(git status *), Bash(git diff *), Bash(git stash *), TaskStop
---

# ¿Cómo leer la skill?

Esta skill tiene tres partes y cada una empieza en un título. La primera está en este archivo; las otras dos, en el archivo [automatizacion-del-navegador.md](automatizacion-del-navegador.md):

| Título y ruta archivo | ¿Qué define? | ¿Cuándo leerlo? |
| --- | --- | --- |
| [Depuración y automatización de frontend con `playwright-cli`](#depuración-y-automatización-de-frontend-con-playwright-cli) | Cómo usar los comandos para automatizar un proceso o solucionar un bug: el modo de ejecución (AUTOMATIZAR o DEPURAR), en qué orden, en qué momento, cuándo parar y qué está prohibido. Es el **criterio**, no el catálogo. | Siempre y primero: el modo se pregunta antes de ejecutar nada. |
| [Automatización del navegador con playwright-cli](automatizacion-del-navegador.md) | La lista y explicación de los comandos que permiten a la IA controlar el navegador — sintaxis, refs (`e15`), snapshots, sesiones. Es el **catálogo de comandos**: qué se puede teclear y con qué flags. | Antes de la primera invocación de la sesión, como indica la sección [2. Mecánica de playwright-cli](#2-mecánica-de-playwright-cli), y cada vez que necesites la sintaxis o las flags de un comando. |
| [Tareas específicas](automatizacion-del-navegador.md#tareas-específicas) | El índice de las guías de [`referencias/`](referencias/): cada guía explica en detalle una tarea concreta que el catálogo solo resume o no cubre. | Cuando la tarea coincide con una fila de su tabla: la columna «¿Cuándo leerlo?» indica qué guía abrir. |

La primera parte es el criterio y las otras dos son el catálogo. Son **DIFERENTES** y ninguna sustituye a la otra.

Consecuencia práctica: la primera parte **no repite** la mecánica de los comandos, así que leerla sola no basta para teclear nada. Y el catálogo **no decide** nada sobre cuándo aplicarlos, así que leerlo solo tampoco basta: sabrías ejecutar comandos, pero no cuál usar en cada paso, ni cuándo dejar de instrumentar, ni cuándo preguntar antes de corregir. Se usan **juntas**.

# Depuración y automatización de frontend con `playwright-cli`

Verifica el comportamiento contra la app corriendo en un navegador real, no contra suposiciones sobre el código. Leer el código dice qué *debería* pasar; ejecutar el flujo dice qué *pasa* realmente.

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
| ¿Pide usuario y contraseña y hace login? | sí | sí |

Los dos casos en que el modo DEPURAR escribe en el código fuente:

1. **Instrumentación temporal** — `console.log` marcados con `// DBG-<id>`, y `throw` para forzar un `catch` cuando el fallo no se puede inducir desde la red. No cambia el comportamiento de la app, se aplica sin preguntar y **se borra en la misma respuesta** (sección [7.2 Borrar la instrumentación](#72-borrar-la-instrumentación)).
2. **La corrección del bug** — solo la opción que el usuario autorizó al responder la pregunta de la sección [6.7 PARAR y preguntar — nunca corregir por tu cuenta](#67-parar-y-preguntar--nunca-corregir-por-tu-cuenta). Permanece en el repositorio.

Cualquier otra edición está prohibida, incluidos los bugs que encuentres de paso: repórtalos y sigue con el autorizado.

**El modo lo elige el usuario, no tú.** Pregúntalo siempre, aunque te lo haya dicho explícitamente ("automatiza el alta de usuario", "depura por qué falla el guardado"), y no lo deduzcas de la petición aunque uno de los dos parezca evidente: "prueba el login" puede ser ejecutar el flujo o averiguar por qué falla, y equivocarse cuesta una sesión entera de instrumentación que nadie pidió.

La pregunta lleva dos opciones, cada una con lo que ese modo implica de verdad —si toca el código y si para a preguntar antes de corregir—:

- **AUTOMATIZAR** — ejecuta el flujo de punta a punta y reporta el estado final. No toca el código ni diagnostica.
- **DEPURAR** — reproduce el fallo, observa, instrumenta si hace falta **para** a preguntar antes de aplicar cualquier corrección.

Las dos preguntas de entorno del paso 2 de la sección [3. Detectar el entorno (nunca asumirlo)](#3-detectar-el-entorno-nunca-asumirlo) son independientes de esta y llegan después.

## 2. Mecánica de playwright-cli

Antes de la primera invocación de esta sesión **consulta el catálogo de comandos**, que viene de la skill oficial de Microsoft: el título [Automatización del navegador con playwright-cli](automatizacion-del-navegador.md) y las guías de `referencias/` que lista [Tareas específicas](automatizacion-del-navegador.md#tareas-específicas).

### Los comandos de esta parte son ejemplos, no una lista blanca

Los que aparecen aquí —`open`, `snapshot`, `click`, `console`, `requests`, `request`, `eval`, `screenshot`, `route`, `close`— resuelven la mayoría de los casos, nada más. Si necesitas otro, **búscalo en el título [Automatización del navegador con playwright-cli](automatizacion-del-navegador.md) o en `pnpm exec playwright-cli --help` y ejecútalo**: usar el comando adecuado siempre es mejor que forzar uno de estos ejemplos.

Lo único que fija esta parte es **cuáles usar en cada momento**: qué mirar primero al depurar, en la sección [6.2 Observar desde fuera (antes de tocar el código)](#62-observar-desde-fuera-antes-de-tocar-el-código), y qué no aporta nada cuando solo te piden ejecutar un flujo, en la sección [5. Modo AUTOMATIZAR](#5-modo-automatizar).

## 3. Detectar el entorno (nunca asumirlo)

El proyecto puede ser de cualquier framework. Deduce, no adivines:

**Gestor de paquetes** — Deducirlo de la configuracion del proyecto, cuando la respuesta sea dudosa entonces preguntar al usuario

**Puerto del dev server** — lee los scripts del `package.json` y la configuracion del framework (`angular.json`, `next.config.*`, `vite.config.*`, `nuxt.config.*`). Defaults habituales: Angular 4200, Next/Nuxt/CRA 3000, Vite 5173, Astro 4321.

### Arrancar el dev server — lo arrancas tú, el entorno lo elige el usuario

**Prohibido** pedirle al usuario que lo arranque, y prohibido abrir el navegador dando por hecho que ya está arriba.

**1. Comprueba si ya hay algo corriendo en el puerto**, para no levantar una segunda instancia sobre un puerto ocupado:

```bash
curl -sS -o /dev/null -w "%{http_code}" http://localhost:<puerto>
```

- **La conexión falla** → el puerto está libre. Sigue con el paso 2.
- **Responde algo** → hay un proceso escuchando ahí. **Deténlo** con `netstat` y `taskkill` como en el paso 3 de la sección [7.1 Cerrar los procesos que abriste](#71-cerrar-los-procesos-que-abriste), repite el `curl` hasta que la conexión falle y sigue con el paso 2.

**Que hubiera algo corriendo no te salta ningún paso**: del 2 al 5 se ejecutan completos. Ese proceso lo levantó otra sesión o el propio usuario, así que no sabes con qué entorno arrancó ni si su build corresponde al código actual, y todo lo que observes contra él es un diagnóstico falso.

**2. Pregunta  qué entornos usar**, antes de empezar a ejecutar el modo AUTOMATIZAR o DEPURAR. Son **dos preguntas DIFERENTES**, cada una con sus opciones y su respuesta, y una no se deduce de la otra:

1. **Qué entorno se ejecuta** — el dev server del paso 3.
2. **A qué entorno se le hace el build** — la sección [7.4 Ejecutar el build](#74-ejecutar-el-build).

**No elijas los entornos por tu cuenta**, ni siquiera cuando uno parezca el obvio. Las opciones salen de los scripts del `package.json` —**no asumas que existe `dev` ni `start`, ni un `build` a secas**—, con el nombre exacto del script como etiqueta:

- **Entorno que se ejecuta:** una opción por cada script que levante la app. En la descripción, lo que implica de verdad: qué configuración pasa, puerto, y contra qué backend apunta si puedes deducirlo de los archivos de environment. El usuario elige un entorno, no un string.
- **Entorno del build:** una opción por cada script que compile el proyecto. En la descripción, a qué entorno apunta.
- **En las dos:** lo que implica cada script se deduce de lo que ejecuta y de la configuración del framework, nunca de su nombre; y la última opción es "Otra — la indico yo", para un script o unos flags que no estén en la lista.

Pregunta también cuando en cualquiera de las dos solo haya un candidato: el usuario puede querer otro puerto u otra configuración.

**3. Arranca el script elegido en background** (`run_in_background: true`, nunca en foreground: el dev server no termina y bloquearía la sesión). **Anota el `task_id` que devuelve la llamada**: sin él no puedes cerrarlo en el paso 7.

```bash
pnpm run <script-elegido>
```

**4. Espera a que acepte conexiones** antes de abrir el navegador: el proceso arranca mucho antes de que el primer build termine. Sin `sleep`, deja que `curl` reintente:

```bash
curl -sS --retry 60 --retry-delay 2 --retry-connrefused -o /dev/null http://localhost:<puerto>
```

**5. Lee la salida del proceso en background** para confirmar el puerto real y que el build compiló. Si el arranque falla (puerto ocupado, error de compilación, `node_modules` sin instalar), reporta el error exacto de esa salida y detente: abrir el navegador en un puerto equivocado o contra un server que no está produce un diagnóstico falso.

**6. Abre el navegador** en modo visible, para que el usuario vea lo que ocurre:

```bash
pnpm exec playwright-cli open --headed http://localhost:<puerto>
```

Después va el login de la sección [4. Login — pide usuario y contraseña, nunca los inventes](#4-login--pide-usuario-y-contraseña-nunca-los-inventes), y solo entonces el procedimiento del modo elegido.

**7. Ciérralo todo antes de terminar la respuesta**, sin esperar a que el usuario lo pida: nada tuyo queda corriendo entre turnos. El procedimiento está en la sección [7.1 Cerrar los procesos que abriste](#71-cerrar-los-procesos-que-abriste).

Si el usuario sigue con el mismo bug en el turno siguiente, vuelves a arrancarlo desde el paso 1 reutilizando el entorno que ya eligió: arrancar de nuevo cuesta segundos; un proceso huérfano ocupando el puerto cuesta un diagnóstico falso.

## 4. Login — pide usuario y contraseña, nunca los inventes

Se ejecuta **siempre** y va justo aquí por dos motivos de orden: necesita el navegador ya abierto sobre la app —paso 6 de la sección [3. Detectar el entorno (nunca asumirlo)](#3-detectar-el-entorno-nunca-asumirlo)— y la sesión que deja abierta es la que necesitan las pantallas protegidas del modo que venga después.

Las credenciales se piden por dos razones:

- **No puedes inventarlas.** Usuario y contraseña son dos strings que solo conoce el usuario. Está **PROHIBIDO** inventarlos o deducirlos del código, de un seed, de un archivo de environment, de los tests, de la documentación o del valor por defecto que traiga el formulario: un usuario que no existe falla igual que una contraseña equivocada, y a partir de ahí todo lo que observes es un diagnóstico falso.
- **Sin login no hay sesión**, y el resto del flujo cuelga de ella: sin sesión, el guard de rutas te devuelve a la pantalla de login y no llegas a probar nada de lo que te pidieron.

**1. Hacer dos preguntas**: una para el usuario y otra para la contraseña. El valor real lo escribe el usuario en la opción abierta que la herramienta añade siempre; las dos opciones fijas que exige por pregunta no pueden ser credenciales adivinadas, así que usa las únicas que no inventan nada: **"La escribo yo"** y **"Cancelar — no ejecutar el flujo"**.

Usa los dos valores **tal cual los escribió**: sin recortar espacios, sin cambiar mayúsculas, sin completar dominios ni prefijos. Y no los propagues: la contraseña no va al reporte, ni a un `console.log`, ni a un `eval` que la imprima; cuando tengas que mencionarla, redáctala.

Si el usuario elige cancelar, no lances el flujo: cierra navegador y dev server siguiendo la sección [7.1 Cerrar los procesos que abriste](#71-cerrar-los-procesos-que-abriste) y dilo.

**2. Haz el login por la interfaz**, como lo haría el usuario: no hay atajo, esa pantalla es parte de la app que se está probando. La ruta de la pantalla de login sale de la configuración de rutas del proyecto, no se asume; y los refs de los dos campos y del botón salen del `snapshot`, nunca de un selector inventado.

```bash
pnpm exec playwright-cli snapshot                          # refs de los campos y del botón
pnpm exec playwright-cli fill <ref-usuario> "<usuario>"
pnpm exec playwright-cli fill <ref-contraseña> "<contraseña>"
pnpm exec playwright-cli click <ref-boton>
pnpm exec playwright-cli snapshot                          # confirma que entraste
```

**3. No repitas el login.** La sesión queda abierta en el navegador —cookie o token en el storage— y el resto del flujo la reutiliza sola. Está **prohibido** falsificarla: nada de inventarte un token o inyectarlo con `eval`, escribir en `localStorage` o en las cookies, saltarte el guard de rutas, ni editar el código para que el guard o el endpoint dejen pasar sin sesión.

**4. Cuando el login no es exitoso, repórtalo y para.** No lo es cuando, después de enviar el formulario, el `snapshot` sigue mostrando la pantalla de login, aparece un mensaje de error, o no aparece nada de la app autenticada. El reporte lleva evidencia, no interpretación: en qué ruta quedó el navegador, qué muestra el `snapshot` y qué mensaje de error apareció, con la contraseña redactada. Seguir el flujo sin sesión o falsificarla está **prohibido** (paso 3).

Si el login era el flujo bajo investigación, el fallo ya está reproducido: continúa con la sección [6. Modo DEPURAR](#6-modo-depurar) —esto *es* el bug, no un obstáculo—. Si solo era el trámite previo para llegar a él, no puedes saber desde el navegador si falló lo que se escribió o falló la app, y las dos salidas llevan a sitios distintos: pregunta y deja que el modo en que estés fije qué opciones entran en esa pregunta.

## 5. Modo AUTOMATIZAR

Ejecutar el flujo, nada más. **No se diagnostica** (ver la [tabla de la sección 1](#1-elegir-el-modo--pregúntalo-antes-de-ejecutar-nada)): aquí solo añade ruido a un flujo que se pidió *ejecutar*, no auditar.

1. Abre la app y toma un `snapshot` para obtener los refs.
2. Ejecuta el flujo completo de punta a punta con los comandos de interacción. Re-snapshot después de cada navegación o cambio grande del DOM: los refs se invalidan.
3. Reporta: pasos ejecutados y estado final, leído del último `snapshot`.
4. Cierra navegador y dev server siguiendo la sección [7.1 Cerrar los procesos que abriste](#71-cerrar-los-procesos-que-abriste) antes de entregar el reporte.

Única excepción: que el usuario pida explícitamente una captura ("toma un screenshot de la pantalla de X"). Entonces el screenshot *es* el encargo, no diagnóstico: tómalo y sigue.

Si el flujo se rompe, no lo investigues ni lo arregles por tu cuenta —eso ya es depurar—: reporta en qué paso se rompió y qué esperabas que pasara, y pregunta si quiere pasar a modo DEPURAR.

## 6. Modo DEPURAR

El orden importa. Cada paso descarta hipótesis antes de tocar código.

### 6.1 Reproducir

Ejecuta el flujo hasta el punto de fallo. Si no puedes reproducirlo, dilo y pide los pasos exactos en lugar de instrumentar a ciegas.

### 6.2 Observar desde fuera (antes de tocar el código)

La mayoría de los bugs se identifican aquí:

```bash
pnpm exec playwright-cli console error     # errores de la consola del navegador
pnpm exec playwright-cli console           # todo lo que loguea la app
pnpm exec playwright-cli requests           # lista numerada de las peticiones reales
pnpm exec playwright-cli request 5         # detalle de la petición nº5
pnpm exec playwright-cli eval "() => ..."  # inspeccionar DOM o estado global
pnpm exec playwright-cli screenshot        # bugs visuales o de maquetación
```

`requests` lista todo lo que pidió el navegador desde que cargó la página; `request <n>` abre una de esas peticiones por su número y te da URL, método, status, tiempo y los headers de ida y vuelta. Eso reemplaza a la mayoría de los `console.log` alrededor de llamadas HTTP: úsalo primero.

- Por defecto omite recursos estáticos (imágenes, fuentes, scripts). Agrega `--static` solo si sospechas de uno.
- `request <n>` **no trae los cuerpos**: pídelos aparte con `request-body <n>` y `response-body <n>`. Si el detalle es demasiado grande, pide solo la parte que necesitas: `request-headers <n>`, `response-headers <n>`.

**Solo pasa a instrumentar el código si esto no basta.**

### 6.3 Aislar frontend vs backend

Si el fallo involucra una API, repite la petición desde la terminal con `curl`, copiando el método, el cuerpo y los headers de auth exactos que te devolvieron `request <n>` y `request-body <n>`:

- El endpoint responde bien por `curl` pero mal en la app → el bug es del frontend.
- El endpoint responde mal por `curl` → el bug es del backend; deja de instrumentar el frontend.

Prueba los tres casos cuando apliquen: caso feliz, datos inválidos (400/422), y sin token de auth (401/403).

### 6.4 Inspeccionar `node_modules` (opcional)

Solo aporta cuando el bug apunta a una librería o dependencia; si el fallo está en el código del proyecto, sáltalo. Se lee para:

- **Buscar los tipos de datos de la librería o dependencia relacionada con el bug**: la firma real de la función, la forma del objeto que devuelve, qué campos son opcionales. Son los de la versión instalada, la que el proyecto usa de verdad.
- **Entender su funcionamiento**: leer su implementación cuando lo que hace no coincide con lo que esperabas.

**Está prohibido leer `node_modules` por completo**: llena el contexto de la IA y consume muchos tokens innecesariamente. Lee solo las dependencias relacionadas con el bug.

**Puedes leerlo, pero NO lo modifiques.** Es código de terceros que instala el gestor de paquetes: un cambio ahí no queda en el repositorio, no lo ve el resto del equipo y lo pisa el gestor en cuanto vuelva a resolver las dependencias. Si el diagnóstico apunta a una librería, eso se lleva a la pregunta de la sección [6.7 PARAR y preguntar — nunca corregir por tu cuenta](#67-parar-y-preguntar--nunca-corregir-por-tu-cuenta).

### 6.5 Instrumentar con console.log temporal

**Formato obligatorio:**

```js
console.log('[ruta/relativa/desde/la/raiz/archivo.extension] [nombreFuncionOMetodo]:', valor); // DBG-<id>
```

Ejemplo real:

```js
console.log('[src/features/users/components/user-list/user-list.component.ts] [ngOnInit]:', this.users()); // DBG-a3f1
```

`<id>` es un hash corto de 4 caracteres, el mismo para toda la sesión de depuración, para poder borrar todo después con un `grep`. Sin él, la instrumentación se queda en el repositorio.

Antes de instrumentar, ejecuta `git status`. Si el árbol está sucio, avisa al usuario: sin un diff limpio de referencia, no hay forma fiable de verificar la limpieza al final.

**Desenvuelve los valores reactivos.** Loguear el envoltorio (signal, ref, proxy, observable) no muestra el valor: `this.users()` en Angular, `.value` o `toRaw()` en Vue, el estado ya desestructurado en React.

#### Dónde poner los logs — por niveles

Instrumenta el **camino sospechoso**, no el archivo entero: un log de más entierra la señal en ruido y te hace perder el bug.

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

Después de cada tanda de instrumentación: recarga, repite el flujo y lee `pnpm exec playwright-cli console`. Ajusta y repite: es un ciclo, no un volcado único.

### 6.6 Forzar la rama de error

Para probar el `catch` y no solo el `try`, **prefiere forzar el fallo desde la red**, sin tocar el código:

```bash
pnpm exec playwright-cli route "**<recurso>" --status=500 --body='{"error":"forzado"}' --content-type=application/json
```

El `--status` de error es obligatorio: sin él `route` responde **200** y el flujo sigue por el camino feliz con un body raro, sin llegar nunca al `catch`.

`route` no anula la petición: para simular una caída de red en lugar de una respuesta de error, usa `pnpm exec playwright-cli network-state-set offline` y restaura con `online`. Ambas cosas son reversibles, no dejan residuos en el repositorio y ejercitan el `catch` real.

Modifica el código para forzar un `throw` **solo** cuando el fallo no se pueda inducir desde fuera, y solo en el `catch` del flujo bajo investigación, no en todos los del proyecto.

### 6.7 PARAR y preguntar — nunca corregir por tu cuenta

Cuando tengas el diagnóstico, **detente**: no apliques la corrección, preguntar al usuario si autoriza la correccion y mostrar:

- Una explicación del bug: archivo, línea, causa raíz y la evidencia que lo demuestra (el log, el status HTTP, el error de consola).
- **Mínimo 2 opciones de solución**, cada una con su consecuencia real (alcance del cambio, qué más podría romper).
- Una marcada como **recomendada**, con el motivo.
- Una opción final del tipo "Otra — la describo yo", para que el usuario proponga su propio enfoque.

Un diagnóstico sin evidencia no es un diagnóstico. Si no puedes señalar el log o la respuesta HTTP que lo prueba, sigue depurando en lugar de preguntar.

### 6.8 Corregir y verificar

Aplica solo la opción elegida. Después, vuelve a ejecutar el flujo completo con playwright-cli: interacción, `console error` limpio, `requests` con el status esperado, y screenshot final. Repite hasta que pase. Un "ya debería funcionar" sin ejecución no cuenta como verificación.

## 7. Limpieza y verificación obligatorias

Se hace **en la misma respuesta**, antes de devolverle el turno al usuario. No en la siguiente, no "cuando termine el bug".

### 7.1 Cerrar los procesos que abriste

En este orden:

1. **El navegador:**

   ```bash
   pnpm exec playwright-cli close
   ```

   Si abriste sesiones con nombre o varias ventanas, `pnpm exec playwright-cli close-all`.

2. **El dev server:** `TaskStop` con el `task_id` del paso 3 de la sección [3. Detectar el entorno (nunca asumirlo)](#3-detectar-el-entorno-nunca-asumirlo).

3. **Verifica que murió de verdad**, no que "debería" haber muerto:

   ```bash
   curl -sS -o /dev/null -w "%{http_code}" http://localhost:<puerto>
   ```

   Si el puerto sigue respondiendo, el proceso quedó vivo, y es lo normal: `TaskStop` mata el wrapper de `pnpm`, pero el dev server corre en un proceso hijo de Node que sobrevive, sea cual sea el framework. Localízalo por el puerto y mátalo con todo su árbol de hijos:

   ```bash
   netstat -ano | grep ":<puerto>.*LISTENING"   # la última columna es el PID
   taskkill //PID <pid> //T //F                 # en PowerShell: taskkill /PID <pid> /T /F
   ```

   Vuelve a lanzar el `curl` y no sigas hasta que la conexión falle.

Esto aplica **siempre**: también si abandonas el diagnóstico, si el arranque falló a medias, si el usuario cambia de tema, o si te quedas esperando su respuesta a una pregunta. Un dev server huérfano ocupa el puerto, así que el siguiente arranque falla o —peor— te conectas sin darte cuenta a la instancia vieja y depuras contra un build que ya no corresponde al código.

### 7.2 Borrar la instrumentación

```bash
grep -rn "DBG-<id>" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=.claude
```

Borra cada coincidencia, junto con cualquier `throw` temporal que hayas añadido para forzar un `catch`. Luego:

```bash
git diff
```

Revisa el diff completo: lo único que debe quedar es la corrección autorizada. Si aparece cualquier `console.log` o cambio que no forma parte de ella, bórralo.

Reporta al usuario que la limpieza está verificada. Instrumentación olvidada en el repositorio es un fallo de la tarea, no un detalle menor.

### 7.3 Ejecutar el linter

Va **antes** del build a propósito: tarda segundos en vez de minutos, así que si algo está mal te enteras sin esperar a que compile el proyecto entero.

Ni el script ni la configuración se asumen, se deducen leyendo: busca en los scripts del `package.json` uno tipo `lint`, `lint:fix` o `eslint` y ejecuta el nombre exacto que encuentres; la configuración es el fichero `eslint.config.*` o `.eslintrc*` que exista en el proyecto.

```bash
pnpm run <script-de-lint>
```

**Si no hay script de lint ni fichero de configuración, ignóralo y salta al paso siguiente**: no es un fallo. Menciónalo en el reporte en una línea, para que el usuario sepa que ese control no se ejecutó. Lo que **no** puedes hacer es instalar ESLint ni crear una configuración para poder correrlo: eso es cambiar dependencias del proyecto, prohibido por la sección [8. Reglas](#8-reglas).

#### Cómo leer y clasificar la salida — aplica al linter y al build

**Lee la salida completa de la terminal, no solo el código de salida.** Recórrela buscando:

| En la salida | Qué significa |
|---|---|
| `Error:` / `ERROR in` | fallo real; trae archivo y línea, úsalos para diagnosticar |
| `error TS####` | error de TypeScript, con el código concreto que puedes consultar |
| `Warning:` / `WARNING in` | puede ser preexistente; contrástalo con los archivos que tocaste |
| Resumen de bundles / `budget` | tu cambio infló el tamaño y superó un presupuesto |

Si la salida es larga, no la resumas de memoria: vuelve a leerla y cita el mensaje exacto.

Cuando el linter o el build fallen, aplica la sección [6.7 PARAR y preguntar — nunca corregir por tu cuenta](#67-parar-y-preguntar--nunca-corregir-por-tu-cuenta) tal cual está escrita ahí. Lo único que estos dos pasos añaden es qué llevar a esa pregunta, porque su salida mezcla dos tipos de error:

1. Los que **NO** están relacionados con el bug buscado por el usuario.
2. Los que **SÍ** están relacionados con el bug buscado por el usuario.

Sepáralos revisando el working directory, nunca suponiendo: `git stash` y vuelve a ejecutar el paso que falló —lo que sigue fallando sin tus cambios es del tipo 1—, luego `git stash pop` y ejecútalo otra vez —lo que aparece solo con tus cambios aplicados es del tipo 2—.

Lleva los dos tipos a la pregunta, en listas separadas, cada error con el archivo, la línea y el mensaje exacto de la salida. **Si un tipo no tiene errores, dilo y no inventes ninguno**: "no hay errores ajenos al bug buscado" y "no hay errores relacionados con el bug buscado" son las respuestas que corresponden cuando esa lista está vacía.

Los errores del tipo 1 son trabajo fuera de la corrección autorizada: no los toques salvo que el usuario elija arreglarlos en esa pregunta, ver la sección [8. Reglas](#8-reglas).

### 7.4 Ejecutar el build

El último control: con la instrumentación borrada y el linter ya resuelto, comprueba que el proyecto compila. El script de build es el del entorno que el usuario ya eligió en el paso 2 de la sección [3. Detectar el entorno (nunca asumirlo)](#3-detectar-el-entorno-nunca-asumirlo): aquí no se vuelve a preguntar ni se elige otro.

**1. Busca la carpeta del build que le corresponde a este framework** — la que contiene los archivos compilados. Cada framework escribe en la suya y con su propio nombre: identifica qué framework usa el proyecto por las dependencias del `package.json`, y saca la ruta de su fichero de configuración o de la que el propio build imprime al terminar. **Nunca borres una carpeta que no hayas confirmado que es la del build de ese framework.**

**2. Solo cuando esa carpeta exista, bórrala.** Si no existe, pasa directo al paso 3 sin crear ni tocar nada.

**3. Ahora sí, ejecuta el build:**

```bash
pnpm run <script-de-build>
```

Recorre y clasifica su salida con el apartado [Cómo leer y clasificar la salida](#cómo-leer-y-clasificar-la-salida--aplica-al-linter-y-al-build). Un build puede terminar sin fallar y aun así estar avisando de algo que rompiste: el dev server es más permisivo que el build, así que hay errores de tipos, plantillas o imports que solo aparecen aquí.

## 8. Reglas

- No escribas código de testing de Karma/Jasmine, Vitest, Jest, Cypress ni de otro framework de testing. [Playwright Test sí](referencias/generacion-de-pruebas.md), también cuando lo deduzcas de la petición aunque el usuario no lo pida explícitamente: es la excepción a no modificar código (tabla de la [sección 1](#1-elegir-el-modo--pregúntalo-antes-de-ejecutar-nada)).
- No refactorices, renombres, corrijas ni "mejores" código que no forma parte de la corrección autorizada.
- No alteres el proyecto original —configuración, funcionalidad, maquetación, dependencias ni variables de entorno— por iniciativa propia. Cámbialo solo si el usuario lo pidió explícitamente, o si preguntaste antes y autorizó ese cambio.
- No inventes la causa del bug. Si tras la instrumentación no está claro, reportar:
  - Lo que descartaste
  - Lo que falta por descartar
  - ¿Por que no encontraste el bug?
