"use client"

import { useState } from 'react';
import { TaskCard } from '../TaskCard';
import { ShieldCheck, Clock, Star, Lock } from 'lucide-react';

type TaskTab = 'EXPLORE' | 'MY_TASKS';
type MyTaskFilter = 'PENDING' | 'UNCLAIMED' | 'COMPLETED';

interface TasksViewProps {
    demoTaskState: 'IDLE' | 'CLAIMED' | 'SUBMITTING' | 'PAID';
    isPro: boolean;
    onClaim: () => void;
    onSubmit: () => void;
}

export function TasksView({ demoTaskState, isPro, onClaim, onSubmit }: TasksViewProps) {
    const [activeTab, setActiveTab] = useState<TaskTab>('EXPLORE');
    const [filter, setFilter] = useState<MyTaskFilter>('UNCLAIMED');

    const exploreCount = isPro ? 12 : 6;

    return (
        <div className="space-y-4 lg:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden">

            <div className="flex gap-4 lg:gap-6 border-b border-white/10 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
                <TabButton isActive={activeTab === 'EXPLORE'} onClick={() => setActiveTab('EXPLORE')}>
                    Explore
                </TabButton>
                <TabButton isActive={activeTab === 'MY_TASKS'} onClick={() => setActiveTab('MY_TASKS')}>
                    My Tasks
                </TabButton>
            </div>

            {activeTab === 'EXPLORE' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: exploreCount }).map((_, i) => (
                        <div key={i} className={`bg-zinc-900/30 border p-4 lg:p-6 rounded-xl transition-all ${isPro ? 'border-emerald-500/10 hover:border-emerald-500/40 hover:bg-emerald-500/5' : 'border-white/5 opacity-60 hover:opacity-100'}`}>
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center ${isPro ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white/20'}`}>
                                    {isPro ? <ShieldCheck size={18} /> : <Lock size={16} />}
                                </div>
                                <span className={`text-[10px] lg:text-xs px-2 py-1 rounded flex items-center gap-1 ${isPro ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-white/50'}`}>
                                    {isPro ? <>Available</> : <><Lock size={10} /> Locked</>}
                                </span>
                            </div>
                            <h4 className="font-semibold text-white mb-2 text-sm lg:text-base">{isPro ? 'Premium' : 'Social'} Booster #{i + 1}</h4>
                            <p className="text-xs lg:text-sm text-white/40 mb-4">
                                {isPro ? 'Exclusive high-yield task for Pro members only. Complete for instant USDC.' : 'Engage with community posts regarding the new protocol update.'}
                            </p>
                            <div className={`font-mono text-xs lg:text-sm ${isPro ? 'text-emerald-400' : 'text-emerald-500/50'}`}>
                                Reward: ${isPro ? '45.00' : '15.00'}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'MY_TASKS' && (
                <div className="space-y-4 lg:space-y-6">
                    <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
                        <FilterPill isActive={filter === 'PENDING'} onClick={() => setFilter('PENDING')}>Pending (2)</FilterPill>
                        <FilterPill isActive={filter === 'UNCLAIMED'} onClick={() => setFilter('UNCLAIMED')}>Action (1)</FilterPill>
                        <FilterPill isActive={filter === 'COMPLETED'} onClick={() => setFilter('COMPLETED')}>Paid</FilterPill>
                    </div>

                    {filter === 'UNCLAIMED' && (
                        <div className="max-w-2xl">
                            <TaskCard state={demoTaskState} onClaim={onClaim} onSubmit={onSubmit} />
                        </div>
                    )}

                    {filter === 'PENDING' && (
                        <div className="space-y-3 opacity-70">
                            <DummyTaskRow title="Write a Blog Post about LazorKit" reward="50.00 USDC" status="Under Review" />
                            <DummyTaskRow title="Design a Sticker Pack" reward="30.00 USDC" status="Under Review" />
                        </div>
                    )}

                    {filter === 'COMPLETED' && (
                        <div className="space-y-3 opacity-70">
                            {demoTaskState === 'PAID' && (
                                <DummyTaskRow title="Share on X (Twitter)" reward="10.00 USDC" status="Paid" isNew />
                            )}
                            <DummyTaskRow title="Join Discord Server" reward="5.00 USDC" status="Paid" />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function TabButton({ children, isActive, onClick }: { children: React.ReactNode, isActive: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`text-sm lg:text-lg font-medium transition-colors whitespace-nowrap ${isActive ? 'text-white border-b-2 border-emerald-500 pb-[17px] mb-[-1px]' : 'text-white/40 hover:text-white pb-[17px]'}`}
        >
            {children}
        </button>
    );
}

function FilterPill({ children, isActive, onClick }: { children: React.ReactNode, isActive: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`px-3 lg:px-4 py-1.5 rounded-full text-xs lg:text-sm font-medium border transition-colors whitespace-nowrap ${isActive ? 'bg-white text-black border-white' : 'bg-transparent text-white/50 border-white/10 hover:border-white/30'}`}
        >
            {children}
        </button>
    );
}

function DummyTaskRow({ title, reward, status, isNew }: { title: string, reward: string, status: string, isNew?: boolean }) {
    return (
        <div className={`flex items-center justify-between p-3 lg:p-4 bg-zinc-900 border ${isNew ? 'border-emerald-500/50 bg-emerald-900/10' : 'border-white/5'} rounded-xl gap-4`}>
            <div className="min-w-0">
                <h4 className="text-white font-medium flex items-center gap-2 text-sm lg:text-base">
                    <span className="truncate">{title}</span>
                    {isNew && (
                        <span className="text-emerald-400 text-[10px] flex items-center gap-1 flex-shrink-0">
                            <Clock size={10} />
                            (Just now)
                        </span>
                    )}
                </h4>
                <p className="text-[10px] text-white/40">ID: #8823</p>
            </div>
            <div className="text-right flex-shrink-0">
                <p className="text-xs lg:text-sm font-bold text-white">{reward}</p>
                <p className={`text-[10px] lg:text-xs flex items-center justify-end gap-1 ${status === 'Paid' ? 'text-emerald-400' : 'text-yellow-500'}`}>
                    {status === 'Paid' && <ShieldCheck size={10} />}
                    {status}
                </p>
            </div>
        </div>
    )
}
