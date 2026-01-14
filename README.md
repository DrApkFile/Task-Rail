# LazorKit Micro Marketplace Demo

A production-ready example demonstrating how to integrate **LazorKit** for Passkey Authentication and Gasless Transactions on Solana.

![Demo](https://via.placeholder.com/800x400?text=LazorKit+Demo+Preview)

## 🚀 Overview

This project simulates a **Micro Marketplace** workflow where a creator can:
1.  **Sign In without a seed phrase** (using FaceID/TouchID via LazorKit Passkeys).
2.  **Claim a Task** from the marketplace.
3.  **Submit the Task** and receive a payout instantly, with **Zero Gas Fees** (sponsored by a Paymaster).

## ✨ Features

-   **Passkey Authentication**: Onboard users in seconds with biometric verification.
-   **Smart Wallet Creation**: Automatically generate a PDA-based wallet for every user.
-   **Gasless Transactions**: Execute on-chain actions (Memo/Transfer) without the user needing SOL.
-   **Next.js 15 + Tailwind**: Modern, responsive, and beautiful UI.

---

## 🛠️ Quick Start

### Prerequisites
-   Node.js 18+
-   npm or yarn

### Installation

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/your-username/lazor-kit-marketplace.git
    cd lazor-kit-marketplace
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the app:**
    Navigate to [http://localhost:3000](http://localhost:3000).

---

## 📚 Tutorials

### 1. How to Create a Passkey-Based Wallet

LazorKit abstracts the entire wallet creation process into a single hook.

**Step 1: Wrap your app in the Provider**
In `app/providers.tsx`:
```tsx
import { LazorkitProvider } from '@lazorkit/wallet';

export function Providers({ children }) {
  return (
    <LazorkitProvider 
      rpcUrl="https://api.devnet.solana.com"
      portalUrl="https://portal.lazor.sh" 
      paymasterConfig={{ paymasterUrl: "https://kora.devnet.lazorkit.com" }}
    >
      {children}
    </LazorkitProvider>
  );
}
```

**Step 2: Use the Hook to Connect**
In your Login component:
```tsx
import { useWallet } from '@lazorkit/wallet';

export function LoginButton() {
  const { connect, connected } = useWallet();

  return (
    <button onClick={connect}>
      {connected ? "Connected" : "Sign in with Passkey"}
    </button>
  );
}
```
*That's it! Calling `connect()` triggers the system's biometric prompt and creates the wallet.*

### 2. How to Trigger a Gasless Transaction

To send a transaction where the app (or Paymaster) pays the gas, use `signAndSendTransaction`.

```tsx
import { useWallet } from '@lazorkit/wallet';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';

const { signAndSendTransaction, publicKey } = useWallet();

const handleTransaction = async () => {
  // 1. Create your Solana Instruction (e.g., Memo)
  const memoProgramId = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcQb");
  const instruction = new TransactionInstruction({
    keys: [{ pubkey: publicKey!, isSigner: true, isWritable: true }],
    programId: memoProgramId,
    data: Buffer.from("Task Completed!", "utf-8"),
  });

  // 2. Send it via LazorKit (Paymaster is automatic if configured)
  const signature = await signAndSendTransaction({
    instructions: [instruction],
    transactionOptions: {
      computeUnitLimit: 500_000, // Optional optimization
    }
  });

  console.log("Gasless Tx Confirmed:", signature);
};
```

---

## 📦 Project Structure

```
├── app/
│   ├── layout.tsx       # Global layout + Providers wrapper
│   ├── page.tsx         # Main entry point
│   └── providers.tsx    # Lazorkit SDK Configuration
├── components/
│   ├── DemoFlow.tsx     # Main State Machine (Idle -> Paid)
│   ├── LoginButton.tsx  # Auth Component
│   ├── TaskCard.tsx     # Marketplace UI
│   └── SmartWalletInfo.tsx # Wallet Display
└── package.json
```

## 🤝 Contributing

This is a demonstration repo for a Superteam Bounty. Feel free to fork and expand!

## 🔗 Resources

-   [LazorKit Documentation](https://docs.lazorkit.com/)
-   [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/)
