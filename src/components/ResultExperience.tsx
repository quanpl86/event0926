"use client";

import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import {
  ArrowRight, ArrowLeft, Check, ExternalLink, Pencil, Rocket, Sparkles,
  BookOpen, ShieldCheck, Target, Eye, CheckCircle2, User, UserCheck,
  ChevronDown, ChevronUp, Trophy, Zap, Star, Brain, Cpu,
  Palette, Code2, Award, Compass, TrendingUp, Clock,
  Lightbulb, Wrench, GraduationCap, Heart, Layers, Flag,
  Camera, BarChart3, FileText, CheckSquare
} from "lucide-react";
import type { JourneyAnswers } from "@/types/journey";
import type { DiscoveryProfile } from "@/lib/profile";
import {
  extractSIOEvidenceCards,
  generatePersonalizedProjects,
  buildSafeAIStudioPrompt,
  type SIOEvidenceCard,
  type V3PersonalizedProject
} from "@/data/v3Engine";
import { WebsitePreview } from "./WebsitePreview";
import { StandardsModal } from "./StandardsModal";
import { AvatarUploaderModal } from "./AvatarUploaderModal";
import { RadarChart } from "./RadarChart";
import { StudentProfileCard } from "./StudentProfileCard";

type CommonProps = {
  answers: JourneyAnswers;
  setAnswers: React.Dispatch<React.SetStateAction<JourneyAnswers>>;
  profile: DiscoveryProfile;
  saveState?: string;
  initialTab?: "profile" | "dashboard" | "website";
};

/* ─────────────────────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────────────────────── */
type ProjectProgressStatus = "not_started" | "in_progress" | "submitted" | "verified";

function mapEvidenceToRadar(cards: SIOEvidenceCard[]) {
  if (cards.length < 3) {
    return [
      { key: "k", label: "Nhận thức", value: 3, fullMark: 10 },
      { key: "s", label: "Kỹ năng", value: 3, fullMark: 10 },
      { key: "p", label: "Giải quyết VĐ", value: 3, fullMark: 10 },
      { key: "o", label: "Quan sát", value: 3, fullMark: 10 },
    ];
  }
  return cards.map(card => ({
    key: card.id,
    label: card.stageName.length > 12 ? card.stageName.split(" & ")[0].split(" ")[0] : card.stageName.split(" & ")[0],
    value: card.sourceType === "student_situation" ? 8
      : card.sourceType === "parent_observation" ? 7
      : card.sourceType === "student_self_report" ? 6 : 2,
    fullMark: 10
  }));
}

function getStageSkills(domain: string | undefined, idx: number): string[] {
  const d = domain || "robotics";
  const m: Record<string, string[][]> = {
    robotics: [
      ["Lắp ráp cơ khí", "Nhận biết linh kiện", "Kết nối mạch"],
      ["Lập trình khối", "Điều khiển động cơ", "Vòng lặp"],
      ["Cảm biến nâng cao", "Xử lý tín hiệu", "Tự động hóa"],
      ["Tích hợp hệ thống", "Trình diễn", "Tối ưu"]
    ],
    game_programming: [
      ["HTML/CSS cơ bản", "Bố cục UI", "Thiết kế"],
      ["JavaScript logic", "Xử lý sự kiện", "DOM"],
      ["Responsive design", "Tương tác nâng cao", "API"],
      ["Deploy & Test", "UX tối ưu", "Portfolio"]
    ],
    multimedia: [
      ["Bố cục", "Lý thuyết màu", "Typography"],
      ["Thiết kế vector", "Minh họa số", "Branding"],
      ["Animation", "Motion graphics", "Storyboard"],
      ["Mô hình 3D", "Rendering", "Trình bày"]
    ]
  };
  return m[d]?.[idx] || m.robotics[idx] || ["Khám phá", "Thực hành", "Sáng tạo"];
}

const stageIcons = [Lightbulb, Cpu, Wrench, Rocket];

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT — Future Profile Dashboard
   Reference design: clean flat pastel, illustration hero,
   2-column layout, horizontal timeline, icon-rich cards
   ───────────────────────────────────────────────────────────── */
