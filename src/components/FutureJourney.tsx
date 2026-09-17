"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft, ArrowRight, Bot, BookOpen, Check, ChevronRight, Clock3,
  Gamepad2, Globe2, Lightbulb, LockKeyhole, Palette, Rocket, RotateCcw,
  Sparkles, Trophy, Users, Wrench, ShieldCheck, Cpu, Clapperboard,
  Code2, HeartHandshake, Eye, CheckCircle2
} from "lucide-react";
import type { JourneyAnswers } from "@/types/journey";
import { createProfile } from "@/lib/profile";
import {
  v3Steps,
  v3Content,
  getBranchData,
  getBranchesForDomain,
  getDefaultBranchForDomain,
  DOMAIN_NAMES,
  type V3Step
} from "@/data/v3Engine";
import { getStandardDetail, getPrimaryDisplayStandard } from "@/data/standards";
import { FutureBuddy } from "./FutureBuddy";
import { FutureMeResult, ProfileResult, ProjectsJourneyResult } from "./ResultExperience";
import { StandardsModal } from "./StandardsModal";
import { LandingPage } from "./LandingPage";

const AUDIENCE_PURPOSE_SUGGESTIONS: Record<string, { primary: string[]; secondary: string[] }> = {
  "Bạn bè cùng tuổi": {
    primary: [
      "Cùng nhau chơi game giải trí và thi đua bảng điểm vui vẻ sau giờ học",
      "Học nhóm, giải đố bài tập và chia sẻ tài liệu học tập cùng các bạn",
      "Tạo không gian kết nối, trò chuyện và rèn luyện kỹ năng số an toàn"
    ],
    secondary: [
      "Nền tảng chia sẻ dự án, lập trình game và thi đấu giải thuật cùng bạn bè",
      "Ứng dụng hỗ trợ quản lý thời gian biểu và học nhóm ôn thi hiệu quả",
      "Mạng xã hội học tập trao đổi tài liệu và dự án khoa học kỹ thuật"
    ]
  },
  "Gia đình và người thân": {
    primary: [
      "Nhắc nhở bố mẹ, ông bà uống nước, uống thuốc đúng giờ và tập thể dục",
      "Hỗ trợ làm việc nhà thông minh (tưới cây tự động, bật tắt đèn, dọn phòng mini)",
      "Gắn kết cả nhà qua các trò chơi tương tác và lưu giữ album kỷ niệm"
    ],
    secondary: [
      "Hệ thống nhà thông minh tự động hóa tiết kiệm điện và cảnh báo an toàn",
      "Trợ lý ảo gia đình theo dõi sức khỏe và lịch trình sinh hoạt của người thân",
      "Ứng dụng gắn kết gia đình, phân chia việc nhà và quản lý chi tiêu nhỏ"
    ]
  },
  "Trường học và lớp học": {
    primary: [
      "Giúp bác thủ thư sắp xếp, vận chuyển và tìm kiếm sách truyện nhanh chóng",
      "Hỗ trợ giáo viên điểm danh tự động và khen thưởng nề nếp lớp học",
      "Bảng tin thông minh thông báo thời khóa biểu và các sự kiện trường học"
    ],
    secondary: [
      "Hệ thống điểm danh khuôn mặt và quản lý mượn trả thiết bị thí nghiệm",
      "Website cổng thông tin sự kiện, câu lạc bộ và khảo sát ý kiến học sinh",
      "Mô hình thùng rác phân loại thông minh và trạm đo chất lượng không khí lớp học"
    ]
  },
  "Bảo vệ môi trường & Động vật": {
    primary: [
      "Phân loại rác tái chế, phát hiện rác thải và dọn dẹp vệ sinh khuôn viên",
      "Theo dõi độ ẩm đất, tưới cây tự động và chăm sóc vườn hoa trường học",
      "Cho thú cưng ăn tự động và theo dõi sức khỏe của vật nuôi"
    ],
    secondary: [
      "Trạm quan trắc thông minh đo nhiệt độ, độ ẩm và chỉ số ô nhiễm môi trường",
      "Hệ thống phân loại rác tự động tích hợp camera AI nhận diện đồ tái chế",
      "Thiết bị cứu hộ hoặc giám sát môi trường sống tự nhiên cho động vật"
    ]
  },
  "Cộng đồng xung quanh": {
    primary: [
      "Cảnh báo an toàn giao thông trước cổng trường và hỗ trợ sang đường",
      "Hỗ trợ người cao tuổi hoặc người khuyết tật di chuyển thuận tiện hơn",
      "Bản đồ hướng dẫn chỉ đường và giới thiệu địa điểm tham quan thú vị"
    ],
    secondary: [
      "Hệ thống cảnh báo cháy sớm, giám sát mực nước ngập và cứu hộ đô thị",
      "Ứng dụng kết nối tình nguyện viên hỗ trợ người già neo đơn và trẻ em khó khăn",
      "Nền tảng quyên góp đồ cũ, sách báo và hỗ trợ các hoạt động thiện nguyện"
    ]
  }
};

const ALL_PURPOSE_SUGGESTIONS = Object.values(AUDIENCE_PURPOSE_SUGGESTIONS).flatMap(item => [
  ...item.primary,
  ...item.secondary
]);

const APPEARANCE_SUGGESTIONS_MAP: Record<string, string[]> = {
  robotics: [
    "Vỏ màu xanh dương, mắt đèn LED phát sáng, 4 bánh xe cao su chống trượt",
    "Khung gầm mica trong suốt để lộ vi mạch và đèn tín hiệu nhấp nháy",
    "Hình dáng chú mèo máy đáng yêu với cánh tay robot gắp đồ linh hoạt",
    "Thiết kế hộp mini vuông vắn, có màn hình cảm ứng hiển thị khuôn mặt"
  ],
  game_programming: [
    "Phong cách Pixel Art 2D tươi sáng, đồ họa retro với âm thanh vui nhộn",
    "Giao diện hiện đại tối giản với các nút bấm tròn to, màu sắc bắt mắt",
    "Không gian vũ trụ 3D huyền ảo với ánh sáng neon phát sáng kỳ ảo",
    "Phong cách hoạt hình anime sinh động, hiệu ứng chuyển động mượt mà"
  ],
  multimedia: [
    "Mô hình 3D đất sét ngộ nghĩnh với tông màu pastel thân thiện",
    "Thiết kế kiến trúc tương lai xanh với nhiều cây cối và kính năng lượng",
    "Nhân vật hiệp sĩ robot cách điệu với trang phục công nghệ cao",
    "Phong cách điện ảnh viễn tưởng với góc quay hoành tráng và ánh sáng chân thực"
  ]
};

const PARENT_OBSERVED_SUGGESTIONS: Record<string, string[]> = {
  robotics: [
    "Bé rất thích mày mò tháo lắp Lego, tự chế xe chạy pin hoặc tò mò hỏi về robot.",
    "Bé từng tự tìm cách gắn lại bánh xe đồ chơi bị hỏng và gắn thêm đèn pin nhỏ.",
    "Bé có thể ngồi hàng giờ kiên nhẫn xếp các mô hình cơ khí phức tạp."
  ],
  game_programming: [
    "Bé rất thích tự mày mò chơi các game giải đố logic và hỏi cách làm ra trò chơi.",
    "Bé từng thử tự vẽ nhân vật truyện tranh và tưởng tượng cốt truyện cho game.",
    "Bé học sử dụng máy tính rất nhanh và thích khám phá các ứng dụng mới."
  ],
  multimedia: [
    "Bé vẽ tranh suốt ngày, thích phối màu và tự làm các mô hình thủ công từ bìa carton.",
    "Bé thích quay video ngắn về đồ chơi hoặc tạo hình các nhân vật từ đất nặn.",
    "Bé có khiếu thẩm mỹ tốt và hay nhận xét về màu sắc, hình ảnh xung quanh."
  ]
};

const initialAnswers: JourneyAnswers = {
  name: "",
  gradeBand: "3-5",
  grade: "4",
  avatar: "creator",
  projectName: "Robot Trợ Lý Gia Đình",
  futureSelf: "",
  favoriteColor: "",
  characterStyle: "",
  signatureGear: "",
  confirmedTraits: [],
  portraitMode: "buddy",
  parentMoment: "",
  consent: true,
  selections: {},

  // V3 specific fields
  domain: "robotics",
  branch: "robot_build_and_block_control",
  dreamAudience: "Gia đình và người thân",
  dreamPurpose: "Hỗ trợ làm việc nhà thông minh (tưới cây tự động, bật tắt đèn, dọn phòng mini)",
  dreamFeatures: ["Tự động nhận biết vật cản", "Điều khiển bằng nút bấm"],
  dreamAppearance: "Vỏ màu xanh dương, mắt đèn LED phát sáng, 4 bánh xe cao su chống trượt",
  knowledgeResponse: "Kiểm tra pin và xem động cơ có bị kẹt bánh răng không.",
  skillResponse: "Lắp ráp khung xe trước, gắn động cơ, sau đó kết nối mạch điều khiển.",
  problemResponse: "Nếu robot đi lệch hướng, con sẽ chỉnh lại tốc độ của 2 bánh xe cho đều nhau.",
  parentObservedTask: "independent",
  parentObservedExample: "Bé rất thích tự mày mò tháo lắp các khối Lego và tìm cách làm xe chạy xa hơn.",
  hoursPerWeek: 2,
  availableResources: ["Máy tính", "Vật liệu đơn giản"],
  supportMode: ["Lắng nghe và khích lệ", "Cùng con thử một việc nhỏ"],
  familyConflict: "agree",
  familyReviewConfirmed: true,
  parentApprovesExternalTransfer: false
};

