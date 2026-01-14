"use client"

import { ReactNode } from 'react';
import { LazorkitProvider } from '@lazorkit/wallet';
import { Buffer } from 'buffer';

// Polyfill for client-side usage if not already present
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
    <LazorkitProvider 
      rpcUrl={CONFIG.rpcUrl} 
      portalUrl={CONFIG.portalUrl} 
      paymasterConfig={CONFIG.paymasterConfig}
    >
      {children}
    </LazorkitProvider>
  );
}