export function ProfileResult({ answers, setAnswers, profile, initialTab }: CommonProps) {
  /* ── State ────────────────────────────────── */
  const [activeMainTab, setActiveMainTab] = useState<"profile" | "dashboard" | "website">(
    initialTab || "profile"
  );
  const [viewMode, setViewMode] = useState<"student" | "parent">("student");
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(0);
  const [selectedFeatureId, setSelectedFeatureId] = useState<string | null>(null);
  const [expandedEvidence, setExpandedEvidence] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [projectStatuses, setProjectStatuses] = useState<Record<string, ProjectProgressStatus>>({
    P1: "not_started", P2: "not_started", P3: "not_started", P4: "not_started"
  });
  const [taskChecks, setTaskChecks] = useState<Record<string, boolean>>({});
  const [modalCode, setModalCode] = useState<string | null>(null);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [avatarModalTab, setAvatarModalTab] = useState<"banner" | "custom" | "system" | "ai-prompt">("banner");
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [guideStep, setGuideStep] = useState<number>(0); // 0=CTA, 1=copy, 2=open, 3=build, 4=refine

  const handleOpenAvatarModal = (tab: "banner" | "custom" | "system" | "ai-prompt" = "banner") => {
    setAvatarModalTab(tab);
    setShowAvatarModal(true);
  };

  useEffect(() => {
    if (initialTab) {
      setActiveMainTab(initialTab);
    }
  }, [initialTab]);

  /* ── Derived Data ─────────────────────────── */
  const activeAnswers = answers;
  const isPrimary = !activeAnswers.grade || parseInt(activeAnswers.grade, 10) <= 5;

  const personalizedProjects = useMemo(() => generatePersonalizedProjects(activeAnswers), [activeAnswers]);
  const evidenceCards = useMemo(() => extractSIOEvidenceCards(activeAnswers), [activeAnswers]);
  const radarData = useMemo(() => mapEvidenceToRadar(evidenceCards), [evidenceCards]);
  const selectedProject = personalizedProjects[selectedStageIndex] || personalizedProjects[0];
  const hoursPerWeek = activeAnswers.hoursPerWeek || (isPrimary ? 2 : 3);
  const totalWeeks = Math.ceil(12 / hoursPerWeek);

  const resolvedProfileBanner = useMemo(() => {
    if (activeAnswers.customAvatarData) return activeAnswers.customAvatarData;
    return isPrimary ? "/assets/profile-may-banner.png" : "/assets/profile-nova-banner.png";
  }, [activeAnswers.customAvatarData, isPrimary]);

  const resolvedAvatarSrc =
    activeAnswers.avatarSource === "custom" && activeAnswers.customAvatarData
      ? activeAnswers.customAvatarData
      : activeAnswers.avatar === "builder" ? "/assets/kittenbot-builder.png"
      : activeAnswers.avatar === "explorer" ? "/assets/kittenbot-explorer.png"
      : "/assets/kittenbot-creator.png";

  const { safePayload, fullPrompt } = useMemo(
    () => buildSafeAIStudioPrompt(activeAnswers, personalizedProjects),
    [activeAnswers, personalizedProjects]
  );

  const traits = activeAnswers.confirmedTraits || [];
  const futureSelf = activeAnswers.futureSelf || "Nhà Sáng Tạo Tương Lai";

  /* ── Handlers ─────────────────────────────── */
  const handleStatusChange = (pid: string, s: ProjectProgressStatus) =>
    setProjectStatuses(prev => ({ ...prev, [pid]: s }));
  const toggleTask = (tid: string) =>
    setTaskChecks(prev => ({ ...prev, [tid]: !prev[tid] }));
  const handleSaveAvatar = (source: "system" | "custom", customData?: string, systemAvatar?: string) =>
    setAnswers(prev => ({ ...prev, avatarSource: source, customAvatarData: customData, avatar: systemAvatar || prev.avatar }));
  const handleUpdateName = (name: string) => {
    setAnswers(prev => ({ ...prev, name }));
  };
  const copyPromptToClipboard = async () => {
    await navigator.clipboard.writeText(fullPrompt);
    setCopiedPrompt(true);
    window.setTimeout(() => setCopiedPrompt(false), 2400);
  };

  /* ─────────────────────────────────────────────────────────
     RENDER — Flat pastel dashboard inspired by reference
     ───────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen space-y-5 pb-16" style={{ background: "linear-gradient(180deg, #EFF8F6 0%, #F5F9FE 40%, #FFFDF7 100%)" }}>

      {/* ═══════════════════════════════════════════════════════
          {/* TOP BAR — Navigation Tabs + Actions */}
          <div className="rounded-3xl bg-white/80 backdrop-blur-md border border-white/80 p-3 sm:p-4 shadow-xs">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          {/* Main Navigation Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto p-1 rounded-2xl bg-[#e8f5f2]/80 border border-[#c8e6df]/50">
            <button
              type="button"
              onClick={() => setActiveMainTab("profile")}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-extrabold transition shrink-0 ${
                activeMainTab === "profile"
                  ? "bg-white text-[#1a8a7d] shadow-sm"
                  : "text-slate-600 hover:text-[#1a8a7d]"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Hồ Sơ Tương Lai (Profile)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveMainTab("dashboard")}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-extrabold transition shrink-0 ${
                activeMainTab === "dashboard"
                  ? "bg-white text-[#1a8a7d] shadow-sm"
                  : "text-slate-600 hover:text-[#1a8a7d]"
              }`}
            >
              <BarChart3 className="h-3.5 w-3.5 text-[#1a8a7d]" />
              <span>Báo Cáo & Lộ Trình 4 Chặng</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveMainTab("website")}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-extrabold transition shrink-0 ${
                activeMainTab === "website"
                  ? "bg-white text-[#1a8a7d] shadow-sm"
                  : "text-slate-600 hover:text-[#1a8a7d]"
              }`}
            >
              <Rocket className="h-3.5 w-3.5 text-sky-500" />
              <span>Website Future Me</span>
            </button>
          </div>

          {/* Action Buttons: Thay ảnh đại diện & Chế độ xem */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => handleOpenAvatarModal("ai-prompt")}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-3.5 py-1.5 text-[11px] font-extrabold shadow-xs transition shrink-0"
            >
              <Sparkles className="h-3.5 w-3.5 text-yellow-200" /> Tạo ảnh AI
            </button>

            <button
              type="button"
              onClick={() => handleOpenAvatarModal("banner")}
              className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#c8e6df] px-3.5 py-1.5 text-[11px] font-bold text-[#1a8a7d] shadow-xs hover:bg-[#eff8f6] transition shrink-0"
            >
              <Camera className="h-3.5 w-3.5" /> Đổi ảnh bìa
            </button>

            <div className="flex items-center gap-1 rounded-full bg-[#e8f5f2] p-0.5">
              <button
                type="button"
                onClick={() => setViewMode("student")}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-bold transition ${
                  viewMode === "student" ? "bg-white text-[#1a8a7d] shadow-xs" : "text-slate-500"
                }`}
              >
                <User className="h-3.5 w-3.5" /> Học sinh
              </button>
              <button
                type="button"
                onClick={() => setViewMode("parent")}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-bold transition ${
                  viewMode === "parent" ? "bg-white text-amber-700 shadow-xs" : "text-slate-500"
                }`}
              >
                <UserCheck className="h-3.5 w-3.5" /> Phụ huynh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          VIEW 1: FULL FUTURE PROFILE CARD
          Exact match for ChatGPT Image 14_01_20 17 thg 9, 2026.png
         ═══════════════════════════════════════════════════════ */}
      {activeMainTab === "profile" && (
        <StudentProfileCard
          answers={activeAnswers}
          isPrimary={isPrimary}
          viewMode={viewMode}
          onEditAvatar={(tab) => handleOpenAvatarModal(tab || "banner")}
          onGoToRoadmap={() => setActiveMainTab("dashboard")}
          onGoToWebsite={() => setActiveMainTab("website")}
          onOpenStandardsModal={(code) => setModalCode(code)}
          evidenceCards={evidenceCards}
          onUpdateName={handleUpdateName}
          projects={personalizedProjects}
          onSelectProject={(projectIdx) => {
            setSelectedStageIndex(projectIdx);
            setSelectedFeatureId(null);
            setActiveMainTab("dashboard");
            window.scrollTo({ top: 300, behavior: "smooth" });
          }}
          onSelectCapability={(capId) => {
            for (let pIdx = 0; pIdx < personalizedProjects.length; pIdx++) {
              const proj = personalizedProjects[pIdx];
              const feat = proj.features?.find(f =>
                f.knowledgeIds?.includes(capId) ||
                f.skillIds?.includes(capId) ||
                f.competencyIds?.includes(capId)
              );
              if (feat) {
                setSelectedStageIndex(pIdx);
                setSelectedFeatureId(feat.id);
                setActiveMainTab("dashboard");
                window.scrollTo({ top: 350, behavior: "smooth" });
                return;
              }
            }
            setActiveMainTab("dashboard");
          }}
        />
      )}

      {/* ═══════════════════════════════════════════════════════
          VIEW 2: RESULT NOTIFICATION & 4-STAGE ROADMAP DASHBOARD
          Exact match for ChatGPT Image 13_58_21 17 thg 9, 2026.png
         ═══════════════════════════════════════════════════════ */}
      {activeMainTab !== "profile" && (
        <>
          {/* HERO — "Hành trình của con" */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#e0f5ef] via-[#eaf7f4] to-[#f0f4ff] border border-[#c8e6df]/50 p-6 sm:p-8">
            {/* Decorative sparkles */}
            <div className="pointer-events-none absolute top-4 left-6 text-amber-400 opacity-60">✦</div>
            <div className="pointer-events-none absolute top-8 right-20 text-tek-400 opacity-40 text-2xl">✧</div>

            <div className="relative z-10 grid gap-6 md:grid-cols-[auto_1fr] items-center">
              {/* Left: Illustration Character with Laptop & Cat */}
              <div className="relative flex flex-col items-center justify-center">
                <div className="relative w-64 sm:w-72 md:w-80 h-44 sm:h-48 md:h-52 rounded-2xl overflow-hidden drop-shadow-md bg-white border border-[#c8e6df]/50">
                  <img
                    src={resolvedProfileBanner}
                    alt="Hành trình của con"
                    className="h-full w-full object-cover object-center transition duration-500"
                  />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenAvatarModal("ai-prompt")}
                    className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2.5 py-1 text-[10px] font-bold shadow-xs hover:opacity-95 transition"
                  >
                    <Sparkles className="h-3 w-3 text-yellow-200" /> Tạo ảnh AI
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenAvatarModal("banner")}
                    className="inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 px-2.5 py-1 text-[10px] font-bold text-slate-600 shadow-xs hover:bg-white transition"
                  >
                    <Camera className="h-3 w-3" /> Đổi ảnh
                  </button>
                </div>
              </div>

              {/* Right: Info & Dream Project Card */}
              <div className="flex flex-col justify-center">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="rounded-full bg-[#1a8a7d] px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-white">
                        {isPrimary ? "Tiểu học" : "THCS"}
                      </span>
                      <span className="text-[11px] text-slate-400 font-semibold">
                        {isPrimary ? "Khám phá · Tạo ra · Vui học mỗi ngày!" : "Học sáng tạo · Làm dự án · Kiến tạo tương lai!"}
                      </span>
                    </div>
                    <h1 className="text-2xl font-extrabold text-[#1a3a4a] sm:text-3xl tracking-tight">
                      Hành trình của {activeAnswers.name || "con"}
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                      Mỗi ý tưởng nhỏ hôm nay sẽ tạo nên một tương lai tuyệt vời!
                    </p>
                  </div>
                  <div className="hidden sm:block text-right">
                    <span className="inline-block text-xs font-bold text-amber-600 italic">
                      Con làm được rất tốt! ☀️
                    </span>
                  </div>
                </div>

                {/* Dream Project Mini Card — with robot book illustration */}
                <div className="mt-4 flex items-start gap-3.5 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#c8e6df]/70 p-4 shadow-xs">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl overflow-hidden bg-[#e0f5ef] shrink-0 border border-[#c8e6df]/50">
                    <img src="/assets/dashboard-robot-book.png" alt="Robot Thủ Thư Nhí" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-[#1a8a7d] uppercase tracking-wider">Ước mơ của con</p>
                    <p className="text-sm sm:text-base font-extrabold text-[#1a3a4a] mt-0.5 leading-snug break-words">
                      {activeAnswers.projectName || "Robot Thủ Thư Nhí"}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed line-clamp-2">
                      {activeAnswers.dreamPurpose || "Tạo một robot giúp sắp xếp sách, gợi ý sách hay và lan tỏa niềm vui đọc sách cho mọi người."}
                    </p>

                    {/* Metrics Row */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        { icon: Target, value: "4 dự án", sub: "trong hành trình" },
                        { icon: Clock, value: `${totalWeeks} tuần`, sub: "dự kiến hoàn thành" },
                        { icon: Zap, value: `${hoursPerWeek} giờ/tuần`, sub: "thời gian gợi ý" },
                      ].map(m => (
                        <div key={m.sub} className="inline-flex items-center gap-1.5 rounded-full bg-[#fafdfb] border border-[#c8e6df]/60 px-2.5 py-1 text-[10px] font-bold shadow-2xs">
                          <m.icon className="h-3 w-3 text-[#1a8a7d]" />
                          <span className="text-[#1a3a4a] font-extrabold">{m.value}</span>
                          <span className="text-slate-400 font-normal">{m.sub}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

      {/* ═══════════════════════════════════════════════════════
          ROW 2 — TWO COLUMNS: Evidence + Roadmap Map
          (Inspired by reference: "Điều con đã thể hiện" + "Bản đồ 4 chặng")
         ═══════════════════════════════════════════════════════ */}
      <div className="grid gap-5 lg:grid-cols-2">

        {/* ── LEFT: Điều con đã thể hiện ── */}
        <section className="rounded-3xl bg-white border border-[#e2ede9] p-5 sm:p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-amber-500 text-lg">⭐</span>
            <div>
              <h2 className="text-base font-extrabold text-[#1a3a4a]">Điều con đã thể hiện</h2>
              <p className="text-[10px] text-slate-400">Năng lực nổi bật qua các hoạt động và sản phẩm</p>
            </div>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-3">
            {evidenceCards.slice(0, 3).map(card => {
              const isExp = expandedEvidence === card.id;
              const hasData = card.sourceType !== "insufficient_evidence";
              const icons = [
                { icon: Cpu, bg: "bg-[#e0f5ef]", color: "text-[#1a8a7d]" },
                { icon: Layers, bg: "bg-[#e8ecfb]", color: "text-[#5b6abf]" },
                { icon: Lightbulb, bg: "bg-[#fef3e2]", color: "text-amber-600" },
              ];
              const ic = icons[evidenceCards.indexOf(card)] || icons[0];

              return (
                <button key={card.id} type="button" onClick={() => setExpandedEvidence(isExp ? null : card.id)}
                  className={`group text-left rounded-2xl border p-4 transition-all duration-300 ${
                    isExp ? "border-[#1a8a7d] bg-[#f5fbfa] shadow-md ring-1 ring-[#c8e6df]" : "border-[#e8f0ed] bg-[#fafcfb] hover:border-[#c8e6df] hover:shadow-sm"
                  }`}>
                  <span className={`grid h-9 w-9 place-items-center rounded-xl ${ic.bg} ${ic.color} shadow-xs mb-3`}>
                    <ic.icon className="h-4 w-4" />
                  </span>
                  <p className="text-xs font-extrabold text-[#1a3a4a] leading-snug">{card.stageName.split(" & ")[0]}</p>
                  <p className="text-[10px] text-slate-400 mt-1 leading-4 line-clamp-2">
                    {hasData
                      ? card.responsePreview.replace(/^Học sinh (đã trả lời|đã trình bày|đề xuất cách giải quyết): "/, "").replace(/"$/, "").slice(0, 60) + "..."
                      : "Chưa ghi nhận"
                    }
                  </p>

                  {/* Expanded */}
                  <div className={`overflow-hidden transition-all duration-400 ${isExp ? "max-h-60 opacity-100 mt-3" : "max-h-0 opacity-0"}`}>
                    <div className="rounded-xl bg-white p-3 border border-[#e2ede9] text-[11px] text-slate-600 leading-5">
                      <p className="font-bold text-[#1a3a4a] mb-1">{card.questionPrompt}</p>
                      <p>{card.responsePreview}</p>
                    </div>
                    <p className="mt-1.5 text-[9px] text-slate-400 italic">*{card.caveat}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── RIGHT: Bản đồ 4 chặng ── */}
        <section className="rounded-3xl bg-white border border-[#e2ede9] p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-extrabold text-[#1a3a4a]">Bản đồ 4 chặng</h2>
              <p className="text-[10px] text-slate-400">Hành trình chinh phục ước mơ của con</p>
            </div>
          </div>

          {/* Horizontal Timeline */}
          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-5 left-[10%] right-[10%] h-[3px] rounded-full bg-gradient-to-r from-[#1a8a7d] via-[#fbbf24] to-[#1a8a7d] opacity-20" />

            <div className="flex justify-between relative z-10">
              {personalizedProjects.map((p, idx) => {
                const isDream = p.isDreamProject;
                const status = projectStatuses[p.id] || "not_started";
                const isActive = selectedStageIndex === idx;
                const StageIcon = stageIcons[idx] || Rocket;

                return (
                  <button key={p.id} type="button"
                    onClick={() => {
                      setSelectedStageIndex(idx);
                      setSelectedFeatureId(null);
                    }}
                    className="group flex flex-col items-center w-1/4 text-center">
                    {/* Node */}
                    <div className={`relative grid place-items-center rounded-full border-[3px] transition-all duration-300 ${
                      isDream
                        ? "h-10 w-10 sm:h-12 sm:w-12 border-amber-400 bg-gradient-to-br from-amber-50 to-amber-100"
                        : isActive
                        ? "h-10 w-10 sm:h-12 sm:w-12 border-[#1a8a7d] bg-[#e0f5ef] ring-4 ring-[#c8e6df]/40"
                        : status === "verified"
                        ? "h-10 w-10 sm:h-12 sm:w-12 border-emerald-400 bg-emerald-50"
                        : "h-10 w-10 sm:h-12 sm:w-12 border-slate-300 bg-white group-hover:border-[#1a8a7d]/60"
                    }`}>
                      {isDream ? <Star className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                        : status === "verified" ? <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        : <StageIcon className="h-4 w-4 sm:h-5 sm:w-5 text-slate-500 group-hover:text-[#1a8a7d]" />}
                    </div>

                    {/* Label */}
                    <p className="mt-2 text-[10px] font-extrabold text-[#1a3a4a] sm:text-[11px] leading-tight">
                      {isDream ? "Chặng Ước Mơ" : `Chặng ${idx + 1}`}
                    </p>
                    <p className="text-[9px] text-slate-400 mt-0.5 hidden sm:block">
                      {p.name.length > 20 ? p.name.slice(0, 18) + "…" : p.name}
                    </p>

                    {/* Status badge */}
                    <span className={`mt-1.5 inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[8px] font-bold ${
                      status === "verified" ? "bg-emerald-100 text-emerald-700"
                        : status === "in_progress" ? "bg-sky-100 text-sky-700"
                        : status === "submitted" ? "bg-amber-100 text-amber-700"
                        : "bg-slate-100 text-slate-500"
                    }`}>
                      {status === "verified" ? "✓ Hoàn thành"
                        : status === "in_progress" ? "● Đang làm"
                        : status === "submitted" ? "✓ Đã nộp"
                        : "○ Chưa bắt đầu"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* ═══════════════════════════════════════════════════════
          ROW 3 — TWO COLUMNS: Chi tiết dự án + Góc phụ huynh/Profile
         ═══════════════════════════════════════════════════════ */}
      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">

        {/* ── LEFT: Chi tiết dự án & Lộ trình chức năng (3 cấp) ── */}
        <section className="rounded-3xl bg-white border border-[#e2ede9] p-5 sm:p-6 shadow-xs">
          {/* Header with nav */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-[#1a3a4a]">
                  {selectedFeatureId ? "Lộ trình Chức Năng (Cấp 3)" : "Lộ trình Dự Án (Cấp 2)"}
                </h2>
                <span className="rounded-md bg-[#e0f5ef] px-2 py-0.5 text-[10px] font-bold text-[#1a8a7d]">
                  {selectedProject.id}
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                {selectedFeatureId
                  ? "Chi tiết nhiệm vụ học tập, tiêu chí hoàn thành & minh chứng của chức năng"
                  : "Chức năng sản phẩm cần hoàn thành để phục vụ Dream Project"}
              </p>
            </div>
            {/* Project Nav */}
            <div className="flex items-center gap-1">
              <button type="button" disabled={selectedStageIndex === 0}
                onClick={() => {
                  setSelectedStageIndex(i => Math.max(0, i - 1));
                  setSelectedFeatureId(null);
                }}
                className={`rounded-lg p-1.5 ${selectedStageIndex === 0 ? "text-slate-300" : "text-slate-500 hover:bg-slate-50"}`}>
                <ArrowLeft className="h-4 w-4" />
              </button>
              <select value={selectedStageIndex} onChange={e => {
                setSelectedStageIndex(Number(e.target.value));
                setSelectedFeatureId(null);
              }}
                className="rounded-xl border border-[#e2ede9] bg-[#fafcfb] px-3 py-1.5 text-[11px] font-bold text-[#1a3a4a] outline-none focus:border-[#1a8a7d]">
                {personalizedProjects.map((p, i) => (
                  <option key={p.id} value={i}>Dự án {i + 1}: {p.name.slice(0, 25)}…</option>
                ))}
              </select>
              <button type="button" disabled={selectedStageIndex === 3}
                onClick={() => {
                  setSelectedStageIndex(i => Math.min(3, i + 1));
                  setSelectedFeatureId(null);
                }}
                className={`rounded-lg p-1.5 ${selectedStageIndex === 3 ? "text-slate-300" : "text-slate-500 hover:bg-slate-50"}`}>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* CẤP 3: FUNCTION ROADMAP CHI TIẾT KHI ĐÃ CHỌN CHỨC NĂNG */}
          {selectedFeatureId && selectedProject.features?.find(f => f.id === selectedFeatureId) ? (() => {
            const activeFeature = selectedProject.features!.find(f => f.id === selectedFeatureId)!;
            const modeLabels: Record<string, string> = {
              physical: "Lắp ráp cơ khí / vật lý",
              simulation: "Mô phỏng giả lập",
              software: "Phần mềm & thuật toán",
              design: "Thiết kế & mỹ thuật số"
            };

            return (
              <div className="rounded-2xl bg-[#fafcfb] border border-[#c8e6df] p-4 sm:p-5 space-y-4">
                {/* Back navigation */}
                <button
                  type="button"
                  onClick={() => setSelectedFeatureId(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a8a7d] hover:underline"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Trở lại danh sách chức năng của {selectedProject.id}
                </button>

                {/* Feature Header */}
                <div className="rounded-xl bg-white border border-[#e2ede9] p-4">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="rounded-md bg-emerald-100 text-emerald-800 font-mono text-[10px] font-extrabold px-2 py-0.5">
                      {activeFeature.id}
                    </span>
                    <h3 className="text-sm font-extrabold text-[#1a3a4a]">
                      {activeFeature.name}
                    </h3>
                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                      activeFeature.scope === "mvp" ? "bg-amber-100 text-amber-800" : "bg-purple-100 text-purple-800"
                    }`}>
                      {activeFeature.scope === "mvp" ? "MVP Cốt lõi" : "Phần Mở rộng"}
                    </span>
                    <span className="rounded-full bg-slate-100 text-slate-600 px-2 py-0.5 text-[9px] font-semibold">
                      {modeLabels[activeFeature.implementationMode] || activeFeature.implementationMode}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    {activeFeature.description}
                  </p>

                  {/* Target Capability Links */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Mục tiêu năng lực hỗ trợ:
                    </span>
                    {activeFeature.knowledgeIds?.map(kid => (
                      <span key={kid} className="inline-flex items-center gap-1 rounded-md bg-sky-50 border border-sky-200 px-2 py-0.5 text-[10px] font-mono font-bold text-sky-700">
                        <BookOpen className="h-2.5 w-2.5" /> {kid}
                      </span>
                    ))}
                    {activeFeature.skillIds?.map(sid => (
                      <span key={sid} className="inline-flex items-center gap-1 rounded-md bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-700">
                        <Wrench className="h-2.5 w-2.5" /> {sid}
                      </span>
                    ))}
                    {activeFeature.competencyIds?.map(cid => (
                      <span key={cid} className="inline-flex items-center gap-1 rounded-md bg-purple-50 border border-purple-200 px-2 py-0.5 text-[10px] font-mono font-bold text-purple-700">
                        <Brain className="h-2.5 w-2.5" /> {cid}
                      </span>
                    ))}
                    <button
                      type="button"
                      onClick={() => setActiveMainTab("profile")}
                      className="text-[10px] font-bold text-[#1a8a7d] hover:underline ml-auto"
                    >
                      Xem trong Profile ↗
                    </button>
                  </div>
                </div>

                {/* Function Learning Tasks */}
                <div className="rounded-xl bg-white border border-[#e2ede9] p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-extrabold text-[#1a3a4a] flex items-center gap-1.5">
                      <CheckSquare className="h-4 w-4 text-[#1a8a7d]" />
                      Nhiệm vụ học tập để hoàn thành chức năng ({activeFeature.tasks?.length || 0})
                    </h4>
                    <span className="text-[10px] text-slate-400">Đánh dấu khi đã hoàn thành</span>
                  </div>

                  <div className="space-y-2">
                    {activeFeature.tasks?.map((task) => {
                      const checkKey = `${activeFeature.id}-${task.id}`;
                      const isChecked = Boolean(taskChecks[checkKey]);

                      return (
                        <div
                          key={task.id}
                          onClick={() => toggleTask(checkKey)}
                          className={`flex items-start gap-2.5 p-2.5 rounded-xl border transition cursor-pointer ${
                            isChecked
                              ? "bg-slate-50 border-slate-200 text-slate-400"
                              : "bg-white border-slate-200/80 hover:border-[#1a8a7d] text-[#1a3a4a]"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="mt-0.5 h-4 w-4 rounded-md accent-[#1a8a7d]"
                          />
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs leading-5 font-medium ${isChecked ? "line-through text-slate-400" : "text-slate-800"}`}>
                              {task.description}
                            </p>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {task.knowledgeIds?.map(kid => (
                                <span key={kid} className="text-[9px] font-mono font-bold bg-sky-50 text-sky-700 px-1.5 py-0.2 rounded border border-sky-100">
                                  {kid}
                                </span>
                              ))}
                              {task.skillIds?.map(sid => (
                                <span key={sid} className="text-[9px] font-mono font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded border border-emerald-100">
                                  {sid}
                                </span>
                              ))}
                              {task.competencyIds?.map(cid => (
                                <span key={cid} className="text-[9px] font-mono font-bold bg-purple-50 text-purple-700 px-1.5 py-0.2 rounded border border-purple-100">
                                  {cid}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Deliverable, Success Criteria & Evidence Artifacts */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-white border border-[#c8e6df]/60 p-3.5 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#1a3a4a]">
                      <Target className="h-4 w-4 text-[#1a8a7d]" />
                      Sản phẩm đầu ra chức năng
                    </div>
                    <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                      {activeFeature.deliverable}
                    </p>
                    <div className="mt-2 pt-2 border-t border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Minh chứng thu thập:
                      </p>
                      <ul className="space-y-1">
                        {activeFeature.evidenceArtifacts?.map((art, ai) => (
                          <li key={ai} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                            <FileText className="h-3 w-3 text-emerald-600 shrink-0" />
                            <span>{art}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-xl bg-white border border-amber-200/60 p-3.5 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#1a3a4a]">
                      <CheckCircle2 className="h-4 w-4 text-amber-600" />
                      Tiêu chí nghiệm thu chức năng
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {activeFeature.successCriteria?.map((crit, ci) => (
                        <li key={ci} className="flex items-start gap-1.5 text-[11px] leading-relaxed">
                          <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{crit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })() : (
            /* CẤP 2: PROJECT ROADMAP & DANH SÁCH CHỨC NĂNG CỦA CHẶNG */
            <div className="space-y-4">
              {/* Project Role Banner */}
              <div className="rounded-2xl bg-[#fafcfb] border border-[#e8f0ed] p-4 sm:p-5">
                <div className="flex items-start gap-4">
                  <div className="hidden sm:flex shrink-0 w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-[#e0f5ef] to-[#d4eee7] items-center justify-center border border-[#c8e6df]/40 shadow-xs">
                    <img
                      src={selectedStageIndex === 1 ? "/assets/dashboard-robot-track.png" : (selectedProject.image || "/assets/dashboard-robot-track.png")}
                      alt="Project"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-[#1a8a7d] text-white font-mono text-[10px] font-extrabold px-2 py-0.5">
                        {selectedProject.id}
                      </span>
                      <h3 className="text-sm font-extrabold text-[#1a3a4a] leading-snug">
                        {selectedProject.name}
                      </h3>
                      {selectedProject.isDreamProject && (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-extrabold text-amber-700">★ Dream Project</span>
                      )}
                    </div>
                    {/* Role description personalized */}
                    <div className="mt-1.5 rounded-lg bg-emerald-50/70 border border-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-900 leading-snug">
                      🎯 <span className="font-bold">Vai trò chặng:</span> {selectedProject.roleDescription}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">{selectedProject.goal}</p>
                  </div>
                </div>

                {/* Deliverable + Completion summary */}
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <div className="rounded-xl bg-white border border-[#c8e6df]/50 p-3 flex items-start gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#e0f5ef] text-[#1a8a7d] shrink-0">
                      <Target className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="text-[9px] font-bold text-[#1a8a7d] uppercase tracking-wider">Sản phẩm chặng</p>
                      <p className="text-[11px] font-bold text-[#1a3a4a] mt-0.5 leading-4">{selectedProject.deliverable}</p>
                    </div>
                  </div>
                  <div className="rounded-xl bg-white border border-[#c8e6df]/50 p-3 flex items-start gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-amber-50 text-amber-600 shrink-0">
                      <Flag className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="text-[9px] font-bold text-amber-600 uppercase tracking-wider">Tiêu chí nghiệm thu</p>
                      <p className="text-[11px] font-bold text-[#1a3a4a] mt-0.5 leading-4">{selectedProject.completionCheck}</p>
                    </div>
                  </div>
                </div>

                {/* Status selector */}
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500 font-medium">Trạng thái:</span>
                    <select value={projectStatuses[selectedProject.id] || "not_started"}
                      onChange={e => handleStatusChange(selectedProject.id, e.target.value as ProjectProgressStatus)}
                      className="rounded-full border border-[#e2ede9] bg-white px-3 py-1 text-[11px] font-bold text-slate-600 outline-none focus:border-[#1a8a7d]">
                      <option value="not_started">○ Chưa bắt đầu</option>
                      <option value="in_progress">● Đang làm</option>
                      <option value="submitted">✓ Đã nộp</option>
                      <option value="verified">✓ Đã xác nhận</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* FUNCTION-LEVEL ROADMAP LIST (CẤP 2 -> CẤP 3) */}
              <div className="rounded-2xl bg-white border border-[#e2ede9] p-4 sm:p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-xs font-extrabold text-[#1a3a4a] uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="h-4 w-4 text-[#1a8a7d]" />
                      Lộ trình chức năng sản phẩm ({selectedProject.features?.length || 0} chức năng)
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Bấm vào từng chức năng để xem chi tiết kiến thức, kỹ năng, nhiệm vụ và tiêu chí
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {(selectedProject.features || []).map((feature) => (
                    <div
                      key={feature.id}
                      onClick={() => setSelectedFeatureId(feature.id)}
                      className="group p-3.5 rounded-2xl border border-slate-200 bg-[#fafcfb] hover:bg-white hover:border-[#1a8a7d] hover:shadow-xs transition cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-slate-200 text-slate-800">
                              {feature.id}
                            </span>
                            <span className="text-xs font-extrabold text-[#1a3a4a] group-hover:text-[#1a8a7d] transition">
                              {feature.name}
                            </span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                              feature.scope === "mvp" ? "bg-amber-100 text-amber-800" : "bg-purple-100 text-purple-800"
                            }`}>
                              {feature.scope === "mvp" ? "MVP" : "Mở rộng"}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                            {feature.description}
                          </p>

                          {/* Associated Targets */}
                          <div className="mt-2 flex flex-wrap items-center gap-1.5">
                            {feature.knowledgeIds?.map(kid => (
                              <span key={kid} className="text-[9px] font-mono font-bold bg-sky-50 text-sky-700 px-1.5 py-0.2 rounded border border-sky-100">
                                {kid}
                              </span>
                            ))}
                            {feature.skillIds?.map(sid => (
                              <span key={sid} className="text-[9px] font-mono font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded border border-emerald-100">
                                {sid}
                              </span>
                            ))}
                            {feature.competencyIds?.map(cid => (
                              <span key={cid} className="text-[9px] font-mono font-bold bg-purple-50 text-purple-700 px-1.5 py-0.2 rounded border border-purple-100">
                                {cid}
                              </span>
                            ))}
                            <span className="text-[10px] text-slate-400 ml-auto font-medium">
                              {feature.tasks?.length || 0} nhiệm vụ · {feature.successCriteria?.length || 0} tiêu chí
                            </span>
                          </div>
                        </div>

                        <span className="mt-1 text-slate-400 group-hover:text-[#1a8a7d] group-hover:translate-x-0.5 transition-all">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stage General Task Checklist */}
              <div className="rounded-2xl bg-[#fafcfb] border border-[#e8f0ed] p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-extrabold text-[#1a3a4a] flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-[#1a8a7d]" />
                    Tiến độ chặng {selectedProject.id}
                  </h4>
                  <span className="text-[10px] text-slate-400">Các mốc hoàn thành chính</span>
                </div>
                <div className="space-y-1.5">
                  {selectedProject.tasks.map((task, ti) => {
                    const taskId = `${selectedProject.id}-${ti}`;
                    const checked = Boolean(taskChecks[taskId]);
                    return (
                      <label key={ti} className="flex items-start gap-2 cursor-pointer group">
                        <input type="checkbox" checked={checked} onChange={() => toggleTask(taskId)}
                          className="mt-0.5 h-4 w-4 rounded-md accent-[#1a8a7d]" />
                        <span className={`text-[11px] leading-5 ${checked ? "text-slate-400 line-through" : "text-slate-700"}`}>
                          {task}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ── RIGHT: Góc phụ huynh / Profile Card ── */}
        <section className="rounded-3xl bg-white border border-[#e2ede9] p-5 sm:p-6 shadow-xs">
          {viewMode === "parent" ? (
            /* ── PARENT VIEW ── */
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-amber-50 text-amber-600">
                  <Heart className="h-4 w-4" />
                </span>
                <div>
                  <h2 className="text-base font-extrabold text-[#1a3a4a]">Góc dành cho ba mẹ</h2>
                  <p className="text-[10px] text-slate-400">Thông tin tham chiếu và nhận xét từ quá trình học</p>
                </div>
              </div>

              <div className="space-y-3">
                {/* Standards reference */}
                <div className="flex items-center justify-between rounded-2xl bg-[#fafcfb] border border-[#e8f0ed] p-3.5">
                  <div className="flex items-start gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#e0f5ef] text-[#1a8a7d] shrink-0">
                      <BookOpen className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-extrabold text-[#1a3a4a]">Cơ sở tham chiếu</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Dựa trên khung năng lực quốc tế & chương trình Tin học phổ thông</p>
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button type="button" onClick={() => setModalCode("CSTA-ALGO")}
                      className="rounded-full border border-[#1a8a7d] px-2 py-0.5 text-[9px] font-bold text-[#1a8a7d] hover:bg-[#e0f5ef] transition">CSTA</button>
                    <button type="button" onClick={() => setModalCode("NLS-3.4")}
                      className="rounded-full border border-[#1a8a7d] px-2 py-0.5 text-[9px] font-bold text-[#1a8a7d] hover:bg-[#e0f5ef] transition">NLS 3.4</button>
                  </div>
                </div>

                {/* Parent insights */}
                <div className="rounded-2xl bg-[#fafcfb] border border-[#e8f0ed] p-3.5 flex items-start gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                    <BarChart3 className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-extrabold text-[#1a3a4a]">Điều con đang làm tốt</p>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-4">
                      {evidenceCards.filter(c => c.sourceType === "student_situation").length > 0
                        ? "Con có tư duy logic tốt, kiên trì thử nghiệm và rất hứng thú với công nghệ."
                        : "Con đang trong giai đoạn khám phá ban đầu."}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#fafcfb] border border-[#e8f0ed] p-3.5 flex items-start gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-50 text-amber-600 shrink-0">
                    <Compass className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-extrabold text-[#1a3a4a]">Cần quan sát thêm</p>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-4">
                      Con có thể luyện thêm kỹ năng ghi chép và trình bày ý tưởng rõ ràng hơn.
                    </p>
                  </div>
                </div>

                {/* Family resources */}
                <div className="rounded-2xl bg-gradient-to-r from-[#e0f5ef]/30 to-amber-50/20 border border-[#e2ede9] p-3.5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Nguồn lực gia đình</p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-white border border-[#c8e6df]/60 px-2.5 py-0.5 text-[10px] font-bold text-[#1a3a4a]">
                      ⏰ {hoursPerWeek}h/tuần
                    </span>
                    {activeAnswers.supportMode?.map(sm => (
                      <span key={sm} className="rounded-full bg-white border border-[#c8e6df]/60 px-2.5 py-0.5 text-[10px] font-bold text-[#1a3a4a]">
                        🤝 {sm}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ── STUDENT PROFILE MINI PREVIEW IN DASHBOARD ── */
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🌟</span>
                  <div>
                    <h2 className="text-base font-extrabold text-[#1a3a4a]">Hồ Sơ Tương Lai Của Con</h2>
                    <p className="text-[10px] text-slate-400">Xem thành quả và profile hoàn thiện sau 4 chặng</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveMainTab("profile")}
                  className="inline-flex items-center gap-1 text-xs font-extrabold text-[#1a8a7d] hover:underline"
                >
                  Xem toàn bộ <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Compact Card Preview with Cover Banner Image */}
              <div
                onClick={() => setActiveMainTab("profile")}
                className="group cursor-pointer rounded-2xl border border-[#c8e6df] bg-white overflow-hidden shadow-xs transition hover:shadow-md hover:border-[#1a8a7d]"
              >
                <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden">
                  <img
                    src={resolvedProfileBanner}
                    alt="Profile Preview"
                    className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5 rounded-full bg-[#1a8a7d] px-2.5 py-0.5 text-[9px] font-extrabold text-white shadow-xs">
                    {isPrimary ? "Tiểu học" : "THCS"}
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-extrabold text-[#1a3a4a] group-hover:text-[#1a8a7d] transition">
                        {activeAnswers.name || (isPrimary ? "Bé" : "Học sinh")}
                      </h3>
                      <p className="text-xs font-bold text-[#1a8a7d]">
                        {activeAnswers.domain === "multimedia"
                          ? (isPrimary ? "🎨 Nhà sáng tạo nội dung số nhí" : "🎨 Nhà thiết kế trải nghiệm số")
                          : activeAnswers.domain === "game_programming"
                          ? (isPrimary ? "🎮 Nhà sáng tạo game nhí" : "💻 Kỹ sư lập trình phần mềm")
                          : (isPrimary ? "🌱 Nhà sáng tạo robot nhí" : "🤖 Kỹ sư Robotics & Tự động hóa")}
                      </p>
                    </div>
                    <span className="rounded-xl bg-[#e0f5ef] text-[#1a8a7d] px-2.5 py-1 text-xs font-extrabold">
                      Lớp {activeAnswers.grade || (isPrimary ? "4" : "7")}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 italic line-clamp-2">
                    &ldquo;{activeAnswers.domain === "multimedia"
                      ? (isPrimary
                          ? "Mỗi nét vẽ hôm nay mở ra một thế giới rực rỡ ngày mai!"
                          : "Thiết kế không chỉ là hình thức, mà là cách chúng ta lan tỏa giá trị sống.")
                      : activeAnswers.domain === "game_programming"
                      ? (isPrimary
                          ? "Chơi game thật vui, nhưng tự tay làm ra game còn tuyệt vời hơn!"
                          : "Lập trình là công cụ biến mọi ý tưởng tưởng chừng không thể thành hiện thực.")
                      : (isPrimary
                          ? "Mỗi ý tưởng nhỏ hôm nay có thể tạo nên thay đổi lớn ngày mai!"
                          : "Công nghệ không chỉ để giải trí, mà còn để tạo ra một thế giới tốt đẹp hơn.")}&rdquo;
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-[#1a8a7d]">
                    <span>Bấm để mở toàn bộ hồ sơ</span>
                    <span className="group-hover:translate-x-1 transition">→</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* ═══════════════════════════════════════════════════════
          ROW 4 — TẠO WEBSITE FUTURE ME (Guided Step Flow)
         ═══════════════════════════════════════════════════════ */}
      <section className="rounded-3xl bg-white border border-[#e2ede9] p-5 sm:p-6 shadow-xs">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#1a8a7d] to-[#158070] text-white shadow-xs">
              <Rocket className="h-4.5 w-4.5" />
            </span>
            <div>
              <h2 className="text-base font-extrabold text-[#1a3a4a]">Tạo website Future Me</h2>
              <p className="text-[10px] text-slate-400">4 bước đơn giản để biến hành trình thành trang web</p>
            </div>
          </div>
          {guideStep > 0 && (
            <button type="button" onClick={() => setGuideStep(0)}
              className="text-[10px] font-bold text-slate-400 hover:text-slate-600 transition">← Quay lại</button>
          )}
        </div>

        {/* Step Indicators */}
        <div className="flex items-center gap-1 mb-5">
          {["Bắt đầu", "Sao chép", "Mở AI Studio", "Build web", "Hiệu chỉnh"].map((label, i) => (
            <div key={i} className="flex items-center gap-1 flex-1">
              <button type="button" onClick={() => i <= guideStep ? setGuideStep(i) : undefined}
                className={`shrink-0 grid h-6 w-6 place-items-center rounded-full text-[9px] font-extrabold transition ${
                  i < guideStep ? "bg-[#1a8a7d] text-white" :
                  i === guideStep ? "bg-[#1a8a7d] text-white ring-4 ring-[#c8e6df]/40" :
                  "bg-slate-100 text-slate-400"
                }`}>
                {i < guideStep ? <Check className="h-3 w-3" /> : i + 1}
              </button>
              <span className={`text-[9px] font-bold hidden sm:block ${i === guideStep ? "text-[#1a3a4a]" : "text-slate-400"}`}>{label}</span>
              {i < 4 && <div className={`flex-1 h-[2px] rounded-full mx-1 ${i < guideStep ? "bg-[#1a8a7d]" : "bg-slate-100"}`} />}
            </div>
          ))}
        </div>

        {/* ── STEP 0: CTA Card ── */}
        {guideStep === 0 && (
          <div className="rounded-2xl bg-gradient-to-br from-[#e0f5ef] to-[#f0f4ff] border border-[#c8e6df]/40 p-5 text-center">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-card">
                {activeAnswers.avatarSource === "custom" && activeAnswers.customAvatarData ? (
                  <img src={activeAnswers.customAvatarData} alt="" className="h-full w-full object-cover" />
                ) : (
                  <Image src={resolvedAvatarSrc} alt="" width={56} height={56} className="object-contain" />
                )}
              </div>
            </div>
            <p className="text-sm font-extrabold text-[#1a3a4a]">Website "Future Me" của {activeAnswers.name || "con"}</p>
            <p className="text-[11px] text-slate-500 mt-1 max-w-sm mx-auto leading-4">
              Trang web giới thiệu hành trình, dự án <strong>{activeAnswers.projectName || "Ước Mơ"}</strong> và profile tương lai — được tạo bằng AI trong vài phút!
            </p>
            <button type="button" onClick={() => setGuideStep(1)}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1a8a7d] px-6 py-2.5 text-[11px] font-extrabold text-white shadow-card hover:bg-[#158070] transition">
              Bắt đầu tạo web <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* ── STEP 1: Sao chép Prompt ── */}
        {guideStep === 1 && (
          <div className="space-y-3">
            {/* Safety notice */}
            <div className="rounded-xl bg-emerald-50 border border-emerald-200/60 p-3 flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-[10px] text-emerald-800 leading-4">
                <strong>An toàn dữ liệu:</strong> Họ tên thật, SĐT, email đã được loại bỏ. Chỉ xuất bí danh và dữ liệu học tập.
              </p>
            </div>

            {/* Consent + Copy */}
            <div className="rounded-2xl bg-[#fafcfb] border border-[#e8f0ed] p-4">
              <label className="flex items-start gap-2.5 cursor-pointer mb-3">
                <input type="checkbox" checked={Boolean(answers.parentApprovesExternalTransfer)}
                  onChange={e => setAnswers(a => ({ ...a, parentApprovesExternalTransfer: e.target.checked }))}
                  className="mt-0.5 h-4 w-4 rounded accent-[#1a8a7d]" />
                <span className="text-[11px] text-[#1a3a4a] font-semibold leading-4">
                  Tôi (Phụ huynh) đã xem và đồng ý cho sao chép dữ liệu sang Google AI Studio.
                </span>
              </label>

              <button type="button"
                disabled={!answers.parentApprovesExternalTransfer}
                onClick={async () => { await copyPromptToClipboard(); setGuideStep(2); }}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-full py-2.5 text-[11px] font-extrabold transition shadow-xs ${
                  answers.parentApprovesExternalTransfer
                    ? copiedPrompt ? "bg-emerald-500 text-white" : "bg-[#1a8a7d] text-white hover:bg-[#158070]"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}>
                {copiedPrompt
                  ? <><Check className="h-4 w-4" /> Đã sao chép! Tiếp tục →</>
                  : <><Eye className="h-4 w-4" /> Sao chép Prompt ({fullPrompt.length.toLocaleString("vi-VN")} ký tự)</>}
              </button>
            </div>

            {/* Preview toggle */}
            <details className="rounded-xl border border-[#e8f0ed] bg-[#fafcfb]">
              <summary className="px-4 py-2.5 text-[10px] font-bold text-slate-500 cursor-pointer hover:text-[#1a8a7d]">Xem nội dung Prompt ▾</summary>
              <pre className="max-h-40 overflow-auto border-t border-[#e8f0ed] bg-[#0f1715] p-4 font-mono text-[10px] text-emerald-300 leading-5 rounded-b-xl">
                {fullPrompt}
              </pre>
            </details>
          </div>
        )}

        {/* ── STEP 2: Mở Google AI Studio ── */}
        {guideStep === 2 && (
          <div className="space-y-3">
            <div className="rounded-2xl bg-[#fafcfb] border border-[#e8f0ed] p-4">
              <p className="text-xs font-extrabold text-[#1a3a4a] mb-2">📋 Hướng dẫn nhanh:</p>
              <div className="space-y-2">
                {[
                  { step: "1", text: 'Bấm nút bên dưới để mở Google AI Studio', highlight: false },
                  { step: "2", text: 'Chọn "Create new app" hoặc "Build with Gemini"', highlight: false },
                  { step: "3", text: 'Dán Prompt đã sao chép vào ô nhập liệu (Ctrl+V / ⌘+V)', highlight: true },
                ].map(item => (
                  <div key={item.step} className={`flex items-start gap-2.5 rounded-xl p-2.5 ${item.highlight ? "bg-amber-50 border border-amber-200/40" : ""}`}>
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-[#1a8a7d] text-white text-[9px] font-extrabold shrink-0 mt-0.5">{item.step}</span>
                    <p className="text-[11px] text-slate-700 leading-4">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <a href="https://aistudio.google.com/app/apps" target="_blank" rel="noopener noreferrer"
              onClick={() => setGuideStep(3)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#1a8a7d] py-2.5 text-[11px] font-extrabold text-white shadow-card hover:bg-[#158070] transition">
              <ExternalLink className="h-4 w-4" /> Mở Google AI Studio
            </a>

            <button type="button" onClick={() => setGuideStep(3)}
              className="w-full text-center text-[10px] font-bold text-slate-400 hover:text-[#1a8a7d] transition">
              Đã mở rồi → Tiếp tục hướng dẫn Build
            </button>
          </div>
        )}

        {/* ── STEP 3: Build web ── */}
        {guideStep === 3 && (
          <div className="space-y-3">
            <div className="rounded-2xl bg-[#fafcfb] border border-[#e8f0ed] p-4">
              <p className="text-xs font-extrabold text-[#1a3a4a] mb-2">⚡ Tạo website bằng AI:</p>
              <div className="space-y-2">
                {[
                  'Sau khi dán Prompt, bấm nút "Build" hoặc "Generate" để AI bắt đầu tạo web.',
                  'Đợi AI xử lý — thường mất 30 giây đến 2 phút.',
                  'Khi xong, AI sẽ hiển thị bản xem trước website. Kiểm tra xem nội dung có đúng không.',
                  'Nếu hài lòng → Bấm "Publish" hoặc "Deploy" để xuất bản.',
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-amber-100 text-amber-700 text-[9px] font-extrabold shrink-0 mt-0.5">{i + 1}</span>
                    <p className="text-[11px] text-slate-700 leading-4">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <button type="button" onClick={() => setGuideStep(4)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#1a8a7d] py-2.5 text-[11px] font-extrabold text-white shadow-card hover:bg-[#158070] transition">
              Xem gợi ý hiệu chỉnh <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* ── STEP 4: Gợi ý hiệu chỉnh ── */}
        {guideStep === 4 && (
          <div className="space-y-3">
            <div className="rounded-2xl bg-[#fafcfb] border border-[#e8f0ed] p-4">
              <p className="text-xs font-extrabold text-[#1a3a4a] mb-1">🎨 Gợi ý câu lệnh hiệu chỉnh</p>
              <p className="text-[10px] text-slate-400 mb-3">Sao chép và gửi cho AI Agent nếu muốn thay đổi:</p>

              <div className="space-y-2">
                {[
                  { label: "Đổi màu sắc", prompt: `Hãy đổi tông màu chủ đạo sang ${activeAnswers.favoriteColor || "xanh lá"} pastel, giữ nguyên bố cục.` },
                  { label: "Thêm hình ảnh", prompt: "Hãy thêm nhiều hình minh họa dễ thương hơn cho từng phần dự án. Dùng emoji và icon." },
                  { label: "Đơn giản hơn", prompt: `Hãy giảm bớt chữ, chỉ giữ tiêu đề và các bullet point ngắn gọn. Phù hợp cho học sinh ${isPrimary ? "tiểu học" : "THCS"}.` },
                  { label: "Thêm animation", prompt: "Hãy thêm hiệu ứng chuyển động nhẹ nhàng khi cuộn trang: fade-in cho card, slide-in cho hình ảnh." },
                  { label: "Đổi layout", prompt: "Hãy chuyển bố cục sang dạng card ngang (horizontal cards) thay vì dọc, để trang web trông hiện đại hơn." },
                  { label: "Thêm trang mới", prompt: `Hãy thêm một trang riêng giới thiệu chi tiết dự án "${activeAnswers.projectName || "Ước Mơ"}" với timeline, hình ảnh sản phẩm và video demo placeholder.` },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between gap-2 rounded-xl bg-white border border-[#e2ede9] px-3 py-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-extrabold text-[#1a3a4a]">{item.label}</p>
                      <p className="text-[9px] text-slate-400 truncate">{item.prompt.slice(0, 50)}…</p>
                    </div>
                    <button type="button" onClick={async () => {
                      await navigator.clipboard.writeText(item.prompt);
                    }}
                      className="shrink-0 rounded-full bg-[#e0f5ef] px-2.5 py-1 text-[9px] font-bold text-[#1a8a7d] hover:bg-[#c8e6df] transition">
                      Sao chép
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick tips */}
            <div className="rounded-xl bg-amber-50 border border-amber-200/40 p-3">
              <p className="text-[10px] font-bold text-amber-800 mb-1">💡 Mẹo hay:</p>
              <ul className="text-[10px] text-amber-700 space-y-0.5 leading-4">
                <li>• Mỗi lần gửi 1 yêu cầu hiệu chỉnh để AI hiểu rõ hơn</li>
                <li>• Nếu muốn đổi nhiều thứ, hãy nói cụ thể từng phần</li>
                <li>• Có thể yêu cầu AI giải thích code nếu muốn học thêm</li>
              </ul>
            </div>

            <div className="flex gap-2">
              <button type="button" onClick={() => setGuideStep(0)}
                className="flex-1 rounded-full border border-[#e2ede9] py-2 text-[11px] font-bold text-slate-500 hover:bg-slate-50 transition">
                Quay lại đầu
              </button>
              <a href="https://aistudio.google.com/app/apps" target="_blank" rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#1a8a7d] py-2 text-[11px] font-extrabold text-white hover:bg-[#158070] transition">
                <ExternalLink className="h-3.5 w-3.5" /> Quay lại AI Studio
              </a>
            </div>
          </div>
        )}
      </section>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════
          MODALS
         ═══════════════════════════════════════════════════════ */}
      {modalCode && (
        <StandardsModal isOpen={Boolean(modalCode)} onClose={() => setModalCode(null)}
          standardCode={modalCode} whyWeAsk="Bảo đảm tính minh bạch và giá trị thực chứng." isPrimary={isPrimary} />
      )}

      {showAvatarModal && (
        <AvatarUploaderModal
          isOpen={showAvatarModal}
          onClose={() => setShowAvatarModal(false)}
          currentAvatar={activeAnswers.avatar}
          avatarSource={activeAnswers.avatarSource}
          customAvatarData={activeAnswers.customAvatarData}
          onSaveAvatar={handleSaveAvatar}
          answers={activeAnswers}
          initialTab={avatarModalTab}
        />
      )}

      {/* Export modal removed — integrated into step guide above */}
    </div>
  );
}

// Backward compatibility
export const ProjectsJourneyResult = ProfileResult;
export const FutureMeResult = ProfileResult;
