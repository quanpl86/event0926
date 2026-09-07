"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft, ArrowRight, Bot, Check, ChevronRight, Clock3, Download, ExternalLink,
  Gamepad2, Globe2, Lightbulb, LockKeyhole, Palette, Rocket, RotateCcw, Save, Sparkles, Trophy, Users, Wrench
} from "lucide-react";
import journeyData from "@/data/journey.json";
import type { JourneyAnswers, JourneyStep } from "@/types/journey";
import { createProfile } from "@/lib/profile";
import { fillVoice, isParentAudience, journeyUi, presentStep, selectionLimit, you } from "@/lib/age";
import { voiceLabel } from "@/lib/age-content";
import { saveJourney } from "@/lib/supabase";
import { BOT_NAME, FutureBuddy, KittenBotAvatar } from "./FutureBuddy";
import { getWorkshopStage, JourneyProgress, workshopStages } from "./JourneyProgress";
import { avatarOptions } from "@/lib/avatars";
import { AppSelect } from "./AppSelect";
import { ChoiceCard } from "./ChoiceCard";
import { FutureMeResult, ProfileResult, ProjectsJourneyResult } from "./ResultExperience";

const gradeBandOptions = [
  { value: "1-2", label: "Nhóm lớp 1, 2" },
  { value: "3-5", label: "Nhóm lớp 3, 4, 5" },
  { value: "6-7", label: "Nhóm lớp 6, 7" },
  { value: "8-9", label: "Nhóm lớp 8, 9" }
];

const steps = journeyData as JourneyStep[];
const initialAnswers: JourneyAnswers = {
  name: "", gradeBand: "", avatar: "creator-green", projectName: "", futureSelf: "", favoriteColor: "",
  characterStyle: "", signatureGear: "", confirmedTraits: [], portraitAgree: "", parentPortraitFit: "", portraitMode: "buddy", parentMoment: "", consent: false, selections: {}
};

const phaseIcons = { "Sở thích": Lightbulb, "Cách con làm": Wrench, "Cách em làm": Wrench, "Dự án tương lai": Sparkles, "Ba mẹ đồng hành": Users, "Chân dung": Trophy };

