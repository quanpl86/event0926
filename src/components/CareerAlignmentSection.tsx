"use client";

import { useState } from "react";
import {
  Compass,
  Users,
  HeartHandshake,
  TrendingUp,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  BrainCircuit,
  Eye,
  Wrench
} from "lucide-react";

export type AlignmentPillar = {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  icon: typeof Compass;
  summaryVi: string;
  tekyPrinciple: string;
  mechanism: {
    label: string;
    points: string[];
  };
  sources: {
    authorOrOrg: string;
    title: string;
    year: string;
    url: string;
    citationLabel: string;
  }[];
};

export const ALIGNMENT_PILLARS: AlignmentPillar[] = [
  {
    id: "riasec",
    title: "1. Mô hình Sở thích Hoạt động RIASEC (Holland Code & O*NET)",
    badge: "KHÁM PHÁ THIÊN HƯỚNG TỰ NHIÊN",
    badgeColor: "bg-tek-50 text-tek-700 border-tek-200",
    icon: Compass,
    summaryVi:
      "Sử dụng nền tảng 6 nhóm sở thích hoạt động của TS. John Holland và Bộ Lao động Hoa Kỳ (O*NET) để phân loại xu hướng tò mò công nghệ sang 3 bộ môn STEAM cốt lõi: Robotics & IoT (Nhóm R), Lập trình & AI (Nhóm I), Multimedia & Game 3D (Nhóm A).",
    tekyPrinciple:
      "Tuyệt đối KHÔNG dùng để chốt nghề hay dán nhãn nghề nghiệp sớm cho trẻ 6–15 tuổi. Sở thích lứa tuổi này là chỉ báo khơi mở trải nghiệm, biến chuyển liên tục theo môi trường học tập.",
    mechanism: {
      label: "Ánh xạ tương tác vào 3 bộ môn công nghệ:",
      points: [
        "Nhóm R (Realistic - Kỹ thuật/Cơ học): Tò mò tháo lắp, động cơ, cảm biến → Khơi mở Robotics, Tự động hóa & IoT.",
        "Nhóm I (Investigative - Nghiên cứu/Logic): Thích giải đố, tìm quy luật, phân tích lỗi → Khơi mở Kỹ thuật Phần mềm, AI & Khoa học Dữ liệu.",
        "Nhóm A (Artistic - Sáng tạo/Thẩm mỹ): Thích vẽ, tạo hình không gian, kể chuyện → Khơi mở Thiết kế Game, Đồ họa 3D & Hoạt hình số.",
        "Nhóm S, E, C (Xã hội, Tiên phong, Quy chuẩn): Bộc lộ qua mục đích sản phẩm (giúp đỡ gia đình, bảo vệ môi trường, phối hợp nhóm)."
      ]
    },
    sources: [
      {
        authorOrOrg: "U.S. Department of Labor (O*NET Resource Center)",
        title: "O*NET Interest Profiler (IP) Manual & Holland Codes Taxonomy",
        year: "2021",
        url: "https://www.onetcenter.org/reports/IP_Manual.html",
        citationLabel: "onetcenter.org/IP_Manual"
      },
      {
        authorOrOrg: "Holland, J. L.",
        title: "Making Vocational Choices: A Theory of Vocational Personalities and Work Environments",
        year: "1997",
        url: "https://www.jstor.org/stable/27756184",
        citationLabel: "JSTOR / Holland Theory"
      }
    ]
  },
  {
    id: "triangulation",
    title: "2. Phương pháp Đối chiếu Đa giác hóa Bằng chứng (Evidence Triangulation)",
    badge: "ĐÁNH GIÁ ĐỊNH TÍNH ĐA CHIỀU",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
    icon: Users,
    summaryVi:
      "Kỹ thuật đối chiếu chéo 3 nguồn độc lập nhằm thu được nhận định khách quan, tránh tình trạng học sinh tự đánh giá quá cao (self-serving bias) hoặc cha mẹ áp đặt kỳ vọng chủ quan lên con.",
    tekyPrinciple:
      "Không dựa vào một bài trắc nghiệm trắc trở hay lời kể đơn phương. Hồ sơ được tạo nên từ sự giao thoa giữa khát vọng của con, phản xạ thực tế và quan sát từ gia đình.",
    mechanism: {
      label: "3 nguồn dữ liệu độc lập đối chiếu chéo:",
      points: [
        "Nguồn 1 - Con tự chia sẻ (Self-Report, Bước 01–03, 06–09): Ghi nhận động lực nội tại (Intrinsic Motivation), sở thích và ước mơ dự án (Dream Project Brief).",
        "Nguồn 2 - Bằng chứng thử thách thực tế (Bước 10–12): Thu thập phản xạ tư duy khách quan khi con đối diện bài toán thực tế (sắp xếp chuỗi thao tác, hiểu cấu trúc hệ thống, kiên trì gỡ lỗi).",
        "Nguồn 3 - Ba mẹ quan sát độc lập (Bước 03, 14–15): Cung cấp bối cảnh thực tế ở nhà (thói quen tập trung, mức độ tự giác, cách phản ứng khi gặp trở ngại)."
      ]
    },
    sources: [
      {
        authorOrOrg: "AERA, APA, NCME",
        title: "Standards for Educational and Psychological Testing (Validity & Triangulation Evidence)",
        year: "2014",
        url: "https://www.aera.net/Publications/Standards-for-Educational-Psychological-Testing",
        citationLabel: "AERA / APA / NCME Standards"
      },
      {
        authorOrOrg: "Patton, M. Q.",
        title: "Qualitative Research & Evaluation Methods: Integrating Theory and Practice (4th Ed.)",
        year: "2015",
        url: "https://us.sagepub.com/en-us/nam/qualitative-research-evaluation-methods/book232962",
        citationLabel: "Sage Publications / Patton Triangulation"
      }
    ]
  },
  {
    id: "family-alignment",
    title: "3. Cơ chế Xử lý Khác biệt giữa Con & Ba mẹ (Family Alignment Rule – Bước 16)",
    badge: "NGUYÊN TẮC ĐỒNG THUẬN GIA ĐÌNH",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    icon: HeartHandshake,
    summaryVi:
      "Quy tắc tôn trọng và bảo toàn song song cả hai góc nhìn khi con và cha mẹ có nhận xét khác nhau (ví dụ: con tự tin tự làm được game, nhưng ba mẹ thấy con nhanh nản lòng).",
    tekyPrinciple:
      "Hệ thống không phán xét ai đúng ai sai, không chấm điểm trừ. Giữ nguyên cả 2 dữ liệu và dùng Dự án Chặng 1 làm phép thử thực nghiệm (Quick Win) để cùng kiểm chứng.",
    mechanism: {
      label: "Quy trình đối soát tại Bước 16 của bài tương tác:",
      points: [
        "Hiển thị song song: Lời kể của con (Ước mơ & niềm tin tự thân) đặt cạnh quan sát của cha mẹ (Thói quen thực tế ở nhà).",
        "Không ghi đè dữ liệu: Hệ thống lưu trữ cả hai luồng thông tin độc lập, không cho phép một bên xóa bỏ góc nhìn của bên kia.",
        "Dự án Chặng 1 làm phép thử: Thiết kế bài tập thử nghiệm quy mô vừa phải tại workshop để con và ba mẹ cùng kiểm chứng mức độ kiên trì và hứng thú thực tế."
      ]
    },
    sources: [
      {
        authorOrOrg: "Epstein, J. L. (Johns Hopkins University)",
        title: "School, Family, and Community Partnerships: Preparing Educators and Improving Schools",
        year: "2018",
        url: "https://www.govinfo.gov/content/pkg/ERIC-ED330362/pdf/ERIC-ED330362.pdf",
        citationLabel: "ERIC / Epstein Family Partnerships"
      },
      {
        authorOrOrg: "Dietrich, J., & Kracke, B.",
        title: "Career-specific parental behaviors in adolescents' development: Theory and research",
        year: "2009",
        url: "https://doi.org/10.1016/j.jvb.2009.03.005",
        citationLabel: "Journal of Vocational Behavior"
      }
    ]
  },
  {
    id: "scct-pbl",
    title: "4. Thuyết Nhận thức Nghề nghiệp Xã hội (SCCT) & Học qua Đồ án (PBL)",
    badge: "NUÔI DƯỠNG NĂNG LỰC TỰ THÂN",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: TrendingUp,
    summaryVi:
      "Dựa trên Thuyết SCCT (Lent, Brown & Hackett), thiên hướng nghề nghiệp không hình thành từ việc nghe khuyên bảo lý thuyết, mà phát triển qua chu trình trải nghiệm làm chủ sản phẩm thực tế.",
    tekyPrinciple:
      "Không trả về danh sách nghề nghiệp chung chung. Kết quả là Bản đồ 4 Chặng Đồ án (Graphic Roadmap) với sản phẩm cụ thể, dẫn thẳng từ tò mò ban đầu đến dự án trong mơ.",
    mechanism: {
      label: "Chu trình 4 bước chuyển hóa năng lực tại TEKY:",
      points: [
        "1. Trải nghiệm làm dự án thật (Project Experience): Chạm tay lập trình robot, thiết kế mô hình 3D.",
        "2. Cảm nhận làm chủ (Self-Efficacy): Hoàn thành một sản phẩm chạy được mang lại niềm tự hào và tự tin.",
        "3. Hình thành sở thích bền vững (Sustained Interest): Muốn tìm tòi sâu hơn khi thấy công nghệ giải quyết được vấn đề đời sống.",
        "4. Lộ trình 4 chặng: Chặng 1 Khám phá → Chặng 2 Nền tảng → Chặng 3 Đột phá → Chặng 4 Triển lãm Ước mơ."
      ]
    },
    sources: [
      {
        authorOrOrg: "Lent, R. W., Brown, S. D., & Hackett, G.",
        title: "Toward a Unifying Social Cognitive Theory of Career and Academic Interest, Choice, and Performance",
        year: "1994",
        url: "https://doi.org/10.1006/jvbe.1994.1027",
        citationLabel: "Journal of Vocational Behavior / SCCT"
      },
      {
        authorOrOrg: "Buck Institute for Education (PBLWorks)",
        title: "Gold Standard Project Based Learning (PBL) Framework for K-12",
        year: "2020",
        url: "https://www.pblworks.org/what-is-pbl",
        citationLabel: "PBLWorks Gold Standard"
      }
    ]
  }
];

