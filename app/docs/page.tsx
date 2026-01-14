"use client"

import { Zap, Shield, ArrowRight, BookOpen, Fingerprint, Coins } from 'lucide-react';

export default function DocsPage() {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Hero */}
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-widest">
                    <BookOpen size={14} />
                    Documentation
                </div>
                <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                    Welcome to <span className="text-emerald-500">TaskRail</span> Docs
                </h1>
                <p className="text-lg lg:text-xl text-white/40 max-w-2xl leading-relaxed">
                    Learn how to build production-grade Web3 dApps with a biometrics-first approach using LazorKit.
                </p>
            </div>

            {/* Core Philosophy */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeatureCard
                    icon={<Fingerprint size={24} />}
                    title="Seamless Auth"
                    description="Onboard users via Windows Hello, FaceID, or TouchID. No seed phrases required."
                />
                <FeatureCard
                    icon={<Coins size={24} />}
                    title="Zero Gas"
                    description="Sponsor every transaction. Users interact without ever needing to hold native SOL."
                />
                <FeatureCard
                    icon={<Zap size={24} />}
                    title="Instant Payouts"
                    description="Automated on-chain verification for high-speed value transfer."
                />
            </section>

            {/* Content Sections */}
            <div className="space-y-16 pt-8">
                <section id="philosophy" className="space-y-6">
                    <h2 className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-black">01</span>
                        The "Frictionless" Philosophy
                    </h2>
                    <div className="prose prose-invert max-w-none text-white/60 space-y-4 leading-relaxed">
                        <p>
                            Traditional Web3 onboarding is broken. From seed phrases to browser extensions, the friction is too high for the average user. TaskRail is built on the belief that <strong>Blockchain should be an implementation detail, not a barrier.</strong>
                        </p>
                        <p>
                            By combining Solana's speed with LazorKit's biometric abstraction, we've created a platform that looks and feels like a professional Web2 productivity suite, while maintaining the security and transparency of the blockchain.
                        </p>
                    </div>
                </section>

                <section id="setup" className="space-y-6">
                    <h2 className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-black">02</span>
                        Quick Start
                    </h2>
                    <div className="space-y-8">
                        {/* Step 1 */}
                        <div className="space-y-4">
                            <h4 className="text-white font-bold flex items-center gap-2">
                                <ArrowRight size={16} className="text-emerald-500" />
                                1. Install Dependencies
                            </h4>
                            <div className="bg-zinc-900 border border-white/5 p-4 rounded-xl font-mono text-sm group">
                                <code className="text-emerald-400">npm install @lazorkit/wallet @solana/web3.js buffer</code>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="space-y-4">
                            <h4 className="text-white font-bold flex items-center gap-2">
                                <ArrowRight size={16} className="text-emerald-500" />
                                2. Configure Your Provider
                            </h4>
                            <p className="text-sm text-white/40">Wrap your layout with the LazorkitProvider to enable global wallet access.</p>
                            <div className="bg-zinc-900 border border-white/5 p-5 rounded-2xl font-mono text-xs overflow-x-auto">
                                <pre className="text-emerald-400/90 whitespace-pre">
                                    {`const CONFIG = {
  rpcUrl: "https://api.devnet.solana.com",
  portalUrl: "https://portal.lazor.sh",
  paymasterUrl: "https://kora.devnet.lazorkit.com",
};

// In RootLayout
<LazorkitProvider
  rpcUrl={CONFIG.rpcUrl}
  portalUrl={CONFIG.portalUrl}
  paymasterConfig={{ paymasterUrl: CONFIG.paymasterUrl }}
>
  {children}
</LazorkitProvider>`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="bg-white/5 border border-white/5 p-6 rounded-3xl hover:bg-white/[0.08] transition-all group">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
            <p className="text-sm text-white/40 leading-relaxed">{description}</p>
        </div>
    );
}
