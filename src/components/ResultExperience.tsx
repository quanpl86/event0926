"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight, Bot, Check, Clipboard, Clock3, ExternalLink, Flag, Heart, ImagePlus, MessageCircleMore, Palette, Pencil,
  Rocket, RotateCcw, Sparkles, Star, Target, WandSparkles
} from "lucide-react";
import type { JourneyAnswers } from "@/types/journey";
import type { DiscoveryProfile } from "@/lib/profile";
import { createPrompt } from "@/lib/profile";
import { WebsitePreview } from "./WebsitePreview";
import { workshopStages } from "./JourneyProgress";

type CommonProps = {
  answers: JourneyAnswers;
  setAnswers: React.Dispatch<React.SetStateAction<JourneyAnswers>>;
  profile: DiscoveryProfile;
};

export function ProfileResult({ answers, setAnswers, profile }: CommonProps) {
  const candidates = profile.traitCandidates;
  const toggleTrait = (trait: string) => setAnswers(previous => {
    const exists = previous.confirmedTraits.includes(trait);
    const next = exists ? previous.confirmedTraits.filter(item => item !== trait) : [...previous.confirmedTraits, trait].slice(-4);
    return { ...previous, confirmedTraits: next };
  });
  return <div className="space-y-6">
    <div className="grid gap-5 rounded-2xl border border-tek-200 bg-tek-50 p-5 sm:grid-cols-[140px_1fr] sm:p-6">
      <div className="grid aspect-square place-items-center rounded-[32px] bg-tek-500 text-white"><WandSparkles className="h-16 w-16" /></div>
      <div><p className="text-[10px] font-extrabold uppercase tracking-[.17em] text-tek-700">Future Buddy hình dung chân dung của con là</p><h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{answers.name || "Con"} — {profile.archetype}</h2><p className="mt-3 text-sm font-medium leading-6 text-slate-600">{profile.summary}</p><p className="mt-3 rounded-xl bg-white px-4 py-3 text-sm font-bold leading-6 text-tek-800">“Con muốn trở thành {profile.futureSelf}.”</p></div>
    </div>

    <div className="rounded-2xl border border-slate-200 p-5">
      <p className="text-sm font-extrabold text-ink">Những điều con đang hứng thú</p>
      <div className="mt-3 flex flex-wrap gap-2">{profile.interestLabels.map(item => <span key={item} className="rounded-full bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800">{item}</span>)}</div>
      <p className="mt-5 text-sm font-extrabold text-ink">Điều nào giống con nhất?</p>
      <p className="mt-1 text-xs leading-5 text-slate-500">Future Buddy gợi ý từ các lựa chọn trước đó. Con hãy chọn 2–4 nét thấy đúng với mình hôm nay.</p>
      <div className="mt-3 flex flex-wrap gap-2">{candidates.map(trait => {
        const active = answers.confirmedTraits.includes(trait);
        return <button type="button" key={trait} onClick={() => toggleTrait(trait)} className={`focus-ring inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold transition ${active ? "border-tek-500 bg-tek-50 text-tek-800" : "border-slate-200 bg-white text-slate-600"}`}>{active && <Check className="h-3.5 w-3.5" />}{trait}</button>;
      })}</div>
      <p className="mt-3 text-[11px] font-semibold text-slate-400">Đã xác nhận {answers.confirmedTraits.length}/4 nét chân dung</p>
    </div>

    <div className="rounded-2xl border border-slate-200 p-5">
      <p className="text-sm font-extrabold text-ink">Ai sẽ thiết kế nhân vật Future Me?</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <button type="button" onClick={() => setAnswers(a => ({ ...a, portraitMode: "buddy" }))} data-selected={answers.portraitMode === "buddy"} className="choice-card focus-ring flex items-start gap-3 rounded-2xl border border-slate-200 p-4 text-left"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-tek-50 text-tek-600"><Bot className="h-5 w-5" /></span><span><strong className="block text-sm text-ink">Future Buddy gợi ý</strong><span className="mt-1 block text-xs leading-5 text-slate-500">Dựa trên toàn bộ hành trình vừa hoàn thành.</span></span></button>
        <button type="button" onClick={() => setAnswers(a => ({ ...a, portraitMode: "self" }))} data-selected={answers.portraitMode === "self"} className="choice-card focus-ring flex items-start gap-3 rounded-2xl border border-slate-200 p-4 text-left"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-600"><Pencil className="h-5 w-5" /></span><span><strong className="block text-sm text-ink">Con tự vẽ chân dung</strong><span className="mt-1 block text-xs leading-5 text-slate-500">Con chọn hình tượng, màu và vật phẩm của riêng mình.</span></span></button>
      </div>

      {answers.portraitMode === "buddy" ? <div className="mt-4 rounded-2xl bg-slate-50 p-4"><div className="flex items-center gap-2 text-xs font-extrabold text-tek-700"><Sparkles className="h-4 w-4" /> Character brief được tạo từ hành trình</div><p className="mt-2 text-xs leading-5 text-slate-600">Vì con chọn <strong>{profile.interestLabels[0]?.toLocaleLowerCase("vi")}</strong> và muốn tạo <strong>{profile.projects[0].title.toLocaleLowerCase("vi")}</strong>, Future Buddy gợi ý: {profile.characterBrief.style} · {profile.characterBrief.palette} · {profile.characterBrief.signatureGear}.</p></div> : <CharacterBuilder answers={answers} setAnswers={setAnswers} profile={profile} />}
    </div>

    <div className="rounded-2xl border border-violet-100 bg-violet-50 p-5"><p className="flex items-center gap-2 text-sm font-extrabold text-violet-900"><Heart className="h-4 w-4" /> Góc nhìn từ ba mẹ</p><p className="mt-2 text-sm leading-6 text-violet-800">{profile.parentSummary}</p>{profile.familyReflection.moment && <p className="mt-3 border-t border-violet-200 pt-3 text-xs italic leading-5 text-violet-700">“{profile.familyReflection.moment}”</p>}</div>
    <p className="text-center text-[11px] leading-5 text-slate-400">Đây là mô tả từ lựa chọn của con và quan sát của ba mẹ — không phải chẩn đoán năng lực hay dự đoán nghề nghiệp.</p>
  </div>;
}

