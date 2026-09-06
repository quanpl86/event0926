import { Check, Flag, Lightbulb, Rocket, Sparkles, Users, Wrench } from "lucide-react";

const phases = [
  { label: "Bắt đầu", icon: Rocket },
  { label: "Sở thích", icon: Lightbulb },
  { label: "Cách con tạo", icon: Wrench },
  { label: "Dự án tương lai", icon: Sparkles },
  { label: "Ba mẹ đồng hành", icon: Users },
  { label: "Creator Profile", icon: Flag }
];

export function JourneyProgress({ activePhase }: { activePhase: string }) {
  const active = Math.max(0, phases.findIndex(phase => phase.label === activePhase));
  return (
    <nav aria-label="Tiến trình hành trình" className="space-y-1">
      <p className="mb-5 text-[10px] font-extrabold uppercase tracking-[.18em] text-slate-400">Hành trình của con</p>
      {phases.map((phase, index) => {
        const CurrentIcon = phase.icon;
        const done = index < active;
        const current = index === active;
        return (
          <div key={phase.label} className="relative flex min-h-14 items-center gap-3">
            {index < phases.length - 1 && <span className="absolute left-[17px] top-[38px] h-9 border-l border-dashed border-slate-200" />}
            <span className={`relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border ${done ? "border-tek-500 bg-tek-500 text-white" : current ? "border-tek-300 bg-tek-50 text-tek-600 ring-4 ring-tek-50" : "border-slate-200 bg-white text-slate-400"}`}>
              {done ? <Check className="h-4 w-4" strokeWidth={3} /> : <CurrentIcon className="h-4 w-4" />}
            </span>
            <span className={`text-xs font-bold ${current ? "text-tek-700" : done ? "text-slate-700" : "text-slate-400"}`}>{phase.label}</span>
          </div>
        );
      })}
    </nav>
  );
}
