"use client"

import { useWallet } from '@lazorkit/wallet';
import { KeyRound, Loader2 } from 'lucide-react';

export function LoginButton() {
    const { connect, disconnect, isConnected, isConnecting } = useWallet();

    const handleLogin = async () => {
        try {
            await connect();
        } catch (err) {
            console.error("Login failed:", err);
            alert("Failed to sign in with passkey.");
        }
    };

    if (isConnected) {
        return (
            <button
                onClick={disconnect}
                className="px-6 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full hover:bg-red-500/20 transition-all text-sm font-medium"
            >
                Sign Out
            </button>
        );
    }

    return (
        <button
            onClick={handleLogin}
            disabled={isConnecting}
            className="w-full group relative px-8 py-3 bg-white text-black font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
        >
            {isConnecting ? (
                <span className="flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Authenticating...
                </span>
            ) : (
                <span className="flex items-center gap-2">
                    <KeyRound size={18} />
                    Sign in with Passkey
                </span>
            )}
        </button>
    );
}
