---
name: git-commit
description: Convención obligatoria de git commits (Conventional Commits + Gitmoji, 1 commit = 1 feature). Aplicar siempre antes de cualquier commit.
when_to_use: Aplicar en TODOS los git commits sin excepción. Triggers — "haz un commit", "hacer commit", "commitear", "crea un commit", "nuevo commit", "git commit", "git push", "registra los cambios", "guarda en git", "commit los cambios", "sube los cambios a git".
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git add:*), Bash(git apply:*), Bash(git commit:*), Write(.claude/skills/git-commit/COMMIT_MSG_TEMP.txt), Bash(rm -f .claude/skills/git-commit/COMMIT_MSG_TEMP.txt), Read(.claude/skills/git-commit/FEATURE.patch), Edit(.claude/skills/git-commit/FEATURE.patch), Bash(rm -f .claude/skills/git-commit/FEATURE.patch)
---

# `git commit`

## Flujo de Trabajo
Antes de crear cualquier commit, copiar este checklist y marcarlo a medida que se avanza:

- [ ] 1. Verificar que el usuario pidió explícitamente el commit; si no lo pidió, NO commitear.
- [ ] 2. Revisar los cambios e identificar cuántas features distintas contiene el working directory (ver [Granularidad de Commits: 1 Commit = 1 Feature](#granularidad-de-commits-1-commit--1-feature)).
- [ ] 3. Por cada feature: mover al staging area únicamente sus cambios. Los archivos que le pertenecen enteros se agregan con `git add <archivo>`; los que comparte con otra feature se reparten por hunks (ver [Varias Features en un Mismo Archivo](#varias-features-en-un-mismo-archivo)).
- [ ] 4. Elegir `<emoji>` y `<type>` desde la tabla y determinar el `<scope>`.
- [ ] 5. Redactar el encabezado y el `body` como lista de puntos.
- [ ] 6. Escribir el mensaje en un archivo, ejecutar el commit con `git commit -F` y eliminar el archivo temporal (ver [Cómo Ejecutar el Commit](#cómo-ejecutar-el-commit)); si quedan más features, volver al paso 3.
- [ ] 7. Mostrar el resultado de cada commit creado (ver [Mostrar el Commit Después de Realizarlo](#mostrar-el-commit-después-de-realizarlo)).

## Cuándo Hacer un Commit
Está PROHIBIDO hacer un commit de forma autónoma al terminar una tarea, fase, proceso, paso o modificación de código. El único motivo válido para ejecutar un commit es que el usuario lo solicite explícitamente en su mensaje. Si el usuario no pidió un commit, no hacerlo bajo ninguna circunstancia, aunque el trabajo haya concluido.

Si el prompt del usuario es "git push" o cualquier otra frase equivalente que implique subir cambios (ver los triggers de `when_to_use`), primero ejecutar este skill para crear el/los commit(s) correspondientes y, una vez creados, proceder con el `git push`.

## Formato del Mensaje de Commit
`<emoji>` `<type>`(`<scope>`): `<mensaje en español>`

El `<emoji>` siempre va al inicio, antes del `<type>`. A continuación del encabezado, escribir siempre el `body` como una lista de puntos con los cambios realizados.

Elementos obligatorios en todo commit:
* `<emoji>`: tomado de la tabla.

* `<type>`: tomado de la tabla y escrito en inglés.

* El único elemento opcional es `<scope>`, regido por la sección [Reglas para el Scope](#reglas-para-el-scope).

* `<mensaje en español>`: resumen conciso de lo que se hizo (`subject`), redactado en español.

* `body`: explicación descriptiva de los cambios realizados, redactada en español como una lista de puntos, no como un párrafo. Es obligatorio en todo commit.

* El `body` nunca debe ser idéntico al `<mensaje en español>`. El `<mensaje en español>` resume el cambio, mientras que el `body` lo detalla punto por punto. Aunque el cambio sea muy pequeño y ambos puedan parecer similares, desarrollar el `body` con los puntos concretos del cambio en lugar de repetir el `<mensaje en español>`.

## Fuente Única de Verdad para los Commits
* La tabla de la sección [Emojis por Tipo de Commit](#emojis-por-tipo-de-commit) es la única fuente de verdad para construir cualquier commit. El tipo y el emoji deben seleccionarse exclusivamente desde sus filas.

* Antes de crear un commit, dar prioridad absoluta a la tabla: tomar siempre el tipo y el emoji desde ella.

* El uso de Conventional Commits y Gitmoji está estrictamente limitado a la tabla. Está prohibido usar tipos, emojis o definiciones que no aparezcan en ella.

* Está prohibido inventar nuevos tipos de commit, nuevos emojis o nuevas definiciones de commit.

* Si los cambios no encajan exactamente con ninguna fila de la tabla, está prohibido crear un tipo o un emoji nuevo. En ese caso, utilizar el tipo y el emoji existentes que más se aproximen a la intención real del cambio.

* Está prohibido eliminar, agregar, editar o alterar la tabla de la sección [Emojis por Tipo de Commit](#emojis-por-tipo-de-commit).

## Emojis por Tipo de Commit

| Tipo de commit | Emoji | Definición                                                                                                                                                                                                                                                                                           |
| ------------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| feat          | ✨ | Nueva funcionalidad o capacidad del sistema                                                                                                                                                                                                                                                              |
| fix           | 🐛 | Corrección de un bug que NO es urgente. El push del cambio se realiza a ramas DIFERENTES de `main`, `hotfix` y `develop` (development)                                                                                                                                                                   |
| hotfix        | 🚑 | Corrección urgente de un bug crítico. El push del cambio se realiza directamente a las ramas `main`, `hotfix` y `develop` (development)                                                                                                                                                                  |
| docs          | 📝 | Cambios únicamente en documentación: archivos Markdown, README.md, CLAUDE.md, carpeta docs, guías, manuales y contenido informativo                                                                                                                                                                      |
| style         | 💄 | Cambios visuales, estilos (CSS, Sass, Tailwind), maquetación, UI/UX, responsive, textos visibles, animaciones, transiciones sin modificar lógica del negocio                                                                                                                                             |
| refactor      | ♻️ | Reestructuración del código existente sin cambiar su comportamiento. No incluye eliminar archivos, carpetas o código completo (ver `remove`)                                                                                                                                                             |
| remove        | ⚰️ | Eliminación definitiva de archivos, carpetas o código que ya no son necesarios                                                                                                                                                                                                                           |
| perf          | ⚡ | Mejoras de rendimiento o eficiencia                                                                                                                                                                                                                                                                      |
| test          | 🧪 | Creación o modificación de pruebas de software (unitarias, de integración, etc.)                                                                                                                                                                                                                         |
| mock          | 🤡 | ÚNICAMENTE datos quemados (hardcoded) en variables, estados u otras estructuras, utilizados para simular información real en pruebas o desarrollo                                                                                                                                                        |
| build         | 📦 | Cambios relacionados con build, compilación o empaquetado                                                                                                                                                                                                                                                |
| ci            | 👷 | Cambios en integración continua o automatización de pipelines                                                                                                                                                                                                                                            |
| chore         | 🔧 | Cualquier cambio que no afecte la funcionalidad del proyecto y no corresponda a ningún otro tipo de esta tabla: tareas de mantenimiento general, configuración del entorno o de herramientas (distintas de ESLint/Prettier, ver `lint`), scripts, comentarios de código, archivos auxiliares, .gitignore |
| lint          | 🎨 | ÚNICAMENTE formateo de código y reglas de ESLint/Prettier: indentación, estilo de código, análisis estático y configuración de estas herramientas, sin modificar la lógica ni el comportamiento                                                                                                          |
| revert        | ⏪ | Reversión de cambios, versiones o despliegues anteriores                                                                                                                                                                                                                                                 |
| docker        | 🐳 | Cambios relacionados con Docker, Kubernetes y contenedores                                                                                                                                                                                                                                               |
| deps          | ⬆️ | Cambios relacionados con dependencias: agregar, actualizar o eliminar paquetes del proyecto                                                                                                                                                                                                              |
| wip           | 🚧 | Trabajo en progreso no finalizado                                                                                                                                                                                                                                                                        |
| init          | 🎉 | Inicialización del proyecto o configuración inicial                                                                                                                                                                                                                                                      |
| merge         | 🔀 | Integración de ramas, combinación de cambios y resolución de conflictos de Git                                                                                                                                                                                                                           |
| i18n          | 🌐 | Internacionalización o traducciones                                                                                                                                                                                                                                                                      |
| accessibility | ♿ | Mejoras de accesibilidad                                                                                                                                                                                                                                                                                 |

## Reglas para el Scope
* El `<scope>` es opcional.

* Cuando se use, escribir el `<scope>` en inglés.

* Antes de omitirlo, intentar determinarlo revisando los archivos modificados, las rutas, los nombres de carpetas y los módulos o features afectados.

* Usar el `<scope>` únicamente cuando la funcionalidad, el módulo o el área modificada pueda identificarse de forma clara y directa.

* No inventar un `<scope>` basado en suposiciones.

* No invertir demasiado tiempo en deducir un `<scope>` ambiguo.

* Si tras revisar los cambios no hay información suficiente para determinarlo con seguridad, omitir el `<scope>`.

Flujo para determinar el `<scope>`:
1. Revisar los archivos modificados.

2. Identificar la feature, el módulo o el área afectada.

3. Validar que el `<scope>` represente realmente el cambio realizado.

4. Si el `<scope>` es claro, usarlo.

5. Si el `<scope>` genera duda, omitirlo.

## Granularidad de Commits: 1 Commit = 1 Feature
Cada commit debe representar exactamente una feature, corrección o cambio atómico. Está PROHIBIDO agrupar varias features en un solo commit.

Antes de crear cualquier commit, revisar el working directory para identificar cuántas features distintas contiene:

* Si el working directory tiene cambios de **una sola feature**: agregar todos esos cambios al staging area y crear un único commit.

* Si el working directory tiene cambios de **N features distintas**: crear N commits separados, uno por feature. Para cada commit, mover al staging area únicamente los cambios que correspondan a esa feature, ejecutar el commit y luego repetir el proceso con la siguiente feature.

Una "feature" es cualquier unidad de cambio con una intención semántica propia: una nueva funcionalidad, una corrección de bug, un cambio de estilo, una actualización de documentación, etc. La intención semántica es el único criterio válido para agrupar cambios en una misma feature. Que dos cambios compartan el mismo `<type>` y el mismo `<scope>` NO es suficiente para considerarlos la misma feature: por ejemplo, dos correcciones de bugs no relacionados entre sí dentro del mismo módulo comparten `fix` y el mismo `<scope>`, pero son dos features distintas y deben ir en dos commits separados.

Del mismo modo, que dos features convivan dentro del **mismo archivo** tampoco es motivo para unirlas: el archivo se reparte por hunks siguiendo [Varias Features en un Mismo Archivo](#varias-features-en-un-mismo-archivo).

### Varias Features en un Mismo Archivo
Un mismo archivo puede contener cambios de varias features a la vez. `git add <archivo>` mueve el archivo ENTERO al staging area, así que usarlo en ese caso arrastra todas sus features al mismo commit y rompe la regla "1 commit = 1 feature". Para separarlas hay que mover al staging area solo una parte del archivo: sus **hunks**, los bloques que el diff marca con `@@`.

Existe **un único método permitido** para hacerlo:

1. Volcar el diff del archivo a un patch, con redirección del shell. Aquí la redirección es segura porque el contenido lo genera `git`, no se escribe a mano:

```bash
git diff -- <archivo> > .claude/skills/git-commit/FEATURE.patch
```

Si `git` avisa `LF will be replaced by CRLF`, ignorarlo: ese aviso sale por stderr y no entra en el patch.

2. Abrir `FEATURE.patch` con la herramienta de edición de archivos y **borrar los hunks que NO pertenecen a la feature que se va a commitear**. Conservar intactas la cabecera (`diff --git`, `---`, `+++`) y las líneas `@@` de los hunks que se quedan: NO recalcular sus números, porque `git` reubica cada hunk por su contexto.

3. Mover al staging area únicamente esos hunks:

```bash
git apply --cached .claude/skills/git-commit/FEATURE.patch
```

4. Eliminar el patch y revisar el reparto antes de commitear:

```bash
rm -f .claude/skills/git-commit/FEATURE.patch
git diff --cached --stat
git diff --stat
```

`git diff --cached --stat` muestra lo que entra en este commit y `git diff --stat` lo que queda pendiente para las siguientes features.

5. Crear el commit de esa feature siguiendo [Cómo Ejecutar el Commit](#cómo-ejecutar-el-commit).

6. Repetir desde el paso 1 con la siguiente feature. Al llegar a la **última** feature que queda en el archivo ya no hace falta patch: `git add <archivo>` mueve todo el resto, que para entonces es solo esa feature.

Motivo de este método: `git apply --cached` escribe únicamente en el staging area y deja el working directory intacto, así que ninguna versión del archivo se reescribe ni se pierde. Si algún hunk no aplica, el comando falla sin modificar nada y basta con regenerar el patch desde el paso 1.

Motivo de borrar hunks en lugar de transcribirlos: el patch sale de `git diff` ya bien formado, y eliminar los bloques sobrantes no puede introducir un error de copia. Reescribir un hunk a mano sí puede corromperlo.

#### Prohibiciones al Repartir un Archivo por Hunks
* PROHIBIDO `git add -p`, `git add --patch` y `git add -i`: son interactivos, este entorno no los soporta y la ejecución queda colgada esperando una respuesta que nunca llega.

* PROHIBIDO agrupar dos features en un mismo commit alegando que comparten archivo, y PROHIBIDO justificarlo en el `body`. Si el archivo mezcla features, se reparte por hunks.

* PROHIBIDO editar el archivo del proyecto para quitarle temporalmente una feature y volver a escribirla después del commit: eso reescribe el working directory y puede perder cambios. Lo único que se edita es el patch.

* PROHIBIDO dejar `.claude/skills/git-commit/FEATURE.patch` sin eliminar después de aplicarlo, y PROHIBIDO agregarlo al staging area o incluirlo dentro de un commit.

* PROHIBIDO usar `git commit -a` o `git commit --all`, y `git add .`, `git add -A` o `git add --all`, mientras haya un reparto por hunks en curso: se saltan el staging area parcial y arrastran al commit las features que faltaban por separar.

#### Ejemplo de Reparto por Hunks
Un `README.md` con dos features dentro del mismo archivo: la normalización de todos sus títulos y la corrección de dos anclas rotas. Son dos intenciones semánticas distintas (`docs` y `fix`), así que van en dos commits:

1. `git diff -- README.md > .claude/skills/git-commit/FEATURE.patch`

2. Borrar del patch los hunks de los títulos y dejar solo los dos hunks de las anclas rotas.

3. `git apply --cached .claude/skills/git-commit/FEATURE.patch` y después `rm -f .claude/skills/git-commit/FEATURE.patch`.

4. Crear el commit `🐛 fix(readme): corregir las anclas rotas de los enlaces internos`.

5. `git add README.md`, que ahora solo contiene la normalización de títulos, y crear el commit `📝 docs(readme): aplicar mayúsculas iniciales a los títulos`.

## Regla Cuando el Cambio no Coincide Exactamente con la Tabla
* Nunca omitir el emoji.

* Priorizar la coherencia semántica sobre la coincidencia exacta: elegir el tipo y el emoji de la tabla que mejor representen la intención del cambio.

## Ejemplo
El encabezado es el `<emoji> <type>(<scope>): <mensaje en español>` y, debajo, el `body` desarrolla los cambios como lista de puntos.

```
✨ feat(auth): agregar validación de token JWT

- Validar la firma y la expiración del token JWT antes de permitir el acceso.
- Rechazar las peticiones con un token ausente o inválido.
- Agregar mensajes de error específicos para cada caso de validación.
```

En este ejemplo, las líneas que comienzan con `-` son el `body`: detallan punto por punto lo que resume el `<mensaje en español>` "agregar validación de token JWT", sin repetirlo literalmente.

## Cómo Ejecutar el Commit
El mensaje de commit siempre es multilínea (encabezado + línea en blanco + `body`). Pasar ese texto directamente como argumento en la línea de comandos es la causa de que se filtren caracteres sobrantes dentro del mensaje, por eso existe **un único método permitido**:

1. Escribir el mensaje completo (encabezado + línea en blanco + `body`) en el archivo `.claude/skills/git-commit/COMMIT_MSG_TEMP.txt`, usando la herramienta de escritura de archivos (`Write`), NUNCA el shell (`echo`, `printf`, `Set-Content`, `Out-File`, redirecciones `>`). Guardar en UTF-8 sin BOM para que el `<emoji>` se registre correctamente.

2. Ejecutar el commit leyendo el mensaje desde ese archivo:

```bash
git commit -F .claude/skills/git-commit/COMMIT_MSG_TEMP.txt
```

3. Eliminar el archivo temporal inmediatamente después de crear el commit:

```bash
rm -f .claude/skills/git-commit/COMMIT_MSG_TEMP.txt
```

4. Por cada feature adicional, repetir el proceso completo desde el paso 1: escribir de nuevo el archivo con el mensaje de esa feature, ejecutar el commit y volver a eliminar el archivo.

Motivo de este método: la herramienta de escritura de archivos guarda el texto tal cual, sin pasar por el intérprete del shell, por lo que ningún carácter de la sintaxis del shell puede terminar dentro del mensaje.

Motivo de la ubicación del archivo: `COMMIT_MSG_TEMP.txt` vive junto a esta skill, en la misma carpeta que la define, por lo que el mensaje del commit queda al lado de las reglas que lo generan y es fácil de encontrar. La ruta se escribe relativa a la raíz del repositorio, así que los comandos `git commit -F` y `rm` se ejecutan desde esa raíz.

Advertencia sobre esta ubicación: a diferencia de la carpeta `.git`, esta ruta SÍ forma parte del working directory, por lo que el archivo aparece como untracked mientras existe y puede colarse en el commit. Por eso es obligatorio eliminarlo apenas se crea el commit y está prohibido agregarlo al staging area.

Motivo de eliminar el archivo: es un archivo temporal cuya única función es transportar el mensaje hasta `git commit -F`. Si se deja, queda un archivo untracked con un mensaje obsoleto que puede colarse en un commit posterior o reutilizarse por error, aplicándole a una feature el mensaje de otra. Al borrarlo, cada commit obliga a escribir su propio mensaje desde cero.

En PowerShell, el comando equivalente para eliminarlo es `Remove-Item -Force .claude/skills/git-commit/COMMIT_MSG_TEMP.txt`.

### Prohibiciones al Ejecutar el Commit
* PROHIBIDO pasar un mensaje multilínea con `-m`.

* PROHIBIDO usar here-strings de PowerShell (`@'...'@`) o heredocs de shell POSIX (`<<'EOF' ... EOF`) para pasar el mensaje. Cada shell interpreta una sintaxis distinta y la del shell equivocado NO produce un error: se inserta como texto literal dentro del mensaje del commit.

* PROHIBIDO construir el mensaje concatenando `\n`, `` `n `` o varios `-m` seguidos.

* PROHIBIDO ejecutar `git commit` sin `-F`, salvo un `<mensaje en español>` de una sola línea sin `body`, caso que igualmente está prohibido porque el `body` es obligatorio en todo commit.

* PROHIBIDO dejar el archivo `.claude/skills/git-commit/COMMIT_MSG_TEMP.txt` sin eliminar después de crear el commit.

* PROHIBIDO agregar `COMMIT_MSG_TEMP.txt` al staging area o incluirlo dentro de un commit. Por lo mismo, PROHIBIDO usar `git add .`, `git add -A` o `git add --all` mientras el archivo exista: mover al staging area únicamente los cambios de la feature, nombrando uno por uno los archivos que le pertenecen enteros y repartiendo por hunks los que comparte con otra feature (ver [Varias Features en un Mismo Archivo](#varias-features-en-un-mismo-archivo)).

* PROHIBIDO reutilizar el archivo `.claude/skills/git-commit/COMMIT_MSG_TEMP.txt` de un commit anterior: cada commit escribe su propio mensaje en un archivo nuevo.

### Bug Real que Origina Estas Reglas
Ejecutar `git commit -m @'...'@` (here-string de PowerShell) dentro de un shell POSIX/Bash creó un commit cuyo mensaje empezaba con `@`, porque Bash no interpreta `@'` como here-string: lo lee como el carácter literal `@` concatenado con la cadena entre comillas simples. El comando terminó con éxito y el `@` sobrante quedó dentro del historial. Usar `git commit -F` evita por completo esta clase de bug.

## Mostrar el Commit Después de Realizarlo
Cuando se solicite hacer un commit desde un prompt, después de crearlo mostrar en la respuesta el encabezado con el formato `<emoji>` `<type>`(`<scope>`): `<mensaje en español>` y el `body` correspondiente al commit realizado.

## REGLA OBLIGATORIA
Está **TOTALMENTE PROHIBIDO** realizar cualquier modificación cuando te solicite hacer un **commit**.

Si detectas algún problema, **infórmamelo y espera mi autorización explícita para poder modificar**. **Nunca** realices cambios por iniciativa propia ni asumas autorización sin antes preguntarme.
