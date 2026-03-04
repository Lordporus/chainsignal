import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const compareData = [
    { feature: "Latency", other: "1-5 minutes", pulse: "0ms (Real-time Feed)" },
    { feature: "Supported Chains", other: "Manual addition (EVM only)", pulse: "Universal (EVM, SVM, Cosmos)" },
    { feature: "Gas Fee Tracking", other: "Estimated averages", pulse: "Exact on-chain breakdown" },
    { feature: "Smart Alerts", other: "Basic price thresholds", pulse: "Whale, Liquidation & PnL triggers" },
    { feature: "Setup Time", other: "Hours (manual wallet imports)", pulse: "< 60 seconds (Auto-sync)" }
];

export default function Comparison() {
    const tableRef = useRef(null);

    useEffect(() => {
        if (!tableRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from('.compare-row', {
                scrollTrigger: {
                    trigger: tableRef.current,
                    start: 'top 80%',
                },
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out'
            });
        }, tableRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="compare" className="py-24 px-6 sm:px-12 bg-background border-t border-primary/10">
            <div className="max-w-5xl mx-auto">

                <div className="text-center mb-16">
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-text mb-4">
                        The Edge You've Been Missing.
                    </h2>
                    <p className="font-sans text-text/60 max-w-lg mx-auto text-lg">
                        Standard trackers look at the past. ChainSignal executes in the present.
                    </p>
                </div>

                <div ref={tableRef} className="w-full bg-card border border-primary/10 rounded-2xl overflow-hidden shadow-2xl">

                    {/* Header */}
                    <div className="grid grid-cols-3 border-b border-primary/20 bg-background/50">
                        <div className="p-6 font-mono text-xs md:text-sm text-text/50 uppercase tracking-widest flex items-center">
                            Capability
                        </div>
                        <div className="p-6 font-mono text-xs md:text-sm text-text/50 uppercase tracking-widest text-center border-l border-primary/10 flex items-center justify-center">
                            Other Trackers
                        </div>
                        <div className="p-6 font-display font-bold text-lg md:text-2xl text-primary flex items-center justify-center bg-primary/5 border-l border-primary/20 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
                            <span className="relative z-10 tracking-tight">CHAINSIGNAL</span>
                        </div>
                    </div>

                    {/* Rows */}
                    {compareData.map((row, i) => (
                        <div key={i} className="compare-row grid grid-cols-3 border-b border-primary/5 last:border-b-0 hover:bg-white/[0.02] transition-colors group">

                            <div className="p-5 md:p-6 font-sans text-sm md:text-base font-medium text-text flex items-center">
                                {row.feature}
                            </div>

                            <div className="p-5 md:p-6 font-sans text-sm md:text-base text-text/40 flex flex-col md:flex-row items-center justify-center text-center border-l border-primary/10">
                                <X className="w-4 h-4 text-red-500/50 mr-2 hidden md:block" />
                                {row.other}
                            </div>

                            <div className="p-5 md:p-6 font-mono text-sm md:text-base text-secondary flex flex-col md:flex-row items-center justify-center text-center bg-primary/[0.02] border-l border-primary/10 group-hover:bg-primary/[0.05] transition-colors relative">
                                <Check className="w-4 h-4 text-primary mr-2 mb-1 md:mb-0" />
                                {row.pulse}
                            </div>

                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}
