"use client"

import { ReactNode } from 'react';
import { LazorkitProvider } from '@lazorkit/wallet';
import { Buffer } from 'buffer';


if (typeof window !== 'undefined') {
  window.Buffer = window.Buffer || Buffer;
}

const CONFIG = {
  rpcUrl: "https://api.devnet.solana.com",
  portalUrl: "https://portal.lazor.sh",
  paymasterConfig: {
    paymasterUrl: "https://kora.devnet.lazorkit.com"
  }
};

export function Providers({ children }: { children: ReactNode }) {
  return (
    /**
     * GASLESS TRANSACTIONS:
     * The LazorkitProvider is configured with a paymasterUrl.
     * All signAndSendTransaction calls made within this provider will be automatically 
     * routed through the Kora Paymaster for gas sponsorship.
     */
    <LazorkitProvider
      rpcUrl={CONFIG.rpcUrl}
      portalUrl={CONFIG.portalUrl}
      paymasterConfig={CONFIG.paymasterConfig}
    >
      {children}
    </LazorkitProvider>
  );
}
