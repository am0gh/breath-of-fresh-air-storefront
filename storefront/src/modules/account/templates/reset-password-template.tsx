"use client"

import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Input from "@modules/common/components/input"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { resetCustomerPassword } from "@lib/data/customer"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = {
  token?: string
}

const ResetPasswordTemplate = ({ token }: Props) => {
  const [state, formAction] = useActionState(resetCustomerPassword, null)
  const router = useRouter()

  useEffect(() => {
    if (state?.success) {
      const timer = setTimeout(() => {
        router.push("/account")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [state, router])

  if (!token) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center py-16 px-8 bg-cream">
        <div className="w-full max-w-sm text-center">
          <h1 className="font-display text-3xl text-olive font-light tracking-wide mb-4">
            Invalid link
          </h1>
          <p className="text-bark/60 text-sm mb-6">
            This reset link is missing or invalid. Please request a new one.
          </p>
          <LocalizedClientLink
            href="/account"
            className="text-terracotta hover:text-terracotta/80 underline underline-offset-2 text-sm transition-colors"
          >
            Back to sign in
          </LocalizedClientLink>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center py-16 px-8 bg-cream">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl text-olive font-light tracking-wide mb-2">
          New password
        </h1>
        <p className="text-bark/60 text-sm mb-8">
          Choose a strong password for your account.
        </p>

        {state?.success ? (
          <div className="bg-sage/10 border border-sage/30 p-4 text-sm text-bark/80 leading-relaxed">
            Password updated. Redirecting you to sign in…
          </div>
        ) : (
          <form className="w-full" action={formAction}>
            <input type="hidden" name="token" value={token} />
            <div className="flex flex-col w-full gap-y-3">
              <Input
                label="New password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                data-testid="new-password-input"
              />
              <Input
                label="Confirm password"
                name="confirm_password"
                type="password"
                autoComplete="new-password"
                required
                data-testid="confirm-password-input"
              />
            </div>

            {state?.error && (
              <p className="text-terracotta text-sm mt-3">{state.error}</p>
            )}

            <SubmitButton
              data-testid="reset-password-button"
              className="w-full mt-6"
            >
              Set new password
            </SubmitButton>
          </form>
        )}

        <p className="text-center text-bark/60 text-sm mt-6">
          <LocalizedClientLink
            href="/account"
            className="text-terracotta hover:text-terracotta/80 underline underline-offset-2 transition-colors"
          >
            Back to sign in
          </LocalizedClientLink>
        </p>
      </div>
    </div>
  )
}

export default ResetPasswordTemplate
