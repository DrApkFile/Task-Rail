"use client"

import { useState } from 'react';

import { Gem, Rocket, Zap, Settings, ShieldCheck, Check } from 'lucide-react';

interface ProViewProps {
    isPro: boolean;
    onSubscribe: () => Promise<void>;
}

export function ProView({ isPro, onSubscribe }: ProViewProps) {
    const [isSubscribing, setIsSubscribing] = useState(false);

    const handleSubscribe = async () => {
        setIsSubscribing(true);
        try {
            await onSubscribe();
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubscribing(false);
        }
    };

    if (isPro) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                    <ShieldCheck size={48} />
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-white">You're a Pro Member!</h2>
                    <p className="text-white/60 mt-2 max-w-sm">
                        Thank you for supporting TaskRail. You now have access to premium tasks and instant review perks.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full max-w-md pt-4">
                    <div className="bg-zinc-900/50 p-4 rounded-2xl border border-emerald-500/20">
                        <p className="text-xs text-white/40 uppercase font-bold mb-1">Status</p>
                        <p className="text-emerald-400 font-bold">Active</p>
                    </div>
                    <div className="bg-zinc-900/50 p-4 rounded-2xl border border-emerald-500/20">
                        <p className="text-xs text-white/40 uppercase font-bold mb-1">Billing</p>
                        <p className="text-white font-bold">Automated</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                    <Gem size={12} />
                    Premium Tier
                </div>
                <h2 className="text-4xl font-extrabold text-white tracking-tight">Upgrade to <span className="text-emerald-400">TaskRail Pro</span></h2>
                <p className="text-xl text-white/50">Experience the full power of automated, gasless tasking.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <BenefitCard
                    icon={<Rocket size={32} />}
                    title="More Tasks"
                    description="Unlock 2x more tasks daily from high-paying partners."
                />
                <BenefitCard
                    icon={<Zap size={32} />}
                    title="Instant Review"
                    description="Skip the queue. Your submissions are verified 5x faster."
                />
                <BenefitCard
                    icon={<Settings size={32} />}
                    title="Priority Support"
                    description="Direct access to TaskRail customer service 24/7."
                />
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-10 flex flex-col items-center space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>

                <div className="text-center space-y-2 relative z-10">
                    <div className="text-5xl font-bold text-white">$10.00 <span className="text-xl text-white/40 font-normal">/ month</span></div>
                    <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">Powered by Smart Wallet Auto-Pay</p>
                </div>

                <button
                    onClick={handleSubscribe}
                    disabled={isSubscribing}
                    className="group relative w-full max-w-sm py-4 bg-emerald-500 text-black font-bold rounded-2xl hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] disabled:opacity-50 disabled:cursor-wait"
                >
                    {isSubscribing ? (
                        <span className="flex items-center justify-center gap-2">
                            <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                            Setting up Auto-Pay...
                        </span>
                    ) : (
                        <span className="flex items-center justify-center gap-2">
                            <Check size={20} />
                            Subscribe with One Click
                        </span>
                    )}
                </button>

                <p className="text-white/30 text-xs text-center max-w-xs">
                    Subscription starts immediately. Managed through your Smart Wallet permissions. Cancel anytime.
                </p>
            </div>
        </div>
    );
}

function BenefitCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="p-8 bg-zinc-900/30 border border-white/5 rounded-3xl hover:border-emerald-500/30 transition-all hover:bg-white/5">
            <div className="text-emerald-400 mb-4">{icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-white/40 text-sm leading-relaxed">{description}</p>
        </div>
    );
}
