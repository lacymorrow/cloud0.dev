"use client";

import { Suspense } from "react";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SignIn } from "@/app/(app)/(authentication)/sign-in/_components/sign-in";
import { Modal } from "@/components/primitives/modal";
import { routes } from "@/config/routes";

/*
 * The form below reads search params on the client, which bails static
 * prerendering unless it sits inside a Suspense boundary. The root
 * loading.tsx used to supply one implicitly (and caused soft 404s
 * site-wide); this page owns its own now.
 */
export default function Page() {
  const pathname = usePathname();
  const [shouldSkip, setShouldSkip] = useState(false);

  useEffect(() => {
    // Check if we should skip showing the modal (e.g., navigating from another auth page)
    const skip = sessionStorage.getItem("skipAuthModal") === "true";
    if (skip) {
      sessionStorage.removeItem("skipAuthModal");
      setShouldSkip(true);
    }
  }, []);

  // Don't show modal if navigating from another auth page
  if (shouldSkip) {
    return null;
  }

  // Only render the modal if we're actually on the sign-in route
  // This prevents the modal from persisting when navigating to other routes
  if (pathname !== routes.auth.signIn) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <Modal routeBack open>
        <SignIn />
      </Modal>
    </Suspense>
  );
}
