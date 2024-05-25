export function objectToQueryString(obj: Record<string, any>): string {
  const keyValuePairs: string[] = [];

  function recursiveConvert(data: Record<string, string>, currentKey?: string) {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key];
        const newKey = currentKey ? `${currentKey}[${key}]` : key;

        if (typeof value === 'object' && !Array.isArray(value)) {
          // Recursively handle nested objects
          recursiveConvert(value, newKey);
        } else if (Array.isArray(value)) {
          // Handle array values
          value.forEach((arrayValue, index) => {
            const arrayKey = `${newKey}[${index}]`;

            if (arrayValue !== null && arrayValue !== undefined) {
              keyValuePairs.push(`${arrayKey}=${encodeURIComponent(arrayValue)}`);
            }
          });
        } else {
          // Remove null and undefined values from the query string
          if (value !== null && value !== undefined) {
            keyValuePairs.push(`${newKey}=${encodeURIComponent(value)}`);
          }
        }
      }
    }
  }

  recursiveConvert(obj);

  return keyValuePairs.join('&');
}

export function queryStringToObject(queryString: string): {
  [key: string]: string | string[] | Record<string, string>;
} {
  const params = new URLSearchParams(queryString);
  const result: {[key: string]: string | string[] | Record<string, string>} = {};

  for (const [key, value] of params.entries()) {
    const decodedKey = decodeURIComponent(key);
    const decodedValue = decodeURIComponent(value);

    if (/\[\]$/.test(decodedKey)) {
      // Handle array values
      const arrayKey = decodedKey.slice(0, -2);

      if (!Array.isArray(result[arrayKey])) {
        result[arrayKey] = [];
      }
      (result[arrayKey] as string[]).push(decodedValue);
    } else if (/\[\w+\]$/.test(decodedKey)) {
      // Handle nested objects
      const matches = decodedKey.match(/^(.*?)\[(\w+)\]$/);

      if (matches) {
        const objKey = matches[1];
        const nestedKey = matches[2];

        if (!result[objKey]) {
          result[objKey] = {};
        }
        (result[objKey] as Record<string, string>)[nestedKey] = decodedValue;
      }
    } else {
      result[decodedKey] = decodedValue;
    }
  }

  return result;
}
