/* Tipos del Calendario de shad cn migrados a Luxon (DateTime)

Por cada tipo de node_modules/react-day-picker que use Date (ej. Matcher, Formatters, Labels,
CustomComponents, CalendarDay, CalendarWeek, CalendarMonth, DateRange, etc.), existe aqui un
tipo equivalente propio del proyecto que usa DateTime de Luxon en su lugar, replicando la misma
forma/estructura (misma cantidad de campos o parametros, mismo proposito), pero con Date
reemplazado por DateTime en cada posicion donde aparezca. */

import type * as React from 'react';
import type { CustomComponents, DateRange, Modifiers, PropsBase } from 'react-day-picker';
import type { DateTime } from 'luxon';

import type { Button } from '@shad-cn/button';

// Rango de fechas expresado con DateTime de Luxon (equivalente al DateRange nativo de
// react-day-picker, que internamente usa Date).
type DateTimeRange = { from: DateTime | undefined; to?: DateTime | undefined };

// Matchers de dias expresados con DateTime de Luxon (equivalen a los Matcher de react-day-picker,
// que internamente usan Date). Nota: en dayOfWeek los indices siguen la convencion nativa
// getDay() (0 = domingo ... 6 = sabado) porque son numeros, no fechas.
type LuxonDateBefore = { before: DateTime };
type LuxonDateAfter = { after: DateTime };
type LuxonDateInterval = { before: DateTime; after: DateTime };
type LuxonDayOfWeek = { dayOfWeek: number | number[] };
type LuxonMatcher =
  | boolean
  | ((date: DateTime) => boolean)
  | DateTime
  | DateTime[]
  | DateTimeRange
  | LuxonDateBefore
  | LuxonDateAfter
  | LuxonDateInterval
  | LuxonDayOfWeek;

// Props de navegacion y matchers del Calendar, migradas a DateTime de Luxon.
// Toda la superficie de fechas de la interfaz publica trabaja con Luxon; la conversion a Date
// nativo ocurre unicamente en la frontera con react-day-picker.
type CalendarDateProps = {
  defaultMonth?: DateTime;
  month?: DateTime;
  today?: DateTime;
  startMonth?: DateTime;
  endMonth?: DateTime;
  disabled?: LuxonMatcher | LuxonMatcher[];
  hidden?: LuxonMatcher | LuxonMatcher[];
  modifiers?: Record<string, LuxonMatcher | LuxonMatcher[] | undefined>;
};

// Event handlers de dias/meses expresados con DateTime de Luxon (equivalen a DayEventHandler y
// MonthChangeEventHandler de react-day-picker, que exponen Date). Asi ninguna prop publica expone Date.
type LuxonDayEventHandler<E> = (date: DateTime, modifiers: Modifiers, e: E) => void;
type LuxonMonthChangeHandler = (month: DateTime) => void;

type CalendarEventProps = {
  onDayClick?: LuxonDayEventHandler<React.MouseEvent>;
  onDayFocus?: LuxonDayEventHandler<React.FocusEvent>;
  onDayBlur?: LuxonDayEventHandler<React.FocusEvent>;
  onDayKeyDown?: LuxonDayEventHandler<React.KeyboardEvent>;
  onDayMouseEnter?: LuxonDayEventHandler<React.MouseEvent>;
  onDayMouseLeave?: LuxonDayEventHandler<React.MouseEvent>;
  onMonthChange?: LuxonMonthChangeHandler;
  onNextClick?: LuxonMonthChangeHandler;
  onPrevClick?: LuxonMonthChangeHandler;
};

// Variantes de seleccion de la interfaz publica del Calendar, ya migradas a DateTime de Luxon.
type CalendarSelectionProps =
  | {
      mode?: 'single';
      selected?: DateTime;
      onSelect?: (date: DateTime | undefined) => void;
    }
  | {
      mode: 'multiple';
      selected?: DateTime[];
      onSelect?: (dates: DateTime[] | undefined) => void;
    }
  | {
      mode: 'range';
      selected?: DateTimeRange;
      onSelect?: (range: DateTimeRange | undefined) => void;
    };

// Formatters expresados con DateTime de Luxon (equivalen al tipo Formatters de react-day-picker,
// cuyas funciones reciben Date). Los parametros internos options/dateLib de las firmas nativas
// no se exponen porque pertenecen a la libreria de fechas interna de react-day-picker (date-fns)
// y filtrarian tipos nativos a la interfaz publica.
type LuxonFormatters = {
  formatCaption: (month: DateTime) => string;
  formatDay: (date: DateTime) => string;
  formatMonthDropdown: (month: DateTime) => string;
  formatWeekNumber: (weekNumber: number) => string;
  formatWeekNumberHeader: () => string;
  formatWeekdayName: (weekday: DateTime) => string;
  formatYearDropdown: (year: DateTime) => string;
};

// Labels (aria-labels) expresados con DateTime de Luxon (equivalen al tipo Labels de
// react-day-picker, cuyas funciones reciben Date). Igual que en LuxonFormatters, se omiten
// los parametros internos options/dateLib.
type LuxonLabels = {
  labelNav: () => string;
  labelGrid: (date: DateTime) => string;
  labelGridcell: (date: DateTime, modifiers?: Modifiers) => string;
  labelMonthDropdown: () => string;
  labelYearDropdown: () => string;
  labelNext: (month: DateTime | undefined) => string;
  labelPrevious: (month: DateTime | undefined) => string;
  labelDayButton: (date: DateTime, modifiers: Modifiers) => string;
  labelWeekday: (date: DateTime) => string;
  labelWeekNumber: (weekNumber: number) => string;
  labelWeekNumberHeader: () => string;
};

