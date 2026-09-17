"use client";

import Image from "next/image";
import {
  ArrowRight, Bot, BookOpen, ChevronRight, Gamepad2, Globe2, Lightbulb, LockKeyhole,
  Palette, Rocket, Sparkles, Trophy, Compass
} from "lucide-react";
import { KittenbotHeroCards } from "./KittenbotHeroCards";
import { AppliedStandardsSection } from "./AppliedStandardsSection";
import { CareerAlignmentSection } from "./CareerAlignmentSection";

type LandingPageProps = {
  onStart: () => void;
  onResume?: () => void;
  hasResume?: boolean;
  currentStep?: number;
};

const activityCards = [
  {
    src: "/assets/activity-world-building.png",
    title: "Xây thế giới",
    clue: "Tư duy không gian · Lập kế hoạch",
    tag: "CON THÍCH XÂY THẾ GIỚI",
    color: "bg-tek-50 text-tek-700"
  },
  {
    src: "/assets/activity-robotics.png",
    title: "Tháo lắp",
    clue: "Tư duy cơ học · Thử nghiệm",
    tag: "CON THÍCH THÁO LẮP",
    color: "bg-amber-50 text-amber-700"
  },
  {
    src: "/assets/activity-problem-solving.png",
    title: "Giải đố",
    clue: "Logic · Phân tích · Tìm quy luật",
    tag: "CON THÍCH GIẢI ĐỐ",
    color: "bg-sky-50 text-sky-700"
  },
  {
    src: "/assets/activity-visual-storytelling.png",
    title: "Kể chuyện bằng hình ảnh",
    clue: "Sáng tạo · Thẩm mỹ",
    tag: "CON THÍCH KỂ CHUYỆN BẰNG HÌNH ẢNH",
    color: "bg-orange-50 text-orange-700"
  },
  {
    src: "/assets/activity-communication.png",
    title: "Giao tiếp",
    clue: "Trình bày · Kết nối · Phối hợp",
    tag: "CON THÍCH GIAO TIẾP",
    color: "bg-violet-50 text-violet-700"
  },
  {
    src: "/assets/activity-nature-observation.png",
    title: "Quan sát tự nhiên",
    clue: "Đặt câu hỏi · Tư duy khoa học",
    tag: "CON THÍCH QUAN SÁT TỰ NHIÊN",
    color: "bg-emerald-50 text-emerald-700"
  }
];

