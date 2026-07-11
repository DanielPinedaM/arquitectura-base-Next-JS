import { DateTime } from 'luxon';

/**
convierte cualquier fecha (string, Date o DateTime) al formato personalizado indicado,
siempre retornando un DateTime de luxon (o null si la fecha es inválida) */
type FormatDateValue = string | Date | DateTime;
export const formatDate = (
  rawDate: string | Date | DateTime,
  format: string = "yyyy-MM-dd'T'HH:mm:ss'Z'",
): DateTime | null => {
  let convertedDateTime: DateTime;

  if (rawDate instanceof DateTime) {
    convertedDateTime = rawDate;
  } else if (rawDate instanceof Date) {
    convertedDateTime = DateTime.fromJSDate(rawDate);
  } else if (typeof rawDate === 'string' && rawDate.trim() !== '') {
    convertedDateTime = DateTime.fromISO(rawDate);
  } else {
    return null;
  }

  if (!convertedDateTime.isValid) return null;

  const formattedDate: string = convertedDateTime.toUTC().setLocale('es').toFormat(format);
  const reparsedDateTime = DateTime.fromFormat(formattedDate, format, {
    locale: 'es',
    zone: 'utc',
  });

  return reparsedDateTime.isValid ? reparsedDateTime : null;
};

/**
fecha y hora actual con formato de hora personalizado */
export const currentDateAndTime = (format: string = 'd-LLL-yyyy hh:mm:ss a'): string => {
  return DateTime.now().setLocale('es').toFormat(format).replace(/\.$/, '');
};
