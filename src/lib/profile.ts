import type { JourneyAnswers, JourneyStep } from "@/types/journey";

const labelMap: Record<string, string> = {
  game: "Game", robot: "Robot", design: "Thiết kế", "digital-world": "Thế giới số",
  creative: "Sáng tạo", experiment: "Thử nghiệm", solve: "Giải quyết vấn đề", team: "Đồng đội",
  inspect: "Phân tích", retry: "Kiên trì", ask: "Hợp tác", guide: "Tự học",
  family: "Gia đình", school: "Giáo dục", earth: "Môi trường", community: "Cộng đồng",
  curious: "Tò mò", persistent: "Kiên trì", ideas: "Nhiều ý tưởng", share: "Giao tiếp"
};

export function getTags(answers: JourneyAnswers, steps: JourneyStep[]) {
  const ids = Object.values(answers.selections).flat();
  const tags = steps.flatMap(step => step.options ?? []).filter(option => ids.includes(option.id)).flatMap(option => option.tags);
  return [...new Set(tags)];
}

export function createProfile(answers: JourneyAnswers) {
  const interests = answers.selections.interest ?? [];
  const strengths = [...(answers.selections.strength ?? []), ...(answers.selections.parent ?? [])];
  const primary = interests[0] ?? "design";
  const archetypes: Record<string, string> = {
    robot: "Người kiến tạo công nghệ",
    game: "Nhà thiết kế thế giới số",
    design: "Người kể chuyện sáng tạo",
    "digital-world": "Nhà kết nối tương lai"
  };
  const pathways: Record<string, { title: string; projects: string[] }> = {
    robot: { title: "Robotics & Smart Engineering", projects: ["Robot cảm biến", "Khu vườn thông minh", "Máy hỗ trợ gia đình"] },
    game: { title: "Game Design & Coding", projects: ["Mini game đầu tiên", "Nhân vật tương tác", "Thế giới phiêu lưu"] },
    design: { title: "Digital Art & Creative Media", projects: ["Truyện tranh số", "Nhân vật chuyển động", "Bộ nhận diện dự án"] },
    "digital-world": { title: "Digital Maker & AI", projects: ["Website cá nhân", "Trợ lý học tập", "Bản đồ cộng đồng"] }
  };
  return {
    archetype: archetypes[primary],
    pathway: pathways[primary],
    interestLabels: interests.map(id => labelMap[id] ?? id),
    strengthLabels: [...new Set(strengths)].slice(0, 4).map(id => labelMap[id] ?? id)
  };
}

export function createPrompt(answers: JourneyAnswers) {
  const profile = createProfile(answers);
  return `Tạo website portfolio cho ${answers.name || "học sinh"}, ${profile.archetype}, quan tâm đến ${profile.interestLabels.join(", ")}, dự án đầu tiên là ${answers.projectName || profile.pathway.projects[0]}, theo phong cách giáo dục công nghệ tích cực.`;
}
