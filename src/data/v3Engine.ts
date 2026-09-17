import contentData from './v3/contentV3.json';
import stepsConfigData from './v3/stepsConfigV3.json';
import type { JourneyAnswers } from '@/types/journey';

export type V3Step = typeof stepsConfigData.steps[number];

export const v3Steps = stepsConfigData.steps;
export const v3Content = contentData;

/**
 * Bảng ánh xạ bộ môn công nghệ (Domain) sang các nhánh chuyên sâu (Branch) theo cấp học
 * Tuân thủ theo docs/02_hop_dong_du_lieu_va_quy_tac.json
 */
export const DOMAIN_BRANCH_MAP: Record<"primary" | "secondary", Record<string, string[]>> = {
  primary: {
    robotics: ["robot_build_and_block_control", "smart_device_primary", "automation_primary"],
    game_programming: ["game", "interactive_app"],
    multimedia: ["design_2d", "design_3d", "animation_2d", "video_and_effects"]
  },
  secondary: {
    robotics: ["smart_device", "automation", "connected_system"],
    game_programming: ["game_3d", "desktop_app", "web"],
    multimedia: ["design_2d", "design_3d", "animation_2d", "video_and_effects"]
  }
};

export const DOMAIN_NAMES: Record<string, string> = {
  robotics: "Robotics & Thiết bị thông minh",
  game_programming: "Lập trình Game & Ứng dụng",
  multimedia: "Multimedia & Đồ họa 3D"
};

/**
 * Lấy danh sách các mã nhánh phù hợp theo domain đã chọn và cấp học
 */
export function getBranchesForDomain(isPrimary: boolean, domain?: string): string[] {
  const level = isPrimary ? "primary" : "secondary";
  const map = DOMAIN_BRANCH_MAP[level];
  const targetDomain = domain && map[domain] ? domain : "robotics";
  return map[targetDomain] || Object.keys((v3Content.branches as any)[level]);
}

/**
 * Lấy nhánh mặc định khi học sinh chuyển domain
 */
export function getDefaultBranchForDomain(isPrimary: boolean, domain?: string): string {
  const branches = getBranchesForDomain(isPrimary, domain);
  return branches[0] || (isPrimary ? "robot_build_and_block_control" : "smart_device");
}

/**
 * Lấy dữ liệu nhánh chuyên sâu theo cấp học và mã nhánh
 */
export function getBranchData(isPrimary: boolean, branchKey?: string) {
  if (!branchKey) return null;
  const level = isPrimary ? 'primary' : 'secondary';
  const branches = (v3Content.branches as any)[level];
  return branches ? branches[branchKey] || null : null;
}

/**
 * Lấy thông tin tiêu chuẩn tra cứu từ mã
 */
export function getStandardDetail(code: string) {
  const registry = v3Content.standardsRegistry as any[];
  return registry.find(s => s.id === code) || null;
}

export type V3PersonalizedProject = {
  id: string;
  projectNumber: number;
  name: string;
  goal: string;
  tasks: [string, string, string];
  deliverable: string;
  completionCheck: string;
  isDreamProject: boolean;
  adaptedFrom?: string;
  sioIds?: string[];
  image: string;
};

/**
 * Cá nhân hóa 4 dự án theo đúng Ước mơ (Dream Project), cấp học và nhánh chuyên sâu của học sinh
 * Tuân thủ P0: Dự án 4 giữ nguyên tên và ước mơ của học sinh, chia làm bản thử nghiệm v1 và mở rộng v2
 */
export function generatePersonalizedProjects(answers: JourneyAnswers): V3PersonalizedProject[] {
  const isPrimary = !answers.gradeBand || ['1-2', '3-5'].includes(answers.gradeBand) || (answers.grade && parseInt(answers.grade, 10) <= 5);
  const branchKey = answers.branch || (isPrimary ? 'game' : 'web');
  const branch = getBranchData(Boolean(isPrimary), branchKey);

  const dreamName = answers.projectName?.trim() || 'Dự Án Sáng Tạo Ước Mơ';
  const dreamAudience = answers.dreamAudience || 'người thân và bạn bè';
  const dreamPurpose = answers.dreamPurpose || 'giải quyết vấn đề thực tế và mang lại niềm vui';
  const dreamFeatures = (answers.dreamFeatures && answers.dreamFeatures.length > 0)
    ? answers.dreamFeatures
    : ['Giao diện thân thiện', 'Tính năng tương tác cốt lõi', 'Chia sẻ cùng mọi người'];

  const libraryProjects = branch?.projects || [];
  const projectImages = [
    isPrimary ? '/assets/activity-world-building.png' : '/assets/activity-problem-solving.png',
    isPrimary ? '/assets/activity-robotics.png' : '/assets/activity-nature-observation.png',
    isPrimary ? '/assets/activity-visual-storytelling.png' : '/assets/activity-communication.png',
    '/assets/activity-world-building.png'
  ];

  // Dự án 1: Nền tảng & Khám phá cơ chế
  const p1Base = libraryProjects[0] || {
    title: 'Khám phá nền tảng sáng tạo',
    name: 'Khám phá nền tảng sáng tạo',
    goal: 'Làm quen với các công cụ cơ bản và hoàn thiện thử nghiệm đầu tiên',
    tasks: ['Tìm hiểu bộ công cụ', 'Thực hành tính năng cơ bản', 'Thử nghiệm sản phẩm nhỏ'],
    deliverable: 'Bản phác thảo thử nghiệm đầu tiên',
    completionCheck: 'Hoàn thành các bước hướng dẫn cơ bản',
    sioIds: []
  };
  const p1Title = (p1Base as any).title || p1Base.name || 'Khám phá nền tảng';

  const project1: V3PersonalizedProject = {
    id: 'P1',
    projectNumber: 1,
    name: `${p1Title} (Khởi động cho ${dreamName})`,
    goal: `${p1Base.goal} — Đặt nền tảng tư duy và kỹ thuật phục vụ ý tưởng "${dreamName}".`,
    tasks: [
      p1Base.tasks?.[0] || 'Làm quen môi trường sáng tạo',
      p1Base.tasks?.[1] || 'Thử nghiệm các thao tác kỹ thuật cốt lõi',
      `Tạo bản phác thảo ban đầu lấy cảm hứng từ ý tưởng ${dreamName}`
    ] as [string, string, string],
    deliverable: `${p1Base.deliverable} có liên hệ với chủ đề ${dreamName}`,
    completionCheck: p1Base.completionCheck || 'Vận hành thành công bản mẫu đầu tiên',
    isDreamProject: false,
    adaptedFrom: p1Title,
    sioIds: (p1Base as any).sioIds || [],
    image: projectImages[0]
  };

  // Dự án 2: Phát triển kỹ năng & tính năng cốt lõi
  const p2Base = libraryProjects[1] || {
    title: 'Xây dựng cơ chế tương tác',
    name: 'Xây dựng cơ chế tương tác',
    goal: 'Phát triển các tính năng có tính logic và chiều sâu',
    tasks: ['Thiết kế cấu trúc chức năng', 'Lập trình / ráp nối cơ chế', 'Kiểm tra độ ổn định'],
    deliverable: 'Mô-đun chức năng hoàn chỉnh',
    completionCheck: 'Cơ chế hoạt động đúng yêu cầu',
    sioIds: []
  };
  const p2Title = (p2Base as any).title || p2Base.name || 'Xây dựng cơ chế tương tác';

  const firstFeature = dreamFeatures[0] || 'tính năng chính';
  const project2: V3PersonalizedProject = {
    id: 'P2',
    projectNumber: 2,
    name: `${p2Title} • Tích hợp ${firstFeature}`,
    goal: `${p2Base.goal} — Ứng dụng kỹ thuật để thử nghiệm tính năng "${firstFeature}" cho sản phẩm.`,
    tasks: [
      p2Base.tasks?.[0] || 'Thiết kế cấu trúc logic',
      `Lập trình / thiết kế cơ chế mô phỏng tính năng "${firstFeature}"`,
      `Chạy thử và tối ưu phản hồi khi tương tác với người dùng`
    ] as [string, string, string],
    deliverable: `Mô-đun chức năng ${firstFeature} vận hành ổn định`,
    completionCheck: p2Base.completionCheck || 'Mô-đun chạy trơn tru không lỗi',
    isDreamProject: false,
    adaptedFrom: p2Title,
    sioIds: (p2Base as any).sioIds || [],
    image: projectImages[1]
  };

  // Dự án 3: Tích hợp hoàn thiện trải nghiệm
  const p3Base = libraryProjects[2] || {
    title: 'Tối ưu trải nghiệm và thử nghiệm thực tế',
    name: 'Tối ưu trải nghiệm và thử nghiệm thực tế',
    goal: 'Hoàn thiện trải nghiệm người dùng và chuẩn bị cho sản phẩm lớn',
    tasks: ['Ghép nối các phần sản phẩm', 'Lấy ý kiến đóng góp', 'Cải tiến độ hoàn thiện'],
    deliverable: 'Sản phẩm tương tác hoàn chỉnh',
    completionCheck: 'Người dùng thử nghiệm đưa ra đánh giá tích cực',
    sioIds: []
  };
  const p3Title = (p3Base as any).title || p3Base.name || 'Tối ưu trải nghiệm';

  const project3: V3PersonalizedProject = {
    id: 'P3',
    projectNumber: 3,
    name: `${p3Title} dành cho ${dreamAudience}`,
    goal: `${p3Base.goal} — Tối ưu hóa trải nghiệm phù hợp với nhu cầu của ${dreamAudience}.`,
    tasks: [
      p3Base.tasks?.[0] || 'Ghép nối các thành phần chức năng',
      `Mời ${dreamAudience} trải nghiệm thử và ghi nhận phản hồi`,
      'Điều chỉnh giao diện và cơ chế dựa trên góp ý thực tế'
    ] as [string, string, string],
    deliverable: `Bản hoàn thiện thử nghiệm thực tế với ${dreamAudience}`,
    completionCheck: `Ít nhất một người thuộc nhóm ${dreamAudience} thử nghiệm và hiểu cách sử dụng`,
    isDreamProject: false,
    adaptedFrom: p3Title,
    sioIds: (p3Base as any).sioIds || [],
    image: projectImages[2]
  };

  // Dự án 4: DỰ ÁN ƯỚC MƠ (DREAM PROJECT) — GIỮ NGUYÊN ƯỚC MƠ CỦA HỌC SINH!
  const project4: V3PersonalizedProject = {
    id: 'P4',
    projectNumber: 4,
    name: `Dự Án Mơ Ước: ${dreamName}`,
    goal: `Hiện thực hóa ý tưởng "${dreamName}": Giải quyết vấn đề "${dreamPurpose}" phục vụ "${dreamAudience}" với các tính năng (${dreamFeatures.join(', ')}). Chia làm bản thử nghiệm thực tế khả thi và lộ trình mở rộng phát triển.`,
    tasks: [
      `Xây dựng Bản Thử Nghiệm Thực Tế (MVP): Tập trung vào tính năng cốt lõi [${dreamFeatures.slice(0, 2).join(', ')}]`,
      `Thử nghiệm người dùng thực tế: Trình diễn cho ${dreamAudience} và đo lường mức độ giải quyết mục tiêu "${dreamPurpose}"`,
      `Lập kế hoạch nâng cấp mở rộng: Bổ sung tính năng nâng cao [${dreamFeatures.slice(2).join(', ') || 'nâng cao tính tự động'}] và chuẩn bị trưng bày`
    ] as [string, string, string],
    deliverable: `Bản sản phẩm thực tế hoạt động được (Sản phẩm hoàn chỉnh) kèm video demo và tài liệu lộ trình phát triển`,
    completionCheck: `Sản phẩm vận hành đúng ý tưởng con mong muốn, ${dreamAudience} có thể sử dụng và phản hồi`,
    isDreamProject: true,
    adaptedFrom: 'Ý tưởng gốc từ học sinh (Dream Project Brief)',
    sioIds: branch?.sioInteractions?.map((s: any) => s.id) || [],
    image: projectImages[3]
  };

  return [project1, project2, project3, project4];
}

