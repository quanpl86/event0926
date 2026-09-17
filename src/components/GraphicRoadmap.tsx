"use client";

import { useState } from "react";
import { Check, Sparkles, Rocket, Cpu, Palette, Flag, RotateCcw } from "lucide-react";

export type RoadmapProject = {
  stage: string;
  duration: string;
  title: string;
  focus: string;
  skills: string[];
  deliverable: string;
  isDreamProject?: boolean;
};

type GraphicRoadmapProps = {
  projects: RoadmapProject[];
  isPrimary?: boolean;
  hoursPerWeek?: number | null;
};

const icons = [Sparkles, Cpu, Palette, Rocket];

export function GraphicRoadmap({ projects, isPrimary = true, hoursPerWeek }: GraphicRoadmapProps) {
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<string>("excited");

  const checkpoints = [
    { id: "excited", label: isPrimary ? "Con rất thích hướng này!" : "Hào hứng tiếp tục" },
    { id: "deeper", label: isPrimary ? "Con muốn thử thách khó hơn" : "Muốn học chuyên sâu" },
    { id: "pivot", label: isPrimary ? "Con muốn khám phá thêm hướng khác" : "Thử nghiệm bộ môn mới" }
  ];

  const pacingLabel = hoursPerWeek && hoursPerWeek > 0
    ? `Ước tính theo lịch ${hoursPerWeek} giờ/tuần của gia đình`
    : "Tiến độ linh hoạt theo nhịp của con (không gán tuần cố định)";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-tek-600">
            Lộ Trình 4 Chặng Khám Phá
          </p>
          <h3 className="mt-1 text-xl font-extrabold text-ink">
            {isPrimary ? "Bản đồ hành trình sáng tạo của con" : "Lộ trình phát triển năng lực công nghệ"}
          </h3>
        </div>
        <span className="rounded-full bg-tek-50 px-3 py-1.5 text-[11px] font-bold text-tek-700">
          {pacingLabel}
        </span>
      </div>

      {/* Graphic 4-station timeline */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {projects.map((project, index) => {
          const ProjectIcon = icons[index % icons.length];
          const isDream = project.isDreamProject || index === 3;
          return (
            <div
              key={project.stage || index}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md ${
                isDream ? "border-amber-300 ring-2 ring-amber-100" : "border-slate-200 hover:border-tek-300"
              }`}
            >
              {/* Top Accent bar */}
              <div
                className={`absolute left-0 top-0 h-1.5 w-full ${
                  isDream
                    ? "bg-gradient-to-r from-amber-400 to-tek-500"
                    : index === 0
                    ? "bg-tek-500"
                    : index === 1
                    ? "bg-amber-400"
                    : "bg-sky-500"
                }`}
              />

              <div>
                <div className="flex items-center justify-between">
                  <span className={`grid h-9 w-9 place-items-center rounded-xl text-tek-600 ${isDream ? "bg-amber-50 text-amber-600" : "bg-slate-50 group-hover:bg-tek-50"}`}>
                    <ProjectIcon className="h-5 w-5" />
                  </span>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold ${isDream ? "bg-amber-100 text-amber-900" : "bg-slate-100 text-slate-600"}`}>
                    {project.duration || `Chặng ${index + 1}`}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-1.5">
                  <p className="text-[10px] font-extrabold uppercase tracking-[.14em] text-tek-600">
                    {project.stage || `Chặng ${index + 1}`}
                  </p>
                  {isDream && (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-extrabold text-amber-800">
                      ★ Ước Mơ
                    </span>
                  )}
                </div>

                <h4 className="mt-1 text-sm font-extrabold text-ink">
                  {project.title}
                </h4>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {project.focus}
                </p>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-3">
                <p className="text-[10px] font-bold text-slate-400">Sản phẩm đầu ra:</p>
                <p className="mt-0.5 text-xs font-bold text-tek-800">
                  {project.deliverable}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {project.skills.map(skill => (
                    <span
                      key={skill}
                      className="rounded-md bg-slate-50 px-2 py-0.5 text-[9px] font-bold text-slate-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Family Checkpoint Selector */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-tek-50 text-tek-600">
              <Flag className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-extrabold text-ink">
                Trạm quan sát sau mỗi dự án
              </p>
              <p className="text-[11px] text-slate-400">
                Gia đình cùng con đánh giá cảm xúc để điều chỉnh hướng đi tiếp theo:
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {checkpoints.map(cp => (
              <button
                type="button"
                key={cp.id}
                onClick={() => setSelectedCheckpoint(cp.id)}
                className={`focus-ring inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition ${
                  selectedCheckpoint === cp.id
                    ? "border-tek-500 bg-tek-50 text-tek-800 shadow-xs"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {selectedCheckpoint === cp.id && <Check className="h-3.5 w-3.5" />}
                {cp.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
