"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import Image from "next/image";
import {
  Upload, X, Check, ImagePlus, RotateCcw, AlertCircle,
  Sparkles, Bot, Copy, ExternalLink, Wand2, CheckCircle2, ArrowRight
} from "lucide-react";
import type { JourneyAnswers } from "@/types/journey";
import { buildSafeImageGenerationPrompt } from "@/data/v3Engine";

export type AvatarUploaderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentAvatar: string;
  avatarSource?: "system" | "custom";
  customAvatarData?: string;
  onSaveAvatar: (source: "system" | "custom", customData?: string, systemAvatar?: string) => void;
  answers?: JourneyAnswers;
  initialTab?: "banner" | "custom" | "system" | "ai-prompt";
};

export function AvatarUploaderModal({
  isOpen,
  onClose,
  currentAvatar,
  avatarSource = "system",
  customAvatarData,
  onSaveAvatar,
  answers,
  initialTab
}: AvatarUploaderModalProps) {
  const [selectedSource, setSelectedSource] = useState<"banner" | "custom" | "system" | "ai-prompt">(
    initialTab || (avatarSource === "custom" && customAvatarData ? "custom" : "banner")
  );
  const [selectedSystem, setSelectedSystem] = useState<string>(currentAvatar || "creator");
  const [previewImage, setPreviewImage] = useState<string | null>(customAvatarData || null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync initialTab when modal reopens or tab changes externally
  useEffect(() => {
    if (initialTab) {
      setSelectedSource(initialTab);
    }
  }, [initialTab]);

  const imagePrompt = useMemo(() => {
    if (answers) {
      return buildSafeImageGenerationPrompt(answers);
    }
    return buildSafeImageGenerationPrompt({
      name: "Học sinh",
      grade: "4",
      domain: "robotics",
      projectName: "Robot Thông Minh",
      dreamPurpose: "giúp đỡ con người trong cuộc sống",
    });
  }, [answers]);

  if (!isOpen) return null;

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(imagePrompt);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2500);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    // Check type
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setErrorMsg("Vui lòng chọn tệp ảnh định dạng PNG, JPG hoặc WebP.");
      return;
    }

    // Check size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Kích thước ảnh tối đa là 5 MB. Vui lòng chọn ảnh nhỏ hơn.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        // Preserve natural aspect ratio for widescreen banner (max 1400w, 900h)
        const maxW = 1400;
        const maxH = 900;
        let w = img.width;
        let h = img.height;
        if (w > maxW || h > maxH) {
          const ratio = Math.min(maxW / w, maxH / h);
          w = Math.round(w * ratio);
          h = Math.round(h * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL("image/webp", 0.9);
        setPreviewImage(dataUrl);
        setSelectedSource("custom");
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPresetBanner = (bannerPath: string) => {
    setPreviewImage(bannerPath);
    setSelectedSource("banner");
  };

  const handleConfirm = () => {
    if (selectedSource === "custom" && previewImage) {
      onSaveAvatar("custom", previewImage, selectedSystem);
    } else if (selectedSource === "banner" && previewImage) {
      onSaveAvatar("custom", previewImage, selectedSystem);
    } else if (selectedSource === "system") {
      const botImg =
        selectedSystem === "builder"
          ? "/assets/kittenbot-builder.png"
          : selectedSystem === "explorer"
          ? "/assets/kittenbot-explorer.png"
          : "/assets/kittenbot-creator.png";
      onSaveAvatar("system", botImg, selectedSystem);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-xs">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1a8a7d]">
                Hình Đại Diện & Ảnh Bìa Profile
              </span>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-extrabold text-emerald-800">
                16:9 Hero
              </span>
            </div>
            <h3 className="mt-0.5 text-base font-extrabold text-[#1a3a4a]">
              Tùy chỉnh ảnh bìa & nhân vật tương lai của con
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* Mode Switcher - 4 Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => setSelectedSource("banner")}
              className={`flex flex-col items-center p-2.5 rounded-2xl border text-center transition ${
                selectedSource === "banner"
                  ? "border-[#1a8a7d] bg-[#e6f7f3] ring-2 ring-[#a3e3d4]"
                  : "border-slate-200 bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <Sparkles className="h-4 w-4 text-[#1a8a7d] mb-1" />
              <strong className="block text-[11px] font-extrabold text-slate-800">Ảnh Bìa Chuẩn</strong>
              <span className="text-[9px] text-slate-500">Mẫu Tiểu học / THCS</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedSource("ai-prompt")}
              className={`relative flex flex-col items-center p-2.5 rounded-2xl border text-center transition ${
                selectedSource === "ai-prompt"
                  ? "border-amber-500 bg-amber-50/90 ring-2 ring-amber-300"
                  : "border-slate-200 bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <span className="absolute -top-1.5 -right-1 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 px-1.5 py-0.2 text-[8px] font-extrabold text-white shadow-xs">
                MỚI
              </span>
              <Wand2 className="h-4 w-4 text-amber-600 mb-1" />
              <strong className="block text-[11px] font-extrabold text-slate-800">Tạo Ảnh AI</strong>
              <span className="text-[9px] text-slate-500">Prompt chuẩn 16:9</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedSource("custom")}
              className={`flex flex-col items-center p-2.5 rounded-2xl border text-center transition ${
                selectedSource === "custom"
                  ? "border-[#1a8a7d] bg-[#e6f7f3] ring-2 ring-[#a3e3d4]"
                  : "border-slate-200 bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <Upload className="h-4 w-4 text-sky-600 mb-1" />
              <strong className="block text-[11px] font-extrabold text-slate-800">Tải Ảnh Lên</strong>
              <span className="text-[9px] text-slate-500">Tràn viền tự động</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedSource("system")}
              className={`flex flex-col items-center p-2.5 rounded-2xl border text-center transition ${
                selectedSource === "system"
                  ? "border-[#1a8a7d] bg-[#e6f7f3] ring-2 ring-[#a3e3d4]"
                  : "border-slate-200 bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <Bot className="h-4 w-4 text-teal-600 mb-1" />
              <strong className="block text-[11px] font-extrabold text-slate-800">Kitten Bot</strong>
              <span className="text-[9px] text-slate-500">Linh vật đồng hành</span>
            </button>
          </div>

          {/* Panel 1: Banner Chuẩn Archetypes */}
          {selectedSource === "banner" && (
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-600">Chọn ảnh minh họa chủ đề chuẩn (hiển thị tràn ảnh):</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSelectPresetBanner("/assets/profile-may-banner.png")}
                  className={`group relative overflow-hidden rounded-2xl border-2 text-left transition ${
                    previewImage === "/assets/profile-may-banner.png" || (!previewImage && currentAvatar !== "nova")
                      ? "border-[#1a8a7d] ring-2 ring-[#a3e3d4]"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-amber-50">
                    <img
                      src="/assets/profile-may-banner.png"
                      alt="Ảnh Bìa Tiểu học"
                      className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-3 bg-white">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">Tiểu học</span>
                      <strong className="text-xs font-extrabold text-[#1a3a4a]">Phong cách Tiểu học</strong>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500 line-clamp-1">Khám phá · Tạo ra · Vui học mỗi ngày</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectPresetBanner("/assets/profile-nova-banner.png")}
                  className={`group relative overflow-hidden rounded-2xl border-2 text-left transition ${
                    previewImage === "/assets/profile-nova-banner.png"
                      ? "border-[#1a8a7d] ring-2 ring-[#a3e3d4]"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-sky-50">
                    <img
                      src="/assets/profile-nova-banner.png"
                      alt="Ảnh Bìa THCS"
                      className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-3 bg-white">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-800">THCS</span>
                      <strong className="text-xs font-extrabold text-[#1a3a4a]">Phong cách THCS</strong>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500 line-clamp-1">Học sáng tạo · Làm dự án · Kiến tạo tương lai</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Panel 2: Tạo Ảnh Bằng AI (Prompt Generator & Flow) */}
          {selectedSource === "ai-prompt" && (
            <div className="space-y-3.5">
              {/* Context notification */}
              <div className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50/80 via-orange-50/50 to-amber-50/80 p-3.5">
                <div className="flex items-start gap-3">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-500 text-white shadow-xs">
                    <Wand2 className="h-4 w-4" />
                  </div>
                  <div className="text-xs">
                    <div className="flex flex-wrap items-center gap-1.5 font-extrabold text-[#1a3a4a]">
                      <span>Prompt Tạo Ảnh AI Đúng Style Hồ Sơ Của Con</span>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.2 text-[9px] font-extrabold text-emerald-800">
                        Reference-Optional · Tự Động Tạo Ngay
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">
                      Prompt được cá nhân hóa từ lứa tuổi (Lớp {answers?.grade || "4"}), lĩnh vực ({answers?.domain === 'multimedia' ? 'Đa phương tiện & 3D' : answers?.domain === 'game_programming' ? 'Lập trình Game' : 'Robotics & IoT'}), dự án mơ ước "{answers?.projectName || "Sáng kiến tương lai"}" và linh vật Kitten Bot. AI tạo ảnh sẽ <strong>vẽ ngay lập tức</strong> mà không yêu cầu bạn phải tải thêm ảnh tham chiếu!
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Bar: Copy Button & Quick Links */}
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200/80 bg-slate-50 p-2.5">
                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-extrabold shadow-sm transition ${
                    copiedPrompt
                      ? "bg-emerald-600 text-white"
                      : "bg-[#1a8a7d] text-white hover:bg-[#15796e] active:scale-98"
                  }`}
                >
                  {copiedPrompt ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      <span>✓ Đã sao chép vào bộ nhớ tạm!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Sao chép Prompt ({imagePrompt.length.toLocaleString("vi-VN")} ký tự)</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1.5 text-[11px]">
                  <span className="text-slate-400 font-semibold hidden sm:inline">Dán vào:</span>
                  <a
                    href="https://chatgpt.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-bold text-slate-700 hover:bg-slate-100 transition shadow-2xs"
                  >
                    <span>ChatGPT</span>
                    <ExternalLink className="h-3 w-3 text-slate-400" />
                  </a>
                  <a
                    href="https://aitestkitchen.withgoogle.com/tools/image-fx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-bold text-sky-700 hover:bg-sky-50 transition shadow-2xs"
                  >
                    <span>Google ImageFX</span>
                    <ExternalLink className="h-3 w-3 text-sky-400" />
                  </a>
                  <a
                    href="https://www.midjourney.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-bold text-slate-700 hover:bg-slate-100 transition shadow-2xs"
                  >
                    <span>Midjourney</span>
                    <ExternalLink className="h-3 w-3 text-slate-400" />
                  </a>
                </div>
              </div>

              {/* Prompt Text Viewer */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 text-slate-100 shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/90 px-4 py-2 text-[10px] font-mono text-slate-400">
                  <span className="truncate">PROMPT_SPECIFICATION.TXT (STYLE 2.5D HERO 16:9)</span>
                  <button
                    type="button"
                    onClick={handleCopyPrompt}
                    className="text-amber-400 hover:text-amber-300 font-bold shrink-0 ml-2"
                  >
                    {copiedPrompt ? "✓ Đã chép" : "Sao chép"}
                  </button>
                </div>
                <pre className="max-h-52 overflow-y-auto p-3.5 text-[11px] font-mono leading-relaxed text-slate-200 whitespace-pre-wrap select-all">
                  {imagePrompt}
                </pre>
              </div>

              {/* 3-Step Guide & Switch Action */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 space-y-2">
                <strong className="text-[11px] font-extrabold uppercase tracking-wide text-slate-700 block">
                  Quy trình 3 bước hoàn thiện ảnh bìa hồ sơ của con:
                </strong>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-600">
                  <div className="rounded-xl bg-white p-2.5 border border-slate-200/60 shadow-2xs">
                    <div className="font-extrabold text-[#1a8a7d] mb-0.5">1. Sao chép Prompt</div>
                    <p className="text-[10px] text-slate-500 leading-snug">Bấm nút "Sao chép Prompt" bên trên để lưu lệnh vẽ vào clipboard.</p>
                  </div>
                  <div className="rounded-xl bg-white p-2.5 border border-slate-200/60 shadow-2xs">
                    <div className="font-extrabold text-amber-600 mb-0.5">2. Dán vào AI tạo ảnh</div>
                    <p className="text-[10px] text-slate-500 leading-snug">Dán vào ChatGPT, ImageFX hoặc Midjourney để AI tự vẽ ngay bức tranh 16:9.</p>
                  </div>
                  <div className="rounded-xl bg-white p-2.5 border border-slate-200/60 shadow-2xs">
                    <div className="font-extrabold text-sky-600 mb-0.5">3. Tải lên Website</div>
                    <p className="text-[10px] text-slate-500 leading-snug">Lưu ảnh về máy, chuyển sang tab "Tải Ảnh Lên" và chọn ảnh vừa tạo.</p>
                  </div>
                </div>

                <div className="pt-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedSource("custom")}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1a8a7d] hover:text-[#15796e] hover:underline"
                  >
                    <span>Đã tạo ảnh xong? Chuyển sang tab Tải Ảnh Lên</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Panel 3: Custom Upload (Tràn viền) */}
          {selectedSource === "custom" && (
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileChange}
                className="hidden"
              />

              {previewImage && previewImage.startsWith("data:") ? (
                <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
                  <div className="relative aspect-[16/9] w-full max-h-52 overflow-hidden rounded-2xl border-2 border-white bg-slate-900 shadow-md">
                    <img
                      src={previewImage}
                      alt="Custom Character Preview"
                      className="h-full w-full object-cover object-center"
                    />
                    <div className="absolute top-2.5 left-2.5 rounded-full bg-black/60 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold text-white">
                      ✓ Hiển thị tràn viền banner
                    </div>
                  </div>
                  <p className="mt-3 text-xs font-extrabold text-[#1a3a4a]">
                    Ảnh của con (Sẽ bao phủ toàn bộ banner hồ sơ)
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Ảnh tự động co giãn và hiển thị tràn ảnh (cover) chuẩn đẹp theo layout
                  </p>

                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
                    >
                      <ImagePlus className="h-3.5 w-3.5" /> Chọn ảnh khác
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewImage("/assets/profile-may-banner.png");
                        setSelectedSource("banner");
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50"
                    >
                      <RotateCcw className="h-3.5 w-3.5" /> Về ảnh mẫu
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#1a8a7d]/40 bg-[#f0faf7] p-8 text-center transition hover:border-[#1a8a7d] hover:bg-[#e6f7f3]"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-[#1a8a7d] shadow-xs">
                    <Upload className="h-6 w-6" />
                  </span>
                  <strong className="mt-3 text-sm font-extrabold text-[#1a3a4a]">
                    Bấm để tải ảnh bìa hồ sơ lên
                  </strong>
                  <p className="mt-1 text-xs text-slate-500 max-w-sm">
                    Hỗ trợ ảnh chụp, tranh vẽ PNG, JPG, WebP tạo từ AI hoặc ảnh thật của con. Ảnh sẽ hiển thị tràn viền toàn bộ banner hồ sơ.
                  </p>
                </div>
              )}

              {errorMsg && (
                <div className="flex items-center gap-2 rounded-xl bg-rose-50 p-3 text-xs font-bold text-rose-700">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>
          )}

          {/* Panel 4: System Avatars (Kitten Bot) */}
          {selectedSource === "system" && (
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-600">Chọn người bạn Kitten Bot đồng hành:</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "creator", name: "Kitten Creator", img: "/assets/kittenbot-creator.png" },
                  { id: "builder", name: "Kitten Builder", img: "/assets/kittenbot-builder.png" },
                  { id: "explorer", name: "Kitten Explorer", img: "/assets/kittenbot-explorer.png" }
                ].map(bot => {
                  const active = selectedSystem === bot.id;
                  return (
                    <button
                      type="button"
                      key={bot.id}
                      onClick={() => setSelectedSystem(bot.id)}
                      className={`flex flex-col items-center rounded-2xl border p-3 text-center transition ${
                        active
                          ? "border-[#1a8a7d] bg-[#e6f7f3] ring-1 ring-[#1a8a7d]"
                          : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                      }`}
                    >
                      <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-white p-1 shadow-2xs">
                        <Image src={bot.img} alt={bot.name} fill className="object-contain" />
                      </div>
                      <span className="mt-2 text-xs font-bold text-slate-800">{bot.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Privacy Notice */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5 text-[11px] leading-5 text-slate-500">
            <strong>Bảo vệ quyền riêng tư:</strong> Ảnh đại diện chỉ lưu an toàn trên máy của bạn và dùng để hiển thị trên website của con. Việc dùng ảnh Kitten hay ảnh tự tạo hoàn toàn không ảnh hưởng đến đánh giá học tập hay 4 dự án.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-100 p-4 flex justify-between items-center">
          <div className="text-[11px] text-slate-400">
            {selectedSource === "ai-prompt" ? (
              <span>Prompt đã sẵn sàng để dán vào công cụ AI</span>
            ) : selectedSource === "custom" && previewImage ? (
              <span className="text-emerald-600 font-bold">✓ Ảnh đã chọn sẵn sàng</span>
            ) : null}
          </div>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Đóng
            </button>
            {selectedSource !== "ai-prompt" && (
              <button
                type="button"
                onClick={handleConfirm}
                className="rounded-xl bg-tek-500 px-5 py-2.5 text-xs font-extrabold text-white shadow-card hover:bg-tek-600 transition"
              >
                Xác nhận & Áp dụng
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