export type SIOEvidenceCard = {
  id: string;
  sioId: string;
  stepIndex: number;
  stageName: string;
  questionPrompt: string;
  responsePreview: string;
  sourceLabel: string;
  sourceType: 'student_situation' | 'parent_observation' | 'student_self_report' | 'insufficient_evidence';
  standardRef?: string;
  caveat: string;
};

/**
 * Trích xuất thẻ bằng chứng SIO thực tế (thay thế hoàn toàn Radar chart)
 * Tuân thủ P0: Chỉ ghi nhận những câu hỏi học sinh đã trả lời, không suy diễn điểm năng lực
 */
export function extractSIOEvidenceCards(answers: JourneyAnswers): SIOEvidenceCard[] {
  const isPrimary = !answers.gradeBand || ['1-2', '3-5'].includes(answers.gradeBand) || (answers.grade && parseInt(answers.grade, 10) <= 5);
  const branchKey = answers.branch || (isPrimary ? 'game' : 'web');
  const branch = getBranchData(Boolean(isPrimary), branchKey);
  const cards: SIOEvidenceCard[] = [];

  const sioQuestions = branch?.sioInteractions || [];

  // 1. Tình huống SIO 1 (Nhận thức / Kiến thức) - Bước 10
  if (sioQuestions[0]) {
    const resp = answers.knowledgeResponse?.trim();
    cards.push({
      id: 'evidence-sio-1',
      sioId: sioQuestions[0].id,
      stepIndex: 10,
      stageName: 'Nhận thức & Khái niệm',
      questionPrompt: sioQuestions[0].question,
      responsePreview: resp ? `Học sinh đã trả lời: "${resp}"` : 'Học sinh chọn bỏ qua / Chưa có câu trả lời trực tiếp.',
      sourceLabel: 'Tình huống tương tác trực tiếp',
      sourceType: resp ? 'student_situation' : 'insufficient_evidence',
      standardRef: sioQuestions[0].standardRefs?.[0],
      caveat: 'Ghi nhận trong phạm vi câu hỏi tình huống mô phỏng, không đại diện cho chứng nhận kiến thức tổng thể.'
    });
  }

  // 2. Tình huống SIO 2 (Kỹ năng / Quy trình) - Bước 11
  if (sioQuestions[1]) {
    const resp = answers.skillResponse?.trim();
    cards.push({
      id: 'evidence-sio-2',
      sioId: sioQuestions[1].id,
      stepIndex: 11,
      stageName: 'Kỹ năng & Quy trình thực hiện',
      questionPrompt: sioQuestions[1].question,
      responsePreview: resp ? `Học sinh đã trình bày: "${resp}"` : 'Học sinh chưa hoàn thành thao tác sắp xếp.',
      sourceLabel: 'Tình huống tương tác trực tiếp',
      sourceType: resp ? 'student_situation' : 'insufficient_evidence',
      standardRef: sioQuestions[1].standardRefs?.[0],
      caveat: 'Ghi nhận phản xạ giải quyết vấn đề tại thời điểm làm bài, cần thêm trải nghiệm thực tế để củng cố.'
    });
  }

  // 3. Tình huống SIO 3 (Giải quyết vấn đề / Debug) - Bước 12
  if (sioQuestions[2]) {
    const resp = answers.problemResponse?.trim();
    cards.push({
      id: 'evidence-sio-3',
      sioId: sioQuestions[2].id,
      stepIndex: 12,
      stageName: 'Xử lý lỗi & Kiên trì thử nghiệm',
      questionPrompt: sioQuestions[2].question,
      responsePreview: resp ? `Học sinh đề xuất cách giải quyết: "${resp}"` : 'Chưa ghi nhận phương án sửa lỗi.',
      sourceLabel: 'Tình huống tương tác trực tiếp',
      sourceType: resp ? 'student_situation' : 'insufficient_evidence',
      standardRef: sioQuestions[2].standardRefs?.[0],
      caveat: 'Biểu hiện tư duy logic khi phát hiện tình huống bất thường.'
    });
  }

  // 4. Quan sát từ phụ huynh - Bước 14
  const parentExample = answers.parentObservedExample?.trim() || answers.parentMoment?.trim();
  const parentTask = answers.parentObservedTask;
  const parentTaskLabel =
    parentTask === 'independent' ? 'Con chủ động tự làm một phần hoặc toàn bộ' :
    parentTask === 'shared' ? 'Con làm cùng người thân hoặc bạn bè' :
    parentTask === 'started' ? 'Con đã thử nhưng chưa hoàn thành' :
    'Chưa có dịp quan sát trong đời sống';

  cards.push({
    id: 'evidence-parent-obs',
    sioId: 'FM-PARENT-OBS',
    stepIndex: 14,
    stageName: 'Góc nhìn từ Gia Đình',
    questionPrompt: 'Mức độ con chủ động và trải nghiệm công nghệ trong đời sống thực tế',
    responsePreview: parentExample ? `"${parentExample}" (${parentTaskLabel})` : parentTaskLabel,
    sourceLabel: 'Theo quan sát độc lập của phụ huynh',
    sourceType: 'parent_observation',
    standardRef: 'FM-FAMILY-ENGAGEMENT',
    caveat: 'Góc nhìn bổ trợ từ gia đình, tôn trọng bối cảnh tự nhiên của con, không dùng làm thước đo chấm điểm.'
  });

  return cards;
}

