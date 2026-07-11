/* Funciones traductoras Luxon <-> Date del Calendario de shad cn

Queda prohibido utilizar instancias de new Date()

Aclaracion:
internamente, react-day-picker usa new Date()
que se usa porque es una dependencia de DayPicker,
pero siempre las fechas de react-day-picker se transforman a Luxon

Este modulo es la unica frontera entre la interfaz publica del Calendar (DateTime de Luxon)
y react-day-picker (Date nativo). */

import type {
  CalendarDay,
  CalendarMonth,
  CalendarWeek,
  CustomComponents,
  DayProps,
  DayButtonProps,
  MonthProps,
  MonthCaptionProps,
  WeekProps,
  WeekNumberProps,
  NavProps,
  Formatters,
  Labels,
  Matcher,
  Modifiers,
} from 'react-day-picker';
import { DateTime } from 'luxon';

import type {
  CalendarSelectionProps,
  DateTimeRange,
  DayPickerSelectionProps,
  LuxonCalendarDay,
  LuxonCalendarMonth,
  LuxonCalendarWeek,
  LuxonCustomComponents,
  LuxonDayEventHandler,
  LuxonFormatters,
  LuxonLabels,
  LuxonMatcher,
  LuxonMonthChangeHandler,
  LuxonOnSelectHandler,
} from './types';

// Convierte un DateTime de Luxon a Date nativo, unico tipo que react-day-picker acepta internamente.
const dateTimeToJsDate = (dateTime: DateTime | undefined): Date | undefined =>
  dateTime instanceof DateTime && dateTime.isValid ? dateTime.toJSDate() : undefined;

// Convierte el Date nativo que emite react-day-picker de vuelta a DateTime de Luxon,
// que es lo que expone la interfaz publica del Calendar.
const jsDateToDateTime = (date: Date | undefined): DateTime | undefined =>
  date instanceof Date ? DateTime.fromJSDate(date) : undefined;

// Traduce un unico matcher Luxon al Matcher nativo (Date) que consume react-day-picker.
function toDayPickerMatcher(matcher: LuxonMatcher): Matcher {
  if (typeof matcher === 'boolean') return matcher;
  if (typeof matcher === 'function') return (date: Date) => matcher(DateTime.fromJSDate(date));
  if (matcher instanceof DateTime) return matcher.toJSDate();
  if (Array.isArray(matcher)) return matcher.map((dateTime) => dateTime.toJSDate());
  if ('dayOfWeek' in matcher) return { dayOfWeek: matcher.dayOfWeek };
  if ('from' in matcher) {
    return { from: dateTimeToJsDate(matcher.from), to: dateTimeToJsDate(matcher.to) };
  }

  // Restante: before (DateBefore), after (DateAfter) o ambos (DateInterval).
  const interval: { before?: Date; after?: Date } = {};
  if ('before' in matcher && matcher.before instanceof DateTime) {
    interval.before = matcher.before.toJSDate();
  }
  if ('after' in matcher && matcher.after instanceof DateTime) {
    interval.after = matcher.after.toJSDate();
  }
  return interval as Matcher;
}

// Traduce el valor de disabled/hidden (un matcher o un arreglo de matchers) a su equivalente nativo.
function toDayPickerMatchers(
  value: LuxonMatcher | LuxonMatcher[] | undefined,
): Matcher | Matcher[] | undefined {
  if (value === undefined) return undefined;

  if (Array.isArray(value)) {
    // DateTime[] es en si mismo un matcher (lista de fechas); si todos son DateTime se convierte directo.
    if (value.every((item) => item instanceof DateTime)) {
      return (value as DateTime[]).map((dateTime) => dateTime.toJSDate());
    }
    return (value as LuxonMatcher[]).map(toDayPickerMatcher);
  }

  return toDayPickerMatcher(value);
}

// Envuelve un handler de dia Luxon para que reciba el Date nativo que emite react-day-picker
// y lo entregue al consumidor como DateTime.
function wrapDayEventHandler<E>(
  handler: LuxonDayEventHandler<E> | undefined,
): ((date: Date, modifiers: Modifiers, e: E) => void) | undefined {
  return handler
    ? (date, modifiers, e) => handler(DateTime.fromJSDate(date), modifiers, e)
    : undefined;
}

// Envuelve un handler de cambio de mes Luxon para recibir el Date nativo de react-day-picker.
function wrapMonthChangeHandler(
  handler: LuxonMonthChangeHandler | undefined,
): ((month: Date) => void) | undefined {
  return handler ? (month) => handler(DateTime.fromJSDate(month)) : undefined;
}

// Convierte las estructuras CalendarDay/CalendarWeek/CalendarMonth (con Date nativo) que emite
// react-day-picker a sus equivalentes Luxon para los formatters, labels y components del consumidor.
function toLuxonCalendarDay(day: CalendarDay): LuxonCalendarDay {
  return {
    date: DateTime.fromJSDate(day.date),
    displayMonth: DateTime.fromJSDate(day.displayMonth),
    outside: day.outside,
    isoDate: day.isoDate,
    displayMonthId: day.displayMonthId,
    dateMonthId: day.dateMonthId,
  };
}

