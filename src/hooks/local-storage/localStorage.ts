interface PersistentStorage {
    getItem(key: string): string | null;
    setItem(key: string, value: any): void;
}

class LocalStorage implements PersistentStorage {
    getItem<T>(key: string): T {
        const item = localStorage.getItem(key);

        if (item === null) return null;

        if (item === 'null') return null;
        if (item === 'undefined') return undefined;

        try {
            return JSON.parse(item);
        } catch {}
    }
    setItem<T>(key: string, value: T) {
        if (value === undefined) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }
}

export const persistentStorage = new LocalStorage();
