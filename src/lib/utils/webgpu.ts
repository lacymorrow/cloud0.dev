import * as React from "react";

declare global {
  interface Navigator {
    gpu?: {
      requestAdapter?: () => Promise<any>;
    };
  }
}

export function isWebGPUAvailable(): boolean {
  if (typeof window === "undefined") return false;
  return !!window.navigator?.gpu?.requestAdapter;
}

const subscribe = () => () => undefined;

// `false` on the server and during hydration, then the real capability check on the client.
export function useWebGPUAvailability(): boolean {
  return React.useSyncExternalStore(subscribe, isWebGPUAvailable, () => false);
}