export function CareerAlignmentSection() {
  const [activePillar, setActivePillar] = useState<AlignmentPillar | null>(null);

  return (
    <section id="career-alignment-section" className="mt-20 scroll-mt-24">
      {/* Header Banner */}
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-tek-300 bg-tek-50 px-4 py-1.5 text-[11px] font-extrabold tracking-[.15em] uppercase text-tek-700 shadow-2xs">
          <Compass className="h-3.5 w-3.5 text-tek-600" />
          CƠ SỞ KHOA HỌC & ĐỊNH HƯỚNG THIÊN HƯỚNG NGHỀ NGHIỆP TƯƠNG LAI
        </span>
        <h2 className="mt-3 text-2xl font-black tracking-tight text-ink sm:text-3xl lg:text-4xl">
          Phương Pháp Nhận Biết Thiên Hướng Nghề Nghiệp Dựa Trên Sở Thích & Biểu Hiện Đa Chiều
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
          Kết hợp giữa nghiên cứu tâm lý học giáo dục quốc tế và thực tiễn đồng hành cùng hơn 50.000 học sinh K-12 tại TEKY.
          Chúng tôi <strong className="text-tek-700">tuyệt đối không dán nhãn nghề nghiệp sớm</strong>, mà tập trung khơi mở đam mê,
          đối chiếu đa giác hóa bằng chứng và nuôi dưỡng năng lực tự thân qua dự án thực tế.
        </p>
      </div>

      {/* 4 Pillar Cards Grid */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {ALIGNMENT_PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.id}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-tek-400 hover:shadow-md sm:p-7"
            >
              <div>
                {/* Badge & Icon */}
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-extrabold tracking-wider uppercase ${pillar.badgeColor}`}
                  >
                    <Icon className="h-3 w-3" />
                    {pillar.badge}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">Trụ cột #{pillar.id.toUpperCase()}</span>
                </div>

                {/* Title & Summary */}
                <h3 className="mt-4 text-base font-extrabold text-ink sm:text-lg">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm">
                  {pillar.summaryVi}
                </p>

                {/* TEKY Principle Alert */}
                <div className="mt-4 rounded-2xl border border-amber-200/80 bg-amber-50/70 p-3.5">
                  <p className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wide text-amber-900">
                    <AlertCircle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                    Nguyên tắc bất di bất dịch của TEKY:
                  </p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-amber-900">
                    {pillar.tekyPrinciple}
                  </p>
                </div>

                {/* Interaction Mechanism Points */}
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-bold text-slate-700">
                    {pillar.mechanism.label}
                  </p>
                  <ul className="space-y-1.5 pl-1">
                    {pillar.mechanism.points.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-tek-500 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Citations & Source Links */}
              <div className="mt-6 border-t border-slate-100 pt-4">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Tài liệu & nguồn tham chiếu học thuật:
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {pillar.sources.map((src, sIdx) => (
                    <a
                      key={sIdx}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-100 hover:text-tek-700 transition"
                      title={`${src.authorOrOrg} (${src.year}): ${src.title}`}
                    >
                      <BookOpen className="h-3 w-3 text-slate-500" />
                      <span>{src.citationLabel}</span>
                      <ExternalLink className="h-2.5 w-2.5 text-slate-400" />
                    </a>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setActivePillar(pillar)}
                  className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-50/80 py-2.5 text-xs font-bold text-slate-700 hover:bg-tek-50 hover:border-tek-300 hover:text-tek-800 transition"
                >
                  <Sparkles className="h-3.5 w-3.5 text-tek-600" />
                  <span>Xem phân tích chi tiết & quy tắc đối chiếu →</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Triangulation Visual Architecture Card */}
      <div className="mt-8 rounded-3xl border border-tek-200 bg-gradient-to-br from-tek-50/60 via-white to-sky-50/40 p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="text-[10px] font-extrabold uppercase tracking-[.18em] text-tek-700">
              MÔ HÌNH HỘI TỤ ĐÁNH GIÁ (TRIANGULATION ENGINE)
            </span>
            <h3 className="mt-1.5 text-lg font-black text-ink sm:text-xl">
              Quy Trình 3 Nguồn Dữ Liệu Khép Kín Tạo Nên Lộ Trình 4 Chặng Dự Án
            </h3>
            <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm">
              Không có điểm số trắc nghiệm khô cứng. Hệ thống đối chiếu liên tục giữa:
              <strong> Lời kể của con</strong> (Ước mơ & sở thích),
              <strong> Bằng chứng thử thách thực tế</strong> (Phản xạ giải quyết vấn đề & gỡ lỗi), và
              <strong> Quan sát từ phụ huynh</strong> (Thói quen đời thường).
              Kết quả trả về là bản đồ lộ trình đồ án thực tế giúp con tự tin khẳng định tiềm năng.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 shrink-0">
            <div className="rounded-2xl border border-tek-200 bg-white p-4 text-center shadow-2xs">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl border border-tek-200 bg-tek-50 text-tek-600 shadow-2xs">
                <Sparkles className="h-5 w-5" />
              </div>
              <p className="mt-2.5 text-xs font-extrabold text-ink">Con Tự Thuật</p>
              <p className="mt-0.5 text-[10px] font-medium text-slate-500">Động lực nội tại & Ước mơ</p>
            </div>

            <div className="rounded-2xl border border-sky-200 bg-white p-4 text-center shadow-2xs">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl border border-sky-200 bg-sky-50 text-sky-600 shadow-2xs">
                <BrainCircuit className="h-5 w-5" />
              </div>
              <p className="mt-2.5 text-xs font-extrabold text-ink">Thử Thách Thực Tế</p>
              <p className="mt-0.5 text-[10px] font-medium text-slate-500">Tư duy logic & Phản xạ gỡ lỗi</p>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-white p-4 text-center shadow-2xs">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-amber-600 shadow-2xs">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <p className="mt-2.5 text-xs font-extrabold text-ink">Ba Mẹ Quan Sát</p>
              <p className="mt-0.5 text-[10px] font-medium text-slate-500">Thói quen & Ngữ cảnh sống</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Modal Popup for Pillar */}
      {activePillar && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setActivePillar(null)}
          />
          <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl transition-all sm:p-8">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-tek-50 text-tek-600">
                  <activePillar.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-tek-600">
                    {activePillar.badge}
                  </p>
                  <h3 className="text-base font-extrabold text-ink sm:text-lg">
                    {activePillar.title}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActivePillar(null)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Tổng quan khoa học
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-700 sm:text-sm font-medium">
                  {activePillar.summaryVi}
                </p>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4">
                <p className="text-xs font-extrabold uppercase tracking-wider text-amber-900">
                  Ranh giới đánh giá & Cam kết TEKY
                </p>
                <p className="mt-1 text-xs leading-5 text-amber-950 font-semibold">
                  {activePillar.tekyPrinciple}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-bold text-slate-800">
                  {activePillar.mechanism.label}
                </p>
                <ul className="mt-2 space-y-2">
                  {activePillar.mechanism.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-tek-600 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                  Tài liệu gốc & Đường dẫn tham chiếu:
                </p>
                <div className="mt-2 space-y-2">
                  {activePillar.sources.map((src, sIdx) => (
                    <div key={sIdx} className="flex items-center justify-between rounded-xl bg-white p-3 border border-slate-200/80 text-xs">
                      <div>
                        <p className="font-bold text-slate-800">{src.authorOrOrg} ({src.year})</p>
                        <p className="text-slate-500 text-[11px]">{src.title}</p>
                      </div>
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg bg-tek-50 px-2.5 py-1 text-[11px] font-bold text-tek-700 hover:bg-tek-100 transition shrink-0 ml-2"
                      >
                        <span>Mở liên kết</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setActivePillar(null)}
                className="rounded-xl bg-slate-800 px-5 py-2 text-xs font-bold text-white hover:bg-slate-900 transition"
              >
                Đã hiểu cơ sở
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
