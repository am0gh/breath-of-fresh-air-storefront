import { useActionState } from "react"

import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import Input from "@modules/common/components/input"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { login } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <div
      className="w-full flex flex-col"
      data-testid="login-page"
    >
      <h1 className="font-display text-3xl text-olive font-light tracking-wide mb-2">Welcome back</h1>
      <p className="text-bark/60 text-sm mb-8">
        Sign in to your account for a better experience.
      </p>
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-3">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>
        <div className="flex justify-end mt-2">
          <button
            type="button"
            onClick={() => setCurrentView(LOGIN_VIEW.FORGOT_PASSWORD)}
            className="text-sm text-bark/50 hover:text-terracotta underline underline-offset-2 transition-colors"
            data-testid="forgot-password-link"
          >
            Forgot password?
          </button>
        </div>
        <ErrorMessage error={message} data-testid="login-error-message" />
        <SubmitButton data-testid="sign-in-button" className="w-full mt-6">
          Sign in
        </SubmitButton>
      </form>
      <p className="text-center text-bark/60 text-sm mt-6">
        Not a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="text-terracotta hover:text-terracotta/80 underline underline-offset-2 transition-colors"
          data-testid="register-button"
        >
          Create an account
        </button>
      </p>
    </div>
  )
}

export default Login
