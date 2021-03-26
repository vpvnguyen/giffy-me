import { useState, useEffect } from "react";

export const useStateWithLocalStorage = (localStorageKey: string) => {
  const [value, setValue] = useState<string>(
    localStorage.getItem(localStorageKey) || ""
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);

  return [value, setValue] as const;
};
