import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-cream relative small:min-h-screen">
      <div className="h-16 bg-olive border-b border-olive/80">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-sm font-medium text-cream/70 hover:text-cream flex items-center gap-x-2 transition-colors duration-200 flex-1 basis-0"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="hidden small:block">Back to cart</span>
            <span className="block small:hidden">Back</span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="font-display text-xl text-cream hover:text-cream/80 transition-colors duration-200"
            data-testid="store-link"
          >
            Breath of Fresh Air
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">{children}</div>
      <div className="py-6 w-full flex items-center justify-center border-t border-sage/20">
        <p className="text-sage/50 text-xs">© {new Date().getFullYear()} Breath of Fresh Air. Sustainably made.</p>
      </div>
    </div>
  )
}
