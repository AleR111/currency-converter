import {useEffect, useState} from 'react';

import {persistentStorage} from './localStorage';

export const useLocalStorage = <T>(key: string, initialValue?: T) => {
    console.log("🚀 ~ file: useLocalStorage.ts ~ line 6111 ~ useLocalStorage ~ key", key, initialValue)
    const [value, setValue] = useState<T>(() => {
        const valueFromStorage = persistentStorage.getItem(key);
        console.log("🚀 ~ file: useLocalStorage.ts ~ line 99999 ~ useLocalStorage ~ valueFromStorage", valueFromStorage)

        if (
            typeof initialValue === 'object' &&
            !Array.isArray(initialValue) &&
            initialValue !== null
        ) {
            return {
                ...initialValue,
                ...valueFromStorage,
            };
        }

        return valueFromStorage || initialValue;
    });
    console.log("🚀 ~ file: useLocalStorage.ts ~ line 23 ~ useLocalStorage ~ value", value)

    useEffect(() => {
        persistentStorage.setItem(key, value);
    }, [key, value]);

    return [value, setValue] as const;
};
