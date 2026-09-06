import { Bot, Sparkles } from "lucide-react";

export function FutureBuddy({ message, compact = false }: { message: string; compact?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${compact ? "max-w-md" : ""}`}>
      <div className="buddy-float relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-tek-200 bg-white text-tek-600 shadow-card">
        <Bot className="h-7 w-7" strokeWidth={2.2} />
        <Sparkles className="absolute -right-1 -top-1 h-4 w-4 text-amber-400" fill="currentColor" />
      </div>
      <div>
        <p className="mb-0.5 text-[10px] font-extrabold uppercase tracking-[.17em] text-tek-600">Future Buddy</p>
        <p className="text-xs font-semibold leading-5 text-slate-700 sm:text-sm">{message}</p>
      </div>
    </div>
  );
}
