const STORAGE_PREFIX = 'pfs_';

export function getStorageItem<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    console.error(`Failed to parse localStorage item: ${key}`);
    return null;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
  } catch {
    console.error(`Failed to write localStorage item: ${key}`);
  }
}

export function removeStorageItem(key: string): void {
  localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
}

export function hasStorageItem(key: string): boolean {
  return localStorage.getItem(`${STORAGE_PREFIX}${key}`) !== null;
}

export function clearAllStorage(): void {
  Object.keys(localStorage)
    .filter((k) => k.startsWith(STORAGE_PREFIX))
    .forEach((k) => localStorage.removeItem(k));
}
