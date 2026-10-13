/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { titleCase } from '@/shared/utils/func/general.utils';

/* **********************************************
 * funciones relacionadas con los tipos de datos *
 * ***********************************************/

/**
admite cualquier string */
export const isString = (variable: string | any): boolean => {
  return typeof variable === 'string' || variable instanceof String;
};

/**
string q contiene numero,
admite numero decimal, comas, numero entero, positivo y negativo.
Ejemplo: "-1,2.1", "-2", "3" */
export const isStringNumber = (variable: string | any): boolean => {
  return typeof variable === 'string' && /^(-?\d{0,}(\,|\.)?){0,}$/.test(variable.trim());
};

/**
true cuando el texto contiene cualquier tipo de letra */
export const isLetter = (variable: string | any): boolean => {
  return typeof variable === 'string' && /^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s]+$/.test(variable.trim());
};

/**
solamente tipo NUMERO, NO admite NaN */
export const isNumber = (variable: number | any): boolean => {
  return typeof variable === 'number' && Number.isNaN(variable) === false;
};

/**
SI es posible convierte a NUMERO,
cuando NO es posible devuleve null */
export const convertToNumber = (value: number | any): number | null => {
  const stringValue: string = String(value).trim();

  if (
    stringValue === '' ||
    value === null ||
    stringValue === 'null' ||
    value === undefined ||
    stringValue === 'undefined' ||
    typeof value === 'boolean' ||
    typeof value === 'function' ||
    typeof value === 'object' ||
    typeof value === 'symbol' ||
    Array.isArray(value)
  )
    return null;

  const number: number = Number(value);
  return isNaN(number) ? null : number;
};

/**
SI es posible
1) convertir a string
2) pasar string a minuscula

cuando NO es posible devuleve null */
export const convertToStringAndLowerCase = (string: string | any): string | null | any => {
  if (String(string).trim() === '' || !string) {
    return null;
  }

  if (isString(string)) {
    return String(string).trim().toLowerCase();
  }

  return null;
};

export const isValidBoolean = (variable: boolean | string | any): boolean => {
  const normalized: string = String(variable)?.trim()?.toLowerCase();

  if (
    typeof variable === 'boolean' ||
    // true
    normalized === 'true' ||
    normalized === '1' ||
    normalizeStr(variable) === 'si' ||
    normalizeStr(variable) === 'yes' ||
    // false
    normalized === 'false' ||
    normalized === '0' ||
    normalizeStr(variable) === 'no'
  ) {
    return true;
  }

  return false;
};

/**
SI es posible
convertir a booleano
cuando NO es posible devuleve null */
export const convertToBoolean = (variable: boolean | string | any): boolean | null => {
  const normalized: string = String(variable)?.trim()?.toLowerCase();

  if (
    normalized === 'true' ||
    normalized === '1' ||
    normalizeStr(variable) === 'si' ||
    normalizeStr(variable) === 'yes'
  ) {
    return true;
  } else if (normalized === 'false' || normalized === '0' || normalizeStr(variable) === 'no') {
    return false;
  } else {
    return null;
  }
};

/**
saber si puedo o no convertir de string a array u objeto con JSON.parse() */
export const isValidJSONparse = (string: string): boolean => {
  if (typeof string !== 'string') return false;

  try {
    JSON.parse(string);
    return true;
  } catch (error) {
    return false;
  }
};

/**
¿El parametro variable es un archivo? */
export function isFile(variable: any): boolean {
  if (!variable) return false;

  return (
    variable instanceof FormData ||
    variable instanceof Blob ||
    variable instanceof File ||
    variable instanceof ArrayBuffer
  );
}

/**
longitud de un objeto literal

>= 0 cuando SI es objeto literal
-1   cuando NO es objeto literal */
export const literalObjectLength = (literalObject: any): number => {
  if (isLiteralObject(literalObject)) {
    const length: number =
      Object.keys(literalObject).length + Object.getOwnPropertySymbols(literalObject).length;
    return length;
  }

  return -1;
};

/**
convertir los tipos de datos
de los values de un objeto literal {} NO anidado (de UNA SOLA dimension) */
export const convertFlatObjectValues = (obj: Record<string, any>): Record<string, string> => {
  return Object.entries(obj).reduce(
    (newObject, [key, value]) => {
      const normalized: string = String(key)?.trim()?.toLowerCase();

      if (normalized === 'undefined') {
        newObject[key] = undefined;
      } else if (normalized === 'null') {
        newObject[key] = null;
      } else if (Number.isNaN(key) || normalized === 'nan') {
        newObject[key] = NaN;
      } else if (isNumber(value) || isStringNumber(value)) {
        newObject[key] = convertToNumber(value);
      } else if (isValidBoolean(value)) {
        newObject[key] = convertToBoolean(value);
      } else {
        newObject[key] = value;
      }

      return newObject;
    },
    {} as Record<string, any>,
  );
};

/**
¿la variable es un objeto literal? */
export const isLiteralObject = (literalObject: any): boolean =>
  typeof literalObject === 'object' &&
  literalObject !== null &&
  (Object.getPrototypeOf(literalObject) === Object.prototype ||
    Object.prototype.toString.call(literalObject) === '[object Object]');

/**
convertir a JSON.stringify() SI ES POSIBLE */
export const convertToStringify = (value: any | string): any | string => {
  // solamente se puede hacer JSON.stringify() de un
  // 1) array []
  if (Array.isArray(value)) return JSON.stringify(value);

  // 2) objeto literal {}
  if (isLiteralObject(value)) return JSON.stringify(value);

  return value;
};

