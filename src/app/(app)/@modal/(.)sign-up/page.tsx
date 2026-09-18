import { Suspense } from "react";
import { SignUpCard } from "@/app/(app)/(authentication)/sign-up/_components/sign-up-card";
import { Modal } from "@/components/primitives/modal";

/*
 * The form below reads search params on the client, which bails static
 * prerendering unless it sits inside a Suspense boundary. The root
 * loading.tsx used to supply one implicitly (and caused soft 404s
 * site-wide); this page owns its own now.
 */
export default function Page() {
  return (
    <Suspense fallback={null}>
      <Modal routeBack open>
        <SignUpCard />
      </Modal>
    </Suspense>
  );
}
