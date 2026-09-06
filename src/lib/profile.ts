import type { JourneyAnswers, JourneyStep } from "@/types/journey";

const labels: Record<string, string> = {
  game: "Tạo game", robot: "Chế tạo robot", design: "Thiết kế hình ảnh", "digital-world": "Xây thế giới số",
  creative: "Có nhiều ý tưởng", experiment: "Sẵn sàng thử lại", solve: "Thích giải thử thách", team: "Thích làm cùng mọi người",
  sketch: "Thích phác thảo", make: "Thích tạo sản phẩm", research: "Chủ động tìm hiểu", talk: "Thích chia sẻ ý tưởng",
  inspect: "Kiểm tra từng phần", retry: "Kiên trì thử cách khác", ask: "Biết tìm đồng đội", guide: "Biết tìm hướng dẫn",
  family: "Giúp gia đình", school: "Giúp trường học", earth: "Bảo vệ Trái đất", community: "Kết nối cộng đồng",
  curious: "Hay đặt câu hỏi", persistent: "Khá kiên trì", ideas: "Có nhiều ý tưởng", share: "Thích chia sẻ",
  encourage: "Lắng nghe và khích lệ", together: "Cùng con làm thử", space: "Cho con không gian tự khám phá", connect: "Giúp con tìm người hướng dẫn",
  "try-project": "Cùng chọn một dự án nhỏ", "visit-class": "Cùng tham gia một buổi trải nghiệm", "talk-weekly": "Mỗi tuần dành thời gian nghe con kể"
};

export type FutureProject = { id: string; title: string; description: string; actions: string[]; image: string };

const sharedWebsite: FutureProject = {
  id: "portfolio", title: "Website Future Me", description: "Trưng bày dự án và kể câu chuyện sáng tạo của con.",
  actions: ["Thiết kế", "Viết nội dung", "Chia sẻ"], image: "/assets/activity-communication.png"
};

const library: Record<string, FutureProject[]> = {
  robot: [
    { id: "robot-explorer", title: "Robot thám hiểm", description: "Lắp ráp, điều khiển và giúp robot vượt thử thách.", actions: ["Lắp ráp", "Điều khiển", "Thử nghiệm"], image: "/assets/activity-robotics.png" },
    { id: "smart-garden", title: "Khu vườn thông minh", description: "Dùng cảm biến để chăm sóc cây và quan sát thiên nhiên.", actions: ["Quan sát", "Đo dữ liệu", "Tự động hóa"], image: "/assets/activity-nature-observation.png" },
    { id: "adventure-game", title: "Game phiêu lưu", description: "Tạo nhân vật, luật chơi và phản hồi cho người chơi.", actions: ["Tạo nhân vật", "Nghĩ luật", "Lập trình"], image: "/assets/activity-world-building.png" }, sharedWebsite
  ],
  game: [
    { id: "adventure-game", title: "Game phiêu lưu của riêng mình", description: "Tạo nhân vật, màn chơi, luật và phản hồi cho người chơi.", actions: ["Tạo nhân vật", "Thiết kế màn chơi", "Nghĩ luật"], image: "/assets/activity-world-building.png" },
    { id: "3d-world", title: "Thế giới 3D", description: "Xây môi trường, công trình và kể chuyện trong không gian số.", actions: ["Xây môi trường", "Thiết kế", "Kể chuyện"], image: "/assets/activity-visual-storytelling.png" },
    { id: "robot-explorer", title: "Robot thám hiểm", description: "Lắp ráp và giúp robot vượt qua thử thách.", actions: ["Lắp ráp", "Điều khiển", "Thử nghiệm"], image: "/assets/activity-robotics.png" }, sharedWebsite
  ],
  design: [
    { id: "visual-story", title: "Câu chuyện bằng hình ảnh", description: "Thiết kế nhân vật, storyboard và chuyển động.", actions: ["Vẽ nhân vật", "Kể chuyện", "Animation"], image: "/assets/activity-visual-storytelling.png" },
    { id: "3d-world", title: "Thế giới 3D", description: "Xây môi trường và kể chuyện trong không gian số.", actions: ["Xây môi trường", "Tạo hình", "Kể chuyện"], image: "/assets/activity-world-building.png" },
    { id: "interactive-story", title: "Câu chuyện tương tác", description: "Biến nhân vật thành trải nghiệm có thể khám phá.", actions: ["Tạo nhân vật", "Thiết kế", "Thử nghiệm"], image: "/assets/activity-problem-solving.png" }, sharedWebsite
  ],
  "digital-world": [
    { id: "3d-world", title: "Thế giới số của riêng mình", description: "Xây môi trường, công trình và những quy tắc thú vị.", actions: ["Lập kế hoạch", "Xây dựng", "Thử nghiệm"], image: "/assets/activity-world-building.png" },
    { id: "ai-helper", title: "Trợ lý AI học tập", description: "Thiết kế một trợ lý nhỏ biết hướng dẫn và gợi ý.", actions: ["Đặt câu hỏi", "Thiết kế", "Kiểm tra"], image: "/assets/activity-problem-solving.png" },
    { id: "smart-project", title: "Sản phẩm thông minh", description: "Kết hợp dữ liệu, cảm biến và ý tưởng giúp cuộc sống.", actions: ["Quan sát", "Kết nối", "Tự động hóa"], image: "/assets/activity-robotics.png" }, sharedWebsite
  ]
};

