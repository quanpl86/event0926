"use client";

import { useState } from "react";
import {
  BookOpen,
  Code2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Info,
  Layers,
  Award,
  Compass
} from "lucide-react";
import { StandardsModal } from "./StandardsModal";

export const standardFrameworks = [
  {
    id: "csta",
    code: "CSTA-ALGO",
    title: "Chuẩn Khoa Học Máy Tính K-12 (CSTA)",
    organization: "Computer Science Teachers Association (CSTA, Hoa Kỳ)",
    badge: "Chuẩn Quốc Tế Hoa Kỳ",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    icon: Code2,
    color: "from-blue-500/10 to-indigo-500/10 border-blue-200",
    focus: "Thuật toán, Lập trình logic, Hệ thống máy tính & Phản xạ gỡ lỗi (Debugging)",
    description:
      "Tiêu chuẩn tham chiếu hàng đầu thế giới về giáo dục khoa học máy tính cho học sinh phổ thông. Đánh giá cách con phân rã bài toán, tổ chức bước đi logic và kiên trì thử - sai.",
    appliedCases: [
      "Tình huống kiểm tra và phát hiện nguyên nhân robot đi lệch hướng.",
      "Phân biệt giữa đầu vào cảm biến và cơ cấu chấp hành chuyển động.",
      "Thói quen thử lại tuần tự thay vì bỏ cuộc khi chương trình gặp lỗi."
    ]
  },
  {
    id: "iste",
    code: "ISTE-1.4",
    title: "Chuẩn Đổi Mới Sáng Tạo Học Sinh (ISTE)",
    organization: "International Society for Technology in Education (Toàn Cầu)",
    badge: "Chuẩn Đổi Mới Công Nghệ",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    icon: Sparkles,
    color: "from-amber-500/10 to-orange-500/10 border-amber-200",
    focus: "Nhà thiết kế đổi mới sáng tạo (Innovative Designer) & Tư duy tính toán",
    description:
      "Khung năng lực hướng học sinh trở thành người sáng tạo công nghệ thay vì chỉ tiêu thụ thụ động. Quan sát cách con hình thành ý tưởng giải pháp và kết nối công nghệ với đời sống.",
    appliedCases: [
      "Tự định hình đề tài 'Dream Project' phục vụ gia đình hoặc cộng đồng.",
      "Lựa chọn phong cách thẩm mỹ, thiết kế hình ảnh và câu chuyện nhân vật.",
      "Ứng dụng tư duy giải quyết vấn đề thực tế thông qua sản phẩm số."
    ]
  },
  {
    id: "nls",
    code: "NLS-3.4",
    title: "Khung Năng Lực Số Học Sinh (NLS 2025)",
    organization: "Bộ Giáo dục & Đào tạo Việt Nam",
    badge: "Khung Quốc Gia Việt Nam",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    icon: Award,
    color: "from-emerald-500/10 to-teal-500/10 border-emerald-200",
    focus: "Lập trình (NLS 3.4), Sáng tạo nội dung số (NLS 3.1) & Giải quyết vấn đề (NLS 5.1)",
    description:
      "Khung năng lực số chính thống của Bộ GD&ĐT Việt Nam dành cho học sinh phổ thông, tương thích với chương trình GDPT 2018 và định hướng phát triển phẩm chất, năng lực công nghệ.",
    appliedCases: [
      "Chọn công cụ kéo thả trực quan (Scratch/Blockly) phù hợp lứa tuổi.",
      "Xác định người hưởng lợi từ sản phẩm công nghệ (bảo vệ môi trường, hỗ trợ trường học).",
      "Khuyến khích giao tiếp và chia sẻ sản phẩm số an toàn, văn minh."
    ]
  },
  {
    id: "riasec",
    code: "RIASEC-FUTURE",
    title: "Mô Hình Sở Thích & Khung Hướng Nghiệp (RIASEC)",
    organization: "Holland Code / O*NET (Hoa Kỳ) & Hội Đồng Học Thuật TEKY",
    badge: "Chuẩn Hướng Nghiệp & Đối Chiếu",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
    icon: Compass,
    color: "from-rose-500/10 to-pink-500/10 border-rose-200",
    focus: "Sở thích hoạt động tự nhiên & Đối chiếu 3 chiều (Triangulation: Học sinh vs Phụ huynh)",
    description:
      "Phân loại sở thích theo 6 nhóm hoạt động (Kỹ thuật, Nghiên cứu, Nghệ thuật, Xã hội, Tiên phong, Quy chuẩn). Kết hợp kỹ thuật đối chiếu đa giác hóa bằng chứng (Triangulation) giữa con và ba mẹ.",
    appliedCases: [
      "Bước 01–04: Khám phá sở thích hoạt động và gợi mở nhóm ngành STEAM.",
      "Bước 03 & 14: Phụ huynh ghi nhận hành vi thực tế và mức độ tự chủ ở nhà.",
      "Bước 16: Đối chiếu dung hòa khác biệt giữa mong muốn của con và quan sát của gia đình."
    ]
  },
  {
    id: "privacy",
    code: "UNESCO-AI",
    title: "Đạo Đức AI & Quyền Riêng Tư (UNESCO)",
    organization: "UNESCO Recommendation & Global Child Data Protection",
    badge: "Bảo Vệ Dữ Liệu Trẻ Em",
    badgeColor: "bg-violet-100 text-violet-800 border-violet-200",
    icon: ShieldCheck,
    color: "from-violet-500/10 to-purple-500/10 border-violet-200",
    focus: "Bảo mật thông tin định danh (PII-Clean) & Đồng thuận phụ huynh (Parental Consent)",
    description:
      "Nguyên tắc cốt lõi bảo vệ trẻ em trên không gian số: Không lưu trữ khuôn mặt sinh trắc học, ẩn danh hóa dữ liệu trước khi xử lý và chỉ kích hoạt tạo website AI khi ba mẹ đồng ý.",
    appliedCases: [
      "Sử dụng mascot minh họa hoạt hình Kitten Bot, bảo vệ tuyệt đối hình ảnh của con.",
      "Tự động lọc sạch tên đầy đủ, số điện thoại trước khi xuất prompt sang AI Studio.",
      "Mọi dữ liệu chỉ được chuyển tiếp khi có phụ huynh xác nhận đồng thuận."
    ]
  }
];

