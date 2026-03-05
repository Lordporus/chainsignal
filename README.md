# ChainSignal

## Overview

ChainSignal is a SaaS crypto portfolio tracker landing page built as a freelance-ready portfolio project. It demonstrates a modern, animated single-page application with a dark neon aesthetic designed for the crypto/fintech space.

The project showcases interactive UI components, scroll-driven animations, 3D particle effects, and a complete SaaS onboarding flow.

---

## Live Demo

Vercel Deployment Link:

```
https://chainsignal.vercel.app/
```

---

## Features

- Modern dark-themed responsive UI with neon accents
- Interactive 3D particle background using Three.js
- Smooth scroll animations powered by GSAP and Lenis
- Custom cursor with hover interactions
- SaaS onboarding modal with form and wallet connect options
- Competitor comparison data table
- Animated live metric counters
- Testimonial slider with transition effects
- Social proof ticker marquee
- Mobile responsive across all breakpoints

---

## Tech Stack

Frontend

- React 19
- Vite 7
- Tailwind CSS 3
- GSAP (GreenSock Animation Platform)
- Three.js
- Lenis (Smooth Scroll)
- Lucide React (Icons)

Fonts

- Outfit
- Fira Code
- Instrument Serif
- Inter

Hosting

- Vercel

---

## Project Structure

```
chainpulse/
|
|-- index.html
|-- tailwind.config.js
|-- postcss.config.js
|-- vite.config.js
|-- package.json
|-- DOCUMENTATION.md
|-- README.md
|
|-- src/
|   |-- main.jsx
|   |-- App.jsx
|   |-- index.css
|   |
|   |-- components/
|       |-- Hero.jsx
|       |-- SocialProofTicker.jsx
|       |-- Features.jsx
|       |-- Comparison.jsx
|       |-- Stats.jsx
|       |-- Testimonials.jsx
|       |-- ConnectModal.jsx
|       |-- Footer.jsx
|
|-- public/
|   |-- vite.svg
|
|-- dist/                (production build output)
```

---

## Installation (Local Development)

Clone the repository

```
git clone <repository-url>
```

Open the project folder

```
cd chainpulse
```

Install dependencies

```
npm install
```

Start development server

```
npm run dev
```

Open in browser

```
http://localhost:5173
```

---

## Build for Production

```
npm run build
```

Preview the production build

```
npm run preview
```

---

## Deployment

This project can be deployed on:

- Vercel (recommended)
- Netlify
- Any static hosting provider

For Vercel, simply connect the repository and deploy. Vite projects are auto-detected with no additional configuration required.

---

## Author

Porus
Freelance Developer

---

## License

This project is created for portfolio and demonstration purposes.
