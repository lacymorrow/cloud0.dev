import type { Metadata } from "next";
import type { Manifest } from "next/dist/lib/metadata/types/manifest-types";

// import { routes } from "@/config/routes"; // Import if needed for startUrl

/**
 * Site Configuration
 *
 * Central configuration for site-wide settings, branding, and metadata.
 * Used throughout the application for consistent branding and functionality.
 */

interface ManifestConfig {
  startUrl: string;
  display: Manifest["display"];
  displayOverride?: Manifest["display_override"];
  orientation: Manifest["orientation"];
  categories: Manifest["categories"];
  dir: Manifest["dir"];
  lang: Manifest["lang"];
  preferRelatedApplications: Manifest["prefer_related_applications"];
  scope: Manifest["scope"];
  launchHandler?: Manifest["launch_handler"];
  icons: {
    favicon: string;
    appIcon192: string;
    appIcon512: string;
  };
  relatedApplications?: Manifest["related_applications"];
}

interface PayloadConfig {
  adminTitleSuffix: string;
  adminIconPath: string;
  adminLogoPath: string;
  dbSchemaName: string;
  emailFromName: string;
}

interface SiteConfig {
  // Core site information
  name: string;
  title: string;
  url: string;
  ogImage: string;
  description: string;
  tagline: string;
  // UI behavior settings
  behavior: {
    pageTransitions: boolean;
  };

  // Branding information
  branding: {
    projectName: string;
    projectSlug: string;
    productNames: {
      // TODO: Remove these once we have a proper product name
      bones: string;
      brains: string;
      main: string;
    };
    domain: string;
    protocol: string;
    githubOrg: string;
    githubRepo: string;
    vercelProjectName: string;
    databaseName: string;
  };

  // External links
  links: {
    twitter: string;
    twitter_follow: string;
    x: string;
    x_follow: string;
    github: string;
  };

  // Social profiles (single source of truth for top networks)
  /**
   * Centralized social links for the project/org. Empty strings mean "disabled".
   * Use helper utilities to get an enabled list for rendering.
   */
  social: {
    github?: string;
    twitter?: string;
    x?: string;
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
    tiktok?: string;
    discord?: string;
    dribbble?: string;
    threads?: string;
  };

  // Repository information
  repo: {
    owner: string;
    name: string;
    url: string;
    format: {
      clone: () => string;
      ssh: () => string;
    };
  };

  // Email addresses and formatting
  email: {
    support: string;
    team: string;
    noreply: string;
    domain: string;
    legal: string;
    privacy: string;
    format: (type: Exclude<keyof SiteConfig["email"], "format">) => string;
  };

  // Creator information
  creator: {
    name: string;
    email: string;
    url: string;
    twitter: string;
    twitter_handle: string;
    domain: string;
    fullName: string;
    role: string;
    avatar: string;
    location: string;
    bio: string;
  };

  // E-commerce store configuration
  store: {
    id: string;
    products: Record<string, string>;
  };

  // SEO and metadata
  metadata: {
    keywords: string[];
    themeColor: {
      light: string;
      dark: string;
    };
    locale: string;
    generator: string;
    referrer: Metadata["referrer"];
    category: string;
    classification: string;
    openGraph: {
      imageWidth: number;
      imageHeight: number;
    };
    twitter: {
      card: "summary" | "summary_large_image" | "app" | "player";
    };
    robots: Metadata["robots"];
    formatDetection: Metadata["formatDetection"];
    alternates: Metadata["alternates"];
    appleWebApp: Metadata["appleWebApp"];
    appLinks: Metadata["appLinks"];
    assetsPath: string;
    bookmarksPath: string;
    blogPath?: string;
  };

  // Application settings
  app: {
    apiKeyPrefix: string;
  };

  // PWA Manifest settings
  manifest: ManifestConfig;

  // Payload CMS settings
  payload: PayloadConfig;
}

