import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const testimonialsData = [
    {
        quote: "ChainSignal caught a massive liquidity drain on exactly the pair I held on SushiSwap. The PnL alert fired 12 seconds before the crash. Literally saved my portfolio.",
        author: "0xKael",
        role: "DeFi Analyst",
        company: "Alpha Collective"
    },
    {
        quote: "Standard trackers lag. When you are managing positions across Arbitrum, Base, and Solana simultaneously, you need one command center. This is it.",
        author: "Elena R.",
        role: "Quant Trader",
        company: "Prop Desk"
    },
    {
        quote: "The interface feels like a terminal built for war. Fast, aggressive, zero fluff. The smart alerts alone justify dropping everything else.",
        author: "Maka",
        role: "Private Investor",
        company: ""
    }
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const textRef = useRef(null);

    const prev = () => {
        transitionTo((currentIndex - 1 + testimonialsData.length) % testimonialsData.length);
    };

    const next = () => {
        transitionTo((currentIndex + 1) % testimonialsData.length);
    };

    const transitionTo = (newIndex) => {
        const isNext = newIndex > currentIndex || (currentIndex === testimonialsData.length - 1 && newIndex === 0);
        const xOut = isNext ? -60 : 60;
        const xIn = isNext ? 60 : -60;

        gsap.to(textRef.current, {
            x: xOut,
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
            onComplete: () => {
                setCurrentIndex(newIndex);
                gsap.fromTo(textRef.current,
                    { x: xIn, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
                );
            }
        });
    };

    const current = testimonialsData[currentIndex];

    return (
        <section className="py-32 px-6 sm:px-12 bg-background relative overflow-hidden">

            {/* Background visual element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">

                <div className="font-display text-8xl md:text-[10rem] text-primary/20 leading-none h-[80px] md:h-[120px] font-black italic">
                    "
                </div>

                <div className="min-h-[250px] flex flex-col items-center justify-center w-full" ref={textRef}>
                    <p className="font-sans text-xl md:text-3xl text-text font-medium leading-relaxed max-w-3xl mb-12">
                        {current.quote}
                    </p>

                    <div>
                        <div className="font-sans font-bold text-lg text-primary">{current.author}</div>
                        <div className="font-mono text-sm text-text/50 uppercase tracking-widest mt-1">
                            {current.role} {current.company && <span className="text-secondary/60">/ {current.company}</span>}
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center space-x-6 mt-12">
                    <button
                        onClick={prev}
                        className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-text hover:bg-primary/[0.05] hover:border-primary/50 transition-colors cursor-none group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </button>

                    <div className="font-mono text-sm text-text/50">
                        0{currentIndex + 1} / 0{testimonialsData.length}
                    </div>

                    <button
                        onClick={next}
                        className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-text hover:bg-primary/[0.05] hover:border-primary/50 transition-colors cursor-none group"
                    >
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

            </div>
        </section>
    );
}
