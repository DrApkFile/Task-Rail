import { ReactNode } from 'react';

export type ViewType = 'HOME' | 'TASKS' | 'PRO' | 'DOCS';
export type FlowState = 'IDLE' | 'CLAIMED' | 'SUBMITTING' | 'PAID';

export interface UserState {
    username: string;
    isPro: boolean;
    isSessionActive: boolean;
}

export interface TaskRailProps {
    demoTaskState: FlowState;
    isPro: boolean;
    onClaim: () => void;
    onSubmit: () => Promise<void>;
}