// Use 'let' to allow modification after definition
export const siteConfig: SiteConfig = {
  behavior: {
    pageTransitions: true,
  },

  name: "cloud0",
  title: "Launch your app today",
  tagline: "Launch your app at light speed.",
  url: "https://cloud0.dev",
  ogImage: "https://cloud0.dev/og",
  description:
    "Launch your app at light speed. Fast, flexible, and feature-packed for the modern web.",

  branding: {
    projectName: "cloud0",
    projectSlug: "cloud0",
    productNames: {
      bones: "Core",
      brains: "Enterprise",
      main: "cloud0",
    },
    domain: "cloud0.dev",
    protocol: "web+cloud0",
    githubOrg: "cloud0-org",
    githubRepo: "cloud0",
    vercelProjectName: "cloud0-app",
    databaseName: "cloud0",
  },

  links: {
    twitter: "https://twitter.com/lacybuilds",
    twitter_follow: "https://twitter.com/intent/follow?screen_name=lacybuilds",
    x: "https://x.com/lacybuilds",
    x_follow: "https://x.com/intent/follow?screen_name=lacybuilds",
    github: "https://github.com/lacymorrow/shipkit",
  },

  // Configure social profiles here. Leave any you don't use as empty strings.
  social: {
    github: "",
    x: "",
    linkedin: "",
    instagram: "",
    facebook: "",
    youtube: "",
    tiktok: "",
    discord: "",
    dribbble: "",
    threads: "",
  },

  repo: {
    owner: "cloud0-org",
    name: "cloud0",
    url: "https://github.com/cloud0-org/cloud0",
    format: {
      // Placeholder format functions - assigned below
      clone: () => "",
      ssh: () => "",
    },
  },

  email: {
    support: "support@cloud0.dev",
    team: "team@cloud0.dev",
    noreply: "noreply@cloud0.dev",
    domain: "cloud0.dev",
    legal: "legal@cloud0.dev",
    privacy: "privacy@cloud0.dev",
    // Placeholder format function - assigned below
    format: (_type) => "",
  },

  creator: {
    name: "cloud0",
    email: "hello@cloud0.dev",
    url: "https://cloud0.dev",
    twitter: "@cloud0",
    twitter_handle: "cloud0",
    domain: "cloud0.dev",
    fullName: "cloud0 Team",
    role: "Developer",
    avatar: "https://avatars.githubusercontent.com/u/1311301?v=4",
    location: "San Francisco, CA",
    bio: "Creator and developer.",
  },

  store: {
    id: "shipkit",
    products: {
      // LemonSqueezy Checkout URLs use Variant IDs (not Product IDs)
      // Format: variant UUID from LemonSqueezy dashboard
      shipkit: "411883",
      // Examples:
      bones: "411883",
      brains: "411883",
    },
  },

  metadata: {
    keywords: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Server Components",
      "cloud0",
      "Shadcn",
      "UI Components",
    ],
    themeColor: {
      light: "white",
      dark: "black",
    },
    locale: "en-US",
    generator: "Next.js, shipkit.io",
    referrer: "origin-when-cross-origin",
    category: "technology", // Use technology as category
    classification: "Business Software",
    openGraph: {
      imageWidth: 1200,
      imageHeight: 630,
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {},
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      startupImage: [
        {
          url: "/apple-touch-icon.png",
          media: "(device-width: 768px) and (device-height: 1024px)",
        },
      ],
    },
    appLinks: {},
    assetsPath: "/assets",
    bookmarksPath: "/",
    // blogPath is now conditionally added below
  },

  manifest: {
    startUrl: "/", // Use literal for now, update below if needed
    display: "standalone",
    displayOverride: ["window-controls-overlay"],
    orientation: "portrait-primary",
    categories: ["development", "productivity", "utilities"],
    dir: "ltr",
    lang: "en-US",
    preferRelatedApplications: false,
    scope: "/",
    launchHandler: { client_mode: ["navigate-existing", "auto"] },
    icons: {
      favicon: "/favicon.ico",
      appIcon192: "/app/web-app-manifest-192x192.png",
      appIcon512: "/app/web-app-manifest-512x512.png",
    },
    relatedApplications: [],
  },

  payload: {
    adminTitleSuffix: " CMS", // Updated below
    adminIconPath: "./lib/payload/components/payload-icon",
    adminLogoPath: "./lib/payload/components/payload-logo",
    dbSchemaName: "payload",
    emailFromName: "Payload CMS",
  },

  app: {
    apiKeyPrefix: "sk",
  },
};

// Assign dynamic values AFTER the main object is defined
siteConfig.repo.format = {
  clone: () => `https://github.com/${siteConfig.repo.owner}/${siteConfig.repo.name}.git`,
  ssh: () => `git@github.com:${siteConfig.repo.owner}/${siteConfig.repo.name}.git`,
};

siteConfig.email.format = (type: Exclude<keyof SiteConfig["email"], "format">) =>
  siteConfig.email[type];

siteConfig.payload.adminTitleSuffix = ` - ${siteConfig.title} CMS`;

// siteConfig.manifest.startUrl = routes.home; // Uncomment and import routes if needed

// Make sure alternates exists before assigning canonical
siteConfig.metadata.alternates ??= {};
siteConfig.metadata.alternates.canonical = "./";

// Check appleWebApp is an object before assigning title
if (siteConfig.metadata.appleWebApp && typeof siteConfig.metadata.appleWebApp === "object") {
  siteConfig.metadata.appleWebApp.title = siteConfig.title;
}

// Ensure appLinks and appLinks.web are objects before assigning url
siteConfig.metadata.appLinks ??= {};
siteConfig.metadata.appLinks.web ??= { url: "", should_fallback: false }; // Initialize web if needed
// Check type again after potential initialization
if (
  siteConfig.metadata.appLinks?.web &&
  typeof siteConfig.metadata.appLinks.web === "object" &&
  !Array.isArray(siteConfig.metadata.appLinks.web) // Ensure it's not an array
) {
  siteConfig.metadata.appLinks.web.url = siteConfig.url;
}

// Update paths to be absolute URLs based on siteConfig.url
siteConfig.metadata.assetsPath = `${siteConfig.url}/assets`;
siteConfig.metadata.bookmarksPath = `${siteConfig.url}/`;

if (process.env.NEXT_PUBLIC_HAS_BLOG === "true") {
  siteConfig.metadata.blogPath = `${siteConfig.url}/blog`;
}

// Freeze the object to prevent accidental modifications later (optional)
// Object.freeze(siteConfig);