function CharacterBuilder({ answers, setAnswers, profile }: CommonProps) {
  const fields = [
    { key: "characterStyle", label: "Phong cách nhân vật", icon: Palette, options: profile.portraitSuggestions.styles },
    { key: "favoriteColor", label: "Màu chủ đạo", icon: Sparkles, options: profile.portraitSuggestions.colors },
    { key: "signatureGear", label: "Vật phẩm đặc trưng", icon: ImagePlus, options: profile.portraitSuggestions.gear }
  ] as const;
  return <div className="mt-4 grid gap-4 rounded-2xl bg-slate-50 p-4">
    <div><p className="text-xs font-extrabold text-slate-700">Từ dự án con chọn, Future Buddy gợi ý con có thể là…</p><div className="mt-2 flex flex-wrap gap-2">{profile.portraitSuggestions.futureSelf.map(suggestion => <button type="button" key={suggestion} onClick={() => setAnswers(a => ({...a, futureSelf: suggestion}))} className={`focus-ring rounded-full border px-3 py-2 text-left text-[11px] font-bold ${answers.futureSelf === suggestion ? "border-tek-500 bg-tek-50 text-tek-800" : "border-slate-200 bg-white text-slate-600"}`}>{suggestion}</button>)}</div></div>
    <label className="grid gap-2 text-xs font-extrabold text-slate-700">Hoặc con tự kể theo cách của mình<input value={answers.futureSelf} onChange={event => setAnswers(a => ({ ...a, futureSelf: event.target.value }))} placeholder="Ví dụ: người tạo robot giúp mọi người" className="focus-ring rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none" /></label>
    <div className="grid gap-3 sm:grid-cols-3">{fields.map(field => <label key={field.key} className="grid gap-2 text-xs font-extrabold text-slate-700"><span className="flex items-center gap-2"><field.icon className="h-4 w-4 text-tek-600" />{field.label}</span><select value={answers[field.key]} onChange={event => setAnswers(a => ({ ...a, [field.key]: event.target.value }))} className="focus-ring min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-semibold outline-none"><option value="">Chọn một kiểu</option>{field.options.map(option => <option key={option}>{option}</option>)}</select></label>)}</div>
    <p className="text-[11px] leading-5 text-slate-500">AI sẽ tạo một nhân vật minh họa mới theo mô tả này — không dùng ảnh thật hoặc cố tái tạo khuôn mặt của con.</p>
  </div>;
}

