import * as React from "react";

const subscribe = () => () => undefined;

// `false` on the server and during hydration, `true` once mounted on the client.
export function useMounted() {
  return React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
