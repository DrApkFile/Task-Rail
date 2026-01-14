"use client"

import { useState } from 'react';
import { TaskCard } from '../TaskCard';

type TaskTab = 'EXPLORE' | 'MY_TASKS';
type MyTaskFilter = 'PENDING' | 'UNCLAIMED' | 'COMPLETED';

interface TasksViewProps {
    demoTaskState: 'IDLE' | 'CLAIMED' | 'SUBMITTING' | 'PAID';
    onClaim: () => void;
    onSubmit: () => void;
}

export function TasksView({ demoTaskState, onClaim, onSubmit }: TasksViewProps) {
    const [activeTab, setActiveTab] = useState<TaskTab>('EXPLORE');
    const [filter, setFilter] = useState<MyTaskFilter>('UNCLAIMED');

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Top Tabs */}
            <div className="flex gap-6 border-b border-white/10 pb-4">
                <TabButton isActive={activeTab === 'EXPLORE'} onClick={() => setActiveTab('EXPLORE')}>
                    Explore Tasks
                </TabButton>
                <TabButton isActive={activeTab === 'MY_TASKS'} onClick={() => setActiveTab('MY_TASKS')}>
                    My Tasks
                </TabButton>
            </div>

            {activeTab === 'EXPLORE' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-zinc-900/30 border border-white/5 p-6 rounded-xl opacity-60 hover:opacity-100 transition-opacity">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-10 h-10 bg-white/10 rounded-full"></div>
                                <span className="text-xs bg-white/5 px-2 py-1 rounded text-white/50">Locked</span>
                            </div>
                            <h4 className="font-semibold text-white mb-2">Social Booster #{i}</h4>
                            <p className="text-sm text-white/40 mb-4">Engage with community posts regarding the new protocol update.</p>
                            <div className="text-emerald-500/50 font-mono text-sm">Reward: $15.00</div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'MY_TASKS' && (
                <div className="space-y-6">
                    {/* Filter Pills */}
                    <div className="flex gap-2">
                        <FilterPill isActive={filter === 'PENDING'} onClick={() => setFilter('PENDING')}>Pending Review (2)</FilterPill>
                        <FilterPill isActive={filter === 'UNCLAIMED'} onClick={() => setFilter('UNCLAIMED')}>Needs Action (1)</FilterPill>
                        <FilterPill isActive={filter === 'COMPLETED'} onClick={() => setFilter('COMPLETED')}>Completed</FilterPill>
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
            className={`text-lg font-medium transition-colors ${isActive ? 'text-white border-b-2 border-emerald-500 pb-[17px] mb-[-17px]' : 'text-white/40 hover:text-white'}`}
        >
            {children}
        </button>
    );
}

function FilterPill({ children, isActive, onClick }: { children: React.ReactNode, isActive: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${isActive ? 'bg-white text-black border-white' : 'bg-transparent text-white/50 border-white/10 hover:border-white/30'}`}
        >
            {children}
        </button>
    );
}

function DummyTaskRow({ title, reward, status, isNew }: { title: string, reward: string, status: string, isNew?: boolean }) {
    return (
        <div className={`flex items-center justify-between p-4 bg-zinc-900 border ${isNew ? 'border-emerald-500/50 bg-emerald-900/10' : 'border-white/5'} rounded-xl`}>
            <div>
                <h4 className="text-white font-medium">{title} {isNew && <span className="text-emerald-400 text-xs ml-2">(Just now)</span>}</h4>
                <p className="text-xs text-white/40">Task ID: #8823</p>
            </div>
            <div className="text-right">
                <p className="text-sm font-bold text-white">{reward}</p>
                <p className={`text-xs ${status === 'Paid' ? 'text-emerald-400' : 'text-yellow-500'}`}>{status}</p>
            </div>
        </div>
    )
}
