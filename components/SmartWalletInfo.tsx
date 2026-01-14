"use client"

import { useWallet } from '@lazorkit/wallet';

export function SmartWalletInfo() {
    const { smartWalletPubkey } = useWallet();

    if (!smartWalletPubkey) return null;

    return (
        <div className="flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
            <span className="text-xs text-white/50 uppercase tracking-wider font-medium">Your Smart Wallet</span>
            <div className="flex items-center gap-3">
                <div
                    onClick={() => {
                        navigator.clipboard.writeText(smartWalletPubkey.toBase58());
                        alert("Address copied!");
                    }}
                    className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-lg border border-emerald-500/20 cursor-pointer hover:bg-black/50 transition-colors group"
                    title="Click to copy"
                >
                    <code className="text-emerald-400 font-mono text-sm">
                        {smartWalletPubkey.toBase58().slice(0, 4)}...{smartWalletPubkey.toBase58().slice(-4)}
                    </code>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500/50 group-hover:text-emerald-400">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            </div>
        </div>
    );
}
