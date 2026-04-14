import LocalizedClientLink from "@modules/common/components/localized-client-link"
import RevealWrapper from "@modules/home/components/reveal-wrapper"

const pillars = [
  {
    tag: "Adaptability",
    title: "Velcro Panel System",
    body: "Swap linings, add insulation, or change the look entirely. No needle required.",
  },
  {
    tag: "Hardware",
    title: "Chain Attachment Points",
    body: "Reinforced D-ring anchors across the body. Attach what matters. Remove what doesn't.",
  },
  {
    tag: "Identity",
    title: "Patch Attachment Zones",
    body: "Reinforced zones built for badges, embroidery, and the marks that make it yours.",
  },
]

export default function MissionSection() {
  return (
    <>
      <style>{`
        /* ── Mission section ── */
        .mis-section {
          position: relative;
          width: 100%;
          min-height: 100svh;
          background-color: #42481D;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: clamp(5rem, 10vh, 8rem) clamp(1.5rem, 6vw, 5rem);
        }

        /* Grain overlay */
        .mis-grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.2;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px 180px;
          mix-blend-mode: overlay;
        }

        /* Corner arc – decorative */
        .mis-arc {
          position: absolute;
          width: clamp(300px, 40vw, 580px);
          height: clamp(300px, 40vw, 580px);
          border-radius: 50%;
          border: 1px solid rgba(245, 240, 232, 0.08);
          bottom: clamp(-220px, -20vw, -120px);
          right: clamp(-180px, -14vw, -80px);
          pointer-events: none;
          z-index: 0;
        }
        .mis-arc-2 {
          position: absolute;
          width: clamp(180px, 24vw, 360px);
          height: clamp(180px, 24vw, 360px);
          border-radius: 50%;
          border: 1px solid rgba(178, 89, 46, 0.15);
          bottom: clamp(-140px, -12vw, -60px);
          right: clamp(-100px, -8vw, -30px);
          pointer-events: none;
          z-index: 0;
        }

        /* Large muted word */
        .mis-bg-word {
          position: absolute;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 300;
          font-size: clamp(14rem, 22vw, 28rem);
          line-height: 1;
          color: rgba(245, 240, 232, 0.04);
          bottom: -2rem;
          left: -1rem;
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }

        /* Inner layout */
        .mis-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(3rem, 6vw, 5rem);
        }
        @media (min-width: 1024px) {
          .mis-inner {
            grid-template-columns: 1fr 1fr;
            align-items: start;
            gap: 8rem;
          }
        }

        /* Left — headline block */
        .mis-left {
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
        }

        .mis-eyebrow {
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
        [data-revealed="true"] .mis-eyebrow {
          opacity: 1; transform: translateY(0);
        }

        .mis-headline {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 300;
          font-size: clamp(2.8rem, 6vw, 6rem);
          line-height: 1.04;
          color: #F5F0E8;
          overflow: hidden;
        }
        .mis-headline-line {
          display: block;
          opacity: 0;
          transform: translateY(65px);
          transition: opacity 0.95s cubic-bezier(.16,1,.3,1), transform 0.95s cubic-bezier(.16,1,.3,1);
        }
        .mis-headline-line:nth-child(1) { transition-delay: 0.15s; }
        .mis-headline-line:nth-child(2) { transition-delay: 0.28s; }
        .mis-headline-line:nth-child(3) { transition-delay: 0.40s; }
        [data-revealed="true"] .mis-headline-line {
          opacity: 1; transform: translateY(0);
        }
        .mis-headline em {
          font-style: italic;
          color: #B6592E;
        }

        .mis-body {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(0.88rem, 1.3vw, 1rem);
          font-weight: 300;
          line-height: 1.85;
          color: rgba(245, 240, 232, 0.6);
          max-width: 460px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.9s ease 0.52s, transform 0.9s ease 0.52s;
        }
        [data-revealed="true"] .mis-body {
          opacity: 1; transform: translateY(0);
        }

        /* Manifesto line */
        .mis-manifesto {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-style: italic;
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          color: rgba(245, 240, 232, 0.35);
          line-height: 1.5;
          border-left: 2px solid #B6592E;
          padding-left: 1.2rem;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.85s ease 0.68s, transform 0.85s ease 0.68s;
        }
        [data-revealed="true"] .mis-manifesto {
          opacity: 1; transform: translateY(0);
        }

        /* CTA */
        .mis-cta-wrap {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.85s ease 0.82s, transform 0.85s ease 0.82s;
        }
        [data-revealed="true"] .mis-cta-wrap {
          opacity: 1; transform: translateY(0);
        }
        .mis-cta {
          display: inline-block;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 400;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #F5F0E8;
          text-decoration: none;
          border: 1px solid rgba(245, 240, 232, 0.45);
          padding: 0.9rem 2.5rem;
          position: relative;
          overflow: hidden;
          transition: color 0.4s ease, border-color 0.4s ease;
        }
        .mis-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #F5F0E8;
          transform: translateX(-101%);
          transition: transform 0.45s cubic-bezier(.16,1,.3,1);
        }
        .mis-cta:hover::before { transform: translateX(0); }
        .mis-cta:hover { color: #42481D; border-color: #F5F0E8; }
        .mis-cta-text { position: relative; z-index: 1; }

        /* Right — pillars */
        .mis-right {
          display: flex;
          flex-direction: column;
          gap: 0;
          padding-top: 0.5rem;
        }

        .mis-pillar {
          padding: 2rem 0;
          border-bottom: 1px solid rgba(245, 240, 232, 0.1);
          opacity: 0;
          transform: translateX(30px);
          transition: opacity 0.85s cubic-bezier(.16,1,.3,1), transform 0.85s cubic-bezier(.16,1,.3,1),
                      border-color 0.3s ease;
        }
        .mis-pillar:first-child { border-top: 1px solid rgba(245, 240, 232, 0.1); }
        .mis-pillar:nth-child(1) { transition-delay: 0.3s; }
        .mis-pillar:nth-child(2) { transition-delay: 0.44s; }
        .mis-pillar:nth-child(3) { transition-delay: 0.58s; }
        [data-revealed="true"] .mis-pillar {
          opacity: 1; transform: translateX(0);
        }
        .mis-pillar:hover {
          border-bottom-color: rgba(178, 89, 46, 0.35);
        }

        .mis-pillar-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem;
          font-weight: 400;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #B6592E;
          margin-bottom: 0.5rem;
        }
        .mis-pillar-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.3rem, 2.2vw, 1.8rem);
          font-weight: 400;
          color: #F5F0E8;
          margin-bottom: 0.6rem;
          line-height: 1.2;
        }
        .mis-pillar-body {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 300;
          line-height: 1.7;
          color: rgba(245, 240, 232, 0.5);
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .mis-eyebrow,
          .mis-headline-line,
          .mis-body,
          .mis-manifesto,
          .mis-cta-wrap,
          .mis-pillar {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <RevealWrapper>
        <section className="mis-section" aria-label="Our mission — the forever jacket">
          <div className="mis-grain" aria-hidden="true" />
          <div className="mis-arc"   aria-hidden="true" />
          <div className="mis-arc-2" aria-hidden="true" />
          <div className="mis-bg-word" aria-hidden="true">Forever</div>

          <div className="mis-inner">
            {/* Left */}
            <div className="mis-left">
              <span className="mis-eyebrow">Our Mission</span>

              <h2 className="mis-headline">
                <span className="mis-headline-line">A Jacket</span>
                <span className="mis-headline-line">Built to&nbsp;<em>Last</em></span>
                <span className="mis-headline-line"><em>Forever.</em></span>
              </h2>

              <p className="mis-body">
                Fast fashion ends in a landfill. We started with the opposite question:
                what if a jacket could grow with you? Every Breath of Fresh Air jacket
                is designed as an open system — built for the life you have now, and the
                one you haven't lived yet.
              </p>

              <blockquote className="mis-manifesto">
                "Not disposable. Not static.<br />Alive."
              </blockquote>

              <div className="mis-cta-wrap">
                <LocalizedClientLink href="/store" className="mis-cta">
                  <span className="mis-cta-text">Shop the Collection</span>
                </LocalizedClientLink>
              </div>
            </div>

            {/* Right — pillars */}
            <div className="mis-right" role="list" aria-label="Jacket features">
              {pillars.map((p) => (
                <div key={p.title} className="mis-pillar" role="listitem">
                  <div className="mis-pillar-tag">{p.tag}</div>
                  <h3 className="mis-pillar-title">{p.title}</h3>
                  <p className="mis-pillar-body">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealWrapper>
    </>
  )
}
