"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Check, ImagePlus, RotateCcw, AlertCircle, Sparkles, Bot } from "lucide-react";

type AvatarUploaderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentAvatar: string;
  avatarSource?: "system" | "custom";
  customAvatarData?: string;
  onSaveAvatar: (source: "system" | "custom", customData?: string, systemAvatar?: string) => void;
};

export function AvatarUploaderModal({
  isOpen,
  onClose,
  currentAvatar,
  avatarSource = "system",
  customAvatarData,
  onSaveAvatar
}: AvatarUploaderModalProps) {
  const [selectedSource, setSelectedSource] = useState<"banner" | "custom" | "system">(
    avatarSource === "custom" && customAvatarData ? "custom" : "banner"
  );
  const [selectedSystem, setSelectedSystem] = useState<string>(currentAvatar || "creator");
  const [previewImage, setPreviewImage] = useState<string | null>(customAvatarData || null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

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
    } else {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="max-h-[92vh] w-full max-w-xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1a8a7d]">
              Hình Đại Diện & Ảnh Bìa Profile
            </span>
            <h3 className="mt-0.5 text-base font-extrabold text-[#1a3a4a]">
              Tùy chỉnh ảnh bìa & nhân vật của con
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
        <div className="overflow-y-auto p-5 space-y-5">
          <p className="text-xs text-slate-500">
            Chọn ảnh bìa minh họa chuẩn tràn viền hoặc tải lên ảnh bất kỳ từ máy tính để hiển thị tràn đẹp trên toàn bộ khung Profile:
          </p>

          {/* Mode Switcher */}
          <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={() => setSelectedSource("banner")}
              className={`flex flex-col items-center p-3 rounded-2xl border text-center transition ${
                selectedSource === "banner"
                  ? "border-[#1a8a7d] bg-[#e6f7f3] ring-2 ring-[#a3e3d4]"
                  : "border-slate-200 bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <Sparkles className="h-5 w-5 text-[#1a8a7d] mb-1.5" />
              <strong className="block text-xs font-extrabold text-slate-800">Ảnh Bìa Chuẩn</strong>
              <span className="text-[10px] text-slate-500">Mây / Nova tràn ảnh</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedSource("custom")}
              className={`flex flex-col items-center p-3 rounded-2xl border text-center transition ${
                selectedSource === "custom"
                  ? "border-[#1a8a7d] bg-[#e6f7f3] ring-2 ring-[#a3e3d4]"
                  : "border-slate-200 bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <Upload className="h-5 w-5 text-amber-600 mb-1.5" />
              <strong className="block text-xs font-extrabold text-slate-800">Tải Ảnh Lên</strong>
              <span className="text-[10px] text-slate-500">Tràn viền tự động</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedSource("system")}
              className={`flex flex-col items-center p-3 rounded-2xl border text-center transition ${
                selectedSource === "system"
                  ? "border-[#1a8a7d] bg-[#e6f7f3] ring-2 ring-[#a3e3d4]"
                  : "border-slate-200 bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <Bot className="h-5 w-5 text-sky-600 mb-1.5" />
              <strong className="block text-xs font-extrabold text-slate-800">Kitten Bot</strong>
              <span className="text-[10px] text-slate-500">Linh vật đồng hành</span>
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
                      alt="Mây Tiểu học"
                      className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-3 bg-white">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">Tiểu học</span>
                      <strong className="text-xs font-extrabold text-[#1a3a4a]">Phong cách Mây</strong>
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
                      alt="Nova THCS"
                      className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-3 bg-white">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-800">THCS</span>
                      <strong className="text-xs font-extrabold text-[#1a3a4a]">Phong cách Nova</strong>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500 line-clamp-1">Học sáng tạo · Làm dự án · Kiến tạo tương lai</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Panel 2: Custom Upload (Tràn viền) */}
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
                    Hỗ trợ ảnh chụp, tranh vẽ PNG, JPG, WebP. Ảnh sẽ hiển thị tràn viền toàn bộ banner mà không bị thu nhỏ thành ô vuông.
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

          {/* Panel 3: System Avatars (Kitten Bot) */}
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
        <div className="border-t border-slate-100 p-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="rounded-xl bg-tek-500 px-5 py-2.5 text-xs font-extrabold text-white shadow-card hover:bg-tek-600"
          >
            Xác nhận & Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
}
