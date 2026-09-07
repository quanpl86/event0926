import Image from "next/image";
import { Sparkles } from "lucide-react";

export const BOT_NAME = "Kitten Bot";
export const BOT_IMAGE = "/assets/kitten-bot.png";

export function KittenBotAvatar({ size = 48, className = "", priority = false }: { size?: number; className?: string; priority?: boolean }) {
  return (
    <Image
      src={BOT_IMAGE}
      alt={BOT_NAME}
      width={size}
      height={size}
      className={`object-contain ${className}`}
      priority={priority}
    />
  );
}

export function FutureBuddy({ message, compact = false }: { message: string; compact?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${compact ? "max-w-md" : ""}`}>
      <div className="buddy-float relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-tek-200 bg-white shadow-card">
        <KittenBotAvatar size={52} className="h-12 w-12" priority />
        <Sparkles className="absolute -right-1 -top-1 h-4 w-4 text-amber-400" fill="currentColor" />
      </div>
      <div>
        <p className="mb-0.5 text-[10px] font-extrabold uppercase tracking-[.17em] text-tek-600">{BOT_NAME}</p>
        <p className="text-xs font-semibold leading-5 text-slate-700 sm:text-sm">{message}</p>
      </div>
    </div>
  );
}
