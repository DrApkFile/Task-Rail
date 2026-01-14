# TaskRail Docs Site Context

This document provides the full technical and narrative context required to build a dedicated documentation and tutorial site for **TaskRail**. The site should follow the premium, developer-centric aesthetic of the **LazorKit** documentation while focusing specifically on the TaskRail implementation.

---

## 1. Project Identity & Narrative

**Tagline**: Passkey-Powered Web3 Productivity.
**Mission**: To demonstrate how Web3 can achieve Web2-level UX through "Frictionless" blockchain technology.
**Visual Style**: 
- **Colors**: Deep Zinc/Black backgrounds, Emerald accents (#10b981), and subtle gradients.
- **Icons**: Lucide-React for professional, sharp iconography.
- **Vibe**: Tech-forward, clean, and template-ready.

---

## 2. Information Architecture

The site should be organized into the following sections:

### A. Introduction & Getting Started
- **Overview**: What is TaskRail? (Bridge between Web2 and Web3).
- **Tech Stack**: Next.js 15, LazorKit SDK, Tailwind CSS, Lucide Icons.
- **Zero-to-One Setup**: 
    - Installing `@lazorkit/wallet` and `@solana/web3.js`.
    - Initializing the `LazorkitProvider` with Devnet RPC and Paymaster URLs.

### B. Core Implementations (The Tutorials)
1. **Biometric Onboarding (Passkey Auth)**:
    - How `useWallet` abstracts the complex WebAuthn flow.
    - Implementing the `LoginButton` with `feeMode: 'paymaster'`.
2. **Frictionless Payouts (Gasless Transactions)**:
    - Leveraging the Paymaster to remove SOL requirements.
    - Code: Using the Solana Memo Program to record task completions on-chain.
3. **Smart Sessions (Background Signing)**:
    - The "Session Key" strategy: 1 approval, 14 days of freedom.
    - Implementation: How the app bypasses manual signing prompts using local state.
4. **Automated Billing (On-Chain Consent)**:
    - Simulating recurring payments for "Pro" tiers.
    - Strategy: Signing a "Consent Transaction" that proves the user's intent on-chain.

### C. Architecture Deep Dive
- **State Management**: Using `useAppState` for centralized persistence with `localStorage`.
- **Logic Separation**: Moving heavy blockchain code into `lib/solana.ts` and types into `lib/types.ts`.
- **Responsive Shell**: Building the `DashboardLayout` for seamless Desktop/Mobile transitions.

---

## 3. High-Fidelity Code Snippets

### Provider Configuration
```tsx
const CONFIG = {
  rpcUrl: "https://api.devnet.solana.com",
  portalUrl: "https://portal.lazor.sh",
  paymasterUrl: "https://kora.devnet.lazorkit.com",
};
```

### Gasless Task Submission
```tsx
const { signAndSendTransaction } = useWallet();

const submitTask = async (memo: string) => {
  const ix = new TransactionInstruction({
    keys: [{ pubkey: userPubkey, isSigner: true, isWritable: true }],
    programId: MEMO_PROGRAM_ID,
    data: Buffer.from(memo),
  });

  return await signAndSendTransaction({ instructions: [ix] });
};
```

### Session Bypass Logic
```tsx
// If session is active, simulate an instant background sign
if (isSessionActive) {
  await fakeDelay(1000);
  return { success: true };
}
```

---

## 4. UX & Design Patterns

- **Micro-animations**: Use `animate-in`, `fade-in`, and `slide-in` for all view transitions.
- **Status Indicators**: Visual cues for "Session Active," "Smart Wallet," and "Network Status."
- **Empty States**: How to handle a fresh user (e.g., the blank username field for full agency).

---

## 5. Scaling Beyond the Demo

Context for the "Future Roadmap":
- **Social Linking**: Fetching real X (Twitter) post data for auto-verification.
- **Real Payouts**: Moving from Memo simulations to actual USDC SPL-token transfers.
- **Custom Paymasters**: How businesses can stake SOL to fund their own creator pools.

---

## 6. Resources for Developers
- [LazorKit Docs](https://docs.lazorkit.com)
- [Solana Web3.js Reference](https://solana-labs.github.io/solana-web3.js/)
- [Next.js Documentation](https://nextjs.org/)
