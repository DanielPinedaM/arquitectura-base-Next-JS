/* Calendario de shad cn — Barrel Export (unico punto de entrada publico del modulo)

Queda prohibido utilizar instancias de new Date()

Aclaracion:
internamente, react-day-picker usa new Date()
que se usa porque es una dependencia de DayPicker,
pero siempre las fechas de react-day-picker se transforman a Luxon

REGLAS OBLIGATORIAS:
1) Deben ser de tipo Luxon (DateTime):
a) Todas las props que recibe este componente
b) El valor que retorna este componente

2) PROHIBIDO usar funciones experimentales como dateLib

3) OBLIGATORIO usar Barrel Exports

4) Por cada tipo de node_modules/react-day-picker que use Date (ej. Matcher, Formatters, Labels,
   CustomComponents, CalendarDay, CalendarWeek, CalendarMonth, DateRange, etc.), debe existir un
   tipo equivalente propio del proyecto que use DateTime de Luxon en su lugar, replicando la misma
   forma/estructura (misma cantidad de campos o parámetros, mismo propósito), pero con Date
   reemplazado por DateTime en cada posición donde aparezca.

5) PROHIBIDO usar `any`. Usar tipado estricto.
   Para determinar el tipo correcto de cualquier prop, parámetro o valor de retorno relacionado con
   react-day-picker, está PROHIBIDO adivinar el tipo o usar uno genérico/aproximado. Es OBLIGATORIO
   abrir e inspeccionar los archivos de definición de tipos reales dentro de
   node_modules/react-day-picker (ej. dist/cjs/types/*.d.ts o la ruta que corresponda a la versión
   instalada) y citar la ruta y línea exacta de donde se obtuvo el tipo, antes de usarlo en el código.
   Si no encuentras el tipo exportado directamente, repórtalo explícitamente en vez de reemplazarlo
   por `any` o `unknown` sin justificar.

6) PROHIBIDO modificar node_modules

7) PROHIBIDO actualizar react-day-picker@10.0.1 porque puede dañar el componente de calendario

Estructura del modulo:
- types.ts               → tipos publicos e internos migrados a Luxon
- converters.tsx         → funciones traductoras Luxon <-> Date (frontera con react-day-picker)
- calendar.tsx           → componente principal Calendar
- calendar-day-button.tsx → componente CalendarDayButton (DayButton por defecto) */

'use client';

export { Calendar } from './calendar';
export { CalendarDayButton } from './calendar-day-button';
export type {
  CalendarProps,
  CalendarDateProps,
  CalendarEventProps,
  CalendarSelectionProps,
  CalendarCustomizationProps,
  DateTimeRange,
  LuxonMatcher,
  LuxonDayEventHandler,
  LuxonMonthChangeHandler,
  LuxonOnSelectHandler,
  LuxonFormatters,
  LuxonLabels,
  LuxonCustomComponents,
  LuxonCalendarDay,
  LuxonCalendarWeek,
  LuxonCalendarMonth,
} from './types';
