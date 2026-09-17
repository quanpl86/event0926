import type { JourneyAnswers, JourneyStep } from "@/types/journey";
import type { RoadmapProject } from "@/components/GraphicRoadmap";

const labels: Record<string, string> = {
  game: "Lập trình Game",
  robot: "Robotics & IoT",
  design: "Multimedia & Đồ họa",
  "digital-world": "Thế giới Số & AI",
  creative: "Nhiều ý tưởng mới",
  experiment: "Sẵn sàng làm thử lại",
  solve: "Thích giải thử thách",
  team: "Làm việc cùng đồng đội",
  sketch: "Phác thảo ý tưởng ra giấy",
  make: "Bắt tay làm thử nghiệm ngay",
  research: "Chủ động tìm hiểu tài liệu",
  talk: "Chia sẻ và trao đổi ý tưởng",
  inspect: "Kiểm tra từng bộ phận",
  retry: "Kiên trì đổi phương án",
  ask: "Hỏi ý kiến bạn bè và thầy cô",
  guide: "Tìm kiếm tài liệu hướng dẫn",
  family: "Giúp đỡ người thân trong gia đình",
  school: "Làm giờ học và chơi ở trường vui hơn",
  earth: "Bảo vệ môi trường và Trái đất",
  community: "Kết nối và lan tỏa cộng đồng",
  curious: "Thường xuyên đặt câu hỏi vì sao",
  persistent: "Kiên trì theo đuổi mục tiêu",
  ideas: "Hay nghĩ ra cách làm độc đáo",
  share: "Thích kể và giải thích cho người khác",
  encourage: "Lắng nghe và khích lệ con",
  together: "Cùng con làm thử dự án nhỏ",
  space: "Cho con không gian tự thử và sai",
  connect: "Tìm người thầy và môi trường phù hợp",
  "try-project": "Bắt đầu một dự án nhỏ trong tuần này",
  "visit-class": "Tham gia một buổi trải nghiệm thực tế",
  "talk-weekly": "Dành thời gian trò chuyện công nghệ mỗi tuần"
};

export type FutureProject = {
  id: string;
  title: string;
  description: string;
  actions: string[];
  image: string;
};

const sharedWebsite: FutureProject = {
  id: "portfolio",
  title: "Website Cá Nhân Future Me",
  description: "Không gian trưng bày các dự án và câu chuyện sáng tạo của con.",
  actions: ["Thiết kế giao diện", "Kể chuyện dự án", "Chia sẻ cùng gia đình"],
  image: "/assets/activity-communication.png"
};

