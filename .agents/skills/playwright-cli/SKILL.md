---
name: playwright-cli
description: 'Automatiza flujos y depura bugs de la interfaz ejecutando la app real en un navegador visible con playwright-cli. Úsala cuando el usuario diga que algo de la interfaz no funciona, no carga, no guarda, da error o se ve mal, o pida reproducir, verificar o automatizar un flujo de la app, o revisar visualmente un cambio de maquetación.'
---

# Depuración y automatización de frontend con `playwright-cli`
Verifica el comportamiento ejecutando el frontend en el navegador.

Leer el código permite **deducir qué debería suceder**; ejecutar la app con `playwright-cli` y hacer peticiones HTTP con el comando `curl` muestra lo que **sucede realmente** en el frontend.

## Cómo leer esta skill
1. Este archivo dice qué hacer y en qué orden. La sintaxis de los comandos está en el catálogo [automatizacion-del-navegador.md](automatizacion-del-navegador.md).

2. Lee el catálogo completo antes del primer comando de la sesión y vuelve a él cada vez que necesites la sintaxis o las flags de un comando. Sus comandos son ejemplos, no una lista cerrada: si ninguno sirve, busca otro en la ayuda de playwright-cli.

3. La tabla [Tareas específicas](automatizacion-del-navegador.md#tareas-específicas), al final del catálogo, es el índice de [`referencias/`](referencias/): abre solo la guía cuya columna «¿Cuándo leerlo?» coincida con la tarea.

## 1. Elegir el modo
Pregunta el modo antes de ejecutar nada, siempre (aunque el usuario ya lo haya dicho) y sin recomendar ninguno. Describe cada opción: AUTOMATIZAR ejecuta el flujo y reporta el estado final, sin tocar el código ni diagnosticar; DEPURAR reproduce, observa, instrumenta si hace falta y para a preguntar antes de corregir.

| | Modo AUTOMATIZAR | Modo DEPURAR |
|---|---|---|
| ¿Para qué sirve? | ejecutar o automatizar un flujo de la app | verificar el funcionamiento del frontend, encontrar la causa y solucionar bugs |
| Ejemplo de uso | Llenar un formulario muchas veces | La pagina web no es responsive, corrigela |
| ¿Modifica código fuente? | no | sí |
| Usando `playwright-cli` y `curl`, cuando el frontend hace peticiones HTTP, determina si el bug está en frontend o backend | no | sí |
| ¿Abre el navegador y usa comandos de `playwright-cli`? | sí | sí |
| ¿Ejecuta linters?, por ejemplo ESLint | no | sí, pero solo si hay linters configurados |
| ¿Escribe código de testing (Jest, Vitest, etc.)? | no | sí, pero solo si el proyecto ya tiene tests y en dos casos: al modificar una funcionalidad que ya tenía tests escritos o cuando el usuario lo pide explícitamente |
| ¿Ejecuta tests? | no | sí, pero solo si el proyecto tiene tests |
| ¿Genera el build de la aplicación? | no | sí |
| ¿Pide usuario y contraseña para hacer login? | solo si el flujo exige sesión | solo si el flujo exige sesión |
| ¿Usa un subagente revisor de solo lectura para verificar la solución del bug? | no | sí |

DEPURAR modifica el código solo en los siguientes casos:

1. **La instrumentación temporal:** los logs de 5.5, que no cambian el comportamiento, y el `throw` de 5.6. Se aplica sin preguntar y siempre se borra antes de terminar el turno.

2. **La corrección autorizada (5.7):** incluye tests solo si el proyecto ya tiene tests y en dos casos: al modificar una funcionalidad que ya tenía tests escritos o cuando el usuario lo pide explícitamente.

Los bugs que encuentres de paso se reportan, no se corrigen. La única excepción son los errores del linter, los tests o el build que el usuario elija en 5.13.

## 2. Preparar el entorno
1. Deduce si el proyecto usa npm o pnpm por su lockfile y por el campo `packageManager` del `package.json`. Si se contradicen, no hay ninguno o es otro gestor, pregunta.

2. Pregunta qué script se ejecuta: una opción por cada script del `package.json` que levante la app, con su nombre exacto, y en la descripción su configuración, su puerto, el backend al que apunta y si compila el código o sirve un build ya generado, deducidos de lo que ejecuta (nunca de su nombre). Añade «Otra — la indico yo». Pregunta aunque haya un solo candidato.

3. Al empezar DEPURAR, o al pasar a DEPURAR desde AUTOMATIZAR, pregunta también qué script de build se ejecuta, con las mismas reglas. Si no hay ninguno, ofrece «Otra — indico yo el comando» y «Omitir el build».

4. Si el puerto está ocupado, mata el proceso y su árbol hasta liberarlo. Nunca lo reutilices.

5. Arranca tú el script elegido en segundo plano (nunca le pidas al usuario que lo arranque) y guarda su identificador. En DEPURAR, si el script sirve un build ya generado, regenera antes el build con el script del paso 3 (si se omitió, avisa de que el build puede no corresponder al código). Espera a que acepte conexiones, sin esperas fijas, y lee su salida para confirmar el puerto real y que compiló. Si falla, reporta el error exacto y detente; pero si el fallo lo causa tu propio cambio (instrumentación de 5.5, `throw` de 5.6 o corrección de 5.8), corrígelo en vez de detenerte (en 5.8 cuenta como «no pasa»).

6. Abre siempre el navegador en modo visible (`--headed`) en ese puerto.

7. Tras cada cambio en el código, haz que llegue a la app antes de recargar y repetir el flujo: si el dev server recompila solo, espera a que su salida lo confirme; si no (incluido un script que sirve un build ya generado), reinícialo con los pasos 4 y 5.

## 3. Login (solo si el flujo exige sesión)
1. Abre el punto de inicio del flujo. Pide usuario y contraseña solo si la app redirige a un login, muestra un formulario de acceso o el flujo es el propio login.

2. Nunca inventes ni deduzcas las credenciales (del código, seeds, archivos de entorno, tests, documentación ni el valor por defecto del formulario) ni ofrezcas valores adivinados como opción. Úsalas tal cual las escribió el usuario y nunca las muestres en reportes, logs ni `eval`; la única excepción es el prompt del subagente revisor (5.14), que tampoco las muestra. Si el usuario cancela, sigue en la sección 6 y dilo.

3. Haz el login por la interfaz: la ruta del login sale de la app (no la asumas) y los refs, del snapshot. No lo repitas: la sesión queda abierta. Si rearrancas, reutiliza las credenciales ya dadas.

4. Nunca falsifiques la sesión: nada de inyectar tokens, escribir cookies o storage, ni saltarte o editar la protección de rutas.

5. El login falla si, tras enviarlo, el snapshot sigue en la pantalla de login, muestra un mensaje de error o no aparece la app autenticada. Entonces reporta la ruta, el snapshot y el mensaje de error (con la contraseña redactada) y para. Si estás en DEPURAR y el login era el flujo investigado, ese fallo es el bug: sigue en el paso 5.1. Si no, pregunta cómo seguir.

## 4. Modo AUTOMATIZAR
1. Toma un snapshot para obtener los refs.

2. Ejecuta el flujo completo. Repite el snapshot tras cada navegación o cambio grande del DOM.

3. Lee el estado final del último snapshot y sigue en la sección 6.

No diagnostiques; toma una captura solo si el usuario la pide. Si el flujo se rompe, no lo investigues ni lo corrijas: reporta en qué paso se rompió y qué esperabas, y pregunta si quiere pasar a DEPURAR. Si acepta, sigue en el paso 3 de la sección 2 (la pregunta del build); si el script sirve un build ya generado, reinícialo con los pasos 4 y 5; después sigue en el paso 5.1.

## 5. Modo DEPURAR
- **5.1 Reproducir.** Antes de tocar nada, revisa el estado del repositorio: si ya hay cambios, avisa al usuario y anótalos (los usan 5.9, 5.13 y 5.14). Después ejecuta el flujo hasta el fallo. Si no se reproduce, pide los pasos exactos.

- **5.2 Observar desde fuera.** Revisa la consola (`console`: errores y mensajes), las peticiones de red (`requests`: URL, método, status y headers; los cuerpos se piden aparte; si el detalle es muy grande, pide solo la parte que necesitas; los recursos estáticos, solo si sospechas de uno), el DOM o el estado (`eval`) y un `screenshot` si el bug es visual. Instrumenta solo si esto no basta.

  | Status | Dónde mirar primero |
  |---|---|
  | 404 | la URL que armó el frontend: la URL base del backend al que apunta el script (paso 2 de la sección 2), el prefijo o la versión de la ruta, un parámetro vacío (`/users/undefined`) o, si la petición va al puerto del dev server, su proxy |
  | 400 / 422 | el cuerpo que envió el frontend: sigue el campo que nombra el mensaje de error desde el formulario hasta el cuerpo (nombre, tipo, formato o ausencia) y por qué la validación del formulario no lo detuvo |
  | 401 / 403 | los headers de autenticación de la petición: si falta el token o la cookie, el código que los añade; si caducó, la renovación de la sesión; en 403, si la UI debería ocultar esa acción al rol del usuario |
  | 5xx | si el proxy del dev server no alcanzó el backend (lo dice su salida, paso 5 de la sección 2), sigue la fila «sin respuesta»; si no, el error es del backend: confírmalo con 5.3 |
  | 2xx con datos incorrectos | compara el cuerpo de la respuesta con lo que muestra la UI: si llega bien, el mapeo, el estado o el renderizado; si llega mal, los parámetros que envió el frontend y después 5.3; si llega HTML en vez de JSON, la petición no llegó al backend: la URL base o el proxy |
  | sin respuesta: conexión rechazada, timeout, CORS o cancelada | la consola: un error de CORS o de cookies es el hallazgo (5.3); si la canceló el propio frontend, el código que la aborta; si no, la URL base del backend al que apunta el script (paso 2 de la sección 2) o el backend caído (sección 7) |

  El status también puede ser erróneo: por ejemplo, un 201 sin que se haya creado el recurso.

- **5.3 Aislar frontend vs backend** (si el fallo involucra una API):
  1. Inspecciona la petición real con playwright-cli y repítela desde la terminal con el comando `curl`: primero idéntica (método, cuerpo y headers de autenticación) y, cuando apliquen, con datos inválidos (400/422) y sin token (401/403). Si la petición escribe datos, repetirla requiere autorización previa.

  2. `curl` responde mal → bug del backend: deja de instrumentar el frontend, repórtalo y sigue en la sección 6.

  3. `curl` responde bien y la app falla → revisa primero en la consola errores de CORS o de cookies: si los hay, ese es el hallazgo y va con su evidencia a la pregunta de 5.7; si no los hay, el bug es del frontend.

  4. Si la API no responde, aplica la regla del backend caído (sección 7).

- **5.4 Inspeccionar `node_modules` (opcional).** Solo si el bug apunta a una dependencia: lee únicamente los archivos de esa dependencia (sus tipos o su implementación). Nunca leas `node_modules` completo ni lo modifiques. Si el diagnóstico apunta a la librería, llévalo a la pregunta de 5.7.

- **5.5 Instrumentar con `console.log` temporal — BUCLE DE INSTRUMENTACIÓN: puntos 2 hasta 3.**
  1. Formato: `console.log('[ruta/relativa/al/archivo.extension] [función o método]:', valor); // DBG-<id>`, con un `<id>` de 4 caracteres, el mismo en toda la sesión. Desenvuelve los valores reactivos antes de loguearlos.

  2. Dónde poner los logs — por niveles, solo en el camino sospechoso:
     - **Nivel 1**: entrada y retorno de la función sospechosa; antes y después de cada llamada HTTP; el error completo dentro de cada `catch`; el handler del evento que inicia el flujo.
     - **Nivel 2** (si el 1 no basta): el estado tras cada mutación, cada validación con su input, la rama tomada en los condicionales, el ciclo de vida con sus dependencias, las entradas y salidas del componente y los parámetros de ruta y de query.
     - **Nivel 3**: en bucles, la colección antes y después, o solo las iteraciones que cumplen una condición.
     - **Nunca**: dentro del render o la plantilla, en valores derivados que se recalculan en cada render, ni en eventos de alta frecuencia sin filtro.

  3. Tras cada tanda, haz que el cambio llegue a la app (paso 7 de la sección 2), recarga, repite el flujo y lee la consola. Si el fallo no queda localizado, ajusta los logs y vuelve al punto 2 mientras queden niveles por probar.

  4. **Salida del bucle**: el fallo queda localizado con evidencia → sigue en el paso 5.6 si necesitas probar una rama de error; si no, en el 5.7. Si agotaste los niveles sin localizarlo → sigue en el paso 5.7, que reporta sin inventar la causa.

- **5.6 Forzar la rama de error.** Fuerza el fallo desde la red: una respuesta simulada con status de error (sin él, responde 200) o una caída de red; al terminar, quita la simulación y restaura la red. Usa un `throw` en el código solo si no se puede desde fuera, únicamente en el `catch` investigado y marcado con `DBG-<id>`.

- **5.7 PARAR y preguntar — nunca corregir por tu cuenta — BUCLE DE DIAGNÓSTICO: pasos 5.2 hasta 5.7.** Si aún no tienes evidencia (el log, el status o el error que lo prueba), no preguntes: vuelve al paso 5.2 y repite 5.2 hasta 5.7. **Salida del bucle**: con evidencia, haz la pregunta; si agotaste los niveles de 5.5 sin evidencia, no inventes la causa: reporta lo que descartaste, lo que falta por descartar y por qué no la encontraste, y sigue en la sección 6. La pregunta muestra el bug (archivo, línea, causa raíz y evidencia), al menos 2 soluciones con su consecuencia, una recomendada con su motivo y «Otra — la describo yo». Si el usuario autoriza una, sigue en el paso 5.8; si no autoriza ninguna, ve al paso 5.9 y después a la sección 6.

- **5.8 Corregir y verificar — BUCLE DE VERIFICACIÓN: paso 5.8.** Aplica solo lo autorizado y después haz que el cambio llegue a la app: si vienes de un bucle con los procesos cerrados, rearráncalos desde el paso 4 de la sección 2, con el mismo entorno, y repite el login con las mismas credenciales si hace falta; si siguen vivos, aplica el paso 7 de la sección 2. Repite el flujo completo: consola sin errores, peticiones con el status esperado y captura final. Si no pasa (también si la app no compila o no arranca con la corrección) y el arreglo cabe en lo autorizado, ajústalo y repite este paso; si exige salir de lo autorizado, vuelve al paso 5.7 con la nueva evidencia. **Salida del bucle**: el flujo pasa → sigue en el paso 5.9.

- **5.9 Borrar la instrumentación y cerrar los procesos.** Borra cada línea `DBG-<id>` y cada `throw` temporal. En el diff solo deben quedar la corrección autorizada, los cambios previos del usuario (5.1) y lo que añada la excepción de Playwright (sección 7). Después cierra los procesos (pasos 2 y 3 de la sección 6): el linter, los tests y el build se ejecutan sin la app.

- **5.10 Ejecutar el linter.** Solo si hay script de lint y archivo de configuración para un linter. Ejecútalo sin autocorrección: si el script autocorrige, ejecuta el mismo linter sobre los mismos archivos sin esa opción. Si falta el script o la configuración, omítelo y menciónalo en el reporte. Nunca instales ni configures linter.

- **5.11 Ejecutar los tests.** Solo si hay script de test y archivos de test reales. Ejecuta los unitarios en una sola pasada, sin watch ni interfaz; los e2e, solo con autorización. Nunca crees tests para tener algo que ejecutar.

- **5.12 Ejecutar el build.** Usa el script elegido en el paso 3 de la sección 2; si el usuario eligió «Omitir el build», sáltalo y menciónalo en el reporte. Antes, borra su carpeta de salida solo si confirmaste que es la de ese build.

- **5.13 Separar los errores y preguntar — BUCLE DE CORRECCIÓN: pasos 5.8 hasta 5.13.**
  1. Lee la salida completa de 5.10–5.12, no solo el código de salida, incluidos los warnings (un build puede terminar sin fallar y aun así avisar de algo que rompiste), y cita los mensajes exactos.

  2. **Salida del bucle**: si los pasos que se ejecutaron no dieron errores ni warnings, si solo quedan los que el usuario ya decidió no corregir, o si en el punto 4 decide no corregir → sigue en el paso 5.14.

  3. Aparta temporalmente solo tus cambios de la corrección (incluidos los archivos nuevos; en un archivo que ya tenía cambios del usuario, solo los tuyos) y repite cada paso que dio errores o warnings: lo que sigue apareciendo no pertenece al bug; lo que desaparece, sí. Después vuelve a aplicar tus cambios y ejecuta esos pasos otra vez, para que su resultado y la carpeta del build correspondan al código con la corrección. No toques los cambios previos del usuario (5.1).

  4. PARA y pregunta con el formato de 5.7, con dos listas (errores que pertenecen al bug y errores que no), cada error con archivo, línea y mensaje. Si una lista está vacía, dilo, y no repitas los que el usuario ya decidió no corregir. Los errores que no pertenecen al bug solo se corrigen si el usuario los elige explícitamente.

  5. Si el usuario autoriza corregir: vuelve al paso 5.8, corrige solo lo autorizado y repite 5.8 hasta 5.13.
- **5.14 Verificar con un subagente revisor — BUCLE DE REVISIÓN: pasos 5.8 hasta 5.14.**
  1. Lanza con un prompt un subagente nuevo de solo lectura: no edita ningún archivo; lee, ejecuta `git status` y `git diff`, y verifica la app con `playwright-cli` y, si el flujo hace peticiones HTTP, también con `curl`. Espera su veredicto.

  2. Pásale hechos, no conclusiones: el requisito del usuario (lo que pidió verificar en modo DEPURAR: comportamiento esperado, fallo observado y pasos para reproducirlo), la evidencia observada, el alcance autorizado (incluido lo que añada la excepción de Playwright de la sección 7), los archivos que ya tenían cambios (5.1), la salida del linter, los tests y el build (5.10–5.12) con los errores que el usuario decidió no corregir en 5.13, los hallazgos que ya descartó, el script que levanta la app con su puerto y, si el flujo exige sesión, el usuario y la contraseña tal cual los escribió el usuario. No le pases tu diagnóstico.

  3. El revisor comprueba que el diff soluciona el bug y cumple el requisito del usuario, que no introduce bugs nuevos, que no cambia nada fuera del alcance y que no deja instrumentación. Para verificarlo en la app:
     - Arranca el script con los pasos 4 a 6 de la sección 2, en su propia sesión del navegador (`playwright-cli -s=revisor open --headed http://<hostname>:<puerto>`, y `-s=revisor` en cada comando posterior), y hace el login por la interfaz si el flujo exige sesión (sección 3).
     - Repite el flujo del requisito (consola sin errores, peticiones con el status esperado y captura final) y prueba casos límite y flujos vecinos que toque el diff: datos inválidos, ramas de error forzadas desde la red (5.6) y otras pantallas que usan los archivos modificados.
     - Si el flujo hace peticiones HTTP, también usa `curl`.
     - Antes de cada petición con un método que muta (POST, PUT, PATCH, DELETE), pregunta directamente al usuario según la sección 7: si el usuario la autoriza, la ejecuta; si no, la marca como «no probada» y sigue con la siguiente.
     - Antes de responder, cierra su navegador, detiene el script y verifica que el puerto ya no responde (pasos 2 y 3 de la sección 6).

     No opina de estilo. Responde «sin hallazgos» o una lista con archivo, línea y evidencia; si el hallazgo sale de la app, la evidencia es el mensaje de consola, la petición, la respuesta de `curl` o la captura. Reporta como «no probadas» las peticiones mutables que el usuario no autorizó.

  4. **Salida del bucle**: si el revisor responde «sin hallazgos», o si en el punto 6 el usuario decide no corregir → sigue en la sección 6.

  5. No asumas que un hallazgo del revisor es correcto: verifícalo primero y confírmalo o refútalo con evidencia. Solo se corrige lo confirmado.

  6. Antes de iniciar cada iteración, PARA y pregunta al usuario con el formato de 5.7, incluidos los hallazgos refutados con su evidencia (aunque lo estén todos): el usuario tiene la última palabra sobre qué queda confirmado.

  7. Si el usuario autoriza una corrección: vuelve al paso 5.8, corrige únicamente los errores relacionados con el requisito del usuario (incluidos los bugs nuevos, los fallos de alcance y la instrumentación que dejó tu propia corrección; un bug ajeno y previo solo se reporta) y repite 5.8 hasta 5.14, lo que incluye volver a ejecutar el linter, los tests y el build (5.10–5.12).

## 6. Cerrar y reportar
Antes de terminar el turno, por cualquier camino (al acabar, si abandonas, si el arranque falló, si el usuario no autoriza la corrección, si no encuentras la causa o si la pregunta queda como texto final):

1. Si quedó instrumentación, bórrala (5.9).

2. Cierra el navegador (todas sus sesiones) y detén el dev server con su identificador.

3. Verifica que el puerto ya no responde. Si responde, mata el proceso por su PID con su árbol y vuelve a verificar.

4. Reporta. En AUTOMATIZAR: los pasos ejecutados y el estado final. En DEPURAR: la causa, la corrección aplicada, el resultado de la verificación, que la limpieza está verificada y los controles omitidos (linter, tests o build) con su motivo. En ambos modos, lo que añadió la excepción de Playwright (sección 7), si la usaste.

Durante una pregunta interactiva dentro del turno, mantén vivos los procesos. Si el usuario sigue con el mismo bug en otro turno, rearranca desde el paso 4 de la sección 2 con el mismo entorno (desde el paso 3 si pasa a DEPURAR y aún no eligió el build).

## 7. Reglas
- Si la API no responde (backend caído), reporta la petición que falló y pregunta si el usuario levanta el backend y se reintenta, si se simulan las respuestas de la API o si se cancela. Nunca arranques ni detengas el backend.

- No alteres configuración, funcionalidad, maquetación, dependencias ni variables de entorno, ni ejecutes paquetes que el proyecto no declare, por iniciativa propia: solo si el usuario lo pidió o lo autorizó. Excepción: si faltan Playwright Test o playwright-cli, instálalos sin preguntar

- No refactorices, renombres, corrijas ni «mejores» código fuera de la corrección autorizada.

- No inventes la causa del bug. Si no está clara, reporta lo que descartaste, lo que falta por descartar y por qué no encontraste el bug.

- Las operaciones criticas requieren preguntar antes de ejecutar: cada agente, también el subagente revisor, le pregunta directamente al usuario, que abre ese agente para responderle. Esto incluye:
  - Crear, actualizar o borrar datos directamente en la base de datos

  - Leer está permitido: las peticiones con métodos que no mutan (GET, HEAD, OPTIONS) se ejecutan sin preguntar. Antes de cada petición con un método que muta (POST, PUT, PATCH, DELETE), también las del flujo que el usuario pidió, pregunta al usuario mostrando su método, ruta y body (con la contraseña redactada); solo el login de la sección 3 queda exento. Si es un lote de la misma petición (mismo método y ruta) con distintos datos, como un insert masivo, haz una sola pregunta con el método, la ruta, un body de ejemplo y cuántas veces se va a ejecutar.
