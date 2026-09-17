import { Check, Compass, Heart, Lightbulb, MonitorUp, Palette, Rocket, Sparkles } from "lucide-react";
import journeyData from "@/data/journey.json";
import type { JourneyStep } from "@/types/journey";

const steps = journeyData as JourneyStep[];

export const sevenStagesPrimary = [
  { stageIndex: 1, label: "Làm quen", duration: 3, icon: Sparkles },
  { stageIndex: 2, label: "Con thích điều gì?", duration: 8, icon: Lightbulb },
  { stageIndex: 3, label: "Sản phẩm trong mơ", duration: 7, icon: Palette },
  { stageIndex: 4, label: "Con đã biết gì rồi?", duration: 7, icon: Compass },
  { stageIndex: 5, label: "Ba mẹ cùng chia sẻ", duration: 8, icon: Heart },
  { stageIndex: 6, label: "Hành trình của con", duration: 10, icon: Rocket },
  { stageIndex: 7, label: "Tạo góc riêng của con", duration: 17, icon: MonitorUp }
];

export const sevenStagesSecondary = [
  { stageIndex: 1, label: "Khởi tạo hồ sơ", duration: 3, icon: Sparkles },
  { stageIndex: 2, label: "Khám phá hướng công nghệ", duration: 8, icon: Lightbulb },
  { stageIndex: 3, label: "Lên ý tưởng dự án", duration: 7, icon: Palette },
  { stageIndex: 4, label: "Tìm hiểu điểm xuất phát", duration: 7, icon: Compass },
  { stageIndex: 5, label: "Gia đình bổ sung thông tin", duration: 8, icon: Heart },
  { stageIndex: 6, label: "Hồ sơ và lộ trình", duration: 10, icon: Rocket },
  { stageIndex: 7, label: "Tạo website cá nhân", duration: 17, icon: MonitorUp }
];

export function getStageForStep(stepId: string): number {
  const currentStep = steps.find(s => s.id === stepId);
  return currentStep ? currentStep.stageIndex : 1;
}

export function JourneyProgress({
  activeStepId,
  isPrimary = true
}: {
  activeStepId: string;
  isPrimary?: boolean;
}) {
  const activeStageIndex = getStageForStep(activeStepId);
  const stages = isPrimary ? sevenStagesPrimary : sevenStagesSecondary;

  return (
    <nav aria-label="7 Giai đoạn khám phá" className="space-y-1">
      <p className="mb-1 text-[10px] font-extrabold uppercase tracking-[.18em] text-slate-400">
        7 Chặng Khám Phá
      </p>
      <p className="mb-4 text-[11px] font-semibold leading-5 text-slate-500">
        {isPrimary ? "Cùng Kitten Bot mở từng cánh cửa" : "Tiến trình xây dựng hồ sơ cá nhân"}
      </p>

      {stages.map((stage, index) => {
        const CurrentIcon = stage.icon;
        const done = stage.stageIndex < activeStageIndex;
        const current = stage.stageIndex === activeStageIndex;

        return (
          <div key={stage.label} className="relative flex min-h-12 items-center gap-3">
            {index < stages.length - 1 && (
              <span className="absolute left-[17px] top-[34px] h-7 border-l border-dashed border-slate-200" />
            )}
            <span
              className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition ${
                done
                  ? "border-tek-500 bg-tek-500 text-white"
                  : current
                  ? "border-tek-400 bg-tek-50 text-tek-600 ring-4 ring-tek-50"
                  : "border-slate-200 bg-white text-slate-400"
              }`}
            >
              {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <CurrentIcon className="h-3.5 w-3.5" />}
            </span>
            <span className="min-w-0">
              <span
                className={`block text-[11px] font-extrabold leading-4 ${
                  current ? "text-tek-700" : done ? "text-slate-700" : "text-slate-400"
                }`}
              >
                {stage.stageIndex}. {stage.label}
              </span>
              <span className="text-[10px] font-semibold text-slate-400">
                {stage.duration} phút
              </span>
            </span>
          </div>
        );
      })}
    </nav>
  );
}
