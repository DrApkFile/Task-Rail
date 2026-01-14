# TaskRail | Passkey-Powered Web3 Productivity

TaskRail is a production-grade demonstration of Lazorkit, showcasing how to build a frictionless, biometrics-first user experience on Solana. It eliminates the complexities of seed phrases and gas fees, providing a Web2-like experience with Web3 security.

## Project Overview

TaskRail simulates a decentralized marketplace where users can complete tasks and get paid instantly in USDC. Key highlights include:
- Biometric Onboarding: No passwords or seed phrases. Users sign in with FaceID, TouchID, or Windows Hello.
- Gasless Transactions: All on-chain actions are sponsored by a Paymaster. Users never need to hold SOL.
- Smart Sessions: A unique "Session Key" simulation that allows 14 days of instant actions after a single approval.
- Automated Billing: On-chain consent for Pro subscriptions via Solana Memo instructions.

---

## Quick-Start Guide

### 1. Prerequisites
- Node.js: 18.x or higher
- Modern Browser: Chrome, Edge, or Safari with WebAuthn support (for Passkeys)

### 2. SDK Installation & Config
Lazorkit is the core engine of TaskRail. Install it along with its peer dependencies:

```bash
npm install @lazorkit/wallet @solana/web3.js buffer
```

### 3. Environment Setup
The project is configured out of the box to work on Solana Devnet. You can find the configuration in app/providers.tsx:

```tsx
const CONFIG = {
  rpcUrl: "https://api.devnet.solana.com",
  portalUrl: "https://portal.lazor.sh",
  paymasterConfig: {
    paymasterUrl: "https://kora.devnet.lazorkit.com",
  }
};
```

### 4. Running the Example
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open the app:
   Navigate to http://localhost:3000.

---

## How to Test (The Demo Flow)

To experience the full tech stack, follow this walkthrough:

1. Onboard: Enter a username and click Sign in with Passkey. Use your device biometrics to create your Smart Wallet instantly.
2. Gasless Task: Go to the "Tasks" tab and click Submit Task. Notice that you receive a reward without paying gas.
3. Active Session: After your first task, save your session when prompted. A "Session Active" badge will appear in the header.
4. Instant Action: Upgrade to TaskRail Pro or complete more tasks. Notice that transactions now sign instantly in the background without a Passkey prompt.

---

## Architecture & Reusability

TaskRail is built with "Starter Template Quality" in mind. The logic is strictly modularized for easy reuse:

- hooks/useAppState.ts: Centralized state and persistence (LocalStorage).
- lib/solana.ts: Pure blockchain interaction and session bypass logic.
- lib/types.ts: Shared type definitions for the entire app.
- components/views/: Decoupled UI components for different app states.

---

## Resources
- [Lazorkit Documentation](https://docs.lazorkit.com/)
- [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/)
- [Next.js Framework](https://nextjs.org/)
