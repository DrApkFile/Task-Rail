import { useState, useEffect, useRef } from 'react';
import { ViewType, FlowState } from '../lib/types';

export function useAppState(isConnected: boolean) {
    const [activeView, setActiveView] = useState<ViewType>('HOME');
    const [username, setUsername] = useState<string>('LazyGenius');
    const [isPro, setIsPro] = useState<boolean>(false);
    const [isSessionActive, setIsSessionActive] = useState<boolean>(false);
    const [showSessionPrompt, setShowSessionPrompt] = useState<boolean>(false);
    const [hasDoneFirstTask, setHasDoneFirstTask] = useState<boolean>(false);
    const [taskState, setTaskState] = useState<FlowState>('IDLE');

    const isSessionActiveRef = useRef(isSessionActive);

    useEffect(() => {
        isSessionActiveRef.current = isSessionActive;
    }, [isSessionActive]);

    // Persistence
    useEffect(() => {
        const savedUsername = localStorage.getItem('tr_username');
        const savedIsPro = localStorage.getItem('tr_isPro') === 'true';
        const savedIsSessionActive = localStorage.getItem('tr_isSessionActive') === 'true';

        if (savedUsername) setUsername(savedUsername);
        if (savedIsPro) setIsPro(savedIsPro);
        if (savedIsSessionActive) setIsSessionActive(savedIsSessionActive);
    }, []);

    useEffect(() => {
        if (isConnected) {
            localStorage.setItem('tr_username', username);
            localStorage.setItem('tr_isPro', isPro.toString());
            localStorage.setItem('tr_isSessionActive', isSessionActive.toString());
        }
    }, [username, isPro, isSessionActive, isConnected]);

    // Auto-Reset
    useEffect(() => {
        if (!isConnected) {
            setTaskState('IDLE');
            setActiveView('HOME');
            setIsPro(false);
            setIsSessionActive(false);
            setShowSessionPrompt(false);
            localStorage.removeItem('tr_isPro');
            localStorage.removeItem('tr_isSessionActive');
        }
    }, [isConnected]);

    return {
        activeView, setActiveView,
        username, setUsername,
        isPro, setIsPro,
        isSessionActive, setIsSessionActive,
        isSessionActiveRef,
        showSessionPrompt, setShowSessionPrompt,
        hasDoneFirstTask, setHasDoneFirstTask,
        taskState, setTaskState
    };
}
