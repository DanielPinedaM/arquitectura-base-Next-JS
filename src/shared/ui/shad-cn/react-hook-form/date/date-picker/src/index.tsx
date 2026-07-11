'use client';

import { DateTime } from 'luxon';
import { LuCalendar } from 'react-icons/lu';

import { cn } from '@shad-cn/utils';
import { Button } from '@shad-cn/button';
import { Calendar } from '@shad-cn/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@shad-cn/popover';

interface DatePickerProps {
  date?: DateTime;
  onDateChange: (date: DateTime | undefined) => void;
  placeholder?: string;
}

function DatePicker({ date, onDateChange, placeholder = 'Elegir una fecha' }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant='outline'
            data-empty={!date}
            className='justify-start text-left font-normal data-[empty=true]:text-muted-foreground'
          />
        }
      >
        <LuCalendar />
        {date ? (
          date.setLocale('es').toLocaleString(DateTime.DATE_FULL)
        ) : (
          <span>{placeholder}</span>
        )}
      </PopoverTrigger>
      <PopoverContent className={cn('w-auto p-0')}>
        <Calendar mode='single' selected={date} onSelect={onDateChange} />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker };
export type { DatePickerProps };
