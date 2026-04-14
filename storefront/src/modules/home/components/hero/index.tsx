import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <section className="w-full bg-cream">
      {/* Hero */}
      <div className="content-container py-24 small:py-36 flex flex-col items-center text-center gap-y-6">
        <h1 className="font-display text-5xl small:text-7xl leading-tight text-olive font-light tracking-tight">
          Wear the Earth
        </h1>
        <p className="text-sage text-lg small:text-xl max-w-md font-light leading-relaxed">
          Hemp jackets crafted for the conscious explorer
        </p>
        <LocalizedClientLink
          href="/store"
          className="mt-4 inline-block bg-terracotta text-white text-sm tracking-widest uppercase px-10 py-4 hover:bg-terracotta/90 transition-colors duration-200"
        >
          Shop Jackets
        </LocalizedClientLink>
      </div>

      {/* Thin rule */}
      <div className="border-t border-sage/20" />

      {/* Brand values strip */}
      <div className="content-container py-10">
        <div className="grid grid-cols-1 small:grid-cols-3 gap-6 text-center">
          {[
            "100% Hemp Fabric",
            "Carbon Neutral Shipping",
            "Made to Last",
          ].map((value) => (
            <div key={value} className="py-4">
              <p className="font-display text-lg text-olive tracking-wide">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Thin rule */}
      <div className="border-t border-sage/20" />
    </section>
  )
}

export default Hero
