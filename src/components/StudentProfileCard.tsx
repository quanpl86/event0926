"use client";

import { useState } from "react";
import Image from "next/image";
import {
  GraduationCap, Heart, Star, Users, User, Camera,
  Pencil, Sparkles, ArrowRight, BookOpen, BarChart3,
  Compass, ShieldCheck, CheckCircle2
} from "lucide-react";
import type { JourneyAnswers } from "@/types/journey";
import type { SIOEvidenceCard } from "@/data/v3Engine";

export interface StudentProfileCardProps {
  answers: JourneyAnswers;
  isPrimary: boolean;
  activeProfileTab?: "current" | "may" | "nova";
  viewMode: "student" | "parent";
  onEditAvatar: () => void;
  onGoToRoadmap?: () => void;
  onGoToWebsite?: () => void;
  onOpenStandardsModal?: (code: string) => void;
  evidenceCards?: SIOEvidenceCard[];
  onUpdateName?: (name: string) => void;
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
}: StudentProfileCardProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const fallbackName = answers.name?.trim() || (isPrimary ? "Bé" : "Học sinh");
  const [tempName, setTempName] = useState(answers.name || fallbackName);

  const displayName = answers.name || fallbackName;
  const displayGrade = answers.grade || (isPrimary ? "4" : "7");

  // Role
  const defaultRole = answers.domain === "multimedia"
    ? (isPrimary ? "Nhà sáng tạo nội dung số nhí" : "Nhà thiết kế trải nghiệm số")
    : answers.domain === "game_programming"
    ? (isPrimary ? "Nhà sáng tạo game nhí" : "Kỹ sư lập trình phần mềm")
    : (isPrimary ? "Nhà sáng tạo robot nhí" : "Kỹ sư Robotics & Tự động hóa");

  const displayRole = answers.futureSelf?.trim() || defaultRole;

  const roleIcon = answers.domain === "multimedia"
    ? "🎨"
    : answers.domain === "game_programming"
    ? "🎮"
    : (isPrimary ? "🌱" : "🤖");

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
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* ─────────────────────────────────────────────────────────────
          MAIN PROFILE CARD — Exact visual from mockup
          ───────────────────────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-[32px] bg-white border border-[#c8e6df]/70 shadow-xl shadow-teal-950/5 transition duration-300 hover:shadow-2xl">

        {/* ══ TOP ILLUSTRATION BANNER — Tràn ảnh, Full-bleed cover matching mockup ══ */}
        <div className="relative w-full aspect-[728/450] sm:aspect-[728/420] min-h-[260px] sm:min-h-[320px] bg-gradient-to-br from-[#fef5ea] via-[#e8f7f2] to-[#e4f1fd] overflow-hidden">
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
            {/* Overlay Interactive Button for Camera */}
            <button
              type="button"
              onClick={onEditAvatar}
              className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-white/90 hover:bg-white text-slate-700 backdrop-blur-md px-3.5 py-1.5 text-[11px] sm:text-xs font-bold shadow-md transition hover:scale-105 active:scale-95 border border-white/60"
            >
              <Camera className="h-3.5 w-3.5 text-[#1a8a7d]" />
              <span>Chỉnh sửa ảnh đại diện</span>
            </button>
          </div>
        </div>

        {/* ══ WHITE CARD BODY ══ */}
        <div className="p-6 sm:p-8 space-y-6">

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
                <span>{roleIcon}</span> {displayRole}
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
            <div className="flex items-center gap-2.5 rounded-2xl bg-[#E8F8F5] border border-[#C8EFE6] p-3 shadow-xs">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-[#1a8a7d] shrink-0 shadow-xs">
                <GraduationCap className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Khối lớp</p>
                <p className="text-xs sm:text-sm font-extrabold text-[#1a8a7d] leading-tight">
                  Lớp {displayGrade}
                </p>
              </div>
            </div>

            {/* 2. Sở thích */}
            <div className="flex items-center gap-2.5 rounded-2xl bg-[#FCEBEB] border border-[#FAD7D7] p-3 shadow-xs">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-[#e05260] shrink-0 shadow-xs">
                <Heart className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Sở thích</p>
                <p className="text-xs sm:text-sm font-extrabold text-[#e05260] leading-tight">
                  {displayInterest}
                </p>
              </div>
            </div>

            {/* 3. Phong cách */}
            <div className="flex items-center gap-2.5 rounded-2xl bg-[#FEF7E6] border border-[#FDEAC4] p-3 shadow-xs">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-[#d97706] shrink-0 shadow-xs">
                <Star className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Phong cách</p>
                <p className="text-xs sm:text-sm font-extrabold text-[#d97706] leading-tight">
                  {displayStyle}
                </p>
              </div>
            </div>

            {/* 4. Ước mơ */}
            <div className="flex items-center gap-2.5 rounded-2xl bg-[#EDF4FD] border border-[#D5E6FA] p-3 shadow-xs">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-[#2563eb] shrink-0 shadow-xs">
                <Users className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Ước mơ</p>
                <p className="text-xs sm:text-sm font-extrabold text-[#2563eb] leading-tight">
                  {displayDream}
                </p>
              </div>
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
                <p className="text-[10px] text-slate-400">Cách đồng hành cùng con để đạt được hồ sơ tương lai trên</p>
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
