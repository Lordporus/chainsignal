import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Circle, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

import ConnectModal from './ConnectModal';

export default function Footer() {
    const ctaRef = useRef(null);
    const [connectOpen, setConnectOpen] = useState(false);

    useEffect(() => {
        if (!ctaRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from(ctaRef.current, {
                scrollTrigger: {
                    trigger: ctaRef.current,
                    start: 'top 85%',
                },
                scale: 0.95,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* FINAL CTA */}
            <section className="relative w-full pt-32 pb-48 px-6 bg-background overflow-hidden z-[2]">
                <div
                    ref={ctaRef}
                    className="max-w-5xl mx-auto bg-gradient-to-br from-primary to-secondary rounded-[3rem] p-12 md:p-24 flex flex-col items-center text-center shadow-[0_0_100px_rgba(200,244,0,0.2)]"
                >
                    <h2 className="font-display font-black text-6xl md:text-8xl text-background tracking-tighter italic mb-6">
                        EXECUTE.
                    </h2>
                    <p className="font-sans font-bold text-xl md:text-2xl text-background/80 max-w-lg mb-12">
                        Connect your wallet and gain absolute market omniscience in 60 seconds.
                    </p>
                    <button onClick={() => setConnectOpen(true)} className="flex items-center space-x-2 px-10 py-5 bg-background text-primary font-display font-bold text-xl tracking-wide rounded-2xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-none relative overflow-hidden group">
                        <span className="relative z-10 w-full flex items-center">
                            INITIATE CONNECTION <ArrowUpRight className="ml-3 w-6 h-6 group-hover:rotate-45 transition-transform" />
                        </span>
                    </button>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="relative w-full h-auto bg-card pt-32 pb-16 px-8 sm:px-16 rounded-t-[3.5rem] border-t border-primary/10 -mt-24 z-[1] overflow-visible">

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-primary/10 pb-16 items-start overflow-visible">

                    <div className="col-span-1 md:col-span-5 flex flex-col items-start pr-0 md:pr-12">
                        <h3 className="font-display font-bold text-3xl tracking-tight text-primary mb-4">ChainSignal</h3>
                        <p className="font-sans text-text/50 mb-8 max-w-sm break-words whitespace-normal">
                            The command and control center for multi-chain wallet visibility, telemetry, and advanced predictive alerts.
                        </p>
                        {/* System Status */}
                        <div className="inline-flex items-center space-x-3 px-4 py-2 bg-background border border-primary/10 rounded-lg">
                            <Circle className="w-3 h-3 text-secondary fill-secondary animate-pulse" />
                            <span className="font-mono text-xs uppercase tracking-widest text-secondary mt-0.5">
                                System Operational [v2.4.1]
                            </span>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <h4 className="font-sans font-bold text-text mb-6">Platform</h4>
                        <ul className="space-y-4 font-sans text-sm text-text/50">
                            <li><a href="#" className="hover:text-primary transition-colors cursor-none">Dashboard</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors cursor-none">Smart Alerts</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors cursor-none">Live Telemetry</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors cursor-none">Supported Chains</a></li>
                        </ul>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <h4 className="font-sans font-bold text-text mb-6">Resources</h4>
                        <ul className="space-y-4 font-sans text-sm text-text/50">
                            <li><a href="#" className="hover:text-primary transition-colors cursor-none">Documentation</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors cursor-none">API Reference</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors cursor-none">Status Page</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors cursor-none">Security</a></li>
                        </ul>
                    </div>

                    <div className="col-span-1 md:col-span-3">
                        <h4 className="font-sans font-bold text-text mb-6">Terminal Output</h4>
                        <div className="bg-background border border-primary/10 rounded-lg p-4 font-mono text-xs text-secondary/70">
                            <div className="mb-2">&gt;&gt; SYNC_LATEST_BLOCK</div>
                            <div className="mb-2 opacity-50">Fetching block ~2004245... OK</div>
                            <div className="opacity-50">Listening for signals...</div>
                            <div className="w-2 h-4 bg-secondary animate-pulse mt-2" />
                        </div>
                    </div>

                </div>

                <div className="max-w-6xl mx-auto mt-8 flex flex-col md:flex-row items-center justify-between font-mono text-xs text-text/40">
                    <div>&copy; {new Date().getFullYear()} ChainSignal Protocol. All rights reserved.</div>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-primary transition-colors cursor-none">Terms</a>
                        <a href="#" className="hover:text-primary transition-colors cursor-none">Privacy</a>
                        <a href="#" className="hover:text-primary transition-colors cursor-none">Twitter (X)</a>
                        <a href="#" className="hover:text-primary transition-colors cursor-none">Discord</a>
                    </div>
                </div>
            </footer>

            <ConnectModal isOpen={connectOpen} onClose={() => setConnectOpen(false)} />
        </>
    );
}
