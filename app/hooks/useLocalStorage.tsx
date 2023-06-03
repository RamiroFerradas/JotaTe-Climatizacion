import { useState, useEffect } from "react";

type SetValueFunction<T> = (value: T) => void;
type UseLocalStorageReturnType<T> = [T, SetValueFunction<T>];

export const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): UseLocalStorageReturnType<T> => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  const setValue: SetValueFunction<T> = (value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
    setStoredValue(value);
  };

  useEffect(() => {
    const value = window.localStorage.getItem(key);

    if (value) {
      try {
        const parsed = JSON.parse(value) as T;
        setStoredValue(parsed);
      } catch (error) {
        console.log(error);
        setStoredValue(initialValue);
      }
    } else {
      setStoredValue(initialValue);
    }
  }, [key, initialValue]);

  return [storedValue, setValue];
};