// Equivalentes Luxon de las clases CalendarDay/CalendarWeek/CalendarMonth de react-day-picker,
// que exponen Date nativo en date y displayMonth. Los campos isoDate/displayMonthId/dateMonthId
// son strings estables (utiles como keys) y se conservan tal cual.
type LuxonCalendarDay = {
  date: DateTime;
  displayMonth: DateTime;
  outside: boolean;
  isoDate: string;
  displayMonthId: string;
  dateMonthId: string;
};
type LuxonCalendarWeek = { weekNumber: number; days: LuxonCalendarDay[] };
type LuxonCalendarMonth = { date: DateTime; weeks: LuxonCalendarWeek[] };

// Props de los componentes personalizables que exponen fechas, re-expresadas con Luxon.
type LuxonDayProps = Omit<React.ComponentProps<CustomComponents['Day']>, 'day'> & {
  day: LuxonCalendarDay;
};
type LuxonDayButtonProps = Omit<React.ComponentProps<CustomComponents['DayButton']>, 'day'> & {
  day: LuxonCalendarDay;
};
type LuxonMonthProps = Omit<React.ComponentProps<CustomComponents['Month']>, 'calendarMonth'> & {
  calendarMonth: LuxonCalendarMonth;
};
type LuxonMonthCaptionProps = Omit<
  React.ComponentProps<CustomComponents['MonthCaption']>,
  'calendarMonth'
> & { calendarMonth: LuxonCalendarMonth };
type LuxonWeekProps = Omit<React.ComponentProps<CustomComponents['Week']>, 'week'> & {
  week: LuxonCalendarWeek;
};
type LuxonWeekNumberProps = Omit<React.ComponentProps<CustomComponents['WeekNumber']>, 'week'> & {
  week: LuxonCalendarWeek;
};
type LuxonNavProps = Omit<
  React.ComponentProps<CustomComponents['Nav']>,
  'previousMonth' | 'nextMonth'
> & { previousMonth?: DateTime; nextMonth?: DateTime };

// CustomComponents con la superficie de fechas migrada a Luxon: los componentes que reciben
// CalendarDay/CalendarMonth/CalendarWeek o Date nativo se reemplazan por sus equivalentes
// DateTime; el resto de componentes no expone fechas y se conserva con su tipo original.
type LuxonCustomComponents = Omit<
  CustomComponents,
  'Day' | 'DayButton' | 'Month' | 'MonthCaption' | 'Week' | 'WeekNumber' | 'Nav'
> & {
  Day: (props: LuxonDayProps) => React.JSX.Element;
  DayButton: (props: LuxonDayButtonProps) => React.JSX.Element;
  Month: (props: LuxonMonthProps) => React.JSX.Element;
  MonthCaption: (props: LuxonMonthCaptionProps) => React.JSX.Element;
  Week: (props: LuxonWeekProps) => React.JSX.Element;
  WeekNumber: (props: LuxonWeekNumberProps) => React.JSX.Element;
  Nav: (props: LuxonNavProps) => React.JSX.Element;
};

// Props de personalizacion (formatters, labels, components) migradas a DateTime de Luxon.
type CalendarCustomizationProps = {
  formatters?: Partial<LuxonFormatters>;
  labels?: Partial<LuxonLabels>;
  components?: Partial<LuxonCustomComponents>;
};

// Ademas de las props de fecha, se excluyen del Omit:
// - formatters, labels, components: se reemplazan por sus equivalentes Luxon (CalendarCustomizationProps).
// - dateLib y noonSafe: marcadas @experimental en react-day-picker; su uso esta prohibido en este proyecto.
type CalendarProps = Omit<
  PropsBase,
  | 'mode'
  | 'defaultMonth'
  | 'month'
  | 'today'
  | 'startMonth'
  | 'endMonth'
  | 'disabled'
  | 'hidden'
  | 'modifiers'
  | 'onDayClick'
  | 'onDayFocus'
  | 'onDayBlur'
  | 'onDayKeyDown'
  | 'onDayMouseEnter'
  | 'onDayMouseLeave'
  | 'onMonthChange'
  | 'onNextClick'
  | 'onPrevClick'
  | 'formatters'
  | 'labels'
  | 'components'
  | 'dateLib'
  | 'noonSafe'
> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
} & CalendarDateProps &
  CalendarEventProps &
  CalendarSelectionProps &
  CalendarCustomizationProps;

// Seleccion en el formato que exige react-day-picker (Date nativo).
type DayPickerSelectionProps =
  | { mode: 'single'; selected: Date | undefined; onSelect: (date: Date | undefined) => void }
  | {
      mode: 'multiple';
      selected: Date[] | undefined;
      onSelect: (dates: Date[] | undefined) => void;
    }
  | {
      mode: 'range';
      selected: DateRange | undefined;
      onSelect: (range: DateRange | undefined) => void;
    };

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
  LuxonFormatters,
  LuxonLabels,
  LuxonCustomComponents,
  LuxonCalendarDay,
  LuxonCalendarWeek,
  LuxonCalendarMonth,
  DayPickerSelectionProps,
};
