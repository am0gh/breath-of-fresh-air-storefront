"use client"

import { usePathname } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type NavLink = {
  href: string
  label: string
  testId?: string
}

const links: NavLink[] = [
  { href: "/store",   label: "Shop",    testId: "nav-shop-link"    },
  { href: "/account", label: "Account", testId: "nav-account-link" },
]

export default function NavLinks() {
  const pathname = usePathname()

  // Strip the leading country-code segment so /us/store matches /store
  // pathname looks like "/us/store" or "/au/account"
  const stripped = pathname.replace(/^\/[a-z]{2}(\/|$)/, "/")

  return (
    <div className="flex items-center gap-x-6 h-full text-sm">
      {links.map(({ href, label, testId }) => {
        const isActive = stripped === href || stripped.startsWith(href + "/")
        return (
          <LocalizedClientLink
            key={href}
            href={href}
            data-testid={testId}
            className={[
              "relative pb-px transition-colors duration-200",
              isActive
                ? "text-terracotta after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-terracotta"
                : "text-cream hover:text-sage",
            ].join(" ")}
          >
            {label}
          </LocalizedClientLink>
        )
      })}
    </div>
  )
}
