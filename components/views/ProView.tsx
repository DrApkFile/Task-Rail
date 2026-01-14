"use client"

import { useState } from 'react';
import { Zap, ShieldCheck, Clock } from 'lucide-react';

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
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 lg:space-y-8 animate-in zoom-in duration-500 px-4">
                <div className="w-20 h-20 lg:w-24 lg:h-24 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
                    <Zap size={40} className="lg:size-48" />
                </div>
                <div className="space-y-2 lg:space-y-3">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white">You are a Pro Member</h2>
                    <p className="text-white/40 max-w-md mx-auto text-sm lg:text-base">Enjoy your premium benefits, including 3x rewards, instant payouts, and early access to exclusive tasks.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 w-full max-w-3xl">
                    <ProBadge label="3x Yield" />
                    <ProBadge label="Priority Support" />
                    <ProBadge label="Early Access" />
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 lg:space-y-12 py-4 lg:py-8 animate-in fade-in slide-in-from-bottom-4 duration-500 px-4">
            <div className="text-center space-y-4">
                <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                    Upgrade to <span className="text-emerald-400">Pro</span>
                </h2>
                <p className="text-white/50 text-base lg:text-xl max-w-xl mx-auto">
                    Unlock the full potential of TaskRail and maximize your earnings with premium features.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                <BenefitCard
                    icon={<Zap className="text-yellow-400" />}
                    title="3x Rewards"
                    description="Get triple the payout on every task you complete."
                />
                <BenefitCard
                    icon={<ShieldCheck className="text-blue-400" />}
                    title="Vault Access"
                    description="Exclusive high-yield tasks reserved for Pro members."
                />
                <BenefitCard
                    icon={<Clock className="text-purple-400" />}
                    title="Instant Payouts"
                    description="Zero wait time for verification. Get paid immediately."
                />
            </div>

            <div className="bg-gradient-to-tr from-emerald-500 to-teal-600 p-[1px] rounded-3xl group shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <div className="bg-zinc-950 rounded-[23px] p-6 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="space-y-4 text-center lg:text-left">
                        <div className="space-y-1">
                            <h3 className="text-2xl lg:text-3xl font-bold text-white">Daily Pass</h3>
                            <p className="text-white/40 text-sm lg:text-base">Perfect for power users who want maximum yield.</p>
                        </div>
                        <div className="text-4xl lg:text-5xl font-black text-white">$19.99 <span className="text-lg lg:text-xl font-normal text-white/30">/ month</span></div>
                    </div>
                    <button
                        onClick={handleSubscribe}
                        disabled={isSubscribing}
                        className="w-full lg:w-auto px-10 py-4 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-transform active:scale-95 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubscribing ? 'Processing...' : 'Subscribe Now'}
                    </button>
                </div>
            </div>
        </div>
    );
}

function BenefitCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="bg-zinc-900/50 border border-white/5 p-6 lg:p-8 rounded-3xl hover:bg-zinc-900 transition-colors">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-4 lg:mb-6">
                {icon}
            </div>
            <h4 className="text-lg lg:text-xl font-bold text-white mb-2">{title}</h4>
            <p className="text-white/40 text-sm lg:text-base leading-relaxed">{description}</p>
        </div>
    );
}

function ProBadge({ label }: { label: string }) {
    return (
        <div className="bg-emerald-500/10 border border-emerald-500/20 py-3 rounded-2xl text-emerald-400 font-bold text-xs lg:text-sm w-full">
            {label}
        </div>
    );
}