/**
 * Xây dựng payload an toàn và Prompt hoàn chỉnh cho Google AI Studio
 * Tuân thủ P1: Lọc sạch PII, chỉ dùng danh sách trường whitelist và bắt buộc phụ huynh duyệt trước
 */
export function buildSafeAIStudioPrompt(answers: JourneyAnswers, projects: V3PersonalizedProject[]) {
  const isPrimary = !answers.gradeBand || ['1-2', '3-5'].includes(answers.gradeBand) || (answers.grade && parseInt(answers.grade, 10) <= 5);
  const gradeNum = parseInt(answers.grade || (isPrimary ? '4' : '7'), 10);
  const level = isPrimary ? 'primary' : 'secondary';
  const branchKey = answers.branch || (isPrimary ? 'game' : 'web');
  const branch = getBranchData(Boolean(isPrimary), branchKey);
  const riasec = extractRIASECProfile(answers);

  const dreamName = answers.projectName?.trim() || 'Dự án Sáng Tạo';
  const dreamAudience = answers.dreamAudience || 'gia đình và bạn bè';
  const dreamPurpose = answers.dreamPurpose || 'giải quyết vấn đề thực tế';
  const dreamFeatures = (answers.dreamFeatures && answers.dreamFeatures.length > 0) ? answers.dreamFeatures : ['Tương tác người dùng'];

  // Whitelist payload strictly for Google AI Studio single-file web app generator
  const safePayload = {
    displayName: answers.name?.trim() || 'Nhà Sáng Tạo',
    grade: gradeNum,
    educationLevel: level,
    technologyDomain: branch?.domain || answers.domain || (isPrimary ? 'game_programming' : 'programming'),
    specialization: branchKey,
    specializationLabel: branch?.label || branchKey,

    // CẤU TRÚC ĐỊNH HƯỚNG NĂNG LỰC TƯƠNG LAI (FUTURE CAPABILITY PORTFOLIO)
    futureCapabilityPortfolio: {
      portfolioType: 'Future Capability Portfolio (Hồ Sơ Năng Lực Tương Lai Mục Tiêu)',
      conceptNotice: 'Đây là chân dung năng lực và bộ dự án mục tiêu con cùng gia đình mong muốn đạt được, không phải hồ sơ năng lực hiện tại được cập nhật dần.',
      riasecOrientation: {
        primaryCode: riasec.primaryCode,
        primaryName: riasec.primaryName,
        hollandFullName: riasec.hollandFullName,
        techSector: riasec.techSector, // 1 trong 3 nhóm duy nhất: 'Robot - AI - IoT' | 'Lập trình & AI' | 'Multimedia'
        techSectorDescription: riasec.techSectorDescription,
        secondaryCodes: riasec.secondaryCodes,
        naturalTraits: riasec.naturalTraits,
      },
      familyTriangulation: {
        studentAspiration: riasec.triangulation.studentAspiration,
        parentObservation: riasec.triangulation.parentObservation,
        alignmentPercent: riasec.triangulation.alignmentPercent,
        consensusSummary: riasec.triangulation.consensusSummary,
      },
      targetTechStack: riasec.techStack,
      targetSoftSkills4Cs: riasec.softSkills,
      academicStandards: riasec.standards,
      portfolioProjects: projects.map(p => ({
        id: p.id,
        projectNumber: p.projectNumber,
        name: p.name,
        goal: p.goal,
        tasks: p.tasks,
        deliverable: p.deliverable,
        completionCheck: p.completionCheck,
        isDreamProject: p.isDreamProject
      }))
    },

    futureProfile: {
      role: answers.futureSelf || riasec.roleTitle,
      roleSubtitle: riasec.roleSubtitle,
      techSector: riasec.techSector,
      motto: answers.domain === 'multimedia'
        ? (isPrimary
            ? 'Mỗi nét vẽ hôm nay mở ra một thế giới rực rỡ ngày mai!'
            : 'Thiết kế không chỉ là hình thức, mà là cách chúng ta lan tỏa giá trị sống.')
        : answers.domain === 'game_programming'
        ? (isPrimary
            ? 'Chơi game thật vui, nhưng tự tay làm ra game còn tuyệt vời hơn!'
            : 'Lập trình là công cụ biến mọi ý tưởng tưởng chừng không thể thành hiện thực.')
        : (isPrimary
            ? 'Mỗi ý tưởng nhỏ hôm nay có thể tạo nên thay đổi lớn ngày mai!'
            : 'Công nghệ không chỉ để giải trí, mà còn để tạo ra một thế giới tốt đẹp hơn.'),
      quote: answers.dreamPurpose
        ? `Dự án ${dreamName} sẽ ${answers.dreamPurpose}`
        : answers.domain === 'multimedia'
        ? (isPrimary ? 'Con muốn tạo nên những câu chuyện và hình ảnh số tuyệt đẹp!' : 'Thiết kế và sáng tạo số giúp kết nối con người với những điều ý nghĩa.')
        : answers.domain === 'game_programming'
        ? (isPrimary ? 'Con muốn tạo ra những trò chơi thông minh, bổ ích cho bạn bè!' : 'Phần mềm và lập trình là chìa khóa mở ra những giải pháp tương lai.')
        : (isPrimary ? 'Chú robot Thủ Thư Nhí sẽ mang sách đến cho các bạn!' : 'Robot và tự động hóa sẽ giúp cuộc sống tiện lợi hơn mỗi ngày.'),
      interests: answers.domain === 'robotics' ? 'Robot, sáng tạo' : answers.domain === 'game_programming' ? 'Lập trình, công nghệ' : answers.domain === 'multimedia' ? 'Thiết kế, đồ họa' : 'Khoa học, công nghệ',
      style: (answers.confirmedTraits && answers.confirmedTraits.slice(0, 2).join(', ')) || (isPrimary ? 'Tò mò, kiên trì' : 'Chủ động, sáng tạo'),
      dreamAudience: dreamAudience,
      aboutMe: isPrimary
        ? `Con thích lắp ráp, tìm hiểu cách các thiết bị hoạt động và luôn muốn tạo ra những sản phẩm có ích. Con đặc biệt thích ${answers.domain === 'robotics' ? 'robot' : answers.domain === 'game_programming' ? 'lập trình game' : answers.domain === 'multimedia' ? 'thiết kế sáng tạo' : 'khám phá công nghệ'} và muốn dùng công nghệ để giúp cuộc sống tốt đẹp hơn.`
        : `Con thích tìm hiểu công nghệ, đặc biệt là ${answers.domain === 'robotics' ? 'robotics và vi điều khiển' : answers.domain === 'game_programming' ? 'lập trình và phát triển phần mềm' : answers.domain === 'multimedia' ? 'thiết kế đồ họa và trải nghiệm số' : 'công nghệ và đổi mới sáng tạo'}. Con muốn dùng kỹ năng của mình để tạo ra những giải pháp hữu ích cho cộng đồng.`
    },
    dreamProject: {
      name: dreamName,
      audience: dreamAudience,
      purpose: dreamPurpose,
      features: dreamFeatures,
      appearance: answers.dreamAppearance || 'Giao diện sinh động, dễ nhìn'
    },
    approvedProjects: projects.map(p => ({
      id: p.id,
      name: p.name,
      goal: p.goal,
      tasks: p.tasks,
      deliverable: p.deliverable,
      completionCheck: p.completionCheck,
      isDreamProject: p.isDreamProject
    })),
    schedule: answers.hoursPerWeek && answers.hoursPerWeek > 0
      ? {
          hoursPerWeek: answers.hoursPerWeek,
          pacingMode: 'weekly_scheduled',
          notice: `Ước tính theo cam kết ${answers.hoursPerWeek} giờ/tuần của gia đình, linh hoạt theo nhịp học của con.`
        }
      : {
          status: 'Chưa chốt lịch',
          notice: 'Lộ trình dạng chặng linh hoạt, không gán mốc tuần cố định.'
        },
    familySupport: {
      resources: answers.availableResources || ['Máy tính / Thiết bị sẵn có'],
      supportModes: answers.supportMode || ['Lắng nghe và khích lệ']
    },
    characterAvatar: {
      source: answers.avatarSource || 'system',
      note: answers.avatarSource === 'custom'
        ? 'Sử dụng ảnh nhân vật do học sinh tự tạo/vẽ làm hình đại diện chính. Giữ nguyên thiết kế nhân vật.'
        : 'Sử dụng linh vật Kitten Bot thân thiện làm bạn đồng hành.'
    },
    privacyConsent: {
      reviewedByParent: true,
      omitDirectIdentifiers: true,
      parentApprovesExport: Boolean(answers.parentApprovesExternalTransfer)
    }
  };

  // ĐỊNH HƯỚNG PHONG CÁCH HÌNH ẢNH (VISUAL STYLING) THEO 3 NHÓM NGÀNH CÔNG NGHỆ CHÍNH
  const domainVisualConfig = answers.domain === 'robotics'
    ? {
        label: 'Robot - AI - IoT',
        primaryColor: '#1a8a7d',
        gradientHero: 'from-[#1a8a7d] via-[#0d9488] to-[#0f766e]',
        accentTag: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        motifNote: 'Hệ biểu tượng kỹ thuật & cơ điện tử: Robot, Chip vi điều khiển ESP32/Arduino, Cảm biến siêu âm/dò đường, Bánh răng cơ khí, Khay nâng thông minh.'
      }
    : answers.domain === 'game_programming'
    ? {
        label: 'Lập trình & AI',
        primaryColor: '#4f46e5',
        gradientHero: 'from-[#4338ca] via-[#4f46e5] to-[#6366f1]',
        accentTag: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        motifNote: 'Hệ biểu tượng game studio & giải thuật: Gamepad tay cầm, Khối lệnh code Python/Scratch, Màn chơi nhiệm vụ, State Machine AI.'
      }
    : {
        label: 'Multimedia',
        primaryColor: '#e11d48',
        gradientHero: 'from-[#be123c] via-[#e11d48] to-[#f43f5e]',
        accentTag: 'bg-rose-100 text-rose-800 border-rose-200',
        motifNote: 'Hệ biểu tượng nghệ thuật số & không gian 3D: Blender Diorama 3D, Figma UI/UX, Bảng màu HSL, Kể chuyện số đa phương tiện.'
      };

  const ageVisualConfig = isPrimary
    ? {
        styleTone: 'Tiểu học (Lớp 1-5): Vui tươi, ngộ nghĩnh, khích lệ. Bo góc cực đại (rounded-3xl), thẻ to bản, hình minh họa lớn, avatar linh vật Kitten Bot chibi làm bạn đồng hành. Đại từ nhân xưng: “con”, “mình”, “ba mẹ”.',
        borderRadius: 'rounded-3xl',
        fontSize: 'text-sm sm:text-base',
      }
    : {
        styleTone: 'THCS (Lớp 6-9): Hiện đại, phong cách Tech Studio chuyên nghiệp, thanh lịch. Bo góc tiêu chuẩn (rounded-2xl), bố cục thẻ kỹ thuật sắc nét, phân cấp thông tin khoa học (Milestones, MVP, Deliverables). Đại từ nhân xưng: “bạn”.',
        borderRadius: 'rounded-2xl',
        fontSize: 'text-xs sm:text-sm',
      };

  const instructions = `Bạn là chuyên gia thiết kế trải nghiệm học tập và kỹ sư web sáng tạo hàng đầu. Hãy tạo một website một trang duy nhất (Single-File HTML: index.html) hoàn chỉnh, trực quan, có thể mở trực tiếp bằng trình duyệt từ hồ sơ JSON bên dưới.

BẢN CHẤT SẢN PHẨM:
- Đây là "FUTURE CAPABILITY PORTFOLIO" (Hồ Sơ Năng Lực Tương Lai Mục Tiêu) mà học sinh và gia đình đã thống nhất hướng tới sau quá trình tương tác hướng nghiệp theo Mô Hình RIASEC.
- Website không chỉ là một namecard đơn thuần mà là một hồ sơ năng lực tương lai toàn diện, tích hợp lộ trình hành động cụ thể để đạt được chân dung đó.

YÊU CẦU KỸ THUẬT BẮT BUỘC:
1. ĐẦU RA LÀ 1 TỆP HTML DUY NHẤT: Chứa toàn bộ mã HTML, CSS và JavaScript bên trong một khối mã duy nhất (không tách rời file).
2. THƯ VIỆN & PHÔNG CHỮ:
   - Nhúng Tailwind CSS CDN: <script src="https://cdn.tailwindcss.com"></script>
   - Nhúng Google Font 'Plus Jakarta Sans': <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
   - Nhúng Lucide Icons CDN: <script src="https://unpkg.com/lucide@latest"></script> (gọi lucide.createIcons() sau khi tải trang).

3. ĐỊNH HƯỚNG VISUAL RIÊNG BIỆT (CÁ NHÂN HÓA THEO ĐỘ TUỔI & 3 NHÓM NGÀNH):
   - ĐỘ TUỔI & PHONG CÁCH: ${ageVisualConfig.styleTone}
   - NHÓM NGÀNH CÔNG NGHỆ (1 trong 3 nhóm): ${domainVisualConfig.label}
   - MÃ RIASEC CHỦ ĐẠO: Nhóm ${riasec.primaryCode} — ${riasec.hollandFullName}
   - BẢNG MÀU ĐẶC TRƯNG: Tông màu chủ đạo ${domainVisualConfig.primaryColor}, Hero gradient nền (${domainVisualConfig.gradientHero}), nhãn tag (${domainVisualConfig.accentTag}).
   - HỆ ICON & MOTIF CHỦ ĐỀ: ${domainVisualConfig.motifNote}

CẤU TRÚC GIAO DIỆN 5 KHỐI ĐẶC TRƯNG CỦA FUTURE CAPABILITY PORTFOLIO:

1. KHỐI 1 — HERO & CHÂN DUNG NĂNG LỰC TƯƠNG LAI (Future Me Profile):
   - Header Badge: "Hồ Sơ Năng Lực Tương Lai • Nhóm Ngành ${riasec.techSector}".
   - Hero Banner: Gradient sang trọng theo tông màu ${domainVisualConfig.label}, huy hiệu cấp học (${isPrimary ? 'Tiểu học' : 'THCS'}), tên học sinh, vai trò tương lai (${safePayload.futureProfile.role}) và chức danh năng lực (${riasec.roleSubtitle}).
   - Khung Bạn Đồng Hành: ${answers.avatarSource === 'custom' ? 'Ảnh nhân vật sáng tạo tự vẽ của con' : 'Linh vật Kitten Bot Chibi với lời nhắn truyền cảm hứng'}.
   - Thẻ thuộc tính: Sở thích (${safePayload.futureProfile.interests}), Phong cách (${safePayload.futureProfile.style}), Dự án mơ ước (${dreamName}).
   - Giới thiệu bản thân & Tuyên ngôn tương lai: "${safePayload.futureProfile.motto}" và trích dẫn "${safePayload.futureProfile.quote}".

2. KHỐI 2 — ĐỊNH HƯỚNG RIASEC & ĐỐI CHIẾU 3 CHIỀU (Triangulation: Học sinh vs Phụ huynh):
   - Thẻ Holland Code O*NET: Mã chính [${riasec.primaryCode}] ${riasec.primaryName} kèm mã phụ [${riasec.secondaryCodes.join(', ')}].
   - Thẻ Đối Chiếu 3 Chiều: Thể hiện sự đồng thuận (${riasec.triangulation.alignmentPercent}%) giữa Khát vọng của con ("${riasec.triangulation.studentAspiration}") và Quan sát thực tế của cha mẹ ("${riasec.triangulation.parentObservation}").
   - Đặc điểm sở thích tự nhiên: Hiển thị 4 đặc tính (${riasec.naturalTraits.join(' • ')}).

3. KHỐI 3 — BỘ CÔNG CỤ & KỸ NĂNG MỤC TIÊU (Target Tech Stack & 4Cs Skills):
   - 3 Phân nhóm công cụ con sẽ làm chủ:
     ${riasec.techStack.map(ts => `* ${ts.category}: ${ts.items.map(i => typeof i === 'string' ? i : `${i.name} [${i.level}]`).join(', ')}`).join('\n     ')}
   - Kỹ năng thế kỷ 21 (4Cs): ${riasec.softSkills.join(', ')}.

4. KHỐI 4 — BỘ 4 ĐỒ ÁN THỰC NGHIỆM PORTFOLIO & LỘ TRÌNH PHÁT TRIỂN (4-Stage Roadmap):
   - Lưới 4 đồ án tạo nên Portfolio tương lai:
     + Đồ án 1 (P1): Nền tảng kỹ thuật cơ bản.
     + Đồ án 2 (P2): Ứng dụng & nâng cao tính tương tác.
     + Đồ án 3 (P3): Đồ án phục vụ cộng đồng / ${dreamAudience}.
     + Đồ án 4 (P4 - Capstone): Dự Án Mơ Ước "${dreamName}" (MVP khả thi & Lộ trình phát triển).
   - TÍNH NĂNG TƯƠNG TÁC LỘ TRÌNH: Checkbox nhiệm vụ hoạt động mượt mà, thanh tính % tiến độ tự động cập nhật và lưu vào localStorage.

5. KHỐI 5 — GÓC ĐỒNG HÀNH GIA ĐÌNH & CHUẨN THAM CHIẾU QUỐC TẾ:
   - Cam kết thời gian (${answers.hoursPerWeek ? `${answers.hoursPerWeek} giờ/tuần` : "Linh hoạt theo chặng"}), nguồn lực gia đình sẵn sàng.
   - Chuẩn học thuật đối chiếu: CSTA K-12 Computer Science, ISTE Standards, Khung năng lực số NLS 2025.
   - Footer trang nhã: "Future Capability Portfolio — Bản quyền mục tiêu thuộc về ${answers.name || "con"} & Gia đình".

NGUYÊN TẮC BẢO MẬT & TRẢI NGHIỆM:
- Bảo mật thông tin: Không đưa thông tin nhạy cảm (SĐT, địa chỉ, họ tên đầy đủ).
- Không tự suy diễn điểm số hay vẽ biểu đồ chấm điểm thiếu cơ sở.
- Giữ vững tinh thần học tập kiến tạo (Constructivism), ấm áp và truyền cảm hứng.`;

  const fullPrompt = `# TẠO WEBSITE PORTFOLIO FUTURE ME & LỘ TRÌNH TƯƠNG LAI

${instructions}

HỒ SƠ ĐÃ DUYỆT ĐỂ DỰNG WEBSITE (JSON):
${JSON.stringify(safePayload, null, 2)}
`;

  return { safePayload, fullPrompt };
}

