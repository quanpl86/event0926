import type { FutureProject, JourneyAnswers, JourneyStep } from "@/types/journey";
import {
  ageGroupLabel,
  ageTier,
  appearanceAge,
  fillVoice,
  isPrimary,
  schoolLevel,
  you,
  You
} from "./age";
import { buildFigurinePrompt, FIGURINE } from "./figurine";
import {
  archetypeFor,
  directionsFor,
  futureSelfByImpact,
  lookFor,
  portraitFor,
  projectsFor,
  roadmapFor,
  tekProgramsFor,
  voiceLabel
} from "./age-content";

export type { FutureProject };

const selected = (answers: JourneyAnswers, step: string) => answers.selections[step] ?? [];
const label = (id: string, gradeBand: string) => voiceLabel(id, gradeBand, fillVoice);

function normalizeLine(text: string) {
  return text.trim().replace(/\s+/g, " ").toLocaleLowerCase("vi");
}

export function mergeFutureSelf(answers: JourneyAnswers, suggested: string) {
  const rewritten = answers.futureSelf?.trim() ?? "";
  const edited = Boolean(rewritten) && normalizeLine(rewritten) !== normalizeLine(suggested);
  return {
    suggestedFutureSelf: suggested,
    rewrittenFutureSelf: rewritten,
    futureSelf: edited ? rewritten : suggested,
    futureSelfSource: edited ? "student" as const : "suggested" as const
  };
}

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
  const gradeBand = answers.gradeBand;
  const tier = ageTier(gradeBand);
  const learner = you(gradeBand);
  const Learner = You(gradeBand);
  const fill = (text: string) => fillVoice(text, gradeBand);
  const interests = selected(answers, "interest");
  const parent = selected(answers, "parent");
  const primary = interests[0] ?? "design";
  const projects = projectsFor(tier, primary, fill);
  const direction = directionsFor(tier, primary);
  const portraitSuggestions = portraitFor(tier, primary);
  const look = lookFor(tier);
  const rawTraits = [...selected(answers, "strength"), ...selected(answers, "creation-style"), ...selected(answers, "problem-strategy")].map(id => label(id, gradeBand));
  const traitCandidates = [...new Set(rawTraits)].slice(0, 5);
  const strengthLabels = answers.confirmedTraits?.length ? answers.confirmedTraits : traitCandidates;
  const interestLabels = interests.map(id => label(id, gradeBand));
  const parentLabels = parent.map(id => label(id, gradeBand));
  const parentSummary = parentLabels.length
    ? `Ba mẹ thấy ${answers.name || "con"} ${parentLabels.map(item => item.toLocaleLowerCase("vi")).join(", ")} trong những hoạt động mình yêu thích.`
    : `Ba mẹ đang tiếp tục quan sát cách ${answers.name || "con"} khám phá và giải quyết thử thách.`;
  const impact = selected(answers, "impact")[0] ?? "community";
  const suggestedFutureSelf = futureSelfByImpact(impact, projects[0].title, gradeBand, fill);
  const { futureSelf, rewrittenFutureSelf, futureSelfSource } = mergeFutureSelf(answers, suggestedFutureSelf);
  const familySupport = selected(answers, "parent-support").map(id => label(id, gradeBand));
  const identity = `${archetypeFor(tier, primary)} muốn trở thành ${futureSelf}`;
  const style = answers.characterStyle || portraitSuggestions.styles[0];
  const palette = answers.favoriteColor || portraitSuggestions.colors[0];
  const signatureGear = answers.signatureGear || portraitSuggestions.gear[0];
  const imagePrompt = buildFigurinePrompt({
    identity,
    appearance: appearanceAge(gradeBand),
    expression: look.expression,
    style,
    palette,
    gear: signatureGear
  });
  const summaries: Record<typeof tier, string> = {
    g12: `${answers.name || Learner} thích làm ra những món ${learner} thấy vui${interestLabels.length ? `, đang thích ${interestLabels.join(", ").toLocaleLowerCase("vi")}` : ""} và hay tìm cách riêng khi gặp khó.`,
    g35: `${answers.name || Learner} thích biến ý tưởng thành sản phẩm${interestLabels.length ? `, hứng thú với ${interestLabels.join(", ").toLocaleLowerCase("vi")}` : ""} và thường tìm cách riêng để giải quyết một thử thách.`,
    g67: `${answers.name || Learner} thích biến ý tưởng thành sản phẩm${interestLabels.length ? `, đang hứng thú với ${interestLabels.join(", ").toLocaleLowerCase("vi")}` : ""} và có cách riêng để xử lý khi mọi thứ chưa chạy.`,
    g89: `${answers.name || Learner} đang định hình cách làm sản phẩm${interestLabels.length ? ` quanh ${interestLabels.join(", ").toLocaleLowerCase("vi")}` : ""} và thường tự tìm phương án khi gặp trở ngại.`
  };
  return {
    archetype: archetypeFor(tier, primary),
    futureSelf,
    suggestedFutureSelf,
    rewrittenFutureSelf,
    futureSelfSource,
    interestLabels,
    strengthLabels,
    traitCandidates,
    parentLabels,
    parentSummary,
    projects,
    gradeBand,
    tier,
    learner,
    Learner,
    portraitSuggestions: {
      ...portraitSuggestions,
      futureSelf: [
        futureSelfByImpact(impact, projects[0].title, gradeBand, fill),
        fill(`người tạo ra ${projects[0].title.toLocaleLowerCase("vi")}`),
        tier === "g12" ? fill("người hay tò mò và thích làm ra món mới") : "người luôn tò mò và biến ý tưởng thành điều hữu ích"
      ]
    },
    familyReflection: {
      moment: answers.parentMoment?.trim(),
      support: familySupport,
      nextAction: selected(answers, "family-mirror").map(id => label(id, gradeBand))[0] || fill("Cùng {child} chọn một dự án nhỏ để thử")
    },
    summary: summaries[tier],
    directions: { featured: direction[0], tryNext: direction[1], exploreMore: direction[2] },
    tekPrograms: tekProgramsFor(tier),
    roadmap: roadmapFor(tier, fill),
    look,
    characterBrief: {
      format: look.format,
      ageGroup: ageGroupLabel(gradeBand),
      appearance: appearanceAge(gradeBand),
      identity,
      style,
      palette,
      signatureGear,
      expression: look.expression,
      background: look.background,
      forbid: look.forbid,
      imagePrompt
    },
    structuredData: {
      student_profile: {
        age_group: isPrimary(gradeBand) ? "primary" : "lower_secondary",
        grade_band: gradeBand,
        age_tier: tier,
        address: learner,
        future_self: futureSelf,
        suggested_future_self: suggestedFutureSelf,
        rewritten_future_self: rewrittenFutureSelf,
        future_self_source: futureSelfSource,
        favorite_color: answers.favoriteColor
      },
      ...scoreDiscovery(answers),
      parent_observation: parent,
      parent_moment: answers.parentMoment,
      family_support: familySupport,
      family_promise: selected(answers, "family-mirror"),
      confirmed_traits: strengthLabels,
      portrait_agree: answers.portraitAgree,
      parent_portrait_fit: answers.parentPortraitFit,
      character_brief: {
        style,
        signature_gear: signatureGear,
        palette,
        appearance: appearanceAge(gradeBand),
        image_prompt: imagePrompt
      },
      preferred_projects: projects.map(project => project.id),
      exploration_paths: direction
    }
  };
}

