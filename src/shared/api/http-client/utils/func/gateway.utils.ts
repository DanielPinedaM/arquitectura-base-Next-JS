import ErrorToast from '@/shared/ui/overlay/toast/ErrorToast';
import {
  IObjectLogs,
  IParamsValidateOptions,
  IRequestOptions,
  ApiResponse,
  IIsValidOptions,
  IValidateApiResponse,
} from '@/shared/api/http-client/data-types/interfaces/gateway.interface';
import { Method } from '@/shared/api/http-client/data-types/types/gateway.type';
import {
  isFile,
  isLiteralObject,
  isNumber,
  isString,
  literalObjectLength,
} from '@/shared/utils/func/dataType.utils';
import { isUseClient } from '@/shared/utils/func/general.utils';
import { currentDateAndTime } from '@/shared/utils/func/luxon.utils';
import { getCookie } from 'cookies-next';
import { redirect } from 'next/navigation';

function pathnameIsLogin(): boolean {
  if (!isUseClient()) {
    console.error('❌ error, NO se puede determinar si la URL actual es iniciar sesion /');
    return false;
  }

  const login: string = '/iniciar-sesion';

  const pathname: string = window.location.pathname;

  return pathname === login;
}

function redirectToLoginInUseClient(): void {
  if (!isUseClient()) {
    console.error('❌ error al re-dirigir a /iniciar-sesion');
    return;
  }

  const login: string = '/iniciar-sesion';

  if (!pathnameIsLogin()) {
    window.location.href = login;
  }
}

/**
http status sin contenido Content-Length 0 */
export function isNoContentStatus(status: number): boolean {
  if (typeof status !== 'number') {
    console.error(
      '❌ error: el HTTP status NO es un numero\n status',
      status,
      '\ntypeof status ',
      typeof status,
    );
    return false;
  }

  return (status >= 100 && status < 200) || [204, 205, 304].includes(status);
}

/**
validar URL q llama al endpoint */
export function isValidUrl({ url, method, options }: IParamsValidateOptions): IIsValidOptions {
  const urlString: string = String(url);

  const invalidUrl: boolean =
    !urlString.startsWith('http') || urlString === process.env.NEXT_PUBLIC_API;

  if (invalidUrl) {
    const message: string = 'URL invalida';

    errorLogs({
      message,
      method,
      url,
      options,
    });

    return { valid: false };
  }

  return { valid: true };
}

/**
Validar que el método GET NO tenga body */
export function validateBodyWithGetMethod({
  url,
  method,
  options,
}: IParamsValidateOptions): IIsValidOptions {
  const body: any = options?.body;

  const isInvalid: boolean = Boolean(body) && method === 'GET';

  if (isInvalid) {
    const message: string = `❌ error el método HTTP GET NO puede tener body ${JSON.stringify(
      body,
    )}`;

    errorLogs({
      message,
      method,
      url,
      options,
    });

    return { valid: false };
  }

  return { valid: true };
}

/**
obtener token en componentes cliente 'use client' y servidor 'use server' */
export async function getToken(): Promise<string | null> {
  let token: string | null = null;

  // 'use client'
  if (isUseClient()) {
    token = (await getCookie('token')) ?? null;
  } else {
    // 'use server'
    try {
      const headers = await import('next/headers');
      const cookieStore = await headers.cookies();
      token = cookieStore.get('token')?.value ?? null;
    } catch (error) {
      console.error(
        "❌ error en dynamic import de import { headers } from 'next/headers', NO se puedo obtener el token en componente servidor 'use server'",
        error,
      );

      token = null;
    }
  }

  return token;
}

/**
funcion para cerrar sesion en 'use client' y 'use server', */
export function handleUnauthorized(): void {
  const login: string = '/iniciar-sesion';

  // 1) eliminar token
  // 2) re-dirigir a iniciar sesion
  // en componentes:

  // 'use client'
  if (isUseClient()) {
    redirectToLoginInUseClient();

    // 'use server'
  } else {
    redirect(login);
  }
}

/**
funcion para devolver a la pagina web anterior en 'use client' y 'use server', */
export function returnToBrowserHistory(): void {
  const login: string = '/iniciar-sesion';

  // 'use client'
  if (isUseClient()) {
    if (window.history.length > 1) {
      window.history.go(-1);
    } else {
      redirectToLoginInUseClient();
    }

    // 'use server'
  } else {
    redirect(login);
  }
}

