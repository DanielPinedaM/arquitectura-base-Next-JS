'use client';

import { DateTime } from 'luxon';
import { LuCalendar } from 'react-icons/lu';

import { cn } from '@shad-cn/utils';
import { Button } from '@shad-cn/button';
import { Calendar } from '@shad-cn/calendar';
import type { CalendarSelectionProps, DateTimeRange } from '@shad-cn/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@shad-cn/popover';

type DatePickerProps = CalendarSelectionProps & { placeholder?: string };

/** Formatea la seleccion actual segun el mode del Calendar (single/multiple/range) para
mostrarla en el trigger del Popover. Devuelve undefined cuando no hay nada seleccionado,
para que el consumidor caiga en el placeholder. */
function formatSelectedLabel(
  mode: CalendarSelectionProps['mode'],
  selected: CalendarSelectionProps['selected'],
): string | undefined {
  if (mode === 'multiple') {
    const dates = selected as DateTime[] | undefined;
    if (!dates?.length) return undefined;
    return dates.map((date) => date.setLocale('es').toLocaleString(DateTime.DATE_FULL)).join(', ');
  }

  if (mode === 'range') {
    const range = selected as DateTimeRange | undefined;
    if (!range?.from) return undefined;
    const from: string = range.from.setLocale('es').toLocaleString(DateTime.DATE_FULL);
    return range.to
      ? `${from} - ${range.to.setLocale('es').toLocaleString(DateTime.DATE_FULL)}`
      : from;
  }

  const date = selected as DateTime | undefined;
  return date?.setLocale('es').toLocaleString(DateTime.DATE_FULL);
}

function DatePicker({ placeholder = 'Elegir una fecha', ...calendarProps }: DatePickerProps) {
  const selectedLabel = formatSelectedLabel(calendarProps.mode, calendarProps.selected);

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant='outline'
            data-empty={!selectedLabel}
            className='justify-start text-left font-normal data-[empty=true]:text-muted-foreground'
          />
        }
      >
        <LuCalendar />
        {selectedLabel ?? <span>{placeholder}</span>}
      </PopoverTrigger>
      <PopoverContent className={cn('w-auto p-0')}>
        <Calendar {...calendarProps} />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker };
export type { DatePickerProps };