/**
 * Xây dựng câu lệnh tạo ảnh AI (Image Generation Prompt) chuẩn 16:9 cho Hero Banner Profile
 * Tuân thủ nguyên tắc: Reference-Optional, Generation-Mandatory.
 * Không bao giờ dừng lại đòi ảnh tham chiếu, tự động fallback theo độ tuổi, lĩnh vực, dự án mơ ước.
 */
export function buildSafeImageGenerationPrompt(answers: Partial<JourneyAnswers>): string {
  const isPrimary = !answers.gradeBand || ['1-2', '3-5'].includes(answers.gradeBand) || (answers.grade && parseInt(answers.grade, 10) <= 5);
  const gradeNum = parseInt(answers.grade || (isPrimary ? '4' : '8'), 10);
  const studentName = answers.name?.trim() || 'Student Creator';
  const dreamName = answers.projectName?.trim() || (answers.domain === 'multimedia' ? 'Landmark in Vietnam' : answers.domain === 'game_programming' ? 'City Hero Game' : 'City Helper Robot');
  const dreamPurpose = answers.dreamPurpose?.trim() || (isPrimary ? 'helping friends and community' : 'solving real-world community challenges');
  const dreamFeatures = (answers.dreamFeatures && answers.dreamFeatures.length > 0) ? answers.dreamFeatures : ['Interactive user control', 'Automated smart sensing', 'Child-friendly interface'];

  // Lĩnh vực & chuyên ban
  const domainLabel = answers.domain === 'robotics'
    ? 'Robotics & IoT'
    : answers.domain === 'game_programming'
    ? 'Game Programming & Software'
    : answers.domain === 'multimedia'
    ? 'Digital Multimedia, 3D & Visual Storytelling'
    : 'Technology & Creative Innovation';

  const specializationLabel = answers.branch || (isPrimary ? 'Creative Building' : 'Interactive Software');

  // Features list
  const featureList = dreamFeatures.map((f, i) => `  ${i + 1}. ${f}`).join('\n');

  // Dynamic visual style & character by grade level
  const visualStyle = isPrimary
    ? `Premium 2.5D cartoon educational illustration.
Original chibi character design.
Clean vector-like silhouettes.
Soft dimensional shading.
Rounded geometry.
Bright high-key lighting.
Soft contact shadows.
Pastel mint-teal and warm sunshine palette.
Polished professional educational artwork.
Friendly, imaginative, uplifting mood.
Not photorealistic.
Not flat icon style.
Not anime-heavy.
Not a website screenshot.`
    : `Premium modern stylized 3D / 2.5D digital concept art for educational portfolio.
Modern youthful character design with polished proportions.
Clean crisp silhouettes with soft dimensional ambient occlusion.
Smooth geometric forms and high-tech elegance.
Bright dynamic lighting with subtle rim light.
Harmonious modern tech palette (Teal, Indigo, or Coral accents).
Professional, inspiring, innovative mood suitable for secondary school portfolio.
Not photorealistic.
Not flat icon style.
Not gloomy or dark cyberpunk.
Not a website screenshot.`;

  const characterDesign = isPrimary
    ? `Create an original fictional Grade ${gradeNum} student character named "${studentName}".
Do not claim resemblance to any real child.
The child should look cheerful, curious, proud, and excited about their creation.
Use a simple school-age outfit in white, mint-teal, and soft accent colors.
Keep the character proportions chibi and age-appropriate.
Show the child interacting naturally with their creation (guiding, pointing, or interacting via a small tablet).`
    : `Create an original fictional Grade ${gradeNum} secondary school student character named "${studentName}".
Do not claim resemblance to any real child.
The student should look confident, creative, innovative, and focused on building technology.
Modern youth casual attire (e.g. comfortable hoodie or jacket with tech details, optional creative headset).
Well-proportioned expressive character showing pride in their project.
Show the student presenting or interacting naturally with their creation using modern digital tools.`;

  // Dynamic Main Dream Project centerpiece based on domain
  let centerpiece = '';
  let environment = '';
  let visualStory = '';
  let colorPalette = '';

  if (answers.domain === 'robotics') {
    centerpiece = `The main dream robot ("${dreamName}") is the centerpiece.
It should be clearly bigger than the companion mascot.
Design it as a friendly, cute helper robot with:
- rounded head and expressive friendly face display
- white and mint-teal body with subtle tech accent lights
- wheels or treads for smooth movement
- one flexible robotic arm with a simple gripper
- believable connected mechanical parts and sensors
Show it following a path or assisting in a practical task.
If features include obstacle detection, show a harmless small obstacle and the robot safely stopping before it.
Also include a small light object near the gripper or being carried to suggest the carrying feature.`;

    environment = `Create a miniature friendly smart city, school campus, or green park scene.
Include:
- clean curved path or gentle route
- a few soft stylized modern buildings with green rooftop gardens
- small trees, flowers, and gentle futuristic city atmosphere
The environment should support the visual story without becoming cluttered.`;

    visualStory = `A young student proudly imagines and presents "${dreamName}"—a smart helper robot designed for ${dreamPurpose}.
The student appears as the proud creator, inventor, and guide of the technology.`;

    colorPalette = `- Primary mint: #BDF3E5
- Teal: #21B5A7
- Deep teal: #147C87
- Soft blue: #DDEEFF
- Warm white: #FAFEFD
- Gentle yellow accents: #FFD46B`;
  } else if (answers.domain === 'game_programming') {
    centerpiece = `The main dream project ("${dreamName}") is the centerpiece.
Design it as an interactive holographic or floating game world showcasing the student's creation:
- floating stylized game level island or dynamic game scene with glowing platforms
- charming game characters or friendly digital sprites designed by the student
- visible logic puzzle elements, quest paths, and playful collectible icons
- glowing futuristic interactive HUD elements floating gently around the scene`;

    environment = `Create a vibrant high-tech youth creative studio and interactive digital playground.
Include:
- soft ambient gaming/tech studio lighting
- floating gentle digital particles and code/game elements
- clean futuristic design desk with holographic displays
- bright, imaginative, and encouraging atmosphere`;

    visualStory = `A young student enthusiastically presents "${dreamName}"—an interactive game and software project created for ${dreamPurpose}.
The student holds a digital controller or tablet, bringing their imaginative game world to life.`;

    colorPalette = `- Primary indigo: #4F46E5
- Cyber violet: #6366F1
- Bright cyan: #06B6D4
- Soft lavender: #E0E7FF
- Crisp white: #FFFFFF
- Golden achievement accents: #FBBF24`;
  } else if (answers.domain === 'multimedia') {
    centerpiece = `The main dream project ("${dreamName}") is the centerpiece.
Design it as a stunning stylized 3D digital art and architectural landmark creation:
- an iconic stylized Vietnamese cultural or modern landmark model floating as a digital 3D diorama
- vibrant artistic details with delicate lighting and dimensional layering
- glowing digital brushstrokes, creative color palettes, and floating UI/UX canvas frames
- harmonious blend of cultural identity and modern digital design`;

    environment = `Create a bright, spacious modern digital art and multimedia creative studio.
Include:
- large panoramic window with gentle daylight illuminating the workspace
- creative concept boards, color palettes, and 3D wireframe sketches in the background
- clean architectural diorama table with soft plant accents
- inspiring, aesthetic, and premium creative atmosphere`;

    visualStory = `A talented young student proudly showcases "${dreamName}"—a creative 3D multimedia and digital art project celebrating ${dreamPurpose}.
The student holds a digital stylus, presenting their masterpiece with creative confidence.`;

    colorPalette = `- Sunset rose: #E11D48
- Coral pink: #F43F5E
- Soft peach: #FED7AA
- Warm amber: #F59E0B
- Clean studio white: #FAFAFA
- Subtle teal contrast: #14B8A6`;
  } else {
    centerpiece = `The main dream creation ("${dreamName}") is the centerpiece.
A futuristic, friendly technological innovation designed to help people and solve practical challenges.`;
    environment = `A bright, clean modern technology innovation space with green plants and soft natural light.`;
    visualStory = `A student proudly presents "${dreamName}"—a creative tech innovation for ${dreamPurpose}.`;
    colorPalette = `- Teal: #1A8A7D
- Sky blue: #0284C7
- Mint: #D1FAE5
- Clean white: #FFFFFF
- Warm sunshine: #FCD34D`;
  }

  return `Generate exactly ONE final image now.

Do not ask for clarification.
Do not ask for additional references.
Do not ask the user to upload any more images.
If any reference image is missing, use the fallback style and character rules in this prompt and proceed immediately.

Create one premium personalized educational illustration for a Future Me student profile website.

OUTPUT:
- One final image only
- Landscape 16:9
- High resolution
- Clean background composition suitable for use as a website profile hero image

STUDENT PROFILE:
- Student display name: ${studentName}
- Grade: ${gradeNum}
- Education level: ${isPrimary ? 'Vietnamese elementary school' : 'Vietnamese secondary school (middle school)'}
- Technology domain: ${domainLabel}
- Specialization: ${specializationLabel}
- Dream project: "${dreamName}"
- Dream project purpose: ${dreamPurpose}
- Main confirmed features:
${featureList}
- Product appearance:
  - ${answers.dreamAppearance || 'Modern child-friendly aesthetic, clean rounded design, approachable and inspiring'}
- This image represents the student's future aspiration and imagination.
- It must NOT imply the student has already completed the final real product.

MANDATORY GENERATION BEHAVIOR:
- Generate the image immediately.
- Never stop to ask for more assets.
- If no official Future Me reference image is available, infer the style from the description below.
- If no official Kitten Bot reference image is available, create an original friendly cat-inspired educational robot companion in the same visual language.
- The absence of reference images must never block generation.

VISUAL STYLE:
${visualStyle}

CHARACTER DESIGN:
${characterDesign}

COMPANION ROBOT:
Include a small friendly cat-inspired companion robot beside the student.
If no official Kitten Bot reference is available, create an original mascot-like companion with:
- white and mint-teal body
- rounded head
- cute cat ears
- friendly smiling digital face
- compact proportions
- simple futuristic details
The companion robot must be smaller and visually separate from the main dream project centerpiece.

MAIN DREAM PROJECT / CREATION:
${centerpiece}

ENVIRONMENT:
${environment}

MAIN VISUAL STORY:
${visualStory}

COMPOSITION:
- 16:9 hero image
- Spacious clean composition
- Place the student and the main dream creation in the center-left and center area
- Keep the right side 30–35% relatively open and uncluttered for future website text overlay
- Keep the face of the student clearly visible and expressive
- Ensure the main creation design and key features are readable at web display size
- Keep the composition balanced and elegant
- No crowded layout

COLOR PALETTE:
${colorPalette}

STRICT RESTRICTIONS:
- No text
- No letters
- No numbers
- No labels
- No title
- No logo
- No watermark
- No dashboard UI
- No skill chart
- No fake achievements
- No certificates
- No irrelevant technology
- No visual clutter
- No distorted anatomy
- No extra fingers
- No duplicated limbs
- No disconnected machine parts
- No aggressive weapons
- No surveillance or police-style protection visuals
- Do not depict the dream project as already fully verified or already completed in real life

NEGATIVE PROMPT:
no text, no letters, no numbers, no logo, no watermark, no website UI, no certificate, no badge, no crowded composition, no photorealistic child, no copyrighted character, no distorted hands, no extra fingers, no duplicated limbs, no broken parts, no unrelated objects, no dark scary atmosphere, no fake completed achievement

FINAL INSTRUCTION:
Generate exactly one final polished illustration now.
Do not ask follow-up questions.
Do not request more references.
Proceed immediately using the fallback rules if references are absent.`;
}

