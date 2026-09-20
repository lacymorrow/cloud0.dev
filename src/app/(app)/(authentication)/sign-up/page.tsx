import { Suspense } from "react";
import { Logo } from "@/components/assets/logo";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site-config";
import Link from "next/link";
import { AuthForm } from "../_components/login-form";
import { SignUpForm } from "./_components/sign-up-form";

/*
 * The form below reads search params on the client, which bails static
 * prerendering unless it sits inside a Suspense boundary. The root
 * loading.tsx used to supply one implicitly (and caused soft 404s
 * site-wide); this page owns its own now.
 */
export default function SignUpPage() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Link href={routes.home} className="flex items-center gap-2 self-center font-medium">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Logo />
        </div>
        {siteConfig.name}
      </Link>
      <Suspense fallback={null}>
        <AuthForm mode="sign-up">
          <SignUpForm />
        </AuthForm>
      </Suspense>
    </div>
  );
}
