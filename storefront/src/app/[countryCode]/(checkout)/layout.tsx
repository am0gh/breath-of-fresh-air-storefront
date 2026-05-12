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
            className="flex flex-col items-center gap-[2px] hover:opacity-80 transition-opacity duration-200"
            data-testid="store-link"
          >
            <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: "9px", letterSpacing: "0.06em", color: "#7B9C8C", fontWeight: 300, lineHeight: 1 }}>
              श्वास
            </span>
            <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px", letterSpacing: "0.14em", color: "#F2EFE8", fontWeight: 400, textTransform: "uppercase", lineHeight: 1 }}>
              Schwaas
            </span>
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">{children}</div>
      <div className="py-6 w-full flex items-center justify-center border-t border-sage/20">
        <p className="text-sage/50 text-xs">© {new Date().getFullYear()} Schwaas. Sustainably made.</p>
      </div>
    </div>
  )
}
