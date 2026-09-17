"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Sparkles,
  Wrench,
  Compass,
  X,
  ArrowRight,
  Tag,
  CheckCircle2,
  Bot
} from "lucide-react";

export type KittenHeroProfile = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  themeColor: string;
  badgeColor: string;
  tagColor: string;
  tagline: string;
  description: string;
  skills: string[];
  sampleProject: string;
  strengthHighlight: string;
  icon: typeof Sparkles;
};

export const heroKittenProfiles: KittenHeroProfile[] = [
  {
    id: "creator",
    name: "Nhà Sáng Tạo",
    role: "Nhà Sáng Tạo Tương Lai (Future Creator)",
    avatar: "/assets/kittenbot-creator.png",
    themeColor: "from-emerald-500/15 to-teal-500/15 border-emerald-300",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    tagline: "Biến trí tưởng tượng phong phú thành sản phẩm số sống động",
    description:
      "Con yêu thích sáng tạo không giới hạn, từ việc phác thảo cốt truyện, vẽ nhân vật đến ghép nối từng khối lệnh logic để tạo nên thế giới game và ứng dụng tương tác đầy màu sắc.",
    skills: [
      "Tư duy Logic & Thuật toán",
      "Thiết kế Đồ họa & Giao diện",
      "Kể chuyện Tương tác (Storytelling)",
      "Lập trình Kéo thả (Scratch)",
      "Thẩm mỹ & Bố cục số"
    ],
    sampleProject: "Game phiêu lưu giải cứu hành tinh xanh",
    strengthHighlight: "Trực quan sinh động, giàu ý tưởng nguyên bản và yêu thích sáng tác thế giới số riêng.",
    icon: Sparkles
  },
  {
    id: "builder",
    name: "Kỹ Sư Chế Tạo",
    role: "Kỹ Sư Robot & Chế Tạo (Master Builder)",
    avatar: "/assets/kittenbot-builder.png",
    themeColor: "from-amber-500/15 to-orange-500/15 border-amber-300",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    tagColor: "bg-amber-50 text-amber-700 border-amber-200",
    tagline: "Đam mê tháo lắp, làm chủ cơ chế vận hành của máy móc",
    description:
      "Con luôn tò mò muốn biết cách vạn vật xung quanh hoạt động. Con thích tự tay lắp ráp bánh răng, động cơ, nối dây vi mạch và lập trình cảm biến để đưa cỗ máy vào cuộc sống.",
    skills: [
      "Tư duy Cơ học & Không gian",
      "Lắp ráp Mạch điện tử & IoT",
      "Lập trình Điều khiển Cảm biến",
      "Giải quyết Vấn đề & Sửa lỗi (Debugging)",
      "Tư duy Thử nghiệm (Hands-on DIY)"
    ],
    sampleProject: "Xe robot tự hành vượt chướng ngại vật & dọn phòng",
    strengthHighlight: "Khéo léo, kiên trì thử - sai và có trực giác nhạy bén về cách kết cấu cơ khí vận hành.",
    icon: Wrench
  },
  {
    id: "explorer",
    name: "Nhà Thám Hiểm",
    role: "Nhà Thám Hiểm Công Nghệ (Tech Explorer)",
    avatar: "/assets/kittenbot-explorer.png",
    themeColor: "from-sky-500/15 to-indigo-500/15 border-sky-300",
    badgeColor: "bg-sky-100 text-sky-800 border-sky-300",
    tagColor: "bg-sky-50 text-sky-700 border-sky-200",
    tagline: "Tò mò bất tận, khám phá thế giới số và trí tuệ nhân tạo",
    description:
      "Con quan sát thế giới với tinh thần nghiên cứu khoa học, thường xuyên đặt câu hỏi 'Vì sao?', thích tìm quy luật trong dữ liệu và hào hứng với những đột phá mới như Trí tuệ Nhân tạo (AI).",
    skills: [
      "Tư duy Phản biện (Critical Thinking)",
      "Khám phá Trí tuệ Nhân tạo (AI)",
      "Phân tích & Tìm Quy luật Dữ liệu",
      "Tư duy Khoa học & Đặt giả thuyết",
      "Khả năng Thích ứng Công nghệ"
    ],
    sampleProject: "Trợ lý AI phân loại rác thông minh bảo vệ môi trường",
    strengthHighlight: "Khả năng phân tích sâu sắc, nhanh nhạy với công nghệ mới và đam mê khám phá điều kỳ bí.",
    icon: Compass
  }
];

type KittenbotHeroCardsProps = {
  onStartJourney?: () => void;
};