const label = (id: string) => labels[id] ?? id;
const selected = (answers: JourneyAnswers, step: string) => answers.selections[step] ?? [];

function scoreDiscovery(answers: JourneyAnswers) {
  const all = Object.values(answers.selections).flat();
  const score = (ids: string[]) => Math.min(10, 2 + ids.reduce((sum, id) => sum + (all.includes(id) ? 2 : 0), 0));
  return {
    interests: {
      game: score(["game", "digital-world"]), robotics: score(["robot", "experiment", "make"]),
      design: score(["design", "creative", "sketch"]), world_building: score(["game", "digital-world", "sketch"]),
      science: score(["robot", "research", "earth"]), communication: score(["talk", "team", "share", "community"])
    },
    creator_signals: {
      creativity: score(["creative", "ideas", "design"]), logic: score(["solve", "inspect", "research"]),
      persistence: score(["experiment", "retry", "persistent"]), planning: score(["sketch", "inspect", "guide"]),
      collaboration: score(["team", "ask", "talk", "share"])
    }
  };
}

export function getTags(answers: JourneyAnswers, steps: JourneyStep[]) {
  const ids = Object.values(answers.selections).flat();
  return [...new Set(steps.flatMap(step => step.options ?? []).filter(option => ids.includes(option.id)).flatMap(option => option.tags))];
}

