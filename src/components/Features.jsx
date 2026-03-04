import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Card 1: Diagnostic Shuffler --- //
const shufflerItems = [
    { label: "WALLET SYNC", status: "Ethereum Mainnet [Connected]" },
    { label: "WALLET SYNC", status: "Solana Cluster [Synced]" },
    { label: "WALLET SYNC", status: "Base L2 [Streaming]" }
];

function DiagnosticShuffler() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!itemRef.current) return;
            // 3d flip transition
            gsap.fromTo(itemRef.current,
                { rotateX: 20, opacity: 0, scale: 0.95 },
                { rotateX: 0, opacity: 1, scale: 1, duration: 0.8, ease: "bounce.out" }  // Bounce/spring effect
            );
            setCurrentIndex((prev) => (prev + 1) % shufflerItems.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const currentItem = shufflerItems[currentIndex];

    return (
        <div className="flex flex-col h-40 bg-background/50 rounded-xl p-4 border border-primary/5 mt-4 justify-center items-center overflow-hidden" style={{ perspective: '800px' }}>
            <div ref={itemRef} className="flex flex-col items-center justify-center p-4 bg-card rounded-lg border border-primary/20 shadow-[0_0_15px_rgba(0,255,135,0.1)] w-full">
                <span className="text-[0.65rem] font-mono text-primary/70 tracking-widest uppercase mb-1">{currentItem.label}</span>
                <span className="text-sm font-sans font-medium text-text">{currentItem.status}</span>
            </div>
        </div>
    );
}

// --- Card 2: Telemetry Typewriter --- //
const telemetryMessages = [
    "INITIALIZING PNL AGGREGATION...",
    "EXTRACTING GAS FEE BREAKDOWNS...",
    "GENERATING ENTRY/EXIT SIGNALS...",
    "ON-CHAIN DATA SYNC SECURE."
];

function TelemetryTypewriter() {
    const [displayText, setDisplayText] = useState("");
    const [msgIndex, setMsgIndex] = useState(0);

    useEffect(() => {
        let currentMsg = telemetryMessages[msgIndex];
        let charIndex = 0;
        let typingInterval;

        // Scramble effect before typing next msg
        const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$*";
        let scrambleTicks = 0;

        const scrambleInterval = setInterval(() => {
            scrambleTicks++;
            setDisplayText(Array.from({ length: 15 }).map(() => scrambleChars[Math.floor(Math.random() * scrambleChars.length)]).join(""));

            if (scrambleTicks >= 8) { // ~400ms scramble
                clearInterval(scrambleInterval);

                // Start typing
                typingInterval = setInterval(() => {
                    setDisplayText(currentMsg.substring(0, charIndex + 1));
                    charIndex++;
                    if (charIndex >= currentMsg.length) {
                        clearInterval(typingInterval);
                        setTimeout(() => {
                            setMsgIndex((prev) => (prev + 1) % telemetryMessages.length);
                        }, 2500); // Wait before next message
                    }
                }, 30); // 30ms per char (adjusted from 15ms for readability)
            }
        }, 50);

        return () => {
            clearInterval(scrambleInterval);
            clearInterval(typingInterval);
        };
    }, [msgIndex]);

    return (
        <div className="flex flex-col h-40 bg-background/50 rounded-xl p-4 border border-primary/5 mt-4">
            <div className="flex items-center justify-between mb-2">
                <span className="text-[0.6rem] font-mono text-text/50">SYSTEM_LOG</span>
                <div className="flex items-center text-[0.6rem] font-mono text-secondary">
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse mr-1" />
                    LIVE
                </div>
            </div>
            <div className="flex-1 flex items-start mt-2">
                <span className="font-mono text-xs text-primary leading-relaxed break-words">
                    {'> '} {displayText}
                    <span className="inline-block w-2 bg-primary animate-pulse ml-0.5" style={{ height: '10px', verticalAlign: 'middle' }} />
                </span>
            </div>
        </div>
    );
}