export type DiscoveryProfile = ReturnType<typeof createProfile>;

export function createPrompt(answers: JourneyAnswers) {
  const p = createProfile(answers);
  const learner = p.learner;
  const Learner = p.Learner;
  const look = p.look;
  return `TẠO WEBSITE "FUTURE ME"

ĐỐI TƯỢNG
Học sinh ${schoolLevel(answers.gradeBand)} — ${p.characterBrief.ageGroup} — và phụ huynh.
Trải nghiệm tích cực, không mang cảm giác đánh giá hoặc dự đoán nghề nghiệp.

CÁCH XƯNG HÔ (BẮT BUỘC)
${look.addressRule}
Tên hiển thị: ${answers.name || "Học sinh"}
Nhóm lớp: ${answers.gradeBand || "Chưa chọn"} (${p.characterBrief.ageGroup})

NHÂN VẬT
Future Creator Profile: ${p.archetype}
${Learner} muốn trở thành: ${p.futureSelf}
${p.futureSelfSource === "student"
  ? `${Learner} đã sửa câu gợi ý của Kitten Bot. Câu ban đầu: "${p.suggestedFutureSelf}". Dùng đúng câu ${learner} viết, không dùng câu gốc.`
  : answers.portraitAgree === "almost" || answers.portraitAgree === "not-yet"
    ? `${Learner} thấy câu này ${answers.portraitAgree === "almost" ? "gần đúng" : "chưa giống lắm"} và chưa viết lại. Dùng câu gợi ý như điểm xuất phát, không khẳng định đây là nghề nghiệp.`
    : ""}

ẢNH NHÂN VẬT (BẮT BUỘC — FIGURINE 3D, KHÔNG PHẢI ẢNH 2D)
Tạo 1 ảnh nhân vật đại diện mới. Đây phải là ảnh render mô hình đồ chơi sưu tầm 3D, như chụp sản phẩm art toy. KHÔNG minh họa phẳng, KHÔNG ghép shape/icon/vector 2D.

Ghép đúng 6 thành phần:
1. Phong cách: ${FIGURINE.style}
2. Nhân vật & tỉ lệ: ${p.characterBrief.identity}; ${p.characterBrief.appearance}; ${FIGURINE.proportion}
3. Trang phục / phụ kiện: ${p.characterBrief.style}; bảng màu ${p.characterBrief.palette}; vật phẩm ${p.characterBrief.signatureGear}; biểu cảm ${p.characterBrief.expression}
4. Chất liệu mô hình: ${FIGURINE.material}
5. Đế trưng bày: ${FIGURINE.base}
6. Ánh sáng & render: ${FIGURINE.light}

PROMPT ẢNH — copy nguyên cụm này khi generate image:
${p.characterBrief.imagePrompt}

Dùng cùng một nhân vật (cùng khuôn mặt chibi, cùng phụ kiện, cùng đế) ở hero, thẻ hồ sơ và roadmap.
CẤM: ${p.characterBrief.forbid}.

GIỚI THIỆU
${p.summary}

ĐIỀU ${Learner.toUpperCase()} THÍCH
${p.interestLabels.map(item => `- ${item}`).join("\n")}

NHỮNG ĐIỂM ĐANG THỂ HIỆN
${p.strengthLabels.map(item => `- ${item}`).join("\n")}

PHẢN HỒI CHÂN DUNG
${Learner} thấy câu "muốn trở thành": ${answers.portraitAgree === "yes" ? "đúng rồi" : answers.portraitAgree === "almost" ? "gần đúng" : answers.portraitAgree === "not-yet" ? "chưa giống lắm" : "chưa nói"}
Ba mẹ thấy chân dung: ${answers.parentPortraitFit === "very" ? "rất giống con" : answers.parentPortraitFit === "partly" ? "giống một phần" : answers.parentPortraitFit === "not-yet" ? "chưa giống lắm" : "chưa nói"}

GÓC NHÌN TỪ BA MẸ
${p.parentSummary}
${p.familyReflection.moment ? `Một khoảnh khắc ba mẹ nhớ về ${learner}: ${p.familyReflection.moment}` : ""}

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
- Sau mỗi lần thử, cả nhà hỏi nhau: ${Learner} vẫn rất thích / ${Learner} muốn học thêm / ${Learner} muốn thử thêm / ${Learner} muốn khám phá hướng khác.

YÊU CẦU WEBSITE
- Single page, responsive trên điện thoại, tablet và desktop.
- Phong cách TEKY: xanh ngọc, vàng, nền trắng sáng.
- ${look.websiteLook}
- Hero dùng ảnh figurine 3D Pixar của ${answers.name || "học sinh"} (vinyl art toy trên đế tròn), lời giới thiệu và điều ${learner} muốn trở thành. Không thay nhân vật bằng icon, shape 2D hay mascot vector.
- Có About me, My strengths, Parent insight, Project showcase, Exploration directions và timeline roadmap.
- Dùng card lớn, icon thân thiện, typography tiếng Việt rõ ràng và animation nhẹ.
- Không hiển thị điểm số, phần trăm phù hợp, chẩn đoán năng lực hoặc khẳng định nghề nghiệp.
- Nhấn mạnh sở thích có thể thay đổi; mỗi chặng có checkpoint để gia đình cùng nhìn lại.
- CTA cuối: "${isPrimary(answers.gradeBand) ? `Chọn dự án đầu tiên của ${learner}` : `Chọn dự án ${learner} muốn làm tiếp`}".`;
}
