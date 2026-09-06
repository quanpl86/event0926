import { Bot, Gamepad2, Globe2, Rocket, Sparkles } from "lucide-react";

export function WebsitePreview({ name, projectName }: { name: string; projectName: string }) {
  const projects = [
    { icon: Bot, name: projectName || "Smart Robot" },
    { icon: Gamepad2, name: "Mini Game" },
    { icon: Globe2, name: "Digital World" }
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3 text-[10px] font-extrabold tracking-[.12em] text-slate-500">
        <span>{(name || "MINH").toUpperCase()} / CREATOR</span>
        <span>PROJECTS · JOURNEY</span>
      </div>
      <div className="bg-tek-50 px-5 py-8 text-center">
        <div className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-2xl bg-white text-tek-600 shadow-card"><Rocket className="h-6 w-6" /></div>
        <p className="text-[10px] font-extrabold tracking-[.18em] text-tek-600">YOUNG TECHNOLOGY CREATOR</p>
        <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-ink">Xin chào, mình là {name || "Minh"}!</h3>
        <p className="mt-2 text-sm text-slate-600">“Em thích tạo sản phẩm giúp cuộc sống tốt hơn.”</p>
      </div>
      <div className="grid grid-cols-3 gap-2 p-3">
        {projects.map(({ icon: ProjectIcon, name: project }) => (
          <div key={project} className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center">
            <ProjectIcon className="mx-auto h-5 w-5 text-tek-600" />
            <p className="mt-2 text-[10px] font-bold text-slate-700">{project}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 border-t border-slate-100 px-5 py-3 text-[10px] font-bold text-slate-500"><Sparkles className="h-4 w-4 text-amber-400" /> Website sẽ lớn lên cùng mỗi dự án của con.</div>
    </div>
  );
}
