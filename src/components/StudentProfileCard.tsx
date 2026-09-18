"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  GraduationCap, Heart, Star, Users, User, Camera,
  Pencil, Sparkles, ArrowRight, BookOpen, BarChart3,
  Compass, ShieldCheck, CheckCircle2, Cpu, Layers,
  ChevronRight, ChevronDown, ChevronUp, Award, Target, Wrench,
  Bot, Gamepad2, Palette, Handshake, Lightbulb, Code2, BrainCircuit, PackageCheck
} from "lucide-react";
import type { JourneyAnswers } from "@/types/journey";
import {
  type SIOEvidenceCard,
  type V3PersonalizedProject,
  type TechStackToolItem,
  generatePersonalizedProjects,
  extractRIASECProfile
} from "@/data/v3Engine";

interface ParsedToolItem {
  name: string;
  level: 'Tiểu học' | 'THCS' | 'Tiểu học & THCS';
}

function parseToolItem(item: any): ParsedToolItem {
  if (typeof item === 'object' && item !== null && 'name' in item) {
    return item as ParsedToolItem;
  }
  const str = String(item || '');
  if (str.includes('(Tiểu học)')) {
    return { name: str.replace('(Tiểu học)', '').trim(), level: 'Tiểu học' };
  }
  if (str.includes('(THCS)')) {
    return { name: str.replace('(THCS)', '').trim(), level: 'THCS' };
  }
  return { name: str, level: 'Tiểu học & THCS' };
}

export interface StudentProfileCardProps {
  answers: JourneyAnswers;
  isPrimary: boolean;
  activeProfileTab?: "current" | "may" | "nova";
  viewMode: "student" | "parent";
  onEditAvatar: (initialTab?: "banner" | "custom" | "system" | "ai-prompt") => void;
  onGoToRoadmap?: () => void;
  onGoToWebsite?: () => void;
  onOpenStandardsModal?: (code: string) => void;
  evidenceCards?: SIOEvidenceCard[];
  onUpdateName?: (name: string) => void;
  projects?: V3PersonalizedProject[];
  onSelectProject?: (projectIndex: number) => void;
  onSelectCapability?: (capId: string) => void;
}

