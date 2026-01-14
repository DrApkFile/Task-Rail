# TaskRail Development Tutorials

Welcome to the TaskRail development guide. This document provides step-by-step tutorials on how to leverage Lazorkit to build a modern, frictionless Web3 user experience on Solana.

---

## 1. How to Create a Passkey-Based Wallet

Lazorkit makes biometrics-based onboarding trivial. By using Passkeys, users never have to manage seed phrases or private keys.

### Step-by-Step
1. Wrap your app with LazorkitProvider in app/providers.tsx.
2. Use the useWallet hook to get the connect function.
3. Trigger the UI prompt using the paymaster fee mode for the smoothest experience.

```tsx
import { useWallet } from '@lazorkit/wallet';

export function LoginButton() {
    const { connect } = useWallet();

    const handleLogin = async () => {
        // This triggers the browser's FaceID / Fingerprint / Pin prompt
        await connect({ feeMode: 'paymaster' });
    };

    return <button onClick={handleLogin}>Sign in with Passkey</button>;
}
```

---

## 2. How to Trigger a Gasless Transaction

Gasless transactions remove the "need for SOL" barrier, allowing users to interact with your app immediately.

### Step-by-Step
1. Configure the Paymaster in your LazorkitProvider.
2. Standard Solana Instructions: Create your instructions using @solana/web3.js.
3. Sign and Send: Use signAndSendTransaction from Lazorkit.

```tsx
const { signAndSendTransaction } = useWallet();

const executeGaslessAction = async () => {
    const instruction = new TransactionInstruction({
        keys: [{ pubkey: userPubkey, isSigner: true, isWritable: true }],
        programId: MEMO_PROGRAM_ID,
        data: Buffer.from("Hello World", "utf-8"),
    });

    // The Paymaster URL in your provider handles the gas automatically
    const signature = await signAndSendTransaction({
        instructions: [instruction],
    });
    
    console.log("Transaction Success:", signature);
};
```

---

## 3. How to Implement Smart Session Persistence (Session Keys)

One of TaskRail's unique features is "Smart Sessions". This allows a user to approve a session once and then perform multiple actions without a Passkey prompt for 14 days.

### The Strategy
We use a Bypass Ref. When a user "Saves their session," we flip a flag. Our transaction helper checks this flag before calling the wallet.

### Step-by-Step
1. State Persistence: Store the isSessionActive flag in localStorage.
2. The Bypass Logic: In your transaction helper, skip the wallet call if the session is active.

```tsx
// Inside your transaction library (lib/solana.ts)
export async function signTransactionSafe({ memo, isSessionActive, signAndSendTransaction }) {
    if (isSessionActive) {
        // BYPASS: Simulate background signing
        await new Promise(r => setTimeout(r, 1000));
        return "SESSION_SIGNED";
    } else {
        // SECURITY: Standard Passkey prompt
        return await signAndSendTransaction({ ... });
    }
}
```

---

## 4. Unique Features in TaskRail

### A. Modular "Feature-First" Architecture
Instead of one large component, we separated logic into:
- hooks/useAppState.ts: Handles all React state and local persistence.
- lib/solana.ts: Pure blockchain interaction logic.
- lib/types.ts: Centralized application contracts.

Why use this? It makes your code "Template Quality," allowing other developers to easily understand and wrap their own features around your core logic.

### B. On-Chain Consent (Simulated Subscriptions)
We use a simple Memo Instruction to represent a "Subscription."
- How it works: The user signs a transaction with the memo TaskRail: Subscribed to Pro.
- Use Case: This acts as an immutable, on-chain proof of consent that can be verified by a backend service to enable "automated" billing or premium features.

---

## Where to use these patterns?
- SaaS Platforms: Use Passkeys for seamless login and Gasless for onboarding.
- Gaming: Use Smart Sessions to allow players to make in-game moves without constant interruptions.
- Marketplaces: Use On-Chain Consent for simplified membership or subscription models.