export function ProjectsJourneyResult({ profile }: Pick<CommonProps, "profile">) {
  return <div className="space-y-7">
    <section><div className="flex items-end justify-between gap-4"><div><p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-tek-600">Future Project Showcase</p><h2 className="mt-2 text-xl font-extrabold text-ink">Những dự án con có thể thử</h2></div><span className="hidden text-xs font-semibold text-slate-400 sm:block">Chọn trải nghiệm, chưa cần chọn nghề</span></div><div className="mt-4 grid gap-4 sm:grid-cols-2">{profile.projects.map(project => <article key={project.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white"><div className="relative h-36"><Image src={project.image} alt={project.title} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" /></div><div className="p-4"><h3 className="text-sm font-extrabold text-ink">{project.title}</h3><p className="mt-2 text-xs leading-5 text-slate-500">{project.description}</p><div className="mt-3 flex flex-wrap gap-1.5">{project.actions.map(action => <span key={action} className="rounded-full bg-tek-50 px-2.5 py-1.5 text-[10px] font-bold text-tek-700">{action}</span>)}</div></div></article>)}</div></section>
    <section><p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-tek-600">Exploration Journey</p><h2 className="mt-2 text-xl font-extrabold text-ink">Những hướng con nên tiếp tục khám phá</h2><div className="mt-4 grid gap-3 sm:grid-cols-3">{[{label:"Hướng nổi bật",value:profile.directions.featured,icon:Star,tone:"border-amber-200 bg-amber-50 text-amber-800"},{label:"Đáng thử thêm",value:profile.directions.tryNext,icon:Target,tone:"border-tek-200 bg-tek-50 text-tek-800"},{label:"Cần thêm trải nghiệm",value:profile.directions.exploreMore,icon:Flag,tone:"border-sky-200 bg-sky-50 text-sky-800"}].map(item => <div key={item.label} className={`rounded-2xl border p-4 ${item.tone}`}><item.icon className="h-5 w-5" /><p className="mt-3 text-[10px] font-extrabold uppercase tracking-[.1em] opacity-70">{item.label}</p><p className="mt-2 text-sm font-extrabold leading-5">{item.value}</p></div>)}</div></section>
    <section><p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-tek-600">Bây giờ → Tiếp theo → Sau đó</p><div className="mt-4 grid gap-3 sm:grid-cols-3">{profile.roadmap.map((item,index) => <div key={item.stage} className="relative rounded-2xl border border-slate-200 p-4"><span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-xs font-extrabold text-slate-600">{index+1}</span><p className="mt-4 text-[10px] font-extrabold uppercase tracking-[.1em] text-tek-600">{item.stage}</p><h3 className="mt-1 text-sm font-extrabold text-ink">{item.title}</h3><p className="mt-2 text-xs leading-5 text-slate-500">{item.body}</p></div>)}</div><div className="mt-3 flex items-start gap-3 rounded-xl bg-slate-50 p-4"><RotateCcw className="mt-0.5 h-4 w-4 shrink-0 text-tek-600" /><p className="text-xs leading-5 text-slate-600"><strong>Checkpoint:</strong> Con vẫn rất thích · Con muốn học thêm · Con muốn thử thêm · Con muốn khám phá hướng khác.</p></div></section>
    <section className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-slate-400">Có thể nối nhẹ với trải nghiệm TEKY</p><div className="mt-3 flex flex-wrap gap-2">{profile.tekPrograms.map(program => <span key={program} className="rounded-full border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600">{program}</span>)}</div></section>
  </div>;
}