export function StudentProfileCard({
  answers,
  isPrimary,
  activeProfileTab,
  viewMode,
  onEditAvatar,
  onGoToRoadmap,
  onGoToWebsite,
  onOpenStandardsModal,
  evidenceCards = [],
  onUpdateName,
  projects = [],
  onSelectProject,
  onSelectCapability
}: StudentProfileCardProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const fallbackName = answers.name?.trim() || (isPrimary ? "Bé" : "Học sinh");
  const [tempName, setTempName] = useState(answers.name || fallbackName);

  // Expandable sections state
  const [showRiasecDetails, setShowRiasecDetails] = useState(false);
  const [showCapabilityDetails, setShowCapabilityDetails] = useState(false);
  const [showTechStackDetails, setShowTechStackDetails] = useState(false);
  const [techLevelFilter, setTechLevelFilter] = useState<'all' | 'primary' | 'secondary'>('all');

  const displayName = answers.name || fallbackName;
  const displayGrade = answers.grade || (isPrimary ? "4" : "7");

  // Extract RIASEC Profile & Alignment data
  const riasec = useMemo(() => extractRIASECProfile(answers), [answers]);

  const totalToolsCount = useMemo(() => {
    return riasec.techStack.reduce((acc, g) => acc + g.items.length, 0);
  }, [riasec]);

  const techLevelCounts = useMemo(() => {
    let primary = 0;
    let secondary = 0;
    riasec.techStack.forEach(g => {
      g.items.forEach(it => {
        const p = parseToolItem(it);
        if (p.level === 'Tiểu học' || p.level === 'Tiểu học & THCS') primary++;
        if (p.level === 'THCS' || p.level === 'Tiểu học & THCS') secondary++;
      });
    });
    return { primary, secondary };
  }, [riasec.techStack]);

  // Projects
  const finalProjects = useMemo(() => {
    if (projects && projects.length > 0) return projects;
    return generatePersonalizedProjects(answers);
  }, [projects, answers]);

  // Role
  const displayRole = answers.futureSelf?.trim() || riasec.roleTitle;

  const RoleIconComponent = answers.domain === "multimedia"
    ? Palette
    : answers.domain === "game_programming"
    ? Gamepad2
    : Bot;

  // Quote
  const defaultQuote = answers.domain === "multimedia"
    ? (isPrimary ? "Con muốn tạo nên những câu chuyện và hình ảnh số tuyệt đẹp!" : "Thiết kế và sáng tạo số giúp kết nối con người với những điều ý nghĩa.")
    : answers.domain === "game_programming"
    ? (isPrimary ? "Con muốn tạo ra những trò chơi thông minh, bổ ích cho bạn bè!" : "Phần mềm và lập trình là chìa khóa mở ra những giải pháp tương lai.")
    : (isPrimary ? "Chú robot Thủ Thư Nhí sẽ mang sách đến cho các bạn!" : "Robot và tự động hóa sẽ giúp cuộc sống tiện lợi hơn mỗi ngày.");

  const displayQuote =
    answers.dreamPurpose
      ? `Dự án ${answers.projectName || "của con"} sẽ ${answers.dreamPurpose}`
      : defaultQuote;

  // Interests
  const displayInterest =
    answers.domain === "robotics"
      ? "Robot, sáng tạo"
      : answers.domain === "game_programming"
      ? "Lập trình, công nghệ"
      : answers.domain === "multimedia"
      ? "Thiết kế, đồ họa"
      : (isPrimary ? "Khám phá, sáng tạo" : "Khoa học, công nghệ");

  // Style
  const displayStyle =
    (answers.confirmedTraits && answers.confirmedTraits.slice(0, 2).join(", ")) ||
    (isPrimary ? "Tò mò, kiên trì" : "Chủ động, sáng tạo");

  // Dream
  const displayDream =
    answers.projectName
      ? answers.projectName
      : answers.dreamAudience === "Bảo vệ môi trường & Động vật"
      ? "Vì một hành tinh xanh"
      : isPrimary
      ? "Giúp mọi người"
      : "Vì cộng đồng";

  // About paragraph
  const displayAbout = isPrimary
    ? `Con thích lắp ráp, tìm hiểu cách các thiết bị hoạt động và luôn muốn tạo ra những sản phẩm có ích. Con đặc biệt thích ${
        answers.domain === "robotics"
          ? "robot"
          : answers.domain === "game_programming"
          ? "lập trình game"
          : answers.domain === "multimedia"
          ? "thiết kế sáng tạo"
          : "công nghệ sáng tạo"
      } và muốn dùng công nghệ để giúp cuộc sống tốt đẹp hơn.`
    : `Con thích tìm hiểu công nghệ, đặc biệt là ${
        answers.domain === "robotics"
          ? "robotics và vi điều khiển"
          : answers.domain === "game_programming"
          ? "lập trình và phát triển phần mềm"
          : answers.domain === "multimedia"
          ? "thiết kế đồ họa và trải nghiệm số"
          : "công nghệ và đổi mới sáng tạo"
      }. Con muốn dùng kỹ năng của mình để tạo ra những giải pháp hữu ích cho cộng đồng.`;

  // Motto
  const displayMotto = answers.domain === "multimedia"
    ? (isPrimary
        ? "Mỗi nét vẽ hôm nay mở ra một thế giới rực rỡ ngày mai!"
        : "Thiết kế không chỉ là hình thức, mà là cách chúng ta lan tỏa giá trị sống.")
    : answers.domain === "game_programming"
    ? (isPrimary
        ? "Chơi game thật vui, nhưng tự tay làm ra game còn tuyệt vời hơn!"
        : "Lập trình là công cụ biến mọi ý tưởng tưởng chừng không thể thành hiện thực.")
    : (isPrimary
        ? "Mỗi ý tưởng nhỏ hôm nay có thể tạo nên thay đổi lớn ngày mai!"
        : "Công nghệ không chỉ để giải trí, mà còn để tạo ra một thế giới tốt đẹp hơn.");

  // Banner image resolution
  const bannerSrc =
    answers.customAvatarData
      ? answers.customAvatarData
      : isPrimary
      ? "/assets/profile-may-banner.png"
      : "/assets/profile-nova-banner.png";

  const handleSaveName = () => {
    if (onUpdateName && tempName.trim()) {
      onUpdateName(tempName.trim());
    }
    setIsEditingName(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* ─────────────────────────────────────────────────────────────
          MAIN PROFILE CARD — FUTURE CAPABILITY PORTFOLIO
          ───────────────────────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-[32px] bg-white border border-[#c8e6df]/70 shadow-xl shadow-teal-950/5 transition duration-300 hover:shadow-2xl">

        {/* ══ TOP BANNER BADGE: FUTURE CAPABILITY PORTFOLIO ══ */}
        <div className="bg-gradient-to-r from-teal-700 via-[#1a8a7d] to-emerald-700 px-5 py-2.5 text-white flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-white/20">
              <Star className="h-3 w-3 fill-yellow-300 text-yellow-300" />
            </span>
            <span className="font-extrabold uppercase tracking-wider text-[11px]">Future Capability Portfolio</span>
            <span className="hidden sm:inline text-teal-200">|</span>
            <span className="text-[11px] text-teal-100 hidden sm:inline">Chân dung Năng lực Tương lai con & gia đình hướng tới</span>
          </div>
          <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-extrabold text-teal-50 border border-white/30">
            {riasec.techSector}
          </span>
        </div>

        {/* ══ TOP ILLUSTRATION BANNER — Tràn ảnh, Full-bleed cover ══ */}
        <div className="relative w-full aspect-[728/450] sm:aspect-[728/380] min-h-[260px] sm:min-h-[300px] bg-gradient-to-br from-[#fef5ea] via-[#e8f7f2] to-[#e4f1fd] overflow-hidden">
          <div className="relative h-full w-full">
            <img
              src={bannerSrc}
              alt={`${displayName} Profile Banner`}
              className="h-full w-full object-cover object-center transition duration-500"
            />
            {/* If custom image uploaded by user, provide subtle overlay badge for context */}
            {answers.customAvatarData && bannerSrc === answers.customAvatarData && (
              <div className="pointer-events-none absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10 flex items-center gap-2">
                <span className={`rounded-full px-3.5 py-1 text-xs font-extrabold shadow-sm ${
                  isPrimary ? "bg-[#f5a623] text-white" : "bg-[#4a90e2] text-white"
                }`}>
                  {isPrimary ? "Tiểu học" : "THCS"}
                </span>
              </div>
            )}
            {/* Overlay Interactive Buttons */}
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={() => onEditAvatar("ai-prompt")}
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white backdrop-blur-md px-3 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-extrabold shadow-md transition hover:scale-105 active:scale-95 border border-white/40"
              >
                <Sparkles className="h-3.5 w-3.5 text-yellow-200" />
                <span>Tạo ảnh AI</span>
              </button>
              <button
                type="button"
                onClick={() => onEditAvatar("banner")}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/90 hover:bg-white text-slate-700 backdrop-blur-md px-3 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-bold shadow-md transition hover:scale-105 active:scale-95 border border-white/60"
              >
                <Camera className="h-3.5 w-3.5 text-[#1a8a7d]" />
                <span>Đổi ảnh bìa</span>
              </button>
            </div>
          </div>
        </div>

        {/* ══ WHITE CARD BODY ══ */}
        <div className="p-5 sm:p-8 space-y-6">

          {/* Row 1: Name + Role on Left, Quote on Right */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between border-b border-slate-100 pb-5">
            <div>
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="rounded-xl border border-[#1a8a7d] px-3 py-1 text-xl font-extrabold text-[#1a3a4a] outline-none"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleSaveName}
                    className="rounded-xl bg-[#1a8a7d] px-3 py-1 text-xs font-bold text-white"
                  >
                    Lưu
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a3a4a] tracking-tight">
                    {displayName}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setIsEditingName(true)}
                    className="text-slate-400 hover:text-[#1a8a7d] transition p-1"
                    title="Chỉnh sửa tên"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                </div>
              )}
              <p className="mt-1 flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#1a8a7d]">
                <span className="grid h-5 w-5 place-items-center rounded-md bg-teal-50 text-[#1a8a7d] border border-teal-200">
                  <RoleIconComponent className="h-3.5 w-3.5" />
                </span>
                <span>{displayRole}</span>
              </p>
              <p className="text-[11px] text-slate-400 font-medium">
                {riasec.roleSubtitle}
              </p>
            </div>

            {/* Right Quote */}
            <div className="max-w-xs self-start sm:self-auto sm:text-right">
              <p className="text-xs sm:text-sm font-semibold italic text-slate-600 leading-snug">
                &ldquo;{displayQuote}&rdquo;
              </p>
            </div>
          </div>

          {/* Row 2: 4 Attribute Badges (Mint, Pink, Amber, Blue) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {/* 1. Khối lớp */}
            <div className="flex items-start gap-2.5 rounded-2xl bg-[#E8F8F5] border border-[#C8EFE6] p-3 shadow-xs">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-[#1a8a7d] shrink-0 shadow-xs mt-0.5">
                <GraduationCap className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Khối lớp</p>
                <p className="text-xs sm:text-sm font-extrabold text-[#1a8a7d] leading-snug break-words">
                  Lớp {displayGrade}
                </p>
              </div>
            </div>

            {/* 2. Sở thích */}
            <div className="flex items-start gap-2.5 rounded-2xl bg-[#FCEBEB] border border-[#FAD7D7] p-3 shadow-xs">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-[#e05260] shrink-0 shadow-xs mt-0.5">
                <Heart className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Sở thích</p>
                <p className="text-xs sm:text-sm font-extrabold text-[#e05260] leading-snug break-words">
                  {displayInterest}
                </p>
              </div>
            </div>

            {/* 3. Phong cách */}
            <div className="flex items-start gap-2.5 rounded-2xl bg-[#FEF7E6] border border-[#FDEAC4] p-3 shadow-xs">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-[#d97706] shrink-0 shadow-xs mt-0.5">
                <Star className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Phong cách</p>
                <p className="text-xs sm:text-sm font-extrabold text-[#d97706] leading-snug break-words">
                  {displayStyle}
                </p>
              </div>
            </div>

            {/* 4. Ước mơ */}
            <div className="flex items-start gap-2.5 rounded-2xl bg-[#EDF4FD] border border-[#D5E6FA] p-3 shadow-xs">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-[#2563eb] shrink-0 shadow-xs mt-0.5">
                <Users className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Ước mơ</p>
                <p className="text-xs sm:text-sm font-extrabold text-[#2563eb] leading-snug break-words">
                  {displayDream}
                </p>
              </div>
            </div>
          </div>

          {/* ══ MỤC 1: MÔ HÌNH HƯỚNG NGHIỆP RIASEC & HOLLAND CODES (HOA KỲ) ══ */}
          <div className="rounded-3xl border border-teal-200/80 bg-gradient-to-br from-[#f0faf7] via-white to-[#f4fcf9] p-4 sm:p-5 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-teal-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-2xl bg-[#1a8a7d] text-white shadow-xs">
                  <Compass className="h-5 w-5" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-extrabold text-[#1a3a4a]">
                      Định Hướng Ngành Nghề Theo Mô Hình RIASEC
                    </h3>
                    <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-extrabold text-[#1a8a7d]">
                      Holland Code / O*NET
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Khám phá nhóm ngành công nghệ tương lai phù hợp nhất với con
                  </p>
                </div>
              </div>

              <div className="self-start sm:self-auto">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-extrabold border shadow-2xs ${riasec.sectorBadgeClass}`}>
                  <Target className="h-3.5 w-3.5" />
                  <span>{riasec.techSector}</span>
                </span>
              </div>
            </div>

            {/* Concise Summary Highlights (Hiển thị cô đọng, súc tích) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="rounded-2xl bg-white p-3 border border-teal-100/90 shadow-2xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Mã Holland</span>
                  <span className="text-xs font-extrabold text-[#1a8a7d]">{riasec.primaryName}</span>
                </div>
                <span className="grid h-7 w-7 place-items-center rounded-xl bg-teal-50 text-[#1a8a7d] border border-teal-200 shadow-2xs shrink-0">
                  <Target className="h-3.5 w-3.5" />
                </span>
              </div>

              <div className="rounded-2xl bg-white p-3 border border-amber-200/70 shadow-2xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Đồng hành gia đình</span>
                  <span className="text-xs font-extrabold text-amber-700 truncate block max-w-[170px]">
                    {riasec.familyAlignment.confirmedDecision === 'adjust_pacing'
                      ? 'Linh hoạt nhịp độ'
                      : riasec.familyAlignment.confirmedDecision === 'need_discussion'
                      ? 'Trao đổi thêm'
                      : 'Giữ nguyên hướng đi'}
                  </span>
                </div>
                <span className="grid h-7 w-7 place-items-center rounded-xl bg-amber-50 text-amber-600 border border-amber-200 shadow-2xs shrink-0">
                  <Handshake className="h-3.5 w-3.5" />
                </span>
              </div>

              <div className="rounded-2xl bg-white p-3 border border-teal-100/90 shadow-2xs flex items-center justify-between">
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Điểm mạnh tự nhiên</span>
                  <span className="text-xs font-extrabold text-slate-700 leading-tight break-words block">
                    {riasec.naturalTraits[0] || "Tư duy sáng tạo"}
                  </span>
                </div>
                <span className="grid h-7 w-7 place-items-center rounded-xl bg-teal-50 text-[#1a8a7d] border border-teal-200 shadow-2xs shrink-0">
                  <Lightbulb className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>

            {/* Toggle Button: Xem chi tiết / Thu gọn */}
            <button
              type="button"
              onClick={() => setShowRiasecDetails(prev => !prev)}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white hover:bg-teal-50/80 border border-teal-200/80 text-xs font-extrabold text-[#1a8a7d] transition shadow-2xs"
            >
              <span>{showRiasecDetails ? "Thu gọn chi tiết phân tích ▴" : "Xem chi tiết phân tích RIASEC & Đối chiếu gia đình ▾"}</span>
              {showRiasecDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {/* Expanded Detailed Content */}
            {showRiasecDetails && (
              <div className="pt-2 space-y-3.5 border-t border-teal-100/80 animate-in fade-in duration-200">
                {/* RIASEC Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white p-4 border border-teal-100/80 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                        Nhóm Sở Thích Chủ Đạo
                      </span>
                      <span className="rounded-lg bg-teal-50 px-2 py-0.5 text-[11px] font-extrabold text-[#1a8a7d]">
                        {riasec.primaryName}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-[#1a3a4a] leading-snug">
                      {riasec.hollandFullName}
                    </p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {riasec.techSectorDescription}
                    </p>
                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 block mb-1">Mã bổ trợ phối hợp:</span>
                      <div className="flex flex-wrap gap-1">
                        {riasec.secondaryCodes.map((code, idx) => (
                          <span key={idx} className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                            {code}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white p-4 border border-teal-100/80 shadow-2xs space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                      Phản Xạ Sở Thích Tự Nhiên Được Ghi Nhận
                    </span>
                    <ul className="space-y-1.5 text-[11px] text-slate-600">
                      {riasec.naturalTraits.map((trait, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#1a8a7d] font-bold mt-0.5">✓</span>
                          <span>{trait}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Family Alignment (Đối chiếu gia đình & Quyết định hành động) */}
                <div className="rounded-2xl bg-gradient-to-r from-amber-50/80 via-orange-50/50 to-amber-50/80 border border-amber-200/80 p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-amber-600" />
                      <strong className="text-xs font-extrabold text-[#1a3a4a]">
                        Đối Chiếu Gia Đình & Quyết Định Hành Động
                      </strong>
                    </div>
                    <span className="rounded-full bg-amber-600 text-white px-2.5 py-0.5 text-[10px] font-extrabold shadow-2xs">
                      {riasec.familyAlignment.confirmedDecisionLabel}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px]">
                    <div className="rounded-xl bg-white/90 p-2.5 border border-amber-100/80 shadow-2xs">
                      <span className="font-extrabold text-[#1a8a7d] block mb-0.5">Động Lực Của Con:</span>
                      <p className="text-slate-600 italic leading-relaxed">&ldquo;{riasec.familyAlignment.studentAspiration}&rdquo;</p>
                    </div>
                    <div className="rounded-xl bg-white/90 p-2.5 border border-amber-100/80 shadow-2xs">
                      <span className="font-extrabold text-amber-700 block mb-0.5">Quan Sát Của Ba Mẹ:</span>
                      <p className="text-slate-600 italic leading-relaxed">&ldquo;{riasec.familyAlignment.parentObservation}&rdquo;</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-amber-950 leading-snug font-medium pt-1">
                    {riasec.familyAlignment.consensusSummary}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ══ MỤC 1.5: MA TRẬN MỤC TIÊU NĂNG LỰC (KNOWLEDGE, SKILLS, COMPETENCIES) ══ */}
          <div className="rounded-3xl border border-teal-200/80 bg-white p-4 sm:p-5 shadow-sm space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-teal-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-2xl bg-[#1a8a7d] text-white shadow-xs">
                  <Target className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#1a3a4a]">
                    Hồ Sơ Mục Tiêu Năng Lực (Target Capabilities)
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Kiến thức (K), Kỹ năng (S), và Năng lực (C) liên kết đa chiều tới các dự án và chức năng
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="rounded-full bg-teal-50 border border-teal-200 px-2.5 py-0.5 text-[10px] font-extrabold text-[#1a8a7d]">
                  {riasec.targetCapabilities.knowledge.length} Kiến Thức
                </span>
                <span className="rounded-full bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 text-[10px] font-extrabold text-indigo-700">
                  {riasec.targetCapabilities.skills.length} Kỹ Năng
                </span>
                <span className="rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[10px] font-extrabold text-amber-800">
                  {riasec.targetCapabilities.competencies.length} Năng Lực
                </span>
              </div>
            </div>

            {/* 3 Categories Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Knowledge Group */}
              <div className="rounded-2xl border border-teal-100 bg-[#f8fcfb] p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1a8a7d]">
                    Kiến Thức Mục Tiêu (K)
                  </span>
                  <BookOpen className="h-4 w-4 text-[#1a8a7d]" />
                </div>
                <div className="space-y-1.5">
                  {riasec.targetCapabilities.knowledge.map(k => (
                    <div
                      key={k.id}
                      onClick={() => onSelectCapability ? onSelectCapability(k.id) : onGoToRoadmap?.()}
                      className="group cursor-pointer rounded-xl bg-white border border-teal-100/90 p-2 shadow-2xs hover:border-[#1a8a7d] transition"
                    >
                      <div className="flex items-center justify-between">
                        <span className="rounded bg-teal-100 text-[#1a8a7d] px-1.5 py-0.2 text-[9px] font-extrabold">
                          {k.id}
                        </span>
                        <div className="flex gap-1">
                          {k.projectIds.map(pid => (
                            <span key={pid} className="rounded bg-slate-100 text-slate-600 px-1 text-[8px] font-bold">
                              {pid}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="mt-1 text-xs font-bold text-[#1a3a4a] group-hover:text-[#1a8a7d] transition line-clamp-1">
                        {k.name}
                      </p>
                      <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                        {k.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Group */}
              <div className="rounded-2xl border border-indigo-100 bg-[#f8f9fe] p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700">
                    Kỹ Năng Mục Tiêu (S)
                  </span>
                  <Wrench className="h-4 w-4 text-indigo-600" />
                </div>
                <div className="space-y-1.5">
                  {riasec.targetCapabilities.skills.map(s => (
                    <div
                      key={s.id}
                      onClick={() => onSelectCapability ? onSelectCapability(s.id) : onGoToRoadmap?.()}
                      className="group cursor-pointer rounded-xl bg-white border border-indigo-100/90 p-2 shadow-2xs hover:border-indigo-600 transition"
                    >
                      <div className="flex items-center justify-between">
                        <span className="rounded bg-indigo-100 text-indigo-700 px-1.5 py-0.2 text-[9px] font-extrabold">
                          {s.id}
                        </span>
                        <div className="flex gap-1">
                          {s.projectIds.map(pid => (
                            <span key={pid} className="rounded bg-slate-100 text-slate-600 px-1 text-[8px] font-bold">
                              {pid}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="mt-1 text-xs font-bold text-[#1a3a4a] group-hover:text-indigo-700 transition line-clamp-1">
                        {s.name}
                      </p>
                      <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                        {s.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Competencies Group */}
              <div className="rounded-2xl border border-amber-100 bg-[#fffdfa] p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800">
                    Năng Lực Vận Dụng (C)
                  </span>
                  <BrainCircuit className="h-4 w-4 text-amber-600" />
                </div>
                <div className="space-y-1.5">
                  {riasec.targetCapabilities.competencies.map(c => (
                    <div
                      key={c.id}
                      onClick={() => onSelectCapability ? onSelectCapability(c.id) : onGoToRoadmap?.()}
                      className="group cursor-pointer rounded-xl bg-white border border-amber-100/90 p-2 shadow-2xs hover:border-amber-600 transition"
                    >
                      <div className="flex items-center justify-between">
                        <span className="rounded bg-amber-100 text-amber-800 px-1.5 py-0.2 text-[9px] font-extrabold">
                          {c.id}
                        </span>
                        <div className="flex gap-1">
                          {c.projectIds.map(pid => (
                            <span key={pid} className="rounded bg-slate-100 text-slate-600 px-1 text-[8px] font-bold">
                              {pid}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="mt-1 text-xs font-bold text-[#1a3a4a] group-hover:text-amber-800 transition line-clamp-1">
                        {c.name}
                      </p>
                      <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                        {c.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Toggle Detailed Criteria Button */}
            <button
              type="button"
              onClick={() => setShowCapabilityDetails(prev => !prev)}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-50 hover:bg-teal-50/70 border border-slate-200 text-xs font-extrabold text-[#1a8a7d] transition shadow-2xs"
            >
              <span>{showCapabilityDetails ? "Thu gọn tiêu chí biểu hiện ▴" : "Xem chi tiết tiêu chí thể hiện & liên kết chức năng ▾"}</span>
              {showCapabilityDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {/* Expanded Detailed Capability Table */}
            {showCapabilityDetails && (
              <div className="pt-2 space-y-2 border-t border-slate-100 animate-in fade-in duration-200">
                <div className="rounded-2xl bg-slate-50/80 p-3 text-xs space-y-2 border border-slate-200/80">
                  <p className="text-[11px] font-extrabold uppercase text-slate-500">
                    Tiêu chí đo lường mục tiêu & Ánh xạ dự án:
                  </p>
                  <div className="divide-y divide-slate-200/60">
                    {[
                      ...riasec.targetCapabilities.knowledge,
                      ...riasec.targetCapabilities.skills,
                      ...riasec.targetCapabilities.competencies
                    ].map(cap => (
                      <div key={cap.id} className="py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-[11px]">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-[#1a8a7d] w-10 shrink-0">{cap.id}</span>
                          <span className="font-bold text-slate-800">{cap.name}:</span>
                          <span className="text-slate-600">{cap.outcomeCriteria.join(' · ')}</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 self-start sm:self-auto">
                          <span className="text-[10px] text-slate-400">Chặng:</span>
                          {cap.projectIds.map(pid => (
                            <span key={pid} className="rounded bg-teal-100 text-[#1a8a7d] px-1.5 py-0.5 text-[9px] font-bold">
                              {pid}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ══ MỤC 2: BỘ KỸ NĂNG & CÔNG CỤ CÔNG NGHỆ MỤC TIÊU ══ */}
          <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-2xl bg-indigo-600 text-white shadow-xs">
                  <Wrench className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#1a3a4a]">
                    Bộ Công Cụ & Kỹ Năng Công Nghệ Mục Tiêu
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Hệ thống kỹ năng và công cụ trọng tâm phân cấp theo độ tuổi cho {displayRole}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full">
                  {totalToolsCount} Công Cụ Trọng Tâm
                </span>
              </div>
            </div>

            {/* Khi mở rộng: Hiển thị bộ lọc phân cấp Tiểu học / THCS */}
            {showTechStackDetails && (
              <div className="flex flex-wrap items-center gap-1.5 py-1 px-1 bg-slate-50/70 rounded-xl border border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 ml-2 mr-1">Phân cấp học tập:</span>
                <button
                  type="button"
                  onClick={() => setTechLevelFilter('all')}
                  className={`rounded-full px-3 py-1 text-[11px] font-bold transition ${
                    techLevelFilter === 'all'
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  Tất cả ({totalToolsCount})
                </button>
                <button
                  type="button"
                  onClick={() => setTechLevelFilter('primary')}
                  className={`rounded-full px-3 py-1 text-[11px] font-bold transition ${
                    techLevelFilter === 'primary'
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/70'
                  }`}
                >
                  Tiểu học ({techLevelCounts.primary})
                </button>
                <button
                  type="button"
                  onClick={() => setTechLevelFilter('secondary')}
                  className={`rounded-full px-3 py-1 text-[11px] font-bold transition ${
                    techLevelFilter === 'secondary'
                      ? 'bg-teal-700 text-white shadow-2xs'
                      : 'bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200/70'
                  }`}
                >
                  THCS ({techLevelCounts.secondary})
                </button>
              </div>
            )}

            {/* Danh mục công cụ (Single Grid - không bao giờ bị render trùng) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {riasec.techStack.map((group, idx) => {
                const parsedItems = group.items.map(parseToolItem);
                const filteredItems = parsedItems.filter(tool => {
                  if (techLevelFilter === 'primary') {
                    return tool.level === 'Tiểu học' || tool.level === 'Tiểu học & THCS';
                  }
                  if (techLevelFilter === 'secondary') {
                    return tool.level === 'THCS' || tool.level === 'Tiểu học & THCS';
                  }
                  return true;
                });

                const displayedItems = showTechStackDetails ? filteredItems : filteredItems.slice(0, 2);
                const hiddenCount = filteredItems.length - displayedItems.length;

                return (
                  <div key={idx} className="rounded-2xl border border-slate-100 bg-[#fafcfb] p-3.5 space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1a8a7d] block truncate">
                          {group.category}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">
                          {filteredItems.length}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {displayedItems.map((tool, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 shadow-2xs"
                          >
                            <span>{tool.name}</span>
                            <span
                              className={`rounded px-1.5 py-0.2 text-[9px] font-bold ${
                                tool.level === 'Tiểu học'
                                  ? 'bg-amber-100 text-amber-800'
                                  : tool.level === 'THCS'
                                  ? 'bg-indigo-100 text-indigo-800'
                                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                              }`}
                            >
                              {tool.level === 'Tiểu học & THCS' ? 'Đa cấp' : tool.level}
                            </span>
                          </span>
                        ))}
                        {!showTechStackDetails && hiddenCount > 0 && (
                          <button
                            type="button"
                            onClick={() => setShowTechStackDetails(true)}
                            className="rounded-lg bg-indigo-50 border border-indigo-100/70 hover:bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700 transition"
                          >
                            +{hiddenCount} công cụ phân cấp ▾
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Toggle Button: Xem đầy đủ / Thu gọn */}
            <button
              type="button"
              onClick={() => setShowTechStackDetails(prev => !prev)}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50/70 border border-slate-200 text-xs font-extrabold text-indigo-700 transition shadow-2xs"
            >
              <span>{showTechStackDetails ? "Thu gọn danh mục công cụ ▴" : `Xem chi tiết ${totalToolsCount} công cụ phân cấp & 4 kỹ năng 4Cs ▾`}</span>
              {showTechStackDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {/* 4Cs & Soft Skills (chỉ hiển thị khi mở rộng xem chi tiết) */}
            {showTechStackDetails && (
              <div className="pt-2 space-y-2 border-t border-slate-100 animate-in fade-in duration-200">
                <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-3.5 space-y-2">
                  <div className="flex items-center gap-2">
                    <BrainCircuit className="h-4 w-4 text-[#1a8a7d]" />
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 block">
                      Năng Lực Thế Kỷ 21 & Tư Duy Sáng Tạo (4Cs Skills)
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {riasec.softSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white border border-teal-200 px-3 py-1 text-xs font-extrabold text-teal-800 shadow-2xs"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#1a8a7d]" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ══ MỤC 3: KINH NGHIỆM ĐỒ ÁN 4 CHẶNG (PORTFOLIO SHOWCASE) ══ */}
          <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-2xl bg-amber-500 text-white shadow-xs">
                  <Layers className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#1a3a4a]">
                    Kinh Nghiệm Học Tập & 4 Đồ Án Thực Nghiệm
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    4 sản phẩm thực tế chứng minh năng lực qua từng chặng phát triển
                  </p>
                </div>
              </div>

              {onGoToRoadmap && (
                <button
                  type="button"
                  onClick={onGoToRoadmap}
                  className="inline-flex items-center gap-1 text-xs font-extrabold text-[#1a8a7d] hover:underline"
                >
                  <span>Xem bản đồ lộ trình</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* 4 Projects Grid (Gọn gàng, sạch sẽ, bỏ bớt đoạn văn dài) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {finalProjects.map((proj, idx) => {
                const isDream = proj.isDreamProject;
                return (
                  <div
                    key={proj.id}
                    onClick={() => onSelectProject ? onSelectProject(idx) : onGoToRoadmap?.()}
                    className={`group cursor-pointer rounded-2xl p-3.5 border transition duration-200 hover:shadow-md ${
                      isDream
                        ? "bg-gradient-to-br from-amber-50/90 via-orange-50/50 to-amber-50/90 border-amber-300 ring-1 ring-amber-300/50"
                        : "bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-extrabold ${
                        isDream ? "bg-amber-500 text-white" : "bg-teal-100 text-teal-800"
                      }`}>
                        {isDream ? "★ CHẶNG 4 • DỰ ÁN MƠ ƯỚC" : `CHẶNG ${proj.projectNumber}`}
                      </span>
                      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition" />
                    </div>
                    <strong className="text-xs sm:text-sm font-extrabold text-[#1a3a4a] block leading-snug group-hover:text-[#1a8a7d] transition break-words">
                      {proj.name}
                    </strong>
                    <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
                      <span className="font-semibold text-slate-600 break-words flex-1 mr-2 inline-flex items-center gap-1.5">
                        <PackageCheck className="h-3.5 w-3.5 text-[#1a8a7d] shrink-0" />
                        <span>{proj.deliverable}</span>
                      </span>
                      <span className="text-[#1a8a7d] font-bold shrink-0">Chi tiết →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ══ MỤC 4: TIÊU CHUẨN NĂNG LỰC HỌC THUẬT QUỐC TẾ ĐỐI CHIẾU ══ */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-amber-500" />
                <h3 className="text-xs sm:text-sm font-extrabold text-[#1a3a4a]">
                  Khung Chuẩn Năng Lực Học Thuật Quốc Tế Đối Chiếu
                </h3>
              </div>
              <span className="text-[10px] font-bold text-slate-400">Không dùng điểm số cứng nhắc</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {riasec.standards.map((std, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onOpenStandardsModal?.(std.code)}
                  className="rounded-2xl border border-slate-100 bg-[#f8fbfb] p-3 text-left transition hover:border-[#1a8a7d] hover:bg-white hover:shadow-xs group"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#1a8a7d]/10 px-2 py-0.5 text-[9px] font-extrabold text-[#1a8a7d]">
                      {std.label}
                    </span>
                    <span className="text-[10px] text-slate-400 group-hover:text-[#1a8a7d]">Tra cứu ↗</span>
                  </div>
                  <p className="mt-2 text-[11px] text-slate-600 leading-snug">
                    {std.domainSummary}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Row 3: Section "Về mình" */}
          <div className="rounded-2xl bg-[#FAFDFB] border border-[#E5EFEA] p-4 sm:p-5">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#1a3a4a] mb-2">
              <User className="h-4 w-4 text-[#1a8a7d]" />
              <span>Về mình</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {displayAbout}
            </p>
          </div>

          {/* Row 4: Bottom Quote Card with Potted Plant / Earth */}
          <div className="relative overflow-hidden rounded-2xl bg-[#EAF8F4] border border-[#C8EFE6] p-5 flex items-center justify-between gap-4 shadow-xs">
            <div className="relative z-10 max-w-md">
              <span className="text-3xl sm:text-4xl text-[#1a8a7d]/70 font-serif leading-none block select-none mb-1">
                ❝
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-700 italic leading-snug">
                {displayMotto}
              </p>
              <p className="mt-2 text-xs font-extrabold text-[#1a8a7d]">
                — {displayName}
              </p>
            </div>

            {/* Decorative Graphic */}
            <div className="relative z-10 shrink-0">
              <img
                src={isPrimary ? "/assets/profile-may-plant.png" : "/assets/profile-nova-earth.png"}
                alt={isPrimary ? "Chậu cây nhỏ" : "Trái đất xanh"}
                className="h-20 sm:h-24 w-auto object-contain drop-shadow-sm"
              />
            </div>
          </div>

          {/* Row 5: Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            {onGoToRoadmap && (
              <button
                type="button"
                onClick={onGoToRoadmap}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1a8a7d] hover:bg-[#147065] text-white px-5 py-3.5 text-xs sm:text-sm font-extrabold shadow-md shadow-teal-900/10 transition"
              >
                Xem Bản Đồ 4 Chặng & Lộ Trình <ArrowRight className="h-4 w-4" />
              </button>
            )}
            {onGoToWebsite && (
              <button
                type="button"
                onClick={onGoToWebsite}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-[#c8e6df] bg-white hover:bg-[#f5fbf9] text-[#1a8a7d] px-5 py-3.5 text-xs sm:text-sm font-extrabold shadow-xs transition"
              >
                <Sparkles className="h-4 w-4 text-amber-500" /> Tạo Website Future Me
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PARENT INSIGHTS SECTION (Displayed if in Parent View)
          ───────────────────────────────────────────────────────────── */}
      {viewMode === "parent" && (
        <div className="rounded-3xl bg-white border border-amber-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-amber-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-amber-50 text-amber-600">
                <BookOpen className="h-4 w-4" />
              </span>
              <div>
                <h3 className="text-sm font-extrabold text-[#1a3a4a]">Góc Phụ Huynh & Định Hướng Lộ Trình</h3>
                <p className="text-[10px] text-slate-400">Cách đồng hành cùng con để đạt được hồ sơ năng lực tương lai trên</p>
              </div>
            </div>

            {/* Standards tags */}
            {onOpenStandardsModal && (
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => onOpenStandardsModal("CSTA-ALGO")}
                  className="rounded-full border border-[#1a8a7d] px-2.5 py-0.5 text-[10px] font-bold text-[#1a8a7d] hover:bg-[#e0f5ef] transition"
                >
                  CSTA
                </button>
                <button
                  type="button"
                  onClick={() => onOpenStandardsModal("NLS-3.4")}
                  className="rounded-full border border-[#1a8a7d] px-2.5 py-0.5 text-[10px] font-bold text-[#1a8a7d] hover:bg-[#e0f5ef] transition"
                >
                  NLS 3.4
                </button>
              </div>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-emerald-50/50 border border-emerald-100 p-3.5 flex items-start gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="text-xs font-extrabold text-emerald-900">Điểm mạnh con đã bộc lộ</p>
                <p className="text-[11px] text-slate-600 mt-1 leading-4">
                  {evidenceCards.length > 0
                    ? "Con thể hiện tư duy phân tích tốt, chủ động tìm giải pháp và rất hào hứng với các dự án thực tế."
                    : "Con rất nhạy bén với công nghệ và hào hứng tìm hiểu cơ chế hoạt động."}
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-amber-50/50 border border-amber-100 p-3.5 flex items-start gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-amber-100 text-amber-700 shrink-0">
                <Compass className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="text-xs font-extrabold text-amber-900">Kỹ năng phụ huynh cần hỗ trợ</p>
                <p className="text-[11px] text-slate-600 mt-1 leading-4">
                  Khích lệ con ghi chép nhật ký dự án và đặt câu hỏi mở thay vì làm hộ khi con gặp khúc mắc.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

