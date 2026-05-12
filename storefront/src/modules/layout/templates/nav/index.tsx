import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import NavLinks from "@modules/layout/components/nav-links"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto duration-200 bg-olive">
        <nav className="content-container flex items-center justify-between w-full h-full">
          {/* Left: Schwaas wordmark */}
          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="flex flex-col items-start leading-none hover:opacity-80 transition-opacity duration-200 gap-[2px]"
              data-testid="nav-store-link"
            >
              <span
                style={{
                  fontFamily: "'Noto Sans Devanagari', sans-serif",
                  fontSize: "10px",
                  letterSpacing: "0.06em",
                  color: "#7B9C8C",
                  fontWeight: 300,
                  lineHeight: 1,
                }}
              >
                श्वास
              </span>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "20px",
                  letterSpacing: "0.14em",
                  color: "#F2EFE8",
                  fontWeight: 400,
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                Schwaas
              </span>
            </LocalizedClientLink>
          </div>

          {/* Right: links + cart */}
          <div className="flex items-center gap-x-6 h-full">
            {/* Active-aware nav links (client component) */}
            <NavLinks />

            {/* Cart icon with item badge */}
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="relative flex items-center text-cream hover:text-sage transition-colors duration-200"
                  href="/cart"
                  data-testid="nav-cart-link"
                  aria-label="Cart"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                    <line x1="3" x2="21" y1="6" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
