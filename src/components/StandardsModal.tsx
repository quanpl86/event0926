"use client";

import { useEffect } from "react";
import { X, ExternalLink, ShieldCheck, BookOpen, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";
import { getStandardDetail } from "@/data/standards";

type StandardsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  standardCode: string;
  whyWeAsk?: string;
  isPrimary?: boolean;
};

export function StandardsModal({
  isOpen,
  onClose,
  standardCode,
  whyWeAsk,
  isPrimary = true
}: StandardsModalProps) {
  const detail = getStandardDetail(standardCode);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl transition-all sm:p-8">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-tek-50 text-tek-600">
              <BookOpen className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-tek-600">
                Cơ Sở Đánh Giá Khoa Học
              </p>
              <h3 className="text-base font-extrabold text-ink sm:text-lg">
                {detail.name}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Đóng"
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Short friendly explanation for Kids */}
        {whyWeAsk && (
          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="flex items-center gap-2 text-xs font-extrabold text-amber-900">
              <Sparkles className="h-4 w-4 text-amber-500" />
              {isPrimary ? "Vì sao Kitten Bot hỏi câu này?" : "Mục tiêu tìm hiểu của tình huống:"}
            </p>
            <p className="mt-1.5 text-xs font-semibold leading-5 text-amber-800 sm:text-sm">
              {whyWeAsk}
            </p>
          </div>
        )}

        {/* Academic Standard Details for Parents & Teachers */}
        <div className="mt-6 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
              <p className="text-[10px] font-bold uppercase tracking-[.12em] text-slate-400">Mã tiêu chuẩn</p>
              <p className="mt-1 text-xs font-extrabold text-slate-700">{detail.code}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
              <p className="text-[10px] font-bold uppercase tracking-[.12em] text-slate-400">
                {detail.code.startsWith("FM-") || detail.organization.includes("Không phải") ? "Phân loại chỉ số" : "Tổ chức ban hành"}
              </p>
              <p className="mt-1 text-xs font-extrabold text-slate-700">{detail.organization}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 p-4">
            <p className="text-xs font-extrabold text-ink">Mô tả chi tiết</p>
            <p className="mt-1.5 text-xs font-medium leading-5 text-slate-600">
              {detail.description}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
              <p className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-800">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Tiêu chí đang sử dụng
              </p>
              <p className="mt-1.5 text-xs leading-5 text-emerald-950">
                {detail.criteria}
              </p>
            </div>
            <div className="rounded-2xl border border-sky-100 bg-sky-50/50 p-4">
              <p className="flex items-center gap-1.5 text-xs font-extrabold text-sky-800">
                <ShieldCheck className="h-4 w-4 text-sky-600" />
                Minh chứng ghi nhận
              </p>
              <p className="mt-1.5 text-xs leading-5 text-sky-950">
                {detail.evidence}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-rose-100 bg-rose-50/50 p-4">
            <p className="flex items-center gap-1.5 text-xs font-extrabold text-rose-800">
              <AlertCircle className="h-4 w-4 text-rose-500" />
              Giới hạn của kết quả (Evidence Limitations)
            </p>
            <p className="mt-1.5 text-xs leading-5 text-rose-950">
              {detail.limitations}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-4 sm:flex-row">
          {detail.sourceUrl && !detail.organization.includes("Không phải") ? (
            <a
              href={detail.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-tek-600 hover:underline"
            >
              Xem tài liệu chính thức từ {detail.organization}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : (
            <span className="text-[11px] font-medium text-slate-400 italic">
              Chỉ số quan sát trải nghiệm nội bộ trong khuôn khổ sự kiện
            </span>
          )}
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800 sm:w-auto cursor-pointer"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  );
}
