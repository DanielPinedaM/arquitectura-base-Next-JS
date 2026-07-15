'use client';

/** Calendario de shad cn

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

5) PROHIBIDO usar any, usar tipado estricto */

import * as React from 'react';
import { DayPicker, getDefaultClassNames, type Matcher } from 'react-day-picker';
import { es } from 'react-day-picker/locale';
import { DateTime } from 'luxon';

import { cn } from '@shad-cn/utils';
import { buttonVariants } from '@shad-cn/button';
import { LuChevronLeft, LuChevronRight, LuChevronDown } from 'react-icons/lu';

import { CalendarDayButton } from '@/shared/ui/shad-cn/react-hook-form/date/calendar/src/CalendarDayButton';
import {
  dateTimeToJsDate,
  toDayPickerMatchers,
  toDayPickerSelection,
  wrapComponents,
  wrapDayEventHandler,
  wrapFormatters,
  wrapLabels,
  wrapMonthChangeHandler,
} from '@/shared/ui/shad-cn/react-hook-form/date/calendar/src/Converters';
import type { CalendarProps } from '@/shared/ui/shad-cn/react-hook-form/date/calendar/src/calendar.types';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  locale = es,
  formatters,
  labels,
  components,
  mode = 'single',
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

  /** Los wrappers de components se memorizan para que su identidad sea estable entre renders;
  recrearlos en cada render haria que react-day-picker desmonte y vuelva a montar el subarbol. */
  const dayPickerComponents = React.useMemo(
    () => (components ? wrapComponents(components) : undefined),
    [components],
  );

  /** Convierte el record de modifiers (matchers Luxon) al formato nativo de react-day-picker. */
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
            .setLocale(locale?.code ?? 'es')
            .toLocaleString({ month: 'short' }),
        ...wrapFormatters(formatters),
      }}
      labels={wrapLabels(labels)}
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
        ...dayPickerComponents,
      }}
      {...props}
    />
  );
}

export { Calendar };
