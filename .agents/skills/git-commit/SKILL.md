---
name: git-commit
description: Convención obligatoria de git commits (Conventional Commits + Gitmoji, 1 commit = 1 feature). Aplicar siempre antes de cualquier commit.
---

# Flujo de Trabajo
Antes de crear cualquier commit, copiar este checklist y marcarlo a medida que se avanza:

- [ ] 1. Verificar que el usuario pidió explícitamente el commit; si no lo pidió, NO commitear.
- [ ] 2. Revisar los cambios e identificar cuántas features distintas contiene el working directory.
- [ ] 3. Por cada feature: mover al staging area únicamente sus archivos.
- [ ] 4. Elegir `<emoji>` y `<type>` desde la tabla y determinar el `<scope>`.
- [ ] 5. Redactar el encabezado y el `body` como lista de puntos.
- [ ] 6. Obtener el autor desde `git config`.
- [ ] 7. Escribir el mensaje en el archivo temporal, ejecutar `git commit --author ... -F` y eliminar el archivo; si quedan features, volver al paso 3.
- [ ] 8. Mostrar el resultado de cada commit creado.

# Cuándo Hacer un Commit
* Únicamente cuando el usuario lo pida explícitamente en su mensaje. PROHIBIDO commitear de forma autónoma al terminar una tarea, fase, proceso, paso o modificación de código, aunque el trabajo haya concluido.

* Si el usuario pide `git push` o cualquier frase equivalente que implique subir cambios: primero crear el/los commit(s) con esta skill y luego hacer el `git push`.

* Al pedirs un commit, está PROHIBIDO realizar cualquier modificación. Si detectas un problema, informarlo y esperar autorización explícita del usuario; nunca hacer cambios por iniciativa propia ni asumir autorización sin preguntar.

# Formato del Mensaje de Commit
Encabezado `<emoji> <type>(<scope>): <mensaje en español>`, línea en blanco y `body`. Todo es obligatorio salvo `<scope>`:
* `<emoji>`: de la tabla, siempre al inicio.

* `<type>`: de la tabla, en inglés.

* `<scope>`: opcional
  * Antes de omitirlo, intentar determinarlo revisando los archivos modificados, rutas, carpetas y módulos o features afectados, y validar que represente realmente el cambio.

  * Usarlo solo si el área modificada se identifica de forma clara y directa; si genera duda o no hay información suficiente, omitirlo. No inventarlo por suposiciones ni invertir demasiado tiempo en uno ambiguo.

* `<mensaje en español>` (`subject`): resumen conciso de lo que se hizo, en español.

* `body`: lista de puntos en español (no párrafo) con los cambios realizados. Nunca idéntico al `subject`: este resume y el `body` detalla punto por punto los cambios concretos, aunque el cambio sea muy pequeño.

```
✨ feat(auth): agregar validación de token JWT

- Validar la firma y la expiración del token JWT antes de permitir el acceso.
- Rechazar las peticiones con un token ausente o inválido.
- Agregar mensajes de error específicos para cada caso de validación.
```

# Emojis por Tipo de Commit
| Tipo de commit | Emoji | Definición |
| --- | --- | --- |
| feat | ✨ | Nueva funcionalidad o capacidad del sistema |
| fix | 🐛 | Corrección de un bug que NO es urgente. El push del cambio se realiza a ramas DIFERENTES de `main`, `hotfix` y `develop` (development) |
| hotfix | 🚑 | Corrección urgente de un bug crítico. El push del cambio se realiza directamente a las ramas `main`, `hotfix` y `develop` (development) |
| docs | 📝 | Cambios únicamente en documentación: archivos Markdown, carpeta docs, guías, manuales y contenido informativo |
| style | 💄 | Cambios visuales, estilos (CSS, Sass, Tailwind), maquetación, UI/UX, responsive, textos visibles, animaciones, transiciones sin modificar lógica del negocio |
| refactor | ♻️ | Reestructuración del código existente sin cambiar su comportamiento. No incluye eliminar archivos, carpetas o código completo |
| remove | ⚰️ | Eliminación definitiva de archivos, carpetas o código que ya no son necesarios |
| perf | ⚡ | Mejoras de rendimiento o eficiencia |
| test | 🧪 | Creación o modificación de pruebas de software (unitarias, de integración, e2e, etc.) |
| mock | 🤡 | datos quemados (hardcoded) en variables, estados u otras estructuras, utilizados para simular información real en pruebas o desarrollo |
| build | 📦 | Cambios relacionados con build, compilación o empaquetado |
| ci | 👷 | Cambios en integración continua o automatización de pipelines |
| chore | 🔧 | Cualquier cambio que no afecte la funcionalidad del proyecto y no corresponda a ningún otro tipo de esta tabla: tareas de mantenimiento general, configuración del entorno o de herramientas (distintas de ESLint/Prettier), scripts, comentarios de código, archivos auxiliares, .gitignore |
| lint | 🎨 | formateo de código y reglas de ESLint/Prettier: indentación, estilo de código, análisis estático y configuración de estas herramientas, sin modificar la lógica ni el comportamiento |
| revert | ⏪ | Reversión de cambios, versiones o despliegues anteriores |
| deps | ⬆️ | Cambios relacionados con dependencias: agregar, actualizar o eliminar paquetes del proyecto |
| docker | 🐳 | Cambios relacionados con Docker, Kubernetes y contenedores |
| wip | 🚧 | Trabajo en progreso no finalizado |
| init | 🎉 | Inicialización del proyecto o configuración inicial |
| merge | 🔀 | Integración de ramas, combinación de cambios y resolución de conflictos de Git |
| i18n | 🌐 | Internacionalización del software (traducciones) |
| accessibility | ♿ | Mejoras de accesibilidad |