export function AppliedStandardsSection() {
  const [inspectingCode, setInspectingCode] = useState<string | null>(null);

  return (
    <section id="standards-section" className="mt-16 sm:mt-20 border-t border-slate-200/80 pt-16">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[.18em] text-slate-700">
          <BookOpen className="h-3.5 w-3.5 text-tek-600" />
          Cơ Sở Khoa Học & Căn Cứ Đánh Giá
        </span>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Các Bộ Tiêu Chuẩn Quốc Tế & Khung Năng Lực Áp Dụng
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
          Bài đánh giá <strong className="text-tek-700">Future Creator (60 phút)</strong> không sử dụng điểm số trắc nghiệm cứng nhắc để xếp loại hay phán xét con. Toàn bộ 20 bước tương tác và tình huống thực tế đều được đối chiếu chặt chẽ theo các khung năng lực giáo dục công nghệ chuẩn mực:
        </p>
      </div>

      {/* Grid of 5 Standards Cards */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {standardFrameworks.map(fw => {
          const IconComp = fw.icon;
          return (
            <div
              key={fw.id}
              className={`flex flex-col justify-between rounded-3xl border bg-gradient-to-b ${fw.color} p-6 shadow-2xs transition duration-300 hover:shadow-card hover:-translate-y-1 bg-white`}
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider ${fw.badgeColor}`}
                  >
                    {fw.badge}
                  </span>
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-white shadow-2xs text-tek-600">
                    <IconComp className="h-4 w-4" />
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-4 text-base font-extrabold text-ink leading-snug">
                  {fw.title}
                </h3>
                <p className="mt-1 text-[11px] font-semibold text-slate-400">
                  {fw.organization}
                </p>

                {/* Focus summary */}
                <div className="mt-3 rounded-xl bg-white/90 p-3 border border-slate-100 shadow-2xs">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Trọng tâm rèn luyện
                  </p>
                  <p className="mt-1 text-xs font-bold text-slate-700 leading-5">
                    {fw.focus}
                  </p>
                </div>

                {/* Description */}
                <p className="mt-3 text-xs leading-5 text-slate-600">
                  {fw.description}
                </p>

                {/* Applied Cases in Test */}
                <div className="mt-4 space-y-1.5 border-t border-slate-100/80 pt-3">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Ứng dụng trong bài đánh giá:
                  </p>
                  {fw.appliedCases.map((c, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] leading-4 text-slate-600">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-tek-500 mt-0.5" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Link to Modal */}
              <button
                type="button"
                onClick={() => setInspectingCode(fw.code)}
                className="mt-6 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-extrabold text-tek-700 shadow-2xs hover:bg-slate-50 transition"
              >
                <span>Xem chuẩn chi tiết</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Evaluation Principles Notice Box */}
      <div className="mt-8 rounded-2xl border border-tek-200 bg-tek-50/50 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-tek-500 text-white shadow-2xs">
              <Info className="h-5 w-5" />
            </span>
            <div>
              <h4 className="text-sm font-extrabold text-ink">
                Nguyên tắc Đánh giá Định tính (Evidence-based Assessment)
              </h4>
              <p className="mt-1 text-xs leading-5 text-slate-600 max-w-3xl">
                Hệ thống không tính điểm tổng hay chấm điểm số cứng nhắc. Thay vào đó, mỗi câu trả lời là một **bằng chứng hành vi** giúp bộc lộ cách con tư duy khi gặp sự cố, mức độ tự tin khi làm dự án và sở thích hoạt động tự nhiên để ba mẹ dễ dàng đồng hành.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setInspectingCode("CSTA-ALGO")}
            className="shrink-0 rounded-xl bg-white border border-tek-200 px-4 py-2.5 text-xs font-extrabold text-tek-700 hover:bg-tek-50 shadow-2xs transition"
          >
            Tra cứu tất cả chuẩn giáo dục
          </button>
        </div>
      </div>

      {/* Standards Detail Modal Popup */}
      {inspectingCode && (
        <StandardsModal
          isOpen={Boolean(inspectingCode)}
          onClose={() => setInspectingCode(null)}
          standardCode={inspectingCode}
          whyWeAsk="Khung tiêu chuẩn đối chiếu để xây dựng câu hỏi và lộ trình học tập cho con."
          isPrimary={true}
        />
      )}
    </section>
  );
}
