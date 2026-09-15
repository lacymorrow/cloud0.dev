import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { NuqsAdapter } from "nuqs/adapters/next/pages";
import { KitProvider } from "@/components/providers/kit-provider";
import { TeamProvider } from "@/components/providers/team-provider";
import { env } from "@/env";

/*
 * Devtools are loaded lazily and rendered only after mount.
 *
 * `ssr: false` is not usable here: Next 16.3 rejects it outside a Client
 * Component, and a "use client" module statically imported by a Pages Router
 * entry pulls the whole pages graph into the RSC layer (every "use client"
 * import below _app then fails to resolve private-next-rsc-mod-ref-proxy).
 * The mounted guard gives the same client-only behaviour without a directive.
 */
const TailwindIndicator = dynamic(() =>
  import("@/components/modules/devtools/tailwind-indicator").then((m) => m.TailwindIndicator)
);
const FontSelector = dynamic(() =>
  import("@/components/modules/devtools/font-selector").then((m) => m.FontSelector)
);

export default function PagesApp({ Component, pageProps }: AppProps) {
  const devtoolsEnabled = env.NEXT_PUBLIC_FEATURE_DEVTOOLS_ENABLED;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showDevtools = mounted && process.env.NODE_ENV === "development" && devtoolsEnabled;

  return (
    <KitProvider session={pageProps.session} pageProps={pageProps}>
      <NuqsAdapter>
        <TeamProvider initialTeams={[{ id: "personal", name: "Personal" }]}>
          <Component {...pageProps} />
          {showDevtools && (
            <>
              <TailwindIndicator />
              <FontSelector />
            </>
          )}
        </TeamProvider>
      </NuqsAdapter>
    </KitProvider>
  );
}
