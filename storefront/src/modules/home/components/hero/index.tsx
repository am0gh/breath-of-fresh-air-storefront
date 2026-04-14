import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <>
      {/* ── Scoped animation styles ── */}
      <style>{`
        .bofa-banner {
          position: relative;
          width: 100%;
          height: 100svh;
          min-height: 600px;
          background-color: rgba(228, 228, 231, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        /* Grain texture */
        .bofa-grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0.4;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          mix-blend-mode: multiply;
          animation: bofa-grain-shift 8s steps(10) infinite;
        }
        @keyframes bofa-grain-shift {
          0%   { background-position: 0 0; }
          25%  { background-position: -40px 30px; }
          50%  { background-position: 20px -50px; }
          75%  { background-position: -30px 20px; }
          100% { background-position: 0 0; }
        }

        /* Ambient light sweep */
        .bofa-sweep {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          background: linear-gradient(
            115deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.13) 45%,
            rgba(255,255,255,0) 55%
          );
          background-size: 200% 200%;
          animation: bofa-sweep 7s ease-in-out 1.2s infinite;
        }
        @keyframes bofa-sweep {
          0%   { background-position: -60% 50%; opacity: 0; }
          15%  { opacity: 1; }
          50%  { background-position: 160% 50%; opacity: 0.6; }
          60%  { opacity: 0; }
          100% { background-position: 160% 50%; opacity: 0; }
        }

        /* Horizontal accent rules */
        .bofa-rule {
          position: absolute;
          left: 6%; right: 6%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #42481D 30%, #B6592E 70%, transparent);
          opacity: 0;
          transform: scaleX(0);
          transform-origin: left;
        }
        .bofa-rule-top    { top: 10%;    animation: bofa-rule-in 1.4s cubic-bezier(.16,1,.3,1) 0.3s forwards; }
        .bofa-rule-bottom { bottom: 10%; animation: bofa-rule-in 1.4s cubic-bezier(.16,1,.3,1) 0.5s forwards; }
        @keyframes bofa-rule-in {
          to { opacity: 0.28; transform: scaleX(1); }
        }

        /* Large olive orb – left */
        .bofa-orb {
          position: absolute;
          width: clamp(360px, 45vw, 640px);
          height: clamp(360px, 45vw, 640px);
          border-radius: 50%;
          background: radial-gradient(circle at 40% 40%, #4e5422 0%, #42481D 60%, transparent 100%);
          left: clamp(-200px, -12vw, -120px);
          top: 50%;
          transform: translateY(-50%);
          opacity: 0;
          filter: blur(3px);
          animation:
            bofa-orb-reveal 1.8s cubic-bezier(.16,1,.3,1) 0.2s forwards,
            bofa-orb-float  10s ease-in-out 2s infinite;
        }
        @keyframes bofa-orb-reveal {
          from { opacity: 0; transform: translateY(-50%) scale(0.85); }
          to   { opacity: 0.17; transform: translateY(-50%) scale(1); }
        }
        @keyframes bofa-orb-float {
          0%, 100% { transform: translateY(-50%) scale(1); }
          50%      { transform: translateY(calc(-50% - 18px)) scale(1.025); }
        }

        /* Rotating rings – right */
        .bofa-ring {
          position: absolute;
          border-radius: 50%;
          opacity: 0;
        }
        .bofa-ring-1 {
          width: clamp(200px, 24vw, 340px);
          height: clamp(200px, 24vw, 340px);
          border: 1.5px solid #B6592E;
          right: 9%; top: 50%;
          transform: translateY(-50%) rotate(-15deg);
          animation:
            bofa-ring-reveal  2s cubic-bezier(.16,1,.3,1) 0.6s forwards,
            bofa-ring-rotate  28s linear 2.6s infinite;
        }
        .bofa-ring-2 {
          width: clamp(120px, 14vw, 200px);
          height: clamp(120px, 14vw, 200px);
          border: 1px solid #42481D;
          right: calc(9% + clamp(40px, 5vw, 70px)); top: 50%;
          transform: translateY(-50%) rotate(20deg);
          animation:
            bofa-ring-reveal  2s cubic-bezier(.16,1,.3,1) 0.85s forwards,
            bofa-ring-rotate2 20s linear 2.85s infinite;
        }
        @keyframes bofa-ring-reveal {
          from { opacity: 0; transform: translateY(-50%) scale(0.65); }
          to   { opacity: 0.2; transform: translateY(-50%) scale(1); }
        }
        @keyframes bofa-ring-rotate  {
          from { transform: translateY(-50%) rotate(-15deg); }
          to   { transform: translateY(-50%) rotate(345deg); }
        }
        @keyframes bofa-ring-rotate2 {
          from { transform: translateY(-50%) rotate(20deg); }
          to   { transform: translateY(-50%) rotate(-340deg); }
        }

        /* Floating ambient dots */
        .bofa-dot {
          position: absolute;
          border-radius: 50%;
          opacity: 0;
        }
        .bofa-dot-1 { width:6px; height:6px; background:#B6592E; top:22%; left:28%;
          animation: bofa-dot-in .8s ease 1.6s forwards, bofa-float-a 6s ease-in-out 2.4s infinite; }
        .bofa-dot-2 { width:4px; height:4px; background:#42481D; top:68%; left:18%;
          animation: bofa-dot-in .8s ease 1.9s forwards, bofa-float-b 8s ease-in-out 2.7s infinite; }
        .bofa-dot-3 { width:8px; height:8px; background:#818E83; top:30%; right:22%;
          animation: bofa-dot-in .8s ease 2.1s forwards, bofa-float-a 7s ease-in-out 2.9s infinite; }
        .bofa-dot-4 { width:3px; height:3px; background:#B6592E; bottom:28%; right:30%;
          animation: bofa-dot-in .8s ease 2.3s forwards, bofa-float-b 9s ease-in-out 3.1s infinite; }
        @keyframes bofa-dot-in  { to { opacity: 0.7; } }
        @keyframes bofa-float-a {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-12px); }
        }
        @keyframes bofa-float-b {
          0%, 100% { transform: translateY(0) translateX(0); }
          50%      { transform: translateY(10px) translateX(6px); }
        }

        /* Leaf silhouettes */
        .bofa-leaf {
          position: absolute;
          opacity: 0;
          animation:
            bofa-leaf-reveal 2s ease 1.4s forwards,
            bofa-leaf-drift  12s ease-in-out 3.4s infinite;
          transform-origin: center;
        }
        .bofa-leaf-1 { top: 14%; right: 14%; width: clamp(36px, 4vw, 60px); }
        .bofa-leaf-2 { bottom: 16%; left: 9%; width: clamp(24px, 3vw, 42px); transform: scaleX(-1); }
        @keyframes bofa-leaf-reveal {
          from { opacity: 0; transform: rotate(-20deg) scale(0.6); }
          to   { opacity: 0.14; transform: rotate(0deg) scale(1); }
        }
        @keyframes bofa-leaf-drift {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          33%      { transform: rotate(6deg) translateY(-10px); }
          66%      { transform: rotate(-4deg) translateY(5px); }
        }

        /* Centre content */
        .bofa-content {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 0 2rem;
          max-width: 820px;
          width: 100%;
        }

        /* Eyebrow */
        .bofa-eyebrow {
          display: inline-block;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem;
          font-weight: 400;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #B6592E;
          opacity: 0;
          transform: translateY(14px);
          animation: bofa-fade-up 0.9s cubic-bezier(.16,1,.3,1) 0.8s forwards;
        }

        /* Headline */
        .bofa-headline {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 300;
          font-size: clamp(3rem, 8vw, 7.2rem);
          line-height: 1.02;
          color: #42481D;
          margin-top: 0.55rem;
          overflow: hidden;
        }
        .bofa-headline-line {
          display: block;
          opacity: 0;
          transform: translateY(100%);
        }
        .bofa-headline-line:nth-child(1) { animation: bofa-line-reveal 1s cubic-bezier(.16,1,.3,1) 1.0s forwards; }
        .bofa-headline-line:nth-child(2) { animation: bofa-line-reveal 1s cubic-bezier(.16,1,.3,1) 1.18s forwards; }
        @keyframes bofa-line-reveal {
          to { opacity: 1; transform: translateY(0); }
        }
        .bofa-headline em {
          font-style: italic;
          color: #B6592E;
        }

        /* Divider */
        .bofa-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          margin: 1.7rem 0 1.5rem;
          opacity: 0;
          animation: bofa-fade-up 0.8s ease 1.6s forwards;
        }
        .bofa-divider::before,
        .bofa-divider::after {
          content: '';
          flex: 1;
          max-width: 80px;
          height: 1px;
          background: #818E83;
          opacity: 0.45;
        }
        .bofa-divider-gem {
          width: 5px; height: 5px;
          background: #B6592E;
          border-radius: 50%;
        }

        /* Sub-copy */
        .bofa-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(0.72rem, 1.3vw, 0.88rem);
          font-weight: 300;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #818E83;
          opacity: 0;
          transform: translateY(12px);
          animation: bofa-fade-up 0.9s cubic-bezier(.16,1,.3,1) 1.75s forwards;
        }

        /* CTA */
        .bofa-cta-wrap {
          margin-top: 2.6rem;
          opacity: 0;
          transform: translateY(16px);
          animation: bofa-fade-up 0.9s cubic-bezier(.16,1,.3,1) 2.05s forwards;
        }
        .bofa-cta {
          display: inline-block;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 400;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #42481D;
          text-decoration: none;
          border: 1px solid #42481D;
          padding: 0.9rem 2.5rem;
          position: relative;
          overflow: hidden;
          transition: color 0.4s ease;
          cursor: pointer;
        }
        .bofa-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #42481D;
          transform: translateX(-101%);
          transition: transform 0.45s cubic-bezier(.16,1,.3,1);
        }
        .bofa-cta:hover::before { transform: translateX(0); }
        .bofa-cta:hover { color: rgba(245, 240, 232, 1); }
        .bofa-cta-text { position: relative; z-index: 1; }

        /* Scroll indicator */
        .bofa-scroll {
          position: absolute;
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.45rem;
          opacity: 0;
          animation: bofa-fade-up 0.8s ease 2.8s forwards;
          z-index: 10;
        }
        .bofa-scroll-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.58rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #818E83;
        }
        .bofa-scroll-line {
          width: 1px;
          height: 34px;
          background: linear-gradient(to bottom, #818E83, transparent);
          animation: bofa-scroll-pulse 2s ease-in-out 3.4s infinite;
        }
        @keyframes bofa-scroll-pulse {
          0%, 100% { opacity: 0.35; transform: scaleY(1);   transform-origin: top; }
          50%      { opacity: 0.9;  transform: scaleY(1.15); transform-origin: top; }
        }

        /* Shared utility */
        @keyframes bofa-fade-up {
          to { opacity: 1; transform: translateY(0); }
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .bofa-grain,
          .bofa-sweep,
          .bofa-orb,
          .bofa-ring,
          .bofa-dot,
          .bofa-leaf,
          .bofa-scroll-line {
            animation: none !important;
          }
          .bofa-eyebrow,
          .bofa-headline-line,
          .bofa-divider,
          .bofa-sub,
          .bofa-cta-wrap,
          .bofa-scroll,
          .bofa-rule {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
          }
          .bofa-orb    { opacity: 0.17; }
          .bofa-ring-1 { opacity: 0.2; }
          .bofa-ring-2 { opacity: 0.2; }
        }
      `}</style>

      <section className="bofa-banner" aria-label="Hero banner">

        {/* Grain texture */}
        <div className="bofa-grain" aria-hidden="true" />

        {/* Ambient light sweep */}
        <div className="bofa-sweep" aria-hidden="true" />

        {/* Horizontal accent rules */}
        <div className="bofa-rule bofa-rule-top"    aria-hidden="true" />
        <div className="bofa-rule bofa-rule-bottom" aria-hidden="true" />

        {/* Large background orb */}
        <div className="bofa-orb" aria-hidden="true" />

        {/* Rotating rings */}
        <div className="bofa-ring bofa-ring-1" aria-hidden="true" />
        <div className="bofa-ring bofa-ring-2" aria-hidden="true" />

        {/* Floating dots */}
        <div className="bofa-dot bofa-dot-1" aria-hidden="true" />
        <div className="bofa-dot bofa-dot-2" aria-hidden="true" />
        <div className="bofa-dot bofa-dot-3" aria-hidden="true" />
        <div className="bofa-dot bofa-dot-4" aria-hidden="true" />

        {/* Leaf silhouettes */}
        <svg
          className="bofa-leaf bofa-leaf-1"
          viewBox="0 0 80 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M40 115 C40 115 5 75 5 40 C5 18 20 5 40 5 C60 5 75 18 75 40 C75 75 40 115 40 115Z" fill="#42481D" />
          <line x1="40" y1="5"  x2="40" y2="115" stroke="#818E83" strokeWidth="0.8" opacity="0.6" />
          <line x1="40" y1="40" x2="65" y2="25"  stroke="#818E83" strokeWidth="0.6" opacity="0.4" />
          <line x1="40" y1="55" x2="68" y2="42"  stroke="#818E83" strokeWidth="0.6" opacity="0.4" />
          <line x1="40" y1="40" x2="15" y2="25"  stroke="#818E83" strokeWidth="0.6" opacity="0.4" />
          <line x1="40" y1="55" x2="12" y2="42"  stroke="#818E83" strokeWidth="0.6" opacity="0.4" />
        </svg>

        <svg
          className="bofa-leaf bofa-leaf-2"
          viewBox="0 0 80 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{ transform: "scaleX(-1)" }}
        >
          <path d="M40 115 C40 115 5 75 5 40 C5 18 20 5 40 5 C60 5 75 18 75 40 C75 75 40 115 40 115Z" fill="#42481D" />
          <line x1="40" y1="5"  x2="40" y2="115" stroke="#818E83" strokeWidth="0.8" opacity="0.6" />
          <line x1="40" y1="40" x2="65" y2="25"  stroke="#818E83" strokeWidth="0.6" opacity="0.4" />
          <line x1="40" y1="55" x2="68" y2="42"  stroke="#818E83" strokeWidth="0.6" opacity="0.4" />
          <line x1="40" y1="40" x2="15" y2="25"  stroke="#818E83" strokeWidth="0.6" opacity="0.4" />
          <line x1="40" y1="55" x2="12" y2="42"  stroke="#818E83" strokeWidth="0.6" opacity="0.4" />
        </svg>

        {/* Centre content */}
        <div className="bofa-content">
          <span className="bofa-eyebrow">Sustainable Hemp Outerwear</span>

          <h1 className="bofa-headline">
            <span className="bofa-headline-line">Wear the&nbsp;<em>Earth.</em></span>
            <span className="bofa-headline-line">Feel the&nbsp;<em>Air.</em></span>
          </h1>

          <div className="bofa-divider" aria-hidden="true">
            <div className="bofa-divider-gem" />
          </div>

          <p className="bofa-sub">
            Breath of Fresh Air&nbsp;&nbsp;·&nbsp;&nbsp;Hemp Jackets&nbsp;&nbsp;·&nbsp;&nbsp;Made to Last
          </p>

          <div className="bofa-cta-wrap">
            <LocalizedClientLink href="/store" className="bofa-cta">
              <span className="bofa-cta-text">Explore the Collection</span>
            </LocalizedClientLink>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="bofa-scroll" aria-hidden="true">
          <span className="bofa-scroll-label">Scroll</span>
          <div className="bofa-scroll-line" />
        </div>

      </section>
    </>
  )
}

export default Hero