export function FutureJourney() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<JourneyAnswers>(initialAnswers);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "local" | "error">("idle");
  const [saveError, setSaveError] = useState("");
  const savedCloud = useRef(false);
  const step = steps[current];
  const voiced = useMemo(
    () => presentStep(step, answers.gradeBand, answers.selections.interest ?? []),
    [step, answers.gradeBand, answers.selections.interest]
  );
  const ui = journeyUi(answers.gradeBand);
  const profile = useMemo(() => createProfile(answers), [answers]);
  const workshopStageIndex = getWorkshopStage(step.id);
  const workshopStage = workshopStages(answers.gradeBand, isParentAudience(step.id))[workshopStageIndex];

  useEffect(() => {
    const stored = window.localStorage.getItem("future-creator-journey");
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as { started: boolean; current: number; answers: JourneyAnswers };
      setStarted(parsed.started); setCurrent(Math.min(parsed.current, steps.length - 1));
      setAnswers({ ...initialAnswers, ...parsed.answers, selections: parsed.answers.selections ?? {}, confirmedTraits: parsed.answers.confirmedTraits ?? [] });
    } catch { window.localStorage.removeItem("future-creator-journey"); }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("future-creator-journey", JSON.stringify({ started, current, answers }));
  }, [started, current, answers]);

  function toggle(stepId: string, optionId: string, single = false, limit?: number) {
    setAnswers(previous => {
      const currentValues = previous.selections[stepId] ?? [];
      const exists = currentValues.includes(optionId);
      let nextValues = single ? [optionId] : exists ? currentValues.filter(id => id !== optionId) : [...currentValues, optionId];
      if (limit && nextValues.length > limit) nextValues = nextValues.slice(1);
      return { ...previous, selections: { ...previous.selections, [stepId]: nextValues } };
    });
  }

  function canContinue() {
    if (step.type === "identity") return answers.name.trim().length >= 2 && Boolean(answers.gradeBand);
    if (step.type === "project") return answers.projectName.trim().length >= 2;
    if (step.type === "handoff" || step.type === "pathway" || step.type === "showcase") return true;
    if (step.type === "family") return answers.parentMoment.trim().length >= 8 && (answers.selections[step.id]?.length ?? 0) > 0;
    if (step.type === "profile") {
      const portraitReady = answers.portraitMode === "buddy" || Boolean(answers.futureSelf && answers.favoriteColor && answers.characterStyle && answers.signatureGear);
      return answers.confirmedTraits.length >= 2 && Boolean(answers.portraitAgree) && Boolean(answers.parentPortraitFit) && portraitReady;
    }
    return (answers.selections[step.id]?.length ?? 0) > 0;
  }

  async function persistJourney(nextAnswers: JourneyAnswers) {
    if (!nextAnswers.consent) {
      setSaveState("local");
      setSaveError("");
      return;
    }
    if (savedCloud.current) {
      setSaveState("saved");
      setSaveError("");
      return;
    }
    setSaveState("saving");
    setSaveError("");
    const result = await saveJourney(nextAnswers, steps);
    if (result.cloud) {
      savedCloud.current = true;
      setSaveState("saved");
      return;
    }
    setSaveState("error");
    setSaveError(result.reason === "missing-config"
      ? "Chưa kết nối được hệ thống lưu trữ. Hãy thử lại hoặc báo người tổ chức."
      : "Chưa lưu được lên hệ thống. Ba mẹ hãy bấm Hoàn tất lần nữa.");
  }

  async function next() {
    if (current < steps.length - 1) { setCurrent(index => index + 1); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    await persistJourney(answers);
  }

  function resetJourney() {
    setStarted(false); setCurrent(0); setAnswers(initialAnswers); setSaveState("idle"); setSaveError(""); savedCloud.current = false;
    window.localStorage.removeItem("future-creator-journey");
  }

  if (!started) return <Landing onStart={() => setStarted(true)} />;

  return (
    <div className="min-h-screen"><div className="page-haze" />
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3"><Image src="/assets/teky-logo.png" alt="TEKY" width={96} height={41} className="h-8 w-auto object-contain" priority /><div className="hidden border-l border-slate-200 pl-3 sm:block"><p className="text-sm font-extrabold leading-none text-ink">Future Creator Journey</p><p className="mt-1 text-[10px] font-semibold text-slate-400">Hành trình của {answers.name || you(answers.gradeBand)}</p></div></div>
          <div className="flex items-center gap-3"><div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold text-slate-500 sm:flex"><Clock3 className="h-4 w-4 text-tek-500" /> {workshopStage.label} · khoảng {workshopStage.duration} phút</div><button onClick={resetJourney} className="focus-ring rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Bắt đầu lại"><RotateCcw className="h-4 w-4" /></button></div>
        </div>
        <div className="h-1 bg-slate-100 lg:hidden"><div className="h-full bg-tek-500 transition-all" style={{ width: `${((current + 1) / steps.length) * 100}%` }} /></div>
      </header>

      <div className="mx-auto grid max-w-[1500px] grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)_250px]">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] border-r border-slate-200 bg-white/70 px-6 py-8 lg:block"><JourneyProgress activeStepId={step.id} gradeBand={answers.gradeBand} /></aside>
        <main className="min-w-0 px-4 py-6 sm:px-8 sm:py-10 xl:px-14">
          <div key={step.id} className={`fade-up mx-auto ${["profile", "pathway", "showcase"].includes(step.type) ? "max-w-5xl" : "max-w-3xl"}`}>
            <div className="mb-7 flex items-center justify-between gap-5"><FutureBuddy message={voiced.buddy} /><span className="hidden whitespace-nowrap rounded-full bg-tek-50 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[.12em] text-tek-600 sm:inline">{voiced.phase} · {voiced.minutes} phút</span></div>
            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft sm:p-8">
              <div className="mb-7"><p className="text-[10px] font-extrabold uppercase tracking-[.17em] text-tek-600">Bước {current + 1} / {steps.length}</p><h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-[-.035em] text-ink sm:text-4xl">{voiced.title}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">{voiced.description}</p></div>
              <StepContent step={voiced} answers={answers} setAnswers={setAnswers} toggle={toggle} profile={profile} saveState={saveState} saveError={saveError} onConsent={consent => { const nextAnswers = { ...answers, consent }; setAnswers(nextAnswers); void persistJourney(nextAnswers); }} ui={ui} />
            </section>
            <div className="mt-5 flex items-center justify-between gap-3">
              <button disabled={current === 0} onClick={() => setCurrent(index => index - 1)} className="focus-ring inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 disabled:opacity-30"><ArrowLeft className="h-4 w-4" /> Quay lại</button>
              <button disabled={!canContinue() || saveState === "saving"} onClick={next} className="focus-ring inline-flex min-w-36 items-center justify-center gap-2 rounded-xl bg-tek-500 px-5 py-3 text-sm font-extrabold text-white shadow-card hover:bg-tek-600 disabled:cursor-not-allowed disabled:bg-slate-300">{current === steps.length - 1 ? saveState === "saving" ? "Đang lưu…" : saveState === "saved" ? "Đã lưu" : saveState === "error" ? "Thử lưu lại" : saveState === "local" ? "Đã lưu trên máy" : "Hoàn tất" : "Tiếp tục"}{current < steps.length - 1 && <ArrowRight className="h-4 w-4" />}</button>
            </div>
          </div>
        </main>
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] border-l border-slate-200 bg-white/70 px-6 py-8 xl:block"><InsightPanel step={voiced} answers={answers} parentAudience={isParentAudience(step.id)} /></aside>
      </div>
    </div>
  );
}

