![logo-next-js](./docs/readme-md/img/logo-next-js.png)

---

# ⚛️ Stack Frontend del Proyecto
A continuación se resumen las principales tecnologías del proyecto y el motivo por el que se utilizan. No se incluyen todas las dependencias.

* Node.js 24.18.0

* [**Next.js 16 con App Router (`app`):**](https://youtu.be/_SPoSMmN3ZU?si=QCw1smESqt2qE_6a) _Framework semi-opinionado_ que evita configurar el proyecto desde cero, a diferencia de _React + Vite_, que es mas _abierto_. Incluye soporte nativo para _SSR (Server-Side Rendering)_, _SSG (Static Site Generation)_, _ISR (Incremental Static Regeneration)_ y _CSR (Client-Side Rendering)_.

* [**React 19:**](https://youtu.be/rLoWMU4L_qE?si=JIle2kdd3Etv5D41) Es la _biblioteca de frontend_ mas usada, tiene muchas _librerias_ que ofrecen soluciones a muchos problemas.

* [**TypeScript 6:**](https://youtu.be/fUgxxhI_bvc?si=rRY7NTzsONRSwyNN) Agrega _tipado estático_ al lenguaje, permitiendo detectar errores durante el desarrollo y mejorar el _autocompletado_, la _refactorización_ y el _mantenimiento del código_. Además, permite tener el mismo lenguaje de programación en frontend y backend.

* [**Shad cn:**](https://youtu.be/URpcaFga8rY?si=F9o2SuH-U5FKLkqw) Tiene una lista de _componentes UI_ muy completa, con integración nativa con _Tailwind_ y soporte para _React Hook Form_. Además, al no ser totalmente _headless_, tiene estilos por defecto que son fáciles de personalizar sin recurrir a hacks de CSS como _`::ng-deep`_ o _`!important`_.

* [**React Hook Form 7:**](https://youtu.be/1MxevPIZgVc?si=Sa1YjhpGw-mQ0dST) Evita el _boilerplate_ de los formularios mediante _register_ y _watch_ de _React Hook Form_, sin _gestionar manualmente el estado_ con _useState_ y _onChange_ de _React_.

* [**Zod 4:**](https://youtu.be/bUzGfrjg66M?si=PqQtfsXKDVA0HnuP) Permite utilizar la _misma sintaxis de código_ y reutilizar los mismos _esquemas de validación_ en frontend y backend. Además, se integra con _TypeScript_, ofrece validación de tipos en _tiempo de compilación_ y validación de datos en _tiempo de ejecución (runtime)_. En _frontend_ valida _formularios_ y _datos de entrada_, con excelente integración con _React Hook Form_ (_React_) y _Forms with Signals_ (_Angular_). En _backend_ valida _`body`_, _`query`_ y _`params`_ de las _solicitudes http_, garantizando la integridad de los datos antes de procesarlos.

* [**CSS:**](https://youtu.be/K3xmRF8ab1o?si=w1Ox_P5e2R934Xby) _`@layer`_ resuelve problemas de _especificidad_ y _cascada_ al controlar el orden de prioridad entre las _capas_, reduciendo la necesidad de usar _`!important`_. Además, CSS ha alcanzado un alto nivel de madurez e incorpora _CSS Nesting_, equivalente al _anidamiento de Sass_, y _Custom Properties_, equivalentes a las _variables de Sass_. En este proyecto se usa en _estilso globales_.

* [**Tailwind CSS 4:** ](https://youtu.be/R5EXap3vNDA?si=9TV4hucexfUBXgGk) Usa _clases utilitarias_ para aplicar estilos, evitando la mayoría de los problemas de _especificidad_, _herencia_ y _cascada_ de CSS. En este proyecto se usa en _estilos de los componentes_.

* [**tailwind-merge 3 y clsx 2:**](https://youtu.be/cJsRaYmrSQM?si=_DdWe3mQwTBAA1jo) Ambos se integran con _Tailwind_. _`clsx`_ evita escribir el _boilerplate_ en los _estilos condicionales_ que genera el _operador condicional ternario_, _template strings_, _concatenacion de strigs_, _`if`_ y _`switch`_, mientras que _`tailwind-merge`_ resuelve conflictos entre _clases de Tailwind_ que se sobrescriben.

* [**Zustand 5:**](https://youtu.be/pAHPHivDbuE?si=mUAwvgn-O1UhVva6) _Manejador global de estado_ con menos _boilerplate_ que _Redux_ y una API más simple. A diferencia de _useContext_, no requiere un _Context.Provider_ y evita re-renderizados innecesarios mediante suscripciones selectivas al estado.

* [**Luxon 3:**](https://moment.github.io/luxon/) Corrige los errores de `new Date()` de JavaScript y y tiene una API muy completa para manejo de fechas.

* [**react-icons 5:**](https://react-icons.github.io/react-icons/) Contiene iconos para todo. Los iconos provienen de muchas librerías de iconos y se pueden personalizar con _Tailwind_.

> [!TIP]
> # 🎥 **Aprende**
>
> Puedes hacer clic en el nombre de cada tecnología para ver cursos y aprenderlas

# ⚙️ Configurar lo Siguiente **UNA SOLA VEZ**

## 🛠️ Antes de Empezar
Para que la configuración funcione, debes tener instalado:
* [VS Code](https://code.visualstudio.com/) o cualquier editor basado en VS Code ([Antigravity IDE](https://antigravity.google/product/antigravity-ide), [Cursor](https://cursor.com/get-started), Windsurf, etc.)

* [Git Bash](https://youtu.be/niPExbK8lSw?si=tHx4IYZBdrUmW6ey)

* [Node.js](https://nodejs.org/)

* [Claude Code](https://youtu.be/Bf7hfpItrDk?si=5pW919OUbtSqJlyP)

* [pnpm](https://pnpm.io/installation)

* [fnm](https://github.com/Schniz/fnm)

> [!TIP]
> # ⚡ **Empieza de inmediato**
>
> 👍 Si quieres empezar a programar con IA sin perder tiempo configurando herramientas, utiliza **Claude Code**. Este proyecto ya incluye las configuraciones de **MCP**, **Skills**, **Rules** y `AGENTS.md` listas para usar.
>
> 👎 Si prefieres otra IA, deberás configurar manualmente sus funcionalidades equivalentes según la forma en que esa herramienta las implemente.

## Instalar `pnpm`
1. Abrir Git Bash

2. Instalar:

```console
npm install -g pnpm@latest-11
```

3. Cerrar y volver abrir Git Bash

4. Si la instalacion es correcta, al ejecutar

```console
pnpm -v
```

Debe mostrar la version de `pnpm` instalada

## `fnm`
Para que `fnm` automáticamente al entrar a la carpeta del proyecto seleccione la versión correcta de Node.js que se especifica en el archivo `.nvmrc` que esta en la raiz del proyecto. Hacer esto:

1. Abrir Git Bash.

2. Instalar Node.js 24.18.0:

```console
fnm install 24.18.0
```

3. Copiar completo el siguiente comando y ejecutarlo:

```console
echo 'eval "$(fnm env --use-on-cd)"' >> ~/.bashrc
source ~/.bashrc
```

4. Cerrar y volver abrir Git Bash

5. Para verificar que funcione ejecutar los siguientes comandos en el siguiente orden:

```console
cd /ruta/a/tu/proyecto
```

```console
fnm current
```

```console
node -v
```

6. Debería mostrarte `v24.18.0` automáticamente, sin que hayas escrito manualmente

```console
fnm use 24.18.0
```

## ⌨️ Autocompletado, Formatear Código y Linter
Usar VS Code o cualquier editor basado en VS Code (Antigravity, Cursor, Windsurf, etc.) para instalar las siguientes extensiones:

* [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

* [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)

* [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

* [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

* [Console Ninja](https://marketplace.visualstudio.com/items?itemName=WallabyJs.console-ninja)

* [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

* [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)

* [Auto Import](https://marketplace.visualstudio.com/items?itemName=steoates.autoimport)

* [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)

* [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)

No es necesario buscar cada extensión manualmente en el marketplace: el archivo `.vscode/extensions.json` ya está configurado con esas extensiones como recomendadas. Al abrir el proyecto, el editor mostrará una notificación sugiriendo instalarlas; también puede instalarlas desde la pestaña **Extensions** filtrando por `@recommended`.

La configuración de autocompletado, formateo de código y linter ya está incluida en los siguientes archivos. No es necesario realizar modificaciones adicionales:

* `.vscode/`
* `.editorconfig`
* `.prettierrc`
* `eslint.config.mjs`

# ⚙️ Entorno de Ejecución
Obligatorio el uso de Node.js, prohibido usar alternativas como:

* Bun
* Deno

# 📦 Manejador de Paquetes
Obligatorio el uso de `pnpm`, `pnpm-lock.yaml` y `pnpm dlx <paquete>` version `>=11.0.0 <12.0.0`. Esta 🚫 **BLOQUEADO** el uso de otras alternativas como:

| Concepto ⬇️ / Nombre gestor de paquetes ➡️               | `npm`                                   | `yarn`                              |
| --------------------------------------------------------- | --------------------------------------- | ----------------------------------- |
| Lockfile                                                  | `package-lock.json`                     | `yarn.lock`                         |
| Ejecutar un paquete temporal (sin instalarlo globalmente) | `npx <paquete>`<br>`npm exec <paquete>` | `yarn dlx <paquete>` *(Yarn Berry)* |

# 🟢 Administrador de Versiones para Node.js
Obligatorio el uso de `fnm`. Está prohibido usar alternativas como:

* nvm
* volta

Este proyecto usa Node.js 24.18.0

# 🏷️ Alias
Para todos los comandos de `pnpm` usar el alias `pn`

# 📦 Instalar Paquetes

```console
pn i
```

# ▶️ Scripts de desarrollo

| Comando          | Entorno     | Archivo de configuración       |
| ---------------- | ----------- | ------------------------------ |
| `pn start:local` | Local host  | `environments/.env.localhost`  |
| `pn start:test`  | Pruebas     | `environments/.env.test`       |
| `pn start:prod`  | Producción  | `environments/.env.production` |

# 🚀 Generar build (dist) para Desplegar

| Comando         | Entorno     | Archivo de configuración       |
| --------------- | ----------- | ------------------------------ |
| `pn build:test` | Pruebas     | `environments/.env.test`       |
| `pn build:prod` | Producción  | `environments/.env.production` |

# Arquitectura del Proyecto

> [!TIP]
> # 🧠 **Aprende antes de pedir cambios**
>
> No te limites a pedirle a la IA *"hazme X"* sin entender cómo funciona la arquitectura del proyecto.
>
> Hazle preguntas a la IA sobre:
>
> 1. `AGENTS.md`
> 2. `.claude/skills/***`
> 3. `.claude/rules/***`
> 4. Los **"🔗 Enlaces"**
>
> Hasta comprender cómo funciona el proyecto.
>
> Aunque es un texto largo, aprenderás la arquitectura, buenas prácticas y a detectar revisando el código, cuando la IA alucina

# 🤖 Uso de IA

> [!CAUTION]
> # ⚠️ **IMPORTANTE** 🚨
>
> ****Ignorar esta sección ocasionará que la IA genere código que no respeta la arquitectura, estructura ni las convenciones del proyecto, produciendo código legacy, inconsistente, desordenado y con malas practicas****

## Principales IA para Desarrollo de Software

| Empresa ↓ \ Plataforma → | Web                                                                                     | Desktop                                                               | Terminal / Bash / CLI                                              |
| ------------------------ | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Anthropic                | [Claude Web](https://claude.ai/)                                                        | [Claude Desktop](https://youtu.be/DYwZy7VNKws?si=cXTPumpZ3Jr9rNn9)    | [Claude Code](https://youtu.be/Bf7hfpItrDk?si=wjUIcIgtDX_Loyey)    |
| Open AI                  | [Chat GPT](https://chatgpt.com/)                                                        | [GPT Codex Desktop](https://youtu.be/bgx8ownl3O4?si=TzbOntfYIBVN1PGU) | [Codex](https://youtu.be/Ub-K1n4YYsg?si=EoIXGCzEa4ZxyRqA)          |
| Google                   | [Google AI Studio](https://aistudio.google.com/) / [Gemini](https://gemini.google.com/) | [Antigravity 2.0](https://antigravity.google/product/antigravity-2)   | [Antigravity CLI](https://youtu.be/bdEqIchP4x4?si=gRf6iLggXuzy_cq) |
| Anomaly Innovations      | [`opencode web`](https://opencode.ai/docs/web/)                                         | [Open Code Desktop](https://youtu.be/_SVSv2Y59P0?si=LT2S0z10t1FBxlB6) | [Open Code CLI](https://youtu.be/2gO8WyctqMk?si=aNvHlf23tKfrN-Z3)  |
| Cursor                   | [Cursor Web](https://cursor.com/agents)                                                 | [Cursor Desktop](https://youtu.be/XWsOQTqVl0w?si=0OVGRnYSCH46v2zf)    | [Cursor CLI](https://cursor.com/es/cli)                            |

# [🔗 Enlace - Benchmark de IA](https://artificialanalysis.ai/)

## ✏️ Edición de Código
Este proyecto esta configurado para usar _IAs de pago y desde la terminal_. **NO** sirve si usas IAs gratis o desde una pagina web, porque estan limitadas.

**Razones:**
* Si copias y pegas codigo desde plataforma web al proyecto, es probable que cometas errores

Las IAs de pago y desde la terminal tienen mejoras respecto a otras plataformas:

* Mayor comprensión del proyecto y de la estructura completa del código (_contexto_ y _tokens_).

* Acceso al sistema operativo (archivos y carpetas) y capacidad para ejecutar comandos.

* Capacidad para realizar cambios respetando la arquitectura del proyecto.

* Uso de Skills y MCP para reducir las _alucinaciones_ de la IA, permitiéndole a la IA consultar documentación oficial actualizada y seguir buenas prácticas.

# [🔗 Enlace - Prompts para Desarrollo Full Stack con IA](https://github.com/DanielPinedaM/prompt-engineering/tree/main/2_prompts-full-stack)

# ⚛️ Configurar Nest.js para que Funcione con IA
Estas configuraciones son oficiales del equipo de Vercel, que es quien desarrolla Next.js.

Estas configuraciones ya estan listas para funcionar. Solo debes seguir los pasos a continuación para verificar que funcionen correctamente.

# `AGENTS.md`
Contiene instrucciones que se inyectan SIEMPRE en cada prompt, para que la IA respete arquitectura del proyecto.

Permite a la IA acceder a la documentación oficial que está en `node_modules\next\dist\docs` de la versión de Next.js instalada.

Para probar que funcione:

```txt
citarme textualmente de documentación como activar reactCompiler babel-plugin-react-compiler
```

La salida debe contener algo similar a esto:

```bash
● Search(pattern: "", path: "\node_modules\next\dist\docs")

Cita textual de node_modules/next/dist/docs
```

# Skills

## 🌿 `git-commit`
Por cada feature terminada hacer un commit antes de solicitar nuevas modificaciones a la IA. Evita acumular demasiados cambios, ya que puedes perder el contexto de lo que la IA está realizando y cometer errores.

Trabajar bajo el principio:

> 1 commit = 1 feature

El skill `.claude\skills\git-commit\SKILL.md` te permite realizar commits.

***Ejemplos:***

```console
/git-commit
```

```console
hacer commit y push
```

## [`vercel-react-best-practices`](https://vercel.com/blog/introducing-react-best-practices)
Permite escribir código limpio de React.

Para probar que funcione:

```txt
/vercel-react-best-practices explicame como consumir API REST con React
```

La salida debe contener algo similar a esto:

```bash
● Read(\.claude\skills\vercel-react-best-practices\rules\[nombre_archivo].md)

Read 57 lines
```

> [!NOTE]
>
> **NO** debes hacer lo siguiente porque ya esta configurado
>
> Pasos para configurar skill `vercel-react-best-practices`
>
> Instalar
>
> ```bash
> pnpm dlx skills add vercel-labs/agent-skills/skills/react-best-practices
> ```
>
> mover `.agents\skills\vercel-react-best-practices` a `.claude\skills\vercel-react-best-practices`
>
> eliminar `skills-lock.json`

# 📁 Estructura Base del Proyecto

> [!WARNING]
>
> # **_ESTO HAY Q CORREGIRLO:_**

La estructura de carpetas definida a continuación **no representa la totalidad completa del proyecto**, representa la **arquitectura base de referencia**.

Esta arquitectura define el patrón estructural que toda la aplicación debe seguir, independientemente del crecimiento del proyecto o la incorporación de nuevas features.

Es la guía principal que determina cómo se organiza el código, no una lista exhaustiva de todos los archivos existentes.

```txt
src/
│
├── shared/
│   └── ui/
│       └── shad-cn/ → componentes de shad cn
│           ├── overlay/ → componentes que se superponen al contenido (alert-dialog, dialog, drawer, dropdown-menu, popover, sheet, toast/sonner, tooltip)
│           ├── react-hook-form/ → controles de formulario y sus dependencias, agrupados por el tipo de interacción; todos usan react hook form Controller excepto button
│           │   ├── action/ → dispara una acción, no captura un valor del formulario (button)
│           │   ├── date/ → selección de fechas (calendar, date-picker)
│           │   ├── selection/ → elegir entre opciones predefinidas (checkbox, combobox, radio-group, select, switch)
│           │   └── text/ → entrada de texto libre y su etiqueta (input, input-group, label, textarea)
│           ├── navigation/ → componentes de navegación (accordion, pagination, tabs)
│           ├── data-display/ → componentes de presentación de datos (carousel, data-table)
│           ├── hooks/ → hooks personalizados de shad cn
│           └── utils/ → NO es un componente: expone la función cn() de shadcn/ui para combinar clases de Tailwind (clsx + tailwind-merge), usada por todas las categorías
│
└── styles/
    └── global/
        ├── scss/
        │   ├── main.scss → con @use importa estilos .scss globales de toda la pagina web, NO debe contener estilos directos
        │   ├── _scroll-bar.scss → estilos globales de barra de scroll
        │   ├── _variables.scss → variables globales de Sass
        │   │
        │   └── buttons/ → estilos globales de botones organizados en archivos .scss composables que permiten combinar variantes, tamaños, estados y temas
        │       ├── index-buttons.scss → con @use importa estilos .scss para los botones, NO debe contener estilos directos
        │       ├── _base.scss → Reset CSS para botones
        │       ├── _effects.scss → utilidades visuales reutilizables para los botones: box-shadow, blur, elevation (sin lógica UI)
        │       ├── _modifiers.scss → alteran/extienden características de los botones sin sobrescribir sus estilos principales
        │       ├── _sizes.scss → Define el tamaño del botón mediante tokens basados en la escala de Tailwind CSS 4 para padding, font-size y line-height
        │       ├── _states.scss → estados de boton: hover, active, focus, disabled
        │       ├── _themes.scss → Define los temas de color del botón mediante CSS Custom Properties generadas a partir de _tokens.scss.
        │       ├── _tokens.scss → Define los tokens de diseño del sistema de botones mediante variables Sass (colores, tipografía, espaciado y escalas).
        │       ├── _mixins.scss → codigo de Sass que se repite en diferentes archivos de src\styles\global\scss\buttons
        │       └── _variants.scss → Variantes visuales (background, outline, ghost, link) que define la apariencia y comportamiento visual según el tipo de botón.
        │
        └── tailwind/ → Carpeta para configurar Tailwind 4
            ├── import.css → importar Tailwind
            ├── preflight.css → Reset CSS basado en Tailwind
            └── theme.css → variables de Tailwind
```

# Feature Architecture

Esta sección es la definición oficial de la arquitectura del proyecto. Toda decisión sobre dónde ubicar un archivo o carpeta debe respetarla de forma estricta.

La arquitectura es **agnóstica al framework**: describe un modelo reutilizable en cualquier tecnología. Las rutas indicadas (`src/app/(features)`, `src/core`, `src/shared`) son la convención de carpetas del proyecto, no una característica de un framework específico.

La arquitectura define **únicamente tres capas**:

- **Feature**
- **Core**
- **Shared**

## Definición de las Capas

Esta sección define qué representa cada una de las tres capas de la arquitectura. La clasificación de un archivo concreto se realiza en la sección "Regla de decisión".

La capa de un archivo se define por el **significado** del código, no por la **frecuencia** con que se reutiliza. El número de features que usan un código **no** determina su capa.

### Feature

Código que pertenece a **una sola** funcionalidad o flujo del sistema. Contiene la UI, el estado y la lógica de esa funcionalidad: código que **solo tiene sentido dentro de ese flujo** y que dejaría de tener sentido fuera de él. Al vivir dentro de `src/app/(features)`, **genera una ruta URL**. Su lógica nunca debe salir de la feature a la que pertenece.

Ejemplos:

- `src/app/(features)/tasks/components/ListTasks.tsx`
- `src/app/(features)/tasks/hooks/useTasks.ts`
- `src/app/(features)/tasks/store/tasks.store.ts`

### Core

Contiene la **lógica del dominio del sistema que existe de forma independiente de cualquier feature o pantalla específica**. Representa reglas del negocio del sistema (entidades, permisos, autorización, validaciones del dominio, cálculos globales del negocio). No depende de la UI ni del flujo de una feature concreta. Vive fuera de `src/app`, por lo que **no genera ruta URL**.

Core **no** se define por reutilización, se define por **significado del negocio**. Un código pertenece a core porque representa una regla del dominio del sistema, no porque varias features lo usen.

Ejemplos:

- `src/core/users/actions/update-user.ts`
- `src/core/users/data-types/interfaces/user.interface.ts`
- `src/core/permissions/get-user-permissions.ts`

### Shared

Código **completamente agnóstico al dominio**: utilidades técnicas reutilizables y componentes de UI sin conocimiento del negocio. No conoce ninguna feature ni concepto del negocio (usuarios, autenticación, productos, órdenes, dashboard, etc.) y no contiene reglas de negocio. Vive fuera de `src/app`, por lo que **no genera ruta URL**.

Ejemplos:

- `src/shared/ui/shad-cn/react-hook-form/InputText.tsx`
- `src/shared/utils/func/luxon.utils.ts`
- `src/shared/ui/buttons/Button.tsx`

## Resumen de las Capas de Arquitectura

| Capa                       | Ubicación                      | ¿Qué contiene?                                           | ¿Conoce el dominio? | ¿Genera ruta URL? |
| -------------------------- | ------------------------------ | -------------------------------------------------------- | ------------------- | ----------------- |
| Feature                    | `src/app/(features)/<feature>` | Lógica de una sola funcionalidad o flujo                 | Sí                  | Sí                |
| Core (dominio del sistema) | `src/core`                     | Reglas del negocio del sistema, independientes de la UI  | Sí                  | No                |
| Shared (agnóstico)         | `src/shared`                   | Código técnico reutilizable sin conocimiento del negocio | No                  | No                |

> El número de features que usan un código **no** aparece como criterio en esta tabla porque **no define la capa**. La capa se decide por el significado del código (ver "Regla de Decisión").

## Regla de Decisión

Esta es la **única** sección para decidir dónde ubicar cualquier archivo o carpeta y tiene prioridad absoluta sobre cualquier otra explicación del documento. La decisión se basa en el **significado** del código, **nunca** en cuántas features lo usan. Responder las preguntas en orden:

**1. ¿El código representa una regla del negocio del sistema?**

Es decir, una regla del dominio que existe por sí misma, independientemente de cualquier feature o pantalla (permisos, autorización, validaciones del dominio, cálculos globales del negocio, entidades del sistema).

- **Sí** → `src/core`.
- **No** → continuar con la pregunta 2.

**2. ¿El código pertenece a una sola funcionalidad o flujo?**

Es decir, código que solo tiene sentido dentro de esa feature y dejaría de tenerlo fuera de ella.

- **Sí** → dentro de esa feature, en `src/app/(features)/<feature>`.
- **No** → continuar con la pregunta 3.

**3. ¿El código es completamente agnóstico al dominio?**

Es decir, código técnico que no conoce el negocio y funcionaría igual en cualquier proyecto.

- **Sí** → `src/shared`.

> **Reutilizar un código en dos o más features NO lo convierte automáticamente en core.** Que dos features compartan un código solo indica que no pertenece en exclusiva a una de ellas; para saber su capa hay que volver a aplicar estas preguntas: si es una regla del negocio del sistema va a `core`, y si es técnico y agnóstico va a `shared`.

## Organización Interna de las Capas

Cada capa utiliza un criterio de organización diferente según su responsabilidad:

- **Feature** se organiza por **funcionalidades del producto**.
- **Core** se organiza por **conceptos o entidades del dominio**.
- **Shared** se organiza por **capacidades técnicas reutilizables**.

Las carpetas internas representan responsabilidades específicas dentro de cada contexto, pero no todas las capas siguen la misma estructura:

```txt
src/
├── app/(features)/                      → route group: agrupa todas las features y NO genera segmento de URL
│   └── <feature>/                       → una feature concreta. Ejemplos: tasks, products; cada una = una ruta URL
│       ├── page.tsx                     → punto de entrada de la feature (define la ruta URL en el App Router de Next.js)
│       ├── components/                  → componentes con lógica de negocio de la feature
│       │   └── TaskList.tsx
│       ├── ui/                          → componentes para la interfaz grafica reutilizable solo dentro de la feature
│       │   └── TaskListSkeleton.tsx
│       ├── hooks/                       → hooks de la feature
│       │   └── useTasks.ts
│       ├── stores/                      → estados globales de Zustand, accesibles solo dentro de la feature (NO en toda la aplicación)
│       │   └── tasks.store.ts
│       ├── utils/                       → utilidades de la feature
│       │   └── task.utils.ts
│       └── data-types/                  → tipos de datos de la feature
│           ├── constants/               → constantes de la feature
│           │   └── task.const.ts
│           ├── interfaces/              → interfaces de la feature
│           │   └── task.interface.ts
│           └── enums/                   → enums de la feature
│               └── task-status.enum.ts
│
├── core/                                → reglas del negocio del sistema, independientes de cada feature (NO es ruta, NO es agnóstico)
│   ├── users/
│   │   ├── actions/                     → casos de uso / operaciones del dominio (crear, actualizar, etc.)
│   │   ├── policies/                    → reglas de autorización y decisiones de permiso
│   │   ├── validators/                  → validación de reglas del dominio
│   │   ├── utils/                       → utilidades específicas de la entidad
│   │   └── data-types/
│   │       ├── constants/
│   │       ├── interfaces/
│   │       └── enums/
│   │
│   ├── permissions/
│   │   ├── policies/
│   │   ├── validators/
│   │   └── data-types/
│   │       ├── constants/
│   │       ├── interfaces/
│   │       └── enums/
│   │
│   └── auth/
│       ├── actions/
│       ├── repositories/
│       ├── validators/
│       └── data-types/
│           ├── constants/
│           ├── interfaces/
│           └── enums/
│
└── shared/                              → código 100% agnóstico al dominio (global)
    ├── ui/                              → componentes para la interfaz grafica reutilizable en toda la app
    │   └── buttons/
    │       ├── Button.tsx
    │       ├── AnchorButton.tsx
    │       └── NextLink.tsx
    ├── hooks/                           → hooks reutilizables en toda la app
    ├── stores/                          → estado global de Zustand, compartido por toda la app
    └── utils/                           → utilidades reutilizables en toda la app
```

## Diferencia entre `(features)` y `<feature>`

- **`(features)`** es un _route group_ de App Router de Next.js (los paréntesis lo definen). Por estar entre paréntesis, **no aporta ningún segmento a la URL**. No es una feature: es el contenedor de todas las features.

- **`<feature>`** es el marcador de posición de **una feature concreta** (por ejemplo `orders`, `products`, `dashboard`). Cada `<feature>` **sí** representa una funcionalidad real y **genera una ruta URL** a través de su `page.tsx`.

## Prohibido Modificar o Crear Nuevas Capas de Arquitectrua

Está estrictamente prohibido modificar, reemplazar, eliminar o crear nuevas capas arquitectónicas fuera de las tres capas oficiales definidas en este documento:

- Feature
- Core
- Shared

Toda carpeta, módulo, archivo (componente) o estructura nueva debe pertenecer obligatoriamente a una de estas tres capas; no se permite introducir una clasificación alternativa ni una reorganización paralela de las responsabilidades ya definidas.

Sí está permitido crear **subcarpetas dentro de una capa existente**, siempre que no introduzcan una nueva capa y respeten las responsabilidades de esa capa.

**_✅ Ejemplos válidos:_**

```text
src/shared
    ├── ui
    ├── layouts
    ├── utils
    ├── hooks
    └── data-types

src/core
    ├── auth
    ├── users
    └── permissions

src/app/(features)
         ├── products
         │   └── page.tsx
         ├── orders
         │   └── page.tsx
         └── dashboard
             └── page.tsx
```

Estas subcarpetas son válidas porque únicamente organizan el contenido dentro de una capa existente.

## ¿Por qué `src/core` y no dentro de `src/app/(features)/<feature>`?

Todo lo que está dentro de `src/app/(features)/<feature>/page.tsx` forma parte de la estructura de rutas del App Router de Next.js.

En Next.js App Router, las rutas se definen mediante archivos especiales como `page.tsx` dentro de `src/app/(features)/`. Las carpetas representan segmentos de la URL, mientras que archivos como `page.tsx` determinan qué segmentos se convierten en rutas accesibles.

Si colocaras código de dominio compartido dentro de `(features)`, ese código quedaría asociado a una feature específica dentro de la estructura de rutas de Next.js App Router, aunque no represente una pantalla propia.

Además, estarías acoplando un módulo compartido a una única feature, lo que impediría reutilizarlo correctamente entre diferentes funcionalidades.

Por eso `src/core` vive **fuera** de `src/app`: aloja las reglas del negocio del sistema, que existen de forma independiente de cualquier feature específica y no participan directamente en la definición de rutas.

## 🚫 Archivos y Carpetas Prohibidas de Crear

Esta arquitectura prohíbe crear carpetas cuyo nombre sea genérico o ambiguo, porque ocultan responsabilidades distintas dentro de un mismo contenedor en lugar de expresar **una única responsabilidad clara**. Cada carpeta debe nombrar de forma específica lo que contiene (`validators/`, `components/`, `utils/`, etc).

- `services/`: No es una convención propia de React ni de Next.js, su nombre no expresa qué responsabilidad contiene y mezcla lógica de negocio, acceso a datos, validaciones y acciones en un mismo lugar. No debe reemplazarse por otra carpeta genérica equivalente (`helpers/`, `logic/`, etc.): el objetivo no es renombrarla, sino **separar responsabilidades**.

- `common/`: Es un nombre comodín que no describe ninguna responsabilidad concreta y termina convirtiéndose en un depósito de código sin dueño, acoplando elementos no relacionados. Cada arhivo debe pertenecer a la carpeta que describe su responsabilidad real.

- `**/utils/func/general.utils.ts` / `**/utils/func/global.utils.ts`: Un archivo cuyo nombre no describe ninguna responsabilidad concreta termina acumulando funciones sin relación entre sí. Un nombre genérico (`general`, `global`, `misc`, `helpers`, etc.) invita a meter cualquier cosa, lo que convierte el archivo en un depósito sin dueño que rompe la separación de responsabilidades. Cada utilidad debe residir en un archivo que nombre explícitamente **su responsabilidad concreta** (la capacidad técnica en `shared`, la entidad o concepto en `core`). Ejemplo: `luxon.utils.ts`, `string.utils.ts`, `user.utils.ts`. No basta con renombrar a otro nombre comodín equivalente: el objetivo es **separar responsabilidades**, no reetiquetarlas. Por eso **NO** debe existir en ninguna de estas rutas:

  - `src/shared/utils/func/general.utils.ts`
  - `src/shared/utils/func/global.utils.ts`

  - `src/core/<entity>/utils/func/general.utils.ts`
  - `src/core/<entity>/utils/func/global.utils.ts`

  - `src/app/(features)/<feature>/utils/func/general.utils.ts`
  - `src/app/(features)/<feature>/utils/func/global.utils.ts`

- `shared/components`: Combina conceptos incompatibles: `shared` es código agnóstico al dominio, mientras que `components` contiene lógica de negocio asociada a una feature. Un componente agnóstico pertenece a `src/shared/ui` y un componente con lógica de negocio a `src/app/(features)/<feature>/components`. Por eso **NO** debe existir en ninguna de estas rutas:
  - `src/shared/components`
  - `src/app/shared/components`
  - `src/app/(features)/*/shared/components`

## Regla de Dirección de Dependencias

Esta sección complementa la "Regla de Decisión". Una vez que un archivo está ubicado en su capa, esta regla define **en qué dirección puede importar**. Es tan obligatoria como la ubicación misma: una capa bien ubicada pero con imports en la dirección incorrecta vuelve a acoplar exactamente lo que la arquitectura intenta separar.

Las dependencias fluyen en **una sola dirección**:

```txt
feature  →  core  →  shared
```

**_Reglas:_**

- **Feature** puede importar de **Core** y de **Shared**.

- **Core** puede importar de **Shared** y de otras entidades o procesos dentro de **Core**.

- **Shared** no importa de **Core** ni de ninguna **Feature**. Solo depende de librerías externas y de otros módulos dentro de **Shared**.

- Una **Feature** **nunca** importa de otra **Feature**.

- **Core** **nunca** importa de una **Feature**.

- Las dependencias entre módulos de **Core** deben ser **acíclicas**: si `A` importa de `B`, entonces `B` no puede importar de `A`.

Cuando una **Feature** necesita lógica que vive dentro de otra **Feature**, esa lógica **no** se importa de forma cruzada: se **promueve a una capa compartida** (`core` si es una regla del negocio del sistema, `shared` si es código técnico agnóstico) y ambas la consumen desde ahí. La capa destino se decide con la "Regla de Decisión", nunca por el hecho de que dos features la necesiten (ver "Mover de Feature a Core").

### ¿Por qué una sola dirección?

Esta regla es la que mantiene la arquitectura escalable cuando el número de features crece. Sin ella, `core` puede terminar importando de una feature (invirtiendo la dependencia y atando el dominio compartido a una pantalla concreta), o dos features pueden acoplarse directamente entre sí (creando dependencias ocultas imposibles de rastrear). La dirección única garantiza que lo más reutilizable (`shared`) sea también lo más estable, y que lo más volátil (`feature`) dependa de lo estable y nunca al revés.

**_✅ Ejemplos válidos:_**

```ts
// feature → core      (una feature usa una regla del negocio del sistema)
// src/app/(features)/orders/components/OrderList.tsx
import { getUserPermissions } from '@/core/permissions/get-user-permissions';

// feature → shared    (una feature usa código agnóstico)
// src/app/(features)/orders/components/OrderList.tsx
import { Button } from '@/shared/ui/buttons/Button';

// core → shared       (el dominio usa código agnóstico)
// src/core/users/actions/update-user.ts
import { formatDate } from '@/shared/utils/func/luxon.utils';

// core → core         (una entidad usa otra, en UNA sola dirección y sin ciclo)
// src/core/orders/validators/order.validator.ts
import { isActiveUser } from '@/core/users/utils/user.utils';

// shared → shared     (un módulo agnóstico usa otro módulo agnóstico)
// src/shared/ui/overlay/dialog/ConfirmDialog.tsx
import { Button } from '@/shared/ui/buttons/Button';
```

**_🚫 Ejemplos prohibidos:_**

```ts
// ❌ feature → feature   (una feature nunca importa de otra feature)
// src/app/(features)/orders/components/OrderList.tsx
import { useTasks } from '@/app/(features)/tasks/hooks/useTasks';

// ❌ core → feature       (core nunca importa de una feature)
// src/core/users/actions/update-user.ts
import { OrderForm } from '@/app/(features)/orders/components/OrderForm';

// ❌ shared → feature     (shared nunca importa de una feature)
// src/shared/ui/buttons/Button.tsx
import { useTasks } from '@/app/(features)/tasks/hooks/useTasks';

// ❌ shared → core        (shared nunca importa de core)
// src/shared/ui/buttons/Button.tsx
import { User } from '@/core/users/data-types/interfaces/user.interface';
```

## Procesos del Dominio en Core

`core` se organiza por **conceptos del dominio**. Una **entidad** (`users`, `orders`, `permissions`) es un tipo de concepto, pero **no el único**.

Cuando una operación del dominio involucra **dos o más entidades a la vez** (por ejemplo un proceso de checkout que coordina `orders`, `payments` e `inventory`), ese proceso **es en sí mismo un concepto del dominio** y recibe su **propia carpeta** dentro de `core`. No debe forzarse dentro de una de las entidades que coordina, porque no pertenece a ninguna en exclusiva.

```txt
src/core/
├── orders/            → entidad
├── payments/          → entidad
├── inventory/         → entidad
└── checkout/          → proceso del dominio que coordina las tres
    ├── actions/
    ├── validators/
    └── data-types/
```

Regla práctica: si no puedes responder "¿de qué entidad es esto?" con **una sola** entidad, probablemente es un **proceso** y merece su propia carpeta en `core`, no un lugar prestado dentro de otra entidad.

Esto **no introduce una nueva capa**: un proceso vive dentro de `core` y respeta todas sus reglas (conoce el dominio, es compartido por varias features, no genera ruta URL).

**_✅ Caso especial - core → core cíclico:_**

Importar de una entidad a otra dentro de core sí está permitido, pero solo en una dirección. Queda prohibido cuando se forma un ciclo (A importa de B y B importa de A):

```ts
// src/core/users/utils/user.utils.ts
import { getOrdersByUser } from '@/core/orders/actions/get-orders-by-user'; // users depende de orders

// src/core/orders/validators/order.validator.ts
import { isActiveUser } from '@/core/users/utils/user.utils'; // orders depende de users
```

## Mover de Feature a Core

El movimiento de código a `core` **NO depende de la reutilización** ni del número de features que lo usen. Depende exclusivamente del **significado del dominio**.

> El hecho de que un código sea reutilizado en dos o más features NO define que deba ser movido a core.

Un código se mueve a `core` cuando representa una **regla del negocio del sistema** que existe de forma independiente de cualquier feature o pantalla. Si nació dentro de una feature pero en realidad es una regla del dominio del sistema, su lugar correcto es `core`. Que un archivo nazca dentro de una feature y luego se mueva a `core` es un movimiento esperado y normal del ciclo de vida del proyecto, no un error de diseño previo.

Que una **segunda** feature necesite el mismo código **no** es, por sí solo, motivo para moverlo a `core`: solo indica que ese código no pertenece en exclusiva a una feature. Para decidir su destino se vuelve a aplicar la "Regla de Decisión".

**_Procedimiento para mover código de una feature a core:_**

1. Mover el archivo (o carpeta) desde `src/app/(features)/<feature>/...` hacia la entidad o proceso correspondiente en `src/core/...`.

2. Reescribir todos los imports que apuntaban a la ubicación anterior.

3. Verificar que el módulo movido **no conserve imports hacia ninguna feature** porque violaría la Regla de Dirección de Dependencias

4. Confirmar que ahora **todas** las features que lo necesitan lo consumen desde `core`, sin importar cuántas sean.

Está prohibido **duplicar** el código en la segunda feature para evitar el movimiento: duplicar lógica de dominio rompe la fuente única de verdad y es precisamente lo que `core` existe para impedir.

### Casos críticos

#### Caso 1: un código es usado por dos features

**No** se mueve automáticamente a `core`. Debe evaluarse su significado:

- **Si es técnico o reutilizable genérico** → se mueve a `shared`.

  Ejemplos: `formatDate`, `debounce`, utilidades de strings, componentes de UI reutilizables.

- **Si representa una regla del negocio del sistema** → se mueve a `core`.

  Ejemplos: permisos de usuario, reglas de validación del dominio, lógica de autorización.

#### Caso 2: un código está repetido en dos features

Se permite la duplicación **solo si** se cumplen todas estas condiciones:

- Es lógica específica de cada feature.
- No representa una regla del negocio del sistema.
- No es reutilizable sin acoplar el contexto de la feature.

En este caso **no** se mueve a `core` ni a `shared`.

### Qué SÍ puede repetirse en features

- Lógica específica de la UI de esa feature.
- Lógica de presentación.
- Lógica que depende del contexto de esa feature.
- Código pequeño que no representa una regla del sistema.

Ejemplos válidos de repetición:

- Validaciones de formularios específicas de la feature.
- Mapeo de datos de UI.
- Lógica de estados locales.
- Hooks específicos de la feature.

### Qué NO debe repetirse en features

- Reglas de negocio del sistema → `core`.
- Lógica de permisos o autenticación → `core`.
- Cálculos globales del dominio → `core`.
- Utilidades técnicas genéricas → `shared`.

Duplicar una regla del negocio del sistema rompe la fuente única de verdad y es precisamente lo que `core` existe para impedir.

### Procedimiento al promover código fuera de una feature

1. Aplicar la "Regla de Decisión" para determinar la capa destino: `core` (regla del negocio del sistema) o `shared` (código técnico agnóstico).
2. Mover el archivo (o carpeta) desde `src/app/(features)/<feature>/...` hacia la entidad o proceso correspondiente en `src/core/...`, o hacia la capacidad técnica correspondiente en `src/shared/...`.
3. Reescribir todos los imports que apuntaban a la ubicación anterior.
4. Verificar que el módulo movido **no conserve imports hacia ninguna feature** (violaría la Regla de Dirección de Dependencias).
5. Confirmar que las features que lo necesitan lo consumen desde su nueva capa.

## Resumen de Regla de Dirección de Dependencias

| Desde ↓ \ Hacia → | Feature | Core | Shared |
| ----------------- | ------- | ---- | ------ |
| **Feature**       | ❌      | ✅   | ✅     |
| **Core**          | ❌      | ✅\* | ✅     |
| **Shared**        | ❌      | ❌   | ✅     |

\* core → core es válido solo en una dirección; queda prohibido si forma un ciclo (ver "Procesos del Dominio en Core").

## Diferencia entre `components` y `ui`

### ui

`ui` contiene exclusivamente componentes de presentación y maquetación.

Los componentes de `ui` deben ser completamente agnósticos al dominio.

Un componente de `ui` no puede conocer logica de negocio, entidades del sistema ni casos de uso.

Su única responsabilidad es renderizar interfaz reutilizable.

### components

`components` contiene componentes con lógica de negocio específica de la feature donde están definidos.

Un componente pertenece a `components` cuando conoce el dominio, participa en un caso de uso o implementa comportamiento propio de la funcionalidad.

La lógica de negocio siempre pertenece a `components`, nunca a `ui`.


# 📅 Fechas
1. **OBLIGATORIO** usar Luxon para el manejo de fechas y horas. **PROHIBIDO** utilizar `new Date()` nativo de JavaScript o cualquier otra librería diferente de Luxon.

2. En todos los componentes definidos en la sección **"Componentes Permitidos de Calendarios"**, toda su interfaz pública de fechas (props, como `selected` y `onSelect`) es de tipo Luxon `DateTime`.

3. **OBLIGATORIO** usar los calendarios  para la selección de fechas definidos en "Componentes de Calendarios". **PROHIBIDO** usar cualquier otro componente de calendario, incluyendo el `<input type="date">` nativo de HTML.

4. **OBLIGATORIO** utilizar exclusivamente los componentes definidos en la sección **"Componentes Permitidos de Calendarios"** para la selección de fechas. **PROHIBIDO** utilizar cualquier otro componente de calendario, incluyendo la etiqueta`<input type="date">` nativa de HTML.

5. **OBLIGATORIO** mantener en zona horaria local el `DateTime` de Luxon que entra o sale de los componentes definidos en la sección **"Componentes Permitidos de Calendarios"**, a través de sus props (`selected`, `onSelect`, etc.), ya que representan una fecha seleccionada por el usuario. **PROHIBIDO** convertir ese `DateTime` a UTC (`.toUTC()`) dentro del flujo de estos componentes. Si necesitas persistir un instante (por ejemplo, `createdAt`) o enviarlo en el **payload** al backend, convierte ese `DateTime` a UTC únicamente justo antes de persistirlo o incluirlo en el payload, nunca antes. **OBLIGATORIO** que ese valor viaje en el payload como un `string` en formato ISO 8601 UTC (`YYYY-MM-DDTHH:mm:ssZ`), por ejemplo: `2024-06-15T14:30:00Z`.

6. En `src/shared/utils/func/luxon.utils.ts` existen funciones utilitarias reutilizables para el manejo y formateo de fechas y horas con Luxon. **OBLIGATORIO** reutilizarlas cuando cubran la necesidad. **PROHIBIDO** duplicar su funcionalidad. Estas funciones no contienen lógica de negocio.

## Componentes Permitidos de Calendarios

### `src\shared\ui\shad-cn\react-hook-form\date\calendar`
* `Calendar` con prop `mode="single"`: selección de una única fecha `selected?: DateTime`, `onSelect?: LuxonOnSelectHandler<DateTime | undefined>`
* `Calendar` con prop `mode="range"`: selección de un rango de fechas `selected?: DateTimeRange`, `onSelect?: LuxonOnSelectHandler<DateTimeRange | undefined>`
* `Calendar` con prop `mode="multiple"`: selección de múltiples fechas `selected?: DateTime[]`, `onSelect?: LuxonOnSelectHandler<DateTime[] | undefined>`

### `src\shared\ui\shad-cn\react-hook-form\date\date-picker`
* `DatePicker` con prop `mode="single"`: selección de una única fecha `selected?: DateTime`, `onSelect?: LuxonOnSelectHandler<DateTime | undefined>`
* `DatePicker` con prop `mode="range"`: selección de un rango de fechas `selected?: DateTimeRange`, `onSelect?: LuxonOnSelectHandler<DateTimeRange | undefined>`
* `DatePicker` con prop `mode="multiple"`: selección de múltiples fechas `selected?: DateTime[]`, `onSelect?: LuxonOnSelectHandler<DateTime[] | undefined>`

# 📝 Formularios - Integración Shad cn y React Hook Form

Todos los formularios del proyecto deben utilizar obligatoriamente:

- React Hook Form
- Componentes ubicados en `src\shared\ui\shad-cn\react-hook-form`

No crear formularios con manejo manual de estado cuando exista un componente React Hook Form equivalente.

## `src/shared/ui/shad-cn`

Contiene componentes visuales basados en Shad cn.

Su responsabilidad es únicamente encapsular y estandarizar la UI.

Estos componentes:

- No conocen features
- No contienen lógica de negocio
- No contienen reglas del dominio

## `src/shared/ui/shad-cn/react-hook-form`

Contiene adaptadores entre:

- Shad cn
- React Hook Form
- Componentes visuales

Su única responsabilidad es conectar el formulario con la UI.

Estos componentes solamente manejan integración técnica:

- `useController`
- `Controller`
- `value`
- `onChange`
- `onBlur`
- errores visuales del formulario

No representan formularios del negocio.

## Reglas obligatorias del sistema de formularios

### 1. Framework y renderizado

- Se trabaja en Next.js (App Router).
- Todos los componentes de formularios deben ser `"use client"`.

### 2. Ubicación obligatoria de componentes

Es obligatorio usar los componentes reutilizables de inputs ubicados en:

```txt
src/shared/ui/shad-cn/react-hook-form
```

### 3. Restricciones estrictas

- Prohibido usar inputs HTML nativos (`<input />`, `<select />`, etc.).
- Obligatorio usar componentes de PrimeReact para todos los campos.
- Prohibido usar formularios controlados con `useState`.
- Prohibido usar formularios no controlados con `useRef`.
- React Hook Form es la única fuente válida de estado del formulario.

### 4. Flujo de React Hook Form y Shad cn

```text
┌──────────────────────┐
│ Feature (Padre)      │
│   useForm()          │
│   defaultValues      │
│   handleSubmit()     │
│   control            │
│   rules              │
│   watch()            │
│   lógica condicional │
│   estado derivado    │
└──────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────┐
│ src/shared/ui/shad-cn/react-hook-form       │
│   useController()                           │
│   Controller                                │
│   field.value                               │
│   field.onChange                            │
│   field.onBlur                              │
│   field.ref                                 │
│   fieldState.error                          │
└─────────────────────────────────────────────┘
           │
           ▼
┌───────────────┐
│ PrimeReact    │
│   InputText   │
│   Dropdown    │
│   Calendar    │
│   Checkbox    │
│   ...         │
└───────────────┘
```

### 5. React Hook Form (RHF)

- Es el único responsable del estado del formulario.
- `defaultValues` se define exclusivamente en `useForm` en el componente padre.
- `watch` es obligatorio para lógica derivada en el componente padre.
- `onChange` manual está prohibido fuera de los inputs controlados por `Controller`.

### 6. Uso obligatorio de `watch`

- Toda lógica condicional del formulario debe resolverse con `watch`.

- `watch` **NO** debe usarse dentro de componentes reutilizables de input que estan en `src/shared/components/react-hook-form`

- Prohibido usar `useState` + `onChange` para manejar formularios. Lo correcto es usar `watch` en el componente padre.

- Ejemplos: `disabled`, visibilidad, dependencias entre campos.

### 7. Componentes reutilizables

Un input reutilizable debe:

- Encapsular `Controller` de React Hook Form.
- Ser genérico (`T extends FieldValues`).
- Usar `control`, `name`, `rules`, `errors` como contrato base.
- No contener lógica de negocio.
- No definir reglas internas.
- No usar `watch`.
- Representar un único tipo de campo/input.
- No mezclar múltiples tipos de input en un mismo componente reutilizable.

**_✅ Correcto_**

- `InputText`
- `InputPassword`
- `InputNumber`
- `InputEmail`
- `InputPhone`
- `InputSelect`

**_❌ Incorrecto_**

- `GenericInput`
- `BaseInput`
- `DynamicInput`
- Un único componente que maneje:
  - `input type="text"`
  - `input type="password"`
  - `input type="number"`
  - `input type="email"`

### 8. UI (Shad cn)

- Shad cn solo maneja la capa visual.
- `disabled`, `placeholder`, `className` son props de UI.
- Shad cn no puede modificar el estado del formulario.
- Solo refleja el estado final derivado de React Hook Form.

### 9. Validaciones

- Todas las validaciones se definen en el padre mediante `rules`.
- Se soportan múltiples validaciones (`required`, `minLength`, `pattern`, etc.).
- El input solo ejecuta las validaciones, no las define.

### 10. Formularios dinámicos

- La estructura del formulario debe definirse en el padre (config-driven).
- No se permite lógica condicional dentro de los componentes de input.

### 11. Mensajes de error de formulario

- Todo componente de campo ubicado en `src/shared/ui/shad-cn/react-hook-form` debe usar `FormErrorMessages` para mostrar los mensajes de error de React Hook Form.

* Prohibido mostrar errores de validación con elementos HTML propios, lógica manual o cualquier otro componente alternativo.

## Regla clave de arquitectura

- Input (componente hijo) = UI + conexión React Hook Form

- Padre = lógica + `watch` + validaciones + estado derivado

## Flujo obligatorio de datos

1. React Hook Form gestiona estado interno.
2. watch en el componente padre define reglas dinámicas.
3. El padre calcula props finales (ejemplo: `disabled`).
4. El input recibe solo valores finales.
5. PrimeReact renderiza UI.

## Prohibido

- Usar `watch` dentro de inputs reutilizables.
- Usar `useState` para formularios controlados
- Usar `useRef` para formularios no controlados
- Usar inputs nativos de HTML.
- Mezclar lógica de negocio dentro de inputs.
- Definir `defaultValues` fuera de `useForm`.
- Duplicar control de estado entre RHF y UI.
- Usar `map` para renderizar los campos de los formularios.
- Mostrar errores de validación sin usar `FormErrorMessages` en componentes de `src/shared/ui/shad-cn/react-hook-form`.

## Resultado esperado

- Formularios escalables y consistentes.
- Componentes reutilizables reales (design system).
- Cero duplicación de lógica de `Controller`.
- Separación estricta entre lógica y UI.
- Mantenimiento simple en proyectos grandes.

## Prohibido agregar lógica de negocio dentro de src/shared/ui/shad-cn/react-hook-form

En `src/shared/ui/shad-cn/react-hook-form` nunca agregar:

- Reglas de negocio
- Reglas específicas de una feature
- Validaciones de dominio
- Condiciones de negocio
- if relacionados con entidades del sistema
- Permisos
- Roles
- Lógica de cualquier feature. Ejemplo: tareas, productos, usuarios, etc.

**_Ejemplo prohibido:_**

```tsx
if (user.role === "admin") {
  ...
}
```

> [!WARNING]
>
> # **_INCOMPLETO - AQUI ME FALTA AGREGAR EJEMPLO DE INPUTS Q ESTAN EN SRC/SHARED/COMPONENTS/REACT-HOOK-FORM_**

# 🔌 Consumo de API
En este proyecto es **OBLIGATORIO**, sin ninguna excepción, usar `src\shared\api\http-client\http-gateway.api.ts` para realizar cualquier petición HTTP.

Esta obligación aplica a **todos** los métodos HTTP (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) y a **todos** los endpoint, sin importar el tipo de servicio que se consuma.

`http-gateway.api.ts` estandariza todas las llamadas a API y devuelve siempre la misma estructura:

```ts
{
  success: boolean;
  status: number;
  message: string;
  data: T;
}
```

El frontend **NUNCA** consume un endpoint de forma directa

Toda petición tiene que pasa primero por `http-gateway.api.ts`, y desde ahí se dirige a las APIs internas y externas. Los dos destinos posibles del flujo son:

## 🔀 Flujo para Consumir API:
El flujo de comunicación de este frontend es **SIEMPRE** el mismo y nunca se omite el paso por `http-gateway.api.ts`:

```txt
Frontend
    ↓
http-gateway.api.ts
    ↓
┌────────┴────────┐
↓                 ↓
Internal APIs     External APIs
(Servicio interno)（Servicio externo / Third-Party)
```

## Reglas de `http-gateway.api.ts`
1. **PROHIBIDO** meter lógica de negocio **DENTRO** de  `http-gateway.api.ts`

La lógica de negocio **TIENE** que estar en **DONDE SE LLAMA** a `http-gateway.api.ts` (component).

`http-gateway.api.ts` es un wrapper de `fetch`. Su **ÚNICA** responsabilidad es infraestructura de transporte HTTP, **NUNCA** reglas de negocio o de dominio.

✅ Esto **SI** es responsabilidad de `http-gateway.api.ts` (_lógica de infraestructura/transporte_):
  * Hacer peticiones HTTP (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`).
  * Mostrar/ocultar icono de cargando (loader).
  * Manejo **centralizado** de errores HTTP por status code (401, 403, 404, 5xx). Esto es genérico y aplica a **CUALQUIER** endpoint, **NO** a un caso de negocio específico.
  * Timeout de peticiones.
  * Estandarización del formato de respuesta de la API.
  * Logger de peticiones HTTP exitosas y erróneas.
  * Construcción de opciones de la peticion HTTP: body, params, headers, responseType

❌ Esto **JAMÁS** debe estar en `http-gateway.api.ts` (_lógica de negocio/dominio_):
  * Métodos con nombre de dominio específico. Ejemplo: `getUserPermissionsById()`, `findTasksByFilters()`, `createInvoice()`, `cancelOrderById()`, `updateUserProfile()`, `sendPasswordResetEmail()`.
  * Validaciones de reglas de negocio. Ejemplo: "si el usuario no tiene el rol X, no puede ver Y".
  * Transformación o filtrado de datos según reglas de dominio. Ejemplo: `users.filter(user => user.active && user.role === 'admin')`.
  * Decisiones específicas de un flujo de negocio (qué hacer con la respuesta según el contexto de la feature).

Diferencia:
  * **Lógica de infraestructura/transporte**: "¿cómo viaja la petición?" (timeout, headers, formato, errores HTTP genéricos).

  * **Lógica de negocio/dominio**: "¿qué significa esta petición/respuesta para la aplicación?" (permisos, tareas, facturas, reglas de la feature).

`http-gateway.api.ts` solo responde la primera pregunta. La segunda siempre se resuelve en el componente ó .ts que lo consume.

## Reglas para Consumir API
* **SIEMPRE** desestructurar la respuesta de la API para acceder directamente a sus propiedades (`success`, `status`, `message`, `data`):

```ts
const { success, status, message, data } = await firstValueFrom(
  this.http.POST(`${environment.api}AQUI_ESCRIBIR_EL_ENDPOINT`),
);
```

**NUNCA** guardar la respuesta completa en una variable y acceder a sus propiedades con notación de punto (`response.success`, `response.status`, `response.message`, `response.data`):

```ts
const response = await firstValueFrom(
  this.http.POST(`${environment.api}AQUI_ESCRIBIR_EL_ENDPOINT`),
);
```

* Al llamar `GatewayApiService` **NUNCA** usar:
  * `try/catch`
  * Operador de RxJS `catchError`
  * Callback `error` del objeto pasado a `subscribe()`

* El manejo de errores se tiene que hacer con `if else` asi:

```ts
async getBots() {
  const { success } = await firstValueFrom(
    this.http.POST(`${environment.api}AQUI_ESCRIBIR_EL_ENDPOINT`),
  );

  if (success) {
    // codigo cuando peticion HTTP es exitosa
  } else {
    // codigo cuando peticion HTTP es erronea
  }
}
```

* **NO** propagar los errores de `GatewayApiService` con `throw new Error()` porque `GatewayApiService` ya centraliza el manejo de errores con `catchError`

* Ejemplo correcto SIN propagar error y sin try catch

```ts
getUser(id: string) {
  return this.http.get<User>(`/api/users/${id}`); // me olvidé de poner ApiResponse<T>
}
```

```html
@if (userRes.isLoading()) { <spinner /> }
@else if (!userRes.value()?.success) { <p>No se pudo cargar</p> }  <!-- chequeás el flag -->
@else { <p>{{ userRes.value()?.data?.name }}</p> }                 <!-- value() es ApiResponse<User> → ?.data?.name -->
```

* La URL se construye concatenando el `environment.api` con el endpoint específico de la petición, lo que permite reutilizar la base de la API en todos los ambientes (local, test, producción).

## ⏳ Icono de Loader Global
Prohibido crear use state loading false/true para manejar el loading en componentes de React. `http-gateway.api.ts` ya se encarga de mostrar y ocultar fixed loader centrado en pantalla


## ¿Como Desactivar el sticky loader icon de `http-gateway.api.ts`?


# 💅 Maquetación

## Componentes de interfaz (UI): uso y maquetación
Los componentes de shadcn están instalados en `src\shared\ui\shad-cn`.

Esta regla aplica a **cualquier componente visual del proyecto** (formularios, cards, badges, tooltips, layouts, etc.), no solo a formularios.

### Orden de decisión
Para construir cualquier elemento de UI, evaluar en este orden y detenerse en el primer caso que aplique:

1. **¿El componente está en "Componentes permitidos"?**
   Usar el componente de shadcn de la lista. Está prohibido usar su equivalente nativo de HTML.
   Ejemplo: existe la etiqueta nativa `<dialog>` de HTML, pero como `Dialog` está en la lista, se debe usar `<Dialog>` de shadcn.

2. **¿El componente es un botón?**
   Usar **SIEMPRE** el componente de `src\shared\ui\buttons`. Está prohibido usar `Button` de shadcn y está prohibido usar la etiqueta `<button>` nativa de HTML. Esta regla aplica en todos los casos, incluidos los botones internos de componentes compuestos (ver "Botones dentro de componentes compuestos").

3. **¿El componente NO está en la lista y NO es un botón?**
   Maquetar con Tailwind. En este caso sí se usan elementos HTML nativos (`<div>`, `<span>`, etc.) como base del maquetado.
   Ejemplo: `Card` no está en la lista, se maqueta con Tailwind sobre `<div>`.

4. **Alcance de la prohibición de HTML nativo (aplica a los casos 1, 2 y 3):**
   El HTML nativo solo está prohibido en dos situaciones:
   * (a) Cuando existe un equivalente en "Componentes permitidos": usar shadcn, no el nativo.

   * (b) La etiqueta `<button>` nativa: usar siempre `src\shared\ui\buttons`.
   En cualquier otro caso (componentes que no están en la lista), el HTML nativo es la base esperada para maquetar con Tailwind.

### Refuerzo para formularios
Además de lo anterior, en formularios es obligatorio usar los componentes de shad cn de "Componentes permitidos" para todos los controles disponibles (checkbox, input, label, Radio Group, Select, Switch, textarea, etc.). No se permite ningún control de formulario en HTML nativo cuando existe su equivalente en la lista.

Para el formulario en sí, sí se permite usar la etiqueta nativa `<form>` de HTML junto con react-hook-form para el manejo de estado y validación.

### Botones dentro de componentes compuestos
Varios componentes de la lista (Alert Dialog, Dialog, Drawer, Sheet, dropdown-menu, Date Picker) usan botones internos mediante el patrón `asChild` de Radix (triggers, acciones, footers).

El componente de `src\shared\ui\buttons` ya implementa `React.forwardRef` y propaga props, por lo que es compatible con `asChild`. En **todos** los escenarios se usa `src\shared\ui\buttons`, nunca `Button` de shadcn:

* Trigger que abre el modal / drawer / menú → `src\shared\ui\buttons`

* Botones de acción internos (footer de Dialog, `AlertDialogAction` / `AlertDialogCancel`, etc.) → `src\shared\ui\buttons`

* Botones sueltos que no usan `asChild` → `src\shared\ui\buttons`

Ejemplo:

```tsx
<DialogTrigger asChild>
  <Button variant="primary">Abrir</Button>   {/* Button de src\shared\ui\buttons */}
</DialogTrigger>
```

### Dependencias internas de los componentes permitidos

Si un componente de "Componentes permitidos" depende de otros componentes de shadcn para funcionar, esas dependencias sí se pueden usar aunque no estén listadas explícitamente. Ejemplos:

- `Combobox` requiere `Command` (cmdk) + `popover` → permitido.
- `Date Picker` requiere `Calendar` + `popover` → permitido.

Única excepción: los botones internos, que siempre se resuelven con `src\shared\ui\buttons` (nunca `Button` de shadcn).

### Data Table
Solo se permite el patrón "Data Table" de shadcn con `@tanstack/react-table`, incluyendo paginación y sorting. **No** está permitido usar el primitivo `Table` de shadcn por sí solo ni la etiqueta `<table>` nativa de HTML

### Prohibiciones
* Prohibido instalar componentes nuevos de shadcn (vía su CLI, por ejemplo: `pnpm dlx shadcn@latest add <componente>`) distintos a los de "Componentes permitidos".

* Prohibido usar cualquier librería de UI externa (MUI, Ant Design, react-select, etc.).

### Componentes permitidos
Los componentes están agrupados en cuatro categorías dentro de `src\shared\ui\shad-cn`: `data-display`, `navigation`, `overlay` y `react-hook-form`

Cada fila indica el alias de import, definido en `tsconfig.json`. El alias es independiente de la carpeta: aunque los componentes estén anidados por categoría, el import siempre es plano (`@shad-cn/<componente>`).

| Nombre                                                         | import alias             |
| -------------------------------------------------------------- | ------------------------ |
| Accordion                                                      | `@shad-cn/accordion`     |
| Alert Dialog                                                   | `@shad-cn/alert-dialog`  |
| Calendar                                                       | `@shad-cn/calendar`      |
| Carousel                                                       | `@shad-cn/carousel`      |
| Checkbox                                                       | `@shad-cn/checkbox`      |
| Combobox                                                       | `@shad-cn/combobox`      |
| Data Table (con `@tanstack/react-table`, paginación y sorting) | `@shad-cn/data-table`    |
| Date Picker                                                    | `@shad-cn/date-picker`   |
| Dialog                                                         | `@shad-cn/dialog`        |
| Drawer                                                         | `@shad-cn/drawer`        |
| Dropdown Menu                                                  | `@shad-cn/dropdown-menu` |
| Input                                                          | `@shad-cn/input`         |
| Input Group                                                    | `@shad-cn/input-group`   |
| Label                                                          | `@shad-cn/label`         |
| Pagination                                                     | `@shad-cn/pagination`    |
| Popover                                                        | `@shad-cn/popover`       |
| Radio Group                                                    | `@shad-cn/radio-group`   |
| Select                                                         | `@shad-cn/select`        |
| Sheet                                                          | `@shad-cn/sheet`         |
| Toast (Sonner)                                                 | `@shad-cn/toast`         |
| Switch                                                         | `@shad-cn/switch`        |
| Tabs                                                           | `@shad-cn/tabs`          |
| Textarea                                                       | `@shad-cn/textarea`      |
| Tooltip                                                        | `@shad-cn/tooltip`       |

## 🧱 Configuración de Tailwind 4

[Igual que como se muestra en la documentacion](https://tailwindcss.com/blog/tailwindcss-v4#css-first-configuration)

En este proyecto se está utilizando **Tailwind CSS V4**, por lo tanto el archivo `tailwind.config.js` ya no se utiliza y se considera **obsoleto** en esta arquitectura.

La configuración de Tailwind ahora se realiza en el archivo `src/styles/global/tailwind`

Esto permite centralizar la definición de tokens de diseño (colores, media queries, etc.) sin necesidad de configuración en archivo JavaScript.

**_❌ Incorrecto - Configurar Tailwind 3 con `.js`_**

```js
/* tailwind.config.js */

module.exports = {
  theme: {
    extend: {
      colors: {
        'primary-color': 'oklch(62.8% 0.258 29.23)',
      },
    },
  },
};
```

**_✅ Correcto - Configurar Tailwind 4 con `.css`_**

```CSS
/* src/styles/global/tailwind/theme.css */

@theme {
  --color-primary-color: oklch(62.8% 0.258 29.23) ;
}
```

## 🎨 Variables de Colores Tailwind y Sass

[Documentación de variables de Tailwind 4](https://tailwindcss.com/blog/tailwindcss-v4#css-theme-variables)

Las variables con nombres de los colores de **Sass** en `src/styles/global/scss/_variable.scss` y **Tailwind** en `src/styles/global/tailwind/theme.css` deben mantener exactamente el mismo nombre y el mismo valor.

Esto garantiza que los colores sean los mismos entre los estilos globales definidos en Sass y los estilos de cada componente definidos con Tailwind.

**_✅ Ejemplo Correcto:_**

En Sass y Tailwind ambos colores tienen exactamente el mismo nombre `primary-color` y son el mismo valor con color rojo `oklch(62.8% 0.258 29.23)`

```scss
/*
src/styles/global/scss/_variable.scss

colores de Sass */
$primary-color: oklch(62.8% 0.258 29.23);
```

```CSS
/*
src/styles/global/tailwind/theme.css

colores de Tailwind */
@theme {
  --color-primary-color: oklch(62.8% 0.258 29.23) ;
}
```

**_❌ Ejemplo Incorrecto:_**

Los nombres o valores no coinciden entre Sass y Tailwind.

```scss
/*
src/styles/global/scss/_variable.scss

colores de Sass */
$primary-color: oklch(62.8% 0.258 29.23); // color rojo
```

```css
/*
src/styles/global/tailwind/theme.css

colores de Tailwind */
@theme {
  --color-brand-primary: oklch(54.6% 0.245 262.881); /* color azul */
}
```

### 🎨 Formato de Colores

Todos los colores del proyecto se definen utilizando el formato `oklch`.

**_✅ Ejemplo Correcto_**

```scss
oklch(62.8% 0.258 29.23)
```

**_❌ Ejemplo Incorrecto_**

```scss
/* Hexadecimal */
#FF0000

/* RGB */
rgb(255 0 0)

/* RGBA */
rgba(255 0 0 / 50%)

/* HSL  */
hsl(0 100% 50%)

/* HSLA */
hsla(0, 100%, 50%, 0.5)
```

### 🎨 Tailwind Custom Values

Cuando se utilicen colores mediante valores arbitrarios de Tailwind, el color también debe estar definido en formato `oklch`.

**_✅ Ejemplo Correcto_**

```tsx
<div className='bg-[oklch(62.8%_0.258_29.23)]'></div>
```

**_❌ Ejemplo Incorrecto_**

```tsx
{
  /* Hexadecimal */
}
<div className='bg-[#FF0000]'></div>;

{
  /* RGB */
}
<div className='bg-[rgb(255_0_0)]'></div>;

{
  /* RGBA */
}
<div className='bg-[rgba(255_0_0_/_50%)]'></div>;

{
  /* HSL */
}
<div className='bg-[hsl(0_100%_50%)]'></div>;

{
  /* HSLA */
}
<div className='bg-[hsla(0,_100%,_50%,_0.5)]'></div>;
```

## 🤔 ¿Cómo Usar Tailwind y Sass Juntos?

### ✅ PATRÓN CORRECTO (OBLIGATORIO)

👉 Separación estricta de responsabilidades:

- **_Sass_** para estilos globales en `src/styles/global/...`

```scss
// estilo global para tablas en src/styles/global/scss/prime-react/data/_data-table.scss
@use './variable.scss' as variable;

table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  thead,
  tfoot,
  th {
    background-color: variable.$blue-ocean;
    color: oklch(100% 0 0); /* #ffffff */
  }

  // ...
}
```

```tsx
// MyComponent.tsx

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const PRODUCTS = [
  { id: 1, name: 'Laptop', price: 2500 },
  { id: 2, name: 'Mouse', price: 50 },
];

export default function MyComponent() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Precio</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {PRODUCTS.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

- **_Tailwind_** para estilos especificos de cada componente en:

- `src/app/...`

- `src/shared/components/...`

- `src/shared/ui/...`

```tsx
// MyComponent.tsx

export default function MyComponent() {
  return <h1 className='text-center text-blue-600'>Guardar</h1>;
}
```

### 🚨 PRINCIPIO BASE (INNEGOCIABLE)

- ❌ Tailwind y Sass **NO** se mezclan en la capa de UI
- ❌ **NO** existen overrides entre Sass y Tailwind
- ❌ **NO** se resuelve con especificidad
- ❌ **NO** está permitido usar `!important` ni en Sass ni en Tailwind
- ❌ **NO** se duplican responsabilidades de estilos
- ❌ **NO** se crean estilos visuales en Sass para componentes

👉 Si esto ocurre, la arquitectura está mal diseñada.

### ❌ LOS COMPONENTES DE REACT NO PUEDEN USAR:

- `.scss`
- `.css`
- CSS Modules (`.module.scss`, `.module.css`)
- Styled Components
- `<style jsx>`
- `<style jsx global>`
- `<style>`
- `style={{}}` estilos en línea
- `import './styles.scss'` Importar archivos .scss
- `import './styles.css'` Importar archivos .css

### 🚫 En Sass global

Está prohibido:

- Estilos de UI de componentes
- Cards, layouts
- Selectores por ID para componentes
- Overrides de Tailwind
- Diseño de interfaces completas

### 🚨 ANTIPATRÓN - ERROR CRÍTICO

```tsx
// MyComponent.tsx

import styles from './MyComponent.module.scss';

export default function MyComponent() {
  return (
    <>
      <button id='btn-guardar' className='bg-red-600!'>
        Guardar
      </button>

      <div className='card'>Contenido de la card</div>

      <section className={styles.panel}>Contenido del panel</section>

      <style jsx global>{`
        .card {
          background-color: white;
          padding: 16px;
          border-radius: 8px;
          border: 1px solid oklch(92.2% 0.005 264);
        }
      `}</style>
    </>
  );
}
```

```scss
// src/styles/global/global.scss

#btn-guardar {
  background-color: blue !important;
}
```

```scss
// MyComponent.module.scss

.panel {
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid oklch(92.2% 0.005 264);
}
```

### ❌ PROHIBIDO USAR `@apply` DE TAILWIND

En estos enlaces el creador de Tailwind explica porque **NO** usar `@apply`:

- [Tutorial](https://x.com/adamwathan/status/1226511611592085504)

- [X (Twitter)](https://x.com/adamwathan/status/1559250403547652097)

Está estrictamente prohibido utilizar la directiva `@apply` de Tailwind.

Esto incluye cualquier uso dentro de archivos:

- `.css`
- `.scss`
- cualquier archivo de estilos globales o de componentes

**_❌ EJEMPLO INCORRECTO USANDO `@apply`_**

```scss
/* src/styles/global/global.scss

❌ MAL: usando Tailwind dentro de Sass/CSS con @apply */

.button {
  @apply bg-red-600 text-white px-4 py-2 rounded-lg;
}
```

```tsx
// MyComponent.tsx

export default function MyComponent() {
  return <button className='button'>Boton</button>;
}
```

## 🖼️ Ruta de Iconos e Imagenes

Debes crear las siguientes carpetas:

```txt
public/
└── assets/
    ├── icon/
    └── img/
```

**_✅ Correcto:_**

Al usar las etiquetas `<img>` nativa de HTML y `<Image>` de Next JS, siempre utilizar rutas **absolutas** desde `/assets`.

```tsx
// MyComponent.tsx

import Image from 'next/image';

export default function MyComponent() {
  return (
    <Image
      src='/assets/img/logo.png' /* usar slash al principio de /assets */
      alt='Logo'
      width={200}
      height={200}
    />
  );
}
```

**_❌ Incorrecto_**

**NO** usar rutas relativas para acceder a imágenes e iconos.

```tsx
// MyComponent.tsx

import Image from 'next/image';

export default function MyComponent() {
  return (
    <Image
      src='../../../assets/img/logo.png' /* es incorrecto porque se escribe ../ */
      alt='Logo'
      width={200}
      height={200}
    />
  );
}
```

```tsx
// MyComponent.tsx

import Image from 'next/image';

export default function MyComponent() {
  return (
    <Image
      src='assets/img/logo.png' /* es incorrecto porque NO se escribio el slash al principio de assets */
      alt='Logo'
      width={200}
      height={200}
    />
  );
}
```

### Imagenes

Las **imagenes** se tienen que guardar en `.`.

```txt
public/assets/img/...
```

Ejemplo:

```TSX
// MyComponent.tsx

import Image from 'next/image';
import { FiHome } from "react-icons/fi";

export default function MyComponent() {
  return <Image src='/assets/img/my-image.jpg' alt='image' width={50} height={50} />
}
```

### Iconos

**NO** instales otra libreria para iconos porque en este proyecto es estandar usar [React Icons](https://react-icons.github.io/react-icons/)

Dar prioridad a usar los iconos de [React Icons](https://react-icons.github.io/react-icons/). Ejemplo:

```TSX
// MyComponent.tsx

import { FiHome } from "react-icons/fi";

export default function MyComponent() {
  return <FiHome />
}
```

No agregar imágenes/SVGs manualmente si el icono ya existe en [React Icons](https://react-icons.github.io/react-icons/)

Cuando el icono no este en [React Icons](https://react-icons.github.io/react-icons/), entonces agregarlo dentro de la carpeta `public/assets/icon/...`.

Los **iconos** del proyecto se deben guardar dentro de la carpeta

```txt
public/assets/icon/...
```

Ejemplo:

```TSX
// MyComponent.tsx

import Image from 'next/image';
import { FiHome } from "react-icons/fi";

export default function MyComponent() {
  return <Image src='/assets/icon/icon.jpg' alt='icono' width={50} height={50} />
}
```

## 🔘 Estilos Globales para Botones

Está guía de estilos para botones está basada en:

- [Arquitectura de Bootstrap 5.3 para botones](https://getbootstrap.com/docs/5.3/components/buttons/)

- [Tailwind 4 font-size](https://tailwindcss.com/docs/font-size)

- [Tailwind 4 line-height](https://tailwindcss.com/docs/line-height)

- [Tailwind 4 padding](https://tailwindcss.com/docs/padding)


**❌ Incorrecto:**

Usar etiquetas `<img>` para iconos porque las imágenes no se integran correctamente con la arquitectura CSS de los botones y dificultan aplicar estilos dinámicos como:

- `color`
- `hover`
- `active`
- `disabled`
- `font-size`
- dark mode

Esto rompe la consistencia visual y vuelve el código más difícil de mantener y escalar.

```tsx
<button>
  <img src='/assets/icon/delete.svg' alt='Eliminar' />
</button>
```

Por ejemplo, para intentar cambiar color, tamaño o estados visuales de imágenes `<img>`, normalmente se termina recurriendo a hacks visuales con CSS, lo cual es mala práctica:

```SCSS
// cambiar tamaño de imagen
button {
  img {
    display: inline-block;
    width: 20px;
    height: 20px;
  }
}
```

```SCSS
// cambiar color de imagen
img {
  filter: brightness(0) saturate(100%) invert(100%);
}
```

```SCSS
// Recortar la imagen usando la forma del SVG
img {
  mask-image: url(icon.svg);
}
```

```SCSS
// Hacer imagen semitransparente al pasar el mouse
button {
  &:hover {
    img {
      opacity: 0.5;
    }
  }
}
```

Esto genera:

- Son difíciles de mantener.
- Generan inconsistencias visuales.
- Complican los estilos para los estados del botón.
- Rompen fácilmente en dark mode.
- Vuelven el CSS más complejo y frágil.

**✅ Correcto:**

Los iconos de los botones deben utilizar [React Icons](https://react-icons.github.io/react-icons/)

[React Icons](https://react-icons.github.io/react-icons/) funcionan como texto estilizable mediante CSS, lo que permite integrarlos correctamente con la arquitectura visual del proyecto.

```tsx
import { MdArrowForward } from 'react-icons/md';

export default function MyComponent() {
  return (
    <button className='btn btn-primary btn-outline btn-icon-only btn-rounded-full btn-shadow'>
      <MdArrowForward />
    </button>
  );
}
```

**❌ Incorrecto:**

Usar Tailwind CSS para definir estilos de botones directamente en cada componente, ya que esto genera estilos inconsistentes y no escalables:

```tsx
<button className='rounded-2xl bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white disabled:cursor-not-allowed enabled:cursor-pointer'>
  Aceptar
</button>
```

Mezclar las clases globales de botones (`.btn`, `.btn-primary`, `.btn-outline-*`, etc.) con clases de Tailwind CSS.

```tsx
import { MdSave } from 'react-icons/md';

export default function MyComponent() {
  return (
    <button className='btn btn-primary bg-red-500 px-10 rounded-full'>
      <MdSave />
      <span className='text-blue-500'>Guardar</span>
    </button>
  );
}
```

Usar muchas clases de Sass para cada uno de los estilos de los botones, porque mezcla múltiples responsabilidades en una sola clase:

- Icono
- Texto
- Borde

```tsx
import { MdHome } from 'react-icons/md';

export default function MyComponent() {
  return (
    <button className='btn-with-icon-text-border'>
      <MdHome />
      <span>Boton</span>
    </button>
  );
}
```

Ese enfoque no escala bien, ya que cada nueva combinación obliga a crear más clases:

```SCSS
.btn-with-icon-text-border-loading {}
.btn-with-icon-text-background-lg {}
.btn-with-icon-text-border-disabled {}
```

Esto genera:

- Archivos Sass enormes y difíciles de mantener.
- Duplicación innecesaria de código.
- Inconsistencias visuales.
- Dificultad para reutilizar un estándar de diseño.

**✅ Correcto:**

Las clases de botones deben representar una sola responsabilidad y ser **composables**.

En arquitectura CSS y de componentes, composable significa que una clase puede combinarse con otras clases pequeñas y reutilizables para construir distintos comportamientos sin duplicar código.

Cada clase modifica únicamente una característica específica del botón. Esto permite combinar comportamientos sin duplicar estilos:

| Archivo              | Descripción                                                                                                                                                                  | Ejemplo de código                                                |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `index-buttons.scss` | Archivo orquestador. Importa todos los módulos SCSS mediante `@use`. No debe contener estilos CSS, variables ni lógica visual.                                               | `@use "./base.scss";`                                            |
| `_base.scss`         | Define la estructura base del sistema de botones: reset CSS, layout, alineación, box model y estilos fundamentales de `.btn`. Todas las variantes parten de esta clase base. | `.btn {} `                                                       |
| `_variants.scss`     | Define la apariencia principal del botón (fondo, borde y comportamiento visual). Las variantes pueden combinarse con cualquier tema, tamaño o modificador.                   | `.btn-background {} .btn-outline {} .btn-ghost {} .btn-link {} ` |
| `_themes.scss`       | Define los temas de color mediante CSS Custom Properties. Cada tema establece los colores utilizados por las variantes (`solid`, `outline`, `ghost`, etc.).                  | `.btn-primary {} .btn-secondary {} .btn-success {} `             |
| `_sizes.scss`        | Define la escala de tamaños del botón mediante `padding`, `font-size` y `line-height`. Puede combinarse con cualquier variante o tema.                                       | `.btn-xs {} .btn-sm {} .btn-base {} .btn-lg {} `                 |
| `_states.scss`       | Define los estados interactivos y de accesibilidad del botón. Centraliza comportamientos relacionados con `focus-visible`, `hover`, `active` y `disabled`.                   |                                                                  |
| `_effects.scss`      | Contiene utilidades visuales reutilizables independientes de la lógica del botón. Permite agregar efectos opcionales como sombras, blur o elevación.                         | `.btn-shadow {} `                                                |
| `_modifiers.scss`    | Clases composables que alteran o extienden características específicas del botón sin modificar su variante principal.                                                        | `.btn-full-width {} .btn-rounded-full {} .btn-icon-only {}`      |
| `_mixins.scss`       | Codigo de Sass reutilizable que se repite en diferentes archivos de src\styles\global\buttons                                                                                | `@mixin btn-base-size {}`                                        |
| `_tokens.scss`       | Variables globales de Sass utilizadas por todo el sistema de botones. Centraliza colores, tamaños tipográficos y escalas de espaciado para mantener consistencia visual.     | `$primary: oklch(...);`                                          |

### 📖 Manual de Uso para Dar Estilos a Botones

Esta guía explica cómo utilizar correctamente los estilos globales de botones definidos en:

```txt
src/styles/global/buttons
```

### ✨ UI/UX

En el diseño de interfaces (UI/UX), el color de un botón no es solo decorativo:
cada variante representa una intención de acción dentro del sistema.

Esto ayuda al usuario a entender rápidamente qué va a ocurrir antes de hacer clic.

**🔴 Los colores fuertes:**

- Capturan atención.
- Indican importancia.
- El usuario lo identifica como el botón más importante para hacer clic.

**⚪ Los colores suaves o transparentes:**

- Reducen distracción.
- Bajan la jerarquía visual.
- Mantienen el foco en el contenido principal.

**📏 Reglas de UI/UX**

- Solo debe existir 1 acción primaria por pantalla (colores fuertes).
- Las acciones secundarias deben tener menor jerarquía visual (colores suaves).
- Las acciones destructivas deben ser claramente identificables.
- El color no es decoración, es comunicación.

### Clase `.btn` con Estilos Base

La clase `.btn` define los estilos base y actúa como un **reset CSS obligatorio para todos los botones**, sin importar su variante o tipo (`primary`, `outline`, `ghost`, etc.).

Esta clase **siempre debe utilizarse**, ya que establece la estructura común del componente y garantiza consistencia en toda la UI.

Incluye estilos fundamentales como `padding`, `font-size`, alineación del contenido, comportamiento de interacción (`hover`, `active`, `disabled`) y configuración de layout.

Por defecto, `.btn` tiene `background-color: transparent`, por lo que **no representa un botón visual completo por sí sola**. Su función es servir como base para que las variantes (`.btn-primary`, `.btn-outline-*`, etc.) apliquen el estilo visual final.

- Botones **activados** usan `cursor: pointer` 👆🏻 para indicar que el botón es interactivo y puede ser clickeado.

- Botones **desactivados** usan `cursor: not-allowed` 🚫 para indicar que el botón no está disponible y no puede ser clickeado.

```tsx
<button className='btn'>Base class</button>
```

### Enlaces

`btn btn-link` define los estilos para los enlaces para `<a>`, `<button>` y `<Link>` de Next.js

![enlaces](./docs/readme-md/img/button/enlaces.png)

```tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MyComponent() {
  const router = useRouter();

  const onClickNavigation = (): void => {
    router.push('/home');
  };

  return (
    <>
      <Link href='/home' className='btn btn-link'>
        Ir a home
      </Link>

      <button className='btn btn-link' onClick={onClickNavigation}>
        Ir a home
      </button>

      <button disabled className='btn btn-link' onClick={onClickNavigation}>
        Ir a home
      </button>

      <a
        className='btn btn-link'
        href='https://www.google.com'
        target='_blank'
        rel='noopener noreferrer'
      >
        Ir a Google
      </a>
    </>
  );
}
```

### Botones con Color de Fondo

`btn-background` agrega color de fondo al boton.

En sistemas de diseño modernos, los botones se clasifican según su nivel de importancia y riesgo de la acción:

| Tipo de boton    | Significado                                                    |
| ---------------- | -------------------------------------------------------------- |
| 🔵 **Primary**   | acción principal (continuar / confirmar / guardar)             |
| ⚪ **Secondary** | acción secundaria (cancelar / salir)                           |
| 👻 **Ghost**     | acción discreta sin estructura visual fuerte - no tiene border |
| 🔴 **Danger**    | eliminar o destruir                                            |
| 🟡 **Warning**   | advertencia                                                    |
| 🟢 **Success**   | confirmación positiva                                          |
| 🔷 **Info**      | información                                                    |
| 🔗 **Link**      | navegación / enlaces                                           |
| ⚫ **Dark**      | variante de alto contraste para acciones neutras o de soporte  |

![variantes-con-color-de-fondo](./docs/readme-md/img/button/variantes-con-color-de-fondo.png)

```tsx
<button className="btn btn-primary btn-background">Primary</button>
<button className="btn btn-secondary btn-background">Secondary</button>
<button className="btn btn-success btn-background">Success</button>
<button className="btn btn-danger btn-background">Danger</button>
<button className="btn btn-warning btn-background">Warning</button>
<button className="btn btn-info btn-background">Info</button>
<button className="btn btn-light btn-background">Light</button>
<button className="btn btn-dark btn-background">Dark</button>
```

### Botones con Borde + Texto

Las clases `.btn-outline-*` se usan para botones que tienen `border`, pero no color de fondo `background-color` por defecto.

El comportamiento visual depende del estado de interacción:

- **Estado normal (sin `hover`)** → sin fondo `background-color: transparent` y se muestra únicamente el `border`.

- **Estado `hover`** → botón cambia su `background-color` dependiendo del tipo de botón.

Algunos botones usan colores claros en el texto o borde, por lo que deben colocarse sobre fondos oscuros para mantener un buen contraste y asegurar que sean claramente visibles.

![borde-con-texto](./docs/readme-md/img/button/borde-con-texto.png)

```tsx
<button className="btn btn-primary btn-outline">Primary</button>
<button className="btn btn-secondary btn-outline">Secondary</button>
<button className="btn btn-success btn-outline">Success</button>
<button className="btn btn-danger btn-outline">Danger</button>
<button className="btn btn-warning btn-outline">Warning</button>
<button className="btn btn-info btn-outline">Info</button>
<button className="btn btn-light btn-outline">Light</button>
<button className="btn btn-dark btn-outline">Dark</button>
```

### Botones con sombra

`btn-shadow` agrega una sombra a cualquier variante de botón, sin importar su estilo (fondo, borde o ghost).

![botones-con-sombra](./docs/readme-md/img/button/botones-con-sombra.png)

```tsx
import { MdWarning, MdCheckCircle, MdDelete, MdInfo, MdArrowForward } from 'react-icons/md';

export default function MyComponent() {
  return (
    <>
      {/* sombra + fondo + texto */}
      <button className='btn btn-primary btn-background btn-shadow'>Primary</button>

      {/* sombra + texto */}
      <button className='btn btn-secondary btn-ghost btn-shadow'>Secondary</button>

      {/* sombra + borde + texto */}
      <button className='btn btn-success btn-outline btn-shadow'>Success</button>

      {/* sombra + bordes redondeados + icono + fondo */}
      <button className='btn btn-warning btn-background btn-icon-only btn-shadow'>
        <MdWarning />
      </button>

      {/* sombra + bordes redondeados + icono + borde */}
      <button className='btn btn-success btn-outline btn-icon-only btn-shadow'>
        <MdCheckCircle />
      </button>

      {/* sombra + borde + btn-rounded-full forma de circulo + icono */}
      <button className='btn btn-outline btn-danger btn-icon-only btn-rounded-full btn-shadow'>
        <MdDelete />
      </button>

      {/* sombra + btn-rounded-full forma de circulo + icono */}
      <button className='btn btn-ghost btn-info btn-icon-only btn-rounded-full btn-shadow'>
        <MdInfo />
      </button>

      {/* sombra + icono + fondo + texto */}
      <button className='btn btn-primary btn-background btn-shadow'>
        <MdArrowForward />
        <span>Primary</span>
      </button>

      {/* sombra + icono + fondo + texto + boton redondo */}
      <button className='btn btn-info btn-background btn-rounded-full btn-shadow'>
        <MdInfo />
        <span>Info</span>
      </button>
    </>
  );
}
```

### Botones con Icono

Es obligatorio que, cuando el botón contenga únicamente un icono (sin texto), se utilicen las clases `btn` y `btn-icon-only`

![solo-icono](./docs/readme-md/img/button/solo-icono.png)

```tsx
import { MdWarning, MdDelete, MdSettings, MdInfo, MdArrowForward } from 'react-icons/md';

export default function MyComponent() {
  return (
    <>
      {/* bordes redondeados */}
      <button className='btn btn-warning btn-background btn-icon-only'>
        <MdWarning />
      </button>

      {/* btn-rounded-full forma de circulo */}
      <button className='btn btn-outline btn-danger btn-icon-only btn-rounded-full'>
        <MdDelete />
      </button>

      <button className='btn btn-ghost btn-dark btn-icon-only btn-rounded-full'>
        <MdSettings />
      </button>

      {/* xs boton muy pequeño */}
      <button className='btn btn-info btn-background btn-icon-only btn-rounded-full btn-xs'>
        <MdInfo />
      </button>

      {/* 2xl boton muy grande*/}
      <button className='btn btn-primary btn-background btn-icon-only btn-rounded-full btn-2xl'>
        <MdArrowForward />
      </button>
    </>
  );
}
```

### Botones con Icono + Fondo

![icono-fondo](./docs/readme-md/img/button/icono-fondo.png)

```tsx
import {
  MdArrowForward,
  MdClose,
  MdCheckCircle,
  MdDelete,
  MdWarning,
  MdInfo,
  MdLightMode,
  MdDarkMode,
} from 'react-icons/md';

export default function MyComponent() {
  return (
    <>
      <button className='btn btn-primary btn-background btn-icon-only'>
        <MdArrowForward />
      </button>

      <button className='btn btn-secondary btn-background btn-icon-only'>
        <MdClose />
      </button>

      <button className='btn btn-success btn-background btn-icon-only'>
        <MdCheckCircle />
      </button>

      <button className='btn btn-danger btn-background btn-icon-only'>
        <MdDelete />
      </button>

      <button className='btn btn-warning btn-background btn-icon-only'>
        <MdWarning />
      </button>

      <button className='btn btn-info btn-background btn-icon-only'>
        <MdInfo />
      </button>

      <button className='btn btn-light btn-background btn-icon-only'>
        <MdLightMode />
      </button>

      <button className='btn btn-dark btn-background btn-icon-only'>
        <MdDarkMode />
      </button>
    </>
  );
}
```

### Botones con Borde + Icono

![icono-borde](./docs/readme-md/img/button/icono-borde.png)

```tsx
import {
  MdArrowForward,
  MdClose,
  MdCheckCircle,
  MdDelete,
  MdWarning,
  MdInfo,
  MdLightMode,
  MdDarkMode,
} from 'react-icons/md';

export default function MyComponent() {
  return (
    <>
      <button className='btn btn-primary btn-outline btn-icon-only'>
        <MdArrowForward />
      </button>

      <button className='btn btn-secondary btn-outline btn-icon-only'>
        <MdClose />
      </button>

      <button className='btn btn-success btn-outline btn-icon-only'>
        <MdCheckCircle />
      </button>

      <button className='btn btn-danger btn-outline btn-icon-only'>
        <MdDelete />
      </button>

      <button className='btn btn-warning btn-outline btn-icon-only'>
        <MdWarning />
      </button>

      <button className='btn btn-info btn-outline btn-icon-only'>
        <MdInfo />
      </button>

      <button className='btn btn-light btn-outline btn-icon-only'>
        <MdLightMode />
      </button>

      <button className='btn btn-dark btn-outline btn-icon-only'>
        <MdDarkMode />
      </button>
    </>
  );
}
```

### Botones con Icono + Fondo + Texto

![icono-fondo-texto](./docs/readme-md/img/button/icono-fondo-texto.png)

```tsx
import {
  MdArrowForward,
  MdClose,
  MdCheckCircle,
  MdDelete,
  MdWarning,
  MdInfo,
  MdLightMode,
  MdDarkMode,
} from 'react-icons/md';

export default function MyComponent() {
  return (
    <>
      <button className='btn btn-primary btn-background'>
        <MdArrowForward />
        <span>Primary</span>
      </button>

      <button className='btn btn-secondary btn-background'>
        <MdClose />
        <span>Secondary</span>
      </button>

      <button className='btn btn-success btn-background'>
        <MdCheckCircle />
        <span>Success</span>
      </button>

      <button className='btn btn-danger btn-background'>
        <MdDelete />
        <span>Danger</span>
      </button>

      <button className='btn btn-warning btn-background'>
        <MdWarning />
        <span>Warning</span>
      </button>

      <button className='btn btn-info btn-background'>
        <MdInfo />
        <span>Info</span>
      </button>

      <button className='btn btn-light btn-background'>
        <MdLightMode />
        <span>Light</span>
      </button>

      <button className='btn btn-dark btn-background'>
        <MdDarkMode />
        <span>Dark</span>
      </button>
    </>
  );
}
```

### Botones Redondos

`btn-rounded-full` redondea al maximo las esquinas de cualquier tipo de boton

| Tipo de botón | Condición (dimensiones) | Resultado visual                                 |
| ------------- | ----------------------- | ------------------------------------------------ |
| Rectangular   | width ≠ height          | Esquinas totalmente redondeadas (forma alargada) |
| Cuadrado      | width = height          | Círculo perfecto (no óvalo)                      |

![botones-redondos](./docs/readme-md/img/button/botones-redondos.png)

```tsx
import { MdInfo, MdDelete, MdWarning, MdCheckCircle } from 'react-icons/md';

export default function MyComponent() {
  return (
    <>
      <button className='btn btn-primary btn-background btn-rounded-full'>Primary</button>

      <button className='btn btn-secondary btn-outline btn-rounded-full'>Secondary</button>

      <button className='btn btn-info btn-background btn-rounded-full'>
        <MdInfo />
        <span>Info</span>
      </button>

      <button className='btn btn-outline btn-danger btn-icon-only btn-rounded-full'>
        <MdDelete />
      </button>

      <button className='btn btn-background btn-warning btn-icon-only btn-rounded-full'>
        <MdWarning />
      </button>

      {/* SIN btn-rounded-full tiene esquinas redondeadas */}
      <button className='btn btn-background btn-success btn-icon-only'>
        <MdCheckCircle />
      </button>
    </>
  );
}
```

### Botones sin Fondo ni Borde

`btn-ghost` tiene las siguientes características:

- **Fondo:** transparente.
- **Borde:** inexistente.
- **Color:** usa los mismos colores de las variantes (primary, secondary, success, etc).
- **Hover:** Cambia color de fondo al situar mouse en boton.
- **Uso:** acciones secundarias o discretas.

**_NO hover_**

![botones-sin-fondo-ni-borde](./docs/readme-md/img/button/botones-sin-fondo-ni-borde.png)

**_hover_**

![botones-sin-fondo-ni-borde-hover](./docs/readme-md/img/button/botones-sin-fondo-ni-borde-hover.png)

```tsx
import { MdClose, MdWarning } from 'react-icons/md';

export default function MyComponent() {
  return (
    <>
      <button className='btn btn-primary btn-ghost'>Primary</button>

      <button className='btn btn-secondary btn-ghost'>
        <MdClose />
        <span>Secondary</span>
      </button>

      <button className='btn btn-warning btn-ghost btn-icon-only btn-rounded-full'>
        <MdWarning />
      </button>
    </>
  );
}
```

### 🚫 Boton desactivado `cursor: not-allowed`

Agregar el atributo booleano de HTML `disabled` a la etiqueta `<button>` hace que los botones tomen estilos de desactivados.

El estilo de boton desactivado se aplica a cualquier tipo de boton.

![boton-desactivado](./docs/readme-md/img/button/boton-desactivado.png)

```tsx
'use client';

import { MdDelete, MdWarning, MdInfo, MdDarkMode } from 'react-icons/md';

export default function MyComponent() {
  const router = useRouter();

  const onClickNavigation = (): void => {
    router.push('/home');
  };

  return (
    <>
      <button disabled className='btn btn-primary btn-background'>
        Primary
      </button>

      <button disabled className='btn btn-secondary btn-outline'>
        Secondary
      </button>

      <button disabled className='btn btn-icon-only btn-outline btn-danger btn-rounded-full'>
        <MdDelete />
      </button>

      <button disabled className='btn btn-icon-only btn-warning btn-background'>
        <MdWarning />
      </button>

      <button disabled className='btn btn-icon-only btn-outline btn-info'>
        <MdInfo />
      </button>

      <button disabled className='btn btn-dark btn-background'>
        <MdDarkMode />
        <span>Dark</span>
      </button>

      {/* Enlaces */}
      <button disabled className='btn btn-link' onClick={onClickNavigation}>
        Ir a home
      </button>
    </>
  );
}
```

### 📐 Tamaños

Puedes modificar el tamaño de cualquier variante de botón, sin importar su estilo (fondo, borde o ghost).

El ajuste de tamaño se aplica a todo el boton y afecta de manera proporcional a todos sus elementos internos:

- Tamaño del botón `padding`.

- Tamaño del texto `font-size`.

- Tamaño de los iconos.

- El espacio entre el icono y el texto `gap` es proporcional al tamaño del botón, ya que utiliza la unidad de medida `em`, la cual depende del `font-size` del propio botón.

El tamaño por defecto de todos los botones es `.btn-base`:

Esto significa que no es necesario declararlo explícitamente: si no se especifica un modificador de tamaño, el botón siempre asumirá este estilo automáticamente.

```SCSS
.btn-base {
  padding: 0.5rem 1rem;         // py-2 = 0.5rem = 8px, px-3 = 0.75rem = 12px

  font-size: 1rem;              // text-base = 1rem = 16px
  line-height: calc(1.2 / 1);   // (line-height que se desea aplicar / font-size)
}
```

![tamanos](./docs/readme-md/img/button/tamanos.png)

```tsx
import { MdCheckCircle, MdDelete, MdWarning, MdRocketLaunch } from 'react-icons/md';

export default function MyComponent() {
  return (
    <>
      <button className='btn btn-primary btn-background btn-xs'>Muy pequeño</button>

      <button className='btn btn-secondary btn-outline btn-sm'>Pequeño</button>

      <button className='btn btn-secondary btn-outline'>Valor por defecto</button>

      <button className='btn btn-secondary btn-outline btn-base'>Valor por defecto</button>

      <button className='btn btn-success btn-background btn-lg'>
        <MdCheckCircle />
        <span>Grande</span>
      </button>

      <button className='btn btn-danger btn-outline btn-xl'>
        <MdDelete />
        <span>Muy grande</span>
      </button>

      <button className='btn btn-warning btn-background btn-2xl'>
        <MdWarning />
        <span>Enorme</span>
      </button>

      <button className='btn btn-info btn-background btn-3xl'>
        <MdRocketLaunch />
        <span>Gigante</span>
      </button>
    </>
  );
}
```

### Modificadores - Boton en Bloque - Responsive

En CSS un elemento en bloque es aquel que ocupa todo el ancho disponible de su contenedor y siempre inicia en una nueva línea ("renglon")

```SCSS
.block {
  display: block;
}
```

```SCSS
.flex {
  display: flex;
}
```

`btn-full-width` convierte el boton a elemento en bloque, hace que el boton ocupe todo al ancho disponible de su contenedor padre y es responsive

Funciona para cualquier variante de botón, sin importar su estilo (fondo, borde o ghost).

![boton-responsive](./docs/readme-md/img/button/boton-responsive.png)

```tsx
import { MdDarkMode, MdCheckCircle, MdInfo, MdArrowForward } from 'react-icons/md';

export default function MyComponent() {
  return (
    <>
      {/* solo texto */}
      <button className='btn btn-danger btn-background btn-full-width'>Danger</button>

      {/* solo icono + fondo */}
      <button className='btn btn-dark btn-background btn-icon-only btn-full-width'>
        <MdDarkMode />
      </button>

      {/* icono + fondo + texto */}
      <button className='btn btn-success btn-background btn-full-width'>
        <MdCheckCircle />
        <span>Success</span>
      </button>

      {/* icono + borde */}
      <button className='btn btn-outline btn-info btn-icon-only btn-full-width'>
        <MdInfo />
      </button>

      {/* sin fondo ni borde */}
      <button className='btn btn-primary btn-icon-only btn-ghost btn-full-width'>
        <MdArrowForward />
      </button>
    </>
  );
}
```

### Ubicación de Iconos y Texto en Botones

**❌ Incorrecto:**

Usar [flex-direction](https://tailwindcss.com/docs/flex-direction) para cambiar ubicacion de iconos:

```tsx
import { MdArrowForward } from 'react-icons/md';

export default function MyComponent() {
  return (
    <button className='btn btn-primary btn-background flex-row-reverse'>
      <MdArrowForward />
      <span>Primary</span>
    </button>
  );
}
```

**✅ Correcto:**

Cambiar la ubicación del icono y texto en el HTML, sin usar Sass ni Tailwind.

_icono a la izquierda - texto a la derecha_

![icono-izquierda-texto-derecha](./docs/readme-md/img/button/icono-izquierda-texto-derecha.png)

```tsx
import { MdArrowForward } from 'react-icons/md';

export default function MyComponent() {
  return (
    <button className='btn btn-primary btn-background'>
      <MdArrowForward />
      <span>Primary</span>
    </button>
  );
}
```

_icono a la derecha - texto a la izquierda_

![icono-derecha-texto-izquierda](./docs/readme-md/img/button/icono-derecha-texto-izquierda.png)

```tsx
import { MdArrowForward } from 'react-icons/md';

export default function MyComponent() {
  return (
    <button className='btn btn-primary btn-background'>
      <span>Primary</span>
      <MdArrowForward />
    </button>
  );
}
```

