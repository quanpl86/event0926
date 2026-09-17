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
    goal: `Hiện thực hóa ý tưởng "${dreamName}": Giải quyết vấn đề "${dreamPurpose}" phục vụ "${dreamAudience}" với các tính năng (${dreamFeatures.join(', ')}). Chia làm bản thử nghiệm V1 khả thi và lộ trình mở rộng V2.`,
    tasks: [
      `Xây dựng Bản Thử Nghiệm V1 (MVP): Tập trung vào tính năng cốt lõi [${dreamFeatures.slice(0, 2).join(', ')}]`,
      `Thử nghiệm người dùng thực tế: Trình diễn cho ${dreamAudience} và đo lường mức độ giải quyết mục tiêu "${dreamPurpose}"`,
      `Lập kế hoạch nâng cấp V2: Bổ sung tính năng mở rộng [${dreamFeatures.slice(2).join(', ') || 'nâng cao tính tự động'}] và chuẩn bị trưng bày`
    ] as [string, string, string],
    deliverable: `Bản sản phẩm thực tế hoạt động được (Phiên bản V1.0) kèm video demo và tài liệu lộ trình phát triển V2`,
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

  const dreamName = answers.projectName?.trim() || 'Dự án Sáng Tạo';
  const dreamAudience = answers.dreamAudience || 'gia đình và bạn bè';
  const dreamPurpose = answers.dreamPurpose || 'giải quyết vấn đề thực tế';
  const dreamFeatures = (answers.dreamFeatures && answers.dreamFeatures.length > 0) ? answers.dreamFeatures : ['Tương tác người dùng'];

  // Whitelist payload strictly
  const safePayload = {
    displayName: answers.name?.trim() || 'Nhà Sáng Tạo',
    grade: gradeNum,
    educationLevel: level,
    technologyDomain: branch?.domain || answers.domain || (isPrimary ? 'game_programming' : 'programming'),
    specialization: branchKey,
    specializationLabel: branch?.label || branchKey,
    futureProfile: {
      role: answers.futureSelf || (isPrimary ? 'Nhà sáng tạo robot nhí' : 'Lập trình vì môi trường'),
      motto: isPrimary ? 'Mỗi ý tưởng nhỏ hôm nay có thể tạo nên thay đổi lớn ngày mai!' : 'Công nghệ không chỉ để giải trí, mà còn để tạo ra một thế giới tốt đẹp hơn.',
      quote: answers.dreamPurpose ? `Dự án ${dreamName} sẽ ${answers.dreamPurpose}` : (isPrimary ? 'Chú robot Thủ Thư Nhí sẽ mang sách đến cho các bạn!' : 'Con muốn xây dựng một website giúp các bạn học sinh bảo vệ môi trường.'),
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

  const intro = isPrimary
    ? 'Học sinh Tiểu học: Giao diện flat, hình lớn, chữ ngắn gọn, nhân vật Kitten Bot chibi vui nhộn (hoặc nhân vật con đã tải lên), ít menu phức tạp, bản đồ bốn chặng khám phá. Dùng ngôn ngữ ấm áp “con”, “mình”, “ba mẹ”.'
    : 'Học sinh THCS: Giao diện công nghệ hiện đại, rõ ràng, trực quan dạng thẻ dự án và dòng thời gian; thể hiện các nhiệm vụ, tiêu chí và tính năng cụ thể nhưng tự nhiên, không cứng nhắc như báo cáo máy. Dùng “bạn”.';

  const instructions = `Bạn là chuyên gia thiết kế trải nghiệm học tập và lập trình web sáng tạo hàng đầu. Hãy tạo một website một trang duy nhất (Single-File HTML: index.html) hoàn chỉnh, đẹp mắt, có thể mở trực tiếp bằng trình duyệt từ hồ sơ JSON bên dưới.

YÊU CẦU KỸ THUẬT BẮT BUỘC:
1. ĐẦU RA LÀ 1 TỆP HTML DUY NHẤT: Chứa toàn bộ mã HTML, CSS và JavaScript bên trong một khối mã duy nhất (không tách rời file).
2. THƯ VIỆN & PHÔNG CHỮ:
   - Nhúng Tailwind CSS CDN: <script src="https://cdn.tailwindcss.com"></script>
   - Nhúng Google Font 'Plus Jakarta Sans': <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
   - Nhúng Lucide Icons CDN: <script src="https://unpkg.com/lucide@latest"></script> (gọi lucide.createIcons() sau khi tải trang).
3. THIẾT KẾ FLAT PASTEL CAO CẤP:
   - Tông màu TEKY chủ đạo (#1a8a7d, nền gradient pastel nhẹ nhàng #eff8f6 sang #f5f9fe).
   - Thẻ bo tròn góc lớn (rounded-3xl, rounded-2xl), viền mảnh (#c8e6df), bóng đổ dịu mắt.
   - Đáp ứng hoàn hảo cả trên điện thoại (Mobile Responsive) và máy tính.

CẤU TRÚC GIAO DIỆN 4 KHỐI CHÍNH:
1. KHỐI 1 — HỒ SƠ TƯƠNG LAI CỦA CON (Future Profile Card):
   - Tái hiện đúng bố cục thẻ Profile: Banner minh họa lớn, huy hiệu cấp học, tên học sinh, vai trò tương lai (futureProfile.role).
   - 4 thẻ thuộc tính nổi bật: Khối lớp, Sở thích, Phong cách, Ước mơ.
   - Khung "Về mình" với đoạn văn giới thiệu truyền cảm hứng.
   - Trích dẫn châm ngôn (motto) của con được đóng khung trang nhã.
2. KHỐI 2 — BẢN ĐỒ 4 CHẶNG & LỘ TRÌNH THỰC HIỆN (Interactive 4-Stage Roadmap):
   - Thanh tiến trình 4 chặng kết nối: Chặng 1 -> Chặng 2 -> Chặng 3 -> Chặng 4 (Dự án Mơ ước).
   - Mỗi chặng hiển thị: Tên chặng, mục tiêu, sản phẩm bàn giao và danh sách checkbox các nhiệm vụ (tasks).
   - TÍNH NĂNG TƯƠNG TÁC: Người dùng có thể tích chọn vào các checkbox nhiệm vụ; thanh % tiến độ tự động tăng/giảm và lưu trạng thái vào localStorage trình duyệt.
3. KHỐI 3 — SHOWCASE DỰ ÁN MƠ ƯỚC ("${dreamName}"):
   - Trưng bày chi tiết ý tưởng lớn: Vấn đề con giải quyết, đối tượng thụ hưởng ("${dreamAudience}"), các tính năng chính.
   - Phân định rõ 2 giai đoạn: Phiên bản thử nghiệm V1 (MVP) và Lộ trình mở rộng V2.
4. KHỐI 4 — GÓC ĐỒNG HÀNH CỦA GIA ĐÌNH:
   - Ghi nhận thời gian biểu linh hoạt (${answers.hoursPerWeek ? `${answers.hoursPerWeek} giờ/tuần` : "Linh hoạt theo chặng"}), các nguồn lực và phương thức hỗ trợ của ba mẹ.
   - Footer trang nhã: "Hồ sơ sáng tạo tương lai — Bản quyền thuộc về ${answers.name || "con"}".

NGUYÊN TẮC BẢO MẬT & TRẢI NGHIỆM:
- Tuyệt đối không suy diễn điểm số hay vẽ biểu đồ chấm điểm.
- Giữ sạch sẽ thông tin cá nhân, dùng ngôn ngữ ấm áp, khích lệ.`;

  const fullPrompt = `# TẠO WEBSITE PORTFOLIO FUTURE ME & LỘ TRÌNH TƯƠNG LAI
${intro}

${instructions}

HỒ SƠ ĐÃ DUYỆT ĐỂ DỰNG WEBSITE (JSON):
${JSON.stringify(safePayload, null, 2)}
`;

  return { safePayload, fullPrompt };
}
