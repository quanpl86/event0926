"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Sparkles,
  Wrench,
  Compass,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowRight,
  Tag,
  CheckCircle2,
  Bot
} from "lucide-react";

export type KittenProfile = {
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

export const kittenProfiles: KittenProfile[] = [
  {
    id: "creator",
    name: "Kitten Bot · Nhà Sáng Tạo",
    role: "Nhà Sáng Tạo Tương Lai (Future Creator)",
    avatar: "/assets/kittenbot-creator.png",
    themeColor: "from-emerald-500/10 to-teal-500/10 border-emerald-200",
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
    name: "Kitten Bot · Kỹ Sư Chế Tạo",
    role: "Kỹ Sư Robot & Chế Tạo (Master Builder)",
    avatar: "/assets/kittenbot-builder.png",
    themeColor: "from-amber-500/10 to-orange-500/10 border-amber-200",
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
    name: "Kitten Bot · Nhà Thám Hiểm",
    role: "Nhà Thám Hiểm Công Nghệ (Tech Explorer)",
    avatar: "/assets/kittenbot-explorer.png",
    themeColor: "from-sky-500/10 to-indigo-500/10 border-sky-200",
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

type KittenbotShowcaseProps = {
  onSelectProfile?: (profile: KittenProfile) => void;
  onStartJourney?: () => void;
};

export function KittenbotShowcase({ onStartJourney }: KittenbotShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<KittenProfile | null>(null);
  const touchStartX = useRef<number | null>(null);

  // Auto-swipe effect: switch slide every 3.5 seconds when not paused
  useEffect(() => {
    if (isPaused || selectedProfile !== null) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % kittenProfiles.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, selectedProfile]);

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + kittenProfiles.length) % kittenProfiles.length);
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % kittenProfiles.length);
  };

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <section className="mt-16 sm:mt-24 border-t border-slate-200/80 pt-16">
      {/* Section Header */}
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-tek-100 px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[.18em] text-tek-800">
          <Bot className="h-3.5 w-3.5 text-tek-600" />
          3 Hình Mẫu Sáng Tạo Tiêu Biểu
        </span>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
          Đồng hành cùng <span className="text-tek-600">Kitten Bot</span>
        </h2>
        <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
          Mỗi đứa trẻ đều sở hữu tiềm năng độc đáo. Khám phá 3 phong cách sáng tạo tiêu biểu của Kitten Bot — bấm vào từng hình mẫu để xem chi tiết chân dung và bộ kỹ năng rèn luyện!
        </p>
      </div>

      {/* Auto-swipe Carousel Wrapper */}
      <div
        className="relative mx-auto mt-10 max-w-5xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation Arrows */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Hình mẫu trước"
          className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-md backdrop-blur-xs transition hover:bg-slate-100 sm:-left-5 sm:h-12 sm:w-12"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Hình mẫu tiếp theo"
          className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-md backdrop-blur-xs transition hover:bg-slate-100 sm:-right-5 sm:h-12 sm:w-12"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Carousel Slide Cards Container */}
        <div className="overflow-hidden px-2 py-4">
          <div className="grid gap-6 md:grid-cols-3">
            {kittenProfiles.map((p, idx) => {
              const isCurrent = idx === activeIndex;
              const IconComponent = p.icon;

              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedProfile(p)}
                  className={`group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-[26px] border bg-gradient-to-b ${p.themeColor} p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    isCurrent
                      ? "ring-2 ring-tek-500 scale-[1.02] bg-white"
                      : "bg-white/80 opacity-90 hover:opacity-100"
                  }`}
                >
                  {/* Top Badge & Mascot Icon */}
                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider ${p.badgeColor}`}
                      >
                        <IconComponent className="h-3 w-3" />
                        Hình mẫu #{idx + 1}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400 group-hover:text-tek-600">
                        Chi tiết →
                      </span>
                    </div>

                    {/* Mascot Visual Center */}
                    <div className="relative mx-auto my-5 h-44 w-44 transition-transform duration-300 group-hover:scale-105">
                      <Image
                        src={p.avatar}
                        alt={p.name}
                        fill
                        className="object-contain drop-shadow-md"
                        sizes="(max-width: 640px) 180px, 220px"
                      />
                    </div>

                    {/* Titles */}
                    <h3 className="text-center text-lg font-extrabold text-ink group-hover:text-tek-600 transition">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-center text-xs font-semibold text-tek-700">
                      {p.role}
                    </p>
                    <p className="mt-3 line-clamp-2 text-center text-xs leading-5 text-slate-600">
                      {p.tagline}
                    </p>

                    {/* Skill Tags Preview */}
                    <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                      {p.skills.slice(0, 3).map(skill => (
                        <span
                          key={skill}
                          className={`rounded-lg border px-2 py-0.5 text-[10px] font-bold ${p.tagColor}`}
                        >
                          {skill}
                        </span>
                      ))}
                      {p.skills.length > 3 && (
                        <span className="rounded-lg border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-bold text-slate-500">
                          +{p.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Action Hint */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-tek-600 group-hover:underline">
                      Xem hồ sơ chân dung <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Indicators / Dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {kittenProfiles.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Chuyển đến hình mẫu ${p.name}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "w-8 bg-tek-500"
                  : "w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* POPUP MODAL: Detailed Profile View */}
      {selectedProfile && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedProfile(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl sm:p-8"
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
            <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 pb-6 border-b border-slate-100">
              <div className={`relative h-32 w-32 shrink-0 rounded-3xl border p-2 bg-gradient-to-b ${selectedProfile.themeColor} shadow-inner`}>
                <Image
                  src={selectedProfile.avatar}
                  alt={selectedProfile.name}
                  fill
                  className="object-contain p-2"
                />
              </div>

              <div className="text-center sm:text-left">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider ${selectedProfile.badgeColor}`}
                >
                  <selectedProfile.icon className="h-3.5 w-3.5" />
                  {selectedProfile.role}
                </span>

                <h3 className="mt-2.5 text-2xl font-extrabold text-ink">
                  {selectedProfile.name}
                </h3>
                <p className="mt-1 text-xs font-bold text-tek-600">
                  {selectedProfile.tagline}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                  {selectedProfile.description}
                </p>
              </div>
            </div>

            {/* Highlighted Strength */}
            <div className="mt-6 rounded-2xl bg-slate-50 p-4 border border-slate-100">
              <p className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                <CheckCircle2 className="h-4 w-4 text-tek-600" />
                Điểm nổi bật trong tính cách & phương pháp học
              </p>
              <p className="mt-1.5 text-sm font-semibold text-slate-700">
                {selectedProfile.strengthHighlight}
              </p>
            </div>

            {/* Skills Tags Section */}
            <div className="mt-6">
              <p className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                <Tag className="h-4 w-4 text-tek-600" />
                Bộ kỹ năng rèn luyện của chân dung này
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedProfile.skills.map(skill => (
                  <span
                    key={skill}
                    className={`rounded-xl border px-3 py-1.5 text-xs font-extrabold ${selectedProfile.tagColor}`}
                  >
                    ✦ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Sample Project */}
            <div className="mt-6 rounded-2xl border border-tek-200/80 bg-tek-50/50 p-4">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-tek-700">
                Dự án mẫu thực hành tiêu biểu
              </p>
              <p className="mt-1 text-sm font-extrabold text-ink">
                🚀 {selectedProfile.sampleProject}
              </p>
            </div>

            {/* Action Buttons in Modal */}
            <div className="mt-8 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 border-t border-slate-100 pt-5">
              <button
                type="button"
                onClick={() => setSelectedProfile(null)}
                className="w-full sm:w-auto rounded-xl border border-slate-200 px-5 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
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
                  className="focus-ring w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-tek-500 px-6 py-3 text-xs font-extrabold text-white shadow-card hover:bg-tek-600 transition"
                >
                  Bắt đầu khám phá chân dung của con <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
