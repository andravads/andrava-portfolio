"use client";

import { useState, useEffect, useRef } from "react";

// ============================================================
// SITE CONFIG — Update all values here
// ============================================================
const SITE_CONFIG = {
  name: "Andrava",
  tagline: "Work sharp. Lift heavy. Live deliberately.",
  subTagline:
    "I create practical content on corporate life, bodybuilding, and the discipline of building a sharper career and a stronger body.",
  email: "andravaads@gmail.com",
  socials: {
    tiktokGym: { handle: "@gymnyagema", url: "https://www.tiktok.com/@gymnyagema", focus: "Bodybuilding & Gym" },
    tiktokWork: { handle: "@andravads", url: "https://www.tiktok.com/@andravads", focus: "Salaryman & Work Life" },
    igGym: { handle: "@gymnyagema", url: "https://www.instagram.com/gymnyagema", focus: "Gym Lifestyle" },
    igWork: { handle: "@andravads", url: "https://www.instagram.com/andravads", focus: "Work & Daily Life" },
    youtube: { handle: "Andrava", url: "https://youtube.com/@andravads", focus: "Long-form Work & Gym" },
  },
};

// ============================================================
// ANALYTICS DATA — Replace with real numbers
// ============================================================
// Replace these sample numbers with your real TikTok, Instagram, and YouTube analytics.
const ANALYTICS = {
  note: "Creator analytics across TikTok, Instagram, and YouTube.",
  totals: {
    tiktokFollowers: 520,      // @gymnyagema 420 + @andravads 100
    igFollowers: 1824,         // @gymnyagema 1500 + @andravads 324
    youtubeSubscribers: 187,
    monthlyViews: 98400,
    totalPosts: 216,           // 72 x 3
    avgEngagement: 17.4,
  },
  monthlyGrowth: [
    { month: "Jan", tiktok: 210, ig: 980, yt: 62 },
    { month: "Feb", tiktok: 290, ig: 1120, yt: 88 },
    { month: "Mar", tiktok: 360, ig: 1340, yt: 112 },
    { month: "Apr", tiktok: 410, ig: 1520, yt: 140 },
    { month: "May", tiktok: 470, ig: 1680, yt: 163 },
    { month: "Jun", tiktok: 520, ig: 1824, yt: 187 },
  ],
  pillarPerformance: [
    { pillar: "Gym", avgViews: 8200, posts: 86 },
    { pillar: "Works", avgViews: 5600, posts: 94 },
    { pillar: "Travel", avgViews: 2100, posts: 36 },
  ],
};

// ============================================================
// FEATURED CONTENT — Replace with your real posts
// ============================================================
const FEATURED_CONTENT = [
  {
    id: 1,
    title: "Why I Always Track My Gym Progress",
    platform: "TikTok",
    account: "@gymnyagema",
    pillar: "Gym",
    hook: "Progress is easier to trust when you actually track it.",
    // REPLACE WITH 600x800 VIDEO THUMBNAIL FROM YOUR ACTUAL TIKTOK/REELS POST
    thumbnail: "https://placehold.co/600x800/1a1a1a/888888?text=Gym+Post",
    url: "PASTE_REAL_POST_URL_HERE",
    metrics: { views: "Input manually", likes: "Input manually" },
    note: "Replace with actual post data.",
  },
  {
    id: 2,
    title: "Meeting Culture Is Breaking Productivity",
    platform: "TikTok",
    account: "@andravads",
    pillar: "Works",
    hook: "Meetings should be short and actually useful.",
    // REPLACE WITH 600x800 VIDEO THUMBNAIL FROM YOUR ACTUAL TIKTOK/REELS POST
    thumbnail: "https://placehold.co/600x800/1a1a1a/888888?text=Work+Post",
    url: "PASTE_REAL_POST_URL_HERE",
    metrics: { views: "Input manually", likes: "Input manually" },
    note: "Replace with actual post data.",
  },
  {
    id: 3,
    title: "Progressive Overload Isn't Complicated",
    platform: "Instagram",
    account: "@gymnyagema",
    pillar: "Gym",
    hook: "One more rep. A little more weight. That's it.",
    // REPLACE WITH 600x800 VIDEO THUMBNAIL FROM YOUR ACTUAL TIKTOK/REELS POST
    thumbnail: "https://placehold.co/600x800/1a1a1a/888888?text=Gym+Reel",
    url: "PASTE_REAL_POST_URL_HERE",
    metrics: { views: "Input manually", likes: "Input manually" },
    note: "Replace with actual post data.",
  },
  {
    id: 4,
    title: "Jetlag from Business Travel Hits Different",
    platform: "Instagram",
    account: "@andravads",
    pillar: "Works",
    hook: "Working across timezones is an underrated skill.",
    // REPLACE WITH 600x800 VIDEO THUMBNAIL FROM YOUR ACTUAL TIKTOK/REELS POST
    thumbnail: "https://placehold.co/600x800/1a1a1a/888888?text=Travel+Post",
    url: "PASTE_REAL_POST_URL_HERE",
    metrics: { views: "Input manually", likes: "Input manually" },
    note: "Replace with actual post data.",
  },
];

