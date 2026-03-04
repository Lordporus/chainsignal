import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import Hero from './components/Hero';
import SocialProofTicker from './components/SocialProofTicker';
import Features from './components/Features';
import Comparison from './components/Comparison';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);

  useEffect(() => {
    // Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Custom Cursor logic
    const onMouseMove = (e) => {
      if (cursorDotRef.current) gsap.set(cursorDotRef.current, { x: e.clientX, y: e.clientY });

      if (cursorRingRef.current) {
        gsap.to(cursorRingRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.15,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    // Page Load Sequence
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from('.brand-letter', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power3.out'
      })
        .to({}, { duration: 0.3 })
        .to('.load-overlay', {
          yPercent: -100,
          duration: 0.8,
          ease: 'power3.inOut'
        }, "+=0.1");

    }, containerRef);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-background">

      {/* Load Overlay */}
      <div className="load-overlay fixed inset-0 z-[100] bg-background flex items-center justify-center">
        <div className="font-display font-bold text-4xl sm:text-6xl text-primary tracking-tighter flex overflow-hidden">
          {'CHAINSIGNAL'.split('').map((char, index) => (
            <span key={index} className="brand-letter inline-block">
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* Custom Cursor */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden sm:block"
      />
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] border border-primary/30 -translate-x-1/2 -translate-y-1/2 transition-colors duration-200 hidden sm:block"
      />

      <main>
        <Hero />
        <SocialProofTicker />
        <Features />
        <Comparison />
        <Stats />
        <Testimonials />
        <Footer />
      </main>
    </div>
  );
}

export default App;
