import RevealWrapper from "@modules/home/components/reveal-wrapper"

const stats = [
  { value: "8×", label: "Less water than cotton" },
  { value: "0",  label: "Synthetic inputs or pesticides" },
  { value: "—C", label: "Carbon drawn from the air per acre" },
]

export default function SourceSection() {
  return (
    <>
      <style>{`
        /* ── Source section ── */
        .src-section {
          position: relative;
          width: 100%;
          min-height: 100svh;
          background-color: #1B2D24;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        /* Subtle grain on dark bg */
        .src-grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.25;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px 180px;
          mix-blend-mode: overlay;
        }

        /* Large background circle – decorative */
        .src-bg-circle {
          position: absolute;
          width: clamp(420px, 55vw, 780px);
          height: clamp(420px, 55vw, 780px);
          border-radius: 50%;
          border: 1px solid rgba(242, 239, 232, 0.07);
          right: clamp(-280px, -18vw, -120px);
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          z-index: 0;
        }
        .src-bg-circle-2 {
          position: absolute;
          width: clamp(260px, 34vw, 500px);
          height: clamp(260px, 34vw, 500px);
          border-radius: 50%;
          border: 1px solid rgba(192, 132, 62, 0.18);
          right: clamp(-180px, -10vw, -60px);
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          z-index: 0;
        }

        /* Inner layout */
        .src-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
          padding: clamp(5rem, 10vh, 8rem) clamp(1.5rem, 6vw, 5rem);
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
        }
        @media (min-width: 1024px) {
          .src-inner {
            grid-template-columns: 5fr 6fr;
            gap: 6rem;
            align-items: center;
          }
        }

        /* Left column – visual */
        .src-visual {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .src-orb {
          position: relative;
          width: clamp(220px, 28vw, 380px);
          height: clamp(220px, 28vw, 380px);
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #3d6b59, #2D4A3E 55%, #1B2D24 100%);
          display: flex;
          align-items: center;
          justify-content: center;

          /* Reveal animation */
          opacity: 0;
          transform: scale(0.82);
          transition: opacity 1.1s cubic-bezier(.16,1,.3,1), transform 1.1s cubic-bezier(.16,1,.3,1);
        }
        [data-revealed="true"] .src-orb {
          opacity: 1;
          transform: scale(1);
        }
        .src-orb-leaf {
          width: 38%;
          opacity: 0.55;
          animation: src-leaf-sway 8s ease-in-out infinite;
        }
        @keyframes src-leaf-sway {
          0%, 100% { transform: rotate(-4deg); }
          50%       { transform: rotate(6deg); }
        }
        /* Orbit ring around orb */
        .src-orbit {
          position: absolute;
          inset: -28px;
          border-radius: 50%;
          border: 1px dashed rgba(192, 132, 62, 0.3);
          animation: src-orbit-spin 30s linear infinite;
        }
        .src-orbit-dot {
          position: absolute;
          top: 50%;
          left: -4px;
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #C0843E;
          transform: translateY(-50%);
          opacity: 0.7;
        }
        @keyframes src-orbit-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* Right column – copy */
        .src-copy {
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
        }

        .src-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.65rem;
          font-weight: 400;
          letter-spacing: 0.36em;
          text-transform: uppercase;
          color: #C0843E;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s;
        }
        [data-revealed="true"] .src-eyebrow {
          opacity: 1; transform: translateY(0);
        }

        .src-headline {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 300;
          font-size: clamp(2.8rem, 6vw, 5.8rem);
          line-height: 1.04;
          color: #F2EFE8;
          overflow: hidden;
        }
        .src-headline-line {
          display: block;
          opacity: 0;
          transform: translateY(60px);
          transition: opacity 0.95s cubic-bezier(.16,1,.3,1), transform 0.95s cubic-bezier(.16,1,.3,1);
        }
        .src-headline-line:nth-child(1) { transition-delay: 0.15s; }
        .src-headline-line:nth-child(2) { transition-delay: 0.28s; }
        .src-headline-line:nth-child(3) { transition-delay: 0.40s; }
        [data-revealed="true"] .src-headline-line {
          opacity: 1; transform: translateY(0);
        }
        .src-headline em {
          font-style: italic;
          color: #C0843E;
        }

        .src-body {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(0.9rem, 1.3vw, 1.05rem);
          font-weight: 300;
          line-height: 1.8;
          color: rgba(242, 239, 232, 0.62);
          max-width: 480px;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.9s ease 0.5s, transform 0.9s ease 0.5s;
        }
        [data-revealed="true"] .src-body {
          opacity: 1; transform: translateY(0);
        }

        /* Stats row */
        .src-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 2.5rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(242, 239, 232, 0.1);
        }
        .src-stat {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .src-stat:nth-child(1) { transition-delay: 0.6s; }
        .src-stat:nth-child(2) { transition-delay: 0.72s; }
        .src-stat:nth-child(3) { transition-delay: 0.84s; }
        [data-revealed="true"] .src-stat {
          opacity: 1; transform: translateY(0);
        }
        .src-stat-value {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 300;
          font-size: clamp(2rem, 3.5vw, 3rem);
          color: #F2EFE8;
          line-height: 1;
        }
        .src-stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem;
          font-weight: 300;
          letter-spacing: 0.06em;
          color: rgba(242, 239, 232, 0.45);
          margin-top: 0.2rem;
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .src-orb,
          .src-eyebrow,
          .src-headline-line,
          .src-body,
          .src-stat {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <RevealWrapper>
        <section className="src-section" aria-label="Where we source our hemp">
          <div className="src-grain" aria-hidden="true" />
          <div className="src-bg-circle"   aria-hidden="true" />
          <div className="src-bg-circle-2" aria-hidden="true" />

          <div className="src-inner">
            {/* Visual */}
            <div className="src-visual" aria-hidden="true">
              <div className="src-orb">
                <div className="src-orbit">
                  <div className="src-orbit-dot" />
                </div>
                <svg
                  className="src-orb-leaf"
                  viewBox="0 0 80 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M40 115 C40 115 5 75 5 40 C5 18 20 5 40 5 C60 5 75 18 75 40 C75 75 40 115 40 115Z"
                    fill="#F2EFE8"
                  />
                  <line x1="40" y1="5"  x2="40" y2="115" stroke="#7B9C8C" strokeWidth="0.8" opacity="0.5" />
                  <line x1="40" y1="38" x2="64" y2="24"  stroke="#7B9C8C" strokeWidth="0.6" opacity="0.4" />
                  <line x1="40" y1="52" x2="67" y2="40"  stroke="#7B9C8C" strokeWidth="0.6" opacity="0.4" />
                  <line x1="40" y1="38" x2="16" y2="24"  stroke="#7B9C8C" strokeWidth="0.6" opacity="0.4" />
                  <line x1="40" y1="52" x2="13" y2="40"  stroke="#7B9C8C" strokeWidth="0.6" opacity="0.4" />
                </svg>
              </div>
            </div>

            {/* Copy */}
            <div className="src-copy">
              <span className="src-eyebrow">The Source</span>

              <h2 className="src-headline">
                <span className="src-headline-line">Grown,</span>
                <span className="src-headline-line">Not&nbsp;<em>Made.</em></span>
              </h2>

              <p className="src-body">
                Our hemp is cultivated on certified organic farms across the Carpathian Basin —
                where clean air, rich soil, and generations of knowledge produce fibre strong
                enough to outlast a decade of winters. No irrigation. No pesticides. Just sun,
                rain, and time.
              </p>

              <div className="src-stats">
                {stats.map((s) => (
                  <div key={s.label} className="src-stat">
                    <div className="src-stat-value">{s.value}</div>
                    <div className="src-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </RevealWrapper>
    </>
  )
}
