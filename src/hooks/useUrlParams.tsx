import { useState, useCallback } from "react";

export const useUrlParams = (paramName: string, defaultValue: string = "") => {
  const [searchParams] = useState(
    () => new URLSearchParams(window.location.search),
  );

  const [value, setValue] = useState<string>(
    searchParams.get(paramName) || defaultValue,
  );

  const updateValue = useCallback(
    (newValue: string) => {
      setValue(newValue);
      const newSearchParams = new URLSearchParams(window.location.search);

      if (newValue) {
        newSearchParams.set(paramName, newValue);
      } else {
        newSearchParams.delete(paramName);
      }

      window.history.pushState(
        {},
        "",
        `${window.location.pathname}?${newSearchParams.toString()}`,
      );
    },
    [paramName],
  );

  return [value, updateValue] as const;
};