/**
logs de peticiones HTTP erroneas ❌ */
export function errorLogs(objectLogs: IObjectLogs): void {
  // NO imprimir logs en produccion
  if (process.env.NEXT_PUBLIC_NODE_ENV === 'production') return;

  const { message, method, url, options, result, response, showLogger } = objectLogs;

  if (!showLogger) return;

  const objError: any = {};

  const componentType: string = isUseClient()
    ? "componente CLIENTE 'use client'"
    : "componente SERVIDOR 'use server'";

  objError.componentType = componentType;

  if (message) objError.message = message;

  if (response?.status) objError.status = response.status;

  if (response?.statusText) objError.statusText = response.statusText;

  if (method) objError.method = method;

  if (url) objError.url = url;

  if (process?.env?.NEXT_PUBLIC_NODE_ENV)
    objError.environment = `las variables de entorno estan apuntando al ambiente de ➡️ ${process.env.NEXT_PUBLIC_NODE_ENV} ⬅️`;

  objError.timestamp = currentDateAndTime();

  if (literalObjectLength(options) > 0) objError.options = options;

  objError.isJsonResponse =
    response?.headers?.get('content-type')?.includes('application/json') ?? false;

  objError.apiResponse = result ? result : response;

  console.error('❌ error en peticion HTTP, informacion del error:\n', objError);
}

/**
logs de peticiones HTTP exitosas ✅ */
export function successLogs(objectLogs: IObjectLogs): void {
  // NO imprimir logs en produccion
  if (process.env.NEXT_PUBLIC_NODE_ENV === 'production') return;

  const { method, url, options, response, result, showLogger } = objectLogs;

  if (!showLogger) return;

  console.info('\n', '✅ ', '[', method, ']', url);

  if (isFile(options?.body)) console.info('✅ archivo(s) subido(s)');

  if (options?.body) console.info('body ', options?.body);

  const componentType: string = isUseClient()
    ? "componente CLIENTE 'use client'"
    : "componente SERVIDOR 'use server'";

  console.info(componentType);

  console.info(`respuesta de la API apuntando a ➡️ ${process.env.NEXT_PUBLIC_NODE_ENV} ⬅️ \n`);

  const { success: successApi, status: statusApi, message: messageApi, data: dataApi } = result ?? {};

  const objectSuccesResponse: ApiResponse = {
    success: (validateResponse ? successApi : response?.ok) as boolean,
    status: (validateResponse ? statusApi : response?.status) as number,
    message: (validateResponse ? messageApi : response?.statusText) as string,
    data: [],
  };

  if (isNoContentStatus(response?.status as number)) {
    console.info(objectSuccesResponse, '\n');
    return;
  }

  let dataMessage: string = '';

  const newData: any = validateResponse ? dataApi : result;

  if (newData) {
    if (Array.isArray(newData)) {
      if (newData?.length === 0) {
        dataMessage = 'array vacío ➡️ (0) []';
      } else {
        // data es un array de objetos [{}]
        const areAllObjects: boolean = newData?.every(
          (item) => typeof item === 'object' && item && item !== null,
        );
        if (areAllObjects) {
          dataMessage = `array de objetos con ${newData.length} elemento ➡️ (${newData.length}) [{}]`;
        } else {
          // data es un array []
          dataMessage = `array de ${newData.length} elementos ➡️ (${newData.length}) []`;
        }
      }
    }

    // data es un objeto literal {}
    else if (isLiteralObject(newData)) {
      const length: number | null = literalObjectLength(newData);

      if (length === 0) {
        dataMessage = 'objeto literal vacío ➡️ (0) {}';
      } else {
        dataMessage = `objeto literal con ${length} keys ➡️ (${length}) {}`;
      }
    }
  }

  objectSuccesResponse.data = dataMessage;

  console.info(objectSuccesResponse, '\n');
}

/**
manejar mensajes de error q vienen del servidor (API) */
export function errorHandling(status: number | undefined, url: string): void {
  if (typeof status !== 'number') {
    console.error('❌ error: no se pudo obtener el HTTP status de la respuesta de la API ');
    return;
  }

  if (
    status === 401 &&
    // NO detener la ejecucion del codigo al de-codificar token en middleware.ts
    // redirect() solamente funciona en componentes servidor, NO en middleware.ts
    url !== process.env.NEXT_PUBLIC_AUTH_PROFILE
  ) {
    console.error(
      '❌ http.service.ts - Error 401: unauthenticated',
      '\nDetalle: El usuario no está autenticado o la sesión ha expirado',
      '\nAcción: Re-dirigir al usuario a la página de inicio de sesión',
      '\nURL solicitada: ',
      url,
    );

    // re-dirigir a /iniciar-sesion cuando el status de la respuesta de la api sea 401
    handleUnauthorized();

    if (!pathnameIsLogin() && isUseClient()) ErrorToast('Inicie sesión para continuar');
  } else if (status === 403) {
    console.error(
      '❌ http.service.ts - Error 403: Forbidden',
      '\nDetalle: El usuario está autenticado pero no tiene permisos para acceder al recurso',
      "\nAcción: Mostrar un mensaje de 'acceso denegado' o re-dirigir y re-dirigir a la pagina web anterior en el historial del navegador",
      '\nURL solicitada:',
      url,
    );

    // devolverme a la web anterior en el historial cuando el status de la respuesta de la api sea 403
    returnToBrowserHistory();

    if (isUseClient()) ErrorToast('Acceso denegado, no tiene permisos para realizar esta acción');
  } else if (status === 404) {
    console.error(
      `❌ http.service.ts - error 404: Not Found - endpoint no encontrado, la URL solicitada "${url}" NO existe en el servidor`,
    );

    if (isUseClient())
      ErrorToast('Ha ocurrido un error, por favor comuniquese con el administrador del sistema');
  } else if (status >= 500) {
    console.error(`❌ http.service.ts - error en el servidor en la URL ${url}`);

    if (isUseClient())
      ErrorToast(
        'Ha ocurrido un error, intentalo de nuevo mas tarde, estamos trabajando para solucionarlo',
      );
  }
}

