import { ArrowUpRightMini } from "@medusajs/icons"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "404 | Schwaas",
  description: "Something went wrong",
}

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)] bg-cream">
      <h1 className="font-display text-4xl text-olive font-light tracking-wide">Page not found</h1>
      <p className="text-sm text-bark/60">
        The page you tried to access does not exist.
      </p>
      <Link
        className="flex gap-x-1 items-center group text-terracotta hover:text-terracotta/80 transition-colors text-sm"
        href="/"
      >
        <span>Go to homepage</span>
        <ArrowUpRightMini
          className="group-hover:rotate-45 ease-in-out duration-150"
          color="currentColor"
        />
      </Link>
    </div>
  )
}