* Esta tabla es la única fuente de verdad: tomar el tipo y el emoji exclusivamente de sus filas, con prioridad absoluta. Conventional Commits y Gitmoji quedan estrictamente limitados a ella.

* Si el cambio no coincide exactamente con ninguna fila: nunca omitir el emoji ni crear un tipo o emoji nuevo; priorizar la coherencia semántica y usar el tipo y el emoji existentes que mejor representen la intención del cambio.

# Granularidad: 1 Commit = 1 Feature
Cada commit representa exactamente una feature, corrección o cambio atómico; PROHIBIDO agrupar varias features en un commit. Es posible que un mismo archivo contenga mas de una feature. Con una sola feature en el working directory, agregar todos sus cambios al staging area y crear un único commit; con N features, crear N commits, agregando en cada uno solo los archivos de esa feature.

**Feature:** unidad de cambio con intención semántica propia (nueva funcionalidad, corrección de bug, cambio de estilo, actualización de documentación, etc.). La intención semántica es el único criterio para agrupar: compartir `<type>` y `<scope>` NO basta (dos `fix` no relacionados en el mismo módulo van en dos commits).

# Autoría del Commit
El autor es siempre el usuario configurado en git en esta máquina, nunca un modelo de IA (sin importar el proveedor). PROHIBIDO commitear sin `--author "<nombre> <correo>"` construido con la salida literal de `git config user.name` y `git config user.email`, sin interpolación ni sustitución de comandos del shell (`$()`, `` `n ``, backticks, etc.): cada shell la interpreta distinto y una interpolación fallida puede colar texto sobrante en el autor.

Los `< >` que rodean el correo son caracteres literales (git exige `Nombre <correo>`), no notación de placeholder: `--author "JuanPerez <juan.perez@example.com>"`. PROHIBIDO omitirlos: sin ellos, git trata el texto como un patrón para buscar un autor existente y, si no hay coincidencia, falla con `fatal: --author '...' is not 'Name <email>' and matches no existing author` (bug real).

PROHIBIDO incluir autoría o coautoría de un modelo de IA (Claude, GPT, Gemini u otro proveedor de IA) en `--author` o en cualquier línea del mensaje, ya sea como `Co-Authored-By` (p. ej. `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`).

# Cómo Ejecutar el Commit
Pasar el mensaje multilínea como argumento en la línea de comandos cuela caracteres sobrantes en él. Único método permitido, desde la raíz del repositorio (las rutas son relativas a ella):

1. Escribir el mensaje completo (encabezado + línea en blanco + `body`) en `.agents/skills/git-commit/COMMIT_MSG_TEMP.md` con la herramienta `Write`, NUNCA con el shell (`echo`, `printf`, `Set-Content`, `Out-File`, `>`), en UTF-8 sin BOM para que el emoji se registre correctamente.

2. `git commit --author "<nombre> <correo>" -F .agents/skills/git-commit/COMMIT_MSG_TEMP.md`

3. Eliminar el archivo inmediatamente: `rm -f .agents/skills/git-commit/COMMIT_MSG_TEMP.md` (PowerShell: `Remove-Item -Force .agents/skills/git-commit/COMMIT_MSG_TEMP.md`).

4. Por cada feature adicional, repetir desde el paso 1.

Motivos: `Write` guarda el texto tal cual, sin pasar por el shell. El archivo vive junto a esta skill (al lado de las reglas que lo generan, fácil de encontrar), pero, a diferencia de `.git`, forma parte del working directory: mientras existe aparece como untracked y puede colarse en un commit o reutilizarse por error con el mensaje obsoleto de otra feature. Por eso se elimina tras cada commit y cada commit escribe su mensaje desde cero.

# Esta PROHIBIDO lo siguiente:
* Pasar un mensaje multilínea con `-m`, construirlo concatenando `\n`, `` `n `` o varios `-m`, o usar here-strings de PowerShell (`@'...'@`) o heredocs POSIX (`<<'EOF' ... EOF`): la sintaxis del shell equivocado no da error, se inserta como texto literal en el mensaje (bug real: `git commit -m @'...'@` en Bash creó un commit que empezaba con `@`).

* Ejecutar `git commit` sin `-F`, ni siquiera con un mensaje de una sola línea (el `body` es obligatorio).

* Dejar `COMMIT_MSG_TEMP.md` sin eliminar, reutilizarlo de un commit anterior o agregarlo al staging area o a un commit. Por eso, PROHIBIDO `git add .`, `git add -A` o `git add --all` mientras exista: agregar los archivos de la feature nombrándolos uno por uno.

* Ejecutar `git push --force`, `git reset --hard`, `git branch -D`, `git stash drop`, `git stash clear`

# Mostrar el Commit
Tras crear cada commit, mostrar en la respuesta su encabezado (`<emoji> <type>(<scope>): <mensaje en español>`) y su `body`.
