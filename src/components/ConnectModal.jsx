import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function ConnectModal({ isOpen, onClose }) {
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState('');
    const [wallet, setWallet] = useState('');
    const [useCase, setUseCase] = useState('');
    const modalRef = useRef(null);
    const backdropRef = useRef(null);

    // ESC key close
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    // Reset on close
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setSubmitted(false);
                setEmail('');
                setWallet('');
                setUseCase('');
            }, 300);
        }
    }, [isOpen]);

    const handleBackdropClick = (e) => {
        if (e.target === backdropRef.current) onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (!isOpen) return null;

    return (
        <div
            ref={backdropRef}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-[10000] flex items-center justify-center px-4"
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                animation: 'modalFadeIn 200ms ease-out forwards',
            }}
        >
            <div
                ref={modalRef}
                className="relative w-full max-w-md rounded-2xl overflow-hidden"
                style={{
                    background: 'rgba(10, 13, 8, 0.95)',
                    border: '1px solid rgba(200, 244, 0, 0.15)',
                    boxShadow: '0 0 60px rgba(200, 244, 0, 0.08), 0 25px 50px rgba(0,0,0,0.5)',
                    animation: 'modalScaleIn 200ms ease-out forwards',
                }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-colors z-10 cursor-none"
                    aria-label="Close modal"
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Glow accent */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 rounded-b-full"
                    style={{ background: 'linear-gradient(90deg, transparent, #C8F400, transparent)', opacity: 0.6 }}
                />

                <div className="p-8 pt-10">
                    {!submitted ? (
                        <>
                            {/* Header */}
                            <header className="mb-8 text-center">
                                <h2 className="font-display font-bold text-2xl text-[#EEFCE8] tracking-tight mb-2">
                                    Connect to ChainSignal
                                </h2>
                                <p className="font-sans text-sm text-[#EEFCE8]/50">
                                    Start tracking your multi-chain portfolio in seconds.
                                </p>
                            </header>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Email */}
                                <div>
                                    <label htmlFor="connect-email" className="block font-mono text-xs text-[#EEFCE8]/40 uppercase tracking-widest mb-2">
                                        Email
                                    </label>
                                    <input
                                        id="connect-email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@company.com"
                                        className="w-full px-4 py-3 rounded-xl text-sm font-sans text-[#EEFCE8] placeholder-[#EEFCE8]/20 outline-none transition-all duration-200 cursor-none"
                                        style={{
                                            background: 'rgba(255,255,255,0.04)',
                                            border: '1px solid rgba(200, 244, 0, 0.1)',
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'rgba(200, 244, 0, 0.4)'}
                                        onBlur={(e) => e.target.style.borderColor = 'rgba(200, 244, 0, 0.1)'}
                                    />
                                </div>

                                {/* Wallet */}
                                <div>
                                    <label htmlFor="connect-wallet" className="block font-mono text-xs text-[#EEFCE8]/40 uppercase tracking-widest mb-2">
                                        Wallet Address
                                    </label>
                                    <input
                                        id="connect-wallet"
                                        type="text"
                                        value={wallet}
                                        onChange={(e) => setWallet(e.target.value)}
                                        placeholder="0x... or wallet connect"
                                        className="w-full px-4 py-3 rounded-xl text-sm font-sans text-[#EEFCE8] placeholder-[#EEFCE8]/20 outline-none transition-all duration-200 cursor-none"
                                        style={{
                                            background: 'rgba(255,255,255,0.04)',
                                            border: '1px solid rgba(200, 244, 0, 0.1)',
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'rgba(200, 244, 0, 0.4)'}
                                        onBlur={(e) => e.target.style.borderColor = 'rgba(200, 244, 0, 0.1)'}
                                    />
                                </div>

                                {/* Use Case */}
                                <div>
                                    <label htmlFor="connect-usecase" className="block font-mono text-xs text-[#EEFCE8]/40 uppercase tracking-widest mb-2">
                                        Use Case
                                    </label>
                                    <select
                                        id="connect-usecase"
                                        value={useCase}
                                        onChange={(e) => setUseCase(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 rounded-xl text-sm font-sans text-[#EEFCE8] outline-none transition-all duration-200 cursor-none appearance-none"
                                        style={{
                                            background: 'rgba(255,255,255,0.04)',
                                            border: '1px solid rgba(200, 244, 0, 0.1)',
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'rgba(200, 244, 0, 0.4)'}
                                        onBlur={(e) => e.target.style.borderColor = 'rgba(200, 244, 0, 0.1)'}
                                    >
                                        <option value="" disabled className="bg-[#0A0D08] text-[#EEFCE8]/40">Select use case</option>
                                        <option value="portfolio" className="bg-[#0A0D08]">Portfolio Tracking</option>
                                        <option value="signals" className="bg-[#0A0D08]">Real-time Signals</option>
                                        <option value="analytics" className="bg-[#0A0D08]">Trading Analytics</option>
                                        <option value="api" className="bg-[#0A0D08]">Developer / API Access</option>
                                    </select>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="w-full py-3.5 rounded-xl font-mono font-bold text-sm tracking-widest text-[#080A06] transition-all duration-200 hover:scale-[1.02] cursor-none mt-2"
                                    style={{
                                        background: 'linear-gradient(90deg, #C8F400, #00FF87)',
                                        boxShadow: '0 0 20px rgba(200, 244, 0, 0.25)',
                                    }}
                                >
                                    CONNECT &amp; GO LIVE
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="flex items-center gap-4 my-6">
                                <div className="flex-1 h-px bg-white/10" />
                                <span className="font-mono text-[10px] text-[#EEFCE8]/30 uppercase tracking-widest">or connect with wallet</span>
                                <div className="flex-1 h-px bg-white/10" />
                            </div>

                            {/* Wallet Connectors */}
                            <div className="flex items-center justify-center gap-3">
                                {['MetaMask', 'WalletConnect', 'Coinbase'].map((name) => (
                                    <button
                                        key={name}
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs text-[#EEFCE8]/60 hover:text-[#EEFCE8] transition-all duration-200 hover:border-[#C8F400]/30 cursor-none"
                                        style={{
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSubmitted(true);
                                        }}
                                    >
                                        <span className="w-2 h-2 rounded-full bg-[#C8F400]/40" />
                                        {name}
                                    </button>
                                ))}
                            </div>
                        </>
                    ) : (
                        /* Success State */
                        <div className="text-center py-8">
                            <div
                                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                                style={{
                                    background: 'rgba(200, 244, 0, 0.1)',
                                    border: '2px solid rgba(200, 244, 0, 0.3)',
                                    boxShadow: '0 0 30px rgba(200, 244, 0, 0.15)',
                                }}
                            >
                                <svg className="w-8 h-8 text-[#C8F400]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="font-display font-bold text-xl text-[#EEFCE8] mb-3">
                                Connection Request Sent
                            </h3>
                            <p className="font-sans text-sm text-[#EEFCE8]/50 max-w-xs mx-auto leading-relaxed">
                                We're preparing your ChainSignal dashboard. You'll receive access instructions shortly.
                            </p>
                            <button
                                onClick={onClose}
                                className="mt-8 px-6 py-2.5 rounded-xl font-mono text-xs tracking-widest text-[#C8F400] transition-colors duration-200 cursor-none"
                                style={{
                                    border: '1px solid rgba(200, 244, 0, 0.2)',
                                }}
                            >
                                CLOSE
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Keyframe styles */}
            <style>{`
                @keyframes modalFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes modalScaleIn {
                    from { opacity: 0; transform: scale(0.96) translateY(8px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
            `}</style>
        </div>
    );
}
