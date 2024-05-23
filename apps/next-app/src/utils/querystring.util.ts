/* eslint-disable @typescript-eslint/no-explicit-any */
export function objectToQueryString(obj: { [key: string]: any }): string {
  return Object.keys(obj)
    .map(key => {
      if (Array.isArray(obj[key])) {
        return obj[key]
          .map((value: any, index: number) => `${encodeURIComponent(key)}[${index}]=${encodeURIComponent(value)}`)
          .join('&');
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`;
    })
    .join('&');
}
