# ChainSignal — Product Documentation

> **Version:** 1.0.0  
> **Last Updated:** March 2026  
> **Status:** Production-Ready Landing Page

---

## 1. Product Introduction

**ChainSignal** is a SaaS crypto portfolio tracker that gives traders real-time visibility into their holdings, PnL, gas fees, and market signals across every chain and wallet — all from one command-center interface.

### Problem It Solves

Crypto traders juggle dozens of tabs, trackers, and chain explorers to monitor fragmented portfolios. Existing tools lag behind real-time market conditions, provide incomplete multi-chain coverage, and fail to deliver actionable signals before major moves happen.

**ChainSignal eliminates this friction** by aggregating all on-chain data into a single live feed with smart alerts for whale movements, liquidation risks, and price thresholds — delivered with zero latency.

---

## 2. Target Users

| User Segment | Description |
|---|---|
| **DeFi Traders** | Active traders managing positions across multiple chains (Ethereum, Solana, Arbitrum, Base) |
| **Quantitative Analysts** | Professionals who need real-time PnL and gas fee breakdowns for strategy optimization |
| **Portfolio Managers** | Fund operators tracking holdings across dozens of wallets simultaneously |
| **Developers** | Engineers who need API access for automated trading systems |
| **Private Investors** | Individuals seeking predictive alerts without enterprise overhead |

---

## 3. Key Features

### 3.1 Omnichain Sync
Track every wallet across every chain simultaneously — Ethereum, Solana, Base, Arbitrum — in one unified live feed.

### 3.2 Live Telemetry
Real-time PnL tracking, gas fee breakdowns, and entry/exit execution signals powered by on-chain data.

### 3.3 Smart Alerts
Automated detection of whale movements, liquidation risks, and price thresholds before they impact the broader market.

### 3.4 Connect Modal (Onboarding)
Premium SaaS-style onboarding flow with:
- Email + wallet address collection
- Use case selection (Portfolio Tracking, Real-time Signals, Trading Analytics, Developer/API Access)
- Wallet connector support (MetaMask, WalletConnect, Coinbase Wallet)
- Success confirmation state

### 3.5 Competitor Comparison
Side-by-side data grid comparing ChainSignal against legacy trackers across latency, chain support, gas tracking, alerts, and setup time.

### 3.6 Live Metrics Dashboard
Animated counters displaying real-time platform statistics:
- **$14B+** volume tracked
- **12M+** wallets monitored
- **0ms** average latency
- **3.2M** alerts fired

### 3.7 Testimonials
Horizontally sliding testimonial cards from verified crypto professionals with GSAP-powered transitions.

---

## 4. User Flow

```
Landing Page Load
    │
    ├─ 1. Brand loading animation ("CHAINSIGNAL" staggered reveal)
    │      └─ Overlay slides up to reveal hero section
    │
    ├─ 2. Hero Section
    │      ├─ Three.js particle background (interactive, follows cursor)
    │      ├─ "CHAINSIGNAL — Visibility into the void."
    │      ├─ CTA: "CONNECT & GO LIVE • 60S →" → Opens Connect Modal
    │      └─ Nav: TERMINAL | EDGE | PROTOCOL | CONNECT
    │
    ├─ 3. Social Proof Ticker
    │      └─ Endless marquee of supported chains/exchanges
    │
    ├─ 4. Features Section (#features)
    │      ├─ Diagnostic Shuffler (animated card flip)
    │      ├─ Telemetry Typewriter (scramble text effect)
    │      └─ Signal Graph (SVG line with GSAP animation)
    │
    ├─ 5. Comparison Table (#compare)
    │      └─ ChainSignal vs Other Trackers (5 rows, staggered reveal)
    │
    ├─ 6. Stats Section (#stats)
    │      └─ 4 animated metric counters
    │
    ├─ 7. Testimonials
    │      └─ 3 testimonial cards with prev/next navigation
    │
    ├─ 8. Final CTA
    │      └─ "EXECUTE." + "INITIATE CONNECTION" button → Opens Connect Modal
    │
    └─ 9. Footer
           ├─ Platform links, Resources links
           ├─ Terminal output simulation
           ├─ System status indicator
           └─ Legal links (Terms, Privacy, Twitter, Discord)
```

---

## 5. Technology Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| **React** | 19.2.0 | UI component framework |
| **Vite** | 7.3.1 | Build tool and dev server |
| **Tailwind CSS** | 3.4.19 | Utility-first CSS framework |
| **GSAP** | 3.14.2 | Scroll-triggered animations, counters, transitions |
| **Three.js** | 0.183.1 | 3D particle background in Hero section |
| **Lenis** | 1.0.42 | Smooth scroll behavior |
| **Lucide React** | 0.575.0 | Icon library |

### Tooling

| Tool | Purpose |
|---|---|
| **PostCSS** | CSS processing pipeline |
| **Autoprefixer** | CSS vendor prefix automation |
| **ESLint** | Code quality and linting |

### Fonts (Google Fonts)

| Font | Usage |
|---|---|
| **Outfit** | Display headings and body text (`font-display`) |
| **Fira Code** | Monospace elements — labels, terminal, nav (`font-mono`) |
| **Instrument Serif** | Dramatic italic accents (`font-drama`) |
| **Inter** | Sans-serif body text (`font-sans`) |

---

## 6. System Workflow

ChainSignal's landing page is a **static single-page application (SPA)** with no backend API calls. All interactions are client-side:

