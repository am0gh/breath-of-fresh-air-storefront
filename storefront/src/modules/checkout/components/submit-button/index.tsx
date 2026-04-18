"use client"

import { clx } from "@medusajs/ui"
import React from "react"
import { useFormStatus } from "react-dom"

export function SubmitButton({
  children,
  variant = "primary",
  className,
  "data-testid": dataTestId,
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "transparent" | "danger" | null
  className?: string
  "data-testid"?: string
}) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      data-testid={dataTestId}
      className={clx(
        "py-4 px-8 text-sm tracking-widest uppercase rounded transition-colors duration-200 disabled:cursor-not-allowed",
        {
          "bg-terracotta text-white hover:bg-terracotta/90 disabled:bg-sage/40":
            variant === "primary" || variant === null,
          "border border-olive text-olive hover:bg-olive hover:text-cream disabled:border-sage/40 disabled:text-bark/40":
            variant === "secondary",
          "text-bark/70 hover:text-bark disabled:text-bark/40":
            variant === "transparent",
          "bg-red-700 text-white hover:bg-red-800 disabled:bg-red-300":
            variant === "danger",
        },
        className
      )}
    >
      {pending ? "Processing..." : children}
    </button>
  )
}
