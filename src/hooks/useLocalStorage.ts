import { useState, useEffect, useRef } from 'react';

/**
 * A hook that syncs state with localStorage
 * @param key The localStorage key to use
 * @param initialValue The initial value if localStorage doesn't have a value for the key
 * @returns A tuple with the current value and a setter function
 */
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Keep track of the current key for comparison
  const keyRef = useRef<string | null>(null);

  // Function to get the current value from localStorage
  const getStoredValue = (storageKey: string, fallbackValue: T): T => {
    if (!storageKey) return fallbackValue;

    try {
      const item = window.localStorage.getItem(storageKey);
      return item ? JSON.parse(item) : fallbackValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${storageKey}":`, error);
      return fallbackValue;
    }
  };

  // Initialize state with stored value or initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    return getStoredValue(key, initialValue);
  });

  // Update local state whenever the key changes
  useEffect(() => {
    // Don't do anything if the key is empty or unchanged
    if (!key || key === keyRef.current) return;

    // Update ref to new key
    keyRef.current = key;

    // Load data from localStorage with the new key
    const valueFromStorage = getStoredValue(key, initialValue);
    setStoredValue(valueFromStorage);
  }, [key, initialValue]);

  // Custom setter that also updates localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    // Don't try to save if key is empty
    if (!key) return;

    try {
      // Allow function updates like setValue(prev => prev + 1)
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // Save to state
      setStoredValue(valueToStore);

      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;