export function FutureMeResult({ answers, setAnswers, profile, saveState }: CommonProps & { saveState: string }) {
  const [copied, setCopied] = useState(false);
  const prompt = createPrompt(answers);
  const copyPrompt = async () => { await navigator.clipboard.writeText(prompt); setCopied(true); window.setTimeout(() => setCopied(false), 2400); };
  return <div className="space-y-5">
    <div className="rounded-2xl border border-tek-200 bg-tek-50 p-5 text-center"><span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white text-tek-600 shadow-card"><Rocket className="h-6 w-6" /></span><h2 className="mt-3 text-xl font-extrabold text-ink">Cả nhà đã hoàn thành hành trình khám phá!</h2><p className="mt-2 text-sm text-slate-600">Prompt bên dưới đã chứa chân dung, character brief, dự án và roadmap của {answers.name || "con"}.</p></div>
    <WebsitePreview name={answers.name} projectName={answers.projectName} />
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#101716] text-slate-100"><div className="flex items-center justify-between border-b border-white/10 px-4 py-3"><div><p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-[#78dfca]">Website Build Prompt</p><p className="mt-1 text-xs font-bold">Sẵn sàng cho Google AI Studio</p></div><span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold">{prompt.length.toLocaleString("vi-VN")} ký tự</span></div><pre className="max-h-72 overflow-auto whitespace-pre-wrap p-4 text-[11px] leading-5 text-slate-300">{prompt}</pre></div>
    <div className="grid gap-3 sm:grid-cols-2"><button type="button" onClick={copyPrompt} className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-tek-500 px-5 py-4 text-sm font-extrabold text-white hover:bg-tek-600">{copied ? <Check className="h-5 w-5" /> : <Clipboard className="h-5 w-5" />}{copied ? "Đã sao chép prompt" : "Sao chép nội dung tạo website"}</button><a href="https://aistudio.google.com/app/apps" target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm font-extrabold text-ink hover:bg-slate-50">Mở Google AI Studio <ExternalLink className="h-4 w-4" /></a></div>
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4"><p className="text-xs font-extrabold text-amber-900">Bước tiếp theo cho cả nhà</p><p className="mt-1 text-xs leading-5 text-amber-800">Sao chép prompt → mở Google AI Studio → chọn New app → dán prompt vào ô “Describe an app” để tạo website Future Me.</p></div>
    <WorkshopFinishGuide profile={profile} />
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"><input type="checkbox" checked={answers.consent} onChange={event => setAnswers(a => ({ ...a, consent: event.target.checked }))} className="mt-1 h-4 w-4 accent-teal-600" /><span><strong className="block text-sm text-slate-700">Ba mẹ đồng ý lưu structured discovery data trên Supabase</strong><span className="mt-1 block text-xs leading-5 text-slate-500">Bao gồm lựa chọn, chân dung đã xác nhận, character brief và hướng khám phá. Nếu chưa đồng ý, dữ liệu chỉ lưu trên thiết bị.</span></span></label>
    {saveState !== "idle" && saveState !== "saving" && <div className="flex items-center gap-3 rounded-xl border border-tek-200 bg-tek-50 p-4 text-sm font-bold text-tek-800"><Check className="h-5 w-5" />{saveState === "saved" ? "Structured discovery data đã được lưu an toàn." : "Kết quả đã được lưu trên thiết bị."}</div>}
  </div>;
}