export function KittenbotHeroCards({ onStartJourney }: KittenbotHeroCardsProps) {
  // Start with builder (index 1) or creator (index 0)
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<KittenHeroProfile | null>(null);

  // Auto-switch active card every 3 seconds when not paused
  useEffect(() => {
    if (isPaused || selectedProfile !== null) return;
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % heroKittenProfiles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused, selectedProfile]);

  const handleCardClick = (profile: KittenHeroProfile, index: number) => {
    setActiveIndex(index);
    setSelectedProfile(profile);
  };

  return (
    <div
      className="mt-6 flex flex-col items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 3 Profile Cards Row: only image and title */}
      <div className="flex items-center justify-center gap-3 sm:gap-5 w-full max-w-xl sm:max-w-2xl px-2">
        {heroKittenProfiles.map((p, idx) => {
          const isActive = idx === activeIndex;

          return (
            <div
              key={p.id}
              onClick={() => handleCardClick(p, idx)}
              onMouseEnter={() => setActiveIndex(idx)}
              className={`group relative flex-1 min-w-[120px] sm:min-w-[155px] cursor-pointer select-none rounded-2xl border transition-all duration-500 ease-out flex flex-col items-center justify-center p-3 sm:p-4 text-center ${
                isActive
                  ? "scale-105 sm:scale-110 z-10 border-tek-500 bg-white shadow-card ring-2 ring-tek-400/20 opacity-100"
                  : "scale-95 border-slate-200/90 bg-white/80 hover:bg-white hover:opacity-85 shadow-2xs opacity-40 blur-[0.2px]"
              }`}
              title={`Bấm để xem chi tiết ${p.name}`}
            >
              {/* Active Pill Indicator */}
              {isActive && (
                <span className="absolute -top-2.5 rounded-full bg-tek-500 px-2.5 py-0.5 text-[9px] font-extrabold text-white shadow-2xs uppercase tracking-wider">
                  Khám phá
                </span>
              )}

              {/* Kitten Bot Image */}
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 md:h-22 md:w-22 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={p.avatar}
                  alt={p.name}
                  fill
                  className="object-contain drop-shadow-xs"
                  sizes="(max-width: 640px) 80px, 110px"
                  priority={idx === 1}
                />
              </div>

              {/* Card Title */}
              <p
                className={`mt-2 text-xs sm:text-sm font-extrabold tracking-tight transition-colors whitespace-nowrap ${
                  isActive ? "text-tek-800" : "text-slate-600 group-hover:text-ink"
                }`}
              >
                {p.name}
              </p>

              {/* Subtle hover / click hint */}
              <span
                className={`mt-0.5 text-[10px] font-bold transition-opacity ${
                  isActive ? "text-tek-600 opacity-90" : "text-slate-400 opacity-0 group-hover:opacity-100"
                }`}
              >
                Chi tiết →
              </span>
            </div>
          );
        })}
      </div>

      {/* Mini dots indicator */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        {heroKittenProfiles.map((p, idx) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActiveIndex(idx)}
            aria-label={`Chọn ${p.name}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === activeIndex ? "w-5 bg-tek-500" : "w-1.5 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>

      {/* POPUP MODAL: Detailed Profile View */}
      {selectedProfile && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedProfile(null)}
        >
          <div
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl sm:p-8 text-left"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedProfile(null)}
              aria-label="Đóng popup"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Profile Header Hero */}
            <div className="flex flex-col items-center sm:flex-row sm:items-start gap-5 pb-5 border-b border-slate-100">
              <div
                className={`relative h-28 w-28 shrink-0 rounded-2xl border p-2 bg-gradient-to-b ${selectedProfile.themeColor} shadow-inner`}
              >
                <Image
                  src={selectedProfile.avatar}
                  alt={selectedProfile.name}
                  fill
                  className="object-contain p-1"
                />
              </div>

              <div className="text-center sm:text-left">
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-wider ${selectedProfile.badgeColor}`}
                >
                  <selectedProfile.icon className="h-3.5 w-3.5" />
                  {selectedProfile.role}
                </span>

                <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-ink">
                  Kitten Bot · {selectedProfile.name}
                </h3>
                <p className="mt-1 text-xs font-bold text-tek-600">
                  {selectedProfile.tagline}
                </p>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                  {selectedProfile.description}
                </p>
              </div>
            </div>

            {/* Highlighted Strength */}
            <div className="mt-5 rounded-2xl bg-slate-50 p-4 border border-slate-100">
              <p className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                <CheckCircle2 className="h-4 w-4 text-tek-600" />
                Điểm nổi bật trong tính cách & phương pháp học
              </p>
              <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-700">
                {selectedProfile.strengthHighlight}
              </p>
            </div>

            {/* Skills Tags Section */}
            <div className="mt-5">
              <p className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                <Tag className="h-4 w-4 text-tek-600" />
                Bộ kỹ năng rèn luyện của chân dung này
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {selectedProfile.skills.map(skill => (
                  <span
                    key={skill}
                    className={`rounded-xl border px-3 py-1 text-xs font-extrabold ${selectedProfile.tagColor}`}
                  >
                    ✦ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Sample Project */}
            <div className="mt-5 rounded-2xl border border-tek-200/80 bg-tek-50/50 p-3.5">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-tek-700">
                Dự án mẫu thực hành tiêu biểu
              </p>
              <p className="mt-1 text-xs sm:text-sm font-extrabold text-ink">
                🚀 {selectedProfile.sampleProject}
              </p>
            </div>

            {/* Action Buttons in Modal */}
            <div className="mt-6 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setSelectedProfile(null)}
                className="w-full sm:w-auto rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
              >
                Đóng
              </button>
              {onStartJourney && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProfile(null);
                    onStartJourney();
                  }}
                  className="focus-ring w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-tek-500 px-6 py-2.5 text-xs font-extrabold text-white shadow-card hover:bg-tek-600 transition"
                >
                  Bắt đầu khám phá chân dung của con <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
