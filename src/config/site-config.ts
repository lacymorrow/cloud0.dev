/**
 * Site Configuration
 *
 * Central configuration for site-wide settings, branding, and metadata.
 * Used throughout the application for consistent branding and functionality.
 */

interface SiteConfig {
  // Core site information
  name: string;
  title: string;
  url: string;
  ogImage: string;
  description: string;

  // UI behavior settings
  behavior: {
    pageTransitions: boolean;
  };

  // Branding information
  branding: {
    projectName: string;
    projectSlug: string;
    productNames: {
      bones: string;
      muscles: string;
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
    domain: string;
    products: {
      bones: string;
      muscles: string;
      brains: string;
      shipkit: string;
    };
    format: {
      buyUrl: (product: keyof SiteConfig["store"]["products"]) => string;
    };
  };

  // Admin access control
  admin: {
    emails: string[];
    domains: string[];
    isAdmin: (email: string) => boolean;
  };

  // SEO and metadata
  metadata: {
    keywords: string[];
    themeColor: {
      light: string;
      dark: string;
    };
  };

  // Application settings
  app: {
    apiKeyPrefix: string;
  };
}

export const siteConfig: SiteConfig = {
  behavior: {
    pageTransitions: true,
  },

  name: "cloud0",
  title: "Launch your app today",
  url: "https://cloud0.dev",
  ogImage: "https://cloud0.dev/og",
  description:
    "Launch your app at light speed. Fast, flexible, and feature-packed for the modern web.",

  branding: {
    projectName: "cloud0",
    projectSlug: "cloud0",
    productNames: {
      bones: "Core",
      muscles: "Pro",
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

  repo: {
    owner: "cloud0-org",
    name: "cloud0",
    url: "https://github.com/cloud0-org/cloud0",
    format: {
      clone: () => "https://github.com/cloud0-org/cloud0.git",
      ssh: () => "git@github.com:cloud0-org/cloud0.git",
    },
  },

  email: {
    support: "support@cloud0.dev",
    team: "team@cloud0.dev",
    noreply: "noreply@cloud0.dev",
    domain: "cloud0.dev",
    legal: "legal@cloud0.dev",
    privacy: "privacy@cloud0.dev",
    format: (type) => siteConfig.email[type],
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
    domain: "shipkit.lemonsqueezy.com",
    products: {
      bones: "eb159dba-96a3-40f2-a97b-7b9117e635a1",
      muscles: "4d259175-0a79-486a-b0f8-b77404ee68df",
      brains: "7935a386-7cd0-47fe-83c8-cab101323591",
      shipkit: "20b5b59e-b4c4-43b0-9979-545f90c76f28",
    },
    format: {
      buyUrl: (product) =>
        `https://shipkit.lemonsqueezy.com/checkout/buy/${siteConfig.store.products[product]}`,
    },
  },

  admin: {
    emails: ["lacymorrow0@gmail.com", "gojukebox@gmail.com"],
    domains: ["lacymorrow.com"],
    isAdmin: (email) =>
      siteConfig.admin.emails.includes(email) ||
      siteConfig.admin.domains.some((domain) => email?.endsWith(`@${domain}`)),
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
  },

  app: {
    apiKeyPrefix: "sk",
  },
};
