"use client"

import { ReactNode } from 'react';
import { useWallet } from '@lazorkit/wallet';
import { Logo } from './Logo';
import { ViewType } from '../lib/types';
import { Home, ClipboardList, Zap, LogOut, Star, Copy, ExternalLink } from 'lucide-react';

interface DashboardLayoutProps {
    children: ReactNode;
    activeView: ViewType;
    username: string;
    isPro?: boolean;
    isSessionActive?: boolean;
    onNavigate: (view: ViewType) => void;
    onLogout: () => void;
}

export function DashboardLayout({ children, activeView, username, isPro, isSessionActive, onNavigate, onLogout }: DashboardLayoutProps) {
    const { smartWalletPubkey } = useWallet();

    const navItems = [
        { id: 'HOME', label: 'Home', icon: Home },
        { id: 'TASKS', label: 'Tasks', icon: ClipboardList },
        { id: 'PRO', label: 'TaskRail Pro', icon: Zap },
    ];

    return (
        <div className="flex h-screen bg-black text-white overflow-hidden font-[family-name:var(--font-geist-sans)]">
            <aside className="w-64 bg-zinc-950 border-r border-white/10 flex flex-col p-6 z-20">
                <div className="mb-10">
                    <Logo className="text-2xl" />
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => onNavigate(item.id as ViewType)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeView === item.id
                                    ? 'bg-emerald-500/10 text-emerald-400 font-semibold'
                                    : 'text-white/50 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <Icon size={20} />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                <div className="pt-6 border-t border-white/10 space-y-4">
                    <div className="flex items-center gap-3 px-2">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-sm font-bold uppercase transition-transform group-hover:scale-110">
                                {username.slice(0, 2)}
                            </div>
                            {isPro && (
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-zinc-950 flex items-center justify-center text-[8px] text-zinc-950 font-bold">
                                    <Star size={8} fill="currentColor" />
                                </div>
                            )}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium leading-none truncate flex items-center gap-2">
                                {username}
                                {isPro && <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Pro</span>}
                            </p>
                            <p className="text-xs text-white/40 mt-1 opacity-70">{isPro ? 'Pro Member' : 'Member'}</p>
                        </div>
                    </div>

                    <button
                        onClick={onLogout}
                        className="w-full flex items-center justify-center gap-2 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </div>
            </aside>

            <main className="flex-1 overflow-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black relative flex flex-col">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 pointer-events-none"></div>

                <header className="relative z-20 flex justify-end items-center gap-4 p-6">
                    {isSessionActive && (
                        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full animate-in fade-in slide-in-from-right-4">
                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                                Session Active
                            </span>
                        </div>
                    )}
                    <div
                        onClick={() => {
                            if (smartWalletPubkey) {
                                navigator.clipboard.writeText(smartWalletPubkey.toBase58());
                                alert("Address copied!");
                            }
                        }}
                        className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-md cursor-pointer hover:bg-white/10 transition-all group"
                    >
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider leading-none mb-1">Smart Wallet</span>
                            <code className="text-xs text-emerald-400 font-mono leading-none">
                                {smartWalletPubkey?.toBase58().slice(0, 6)}...{smartWalletPubkey?.toBase58().slice(-6)}
                            </code>
                        </div>
                        <Copy size={14} className="text-white/20 group-hover:text-white/60 transition-colors" />
                    </div>
                </header>

                <div className="flex-1 p-8 pt-2 max-w-6xl mx-auto w-full relative z-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