export function createProfile(answers: JourneyAnswers) {
  const interests = selected(answers, "interest");
  const parent = selected(answers, "parent");
  const primary = interests[0] ?? "design";
  const archetype: Record<string, string> = { robot: "Nhà kiến tạo sáng tạo", game: "Nhà thiết kế thế giới", design: "Người kể chuyện sáng tạo", "digital-world": "Nhà kiến tạo tương lai" };
  const path: Record<string, [string, string, string]> = {
    robot: ["Robotics & công nghệ thông minh", "Lập trình & sáng tạo sản phẩm số", "Thiết kế và xây dựng thế giới"],
    game: ["Lập trình & sáng tạo sản phẩm số", "Thiết kế và xây dựng thế giới", "Robotics & công nghệ thông minh"],
    design: ["Thiết kế & kể chuyện số", "Lập trình sản phẩm tương tác", "Xây dựng thế giới 3D"],
    "digital-world": ["Xây dựng thế giới & sản phẩm số", "Lập trình & ứng dụng AI", "Robotics & công nghệ thông minh"]
  };
  const direction = path[primary];
  const rawTraits = [...selected(answers, "strength"), ...selected(answers, "creation-style"), ...selected(answers, "problem-strategy")].map(label);
  const traitCandidates = [...new Set(rawTraits)].slice(0, 5);
  const strengthLabels = answers.confirmedTraits?.length ? answers.confirmedTraits : traitCandidates;
  const interestLabels = interests.map(label);
  const parentLabels = parent.map(label);
  const parentSummary = parentLabels.length
    ? `Ba mẹ thấy ${answers.name || "con"} ${parentLabels.map(item => item.toLocaleLowerCase("vi")).join(", ")} trong những hoạt động mình yêu thích.`
    : `Ba mẹ đang tiếp tục quan sát cách ${answers.name || "con"} khám phá và giải quyết thử thách.`;
  const isPrimary = ["1-2", "3-5"].includes(answers.gradeBand);
  const projects = library[primary];
  const impact = selected(answers, "impact")[0] ?? "community";
  const portraitByInterest: Record<string, { styles: string[]; colors: string[]; gear: string[] }> = {
    robot: { styles: ["3D nhà phát minh nhỏ", "Cartoon kỹ sư khám phá", "Minh họa STEM hiện đại"], colors: ["Xanh ngọc TEKY", "Xanh dương khám phá", "Vàng năng lượng"], gear: ["Robot đồng hành", "Bộ dụng cụ sáng chế", "Kính khám phá thông minh"] },
    game: { styles: ["Phong cách game phiêu lưu", "3D nhà kiến tạo thế giới", "Cartoon pixel mềm mại"], colors: ["Xanh ngọc TEKY", "Tím sáng tạo", "Vàng năng lượng"], gear: ["Bản đồ thế giới số", "Tay cầm sáng tạo", "Balo nhà kiến tạo"] },
    design: { styles: ["Minh họa truyện tranh", "3D nghệ sĩ sáng tạo", "Cartoon kể chuyện"], colors: ["Vàng năng lượng", "Tím sáng tạo", "Xanh ngọc TEKY"], gear: ["Bút vẽ ánh sáng", "Máy tính bảng thiết kế", "Sổ ý tưởng"] },
    "digital-world": { styles: ["3D nhà khám phá tương lai", "Cartoon công nghệ hiện đại", "Minh họa thế giới số"], colors: ["Xanh dương khám phá", "Xanh ngọc TEKY", "Tím sáng tạo"], gear: ["Máy tính bảng thiết kế", "Bản đồ thế giới số", "Trợ lý AI nhỏ"] }
  };
  const futureSelfByImpact: Record<string, string> = {
    family: `người tạo ${projects[0].title.toLocaleLowerCase("vi")} để giúp gia đình`,
    school: "người biến việc học và chơi ở trường trở nên thú vị hơn",
    earth: "người dùng công nghệ để chăm sóc và bảo vệ Trái đất",
    community: "người tạo sản phẩm giúp mọi người kết nối và chia sẻ"
  };
  const portraitSuggestions = portraitByInterest[primary];
  const futureSelf = answers.futureSelf?.trim() || futureSelfByImpact[impact];
  const familySupport = selected(answers, "parent-support").map(label);
  return {
    archetype: archetype[primary], futureSelf, interestLabels, strengthLabels, traitCandidates, parentLabels, parentSummary, projects,
    portraitSuggestions: { ...portraitSuggestions, futureSelf: [futureSelfByImpact[impact], `người tạo ra ${projects[0].title.toLocaleLowerCase("vi")}`, "người luôn tò mò và biến ý tưởng thành điều hữu ích"] },
    familyReflection: {
      moment: answers.parentMoment?.trim(), support: familySupport,
      nextAction: selected(answers, "family-promise").map(label)[0] || "Cùng con chọn một dự án nhỏ để thử"
    },
    summary: `${answers.name || "Con"} thích biến ý tưởng thành sản phẩm${interestLabels.length ? `, hứng thú với ${interestLabels.join(", ").toLocaleLowerCase("vi")}` : ""} và thường tìm cách riêng để giải quyết một thử thách.`,
    directions: { featured: direction[0], tryNext: direction[1], exploreMore: direction[2] },
    tekPrograms: isPrimary ? ["Bé làm Game", "Khám phá Robotics", "Digi STEM Art"] : ["Siêu nhân lập trình", "Thế giới vạn vật thông minh", "Digi Style Multimedia"],
    roadmap: [
      { stage: "Chặng 1", title: "Khám phá", body: "Thử một game nhỏ, một sản phẩm 3D và một hoạt động robot." },
      { stage: "Chặng 2", title: "Tạo sản phẩm", body: "Chọn hướng con vẫn yêu thích và hoàn thành 2–3 project." },
      { stage: "Chặng 3", title: "Phát triển", body: "Đi sâu hơn và xây portfolio sản phẩm của riêng con." }
    ],
    characterBrief: {
      format: "Nhân vật minh họa toàn thân, thân thiện, phù hợp trẻ em; không tái tạo người thật",
      ageGroup: isPrimary ? "học sinh Tiểu học" : "học sinh THCS",
      identity: `${archetype[primary]} muốn trở thành ${futureSelf}`,
      style: answers.characterStyle || portraitSuggestions.styles[0],
      palette: answers.favoriteColor || portraitSuggestions.colors[0],
      signatureGear: answers.signatureGear || portraitSuggestions.gear[0],
      expression: "Tò mò, tự tin, ấm áp và sẵn sàng khám phá",
      background: "Nền sáng đơn giản, điểm nhấn công nghệ và dự án tương lai"
    },
    structuredData: {
      student_profile: { age_group: isPrimary ? "primary" : "lower_secondary", grade_band: answers.gradeBand, future_self: futureSelf, favorite_color: answers.favoriteColor },
      ...scoreDiscovery(answers), parent_observation: parent, parent_moment: answers.parentMoment, family_support: familySupport, family_promise: selected(answers, "family-promise"), confirmed_traits: strengthLabels,
      character_brief: { style: answers.characterStyle || portraitSuggestions.styles[0], signature_gear: answers.signatureGear || portraitSuggestions.gear[0], palette: answers.favoriteColor || portraitSuggestions.colors[0] },
      preferred_projects: projects.map(project => project.id), exploration_paths: direction
    }
  };
}