export function LandingPage({ onStart, onResume, hasResume, currentStep }: LandingPageProps) {
  const miniCards = [
    {
      icon: Sparkles,
      title: "Hồ sơ nhà sáng tạo",
      text: "Nhìn thấy điều con yêu thích",
      tone: "border-amber-200 bg-amber-50 text-amber-600"
    },
    {
      icon: Lightbulb,
      title: "Dự án của riêng con",
      text: "Biến tò mò thành ý tưởng",
      tone: "border-emerald-200 bg-emerald-50 text-emerald-600"
    },
    {
      icon: Rocket,
      title: "Lộ trình phù hợp",
      text: "Bắt đầu từ bước con hào hứng",
      tone: "border-sky-200 bg-sky-50 text-sky-600"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50/50">
      <div className="page-haze pointer-events-none" />

      {/* Top Navbar */}
      <header className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-6 sm:px-8">
        <div className="flex items-center gap-4">
          <Image
            src="/assets/teky-logo.png"
            alt="TEKY"
            width={128}
            height={54}
            className="h-10 w-auto object-contain"
            priority
          />
          <div className="border-l border-slate-200 pl-4">
            <p className="font-extrabold leading-none text-ink">Future Creator</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[.15em] text-tek-600">
              CÙNG KITTEN BOT KHÁM PHÁ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {hasResume && onResume && (
            <button
              type="button"
              onClick={onResume}
              className="inline-flex items-center gap-2 rounded-full border border-tek-500 bg-tek-50 px-4 py-2 text-xs font-extrabold text-tek-700 shadow-2xs hover:bg-tek-100 transition"
            >
              <ArrowRight className="h-3.5 w-3.5 text-tek-600" /> Tiếp tục bài làm (Bước {(currentStep ?? 0) + 1}/20)
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              document.getElementById("standards-section")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition"
          >
            <BookOpen className="h-3.5 w-3.5 text-tek-600" /> Chuẩn đánh giá CSTA · ISTE · NLS
          </button>
          <button
            type="button"
            onClick={() => {
              document.getElementById("career-alignment-section")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-tek-200 bg-tek-50 px-3.5 py-2 text-xs font-bold text-tek-700 shadow-2xs hover:bg-tek-100 transition"
            title="Xem 4 trụ cột định hướng nghề nghiệp: RIASEC, Triangulation, Family Alignment, SCCT"
          >
            <Compass className="h-3.5 w-3.5 text-tek-600" /> Định hướng nghề nghiệp RIASEC · SCCT
          </button>
          <span className="hidden items-center gap-2 rounded-full border border-tek-200 bg-white px-4 py-2 text-xs font-extrabold text-ink sm:flex shadow-2xs">
            <Trophy className="h-4 w-4 text-amber-400" /> Con và ba mẹ cùng khám phá
          </span>
        </div>
      </header>

      {/* Hero Section (3 Columns) */}
      <main className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <div className="grid min-h-[calc(100vh-140px)] items-center gap-6 lg:gap-8 py-4 lg:py-6 lg:grid-cols-[270px_minmax(0,1fr)_270px]">
          {/* Left Column: 3 Mini Benefit Cards */}
          <div className="order-2 space-y-3 lg:order-1">
            {miniCards.map(({ icon: CardIcon, title, text, tone }) => (
              <div key={title} className={`rounded-2xl border p-4 shadow-2xs ${tone}`}>
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white shadow-2xs">
                    <CardIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[.12em] opacity-75">
                      Sau 60 phút
                    </p>
                    <p className="mt-1 text-sm font-extrabold text-ink">{title}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Center Column: Main Pitch & Action & 3 Kitten Bot Cards */}
          <div className="order-1 mx-auto max-w-4xl text-center lg:order-2 flex flex-col items-center">
            <div className="mb-2 flex w-fit items-center gap-2 rounded-full border border-tek-200 bg-white px-3.5 py-1.5 text-xs font-extrabold text-ink shadow-2xs">
              <Bot className="h-3.5 w-3.5 text-tek-500" /> Kitten Bot đang đợi bạn đây
            </div>

            <p className="text-[11px] font-extrabold uppercase tracking-[.2em] text-tek-600">
              HÀNH TRÌNH KHÁM PHÁ TƯƠNG LAI
            </p>

            <h1 className="mt-2 max-w-3xl text-3xl font-extrabold leading-[1.12] tracking-tight text-ink sm:text-4xl xl:text-5xl">
              Khám phá điều con yêu thích.
              <br />
              <span className="text-tek-600">Tạo nên tương lai của con.</span>
            </h1>

            <p className="mt-2.5 max-w-2xl text-xs font-medium leading-relaxed text-slate-600 sm:text-sm">
              Không phải bài kiểm tra. Không có đáp án đúng hay sai. Đây là 60 phút để con và ba mẹ cùng tìm ra những điều khiến con hào hứng.
            </p>

            <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {hasResume && onResume ? (
                <>
                  <button
                    type="button"
                    onClick={onResume}
                    className="focus-ring inline-flex items-center gap-2 rounded-2xl bg-tek-500 px-7 py-3 text-sm sm:text-base font-extrabold text-white shadow-card hover:bg-tek-600 transition"
                  >
                    Tiếp tục bài làm (Bước {(currentStep ?? 0) + 1}/20) <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={onStart}
                    className="focus-ring rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm sm:text-base font-extrabold text-slate-700 hover:bg-slate-50 transition"
                  >
                    Bắt đầu mới
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={onStart}
                    className="focus-ring inline-flex items-center gap-2 rounded-2xl bg-tek-500 px-7 py-3 text-sm sm:text-base font-extrabold text-white shadow-card hover:bg-tek-600 transition"
                  >
                    Bắt đầu khám phá <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      document.getElementById("activity-guide")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="focus-ring rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm sm:text-base font-extrabold text-ink hover:bg-slate-50 transition"
                  >
                    Hành trình có gì?
                  </button>
                </>
              )}
            </div>

            <p className="mt-2 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-400">
              <LockKeyhole className="h-3.5 w-3.5 text-slate-400" /> Dữ liệu chỉ được lưu khi ba mẹ đồng ý ở cuối hành trình.
            </p>

            {/* 3 Kitten Bot Profile Cards inside Hero Center Column */}
            <KittenbotHeroCards onStartJourney={onStart} />
          </div>

          {/* Right Column: 4 Track Previews */}
          <div id="how" className="order-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-card">
            <p className="text-[10px] font-extrabold uppercase tracking-[.17em] text-slate-400">
              Con có thể khám phá
            </p>
            <div className="mt-5 space-y-3.5">
              {[
                { icon: Gamepad2, label: "Tạo Game", color: "text-blue-600 bg-blue-50" },
                { icon: Bot, label: "Chế tạo Robot", color: "text-tek-600 bg-tek-50" },
                { icon: Palette, label: "Thiết kế", color: "text-orange-600 bg-orange-50" },
                { icon: Globe2, label: "Thế giới số", color: "text-violet-600 bg-violet-50" }
              ].map(({ icon: ItemIcon, label, color }) => (
                <div key={label} className="flex items-center gap-3 rounded-xl p-2 hover:bg-slate-50 transition">
                  <span className={`grid h-10 w-10 place-items-center rounded-xl ${color}`}>
                    <ItemIcon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-extrabold text-slate-700">{label}</span>
                  <ChevronRight className="ml-auto h-4 w-4 text-slate-300" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Guide Section */}
        <section id="activity-guide" className="mx-auto max-w-[1280px] py-16 sm:py-24 border-t border-slate-200/80">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.18em] text-amber-700">
              Gợi mở từ sở thích
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Sở thích nào gợi mở
              <br />
              <span className="text-tek-600">nhóm trải nghiệm nào cho con?</span>
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Sở thích chưa quyết định nghề nghiệp tương lai. Chúng giúp ba mẹ nhận ra cách con tư duy, sáng tạo và giải quyết vấn đề — để mở thêm những trải nghiệm phù hợp.
            </p>
          </div>

          {/* 6 Activity Cards Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activityCards.map(card => (
              <article
                key={card.title}
                className="group overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-card transition duration-300 hover:shadow-md"
              >
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <Image
                    src={card.src}
                    alt={`Hoạt động ${card.title} tại TEKY`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.08em] ${card.color}`}>
                    {card.tag}
                  </span>
                  <p className="mt-2.5 text-sm font-bold text-slate-700">{card.clue}</p>
                </div>
              </article>
            ))}
          </div>

          {/* 3 Steps Observation Box */}
          <div className="mt-16 grid gap-4 rounded-[28px] border border-tek-200 bg-white p-6 shadow-soft sm:grid-cols-3 sm:p-8">
            {[
              {
                n: "01",
                title: "Quan sát điều con hứng thú",
                text: "Con thích sáng tạo, khám phá, giao tiếp hay giải quyết vấn đề?"
              },
              {
                n: "02",
                title: "Chú ý cách con làm",
                text: "Con lên kế hoạch, thử nhiều cách, sửa lỗi hay trao đổi để tìm giải pháp?"
              },
              {
                n: "03",
                title: "Tạo thêm trải nghiệm",
                text: "Mỗi hoạt động mới giúp con hiểu sở thích, điểm mạnh và cách mình học tốt nhất."
              }
            ].map(item => (
              <div key={item.n} className="rounded-2xl bg-slate-50 p-5">
                <span className="text-xs font-extrabold text-tek-600">{item.n}</span>
                <h3 className="mt-2 text-sm font-extrabold text-ink">{item.title}</h3>
                <p className="mt-1.5 text-xs leading-5 text-slate-500">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Applied Academic Standards & Frameworks Section */}
          <AppliedStandardsSection />

          {/* Career Alignment & Scientific Foundations (RIASEC, Triangulation, Family Alignment, SCCT) */}
          <CareerAlignmentSection />

          {/* Teal Call-to-action Banner */}
          <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-[28px] bg-[#006d63] p-6 text-white sm:flex-row sm:p-8">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#9ce8da]">
                Điều quan trọng
              </p>
              <p className="mt-2 max-w-3xl text-base font-semibold leading-7">
                Không phải chọn nghề cho con thật sớm, mà là cho con đủ trải nghiệm để nhận ra thế mạnh và điều mình phù hợp.
              </p>
              <p className="mt-1.5 max-w-3xl text-xs leading-5 text-[#bdeee6]">
                Tại TEKY, con được tự tạo game, robot và sản phẩm AI qua dự án thực tế, từ đó bộc lộ cách con tư duy và giải quyết vấn đề.
              </p>
            </div>
            <button
              type="button"
              onClick={onStart}
              className="focus-ring shrink-0 rounded-xl bg-[#ffd044] px-6 py-3.5 text-sm font-extrabold text-[#064d47] shadow-md hover:bg-amber-300 transition"
            >
              Khám phá 60 phút miễn phí
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