// ============================================================
// LINKS / SHOP DATA
// Images: drop 400x400 product photos in /public named as shown in img field
// ============================================================
const LINKS_DATA = [
  {
    category: "Gym Outfit",
    color: T,
    items: [
      {
        title: "Casual Tee",
        desc: "Clean everyday tee that works for gym and casual wear.",
        url: "https://vt.tokopedia.com/t/ZS92vq5WgTgtW-Gf0K7/",
        img: "https://placehold.co/400x400/1a1a1a/444?text=Casual+Tee", // REPLACE: /outfit-tee.jpg
        active: true,
      },
      {
        title: "Neveres Superhuman",
        desc: "Gym wear built for training seriously.",
        url: "https://vt.tokopedia.com/t/ZS92vbNvFJ6ae-7DUTG/",
        img: "https://placehold.co/400x400/1a1a1a/444?text=Neveres", // REPLACE: /outfit-neveres.jpg
        active: true,
      },
      {
        title: "Casual Shorts",
        desc: "Versatile shorts for gym and off-day use.",
        url: "https://vt.tokopedia.com/t/ZS92vbSHMDbkm-x5ajo/",
        img: "https://placehold.co/400x400/1a1a1a/444?text=Shorts", // REPLACE: /outfit-shorts.jpg
        active: true,
      },
    ],
  },
  {
    category: "Gym Setup",
    items: [
      {
        title: "Resistance Bands Set",
        desc: "What I use for warm-up and home sessions.",
        url: "https://vt.tokopedia.com/t/ZS9237GXxRJCy-83L7I/",
        img: "https://placehold.co/400x400/1a1a1a/444?text=Bands", // REPLACE: /gear-bands.jpg
        active: true,
      },
      {
        title: "Gym Belt",
        desc: "For heavy compound lifts.",
        url: "https://vt.tokopedia.com/t/ZS923vahBgQPs-KakWd/",
        img: "https://placehold.co/400x400/1a1a1a/444?text=Gym+Belt", // REPLACE: /gear-belt.jpg
        active: true,
      },
      {
        title: "Wrist Strap",
        desc: "Extra wrist support for pulling movements.",
        url: "https://vt.tokopedia.com/t/ZS9237GXxRJCy-83L7I/",
        img: "https://placehold.co/400x400/1a1a1a/444?text=Wrist+Strap", // REPLACE: /gear-wriststrap.jpg
        active: true,
      },
    ],
  },
  {
    category: "Gym Supplements",
    items: [
      {
        title: "Whey Protein (Current)",
        desc: "What I'm currently using for post-training recovery.",
        url: "https://vt.tokopedia.com/t/ZS92vqHfkfBHY-PrFtA/",
        img: "https://placehold.co/400x400/1a1a1a/444?text=Whey+Protein", // REPLACE: /supp-whey.jpg
        active: true,
      },
      {
        title: "Creatine",
        desc: "Simple, effective, science-backed.",
        url: "https://vt.tokopedia.com/t/ZS92vbMypgxjg-jbWrE/",
        img: "https://placehold.co/400x400/1a1a1a/444?text=Creatine", // REPLACE: /supp-creatine.jpg
        active: true,
      },
    ],
  },
  {
    category: "Work Setup",
    items: [
      {
        title: "Mechanical Keyboard",
        desc: "Daily driver for office and WFH.",
        url: "PASTE_AFFILIATE_LINK_HERE",
        img: "https://placehold.co/400x400/1a1a1a/444?text=Keyboard", // REPLACE: /work-keyboard.jpg
        active: true,
      },
      {
        title: "Planner / Notebook",
        desc: "How I track tasks and daily priorities.",
        url: "PASTE_AFFILIATE_LINK_HERE",
        img: "https://placehold.co/400x400/1a1a1a/444?text=Notebook", // REPLACE: /work-notebook.jpg
        active: true,
      },
    ],
  },
  {
    category: "Creator Gear",
    items: [
      {
        title: "Tripod",
        desc: "Stable setup for solo shooting.",
        url: "https://vt.tokopedia.com/t/ZS92vbkEcpsjT-XnPcH/",
        img: "https://placehold.co/400x400/1a1a1a/444?text=Tripod", // REPLACE: /creator-tripod.jpg
        active: true,
      },
      {
        title: "Fill Light",
        desc: "Consistent soft lighting for content.",
        url: "https://vt.tokopedia.com/t/ZS923cRXPtwvK-PPSxr/",
        img: "https://placehold.co/400x400/1a1a1a/444?text=Fill+Light", // REPLACE: /creator-light.jpg
        active: true,
      },
    ],
  },
];

// ============================================================
// PALETTE & TOKENS
// ============================================================
const T = {
  bg: "#0e0e0e",
  surface: "#161616",
  surface2: "#1e1e1e",
  border: "rgba(255,255,255,0.07)",
  borderMid: "rgba(255,255,255,0.12)",
  text: "#f0ece4",
  muted: "#888880",
  faint: "#444440",
  accent: "#b8a98a", // warm gold-beige
  accentDim: "rgba(184,169,138,0.15)",
  gym: "#4a7c6b",    // muted steel teal
  gymDim: "rgba(74,124,107,0.15)",
  work: "#5a6b8a",   // slate blue
  workDim: "rgba(90,107,138,0.15)",
};