function Landing({ onStart }: { onStart: () => void }) {
  const miniCards = [
    { icon: Sparkles, title: "Hồ sơ nhà sáng tạo", text: "Nhìn thấy điều con yêu thích", tone: "border-amber-200 bg-amber-50 text-amber-600" },
    { icon: Lightbulb, title: "Dự án của riêng con", text: "Biến tò mò thành ý tưởng", tone: "border-emerald-200 bg-emerald-50 text-emerald-600" },
    { icon: Rocket, title: "Lộ trình phù hợp", text: "Bắt đầu từ bước con hào hứng", tone: "border-sky-200 bg-sky-50 text-sky-600" }
  ];
  const landingCols = "gap-6 lg:grid-cols-[220px_minmax(0,1fr)_220px] xl:gap-8 xl:grid-cols-[240px_minmax(0,1fr)_240px]";
  return (
    <main className="relative min-h-screen overflow-hidden"><div className="page-haze" />
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <header className={`flex items-center justify-between py-8 lg:grid lg:items-center ${landingCols}`}>
          <div className="flex items-center gap-4 lg:col-span-2">
            <Image src="/assets/teky-logo.png" alt="TEKY" width={128} height={54} className="h-10 w-auto object-contain" priority />
            <div className="hidden border-l border-slate-200 pl-4 sm:block">
              <p className="font-extrabold leading-none text-ink">Future Creator</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[.15em] text-tek-600">Cùng Kitten Bot khám phá</p>
            </div>
          </div>
          <span className="hidden items-center gap-2 rounded-full border border-tek-200 bg-white px-4 py-2 text-xs font-extrabold text-ink sm:flex lg:col-start-3 lg:justify-self-end">
            <Trophy className="h-4 w-4 text-amber-400" /> Con và ba mẹ cùng khám phá
          </span>
        </header>
        <div className={`grid ${landingCols} min-h-[calc(100vh-120px)] items-center py-6 lg:py-10`}>
          <div className="order-2 space-y-3 lg:order-1">{miniCards.map(({icon: CardIcon,title,text,tone})=><div key={title} className={`rounded-2xl border p-4 ${tone}`}><div className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white"><CardIcon className="h-5 w-5" /></span><div><p className="text-[10px] font-extrabold uppercase tracking-[.12em] opacity-70">Sau 60 phút</p><p className="mt-1 text-sm font-extrabold text-ink">{title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{text}</p></div></div></div>)}</div>
          <div className="order-1 mx-auto w-full min-w-0 text-center lg:order-2"><div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-tek-200 bg-white px-4 py-2 text-xs font-extrabold text-ink"><KittenBotAvatar size={28} className="h-7 w-7" priority /> {BOT_NAME} đang đợi bạn đây</div><p className="text-xs font-extrabold uppercase tracking-[.22em] text-tek-600">Hành trình khám phá tương lai</p><h1 className="mx-auto mt-5 font-extrabold leading-[1.08] tracking-[-.04em] text-ink"><span className="block whitespace-nowrap text-[clamp(1.55rem,3.55vw,3.7rem)]">Khám phá điều con yêu thích.</span><span className="mt-1 block whitespace-nowrap text-[clamp(1.55rem,3.55vw,3.7rem)] text-tek-500">Tạo nên tương lai của con.</span></h1><p className="mx-auto mt-6 max-w-3xl text-base font-medium leading-7 text-slate-600 sm:text-lg">Không phải bài kiểm tra. Không có đáp án đúng hay sai. Đây là 60 phút để con và ba mẹ cùng tìm ra những điều khiến con hào hứng.</p><div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"><button onClick={onStart} className="focus-ring inline-flex items-center gap-2 rounded-xl bg-tek-500 px-7 py-4 text-base font-extrabold text-white shadow-card hover:bg-tek-600">Bắt đầu khám phá <ArrowRight className="h-5 w-5" /></button><button onClick={() => document.getElementById("how")?.scrollIntoView()} className="focus-ring rounded-xl border border-slate-200 bg-white px-7 py-4 text-base font-extrabold text-ink">Hành trình có gì?</button></div><p className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400"><LockKeyhole className="h-4 w-4" /> Dữ liệu chỉ được lưu khi ba mẹ đồng ý ở cuối hành trình.</p></div>
          <div id="how" className="order-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-card"><p className="text-[10px] font-extrabold uppercase tracking-[.17em] text-slate-400">Con có thể khám phá</p><div className="mt-5 space-y-4">{[{icon:Gamepad2,label:"Tạo Game",color:"text-blue-600 bg-blue-50"},{icon:Bot,label:"Chế tạo Robot",color:"text-tek-600 bg-tek-50"},{icon:Palette,label:"Thiết kế",color:"text-orange-600 bg-orange-50"},{icon:Globe2,label:"Thế giới số",color:"text-violet-600 bg-violet-50"}].map(({icon:ItemIcon,label,color})=><div key={label} className="flex items-center gap-3"><span className={`grid h-10 w-10 place-items-center rounded-xl ${color}`}><ItemIcon className="h-5 w-5" /></span><span className="text-sm font-extrabold text-slate-700">{label}</span><ChevronRight className="ml-auto h-4 w-4 text-slate-300" /></div>)}</div></div>
        </div>
      </div>
      <ActivityGuide />
    </main>
  );
}

const activityCards = [
  { src: "/assets/activity-world-building.png", title: "Xây thế giới", clue: "Tư duy không gian · Lập kế hoạch", color: "bg-tek-50 text-tek-700" },
  { src: "/assets/activity-robotics.png", title: "Tháo lắp", clue: "Tư duy cơ học · Thử nghiệm", color: "bg-amber-50 text-amber-700" },
  { src: "/assets/activity-problem-solving.png", title: "Giải đố", clue: "Logic · Phân tích · Tìm quy luật", color: "bg-sky-50 text-sky-700" },
  { src: "/assets/activity-visual-storytelling.png", title: "Kể chuyện bằng hình ảnh", clue: "Sáng tạo · Thẩm mỹ", color: "bg-orange-50 text-orange-700" },
  { src: "/assets/activity-communication.png", title: "Giao tiếp", clue: "Trình bày · Kết nối · Phối hợp", color: "bg-violet-50 text-violet-700" },
  { src: "/assets/activity-nature-observation.png", title: "Quan sát tự nhiên", clue: "Đặt câu hỏi · Tư duy khoa học", color: "bg-emerald-50 text-emerald-700" }
];

function ActivityGuide() {
  return <section id="activity-guide" className="mx-auto max-w-[1280px] py-20 sm:py-28">
    <div className="mx-auto max-w-3xl text-center"><span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.18em] text-amber-700">Gợi mở từ sở thích</span><h2 className="mt-5 text-3xl font-extrabold tracking-[-.04em] text-ink sm:text-5xl">Sở thích nào gợi mở<br/><span className="text-tek-600">nhóm trải nghiệm nào cho con?</span></h2><p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">Sở thích chưa quyết định nghề nghiệp tương lai. Chúng giúp ba mẹ nhận ra cách con tư duy, sáng tạo và giải quyết vấn đề — để mở thêm những trải nghiệm phù hợp.</p></div>
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{activityCards.map(card=><article key={card.title} className="group overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-card"><div className="relative aspect-square overflow-hidden"><Image src={card.src} alt={`Hoạt động ${card.title} tại TEKY`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.025]" /></div><div className="p-5"><span className={`inline-flex rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.1em] ${card.color}`}>Con thích {card.title}</span><p className="mt-3 text-sm font-bold text-slate-600">{card.clue}</p></div></article>)}</div>
    <div className="mt-10 grid gap-4 rounded-[28px] border border-tek-200 bg-white p-6 shadow-soft sm:grid-cols-3 sm:p-8">{[{n:"01",title:"Quan sát điều con hứng thú",text:"Con thích sáng tạo, khám phá, giao tiếp hay giải quyết vấn đề?"},{n:"02",title:"Chú ý cách con làm",text:"Con lên kế hoạch, thử nhiều cách, sửa lỗi hay trao đổi để tìm giải pháp?"},{n:"03",title:"Tạo thêm trải nghiệm",text:"Mỗi hoạt động mới giúp con hiểu sở thích, điểm mạnh và cách mình học tốt nhất."}].map(item=><div key={item.n} className="rounded-2xl bg-slate-50 p-5"><span className="text-xs font-extrabold text-tek-600">{item.n}</span><h3 className="mt-3 text-sm font-extrabold text-ink">{item.title}</h3><p className="mt-2 text-xs leading-5 text-slate-500">{item.text}</p></div>)}</div>
    <div className="mt-8 flex flex-col items-center justify-between gap-5 rounded-[28px] bg-[#006d63] p-6 text-white sm:flex-row sm:p-8"><div><p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#9ce8da]">Điều quan trọng</p><p className="mt-2 max-w-3xl text-base font-semibold leading-7">Không phải chọn nghề cho con thật sớm, mà là cho con đủ trải nghiệm để nhận ra thế mạnh và điều mình phù hợp.</p><p className="mt-2 max-w-3xl text-xs leading-5 text-[#bdeee6]">Tại TEKY, con được tự tạo game, robot và sản phẩm AI qua dự án thực tế, từ đó bộc lộ cách tư duy và giải quyết vấn đề.</p></div><button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} className="focus-ring shrink-0 rounded-xl bg-[#ffd044] px-5 py-3 text-sm font-extrabold text-[#064d47]">Khám phá 60 phút miễn phí</button></div>
  </section>;
}

type StepContentProps = {
  step: JourneyStep;
  answers: JourneyAnswers;
  setAnswers: React.Dispatch<React.SetStateAction<JourneyAnswers>>;
  toggle: (stepId: string, optionId: string, single?: boolean, limit?: number) => void;
  profile: ReturnType<typeof createProfile>;
  saveState: string;
  saveError: string;
  onConsent: (consent: boolean) => void;
  ui: ReturnType<typeof journeyUi>;
};

function StepContent({ step, answers, setAnswers, toggle, profile, saveState, saveError, onConsent, ui }: StepContentProps) {
  const limit = selectionLimit(step, answers.gradeBand);
  const learner = you(answers.gradeBand);
  const who = answers.name || (step.type === "handoff" || step.type === "family" ? "Con" : learner);
  if (step.type === "identity") return (
    <div className="grid gap-5">
      <label className="grid gap-2 text-sm font-bold text-slate-700">{ui.nameLabel}<input autoFocus value={answers.name} maxLength={30} onChange={e=>setAnswers(a=>({...a,name:e.target.value}))} placeholder="Ví dụ: Minh" className="focus-ring rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 font-semibold outline-none placeholder:text-slate-300" /></label>
      <div className="relative z-10 grid gap-2">
        <p className="text-sm font-bold text-slate-700">Nhóm lớp</p>
        <AppSelect
          aria-label="Nhóm lớp"
          value={answers.gradeBand}
          placeholder="Chọn nhóm lớp"
          options={gradeBandOptions}
          onChange={gradeBand => setAnswers(a => {
            const next = { ...a.selections };
            if (gradeBand === "1-2") {
              next.interest = (next.interest ?? []).slice(0, 2);
              next.strength = (next.strength ?? []).slice(0, 2);
            }
            return { ...a, gradeBand, selections: next, characterStyle: "", favoriteColor: "", signatureGear: "", futureSelf: a.portraitMode === "self" ? "" : a.futureSelf };
          })}
        />
      </div>
      <div className="grid gap-2">
        <p className="text-sm font-bold text-slate-700">Chọn một hình đại diện</p>
        <div className="grid grid-cols-3 gap-3">
          {avatarOptions.map(({ id, label, src }) => (
            <button key={id} type="button" onClick={() => setAnswers(a => ({ ...a, avatar: id }))} data-selected={answers.avatar === id} className="choice-card focus-ring overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 text-center">
              <span className="relative mx-auto block aspect-square w-full overflow-hidden rounded-xl bg-tek-50">
                <Image src={src} alt={label} fill sizes="160px" className="object-contain p-1" />
              </span>
              <span className="mt-2 block text-[11px] font-extrabold text-slate-700">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
  if (["multi","bag","single","scenario","parent"].includes(step.type)) {
    return <div><div className="grid gap-3 sm:grid-cols-2">{step.options?.map(option=><ChoiceCard key={option.id} option={option} selected={(answers.selections[step.id]??[]).includes(option.id)} onClick={()=>toggle(step.id,option.id,["single","scenario"].includes(step.type),limit)} />)}</div>{step.type==="bag"&&<div className="mt-4 flex min-h-20 flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-tek-200 bg-tek-50 p-4"><span className="mr-2 text-xs font-extrabold text-tek-700">{ui.bagTitle}</span>{(answers.selections[step.id]??[]).length===0?<span className="text-xs text-slate-400">{ui.bagEmpty}</span>:(answers.selections[step.id]??[]).map(id=><span key={id} className="rounded-full bg-white px-3 py-2 text-xs font-bold text-tek-700 shadow-sm">{step.options?.find(o=>o.id===id)?.title}</span>)}</div>}{(step.type==="parent"||step.type==="bag"||(step.id==="interest"&&limit))&&<p className="mt-4 text-center text-xs font-semibold text-slate-400">{step.type==="parent"?`Ba mẹ chọn ${(answers.selections[step.id]??[]).length}/${limit} điều`:step.id==="interest"?ui.interestHint:ui.bagHint}</p>}</div>;
  }
  if (step.type === "project") return <div className="grid gap-5 sm:grid-cols-[180px_1fr]"><div className="grid min-h-44 place-items-center rounded-2xl bg-tek-50 text-tek-600"><div className="text-center"><Bot className="mx-auto h-14 w-14" /><p className="mt-3 text-xs font-extrabold uppercase tracking-[.14em]">Ý tưởng của {answers.name || learner}</p></div></div><div><p className="text-xs font-bold uppercase tracking-[.12em] text-slate-400">{ui.combining}</p><div className="mt-3 flex flex-wrap gap-2">{[...(answers.selections.interest??[]),...(answers.selections.strength??[]),...(answers.selections.impact??[])].slice(0,4).map(id=><span key={id} className="rounded-full border border-tek-200 bg-tek-50 px-3 py-2 text-xs font-bold text-tek-700">{voiceLabel(id, answers.gradeBand, fillVoice)}</span>)}</div><label className="mt-5 grid gap-2 text-sm font-bold text-slate-700">Tên dự án của {learner}<input value={answers.projectName} maxLength={45} onChange={e=>setAnswers(a=>({...a,projectName:e.target.value}))} placeholder={ui.projectPlaceholder} className="focus-ring rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none" /></label></div></div>;
  if (step.type === "handoff") return <div className="grid items-center gap-4 sm:grid-cols-[1fr_56px_1fr]"><div className="rounded-2xl border border-tek-200 bg-tek-50 p-6 text-center"><Rocket className="mx-auto h-10 w-10 text-tek-600" /><p className="mt-3 font-extrabold">{who} {ui.tellProject}</p><p className="mt-1 text-xs text-slate-500">“{answers.projectName || ui.futureProject}”</p></div><ArrowRight className="mx-auto h-6 w-6 rotate-90 text-tek-500 sm:rotate-0"/><div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center"><Users className="mx-auto h-10 w-10 text-slate-600"/><p className="mt-3 font-extrabold">Ba mẹ kể thêm</p><p className="mt-1 text-xs text-slate-500">{ui.handoffParent}</p></div></div>;
  if (step.type === "family") return <div className="space-y-5"><div className="rounded-2xl border border-tek-200 bg-tek-50 p-5"><p className="text-xs font-extrabold uppercase tracking-[.12em] text-tek-700">{ui.toldJustNow}</p><p className="mt-2 text-lg font-extrabold text-ink">“{answers.projectName || ui.futureProject}”</p><p className="mt-2 text-xs leading-5 text-slate-600">{ui.wantsToUse} {profile.futureSelf.replace(/^người /, "")}.</p></div><label className="grid gap-2 text-sm font-bold text-slate-700">{ui.parentMoment}<textarea value={answers.parentMoment} onChange={e=>setAnswers(a=>({...a,parentMoment:e.target.value}))} rows={3} maxLength={240} placeholder={ui.parentPlaceholder.replace("{name}", answers.name || learner)} className="focus-ring resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium leading-6 outline-none"/><span className="text-right text-[10px] font-semibold text-slate-400">{answers.parentMoment.length}/240</span></label><div><p className="text-sm font-extrabold text-ink">Sau hôm nay, cả nhà muốn thử việc nào trước?</p><div className="mt-3 grid gap-3 sm:grid-cols-3">{step.options?.map(option=><ChoiceCard key={option.id} option={option} selected={(answers.selections[step.id]??[]).includes(option.id)} onClick={()=>toggle(step.id,option.id,true)} />)}</div></div></div>;
  if (step.type === "profile") return <ProfileResult answers={answers} setAnswers={setAnswers} profile={profile} />;
  if (step.type === "pathway") return <ProjectsJourneyResult profile={profile} />;
  return <FutureMeResult answers={answers} setAnswers={setAnswers} profile={profile} saveState={saveState} saveError={saveError} onConsent={onConsent} />;
}

function InsightPanel({ step, answers, parentAudience }: { step: JourneyStep; answers: JourneyAnswers; parentAudience: boolean }) {
  const PhaseIcon = phaseIcons[step.phase as keyof typeof phaseIcons] ?? Rocket;
  const selected = answers.selections[step.id]?.length ?? 0;
  const profileReady = step.type === "profile" && answers.confirmedTraits.length >= 2 && Boolean(answers.portraitAgree) && Boolean(answers.parentPortraitFit);
  const waiting = parentAudience ? "Đang chờ ba mẹ chọn" : "Đang chờ bạn chọn";
  const chosen = step.type === "profile"
    ? profileReady ? "Cả nhà đã xác nhận" : "Đang chờ cả nhà xác nhận"
    : selected > 0 ? `${selected} điều` : waiting;
  const insight = step.type === "profile"
    ? "Bạn chọn nét đúng với mình. Ba mẹ nói chân dung có giống con không. Không có đáp án đúng sai."
    : parentAudience ? "Không có đáp án đúng sai. Ba mẹ cứ chọn điều mình thấy ở con." : "Không có đáp án đúng sai. Cứ chọn điều thấy đúng với mình nhất.";
  const chosenActive = step.type === "profile" ? profileReady : selected > 0;
  return <div><div className="flex items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded-xl bg-tek-50 text-tek-600"><PhaseIcon className="h-5 w-5"/></span><div><p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-slate-400">Đang làm</p><p className="text-sm font-extrabold text-ink">{step.phase}</p></div></div><div className="mt-8 space-y-5"><div><p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-slate-400">Vừa chọn</p><div className="mt-3 flex flex-wrap gap-2"><span className={`rounded-lg px-2.5 py-2 text-[10px] font-bold ${chosenActive ? "bg-tek-50 text-tek-700" : "bg-slate-100 text-slate-500"}`}>{chosen}</span></div></div><div className="rounded-2xl border border-slate-200 bg-white p-4"><p className="flex items-center gap-2 text-xs font-extrabold text-ink"><LockKeyhole className="h-4 w-4 text-tek-500"/> Không chấm điểm</p><p className="mt-2 text-[11px] leading-5 text-slate-500">{insight}</p></div></div></div>;
}
