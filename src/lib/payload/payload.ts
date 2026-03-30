// Payload client with lazy dynamic imports so builds succeed without @payloadcms installed.

import { env } from "@/env";

// Initialize Payload
export const getPayloadClient = async () => {
  if (!env?.NEXT_PUBLIC_FEATURE_PAYLOAD_ENABLED) {
    return null;
  }

  try {
    const [{ getPayload }, { default: payloadConfig }] = await Promise.all([
      import("payload"),
      import("@payload-config"),
    ]);

    const payload = await getPayload({ config: payloadConfig });
    return payload;
  } catch (error) {
    console.warn("Payload failed to initialize", error);
    return null;
  }
};

// Export a singleton instance
export const payload = await getPayloadClient();
