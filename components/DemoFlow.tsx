"use client"

import { useWallet } from '@lazorkit/wallet';
import { DashboardLayout } from './DashboardLayout';
import { HomeView } from './views/HomeView';
import { TasksView } from './views/TasksView';
import { ProView } from './views/ProView';
import { SessionPrompt } from './SessionPrompt';
import { Logo } from './Logo';
import { LoginButton } from './LoginButton';
import { useAppState } from '../hooks/useAppState';
import { signTransactionSafe } from '../lib/solana';


export function DemoFlow() {
    /** 
     * PASSKEY AUTHENTICATION: 
     * Managed by the useWallet hook. The isConnected state and signAndSendTransaction 
     * methods abstract the entire WebAuthn/Passkey flow into a standard wallet interface.
     */
    const { isConnected, signAndSendTransaction, smartWalletPubkey, disconnect } = useWallet();

    // Custom hook managing all local application state and persistence
    const {
        activeView, setActiveView,
        username, setUsername,
        isPro, setIsPro,
        isSessionActive, setIsSessionActive,
        isSessionActiveRef,
        showSessionPrompt, setShowSessionPrompt,
        hasDoneFirstTask, setHasDoneFirstTask,
        taskState, setTaskState
    } = useAppState(isConnected);

    /**
     * UNIFIED TRANSACTION LOGIC:
     * Handles both standard Passkey-signed transactions and background-signed Session transactions.
     * Logic is simplified by outsourcing to the signTransactionSafe library helper.
     */
    const executeTransaction = async (memo: string) => {
        if (!smartWalletPubkey) return;

        return signTransactionSafe({
            memo,
            smartWalletPubkey,
            isSessionActive: isSessionActiveRef.current,
            signAndSendTransaction,
            onFirstSuccess: () => {
                if (!hasDoneFirstTask) {
                    setTimeout(() => setShowSessionPrompt(true), 1500);
                    setHasDoneFirstTask(true);
                }
            }
        });
    };

    const handleSubscribe = async () => {
        try {
            await executeTransaction("TaskRail: Subscribed to Pro");
            setIsPro(true);
        } catch (err) {
            console.error("Subscription failed:", err);
        }
    };

    const handleTaskSubmit = async () => {
        try {
            setTaskState('SUBMITTING');
            await executeTransaction("TaskRail: Completed Task");
            setTaskState('PAID');
        } catch (err) {
            console.error("Transaction failed:", err);
            setTaskState('CLAIMED');
        }
    };

    if (!isConnected) {
        return (
            <div className="flex min-h-screen bg-black text-white relative overflow-hidden font-[family-name:var(--font-geist-sans)]">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen opacity-50"></div>
                    <div className="absolute bottom-[-10%] left-[-5%] w-[60%] h-[60%] bg-emerald-600/20 blur-[120px] rounded-full mix-blend-screen opacity-50"></div>
                </div>

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


    return (
        <>
            <DashboardLayout
                activeView={activeView}
                onNavigate={setActiveView}
                username={username}
                isPro={isPro}
                isSessionActive={isSessionActive}
                onLogout={disconnect}
            >
                {activeView === 'HOME' && (
                    <HomeView bonusAmount={taskState === 'PAID' ? 10 : 0} username={username} />
                )}
                {activeView === 'TASKS' && (
                    <TasksView
                        demoTaskState={taskState}
                        isPro={isPro}
                        onClaim={() => setTaskState('CLAIMED')}
                        onSubmit={handleTaskSubmit}
                    />
                )}
                {activeView === 'PRO' && (
                    <ProView
                        isPro={isPro}
                        onSubscribe={handleSubscribe}
                    />
                )}
            </DashboardLayout>

            <SessionPrompt
                isVisible={showSessionPrompt}
                onSave={() => {
                    setIsSessionActive(true);
                    setShowSessionPrompt(false);
                    alert("Session saved! Future tasks will sign instantly.");
                }}
                onClose={() => setShowSessionPrompt(false)}
            />
        </>
    );
}
