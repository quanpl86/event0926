"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Check, Clipboard, Clock3, ExternalLink, Flag, Heart, ImagePlus, MessageCircleMore, Palette, Pencil,
  Rocket, RotateCcw, Sparkles, Star, Target
} from "lucide-react";
import type { JourneyAnswers } from "@/types/journey";
import type { DiscoveryProfile } from "@/lib/profile";
import { avatarFor } from "@/lib/avatars";
import { createPrompt } from "@/lib/profile";
import { BOT_NAME, KittenBotAvatar } from "./FutureBuddy";
import { AppSelect } from "./AppSelect";
import { WebsitePreview } from "./WebsitePreview";
import { workshopStages } from "./JourneyProgress";

type CommonProps = {
  answers: JourneyAnswers;
  setAnswers: React.Dispatch<React.SetStateAction<JourneyAnswers>>;
  profile: DiscoveryProfile;
};

export function ProfileResult({ answers, setAnswers, profile }: CommonProps) {
  const candidates = profile.traitCandidates;
  const avatar = avatarFor(answers.avatar);
  const toggleTrait = (trait: string) => setAnswers(previous => {
    const exists = previous.confirmedTraits.includes(trait);
    const next = exists ? previous.confirmedTraits.filter(item => item !== trait) : [...previous.confirmedTraits, trait].slice(-4);
    return { ...previous, confirmedTraits: next };
  });
  const parentFitNote = {
    very: `Hay quá — ba mẹ và ${profile.learner} đang nhìn thấy cùng một hướng.`,
    partly: "Cứ giữ những nét đúng, rồi thử thêm ở bước sau. Chân dung hôm nay không cần hoàn hảo.",
    "not-yet": "Không sao. Chân dung hôm nay chỉ là điểm xuất phát, chưa phải kết luận về con."
  } as const;
  return <div className="space-y-6">
    <div className="grid gap-5 rounded-2xl border border-tek-200 bg-tek-50 p-5 sm:grid-cols-[140px_1fr] sm:p-6">
      <div className="mx-auto grid h-28 w-28 place-items-center overflow-hidden rounded-[28px] bg-tek-50 sm:mx-0 sm:h-auto sm:w-full sm:aspect-square">
        <Image src={avatar.src} alt={avatar.label} width={160} height={160} className="h-full w-full object-contain p-2" priority unoptimized />
      </div>
      <div>
        <p className="text-[10px] font-extrabold uppercase tracking-[.17em] text-tek-700">{BOT_NAME} thấy {profile.learner} là</p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{answers.name || profile.Learner} — {profile.archetype}</h2>
        <p className="mt-3 text-sm font-medium leading-6 text-slate-600">{profile.summary}</p>
        <p className="mt-3 rounded-xl bg-white px-4 py-3 text-sm font-bold leading-6 text-tek-800">“{profile.Learner} muốn trở thành {profile.futureSelf}.”</p>
        {profile.futureSelfSource === "student" && (
          <p className="mt-2 text-[11px] font-semibold leading-5 text-tek-700">Câu {profile.learner} vừa viết sẽ được đưa vào website Future Me. Câu Kitten Bot gợi ý vẫn được lưu để đối chiếu.</p>
        )}
        <p className="mt-4 text-sm font-extrabold text-ink">{profile.Learner} thấy câu này đúng không?</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">Cứ nói thật. Chưa giống thì sửa lại cho đúng với mình.</p>
        <ChoicePills
          value={answers.portraitAgree}
          onChange={portraitAgree => setAnswers(a => ({
            ...a,
            portraitAgree,
            futureSelf: portraitAgree !== "yes" && !a.futureSelf.trim() ? profile.suggestedFutureSelf : a.futureSelf
          }))}
          options={[{ id: "yes", label: "Đúng rồi" }, { id: "almost", label: "Gần đúng" }, { id: "not-yet", label: "Chưa giống lắm" }]}
        />
        {answers.portraitAgree && answers.portraitAgree !== "yes" && (
          <label className="mt-3 grid gap-2 text-xs font-extrabold text-slate-700">
            {profile.Learner} muốn trở thành người như thế nào?
            <input
              value={answers.futureSelf}
              onChange={event => setAnswers(a => ({ ...a, futureSelf: event.target.value }))}
              placeholder={profile.suggestedFutureSelf}
              maxLength={120}
              className="focus-ring rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none"
            />
            <span className="text-right text-[10px] font-semibold text-slate-400">{answers.futureSelf.trim().length}/120</span>
          </label>
        )}
      </div>
    </div>

    <div className="rounded-2xl border border-slate-200 p-5">
      <p className="text-sm font-extrabold text-ink">Những điều {profile.learner} đang hứng thú</p>
      <div className="mt-3 flex flex-wrap gap-2">{profile.interestLabels.map(item => <span key={item} className="rounded-full bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800">{item}</span>)}</div>
      <p className="mt-5 text-sm font-extrabold text-ink">Điều nào giống {profile.learner} nhất?</p>
      <p className="mt-1 text-xs leading-5 text-slate-500">{BOT_NAME} gợi ý từ những gì vừa chọn. {profile.Learner} chọn 2–4 nét thấy đúng với mình hôm nay nha.</p>
      <div className="mt-3 flex flex-wrap gap-2">{candidates.map(trait => {
        const active = answers.confirmedTraits.includes(trait);
        return <button type="button" key={trait} onClick={() => toggleTrait(trait)} className={`focus-ring inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold transition ${active ? "border-tek-500 bg-tek-50 text-tek-800" : "border-slate-200 bg-white text-slate-600"}`}>{active && <Check className="h-3.5 w-3.5" />}{trait}</button>;
      })}</div>
      <p className="mt-3 text-[11px] font-semibold text-slate-400">Đã chọn {answers.confirmedTraits.length}/4 nét</p>
    </div>

    <div className="rounded-2xl border border-slate-200 p-5">
      <p className="text-sm font-extrabold text-ink">Ai sẽ thiết kế nhân vật Future Me của {profile.learner}?</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <button type="button" onClick={() => setAnswers(a => ({ ...a, portraitMode: "buddy" }))} data-selected={answers.portraitMode === "buddy"} className="choice-card focus-ring flex items-start gap-3 rounded-2xl border border-slate-200 p-4 text-left"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-tek-50"><KittenBotAvatar size={36} className="h-9 w-9" /></span><span><strong className="block text-sm text-ink">Để {BOT_NAME} gợi ý</strong><span className="mt-1 block text-xs leading-5 text-slate-500">Dựa trên những gì cả nhà vừa chọn.</span></span></button>
        <button type="button" onClick={() => setAnswers(a => ({ ...a, portraitMode: "self" }))} data-selected={answers.portraitMode === "self"} className="choice-card focus-ring flex items-start gap-3 rounded-2xl border border-slate-200 p-4 text-left"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-600"><Pencil className="h-5 w-5" /></span><span><strong className="block text-sm text-ink">{profile.Learner} tự chọn nhân vật</strong><span className="mt-1 block text-xs leading-5 text-slate-500">{profile.Learner} chọn hình dáng, màu sắc và vật phẩm của mình.</span></span></button>
      </div>

      {answers.portraitMode === "buddy" ? <div className="mt-4 rounded-2xl bg-slate-50 p-4"><div className="flex items-center gap-2 text-xs font-extrabold text-tek-700"><Sparkles className="h-4 w-4" /> Figurine 3D Pixar cho {profile.characterBrief.ageGroup}</div><p className="mt-2 text-xs leading-5 text-slate-600">Vì {profile.learner} thích <strong>{profile.interestLabels[0]?.toLocaleLowerCase("vi")}</strong> và muốn làm <strong>{profile.projects[0].title.toLocaleLowerCase("vi")}</strong>, {BOT_NAME} gợi ý mô hình chibi vinyl: {profile.characterBrief.style} · {profile.characterBrief.palette} · {profile.characterBrief.signatureGear}.</p><p className="mt-2 text-[11px] leading-5 text-slate-500">Ảnh sẽ là figurine 3D trên đế trưng bày, không phải hình ghép 2D.</p></div> : <CharacterBuilder answers={answers} setAnswers={setAnswers} profile={profile} />}
    </div>

    <div className="rounded-2xl border border-violet-100 bg-violet-50 p-5">
      <p className="flex items-center gap-2 text-sm font-extrabold text-violet-900"><Heart className="h-4 w-4" /> Góc nhìn từ ba mẹ</p>
      <p className="mt-2 text-sm leading-6 text-violet-800">{profile.parentSummary}</p>
      {profile.familyReflection.moment && <p className="mt-3 border-t border-violet-200 pt-3 text-xs italic leading-5 text-violet-700">“{profile.familyReflection.moment}”</p>}
      <p className="mt-4 text-sm font-extrabold text-violet-900">Ba mẹ thấy chân dung này giống con không?</p>
      <p className="mt-1 text-xs leading-5 text-violet-700">Ba mẹ chọn một ý — không cần giải thích dài.</p>
      <ChoicePills
        value={answers.parentPortraitFit}
        onChange={parentPortraitFit => setAnswers(a => ({ ...a, parentPortraitFit }))}
        options={[{ id: "very", label: "Rất giống con" }, { id: "partly", label: "Giống một phần" }, { id: "not-yet", label: "Chưa giống con lắm" }]}
        tone="violet"
      />
      {answers.parentPortraitFit && <p className="mt-3 text-xs font-semibold leading-5 text-violet-800">{parentFitNote[answers.parentPortraitFit]}</p>}
    </div>
    <p className="text-center text-[11px] leading-5 text-slate-400">Đây là những gì cả nhà vừa kể — không phải kết luận về năng lực hay nghề nghiệp.</p>
  </div>;
}

