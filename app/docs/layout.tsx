"use client"

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '../../components/Logo';
import {
    BookOpen,
    ArrowLeft,
    Menu,
    X,
    ChevronRight,
    FileText,
    Cpu,
    Zap,
    Boxes
} from 'lucide-react';

export default function DocsLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const menuItems = [
        {
            title: "Getting Started",
            items: [
                { name: "Introduction", href: "/docs", icon: BookOpen },
                { name: "Quick Start", href: "/docs?s=setup", icon: Zap }
            ]
        },
        {
            title: "Features",
            items: [
                { name: "Passkey Auth", href: "/docs/features#passkeys", icon: FileText },
                { name: "Gasless Transactions", href: "/docs/features#gasless", icon: Boxes },
                { name: "Smart Sessions", href: "/docs/features#sessions", icon: Cpu }
            ]
        },
        {
            title: "Architecture",
            items: [
                { name: "Core Structure", href: "/docs/architecture", icon: Boxes },
                { name: "State & Hooks", href: "/docs/architecture#state", icon: FileText }
            ]
        }
    ];

    return (
        <div className="flex h-screen bg-black text-white font-[family-name:var(--font-geist-sans)]">
            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Documentation Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 w-72 bg-zinc-950 border-r border-white/10 z-50 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="flex flex-col h-full">
                    <div className="p-6 flex items-center justify-between border-b border-white/5">
                        <Logo />
                        <button className="lg:hidden text-white/50" onClick={() => setIsSidebarOpen(false)}>
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-8 no-scrollbar">
                        {menuItems.map((section, idx) => (
                            <div key={idx} className="space-y-3">
                                <h5 className="px-4 text-[10px] font-bold uppercase tracking-widest text-emerald-500/80">
                                    {section.title}
                                </h5>
                                <div className="space-y-1">
                                    {section.items.map((item, itemIdx) => {
                                        const Icon = item.icon;
                                        const isActive = pathname === item.href;
                                        return (
                                            <Link
                                                key={itemIdx}
                                                href={item.href}
                                                onClick={() => setIsSidebarOpen(false)}
                                                className={`flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-all ${isActive ? 'bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
                                            >
                                                <Icon size={16} />
                                                {item.name}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 border-t border-white/10">
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 w-full py-3 bg-white text-black font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all text-sm"
                        >
                            <ArrowLeft size={16} />
                            Back to App
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black">
                <header className="sticky top-0 z-30 flex items-center justify-between p-4 lg:p-6 bg-black/40 backdrop-blur-xl border-b border-white/5 lg:hidden">
                    <button
                        className="p-2 bg-white/5 rounded-lg border border-white/10"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <Menu size={24} />
                    </button>
                    <Logo className="text-xl" />
                    <div className="w-10"></div> {/* Spacer */}
                </header>

                <div className="max-w-4xl mx-auto p-6 lg:p-12 pb-24">
                    {children}
                </div>
            </main>
        </div>
    );
}