/**
convertir a JSON.stringify() SI ES POSIBLE,
sino, convierte a string */
export const forceConvertToString = (value: any | string): string => {
  // solamente se puede hacer JSON.stringify() de un
  // 1) array []
  if (Array.isArray(value)) return JSON.stringify(value);

  // 2) objeto literal {}
  if (isLiteralObject(value)) return JSON.stringify(value);

  return String(value).trim();
};

/**
* Normalizar string
* Ejemplo:
* ' COMunicaciÓN    ' devuelve  'comunicacion'
* [1, 2, 3]           devuelve   [1, 2, 3]
*
* @param string - valor a normalizar. Si no es string o está vacío, se devuelve tal cual

* @param options - opciones de normalización

* @param options.clearAccents - true: borrar las tildes
                                false: NO borrar las tildes

* @param options.clearSpecialCharacters - true: BORRAR caracteres especiales
                                          false: CONSERVAR caracteres especiales

* @param options.enyeWithN - true: REEMPLAZAR "ñ" y "Ñ" por "n"
                             false: CONSERVAR letra "ñ"

* @param options.clearNumbers - true: BORRAR numeros
                                false: CONSERVAR numeros

* @param options.caseTransform - "upperCase": convertir texto a MAYUSCULA
                                 "lowerCase": convertir texto a minuscula
                                 "titleCase": iniciales en mayuscula
                                 null: NO modifica mayusculas ni minusculas

* @param options.trimType - controla como borrar los espacios en blanco
                            "trim": borrar espacio en blanco al PRINCIPIO Y FINAL
                            "trimStart": borrar espacio en blanco al PRINCIPIO
                            "trimEnd": borrar espacio en blanco al FINAL
                            null: NO borrar espacios en blanco

* @param options.clearBlankSpaces - true: reemplazar tabs, multiples espacios en blanco '   ' y saltos de linea \n por espacio en blanco ' '
                                    false: conservar tabs, multiples espacios en blanco '   ' y saltos de linea \n

* @param options.typeOfDash - null: NO reemplazar espacios en blanco " " por guiones
                              "-": reemplaza espacios por guion MEDIO
                              "_" : reemplaza espacios por guion BAJO

* @returns string normalizado o el valor original si no es string */
interface IOptionsNormalizeStr {
  clearAccents?: boolean;
  clearSpecialCharacters?: boolean;
  enyeWithN?: boolean;
  clearNumbers?: boolean;
  caseTransform?: 'upperCase' | 'lowerCase' | 'titleCase' | null;
  trimType?: 'trim' | 'trimStart' | 'trimEnd' | null;
  clearBlankSpaces?: boolean;
  typeOfDash?: '-' | '_' | null;
}
export const normalizeStr = (
  string: string | any,
  options?: IOptionsNormalizeStr,
): string | any => {
  if (!isString(string)) return string;
  if (String(string).trim() === '') return '';

  const {
    clearAccents = true,
    clearSpecialCharacters = false,
    enyeWithN = false,
    clearNumbers = false,
    caseTransform = 'lowerCase',
    trimType = 'trim',
    clearBlankSpaces = true,
    typeOfDash = null,
  } = options ?? {};

  let newString: string = string.normalize('NFD'); // hacer q funcionen las expresiones regulares

  if (clearAccents) {
    newString = newString.replaceAll(/[\u0300-\u0302\u0304-\u036f]/g, ''); // eliminar acentos (todos menos U+0303)
  }

  newString = newString.normalize('NFC'); // conservar la "ñ" "Ñ"

  if (enyeWithN) {
    newString = newString
      .replaceAll(/ñ/g, 'n') // reemplazar ñ minúscula por n minúscula
      .replaceAll(/Ñ/g, 'N'); // reemplazar Ñ MAYUSCULA por N MAYUSCULA
  }

  if (clearSpecialCharacters) {
    newString = newString.replaceAll(/[^a-zA-Z0-9 áéíóúüÁÉÍÓÚÜñÑ]/g, ''); // borrar caracteres especiales
  }

  if (clearNumbers) {
    newString = newString.replaceAll(/\d+/g, ''); // borrar todos los numeros 0123456789
  }

  /*
   *********************************************
   * esto TIENE q estar al final de la funcion *
   ********************************************* */

  if (trimType === 'trim') {
    newString = newString.trim(); // borrar espacio en blanco al PRINCIPIO Y FINAL
  } else if (trimType === 'trimStart') {
    newString = newString.trimStart(); // borrar espacio en blanco al PRINCIPIO
  } else if (trimType === 'trimEnd') {
    newString = newString.trimEnd(); // borrar espacio en blanco al FINAL
  }

  if (clearBlankSpaces) {
    newString = newString
      .replace(/(\r\n|\n|\r)/gm, ' ') // borrar saltos de linea
      .replace(/\t/g, ' ') // borrar tabs
      .replaceAll(/\s+/g, ' '); // reemplazar múltiples espacios en blanco '   ' por un solo espacio en blanco ' '
  }

  if (caseTransform === 'titleCase') {
    newString = titleCase(newString); // mayusculas iniciales
  } else if (caseTransform === 'lowerCase') {
    newString = newString.toLocaleLowerCase('es-ES'); // convertir a minuscula
  } else if (caseTransform === 'upperCase') {
    newString = newString.toLocaleUpperCase('es-ES'); // convertir a MAYUSCULA
  }

  if (typeOfDash === '-') {
    newString = newString.replaceAll(' ', '-'); // reemplaza espacios por guion MEDIO "-"
  } else if (typeOfDash === '_') {
    newString = newString.replaceAll(' ', '_'); // reemplaza espacios por guion BAJO "_"
  }

  return newString;
};