const library: Record<string, FutureProject[]> = {
  robot: [
    {
      id: "robot-explorer",
      title: "Robot Thủ Thư & Thám Hiểm",
      description: "Lắp ráp cảm biến, lập trình nhận biết vật cản và vận chuyển đồ đạc.",
      actions: ["Lắp ráp cơ khí", "Lập trình cảm biến", "Thử nghiệm vượt ải"],
      image: "/assets/activity-robotics.png"
    },
    {
      id: "smart-garden",
      title: "Khu Vườn Thông Minh IoT",
      description: "Tự động đo độ ẩm, tưới nước tự động và bảo vệ cây xanh.",
      actions: ["Cảm biến độ ẩm", "Tự động hóa", "Quan sát dữ liệu"],
      image: "/assets/activity-nature-observation.png"
    },
    {
      id: "smart-trash",
      title: "Thùng Rác Phân Loại AI",
      description: "Nhận biết rác tái chế bằng camera và mở nắp tự động.",
      actions: ["Thị giác máy tính", "Điều khiển servo", "Bảo vệ môi trường"],
      image: "/assets/activity-problem-solving.png"
    },
    sharedWebsite
  ],
  game: [
    {
      id: "adventure-game",
      title: "Game Phiêu Lưu Đa Vũ Trụ",
      description: "Thiết kế cơ chế nhảy, tính điểm và tạo nhân vật hoạt họa theo ý muốn.",
      actions: ["Tạo nhân vật", "Lập trình logic", "Xây dựng màn chơi"],
      image: "/assets/activity-world-building.png"
    },
    {
      id: "eco-challenge",
      title: "Hành Tinh Xanh Challenge",
      description: "Tựa game giáo dục khuyến khích thu gom rác và trồng cây ảo.",
      actions: ["Xây dựng cốt truyện", "Thiết kế luật chơi", "Phát triển giao diện"],
      image: "/assets/activity-visual-storytelling.png"
    },
    {
      id: "maze-escape",
      title: "Mê Cung Thuật Toán",
      description: "Thử thách giải đố logic giúp rèn luyện tư duy tính toán theo bước.",
      actions: ["Thiết kế mê cung", "Thuật toán tìm đường", "Đồ họa 2D"],
      image: "/assets/activity-problem-solving.png"
    },
    sharedWebsite
  ],
  design: [
    {
      id: "visual-story",
      title: "Bộ Truyện Tranh Kỹ Thuật Số",
      description: "Xây dựng nhân vật đại diện, storyboard hoạt hình và hiệu ứng sinh động.",
      actions: ["Tạo hình nhân vật", "Phối màu số", "Kể chuyện thị giác"],
      image: "/assets/activity-visual-storytelling.png"
    },
    {
      id: "3d-universe",
      title: "Thế Giới Không Gian 3D",
      description: "Dựng hình mô hình 3D công trình tương lai và góc học tập thông minh.",
      actions: ["Tư duy không gian", "Dựng khối 3D", "Ánh sáng & vật liệu"],
      image: "/assets/activity-world-building.png"
    },
    {
      id: "digital-brand",
      title: "Bộ Nhận Diện Future Creator",
      description: "Thiết kế logo, poster và huy hiệu biểu tượng cá nhân của riêng con.",
      actions: ["Thiết kế logo", "Nghệ thuật chữ", "Trình bày bố cục"],
      image: "/assets/activity-communication.png"
    },
    sharedWebsite
  ],
  "digital-world": [
    {
      id: "3d-world",
      title: "Thế Giới Số & Cộng Đồng",
      description: "Xây dựng không gian ảo kết nối bạn bè và cùng tham gia thử thách.",
      actions: ["Lập kế hoạch số", "Thiết kế môi trường", "Kiểm thử trải nghiệm"],
      image: "/assets/activity-world-building.png"
    },
    {
      id: "ai-helper",
      title: "Trợ Lý Học Tập AI",
      description: "Xây dựng chatbot mini hướng dẫn làm bài tập và nhắc lịch học.",
      actions: ["Huấn luyện ngữ cảnh", "Giao diện hội thoại", "Kiểm tra phản hồi"],
      image: "/assets/activity-problem-solving.png"
    },
    {
      id: "smart-school",
      title: "Cổng Thông Tin Học Sinh",
      description: "Ứng dụng web mini chia sẻ mẹo học tập và câu lạc bộ sáng tạo.",
      actions: ["Thiết kế UI/UX", "Phân loại nội dung", "Bảo mật tài khoản"],
      image: "/assets/activity-robotics.png"
    },
    sharedWebsite
  ]
};

const label = (id: string) => labels[id] ?? id;
const selected = (answers: JourneyAnswers, step: string) => answers.selections[step] ?? [];

export function computeSignals(answers: JourneyAnswers) {
  const all = Object.values(answers.selections).flat();
  const score = (ids: string[], base = 5) => {
    const hits = ids.reduce((sum, id) => sum + (all.includes(id) ? 2.5 : 0), 0);
    return Math.min(10, Math.max(3, base + hits));
  };

  return [
    {
      key: "creativity",
      label: "Sáng tạo",
      value: score(["creative", "ideas", "design", "sketch", "game"], 6)
    },
    {
      key: "logic",
      label: "Tư duy Logic",
      value: score(["solve", "inspect", "research", "robot", "guide"], 5.5)
    },
    {
      key: "persistence",
      label: "Thử nghiệm & Kiên trì",
      value: score(["experiment", "retry", "persistent", "make"], 6.5)
    },
    {
      key: "planning",
      label: "Phân tích & Kế hoạch",
      value: score(["sketch", "inspect", "guide", "research"], 5)
    },
    {
      key: "collaboration",
      label: "Hợp tác & Kết nối",
      value: score(["team", "ask", "talk", "share", "community", "family"], 6)
    }
  ];
}

