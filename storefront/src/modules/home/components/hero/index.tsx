import LocalizedClientLink from "@modules/common/components/localized-client-link"

const BREATH_WORDS = [
  { text: "breath",   lang: "English",   highlight: true },
  { text: "souffle",  lang: "French" },
  { text: "aliento",  lang: "Spanish" },
  { text: "adem",     lang: "Dutch" },
  { text: "nafas",    lang: "Malay" },
  { text: "呼吸",     lang: "Japanese" },
  { text: "prana",    lang: "Sanskrit" },
  { text: "atemzug",  lang: "German" },
  { text: "nafasi",   lang: "Swahili" },
  { text: "αναπνοή",  lang: "Greek" },
]

const Hero = () => {
  return (
    <>
      <style>{`
        /* ── Schwaas Hero ── */
        .sw-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: calc(100svh - 64px);
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Left panel ── */
        .sw-left {
          position: relative;
          background-color: #F0EDE6;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(3rem, 8vw, 6rem) clamp(2.5rem, 6vw, 5rem);
          overflow: hidden;
        }

        .sw-watermark {
          position: absolute;
          top: 50%;
          left: clamp(1.5rem, 4vw, 3rem);
          transform: translateY(-55%);
          font-family: 'Noto Sans Devanagari', sans-serif;
          font-size: clamp(120px, 18vw, 200px);
          line-height: 1;
          color: #2D4A3E;
          opacity: 0.06;
          user-select: none;
          pointer-events: none;
          white-space: nowrap;
        }

        .sw-left-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .sw-eyebrow {
          font-size: 0.65rem;
          font-weight: 400;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #C0843E;
          margin-bottom: 1.1rem;
          opacity: 0;
          transform: translateY(10px);
          animation: sw-fade-up 0.8s cubic-bezier(.16,1,.3,1) 0.3s forwards;
        }

        .sw-headline {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(3.8rem, 7vw, 6.5rem);
          font-weight: 400;
          color: #2D4A3E;
          line-height: 0.92;
          letter-spacing: 0.04em;
          margin: 0;
          opacity: 0;
          transform: translateY(16px);
          animation: sw-fade-up 1s cubic-bezier(.16,1,.3,1) 0.5s forwards;
        }

        .sw-devanagari-sub {
          display: block;
          font-family: 'Noto Sans Devanagari', sans-serif;
          font-size: clamp(1.4rem, 2.5vw, 2.2rem);
          font-weight: 300;
          color: #7B9C8C;
          letter-spacing: 0.03em;
          margin-top: 0.6rem;
          line-height: 1;
          opacity: 0;
          transform: translateY(10px);
          animation: sw-fade-up 0.9s cubic-bezier(.16,1,.3,1) 0.75s forwards;
        }

        .sw-tagline {
          font-size: 0.68rem;
          font-weight: 300;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #7B9C8C;
          margin-top: 1.4rem;
          opacity: 0;
          transform: translateY(10px);
          animation: sw-fade-up 0.8s cubic-bezier(.16,1,.3,1) 0.95s forwards;
        }

        .sw-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 2.2rem;
          font-size: 0.68rem;
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #2D4A3E;
          text-decoration: none;
          border-bottom: 1px solid #C0843E;
          padding-bottom: 3px;
          width: fit-content;
          opacity: 0;
          transform: translateY(10px);
          animation: sw-fade-up 0.8s cubic-bezier(.16,1,.3,1) 1.15s forwards;
          transition: color 0.25s ease, border-color 0.25s ease;
        }
        .sw-cta:hover {
          color: #C0843E;
        }

        /* ── Right panel ── */
        .sw-right {
          background-color: #2D4A3E;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .sw-right-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            repeating-linear-gradient(0deg, transparent, transparent 36px, rgba(255,255,255,0.025) 36px, rgba(255,255,255,0.025) 37px),
            repeating-linear-gradient(90deg, transparent, transparent 36px, rgba(255,255,255,0.025) 36px, rgba(255,255,255,0.025) 37px);
        }

        .sw-breath-panel {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          padding: clamp(2rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3rem);
          text-align: center;
          opacity: 0;
          animation: sw-fade-in 1.2s ease 0.6s forwards;
        }

        .sw-script-large {
          font-family: 'Noto Sans Devanagari', sans-serif;
          font-size: clamp(56px, 9vw, 96px);
          font-weight: 300;
          color: rgba(255, 255, 255, 0.88);
          line-height: 1;
          letter-spacing: 0.02em;
        }

        .sw-divider {
          display: flex;
          align-items: center;
          gap: 10px;
          width: clamp(160px, 24vw, 280px);
        }

        .sw-divider-line {
          flex: 1;
          height: 0.5px;
          background: rgba(255, 255, 255, 0.15);
        }

        .sw-divider-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #C0843E;
          flex-shrink: 0;
        }

        .sw-breath-ring {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px 22px;
          max-width: clamp(220px, 30vw, 320px);
        }

        .sw-breath-word {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .sw-word-text {
          font-size: clamp(11px, 1.1vw, 13px);
          font-weight: 300;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.55);
          line-height: 1;
        }

        .sw-word-text.is-highlight {
          color: #C0843E;
          font-size: clamp(12px, 1.2vw, 14px);
          font-weight: 400;
        }

        .sw-word-lang {
          font-size: 8px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.22);
          line-height: 1;
        }

        .sw-origin {
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.2);
          margin-top: 4px;
        }

        /* ── Product strip ── */
        .sw-strip {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 0.5px solid rgba(45, 74, 62, 0.14);
          background-color: #F0EDE6;
        }

        .sw-strip-card {
          padding: clamp(1.2rem, 3vw, 1.8rem) clamp(1.5rem, 3.5vw, 2.2rem);
          border-right: 0.5px solid rgba(45, 74, 62, 0.12);
          display: flex;
          flex-direction: column;
          gap: 4px;
          cursor: pointer;
          text-decoration: none;
          transition: background-color 0.2s ease;
        }
        .sw-strip-card:last-child { border-right: none; }
        .sw-strip-card:hover { background-color: rgba(45, 74, 62, 0.04); }

        .sw-strip-label {
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #7B9C8C;
          font-weight: 400;
        }

        .sw-strip-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1rem, 1.6vw, 1.25rem);
          font-weight: 400;
          color: #2D4A3E;
          line-height: 1.1;
          margin: 2px 0;
        }

        .sw-strip-detail {
          font-size: 0.68rem;
          color: #7B9C8C;
          font-weight: 300;
          letter-spacing: 0.04em;
        }

        .sw-strip-arrow {
          font-size: 0.85rem;
          color: #C0843E;
          margin-top: 10px;
          display: block;
          transition: transform 0.2s ease;
        }
        .sw-strip-card:hover .sw-strip-arrow { transform: translateX(4px); }

        /* ── Animations ── */
        @keyframes sw-fade-up {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes sw-fade-in {
          to { opacity: 1; }
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .sw-hero {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .sw-left {
            padding: 3.5rem 2rem;
          }
          .sw-right {
            min-height: 420px;
          }
          .sw-strip {
            grid-template-columns: 1fr;
          }
          .sw-strip-card {
            border-right: none;
            border-bottom: 0.5px solid rgba(45, 74, 62, 0.12);
          }
          .sw-strip-card:last-child { border-bottom: none; }
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .sw-eyebrow,
          .sw-headline,
          .sw-devanagari-sub,
          .sw-tagline,
          .sw-cta,
          .sw-breath-panel {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
          }
        }
      `}</style>

      <div>
        {/* ── Hero: split screen ── */}
        <section className="sw-hero" aria-label="Schwaas — Breath of Fresh Air">

          {/* Left: brand story */}
          <div className="sw-left">
            <div className="sw-watermark" aria-hidden="true">श्वास</div>
            <div className="sw-left-content">
              <span className="sw-eyebrow">Natural hemp clothing — est. 2024</span>
              <h1 className="sw-headline">Schwaas</h1>
              <span className="sw-devanagari-sub" aria-label="Sanskrit: shvaas">श्वास</span>
              <p className="sw-tagline">Breath of Fresh Air</p>
              <LocalizedClientLink href="/store" className="sw-cta">
                Shop the collection &nbsp;→
              </LocalizedClientLink>
            </div>
          </div>

          {/* Right: multilingual breath panel */}
          <div className="sw-right" aria-hidden="true">
            <div className="sw-right-grid" />
            <div className="sw-breath-panel">
              <span className="sw-script-large">श्वास</span>
              <div className="sw-divider">
                <div className="sw-divider-line" />
                <div className="sw-divider-dot" />
                <div className="sw-divider-line" />
              </div>
              <div className="sw-breath-ring">
                {BREATH_WORDS.map(({ text, lang, highlight }) => (
                  <div key={lang} className="sw-breath-word">
                    <span className={`sw-word-text${highlight ? " is-highlight" : ""}`}>{text}</span>
                    <span className="sw-word-lang">{lang}</span>
                  </div>
                ))}
              </div>
              <p className="sw-origin">Sanskrit · श्वास · śvāsa</p>
            </div>
          </div>

        </section>

        {/* ── Product strip ── */}
        <div className="sw-strip" aria-label="Featured pieces">
          <LocalizedClientLink href="/store" className="sw-strip-card">
            <span className="sw-strip-label">New arrival</span>
            <span className="sw-strip-name">The Essential Tee</span>
            <span className="sw-strip-detail">100% raw hemp · natural &amp; slate</span>
            <span className="sw-strip-arrow">→</span>
          </LocalizedClientLink>
          <LocalizedClientLink href="/store" className="sw-strip-card">
            <span className="sw-strip-label">Bestseller</span>
            <span className="sw-strip-name">The Everyday Shirt</span>
            <span className="sw-strip-detail">Hemp twill · forest &amp; sand</span>
            <span className="sw-strip-arrow">→</span>
          </LocalizedClientLink>
          <LocalizedClientLink href="/store" className="sw-strip-card">
            <span className="sw-strip-label">Coming soon</span>
            <span className="sw-strip-name">The Field Jacket</span>
            <span className="sw-strip-detail">Hemp canvas · coming later this year</span>
            <span className="sw-strip-arrow">→</span>
          </LocalizedClientLink>
        </div>
      </div>
    </>
  )
}

export default Hero
