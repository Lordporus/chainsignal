import React from 'react';

const chains = [
    "ETHEREUM", "SOLANA", "BASE", "ARBITRUM", "OPTIMISM", "POLYGON", "AVALANCHE", "BINANCE"
];

const stats = [
    "$14B+ VOLUME TRACKED / MO",
    "12M+ WALLETS MONITORED",
    "0ms LATENCY FEEDS",
    "3.2M ALERTS FIRED",
    "99.99% UPTIME"
];

export default function SocialProofTicker() {
    return (
        <section className="relative w-full py-12 bg-background overflow-hidden border-y border-primary/10">

            {/* Background Glow / Texture Optional */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-card to-background pointer-events-none opacity-50" />

            {/* Fade Masks */}
            <div
                className="absolute inset-0 z-[2] pointer-events-none"
                style={{
                    maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
                }}
            >
                <div className="relative w-full h-full flex flex-col justify-center space-y-6">

                    {/* Row 1: Chains */}
                    <div className="flex w-fit animate-scroll whitespace-nowrap">
                        {[...chains, ...chains, ...chains].map((chain, i) => (
                            <div
                                key={i}
                                className="flex flex-row items-center justify-center mx-8 text-text/50 hover:text-primary transition-colors duration-300 group cursor-none font-display text-4xl font-bold tracking-tighter uppercase"
                            >
                                {chain}
                            </div>
                        ))}
                    </div>

                    {/* Row 2: Stats */}
                    <div className="flex w-fit animate-scroll-reverse whitespace-nowrap">
                        {[...stats, ...stats, ...stats].map((stat, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-center mx-12 text-secondary/70 font-mono text-sm tracking-widest uppercase cursor-none"
                            >
                                {stat}
                                <span className="inline-block w-2 h-2 rounded-full bg-secondary ml-12 opacity-30" />
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