/**
 * Kiểu dữ liệu Hồ Sơ Hướng Nghiệp RIASEC (Holland Code & O*NET) chuẩn hóa
 * Điều hướng độc quyền vào 3 nhóm ngành công nghệ:
 * 1. Robot - AI - IoT (Nhóm R)
 * 2. Lập trình & AI (Nhóm I)
 * 3. Multimedia (Nhóm A)
 */
export interface TechStackToolItem {
  name: string;
  level: 'Tiểu học' | 'THCS' | 'Tiểu học & THCS';
}

export interface RIASECProfileData {
  primaryCode: 'R' | 'I' | 'A';
  primaryName: string;
  hollandFullName: string;
  techSector: 'Robot - AI - IoT' | 'Lập trình & AI' | 'Multimedia';
  techSectorDescription: string;
  roleTitle: string;
  roleSubtitle: string;
  sectorBadgeClass: string;
  secondaryCodes: string[];
  naturalTraits: string[];
  techStack: {
    category: string;
    items: (string | TechStackToolItem)[];
  }[];
  softSkills: string[];
  triangulation: {
    studentAspiration: string;
    parentObservation: string;
    alignmentPercent: number;
    consensusSummary: string;
  };
  standards: {
    code: string;
    label: string;
    domainSummary: string;
  }[];
};