/**
validar respuesta de la API 
para NO detener la ejecucion del front
cuando la API (backend) esta caida */
export function validateApiResponse({
  result,
  response,
  responseType,
  method,
  url,
  options,
}: IValidateApiResponse): ApiResponse | Blob | FormData {
  const errorMessage: string =
    '❌ Error 503 Service Unavailable - Posibles causas: \n' +
    '1) La API del backend podría estar caída. \n' +
    '2) El backend no está respondiendo con el tipo esperado (ApiResponse). \n' +
    '3) Si está intentando descargar un archivo, asegúrese de que el backend responda con el tipo json | text | blob | arrayBuffer | formData';

  /* -------- ❌ respuesta ERRONEA -------- */
  const safeResult: ApiResponse | any = result ?? {};
  const { success, status, message, data, ...rest }: ApiResponse | any = safeResult;

  // objeto q se devuelve en caso de q NO funcione la respuesta de la API del back
  const finalResponse: ApiResponse = {
    success: false,
    status: 503,
    message: errorMessage,
    data: [],

    // agregar cualquier key q venga de la API y q sea DIFERENTE de success, status, message y data
    ...rest,
  };

  // retorna el archivo o texto plano recibido del backend
  if (isFile(result) || ['text', 'blob', 'arrayBuffer', 'formData'].includes(responseType))
    return result;

  // a partir de aqui la respuesta de la api tiene q ser un responseType === "json"
  // validar q exista la respuesta de la API del backend
  if (
    !result ||
    !isLiteralObject(result) ||
    typeof result?.success !== 'boolean' ||
    !isNumber(result?.status)
  ) {
    errorLogs({
      message: errorMessage,
      method,
      url,
      options,
      result,
      response,
    });

    return finalResponse;
  }

  /* -------- ✅ respuesta EXITOSA -------- */
  // siempre extraer `data` en un solo nivel, eliminando `data.data`
  let searchData: any = result?.data;
  while (typeof searchData === 'object' && 'data' in searchData) {
    searchData = searchData.data;
  }

  const searchMessage: string =
    isString(result?.message) || isNumber(result?.message) ? result.message : '';

  return {
    ...(result ?? {}),
    message: searchMessage,
    data: searchData,
  };
}

/**
validar env en los q por defecto NO se incluye el token */
export function defaultSecurityEndpoint(url: string): boolean {
  // aqui agregar nuevos env a los q NO se les envia el token al hacer peticion http
  const unprotectedURLs: string[] = [process.env.NEXT_PUBLIC_AUTH_LOGIN] as string[];

  for (const item of unprotectedURLs) {
    if (!isString(item)) {
      console.error(
        `❌ ERROR CRÍTICO\n verifica q el env ${item} este agregado a las variables de entorno \n unprotectedURLs`,
        unprotectedURLs,
      );
      return false;
    }
  }

  // validar env en los q NO se incluye en token
  return !unprotectedURLs.some((item: string) => url === item);
}

/**
la API respondio con un tipo archivo */
export async function responseFile<T>(
  response: Response,
  responseType: 'blob' | 'arrayBuffer' | 'formData',
  method: Method,
  url: string,
  options: IRequestOptions,
  message: string,
): Promise<T> {
  // capturar respuesta de error de la API cuando falla la descarga del archivo
  const contentType: string = response?.headers?.get('content-type') ?? '';

  if (contentType && contentType?.includes('application/json')) {
    const result = await response.json();

    errorLogs({
      message,
      method,
      url,
      options,
      result,
      response,
    });

    return result;
  }

  if (responseType === 'blob') return (await response.blob()) as T;
  if (responseType === 'arrayBuffer') return (await response.arrayBuffer()) as T;
  if (responseType === 'formData') return (await response.formData()) as T;

  return {
    success: false,
    status: 400,
    message: `formato de respuesta responseType ${responseType} no valido en responseFile`,
    data: [],
  } as T;
}
