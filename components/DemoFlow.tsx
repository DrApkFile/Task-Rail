"use client"

import { useState, useEffect } from 'react';
import { useWallet } from '@lazorkit/wallet';
import { Buffer } from 'buffer';
import { LoginButton } from './LoginButton';
import { DashboardLayout, ViewType } from './DashboardLayout';
import { HomeView } from './views/HomeView';
import { TasksView } from './views/TasksView';
import { Logo } from './Logo';

type FlowState = 'IDLE' | 'CLAIMED' | 'SUBMITTING' | 'PAID';

export function DemoFlow() {
    const { isConnected, signAndSendTransaction, smartWalletPubkey, disconnect } = useWallet();
    const [activeView, setActiveView] = useState<ViewType>('HOME');
    const [username, setUsername] = useState<string>('LazyGenius');

    // Task State (Lifted up to persist across views)
    const [taskState, setTaskState] = useState<FlowState>('IDLE');

    // Reset state if disconnected
    useEffect(() => {
        if (!isConnected) {
            setTaskState('IDLE');
            setActiveView('HOME');
        }
    }, [isConnected]);

    // Task Submission Logic
    const handleTaskSubmit = async () => {
        try {
            setTaskState('SUBMITTING');

            // 1. Create a Memo Instruction (Proof of Work)
            const { TransactionInstruction, PublicKey } = await import('@solana/web3.js');
            const memoProgramId = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcQb");
            const instruction = new TransactionInstruction({
                keys: [{ pubkey: smartWalletPubkey!, isSigner: true, isWritable: true }],
                programId: memoProgramId,
                data: Buffer.from("TaskRail: Completed", "utf-8"),
            });

            // 2. Send Gasless Transaction
            console.log("Sending gasless transaction...");
            const sig = await signAndSendTransaction({
                instructions: [instruction],
                // No options needed, helps reduce tx size
            });

            console.log("Transaction confirmed:", sig);
            setTaskState('PAID');
        } catch (err) {
            console.error("Transaction failed:", err);
            alert("Transaction failed. Check console for details.");
            setTaskState('CLAIMED');
        }
    };

    // ---------------------------------------------------------
    // RENDER: Landing Page (Not Connected)
    // ---------------------------------------------------------
    if (!isConnected) {
        return (
            <div className="flex min-h-screen bg-black text-white relative overflow-hidden font-[family-name:var(--font-geist-sans)]">
                {/* Background Gradients */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen opacity-50"></div>
                    <div className="absolute bottom-[-10%] left-[-5%] w-[60%] h-[60%] bg-emerald-600/20 blur-[120px] rounded-full mix-blend-screen opacity-50"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 w-full flex flex-col items-center justify-center p-6">

                    <div className="w-full max-w-md bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-500">
                        <div className="flex flex-col items-center text-center space-y-6">

                            <div className="mb-2 scale-125">
                                <Logo />
                            </div>

                            <div className="space-y-2">
                                <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
                                <p className="text-white/50 text-sm leading-relaxed">
                                    Complete tasks, get paid instantly. <br />
                                    Onboardable for everyone.<br />
                                    <span className="text-emerald-400 font-medium">No seed phrases, no gas fees.</span>
                                </p>
                            </div>

                            {/* Login Form Simulation */}
                            <div className="w-full space-y-4 pt-4 border-t border-white/5">
                                <div className="space-y-1 text-left">
                                    <label className="text-xs font-semibold text-white/40 uppercase ml-1">Username</label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Enter your username"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                                    />
                                </div>

                                <div className="pt-2">
                                    <LoginButton />
                                </div>

                                <p className="text-[10px] text-white/30 text-center">
                                    By connecting, you agree to our Terms of Service.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        );
    }

    // ---------------------------------------------------------
    // RENDER: Dashboard (Connected)
    // ---------------------------------------------------------
    return (
        <DashboardLayout
            activeView={activeView}
            onNavigate={setActiveView}
            username={username}
            onLogout={disconnect}
        >
            {activeView === 'HOME' ? (
                <HomeView bonusAmount={taskState === 'PAID' ? 10 : 0} username={username} />
            ) : (
                <TasksView
                    demoTaskState={taskState}
                    onClaim={() => setTaskState('CLAIMED')}
                    onSubmit={handleTaskSubmit}
                />
            )}
        </DashboardLayout>
    );
}