// --- Card 3: Signal Graph --- //
function SignalGraph() {
    const pathRef = useRef(null);
    const [hoveredPoint, setHoveredPoint] = useState(null);

    // Example data points (normalized 0-100)
    const points = [10, 25, 15, 45, 30, 65, 55, 90];
    const w = 300, h = 100;

    const stepX = w / (points.length - 1);
    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * stepX} ${h - (p / 100) * h}`).join(' ');

    useEffect(() => {
        if (pathRef.current) {
            const length = pathRef.current.getTotalLength();
            gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });

            ScrollTrigger.create({
                trigger: pathRef.current,
                start: "top 85%",
                onEnter: () => {
                    gsap.to(pathRef.current, {
                        strokeDashoffset: 0,
                        duration: 2,
                        ease: "power2.out"
                    });
                }
            });
        }
    }, []);

    return (
        <div className="flex flex-col h-40 bg-background/50 rounded-xl p-4 border border-primary/5 mt-4 relative">
            <div className="flex items-center justify-between mb-4">
                <span className="text-[0.65rem] font-mono text-text/50">SMART_ALERT: WHALE_VOL</span>
                <Activity className="w-3 h-3 text-secondary" />
            </div>
            <div className="relative flex-1 w-full h-full">
                <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full overflow-visible">
                    {/* Grid lines */}
                    <line x1="0" y1={h / 2} x2={w} y2={h / 2} stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1" strokeDasharray="4 4" />

                    <path
                        ref={pathRef}
                        d={pathD}
                        fill="none"
                        stroke="url(#graphGradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="filter drop-shadow-[0_0_8px_rgba(200,244,0,0.5)]"
                    />

                    <defs>
                        <linearGradient id="graphGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#00FF87" />
                            <stop offset="100%" stopColor="#C8F400" />
                        </linearGradient>
                    </defs>

                    {/* Interactive points */}
                    {points.map((p, i) => (
                        <g key={i} className="group cursor-none">
                            <circle
                                cx={i * stepX}
                                cy={h - (p / 100) * h}
                                r="4"
                                fill="#080A06"
                                stroke="#C8F400"
                                strokeWidth="1.5"
                                className="transition-all duration-300 group-hover:scale-150 group-hover:fill-secondary group-hover:stroke-secondary origin-center pointer-events-auto"
                                onMouseEnter={() => setHoveredPoint({ i, val: p })}
                                onMouseLeave={() => setHoveredPoint(null)}
                            />
                            {/* Optional slight pulse animation mapped in CSS for these dots usually, but sticking to hover here for robustness */}
                        </g>
                    ))}
                </svg>

                {hoveredPoint && (
                    <div
                        className="absolute bg-background border border-primary/30 text-primary text-[0.6rem] font-mono py-1 px-2 rounded -translate-x-1/2 -translate-y-full mb-2 pointer-events-none whitespace-nowrap"
                        style={{
                            left: `${(hoveredPoint.i / (points.length - 1)) * 100}%`,
                            top: `${100 - hoveredPoint.val}%`
                        }}
                    >
                        VOL: {hoveredPoint.val}k
                    </div>
                )}
            </div>
        </div>
    );
}


// --- Main Features Component --- //
export default function Features() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from('.feature-card', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%',
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out'
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="features" ref={containerRef} className="py-32 px-6 sm:px-12 bg-background relative">
            <div className="max-w-6xl mx-auto">
                <div className="text-left mb-16">
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-text mb-4 uppercase tracking-tighter">
                        Total Omniscience. <br /><span className="text-[#00FF87] italic font-drama lowercase tracking-tight">Zero Latency.</span>
                    </h2>
                    <p className="font-sans text-text/60 max-w-xl text-lg md:mx-0">
                        Stop switching tabs. ChainSignal aggregates every signal across all your positions into functional micro-instruments.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Card 1 */}
                    <div className="feature-card bg-[#0D110C] border border-[#C8F400]/10 rounded-[2rem] p-8 shadow-xl hover:border-[#C8F400]/30 transition-colors">
                        <h3 className="font-display font-bold text-text text-[1.1rem] uppercase tracking-wider flex items-center">
                            <span className="w-2 h-2 rounded-full bg-[#C8F400] mr-2" /> OMNICHAIN SYNC
                        </h3>
                        <p className="font-sans text-text/50 text-[0.9rem] mt-2 leading-relaxed h-16">
                            Track every wallet across every chain simultaneously in one unified feed.
                        </p>
                        <DiagnosticShuffler />
                    </div>

                    {/* Card 2 */}
                    <div className="feature-card bg-[#0D110C] border border-[#C8F400]/10 rounded-[2rem] p-8 shadow-xl hover:border-[#C8F400]/30 transition-colors">
                        <h3 className="font-display font-bold text-text text-[1.1rem] uppercase tracking-wider">LIVE TELEMETRY</h3>
                        <p className="font-sans text-text/50 text-[0.9rem] mt-2 leading-relaxed h-16">
                            Real-time PnL, gas fee breakdowns, and execution signals.
                        </p>
                        <TelemetryTypewriter />
                    </div>

                    {/* Card 3 */}
                    <div className="feature-card bg-[#0D110C] border border-[#C8F400]/10 rounded-[2rem] p-8 shadow-xl hover:border-[#C8F400]/30 transition-colors">
                        <h3 className="font-display font-bold text-text text-[1.1rem] uppercase tracking-wider">SMART ALERTS</h3>
                        <p className="font-sans text-text/50 text-[0.9rem] mt-2 leading-relaxed h-16">
                            Whale movements and liquidation risks detected before they hit.
                        </p>
                        <SignalGraph />
                    </div>

                </div>
            </div>
        </section>
    );
}
