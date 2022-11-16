export interface CacheStorageProtocol {
  set: <T>(key: string, value: T) => void;
  get: <T>(key: string) => T | undefined;
  remove: (key: string) => void;
}