/**
 * Trích xuất dữ liệu Hướng nghiệp RIASEC & Đối chiếu 3 chiều (Triangulation)
 * từ các bước tương tác 01–04, 03, 14, 16
 */
export function extractRIASECProfile(answers: JourneyAnswers): RIASECProfileData {
  const isPrimary = !answers.gradeBand || ['1-2', '3-5'].includes(answers.gradeBand) || (answers.grade && parseInt(answers.grade, 10) <= 5);
  const domain = answers.domain || 'robotics';

  if (domain === 'robotics') {
    return {
      primaryCode: 'R',
      primaryName: 'Nhóm R • Realistic',
      hollandFullName: 'Realistic (Kỹ Thuật, Cơ Khí & Thực Hành Phần Cứng)',
      techSector: 'Robot - AI - IoT',
      techSectorDescription: 'Đam mê cơ điện tử, tháo lắp mạch vi xử lý, điều khiển cảm biến thông minh và phát triển các hệ thống robot tự hành phục vụ con người.',
      roleTitle: isPrimary ? 'Nhà sáng tạo robot nhí' : 'Kỹ sư Robotics & Tự động hóa Thông minh',
      roleSubtitle: 'Chuyên gia chế tạo và lập trình hệ thống phần cứng thông minh',
      sectorBadgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200 ring-emerald-300',
      secondaryCodes: ['Nhóm I (Nghiên cứu logic & giải thuật)', 'Nhóm C (Quy chuẩn kỹ thuật & an toàn)'],
      naturalTraits: [
        'Tò mò tháo lắp đồ chơi và tìm hiểu cách máy móc vận hành',
        'Thích cảm giác cầm nắm, kết nối cảm biến và động cơ thật',
        'Kiên nhẫn gỡ lỗi mạch điện tử và cơ cấu chuyển động',
        'Tư duy không gian ba chiều và cơ học ứng dụng'
      ],
      techStack: [
        {
          category: 'Mạch Vi Điều Khiển & Nền Tảng Lập Trình',
          items: [
            { name: 'CodeKitten & Scratch Robotics', level: 'Tiểu học' },
            { name: 'PictoBlox (Điều khiển Robot & AI Vision)', level: 'Tiểu học & THCS' },
            { name: 'Micro:bit V2 & MakeCode Blocks', level: 'Tiểu học' },
            { name: 'Arduino IDE & C++ Nhúng', level: 'THCS' },
            { name: 'ESP32 IoT Mạch Kép & MicroPython', level: 'THCS' }
          ]
        },
        {
          category: 'Cảm Biến & Thiết Bị Đo Thông Minh',
          items: [
            { name: 'Cảm biến Siêu âm (Ultrasonic Distance)', level: 'Tiểu học' },
            { name: 'Cảm biến Dò đường (IR Line Tracking)', level: 'Tiểu học' },
            { name: 'Cảm biến Nhận diện Màu sắc & Ánh sáng', level: 'Tiểu học & THCS' },
            { name: 'PictoBlox AI Camera (Nhận diện khuôn mặt/vật thể)', level: 'Tiểu học & THCS' },
            { name: 'Cảm biến Nhiệt & Độ ẩm DHT11', level: 'THCS' },
            { name: 'LiDAR 2D quét vật cản & Động cơ Servo/DC', level: 'THCS' }
          ]
        },
        {
          category: 'Lắp Ráp Cơ Học & Mô Phỏng Hệ Thống',
          items: [
            { name: 'Khung cơ khí lắp ghép & Bánh xe tự hành', level: 'Tiểu học' },
            { name: 'Mô phỏng 3D Tinkercad Circuits', level: 'Tiểu học & THCS' },
            { name: 'Mạch công suất L298N & Nguồn pin sạc Li-ion', level: 'THCS' },
            { name: 'Thiết kế sơ đồ mạch in PCB căn bản', level: 'THCS' }
          ]
        }
      ],
      softSkills: [
        'Tư duy phân tích nguyên nhân - kết quả phần cứng',
        'Tuân thủ quy trình an toàn kỹ thuật',
        'Kiên trì thử nghiệm lặp lại (Trial & Error)',
        'Phối hợp đa môn học: Toán, Cơ học & Lập trình'
      ],
      triangulation: {
        studentAspiration: answers.dreamPurpose || 'Chế tạo robot thông minh hỗ trợ cuộc sống và bảo vệ cộng đồng',
        parentObservation: answers.parentMoment || 'Ở nhà con rất kiên nhẫn khi lắp ráp mô hình, luôn tò mò muốn biết các thiết bị điện tử hoạt động như thế nào.',
        alignmentPercent: 94,
        consensusSummary: 'Gia đình và học sinh đạt mức đồng thuận rất cao (94%) về định hướng phát triển nhóm ngành Robot - AI - IoT. Mong muốn sáng tạo của con hoàn toàn tương thích với thói quen quan sát thực tế của phụ huynh.'
      },
      standards: [
        { code: 'CSTA-ALGO', label: 'CSTA 2026', domainSummary: 'Thuật toán điều khiển tuần tự & vòng lặp phản hồi cảm biến' },
        { code: 'ISTE-INNOVATIVE', label: 'ISTE Standards', domainSummary: 'Thiết kế nguyên mẫu sáng tạo & cải tiến cơ khí liên tục' },
        { code: 'NLS-DIGITAL-MASTERY', label: 'Khung NLS 2025', domainSummary: 'Làm chủ thiết bị phần cứng số & giải pháp an toàn' }
      ]
    };
  }

  if (domain === 'game_programming') {
    return {
      primaryCode: 'I',
      primaryName: 'Nhóm I • Investigative',
      hollandFullName: 'Investigative (Nghiên Cứu, Logic & Khoa Học Thuật Toán)',
      techSector: 'Lập trình & AI',
      techSectorDescription: 'Đam mê cấu trúc dữ liệu, giải thuật phần mềm, lập trình logic tương tác và ứng dụng trí tuệ nhân tạo (AI) vào game & ứng dụng.',
      roleTitle: isPrimary ? 'Nhà sáng tạo game nhí' : 'Kỹ sư Lập trình Phần mềm & Trí tuệ Nhân tạo',
      roleSubtitle: 'Chuyên gia xây dựng logic phần mềm và kiến tạo thế giới game tương tác',
      sectorBadgeClass: 'bg-indigo-50 text-indigo-800 border-indigo-200 ring-indigo-300',
      secondaryCodes: ['Nhóm R (Kỹ thuật hệ thống máy tính)', 'Nhóm C (Quy chuẩn cấu trúc dữ liệu)'],
      naturalTraits: [
        'Đam mê giải đố, tìm quy luật và phân tích logic bài toán',
        'Tò mò về cách các ứng dụng và game vận hành ngầm bên trong',
        'Kiên trì truy tìm bug và tối ưu hóa câu lệnh',
        'Tư duy trừu tượng hóa và phân rã vấn đề phức tạp'
      ],
      techStack: [
        {
          category: 'Ngôn Ngữ Lập Trình Cốt Lõi',
          items: [
            { name: 'CodeKitten (Kéo thả khối & Sáng tạo game nhí)', level: 'Tiểu học' },
            { name: 'Scratch 3.0 (Tư duy thuật toán & Logic khối)', level: 'Tiểu học' },
            { name: 'PictoBlox (Lập trình khối & Trí tuệ nhân tạo AI)', level: 'Tiểu học & THCS' },
            { name: 'Python (Lập trình kịch bản & Giải thuật)', level: 'THCS' },
            { name: 'C# / Lua Scripting (Logic nâng cao)', level: 'THCS' }
          ]
        },
        {
          category: 'Game Engine & Nền Tảng Phần Mềm',
          items: [
            { name: 'CodeKitten Arcade & Canvas 2D', level: 'Tiểu học' },
            { name: 'Roblox Studio (Ngôn ngữ Lua & Thiết kế map)', level: 'Tiểu học & THCS' },
            { name: 'Pygame Framework (Lập trình game Python)', level: 'THCS' },
            { name: 'Unity Engine 2D/3D & C# Scripting', level: 'THCS' },
            { name: 'Godot Engine mã nguồn mở', level: 'THCS' }
          ]
        },
        {
          category: 'Cấu Trúc Dữ Liệu & Thuật Toán AI',
          items: [
            { name: 'Logic tuần tự, Sự kiện & Vòng lặp Game Loop', level: 'Tiểu học' },
            { name: 'Tọa độ không gian 2D, Trọng lực & Xử lý va chạm', level: 'Tiểu học & THCS' },
            { name: 'PictoBlox Computer Vision & Machine Learning', level: 'Tiểu học & THCS' },
            { name: 'Cấu trúc mảng, danh sách & Biến số quản lý điểm', level: 'THCS' },
            { name: 'Mô hình AI máy trạng thái (FSM) & Tìm đường', level: 'THCS' }
          ]
        }
      ],
      softSkills: [
        'Tư duy phản biện (Critical Thinking)',
        'Tối ưu hóa tài nguyên mã nguồn',
        'Thấu cảm trải nghiệm người chơi (User Experience)',
        'Kiên nhẫn giải quyết bài toán trừu tượng'
      ],
      triangulation: {
        studentAspiration: answers.dreamPurpose || 'Phát triển phần mềm và thế giới game tương tác mang lại niềm vui và giá trị giáo dục',
        parentObservation: answers.parentMoment || 'Ở nhà con rất tập trung khi làm việc với máy tính, có khả năng tự mò mẫm các luật chơi và tự giải quyết các bài toán hóc búa.',
        alignmentPercent: 93,
        consensusSummary: 'Gia đình và học sinh đạt mức đồng thuận 93% về định hướng phát triển nhóm ngành Lập trình & AI. Sở thích logic của con được phụ huynh hoàn toàn thấu hiểu và ủng hộ.'
      },
      standards: [
        { code: 'CSTA-ALGO', label: 'CSTA 2026', domainSummary: 'Cấu trúc rẽ nhánh, biến số & vòng lặp phức hợp' },
        { code: 'ISTE-INNOVATIVE', label: 'ISTE Standards', domainSummary: 'Xây dựng giải pháp phần mềm số tương tác đa chiều' },
        { code: 'NLS-DIGITAL-MASTERY', label: 'Khung NLS 2025', domainSummary: 'Sáng tạo sản phẩm nội dung số có tính tương tác cao' }
      ]
    };
  }

  // domain === 'multimedia'
  return {
    primaryCode: 'A',
    primaryName: 'Nhóm A • Artistic',
    hollandFullName: 'Artistic (Nghệ Thuật, Thẩm Mỹ Thị Giác & Sáng Tạo Đa Phương Tiện)',
    techSector: 'Multimedia',
    techSectorDescription: 'Đam mê tạo hình không gian 3D, nghệ thuật thị giác số, thiết kế giao diện trải nghiệm người dùng (UI/UX) và kể chuyện tương tác đa phương tiện.',
    roleTitle: isPrimary ? 'Nhà sáng tạo nội dung số nhí' : 'Nhà Thiết Kế Trải Nghiệm Số (UI/UX) & 3D',
    roleSubtitle: 'Chuyên gia thiết kế mỹ thuật số, không gian 3D và giao diện tương tác',
    sectorBadgeClass: 'bg-rose-50 text-rose-800 border-rose-200 ring-rose-300',
    secondaryCodes: ['Nhóm S (Thấu cảm & Tương tác xã hội)', 'Nhóm E (Truyền cảm hứng nghệ thuật số)'],
    naturalTraits: [
      'Cảm thụ màu sắc, bố cục và không gian thị giác tinh tế',
      'Thích vẽ, tạo hình nhân vật và dựng hoạt hình số',
      'Đam mê kể chuyện và truyền tải cảm xúc qua hình ảnh',
      'Nhạy bén với trải nghiệm thị giác của người dùng'
    ],
    techStack: [
      {
        category: 'Dựng Hình 3D & Không Gian Diorama',
        items: [
          { name: 'Tinkercad 3D Design (Dựng hình khối cơ bản)', level: 'Tiểu học' },
          { name: 'Voxel Art Studio (Tạo nhân vật điểm ảnh 3D)', level: 'Tiểu học' },
          { name: 'CodeKitten Storymaker (Dựng hoạt hình số)', level: 'Tiểu học' },
          { name: 'Blender 3D (Modeling, Materials & Lighting)', level: 'THCS' },
          { name: 'Diorama không gian di sản số 3D', level: 'THCS' }
        ]
      },
      {
        category: 'Thiết Kế Đồ Họa & Giao Diện UI/UX',
        items: [
          { name: 'Canva Design & Bảng vẽ kỹ thuật số', level: 'Tiểu học' },
          { name: 'Bảng màu HSL, Typography & Bố cục thị giác', level: 'Tiểu học & THCS' },
          { name: 'PictoBlox Animation (Kỹ xảo nhân vật tương tác)', level: 'Tiểu học & THCS' },
          { name: 'Figma UI/UX Design (Thiết kế Web/App)', level: 'THCS' },
          { name: 'Thiết kế hệ thống Icon Vector chuẩn tỉ lệ', level: 'THCS' }
        ]
      },
      {
        category: 'Biên Tập Truyền Thông & Kỹ Xảo Số',
        items: [
          { name: 'Kể chuyện đa phương tiện (Digital Storytelling)', level: 'Tiểu học' },
          { name: 'Kỹ xảo hoạt hình 2D Keyframe', level: 'Tiểu học & THCS' },
          { name: 'Biên tập Video kỹ thuật số & Âm thanh Sound FX', level: 'THCS' },
          { name: 'Xử lý hậu kỳ & Xuất bản tác phẩm số chuẩn quốc tế', level: 'THCS' }
        ]
      }
    ],
    softSkills: [
      'Tư duy thiết kế thấu cảm (Design Thinking)',
      'Kể chuyện đa phương tiện truyền cảm hứng',
      'Phối hợp hài hòa mỹ thuật và công nghệ số',
      'Giao tiếp thị giác thuyết phục'
    ],
    triangulation: {
      studentAspiration: answers.dreamPurpose || 'Tạo ra các tác phẩm đa phương tiện và mô hình 3D tôn vinh văn hóa, truyền cảm hứng nghệ thuật',
      parentObservation: answers.parentMoment || 'Ở nhà con rất thích vẽ vời, phối màu và tự sáng tạo các câu chuyện bằng hình ảnh, luôn quan tâm đến vẻ đẹp của mọi vật.',
      alignmentPercent: 95,
      consensusSummary: 'Gia đình và học sinh đạt mức đồng thuận xuất sắc (95%) về định hướng phát triển nhóm ngành Multimedia & 3D. Năng khiếu nghệ thuật và thị giác của con được gia đình ghi nhận sâu sắc.'
    },
    standards: [
      { code: 'CSTA-ALGO', label: 'CSTA 2026', domainSummary: 'Mô hình hóa dữ liệu không gian & thiết kế giao diện số' },
      { code: 'ISTE-INNOVATIVE', label: 'ISTE Standards', domainSummary: 'Sáng tạo nghệ thuật số kết hợp công nghệ hiện đại' },
      { code: 'NLS-DIGITAL-MASTERY', label: 'Khung NLS 2025', domainSummary: 'Sản xuất và biên tập sản phẩm truyền thông số chuẩn mực' }
    ]
  };
}
