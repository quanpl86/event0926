import type { AgeTier, GradeBand, JourneyStep, Option } from "@/types/journey";
import { impactFor, optionOverlays, projectFor, scenarioFor, stepOverlays } from "./age-content";

export type { AgeTier, GradeBand };

export function isPrimary(gradeBand: string) {
  return gradeBand !== "6-7" && gradeBand !== "8-9";
}

export function isGrade12(gradeBand: string) {
  return gradeBand === "1-2";
}

export function ageTier(gradeBand: string): AgeTier {
  if (gradeBand === "1-2") return "g12";
  if (gradeBand === "6-7") return "g67";
  if (gradeBand === "8-9") return "g89";
  return "g35";
}

export function you(_gradeBand?: string) {
  return "bạn";
}

export function You(_gradeBand?: string) {
  return "Bạn";
}

export function child(_gradeBand?: string) {
  return "con";
}

export function Child(_gradeBand?: string) {
  return "Con";
}

export function isParentAudience(stepId: string) {
  return ["handoff", "parent", "parent-support", "family-mirror"].includes(stepId);
}

export function fillVoice(text: string, gradeBand: string) {
  return text
    .replaceAll("{Child}", Child(gradeBand))
    .replaceAll("{child}", child(gradeBand))
    .replaceAll("{You}", You(gradeBand))
    .replaceAll("{you}", you(gradeBand));
}

export function ageGroupLabel(gradeBand: string) {
  switch (ageTier(gradeBand)) {
    case "g12":
      return "học sinh lớp 1–2 (khoảng 6–8 tuổi)";
    case "g35":
      return "học sinh lớp 3–5 (khoảng 8–11 tuổi)";
    case "g67":
      return "học sinh lớp 6–7 (khoảng 11–13 tuổi)";
    case "g89":
      return "học sinh lớp 8–9 (khoảng 13–15 tuổi)";
  }
}

export function schoolLevel(gradeBand: string) {
  return isPrimary(gradeBand) ? "Tiểu học" : "THCS";
}

export function appearanceAge(gradeBand: string) {
  switch (ageTier(gradeBand)) {
    case "g12":
      return "trẻ 6–8 tuổi, lớp 1–2";
    case "g35":
      return "học sinh tiểu học 8–11 tuổi, lớp 3–5";
    case "g67":
      return "học sinh THCS 11–13 tuổi, lớp 6–7";
    case "g89":
      return "học sinh THCS 13–15 tuổi, lớp 8–9";
  }
}

export function selectionLimit(step: JourneyStep, gradeBand: string) {
  if (step.type === "single" || step.type === "scenario" || step.type === "family") return 1;
  if (step.id === "interest") return isGrade12(gradeBand) ? 2 : undefined;
  if (step.type === "bag") return isGrade12(gradeBand) ? 2 : 3;
  if (step.id === "parent-support") return 2;
  if (step.type === "parent") return 3;
  return undefined;
}

export function presentStep(step: JourneyStep, gradeBand: string, interests: string[] = []): JourneyStep {
  const tier = ageTier(gradeBand);
  const overlay = stepOverlays[tier]?.[step.id];
  const optionPatch = optionOverlays[tier];
  const scenario = step.id === "problem-strategy" ? scenarioFor(interests[0], tier) : undefined;
  const impact = step.id === "impact" ? impactFor(interests, tier) : undefined;
  const project = step.id === "project" ? projectFor(interests, tier) : undefined;
  const linked = scenario ?? impact ?? project;
  const sourceOptions = overlay?.options ?? step.options;
  const options = sourceOptions?.map((option: Option) => {
    const patch = optionPatch?.[option.id];
    const inspect = scenario && option.id === "inspect" ? scenario.inspect : undefined;
    return {
      ...option,
      title: fillVoice(patch?.title ?? option.title, gradeBand),
      description: fillVoice(inspect ?? patch?.description ?? option.description, gradeBand)
    };
  });
  return {
    ...step,
    phase: fillVoice(step.phase, gradeBand),
    title: fillVoice(linked?.title ?? overlay?.title ?? step.title, gradeBand),
    description: fillVoice(linked?.description ?? overlay?.description ?? step.description, gradeBand),
    buddy: fillVoice(linked?.buddy ?? overlay?.buddy ?? step.buddy, gradeBand),
    options
  };
}

export function journeyUi(gradeBand: string) {
  const tier = ageTier(gradeBand);
  return {
    nameLabel: fillVoice("Tên {you} muốn Kitten Bot gọi", gradeBand),
    combining: fillVoice("{You} vừa chọn những điều này", gradeBand),
    bagTitle: fillVoice("Những điều {you} chọn", gradeBand),
    bagEmpty: fillVoice("Bấm một ô ở trên, điều đó sẽ hiện vào đây", gradeBand),
    bagHint: fillVoice(
      isGrade12(gradeBand) ? "Chọn 2 điều {you} thấy đúng với mình" : "Chọn 2–3 điều {you} thấy đúng với mình",
      gradeBand
    ),
    interestHint: fillVoice("Chọn tối đa 2 thứ {you} thích nhất", gradeBand),
    toldJustNow: fillVoice("{Child} vừa chia sẻ dự án", gradeBand),
    futureProject: fillVoice("Dự án tương lai của {child}", gradeBand),
    wantsToUse: fillVoice("{Child} muốn dùng dự án này để", gradeBand),
    parentMoment: fillVoice("Ba mẹ nhớ một khoảnh khắc {child} từng rất tò mò, sáng tạo hoặc kiên trì không?", gradeBand),
    parentPlaceholder: fillVoice(
      tier === "g12" || tier === "g35"
        ? `Ví dụ: Có lần {name} tự tháo món đồ chơi để xem bên trong hoạt động thế nào…`
        : `Ví dụ: Có lần {name} tự mày mò sửa một món đồ / tự học một công cụ mới đến khi làm được…`,
      gradeBand
    ),
    handoffParent: fillVoice("Kể điều ba mẹ thường thấy ở {child}", gradeBand),
    tellProject: fillVoice("kể về dự án", gradeBand),
    projectPlaceholder: tier === "g12" ? "Ví dụ: Robot bạn thân" : tier === "g35" ? "Ví dụ: Robo Garden" : "Ví dụ: Smart Garden",
    headerSubtitle: fillVoice("Hành trình của {name}", gradeBand),
    journeyFit: fillVoice("Chọn tên và nhóm lớp để hành trình phù hợp với {you}.", gradeBand)
  };
}
