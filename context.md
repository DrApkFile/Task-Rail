# Context: Micro Marketplace Flow (1 Task Only) LazorKit Demo

## 1. Overview

This is a **single-page working demo** showcasing **key LazorKit features** in a realistic dev environment. It represents a **micro marketplace flow**, simulating how a creator can complete a task and receive a payout via LazorKit smart wallet and passkey authentication.

This is **not a full product**, just a high-quality example that other developers can run and learn from quickly.

---

## 2. Purpose

* Demonstrate **passkey authentication** in a real-world flow
* Show **smart wallet creation** per user
* Execute **transaction signing and payout** (optionally gasless)
* Provide a practical **task-to-payout workflow** that is easy to understand

---

## 3. Demo Flow

### Creator Flow

1. **Sign in with Passkey**

   * User clicks “Sign in with Passkey”
   * LazorKit handles biometric login
   * Smart wallet is auto-created for the user

2. **Claim Task**

   * Task is defined in a simple JSON object (e.g., “Post a thread”)
   * User claims the task

3. **Submit Task**

   * User clicks “Submit” after completing the task
   * LazorKit signs the transaction and transfers the payout to the user’s wallet
   * Manual verification is simulated via an “Approve” button for the demo

4. **Receive Payout**

   * Wallet receives the funds instantly
   * Transaction details (hash, amount) are displayed on the page

### Business Flow (Simulated)

1. Fund task upfront via LazorKit wallet
2. Approve submissions manually in the demo interface
3. Release payout to creator wallet

---

## 4. Key LazorKit Features Demonstrated

| Feature                                   | Included? | Notes                                                 |
| ----------------------------------------- | --------- | ----------------------------------------------------- |
| Passkey Authentication                    | ✅         | Sign in for creators                                  |
| Smart Wallet Creation                     | ✅         | Auto-created on login                                 |
| Transaction Signing / Gasless Transaction | ✅         | Payout to creator wallet                              |
| Escrow / Fund Management                  | ⚡ Partial | Business funds task upfront; payout release simulated |

**Total:** 3–4 key features, depending on how escrow/funding is implemented.

---

## 5. Technology Stack

* **Frontend:** Next.js (single page)
* **LazorKit SDK:** Handles passkey login, smart wallet, and transaction signing
* **Data Storage:** JSON for task info (no backend required for demo)
* **Optional:** UI library (Tailwind / plain CSS)

---

## 6. Why This Demo is Impressive

* Shows **real-world task → payout logic** in one page
* No backend required, making it **easy to run and understand**
* Covers **core LazorKit features** used in production apps
* Can be cloned and tested immediately by other developers
* Demonstrates **how Web3 can have Web2-like simplicity**

---

## 7. One-Sentence Positioning

> A single-page LazorKit demo that shows a micro marketplace task flow: passkey login → smart wallet creation → submit task → receive payout, all in a practical, easy-to-run example.
