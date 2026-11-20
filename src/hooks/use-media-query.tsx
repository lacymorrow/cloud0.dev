import * as React from "react";

export function useMediaQuery(query: string) {
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      const result = matchMedia(query);
      result.addEventListener("change", onChange);
      return () => result.removeEventListener("change", onChange);
    },
    [query]
  );

  const getSnapshot = React.useCallback(() => matchMedia(query).matches, [query]);

  // Server and first hydration render report `false`, then the client snapshot takes over.
  return React.useSyncExternalStore(subscribe, getSnapshot, () => false);
}