export type DiscoveryProfile = ReturnType<typeof createProfile>;

export function createPrompt(answers: JourneyAnswers) {
  const p = createProfile(answers);
  return `TẠO WEBSITE "FUTURE ME"

ĐỐI TƯỢNG
Học sinh ${["1-2", "3-5"].includes(answers.gradeBand) ? "Tiểu học" : "THCS"} và phụ huynh. Trải nghiệm tích cực, không mang cảm giác đánh giá hoặc dự đoán nghề nghiệp.

NHÂN VẬT
Tên hiển thị: ${answers.name || "Học sinh"}
Nhóm lớp: ${answers.gradeBand || "Chưa chọn"}
Future Creator Profile: ${p.archetype}
Con muốn trở thành: ${p.futureSelf}

CHARACTER IMAGE BRIEF
- Tạo một nhân vật đại diện mới bằng AI, không dùng ảnh thật và không cố tái tạo khuôn mặt của trẻ.
- Định dạng: ${p.characterBrief.format}.
- Độ tuổi thể hiện: ${p.characterBrief.ageGroup}.
- Hình tượng: ${p.characterBrief.identity}.
- Phong cách: ${p.characterBrief.style}.
- Bảng màu: ${p.characterBrief.palette}.
- Vật phẩm đặc trưng: ${p.characterBrief.signatureGear}.
- Biểu cảm: ${p.characterBrief.expression}.
- Bối cảnh: ${p.characterBrief.background}.
- Tạo nhân vật nhất quán để dùng ở hero, thẻ hồ sơ và các mốc roadmap.

GIỚI THIỆU
${p.summary}

ĐIỀU CON THÍCH
${p.interestLabels.map(item => `- ${item}`).join("\n")}

NHỮNG ĐIỂM ĐANG THỂ HIỆN
${p.strengthLabels.map(item => `- ${item}`).join("\n")}

GÓC NHÌN TỪ BA MẸ
${p.parentSummary}
${p.familyReflection.moment ? `Một khoảnh khắc ba mẹ nhớ về con: ${p.familyReflection.moment}` : ""}

CÁCH CẢ NHÀ SẼ ĐỒNG HÀNH
${p.familyReflection.support.map(item => `- ${item}`).join("\n")}
- Bước nhỏ đầu tiên: ${p.familyReflection.nextAction}

PROJECT TƯƠNG LAI
${p.projects.map((project, index) => `${index + 1}. ${project.title}: ${project.description}`).join("\n")}

HƯỚNG KHÁM PHÁ
- Hướng nổi bật: ${p.directions.featured}
- Hướng đáng thử thêm: ${p.directions.tryNext}
- Hướng nên có thêm trải nghiệm: ${p.directions.exploreMore}

ROADMAP
${p.roadmap.map(item => `- ${item.stage} — ${item.title}: ${item.body}`).join("\n")}
- Checkpoint sau mỗi chặng: Con vẫn rất thích / Con muốn học thêm / Con muốn thử thêm / Con muốn khám phá hướng khác.

YÊU CẦU WEBSITE
- Single page, responsive trên điện thoại, tablet và desktop.
- Phong cách TEKY: xanh ngọc, vàng, nền trắng sáng; vui nhưng không quá trẻ con.
- Hero có character của ${answers.name || "học sinh"}, lời giới thiệu và điều con muốn trở thành.
- Có About me, My strengths, Parent insight, Project showcase, Exploration directions và timeline roadmap.
- Dùng card lớn, icon thân thiện, typography tiếng Việt rõ ràng và animation nhẹ.
- Không hiển thị điểm số, phần trăm phù hợp, chẩn đoán năng lực hoặc khẳng định nghề nghiệp.
- Nhấn mạnh sở thích có thể thay đổi; mỗi chặng có checkpoint để gia đình cùng nhìn lại.
- CTA cuối: "Chọn dự án đầu tiên của con".`;
}