function WorkshopFinishGuide({ profile }: Pick<CommonProps, "profile">) {
  const editPrompts = [
    ["Đổi phong cách", `Hãy đổi website sang phong cách ${profile.characterBrief.style}, dùng ${profile.characterBrief.palette}.`],
    ["Sửa điều chưa giống con", `Hãy nhấn mạnh rằng con thích ${profile.interestLabels[0]?.toLocaleLowerCase("vi")} và ${profile.strengthLabels[0]?.toLocaleLowerCase("vi")}.`],
    ["Đổi Future Project", `Hãy đưa dự án ${profile.projects[0].title} lên đầu và làm phần này nổi bật hơn.`],
    ["Đổi thứ tự hành trình", `Con muốn thử ${profile.directions.featured} trước. Hãy đưa hướng này lên chặng đầu.`]
  ];
  return <section className="space-y-5 rounded-[24px] border border-slate-200 bg-white p-5 sm:p-6">
    <div><p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-tek-600">Timeline hoạt động 60 phút</p><h3 className="mt-2 text-xl font-extrabold text-ink">Tạo xong mới là phiên bản 1</h3><p className="mt-2 text-xs leading-5 text-slate-500">Giáo viên điều phối theo mốc chung; gia đình không cần đếm ngược từng giây.</p></div>
    <div className="grid gap-2 sm:grid-cols-3">{workshopStages.map((stage,index)=><div key={stage.label} className={`rounded-xl border p-3 ${index === 3 ? "border-tek-300 bg-tek-50" : "border-slate-200 bg-slate-50"}`}><p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[.08em] text-slate-500"><Clock3 className="h-3.5 w-3.5" /> {stage.window}</p><p className="mt-1 text-xs font-extrabold text-ink">{index+1}. {stage.label}</p></div>)}</div>
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="rounded-2xl border border-tek-200 bg-tek-50 p-4"><p className="text-[10px] font-extrabold uppercase tracking-[.12em] text-tek-700">30–44' · Tạo website</p><p className="mt-2 text-sm font-extrabold text-ink">Copy → Paste → Build → Preview</p><p className="mt-2 text-xs leading-5 text-slate-600">Trong lúc AI tạo, cả nhà đoán phần nào sẽ giống con nhất: chân dung, sở thích, dự án hay hành trình?</p></div>
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4"><p className="text-[10px] font-extrabold uppercase tracking-[.12em] text-amber-700">44–53' · Hiệu chỉnh</p><p className="mt-2 text-sm font-extrabold text-ink">Biến nó thành website của con</p><p className="mt-2 text-xs leading-5 text-slate-600">Cả nhà chọn ít nhất một điều muốn thay đổi rồi dán câu chỉnh sửa vào AI Studio.</p></div>
      <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4"><p className="text-[10px] font-extrabold uppercase tracking-[.12em] text-violet-700">53–60' · Chia sẻ</p><p className="mt-2 text-sm font-extrabold text-ink">Cùng nhìn lại và chọn Next Mission</p><p className="mt-2 text-xs leading-5 text-slate-600">Con kể phần thích nhất; ba mẹ kể điều hiểu thêm; cả nhà chọn một trải nghiệm muốn thử tiếp.</p></div>
    </div>
    <div><p className="flex items-center gap-2 text-sm font-extrabold text-ink"><Pencil className="h-4 w-4 text-tek-600" /> Chọn một câu để tạo Version 2</p><div className="mt-3 grid gap-2 sm:grid-cols-2">{editPrompts.map(([title,text])=><div key={title} className="rounded-xl border border-slate-200 p-3"><p className="text-xs font-extrabold text-ink">{title}</p><p className="mt-1 text-[11px] leading-5 text-slate-500">“{text}”</p></div>)}</div></div>
    <div className="grid gap-3 rounded-2xl bg-[#0c6c62] p-5 text-white sm:grid-cols-3"><p className="text-xs leading-5"><strong className="mb-1 flex items-center gap-1.5"><Sparkles className="h-4 w-4" /> Con</strong>Phần nào trên website con thích nhất?</p><p className="text-xs leading-5"><strong className="mb-1 flex items-center gap-1.5"><Heart className="h-4 w-4" /> Ba mẹ</strong>Hôm nay ba mẹ hiểu thêm điều gì về con?</p><p className="text-xs leading-5"><strong className="mb-1 flex items-center gap-1.5"><MessageCircleMore className="h-4 w-4" /> Cả nhà</strong>Điều nào con muốn thử tiếp theo?</p></div>
    <p className="text-center text-xs font-bold leading-5 text-slate-500">Sở thích hôm nay không quyết định tương lai. Mỗi trải nghiệm mới sẽ giúp con hiểu mình hơn.</p>
  </section>;
}
