import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export const MMKVStorage = {
  setItem: (name: string, value: string) => {
    return storage.set(name, value);
  },
  getItem: (name: string): string | null => {
    const value = storage.getString(name);

    return value ?? null;
  },
  removeItem: (name: string) => {
    return storage.delete(name);
  }
};
