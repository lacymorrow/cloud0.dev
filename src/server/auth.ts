import { routes } from "@/config/routes";
import { STATUS_CODES } from "@/config/status-codes";
import { env } from "@/env";
import { logger } from "@/lib/logger";
import { redirectWithCode } from "@/lib/utils/redirect-with-code";
import { authOptions } from "@/server/auth.config";
import { db } from "@/server/db";
import { accounts, sessions, users, verificationTokens } from "@/server/db/schema";
import type { UserRole } from "@/types/user";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import { cache } from "react";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

// Determine if auth should be initialized (requires at least one provider configured)
const hasAuthProvider = Boolean(
	env.AUTH_GITHUB_ID ||
	env.AUTH_GOOGLE_ID ||
	env.AUTH_DISCORD_ID ||
	env.RESEND_API_KEY ||
	env.AUTH_SECRET
);

const noopAuth = {
	auth: () => Promise.resolve(null),
	handlers: {
		GET: async () => Response.json({ ok: false, error: "AUTH_DISABLED" }, { status: 503 }),
		POST: async () => Response.json({ ok: false, error: "AUTH_DISABLED" }, { status: 503 }),
	},
	signIn: () => Promise.resolve(),
	signOut: () => Promise.resolve(),
	unstable_update: () => Promise.resolve({} as any),
};

let authResult: typeof noopAuth;
try {
	authResult = hasAuthProvider
		? NextAuth({
			...authOptions,
			secret: env.AUTH_SECRET ?? "supersecretshipkit",
			adapter:
				env?.DATABASE_URL && db
					? DrizzleAdapter(db, {
						usersTable: users,
						accountsTable: accounts,
						sessionsTable: sessions,
						verificationTokensTable: verificationTokens,
					})
					: undefined,
			logger: {
				error: (code: Error, ...message: unknown[]) => logger.error(code, message),
				warn: (code: string, ...message: unknown[]) => logger.warn(code, message),
				debug: (code: string, ...message: unknown[]) => logger.debug(code, message),
			},
		})
		: noopAuth;
} catch (e) {
	console.warn("[auth] NextAuth initialization failed, using noop auth:", e);
	authResult = noopAuth;
}

const {
	auth: nextAuthAuth,
	handlers,
	signIn,
	signOut,
	unstable_update: update,
} = authResult ?? noopAuth;

interface AuthProps {
	errorCode?: string;
	nextUrl?: string;
	protect?: boolean;
	redirect?: boolean;
	redirectTo?: string;
	role?: UserRole;
}

/**
 * Enhanced authentication function with redirect functionality
 * @param props - Authentication properties including redirect options
 */
const authWithOptions = async (props?: AuthProps) => {
	const session = await nextAuthAuth();
	const { errorCode, redirect, nextUrl } = props ?? {};
	const protect =
		props?.protect ??
		(props?.redirectTo !== undefined ? true : undefined) ??
		redirect ??
		false;
	const redirectTo = props?.redirectTo ?? routes.auth.signOutIn;

	const handleRedirect = (code: string) => {
		logger.warn(`[authWithOptions] Redirecting to ${redirectTo} with code ${code}`);
		return redirectWithCode(redirectTo, { code, nextUrl });
	};

	if (protect && !session?.user?.id) {
		return handleRedirect(errorCode ?? STATUS_CODES.AUTH.code);
	}

	return session;
};

const cachedAuth = cache(authWithOptions);

export { cachedAuth as auth, handlers, signIn, signOut, update };
