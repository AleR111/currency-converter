interface PersistentStorage {
    getItem(key: string): string | null;
    setItem(key: string, value: any): void;
}

class LocalStorage implements PersistentStorage {
    getItem(key: string) {
        const item = localStorage.getItem(key);
        console.log(
            '🚀 ~ file: localStorage.ts ~ line 9111111111 ~ LocalStorage ~ getItem ~ item',
            item
        );

        if (item === null) return undefined;

        if (item === 'null') return null;
        if (item === 'undefined') return undefined;

        try {
            return JSON.parse(item);
        } catch {}

        return item;
    }
    setItem(key: string, value: any) {
        if (value === undefined) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }
}

export const persistentStorage = new LocalStorage();
