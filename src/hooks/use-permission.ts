import { useSession } from "@/lib/auth/use-session";
import { useCallback, useEffect, useState } from "react";

interface PermissionContext {
  teamId?: string;
  projectId?: string;
}

interface UsePermissionOptions {
  resource: string;
  action: string;
  context?: PermissionContext;
}

/**
 * React hook for checking permissions on the client side
 *
 * Usage:
 * ```tsx
 * const { hasPermission, isLoading } = usePermission({
 *   resource: "team",
 *   action: "create",
 *   context: { teamId: "123" }
 * });
 *
 * if (isLoading) {
 *   return <div>Loading...</div>;
 * }
 *
 * return hasPermission ? (
 *   <button>Create Team</button>
 * ) : null;
 * ```
 */
export const usePermission = ({ resource, action, context }: UsePermissionOptions) => {
  const { data: session, status } = useSession();
  const [hasPermission, setHasPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const userId = session?.user?.id;

  const checkPermission = useCallback(async () => {
    // No session: nothing to check. Values are derived below instead of set here.
    if (!userId) {
      return;
    }

    try {
      setError(null);
      const params = new URLSearchParams();
      params.append("resource", resource);
      params.append("action", action);

      if (context?.teamId) {
        params.append("teamId", context.teamId);
      }

      if (context?.projectId) {
        params.append("projectId", context.projectId);
      }

      const response = await fetch(`/api/permissions/check?${params.toString()}`);

      setHasPermission(response.ok);
    } catch (error) {
      console.error("Error checking permission:", error);
      setError(error instanceof Error ? error : new Error(String(error)));
      setHasPermission(false);
    } finally {
      setIsLoading(false);
    }
  }, [userId, resource, action, context]);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch-on-change effect: checkPermission clears the previous error before refetching, and only runs when a user session exists
    void checkPermission();
  }, [status, checkPermission]);

  return {
    hasPermission: userId ? hasPermission : false,
    // Without a session there is no check to wait for, once the session itself has loaded.
    isLoading: userId ? isLoading : status === "loading",
    error,
    refresh: checkPermission,
  };
};
