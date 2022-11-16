import { CacheStorageProtocol } from "../../protocols/cache-storage-protocol";

export class CacheStorage implements CacheStorageProtocol {
  get<T>(key: string): T | undefined {
    const storedItem = localStorage.getItem(key);

    if (!storedItem) return undefined;

    return JSON.parse(storedItem);
  }

  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
