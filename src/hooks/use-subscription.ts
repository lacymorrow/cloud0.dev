"use client";

import { useSession } from "@/lib/auth/use-session";
import { useCallback, useEffect, useState } from "react";
import { routes } from "@/config/routes";

type SubscriptionProvider = "lemonsqueezy" | "polar";

// API helper for checking subscription status
async function checkSubscriptionStatus(
  provider?: SubscriptionProvider
): Promise<{ success: boolean; hasSubscription: boolean; message?: string }> {
  try {
    const url = new URL(routes.api.payments.checkSubscription, window.location.origin);
    if (provider) {
      url.searchParams.set("provider", provider);
    }
    const response = await fetch(url.toString());
    if (!response.ok) {
      return { success: false, hasSubscription: false, message: "Failed to check subscription" };
    }
    return response.json();
  } catch {
    return { success: false, hasSubscription: false, message: "Failed to check subscription" };
  }
}

// Simple cache to prevent repeated API calls
const subscriptionCache = new Map<string, { data: boolean; timestamp: number }>();
const pendingSubscriptionChecks = new Map<
  string,
  Promise<{ success: boolean; hasSubscription: boolean; message?: string }>
>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Hook to check if the current user has an active subscription
 */
export function useSubscription(provider?: SubscriptionProvider) {
  const { data: session, status } = useSession();
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = session?.user?.id;

  // Memoize the check function to prevent unnecessary re-renders
  const checkSubscription = useCallback(async () => {
    if (status === "loading") return;

    if (!userId) {
      setHasActiveSubscription(false);
      setIsLoading(false);
      return;
    }

    // Check cache first
    const cacheKey = `${userId}-${provider ?? "all"}`;
    const cached = subscriptionCache.get(cacheKey);
    const now = Date.now();

    if (cached && now - cached.timestamp < CACHE_DURATION) {
      setHasActiveSubscription(cached.data);
      setIsLoading(false);
      return;
    }

    try {
      /*
       * Multiple user menus can mount at the same time (header + sidebar).
       * Share the in-flight request so they do not fan out identical checks.
       */
      const pendingRequest =
        pendingSubscriptionChecks.get(cacheKey) ?? checkSubscriptionStatus(provider);

      if (!pendingSubscriptionChecks.has(cacheKey)) {
        pendingSubscriptionChecks.set(cacheKey, pendingRequest);
      }

      const result = await pendingRequest;

      if (!result.success) {
        setHasActiveSubscription(false);
        setError(result.message ?? "Failed to check subscription");
        return;
      }

      // Cache the result
      subscriptionCache.set(cacheKey, {
        data: result.hasSubscription,
        timestamp: now,
      });

      setHasActiveSubscription(result.hasSubscription);
      setError(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setHasActiveSubscription(false);
      setError(errorMessage);
    } finally {
      pendingSubscriptionChecks.delete(cacheKey);
      setIsLoading(false);
    }
  }, [userId, status, provider]); // Only depend on stable values

  useEffect(() => {
    // Only run if we have a stable user ID and status is not loading
    if (status !== "loading" && userId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch-on-change effect: a fresh cache hit is applied synchronously on purpose so the menu does not flash a loading state
      void checkSubscription();
    }
  }, [userId, status, checkSubscription]);

  // Unauthenticated: derive the cleared state instead of setting it in an effect.
  if (status === "unauthenticated") {
    return { hasActiveSubscription: false, isLoading: false, error: null };
  }

  return {
    hasActiveSubscription,
    isLoading,
    error,
  };
}
