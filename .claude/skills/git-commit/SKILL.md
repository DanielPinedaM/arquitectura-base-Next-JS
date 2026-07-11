---
name: git-commit
description: Convención obligatoria de git commits (Conventional Commits + Gitmoji, 1 commit = 1 feature). Aplicar siempre antes de cualquier commit.
when_to_use: Aplicar en TODOS los git commits sin excepción. Triggers — "haz un commit", "hacer commit", "commitear", "crea un commit", "nuevo commit", "git commit", "git push", "registra los cambios", "guarda en git", "commit los cambios", "sube los cambios a git".
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git add:*), Bash(git commit:*)
---

# `git commit`

## Flujo de Trabajo
Antes de crear cualquier commit, copiar este checklist y marcarlo a medida que se avanza:

```
- [ ] 1. Verificar que el usuario pidió explícitamente el commit; si no lo pidió, NO commitear.
- [ ] 2. Revisar los cambios e identificar cuántas features distintas contiene el working directory (ver "Granularidad de Commits").
- [ ] 3. Por cada feature: mover al staging area únicamente los archivos que le corresponden.
- [ ] 4. Elegir `<emoji>` y `<type>` desde la tabla y determinar el `<scope>`.
- [ ] 5. Redactar el encabezado y el `body` como lista de puntos.
- [ ] 6. Ejecutar el commit; si quedan más features, volver al paso 3.
- [ ] 7. Mostrar el resultado de cada commit creado (ver "Mostrar el Commit Después de Realizarlo").
```

## Cuándo Hacer un Commit
Está PROHIBIDO hacer un commit de forma autónoma al terminar una tarea, fase, proceso, paso o modificación de código. El único motivo válido para ejecutar un commit es que el usuario lo solicite explícitamente en su mensaje. Si el usuario no pidió un commit, no hacerlo bajo ninguna circunstancia, aunque el trabajo haya concluido.

Si el prompt del usuario es "git push" o cualquier otra frase equivalente que implique subir cambios (ver los triggers de `when_to_use`), primero ejecutar este skill para crear el/los commit(s) correspondientes y, una vez creados, proceder con el `git push`.

## Formato del Mensaje de Commit
`<emoji>` `<type>`(`<scope>`): `<mensaje en español>`

El `<emoji>` siempre va al inicio, antes del `<type>`. A continuación del encabezado, escribir siempre el `body` como una lista de puntos con los cambios realizados.

Elementos obligatorios en todo commit:
* `<emoji>`: tomado de la tabla.

* `<type>`: tomado de la tabla y escrito en inglés.

* El único elemento opcional es `<scope>`, regido por la sección "Reglas para el Scope".

* `<mensaje en español>`: resumen conciso de lo que se hizo (`subject`), redactado en español.

* `body`: explicación descriptiva de los cambios realizados, redactada en español como una lista de puntos, no como un párrafo. Es obligatorio en todo commit.

* El `body` nunca debe ser idéntico al `<mensaje en español>`. El `<mensaje en español>` resume el cambio, mientras que el `body` lo detalla punto por punto. Aunque el cambio sea muy pequeño y ambos puedan parecer similares, desarrollar el `body` con los puntos concretos del cambio en lugar de repetir el `<mensaje en español>`.

## Fuente Única de Verdad para los Commits
* La tabla de la sección "Emojis por Tipo de Commit" es la única fuente de verdad para construir cualquier commit. El tipo y el emoji deben seleccionarse exclusivamente desde sus filas.

* Antes de crear un commit, dar prioridad absoluta a la tabla: tomar siempre el tipo y el emoji desde ella.

* El uso de Conventional Commits y Gitmoji está estrictamente limitado a la tabla. Está prohibido usar tipos, emojis o definiciones que no aparezcan en ella.

* Está prohibido inventar nuevos tipos de commit, nuevos emojis o nuevas definiciones de commit.

* Si los cambios no encajan exactamente con ninguna fila de la tabla, está prohibido crear un tipo o un emoji nuevo. En ese caso, utilizar el tipo y el emoji existentes que más se aproximen a la intención real del cambio.

* Está prohibido eliminar, agregar, editar o alterar la tabla de la sección "Emojis por Tipo de Commit".

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

* Si el working directory tiene cambios de **N features distintas**: crear N commits separados, uno por feature. Para cada commit, agregar al staging area únicamente los archivos que correspondan a esa feature, ejecutar el commit y luego repetir el proceso con la siguiente feature.

Una "feature" es cualquier unidad de cambio con una intención semántica propia: una nueva funcionalidad, una corrección de bug, un cambio de estilo, una actualización de documentación, etc. La intención semántica es el único criterio válido para agrupar cambios en una misma feature. Que dos cambios compartan el mismo `<type>` y el mismo `<scope>` NO es suficiente para considerarlos la misma feature: por ejemplo, dos correcciones de bugs no relacionados entre sí dentro del mismo módulo comparten `fix` y el mismo `<scope>`, pero son dos features distintas y deben ir en dos commits separados.

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

## Mostrar el Commit Después de Realizarlo
Cuando se solicite hacer un commit desde un prompt, después de crearlo mostrar en la respuesta el encabezado con el formato `<emoji>` `<type>`(`<scope>`): `<mensaje en español>` y el `body` correspondiente al commit realizado.

## REGLA OBLIGATORIA
Está **TOTALMENTE PROHIBIDO** realizar cualquier modificación cuando te solicite hacer un **commit**.

Si detectas algún problema, **infórmamelo y espera mi autorización explícita para poder modificar**. **Nunca** realices cambios por iniciativa propia ni asumas autorización sin antes preguntarme.