function toLuxonCalendarWeek(week: CalendarWeek): LuxonCalendarWeek {
  return { weekNumber: week.weekNumber, days: week.days.map(toLuxonCalendarDay) };
}

function toLuxonCalendarMonth(month: CalendarMonth): LuxonCalendarMonth {
  return { date: DateTime.fromJSDate(month.date), weeks: month.weeks.map(toLuxonCalendarWeek) };
}

// Envuelve los formatters Luxon del consumidor: cada wrapper recibe el Date nativo que emite
// react-day-picker y lo entrega al consumidor ya convertido a DateTime.
function wrapFormatters(formatters: Partial<LuxonFormatters> | undefined): Partial<Formatters> {
  if (!formatters) return {};

  const {
    formatCaption,
    formatDay,
    formatMonthDropdown,
    formatWeekNumber,
    formatWeekNumberHeader,
    formatWeekdayName,
    formatYearDropdown,
  } = formatters;

  const wrapped: Partial<Formatters> = {};

  if (formatCaption) wrapped.formatCaption = (month) => formatCaption(DateTime.fromJSDate(month));
  if (formatDay) wrapped.formatDay = (date) => formatDay(DateTime.fromJSDate(date));
  if (formatMonthDropdown) {
    wrapped.formatMonthDropdown = (month) => formatMonthDropdown(DateTime.fromJSDate(month));
  }
  if (formatWeekNumber) wrapped.formatWeekNumber = (weekNumber) => formatWeekNumber(weekNumber);
  if (formatWeekNumberHeader) wrapped.formatWeekNumberHeader = () => formatWeekNumberHeader();
  if (formatWeekdayName) {
    wrapped.formatWeekdayName = (weekday) => formatWeekdayName(DateTime.fromJSDate(weekday));
  }
  if (formatYearDropdown) {
    wrapped.formatYearDropdown = (year) => formatYearDropdown(DateTime.fromJSDate(year));
  }

  return wrapped;
}

// Envuelve los labels Luxon del consumidor con el mismo patron que wrapFormatters.
function wrapLabels(labels: Partial<LuxonLabels> | undefined): Partial<Labels> | undefined {
  if (!labels) return undefined;

  const {
    labelNav,
    labelGrid,
    labelGridcell,
    labelMonthDropdown,
    labelYearDropdown,
    labelNext,
    labelPrevious,
    labelDayButton,
    labelWeekday,
    labelWeekNumber,
    labelWeekNumberHeader,
  } = labels;

  const wrapped: Partial<Labels> = {};

  if (labelNav) wrapped.labelNav = () => labelNav();
  if (labelGrid) wrapped.labelGrid = (date) => labelGrid(DateTime.fromJSDate(date));
  if (labelGridcell) {
    wrapped.labelGridcell = (date, modifiers) =>
      labelGridcell(DateTime.fromJSDate(date), modifiers);
  }
  if (labelMonthDropdown) wrapped.labelMonthDropdown = () => labelMonthDropdown();
  if (labelYearDropdown) wrapped.labelYearDropdown = () => labelYearDropdown();
  if (labelNext) wrapped.labelNext = (month) => labelNext(jsDateToDateTime(month));
  if (labelPrevious) wrapped.labelPrevious = (month) => labelPrevious(jsDateToDateTime(month));
  if (labelDayButton) {
    wrapped.labelDayButton = (date, modifiers) =>
      labelDayButton(DateTime.fromJSDate(date), modifiers);
  }
  if (labelWeekday) wrapped.labelWeekday = (date) => labelWeekday(DateTime.fromJSDate(date));
  if (labelWeekNumber) wrapped.labelWeekNumber = (weekNumber) => labelWeekNumber(weekNumber);
  if (labelWeekNumberHeader) wrapped.labelWeekNumberHeader = () => labelWeekNumberHeader();

  return wrapped;
}