export function getTags(answers: JourneyAnswers, steps: JourneyStep[]) {
  const ids = Object.values(answers.selections).flat();
  return [
    ...new Set(
      steps
        .flatMap(step => step.options ?? [])
        .filter(option => ids.includes(option.id))
        .flatMap(option => option.tags)
    )
  ];
}

export function buildRoadmapProjects(primaryTrack: string, isPrimary: boolean): RoadmapProject[] {
  const roadmaps: Record<string, RoadmapProject[]> = {
    robot: [
      {
        stage: "Chặng 1",
        duration: "Tuần 1–4",
        title: isPrimary ? "Làm quen với Động cơ & Cảm biến" : "Kiến trúc Phần cứng & Cảm biến IoT",
        focus: isPrimary ? "Lắp ráp mô hình xe chạy và nhận biết bánh xe, động cơ" : "Khảo sát cảm biến khoảng cách, vi điều khiển và mạch nguồn",
        skills: ["Cơ khí cơ bản", "Cảm biến", "An toàn điện"],
        deliverable: "Xe robot di chuyển thẳng và dừng đúng vạch"
      },
      {
        stage: "Chặng 2",
        duration: "Tuần 5–8",
        title: isPrimary ? "Lập trình Robot Né Vật Cản" : "Thuật toán Xử lý Tín hiệu Cảm biến",
        focus: isPrimary ? "Dùng khối lệnh để robot tự quay đầu khi gặp tường" : "Lập trình đọc tín hiệu liên tục và điều khiển tốc độ động cơ",
        skills: ["Khối lệnh logic", "Xử lý va chạm", "Hiệu chỉnh tham số"],
        deliverable: "Robot tự động vượt mê cung đơn giản"
      },
      {
        stage: "Chặng 3",
        duration: "Tuần 9–12",
        title: isPrimary ? "Nâng cấp Nhiệm vụ Thông minh" : "Tích hợp IoT & Điều khiển Từ xa",
        focus: isPrimary ? "Gắn thêm tay gắp hoặc còi báo để mang đồ vật nhỏ" : "Kết nối Wi-Fi/Bluetooth để giám sát và nhận lệnh từ xa",
        skills: ["Cơ cấu chấp hành", "Giao tiếp không dây", "Gỡ lỗi hệ thống"],
        deliverable: "Cỗ máy trợ lý thông minh hoàn chỉnh"
      },
      {
        stage: "Chặng 4",
        duration: "Tuần 13–16",
        title: isPrimary ? "Triển lãm & Chia sẻ Sản phẩm" : "Hoàn thiện Portfolio & Trình diễn",
        focus: isPrimary ? "Kể câu chuyện về chú robot và biểu diễn cùng bạn bè" : "Làm video thuyết minh kỹ thuật và đưa vào website cá nhân",
        skills: ["Thuyết trình dự án", "Xây dựng portfolio", "Tư duy phản biện"],
        deliverable: "Website Future Me & Video demo dự án"
      }
    ],
    game: [
      {
        stage: "Chặng 1",
        duration: "Tuần 1–4",
        title: isPrimary ? "Tạo Nhân Vật & Thế Giới Đầu Tiên" : "Thiết kế Màn chơi & Cơ chế Game",
        focus: isPrimary ? "Vẽ nhân vật hoạt hình và cho nhân vật di chuyển theo phím" : "Xây dựng hệ tọa độ 2D, điều khiển phím/chuột và trọng lực",
        skills: ["Tạo hình sprite", "Sự kiện bàn phím", "Tọa độ 2D"],
        deliverable: "Màn chơi di chuyển cơ bản với âm thanh"
      },
      {
        stage: "Chặng 2",
        duration: "Tuần 5–8",
        title: isPrimary ? "Thêm Thử Thách & Tính Điểm" : "Hệ thống Va chạm & Trạng thái Game",
        focus: isPrimary ? "Thu thập vật phẩm để cộng điểm, tránh né chướng ngại vật" : "Xử lý thuật toán va chạm (Collision Detection) và vòng lặp game",
        skills: ["Biến số điểm số", "Điều kiện rẽ nhánh", "Hiệu ứng va chạm"],
        deliverable: "Game vượt chướng ngại vật có tính điểm"
      },
      {
        stage: "Chặng 3",
        duration: "Tuần 9–12",
        title: isPrimary ? "Nhiều Màn Chơi & Boss Thử Thách" : "Thiết kế Trải nghiệm Người chơi (UX)",
        focus: isPrimary ? "Thiết kế màn 1, màn 2 và màn trùm cuối kỳ thú" : "Tối ưu độ khó tăng dần, giao diện Menu, Pause và Game Over",
        skills: ["Quản lý màn chơi", "Logic màn trùm", "Cân bằng game"],
        deliverable: "Tựa game hoàn chỉnh với 3 cấp độ chơi"
      },
      {
        stage: "Chặng 4",
        duration: "Tuần 13–16",
        title: isPrimary ? "Mời Bạn Bè Chơi & Chia Sẻ" : "Đóng gói & Giới thiệu Dự án Game",
        focus: isPrimary ? "Lắng nghe bạn bè góp ý để chỉnh sửa trò chơi hay hơn" : "Tối ưu hiệu năng, tạo trang giới thiệu và chia sẻ mã nguồn",
        skills: ["Kiểm thử người dùng", "Tiếp thu phản hồi", "Phát hành dự án"],
        deliverable: "Bản game trực tuyến trên website cá nhân"
      }
    ],
    design: [
      {
        stage: "Chặng 1",
        duration: "Tuần 1–4",
        title: isPrimary ? "Vẽ Nhân Vật Hoạt Hình Yêu Thích" : "Nguyên lý Thiết kế Thị giác & Bố cục",
        focus: isPrimary ? "Sử dụng các hình khối tròn, vuông để tạo dáng nhân vật" : "Học về tỉ lệ vàng, hệ màu RGB/CMYK và bố cục lưới",
        skills: ["Tạo hình cơ bản", "Phối màu hài hòa", "Sử dụng bảng vẽ"],
        deliverable: "Bản thiết kế nhân vật hoàn chỉnh đa góc nhìn"
      },
      {
        stage: "Chặng 2",
        duration: "Tuần 5–8",
        title: isPrimary ? "Làm Chuyển Động Hoạt Hình Ngắn" : "Nghệ thuật Kể chuyện Storyboard & Motion",
        focus: isPrimary ? "Làm nhân vật nhấp nháy mắt, vẫy tay và bước đi" : "Xây dựng kịch bản phân cảnh và làm chuyển động Keyframe mượt mà",
        skills: ["Khái niệm khung hình", "Dòng thời gian", "Biểu cảm nhân vật"],
        deliverable: "Đoạn hoạt hình ngắn 15–30 giây"
      },
      {
        stage: "Chặng 3",
        duration: "Tuần 9–12",
        title: isPrimary ? "Khám phá Không gian 3D Sáng tạo" : "Dựng hình 3D & Hiệu ứng Ánh sáng",
        focus: isPrimary ? "Tạo một căn phòng hoặc phi thuyền 3D của riêng con" : "Dựng khối 3D chi tiết, áp vật liệu và xử lý góc quay máy quay",
        skills: ["Tư duy không gian 3D", "Gán chất liệu", "Bố trí góc nhìn"],
        deliverable: "Mô hình 3D hoàn chỉnh không gian tương lai"
      },
      {
        stage: "Chặng 4",
        duration: "Tuần 13–16",
        title: isPrimary ? "Trang Trí Phòng Triển Lãm Số" : "Hoàn thiện Digital Art Portfolio",
        focus: isPrimary ? "Tập hợp các tranh vẽ và chuyển động thành một cuốn sách ảnh" : "Thiết kế trang danh mục tác phẩm chuyên nghiệp chuẩn quốc tế",
        skills: ["Trình bày portfolio", "Kể chuyện thương hiệu", "Xuất file chuẩn"],
        deliverable: "Phòng trưng bày nghệ thuật số cá nhân"
      }
    ]
  };

  return roadmaps[primaryTrack] ?? roadmaps["robot"];
}

