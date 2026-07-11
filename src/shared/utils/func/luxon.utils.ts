import { DateTime } from 'luxon';

const ISO_8601 = "yyyy-MM-dd'T'HH:mm:ss'Z'";

/**
convierte cualquier fecha (string, Date o DateTime) al formato personalizado indicado,
siempre retornando un DateTime de luxon (o null si la fecha es inválida) */
export const formatDate = (
  rawDate: string | Date | DateTime,
  format: string = ISO_8601,
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
fecha y hora actual con formato de fecha y hora personalizada;
si el formato incluye una 'Z' literal,
la fecha se convierte a UTC antes de formatear para que esa 'Z' refleje el offset real */
export const currentDateAndTime = (format: string = ISO_8601): string => {
  let now: DateTime = DateTime.now();

  if (format.includes("'Z'")) {
    now = now.toUTC();
  }

  return now.setLocale('es').toFormat(format).replace(/\.$/, '');
};