// Envuelve los componentes personalizados Luxon del consumidor: cada wrapper recibe las props
// nativas (CalendarDay/CalendarWeek/CalendarMonth/Date) de react-day-picker y las traduce a
// DateTime antes de delegar en el componente del consumidor. Los componentes que no exponen
// fechas pasan sin modificacion.
function wrapComponents(components: Partial<LuxonCustomComponents>): Partial<CustomComponents> {
  const { Day, DayButton, Month, MonthCaption, Week, WeekNumber, Nav, ...passthrough } = components;

  const wrapped: Partial<CustomComponents> = { ...passthrough };

  if (Day) {
    const WrappedDay = ({ day, ...props }: DayProps) => (
      <Day day={toLuxonCalendarDay(day)} {...props} />
    );
    WrappedDay.displayName = 'Day';
    wrapped.Day = WrappedDay;
  }
  if (DayButton) {
    const WrappedDayButton = ({ day, ...props }: DayButtonProps) => (
      <DayButton day={toLuxonCalendarDay(day)} {...props} />
    );
    WrappedDayButton.displayName = 'DayButton';
    wrapped.DayButton = WrappedDayButton;
  }
  if (Month) {
    const WrappedMonth = ({ calendarMonth, ...props }: MonthProps) => (
      <Month calendarMonth={toLuxonCalendarMonth(calendarMonth)} {...props} />
    );
    WrappedMonth.displayName = 'Month';
    wrapped.Month = WrappedMonth;
  }
  if (MonthCaption) {
    const WrappedMonthCaption = ({ calendarMonth, ...props }: MonthCaptionProps) => (
      <MonthCaption calendarMonth={toLuxonCalendarMonth(calendarMonth)} {...props} />
    );
    WrappedMonthCaption.displayName = 'MonthCaption';
    wrapped.MonthCaption = WrappedMonthCaption;
  }
  if (Week) {
    const WrappedWeek = ({ week, ...props }: WeekProps) => (
      <Week week={toLuxonCalendarWeek(week)} {...props} />
    );
    WrappedWeek.displayName = 'Week';
    wrapped.Week = WrappedWeek;
  }
  if (WeekNumber) {
    const WrappedWeekNumber = ({ week, ...props }: WeekNumberProps) => (
      <WeekNumber week={toLuxonCalendarWeek(week)} {...props} />
    );
    WrappedWeekNumber.displayName = 'WeekNumber';
    wrapped.WeekNumber = WrappedWeekNumber;
  }
  if (Nav) {
    const WrappedNav = ({ previousMonth, nextMonth, ...props }: NavProps) => (
      <Nav
        previousMonth={jsDateToDateTime(previousMonth)}
        nextMonth={jsDateToDateTime(nextMonth)}
        {...props}
      />
    );
    WrappedNav.displayName = 'Nav';
    wrapped.Nav = WrappedNav;
  }

  return wrapped;
}

// Traduce la seleccion Luxon de la interfaz publica a la seleccion Date que consume react-day-picker,
// y envuelve onSelect para devolver DateTime al consumidor (incluido triggerDate, el segundo
// parametro de OnSelectHandler). Esta es la unica frontera Luxon <-> Date.
function toDayPickerSelection(
  mode: CalendarSelectionProps['mode'],
  selected: DateTime | DateTime[] | DateTimeRange | undefined,
  onSelect:
    | LuxonOnSelectHandler<DateTime | undefined>
    | LuxonOnSelectHandler<DateTime[] | undefined>
    | LuxonOnSelectHandler<DateTimeRange | undefined>
    | undefined,
): DayPickerSelectionProps {
  if (mode === 'multiple') {
    const luxonSelected = selected as DateTime[] | undefined;
    const luxonOnSelect = onSelect as LuxonOnSelectHandler<DateTime[] | undefined> | undefined;

    return {
      mode: 'multiple',
      selected: luxonSelected?.map((dateTime) => dateTime.toJSDate()),
      onSelect: (dates, triggerDate, modifiers, e) =>
        luxonOnSelect?.(
          dates?.map((date) => DateTime.fromJSDate(date)),
          DateTime.fromJSDate(triggerDate),
          modifiers,
          e,
        ),
    };
  }

  if (mode === 'range') {
    const luxonSelected = selected as DateTimeRange | undefined;
    const luxonOnSelect = onSelect as LuxonOnSelectHandler<DateTimeRange | undefined> | undefined;

    return {
      mode: 'range',
      selected: luxonSelected
        ? { from: dateTimeToJsDate(luxonSelected.from), to: dateTimeToJsDate(luxonSelected.to) }
        : undefined,
      onSelect: (range, triggerDate, modifiers, e) =>
        luxonOnSelect?.(
          range
            ? { from: jsDateToDateTime(range.from), to: jsDateToDateTime(range.to) }
            : undefined,
          DateTime.fromJSDate(triggerDate),
          modifiers,
          e,
        ),
    };
  }

  const luxonSelected = selected as DateTime | undefined;
  const luxonOnSelect = onSelect as LuxonOnSelectHandler<DateTime | undefined> | undefined;

  return {
    mode: 'single',
    selected: dateTimeToJsDate(luxonSelected),
    onSelect: (date, triggerDate, modifiers, e) =>
      luxonOnSelect?.(jsDateToDateTime(date), DateTime.fromJSDate(triggerDate), modifiers, e),
  };
}

export {
  dateTimeToJsDate,
  jsDateToDateTime,
  toDayPickerMatcher,
  toDayPickerMatchers,
  wrapDayEventHandler,
  wrapMonthChangeHandler,
  toLuxonCalendarDay,
  toLuxonCalendarWeek,
  toLuxonCalendarMonth,
  wrapFormatters,
  wrapLabels,
  wrapComponents,
  toDayPickerSelection,
};
