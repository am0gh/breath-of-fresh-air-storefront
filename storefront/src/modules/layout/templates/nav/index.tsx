import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto duration-200 bg-olive">
        <nav className="content-container flex items-center justify-between w-full h-full">
          {/* Left: brand logo */}
          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="font-display text-xl tracking-wide text-cream hover:text-cream/80 transition-colors duration-200"
              data-testid="nav-store-link"
            >
              Breath of Fresh Air
            </LocalizedClientLink>
          </div>

          {/* Right: links + cart */}
          <div className="flex items-center gap-x-6 h-full">
            <div className="flex items-center gap-x-6 h-full text-sm">
              {process.env.NEXT_PUBLIC_FEATURE_SEARCH_ENABLED && (
                <LocalizedClientLink
                  className="text-cream hover:text-sage transition-colors duration-200"
                  href="/search"
                  scroll={false}
                  data-testid="nav-search-link"
                >
                  Search
                </LocalizedClientLink>
              )}
              <LocalizedClientLink
                className="text-cream hover:text-sage transition-colors duration-200"
                href="/store"
              >
                Shop
              </LocalizedClientLink>
              <LocalizedClientLink
                className="text-cream hover:text-sage transition-colors duration-200"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="text-cream hover:text-sage transition-colors duration-200 flex gap-2 text-sm"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
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