export function createProfile(answers: JourneyAnswers) {
  const interests = selected(answers, "interest");
  const parent = selected(answers, "parent");
  const primaryTrack = interests[0] ?? "robot";
  const isPrimary = ["1-2", "3-5"].includes(answers.gradeBand);

  const archetypes: Record<string, string> = {
    robot: isPrimary ? "Nhà Kiến Tạo Nhỏ" : "Kỹ Sư Kiến Tạo Tương Lai",
    game: isPrimary ? "Nhà Thiết Kế Thế Giới" : "Nhà Phát Triển Ứng Dụng & Game",
    design: isPrimary ? "Nghệ Sĩ Sáng Tạo Số" : "Nhà Thiết Kế Đa Phương Tiện",
    "digital-world": isPrimary ? "Nhà Khám Phá Công Nghệ" : "Chuyên Gia Đổi Mới Sáng Tạo Số"
  };

  const archetype = archetypes[primaryTrack] ?? (isPrimary ? "Nhà Sáng Tạo Nhỏ" : "Nhà Kiến Tạo Tương Lai");

  const portraitByInterest: Record<string, { styles: string[]; colors: string[]; gear: string[] }> = {
    robot: {
      styles: ["3D nhà phát minh nhỏ", "Cartoon kỹ sư khám phá", "Minh họa STEM hiện đại"],
      colors: ["Xanh ngọc TEKY", "Xanh dương khám phá", "Vàng năng lượng"],
      gear: ["Kính khám phá thông minh", "Robot đồng hành Kitten Bot", "Bộ dụng cụ sáng chế"]
    },
    game: {
      styles: ["Phong cách game phiêu lưu", "3D nhà kiến tạo thế giới", "Cartoon pixel mềm mại"],
      colors: ["Xanh ngọc TEKY", "Tím sáng tạo", "Vàng năng lượng"],
      gear: ["Tay cầm sáng tạo", "Bản đồ thế giới số", "Balo nhà kiến tạo"]
    },
    design: {
      styles: ["Minh họa truyện tranh", "3D nghệ sĩ sáng tạo", "Cartoon kể chuyện"],
      colors: ["Vàng năng lượng", "Tím sáng tạo", "Xanh ngọc TEKY"],
      gear: ["Bút vẽ ánh sáng", "Máy tính bảng thiết kế", "Sổ ý tưởng số"]
    },
    "digital-world": {
      styles: ["3D nhà khám phá tương lai", "Cartoon công nghệ hiện đại", "Minh họa thế giới số"],
      colors: ["Xanh dương khám phá", "Xanh ngọc TEKY", "Tím sáng tạo"],
      gear: ["Trợ lý AI Kitten Bot", "Máy tính bảng thiết kế", "Kính thực tế ảo"]
    }
  };

  const portraitSuggestions = portraitByInterest[primaryTrack] ?? portraitByInterest["robot"];

  const futureSelfByImpact: Record<string, string> = {
    family: isPrimary ? "tạo sản phẩm thông minh giúp đỡ ba mẹ và gia đình" : "phát triển giải pháp công nghệ hỗ trợ đời sống gia đình",
    school: isPrimary ? "biến việc học và chơi ở trường thành một cuộc phiêu lưu thú vị" : "xây dựng nền tảng học tập tương tác sáng tạo cho học sinh",
    earth: isPrimary ? "dùng công nghệ để chăm sóc cây xanh và bảo vệ Trái đất" : "ứng dụng IoT và công nghệ xanh để bảo vệ môi trường",
    community: isPrimary ? "tạo sản phẩm giúp mọi người kết nối và chia sẻ niềm vui" : "kiến tạo nền tảng kết nối cộng đồng có sức lan tỏa tích cực"
  };

  const impact = selected(answers, "impact")[0] ?? "community";
  const defaultFutureSelf = futureSelfByImpact[impact] ?? "sáng tạo điều mới giúp ích cho cuộc sống";
  const futureSelf = answers.futureSelf?.trim() || defaultFutureSelf;

  const rawTraits = [
    ...selected(answers, "strength"),
    ...selected(answers, "creation-style"),
    ...selected(answers, "problem-strategy")
  ].map(label);

  const traitCandidates = [...new Set(rawTraits)].slice(0, 5);
  const confirmedTraits = answers.confirmedTraits?.length ? answers.confirmedTraits : traitCandidates.slice(0, 3);

  const parentLabels = parent.map(label);
  const parentSummary = parentLabels.length
    ? isPrimary
      ? `Ba mẹ nhận thấy con ${parentLabels.map(item => item.toLowerCase()).join(", ")} khi được làm điều mình thích.`
      : `Gia đình quan sát thấy con thường ${parentLabels.map(item => item.toLowerCase()).join(", ")} trong cuộc sống hằng ngày.`
    : "Ba mẹ luôn ủng hộ và sẵn sàng đồng hành cùng con trong các thử nghiệm mới.";

  const projects = library[primaryTrack] ?? library["robot"];
  const roadmap = buildRoadmapProjects(primaryTrack, isPrimary);
  const radarSignals = computeSignals(answers);

  // Concise observed evidence points (Evidence Traceability)
  const observedEvidences = isPrimary
    ? [
        "Nhận biết được mục đích và các bộ phận cơ bản khi sáng tạo sản phẩm.",
        "Thể hiện tư duy tuần tự theo từng bước khi giải quyết nhiệm vụ.",
        "Biết cách bình tĩnh thử lại phương án mới khi hệ thống gặp lỗi."
      ]
    : [
        "Phân rã tốt bài toán công nghệ thành các phân hệ và chức năng cụ thể.",
        "Xác định được đối tượng thụ hưởng và giá trị thực tiễn của sản phẩm.",
        "Áp dụng quy trình cô lập lỗi logic và sẵn sàng thử nghiệm phương án cải tiến."
      ];

  const characterBrief = {
    format: "Nhân vật minh họa 3D toàn thân, phong cách hoạt hình hiện đại, thân thiện trẻ em, không dùng ảnh người thật",
    ageGroup: isPrimary ? "Học sinh Tiểu học (6–11 tuổi)" : "Học sinh THCS (11–15 tuổi)",
    identity: `${archetype} với ước mơ ${futureSelf}`,
    style: answers.characterStyle || portraitSuggestions.styles[0],
    palette: answers.favoriteColor || portraitSuggestions.colors[0],
    signatureGear: answers.signatureGear || portraitSuggestions.gear[0],
    expression: "Ánh mắt tò mò, tự tin, nụ cười ấm áp và tinh thần sẵn sàng khám phá",
    background: "Nền sáng tối giản, nhấn nhá chi tiết công nghệ tương lai và trợ lý Kitten Bot"
  };

  return {
    isPrimary,
    archetype,
    futureSelf,
    primaryTrack,
    interestLabels: interests.map(label),
    strengthLabels: confirmedTraits,
    traitCandidates,
    parentLabels,
    parentSummary,
    parentMoment: answers.parentMoment?.trim(),
    projects,
    roadmap,
    radarSignals,
    observedEvidences,
    portraitSuggestions: {
      ...portraitSuggestions,
      futureSelf: [
        defaultFutureSelf,
        `người tạo ra ${projects[0].title.toLowerCase()}`,
        "người luôn tò mò và biến ý tưởng thành điều hữu ích"
      ]
    },
    characterBrief,
    directions: {
      featured: projects[0].title,
      tryNext: projects[1]?.title || "Khám phá mở rộng",
      exploreMore: projects[2]?.title || "Thử nghiệm chuyên sâu"
    },
    structuredData: {
      grade_band: answers.gradeBand,
      is_primary: isPrimary,
      archetype,
      future_self: futureSelf,
      signals: radarSignals,
      observed_evidences: observedEvidences,
      parent_summary: parentSummary,
      parent_moment: answers.parentMoment,
      roadmap: roadmap.map(r => ({ stage: r.stage, duration: r.duration, title: r.title, deliverable: r.deliverable }))
    },
    summary: isPrimary
      ? `${answers.name || "Con"} có niềm say mê đặc biệt với việc biến ý tưởng thành sản phẩm và luôn tìm cách riêng để vượt qua thử thách.`
      : `${answers.name || "Bạn"} bộc lộ tư duy logic sắc bén, định hướng giải pháp rõ ràng và khả năng sáng tạo độc lập đáng khen ngợi.`,
    suggestedFutureSelf: futureSelf,
    rewrittenFutureSelf: futureSelf,
    futureSelfSource: "canonical"
  };
}

