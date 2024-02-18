import { useState, useEffect } from "react";

// Implementación de useLocalStorage
export default function useLocalStorage<T>(key: string, initialValue: T): any {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  const setValue = (value: any) => {
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
  }, [key]);

  return [storedValue, setValue];
}
