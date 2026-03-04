import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const statsData = [
    { value: 14, suffix: 'B+', label: 'Volume Tracked ($)' },
    { value: 12, suffix: 'M+', label: 'Wallets Monitored' },
    { value: 0, suffix: 'ms', label: 'Average Latency' },
    { value: 3.2, suffix: 'M', label: 'Alerts Fired' }
];

export default function Stats() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const counters = gsap.utils.toArray('.stat-number');

            counters.forEach((counter, i) => {
                const targetValue = parseFloat(counter.getAttribute('data-value'));
                const isDecimal = targetValue % 1 !== 0;

                gsap.to(counter, {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                    },
                    innerHTML: targetValue,
                    duration: 2,
                    ease: 'power3.out',
                    snap: { innerHTML: isDecimal ? 0.1 : 1 },
                    onUpdate: function () {
                        counter.innerHTML = isDecimal
                            ? Number(this.targets()[0].innerHTML).toFixed(1)
                            : Math.round(this.targets()[0].innerHTML);
                    }
                });
            });

            gsap.from('.stat-block', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                },
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: 'power2.out'
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="stats" ref={containerRef} className="py-24 px-6 bg-card/50 border-y border-primary/5">
            <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-12">
                {statsData.map((stat, i) => (
                    <div key={i} className="stat-block flex flex-col items-center flex-1 min-w-[150px]">
                        <div className="flex items-baseline font-display text-5xl md:text-7xl font-black text-text mb-2 tracking-tighter mix-blend-plus-lighter drop-shadow-[0_0_15px_rgba(200,244,0,0.15)]">
                            {stat.value === 0
                                ? <span className="text-secondary">{stat.value}</span>
                                : <span className="stat-number text-primary" data-value={stat.value}>0</span>
                            }
                            <span className="text-3xl md:text-5xl text-primary/70">{stat.suffix}</span>
                        </div>
                        <div className="font-mono text-xs md:text-sm text-text/50 uppercase tracking-widest text-center">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