// ============================================================
// GLOBAL STYLES
// ============================================================
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html { scroll-behavior: smooth; }

    body {
      background: ${T.bg};
      color: ${T.text};
      font-family: 'DM Sans', sans-serif;
      font-weight: 300;
      line-height: 1.65;
      overflow-x: hidden;
    }

    ::selection { background: ${T.accentDim}; color: ${T.accent}; }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: ${T.bg}; }
    ::-webkit-scrollbar-thumb { background: ${T.faint}; border-radius: 2px; }

    .serif { font-family: 'Cormorant Garamond', serif; }

    a { color: inherit; text-decoration: none; }

    img { display: block; }

    /* Nav */
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      padding: 1.25rem 3rem;
      display: flex; align-items: center; justify-content: space-between;
      border-bottom: 1px solid transparent;
      transition: all 0.4s ease;
    }
    nav.scrolled {
      background: rgba(14,14,14,0.9);
      backdrop-filter: blur(16px);
      border-bottom-color: ${T.border};
    }
    .nav-logo {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.5rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      color: ${T.text};
    }
    .nav-links {
      display: flex; gap: 2.5rem; list-style: none;
    }
    .nav-links a {
      font-size: 0.78rem;
      font-weight: 400;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: ${T.muted};
      transition: color 0.2s;
    }
    .nav-links a:hover { color: ${T.text}; }

    /* Sections */
    section { padding: 7rem 0; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 3rem; }

    /* Section labels */
    .section-label {
      font-size: 0.7rem;
      font-weight: 500;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: ${T.accent};
      margin-bottom: 1.5rem;
      display: flex; align-items: center; gap: 0.75rem;
    }
    .section-label::before {
      content: '';
      display: block; width: 2rem; height: 1px;
      background: ${T.accent};
    }

    /* Headings */
    .display-heading {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(3rem, 6vw, 5.5rem);
      font-weight: 300;
      line-height: 1.1;
      letter-spacing: -0.01em;
    }
    .section-heading {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(2rem, 4vw, 3.2rem);
      font-weight: 300;
      line-height: 1.15;
    }

    /* Buttons */
    .btn {
      display: inline-flex; align-items: center; gap: 0.5rem;
      padding: 0.75rem 1.75rem;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.78rem;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      border: 1px solid ${T.borderMid};
      border-radius: 1px;
      cursor: pointer;
      transition: all 0.25s ease;
      background: transparent;
      color: ${T.text};
    }
    .btn:hover { background: ${T.surface2}; border-color: ${T.accent}; color: ${T.accent}; }
    .btn-accent {
      background: ${T.accent};
      border-color: ${T.accent};
      color: #0e0e0e;
    }
    .btn-accent:hover { background: transparent; color: ${T.accent}; }

    /* Cards */
    .card {
      background: ${T.surface};
      border: 1px solid ${T.border};
      border-radius: 2px;
      overflow: hidden;
      transition: border-color 0.25s, transform 0.25s;
    }
    .card:hover { border-color: ${T.borderMid}; transform: translateY(-2px); }

    /* Divider */
    .divider {
      height: 1px;
      background: ${T.border};
      margin: 0;
    }

    /* Platform badge */
    .badge {
      display: inline-block;
      padding: 0.2rem 0.6rem;
      font-size: 0.65rem;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      border-radius: 1px;
    }
    .badge-tiktok { background: rgba(255,255,255,0.06); color: ${T.muted}; }
    .badge-instagram { background: rgba(180,120,80,0.12); color: #c8906a; }
    .badge-youtube { background: rgba(180,60,60,0.12); color: #d07070; }
    .badge-gym { background: ${T.gymDim}; color: ${T.gym}; }
    .badge-works { background: ${T.workDim}; color: ${T.work}; }

    /* Animate on scroll */
    .fade-up { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .fade-up.visible { opacity: 1; transform: translateY(0); }

    /* Responsive */
    @media (max-width: 768px) {
      nav { padding: 1rem 1.5rem; }
      .nav-links { display: none; }
      .container { padding: 0 1.25rem; }
      section { padding: 3.5rem 0; }

      .hero-grid { grid-template-columns: 1fr !important; }
      .hero-img { display: none !important; }
      .identity-grid { grid-template-columns: 1fr !important; }
      .identity-right { border-left: none !important; border-top: 1px solid rgba(255,255,255,0.07) !important; }
      .pillars-grid { grid-template-columns: 1fr !important; }
      .pillar-side { border-left: none !important; border-top: 1px solid rgba(255,255,255,0.07) !important; }
      .social-grid { grid-template-columns: 1fr !important; }
      .content-grid { grid-template-columns: 1fr !important; }
      .stats-grid { grid-template-columns: 1fr 1fr !important; }
      .links-grid { grid-template-columns: 1fr !important; }
      .partner-grid { grid-template-columns: 1fr !important; }
      .partner-cats { grid-template-columns: 1fr 1fr !important; }
      .footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
      .footer-bottom { flex-direction: column !important; gap: 0.5rem !important; text-align: center !important; }
      .bridge-inner { flex-direction: column !important; gap: 1rem !important; }
      .hero-btns { flex-direction: column !important; }
      .hero-btns a { width: 100% !important; justify-content: center !important; }
      .display-heading { font-size: 2.5rem !important; }
      .filter-row { flex-direction: column !important; align-items: flex-start !important; }
    }

    /* Chart bar */
    .chart-bar {
      background: ${T.surface2};
      border-radius: 1px;
      overflow: hidden;
      height: 6px;
    }
    .chart-bar-fill {
      height: 100%;
      border-radius: 1px;
      transition: width 1.2s cubic-bezier(0.25,0.8,0.25,1);
    }

    /* Grain overlay */
    body::after {
      content: '';
      position: fixed; inset: 0; z-index: 999;
      pointer-events: none;
      opacity: 0.025;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    }
  `}</style>
);

// ============================================================
// HOOKS
// ============================================================
function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return scrolled;
}

function useFadeUp(ref) {
  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll(".fade-up");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ============================================================
// NAV
// ============================================================
function Nav() {
  const scrolled = useScrolled();
  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <span className="nav-logo">{SITE_CONFIG.name}</span>
      <ul className="nav-links">
        {[["Works", "#works"], ["Gym", "#gym"], ["Content", "#content"], ["Links", "#links"], ["Collab", "#collab"]].map(([l, h]) => (
          <li key={l}><a href={h}>{l}</a></li>
        ))}
      </ul>
      <a href={`mailto:${SITE_CONFIG.email}`} className="btn" style={{ padding: "0.5rem 1.25rem", fontSize: "0.72rem" }}>
        Work With Me
      </a>
    </nav>
  );
}

// ============================================================
// HERO
// ============================================================
function Hero() {
  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: "6rem", paddingBottom: "4rem", position: "relative", overflow: "hidden" }}>
      {/* Background accent lines */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "15%", right: "8%", width: "1px", height: "35vh", background: `linear-gradient(to bottom, transparent, ${T.faint}, transparent)` }} />
        <div style={{ position: "absolute", bottom: "20%", left: "12%", width: "30vw", height: "1px", background: `linear-gradient(to right, transparent, ${T.faint}, transparent)` }} />
      </div>

      <div className="container hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
        {/* Left */}
        <div>
          <div className="section-label" style={{ animationDelay: "0.1s" }}>Creator · Jakarta, Indonesia</div>

          <h1 className="display-heading" style={{ marginBottom: "2rem", color: T.text }}>
            Work sharp.<br />
            <em style={{ color: T.accent }}>Lift heavy.</em><br />
            Live deliberately.
          </h1>

          <p style={{ fontSize: "1rem", color: T.muted, maxWidth: "420px", lineHeight: 1.75, marginBottom: "2.5rem" }}>
            {SITE_CONFIG.subTagline}
          </p>

          <div className="hero-btns" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
            <a href="#works" className="btn btn-accent">Explore Works</a>
            <a href="#gym" className="btn">Explore Gym</a>
            <a href={`mailto:${SITE_CONFIG.email}`} className="btn">Work With Me</a>
          </div>

          {/* Social row */}
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            {[
              { label: "TikTok", handles: ["@gymnyagema", "@andravads"] },
              { label: "Instagram", handles: ["@gymnyagema", "@andravads"] },
              { label: "YouTube", handles: ["Andrava Notes"] },
            ].map(({ label, handles }) => (
              <div key={label}>
                <div style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: T.faint, marginBottom: "0.3rem" }}>{label}</div>
                {handles.map((h) => (
                  <div key={h} style={{ fontSize: "0.78rem", color: T.muted }}>{h}</div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Right — Hero image */}
        <div className="hero-img" style={{ position: "relative" }}>
          {/* REPLACE WITH A 1200x1600 VERTICAL HERO SHOT: Japanese City Boy outfit, clean city background, or gym-lifestyle portrait */}
          <img
            src="/hero.jpg"
            alt="Andrava hero portrait"
            style={{ width: "100%", borderRadius: "2px", border: `1px solid ${T.border}` }}
          />
          {/* Corner accent */}
          <div style={{ position: "absolute", top: "-1rem", right: "-1rem", width: "4rem", height: "4rem", border: `1px solid ${T.accent}`, borderRadius: "1px", opacity: 0.4 }} />
          <div style={{ position: "absolute", bottom: "-1rem", left: "-1rem", width: "3rem", height: "3rem", border: `1px solid ${T.faint}`, borderRadius: "1px" }} />

          {/* Floating label */}
          <div style={{ position: "absolute", bottom: "1.5rem", right: "1.5rem", background: "rgba(14,14,14,0.85)", backdropFilter: "blur(12px)", border: `1px solid ${T.border}`, padding: "0.75rem 1rem", borderRadius: "2px" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: T.muted }}>Content Creator</div>
            <div style={{ fontSize: "0.95rem", fontFamily: "Cormorant Garamond, serif", color: T.text }}>8-to-5 · Gym · Life</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// IDENTITY — Split screen
// ============================================================
function Identity() {
  const ref = useRef();
  useFadeUp(ref);
  return (
    <section ref={ref} style={{ padding: "5rem 0", background: T.surface }}>
      <div className="container">
        <div className="identity-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: `1px solid ${T.border}`, borderRadius: "2px", overflow: "hidden" }}>
          {/* Works side */}
          <div className="fade-up" style={{ padding: "4rem", borderRight: `1px solid ${T.border}`, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "3px", height: "100%", background: T.work }} />
            <div className="section-label" style={{ color: T.work }}>World 01</div>
            <div className="section-heading" style={{ marginBottom: "1.5rem" }}>The Salaryman</div>
            {/* REPLACE WITH A 1600x900 WORK LIFESTYLE PHOTO: laptop, office, airport, or corporate travel scene */}
            <img src="/work.jpg" alt="Work lifestyle" style={{ width: "100%", marginBottom: "1.5rem", borderRadius: "1px", border: `1px solid ${T.border}` }} />
            <p style={{ color: T.muted, fontSize: "0.9rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              Corporate grind, productivity habits, office dynamics, business travel, and the quiet discipline of staying sharp in a demanding career.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {["8-to-5 Reality", "Productivity", "Career Growth", "Office Culture", "Business Travel"].map((t) => (
                <span key={t} className="badge badge-works">{t}</span>
              ))}
            </div>
          </div>

          {/* Gym side */}
          <div className="identity-right fade-up" style={{ padding: "4rem", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: "3px", height: "100%", background: T.gym }} />
            <div className="section-label" style={{ color: T.gym }}>World 02</div>
            <div className="section-heading" style={{ marginBottom: "1.5rem" }}>The Lifter</div>
            {/* REPLACE WITH A 900x1200 GYM TRAINING PHOTO: lifting, mirror shot, or gym editorial portrait */}
            <img src="/gym.jpg" alt="Gym lifestyle" style={{ width: "100%", marginBottom: "1.5rem", borderRadius: "1px", border: `1px solid ${T.border}` }} />
            <p style={{ color: T.muted, fontSize: "0.9rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              Progressive overload, training consistency, practical gym education, and building a stronger body while holding down a full-time career.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {["Bodybuilding", "Progressive Overload", "Consistency", "Practical Tips", "Busy Lifter"].map((t) => (
                <span key={t} className="badge badge-gym">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bridge */}
        <div className="fade-up bridge-inner" style={{ marginTop: "2px", background: T.surface2, border: `1px solid ${T.border}`, padding: "3rem 4rem", display: "flex", alignItems: "center", gap: "3rem" }}>
          <div style={{ flex: "0 0 auto" }}>
            <div style={{ width: "3rem", height: "1px", background: T.accent }} />
          </div>
          <div>
            <div className="section-label" style={{ marginBottom: "0.75rem" }}>The Bridge</div>
            <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.4rem", fontWeight: 300, fontStyle: "italic", color: T.text, lineHeight: 1.5 }}>
              "Not just a gym creator. Not just a corporate worker. A creator documenting how to build both — while living the honest reality of an 8-to-5 life."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CONTENT PILLARS
// ============================================================
function PillarCard({ id, color, colorDim, label, world, title, desc, topics, img, imgNote, cta, handle, onFollow }) {
  const pillarStyle = {
    flex: 1,
    minWidth: "280px",
    background: T.surface,
    border: `1px solid ${T.border}`,
    borderRadius: "2px",
    overflow: "hidden",
    transition: "border-color 0.25s, transform 0.25s",
  };
  return (
    <div id={id} className="card" style={{ flex: 1, minWidth: "280px" }}>
      <div style={{ position: "relative" }}>
        {/* REPLACE WITH GYM OR WORK LIFESTYLE IMAGE */}
        <img src={img} alt={title} style={{ width: "100%", height: "220px", objectFit: "cover", filter: "brightness(0.7)" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${T.surface} 0%, transparent 50%)` }} />
        <div style={{ position: "absolute", bottom: "1rem", left: "1.5rem" }}>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color, marginBottom: "0.25rem" }}>{world}</div>
          <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.5rem", color: T.text }}>{title}</div>
        </div>
      </div>
      <div style={{ padding: "1.5rem" }}>
        <p style={{ color: T.muted, fontSize: "0.875rem", lineHeight: 1.75, marginBottom: "1.25rem" }}>{desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
          {topics.map((t) => (
            <span key={t} style={{ fontSize: "0.65rem", padding: "0.2rem 0.5rem", letterSpacing: "0.08em", background: colorDim, color, borderRadius: "1px" }}>{t}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <a href={`#content`} className="btn" style={{ fontSize: "0.7rem", padding: "0.5rem 1rem" }}>{cta}</a>
          <span style={{ fontSize: "0.78rem", color, display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: color, display: "inline-block" }} />
            {handle}
          </span>
        </div>
      </div>
    </div>
  );
}

function Pillars() {
  const ref = useRef();
  useFadeUp(ref);
  return (
    <section ref={ref}>
      <div className="container">
        <div className="section-label fade-up">Content Universe</div>
        <div className="pillars-grid" style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr", gap: "1px", background: T.border }}>

          {/* Works pillar */}
          <div id="works" className="fade-up" style={{ background: T.surface, padding: "3rem" }}>
            <div style={{ width: "3rem", height: "3rem", border: `1px solid ${T.work}`, borderRadius: "1px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.1em", color: T.work }}>W</span>
            </div>
            <div className="section-heading" style={{ marginBottom: "1rem" }}>Works</div>
            {/* REPLACE WITH A 1600x900 WORK LIFESTYLE PHOTO: office, laptop, airport scene */}
            <img src="/work2.jpg" alt="Works" style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "1px", marginBottom: "1.25rem", border: `1px solid ${T.border}` }} />
            <p style={{ color: T.muted, fontSize: "0.875rem", lineHeight: 1.8, marginBottom: "1.25rem" }}>
              The salaryman experience, documented honestly. Productivity that actually works, office culture observations, and how to navigate career growth without burning out.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
              {["8-to-5 Life", "Productivity", "Career", "Office Culture", "Business Travel", "Work Communication"].map((t) => (
                <span key={t} className="badge badge-works">{t}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <a href={SITE_CONFIG.socials.tiktokWork.url} target="_blank" rel="noreferrer" className="btn" style={{ fontSize: "0.7rem", padding: "0.5rem 1rem" }}>Follow @andravads</a>
            </div>
          </div>

          {/* Gym pillar */}
          <div id="gym" className="fade-up" style={{ background: T.surface, padding: "3rem", borderLeft: `1px solid ${T.border}` }}>
            <div style={{ width: "3rem", height: "3rem", border: `1px solid ${T.gym}`, borderRadius: "1px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.1em", color: T.gym }}>G</span>
            </div>
            <div className="section-heading" style={{ marginBottom: "1rem" }}>Gym</div>
            {/* REPLACE WITH A 900x1200 GYM TRAINING PHOTO: lifting, squat rack, or gym editorial */}
            <img src="/gym2.jpg" alt="Gym" style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "1px", marginBottom: "1.25rem", border: `1px solid ${T.border}` }} />
            <p style={{ color: T.muted, fontSize: "0.875rem", lineHeight: 1.8, marginBottom: "1.25rem" }}>
              Not just form tutorials. Practical thinking on how to train consistently, track progress, and build a stronger physique while holding a full-time career.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
              {["Bodybuilding", "Progressive Overload", "Consistency", "Tracking", "Busy Lifter", "Practical Tips"].map((t) => (
                <span key={t} className="badge badge-gym">{t}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <a href={SITE_CONFIG.socials.tiktokGym.url} target="_blank" rel="noreferrer" className="btn" style={{ fontSize: "0.7rem", padding: "0.5rem 1rem" }}>Follow @gymnyagema</a>
            </div>
          </div>

          {/* Sidequest */}
          <div className="pillar-side fade-up" style={{ background: T.surface, padding: "2rem", borderLeft: `1px solid ${T.border}`, display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: T.faint, marginBottom: "1rem" }}>Sidequest</div>
            <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.4rem", marginBottom: "0.75rem" }}>Travel</div>
            {/* REPLACE WITH A 1600x900 TRAVEL WIDE SHOT: city, mountain, airport, or lifestyle travel image */}
            <img src="/travel.jpg" alt="Travel" style={{ width: "100%", flex: 1, objectFit: "cover", borderRadius: "1px", marginBottom: "1rem", border: `1px solid ${T.border}`, minHeight: "180px" }} />
            <p style={{ color: T.muted, fontSize: "0.8rem", lineHeight: 1.75, marginBottom: "1rem" }}>
              City logs, business trips, and moments in between. Japan, Indonesia, the Middle East, and wherever work takes me next.
            </p>
            <a href={SITE_CONFIG.socials.igWork.url} target="_blank" rel="noreferrer" className="btn" style={{ fontSize: "0.65rem", padding: "0.5rem 0.75rem", textAlign: "center" }}>View Travel Logs</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SOCIAL MEDIA HUB
// ============================================================

// Preview image map — rename your screenshots to match these filenames
// and drop them in the /public folder:
//   preview-gymnyagema-tiktok.jpg   → screenshot of @gymnyagema TikTok profile/video
//   preview-andravads-tiktok.jpg    → screenshot of @andravads TikTok profile/video
//   preview-gymnyagema-ig.jpg       → screenshot of @gymnyagema Instagram profile/post
//   preview-andravads-ig.jpg        → screenshot of @andravads Instagram profile/post
//   preview-youtube.jpg             → screenshot of your YouTube channel
const SOCIAL_PREVIEWS = {
  "TikTok-@gymnyagema":  "/preview-gymnyagema-tiktok.jpg",
  "TikTok-@andravads":   "/preview-andravads-tiktok.jpg",
  "Instagram-@gymnyagema": "/preview-gymnyagema-ig.jpg",
  "Instagram-@andravads":  "/preview-andravads-ig.jpg",
  "YouTube-Andrava":     "/preview-youtube.jpg",
};

function SocialCard({ platform, handle, focus, url, note }) {
  const colors = { TikTok: T.muted, Instagram: "#c8906a", YouTube: "#d07070" };
  const color = colors[platform] || T.muted;
  const previewKey = `${platform}-${handle}`;
  const previewImg = SOCIAL_PREVIEWS[previewKey];

  return (
    <div className="card" style={{ padding: "0", overflow: "hidden" }}>
      {/* Preview image with gradient blend */}
      <div style={{ position: "relative", height: "180px", overflow: "hidden", background: T.surface2 }}>
        {previewImg && (
          <img
            src={previewImg}
            alt={handle}
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.75, filter: "saturate(0.6) brightness(0.7)" }}
            onError={(e) => { e.target.style.display = "none"; }}
          />
        )}
        {/* Gradient overlay — blends into card background */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to bottom, rgba(14,14,14,0.1) 0%, rgba(14,14,14,0.5) 50%, ${T.surface} 100%)`,
        }} />
        {/* Platform + handle overlay on image */}
        <div style={{ position: "absolute", bottom: "1rem", left: "1.25rem" }}>
          <div style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color, marginBottom: "0.2rem" }}>{platform}</div>
          <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.15rem", color: T.text }}>{handle}</div>
        </div>
        <div style={{ position: "absolute", top: "1rem", right: "1rem", width: "7px", height: "7px", borderRadius: "50%", background: color }} />
      </div>

      {/* Card body */}
      <div style={{ padding: "1.25rem 1.5rem" }}>
        <p style={{ fontSize: "0.78rem", color: T.muted, marginBottom: "1.25rem", lineHeight: 1.7 }}>{focus}</p>
        <a
          href={url !== "YOUR_YOUTUBE_URL_HERE" ? url : "#"}
          target="_blank"
          rel="noreferrer"
          className="btn"
          style={{ width: "100%", justifyContent: "center", fontSize: "0.72rem" }}
        >
          Visit {handle} ↗
        </a>
        {note && <p style={{ fontSize: "0.6rem", color: T.faint, marginTop: "0.5rem" }}>{note}</p>}
      </div>
    </div>
  );
}

function SocialHub() {
  const ref = useRef();
  useFadeUp(ref);
  const s = SITE_CONFIG.socials;
  return (
    <section ref={ref} style={{ background: T.surface }}>
      <div className="container">
        <div className="section-label fade-up">Social Presence</div>
        <div className="section-heading fade-up" style={{ marginBottom: "0.75rem" }}>Creator Command Centre</div>
        <p className="fade-up" style={{ color: T.muted, marginBottom: "3rem", maxWidth: "500px" }}>Two personas. One discipline. Content across TikTok, Instagram, and YouTube.</p>

        <div className="social-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1px", background: T.border }}>
          {[
            { platform: "TikTok", ...s.tiktokGym, note: "" },
            { platform: "TikTok", ...s.tiktokWork, note: "" },
            { platform: "Instagram", ...s.igGym, note: "" },
            { platform: "Instagram", ...s.igWork, note: "" },
            { platform: "YouTube", ...s.youtube, note: "" },
          ].map((s) => (
            <div key={s.handle + s.platform} className="fade-up" style={{ background: T.bg }}>
              <SocialCard {...s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FEATURED CONTENT
// ============================================================
function FeaturedContent() {
  const ref = useRef();
  useFadeUp(ref);
  const [active, setActive] = useState("All");
  const filters = ["All", "Gym", "Works", "Travel"];
  const filtered = active === "All" ? FEATURED_CONTENT : FEATURED_CONTENT.filter((p) => p.pillar === active);

  return (
    <section id="content" ref={ref}>
      <div className="container">
        <div className="section-label fade-up">Selected Posts</div>
        <div className="filter-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div className="section-heading fade-up">Featured Content</div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {filters.map((f) => (
              <button key={f} onClick={() => setActive(f)} className="btn" style={{ padding: "0.4rem 1rem", fontSize: "0.7rem", background: active === f ? T.accentDim : "transparent", borderColor: active === f ? T.accent : T.border, color: active === f ? T.accent : T.muted }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1px", background: T.border }}>
          {filtered.map((post) => (
            <div key={post.id} className="card fade-up" style={{ background: T.surface }}>
              <div style={{ position: "relative" }}>
                {/* REPLACE WITH 600x800 VIDEO THUMBNAIL FROM YOUR ACTUAL TIKTOK/REELS POST */}
                <img src={post.thumbnail} alt={post.title} style={{ width: "100%", height: "260px", objectFit: "cover" }} />
                <div style={{ position: "absolute", top: "0.75rem", left: "0.75rem", display: "flex", gap: "0.4rem" }}>
                  <span className={`badge badge-${post.platform.toLowerCase()}`}>{post.platform}</span>
                  <span className={`badge badge-${post.pillar.toLowerCase()}`}>{post.pillar}</span>
                </div>
              </div>
              <div style={{ padding: "1.25rem" }}>
                <div style={{ fontSize: "0.72rem", color: T.faint, marginBottom: "0.5rem" }}>{post.account}</div>
                <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.1rem", marginBottom: "0.75rem", color: T.text, lineHeight: 1.4 }}>{post.title}</div>
                <p style={{ fontSize: "0.8rem", color: T.muted, lineHeight: 1.7, marginBottom: "1rem", fontStyle: "italic" }}>"{post.hook}"</p>
                <a href={post.url !== "PASTE_REAL_POST_URL_HERE" ? post.url : "#"} target="_blank" rel="noreferrer" className="btn" style={{ width: "100%", justifyContent: "center", fontSize: "0.7rem" }}>Watch Post ↗</a>
                <p style={{ fontSize: "0.6rem", color: T.faint, marginTop: "0.5rem" }}>{post.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ANALYTICS SNAPSHOT
// ============================================================
function AnalyticsSnapshot() {
  const ref = useRef();
  useFadeUp(ref);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimated(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const stats = [
    { label: "TikTok Followers", val: ANALYTICS.totals.tiktokFollowers.toLocaleString(), note: "sample" },
    { label: "Instagram Followers", val: ANALYTICS.totals.igFollowers.toLocaleString(), note: "sample" },
    { label: "YouTube Subscribers", val: ANALYTICS.totals.youtubeSubscribers.toLocaleString(), note: "sample" },
    { label: "Monthly Views", val: (ANALYTICS.totals.monthlyViews / 1000).toFixed(0) + "K", note: "sample" },
    { label: "Avg. Engagement", val: ANALYTICS.totals.avgEngagement + "%", note: "sample" },
    { label: "Total Posts", val: ANALYTICS.totals.totalPosts.toString(), note: "sample" },
  ];

  const maxView = Math.max(...ANALYTICS.pillarPerformance.map((p) => p.avgViews));

  return (
    <section ref={ref} style={{ background: T.surface }}>
      <div className="container">
        <div className="section-label fade-up">Media Kit</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "0.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div className="section-heading fade-up">Creator Snapshot</div>
          <div style={{ fontSize: "0.7rem", color: T.faint }}>⚠ Sample data — replace with real analytics</div>
        </div>
        <p className="fade-up" style={{ color: T.muted, fontSize: "0.85rem", marginBottom: "3rem" }}>{ANALYTICS.note}</p>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1px", background: T.border, marginBottom: "1px" }}>
          {stats.map(({ label, val, note }) => (
            <div key={label} className="fade-up" style={{ background: T.bg, padding: "1.75rem 1.5rem" }}>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: T.faint, marginBottom: "0.75rem" }}>{label}</div>
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2.25rem", fontWeight: 300, color: T.text }}>{val}</div>
              <div style={{ fontSize: "0.6rem", color: T.accent, marginTop: "0.25rem" }}>{note}</div>
            </div>
          ))}
        </div>

        {/* Growth chart (bar viz) */}
        <div className="fade-up" style={{ background: T.bg, border: `1px solid ${T.border}`, padding: "2rem 2.5rem", marginBottom: "1px" }}>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: T.faint, marginBottom: "1.5rem" }}>Monthly Follower Growth · All Platforms</div>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-end" }}>
            {ANALYTICS.monthlyGrowth.map(({ month, tiktok, ig, yt }) => {
              const maxG = Math.max(...ANALYTICS.monthlyGrowth.map((r) => r.tiktok));
              return (
                <div key={month} style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "3px", marginBottom: "0.5rem" }}>
                    {[
                      { val: tiktok, color: T.muted, max: maxG },
                      { val: ig, color: "#c8906a", max: maxG },
                      { val: yt, color: "#d07070", max: maxG },
                    ].map(({ val, color, max }, i) => (
                      <div key={i} style={{ height: "6px", background: T.surface2, borderRadius: "1px", overflow: "hidden" }}>
                        <div style={{ width: animated ? `${(val / max) * 100}%` : "0%", height: "100%", background: color, borderRadius: "1px", transition: "width 1.2s cubic-bezier(0.25,0.8,0.25,1)" }} />
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: "0.6rem", color: T.faint }}>{month}</div>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: "1.5rem", marginTop: "1rem" }}>
            {[{ label: "TikTok", color: T.muted }, { label: "Instagram", color: "#c8906a" }, { label: "YouTube", color: "#d07070" }].map(({ label, color }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.65rem", color: T.faint }}>
                <div style={{ width: "8px", height: "2px", background: color }} />{label}
              </div>
            ))}
          </div>
        </div>

        {/* Pillar performance */}
        <div className="fade-up" style={{ background: T.bg, border: `1px solid ${T.border}`, padding: "2rem 2.5rem" }}>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: T.faint, marginBottom: "1.5rem" }}>Content Pillar Performance</div>
          {ANALYTICS.pillarPerformance.map(({ pillar, avgViews, posts }) => (
            <div key={pillar} style={{ marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                <span style={{ fontSize: "0.8rem", color: T.text }}>{pillar}</span>
                <span style={{ fontSize: "0.75rem", color: T.muted }}>{(avgViews / 1000).toFixed(0)}K avg views · {posts} posts</span>
              </div>
              <div className="chart-bar">
                <div className="chart-bar-fill" style={{ width: animated ? `${(avgViews / maxView) * 100}%` : "0%", background: pillar === "Gym" ? T.gym : pillar === "Works" ? T.work : T.faint }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// LINKS / SHOP — Swipeable horizontal scroll per category
// ============================================================
function SwipeRow({ items }) {
  const rowRef = useRef();
  const scroll = (dir) => {
    if (rowRef.current) rowRef.current.scrollBy({ left: dir * 220, behavior: "smooth" });
  };
  return (
    <div style={{ position: "relative" }}>
      {/* Scroll buttons — desktop only */}
      <button onClick={() => scroll(-1)} style={{ position: "absolute", left: "-1.5rem", top: "50%", transform: "translateY(-50%)", zIndex: 2, background: T.surface2, border: `1px solid ${T.border}`, color: T.muted, width: "2rem", height: "2rem", borderRadius: "50%", cursor: "pointer", fontSize: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
      <button onClick={() => scroll(1)} style={{ position: "absolute", right: "-1.5rem", top: "50%", transform: "translateY(-50%)", zIndex: 2, background: T.surface2, border: `1px solid ${T.border}`, color: T.muted, width: "2rem", height: "2rem", borderRadius: "50%", cursor: "pointer", fontSize: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>

      {/* Scrollable row */}
      <div
        ref={rowRef}
        style={{
          display: "flex",
          gap: "1px",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          background: T.border,
        }}
      >
        <style>{`.swipe-row::-webkit-scrollbar { display: none; }`}</style>
        {items.filter((i) => i.active).map((item) => (
          <div
            key={item.title}
            style={{
              flex: "0 0 200px",
              scrollSnapAlign: "start",
              background: T.surface,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Product image with gradient blend */}
            <div style={{ position: "relative", height: "180px", overflow: "hidden", background: T.surface2 }}>
              <img
                src={item.img}
                alt={item.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.75) saturate(0.7)" }}
                onError={(e) => { e.target.style.opacity = "0"; }}
              />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 40%, ${T.surface} 100%)` }} />
            </div>
            <div style={{ padding: "1rem 1.25rem", flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1rem", marginBottom: "0.35rem", color: T.text }}>{item.title}</div>
              <p style={{ fontSize: "0.75rem", color: T.muted, marginBottom: "1rem", lineHeight: 1.65, flex: 1 }}>{item.desc}</p>
              <a
                href={item.url !== "PASTE_AFFILIATE_LINK_HERE" ? item.url : "#"}
                target="_blank"
                rel="noreferrer"
                className="btn"
                style={{ width: "100%", justifyContent: "center", fontSize: "0.68rem", padding: "0.5rem 0.75rem" }}
              >
                Lihat di Tokopedia ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LinksShop() {
  const ref = useRef();
  useFadeUp(ref);
  return (
    <section id="links" ref={ref}>
      <div className="container">
        <div className="section-label fade-up">Resources</div>
        <div className="section-heading fade-up" style={{ marginBottom: "0.75rem" }}>Gear & Recommendations</div>
        <p className="fade-up" style={{ color: T.muted, fontSize: "0.85rem", marginBottom: "0.5rem" }}>
          Products and setups that actually fit my work, gym, and lifestyle.
        </p>
        <p className="fade-up" style={{ fontSize: "0.7rem", color: T.faint, marginBottom: "3.5rem" }}>
          Some links may be affiliate links. I only share products that fit my content.
        </p>

        {LINKS_DATA.map(({ category, items }) => (
          <div key={category} className="fade-up" style={{ marginBottom: "3rem" }}>
            <div style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: T.accent, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ display: "block", width: "1.5rem", height: "1px", background: T.accent }} />
              {category}
            </div>
            <SwipeRow items={items} />
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// PARTNERSHIP / COLLAB
// ============================================================
function Partnership() {
  const ref = useRef();
  useFadeUp(ref);
  return (
    <section id="collab" ref={ref} style={{ background: T.surface }}>
      <div className="container">
        <div className="partner-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
          {/* Left */}
          <div>
            <div className="section-label fade-up">Collaborations</div>
            <div className="section-heading fade-up" style={{ marginBottom: "1.5rem" }}>Work With Me</div>
            <p className="fade-up" style={{ color: T.muted, fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "2rem" }}>
              I create practical, aesthetic content for people who are trying to stay sharp at work and consistent in the gym. My audience is busy, career-focused, and genuinely trying to build a better version of themselves.
            </p>

            <div className="fade-up" style={{ marginBottom: "2rem" }}>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: T.faint, marginBottom: "1rem" }}>Audience Profile</div>
              {[
                "Busy professionals balancing career and fitness",
                "Gym beginners and intermediates looking for practical guidance",
                "People who work 8-to-5 but still want to train consistently",
                "Productivity-minded individuals interested in work-life quality",
                "Indonesian audience with international lifestyle relevance",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.65rem" }}>
                  <span style={{ color: T.accent, marginTop: "0.1rem", flexShrink: 0 }}>—</span>
                  <span style={{ fontSize: "0.85rem", color: T.muted }}>{item}</span>
                </div>
              ))}
            </div>

            <div className="fade-up" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href={`mailto:${SITE_CONFIG.email}`} className="btn btn-accent">Email for Partnership</a>
              <a href="#" className="btn" style={{ opacity: 0.6 }}>Download Media Kit (Soon)</a>
            </div>
            <div style={{ marginTop: "1rem", fontSize: "0.75rem", color: T.faint }}>{SITE_CONFIG.email}</div>
          </div>

          {/* Right — categories */}
          <div className="fade-up">
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: T.faint, marginBottom: "1.5rem" }}>Collaboration Categories</div>
            <div className="partner-cats" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: T.border }}>
              {[
                ["Fitness Brands", "Equipment, apparel, supplements"],
                ["Work & Office", "Productivity tools, work setup"],
                ["Creator Tools", "Camera, lighting, tech gear"],
                ["Lifestyle", "Travel, food, daily life products"],
                ["Apparel", "Gym wear, casual, workwear"],
                ["Health & Nutrition", "Supplements, meal planning"],
              ].map(([title, desc]) => (
                <div key={title} style={{ background: T.bg, padding: "1.25rem 1.5rem", border: "none" }}>
                  <div style={{ fontSize: "0.82rem", color: T.text, marginBottom: "0.3rem" }}>{title}</div>
                  <div style={{ fontSize: "0.72rem", color: T.faint }}>{desc}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "1px", background: T.bg, border: `1px solid ${T.border}`, padding: "1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
              {[["Short-form Video", "TikTok & Reels"], ["Stories & Posts", "Instagram"], ["Long-form", "YouTube"]].map(([format, platform]) => (
                <div key={format} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "0.8rem", color: T.text, marginBottom: "0.25rem" }}>{format}</div>
                  <div style={{ fontSize: "0.65rem", color: T.faint }}>{platform}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ABOUT
// ============================================================
function About() {
  const ref = useRef();
  useFadeUp(ref);
  return (
    <section ref={ref}>
      <div className="container" style={{ maxWidth: "780px" }}>
        <div className="section-label fade-up">About</div>
        <div className="section-heading fade-up" style={{ marginBottom: "2rem" }}>
          Not a perfect-life creator.<br />
          <em style={{ color: T.muted }}>An honest one.</em>
        </div>
        <div className="fade-up" style={{ fontSize: "1rem", color: T.muted, lineHeight: 1.9, marginBottom: "1.5rem" }}>
          I'm a content creator balancing a demanding 8-to-5 corporate job with a seriously dedicated gym lifestyle. My content is built on real routines, real work reality, and real gym consistency — not curated highlight reels.
        </div>
        <div className="fade-up" style={{ fontSize: "1rem", color: T.muted, lineHeight: 1.9, marginBottom: "2.5rem" }}>
          I share what actually helps me stay sharp at work and consistent in the gym. No fake motivation. No performance. Just practical documentation of what it looks like to do both at the same time.
        </div>
        <div className="fade-up" style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {[["@gymnyagema", "Gym Content"], ["@andravads", "Work Content"]].map(([h, focus]) => (
            <div key={h}>
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.1rem", color: T.text }}>{h}</div>
              <div style={{ fontSize: "0.72rem", color: T.faint, marginTop: "0.2rem" }}>{focus}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  return (
    <footer style={{ background: T.surface, borderTop: `1px solid ${T.border}`, padding: "3rem 0" }}>
      <div className="container footer-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "3rem", alignItems: "start" }}>
        {/* Brand */}
        <div>
          <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.5rem", marginBottom: "0.5rem" }}>{SITE_CONFIG.name}</div>
          <div style={{ fontSize: "0.78rem", color: T.muted, marginBottom: "1.25rem" }}>{SITE_CONFIG.tagline}</div>
          <a href={`mailto:${SITE_CONFIG.email}`} style={{ fontSize: "0.75rem", color: T.faint, borderBottom: `1px solid ${T.faint}`, paddingBottom: "1px" }}>{SITE_CONFIG.email}</a>
        </div>

        {/* Links */}
        <div>
          <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: T.faint, marginBottom: "1rem" }}>Navigate</div>
          {[["Works", "#works"], ["Gym", "#gym"], ["Content", "#content"], ["Gear & Links", "#links"], ["Collaborations", "#collab"]].map(([l, h]) => (
            <div key={l} style={{ marginBottom: "0.5rem" }}>
              <a href={h} style={{ fontSize: "0.82rem", color: T.muted, transition: "color 0.2s" }}>{l}</a>
            </div>
          ))}
        </div>

        {/* Socials */}
        <div>
          <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: T.faint, marginBottom: "1rem" }}>Follow</div>
          {[
            { label: "TikTok — Gym", val: "@gymnyagema", url: SITE_CONFIG.socials.tiktokGym.url },
            { label: "TikTok — Work", val: "@andravads", url: SITE_CONFIG.socials.tiktokWork.url },
            { label: "Instagram — Gym", val: "@gymnyagema", url: SITE_CONFIG.socials.igGym.url },
            { label: "Instagram — Work", val: "@andravads", url: SITE_CONFIG.socials.igWork.url },
            { label: "YouTube", val: "Andrava Notes", url: SITE_CONFIG.socials.youtube.url },
          ].map(({ label, val, url }) => (
            <div key={label + val} style={{ marginBottom: "0.5rem", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.72rem", color: T.faint }}>{label}</span>
              <a href={url !== "YOUR_YOUTUBE_URL_HERE" ? url : "#"} target="_blank" rel="noreferrer" style={{ fontSize: "0.72rem", color: T.muted }}>{val}</a>
            </div>
          ))}
        </div>
      </div>

      <div className="container footer-bottom" style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <span style={{ fontSize: "0.7rem", color: T.faint }}>© 2025 Andrava. All rights reserved.</span>
        <span style={{ fontSize: "0.7rem", color: T.faint }}>Work sharp. Lift heavy. Live deliberately.</span>
      </div>
    </footer>
  );
}

// ============================================================
// ASSET CHECKLIST (Developer note — not rendered on page)
// ============================================================
/*
=== FINAL ASSET CHECKLIST ===

IMAGES NEEDED:
1. Hero Portrait — 1200x1600px — Japanese City Boy outfit, clean city background or gym portrait
2. Work Lifestyle — 1600x900px — laptop, office, airport, or corporate travel scene
3. Gym Training — 900x1200px — lifting, mirror shot, or gym editorial portrait
4. Travel Wide — 1600x900px — city, mountain, airport, or lifestyle travel image
5. Featured Post Thumbnails (×4+) — 600x800px each — actual TikTok/Reels thumbnails
6. Product Images (×5+) — 800x800px each — gym gear, work gear, creator gear

LINKS NEEDED:
- https://www.tiktok.com/@gymnyagema
- https://www.tiktok.com/@andravads
- https://www.instagram.com/gymnyagema
- https://www.instagram.com/andravads
- YouTube channel URL
- Email: andravaads@gmail.com
- All affiliate/product links

ANALYTICS NEEDED (replace in ANALYTICS object):
- Real follower counts per platform
- Monthly views estimate
- Avg engagement rate
- Monthly growth data (6 months)
- Per-pillar avg views and post count

EMBED CODES NEEDED:
- TikTok embed for @gymnyagema
- TikTok embed for @andravads
- Instagram embed for @gymnyagema
- Instagram embed for @andravads
- YouTube channel/latest video embed

=== END CHECKLIST ===
*/

// ============================================================
// APP
// ============================================================
export default function App() {
  return (
    <>
      <GlobalStyles />
      <Nav />
      <main>
        <Hero />
        <Identity />
        <Pillars />
        <SocialHub />
        <FeaturedContent />
        <AnalyticsSnapshot />
        <LinksShop />
        <Partnership />
        <About />
      </main>
      <Footer />
    </>
  );
}
