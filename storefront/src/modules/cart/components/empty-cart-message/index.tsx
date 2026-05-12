import LocalizedClientLink from "@modules/common/components/localized-client-link"

const EmptyCartMessage = () => {
  return (
    <div className="py-48 px-2 flex flex-col justify-center items-start" data-testid="empty-cart-message">
      <h1 className="font-display text-4xl text-olive font-light tracking-wide mb-4">
        Your Cart
      </h1>
      <p className="text-bark/60 text-sm leading-relaxed mb-8 max-w-[32rem]">
        Your bag is empty. Explore our collection of naturally made hemp clothing and find your next favourite piece.
      </p>
      <LocalizedClientLink
        href="/store"
        className="inline-block py-3 px-8 bg-terracotta text-white text-sm tracking-widest uppercase rounded hover:bg-terracotta/90 transition-colors duration-200"
      >
        Shop the Collection
      </LocalizedClientLink>
    </div>
  )
}

export default EmptyCartMessage
