import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <h2 className="font-display text-xl text-olive font-light">
          Already have an account?
        </h2>
        <p className="text-bark/60 text-sm mt-1">
          Sign in for a faster checkout experience.
        </p>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <button
            className="border border-olive text-olive text-sm px-6 py-2 hover:bg-olive hover:text-cream transition-colors duration-200"
            data-testid="sign-in-button"
          >
            Sign in
          </button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
