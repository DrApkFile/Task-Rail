"use client"

import { CheckCircle2, ChevronRight, Send, Loader2 } from 'lucide-react';

type FlowState = 'IDLE' | 'CLAIMED' | 'SUBMITTING' | 'PAID';

interface TaskCardProps {
    state: FlowState;
    onClaim: () => void;
    onSubmit: () => void;
}

export function TaskCard({ state, onClaim, onSubmit }: TaskCardProps) {
    return (
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl relative group overflow-hidden">
            {/* Glow effect */}
            <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500 inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] z-0 pointer-events-none"></div>

            {state === 'PAID' ? (
                <div className="flex flex-col items-center justify-center py-8 text-center space-y-4 animate-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-2">
                        <CheckCircle2 size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Payment Sent!</h3>
                        <p className="text-emerald-400 text-sm mt-1">10.00 USDC has been added to your wallet.</p>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="text-white/40 text-xs hover:text-white transition-colors mt-4"
                    >
                        Start Over
                    </button>
                </div>
            ) : (
                <>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6 relative z-10">
                        <div>
                            <h3 className="text-lg font-semibold text-white">Share on X (Twitter)</h3>
                            <p className="text-white/40 text-sm">Post a thread about LazorKit</p>
                        </div>
                        <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/20">
                            10 USDC
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="relative z-10">
                        {state === 'IDLE' && (
                            <button
                                onClick={onClaim}
                                className="w-full py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                Claim Task
                                <ChevronRight size={18} />
                            </button>
                        )}

                        {state === 'CLAIMED' && (
                            <button
                                onClick={onSubmit}
                                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 active:scale-95 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2"
                            >
                                <Send size={18} />
                                Submit & Get Paid
                            </button>
                        )}

                        {state === 'SUBMITTING' && (
                            <button
                                disabled
                                className="w-full py-3 bg-zinc-800 text-white/50 font-semibold rounded-xl cursor-wait flex items-center justify-center gap-2"
                            >
                                <Loader2 size={18} className="animate-spin" />
                                Processing...
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
