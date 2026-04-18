"use client"

import { useActionState } from "react"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import Input from "@modules/common/components/input"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { requestPasswordReset } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const ForgotPassword = ({ setCurrentView }: Props) => {
  const [state, formAction] = useActionState(requestPasswordReset, null)

  return (
    <div className="w-full flex flex-col" data-testid="forgot-password-page">
      <h1 className="font-display text-3xl text-olive font-light tracking-wide mb-2">
        Reset password
      </h1>
      <p className="text-bark/60 text-sm mb-8">
        Enter your email and we'll send you a link to reset your password.
      </p>

      {state?.success ? (
        <div className="bg-sage/10 border border-sage/30 p-4 text-sm text-bark/80 leading-relaxed">
          Check your inbox — if an account exists for that address, a reset link is on its way.
        </div>
      ) : (
        <form className="w-full" action={formAction}>
          <div className="flex flex-col w-full gap-y-3">
            <Input
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              required
              data-testid="forgot-password-email-input"
            />
          </div>

          {state?.error && (
            <p className="text-terracotta text-sm mt-3">{state.error}</p>
          )}

          <SubmitButton
            data-testid="forgot-password-button"
            className="w-full mt-6"
          >
            Send reset link
          </SubmitButton>
        </form>
      )}

      <p className="text-center text-bark/60 text-sm mt-6">
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="text-terracotta hover:text-terracotta/80 underline underline-offset-2 transition-colors"
          data-testid="back-to-login-button"
        >
          Back to sign in
        </button>
      </p>
    </div>
  )
}

export default ForgotPassword
