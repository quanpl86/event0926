import {
  ArrowRight, Blocks, BookOpen, Bot, Check, CircleHelp, Database, Gamepad2, Globe2, HeartHandshake,
  House, Lightbulb, LockKeyhole, MessageCircleMore, MessagesSquare, Mountain, Palette, Pencil, Puzzle,
  RefreshCw, Rocket, ScanSearch, School, Search, Sparkles, Sprout, Trophy, UserRoundPlus, Users, WandSparkles,
  Wrench, type LucideIcon
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  ArrowRight, Blocks, BookOpen, Bot, Check, CircleHelp, Database, Gamepad2, Globe2, HeartHandshake,
  House, Lightbulb, LockKeyhole, MessageCircleMore, MessagesSquare, Mountain, Palette, Pencil, Puzzle,
  RefreshCw, Rocket, ScanSearch, School, Search, Sparkles, Sprout, Trophy, UserRoundPlus, Users, WandSparkles, Wrench
};

export function Icon({ name, className = "h-5 w-5", strokeWidth = 2 }: { name: string; className?: string; strokeWidth?: number }) {
  const Component = icons[name] ?? Sparkles;
  return <Component className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
