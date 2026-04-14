import RevealWrapper from "@modules/home/components/reveal-wrapper"

const benefits = [
  {
    number: "01",
    title: "Built to Outlast",
    body: "Hemp fibre is three times stronger than cotton. Every season it wears in — never wearing out — growing more supple, more yours.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="24" cy="24" r="20" stroke="#42481D" strokeWidth="1" opacity="0.3" />
        <path d="M24 8 L24 40 M14 18 L24 8 L34 18" stroke="#42481D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 30 L24 40 L32 30" stroke="#B6592E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Breathes With You",
    body: "Naturally porous and moisture-wicking — cool when the sun is high, warm when layered. A climate system built into the cloth.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="24" cy="24" r="20" stroke="#42481D" strokeWidth="1" opacity="0.3" />
        <path d="M24 14 C18 14 14 18 14 22 C14 28 20 32 24 38 C28 32 34 28 34 22 C34 18 30 14 24 14Z" stroke="#42481D" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
        <path d="M20 22 C20 22 22 25 24 22 C26 19 28 22 28 22" stroke="#B6592E" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Protects Instinctively",
    body: "Hemp's natural UV-blocking and antimicrobial properties let you wear it further and wash it less. Protection without compromise.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="24" cy="24" r="20" stroke="#42481D" strokeWidth="1" opacity="0.3" />
        <path d="M24 10 L36 15 L36 25 C36 32 30 38 24 40 C18 38 12 32 12 25 L12 15 Z" stroke="#42481D" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
        <path d="M18 24 L22 28 L30 20" stroke="#B6592E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
      </svg>
    ),
  },
  {
    number: "04",
    title: "Ages With Character",
    body: "Unlike synthetics that degrade, hemp develops a patina. The creases, the fades, the softness — the story of a life well lived.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="24" cy="24" r="20" stroke="#42481D" strokeWidth="1" opacity="0.3" />
        <path d="M14 34 Q19 20 24 24 Q29 28 34 14" stroke="#42481D" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <circle cx="14" cy="34" r="2.5" fill="#B6592E" opacity="0.7"/>
        <circle cx="34" cy="14" r="2.5" fill="#42481D" opacity="0.5"/>
      </svg>
    ),
  },
]

export default function MaterialSection() {
  return (
    <>
      <style>{`
        /* ── Material section ── */
        .mat-section {
          position: relative;
          width: 100%;
          min-height: 100svh;
          background-color: #F5F0E8;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: clamp(5rem, 10vh, 8rem) clamp(1.5rem, 6vw, 5rem);
        }

        /* Top accent rule */
        .mat-rule {
          position: absolute;
          top: 0; left: 8%; right: 8%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #42481D 30%, #B6592E 70%, transparent);
          opacity: 0.18;
        }

        /* Large muted background number */
        .mat-bg-num {
          position: absolute;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 300;
          font-size: clamp(18rem, 28vw, 34rem);
          line-height: 1;
          color: #42481D;
          opacity: 0.03;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          white-space: nowrap;
          user-select: none;
        }

        /* Inner */
        .mat-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
        }

        /* Header */
        .mat-header {
          text-align: center;
          margin-bottom: clamp(3rem, 6vw, 5rem);
        }
        .mat-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.65rem;
          font-weight: 400;
          letter-spacing: 0.36em;
          text-transform: uppercase;
          color: #B6592E;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s;
        }
        [data-revealed="true"] .mat-eyebrow {
          opacity: 1; transform: translateY(0);
        }
        .mat-headline {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 300;
          font-size: clamp(2.6rem, 5.5vw, 5.4rem);
          line-height: 1.06;
          color: #42481D;
          margin-top: 0.5rem;
          overflow: hidden;
        }
        .mat-headline-line {
          display: block;
          opacity: 0;
          transform: translateY(55px);
          transition: opacity 0.95s cubic-bezier(.16,1,.3,1), transform 0.95s cubic-bezier(.16,1,.3,1);
        }
        .mat-headline-line:nth-child(1) { transition-delay: 0.2s; }
        .mat-headline-line:nth-child(2) { transition-delay: 0.33s; }
        [data-revealed="true"] .mat-headline-line {
          opacity: 1; transform: translateY(0);
        }
        .mat-headline em {
          font-style: italic;
          color: #B6592E;
        }

        /* Benefits grid */
        .mat-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2px;
        }
        @media (min-width: 640px) {
          .mat-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 1024px) {
          .mat-grid { grid-template-columns: repeat(4, 1fr); }
        }

        .mat-card {
          padding: 2.4rem 2rem;
          background: transparent;
          border: 1px solid rgba(66, 72, 29, 0.1);
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.85s cubic-bezier(.16,1,.3,1), transform 0.85s cubic-bezier(.16,1,.3,1),
                      background 0.3s ease, border-color 0.3s ease;
          cursor: default;
        }
        .mat-card:nth-child(1) { transition-delay: 0.25s; }
        .mat-card:nth-child(2) { transition-delay: 0.38s; }
        .mat-card:nth-child(3) { transition-delay: 0.51s; }
        .mat-card:nth-child(4) { transition-delay: 0.64s; }
        [data-revealed="true"] .mat-card {
          opacity: 1; transform: translateY(0);
        }
        .mat-card:hover {
          background: rgba(66, 72, 29, 0.03);
          border-color: rgba(66, 72, 29, 0.22);
        }

        .mat-card-icon {
          width: 48px; height: 48px;
          flex-shrink: 0;
        }

        .mat-card-number {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 0.75rem;
          font-weight: 300;
          letter-spacing: 0.18em;
          color: #818E83;
        }

        .mat-card-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 400;
          font-size: clamp(1.25rem, 2vw, 1.55rem);
          color: #42481D;
          line-height: 1.2;
        }

        .mat-card-body {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 300;
          line-height: 1.75;
          color: #818E83;
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .mat-eyebrow,
          .mat-headline-line,
          .mat-card {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <RevealWrapper>
        <section className="mat-section" aria-label="Benefits of hemp as a material">
          <div className="mat-rule" aria-hidden="true" />
          <div className="mat-bg-num" aria-hidden="true">Hemp</div>

          <div className="mat-inner">
            {/* Header */}
            <div className="mat-header">
              <span className="mat-eyebrow">The Material</span>
              <h2 className="mat-headline">
                <span className="mat-headline-line">The More You Wear It,</span>
                <span className="mat-headline-line">The Better It&nbsp;<em>Gets.</em></span>
              </h2>
            </div>

            {/* Benefit cards */}
            <div className="mat-grid">
              {benefits.map((b) => (
                <div key={b.number} className="mat-card">
                  <div className="mat-card-icon">{b.icon}</div>
                  <div>
                    <div className="mat-card-number">{b.number}</div>
                    <h3 className="mat-card-title">{b.title}</h3>
                  </div>
                  <p className="mat-card-body">{b.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealWrapper>
    </>
  )
}