export function FutureJourney() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<JourneyAnswers>(initialAnswers);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "local">("idle");
  const [inspectingStandard, setInspectingStandard] = useState<{ code: string; whyWeAsk?: string } | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const [showChildDetail, setShowChildDetail] = useState(false);
  const [showParentDetail, setShowParentDetail] = useState(false);
  const [showScientificNote, setShowScientificNote] = useState(false);

  const currentStepConfig: V3Step = v3Steps[current] || v3Steps[0];
  const isPrimary = !answers.grade || parseInt(answers.grade, 10) <= 5;
  const profile = useMemo(() => createProfile(answers), [answers]);

  // Restore local storage on initial mount
  useEffect(() => {
    const stored = window.localStorage.getItem("future-creator-journey-v3");
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as { started: boolean; current: number; answers: JourneyAnswers };
      const hashActive = typeof window !== "undefined" && window.location.hash === "#kham-pha";
      const sessionActive = typeof window !== "undefined" && sessionStorage.getItem("journey_active") === "true";

      if (hashActive || sessionActive) {
        if (parsed.started) setStarted(true);
      } else {
        // Always display landing page by default on direct page visit
        setStarted(false);
      }

      if (typeof parsed.current === "number") setCurrent(Math.min(parsed.current, 19));
      if (parsed.answers) {
        setAnswers(prev => ({
          ...prev,
          ...parsed.answers,
          selections: parsed.answers.selections ?? {}
        }));
      }
    } catch {
      window.localStorage.removeItem("future-creator-journey-v3");
    }
  }, []);

  // Save to local storage on state change
  useEffect(() => {
    window.localStorage.setItem(
      "future-creator-journey-v3",
      JSON.stringify({ started, current, answers })
    );
  }, [started, current, answers]);

  const handleStart = () => {
    if (typeof window !== "undefined") {
      window.location.hash = "kham-pha";
      sessionStorage.setItem("journey_active", "true");
    }
    setStarted(true);
    setCurrent(0);
  };

  const handleResume = () => {
    if (typeof window !== "undefined") {
      window.location.hash = "kham-pha";
      sessionStorage.setItem("journey_active", "true");
    }
    setStarted(true);
  };

  const handleGoHome = () => {
    if (typeof window !== "undefined") {
      window.location.hash = "";
      sessionStorage.removeItem("journey_active");
    }
    setStarted(false);
  };

  const handleReset = () => {
    window.localStorage.removeItem("future-creator-journey-v3");
    window.localStorage.removeItem("future-creator-journey");
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("journey_active");
      window.location.hash = "";
    }
    setAnswers(initialAnswers);
    setCurrent(0);
    setStarted(false);
    setShowResetConfirm(false);
  };

  // Allowed branches for currently selected domain
  const filteredBranches = useMemo(
    () => getBranchesForDomain(Boolean(isPrimary), answers.domain),
    [isPrimary, answers.domain]
  );

  // Auto-sync branch if current branch doesn't belong to the selected domain
  useEffect(() => {
    if (!answers.branch || !filteredBranches.includes(answers.branch)) {
      const defaultBranch = filteredBranches[0] || (isPrimary ? "robot_build_and_block_control" : "smart_device");
      setAnswers(a => ({
        ...a,
        branch: defaultBranch
      }));
    }
  }, [answers.domain, isPrimary, answers.branch, filteredBranches]);

  // Branch data
  const branchData = useMemo(
    () => getBranchData(Boolean(isPrimary), answers.branch),
    [isPrimary, answers.branch]
  );

  // Validation
  function canContinue(): boolean {
    if (current === 0) {
      return Boolean(answers.name?.trim() && answers.grade);
    }
    if (current === 1) {
      return Boolean(answers.domain);
    }
    if (current === 4) {
      return Boolean(answers.domain);
    }
    if (current === 5) {
      return Boolean(answers.branch);
    }
    if (current === 8) {
      return Boolean(answers.projectName?.trim());
    }
    if (current >= 16) {
      return true;
    }
    return true; // Cho phép đi tiếp các câu hỏi tình huống để học sinh không bị kẹt
  }

  const stepTitle = isPrimary
    ? currentStepConfig.copy?.primary?.title
    : currentStepConfig.copy?.secondary?.title;
  const stepIntro = isPrimary
    ? currentStepConfig.copy?.primary?.intro
    : currentStepConfig.copy?.secondary?.intro;

  const actorLabel =
    currentStepConfig.actor === "student"
      ? isPrimary ? "Con trả lời" : "Học sinh"
      : currentStepConfig.actor === "parent"
      ? "Ba mẹ chia sẻ"
      : "Cả nhà cùng xem";

  if (!started) {
    return (
      <LandingPage
        onStart={handleStart}
        onResume={handleResume}
        hasResume={current > 0 || Boolean(answers.name?.trim())}
        currentStep={current}
      />
    );
  }

  const primaryStandardCode = getPrimaryDisplayStandard(currentStepConfig.standardRefs);
  const allStepStandards = currentStepConfig.standardRefs || [primaryStandardCode];

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
      {/* Header Bar */}
      <header className="flex items-center justify-between border-b border-slate-200/80 pb-4">
        <button
          type="button"
          onClick={handleGoHome}
          className="group flex items-center gap-3 text-left transition hover:opacity-90"
          title="Quay về Trang Chủ TEKY"
        >
          <Image
            src="/assets/teky-logo.png"
            alt="TEKY"
            width={110}
            height={46}
            className="h-9 w-auto object-contain"
            priority
          />
          <div className="border-l border-slate-200 pl-3">
            <span className="flex items-center gap-1.5 text-sm font-extrabold tracking-tight text-ink group-hover:text-tek-600">
              Future Creator
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-tek-600">
              CÙNG KITTEN BOT KHÁM PHÁ
            </span>
          </div>
        </button>

        <div className="flex items-center gap-2.5">
          {/* Back to Home Button */}
          <button
            type="button"
            onClick={handleGoHome}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition"
            title="Quay về Trang Chủ TEKY"
          >
            Trang Chủ
          </button>

          {/* Stage Pill */}
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-tek-50 px-3 py-1 text-xs font-bold text-tek-700">
            <span className="h-2 w-2 rounded-full bg-tek-500" />
            Bước {current + 1}/20
          </span>

          {/* Standard lookup button */}
          <button
            type="button"
            onClick={() => setInspectingStandard({ code: primaryStandardCode })}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-600 shadow-xs hover:bg-slate-50"
          >
            <BookOpen className="h-3.5 w-3.5 text-tek-600" />
            <span className="hidden md:inline">Căn cứ: {primaryStandardCode}</span>
          </button>

          {/* Home / Reset button */}
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            title="Quay về trang chủ"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* 20-Step Active Journey */}
      <div className="mt-6 flex-1 space-y-6">
          {/* Top Stage Indicator & Results Navigation */}
          {current >= 17 ? (
            /* Results Navigation Tab Bar */
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setCurrent(17)}
                  className={`rounded-xl px-4 py-2 text-xs font-extrabold transition ${
                    current === 17
                      ? "bg-tek-500 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  1. Hồ Sơ Sáng Tạo
                </button>
                <button
                  type="button"
                  onClick={() => setCurrent(18)}
                  className={`rounded-xl px-4 py-2 text-xs font-extrabold transition ${
                    current === 18
                      ? "bg-tek-500 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  2. 4 Dự Án & Lộ Trình
                </button>
                <button
                  type="button"
                  onClick={() => setCurrent(19)}
                  className={`rounded-xl px-4 py-2 text-xs font-extrabold transition ${
                    current === 19
                      ? "bg-tek-500 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  3. Xuất Sang Google AI Studio
                </button>
              </div>

              <button
                type="button"
                onClick={() => setCurrent(16)}
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Xem lại các câu trả lời
              </button>
            </div>
          ) : (
            /* Standard Step Progress Bar */
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase ${
                    currentStepConfig.actor === "parent"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-tek-100 text-tek-800"
                  }`}>
                    {actorLabel}
                  </span>
                  <span className="text-ink font-extrabold">Bước {current + 1}/20</span>
                </span>
                <span>{Math.round(((current + 1) / 20) * 100)}% hoàn thành</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-tek-400 to-tek-600 transition-all duration-300"
                  style={{ width: `${((current + 1) / 20) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Kitten Bot Speech Bubble (For Steps 00 to 16) */}
          {current < 17 && (
            <div className="flex items-start gap-4 rounded-3xl border border-tek-200 bg-gradient-to-br from-tek-50/70 via-white to-amber-50/40 p-5 shadow-xs sm:p-6">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border-2 border-white bg-white p-1 shadow-card sm:h-16 sm:w-16">
                <Image
                  src={
                    answers.avatar === "builder"
                      ? "/assets/kittenbot-builder.png"
                      : answers.avatar === "explorer"
                      ? "/assets/kittenbot-explorer.png"
                      : "/assets/kittenbot-creator.png"
                  }
                  alt="Kitten Bot"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-[.15em] text-tek-600">
                  Kitten Bot trò chuyện cùng {isPrimary ? "con" : "bạn"}
                </span>
                <h2 className="mt-1 text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
                  {stepTitle}
                </h2>
                <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm">
                  {stepIntro}
                </p>
                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setInspectingStandard({ code: primaryStandardCode })}
                    className="inline-flex items-center gap-1.5 rounded-full border border-tek-300 bg-white/95 px-2.5 py-1 text-[10px] font-bold text-tek-700 hover:bg-white hover:border-tek-500 transition shadow-2xs"
                    title="Bấm để xem chuẩn học thuật và lý do hỏi câu này"
                  >
                    <BookOpen className="h-3 w-3 text-tek-600" />
                    <span>Chuẩn đối chiếu: {primaryStandardCode}</span>
                    <span className="text-tek-500 font-extrabold">· Xem căn cứ đánh giá →</span>
                  </button>

                  {allStepStandards
                    .filter((code) => code !== primaryStandardCode)
                    .map((code) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => setInspectingStandard({ code })}
                        className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/80 px-2 py-0.5 text-[9px] font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition"
                        title={`Bấm để xem chi tiết chuẩn bổ trợ: ${code}`}
                      >
                        <span>{code}</span>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Interactive Step Content (Steps 00 to 16) */}
          {current < 17 && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              {/* STEP 0: IDENTITY */}
              {current === 0 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      {isPrimary ? "Kitten nên gọi con là gì?" : "Tên hiển thị trên hồ sơ (Bí danh):"}
                    </label>
                    <input
                      type="text"
                      maxLength={24}
                      value={answers.name}
                      onChange={e => setAnswers(a => ({ ...a, name: e.target.value }))}
                      placeholder="Ví dụ: Bảo Minh / Gia Hân / Alex"
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-bold text-ink outline-none focus:border-tek-500 focus:bg-white focus:ring-2 focus:ring-tek-100"
                    />
                    <p className="mt-1.5 text-[11px] text-slate-400">
                      *Chỉ cần nhập tên gọi thân mật hoặc biệt danh, không cần nhập họ tên thật.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      {isPrimary ? "Con đang học lớp mấy?" : "Bạn đang học lớp nào?"}
                    </label>
                    <div className="mt-2 grid grid-cols-5 gap-2 sm:grid-cols-9">
                      {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map(grd => {
                        const active = answers.grade === grd;
                        return (
                          <button
                            type="button"
                            key={grd}
                            onClick={() => {
                              const band = ["1", "2"].includes(grd) ? "1-2" : ["3", "4", "5"].includes(grd) ? "3-5" : ["6", "7"].includes(grd) ? "6-7" : "8-9";
                              setAnswers(a => ({ ...a, grade: grd, gradeBand: band }));
                            }}
                            className={`rounded-xl border py-3 text-center text-sm font-extrabold transition ${
                              active
                                ? "border-tek-500 bg-tek-500 text-white shadow-xs"
                                : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            Lớp {grd}
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-2 text-[11px] text-slate-400">
                      {isPrimary
                        ? "Lớp 1–5: Giao diện trực quan, vui nhộn, hình lớn."
                        : "Lớp 6–9: Giao diện công nghệ chuyên sâu, hiện đại."}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      Chọn người bạn Kitten Bot đồng hành cùng con:
                    </label>
                    <div className="mt-3 grid grid-cols-3 gap-3">
                      {[
                        { id: "creator", name: "Kitten Creator", role: "Sáng tạo & Phối màu", img: "/assets/kittenbot-creator.png" },
                        { id: "builder", name: "Kitten Builder", role: "Chế tạo & Lắp ráp", img: "/assets/kittenbot-builder.png" },
                        { id: "explorer", name: "Kitten Explorer", role: "Thám hiểm & Thuật toán", img: "/assets/kittenbot-explorer.png" }
                      ].map(bot => {
                        const active = answers.avatar === bot.id;
                        return (
                          <button
                            type="button"
                            key={bot.id}
                            onClick={() => setAnswers(a => ({ ...a, avatar: bot.id }))}
                            className={`flex flex-col items-center rounded-2xl border p-4 text-center transition ${
                              active
                                ? "border-tek-500 bg-tek-50/60 ring-2 ring-tek-200"
                                : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                            }`}
                          >
                            <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-white p-1 shadow-xs">
                              <Image src={bot.img} alt={bot.name} fill className="object-contain" />
                            </div>
                            <strong className="mt-2 block text-xs font-extrabold text-ink">{bot.name}</strong>
                            <span className="text-[10px] text-slate-500">{bot.role}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 1: STUDENT INTEREST */}
              {current === 1 && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-500">
                      Chọn lĩnh vực mà {isPrimary ? "con" : "bạn"} tò mò muốn tìm hiểu nhất:
                    </p>
                    <span className="text-[11px] font-extrabold text-tek-600 bg-tek-50 px-2.5 py-1 rounded-full border border-tek-200">
                      3 Thế giới Sáng tạo
                    </span>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-3">
                    {[
                      {
                        id: "robotics",
                        label: "Robotics & Thiết bị thông minh",
                        desc: "Lắp ráp cỗ máy, cảm biến và điều khiển hoạt động thực tế.",
                        icon: Bot,
                        image: "/assets/robotics-iot.png",
                        tag: "Cơ khí & Tự động hóa"
                      },
                      {
                        id: "game_programming",
                        label: "Lập trình Game & Ứng dụng",
                        desc: "Tự tạo màn chơi, quy tắc và phần mềm tương tác.",
                        icon: Gamepad2,
                        image: "/assets/coding.png",
                        tag: "Thuật toán & Logic"
                      },
                      {
                        id: "multimedia",
                        label: "Đồ họa, 3D & Kể chuyện số",
                        desc: "Thiết kế nhân vật, dựng hình không gian và làm phim hoạt hình.",
                        icon: Palette,
                        image: "/assets/multimedia.png",
                        tag: "Thẩm mỹ & Đồ họa 3D"
                      }
                    ].map(dom => {
                      const active = answers.domain === dom.id;
                      const Icon = dom.icon;
                      return (
                        <button
                          type="button"
                          key={dom.id}
                          onClick={() => {
                            const nextBranch = getDefaultBranchForDomain(Boolean(isPrimary), dom.id);
                            const nextRole = dom.id === 'multimedia'
                              ? (isPrimary ? 'Nhà sáng tạo nội dung số nhí' : 'Nhà thiết kế trải nghiệm số')
                              : dom.id === 'game_programming'
                              ? (isPrimary ? 'Nhà sáng tạo game nhí' : 'Kỹ sư lập trình phần mềm')
                              : (isPrimary ? 'Nhà sáng tạo robot nhí' : 'Kỹ sư Robotics & Tự động hóa');
                            setAnswers(a => ({
                              ...a,
                              domain: dom.id,
                              branch: nextBranch,
                              futureSelf: nextRole
                            }));
                          }}
                          className={`group flex flex-col justify-between overflow-hidden rounded-3xl border text-left transition-all duration-200 ${
                            active
                              ? "border-tek-500 bg-tek-50/40 shadow-md ring-2 ring-tek-400"
                              : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs"
                          }`}
                        >
                          {/* Image Container with Cover & Active Indicator */}
                          <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-100">
                            <Image
                              src={dom.image}
                              alt={dom.label}
                              fill
                              sizes="(max-width: 640px) 100vw, 33vw"
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              priority
                            />
                            <div className="absolute top-2.5 left-2.5">
                              <span className="inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-xs px-2.5 py-1 text-[10px] font-bold text-white shadow-xs">
                                <Icon className="h-3 w-3 text-tek-300" />
                                {dom.tag}
                              </span>
                            </div>
                            {active && (
                              <div className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-tek-500 text-white shadow-md ring-2 ring-white">
                                <Check className="h-4 w-4 stroke-[3]" />
                              </div>
                            )}
                          </div>

                          {/* Text & Content Body */}
                          <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                            <div>
                              <h3 className="text-sm font-extrabold text-ink group-hover:text-tek-700 transition leading-snug">
                                {dom.label}
                              </h3>
                              <p className="mt-1.5 text-xs leading-5 text-slate-500">
                                {dom.desc}
                              </p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-100">
                              {active ? (
                                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-tek-700">
                                  <Check className="h-3.5 w-3.5" /> Đã chọn lĩnh vực này
                                </span>
                              ) : (
                                <span className="text-[11px] font-bold text-slate-400 group-hover:text-tek-600 transition">
                                  Bấm để chọn →
                                </span>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: SCENARIOS (TAILORED TO SELECTED DOMAIN) */}
              {current === 2 && (() => {
                const domainScenarios =
                  answers.domain === "game_programming"
                    ? [
                        { id: "game_mechanics", title: "Lập trình thế giới game & vượt ải", desc: "Tự tay sáng tạo chuyển động nhân vật, luật nhảy né chướng ngại vật và nhặt quà." },
                        { id: "logic_rules", title: "Thiết kế luật chơi & bảng tính điểm", desc: "Nghĩ ra thuật toán tính điểm số, phân chia cấp độ dễ - khó và âm thanh chiến thắng." },
                        { id: "interactive_app", title: "Xây dựng ứng dụng tương tác thông minh", desc: "Làm ra các phần mềm tiện ích nhỏ, màn hình giao diện phản hồi mượt mà khi bấm nút." }
                      ]
                    : answers.domain === "multimedia"
                    ? [
                        { id: "art_3d", title: "Thiết kế tạo hình nhân vật & phối màu 2D/3D", desc: "Phác thảo trang phục, diện mạo và dựng hình nhân vật yêu thích trong không gian đa chiều." },
                        { id: "animation", title: "Làm chuyển động hoạt hình (Animation)", desc: "Biến các bức vẽ tĩnh thành thước phim sống động với từng khung hình mượt mà." },
                        { id: "video_story", title: "Dựng video clip & kỹ xảo số kể chuyện", desc: "Ghép nối video, thêm hiệu ứng âm thanh và tạo nên câu chuyện truyền cảm hứng." }
                      ]
                    : [
                        { id: "build_mech", title: "Tự tay lắp ráp cỗ máy & khung xe cơ khí", desc: "Cầm từng chi tiết bánh răng, khung trục và kết nối động cơ để xe di chuyển vững vàng." },
                        { id: "sensor_automation", title: "Lập trình cảm biến tự động tránh vật cản", desc: "Gắn mắt thần siêu âm, cảm biến ánh sáng để robot tự động xử lý khi gặp vật cản." },
                        { id: "iot_smart", title: "Chế tạo thiết bị thông minh & đèn còi cảnh báo", desc: "Tạo ra các tiện ích tự động phát tín hiệu, nút bấm thông minh cho ngôi nhà." }
                      ];

                return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-500">
                        Nếu có một buổi chiều tự do sáng tạo, {isPrimary ? "con" : "bạn"} muốn thử hoạt động nào nhất?
                      </p>
                      <span className="text-[11px] font-extrabold text-tek-600 bg-tek-50 px-2.5 py-1 rounded-full border border-tek-200">
                        Thuộc: {DOMAIN_NAMES[answers.domain || "robotics"]}
                      </span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      {domainScenarios.map(sc => {
                        const active = (answers.selections.scenarios ?? []).includes(sc.id);
                        return (
                          <button
                            type="button"
                            key={sc.id}
                            onClick={() => setAnswers(a => ({ ...a, selections: { ...a.selections, scenarios: [sc.id] } }))}
                            className={`flex flex-col justify-between rounded-2xl border p-5 text-left transition ${
                              active
                                ? "border-tek-500 bg-tek-50/70 ring-2 ring-tek-300 shadow-xs"
                                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-extrabold text-ink">{sc.title}</h4>
                                {active && <Check className="h-4 w-4 text-tek-600 stroke-[3] shrink-0 ml-1" />}
                              </div>
                              <p className="mt-2 text-xs leading-5 text-slate-500">{sc.desc}</p>
                            </div>
                            <span className="mt-3 text-[10px] font-bold text-tek-600">
                              {active ? "✓ Đã chọn hoạt động này" : "Bấm để chọn →"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* STEP 3: PARENT INTEREST OBSERVATION (TOUCHPOINT 1) */}
              {current === 3 && (
                <div className="space-y-5">
                  <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4">
                    <p className="text-xs font-bold text-amber-900">
                      Góc nhìn từ Ba Mẹ: Ở nhà, ba mẹ thường quan sát thấy con hay dành thời gian cho điều gì nhất?
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { id: "lego", label: "Say sưa lắp ghép đồ chơi / Lego / mô hình", matchDomain: "robotics" },
                      { id: "device", label: "Tò mò bấm thử các ứng dụng / game trên máy tính", matchDomain: "game_programming" },
                      { id: "draw", label: "Thích vẽ tranh, cắt dán hoặc tạo hình sáng tạo", matchDomain: "multimedia" },
                      { id: "ask", label: "Hay đặt câu hỏi vì sao và tìm hiểu cách máy móc chạy", matchDomain: null }
                    ].map(act => {
                      const active = (answers.selections.parentInterest ?? []).includes(act.id);
                      const isMatch = act.matchDomain === answers.domain;
                      return (
                        <button
                          type="button"
                          key={act.id}
                          onClick={() => setAnswers(a => ({
                            ...a,
                            selections: {
                              ...a.selections,
                              parentInterest: active
                                ? (a.selections.parentInterest ?? []).filter(x => x !== act.id)
                                : [...(a.selections.parentInterest ?? []), act.id]
                            }
                          }))}
                          className={`flex items-center justify-between gap-3 rounded-2xl border p-4 text-left transition ${
                            active ? "border-amber-400 bg-amber-50 text-amber-900 ring-1 ring-amber-300" : "border-slate-200 bg-white hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border ${
                              active ? "border-amber-600 bg-amber-600 text-white" : "border-slate-300"
                            }`}>
                              {active && <Check className="h-3 w-3" />}
                            </span>
                            <span className="text-xs font-bold">{act.label}</span>
                          </div>
                          {isMatch && (
                            <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[9px] font-extrabold text-amber-800 shrink-0">
                              Khớp sở thích của con
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: DOMAIN CONFIRMATION (RECONCILE & CONFIRM) */}
              {current === 4 && (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-tek-200 bg-tek-50/70 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-tek-700">
                        Đối chiếu lựa chọn Bước 1 của con
                      </span>
                      <p className="text-xs font-bold text-slate-700 mt-0.5">
                        Con đã chọn: <strong className="text-tek-800">{DOMAIN_NAMES[answers.domain || "robotics"]}</strong>
                      </p>
                    </div>
                    <span className="text-[11px] font-bold text-tek-700 bg-white px-3 py-1 rounded-full border border-tek-200 shrink-0">
                      Gia đình có thể xác nhận hướng này hoặc chọn đổi hướng
                    </span>
                  </div>

                  <p className="text-xs font-bold text-slate-500">
                    Cả nhà cùng xác nhận bộ môn công nghệ để bắt đầu hành trình:
                  </p>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {[
                      { id: "robotics", label: "Robotics & IoT", image: "/assets/robotics-iot.png", desc: "Chế tạo cỗ máy & Thiết bị thông minh" },
                      { id: "game_programming", label: "Lập trình Game & Ứng dụng", image: "/assets/coding.png", desc: "Tư duy logic & Sáng tạo phần mềm" },
                      { id: "multimedia", label: "Multimedia & Đồ họa 3D", image: "/assets/multimedia.png", desc: "Mô hình không gian & Hoạt hình số" }
                    ].map(d => {
                      const active = answers.domain === d.id;
                      return (
                        <button
                          type="button"
                          key={d.id}
                          onClick={() => {
                            const nextBranch = getDefaultBranchForDomain(Boolean(isPrimary), d.id);
                            const nextRole = d.id === 'multimedia'
                              ? (isPrimary ? 'Nhà sáng tạo nội dung số nhí' : 'Nhà thiết kế trải nghiệm số')
                              : d.id === 'game_programming'
                              ? (isPrimary ? 'Nhà sáng tạo game nhí' : 'Kỹ sư lập trình phần mềm')
                              : (isPrimary ? 'Nhà sáng tạo robot nhí' : 'Kỹ sư Robotics & Tự động hóa');
                            setAnswers(a => ({
                              ...a,
                              domain: d.id,
                              branch: nextBranch,
                              futureSelf: nextRole
                            }));
                          }}
                          className={`group overflow-hidden rounded-2xl border text-left transition-all ${
                            active
                              ? "border-tek-500 bg-tek-50/60 shadow-md ring-2 ring-tek-400"
                              : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs"
                          }`}
                        >
                          <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                            <Image
                              src={d.image}
                              alt={d.label}
                              fill
                              sizes="(max-width: 640px) 100vw, 33vw"
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            {active && (
                              <div className="absolute top-2.5 right-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-tek-500 text-white shadow-xs ring-2 ring-white">
                                <Check className="h-3.5 w-3.5 stroke-[3]" />
                              </div>
                            )}
                          </div>
                          <div className="p-3.5">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs sm:text-sm font-extrabold text-ink leading-snug">{d.label}</h4>
                              {active && (
                                <span className="rounded bg-tek-100 px-1.5 py-0.5 text-[9px] font-extrabold text-tek-800">
                                  Đang chọn
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-[11px] text-slate-500 leading-4">{d.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 5: SPECIALIZATION (BRANCHES FILTERED BY SELECTED DOMAIN) */}
              {current === 5 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-500">
                      Chọn 1 nhánh chuyên sâu thuộc <strong className="text-tek-700">{DOMAIN_NAMES[answers.domain || "robotics"]}</strong>:
                    </p>
                    <span className="text-[11px] font-extrabold text-tek-600 bg-tek-50 px-3 py-1 rounded-full border border-tek-200">
                      {isPrimary ? "Tiểu học" : "THCS"} · {filteredBranches.length} nhánh phù hợp
                    </span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {filteredBranches.map((branchKey) => {
                      const bData = (
                        isPrimary
                          ? (v3Content.branches as any).primary
                          : (v3Content.branches as any).secondary
                      )[branchKey];
                      if (!bData) return null;
                      const active = answers.branch === branchKey;
                      return (
                        <button
                          type="button"
                          key={branchKey}
                          onClick={() => setAnswers(a => ({ ...a, branch: branchKey }))}
                          className={`flex flex-col justify-between rounded-2xl border p-5 text-left transition ${
                            active
                              ? "border-tek-500 bg-tek-50/70 ring-2 ring-tek-300 shadow-xs"
                              : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-extrabold text-ink">{bData.label}</h4>
                              {active && <Check className="h-4 w-4 text-tek-600 stroke-[3]" />}
                            </div>
                            <p className="mt-1.5 text-xs text-slate-500 leading-5">{bData.about}</p>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-1.5 border-t border-slate-100 pt-3">
                            {bData.projects?.slice(0, 2).map((p: any, pIdx: number) => (
                              <span
                                key={`${branchKey}-${p.id || p.title || pIdx}`}
                                className="rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600"
                              >
                                Đồ án mẫu: {p.title || p.name}
                              </span>
                            ))}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 6: DREAM PROJECT PURPOSE & AUDIENCE */}
              {current === 6 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      {isPrimary ? "Con muốn sản phẩm trong mơ giúp đỡ ai?" : "Ai là đối tượng người dùng bạn muốn hướng đến?"}
                    </label>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {Object.keys(AUDIENCE_PURPOSE_SUGGESTIONS).map(aud => {
                        const active = answers.dreamAudience === aud;
                        return (
                          <button
                            type="button"
                            key={aud}
                            onClick={() => {
                              const suggs = isPrimary
                                ? AUDIENCE_PURPOSE_SUGGESTIONS[aud]?.primary
                                : AUDIENCE_PURPOSE_SUGGESTIONS[aud]?.secondary;
                              const firstSugg = suggs?.[0] || "";
                              setAnswers(a => {
                                const shouldUpdatePurpose =
                                  !a.dreamPurpose || ALL_PURPOSE_SUGGESTIONS.includes(a.dreamPurpose);
                                return {
                                  ...a,
                                  dreamAudience: aud,
                                  dreamPurpose: shouldUpdatePurpose ? firstSugg : a.dreamPurpose
                                };
                              });
                            }}
                            className={`rounded-xl border px-3.5 py-2 text-xs font-bold transition ${
                              active
                                ? "border-tek-500 bg-tek-50 text-tek-800 shadow-xs ring-1 ring-tek-400"
                                : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            {aud}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
                        {isPrimary ? "Con muốn sản phẩm giúp họ làm điều gì cụ thể?" : "Vấn đề thực tế mà sản phẩm sẽ giải quyết:"}
                      </label>
                      <span className="text-[10px] font-bold text-slate-400">Bấm gợi ý nhanh hoặc tự chỉnh sửa</span>
                    </div>

                    {/* Dynamic Purpose Suggestion Chips for Selected Audience */}
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {(
                        (isPrimary
                          ? AUDIENCE_PURPOSE_SUGGESTIONS[answers.dreamAudience || "Gia đình và người thân"]?.primary
                          : AUDIENCE_PURPOSE_SUGGESTIONS[answers.dreamAudience || "Gia đình và người thân"]?.secondary) || []
                      ).map((sug, sIdx) => {
                        const isSelected = answers.dreamPurpose === sug;
                        return (
                          <button
                            type="button"
                            key={sIdx}
                            onClick={() => setAnswers(a => ({ ...a, dreamPurpose: sug }))}
                            className={`rounded-xl border px-3 py-1.5 text-left text-[11px] font-medium transition ${
                              isSelected
                                ? "border-tek-500 bg-tek-50 text-tek-800 font-bold ring-1 ring-tek-400"
                                : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            🎯 {sug}
                          </button>
                        );
                      })}
                    </div>

                    <textarea
                      rows={3}
                      maxLength={300}
                      value={answers.dreamPurpose}
                      onChange={e => setAnswers(a => ({ ...a, dreamPurpose: e.target.value }))}
                      placeholder="Nhập mục đích cụ thể hoặc chọn một gợi ý ở trên..."
                      className="mt-2.5 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs font-medium text-ink outline-none focus:border-tek-500 focus:bg-white"
                    />
                  </div>
                </div>
              )}

              {/* STEP 7: DREAM FEATURES & APPEARANCE */}
              {current === 7 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      Chọn 1–3 tính năng tuyệt vời nhất cho sản phẩm:
                    </label>
                    <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
                      {(branchData?.featureChoices || [
                        "Tự động nhận biết vật cản",
                        "Điều khiển bằng giọng nói hoặc nút bấm",
                        "Giao diện màn hình cảm ứng",
                        "Tích hợp còi báo và đèn hiệu thông minh"
                      ]).map((feat: string) => {
                        const active = (answers.dreamFeatures ?? []).includes(feat);
                        return (
                          <button
                            type="button"
                            key={feat}
                            onClick={() => {
                              const list = answers.dreamFeatures ?? [];
                              const next = list.includes(feat)
                                ? list.filter(f => f !== feat)
                                : [...list, feat].slice(-3);
                              setAnswers(a => ({ ...a, dreamFeatures: next }));
                            }}
                            className={`flex items-center gap-2.5 rounded-xl border p-3 text-left text-xs font-bold transition ${
                              active ? "border-tek-500 bg-tek-50 text-tek-800 ring-1 ring-tek-400" : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            <span className={`grid h-4 w-4 shrink-0 place-items-center rounded-md border ${
                              active ? "border-tek-600 bg-tek-600 text-white" : "border-slate-300"
                            }`}>
                              {active && <Check className="h-3 w-3" />}
                            </span>
                            <span>{feat}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
                        Diện mạo & Phong cách sản phẩm (Tùy chọn):
                      </label>
                      <span className="text-[10px] font-bold text-slate-400">Bấm gợi ý nhanh hoặc tự gõ</span>
                    </div>

                    {/* Appearance Suggestion Chips */}
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {(APPEARANCE_SUGGESTIONS_MAP[answers.domain || "robotics"] || APPEARANCE_SUGGESTIONS_MAP.robotics).map((appSug, aIdx) => {
                        const isSelected = answers.dreamAppearance === appSug;
                        return (
                          <button
                            type="button"
                            key={aIdx}
                            onClick={() => setAnswers(a => ({ ...a, dreamAppearance: appSug }))}
                            className={`rounded-xl border px-3 py-1.5 text-left text-[11px] font-medium transition ${
                              isSelected
                                ? "border-tek-500 bg-tek-50 text-tek-800 font-bold ring-1 ring-tek-400"
                                : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            🎨 {appSug}
                          </button>
                        );
                      })}
                    </div>

                    <input
                      type="text"
                      value={answers.dreamAppearance}
                      onChange={e => setAnswers(a => ({ ...a, dreamAppearance: e.target.value }))}
                      placeholder="Ví dụ: Vỏ màu xanh dương, mắt LED phát sáng, có 4 bánh xe cao su..."
                      className="mt-2.5 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-medium text-ink outline-none focus:border-tek-500 focus:bg-white"
                    />
                  </div>
                </div>
              )}

              {/* STEP 8: DREAM CONFIRM (NAME YOUR DREAM PROJECT) */}
              {current === 8 && (() => {
                const sampleProjects: string[] = (branchData?.projects || [])
                  .map((p: any) => p.title || p.name)
                  .filter(Boolean);
                const defaultNames = isPrimary
                  ? ["Robot Hỗ Trợ Đời Sống", "Trạm Công Nghệ Mini", "Cỗ Máy Thông Minh Vui Nhộn"]
                  : ["Hệ Thống Tự Động Hóa Thông Minh", "Ứng Dụng Đa Năng Thông Minh", "Mô Hình Công Nghệ Số"];
                const projectSuggestions = Array.from(new Set([...sampleProjects, ...defaultNames])).slice(0, 4);

                return (
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
                          {isPrimary ? "Con đặt tên cho sản phẩm trong mơ là gì?" : "Đặt tên định danh cho Dự Án Mơ Ước của bạn:"}
                        </label>
                        <span className="text-[10px] font-bold text-slate-400">Chọn tên mẫu hoặc tự đặt tên mới</span>
                      </div>

                      {/* Project Name Suggestions */}
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {projectSuggestions.map((nameSug, nIdx) => {
                          const isSelected = answers.projectName === nameSug;
                          return (
                            <button
                              type="button"
                              key={nIdx}
                              onClick={() => setAnswers(a => ({ ...a, projectName: nameSug }))}
                              className={`rounded-xl border px-3 py-1.5 text-left text-[11px] font-medium transition ${
                                isSelected
                                  ? "border-amber-500 bg-amber-50 text-amber-900 font-bold ring-1 ring-amber-400"
                                  : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                              }`}
                            >
                              ✨ {nameSug}
                            </button>
                          );
                        })}
                      </div>

                      <input
                        type="text"
                        maxLength={60}
                        value={answers.projectName}
                        onChange={e => setAnswers(a => ({ ...a, projectName: e.target.value }))}
                        placeholder="Ví dụ: Robot Thủ Thư Thông Minh / Website Hành Tinh Xanh"
                        className="mt-2.5 w-full rounded-2xl border border-amber-300 bg-amber-50/40 px-4 py-3.5 text-base font-extrabold text-ink outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-100"
                      />
                    </div>

                    {/* Dream Brief Card */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                        Bản tóm tắt ý tưởng của con:
                      </span>
                      <h3 className="mt-1 text-base font-extrabold text-ink">
                        {answers.projectName || "Dự án Ước Mơ"}
                      </h3>
                      <p className="mt-2 text-xs leading-5 text-slate-600">
                        <strong>Đối tượng:</strong> {answers.dreamAudience || "Gia đình và người thân"}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-600">
                        <strong>Mục đích:</strong> {answers.dreamPurpose || "Giải quyết vấn đề thực tế"}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {(answers.dreamFeatures ?? []).map(f => (
                          <span key={f} className="rounded-md bg-white px-2 py-1 text-[10px] font-bold text-tek-700 shadow-2xs">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* STEP 9: SELF EXPERIENCE */}
              {current === 9 && (
                <div className="space-y-4">
                  <p className="text-xs font-bold text-slate-500">
                    Trước đây, {isPrimary ? "con" : "bạn"} đã từng thử làm những việc nào dưới đây chưa?
                  </p>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {[
                      { id: "sketch", label: "Từng phác thảo ý tưởng ra giấy" },
                      { id: "make", label: "Từng tự làm một sản phẩm nhỏ (gấp giấy, ghép lego)" },
                      { id: "explain", label: "Từng kể cho người khác nghe về cách hoạt động của món đồ" },
                      { id: "revise", label: "Từng thử đi thử lại nhiều lần khi chưa ưng ý" },
                      { id: "share", label: "Từng trình diễn hoặc khoe sản phẩm với bạn bè" },
                      { id: "not_yet", label: "Chưa từng thử, hôm nay là lần đầu tiên!" }
                    ].map(exp => {
                      const active = (answers.selections.priorActivities ?? []).includes(exp.id);
                      return (
                        <button
                          type="button"
                          key={exp.id}
                          onClick={() => setAnswers(a => ({
                            ...a,
                            selections: {
                              ...a.selections,
                              priorActivities: active
                                ? (a.selections.priorActivities ?? []).filter(x => x !== exp.id)
                                : [...(a.selections.priorActivities ?? []), exp.id]
                            }
                          }))}
                          className={`flex items-center gap-3 rounded-xl border p-3.5 text-left text-xs font-bold transition ${
                            active ? "border-tek-500 bg-tek-50 text-tek-800" : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                          }`}
                        >
                          <span className={`grid h-4 w-4 shrink-0 place-items-center rounded-md border ${
                            active ? "border-tek-600 bg-tek-600 text-white" : "border-slate-300"
                          }`}>
                            {active && <Check className="h-3 w-3" />}
                          </span>
                          <span>{exp.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 10: SIO SITUATION 1 (KNOWLEDGE) */}
              {current === 10 && (() => {
                const sio = branchData?.sioInteractions?.[0];
                const suggestions: string[] = (sio as any)?.suggestedAnswers || [
                  "Con sẽ tìm hiểu cách hoạt động và chức năng từng bộ phận trước",
                  "Con sẽ quan sát các thành phần và thử kết nối từng phần nhỏ",
                  "Con sẽ phác thảo sơ đồ ý tưởng hoặc nhờ thầy cô hướng dẫn thêm"
                ];

                return (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-tek-200 bg-tek-50/50 p-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-tek-700">
                          Tình huống thử thách 1: Nhận thức & Hiểu biết
                        </span>
                        {sio?.observable && (
                          <span className="rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-tek-700 border border-tek-200 shadow-2xs">
                            Quan sát: {sio.observable}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm font-extrabold text-ink leading-relaxed">
                        {sio?.question || "Khi bắt đầu một sản phẩm, con sẽ tìm hiểu bộ phận nào trước?"}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-600">
                          {isPrimary ? "Con nghĩ sao? Hãy chia sẻ cách con làm nhé:" : "Ý kiến và phương án tiếp cận của bạn:"}
                        </label>
                        <span className="text-[10px] font-bold text-slate-400">Bấm gợi ý nhanh hoặc tự nhập</span>
                      </div>

                      {/* Suggestion Chips */}
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {suggestions.map((sug, sIdx) => (
                          <button
                            type="button"
                            key={sIdx}
                            onClick={() => setAnswers(a => ({ ...a, knowledgeResponse: sug }))}
                            className={`rounded-xl border px-3 py-1.5 text-left text-[11px] font-medium transition ${
                              answers.knowledgeResponse === sug
                                ? "border-tek-500 bg-tek-50 text-tek-800 font-bold"
                                : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            💡 {sug}
                          </button>
                        ))}
                      </div>

                      <textarea
                        rows={3}
                        value={answers.knowledgeResponse}
                        onChange={e => setAnswers(a => ({ ...a, knowledgeResponse: e.target.value }))}
                        placeholder="Nhập suy nghĩ của con vào đây hoặc bấm gợi ý ở trên..."
                        className="mt-2.5 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs font-medium text-ink outline-none focus:border-tek-500 focus:bg-white"
                      />

                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-[11px] text-slate-400 italic">
                          *Câu hỏi quan sát phản xạ, không chấm điểm đúng sai.
                        </p>
                        <button
                          type="button"
                          onClick={() => setAnswers(a => ({ ...a, knowledgeResponse: "Chưa rõ / Muốn tìm hiểu thêm khi vào lớp" }))}
                          className="text-[11px] font-bold text-slate-500 hover:text-tek-600 transition"
                        >
                          Chưa rõ câu này (bỏ qua) →
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* STEP 11: SIO SITUATION 2 (SKILL) */}
              {current === 11 && (() => {
                const sio = branchData?.sioInteractions?.[1];
                const suggestions: string[] = (sio as any)?.suggestedAnswers || [
                  "Làm theo 3 bước: Làm khung chính → Lắp chức năng → Chạy thử",
                  "Lập trình khối lệnh cơ bản trước rồi mới thêm chi tiết và hiệu ứng",
                  "Thử nghiệm từng phần nhỏ xem chạy đúng rồi mới ghép hoàn chỉnh"
                ];

                return (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-tek-200 bg-tek-50/50 p-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-tek-700">
                          Tình huống thử thách 2: Kỹ năng & Trình tự thực hiện
                        </span>
                        {sio?.observable && (
                          <span className="rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-tek-700 border border-tek-200 shadow-2xs">
                            Quan sát: {sio.observable}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm font-extrabold text-ink leading-relaxed">
                        {sio?.question || "Con sẽ sắp xếp các bước thực hiện như thế nào để sản phẩm chạy đúng?"}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-600">
                          Cách sắp xếp hoặc ý tưởng của {isPrimary ? "con" : "bạn"}:
                        </label>
                        <span className="text-[10px] font-bold text-slate-400">Bấm gợi ý nhanh hoặc tự nhập</span>
                      </div>

                      {/* Suggestion Chips */}
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {suggestions.map((sug, sIdx) => (
                          <button
                            type="button"
                            key={sIdx}
                            onClick={() => setAnswers(a => ({ ...a, skillResponse: sug }))}
                            className={`rounded-xl border px-3 py-1.5 text-left text-[11px] font-medium transition ${
                              answers.skillResponse === sug
                                ? "border-tek-500 bg-tek-50 text-tek-800 font-bold"
                                : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            💡 {sug}
                          </button>
                        ))}
                      </div>

                      <textarea
                        rows={3}
                        value={answers.skillResponse}
                        onChange={e => setAnswers(a => ({ ...a, skillResponse: e.target.value }))}
                        placeholder="Ví dụ: Bước 1 con làm khung, bước 2 gắn cảm biến..."
                        className="mt-2.5 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs font-medium text-ink outline-none focus:border-tek-500 focus:bg-white"
                      />

                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-[11px] text-slate-400 italic">
                          *Mọi phương án của con đều được tôn trọng và lưu vào hồ sơ.
                        </p>
                        <button
                          type="button"
                          onClick={() => setAnswers(a => ({ ...a, skillResponse: "Chưa rõ quy trình / Sẽ học hỏi thêm trong dự án" }))}
                          className="text-[11px] font-bold text-slate-500 hover:text-tek-600 transition"
                        >
                          Chưa rõ quy trình (bỏ qua) →
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* STEP 12: SIO SITUATION 3 (PROBLEM SOLVING / DEBUG) */}
              {current === 12 && (() => {
                const sio = branchData?.sioInteractions?.[2];
                const suggestions: string[] = (sio as any)?.suggestedAnswers || [
                  "Kiểm tra lại từng vị trí nối hoặc từng dòng lệnh vừa sửa đổi",
                  "Tách nhỏ từng phần ra chạy thử độc lập để tìm chính xác chỗ lỗi",
                  "Bình tĩnh xem lại mẫu hoặc nhờ bạn bè, thầy cô gợi ý cách khắc phục"
                ];

                return (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-tek-200 bg-tek-50/50 p-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-tek-700">
                          Tình huống thử thách 3: Xử lý tình huống & Kiên trì sửa lỗi
                        </span>
                        {sio?.observable && (
                          <span className="rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-tek-700 border border-tek-200 shadow-2xs">
                            Quan sát: {sio.observable}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm font-extrabold text-ink leading-relaxed">
                        {sio?.question || "Nếu sản phẩm chưa hoạt động như mong đợi, con sẽ thử cách nào trước?"}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-600">
                          Cách giải quyết vấn đề của {isPrimary ? "con" : "bạn"}:
                        </label>
                        <span className="text-[10px] font-bold text-slate-400">Bấm gợi ý nhanh hoặc tự nhập</span>
                      </div>

                      {/* Suggestion Chips */}
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {suggestions.map((sug, sIdx) => (
                          <button
                            type="button"
                            key={sIdx}
                            onClick={() => setAnswers(a => ({ ...a, problemResponse: sug }))}
                            className={`rounded-xl border px-3 py-1.5 text-left text-[11px] font-medium transition ${
                              answers.problemResponse === sug
                                ? "border-tek-500 bg-tek-50 text-tek-800 font-bold"
                                : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            💡 {sug}
                          </button>
                        ))}
                      </div>

                      <textarea
                        rows={3}
                        value={answers.problemResponse}
                        onChange={e => setAnswers(a => ({ ...a, problemResponse: e.target.value }))}
                        placeholder="Con sẽ kiểm tra lại các chỗ nối hoặc thử đổi một cách làm khác..."
                        className="mt-2.5 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs font-medium text-ink outline-none focus:border-tek-500 focus:bg-white"
                      />

                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-[11px] text-slate-400 italic">
                          *Thói quen kiên trì thử lại khi gặp lỗi là phẩm chất quan trọng nhất.
                        </p>
                        <button
                          type="button"
                          onClick={() => setAnswers(a => ({ ...a, problemResponse: "Chưa rõ cách sửa / Sẽ nhờ thầy cô hướng dẫn" }))}
                          className="text-[11px] font-bold text-slate-500 hover:text-tek-600 transition"
                        >
                          Chưa rõ cách sửa (bỏ qua) →
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* STEP 13: SELF REFLECTION */}
              {current === 13 && (
                <div className="space-y-4">
                  <p className="text-xs font-bold text-slate-500">
                    Trong hành trình vừa qua, điều gì khiến {isPrimary ? "con" : "bạn"} muốn học hỏi thêm nhất?
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { id: "mechanic", label: "Cách lắp ráp và kết nối các bộ phận thật mượt mà" },
                      { id: "code_logic", label: "Cách viết code thông minh để máy tự xử lý tình huống" },
                      { id: "ui_visual", label: "Cách thiết kế giao diện bắt mắt và thu hút người xem" },
                      { id: "story", label: "Cách kể câu chuyện dự án truyền cảm hứng cho mọi người" }
                    ].map(ref => {
                      const active = (answers.selfReflection ?? []).includes(ref.id);
                      return (
                        <button
                          type="button"
                          key={ref.id}
                          onClick={() => {
                            const list = answers.selfReflection ?? [];
                            const next = list.includes(ref.id)
                              ? list.filter(r => r !== ref.id)
                              : [...list, ref.id];
                            setAnswers(a => ({ ...a, selfReflection: next }));
                          }}
                          className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
                            active ? "border-tek-500 bg-tek-50 text-tek-800" : "border-slate-200 bg-white"
                          }`}
                        >
                          <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border ${
                            active ? "border-tek-600 bg-tek-600 text-white" : "border-slate-300"
                          }`}>
                            {active && <Check className="h-3 w-3" />}
                          </span>
                          <span className="text-xs font-bold">{ref.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 14: PARENT COMPETENCY OBSERVATION (TOUCHPOINT 2) */}
              {current === 14 && (
                <div className="space-y-5">
                  <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4">
                    <p className="text-xs font-bold text-amber-900">
                      Góc nhìn từ Phụ Huynh: Ba mẹ đã từng thấy con tự hoàn thành một hoạt động sáng tạo ra sao?
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { id: "independent", label: "Con chủ động tự làm một phần hoặc toàn bộ" },
                      { id: "shared", label: "Con làm cùng ba mẹ hoặc anh chị em" },
                      { id: "started", label: "Con hào hứng bắt đầu nhưng cần hỗ trợ khi gặp khó" },
                      { id: "not_observed", label: "Chưa có dịp quan sát kỹ trong đời sống" }
                    ].map(opt => (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setAnswers(a => ({ ...a, parentObservedTask: opt.id }))}
                        className={`rounded-2xl border p-4 text-left font-bold text-xs transition ${
                          answers.parentObservedTask === opt.id
                            ? "border-amber-400 bg-amber-50 text-amber-900 ring-1 ring-amber-300"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-slate-600">
                        Ba mẹ có thể chia sẻ một kỷ niệm ngắn về sự say sưa của con (Tùy chọn):
                      </label>
                      <span className="text-[10px] font-bold text-slate-400">Bấm gợi ý nhanh hoặc tự gõ</span>
                    </div>

                    {/* Parent Observation Suggestions */}
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {(PARENT_OBSERVED_SUGGESTIONS[answers.domain || "robotics"] || PARENT_OBSERVED_SUGGESTIONS.robotics).map((obsSug, oIdx) => {
                        const isSelected = answers.parentObservedExample === obsSug;
                        return (
                          <button
                            type="button"
                            key={oIdx}
                            onClick={() => setAnswers(a => ({ ...a, parentObservedExample: obsSug }))}
                            className={`rounded-xl border px-3 py-1.5 text-left text-[11px] font-medium transition ${
                              isSelected
                                ? "border-amber-500 bg-amber-50 text-amber-900 font-bold ring-1 ring-amber-400"
                                : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            💬 {obsSug}
                          </button>
                        );
                      })}
                    </div>

                    <textarea
                      rows={2}
                      value={answers.parentObservedExample}
                      onChange={e => setAnswers(a => ({ ...a, parentObservedExample: e.target.value }))}
                      placeholder="Ví dụ: Bé từng tự tìm cách sửa chiếc xe đồ chơi bị gãy bánh xe..."
                      className="mt-2.5 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs font-medium text-ink outline-none focus:border-amber-400 focus:bg-white"
                    />
                  </div>
                </div>
              )}

              {/* STEP 15: PARENT SUPPORT CONFIGURATION */}
              {current === 15 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      Gia đình dự kiến có thể dành bao nhiêu thời gian mỗi tuần cho dự án?
                    </label>
                    <div className="mt-2.5 flex flex-wrap gap-2.5">
                      {[
                        { val: 1, label: "1 giờ / tuần" },
                        { val: 2, label: "2 giờ / tuần" },
                        { val: 3, label: "3–4 giờ / tuần" },
                        { val: null, label: "Chưa chốt lịch (Linh hoạt)" }
                      ].map(h => (
                        <button
                          type="button"
                          key={String(h.val)}
                          onClick={() => setAnswers(a => ({ ...a, hoursPerWeek: h.val }))}
                          className={`rounded-xl border px-4 py-2.5 text-xs font-bold transition ${
                            answers.hoursPerWeek === h.val
                              ? "border-tek-500 bg-tek-50 text-tek-800 shadow-xs"
                              : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {h.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      Cách ba mẹ mong muốn đồng hành cùng con:
                    </label>
                    <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                      {[
                        "Lắng nghe và khích lệ con tự làm",
                        "Cùng con thử nghiệm từng bước nhỏ",
                        "Cho con không gian tự do sáng tạo",
                        "Tìm thầy cô và môi trường hướng dẫn chuyên nghiệp"
                      ].map(mode => {
                        const active = (answers.supportMode ?? []).includes(mode);
                        return (
                          <button
                            type="button"
                            key={mode}
                            onClick={() => {
                              const list = answers.supportMode ?? [];
                              const next = list.includes(mode) ? list.filter(m => m !== mode) : [...list, mode];
                              setAnswers(a => ({ ...a, supportMode: next }));
                            }}
                            className={`flex items-center gap-2.5 rounded-xl border p-3 text-left text-xs font-bold transition ${
                              active ? "border-tek-500 bg-tek-50 text-tek-800" : "border-slate-200 bg-slate-50 text-slate-700"
                            }`}
                          >
                            <span className={`grid h-4 w-4 shrink-0 place-items-center rounded-md border ${
                              active ? "border-tek-600 bg-tek-600 text-white" : "border-slate-300"
                            }`}>
                              {active && <Check className="h-3 w-3" />}
                            </span>
                            <span>{mode}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 16: FAMILY REVIEW & ALIGNMENT */}
              {current === 16 && (
                <div className="space-y-5">
                  {/* Alignment Principle Banner */}
                  <div className="rounded-3xl border border-tek-200 bg-gradient-to-br from-tek-50/80 via-white to-amber-50/60 p-5 shadow-2xs">
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-tek-300 bg-white px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-tek-700">
                        <HeartHandshake className="h-3.5 w-3.5 text-tek-600" />
                        Family Alignment
                      </span>
                      <span className="text-[11px] font-bold text-slate-400">
                        FM-PARENT & ISTE 1.1.c
                      </span>
                    </div>
                    <h3 className="mt-2 text-base font-black text-ink sm:text-lg">
                      Cả Nhà Cùng Đối Soát & Thống Nhất Hướng Đi
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      Mỗi góc nhìn đều quý giá. Hệ thống giữ nguyên cả hai lời kể để cùng kiểm chứng qua <strong className="text-tek-700">Dự án Chặng 1</strong> thực tế.
                    </p>
                  </div>

                  {/* Dual Sources Comparison (Child vs Parent) - Visual Overview Cards */}
                  <div className="grid gap-3.5 sm:grid-cols-2">
                    {/* Source 1: Child's Voice */}
                    <div className="rounded-2xl border border-tek-200 bg-tek-50/30 p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="grid h-7 w-7 place-items-center rounded-xl bg-tek-600 text-white text-xs font-bold shadow-2xs">
                              👦
                            </span>
                            <div>
                              <p className="text-[10px] font-extrabold uppercase tracking-wider text-tek-700">
                                Ước mơ của con
                              </p>
                              <p className="text-xs font-bold text-slate-800">
                                {answers.name || "Học sinh"} · Lớp {answers.grade || "4"}
                              </p>
                            </div>
                          </div>
                          <span className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-bold text-tek-700 border border-tek-200">
                            Học sinh
                          </span>
                        </div>

                        {/* Visual Summary Badges */}
                        <div className="mt-3.5 space-y-2">
                          <div className="flex items-center gap-2 rounded-xl bg-white p-2.5 border border-slate-100">
                            <span className="text-base shrink-0">✨</span>
                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase block">Dự án mơ ước:</span>
                              <p className="text-xs font-extrabold text-ink truncate">{answers.projectName || "Dự án sáng tạo"}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 rounded-xl bg-white p-2.5 border border-slate-100">
                            <span className="text-base shrink-0">🎯</span>
                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase block">Giúp đỡ & Mục đích:</span>
                              <p className="text-xs font-bold text-slate-700 truncate">
                                {answers.dreamAudience || "Gia đình"} · {answers.dreamPurpose || "Giải quyết bài toán thực tế"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 rounded-xl bg-white p-2.5 border border-slate-100">
                            <span className="text-base shrink-0">💡</span>
                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase block">Phản xạ khi gặp thử thách:</span>
                              <p className="text-xs font-medium text-slate-700 truncate">
                                {answers.problemResponse || answers.knowledgeResponse || "Kiên trì thử từng phần và tìm giải pháp"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Collapsible details for child */}
                        {showChildDetail && (
                          <div className="mt-3 space-y-2 border-t border-tek-100 pt-2.5 text-xs">
                            <div className="rounded-xl bg-white/80 p-2 text-slate-700 leading-relaxed text-[11px]">
                              <strong>Mục đích chi tiết:</strong> {answers.dreamPurpose || "Tạo sản phẩm hữu ích"}
                            </div>
                            <div className="rounded-xl bg-white/80 p-2 text-slate-700 leading-relaxed text-[11px]">
                              <strong>Phương án giải quyết lỗi:</strong> {answers.problemResponse || "Kiểm tra lại từng bộ phận"}
                            </div>
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowChildDetail(v => !v)}
                        className="mt-3 inline-flex items-center justify-center gap-1 text-[11px] font-bold text-tek-700 hover:text-tek-900 transition pt-2 border-t border-tek-100/60"
                      >
                        {showChildDetail ? "Thu gọn chi tiết ▴" : "Xem đầy đủ lời con kể ▾"}
                      </button>
                    </div>

                    {/* Source 2: Parent's Observation */}
                    <div className="rounded-2xl border border-amber-200 bg-amber-50/30 p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="grid h-7 w-7 place-items-center rounded-xl bg-amber-500 text-white text-xs font-bold shadow-2xs">
                              👨‍👩‍👦
                            </span>
                            <div>
                              <p className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800">
                                Quan sát của Ba Mẹ
                              </p>
                              <p className="text-xs font-bold text-slate-800">
                                Bối cảnh thực tế ở nhà
                              </p>
                            </div>
                          </div>
                          <span className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-bold text-amber-800 border border-amber-200">
                            Gia đình
                          </span>
                        </div>

                        {/* Visual Summary Badges */}
                        <div className="mt-3.5 space-y-2">
                          <div className="flex items-center gap-2 rounded-xl bg-white p-2.5 border border-slate-100">
                            <span className="text-base shrink-0">🌟</span>
                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase block">Thói quen tự lập:</span>
                              <p className="text-xs font-extrabold text-ink truncate">
                                {answers.parentObservedTask === "independent"
                                  ? "Chủ động tự mày mò thực hiện"
                                  : answers.parentObservedTask === "shared"
                                  ? "Thích làm cùng ba mẹ hoặc bạn bè"
                                  : "Cần gợi mở từng bước khi gặp khó"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 rounded-xl bg-white p-2.5 border border-slate-100">
                            <span className="text-base shrink-0">⏱️</span>
                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase block">Thời gian đồng hành:</span>
                              <p className="text-xs font-bold text-slate-700 truncate">
                                {answers.hoursPerWeek ? `${answers.hoursPerWeek} giờ / tuần` : "Linh hoạt cuối tuần"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 rounded-xl bg-white p-2.5 border border-slate-100">
                            <span className="text-base shrink-0">🤝</span>
                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase block">Cách hỗ trợ mong muốn:</span>
                              <p className="text-xs font-medium text-slate-700 truncate">
                                {(answers.supportMode && answers.supportMode[0]) || "Lắng nghe và khích lệ con tự làm"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Collapsible details for parent */}
                        {showParentDetail && (
                          <div className="mt-3 space-y-2 border-t border-amber-100 pt-2.5 text-xs">
                            <div className="rounded-xl bg-white/80 p-2 text-slate-700 leading-relaxed text-[11px]">
                              <strong>Kỷ niệm quan sát:</strong> {answers.parentObservedExample || answers.parentMoment || "Bé rất thích khám phá và thử nghiệm."}
                            </div>
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowParentDetail(v => !v)}
                        className="mt-3 inline-flex items-center justify-center gap-1 text-[11px] font-bold text-amber-800 hover:text-amber-950 transition pt-2 border-t border-amber-100/60"
                      >
                        {showParentDetail ? "Thu gọn chi tiết ▴" : "Xem đầy đủ chia sẻ của ba mẹ ▾"}
                      </button>
                    </div>
                  </div>

                  {/* Reconcile Conflict Selector */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs">
                    <p className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                      Cả nhà có thấy điểm nào cần kiểm chứng thêm không?
                    </p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-3">
                      {[
                        {
                          val: "agree",
                          icon: "✨",
                          label: "Đồng thuận cao",
                          desc: "Con và ba mẹ cùng nhìn nhận một hướng"
                        },
                        {
                          val: "different",
                          icon: "⚖️",
                          label: "Có điểm nhìn khác",
                          desc: "Giữ 2 góc nhìn để kiểm chứng qua Dự án 1"
                        },
                        {
                          val: "not_sure",
                          icon: "🔍",
                          label: "Cùng khám phá thêm",
                          desc: "Sẽ trải nghiệm thêm trong buổi đầu tiên"
                        }
                      ].map(choice => {
                        const isSelected = answers.familyConflict === choice.val || (!answers.familyConflict && choice.val === "agree");
                        return (
                          <button
                            type="button"
                            key={choice.val}
                            onClick={() => setAnswers(a => ({ ...a, familyConflict: choice.val }))}
                            className={`flex flex-col justify-between rounded-xl border p-3 text-left transition ${
                              isSelected
                                ? "border-tek-500 bg-tek-50/60 ring-2 ring-tek-300 shadow-xs"
                                : "border-slate-200 bg-slate-50/50 hover:bg-slate-100/60"
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="text-lg">{choice.icon}</span>
                                {isSelected && <Check className="h-4 w-4 text-tek-600 stroke-[3]" />}
                              </div>
                              <strong className="mt-1.5 block text-xs font-bold text-ink">
                                {choice.label}
                              </strong>
                              <span className="mt-0.5 block text-[11px] leading-4 text-slate-500">
                                {choice.desc}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Collapsible Scientific Note */}
                  <div className="rounded-2xl border border-sky-200 bg-sky-50/60 p-3">
                    <button
                      type="button"
                      onClick={() => setShowScientificNote(v => !v)}
                      className="flex w-full items-center justify-between text-[11px] font-extrabold uppercase tracking-wide text-sky-900"
                    >
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-sky-600" />
                        Cơ sở khoa học (Thuyết SCCT & Học qua đồ án PBL)
                      </span>
                      <span className="text-sky-700 font-bold text-xs">
                        {showScientificNote ? "Ẩn ▴" : "Xem ▾"}
                      </span>
                    </button>
                    {showScientificNote && (
                      <p className="mt-2 text-xs font-medium leading-5 text-sky-950 border-t border-sky-200/60 pt-2">
                        Năng lực và thiên hướng thực sự của trẻ sẽ bộc lộ rõ nhất khi con được bắt tay vào làm một sản phẩm thật.
                        Dự án Chặng 1 sẽ là bước chuyển tiếp hoàn hảo giữa mong muốn của con và sự thấu hiểu của gia đình.
                      </p>
                    )}
                  </div>

                  {/* Confirmation Checkbox */}
                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-tek-200 bg-tek-50/50 p-4">
                    <input
                      type="checkbox"
                      checked={Boolean(answers.familyReviewConfirmed)}
                      onChange={e => setAnswers(a => ({ ...a, familyReviewConfirmed: e.target.checked }))}
                      className="mt-1 h-5 w-5 rounded accent-tek-600"
                    />
                    <span>
                      <strong className="block text-xs font-extrabold text-ink">
                        Cả nhà cùng xác nhận để mở Bản đồ 4 Chặng Dự án & Báo cáo Hồ sơ Cá nhân hóa
                      </strong>
                      <span className="mt-0.5 block text-[11px] leading-5 text-slate-600">
                        Hồ sơ sẽ hiển thị chân dung định tính, thẻ ghi nhận năng lực và 4 dự án cá nhân hóa theo đúng ước mơ nguyên bản của con.
                      </span>
                    </span>
                  </label>
                </div>
              )}

              {/* Bottom Navigation Buttons */}
              <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
                <button
                  type="button"
                  disabled={current === 0}
                  onClick={() => setCurrent(c => Math.max(0, c - 1))}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                    current === 0
                      ? "text-slate-300 cursor-not-allowed"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <ArrowLeft className="h-4 w-4" /> Quay lại
                </button>

                <button
                  type="button"
                  disabled={!canContinue()}
                  onClick={() => setCurrent(c => Math.min(19, c + 1))}
                  className={`focus-ring inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-extrabold text-white shadow-card transition ${
                    canContinue()
                      ? "bg-tek-500 hover:bg-tek-600"
                      : "bg-slate-300 cursor-not-allowed"
                  }`}
                >
                  {current === 16 ? "Xem Kết Quả & Hồ Sơ" : "Tiếp tục nào"} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEPS 17-19: UNIFIED INTERACTIVE RESULT EXPERIENCE */}
          {current >= 17 && (
            <ProfileResult
              answers={answers}
              setAnswers={setAnswers}
              profile={profile}
              initialTab={current === 17 ? "profile" : current === 18 ? "dashboard" : "website"}
            />
          )}
        </div>

      {/* Standards Modal Popup */}
      {inspectingStandard && (
        <StandardsModal
          isOpen={Boolean(inspectingStandard)}
          onClose={() => setInspectingStandard(null)}
          standardCode={inspectingStandard.code}
          whyWeAsk={inspectingStandard.whyWeAsk}
          isPrimary={isPrimary}
        />
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-amber-50 text-amber-600">
              <RotateCcw className="h-6 w-6" />
            </span>
            <h3 className="mt-3 text-base font-extrabold text-ink">
              Quay về Trang Chủ?
            </h3>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Bạn có thể quay về trang chủ giới thiệu TEKY hoặc tiếp tục hoàn thành các câu hỏi đang làm.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  handleGoHome();
                  setShowResetConfirm(false);
                }}
                className="w-full rounded-xl bg-tek-500 py-3 text-xs font-extrabold text-white hover:bg-tek-600 shadow-xs"
              >
                Về Trang Chủ TEKY
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="w-full rounded-xl border border-rose-200 bg-rose-50/70 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-100"
              >
                Làm lại từ đầu (xoá bài cũ)
              </button>
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="w-full rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Tiếp tục làm bài
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
