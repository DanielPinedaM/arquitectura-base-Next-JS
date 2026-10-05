# Descripción del Proyecto
Arquitectura base agnóstica a las features para iniciar un nuevo proyecto en Next.js, configurada para trabajar con IA

# Ejecución de Proyecto

* Runtime: Node.js 24
* Administrador de versiones: fnm
* Manejador de paquetes: pnpm
* Archivo de bloqueo: pnpm-lock.yaml

# Ante Cualquier Error o Ambigüedad
Si encuentras un error, inconsistencia, duda o ambigüedad, detente y pregúntame antes de modificar código. No asumas ni deduzcas implementaciones.

**Razón**: una suposición incorrecta genera código que después hay que revisar y deshacer; preguntar cuesta menos que corregir una implementación equivocada.

# Reglas **OBLIGATORIAS** de Next.js
Antes de editar código y responder, consulta solo las fuentes cuya columna **¿Cuándo leerlo?** coincida con la tarea, y aplica a la vez las reglas y la documentación consultadas.

Cuando las fuentes se contradicen, gana la de número menor en la columna **Prioridad**:

| Prioridad | Fuente | ¿Qué es? | ¿Cuándo leerlo? |
| --- | --- | --- | --- |
| 1 | [Skill `next-conventions`](.agents/skills/next-conventions/SKILL.md) | Reglas propias del proyecto | Antes de crear, mover, modificar o revisar código, y al responder cómo se hace algo en este proyecto. |
| 2 | [Skill `vercel-react-best-practices`](.agents/skills/vercel-react-best-practices/) | Reglas de terceros: rendimiento de React y Next.js (Vercel) | Al crear, modificar o revisar componentes, páginas u obtención de datos, y al optimizar el rendimiento o el bundle. |
| 3 | [Skill `next-docs`](.agents/skills/next-docs/) | Documentación oficial completa (`nextjs.org/docs`) | Al responder sobre APIs de Next.js, al usar una API que aún no esté en el código (aunque creas conocerla) y ante errores de build. Respeta sus avisos de deprecación. |
| 4 | Datos de entrenamiento | Tu conocimiento previo | Puedes usarlo, pero las fuentes anteriores tienen prioridad: este proyecto usa Next.js 16, cuyos breaking changes pueden haberlo dejado desactualizado. Que esté desactualizado no significa que esté mal; solo que puede no aplicar a esta versión. |

# Resumen de la Skill `next-conventions`

## Formularios
* Usar React Hook Form junto con `import { zodResolver } from '@hookform/resolvers/zod'` para validar formularios y los componentes UI de formularios de Shad cn ubicados en `src\shared\ui\shad-cn\react-hook-form`

* Para botones y enlaces, usar los componentes que estan en `src/shared/ui/buttons`. **PROHIBIDO** usar directamente las etiquetas nativas de HTML `<a>` y `<button>`, o `next/link`, sin estos componentes.

* **PROHIBIDO**  usar alternativas a React Hook Form: formularios controlados manualmente con `useState`/`useReducer`, Formik, o manejo de `onChange`/`onSubmit` sin pasar por `useForm`

* **PROHIBIDO** usar alternativas a `zodResolver`/Zod para validar formularios: reglas de validación nativas del navegador (`required`, `pattern` en el TSX), lógica de validación manual/imperativa dentro de handlers, `yupResolver`, `joiResolver`, class-validator, o validator functions custom sin Zod

* Los Zod schema tienen que estar dentro de un archivo `.schema.ts` dentro de la carpeta padre del componente al que pertenece cada validación de formulario

## Gestión de Estado
* Mantén las transformaciones de estado puras y predecibles

* Para estados globales usar Zustand, **PROHIBIDO** usar alternativas como Redux, `useContext`, etc.