export type DiscoveryProfile = ReturnType<typeof createProfile>;

export function createPrompt(answers: JourneyAnswers) {
  const p = createProfile(answers);
  const targetLevel = p.isPrimary ? "HỌC SINH TIỂU HỌC (Lớp 1–5)" : "HỌC SINH THCS (Lớp 6–9)";
  const designTone = p.isPrimary
    ? "Gam màu TEKY tươi vui (xanh ngọc #18af99, vàng #ffd044, nền trắng sáng), thẻ to bo tròn 28px, nút bấm nổi bật, hình ảnh nhân vật lớn, giao diện sinh động, ít chữ, tập trung hình ảnh và trải nghiệm tương tác trực quan."
    : "Phong cách Sleek Tech / Digital Portfolio hiện đại, gam màu xanh ngọc TEKY phối hợp dark/light contrast thanh lịch, thẻ phẳng hiện đại bo tròn 18px, typography sắc nét, trình bày các chỉ số năng lực, dự án và lộ trình 16 tuần chuyên nghiệp.";

  return `TẠO SINGLE-PAGE WEBSITE "FUTURE ME"

MỤC TIÊU & ĐỐI TƯỢNG:
- Dành cho: ${targetLevel} và gia đình.
- Tên học sinh: ${answers.name || "Future Creator"}
- Danh xưng cá nhân: ${p.archetype}
- Ước mơ dự án: ${p.futureSelf}
- Dự án tâm điểm: "${answers.projectName || p.projects[0].title}"

YÊU CẦU THIẾT KẾ UI/UX (VISUAL-FIRST):
- ${designTone}
- Tránh các khối văn bản dài rườm rà. Dùng thẻ card, huy hiệu (badges), icons trực quan và bố cục thoáng đãng.
- Không hiển thị điểm số thi cử hoặc chẩn đoán nghề nghiệp. Tôn trọng tinh thần khám phá và học tập linh hoạt.

CẤU TRÚC GIAO DIỆN (SECTIONS):
1. HERO SECTION:
   - Tên: ${answers.name || "Con"} — ${p.archetype}
   - Tuyên ngôn ước mơ: "Ước mơ của tôi: ${p.futureSelf}"
   - Huy hiệu nhân vật: ${p.characterBrief.style} | Màu: ${p.characterBrief.palette} | Vật phẩm: ${p.characterBrief.signatureGear}
   - Trợ lý đồng hành: Kitten Bot
   - Nút Call-to-Action: "Khám phá các dự án của tôi"

2. TÍN HIỆU SÁNG TẠO & ĐIỂM BẮT ĐẦU:
   - Hiển thị 5 trục tín hiệu bộc lộ dạng Radar / Metric Bars:
     * Sáng tạo: ${p.radarSignals[0].value}/10 (Tín hiệu rõ nét)
     * Tư duy Logic: ${p.radarSignals[1].value}/10
     * Thử nghiệm & Kiên trì: ${p.radarSignals[2].value}/10
     * Phân tích & Kế hoạch: ${p.radarSignals[3].value}/10
     * Hợp tác & Kết nối: ${p.radarSignals[4].value}/10
   - 3 điểm sáng quan sát được:
${p.observedEvidences.map(e => `     • ${e}`).join("\n")}
   - Lời nhắn từ gia đình: "${p.parentSummary}"

3. THẺ DỰ ÁN TRONG MƠ (DREAM PROJECT SHOWCASE):
   - Dự án: "${answers.projectName || p.projects[0].title}"
   - Mô tả ngắn: ${p.projects[0].description}
   - Các hành động chính: ${p.projects[0].actions.join(" • ")}

4. BẢN ĐỒ LỘ TRÌNH 4 DỰ ÁN (16 TUẦN):
${p.roadmap.map(item => `   - [${item.stage} · ${item.duration}] ${item.title}: ${item.focus} (Sản phẩm: ${item.deliverable})`).join("\n")}
   - Checkpoint linh hoạt sau mỗi chặng: Con vẫn rất thích • Con muốn thử thách khó hơn • Con muốn thử hướng khác.

5. FOOTER:
   - "Được khởi tạo từ hành trình Future Creator Journey cùng Kitten Bot & TEKY."
   - Nút hành động: "Bắt đầu chặng 1 cùng gia đình"`;
}
