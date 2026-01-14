"use client"

import { Boxes, Cpu, FileText, Layout, Milestone, Rocket, Server } from 'lucide-react';

export default function ArchitectureDocs() {
    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-black text-white">Architecture</h1>
                <p className="text-lg text-white/40 max-w-2xl leading-relaxed">
                    Designed for scalability, modularity, and "Starter Template" quality.
                </p>
            </div>

            {/* Application Structure */}
            <section className="space-y-8 pt-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
                    <Layout className="text-emerald-500" />
                    Folder Structure
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <StructureCard
                        title="app/"
                        description="Contains the Next.js App Router folders. `app/docs` handles this documentation suite, while `app/page.tsx` starts the demo."
                    />
                    <StructureCard
                        title="components/"
                        description="Modular UI elements. View-specific code is organized into `components/views` to keep the main flow clean."
                    />
                    <StructureCard
                        title="hooks/"
                        description="The `useAppState` hook centralizes all application state and localStorage sync in one place."
                    />
                    <StructureCard
                        title="lib/"
                        description="Pure logic. `solana.ts` manages blockchain interactions, while `types.ts` defines the global contracts."
                    />
                </div>
            </section>

            {/* State Management */}
            <section id="state" className="space-y-8 pt-16 border-t border-white/5 scroll-mt-24">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="flex-1 space-y-6">
                        <h2 className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
                            <Cpu className="text-emerald-500" />
                            State Orchestration
                        </h2>
                        <div className="prose prose-invert text-white/60 space-y-4">
                            <p>
                                TaskRail uses a <strong>Centralized Hook Pattern</strong>. Instead of lifting state manually or using complex stores like Redux for a demo, we use a custom `useAppState` hook.
                            </p>
                            <p>
                                This hook is initialized with the `isConnected` status from LazorKit and manages:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 marker:text-emerald-500">
                                <li>Current View Navigation</li>
                                <li>Persistent User Profile</li>
                                <li>Task Execution States</li>
                                <li>Session Key Persistence</li>
                            </ul>
                        </div>
                    </div>

                    <div className="w-full lg:w-80 bg-zinc-900/80 border border-white/5 p-6 rounded-3xl space-y-4">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-widest">
                            <Server size={14} />
                            Persistence Layer
                        </div>
                        <p className="text-xs text-white/40 leading-relaxed italic">
                            "Every state change in TaskRail is mirrored to LocalStorage, allowing users to refresh the page without losing their signed-in session or Pro status."
                        </p>
                    </div>
                </div>
            </section>

            {/* Roadmap */}
            <section id="roadmap" className="space-y-8 pt-16 border-t border-white/5">
                <h2 className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
                    <Milestone className="text-emerald-500" />
                    Future Roadmap
                </h2>

                <div className="space-y-4">
                    <RoadmapItem
                        title="Automated Social Verification"
                        description="Integration with X and YouTube APIs to automatically verify task completion before releasing rewards."
                        status="Planned"
                    />
                    <RoadmapItem
                        title="Real USDC Settlements"
                        description="Swapping memo simulations for actual SPL-token transfers using LazorKit's gasless token support."
                        status="In Discovery"
                    />
                    <RoadmapItem
                        title="Business Onboarding Suite"
                        description="A portal for brands to stake SOL and create their own gasless task pools seamlessly."
                        status="Long-term"
                    />
                </div>
            </section>
        </div>
    );
}

function StructureCard({ title, description }: { title: string, description: string }) {
    return (
        <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl hover:border-emerald-500/20 transition-all">
            <h4 className="text-emerald-400 font-mono font-bold mb-2">{title}</h4>
            <p className="text-sm text-white/40 leading-relaxed">{description}</p>
        </div>
    );
}

function RoadmapItem({ title, description, status }: { title: string, description: string, status: string }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white/5 border border-white/5 rounded-2xl gap-4">
            <div className="space-y-1">
                <h4 className="text-white font-bold">{title}</h4>
                <p className="text-sm text-white/40">{description}</p>
            </div>
            <div className="px-3 py-1 bg-white text-black text-[10px] font-black uppercase tracking-tighter rounded-full w-fit">
                {status}
            </div>
        </div>
    );
}
