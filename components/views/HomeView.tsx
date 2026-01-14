import { CheckCircle2, DollarSign, Wallet, Sparkles, Zap, Globe } from 'lucide-react';

export function HomeView({ bonusAmount, username }: { bonusAmount: number, username: string }) {
    const date = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    return (
        <div className="space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white leading-tight">Welcome back, {username || 'User'}</h2>
                    <p className="text-white/60 mt-1 text-sm lg:text-base">{date}</p>
                </div>
                <div className="flex items-center gap-2 px-3 lg:px-4 py-1.5 lg:py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-xs lg:text-sm font-semibold border border-emerald-500/20">
                    <Globe size={14} className="animate-pulse" />
                    Network Status: Online
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                <StatCard title="Tasks Completed" value={bonusAmount > 0 ? "13" : "12"} icon={<CheckCircle2 className="text-emerald-400" />} />
                <StatCard title="Total Earned" value={`$${(1240 + bonusAmount).toFixed(2)}`} icon={<DollarSign className="text-emerald-400" />} />
                <StatCard title="Wallet Balance" value={`$${(100 + bonusAmount).toFixed(2)}`} icon={<Wallet className="text-emerald-400" />} isHighlight />
            </div>

            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-4 lg:p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3 lg:space-y-4">
                    {bonusAmount > 0 && (
                        <ActivityItem action="Task Reward: X Post" amount="+$10.00" date="Just now" status="Completed" isNew icon={<Sparkles size={16} />} />
                    )}
                    <ActivityItem action="Task Payout" amount="+$50.00" date="2 hours ago" status="Completed" icon={<Zap size={16} />} />
                    <ActivityItem action="Task Payout" amount="+$120.00" date="Yesterday" status="Completed" icon={<Zap size={16} />} />
                    <ActivityItem action="Task Payout" amount="+$15.00" date="Yesterday" status="Completed" icon={<Zap size={16} />} />
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, isHighlight }: { title: string, value: string, icon: React.ReactNode, isHighlight?: boolean }) {
    return (
        <div className={`p-4 lg:p-6 rounded-2xl border ${isHighlight ? 'bg-gradient-to-br from-emerald-900/40 to-black border-emerald-500/30' : 'bg-zinc-900/50 border-white/5'}`}>
            <div className="flex items-center gap-3 mb-2 lg:mb-3">
                <span className="p-1.5 lg:p-2 bg-white/5 rounded-lg">{icon}</span>
                <span className="text-white/60 text-[10px] lg:text-sm font-medium uppercase tracking-wide">{title}</span>
            </div>
            <div className="text-2xl lg:text-4xl font-bold text-white tracking-tight">{value}</div>
        </div>
    );
}

function ActivityItem({ action, amount, date, status, isNew, icon }: { action: string, amount: string, date: string, status: string, isNew?: boolean, icon: React.ReactNode }) {
    return (
        <div className={`flex items-center justify-between p-3 lg:p-4 bg-black/20 rounded-xl hover:bg-white/5 transition-colors border ${isNew ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-transparent'}`}>
            <div className="flex items-center gap-3">
                <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isNew ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-white/60'}`}>
                    {icon}
                </div>
                <div className="min-w-0">
                    <p className="font-semibold text-white text-sm lg:text-base truncate">{action}</p>
                    <p className="text-[10px] lg:text-xs text-white/40">{date}</p>
                </div>
            </div>
            <div className="text-right flex-shrink-0">
                <p className={`font-bold text-sm lg:text-base ${isNew ? 'text-emerald-400' : 'text-white'}`}>{amount}</p>
                <p className="text-[10px] lg:text-xs text-white/40">{status}</p>
            </div>
        </div>
    );
}
