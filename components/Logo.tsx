export function Logo({ className = "text-xl" }: { className?: string }) {
    return (
        <div className={`flex items-center gap-2 font-bold tracking-tighter ${className}`}>
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent mix-blend-overlay"></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-black relative z-10">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <path d="m9 12 2 2 4-4" />
                </svg>
            </div>
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                TaskRail
            </span>
        </div>
    );
}
