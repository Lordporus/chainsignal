import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import ConnectModal from './ConnectModal';

export default function Hero() {
    const mountRef = useRef(null);
    const contentRef = useRef(null);
    const navRef = useRef(null);
    const [connectOpen, setConnectOpen] = useState(false);

    // Three.js Background Logic
    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x080A06, 0.002);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 30;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // mobile optimization embedded
        mountRef.current.appendChild(renderer.domElement);

        // Particles Data Node logic
        const particleCount = 2000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        const colorPrimary = new THREE.Color(0xC8F400); // Acid yellow
        const colorSecondary = new THREE.Color(0x00FF87); // Electric green

        for (let i = 0; i < particleCount; i++) {
            const x = (Math.random() - 0.5) * 100;
            const y = (Math.random() - 0.5) * 100;
            const z = (Math.random() - 0.5) * 100;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            const mixedColor = colorPrimary.clone().lerp(colorSecondary, Math.random());
            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.15,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // Mouse Interaction
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const onDocumentMouseMove = (event) => {
            mouseX = (event.clientX - window.innerWidth / 2) * 0.0005;
            mouseY = (event.clientY - window.innerHeight / 2) * 0.0005;
        };

        document.addEventListener('mousemove', onDocumentMouseMove);

        // Check prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Render loop
        renderer.setAnimationLoop(() => {
            if (!prefersReducedMotion) {
                targetX = mouseX * 2;
                targetY = mouseY * 2;

                particles.rotation.y += 0.001;
                particles.rotation.x += 0.0005;

                // subtle tilt drift following cursor
                camera.position.x += (mouseX - camera.position.x) * 0.05;
                camera.position.y += (-mouseY - camera.position.y) * 0.05;
                camera.lookAt(scene.position);
            }
            renderer.render(scene, camera);
        });

        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', onWindowResize);

        return () => {
            window.removeEventListener('resize', onWindowResize);
            document.removeEventListener('mousemove', onDocumentMouseMove);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
            geometry.dispose();
            material.dispose();
        };
    }, []);

    // GSAP Animations
    useEffect(() => {
        if (!mountRef.current || !contentRef.current || !navRef.current) return;

        const ctx = gsap.context(() => {
            // stagger hero content
            gsap.from('.hero-elem', {
                opacity: 0,
                y: 50,
                duration: 1,
                stagger: 0.12,
                ease: 'power3.out',
                delay: 1.5 // waits for app loading wipe
            });

            // Three JS fade in
            gsap.fromTo(mountRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5, delay: 0.3 });

            // Floating Navbar Scroll State
            ScrollTrigger.create({
                trigger: contentRef.current,
                start: 'top top',
                end: 'bottom top',
                onLeave: () => {
                    gsap.to(navRef.current, {
                        backgroundColor: 'rgba(8, 10, 6, 0.7)',
                        backdropFilter: 'blur(24px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        duration: 0.4
                    });
                },
                onEnterBack: () => {
                    gsap.to(navRef.current, {
                        backgroundColor: 'transparent',
                        backdropFilter: 'blur(0px)',
                        border: '1px solid transparent',
                        duration: 0.4
                    });
                }
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section className="relative w-full h-[100dvh] flex flex-col justify-center pb-20 px-8 md:px-16 overflow-hidden bg-background">

            {/* 3D Background */}
            <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />

            {/* Gradient Overlay for readability */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />

            {/* Top Navbar */}
            <nav ref={navRef} className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 rounded-full w-[90%] max-w-5xl transition-all duration-400 border border-transparent">
                <div className="font-mono font-bold text-sm tracking-widest text-[#C8F400]">CHAINSIGNAL</div>
                <div className="hidden md:flex items-center space-x-8 text-sm font-mono tracking-widest text-text/60">
                    <a href="#features" className="hover:text-text transition-colors cursor-none">TERMINAL</a>
                    <a href="#compare" className="hover:text-text transition-colors cursor-none">EDGE</a>
                    <a href="#stats" className="hover:text-text transition-colors cursor-none">PROTOCOL</a>
                </div>
                <button onClick={() => setConnectOpen(true)} className="text-xs font-bold font-mono tracking-wider text-background bg-[#C8F400] px-5 py-2.5 rounded-full hover:scale-105 transition-transform cursor-none">
                    CONNECT
                </button>
            </nav>

            {/* Hero Content */}
            <div ref={contentRef} className="relative z-10 max-w-7xl w-full mx-auto flex flex-col items-start text-left mt-24">
                <h1 className="hero-elem font-display text-[clamp(4rem,10vw,10rem)] leading-[0.8] font-black text-text tracking-tighter w-full uppercase mb-2">
                    CHAINSIGNAL
                </h1>

                <h2 className="hero-elem font-drama text-[clamp(4rem,8vw,8rem)] leading-[0.9] text-text tracking-tight w-full mb-8">
                    <span className="text-gradient italic pr-4">Visibility</span>
                    <span className="italic">into the void.</span>
                </h2>

                <p className="hero-elem font-sans text-lg sm:text-xl text-text/80 max-w-xl mb-12 leading-relaxed font-light">
                    A SaaS portfolio tracker giving traders real-time visibility into holdings, PnL, gas fees, and market signals across every chain.
                </p>

                <div className="hero-elem">
                    <button onClick={() => setConnectOpen(true)} className="px-8 py-4 bg-[#C8F400] text-background font-mono font-bold text-sm tracking-widest rounded-xl hover:scale-105 transform transition-transform cursor-none shadow-[0_0_20px_rgba(200,244,0,0.2)] flex items-center">
                        CONNECT & GO LIVE • 60S <span className="ml-2">→</span>
                    </button>
                </div>
            </div>

            <ConnectModal isOpen={connectOpen} onClose={() => setConnectOpen(false)} />
        </section>
    );
}
