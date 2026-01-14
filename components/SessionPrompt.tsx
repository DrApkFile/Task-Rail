"use client"

import { useState, useEffect } from 'react';
import { Shield, Clock, X } from 'lucide-react';

interface SessionPromptProps {
    isVisible: boolean;
    onSave: () => void;
    onClose: () => void;
}

export function SessionPrompt({ isVisible, onSave, onClose }: SessionPromptProps) {
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setShouldRender(true);
        } else {
            const timer = setTimeout(() => setShouldRender(false), 500);
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    if (!shouldRender) return null;

    return (
        <div className={`fixed top-8 right-8 z-[100] w-[320px] bg-zinc-900 border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-12 opacity-0 scale-95 pointer-events-none'}`}>
            <div className="p-5 space-y-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                            <Shield size={20} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-white">Save this session?</h4>
                            <p className="text-[11px] text-white/40 leading-tight mt-0.5">Skip Passkey popups for the next 14 days on this device.</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/20 hover:text-white transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                <div className="bg-black/40 rounded-xl p-3 border border-white/5">
                    <div className="flex items-center justify-between text-[11px]">
                        <span className="text-white/40 font-medium uppercase tracking-wider flex items-center gap-1">
                            <Clock size={10} />
                            Duration
                        </span>
                        <span className="text-emerald-400 font-bold">14 Days</span>
                    </div>
                </div>

                <div className="flex gap-2 pt-1">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2 text-xs font-semibold text-white/50 hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-white/10"
                    >
                        Not Now
                    </button>
                    <button
                        onClick={onSave}
                        className="flex-1 py-2 text-xs font-bold text-black bg-emerald-500 hover:bg-emerald-400 rounded-lg transition-all shadow-lg active:scale-95"
                    >
                        Save Session
                    </button>
                </div>
            </div>

            <div className="h-1 w-full bg-white/5 rounded-b-2xl overflow-hidden">
                <div className={`h-full bg-emerald-500 transition-all duration-[8000ms] ease-linear w-full`}></div>
            </div>
        </div>
    );
}