function ChoicePills<T extends string>({
  value,
  onChange,
  options,
  tone = "tek"
}: {
  value: T | "";
  onChange: (value: T) => void;
  options: { id: T; label: string }[];
  tone?: "tek" | "violet";
}) {
  const activeClass = tone === "violet" ? "border-violet-400 bg-white text-violet-900" : "border-tek-500 bg-tek-50 text-tek-800";
  const idleClass = tone === "violet" ? "border-violet-200 bg-white/70 text-violet-800" : "border-slate-200 bg-white text-slate-600";
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {options.map(option => {
        const active = value === option.id;
        return (
          <button
            type="button"
            key={option.id}
            onClick={() => onChange(option.id)}
            className={`focus-ring inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold transition ${active ? activeClass : idleClass}`}
          >
            {active && <Check className="h-3.5 w-3.5" />}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function CharacterBuilder({ answers, setAnswers, profile }: CommonProps) {
  const fields = [
    { key: "characterStyle", label: "Phong cách nhân vật", icon: Palette, options: profile.portraitSuggestions.styles },
    { key: "favoriteColor", label: "Màu chủ đạo", icon: Sparkles, options: profile.portraitSuggestions.colors },
    { key: "signatureGear", label: "Vật phẩm đặc trưng", icon: ImagePlus, options: profile.portraitSuggestions.gear }
  ] as const;
  return <div className="mt-4 grid gap-4 rounded-2xl bg-slate-50 p-4">
    <div><p className="text-xs font-extrabold text-slate-700">Từ ý tưởng vừa chọn, {BOT_NAME} nghĩ {profile.learner} có thể là…</p><div className="mt-2 flex flex-wrap gap-2">{profile.portraitSuggestions.futureSelf.map(suggestion => <button type="button" key={suggestion} onClick={() => setAnswers(a => ({...a, futureSelf: suggestion}))} className={`focus-ring rounded-full border px-3 py-2 text-left text-[11px] font-bold ${answers.futureSelf === suggestion ? "border-tek-500 bg-tek-50 text-tek-800" : "border-slate-200 bg-white text-slate-600"}`}>{suggestion}</button>)}</div></div>
    <label className="grid gap-2 text-xs font-extrabold text-slate-700">Hoặc {profile.learner} tự kể theo cách của mình<input value={answers.futureSelf} onChange={event => setAnswers(a => ({ ...a, futureSelf: event.target.value }))} placeholder={profile.tier === "g12" ? "Ví dụ: người làm robot giúp ba mẹ" : "Ví dụ: người tạo robot giúp mọi người"} className="focus-ring rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none" /></label>
    <div className="grid gap-3 sm:grid-cols-3">{fields.map(field => <div key={field.key} className="grid gap-2 text-xs font-extrabold text-slate-700"><span className="flex items-center gap-2"><field.icon className="h-4 w-4 text-tek-600" />{field.label}</span><AppSelect value={answers[field.key]} placeholder="Chọn một kiểu" options={field.options.map(option => ({ value: option, label: option }))} onChange={value => setAnswers(a => ({ ...a, [field.key]: value }))} aria-label={field.label} /></div>)}</div>
    <p className="text-[11px] leading-5 text-slate-500">AI sẽ tạo figurine 3D Pixar (vinyl, mắt to, đế tròn) cho {profile.learner} — không dùng ảnh thật, không ghép shape 2D.</p>
  </div>;
}

export function ProjectsJourneyResult({ profile }: Pick<CommonProps, "profile">) {
  const todaySteps = [
    { title: "Xem các dự án gợi ý", body: `${profile.Learner} đang ở bước này. Cứ xem ý nào thấy muốn thử.` },
    { title: "Làm website Future Me", body: "Bước sau, cả nhà tạo trang của bạn từ những gì vừa kể." },
    { title: "Khoe với cả nhà", body: "Cuối buổi, kể phần nào trên website thấy giống mình nhất." }
  ];
  const directions = [
    { label: "Gần nhất hôm nay", value: profile.directions.featured, icon: Star, tone: "border-amber-200 bg-amber-50 text-amber-800" },
    { label: "Cũng hợp để thử", value: profile.directions.tryNext, icon: Target, tone: "border-tek-200 bg-tek-50 text-tek-800" },
    { label: "Nếu muốn đổi món", value: profile.directions.exploreMore, icon: Flag, tone: "border-sky-200 bg-sky-50 text-sky-800" }
  ];
  return (
    <div className="space-y-7">
      <section>
        <p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-tek-600">Gợi ý cho {profile.learner}</p>
        <h2 className="mt-2 text-xl font-extrabold text-ink">Những dự án gần với chân dung của {profile.learner}</h2>
        <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-500">Bốn ý dưới đây lấy từ những gì cả nhà vừa chọn. Không cần làm hết — chỉ cần để ý ý nào thấy muốn thử.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">{profile.projects.map(project => (
          <article key={project.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="relative aspect-[16/9] w-full bg-tek-50"><Image src={project.image} alt={project.title} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover object-center" unoptimized /></div>
            <div className="p-4">
              <h3 className="text-sm font-extrabold text-ink">{project.title}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-500">{project.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">{project.actions.map(action => <span key={action} className="rounded-full bg-tek-50 px-2.5 py-1.5 text-[10px] font-bold text-tek-700">{action}</span>)}</div>
            </div>
          </article>
        ))}</div>
      </section>
      <section>
        <p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-tek-600">Cùng hướng</p>
        <h2 className="mt-2 text-xl font-extrabold text-ink">Ba hướng gần với những gì {profile.learner} vừa chọn</h2>
        <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-500">Đây là cách gọi các hướng đó — không phải môn phải học hay nghề phải chọn.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">{directions.map(item => (
          <div key={item.label} className={`rounded-2xl border p-4 ${item.tone}`}>
            <item.icon className="h-5 w-5" />
            <p className="mt-3 text-[10px] font-extrabold uppercase tracking-[.1em] opacity-70">{item.label}</p>
            <p className="mt-2 text-sm font-extrabold leading-5">{item.value}</p>
          </div>
        ))}</div>
      </section>
      <section>
        <p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-tek-600">Việc tiếp theo hôm nay</p>
        <h2 className="mt-2 text-xl font-extrabold text-ink">Cả nhà làm tiếp trong buổi này</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">{todaySteps.map((item, index) => (
          <div key={item.title} className={`relative rounded-2xl border p-4 ${index === 0 ? "border-tek-300 bg-tek-50" : "border-slate-200"}`}>
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-xs font-extrabold text-slate-600">{index + 1}</span>
            <p className="mt-4 text-[10px] font-extrabold uppercase tracking-[.1em] text-tek-600">{index === 0 ? "Đang làm" : index === 1 ? "Bước sau" : "Cuối buổi"}</p>
            <h3 className="mt-1 text-sm font-extrabold text-ink">{item.title}</h3>
            <p className="mt-2 text-xs leading-5 text-slate-500">{item.body}</p>
          </div>
        ))}</div>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-slate-400">Sau buổi hôm nay</p>
        <h2 className="mt-2 text-sm font-extrabold text-ink">Nếu cả nhà muốn học thêm tại TEKY</h2>
        <p className="mt-2 text-xs leading-5 text-slate-500">Đây là vài lớp trải nghiệm gần với hướng vừa chọn. Không phải việc phải đăng ký lúc này.</p>
        <div className="mt-3 flex flex-wrap gap-2">{profile.tekPrograms.map(program => <span key={program} className="rounded-full border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600">{program}</span>)}</div>
      </section>
    </div>
  );
}

export function FutureMeResult({ answers, setAnswers, profile, saveState, saveError, onConsent }: CommonProps & { saveState: string; saveError?: string; onConsent?: (consent: boolean) => void }) {
  const [copied, setCopied] = useState(false);
  const prompt = createPrompt(answers);
  const copyPrompt = async () => { await navigator.clipboard.writeText(prompt); setCopied(true); window.setTimeout(() => setCopied(false), 2400); };
  return <div className="space-y-5">
    <div className="rounded-2xl border border-tek-200 bg-tek-50 p-5 text-center"><span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white text-tek-600 shadow-card"><Rocket className="h-6 w-6" /></span><h2 className="mt-3 text-xl font-extrabold text-ink">Cả nhà đã xong một hành trình vui!</h2><p className="mt-2 text-sm text-slate-600">Lời gợi ý bên dưới đã có chân dung, nhân vật, dự án và hướng đi của {answers.name || profile.learner}.</p></div>
    <WebsitePreview name={answers.name} projectName={answers.projectName} gradeBand={answers.gradeBand} quote={`${profile.Learner} muốn trở thành ${profile.futureSelf}.`} />
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#101716] text-slate-100"><div className="flex items-center justify-between border-b border-white/10 px-4 py-3"><div><p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-[#78dfca]">Lời gợi ý tạo website</p><p className="mt-1 text-xs font-bold">Dán vào Google AI Studio là được</p></div><span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold">{prompt.length.toLocaleString("vi-VN")} ký tự</span></div><pre className="max-h-72 overflow-auto whitespace-pre-wrap p-4 text-[11px] leading-5 text-slate-300">{prompt}</pre></div>
    <div className="grid gap-3 sm:grid-cols-2"><button type="button" onClick={copyPrompt} className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-tek-500 px-5 py-4 text-sm font-extrabold text-white hover:bg-tek-600">{copied ? <Check className="h-5 w-5" /> : <Clipboard className="h-5 w-5" />}{copied ? "Đã sao chép rồi" : "Sao chép lời gợi ý"}</button><a href="https://aistudio.google.com/app/apps" target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm font-extrabold text-ink hover:bg-slate-50">Mở Google AI Studio <ExternalLink className="h-4 w-4" /></a></div>
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4"><p className="text-xs font-extrabold text-amber-900">Cả nhà làm tiếp thế này</p><p className="mt-1 text-xs leading-5 text-amber-800">Sao chép lời gợi ý → mở Google AI Studio → chọn New app → dán vào ô “Describe an app”.</p></div>
    <WorkshopFinishGuide profile={profile} />
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"><input type="checkbox" checked={answers.consent} onChange={event => { const consent = event.target.checked; if (onConsent) onConsent(consent); else setAnswers(a => ({ ...a, consent })); }} className="mt-1 h-4 w-4 accent-teal-600" /><span><strong className="block text-sm text-slate-700">Ba mẹ đồng ý lưu lại hành trình hôm nay</strong><span className="mt-1 block text-xs leading-5 text-slate-500">Gồm lựa chọn, chân dung và hướng con muốn thử. Nếu chưa đồng ý, mọi thứ chỉ lưu trên máy này.</span></span></label>
    {saveState === "saving" && <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-bold text-slate-600">Đang lưu hành trình lên hệ thống…</div>}
    {saveState === "saved" && <div className="flex items-center gap-3 rounded-xl border border-tek-200 bg-tek-50 p-4 text-sm font-bold text-tek-800"><Check className="h-5 w-5" />Đã lưu hành trình của cả nhà lên hệ thống.</div>}
    {saveState === "local" && <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-bold text-slate-600"><Check className="h-5 w-5" />Đã lưu trên máy này.</div>}
    {saveState === "error" && <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold text-amber-900">{saveError || "Chưa lưu được lên hệ thống. Hãy thử lại."}</div>}
  </div>;
}

function WorkshopFinishGuide({ profile }: Pick<CommonProps, "profile">) {
  const editPrompts = [
    ["Đổi phong cách", `Hãy đổi website sang phong cách ${profile.characterBrief.style}, dùng ${profile.characterBrief.palette}.`],
    ["Sửa điều chưa giống", `Hãy nhấn mạnh rằng ${profile.learner} thích ${profile.interestLabels[0]?.toLocaleLowerCase("vi")} và ${profile.strengthLabels[0]?.toLocaleLowerCase("vi")}. Giữ cách gọi "${profile.learner}" và nhân vật đúng ${profile.characterBrief.appearance}.`],
    ["Đổi dự án nổi bật", `Hãy đưa dự án ${profile.projects[0].title} lên đầu và làm phần này nổi bật hơn.`],
    ["Đổi thứ tự hành trình", `${profile.Learner} muốn thử ${profile.directions.featured} trước. Hãy đưa hướng này lên chặng đầu.`]
  ];
  return <section className="space-y-5 rounded-[24px] border border-slate-200 bg-white p-5 sm:p-6">
    <div><p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-tek-600">Phần còn lại của buổi hôm nay</p><h3 className="mt-2 text-xl font-extrabold text-ink">Tạo xong mới là bản đầu tiên</h3><p className="mt-2 text-xs leading-5 text-slate-500">Không cần đếm từng giây. Cả nhà làm theo nhịp chung là được.</p></div>
    <div className="grid gap-2 sm:grid-cols-3">{workshopStages(profile.gradeBand, true).map((stage,index)=><div key={stage.label} className={`rounded-xl border p-3 ${index === 3 ? "border-tek-300 bg-tek-50" : "border-slate-200 bg-slate-50"}`}><p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[.08em] text-slate-500"><Clock3 className="h-3.5 w-3.5" /> {stage.window}</p><p className="mt-1 text-xs font-extrabold text-ink">{index+1}. {stage.label}</p></div>)}</div>
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="rounded-2xl border border-tek-200 bg-tek-50 p-4"><p className="text-[10px] font-extrabold uppercase tracking-[.12em] text-tek-700">30–44' · Làm website</p><p className="mt-2 text-sm font-extrabold text-ink">Sao chép, dán, rồi xem thử</p><p className="mt-2 text-xs leading-5 text-slate-600">Trong lúc AI làm, cả nhà đoán phần nào sẽ giống {profile.learner} nhất.</p></div>
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4"><p className="text-[10px] font-extrabold uppercase tracking-[.12em] text-amber-700">44–53' · Chỉnh cho giống</p><p className="mt-2 text-sm font-extrabold text-ink">Biến thành website của {profile.learner}</p><p className="mt-2 text-xs leading-5 text-slate-600">Chọn một điều muốn đổi, rồi dán câu chỉnh vào AI Studio.</p></div>
      <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4"><p className="text-[10px] font-extrabold uppercase tracking-[.12em] text-violet-700">53–60' · Khoe với cả nhà</p><p className="mt-2 text-sm font-extrabold text-ink">Nhìn lại và chọn việc nhỏ tiếp theo</p><p className="mt-2 text-xs leading-5 text-slate-600">{profile.Learner} kể phần thích nhất; ba mẹ kể điều hiểu thêm; cả nhà chọn một thứ muốn thử tiếp.</p></div>
    </div>
    <div><p className="flex items-center gap-2 text-sm font-extrabold text-ink"><Pencil className="h-4 w-4 text-tek-600" /> Chọn một câu để chỉnh thêm</p><div className="mt-3 grid gap-2 sm:grid-cols-2">{editPrompts.map(([title,text])=><div key={title} className="rounded-xl border border-slate-200 p-3"><p className="text-xs font-extrabold text-ink">{title}</p><p className="mt-1 text-[11px] leading-5 text-slate-500">“{text}”</p></div>)}</div></div>
    <div className="grid gap-3 rounded-2xl bg-[#0c6c62] p-5 text-white sm:grid-cols-3"><p className="text-xs leading-5"><strong className="mb-1 flex items-center gap-1.5"><Sparkles className="h-4 w-4" /> {profile.Learner}</strong>Phần nào trên website {profile.learner} thích nhất?</p><p className="text-xs leading-5"><strong className="mb-1 flex items-center gap-1.5"><Heart className="h-4 w-4" /> Ba mẹ</strong>Hôm nay ba mẹ hiểu thêm điều gì về {profile.learner}?</p><p className="text-xs leading-5"><strong className="mb-1 flex items-center gap-1.5"><MessageCircleMore className="h-4 w-4" /> Cả nhà</strong>Điều nào {profile.learner} muốn thử tiếp theo?</p></div>
    <p className="text-center text-xs font-bold leading-5 text-slate-500">Sở thích hôm nay không quyết định tương lai. Mỗi trải nghiệm mới sẽ giúp {profile.learner} hiểu mình hơn.</p>
  </section>;
}
