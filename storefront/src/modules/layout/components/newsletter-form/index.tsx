"use client"

import { useState } from "react"

const NewsletterForm = () => {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email) {
      // Wire up to your email provider here (e.g. Klaviyo, Mailchimp)
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <p className="text-sage text-sm leading-relaxed">
        Thanks for signing up — we&apos;ll be in touch.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="bg-transparent border border-cream/20 text-cream placeholder-sage/60 px-4 py-3 text-sm focus:outline-none focus:border-cream/50 transition-colors w-full"
      />
      <button
        type="submit"
        className="bg-terracotta text-white text-xs tracking-widest uppercase px-6 py-3 rounded hover:bg-terracotta/90 transition-colors w-full"
      >
        Subscribe
      </button>
    </form>
  )
}

export default NewsletterForm
