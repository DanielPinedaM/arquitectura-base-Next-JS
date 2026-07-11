/* Calendario de shad cn

Queda prohibido utilizar instancias de new Date()

Aclaracion:
internamente, react-day-picker usa new Date()
que se usa porque es una dependencia de DayPicker,
pero siempre las fechas de react-day-picker se transforman a Luxon

REGLAS OBLIGATORIAS:
Deben ser de tipo Luxon (DateTime):
1) Todas las props que recibe este componente
2) El valor que retorna este componente */

'use client';

import * as React from 'react';
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
  type PropsBase,
  type DateRange,
  type Matcher,
  type Modifiers,
} from 'react-day-picker';
import { DateTime } from 'luxon';

import { cn } from '@shad-cn/utils';
import { Button, buttonVariants } from '@shad-cn/button';
import { LuChevronLeft, LuChevronRight, LuChevronDown } from 'react-icons/lu';

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
> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
} & CalendarDateProps &
  CalendarEventProps &
  CalendarSelectionProps;

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

// Traduce la seleccion Luxon de la interfaz publica a la seleccion Date que consume react-day-picker,
// y envuelve onSelect para devolver DateTime al consumidor. Esta es la unica frontera Luxon <-> Date.
function toDayPickerSelection(
  mode: CalendarSelectionProps['mode'],
  selected: DateTime | DateTime[] | DateTimeRange | undefined,
  onSelect:
    | ((date: DateTime | undefined) => void)
    | ((dates: DateTime[] | undefined) => void)
    | ((range: DateTimeRange | undefined) => void)
    | undefined,
): DayPickerSelectionProps {
  if (mode === 'multiple') {
    const luxonSelected = selected as DateTime[] | undefined;
    const luxonOnSelect = onSelect as ((dates: DateTime[] | undefined) => void) | undefined;

    return {
      mode: 'multiple',
      selected: luxonSelected?.map((dateTime) => dateTime.toJSDate()),
      onSelect: (dates) => luxonOnSelect?.(dates?.map((date) => DateTime.fromJSDate(date))),
    };
  }

  if (mode === 'range') {
    const luxonSelected = selected as DateTimeRange | undefined;
    const luxonOnSelect = onSelect as ((range: DateTimeRange | undefined) => void) | undefined;

    return {
      mode: 'range',
      selected: luxonSelected
        ? { from: dateTimeToJsDate(luxonSelected.from), to: dateTimeToJsDate(luxonSelected.to) }
        : undefined,
      onSelect: (range) =>
        luxonOnSelect?.(
          range
            ? { from: jsDateToDateTime(range.from), to: jsDateToDateTime(range.to) }
            : undefined,
        ),
    };
  }

  const luxonSelected = selected as DateTime | undefined;
  const luxonOnSelect = onSelect as ((date: DateTime | undefined) => void) | undefined;

  return {
    mode: 'single',
    selected: dateTimeToJsDate(luxonSelected),
    onSelect: (date) => luxonOnSelect?.(jsDateToDateTime(date)),
  };
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  locale,
  formatters,
  components,
  mode,
  selected,
  onSelect,
  defaultMonth,
  month,
  today,
  startMonth,
  endMonth,
  disabled,
  hidden,
  modifiers,
  onDayClick,
  onDayFocus,
  onDayBlur,
  onDayKeyDown,
  onDayMouseEnter,
  onDayMouseLeave,
  onMonthChange,
  onNextClick,
  onPrevClick,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames();

  const selectionProps = toDayPickerSelection(mode, selected, onSelect);

  // Convierte el record de modifiers (matchers Luxon) al formato nativo de react-day-picker.
  const dayPickerModifiers: Record<string, Matcher | Matcher[] | undefined> | undefined = modifiers
    ? Object.fromEntries(
        Object.entries(modifiers).map(([key, value]): [string, Matcher | Matcher[] | undefined] => [
          key,
          toDayPickerMatchers(value),
        ]),
      )
    : undefined;

  return (
    <DayPicker
      {...selectionProps}
      defaultMonth={dateTimeToJsDate(defaultMonth)}
      month={dateTimeToJsDate(month)}
      today={dateTimeToJsDate(today)}
      startMonth={dateTimeToJsDate(startMonth)}
      endMonth={dateTimeToJsDate(endMonth)}
      disabled={toDayPickerMatchers(disabled)}
      hidden={toDayPickerMatchers(hidden)}
      modifiers={dayPickerModifiers}
      onDayClick={wrapDayEventHandler(onDayClick)}
      onDayFocus={wrapDayEventHandler(onDayFocus)}
      onDayBlur={wrapDayEventHandler(onDayBlur)}
      onDayKeyDown={wrapDayEventHandler(onDayKeyDown)}
      onDayMouseEnter={wrapDayEventHandler(onDayMouseEnter)}
      onDayMouseLeave={wrapDayEventHandler(onDayMouseLeave)}
      onMonthChange={wrapMonthChangeHandler(onMonthChange)}
      onNextClick={wrapMonthChangeHandler(onNextClick)}
      onPrevClick={wrapMonthChangeHandler(onPrevClick)}
      showOutsideDays={showOutsideDays}
      className={cn(
        'group/calendar bg-background p-2 [--cell-radius:var(--radius-md)] [--cell-size:--spacing(7)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          DateTime.fromJSDate(date)
            .setLocale(locale?.code ?? 'en-US')
            .toLocaleString({ month: 'short' }),
        ...formatters,
      }}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn('relative flex flex-col gap-4 md:flex-row', defaultClassNames.months),
        month: cn('flex w-full flex-col gap-4', defaultClassNames.month),
        nav: cn(
          'absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1',
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) p-0 select-none aria-disabled:opacity-50',
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) p-0 select-none aria-disabled:opacity-50',
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          'flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)',
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          'flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium',
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn('relative rounded-(--cell-radius)', defaultClassNames.dropdown_root),
        dropdown: cn('absolute inset-0 bg-popover opacity-0', defaultClassNames.dropdown),
        caption_label: cn(
          'font-medium select-none',
          captionLayout === 'label'
            ? 'text-sm'
            : 'flex items-center gap-1 rounded-(--cell-radius) text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground',
          defaultClassNames.caption_label,
        ),
        month_grid: cn('w-full border-collapse', defaultClassNames.month_grid),
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'flex-1 rounded-(--cell-radius) text-[0.8rem] font-normal text-muted-foreground select-none',
          defaultClassNames.weekday,
        ),
        week: cn('mt-2 flex w-full', defaultClassNames.week),
        week_number_header: cn('w-(--cell-size) select-none', defaultClassNames.week_number_header),
        week_number: cn(
          'text-[0.8rem] text-muted-foreground select-none',
          defaultClassNames.week_number,
        ),
        day: cn(
          'group/day relative aspect-square h-full w-full rounded-(--cell-radius) p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)',
          props.showWeekNumber
            ? '[&:nth-child(2)[data-selected=true]_button]:rounded-l-(--cell-radius)'
            : '[&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)',
          defaultClassNames.day,
        ),
        range_start: cn(
          'relative isolate z-0 rounded-l-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-muted',
          defaultClassNames.range_start,
        ),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn(
          'relative isolate z-0 rounded-r-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:left-0 after:w-4 after:bg-muted',
          defaultClassNames.range_end,
        ),
        today: cn(
          'rounded-(--cell-radius) bg-muted text-foreground data-[selected=true]:rounded-none',
          defaultClassNames.today,
        ),
        outside: cn(
          'text-muted-foreground aria-selected:text-muted-foreground',
          defaultClassNames.outside,
        ),
        disabled: cn('text-muted-foreground opacity-50', defaultClassNames.disabled),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot='calendar' ref={rootRef} className={cn(className)} {...props} />;
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return <LuChevronLeft className={cn('size-4', className)} {...props} />;
          }

          if (orientation === 'right') {
            return <LuChevronRight className={cn('size-4', className)} {...props} />;
          }

          return <LuChevronDown className={cn('size-4', className)} {...props} />;
        },
        DayButton: ({ ...props }) => <CalendarDayButton locale={locale} {...props} />,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className='flex size-(--cell-size) items-center justify-center text-center'>
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      variant='ghost'
      size='icon'
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 border-0 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 data-[range-end=true]:rounded-(--cell-radius) data-[range-end=true]:rounded-r-(--cell-radius) data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-muted data-[range-middle=true]:text-foreground data-[range-start=true]:rounded-(--cell-radius) data-[range-start=true]:rounded-l-(--cell-radius) data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground dark:hover:text-foreground [&>span]:text-xs [&>span]:opacity-70',
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
export type { CalendarProps, CalendarDateProps, CalendarEventProps, DateTimeRange, LuxonMatcher };