```
┌─────────────────────────────────────────┐
│              Browser (Client)           │
│                                         │
│  React 19 ──► Vite Dev Server / CDN     │
│  GSAP ──► Scroll-triggered animations   │
│  Three.js ──► WebGL particle rendering  │
│  Lenis ──► Smooth scroll behavior       │
│  Tailwind ──► Compiled CSS utilities    │
│                                         │
│  ConnectModal ──► Form state (local)    │
│    └─ No API submission (placeholder)   │
└─────────────────────────────────────────┘
```

> **Note:** The Connect Modal currently stores form data in local React state only. To enable real submission, integrate with a backend API, Supabase, or email service (e.g., Resend, SendGrid).

---

## 7. Interface Overview

### Navigation Bar
- **Position:** Fixed, centered, top of viewport
- **Items:** CHAINSIGNAL (logo) | TERMINAL → `#features` | EDGE → `#compare` | PROTOCOL → `#stats` | CONNECT (button)
- **Behavior:** Transparent on hero, gains blur + dark background on scroll via GSAP ScrollTrigger

### Custom Cursor
- Dual-element cursor (dot + ring) that follows mouse movement
- Hidden on mobile (`hidden sm:block`)
- Uses `mix-blend-difference` for contrast

### Connect Modal
- Triggered by 3 buttons: Nav CONNECT, Hero CTA, Footer CTA
- Dark glass overlay with blur backdrop
- 3 form fields + wallet connector buttons
- Closes via ESC, backdrop click, or close icon

### Feature Cards
- 3-column grid with interactive sub-components:
  - **Diagnostic Shuffler:** Cycling chain names with 3D flip animation
  - **Telemetry Typewriter:** Randomized character scramble effect
  - **Signal Graph:** Animated SVG polyline with hover-triggered pulse

### Footer
- 12-column grid: Brand info (5 cols) | Platform links (2) | Resources (2) | Terminal output (3)
- System operational status indicator with animated pulse
- Bottom bar with copyright and legal links

---

## 8. Performance & Optimization

| Optimization | Implementation |
|---|---|
| **Device pixel ratio capping** | `Math.min(window.devicePixelRatio, 2)` on Three.js renderer |
| **Reduced motion support** | `prefers-reduced-motion` media query disables particle animations |
| **GSAP ScrollTrigger** | Animations only fire when elements enter viewport |
| **Lenis smooth scroll** | Hardware-accelerated scroll with `will-change: transform` |
| **Font preloading** | Google Fonts loaded with `display=swap` for FOIT prevention |
| **Noise overlay** | Single SVG filter with `pointer-events: none` to avoid layout thrashing |
| **Antialiased rendering** | `-webkit-font-smoothing: antialiased` globally applied |
| **Cleanup on unmount** | All Three.js geometries, materials, and renderers disposed in useEffect cleanup |

---

## 9. Deployment Support

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
cd chainpulse
vercel
```

Vite projects are auto-detected by Vercel. No additional configuration required.

### Manual Build

```bash
# Install dependencies
npm install

# Development server
npm run dev          # → http://localhost:5173

# Production build
npm run build        # → outputs to /dist

# Preview production build
npm run preview      # → http://localhost:4173
```

### Environment Requirements

- **Node.js:** 18+ recommended
- **npm:** 9+ recommended
- **No environment variables required** (static site)

---

## 10. Maintenance Guide

### Adding New Sections

1. Create a new component in `src/components/`
2. Import and render it in `src/App.jsx` inside the `<main>` element
3. Add an `id` attribute to the section's root element for anchor linking

### Modifying Design Tokens

All colors are defined as CSS custom properties in `src/index.css`:

```css
:root {
  --color-primary: #C8F400;    /* Acid yellow */
  --color-secondary: #00FF87;  /* Electric green */
  --color-background: #080A06; /* Deep void */
  --color-card: #0D110C;       /* Card surfaces */
  --color-text: #EEFCE8;       /* Light text */
}
```

These are mapped to Tailwind utilities in `tailwind.config.js`.

### Updating Content

| Content | File |
|---|---|
| Hero headline / CTA | `src/components/Hero.jsx` |
| Feature cards | `src/components/Features.jsx` |
| Comparison data | `src/components/Comparison.jsx` (line 8–14) |
| Stats metrics | `src/components/Stats.jsx` (line 7–12) |
| Testimonials | `src/components/Testimonials.jsx` (line 5–24) |
| Footer links | `src/components/Footer.jsx` |
| Page title | `index.html` (line 7) |
| Connect modal text | `src/components/ConnectModal.jsx` |

### Code Quality

```bash
# Run ESLint
npm run lint
```

### Key File Structure

```
chainpulse/
├── index.html                  # Entry HTML
├── tailwind.config.js          # Tailwind theme
├── postcss.config.js           # PostCSS plugins
├── vite.config.js              # Vite config
├── src/
│   ├── main.jsx                # React root mount
│   ├── App.jsx                 # Layout + global systems
│   ├── index.css               # Design tokens + base styles
│   └── components/
│       ├── Hero.jsx            # Hero + navbar + Three.js
│       ├── SocialProofTicker.jsx
│       ├── Features.jsx        # 3 interactive cards
│       ├── Comparison.jsx      # vs competitors table
│       ├── Stats.jsx           # Animated counters
│       ├── Testimonials.jsx    # Slider with arrows
│       ├── ConnectModal.jsx    # Onboarding modal
│       └── Footer.jsx          # CTA + footer grid
└── dist/                       # Production build output
```
