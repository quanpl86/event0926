import { Check, Flag, HeartHandshake, Lightbulb, MonitorUp, Sparkles, Users } from "lucide-react";
import { fillVoice, isParentAudience } from "@/lib/age";

const workshopStageDefs = [
  { label: "Làm quen", duration: 8, window: "00–08'", icon: Users },
  { label: "Hiểu về {you}", duration: 14, window: "08–22'", icon: Lightbulb },
  { label: "Chân dung của {you}", duration: 5, window: "22–27'", icon: Sparkles },
  { label: "Làm website", duration: 17, window: "27–44'", icon: MonitorUp },
  { label: "Chỉnh cho giống {you}", duration: 9, window: "44–53'", icon: HeartHandshake },
  { label: "Khoe với cả nhà", duration: 7, window: "53–60'", icon: Flag }
];

export function workshopStages(gradeBand = "", parentAudience = false) {
  return workshopStageDefs.map(stage => {
    const label = parentAudience
      ? stage.label.replaceAll("{You}", "{Child}").replaceAll("{you}", "{child}")
      : stage.label;
    return { ...stage, label: fillVoice(label, gradeBand) };
  });
}

export function getWorkshopStage(stepId: string) {
  if (["identity", "interest", "strength", "creation-style", "problem-strategy", "impact", "project", "handoff", "parent", "parent-support", "family-mirror"].includes(stepId)) return 1;
  if (["profile", "pathway"].includes(stepId)) return 2;
  return 3;
}

export function JourneyProgress({ activeStepId, gradeBand }: { activeStepId: string; gradeBand: string }) {
  const active = getWorkshopStage(activeStepId);
  const stages = workshopStages(gradeBand, isParentAudience(activeStepId));
  return (
    <nav aria-label="Hành trình hôm nay" className="space-y-1">
      <p className="mb-1 text-[10px] font-extrabold uppercase tracking-[.18em] text-slate-400">Hành trình hôm nay</p>
      <p className="mb-5 text-[11px] font-semibold leading-5 text-slate-500">Không cần vội. Cả nhà đi cùng nhau, từng bước một.</p>
      {stages.map((stage, index) => {
        const CurrentIcon = stage.icon;
        const done = index < active;
        const current = index === active;
        return (
          <div key={stage.label} className="relative flex min-h-14 items-center gap-3">
            {index < stages.length - 1 && <span className="absolute left-[17px] top-[38px] h-9 border-l border-dashed border-slate-200" />}
            <span className={`relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border ${done ? "border-tek-500 bg-tek-500 text-white" : current ? "border-tek-300 bg-tek-50 text-tek-600 ring-4 ring-tek-50" : "border-slate-200 bg-white text-slate-400"}`}>
              {done ? <Check className="h-4 w-4" strokeWidth={3} /> : <CurrentIcon className="h-4 w-4" />}
            </span>
            <span className="min-w-0"><span className={`block text-[11px] font-extrabold leading-4 ${current ? "text-tek-700" : done ? "text-slate-700" : "text-slate-400"}`}>{stage.label}</span><span className="text-[10px] font-semibold text-slate-400">{stage.window} · {stage.duration}'</span></span>
          </div>
        );
      })}
    </nav>
  );
}
