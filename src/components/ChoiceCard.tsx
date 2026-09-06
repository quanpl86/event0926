import { Check } from "lucide-react";
import { Icon } from "./Icon";
import type { Option } from "@/types/journey";

export function ChoiceCard({ option, selected, onClick }: { option: Option; selected: boolean; onClick: () => void }) {
  return (
    <button type="button" data-selected={selected} onClick={onClick} className="choice-card focus-ring group relative flex min-h-28 w-full items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-tek-50 text-tek-600 group-hover:bg-tek-100">
        <Icon name={option.icon} className="h-6 w-6" />
      </span>
      <span className="pr-5">
        <strong className="block text-sm font-extrabold text-ink">{option.title}</strong>
        <span className="mt-1 block text-xs leading-5 text-slate-500">{option.description}</span>
      </span>
      <span className={`absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full ${selected ? "bg-tek-500 text-white" : "border border-slate-200 bg-white text-transparent"}`}>
        <Check className="h-3 w-3" strokeWidth={3} />
      </span>
    </button>
  );
}
