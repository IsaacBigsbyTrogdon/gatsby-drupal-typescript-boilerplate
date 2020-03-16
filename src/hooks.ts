import React, { Dispatch } from 'react';

const useStateWithLocalStorage = (localStorageKey: string): Array<string | React.Dispatch<string>> => {
  const [value, setValue] = React.useState(
    // eslint-disable-next-line no-undef
    localStorage.getItem(localStorageKey) || '',
  );
  React.useEffect(() => {
    // eslint-disable-next-line no-undef
    localStorage.setItem(localStorageKey, value);
  }, [value]);
  return [value, setValue];
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// eslint-disable-next-line no-console
const placeholder = (): void => console.log('placeholder');

// const getStorage = ((key) => localStorage.getItem(key));

// const setStorage = ((key, value) => localStorage.setItem(key, value));

// const deleteStorage = ((key) => localStorage.setItem(key, ''));

// const useFetch = (url: string, options) => {
//   fetch(url, options).then((response) => response.json())
//     .catch((error) => console.error('Error:', error))
//     .then((data) => data);
//   // return defer.promise;
// };


export {
  useStateWithLocalStorage, placeholder,
  // getStorage, setStorage, deleteStorage,
};

// interface HttpResponse<T> extends Response {
//   parsedBody?: T;
// }
// export async function http<T>(
//   request: RequestInfo,
// ): Promise<HttpResponse<T>> {
//   const response: HttpResponse<T> = await fetch(request);
//   try {
//     // may error if there is no body
//     response.parsedBody = await response.json();
//   } catch (ex) {
//     console.log(ex);
//   }

//   if (!response.ok) {
//     throw new Error(response.statusText);
//   }
//   return response;
// }

// export async function get<T>(
//   path: string,
//   args: RequestInit = { method: 'GET', headers: { 'Content-Type': 'application/json' } },
// ): Promise<HttpResponse<T>> {
//   return http<T>(new Request(path, args));
// }

// export async function post<T>(
//   path: string,
//   body: any,
//   args: RequestInit = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(body),
//   },
// ): Promise<HttpResponse<T>> {
//   return http<T>(new Request(path, args));
// }

// export async function put<T>(
//   path: string,
//   body: any,
//   args: RequestInit = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(body),
//   },
// ): Promise<HttpResponse<T>> {
//   return http<T>(new Request(path, args));
// }
