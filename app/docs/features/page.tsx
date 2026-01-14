"use client"

import { Fingerprint, Zap, Cpu, Boxes, ArrowRight, Shield } from 'lucide-react';

export default function FeaturesDocs() {
    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-black text-white">Core Features</h1>
                <p className="text-lg text-white/40 max-w-2xl leading-relaxed">
                    A deep dive into the technical pillars that power the TaskRail experience.
                </p>
            </div>

            {/* Passkeys */}
            <section id="passkeys" className="space-y-6 pt-8 scroll-mt-24">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl border border-blue-500/20">
                        <Fingerprint size={28} />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white">Passkey Authentication</h2>
                </div>

                <div className="prose prose-invert max-w-none text-white/60 space-y-4">
                    <p>
                        TaskRail uses <strong>WebAuthn</strong> (Passkeys) via LazorKit to replace the traditional "Connect Wallet" flow. This allows for:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 marker:text-blue-500">
                        <li>Device-native biometrics (FaceID, TouchID).</li>
                        <li>Automated Smart Wallet creation on first login.</li>
                        <li>Zero seed phrase management.</li>
                    </ul>
                </div>

                <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[40px] rounded-full"></div>
                    <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider text-blue-400/80">Implementation Details</h4>
                    <pre className="text-xs font-mono text-white/70 overflow-x-auto whitespace-pre">
                        {`// components/LoginButton.tsx
const { connect } = useWallet();

const handleLogin = async () => {
  // Triggers native auth UI
  await connect({ feeMode: 'paymaster' });
};`}
                    </pre>
                </div>
            </section>

            {/* Gasless */}
            <section id="gasless" className="space-y-6 pt-16 border-t border-white/5 scroll-mt-24">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20">
                        <Zap size={28} />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white">Gasless Transactions</h2>
                </div>

                <div className="prose prose-invert max-w-none text-white/60 space-y-4">
                    <p>
                        By integrating a <strong>Paymaster</strong>, TaskRail sponsors the SOL gas fees for all user actions. This eliminates the "Empty Wallet" problem for new users.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-zinc-900 border border-white/5 rounded-2xl">
                        <h5 className="text-white font-bold text-sm mb-2">How it works:</h5>
                        <p className="text-xs text-white/40 leading-relaxed">
                            A backend service (Paymaster) receives the user's signed transaction, signs it with a fee-payer account, and submits it to the network.
                        </p>
                    </div>
                    <div className="p-4 bg-zinc-900 border border-white/5 rounded-2xl">
                        <h5 className="text-white font-bold text-sm mb-2">Efficiency:</h5>
                        <p className="text-xs text-white/40 leading-relaxed">
                            Enables instant "Submit Task" experiences without the user ever seeing a gas prompt.
                        </p>
                    </div>
                </div>
            </section>

            {/* Sessions */}
            <section id="sessions" className="space-y-6 pt-16 border-t border-white/5 scroll-mt-24">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-500/10 text-purple-400 rounded-2xl border border-purple-500/20">
                        <Cpu size={28} />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white">Smart Sessions</h2>
                </div>

                <div className="prose prose-invert max-w-none text-white/60 space-y-4">
                    <p>
                        The "Smart Session" model is TaskRail's approach to Session Keys. After the first manual Passkey approval, the app enters an <strong>Instant Signing</strong> mode.
                    </p>
                </div>

                <div className="bg-zinc-900/80 border border-purple-500/20 rounded-2xl p-6 border-l-4 border-l-purple-500">
                    <div className="flex items-start gap-4">
                        <Shield className="text-purple-400 mt-1 flex-shrink-0" size={20} />
                        <div className="space-y-2">
                            <h4 className="text-white font-bold">The Persistence Strategy</h4>
                            <p className="text-sm text-white/40 leading-relaxed">
                                Session state is held in `useAppState` and persisted via LocalStorage. If `isSessionActive` is true, our transaction helper `signTransactionSafe` bypasses the manual LazorKit prompt to provide a lightning-fast experience.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
