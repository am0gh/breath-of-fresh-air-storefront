import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import SourceSection from "@modules/home/components/source-section"
import MaterialSection from "@modules/home/components/material-section"
import MissionSection from "@modules/home/components/mission-section"
import RevealWrapper from "@modules/home/components/reveal-wrapper"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Breath of Fresh Air — Hemp Jackets",
  description:
    "Sustainable hemp jackets crafted for the conscious explorer. Built to last forever, open to change.",
}

export default async function Home({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  return (
    <>
      <style>{`
        /* ── Featured products section ── */
        .fp-section {
          position: relative;
          background-color: #F5F0E8;
          padding: clamp(4rem, 8vh, 7rem) 0;
          overflow: hidden;
        }
        .fp-rule {
          position: absolute;
          top: 0; left: 8%; right: 8%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #42481D 30%, #B6592E 70%, transparent);
          opacity: 0.18;
        }
        .fp-inner {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 clamp(1.5rem, 6vw, 5rem);
        }
        .fp-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: clamp(2.5rem, 5vw, 4rem);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.9s cubic-bezier(.16,1,.3,1) 0.15s,
                      transform 0.9s cubic-bezier(.16,1,.3,1) 0.15s;
        }
        [data-revealed="true"] .fp-header {
          opacity: 1; transform: translateY(0);
        }
        .fp-headline {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 300;
          font-size: clamp(2rem, 4vw, 3.4rem);
          color: #42481D;
          line-height: 1.1;
        }
        .fp-headline em {
          font-style: italic;
          color: #B6592E;
        }
        .fp-view-all {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem;
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #42481D;
          text-decoration: none;
          border-bottom: 1px solid rgba(66, 72, 29, 0.35);
          padding-bottom: 2px;
          transition: border-color 0.3s ease, color 0.3s ease;
          white-space: nowrap;
          align-self: center;
        }
        .fp-view-all:hover {
          color: #B6592E;
          border-color: #B6592E;
        }
        .fp-products {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.9s cubic-bezier(.16,1,.3,1) 0.32s,
                      transform 0.9s cubic-bezier(.16,1,.3,1) 0.32s;
        }
        [data-revealed="true"] .fp-products {
          opacity: 1; transform: translateY(0);
        }

        /* Footer spacer / closing brand bar */
        .brand-bar {
          background-color: #2C2A1E;
          padding: 2rem clamp(1.5rem, 6vw, 5rem);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .brand-bar-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 0.9rem;
          font-weight: 300;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(245, 240, 232, 0.45);
        }
        .brand-bar-tagline {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.62rem;
          font-weight: 300;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(178, 89, 46, 0.6);
        }

        @media (prefers-reduced-motion: reduce) {
          .fp-header,
          .fp-products {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* 1 ── Hero */}
      <Hero />

      {/* 2 ── Source */}
      <SourceSection />

      {/* 3 ── Material */}
      <MaterialSection />

      {/* 4 ── Mission */}
      <MissionSection />

      {/* 5 ── Featured Products */}
      {collections && region && (
        <RevealWrapper>
          <section className="fp-section" aria-label="Featured jackets">
            <div className="fp-rule" aria-hidden="true" />
            <div className="fp-inner">
              <div className="fp-header">
                <h2 className="fp-headline">
                  The&nbsp;<em>Collection</em>
                </h2>
                <a href="/store" className="fp-view-all">
                  View all jackets
                </a>
              </div>
              <div className="fp-products">
                <ul className="grid grid-cols-1 small:grid-cols-2 medium:grid-cols-3 gap-x-6 gap-y-20">
                  <FeaturedProducts collections={collections} region={region} />
                </ul>
              </div>
            </div>
          </section>
        </RevealWrapper>
      )}

      {/* Closing brand bar */}
      <div className="brand-bar" aria-hidden="true">
        <span className="brand-bar-name">Breath of Fresh Air</span>
        <span className="brand-bar-tagline">Wear the Earth · Feel the Air</span>
      </div>
    </>
  )
}
