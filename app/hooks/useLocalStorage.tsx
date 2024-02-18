import { useState, useEffect } from "react";

// Implementación de useLocalStorage
export default function useLocalStorage<T>(key: string, initialValue: T): any {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  const setValue = (value: T) => {
    if (value) {
      const jsonString = JSON.stringify(value);
      window.localStorage.setItem(key, jsonString);
      setStoredValue(value);
    }
  };

  useEffect(() => {
    try {
      const value = window.localStorage.getItem(key);
      if (value) {
        const parsed = JSON.parse(value || "") as T;
        setStoredValue(parsed);
      } else {
        setStoredValue(initialValue);
      }
    } catch (error) {
      console.error(error);
      setStoredValue(initialValue);
    }
  }, [key]);

  return [storedValue, setValue];
}
