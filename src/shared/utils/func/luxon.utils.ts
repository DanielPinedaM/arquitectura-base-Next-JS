import { DateTime } from 'luxon';

/**
Eliminar espacio en blanco reemplazando:
- "p. m" por "p.m"
- "a. m" por "a.m" */
const replaceAmPm = (date: string): string => {
  if (!date) return date;

  return date
    .replace(/p\.(\s| )m/gi, 'p.m')
    .replace(/a\.(\s| )m/gi, 'a.m')
    .replace(/\.$/, '');
};

/**
formato de fecha y/o hora con formato personalizado */
type FormatDateValue = string | Date | DateTime;
export const formatDate = (
  date: FormatDateValue,
  format: string = 'd-LLL-yyyy',
): FormatDateValue => {
  let dateTime: DateTime;

  if (date instanceof DateTime) {
    dateTime = date;
  } else if (date instanceof Date) {
    dateTime = DateTime.fromJSDate(date);
  } else if (typeof date === 'string' && String(date)?.trim() !== '') {
    dateTime = DateTime.fromISO(date);
  } else {
    return date;
  }

  if (!dateTime.isValid) return date;

  return replaceAmPm(dateTime.setLocale('es').toFormat(format));
};

/**
fecha y hora actual con formato de hora personalizado */
export const currentDateAndTime = (format: string = 'd-LLL-yyyy hh:mm:ss a'): string => {
  const finalDate: string = DateTime.now().setLocale('es').toFormat(format).replace(/\.$/, '');

  return replaceAmPm(finalDate);
};
