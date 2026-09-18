import contentData from './v3/contentV3.json';
import stepsConfigData from './v3/stepsConfigV3.json';
import type { JourneyAnswers, FutureMeImageAsset, FutureMeImageManifest } from '@/types/journey';
import type {
  CapabilityTarget,
  ProjectFeature,
  ProjectFeatureTask,
  DetailedPersonalizedProject,
  FutureCapabilityPortfolioData
} from '@/types/dataContractV3';

export type V3Step = typeof stepsConfigData.steps[number];

export const v3Steps = stepsConfigData.steps;
export const v3Content = contentData;

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

/**
 * Ma trận mục tiêu năng lực mục tiêu (Target Capabilities: Knowledge, Skills, Competencies)
 * Liên kết đa chiều (multilateral) với các dự án P1-P4 và chức năng F-xx
 */
export function getDomainCapabilityTargets(domain: string = 'robotics', isPrimary: boolean = true): {
  knowledge: CapabilityTarget[];
  skills: CapabilityTarget[];
  competencies: CapabilityTarget[];
} {
  if (domain === 'robotics') {
    return {
      knowledge: [
        {
          id: 'K-01',
          type: 'knowledge',
          name: 'Nguyên lý Mạch Điện & Khối Vi Điều Khiển',
          description: isPrimary
            ? 'Hiểu cách dòng điện cung cấp năng lượng và cách khối điều khiển gửi tín hiệu đến động cơ.'
            : 'Hiểu cấu tạo mạch vi điều khiển (ESP32/Arduino), tín hiệu GPIO, nguồn pin và logic điều khiển số.',
          projectIds: ['P1', 'P2'],
          featureIds: ['F-P1-01', 'F-P2-01'],
          outcomeCriteria: ['Nhận biết đúng cực âm/dương nguồn điện', 'Giải thích được vai trò khối điều khiển'],
          standardRef: 'CSTA-ALGO'
        },
        {
          id: 'K-02',
          type: 'knowledge',
          name: 'Cảm Biến & Thuật Toán Phản Hồi Môi Trường',
          description: isPrimary
            ? 'Hiểu cách cảm biến siêu âm phát hiện vật cản và cảm biến dò đường nhận biết vạch kẻ.'
            : 'Thuật toán đọc tín hiệu cảm biến (Analog/Digital), xử lý chống nhiễu và thuật toán phản hồi điều khiển kín.',
          projectIds: ['P2', 'P3', 'P4'],
          featureIds: ['F-P2-01', 'F-P3-01', 'F-P4-01'],
          outcomeCriteria: ['Lập trình robot dừng cách vật cản an toàn', 'Robot bám vạch kẻ chính xác'],
          standardRef: 'CSTA-ALGO'
        },
        {
          id: 'K-03',
          type: 'knowledge',
          name: 'Cơ Học Chuyển Động & Tỷ Số Truyền Động Cơ',
          description: isPrimary
            ? 'Hiểu bánh răng truyền chuyển động giúp robot di chuyển nhanh hay khỏe hơn.'
            : 'Tính toán tỷ số truyền động cơ Servo/DC, phân bố trọng tâm và mô-men xoắn cho tay gắp.',
          projectIds: ['P1', 'P3', 'P4'],
          featureIds: ['F-P1-02', 'F-P3-02', 'F-P4-02'],
          outcomeCriteria: ['Khung xe chuyển động vững vàng', 'Cơ cấu tay gắp/khay nâng giữ vật không rơi'],
          standardRef: 'ISTE-INNOVATIVE'
        }
      ],
      skills: [
        {
          id: 'S-01',
          type: 'skill',
          name: 'Lắp Ráp & Kết Nối Phần Cứng An Toàn',
          description: isPrimary
            ? 'Lắp ghép khung cơ khí chắc chắn, cắm dây nối đúng cổng màu sắc an toàn.'
            : 'Đấu nối mạch điện tử đúng sơ đồ, sử dụng module cầu H an toàn và bố trí dây gọn gàng.',
          projectIds: ['P1', 'P3'],
          featureIds: ['F-P1-01', 'F-P3-02'],
          outcomeCriteria: ['Mạch kết nối đúng không bị chập', 'Khung mô hình đạt độ ổn định cơ học'],
          standardRef: 'NLS-DIGITAL-MASTERY'
        },
        {
          id: 'S-02',
          type: 'skill',
          name: 'Lập Trình Khối Lệnh / Mã Nguồn Điều Khiển',
          description: isPrimary
            ? 'Kéo thả khối lệnh logic tuần tự, vòng lặp liên tục và rẽ nhánh điều kiện Nếu - Thì.'
            : 'Viết mã kịch bản điều khiển phần cứng đa luồng, xử lý ngắt và truyền nhận dữ liệu IoT.',
          projectIds: ['P2', 'P3', 'P4'],
          featureIds: ['F-P2-01', 'F-P3-01', 'F-P4-01'],
          outcomeCriteria: ['Chương trình nạp thành công vào robot', 'Robot phản hồi chính xác theo tình huống'],
          standardRef: 'CSTA-ALGO'
        },
        {
          id: 'S-03',
          type: 'skill',
          name: 'Đo Kiểm, Thử Nghiệm & Sửa Lỗi Kỹ Thuật (Debug)',
          description: isPrimary
            ? 'Quan sát robot khi chạy sai, kiểm tra từng dây cắm hoặc câu lệnh để sửa lỗi.'
            : 'Đo điện áp, đọc log tín hiệu cổng Serial và hiệu chỉnh thông số thuật toán.',
          projectIds: ['P1', 'P2', 'P3', 'P4'],
          featureIds: ['F-P1-02', 'F-P2-02', 'F-P3-02', 'F-P4-02'],
          outcomeCriteria: ['Xác định được đúng vị trí gây ra lỗi', 'Thử nghiệm lặp lại cho đến khi hoạt động trơn tru'],
          standardRef: 'ISTE-INNOVATIVE'
        }
      ],
      competencies: [
        {
          id: 'C-01',
          type: 'competency',
          name: 'Tư Duy Thiết Kế Hệ Thống Tích Hợp (Phần Cứng & Phần Mềm)',
          description: 'Khả năng phối hợp đồng bộ giữa cơ khí, điện tử và mã lệnh điều khiển để tạo thành sản phẩm thông minh.',
          projectIds: ['P2', 'P4'],
          featureIds: ['F-P2-02', 'F-P4-01'],
          outcomeCriteria: ['Sản phẩm vận hành hài hòa giữa thân máy và phần mềm', 'Tối ưu hóa nguồn pin và hiệu suất'],
          standardRef: 'ISTE-INNOVATIVE'
        },
        {
          id: 'C-02',
          type: 'competency',
          name: 'Thử Nghiệm Lặp Lại & Tối Ưu Hóa An Toàn Thực Tế',
          description: 'Thái độ kiên trì đối mặt với sự cố kỹ thuật, cải tiến thiết kế và ưu tiên tiêu chuẩn an toàn cho người dùng.',
          projectIds: ['P1', 'P2', 'P3', 'P4'],
          featureIds: ['F-P1-02', 'F-P2-02', 'F-P3-01', 'F-P4-02'],
          outcomeCriteria: ['Có ghi chép nhật ký thử nghiệm', 'Trang bị cơ chế dừng an toàn trước vật cản'],
          standardRef: 'ISTE-INNOVATIVE'
        },
        {
          id: 'C-03',
          type: 'competency',
          name: 'Giải Quyết Bài Toán Thực Tế Phục Vụ Cộng Đồng',
          description: 'Vận dụng sáng tạo tự động hóa để hỗ trợ con người, giải quyết nhu cầu đời sống thiết thực.',
          projectIds: ['P3', 'P4'],
          featureIds: ['F-P3-01', 'F-P4-01', 'F-P4-02'],
          outcomeCriteria: ['Sản phẩm phục vụ đúng đối tượng mục tiêu', 'Nhận được phản hồi tích cực khi thử nghiệm'],
          standardRef: 'NLS-DIGITAL-MASTERY'
        }
      ]
    };
  }

  if (domain === 'game_programming') {
    return {
      knowledge: [
        {
          id: 'K-01',
          type: 'knowledge',
          name: 'Cấu Trúc Dữ Liệu & Biến Số Trạng Thái Game',
          description: isPrimary
            ? 'Hiểu cách dùng biến số để lưu điểm số, mạng chơi và trạng thái thắng/thua.'
            : 'Quản lý mảng danh sách vật phẩm, biến toàn cục/cục bộ và luồng dữ liệu người chơi.',
          projectIds: ['P1', 'P2'],
          featureIds: ['F-P1-01', 'F-P2-01'],
          outcomeCriteria: ['Điểm số cập nhật đúng khi thu thập vật phẩm', 'Game kết thúc chính xác khi hết mạng'],
          standardRef: 'CSTA-ALGO'
        },
        {
          id: 'K-02',
          type: 'knowledge',
          name: 'Vòng Lặp Game Loop & Xử Lý Va Chạm Vật Lý (Collision)',
          description: isPrimary
            ? 'Hiểu nguyên lý chuyển động theo tọa độ X-Y và cơ chế chạm vào nhân vật hoặc chướng ngại vật.'
            : 'Vòng lặp Update/Render trong Game Loop, tính toán hitbox, trọng lực và phản lực va chạm.',
          projectIds: ['P1', 'P2', 'P3'],
          featureIds: ['F-P1-02', 'F-P2-01', 'F-P3-01'],
          outcomeCriteria: ['Nhân vật chuyển động mượt mà', 'Va chạm kích hoạt chính xác hiệu ứng tương ứng'],
          standardRef: 'CSTA-ALGO'
        },
        {
          id: 'K-03',
          type: 'knowledge',
          name: 'Thuật Toán Máy Trạng Thái (FSM) & Hành Vi Đối Thủ AI',
          description: isPrimary
            ? 'Lập trình cho đối thủ tự động di chuyển tuần tra và đổi hướng khi gặp chướng ngại vật.'
            : 'Xây dựng Finite State Machine (Idle, Patrol, Chase, Attack) và thuật toán tìm đường căn bản.',
          projectIds: ['P3', 'P4'],
          featureIds: ['F-P3-01', 'F-P4-01'],
          outcomeCriteria: ['Đối thủ AI có phản xạ linh hoạt', 'Tăng độ hấp dẫn thử thách cho màn chơi'],
          standardRef: 'ISTE-INNOVATIVE'
        }
      ],
      skills: [
        {
          id: 'S-01',
          type: 'skill',
          name: 'Thiết Kế Cơ Chế Điều Khiển & Phản Hồi Trải Nghiệm',
          description: isPrimary
            ? 'Lập trình phím mũi tên / chuột để điều khiển nhân vật nhảy, né và hành động nhạy bén.'
            : 'Xây dựng Input Controller đa nền tảng (bàn phím, gamepad, cảm ứng) với phản hồi tức thì.',
          projectIds: ['P1', 'P2'],
          featureIds: ['F-P1-01', 'F-P2-02'],
          outcomeCriteria: ['Nhân vật không bị trễ lệnh điều khiển', 'Cảm giác nhảy/di chuyển tự nhiên'],
          standardRef: 'CSTA-ALGO'
        },
        {
          id: 'S-02',
          type: 'skill',
          name: 'Lập Trình Logic Kịch Bản Nhiệm Vụ & Màn Chơi',
          description: isPrimary
            ? 'Thiết lập các màn chơi (Level) với độ khó tăng dần và thông báo nhiệm vụ rõ ràng.'
            : 'Quản lý Scene Transition, Spawn Manager phát sinh quái ngẫu nhiên và hệ thống lưu điểm.',
          projectIds: ['P2', 'P3', 'P4'],
          featureIds: ['F-P2-01', 'F-P3-01', 'F-P4-01'],
          outcomeCriteria: ['Chuyển màn chơi mượt mà không lỗi', 'Độ khó cân bằng tạo động lực cho người chơi'],
          standardRef: 'ISTE-INNOVATIVE'
        },
        {
          id: 'S-03',
          type: 'skill',
          name: 'Kiểm Thử Gameplay, Cân Bằng & Sửa Lỗi Logic (Bug Tracking)',
          description: isPrimary
            ? 'Chơi thử nhiều lần để tìm các tình huống nhân vật bị kẹt màn hình hoặc nhảy xuyên tường.'
            : 'Sử dụng console debug, đo FPS và tối ưu hóa tài nguyên tránh giật lag khi chơi game.',
          projectIds: ['P1', 'P2', 'P3', 'P4'],
          featureIds: ['F-P1-02', 'F-P2-02', 'F-P3-02', 'F-P4-02'],
          outcomeCriteria: ['Không có lỗi nghiêm trọng crash game', 'Gameplay ổn định ở tốc độ 30-60 FPS'],
          standardRef: 'ISTE-INNOVATIVE'
        }
      ],
      competencies: [
        {
          id: 'C-01',
          type: 'competency',
          name: 'Tư Duy Thuật Toán & Trừu Tượng Hóa Bài Toán',
          description: 'Khả năng phân tích một ý tưởng trò chơi phức tạp thành các khối lệnh logic rõ ràng và tối ưu.',
          projectIds: ['P2', 'P3', 'P4'],
          featureIds: ['F-P2-01', 'F-P3-01', 'F-P4-01'],
          outcomeCriteria: ['Cấu trúc code ngăn nắp, dễ đọc hiểu', 'Giải quyết được vấn đề logic tương tác đa phần tử'],
          standardRef: 'CSTA-ALGO'
        },
        {
          id: 'C-02',
          type: 'competency',
          name: 'Thấu Cảm Trải Nghiệm Người Dùng (UX & Game Design)',
          description: 'Thiết kế luật chơi công bằng, giao diện dễ tiếp cận và khích lệ người chơi vượt qua thử thách.',
          projectIds: ['P1', 'P3', 'P4'],
          featureIds: ['F-P1-01', 'F-P3-02', 'F-P4-02'],
          outcomeCriteria: ['Người mới chơi hiểu được cách chơi trong 1 phút', 'Giao diện điểm số và hướng dẫn rõ ràng'],
          standardRef: 'NLS-DIGITAL-MASTERY'
        },
        {
          id: 'C-03',
          type: 'competency',
          name: 'Hiện Thực Hóa Sản Phẩm Phần Mềm Hoàn Chỉnh',
          description: 'Hoàn thiện sản phẩm từ ý tưởng ban đầu đến bản phát hành cho bạn bè và cộng đồng trải nghiệm.',
          projectIds: ['P3', 'P4'],
          featureIds: ['F-P3-02', 'F-P4-01', 'F-P4-02'],
          outcomeCriteria: ['Đóng gói sản phẩm chạy độc lập', 'Thu nhận và lắng nghe đóng góp để nâng cấp bản tiếp theo'],
          standardRef: 'ISTE-INNOVATIVE'
        }
      ]
    };
  }

  // multimedia
  return {
    knowledge: [
      {
        id: 'K-01',
        type: 'knowledge',
        name: 'Nguyên Lý Bố Cục, Phối Cảnh & Tỷ Lệ Thị Giác',
        description: isPrimary
          ? 'Hiểu cách sắp xếp nhân vật và cảnh vật theo tỷ lệ cân đối, làm nổi bật điểm nhìn chính.'
          : 'Quy tắc 1/3, phối cảnh điểm tụ 3D, chiều sâu không gian và phân cấp thị giác (Visual Hierarchy).',
        projectIds: ['P1', 'P2'],
        featureIds: ['F-P1-01', 'F-P2-01'],
        outcomeCriteria: ['Bố cục tranh/mô hình cân đối', 'Người xem nhận ra ngay chủ thể nổi bật'],
        standardRef: 'CSTA-ALGO'
      },
      {
        id: 'K-02',
        type: 'knowledge',
        name: 'Lý Thuyết Màu Sắc HSL & Ánh Sáng Tạo Hình Số',
        description: isPrimary
          ? 'Phối hợp màu sắc tương phản và hài hòa để thể hiện cảm xúc vui tươi hay bí ẩn.'
          : 'Không gian màu HSL/RGB, chiếu sáng 3 điểm (Key, Fill, Rim Light) và đổ bóng tạo khối 3D.',
        projectIds: ['P1', 'P2', 'P3'],
        featureIds: ['F-P1-02', 'F-P2-01', 'F-P3-01'],
        outcomeCriteria: ['Bảng màu chủ đạo đồng nhất', 'Ánh sáng tôn lên đường nét của công trình/nhân vật'],
        standardRef: 'ISTE-INNOVATIVE'
      },
      {
        id: 'K-03',
        type: 'knowledge',
        name: 'Dựng Hình 3D & Không Gian Di Sản Số Văn Hóa',
        description: isPrimary
          ? 'Ghép nối các khối hình học cơ bản trong Tinkercad thành công trình di sản quen thuộc.'
          : 'Dựng lưới đa giác 3D (Polygon Mesh), áp vật liệu Texture và kết xuất hình ảnh chất lượng cao.',
        projectIds: ['P2', 'P3', 'P4'],
        featureIds: ['F-P2-02', 'F-P3-02', 'F-P4-01'],
        outcomeCriteria: ['Mô hình 3D hoàn chỉnh các góc nhìn', 'Thể hiện được đặc trưng văn hóa công trình'],
        standardRef: 'NLS-DIGITAL-MASTERY'
      }
    ],
    skills: [
      {
        id: 'S-01',
        type: 'skill',
        name: 'Tạo Hình & Mô Hình Hóa Bằng Công Cụ Số',
        description: isPrimary
          ? 'Thao tác kéo thả khối 3D, xoay góc nhìn và nhóm khối để tạo hình sản phẩm mỹ thuật số.'
          : 'Sử dụng phím tắt Blender/Tinkercad, Extrude khối và tinh chỉnh các đỉnh/cạnh chính xác.',
        projectIds: ['P1', 'P2'],
        featureIds: ['F-P1-01', 'F-P2-01'],
        outcomeCriteria: ['Mô hình không bị rách lưới hay lộn xộn', 'Kích thước cân xứng hài hòa'],
        standardRef: 'NLS-DIGITAL-MASTERY'
      },
      {
        id: 'S-02',
        type: 'skill',
        name: 'Biên Tập Hoạt Hình Keyframe & Hiệu Ứng Chuyển Động',
        description: isPrimary
          ? 'Tạo chuyển động mượt mà cho nhân vật bước đi, biểu cảm vẫy tay hoặc đổi góc nhìn.'
          : 'Làm chủ Timeline, đường cong chuyển động Graph Editor và hiệu ứng ánh sáng động.',
        projectIds: ['P2', 'P3', 'P4'],
        featureIds: ['F-P2-02', 'F-P3-01', 'F-P4-01'],
        outcomeCriteria: ['Chuyển động tự nhiên không bị giật cục', 'Hiệu ứng hoạt hình ăn khớp với nhịp điệu'],
        standardRef: 'ISTE-INNOVATIVE'
      },
      {
        id: 'S-03',
        type: 'skill',
        name: 'Thiết Kế Trải Nghiệm Thị Giác & Xuất Bản Đa Phương Tiện',
        description: isPrimary
          ? 'Lồng ghép phụ đề, âm thanh nền và xuất file video hoạt hình chia sẻ cùng bạn bè.'
          : 'Phối hợp âm thanh Sound FX, thiết kế giao diện tương tác UI/UX và Render video độ phân giải cao.',
        projectIds: ['P3', 'P4'],
        featureIds: ['F-P3-02', 'F-P4-02'],
        outcomeCriteria: ['Video âm thanh rõ nét không vỡ hạt', 'Trình bày tác phẩm tự tin và ấn tượng'],
        standardRef: 'NLS-DIGITAL-MASTERY'
      }
    ],
    competencies: [
      {
        id: 'C-01',
        type: 'competency',
        name: 'Kể Chuyện Bằng Hình Ảnh Số (Visual Storytelling)',
        description: 'Truyền tải thông điệp ý nghĩa và cảm xúc nhân văn thông qua hình ảnh, ánh sáng và chuyển động.',
        projectIds: ['P1', 'P3', 'P4'],
        featureIds: ['F-P1-02', 'F-P3-01', 'F-P4-01'],
        outcomeCriteria: ['Tác phẩm có cốt truyện mạch lạc', 'Khơi gợi được cảm xúc tích cực ở người xem'],
        standardRef: 'ISTE-INNOVATIVE'
      },
      {
        id: 'C-02',
        type: 'competency',
        name: 'Thẩm Mỹ Thị Giác & Tinh Tế Trong Chi Tiết',
        description: 'Tôn trọng chuẩn mực thị giác, kiên nhẫn trau chuốt từng đường nét để tạo ra sản phẩm nghệ thuật hoàn chỉnh.',
        projectIds: ['P1', 'P2', 'P4'],
        featureIds: ['F-P1-01', 'F-P2-01', 'F-P4-02'],
        outcomeCriteria: ['Màu sắc và tỷ lệ đạt độ thẩm mỹ cao', 'Chú ý đến các chi tiết nhỏ tinh tế'],
        standardRef: 'ISTE-INNOVATIVE'
      },
      {
        id: 'C-03',
        type: 'competency',
        name: 'Lan Tỏa Giá Trị Văn Hóa & Phục Vụ Cộng Đồng',
        description: 'Ứng dụng công nghệ đồ họa để tôn vinh nét đẹp văn hóa, lịch sử và giáo dục cho mọi người.',
        projectIds: ['P3', 'P4'],
        featureIds: ['F-P3-02', 'F-P4-01', 'F-P4-02'],
        outcomeCriteria: ['Tác phẩm có chủ đề văn hóa/xã hội rõ ràng', 'Được thầy cô và bạn bè đón nhận nồng nhiệt'],
        standardRef: 'NLS-DIGITAL-MASTERY'
      }
    ]
  };
}

export type V3PersonalizedProject = DetailedPersonalizedProject;

/**
 * Cá nhân hóa 4 dự án theo đúng Ước mơ (Dream Project), cấp học và nhánh chuyên sâu của học sinh
 * Tuân thủ P0: Dự án 4 giữ nguyên tên và ước mơ của học sinh, chia làm bản thử nghiệm v1 (MVP) và mở rộng v2
 * Mỗi dự án có danh sách các chức năng (ProjectFeature) với nhiệm vụ, tiêu chí và liên kết mục tiêu năng lực.
 */
export function generatePersonalizedProjects(answers: JourneyAnswers): DetailedPersonalizedProject[] {
  const isPrimary = !answers.gradeBand || ['1-2', '3-5'].includes(answers.gradeBand) || (answers.grade && parseInt(answers.grade, 10) <= 5);
  const domain = answers.domain || 'robotics';
  const branchKey = answers.branch || (isPrimary ? (domain === 'robotics' ? 'robot_build_and_block_control' : 'game') : 'web');
  const branch = getBranchData(Boolean(isPrimary), branchKey);

  const dreamName = answers.projectName?.trim() || 'Dự Án Sáng Tạo Ước Mơ';
  const dreamAudience = answers.dreamAudience || 'người thân và bạn bè';
  const dreamPurpose = answers.dreamPurpose || 'giải quyết vấn đề thực tế và mang lại niềm vui';
  const dreamFeatures = (answers.dreamFeatures && answers.dreamFeatures.length > 0)
    ? answers.dreamFeatures
    : ['Giao diện thân thiện', 'Tính năng tương tác cốt lõi', 'Chia sẻ cùng mọi người'];

  const libraryProjects = branch?.projects || [];
  const projectImages = domain === 'multimedia'
    ? [
        '/assets/activity-visual-storytelling.png',
        '/assets/activity-world-building.png',
        '/assets/activity-communication.png',
        '/assets/activity-nature-observation.png'
      ]
    : domain === 'robotics'
    ? [
        '/assets/activity-robotics.png',
        '/assets/activity-problem-solving.png',
        '/assets/activity-world-building.png',
        '/assets/activity-communication.png'
      ]
    : [
        '/assets/activity-world-building.png',
        '/assets/activity-problem-solving.png',
        '/assets/activity-visual-storytelling.png',
        '/assets/activity-communication.png'
      ];

  // ── XÁC ĐỊNH TÍNH NĂNG MVP VÀ EXTENSION TỪ DỮ LIỆU ĐÃ CHỌN ──
  // Nguyên tắc: Toàn bộ các đặc trưng cốt lõi mà học sinh chọn (hình minh họa, phối màu, lời chúc/dòng chữ) đều nằm trọn trong MVP!
  // Extension chỉ dành cho tính năng mở rộng v2.0 (tùy chỉnh cá nhân hóa, hiệu ứng nâng cao, xuất bản).
  const interactiveCandidate = dreamFeatures.find(f =>
    f.toLowerCase().includes('bấm') ||
    f.toLowerCase().includes('mở') ||
    f.toLowerCase().includes('xoay') ||
    f.toLowerCase().includes('chạm') ||
    f.toLowerCase().includes('điều khiển') ||
    f.toLowerCase().includes('tương tác') ||
    f.toLowerCase().includes('nút')
  );

  // MVP F1: Chức năng tạo hình / tương tác trực tiếp
  const interactionFeature = interactiveCandidate || dreamFeatures[0] || (
    answers.dreamPurpose?.toLowerCase().includes('thiệp') || answers.productFormat?.toLowerCase().includes('thiệp')
      ? 'Mở thiệp và hiển thị không gian 3D trực quan'
      : domain === 'robotics'
      ? 'Điều khiển chuyển động và vận hành cơ cấu'
      : 'Điều khiển chuyển động nhân vật'
  );

  // MVP F2: Chức năng nội dung, thông điệp & phối màu (giữ trọn vẹn lời chúc / dòng chữ ngắn trong MVP!)
  const otherFeatures = dreamFeatures.filter(f => f !== interactionFeature);
  const experienceFeature = otherFeatures.length > 0
    ? otherFeatures.join(' & ')
    : 'Lồng ghép thông điệp ý nghĩa & phối màu sắc hài hòa';

  // Extension F3: Tính năng nâng cao v2.0
  const extensionFeature = domain === 'multimedia'
    ? 'Tùy biến lời chúc cá nhân hóa & Hiệu ứng chuyển động 3D mở rộng'
    : domain === 'robotics'
    ? 'Tự động hóa cảm biến nâng cao & Điều khiển từ xa qua mạng'
    : 'Bổ sung màn chơi mở rộng & Bảng xếp hạng trực tuyến';

  const firstFeature = interactionFeature;
  const secondFeature = experienceFeature;
  const extraFeature = extensionFeature;
  const productFormat = answers.productFormat?.trim() || (
    answers.dreamPurpose?.toLowerCase().includes('thiệp') ? 'Thiệp điện tử 3D tương tác' :
    domain === 'multimedia' ? 'Tác phẩm đa phương tiện 3D' :
    domain === 'robotics' ? 'Mô hình robot thông minh' : 'Ứng dụng trò chơi tương tác'
  );

  const defaultMode: "physical" | "simulation" | "software" | "design" =
    domain === 'robotics' ? (isPrimary ? 'physical' : 'physical') :
    domain === 'multimedia' ? 'design' : 'software';

  // ── XÁC ĐỊNH TIÊU ĐỀ P1, P2, P3 THEO ĐÚNG DOMAIN & DREAM PROJECT (KHÔNG LẤY TÊN THƯ VIỆN LỆCH Ý TƯỞNG) ──
  let p1DerivedTitle = 'Khởi động Nền tảng Kỹ thuật';
  let p2DerivedTitle = 'Phát triển Cơ chế Tương tác Cốt lõi';
  let p3DerivedTitle = 'Tích hợp Tính năng Nâng cao & Thử nghiệm Thực tế';

  if (domain === 'multimedia') {
    const is3D = answers.branch?.includes('3d') ||
      answers.dreamAppearance?.toLowerCase().includes('3d') ||
      answers.dreamPurpose?.toLowerCase().includes('3d') ||
      productFormat.toLowerCase().includes('3d');

    if (is3D) {
      p1DerivedTitle = 'Phác thảo Ý tưởng & Tạo khối 3D Nền tảng';
      p2DerivedTitle = 'Tạo hình Mô hình 3D Hoàn chỉnh & Phối màu';
      p3DerivedTitle = 'Hoạt họa Tương tác & Lồng ghép Thông điệp';
    } else {
      p1DerivedTitle = 'Phác thảo Kịch bản & Tuyến Nhân vật';
      p2DerivedTitle = 'Thiết kế Đồ họa & Cơ chế Chuyển động';
      p3DerivedTitle = 'Biên tập Đa phương tiện & Kỹ xảo Hoàn thiện';
    }
  } else if (domain === 'robotics') {
    p1DerivedTitle = 'Thiết kế Khung cơ khí & Mạch điều khiển Khởi động';
    p2DerivedTitle = 'Lắp ráp Động cơ & Cảm biến Thông minh';
    p3DerivedTitle = 'Tự động hóa & Hệ thống An toàn Thực tế';
  } else if (domain === 'game_programming') {
    p1DerivedTitle = 'Xây dựng Màn chơi Thử nghiệm & Nhân vật';
    p2DerivedTitle = 'Lập trình Điều khiển & Va chạm Cốt lõi';
    p3DerivedTitle = 'Trí tuệ Nhân tạo Đối thủ & Gameplay Loop';
  }

  // ── DỰ ÁN 1 (P1): Xây dựng nền tảng trực tiếp phục vụ Dream Project ──
  const p1Base = libraryProjects[0] || {
    title: p1DerivedTitle,
    name: p1DerivedTitle,
    goal: `Làm quen với các công cụ nền tảng và hoàn thiện bản phác thảo thử nghiệm đầu tiên phục vụ "${dreamName}".`,
    tasks: ['Làm quen môi trường sáng tạo', 'Thực hành các thao tác kỹ thuật cốt lõi', `Tạo bản phác thảo ban đầu cho ${dreamName}`],
    deliverable: `Bản phác thảo thử nghiệm đầu tiên của ${dreamName}`,
    completionCheck: 'Hoàn thành các bước hướng dẫn cơ bản',
    sioIds: []
  };

  const p1Features: ProjectFeature[] = domain === 'multimedia'
    ? [
        {
          id: 'F-P1-01',
          name: 'Chuẩn bị không gian sáng tạo & Bảng màu chủ đề',
          description: `Con tạo được không gian làm việc để bắt đầu phác thảo bộ tranh và thiết kế thiệp 3D "${dreamName}".`,
          knowledgeIds: ['K-01'],
          skillIds: ['S-01'],
          competencyIds: [],
          tasks: [
            {
              id: 'T-P1-01-A',
              description: `Mở công cụ thiết kế đồ họa đã chọn và tạo dự án mới với tên "${dreamName}".`,
              knowledgeIds: ['K-01'],
              skillIds: ['S-01'],
              competencyIds: []
            },
            {
              id: 'T-P1-01-B',
              description: 'Chọn kích thước, bố cục và bảng màu phù hợp với chủ đề gia đình yêu thương.',
              knowledgeIds: ['K-01'],
              skillIds: ['S-01'],
              competencyIds: []
            },
            {
              id: 'T-P1-01-C',
              description: 'Tạo một hình khối hoặc hình minh họa đầu tiên và lưu được tệp dự án an toàn.',
              knowledgeIds: ['K-01'],
              skillIds: ['S-01'],
              competencyIds: []
            }
          ],
          learningGuide: {
            step1Learn: 'Hiểu cách thiết lập không gian làm việc số và ý nghĩa của bảng màu chủ đề gia đình.',
            step2Practice: 'Tạo tệp mới, làm quen thanh công cụ vẽ/dựng hình và thực hành lưu tệp định kỳ.',
            step3Apply: `Khởi tạo dự án "${dreamName}", thiết lập tỷ lệ khung hình và bảng màu chủ đề.`,
            step4Verify: 'Kiểm tra tệp mở lại được, hình ảnh cân đối và đúng gam màu mong muốn.',
            step5Evidence: 'Lưu tệp nguồn dự án và xuất ảnh chụp màn hình bản phác thảo đầu tiên.'
          },
          deliverable: 'Tệp dự án ban đầu cùng ảnh chụp hình minh họa đầu tiên',
          successCriteria: [
            'Mở lại được tệp thiết kế trên phần mềm mà không bị lỗi.',
            'Hình minh họa và bảng màu hiển thị rõ nét, có thể chỉnh sửa tiếp.'
          ],
          evidenceArtifacts: ['Tệp dự án thiết kế (.blend / file đồ họa)', 'Ảnh chụp màn hình bản phác thảo đầu tiên'],
          scope: 'mvp',
          implementationMode: 'design'
        },
        {
          id: 'F-P1-02',
          name: `Thử nghiệm nguyên mẫu tạo hình đầu tiên cho ${dreamName}`,
          description: `Tạo phiên bản phác thảo mô phỏng ý tưởng cốt lõi của "${dreamName}".`,
          knowledgeIds: ['K-03'],
          skillIds: ['S-03'],
          competencyIds: ['C-02'],
          tasks: [
            {
              id: 'T-P1-02-A',
              description: `Dựng mô hình hoặc vẽ chi tiết nhân vật/biểu tượng trung tâm của tấm thiệp.`,
              knowledgeIds: ['K-03'],
              skillIds: ['S-03'],
              competencyIds: ['C-02']
            },
            {
              id: 'T-P1-02-B',
              description: 'Sắp xếp bố cục thử nghiệm và ghi chú các điểm cần hoàn thiện cho chặng P2.',
              knowledgeIds: ['K-03'],
              skillIds: ['S-03'],
              competencyIds: ['C-02']
            }
          ],
          learningGuide: {
            step1Learn: 'Hiểu nguyên lý tỷ lệ thị giác và điểm nhấn trung tâm trong bố cục nghệ thuật.',
            step2Practice: 'Tập tạo hình nhân vật từ các khối cơ bản (hình hộp, hình cầu, nét vẽ vector).',
            step3Apply: `Tạo hình nhân vật/chi tiết chính cho "${dreamName}" và đặt vào khung thiệp.`,
            step4Verify: 'Nhân vật nổi bật trên nền thiệp, đường nét gọn gàng và không bị méo.',
            step5Evidence: 'Lưu tệp mẫu v0.1 và ghi nhận xét của bản thân.'
          },
          deliverable: 'Bản phác thảo nguyên mẫu hình ảnh thử nghiệm đầu tiên',
          successCriteria: [
            'Nhân vật/chi tiết chính nằm ở vị trí trung tâm, đúng tỷ lệ bố cục.',
            'Hình khối rõ ràng, không bị méo lệch khi phóng to hoặc thu nhỏ.'
          ],
          evidenceArtifacts: ['Bản vẽ phác thảo nguyên mẫu v0.1', 'Nhật ký ý tưởng tạo hình'],
          scope: 'mvp',
          implementationMode: 'design'
        }
      ]
    : domain === 'robotics'
    ? [
        {
          id: 'F-P1-01',
          name: 'Lắp ráp khung cơ khí & Kiểm tra nguồn mạch điều khiển',
          description: `Thiết lập môi trường làm việc kỹ thuật và lắp đặt bộ khung đầu tiên cho ${dreamName}.`,
          knowledgeIds: ['K-01'],
          skillIds: ['S-01'],
          competencyIds: [],
          tasks: [
            {
              id: 'T-P1-01-A',
              description: 'Kiểm tra linh kiện, nguồn pin và kết nối mạch điều khiển vi xử lý.',
              knowledgeIds: ['K-01'],
              skillIds: ['S-01'],
              competencyIds: []
            },
            {
              id: 'T-P1-01-B',
              description: 'Thực hành nạp chương trình kiểm tra đèn báo hiệu và còi buzzer.',
              knowledgeIds: ['K-01'],
              skillIds: ['S-01'],
              competencyIds: []
            }
          ],
          learningGuide: {
            step1Learn: 'Hiểu sơ đồ khối mạch điện tử và nguyên tắc an toàn khi cấp nguồn pin.',
            step2Practice: 'Cắm cáp kết nối máy tính với vi điều khiển, cài driver và chọn đúng cổng COM.',
            step3Apply: 'Lắp ráp bộ khung gầm xe/robot và nối nguồn vào mạch chính.',
            step4Verify: 'Đèn nguồn sáng ổn định, chương trình nhấp nháy đèn nạp thành công.',
            step5Evidence: 'Video ngắn quay lại bo mạch hoạt động khi bật công tắc nguồn.'
          },
          deliverable: 'Khung gầm và bo mạch điều khiển hoạt động ổn định',
          successCriteria: ['Mạch nhận lệnh nạp code chính xác', 'Không chập nguồn hoặc quá nhiệt'],
          evidenceArtifacts: ['Ảnh chụp khung cơ khí hoàn thiện', 'Nhật ký kiểm tra nguồn điện'],
          scope: 'mvp',
          implementationMode: 'physical'
        },
        {
          id: 'F-P1-02',
          name: `Thử nghiệm nguyên mẫu chuyển động ban đầu cho ${dreamName}`,
          description: `Tạo phiên bản thử nghiệm cơ cấu vận hành căn bản của "${dreamName}".`,
          knowledgeIds: ['K-03'],
          skillIds: ['S-03'],
          competencyIds: ['C-02'],
          tasks: [
            {
              id: 'T-P1-02-A',
              description: `Lắp động cơ vào khung và lập trình quay thử nghiệm hai chiều.`,
              knowledgeIds: ['K-03'],
              skillIds: ['S-03'],
              competencyIds: ['C-02']
            },
            {
              id: 'T-P1-02-B',
              description: 'Chạy thử nghiệm lăn bánh trên mặt sàn phẳng và ghi nhận độ lệch.',
              knowledgeIds: ['K-03'],
              skillIds: ['S-03'],
              competencyIds: ['C-02']
            }
          ],
          learningGuide: {
            step1Learn: 'Nguyên lý truyền động bánh răng và điều khiển động cơ DC bằng tín hiệu PWM.',
            step2Practice: 'Viết khối lệnh quay tiến, quay lùi và dừng động cơ trên phần mềm.',
            step3Apply: `Tải code vào ${dreamName} và quan sát bánh xe quay theo lệnh.`,
            step4Verify: 'Cả hai bánh xe quay đều nhịp, robot di chuyển thẳng trên 2 mét sàn phẳng.',
            step5Evidence: 'Video ghi lại robot chạy tiến 2 mét và dừng an toàn.'
          },
          deliverable: 'Nguyên mẫu xe/robot di chuyển cơ bản',
          successCriteria: ['Robot chuyển động ổn định theo đúng lệnh lập trình'],
          evidenceArtifacts: ['Video thử nghiệm chạy thử v0.1'],
          scope: 'mvp',
          implementationMode: 'physical'
        }
      ]
    : [
        {
          id: 'F-P1-01',
          name: 'Thiết lập màn chơi thử nghiệm & Điều khiển nhân vật',
          description: `Khởi tạo dự án game "${dreamName}" và lập trình di chuyển căn bản cho nhân vật.`,
          knowledgeIds: ['K-01'],
          skillIds: ['S-01'],
          competencyIds: [],
          tasks: [
            {
              id: 'T-P1-01-A',
              description: 'Tạo dự án game mới, nhập ảnh nhân vật và thiết lập trọng lực không gian.',
              knowledgeIds: ['K-01'],
              skillIds: ['S-01'],
              competencyIds: []
            },
            {
              id: 'T-P1-01-B',
              description: 'Lập trình phím mũi tên hoặc nút chạm để nhân vật di chuyển trái/phải/nhảy.',
              knowledgeIds: ['K-01'],
              skillIds: ['S-01'],
              competencyIds: []
            }
          ],
          learningGuide: {
            step1Learn: 'Hiểu hệ trục tọa độ 2D (X, Y) và vòng lặp trò chơi (Game Loop).',
            step2Practice: 'Viết code thay đổi tọa độ X, Y khi nhấn các phím mũi tên.',
            step3Apply: `Áp dụng điều khiển di chuyển cho nhân vật chính của game "${dreamName}".`,
            step4Verify: 'Nhân vật di chuyển mượt mà, không bị rơi xuyên qua nền đất.',
            step5Evidence: 'Tệp dự án game và ảnh chụp màn chơi đầu tiên.'
          },
          deliverable: 'Bản chơi thử nghiệm điều khiển nhân vật',
          successCriteria: ['Nhân vật phản hồi ngay lập tức khi nhấn phím điều khiển'],
          evidenceArtifacts: ['Tệp dự án game v0.1'],
          scope: 'mvp',
          implementationMode: 'software'
        },
        {
          id: 'F-P1-02',
          name: `Thử nghiệm cơ chế gameplay ban đầu cho ${dreamName}`,
          description: `Xây dựng cơ chế nhặt vật phẩm hoặc vượt chướng ngại vật đầu tiên.`,
          knowledgeIds: ['K-03'],
          skillIds: ['S-03'],
          competencyIds: ['C-02'],
          tasks: [
            {
              id: 'T-P1-02-A',
              description: 'Thêm vật phẩm và lập trình sự kiện va chạm để biến mất và cộng điểm.',
              knowledgeIds: ['K-03'],
              skillIds: ['S-03'],
              competencyIds: ['C-02']
            },
            {
              id: 'T-P1-02-B',
              description: 'Chơi thử 3 lần và tinh chỉnh tốc độ rơi/di chuyển của vật phẩm.',
              knowledgeIds: ['K-03'],
              skillIds: ['S-03'],
              competencyIds: ['C-02']
            }
          ],
          learningGuide: {
            step1Learn: 'Khái niệm hộp va chạm (Hitbox / Collider) và biến số lưu trữ điểm (Score Variable).',
            step2Practice: 'Lập trình khối lệnh kiểm tra: Nếu chạm vào vật phẩm thì tăng điểm và phát âm thanh.',
            step3Apply: `Tích hợp cơ chế thu thập vật phẩm vào game "${dreamName}".`,
            step4Verify: 'Điểm số nhảy chính xác mỗi khi chạm vào vật phẩm, không bị cộng trùng lặp.',
            step5Evidence: 'Bản demo gameplay v0.1.'
          },
          deliverable: 'Màn chơi có va chạm và cộng điểm số',
          successCriteria: ['Cơ chế va chạm và cộng điểm vận hành không có lỗi'],
          evidenceArtifacts: ['Bản ghi màn hình chơi thử game'],
          scope: 'mvp',
          implementationMode: 'software'
        }
      ];

  const project1: DetailedPersonalizedProject = {
    id: 'P1',
    projectNumber: 1,
    name: `${p1DerivedTitle} (Khởi động cho ${dreamName})`,
    roleDescription: 'Xây dựng nền tảng trực tiếp phục vụ Dream Project.',
    goal: `Đặt nền tảng tư duy và kỹ thuật ban đầu phục vụ ý tưởng "${dreamName}" (${productFormat}).`,
    features: p1Features,
    tasks: [
      domain === 'multimedia' ? 'Chuẩn bị không gian làm việc số và bảng màu chủ đề gia đình' : 'Làm quen với công cụ thiết kế/kỹ thuật nền tảng',
      domain === 'multimedia' ? `Thực hành tạo hình khối và phác thảo nhân vật cho ${productFormat}` : `Thực hành tạo các thành phần cốt lõi của ${productFormat}`,
      `Tạo bản phác thảo nguyên mẫu ban đầu lấy cảm hứng từ ý tưởng ${dreamName}`
    ] as [string, string, string],
    deliverable: `Bản phác thảo nguyên mẫu thử nghiệm đầu tiên của ${dreamName}`,
    completionCheck: 'Mở lại được tệp dự án và nhìn thấy hình minh họa đầu tiên hoàn chỉnh',
    isDreamProject: false,
    adaptedFromLibraryId: p1DerivedTitle,
    sioIds: (p1Base as any).sioIds || [],
    image: projectImages[0]
  };

  // ── DỰ ÁN 2 (P2): Phát triển chức năng cốt lõi đầu tiên ──
  const p2Base = libraryProjects[1] || {
    title: p2DerivedTitle,
    name: p2DerivedTitle,
    goal: `Phát triển chức năng cốt lõi "${firstFeature}" có tính logic và chiều sâu`,
    tasks: ['Thiết kế cấu trúc chức năng', 'Lập trình / ráp nối cơ chế', 'Kiểm tra độ ổn định'],
    deliverable: 'Mô-đun chức năng hoàn chỉnh',
    completionCheck: 'Cơ chế hoạt động đúng yêu cầu',
    sioIds: []
  };
  const p2Title = (p2Base as any).title || p2Base.name || 'Xây dựng cơ chế tương tác';

  const p2Features: ProjectFeature[] = domain === 'multimedia'
    ? [
        {
          id: 'F-P2-01',
          name: 'Tạo mô hình 3D và phối màu nhân vật chính',
          description: `Phát triển nhân vật hoặc chi tiết chính của tấm thiệp "${dreamName}" với đầy đủ khối 3D và màu sắc.`,
          knowledgeIds: ['K-01', 'K-02'],
          skillIds: ['S-02'],
          competencyIds: [],
          tasks: [
            {
              id: 'T-P2-01-A',
              description: 'Dựng hình 3D hoàn chỉnh cho nhân vật và các phụ kiện đi kèm.',
              knowledgeIds: ['K-01', 'K-02'],
              skillIds: ['S-02'],
              competencyIds: []
            },
            {
              id: 'T-P2-01-B',
              description: 'Áp vật liệu và phối màu sắc ấm áp, tạo cảm giác thân thiện gần gũi.',
              knowledgeIds: ['K-02'],
              skillIds: ['S-02'],
              competencyIds: []
            }
          ],
          learningGuide: {
            step1Learn: 'Hiểu nguyên lý phối màu bổ túc và cách áp vật liệu bề mặt 3D cơ bản.',
            step2Practice: 'Thao tác xoay các góc nhìn camera, gán màu sắc và điều chỉnh độ bóng/mịn.',
            step3Apply: `Áp dụng bảng màu gia đình vào nhân vật trung tâm của "${dreamName}".`,
            step4Verify: 'Mô hình hiển thị mượt mà từ mọi góc nhìn, màu sắc ấm áp dễ chịu.',
            step5Evidence: 'Lưu tệp mô hình 3D và xuất ảnh chụp 3 góc độ khác nhau.'
          },
          deliverable: 'Mô hình 3D nhân vật hoàn thiện vật liệu và màu sắc',
          successCriteria: [
            'Màu sắc nhân vật tương phản tốt với phông nền, các chi tiết nhỏ nhìn rõ.',
            'Mô hình 3D xoay các hướng không bị hổng lưới hay lỗi hiển thị.'
          ],
          evidenceArtifacts: ['Tệp mô hình 3D hoàn chỉnh', 'Ảnh render các góc nhìn của nhân vật'],
          scope: 'mvp',
          implementationMode: 'design'
        },
        {
          id: 'F-P2-02',
          name: 'Kiểm tra tương phản thị giác & Tối ưu bố cục',
          description: 'Đảm bảo các chi tiết chính và phụ hài hòa, chuẩn bị sẵn không gian cho nội dung lời chúc.',
          knowledgeIds: [],
          skillIds: ['S-03'],
          competencyIds: ['C-01', 'C-02'],
          tasks: [
            {
              id: 'T-P2-02-A',
              description: 'Kiểm tra độ tương phản giữa nhân vật và nền trong các điều kiện hiển thị khác nhau.',
              knowledgeIds: [],
              skillIds: ['S-03'],
              competencyIds: ['C-01', 'C-02']
            },
            {
              id: 'T-P2-02-B',
              description: 'Căn chỉnh lại tỷ lệ để dành vị trí thông thoáng cho thông điệp và lời chúc.',
              knowledgeIds: [],
              skillIds: ['S-03'],
              competencyIds: ['C-01', 'C-02']
            }
          ],
          learningGuide: {
            step1Learn: 'Quy tắc 1/3 trong thị giác và khoảng trắng (white space) trong thiết kế thiệp.',
            step2Practice: 'Thực hành dịch chuyển góc nhìn và căn chỉnh vị trí các lớp hình ảnh.',
            step3Apply: 'Sắp xếp không gian thiệp để chuẩn bị tích hợp lời chúc ở các chặng sau.',
            step4Verify: 'Mắt người xem tập trung vào nhân vật rồi di chuyển tự nhiên đến khu vực lời nhắn.',
            step5Evidence: 'Lưu bản thiết kế đã chốt bố cục.'
          },
          deliverable: 'Bản bố cục hoàn chỉnh sẵn sàng cho hoạt họa và lời chúc',
          successCriteria: [
            'Không gian dành cho thông điệp rộng rãi, không bị nhân vật lấn át.',
            'Tỷ lệ các thành phần cân đối hài hòa theo quy tắc 1/3 thị giác.'
          ],
          evidenceArtifacts: ['Ảnh chụp màn hình bố cục thiệp chuẩn bị cho P3'],
          scope: 'mvp',
          implementationMode: 'design'
        }
      ]
    : [
        {
          id: 'F-P2-01',
          name: `Phát triển chức năng cốt lõi: ${firstFeature}`,
          description: `Hiện thực hóa chức năng quan trọng nhất "${firstFeature}" cho sản phẩm với độ chính xác cao.`,
          knowledgeIds: ['K-01', 'K-02'],
          skillIds: ['S-02'],
          competencyIds: [],
          tasks: [
            {
              id: 'T-P2-01-A',
              description: `Xây dựng giải thuật / cơ chế điều khiển cho chức năng "${firstFeature}".`,
              knowledgeIds: ['K-01', 'K-02'],
              skillIds: ['S-02'],
              competencyIds: []
            },
            {
              id: 'T-P2-01-B',
              description: 'Ghép nối tín hiệu và kiểm tra dữ liệu phản hồi trong tình huống chuẩn.',
              knowledgeIds: ['K-02'],
              skillIds: ['S-02'],
              competencyIds: []
            }
          ],
          learningGuide: {
            step1Learn: `Nguyên lý hoạt động và kiến trúc dữ liệu của tính năng "${firstFeature}".`,
            step2Practice: 'Viết thử nghiệm hàm xử lý hoặc ráp nối cụm linh kiện riêng lẻ.',
            step3Apply: `Tích hợp tính năng "${firstFeature}" vào khung sản phẩm chính.`,
            step4Verify: 'Chức năng thực thi chính xác và đáp ứng nhanh khi người dùng thao tác.',
            step5Evidence: 'Đoạn mã kịch bản hoặc mô hình vật lý hoạt động.'
          },
          deliverable: `Mô-đun chức năng ${firstFeature} hoàn chỉnh`,
          successCriteria: [`Tính năng ${firstFeature} phản hồi đúng yêu cầu đề ra`],
          evidenceArtifacts: ['Đoạn mã kịch bản hoặc mô hình vật lý hoạt động'],
          scope: 'mvp',
          implementationMode: defaultMode
        },
        {
          id: 'F-P2-02',
          name: 'Kiểm soát phản hồi & Đo độ ổn định tương tác',
          description: 'Đảm bảo chức năng cốt lõi vận hành mượt mà, phản xạ nhanh và không bị nghẽn lệnh.',
          knowledgeIds: [],
          skillIds: ['S-03'],
          competencyIds: ['C-01', 'C-02'],
          tasks: [
            {
              id: 'T-P2-02-A',
              description: 'Thực hiện 5 lần thử nghiệm liên tiếp trong các điều kiện khác nhau.',
              knowledgeIds: [],
              skillIds: ['S-03'],
              competencyIds: ['C-01', 'C-02']
            },
            {
              id: 'T-P2-02-B',
              description: 'Sửa các lỗi phát sinh (debug) để tối ưu thời gian phản hồi.',
              knowledgeIds: [],
              skillIds: ['S-03'],
              competencyIds: ['C-01', 'C-02']
            }
          ],
          learningGuide: {
            step1Learn: 'Các phương pháp kiểm thử (testing) và kỹ thuật tìm lỗi (debugging).',
            step2Practice: 'Ghi nhật ký log khi chạy chương trình để xác định vị trí phát sinh lỗi.',
            step3Apply: 'Thực hiện chuỗi kiểm thử 5 lần liên tiếp trên sản phẩm.',
            step4Verify: 'Tất cả các lần thử đều vượt qua tiêu chuẩn mà không gặp sự cố.',
            step5Evidence: 'Bảng thống kê kết quả kiểm thử.'
          },
          deliverable: 'Bản kiểm thử độ ổn định (Test Report)',
          successCriteria: ['Tỷ lệ thực thi chuẩn xác đạt trên 80% trong các lần thử'],
          evidenceArtifacts: ['Bảng thống kê kết quả thử nghiệm'],
          scope: 'mvp',
          implementationMode: defaultMode
        }
      ];

  const project2: DetailedPersonalizedProject = {
    id: 'P2',
    projectNumber: 2,
    name: `${p2DerivedTitle} • Tích hợp ${firstFeature}`,
    roleDescription: 'Phát triển chức năng cốt lõi đầu tiên.',
    goal: `${p2Base.goal} — Ứng dụng kỹ thuật để thử nghiệm tính năng "${firstFeature}" cho sản phẩm.`,
    features: p2Features,
    tasks: [
      domain === 'multimedia' ? 'Dựng mô hình 3D hoàn chỉnh cho nhân vật chính' : (p2Base.tasks?.[0] || 'Thiết kế cấu trúc logic'),
      domain === 'multimedia' ? 'Phối màu sắc ấm áp và kiểm tra tương phản thị giác' : `Lập trình / thiết kế cơ chế mô phỏng tính năng "${firstFeature}"`,
      'Chạy thử và tối ưu phản hồi khi tương tác với người dùng'
    ] as [string, string, string],
    deliverable: `Mô-đun chức năng ${firstFeature} vận hành ổn định`,
    completionCheck: 'Mô hình 3D và chức năng hiển thị sắc nét, xoay các góc không lỗi',
    isDreamProject: false,
    adaptedFromLibraryId: p2Title,
    sioIds: (p2Base as any).sioIds || [],
    image: projectImages[1]
  };

  // ── DỰ ÁN 3 (P3): Phát triển chức năng bổ sung, tích hợp hoặc thử nghiệm phù hợp ──
  const p3Title = domain === 'robotics'
    ? 'Hệ thống Cảm biến Thông minh & Dừng An Toàn'
    : domain === 'game_programming'
    ? 'Tích hợp Trí tuệ Nhân tạo Đối thủ & Gameplay Loop'
    : 'Tạo hình Không gian 3D & Kể chuyện Đa phương tiện';

  const p3Features: ProjectFeature[] = domain === 'robotics'
    ? [
        {
          id: 'F-P3-01',
          name: 'Cảm biến né chướng ngại vật & Dừng khẩn cấp an toàn',
          description: 'Tích hợp cảm biến siêu âm / dò đường để tự động dừng hoặc chuyển hướng an toàn.',
          knowledgeIds: ['K-02'],
          skillIds: ['S-02'],
          competencyIds: ['C-02', 'C-03'],
          tasks: [
            {
              id: 'T-P3-01-A',
              description: 'Gắn và hiệu chuẩn cảm biến đo khoảng cách trước vật cản 10-15cm.',
              knowledgeIds: ['K-02'],
              skillIds: ['S-02'],
              competencyIds: ['C-02']
            },
            {
              id: 'T-P3-01-B',
              description: 'Viết logic phanh khẩn cấp để bảo vệ người xung quanh.',
              knowledgeIds: ['K-02'],
              skillIds: ['S-02'],
              competencyIds: ['C-02', 'C-03']
            }
          ],
          learningGuide: {
            step1Learn: 'Nguyên lý phát thu sóng siêu âm và cách tính khoảng cách: d = (t * v) / 2.',
            step2Practice: 'Đọc dữ liệu cảm biến và in ra màn hình Serial Monitor để kiểm tra độ nhạy.',
            step3Apply: 'Lập trình robot tự động dừng lại khi phát hiện vật cản dưới 15cm.',
            step4Verify: 'Chuyển động: Robot dừng dứt khoát trước vật cản, không bị đâm va.',
            step5Evidence: 'Video quay cảnh robot tự động dừng an toàn trước vật cản.'
          },
          deliverable: 'Cơ chế né vật cản an toàn hoạt động tự động',
          successCriteria: [
            'Chuyển động: Robot luôn dừng cách chướng ngại vật an toàn 10-15cm, không va chạm.',
            'Minh chứng: Video quay cảnh robot nhận biết vật cản và dừng tự động.'
          ],
          evidenceArtifacts: ['Video quay cảnh robot né vật cản'],
          scope: 'mvp',
          implementationMode: 'physical'
        },
        {
          id: 'F-P3-02',
          name: `Thử nghiệm cơ cấu chuyên dụng phục vụ ${dreamAudience}`,
          description: `Hoàn thiện tay gắp / khay đỡ và chạy thử quy trình hỗ trợ thực tế cho ${dreamAudience}.`,
          knowledgeIds: ['K-03'],
          skillIds: ['S-01', 'S-03'],
          competencyIds: [],
          tasks: [
            {
              id: 'T-P3-02-A',
              description: 'Ráp nối cơ cấu chuyển động phụ (tay gắp hoặc còi báo hiệu).',
              knowledgeIds: ['K-03'],
              skillIds: ['S-01'],
              competencyIds: []
            },
            {
              id: 'T-P3-02-B',
              description: `Mời ${dreamAudience} quan sát và kiểm tra độ tiện lợi khi nhận hỗ trợ từ robot.`,
              knowledgeIds: ['K-03'],
              skillIds: ['S-03'],
              competencyIds: []
            }
          ],
          learningGuide: {
            step1Learn: 'Khái niệm về đòn bẩy cơ khí và động cơ servo điều khiển góc quay chính xác.',
            step2Practice: 'Lập trình servo gắp mở góc từ 0 đến 90 độ mượt mà.',
            step3Apply: `Tích hợp tay gắp/khay đỡ phục vụ mục tiêu hỗ trợ cho ${dreamAudience}.`,
            step4Verify: 'Cơ cấu gắp giữ vật dụng chắc chắn mà không làm rơi hay hỏng đồ vật.',
            step5Evidence: 'Phiếu nhận xét đóng góp từ người thân khi xem thử nghiệm.'
          },
          deliverable: `Nguyên mẫu robot tích hợp hoàn chỉnh dành cho ${dreamAudience}`,
          successCriteria: [
            'Người dùng thực tế thao tác thuận tiện và an tâm.',
            'Cơ cấu vận hành an toàn và tin cậy trong các tình huống thử nghiệm.'
          ],
          evidenceArtifacts: ['Phiếu nhận xét đóng góp từ người dùng thử'],
          scope: 'mvp',
          implementationMode: 'physical'
        }
      ]
    : domain === 'game_programming'
    ? [
        {
          id: 'F-P3-01',
          name: 'Máy trạng thái đối thủ AI & Màn chơi thử thách',
          description: 'Lập trình hành vi đối thủ tự động tuần tra, truy đuổi và tính điểm số tương tác.',
          knowledgeIds: ['K-02', 'K-03'],
          skillIds: ['S-02'],
          competencyIds: ['C-01', 'C-02'],
          tasks: [
            {
              id: 'T-P3-01-A',
              description: 'Xây dựng thuật toán tuần tra và đổi hướng khi gặp tường/vực thẳm.',
              knowledgeIds: ['K-02', 'K-03'],
              skillIds: ['S-02'],
              competencyIds: ['C-01']
            },
            {
              id: 'T-P3-01-B',
              description: 'Cân bằng độ khó để màn chơi vừa kích thích vừa công bằng cho người chơi.',
              knowledgeIds: ['K-03'],
              skillIds: ['S-02'],
              competencyIds: ['C-02']
            }
          ],
          learningGuide: {
            step1Learn: 'Hiểu máy trạng thái hữu hạn (FSM): Trạng thái Đứng yên, Đi tuần, và Truy đuổi.',
            step2Practice: 'Lập trình đối thủ di chuyển qua lại giữa 2 điểm mốc và quay đầu khi chạm biên.',
            step3Apply: 'Đưa đối thủ vào màn chơi thử thách trong game.',
            step4Verify: 'Đối thủ phản ứng tự nhiên, không bị kẹt vào tường hay giật lag.',
            step5Evidence: 'Video ghi lại một ván chơi vượt qua đối thủ AI.'
          },
          deliverable: 'Màn chơi hoàn chỉnh có đối thủ AI thông minh',
          successCriteria: [
            'AI đối thủ phản xạ tự nhiên, không bị giật lag hay kẹt vào chướng ngại vật.',
            'Người chơi cảm nhận được thử thách hợp lý và thú vị.'
          ],
          evidenceArtifacts: ['Bản demo gameplay màn chơi thử thách'],
          scope: 'mvp',
          implementationMode: 'software'
        },
        {
          id: 'F-P3-02',
          name: `Trải nghiệm người chơi (UX) & Thử nghiệm thực tế với ${dreamAudience}`,
          description: `Mời ${dreamAudience} chơi thử, tinh chỉnh cảm giác điều khiển và âm thanh sống động.`,
          knowledgeIds: [],
          skillIds: ['S-03'],
          competencyIds: ['C-02', 'C-03'],
          tasks: [
            {
              id: 'T-P3-02-A',
              description: `Quan sát ${dreamAudience} chơi thử lần đầu mà không hướng dẫn trước.`,
              knowledgeIds: [],
              skillIds: ['S-03'],
              competencyIds: ['C-02']
            },
            {
              id: 'T-P3-02-B',
              description: 'Hiệu chỉnh lại các nút bấm và hướng dẫn dựa trên phản hồi thực tế.',
              knowledgeIds: [],
              skillIds: ['S-03'],
              competencyIds: ['C-03']
            }
          ],
          learningGuide: {
            step1Learn: 'Nguyên lý thiết kế trải nghiệm người dùng (UX) và tâm lý người chơi game.',
            step2Practice: 'Tạo bảng câu hỏi khảo sát ngắn và quan sát phản xạ của người chơi thử.',
            step3Apply: 'Tinh chỉnh lại kích thước nút bấm và tốc độ phản hồi của trò chơi.',
            step4Verify: 'Người chơi hiểu luật chơi ngay trong 60 giây đầu tiên mà không cần giải thích.',
            step5Evidence: 'Phiếu thu nhận ý kiến và video màn chơi thử nghiệm.'
          },
          deliverable: 'Bản game tối ưu hóa trải nghiệm người dùng',
          successCriteria: [
            'Người chơi hiểu luật chơi ngay trong 60 giây đầu tiên.',
            'Giao diện nút bấm trực quan, âm thanh hiệu ứng tạo cảm giác hào hứng.'
          ],
          evidenceArtifacts: ['Video ghi lại màn chơi thử nghiệm thực tế'],
          scope: 'mvp',
          implementationMode: 'software'
        }
      ]
    : [
        {
          id: 'F-P3-01',
          name: 'Hoạt họa chuyển động 3D & Hiệu ứng ánh sáng môi trường',
          description: `Tạo hoạt hình keyframe sinh động khi mở thiệp và bố trí ánh sáng ấm áp tôn vinh chủ đề tác phẩm "${dreamName}".`,
          knowledgeIds: ['K-02', 'K-03'],
          skillIds: ['S-02'],
          competencyIds: ['C-01', 'C-02'],
          tasks: [
            {
              id: 'T-P3-01-A',
              description: 'Thiết lập Timeline chuyển động cho nhân vật và mô hình thiệp khi mở ra (keyframe đóng và mở).',
              knowledgeIds: ['K-02'],
              skillIds: ['S-02'],
              competencyIds: ['C-01']
            },
            {
              id: 'T-P3-01-B',
              description: 'Bố trí nguồn sáng ấm áp để tạo chiều sâu và làm nổi bật nhân vật trong không gian 3D.',
              knowledgeIds: ['K-02', 'K-03'],
              skillIds: ['S-02'],
              competencyIds: ['C-02']
            }
          ],
          learningGuide: {
            step1Learn: 'Hiểu keyframe là gì; nhận biết trạng thái đầu và trạng thái cuối của chuyển động.',
            step2Practice: 'Tạo hai keyframe, thay đổi vị trí hoặc góc quay của mô hình và xem thử chuyển động.',
            step3Apply: `Làm cho nhân vật hoặc chi tiết trong "${dreamName}" chuyển động nhẹ khi mở thiệp.`,
            step4Verify: 'Chuyển động diễn ra đúng trình tự, mượt mà và không che mất lời nhắn.',
            step5Evidence: 'Lưu tệp nguồn và xuất video ngắn quay lại kết quả.'
          },
          deliverable: 'Đoạn chuyển động 3D mở thiệp với ánh sáng hài hòa',
          successCriteria: [
            'Chuyển động: Nhân vật có trạng thái bắt đầu và kết thúc rõ ràng khi mở thiệp.',
            'Bố cục: Khi hoạt họa, chuyển động của nhân vật không che khuất dòng chữ chính.',
            'Màu sắc & Ánh sáng: Nhân vật và lời nhắn vẫn dễ nhìn ở các khung hình chính, ánh sáng ấm áp.',
            'Minh chứng: Có tệp nguồn và video ngắn thể hiện chức năng mở thiệp.'
          ],
          evidenceArtifacts: ['Tệp dự án hoạt hình 3D', 'Video clip quay lại hiệu ứng mở thiệp chuyển động'],
          scope: 'mvp',
          implementationMode: 'design'
        },
        {
          id: 'F-P3-02',
          name: `Lồng ghép âm thanh & Thử nghiệm tiếp nhận cùng ${dreamAudience}`,
          description: `Tích hợp hiệu ứng âm thanh nhẹ nhàng và mời ${dreamAudience} trải nghiệm thử để ghi nhận cảm xúc.`,
          knowledgeIds: ['K-03'],
          skillIds: ['S-03'],
          competencyIds: ['C-01', 'C-03'],
          tasks: [
            {
              id: 'T-P3-02-A',
              description: 'Chọn và lồng ghép giai điệu âm nhạc hoặc hiệu ứng âm thanh ấm áp phù hợp với khoảnh khắc mở thiệp.',
              knowledgeIds: ['K-03'],
              skillIds: ['S-03'],
              competencyIds: ['C-01']
            },
            {
              id: 'T-P3-02-B',
              description: `Mời người thân (${dreamAudience}) trải nghiệm thử và lắng nghe nhận xét về cảm xúc khi xem.`,
              knowledgeIds: [],
              skillIds: ['S-03'],
              competencyIds: ['C-03']
            }
          ],
          learningGuide: {
            step1Learn: 'Hiểu cách âm thanh và chuyển động kết hợp để tạo nên cảm xúc sâu sắc cho người xem.',
            step2Practice: 'Tập chèn tệp âm thanh vào timeline và khớp với thời điểm hành động diễn ra.',
            step3Apply: 'Lồng bản nhạc ngắn vào tấm thiệp để phát khi người xem mở thiệp ra.',
            step4Verify: 'Âm thanh không bị trễ nhịp so với hình ảnh, giai điệu truyền cảm hứng.',
            step5Evidence: 'Lưu bản thử nghiệm hoàn chỉnh và phiếu phỏng vấn người thân.'
          },
          deliverable: 'Nguyên mẫu thiệp 3D đa giác quan (hình ảnh, chuyển động, âm thanh)',
          successCriteria: [
            'Âm thanh vang lên đúng thời điểm thiệp mở ra, âm lượng vừa phải.',
            `${dreamAudience} cảm nhận được thông điệp yêu thương và có phản hồi tích cực.`
          ],
          evidenceArtifacts: ['Bản ghi âm hoặc video người thân trải nghiệm thiệp', 'Phiếu ghi nhận ý kiến đóng góp ban đầu'],
          scope: 'mvp',
          implementationMode: 'design'
        }
      ];

  const project3: DetailedPersonalizedProject = {
    id: 'P3',
    projectNumber: 3,
    name: `${p3DerivedTitle} (Phục vụ ${dreamAudience})`,
    roleDescription: 'Phát triển chức năng bổ sung, tích hợp hoặc thử nghiệm phù hợp với sản phẩm.',
    goal: `Tích hợp chức năng nâng cao và thử nghiệm thực tế phục vụ nhu cầu của ${dreamAudience}.`,
    features: p3Features,
    tasks: [
      domain === 'robotics'
        ? 'Lắp đặt cụm cảm biến và thiết lập khoảng cách an toàn'
        : domain === 'game_programming'
        ? 'Lập trình logic máy trạng thái đối thủ AI'
        : 'Thiết lập hoạt họa keyframe mở thiệp và ánh sáng 3D ấm áp',
      `Mời ${dreamAudience} trải nghiệm thử và ghi nhận phản hồi cảm xúc`,
      'Điều chỉnh chuyển động và vị trí dòng chữ dựa trên góp ý thực tế'
    ] as [string, string, string],
    deliverable: `Bản hoàn thiện thử nghiệm thực tế với ${dreamAudience}`,
    completionCheck: `Chuyển động mượt mà, ánh sáng hài hòa và người thân đánh giá tích cực`,
    isDreamProject: false,
    adaptedFromLibraryId: p3Title,
    sioIds: (p1Base as any).sioIds || [],
    image: projectImages[2]
  };

  // ── DỰ ÁN 4 (P4): DỰ ÁN ƯỚC MƠ (DREAM PROJECT) — GIỮ NGUYÊN TÊN ƯỚC MƠ! ──
  const p4Features: ProjectFeature[] = [
    {
      id: 'F-P4-01',
      name: interactionFeature.includes(':')
        ? interactionFeature
        : (interactionFeature.toLowerCase().includes('tương tác') || interactionFeature.toLowerCase().includes('bấm') || interactionFeature.toLowerCase().includes('mở')
            ? `Chức năng tương tác: ${interactionFeature}`
            : `Chức năng tạo hình & cốt lõi: ${interactionFeature}`),
      description: `Xây dựng và hoàn thiện "${interactionFeature}" cho sản phẩm ${dreamName}, giúp ${dreamAudience} có thể trải nghiệm và thao tác dễ dàng.`,
      knowledgeIds: ['K-02'],
      skillIds: ['S-02'],
      competencyIds: ['C-01', 'C-03'],
      tasks: [
        {
          id: 'T-P4-01-A',
          description: domain === 'robotics'
            ? `Thiết kế mạch điều khiển và cơ cấu vận hành cho tính năng "${interactionFeature}".`
            : `Thiết kế bố cục tạo hình và cơ chế hiển thị / tương tác trực quan cho "${interactionFeature}" theo định dạng ${productFormat}.`,
          knowledgeIds: ['K-02'],
          skillIds: ['S-02'],
          competencyIds: ['C-01']
        },
        {
          id: 'T-P4-01-B',
          description: `Kiểm thử độ nhạy tương tác và tối ưu hóa phản hồi thị giác/chuyển động khi ${dreamAudience} thao tác.`,
          knowledgeIds: [],
          skillIds: ['S-02'],
          competencyIds: ['C-03']
        }
      ],
      learningGuide: {
        step1Learn: 'Nắm vững quy trình hoàn thiện tác phẩm từ bản phác thảo đến sản phẩm cuối cùng.',
        step2Practice: 'Kiểm tra từng chi tiết góc cạnh, lưới đa giác và ánh sáng tổng thể.',
        step3Apply: `Đóng gói tác phẩm tạo hình cốt lõi cho "${dreamName}".`,
        step4Verify: 'Hình ảnh sắc nét, không có lỗi hiển thị ở bất kỳ góc nhìn nào.',
        step5Evidence: 'Lưu bản xuất cuối cùng và ảnh chụp sản phẩm.'
      },
      deliverable: `Mô-đun tương tác [${interactionFeature}] hoàn chỉnh vận hành trong ${dreamName}`,
      successCriteria: [
        `Hình minh họa sắc nét, tỷ lệ chuẩn xác và thể hiện trọn vẹn chủ đề yêu thương.`,
        `Người dùng (${dreamAudience}) thao tác "${interactionFeature}" mượt mà và phản hồi diễn ra chính xác.`
      ],
      evidenceArtifacts: ['Video quay lại thao tác tương tác thực tế', 'Ảnh chụp sản phẩm ở độ phân giải cao'],
      scope: 'mvp',
      implementationMode: defaultMode
    },
    {
      id: 'F-P4-02',
      name: `Chức năng trải nghiệm & nội dung: ${experienceFeature}`,
      description: `Tích hợp nội dung thông điệp và hiệu ứng trải nghiệm "${experienceFeature}" vào ${dreamName}, giải quyết trọn vẹn mục tiêu "${dreamPurpose}".`,
      knowledgeIds: ['K-02'],
      skillIds: ['S-02'],
      competencyIds: ['C-01'],
      tasks: [
        {
          id: 'T-P4-02-A',
          description: `Tích hợp dữ liệu nội dung, hiệu ứng hình ảnh và âm thanh cho "${experienceFeature}".`,
          knowledgeIds: ['K-02'],
          skillIds: ['S-02'],
          competencyIds: ['C-01']
        },
        {
          id: 'T-P4-02-B',
          description: `Tổ chức buổi chạy thử nghiệm toàn diện cho ${dreamAudience} và ghi nhận chỉ số thành công.`,
          knowledgeIds: [],
          skillIds: ['S-02'],
          competencyIds: ['C-03']
        }
      ],
      learningGuide: {
        step1Learn: 'Tầm quan trọng của Typography (nghệ thuật chữ) và độ tương phản khi truyền tải thông điệp.',
        step2Practice: 'Thử nghiệm các kích thước chữ và màu chữ khác nhau để chọn phương án dễ đọc nhất.',
        step3Apply: `Đặt dòng chữ gửi lời yêu thương vào vị trí đẹp nhất trên "${dreamName}".`,
        step4Verify: 'Lời nhắn nổi bật, không bị hình ảnh che lấp, người nhận đọc hiểu trong 5 giây.',
        step5Evidence: 'Chụp lại tác phẩm hoàn thiện có đủ chữ và hình minh họa.'
      },
      deliverable: `Trải nghiệm nội dung [${experienceFeature}] hoàn thiện trong sản phẩm ${dreamName}`,
      successCriteria: [
        `Dòng chữ ngắn gọn, chân thành, dễ đọc ngay cả trên màn hình nhỏ.`,
        `${dreamAudience} tiếp nhận rõ ràng thông điệp và đánh giá cao trải nghiệm sản phẩm mang lại.`
      ],
      evidenceArtifacts: ['Ảnh chụp sản phẩm hoàn chỉnh chứa nội dung', 'Phiếu thu nhận ý kiến đánh giá của người trải nghiệm'],
      scope: 'mvp',
      implementationMode: defaultMode
    },
    {
      id: 'F-P4-03',
      name: `Tính năng mở rộng & nâng cấp: ${extensionFeature}`,
      description: `Kế hoạch nâng cấp phiên bản tiếp theo với tính năng mở rộng "${extensionFeature}", tự động hóa cao hơn và chuẩn bị trưng bày triển lãm.`,
      knowledgeIds: ['K-03'],
      skillIds: ['S-03'],
      competencyIds: ['C-02', 'C-03'],
      tasks: [
        {
          id: 'T-P4-03-A',
          description: `Lập tài liệu thiết kế và kiến trúc mở rộng cho tính năng [${extensionFeature}].`,
          knowledgeIds: ['K-03'],
          skillIds: ['S-03'],
          competencyIds: ['C-02']
        },
        {
          id: 'T-P4-03-B',
          description: `Chuẩn bị bài thuyết trình giới thiệu sản phẩm ${dreamName} và hành trình sáng tạo của bản thân.`,
          knowledgeIds: [],
          skillIds: ['S-03'],
          competencyIds: ['C-03']
        }
      ],
      learningGuide: {
        step1Learn: 'Tư duy phát triển sản phẩm liên tục (Product Iteration) và khả năng mở rộng (Scalability).',
        step2Practice: 'Lập sơ đồ tư duy phác thảo các tính năng nâng cao mà người dùng mong muốn thêm.',
        step3Apply: 'Xây dựng tài liệu định hướng các tính năng mới cho phiên bản v2.0.',
        step4Verify: 'Kế hoạch rõ ràng, khả thi với năng lực học tập của con.',
        step5Evidence: 'Lưu bản kế hoạch nâng cấp và slide trình chiếu.'
      },
      deliverable: `Bản thiết kế nâng cấp v2.0 cho [${extensionFeature}] và tài liệu thuyết trình Portfolio`,
      successCriteria: [`Xác định rõ các bước nâng cấp tính năng "${extensionFeature}" trong kế hoạch học tập năm tới`],
      evidenceArtifacts: ['Slide thuyết trình sản phẩm', 'Bản vẽ kỹ thuật / thiết kế tính năng nâng cấp'],
      scope: 'extension',
      implementationMode: defaultMode
    }
  ];

  const project4: DetailedPersonalizedProject = {
    id: 'P4',
    projectNumber: 4,
    name: answers.projectName?.trim() || 'Dự Án Sáng Tạo Ước Mơ',
    roleDescription: `Hoàn thiện phiên bản khả thi của ${productFormat} "${dreamName}" và xác định hướng mở rộng.`,
    goal: `Hiện thực hóa ý tưởng "${dreamName}" (${productFormat}): Giải quyết mục đích "${dreamPurpose}" phục vụ "${dreamAudience}" với các đặc trưng (${dreamFeatures.join(', ')}). Chia làm các chức năng cốt lõi (MVP) và tính năng mở rộng phát triển (Extension).`,
    features: p4Features,
    tasks: [
      `Lập trình & tích hợp chức năng tương tác cốt lõi: ${interactionFeature}`,
      `Hoàn thiện chức năng nội dung & thử nghiệm cùng ${dreamAudience} để đạt mục đích "${dreamPurpose}"`,
      `Xây dựng kế hoạch mở rộng & nâng cấp tính năng: ${extensionFeature}`
    ] as [string, string, string],
    deliverable: `Sản phẩm hoàn chỉnh "${dreamName}" (${productFormat}) kèm video demo và tài liệu lộ trình phát triển`,
    completionCheck: `Sản phẩm vận hành đúng ý tưởng con mong muốn, ${dreamAudience} có thể sử dụng và phản hồi`,
    isDreamProject: true,
    adaptedFromLibraryId: 'Ý tưởng gốc từ học sinh (Dream Project Brief)',
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

export interface PersonalizedSIOScenario {
  id: string;
  stepIndex: number;
  stageName: string;
  dimension: 'knowledge' | 'skill' | 'problem_solving';
  observable: string;
  standardRefs: string[];
  question: string;
  suggestedAnswers: string[];
  evidencePolicy: string;
  parentExplanation: string;
  childWhy: string;
  nonScoringRubric: {
    observed: string;
    emerging: string;
    not_observed: string;
    insufficient_evidence: string;
  };
}

/**
 * Cá nhân hóa 3 tình huống thử thách quan sát (SIO Steps 10-12)
 * Bối cảnh bám sát tuyệt đối theo Dự án Ước mơ (Dream Project), hình thức sản phẩm và chuyên môn
 * TUÂN THỦ: Không kết luận đạt năng lực 3D chỉ từ câu trả lời ngắn hoặc tình huống 2D mô phỏng
 */
export function getPersonalizedSIOScenarios(answers: JourneyAnswers, isPrimary: boolean): PersonalizedSIOScenario[] {
  const domain = answers.domain || 'robotics';
  const branchKey = answers.branch || (isPrimary ? (domain === 'robotics' ? 'robot_build_and_block_control' : 'game') : 'web');
  const dreamName = answers.projectName?.trim() || 'Dự án sáng tạo';
  const dreamAudience = answers.dreamAudience || 'người thân và bạn bè';
  const dreamPurpose = answers.dreamPurpose || 'lan tỏa yêu thương và giải quyết vấn đề thực tế';
  const productFormat = answers.productFormat?.trim() || (
    dreamPurpose.toLowerCase().includes('thiệp') ? 'thiệp điện tử 3D tương tác' :
    domain === 'multimedia' ? 'sản phẩm đồ họa 3D' :
    domain === 'robotics' ? 'mô hình robot thông minh' : 'trò chơi tương tác'
  );

  if (domain === 'multimedia') {
    const is3D = branchKey.includes('3d') ||
      (answers.dreamAppearance || '').toLowerCase().includes('3d') ||
      dreamPurpose.toLowerCase().includes('3d') ||
      productFormat.toLowerCase().includes('3d');

    const isCard = dreamPurpose.toLowerCase().includes('thiệp') ||
      productFormat.toLowerCase().includes('thiệp') ||
      dreamName.toLowerCase().includes('thiệp');

    if (isCard) {
      return [
        {
          id: 'FM-P-MUL-SIO-01',
          stepIndex: 10,
          stageName: 'Nhận thức & Điểm nhấn Thị giác',
          dimension: 'knowledge',
          observable: 'Xác định điểm nhấn thị giác và phân cấp thông tin trên sản phẩm tương tác',
          standardRefs: ['ISTE-1.6.c', 'NLS25-3.1'],
          question: `Khi người nhận mở tấm ${productFormat} "${dreamName}", con muốn họ chú ý đến chi tiết nổi bật nào đầu tiên?`,
          suggestedAnswers: [
            'Mô hình 3D nhân vật/chi tiết chính nổi bật lên ngay giữa tấm thiệp',
            'Dòng chữ lời chúc yêu thương thật ấm áp, rõ ràng và dễ đọc',
            'Hiệu ứng màu sắc pastel theo chủ đề và giai điệu âm thanh vui tươi'
          ],
          evidencePolicy: 'Chỉ ghi nhận phản xạ lựa chọn bối cảnh của học sinh; chưa coi là chứng nhận năng lực 3D độc lập.',
          parentExplanation: 'Quan sát cách con hình dung bố cục và điểm nhấn cảm xúc cho người nhận.',
          childWhy: 'Mình muốn hiểu điều con muốn người nhận cảm thấy ấn tượng nhất khi mở thiệp.',
          nonScoringRubric: {
            observed: 'Có chủ đích rõ ràng về điểm nhìn hoặc thông điệp cốt lõi.',
            emerging: 'Có ý tưởng nhưng chưa phân tách rõ thứ tự ưu tiên.',
            not_observed: 'Chưa thể hiện sự lựa chọn bố cục.',
            insufficient_evidence: 'Bỏ qua hoặc chưa đủ dữ liệu quan sát.'
          }
        },
        {
          id: 'FM-P-MUL-SIO-02',
          stepIndex: 11,
          stageName: 'Kỹ năng & Quy trình Thực hiện',
          dimension: 'skill',
          observable: 'Trình tự thiết kế nguyên mẫu 3D và ghép nối thành phần',
          standardRefs: ['ISTE-1.4.a', 'ISTE-1.6.c'],
          question: `Để hoàn thành ${productFormat} gửi tặng ${dreamAudience}, con dự định làm theo thứ tự các bước nào?`,
          suggestedAnswers: [
            'Phác thảo ý tưởng ra giấy → Nặn/tạo hình 3D → Thêm lời chúc → Xem thử tương tác',
            'Viết lời chúc yêu thương trước → Chọn màu sắc và phong cách 3D → Ghép thành tấm thiệp hoàn chỉnh',
            'Tạo mô hình 3D trước → Điều chỉnh góc nhìn xoay 360° → Thêm nút bấm tương tác và lời chúc'
          ],
          evidencePolicy: 'Ghi nhận tư duy sắp xếp các bước công việc; không yêu cầu thành thạo thao tác phần mềm chuyên sâu.',
          parentExplanation: 'Quan sát khả năng chia nhỏ công việc và lập kế hoạch thực hiện của con.',
          childWhy: 'Hiểu các bước con dự định bắt tay vào sáng tạo sản phẩm.',
          nonScoringRubric: {
            observed: 'Trình bày được chuỗi hành động tuần tự hợp lý từ ý tưởng đến hoàn thiện.',
            emerging: 'Có các bước nhưng thứ tự chưa chặt chẽ.',
            not_observed: 'Chưa thể hiện tư duy quy trình.',
            insufficient_evidence: 'Bỏ qua hoặc chưa đủ dữ liệu quan sát.'
          }
        },
        {
          id: 'FM-P-MUL-SIO-03',
          stepIndex: 12,
          stageName: 'Xử lý Tình huống & Tinh chỉnh Trải nghiệm',
          dimension: 'problem_solving',
          observable: 'Phát hiện vấn đề trải nghiệm người dùng và điều chỉnh góc nhìn/bố cục',
          standardRefs: ['ISTE-1.4.c', 'NLS25-3.2'],
          question: `Người nhận nói hình 3D che mất một phần lời nhắn yêu thương. Con sẽ kiểm tra và điều chỉnh điều gì trước?`,
          suggestedAnswers: [
            'Thu nhỏ mô hình 3D hoặc đổi góc đặt sang bên cạnh để nhường chỗ cho dòng chữ',
            'Đổi màu chữ tương phản hơn hoặc cho chữ hiện ra sau khi mô hình đã xoay xong',
            'Thêm nút bấm để người nhận có thể xoay đổi góc nhìn hoặc ẩn/hiện lời nhắn dễ dàng'
          ],
          evidencePolicy: 'Ghi nhận phản xạ tìm giải pháp cải tiến sản phẩm khi nhận phản hồi; không suy diễn kỹ năng kỹ thuật cao cấp.',
          parentExplanation: 'Quan sát thái độ tiếp nhận phản hồi và tư duy tìm giải pháp khắc phục vấn đề của con.',
          childWhy: 'Biết cách con kiên trì sửa chữa và làm cho sản phẩm đẹp hơn.',
          nonScoringRubric: {
            observed: 'Đề xuất giải pháp giải quyết được xung đột giữa hình ảnh và thông điệp.',
            emerging: 'Nhận ra vấn đề nhưng cách xử lý chưa giải quyết triệt để.',
            not_observed: 'Chưa đưa ra phương án điều chỉnh.',
            insufficient_evidence: 'Bỏ qua hoặc chưa đủ dữ liệu quan sát.'
          }
        }
      ];
    } else if (is3D) {
      return [
        {
          id: 'FM-P-MUL-SIO-01',
          stepIndex: 10,
          stageName: 'Nhận thức & Điểm nhấn Không gian',
          dimension: 'knowledge',
          observable: 'Chọn góc nhìn và điểm nhấn không gian cho mô hình 3D',
          standardRefs: ['ISTE-1.6.c', 'NLS25-3.1'],
          question: `Khi đưa mô hình 3D "${dreamName}" vào không gian hiển thị, con muốn người xem nhìn thấy góc cạnh nào đầu tiên?`,
          suggestedAnswers: [
            'Góc nhìn chính diện nổi bật khuôn mặt và dáng điệu đặc trưng của mô hình',
            'Góc nghiêng 45 độ để thấy rõ chiều sâu không gian và các chi tiết khối nổi bật',
            'Góc nhìn bao quát toàn cảnh kèm hiệu ứng ánh sáng chiếu sáng toàn bộ mô hình'
          ],
          evidencePolicy: 'Chỉ ghi nhận phản xạ lựa chọn bối cảnh của học sinh; chưa coi là chứng nhận năng lực 3D độc lập.',
          parentExplanation: 'Quan sát cách con tư duy không gian 3 chiều và truyền tải cảm xúc thị giác.',
          childWhy: 'Tìm hiểu cách con muốn mọi người khám phá mô hình của mình.',
          nonScoringRubric: {
            observed: 'Có chủ đích rõ ràng về điểm nhìn và không gian.',
            emerging: 'Có ý tưởng nhưng chưa rõ bố cục.',
            not_observed: 'Chưa thấy biểu hiện.',
            insufficient_evidence: 'Bỏ qua hoặc chưa đủ dữ liệu.'
          }
        },
        {
          id: 'FM-P-MUL-SIO-02',
          stepIndex: 11,
          stageName: 'Kỹ năng & Trình tự Dựng hình',
          dimension: 'skill',
          observable: 'Trình tự tạo hình từ khối cơ bản đến chi tiết và chất liệu',
          standardRefs: ['ISTE-1.4.a', 'ISTE-1.6.c'],
          question: `Để tạo nên mô hình 3D "${dreamName}", con sẽ thực hiện theo thứ tự nào?`,
          suggestedAnswers: [
            'Phác thảo hình khối cơ bản (hộp, cầu) → Ghép thành dáng chính → Thêm chi tiết và tô màu',
            'Chọn bảng màu chủ đạo trước → Dựng từng bộ phận riêng lẻ → Ráp nối lại hoàn chỉnh',
            'Dựng nhân vật chính trước → Thêm phụ kiện xung quanh → Thiết lập góc quay và ánh sáng'
          ],
          evidencePolicy: 'Ghi nhận tư duy sắp xếp quy trình tạo hình; không yêu cầu thành thạo công cụ chuyên nghiệp.',
          parentExplanation: 'Quan sát phương pháp tư duy tạo hình và lập kế hoạch thực hiện của con.',
          childWhy: 'Hiểu cách con bắt đầu hiện thực hóa khối hình 3D.',
          nonScoringRubric: {
            observed: 'Hiểu nguyên lý đi từ khối lớn cơ bản đến chi tiết tinh tế.',
            emerging: 'Có các bước nhưng thứ tự chưa hợp lý.',
            not_observed: 'Chưa thể hiện tư duy quy trình.',
            insufficient_evidence: 'Bỏ qua hoặc chưa đủ dữ liệu.'
          }
        },
        {
          id: 'FM-P-MUL-SIO-03',
          stepIndex: 12,
          stageName: 'Xử lý Lỗi & Tinh chỉnh Ánh sáng/Khối',
          dimension: 'problem_solving',
          observable: 'Kiểm tra lỗi khối hoặc góc khuất ánh sáng và hiệu chỉnh',
          standardRefs: ['ISTE-1.4.c', 'NLS25-3.2'],
          question: `Khi xoay thử mô hình 3D, nếu con phát hiện một góc bị tối hoặc chi tiết bị méo lệch, con sẽ làm gì?`,
          suggestedAnswers: [
            'Dịch chuyển nguồn sáng phụ (Fill light) rọi vào góc tối để nhìn rõ hơn',
            'Dùng công cụ nắn chỉnh (Sculpt/Transform) để kéo lại phần khối bị lệch cho cân đối',
            'Bình tĩnh bấm nút Hoàn tác (Undo) hoặc xem lại bản phác thảo ban đầu để chỉnh sửa'
          ],
          evidencePolicy: 'Ghi nhận phản xạ tự sửa chữa và tinh chỉnh chất lượng tác phẩm.',
          parentExplanation: 'Quan sát sự cẩn trọng và kiên nhẫn khi phát hiện chi tiết chưa hoàn hảo.',
          childWhy: 'Giúp con nhận ra mọi lỗi kỹ thuật đều có cách giải quyết.',
          nonScoringRubric: {
            observed: 'Có giải pháp logic nhắm đúng vào ánh sáng hoặc hình khối.',
            emerging: 'Nhận ra lỗi nhưng phương án xử lý chưa cụ thể.',
            not_observed: 'Chưa có phương án xử lý.',
            insufficient_evidence: 'Bỏ qua hoặc chưa đủ dữ liệu.'
          }
        }
      ];
    } else {
      return [
        {
          id: 'FM-P-MUL-SIO-01',
          stepIndex: 10,
          stageName: 'Nhận thức & Truyền đạt Thông điệp',
          dimension: 'knowledge',
          observable: 'Chọn bố cục/hình ảnh để truyền đạt thông điệp',
          standardRefs: ['ISTE-1.6.c', 'NLS25-3.1'],
          question: `Khi sáng tạo tác phẩm "${dreamName}", con muốn người xem nhìn thấy hình ảnh nổi bật nào đầu tiên?`,
          suggestedAnswers: [
            'Hình ảnh nhân vật chính mang cảm xúc vui tươi và ấn tượng',
            'Dòng tiêu đề lớn thật to làm nổi bật chủ đề thông điệp',
            'Khung cảnh rực rỡ với màu sắc tương phản thu hút ánh nhìn'
          ],
          evidencePolicy: 'Chỉ ghi nhận phản xạ biểu đạt của học sinh tại thời điểm trả lời.',
          parentExplanation: 'Quan sát tư duy truyền thông thị giác của học sinh.',
          childWhy: 'Tìm hiểu cách con thu hút người xem vào tác phẩm.',
          nonScoringRubric: {
            observed: 'Xác định được trọng tâm thị giác.',
            emerging: 'Có ý tưởng nhưng chưa nêu rõ điểm nhấn.',
            not_observed: 'Chưa thể hiện điểm nhấn.',
            insufficient_evidence: 'Bỏ qua hoặc chưa đủ dữ liệu.'
          }
        },
        {
          id: 'FM-P-MUL-SIO-02',
          stepIndex: 11,
          stageName: 'Kỹ năng & Quy trình Kể chuyện',
          dimension: 'skill',
          observable: 'Sắp xếp bố cục hình vẽ, tiêu đề và phân cảnh',
          standardRefs: ['ISTE-1.4.a', 'ISTE-1.6.c'],
          question: `Con sẽ sắp xếp hình ảnh chính, tiêu đề và các chi tiết như thế nào để người xem hiểu nhanh nhất?`,
          suggestedAnswers: [
            'Tiêu đề ở vị trí dễ thấy → Hình ảnh trung tâm thật to → Lời chú thích ngắn gọn',
            'Bố trí theo trình tự câu chuyện từ trái qua phải, từ trên xuống dưới',
            'Dùng màu sắc nổi bật cho điểm quan trọng nhất để người xem nhận ra ngay'
          ],
          evidencePolicy: 'Ghi nhận tư duy sắp xếp bố cục trực quan.',
          parentExplanation: 'Quan sát kỹ năng tổ chức thông tin trực quan.',
          childWhy: 'Hiểu cách con kể chuyện bằng hình ảnh.',
          nonScoringRubric: {
            observed: 'Có trình tự phân cấp thông tin rõ ràng.',
            emerging: 'Có ý tưởng nhưng sắp xếp lộn xộn.',
            not_observed: 'Chưa có trật tự.',
            insufficient_evidence: 'Bỏ qua hoặc chưa đủ dữ liệu.'
          }
        },
        {
          id: 'FM-P-MUL-SIO-03',
          stepIndex: 12,
          stageName: 'Xử lý Lỗi & Tinh chỉnh Trải nghiệm',
          dimension: 'problem_solving',
          observable: 'Điều chỉnh thiết kế khi nhận phản hồi từ người xem',
          standardRefs: ['ISTE-1.4.c', 'NLS25-3.2'],
          question: `Nếu người xem nhận xét chữ trên tác phẩm hơi khó đọc hoặc hình vẽ bị rối, con sẽ làm gì?`,
          suggestedAnswers: [
            'Đổi màu chữ sang màu tương phản với nền và tăng kích thước chữ to hơn',
            'Bớt các chi tiết rườm rà ở nền để làm nổi bật nội dung quan trọng',
            'Hỏi thêm bạn xem phần nào khó hiểu nhất để cùng thảo luận cách sửa'
          ],
          evidencePolicy: 'Ghi nhận thái độ lắng nghe phản hồi và giải pháp cải tiến.',
          parentExplanation: 'Quan sát sự sẵn sàng tinh chỉnh sản phẩm của học sinh.',
          childWhy: 'Biết cách lắng nghe nhận xét để sản phẩm ngày càng hoàn thiện.',
          nonScoringRubric: {
            observed: 'Có giải pháp tương phản hoặc đơn giản hóa bố cục hợp lý.',
            emerging: 'Nhận ra khó khăn nhưng giải pháp chưa đúng chỗ.',
            not_observed: 'Chưa có giải pháp cải tiến.',
            insufficient_evidence: 'Bỏ qua hoặc chưa đủ dữ liệu.'
          }
        }
      ];
    }
  }

  if (domain === 'robotics') {
    return [
      {
        id: 'FM-P-ROB-SIO-01',
        stepIndex: 10,
        stageName: 'Nhận thức & Phản ứng Thiết bị',
        dimension: 'knowledge',
        observable: 'Nhận biết tín hiệu cảm biến và phản ứng an toàn của máy móc',
        standardRefs: ['CSTA-1A-CS-01', 'ISTE-1.1.a'],
        question: `Khi thiết kế ${dreamName}, con muốn nó nhận biết và phản hồi với tín hiệu nào đầu tiên từ môi trường?`,
        suggestedAnswers: [
          'Cảm biến siêu âm phát hiện vật cản phía trước để dừng an toàn',
          'Đèn LED tín hiệu phát sáng đổi màu khi có người đến gần',
          'Nút bấm khởi động nhanh trên thân robot để người dùng dễ điều khiển'
        ],
        evidencePolicy: 'Chỉ ghi nhận phản xạ lựa chọn của học sinh trong tình huống mô phỏng.',
        parentExplanation: 'Quan sát cách con hiểu mối liên hệ giữa cảm biến và hành vi của robot.',
        childWhy: 'Tìm hiểu giác quan công nghệ nào con muốn trang bị cho robot trước tiên.',
        nonScoringRubric: {
          observed: 'Chọn được cảm biến hoặc tín hiệu đầu vào phù hợp với mục đích.',
          emerging: 'Có ý tưởng nhưng chưa gắn với cơ chế cảm biến.',
          not_observed: 'Chưa thể hiện sự lựa chọn.',
          insufficient_evidence: 'Bỏ qua hoặc chưa đủ dữ liệu.'
        }
      },
      {
        id: 'FM-P-ROB-SIO-02',
        stepIndex: 11,
        stageName: 'Kỹ năng & Quy trình Chế tạo',
        dimension: 'skill',
        observable: 'Trình tự lắp ráp cơ khí và kết nối mạch điện an toàn',
        standardRefs: ['CSTA-1A-AP-10', 'ISTE-1.4.a'],
        question: `Để chế tạo ${dreamName}, con sẽ sắp xếp thứ tự các bước làm như thế nào để xe chạy ổn định?`,
        suggestedAnswers: [
          'Lắp khung cơ khí và bánh xe trước → Gắn mạch điều khiển và động cơ → Nạp code chạy thử',
          'Kiểm tra pin và cắm dây mạch điện trước → Lập trình lệnh cơ bản → Ráp vỏ ngoài',
          'Vẽ phác thảo vị trí linh kiện → Lắp ráp từng cụm nhỏ → Ghép nối và thử tải'
        ],
        evidencePolicy: 'Ghi nhận tư duy sắp xếp quy trình kỹ thuật.',
        parentExplanation: 'Quan sát kỹ năng phân chia các bước trong dự án cơ khí - lập trình.',
        childWhy: 'Hiểu lộ trình thực hiện trong suy nghĩ của con.',
        nonScoringRubric: {
          observed: 'Quy trình logic từ phần cứng đến nạp phần mềm và kiểm thử.',
          emerging: 'Các bước còn đảo lộn (ví dụ nạp code trước khi lắp mạch).',
          not_observed: 'Chưa có trình tự.',
          insufficient_evidence: 'Bỏ qua hoặc chưa đủ dữ liệu.'
        }
      },
      {
        id: 'FM-P-ROB-SIO-03',
        stepIndex: 12,
        stageName: 'Xử lý Lỗi & Kiểm tra Kỹ thuật (Debug)',
        dimension: 'problem_solving',
        observable: 'Phương pháp kiểm tra nguyên nhân khi thiết bị hoạt động sai',
        standardRefs: ['CSTA-1A-AP-14', 'ISTE-1.4.c'],
        question: `Khi chạy thử nghiệm, nếu robot bị chạy lệch hướng hoặc chưa dừng trước vật cản, con sẽ kiểm tra điều gì trước?`,
        suggestedAnswers: [
          'Kiểm tra xem hai bánh xe có bị kẹt rác hoặc tốc độ động cơ hai bên có đều nhau không',
          'Đo lại khoảng cách cảm biến siêu âm xem đã cắm đúng cổng và đúng thông số trong code chưa',
          'Tách riêng phần code cảm biến ra thử độc lập trước khi chạy toàn bộ chương trình'
        ],
        evidencePolicy: 'Ghi nhận tư duy cô lập lỗi (isolation testing) và kiên trì khắc phục sự cố.',
        parentExplanation: 'Quan sát phản xạ xử lý tình huống lỗi kỹ thuật.',
        childWhy: 'Biết cách con suy luận nguyên nhân khi máy móc gặp trục trặc.',
        nonScoringRubric: {
          observed: 'Xác định được nguyên nhân cơ khí hoặc phần mềm và kiểm tra có phương pháp.',
          emerging: 'Biết là có lỗi nhưng chưa biết bắt đầu kiểm tra từ đâu.',
          not_observed: 'Chưa có phương án xử lý.',
          insufficient_evidence: 'Bỏ qua hoặc chưa đủ dữ liệu.'
        }
      }
    ];
  }

  // Game Programming
  return [
    {
      id: 'FM-P-GAM-SIO-01',
      stepIndex: 10,
      stageName: 'Nhận thức & Trải nghiệm Người chơi',
      dimension: 'knowledge',
      observable: 'Xác định yếu tố tương tác cốt lõi thu hút người chơi',
      standardRefs: ['CSTA-1A-CS-01', 'ISTE-1.6.c'],
      question: `Khi người chơi bắt đầu vào game "${dreamName}", con muốn họ chú ý hoặc trải nghiệm điều gì đầu tiên?`,
      suggestedAnswers: [
        'Hình ảnh nhân vật chính độc đáo và bối cảnh màn chơi thật bắt mắt',
        'Bảng hướng dẫn luật chơi ngắn gọn và nút bấm bắt đầu thật dễ thấy',
        'Âm thanh nền hào hứng cùng mục tiêu vượt ải rõ ràng'
      ],
      evidencePolicy: 'Ghi nhận định hướng trải nghiệm người dùng trong bối cảnh trò chơi.',
      parentExplanation: 'Quan sát tư duy lấy người chơi làm trung tâm của học sinh.',
      childWhy: 'Tìm hiểu điểm nhấn thu hút nhất trong trò chơi con tạo ra.',
      nonScoringRubric: {
        observed: 'Có chủ đích cụ thể về nhân vật, giao diện hoặc luật chơi mở đầu.',
        emerging: 'Ý tưởng chung chung chưa rõ điểm nhấn.',
        not_observed: 'Chưa có biểu hiện.',
        insufficient_evidence: 'Bỏ qua hoặc chưa đủ dữ liệu.'
      }
    },
    {
      id: 'FM-P-GAM-SIO-02',
      stepIndex: 11,
      stageName: 'Kỹ năng & Quy trình Lập trình Game',
      dimension: 'skill',
      observable: 'Trình tự phát triển game từ cơ chế chính đến cấp độ',
      standardRefs: ['CSTA-1A-AP-10', 'ISTE-1.4.a'],
      question: `Để lập trình trò chơi "${dreamName}", con sẽ sắp xếp các bước theo trình tự nào?`,
      suggestedAnswers: [
        'Vẽ nhân vật và sàn đấu trước → Lập trình phím di chuyển và nhảy → Thêm chướng ngại vật',
        'Xây dựng luật tính điểm và kết thúc game trước → Thiết kế đồ họa → Tinh chỉnh độ khó',
        'Làm một màn chơi mẫu siêu nhỏ (demo) → Chơi thử tìm lỗi → Mở rộng thêm màn tiếp theo'
      ],
      evidencePolicy: 'Ghi nhận tư duy phát triển phần mềm theo nguyên mẫu lặp lại (iterative).',
      parentExplanation: 'Quan sát phương pháp tiếp cận lập trình phần mềm trò chơi của con.',
      childWhy: 'Hiểu các bước con xây dựng trò chơi từ đầu đến cuối.',
      nonScoringRubric: {
        observed: 'Trình tự logic từ nhân vật/cơ chế đến màn chơi và thử nghiệm.',
        emerging: 'Có các bước nhưng thứ tự chưa chặt chẽ.',
        not_observed: 'Chưa có trình tự.',
        insufficient_evidence: 'Bỏ qua hoặc chưa đủ dữ liệu.'
      }
    },
    {
      id: 'FM-P-GAM-SIO-03',
      stepIndex: 12,
      stageName: 'Xử lý Lỗi & Cân bằng Gameplay (Debug)',
      dimension: 'problem_solving',
      observable: 'Phát hiện lỗi logic hoặc độ khó mất cân bằng và hiệu chỉnh',
      standardRefs: ['CSTA-1A-AP-14', 'ISTE-1.4.c'],
      question: `Nếu bạn chơi thử nói trò chơi bị khó quá hoặc nhân vật nhảy hay bị vướng vào chướng ngại vật, con sẽ sửa thế nào?`,
      suggestedAnswers: [
        'Giảm tốc độ di chuyển của chướng ngại vật hoặc nới rộng khoảng cách giữa các bục nhảy',
        'Kiểm tra lại vùng va chạm (hitbox) của nhân vật xem có bị to hơn hình vẽ hay không',
        'Thêm mạng chơi (HP) hoặc cho phép hồi sinh gần chỗ vừa ngã để bạn không nản lòng'
      ],
      evidencePolicy: 'Ghi nhận năng lực phát hiện nguyên nhân thuật toán và tối ưu trải nghiệm người chơi.',
      parentExplanation: 'Quan sát cách con phản ứng trước ý kiến phản hồi và điều chỉnh thuật toán.',
      childWhy: 'Giúp con biết cách lắng nghe người chơi để làm game hay hơn.',
      nonScoringRubric: {
        observed: 'Đề xuất cách sửa chuẩn xác về va chạm, thông số tốc độ hoặc cơ chế hỗ trợ.',
        emerging: 'Biết game khó nhưng chưa biết chỉnh sửa thông số nào.',
        not_observed: 'Chưa có phương án xử lý.',
        insufficient_evidence: 'Bỏ qua hoặc chưa đủ dữ liệu.'
      }
    }
  ];
}

/**
 * Trích xuất thẻ bằng chứng SIO thực tế (thay thế hoàn toàn Radar chart)
 * Tuân thủ P0: Chỉ ghi nhận những câu hỏi học sinh đã trả lời, không suy diễn điểm năng lực
 */
export function extractSIOEvidenceCards(answers: JourneyAnswers): SIOEvidenceCard[] {
  const isPrimary = !answers.gradeBand || ['1-2', '3-5'].includes(answers.gradeBand) || (answers.grade && parseInt(answers.grade, 10) <= 5);
  const scenarios = getPersonalizedSIOScenarios(answers, Boolean(isPrimary));
  const cards: SIOEvidenceCard[] = [];
  const assistedMap = answers.assistedSIO || {};

  // 1. Tình huống SIO 1 (Nhận thức / Kiến thức) - Bước 10
  if (scenarios[0]) {
    const sc = scenarios[0];
    const resp = answers.knowledgeResponse?.trim();
    const isSkipped = !resp || resp.includes('bỏ qua') || resp.includes('Chưa rõ');
    const isAssisted = Boolean(assistedMap['knowledge']);

    if (isSkipped) {
      cards.push({
        id: 'evidence-sio-1',
        sioId: sc.id,
        stepIndex: 10,
        stageName: sc.stageName,
        questionPrompt: sc.question,
        responsePreview: resp || 'Học sinh chọn tìm hiểu thêm khi vào lớp / Chưa có câu trả lời trực tiếp.',
        sourceLabel: 'Chưa đủ dữ liệu quan sát',
        sourceType: 'insufficient_evidence',
        standardRef: sc.standardRefs[0],
        caveat: 'Chưa đủ thông tin để ghi nhận ở câu hỏi này; bảo lưu để quan sát thực tế trong quá trình học tập.'
      });
    } else {
      cards.push({
        id: 'evidence-sio-1',
        sioId: sc.id,
        stepIndex: 10,
        stageName: sc.stageName,
        questionPrompt: sc.question,
        responsePreview: isAssisted
          ? `Học sinh đã chọn phương án định hướng: "${resp}"`
          : `Học sinh đã trả lời: "${resp}"`,
        sourceLabel: isAssisted ? 'Câu trả lời có gợi ý hỗ trợ từ hệ thống' : 'Học sinh tự diễn đạt độc lập',
        sourceType: 'student_situation',
        standardRef: sc.standardRefs[0],
        caveat: isAssisted
          ? 'Học sinh chọn phương án gợi ý về ý tưởng trong tình huống mô phỏng. Cần quan sát thêm qua sản phẩm thực tế.'
          : 'Học sinh tự chia sẻ ý tưởng thiết kế trong tình huống mô phỏng. Cần quan sát thêm qua sản phẩm thực tế.'
      });
    }
  }

  // 2. Tình huống SIO 2 (Kỹ năng / Quy trình) - Bước 11
  if (scenarios[1]) {
    const sc = scenarios[1];
    const resp = answers.skillResponse?.trim();
    const isSkipped = !resp || resp.includes('bỏ qua') || resp.includes('Chưa rõ');
    const isAssisted = Boolean(assistedMap['skill']);

    if (isSkipped) {
      cards.push({
        id: 'evidence-sio-2',
        sioId: sc.id,
        stepIndex: 11,
        stageName: sc.stageName,
        questionPrompt: sc.question,
        responsePreview: resp || 'Học sinh chưa hoàn thành thao tác sắp xếp.',
        sourceLabel: 'Chưa đủ dữ liệu quan sát',
        sourceType: 'insufficient_evidence',
        standardRef: sc.standardRefs[0],
        caveat: 'Chưa đủ thông tin để ghi nhận ở câu hỏi này; bảo lưu để quan sát thực tế trong quá trình học tập.'
      });
    } else {
      cards.push({
        id: 'evidence-sio-2',
        sioId: sc.id,
        stepIndex: 11,
        stageName: sc.stageName,
        questionPrompt: sc.question,
        responsePreview: isAssisted
          ? `Học sinh đã chọn phương án định hướng: "${resp}"`
          : `Học sinh đã trình bày: "${resp}"`,
        sourceLabel: isAssisted ? 'Câu trả lời có gợi ý hỗ trợ từ hệ thống' : 'Học sinh tự diễn đạt độc lập',
        sourceType: 'student_situation',
        standardRef: sc.standardRefs[0],
        caveat: isAssisted
          ? 'Học sinh chọn quy trình gợi ý trong tình huống mô phỏng. Cần quan sát thêm qua sản phẩm thực tế.'
          : 'Học sinh tự đề xuất thứ tự các bước thực hiện trong tình huống mô phỏng. Cần quan sát thêm qua sản phẩm thực tế.'
      });
    }
  }

  // 3. Tình huống SIO 3 (Giải quyết vấn đề / Debug) - Bước 12
  if (scenarios[2]) {
    const sc = scenarios[2];
    const resp = answers.problemResponse?.trim();
    const isSkipped = !resp || resp.includes('bỏ qua') || resp.includes('Chưa rõ');
    const isAssisted = Boolean(assistedMap['problem']);

    if (isSkipped) {
      cards.push({
        id: 'evidence-sio-3',
        sioId: sc.id,
        stepIndex: 12,
        stageName: sc.stageName,
        questionPrompt: sc.question,
        responsePreview: resp || 'Chưa ghi nhận phương án sửa lỗi.',
        sourceLabel: 'Chưa đủ dữ liệu quan sát',
        sourceType: 'insufficient_evidence',
        standardRef: sc.standardRefs[0],
        caveat: 'Chưa đủ thông tin để ghi nhận ở câu hỏi này; bảo lưu để quan sát thực tế trong quá trình học tập.'
      });
    } else {
      cards.push({
        id: 'evidence-sio-3',
        sioId: sc.id,
        stepIndex: 12,
        stageName: sc.stageName,
        questionPrompt: sc.question,
        responsePreview: isAssisted
          ? `Học sinh đã chọn phương án định hướng: "${resp}"`
          : `Học sinh đề xuất cách giải quyết: "${resp}"`,
        sourceLabel: isAssisted ? 'Câu trả lời có gợi ý hỗ trợ từ hệ thống' : 'Học sinh tự diễn đạt độc lập',
        sourceType: 'student_situation',
        standardRef: sc.standardRefs[0],
        caveat: isAssisted
          ? 'Học sinh chọn phương án xử lý gợi ý trong tình huống mô phỏng. Cần quan sát thêm qua sản phẩm thực tế.'
          : (answers.domain === 'multimedia' || sc.question?.toLowerCase().includes('mái nhà') || sc.question?.toLowerCase().includes('bố cục')
              ? 'Học sinh tự đề xuất cách điều chỉnh bố cục trong tình huống mô phỏng. Cần quan sát thêm qua sản phẩm thực tế.'
              : 'Học sinh tự đề xuất cách điều chỉnh vận hành trong tình huống mô phỏng. Cần quan sát thêm qua sản phẩm thực tế.')
      });
    }
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

  // ── 1. IMAGE ASSET MANIFEST (TÀI NGUYÊN HÌNH ẢNH ĐƯỢC DUYỆT) ──
  const heroUrl = (answers.avatarSource === 'custom' && answers.customAvatarData)
    ? answers.customAvatarData
    : (isPrimary ? '/assets/profile-may-banner.png' : '/assets/profile-nova-banner.png');

  const heroAssetId = (answers.avatarSource === 'custom' && answers.customAvatarData)
    ? 'asset-hero-custom'
    : 'asset-hero-preset';

  const futureRoleTitle = answers.futureSelf || riasec.roleTitle;
  const roleSubtitle = riasec.roleSubtitle;
  const motto = answers.domain === 'multimedia'
    ? (isPrimary
        ? 'Mỗi nét vẽ hôm nay mở ra một thế giới rực rỡ ngày mai!'
        : 'Thiết kế không chỉ là hình thức, mà là cách chúng ta lan tỏa giá trị sống.')
    : answers.domain === 'game_programming'
    ? (isPrimary
        ? 'Chơi game thật vui, nhưng tự tay làm ra game còn tuyệt vời hơn!'
        : 'Lập trình là công cụ biến mọi ý tưởng tưởng chừng không thể thành hiện thực.')
    : (isPrimary
        ? 'Mỗi ý tưởng nhỏ hôm nay có thể tạo nên thay đổi lớn ngày mai!'
        : 'Công nghệ không chỉ để giải trí, mà còn để tạo ra một thế giới tốt đẹp hơn.');

  const heroAsset: FutureMeImageAsset = {
    assetId: heroAssetId,
    type: 'student_future_hero',
    source: (answers.avatarSource === 'custom' && answers.customAvatarData)
      ? (answers.customAvatarData.startsWith('data:') ? 'user_uploaded' : 'ai_generated')
      : 'system_preset',
    url: heroUrl,
    dataUrl: (answers.avatarSource === 'custom' && answers.customAvatarData?.startsWith('data:'))
      ? answers.customAvatarData
      : undefined,
    fileName: 'hero.png',
    alt: `Chân dung Future Me của ${answers.name || 'học sinh'} — ${futureRoleTitle}`,
    approved: true,
    isActive: true,
    representation: 'future_concept'
  };

  const companionAvatarUrl = answers.avatar === 'builder'
    ? '/assets/kittenbot-builder.png'
    : answers.avatar === 'explorer'
    ? '/assets/kittenbot-explorer.png'
    : '/assets/kittenbot-creator.png';

  const avatarAsset: FutureMeImageAsset = {
    assetId: 'asset-avatar-companion',
    type: 'student_avatar',
    source: 'system_preset',
    url: companionAvatarUrl,
    fileName: 'companion-avatar.png',
    alt: `Linh vật bạn đồng hành Kitten Bot (${answers.avatar || 'creator'})`,
    approved: true,
    isActive: true,
    representation: 'future_concept'
  };

  const defaultImages = answers.domain === 'multimedia'
    ? [
        '/assets/activity-visual-storytelling.png',
        '/assets/activity-world-building.png',
        '/assets/activity-communication.png',
        '/assets/activity-nature-observation.png'
      ]
    : answers.domain === 'robotics'
    ? [
        '/assets/activity-robotics.png',
        '/assets/activity-problem-solving.png',
        '/assets/activity-world-building.png',
        '/assets/activity-communication.png'
      ]
    : [
        '/assets/activity-world-building.png',
        '/assets/activity-problem-solving.png',
        '/assets/activity-visual-storytelling.png',
        '/assets/activity-communication.png'
      ];

  const projectAssets: FutureMeImageAsset[] = projects.map((p, idx) => ({
    assetId: `asset-prototype-${p.id.toLowerCase()}`,
    type: 'project_prototype',
    projectId: p.id as 'P1' | 'P2' | 'P3' | 'P4',
    source: (p.image && !p.image.startsWith('/assets/')) ? 'user_uploaded' : 'system_preset',
    url: p.image || defaultImages[idx],
    fileName: `prototype-${p.id.toLowerCase()}.png`,
    alt: `Ảnh concept prototype dự án ${p.name} (${p.id})`,
    approved: true,
    isActive: true,
    representation: 'future_concept'
  }));

  const imageManifest: FutureMeImageManifest = {
    activeHeroAssetId: heroAssetId,
    assets: [heroAsset, avatarAsset, ...projectAssets]
  };

  // ── 2. PRESENTATION LAYER (LỚP TRÌNH BÀY CHUYÊN BIỆT CHO FUTURE ME PORTFOLIO) ──
  const is2DTo3DPathway = answers.branch === 'design_2d' && (
    answers.productFormat?.toLowerCase().includes('3d') ||
    dreamName.toLowerCase().includes('3d') ||
    answers.dreamPurpose?.toLowerCase().includes('3d')
  );

  const p4Project = projects[3];
  const p4Features = p4Project?.features || [];

  const presentationLayer = {
    futureProfessionalRole: {
      title: futureRoleTitle,
      subtitle: roleSubtitle,
      techSector: riasec.techSector,
      specialization: branch?.label || branchKey,
      specializationPathway: is2DTo3DPathway
        ? 'Chuyên môn nền tảng: Thiết kế đồ họa 2D (tạo hình, bố cục và màu sắc). Hướng mở rộng phục vụ Dream Project: Dựng hình khối và tương tác 3D. Kỹ năng 2D là bước chuẩn bị then chốt để làm chủ không gian 3D.'
        : `Chuyên môn định hướng: ${branch?.label || branchKey} gắn liền với thực hành dự án.`,
      motto: motto,
      badge: 'Chân dung tương lai do con và gia đình định hướng',
      creativeStyle: (answers.confirmedTraits && answers.confirmedTraits.join(', ')) || (isPrimary ? 'Tò mò, kiên trì, sáng tạo' : 'Chủ động, tư duy hệ thống, sáng tạo'),
      environment: answers.domain === 'multimedia'
        ? 'Digital Media Studio, Không gian thiết kế trải nghiệm 3D & tương tác sáng tạo'
        : answers.domain === 'robotics'
        ? 'Robotics & Automation Lab, Không gian chế tạo thông minh & IoT'
        : 'Game Development Studio, Không gian phát triển phần mềm & AI',
      targetAudience: dreamAudience,
      representativeWork: dreamName
    },

    professionalSummary: {
      introduction: answers.domain === 'multimedia'
        ? (isPrimary
            ? `Nhà sáng tạo tương lai, mong muốn kết hợp thiết kế đồ họa và nghệ thuật kể chuyện tương tác để tạo ra những sản phẩm giàu cảm xúc dành cho ${dreamAudience}.`
            : `Kỹ sư và nhà thiết kế số trẻ tuổi hướng tới làm chủ đồ họa và trải nghiệm người dùng hiện đại, giải quyết các bài toán thiết thực cho cộng đồng.`)
        : answers.domain === 'robotics'
        ? (isPrimary
            ? `Nhà sáng chế công nghệ tương lai, say mê lắp ráp và lập trình những chú robot thông minh hữu ích cho ${dreamAudience}.`
            : `Kỹ sư công nghệ trẻ định hướng nghiên cứu và phát triển trong lĩnh vực robotics, IoT và tự động hóa phục vụ đời sống.`)
        : (isPrimary
            ? `Nhà sáng tạo game tương lai, mong muốn tự tay lập trình những trò chơi thông minh, bổ ích và mang lại niềm vui cho ${dreamAudience}.`
            : `Kỹ sư phần mềm tương lai hướng tới phát triển các ứng dụng và trò chơi tương tác giải quyết bài toán thực tế.`),
      dreamProjectFocus: `Trọng tâm phát triển dự án "${dreamName}" (${answers.productFormat?.trim() || 'Sản phẩm tương tác công nghệ'}) với mục đích ${dreamPurpose}.`,
      techSector: riasec.techSector,
      creativeValues: [
        'Sáng tạo xuất phát từ sự thấu hiểu người dùng và nhu cầu thực tế',
        'Học tập chủ động qua dự án thực hành (Project-Based Learning)',
        'Từng bước làm chủ công nghệ từ nguyên lý nền tảng đến sản phẩm hoàn chỉnh'
      ],
      targetOrientationNotice: 'Mô tả thể hiện chân dung và giá trị hướng tới, không suy diễn tính cách bẩm sinh.'
    },

    futureExperiences: projects.map((p, idx) => {
      const allK = riasec.targetCapabilities.knowledge || [];
      const allS = riasec.targetCapabilities.skills || [];
      
      const knowledgeTargetList = idx === 3
        ? allK.map(k => `${k.id}: ${k.name}`)
        : (allK[idx] ? [`${allK[idx].id}: ${allK[idx].name}`] : allK.slice(0, 1).map(k => `${k.id}: ${k.name}`));

      const skillsTargetList = idx === 3
        ? allS.map(s => `${s.id}: ${s.name}`)
        : (allS[idx] ? [`${allS[idx].id}: ${allS[idx].name}`] : allS.slice(0, 1).map(s => `${s.id}: ${s.name}`));

      return {
        stageId: p.id,
        projectNumber: p.projectNumber,
        title: p.name,
        role: p.roleDescription,
        experienceType: 'Future Project Experience (Dự án con sẽ thực hiện)',
        status: 'FUTURE_TARGET',
        statusNotice: 'Mục tiêu dự kiến trong lộ trình — Sẽ chuyển sang Đã hoàn thành khi có minh chứng thực tế.',
        knowledgeTarget: knowledgeTargetList,
        skillsTarget: skillsTargetList,
        toolsTarget: (riasec.techStack[0]?.items || []).map(it => typeof it === 'string' ? it : it.name).slice(0, 3),
        deliverable: p.deliverable,
        targetOutcome: p.completionCheck,
        isFeaturedDreamProject: Boolean(p.isDreamProject),
        imageAssetId: `asset-prototype-${p.id.toLowerCase()}`,
        fileName: `prototype-${p.id.toLowerCase()}.png`,
        roadmapLink: {
          tab: 'ROADMAP',
          stageId: p.id,
          featureId: p.features?.[0]?.id || `F-${p.id}-01`
        }
      };
    }),

    targetProficiency: {
      scaleDefinition: {
        L1: 'L1 — Làm quen: Hiểu giao diện và thực hiện các thao tác căn bản theo hướng dẫn',
        L2: 'L2 — Thực hành có hướng dẫn: Sử dụng công cụ hoàn thành nhiệm vụ theo quy trình mẫu',
        L3: 'L3 — Tự triển khai sản phẩm: Tự chủ thiết kế, cấu hình và lập trình chức năng theo ý tưởng riêng',
        L4: 'L4 — Vận dụng, cải tiến & giải thích: Tối ưu hóa, mở rộng chức năng và tự tin giải thích giải pháp'
      },
      assessmentDisclaimer: 'Đây là 4 mức mục tiêu nội bộ dùng để diễn đạt lộ trình phát triển, không phải chứng chỉ kiểm định quốc tế hay điểm số đánh giá năng lực hiện tại.',
      coreTools: ((riasec.techStack[0]?.items || []).map(it => typeof it === 'string' ? it : it.name)).map((tool: string) => ({
        tool,
        category: 'Core Tool (Công cụ cốt lõi)',
        targetLevel: 'L3 — Tự triển khai sản phẩm',
        targetCriteria: `Tự sử dụng ${tool} để xây dựng các chức năng chính trong dự án P3 và P4`,
        relatedProjects: ['P2', 'P3', 'P4']
      })),
      supportingTools: ((riasec.techStack[1]?.items || []).map(it => typeof it === 'string' ? it : it.name)).map((tool: string) => ({
        tool,
        category: 'Supporting Tool (Công cụ bổ trợ)',
        targetLevel: 'L2 — Thực hành có hướng dẫn',
        targetCriteria: `Vận dụng ${tool} để tạo tài nguyên phụ trợ hoặc tối ưu giao diện/mô hình`,
        relatedProjects: ['P1', 'P2']
      })),
      extensionTools: (riasec.techStack.slice(2).flatMap(cat => cat.items.map(it => typeof it === 'string' ? it : it.name))).map((tool: string) => ({
        tool,
        category: 'Advanced / Extension Tool (Công cụ mở rộng)',
        targetLevel: 'L2 — Thực hành có hướng dẫn',
        targetCriteria: `Tìm hiểu và tích hợp ${tool} để tăng cường tính năng cho Dream Project`,
        relatedProjects: ['P4']
      }))
    },

    capabilityVisualization: {
      chartType: 'Target Capability Matrix & Progress Map',
      note: 'Biểu đồ trực quan hóa chân dung năng lực mục tiêu tương lai, không thể hiện điểm số đánh giá tâm lý hay chỉ số IQ.',
      dimensions: [
        {
          group: 'Kiến thức chuyên môn (Target Knowledge)',
          items: (riasec.targetCapabilities.knowledge || []).map((k, i) => ({
            id: k.id,
            name: k.name,
            targetLevel: i < 2 ? 'L2 — Thực hành có hướng dẫn' : 'L3 — Tự triển khai sản phẩm',
            milestoneStage: `P${i + 1}`,
            status: 'FUTURE_TARGET'
          }))
        },
        {
          group: 'Kỹ năng chuyên môn (Target Skills)',
          items: (riasec.targetCapabilities.skills || []).map((s, i) => ({
            id: s.id,
            name: s.name,
            targetLevel: i < 2 ? 'L2 — Thực hành có hướng dẫn' : 'L3 — Tự triển khai sản phẩm',
            milestoneStage: `P${i + 1}`,
            status: 'FUTURE_TARGET'
          }))
        },
        {
          group: 'Năng lực giải quyết vấn đề & Sáng tạo (Competencies)',
          items: (riasec.targetCapabilities.competencies || []).map(c => ({
            id: c.id,
            name: c.name,
            targetLevel: 'L4 — Vận dụng, cải tiến & giải thích',
            milestoneStage: 'P4',
            status: 'FUTURE_TARGET'
          }))
        }
      ]
    },

    featuredProjects: projects.map(p => ({
      id: p.id,
      projectNumber: p.projectNumber,
      name: p.name,
      isFeaturedDreamProject: Boolean(p.isDreamProject),
      heroBadge: p.isDreamProject ? 'Featured Dream Project (Dự án tâm điểm)' : 'Dự án thành phần',
      imageAssetId: `asset-prototype-${p.id.toLowerCase()}`,
      fileName: `prototype-${p.id.toLowerCase()}.png`,
      goal: p.goal,
      roleDescription: p.roleDescription,
      highlightFeatures: (p.features || []).map(f => ({
        id: f.id,
        name: f.name,
        scope: f.scope,
        description: f.description
      })),
      targetTools: (riasec.techStack[0]?.items || []).map(it => typeof it === 'string' ? it : it.name).slice(0, 3),
      deliverable: p.deliverable,
      completionCheck: p.completionCheck,
      status: 'FUTURE_TARGET',
      evidenceStatus: 'Chờ sản phẩm thực tế khi thực hiện lộ trình'
    })),

    quickSnapshot: {
      specialization: is2DTo3DPathway ? 'Thiết kế 2D ➔ Mở rộng 3D' : (branch?.label || branchKey),
      dreamProjectTitle: dreamName,
      dreamProjectStage: 'P4 (Sản phẩm tâm điểm)',
      primaryTool: (riasec.techStack[0]?.items || []).map(it => typeof it === 'string' ? it : it.name)[0] || 'Blender / Công cụ đồ họa',
      targetProficiencyBadge: 'Mục tiêu L3 (Tự triển khai)',
      roadmapLength: '4 Chặng thực hành hoàn thiện'
    },

    featuredDreamProject: {
      name: dreamName,
      productFormat: answers.productFormat?.trim() || (
        dreamPurpose.toLowerCase().includes('thiệp') ? 'Thiệp điện tử 3D tương tác' :
        answers.domain === 'multimedia' ? 'Tác phẩm đồ họa 3D' :
        answers.domain === 'robotics' ? 'Mô hình robot thông minh' : 'Ứng dụng trò chơi tương tác'
      ),
      purpose: dreamPurpose,
      audience: dreamAudience,
      imageAssetId: 'asset-prototype-p4',
      fileName: 'prototype-p4.png',
      mvpFeatures: [
        {
          id: 'F-P4-01',
          name: p4Features[0]?.name || 'Có hình minh họa chính',
          scope: 'MVP',
          description: p4Features[0]?.description
        },
        {
          id: 'F-P4-02',
          name: p4Features[1]?.name || 'Phối màu sắc theo chủ đề ấm áp & Dòng chữ ngắn dễ đọc gửi lời yêu thương',
          scope: 'MVP',
          description: p4Features[1]?.description
        }
      ],
      extensionFeatures: [
        {
          id: 'F-P4-03',
          name: p4Features[2]?.name || 'Tùy biến lời chúc cá nhân hóa & Hiệu ứng chuyển động 3D mở rộng',
          scope: 'Extension (v2.0)',
          description: p4Features[2]?.description
        }
      ],
      completionCriteria: [
        'Dòng chữ ngắn gọn, chân thành, dễ đọc ngay cả trên màn hình nhỏ.',
        'Người nhận mở xem thiệp và tiếp nhận trọn vẹn thông điệp yêu thương.',
        'Mô hình và hình minh họa chính hiển thị sắc nét, tỷ lệ cân đối.'
      ]
    },

    testimonials: {
      hasVerifiedFeedback: false,
      displayMode: 'awaiting_feedback',
      notice: 'Phản hồi từ người trải nghiệm sẽ được cập nhật khi con giới thiệu sản phẩm.',
      targetAudience: dreamAudience,
      expectedFeedbackQuestions: [
        `Sản phẩm "${dreamName}" đã mang lại cảm xúc gì cho ${dreamAudience}?`,
        'Hình ảnh minh họa, màu sắc và lời chúc trong thiệp có dễ nhìn và ấn tượng không?',
        'Người nhận mong muốn con bổ sung thêm chi tiết hoặc tính năng tương tác nào trong tương lai?'
      ],
      reviews: [] // Mặc định danh sách rỗng để bảo toàn tính trung thực tuyệt đối
    },

    futureImpact: {
      targetAudience: dreamAudience,
      problemStatement: dreamPurpose,
      expectedValue: `Tạo ra sản phẩm "${dreamName}" mang giá trị thực tiễn và cảm xúc ý nghĩa cho ${dreamAudience}.`,
      socialContribution: answers.domain === 'multimedia'
        ? 'Lan tỏa tình cảm gia đình, rèn luyện tư duy thẩm mỹ và kết nối mọi người qua trải nghiệm 3D.'
        : answers.domain === 'robotics'
        ? 'Tự động hóa hỗ trợ con người trong sinh hoạt hàng ngày, giảm thiểu thao tác thủ công.'
        : 'Tạo sân chơi giải trí lành mạnh, giáo dục tư duy logic và công nghệ cho cộng đồng học sinh.',
      nextStepCTA: 'Khám phá lộ trình để trở thành phiên bản tương lai của con',
      targetTab: 'ROADMAP'
    }
  };

  // Whitelist payload strictly for Google AI Studio React + TypeScript + Tailwind SPA generator
  const safePayload = {
    displayName: answers.name?.trim() || 'Nhà Sáng Tạo',
    gender: answers.gender === 'female' ? 'Nữ' : answers.gender === 'other' ? 'Khác' : 'Nam',
    grade: gradeNum,
    educationLevel: level,
    technologyDomain: branch?.domain || answers.domain || (isPrimary ? 'game_programming' : 'programming'),
    specialization: branchKey,
    specializationLabel: branch?.label || branchKey,

    // CẤU TRÚC ĐỊNH HƯỚNG NĂNG LỰC TƯƠNG LAI (FUTURE CAPABILITY PORTFOLIO - 9 NHÓM CANONICAL)
    futureCapabilityPortfolio: {
      portfolioType: 'Future Capability Portfolio (Hồ Sơ Năng Lực Tương Lai Mục Tiêu)',
      conceptNotice: 'Đây là chân dung năng lực và bộ dự án mục tiêu con cùng gia đình mong muốn đạt được, không phải bản đánh giá năng lực hiện tại.',
      curriculumOrientation: {
        techSector: riasec.techSector, // 1 trong 3 nhóm: 'Robot - AI - IoT' | 'Lập trình & AI' | 'Multimedia'
        techSectorDescription: riasec.techSectorDescription,
        curriculumReferenceNotice: 'Hệ thống định hướng nội dung học tập theo lĩnh vực công nghệ con đã lựa chọn. Các khía cạnh sư phạm chỉ đóng vai trò tham khảo thiết kế hoạt động trải nghiệm nội bộ, không phân loại mã Holland cá nhân hay đánh giá tính cách học sinh khi chưa có công cụ đo lường chuyên biệt.',
        targetSpecialization: branch?.label || branchKey,
        specializationPathway: is2DTo3DPathway
          ? 'Chuyên môn nền tảng: Thiết kế đồ họa 2D (tạo hình, bố cục và màu sắc). Hướng mở rộng cho Dream Project: Dựng hình khối và tương tác 3D. Kỹ năng 2D là bước chuẩn bị then chốt để làm chủ không gian 3D.'
          : `Định hướng chuyên môn: ${branch?.label || branchKey}.`
      },
      targetCapabilities: riasec.targetCapabilities,
      familyAlignment: {
        studentAspiration: riasec.familyAlignment.studentAspiration,
        parentObservation: riasec.familyAlignment.parentObservation,
        agreedPoints: riasec.familyAlignment.agreedPoints,
        differingPoints: riasec.familyAlignment.differingPoints,
        confirmedDecision: riasec.familyAlignment.confirmedDecision,
        confirmedDecisionLabel: riasec.familyAlignment.confirmedDecisionLabel,
        consensusSummary: riasec.familyAlignment.consensusSummary,
      },
      targetTechStack: riasec.techStack,
      targetSoftSkills4Cs: riasec.softSkills,
      academicStandardsReferences: riasec.standards,
      portfolioProjects: projects.map(p => ({
        id: p.id,
        projectNumber: p.projectNumber,
        name: p.name,
        roleDescription: p.roleDescription,
        goal: p.goal,
        tasks: p.tasks,
        features: p.features || [],
        deliverable: p.deliverable,
        completionCheck: p.completionCheck,
        isDreamProject: p.isDreamProject
      }))
    },

    futureProfile: {
      role: futureRoleTitle,
      roleSubtitle: roleSubtitle,
      techSector: riasec.techSector,
      motto: motto,
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
      aboutMe: answers.domain === 'multimedia'
        ? (isPrimary
            ? `Con yêu thích sáng tạo nghệ thuật, vẽ tranh và thiết kế những hình ảnh sinh động. Con muốn dùng công nghệ đồ họa và câu chuyện tương tác để tạo nên "${dreamName}", gửi gắm tình cảm yêu thương đến ${dreamAudience}.`
            : `Con đam mê thiết kế đồ họa và trải nghiệm số. Con muốn làm chủ các công cụ sáng tạo để hiện thực hóa dự án "${dreamName}", mang lại giá trị cảm xúc và kết nối cho ${dreamAudience}.`)
        : answers.domain === 'game_programming'
        ? (isPrimary
            ? `Con say mê thế giới trò chơi tương tác và muốn tự tay lập trình nên những sản phẩm thú vị. Con mong muốn tạo ra "${dreamName}" mang lại niềm vui lành mạnh cho ${dreamAudience}.`
            : `Con say mê lập trình và phát triển phần mềm tương tác. Con định hướng dùng công nghệ để giải quyết các bài toán thực tiễn và phát triển dự án "${dreamName}".`)
        : (isPrimary
            ? `Con thích tìm hiểu cách các thiết bị hoạt động, say mê lắp ráp và sáng tạo công nghệ có ích. Con muốn chế tạo "${dreamName}" để hỗ trợ ${dreamAudience} trong đời sống.`
            : `Con định hướng nghiên cứu và phát triển trong lĩnh vực robotics, IoT và tự động hóa, ứng dụng công nghệ để giải quyết các thách thức thực tế thông qua dự án "${dreamName}".`),
    },
    dreamProject: {
      name: dreamName,
      productFormat: answers.productFormat?.trim() || (
        dreamPurpose.toLowerCase().includes('thiệp') ? 'Thiệp điện tử 3D tương tác' :
        answers.domain === 'multimedia' ? 'Tác phẩm đồ họa 3D' :
        answers.domain === 'robotics' ? 'Mô hình robot thông minh' : 'Ứng dụng trò chơi tương tác'
      ),
      audience: dreamAudience,
      purpose: dreamPurpose,
      allFeatures: dreamFeatures,
      mvpFeatures: [
        'Có hình minh họa chính (Tạo hình & bố cục cốt lõi)',
        'Phối màu sắc theo chủ đề ấm áp & Dòng chữ ngắn dễ đọc gửi lời yêu thương'
      ],
      extensionFeatures: [
        'Tùy biến lời chúc cá nhân hóa & Hiệu ứng chuyển động 3D mở rộng (Kế hoạch nâng cấp v2.0)'
      ],
      appearance: answers.dreamAppearance || 'Giao diện sinh động, dễ nhìn'
    },
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
    parentObservations: {
      // RIASEC-mapped activities observed at home (Block A - Touchpoint 1)
      interestActivities: (() => {
        const acts = answers.parentInterestActivities ?? [];
        if (acts.length === 0) return { summary: 'Chưa thu thập', rGroup: [], iGroup: [], aGroup: [] };
        const actLabels: Record<string, string> = {
          r_lego: 'Say sưa lắp ghép Lego / mô hình cơ khí',
          r_disassemble: 'Tự mày mò tháo đồ chơi điện tử',
          r_fix: 'Thích sửa chữa / chế tạo từ vật liệu có sẵn',
          i_game: 'Tò mò ứng dụng / game, muốn biết cách tạo ra',
          i_rules: 'Tự nghĩ luật chơi mới / giải đố logic',
          i_diagram: 'Thích ghi chép, vẽ sơ đồ, sắp xếp trình tự',
          a_draw: 'Thích vẽ tranh, phối màu, tạo hình nhân vật',
          a_video: 'Thích chụp ảnh, quay video, làm mô hình thủ công',
          a_decor: 'Hay tự trang trí không gian, nhận xét hình ảnh/màu sắc'
        };
        return {
          summary: `${acts.length} hoạt động được ghi nhận`,
          rGroup: acts.filter(a => a.startsWith('r_')).map(a => actLabels[a] || a),
          iGroup: acts.filter(a => a.startsWith('i_')).map(a => actLabels[a] || a),
          aGroup: acts.filter(a => a.startsWith('a_')).map(a => actLabels[a] || a)
        };
      })(),
      // Curiosity & Grit traits observed by parent (Block B - Touchpoint 1)
      curiosityAndGrit: (() => {
        const traits = answers.parentCuriosityTraits ?? [];
        if (traits.length === 0 || traits.includes('not_observed')) return { summary: 'Chưa có dịp quan sát kỹ', traits: [] };
        const traitLabels: Record<string, string> = {
          curiosity_ask: 'Hay đặt câu hỏi "Vì sao?" và tìm hiểu nguyên lý',
          curiosity_explore: 'Tự mày mò bấm thử tính năng mới, không sợ sai',
          focus_deep: 'Có thể ngồi say sưa rất lâu khi làm việc mình thích',
          grit_retry: 'Kiên trì thử lại cách khác khi chưa được',
          careful_detail: 'Cẩn thận, tỉ mỉ từng chi tiết khi tạo sản phẩm'
        };
        return {
          summary: `${traits.length} phẩm chất được ghi nhận`,
          traits: traits.map(t => traitLabels[t] || t)
        };
      })(),
      // Parent's real-life story about the child (Block C - Touchpoint 1)
      realLifeStory: answers.parentInterestStory?.trim() || null,
      // Parent's quick assessment of Dream Project fit (Micro-check at Step 8)
      dreamProjectFit: answers.parentDreamProjectFit
        ? {
            assessment: answers.parentDreamProjectFit,
            label: answers.parentDreamProjectFit === 'very_fit'
              ? 'Rất phù hợp với sở thích và thế mạnh của con'
              : answers.parentDreamProjectFit === 'adjustable'
              ? 'Phù hợp, có thể điều chỉnh quy mô hoặc độ khó'
              : 'Muốn bàn thêm — cần thảo luận gia đình'
          }
        : null
    },
    characterAvatar: {
      source: answers.avatarSource || 'system',
      gender: answers.gender === 'female' ? 'Nữ' : answers.gender === 'other' ? 'Khác' : 'Nam',
      note: answers.avatarSource === 'custom'
        ? 'Sử dụng ảnh nhân vật do học sinh tự tạo/vẽ làm hình đại diện chính. Giữ nguyên thiết kế nhân vật.'
        : `Sử dụng hình tượng nhân vật đại diện (${answers.gender === 'female' ? 'Nữ' : answers.gender === 'other' ? 'Khác' : 'Nam'}) cùng linh vật Kitten Bot thân thiện làm bạn đồng hành.`
    },
    privacyConsent: {
      reviewedByParent: true,
      omitDirectIdentifiers: true,
      parentApprovesExport: Boolean(answers.parentApprovesExternalTransfer)
    },

    // ── LỚP TRÌNH BÀY & TÀI NGUYÊN HÌNH ẢNH MỚI CHO V4 WEBSITE ──
    presentationLayer,
    imageManifest
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

  const masterPromptInstructions = `FUTURE ME — PROFESSIONAL FUTURE CAPABILITY PORTFOLIO WEBSITE

# FUTURE ME — PROFESSIONAL FUTURE CAPABILITY PORTFOLIO WEBSITE

## 0. MỆNH LỆNH TRIỂN KHAI & NGUYÊN TẮC BẢO TOÀN THỊ GIÁC (VISUAL GROUNDING)
Hãy tạo ngay một website hoàn chỉnh, chạy được ngay trong trình duyệt.
Website phải có cảm giác như một Creative Professional Portfolio cá nhân được thiết kế riêng cho học sinh, giàu tính cảm xúc và nghệ thuật trình diễn.

### ĐIỀU KIỆN TIÊN QUYẾT VỀ HÌNH ẢNH (MANDATORY IMAGE USAGE):
1. TUYỆT ĐỐI KHÔNG thay thế ảnh chân dung của học sinh bằng icon hoặc placeholder avatar nếu dữ liệu ảnh tồn tại trong imageManifest!
   - Sử dụng thẻ <img src={asset.dataUrl || asset.url} alt={asset.alt} /> trực tiếp.
   - Thẻ Hero BẮT BUỘC hiển thị ảnh của học sinh (assetId: "asset-hero-custom" hoặc dataUrl/url trong imageManifest).
2. TUYỆT ĐỐI KHÔNG thay thế ảnh prototype của các dự án P1–P4 bằng khối CSS Gradient trống rỗng hay icon đơn điệu!
   - BẮT BUỘC render thẻ <img /> với đường dẫn fileName / url tương ứng (prototype-p1.png đến prototype-p4.png).
   - Nếu tệp ảnh không tải được trong môi trường sandbox của Google AI Studio (khi chưa có tệp tĩnh), BẮT BUỘC render khung tranh minh họa sản phẩm có chiều sâu mỹ thuật (Artwork Frame mô phỏng bìa thiệp 3D, mô hình robot thông minh hoặc khung cảnh game tương tác với hình vẽ vector SVG tinh tế), KHÔNG để hộp màu xám hoặc gradient trống!

### TÁCH BIỆT GIAO DIỆN PORTFOLIO CÔNG KHAI VỚI CÔNG CỤ DỮ LIỆU/TIẾN ĐỘ:
- Thanh điều hướng Header giữ sự thanh lịch, sang trọng: Logo, Tên học sinh, Vai trò tương lai, và 2 Tab chính [Hồ sơ tương lai | Lộ trình phát triển].
- Các nút kỹ thuật mang tính quản trị như "0/18 nhiệm vụ", "Xuất JSON", "Nhập JSON", "Reset tiến độ" TUYỆT ĐỐI KHÔNG để lộ ra trên màn hình chính!
- Thay vào đó, gom toàn bộ vào một nút biểu tượng Cài đặt / Quản lý nhỏ tinh tế ở góc phải trên (hoặc footer): "Quản lý dữ liệu & Lưu tiến độ" ➔ Chỉ khi người dùng bấm vào mới mở Modal quản lý tiến độ.

---

# 1. PRODUCT VISION & KIẾN TRÚC 2 TAB DUY NHẤT (EXACTLY TWO MAIN TABS)
Tên website: FUTURE ME — PERSONAL FUTURE PORTFOLIO.
Website chỉ có đúng hai tab điều hướng cấp cao nhất (EXACTLY TWO MAIN TABS):
* TAB 1: HỒ SƠ TƯƠNG LAI (English label: My Future Profile)
* TAB 2: LỘ TRÌNH PHÁT TRIỂN (English label: My Development Roadmap)

Không tạo thêm tab chính như Dashboard, Assessment, Home, About, Projects hoặc Progress.

---

# 2. TAB 1 — PROFESSIONAL FUTURE PROFILE (6 CORE EDITORIAL ZONES)
Trình bày hồ sơ sáng tạo chuyên nghiệp, phân bổ khoa học thành 6 KHU VỰC THỊ GIÁC CHÍNH (6 Core Editorial Zones):

## ZONE 01 · PROFESSIONAL HERO & QUICK SNAPSHOT
* Bố cục: Hero banner lớn tỷ lệ 16:9 hoặc split layout ấn tượng (trái: chân dung khổ lớn nổi bật, phải: thông tin nghề nghiệp tương lai).
* Ảnh đại diện Future Me của con (lấy từ imageManifest với fileName "hero.png" hoặc assetId "asset-hero-custom" / dataUrl).
* Tên hiển thị ("${answers.name || 'Nhà Sáng Tạo'}").
* Vai trò sáng tạo tương lai ("${futureRoleTitle}").
* Lĩnh vực & Chuyên môn ("${riasec.techSector} — ${branch?.label || branchKey}").
${is2DTo3DPathway ? `* Chuyên môn & Lộ trình mở rộng: "${presentationLayer.futureProfessionalRole.specializationPathway}"` : ''}
* Tuyên ngôn tương lai ("${motto}").
* Nhãn trang nhã: "Chân dung tương lai do con và gia đình định hướng".
* Giới thiệu bản thân ngắn gọn (từ presentationLayer.professionalSummary), tôn vinh khát vọng sáng tạo của con.
* QUICK SNAPSHOT BAR (Tổng quan 1 phút cho phụ huynh): Dải 4 thẻ tóm tắt nhanh:
  1. [Chuyên môn]: ${presentationLayer.quickSnapshot.specialization}
  2. [Dự án tâm điểm]: ${presentationLayer.quickSnapshot.dreamProjectTitle} (${presentationLayer.quickSnapshot.dreamProjectStage})
  3. [Công cụ chính]: ${presentationLayer.quickSnapshot.primaryTool} (${presentationLayer.quickSnapshot.targetProficiencyBadge})
  4. [Lộ trình hoàn thiện]: ${presentationLayer.quickSnapshot.roadmapLength}
* MINI NAVIGATION BAR (Dễ dàng lướt nhanh): [Tổng quan | Dự án ước mơ | Biểu đồ năng lực | Bộ công cụ | 4 Chặng dự án | Tác động xã hội].

## ZONE 02 · FEATURED DREAM PROJECT SHOWCASE (TÂM ĐIỂM SẢN PHẨM ƯỚC MƠ P4)
* Thiết kế dạng Showcase Card lớn và nổi bật nhất Portfolio, đặt ngay dưới Hero.
* Hiển thị ảnh prototype P4 lớn (từ imageManifest: fileName "prototype-p4.png" hoặc assetId "asset-prototype-p4").
* Tiêu đề: Tên Dream Project giữ nguyên chính xác ("${dreamName}").
* Thông điệp & Mục đích: "${dreamPurpose}" dành cho "${dreamAudience}".
* PHÂN ĐỊNH RÕ RÀNG MVP VÀ EXTENSION:
  - MVP (Chức năng cốt lõi):
    * [F-P4-01]: Có hình minh họa chính (Tạo hình 3D và bố cục cốt lõi)
    * [F-P4-02]: Phối màu sắc theo chủ đề ấm áp & Dòng chữ ngắn dễ đọc gửi lời yêu thương (Trọn vẹn trong MVP!)
  - Extension (Phiên bản nâng cấp v2.0):
    * [F-P4-03]: Tùy biến lời chúc cá nhân hóa & Hiệu ứng chuyển động 3D mở rộng
* Tiêu chuẩn hoàn thành: Dòng chữ ngắn gọn, dễ đọc; người nhận tiếp nhận trọn vẹn thông điệp yêu thương; mô hình hiển thị sắc nét.
* Nút "Xem chi tiết dự án" (mở Modal) và nút "Khám phá lộ trình thực hiện P4" (chuyển sang Tab 2 mở đúng chặng P4).

## ZONE 03 · TARGET CAPABILITY MAP (BIỂU ĐỒ NĂNG LỰC MỤC TIÊU)
* Biểu đồ năng lực trực quan dạng Horizontal Capability Bars phân theo 3 nhóm:
  1. Kiến thức con sẽ học (Target Knowledge K-xx)
  2. Kỹ năng con sẽ rèn (Target Skills S-xx)
  3. Năng lực sáng tạo & giải quyết vấn đề (Competencies C-xx)
* Trục mức độ thể hiện 4 MỨC MỤC TIÊU HƯỚNG TỚI:
  - L1: Làm quen (Hiểu giao diện & thao tác cơ bản)
  - L2: Thực hành có hướng dẫn (Làm theo quy trình mẫu)
  - L3: Tự triển khai sản phẩm (Tự chủ thiết kế & lập trình chức năng)
  - L4: Vận dụng & cải tiến (Tối ưu hóa, mở rộng chức năng & giải thích giải pháp)
* NGUYÊN TẮC BẮT BUỘC: Thanh thể hiện mức mục tiêu cần rèn luyện qua các chặng P1–P4, TUYỆT ĐỐI KHÔNG BIỂU DIỄN PHẦN TRĂM ĐÃ ĐẠT (như 80%, 95%) hay điểm số tâm lý/IQ.
* TƯƠNG TÁC HAI CHIỀU: Nhấn vào bất kỳ thanh năng lực nào sẽ tự động chuyển sang Tab 2, chọn đúng chặng dự án và mở đúng chức năng rèn luyện năng lực đó.

## ZONE 04 · PROFESSIONAL TECH STACK & TOOL PROFICIENCY
* Bố cục dạng thẻ công cụ hiện đại (Tech Stack Grid): Logo/Icon, Tên công cụ, Mục đích sử dụng, Mức thuần thục mục tiêu (L1–L4 kèm tiêu chí cụ thể), Dự án áp dụng.
* Phân 3 nhóm công cụ thân thiện:
  - Công cụ chính (Core Tools): ví dụ Blender, TinkerCAD, Scratch, Micro:bit...
  - Công cụ bổ trợ (Supporting Tools): Thiết kế vector, tối ưu hình ảnh.
  - Công cụ mở rộng (Extension Tools): Thư viện nâng cao cho tương lai.

## ZONE 05 · FUTURE PROJECT EXPERIENCE (TIMELINE & GALLERY 4 CHẶNG P1 ➔ P4)
* Trình bày dạng Gallery 4 dự án theo dòng thời gian (P1 ➔ P2 ➔ P3 ➔ P4).
* Mỗi project card có:
  - Ảnh prototype riêng biệt (P1: prototype-p1.png, P2: prototype-p2.png, P3: prototype-p3.png, P4: prototype-p4.png).
  - Vai trò học sinh đảm nhiệm trong chặng.
  - Mục tiêu kiến thức & kỹ năng áp dụng (đảm bảo P4 tổng hợp đầy đủ K/S của Dream Project, không để rỗng).
  - Sản phẩm đầu ra kỳ vọng.
  - Nhãn trạng thái: "Future Project Experience" (Dự án con sẽ thực hiện - Mục tiêu tương lai).
  - Nút "Xem lộ trình chặng này" (chuyển sang Tab 2 chọn đúng dự án).

## ZONE 06 · VISION, SOCIAL IMPACT & FEEDBACK
* Trình bày giá trị hướng tới: Đối tượng sử dụng ("${dreamAudience}"), Vấn đề giải quyết ("${dreamPurpose}"), Đóng góp mong muốn cho gia đình và cộng đồng (${presentationLayer.futureImpact.socialContribution}).
* Khu vực lắng nghe ý kiến (Testimonials):
  - Mặc định danh sách đánh giá rỗng (bảo toàn tính trung thực tuyệt đối, không tự tạo review giả hay 5 sao ảo).
  - Hiển thị thông báo trang trọng: "Chờ đón phản hồi từ người trải nghiệm khi con giới thiệu sản phẩm hoàn chỉnh."
  - Trình bày 3 câu hỏi khảo sát dự kiến dùng để thu thập ý kiến đóng góp từ người thân:
    1. Sản phẩm "${dreamName}" đã mang lại cảm xúc gì cho ${dreamAudience}?
    2. Hình ảnh minh họa, màu sắc và lời chúc trong thiệp có dễ nhìn và ấn tượng không?
    3. Người nhận mong muốn con bổ sung thêm chi tiết hoặc tính năng tương tác nào trong tương lai?
* CTA NỔI BẬT: Nút bấm lớn "Khám phá lộ trình để trở thành phiên bản tương lai của con" ➔ Nhấn vào chuyển sang Tab 2.

---

# 3. TAB 2 — DEVELOPMENT ROADMAP (HÀNH TRÌNH THỰC HÀNH 3 CẤP ĐỘ)
Giải thích chính xác con cần làm gì và học như thế nào để đạt được Portfolio ở Tab 1.

## DANH PHÁP THÂN THIỆN CHO HỌC SINH & PHỤ HUYNH
* Thay "L1 — Overall Roadmap" thành: "Hành trình 4 chặng của con" (LEVEL 1 — OVERALL ROADMAP)
* Thay "L2 — Project Roadmap" thành: "Con sẽ làm gì trong dự án này?" (LEVEL 2 — PROJECT ROADMAP)
* Thay "L3 — Function Roadmap" thành: "Cùng hoàn thành tính năng & Hướng dẫn thực hiện" (LEVEL 3 — FUNCTION ROADMAP)
* Thay "Evidence Artifacts" thành: "Sản phẩm & Minh chứng thực tế"
* Thay "Prerequisites" thành: "Con cần chuẩn bị gì trước?"

## 3 CẤP ĐỘ LỘ TRÌNH (3 ROADMAP LEVELS)
* LEVEL 1 — OVERALL ROADMAP: Bản đồ 4 chặng P1 ➔ P2 ➔ P3 ➔ P4 (P4 giữ nguyên chính xác tên Dream Project "${dreamName}").
* LEVEL 2 — PROJECT ROADMAP: Mục tiêu dự án, danh sách tính năng (F-Px-01, F-Px-02, F-Px-03), công cụ cần dùng, tiêu chí nghiệm thu.
* LEVEL 3 — FUNCTION ROADMAP: Đi sâu vào từng tính năng: Tại sao cần chức năng, K/S/C rèn luyện, các bước nhiệm vụ tuần tự có checkbox lưu vào localStorage (key 'future_me_tasks_v1'), sản phẩm nhỏ cần nộp và tiêu chí kiểm tra.

## BỐ CỤC GIAO DIỆN TAB 2
* Phía trên: Thanh Mini-profile tóm tắt Chân dung tương lai & Dream Project ("${dreamName}").
* Desktop: Bố cục 2 cột chuyên nghiệp:
  - Cột trái (30%): Project Navigator (Danh sách 4 chặng P1 ➔ P4 với tiến độ, vai trò và trạng thái).
  - Cột phải (70%): Project Detail & Function-Level Roadmap (Xem chi tiết từng chức năng, chuỗi nhiệm vụ tuần tự kèm checkbox cập nhật tiến độ, tiêu chí hoàn thành và minh chứng).
* Mobile: Bố cục 1 cột tinh gọn, chạm vào chức năng sẽ mở Drawer toàn màn hình.

## CẤU TRÚC 4 TẦNG TRẢI NGHIỆM CHO MỖI CHỨC NĂNG (ACTION-ORIENTED)
Khi học sinh hoặc phụ huynh mở một chức năng, giao diện ưu tiên hành động và hướng dẫn thực hành theo 4 tầng:
1. HIỂN THỊ NGAY:
   - Tên chức năng + Khung hình minh họa sản phẩm
   - "Con sẽ tạo ra điều gì?": Mô tả kết quả đầu ra cụ thể, trực quan.
2. PHẦN CHÍNH (HƯỚNG DẪN 5 BƯỚC THỰC HÀNH & NHIỆM VỤ):
   - Trình tự 5 bước thực hành rõ ràng:
     * Bước 1 · Học kiến thức: Hiểu khái niệm cốt lõi (learningGuide.step1Learn).
     * Bước 2 · Luyện thao tác: Thực hành bài tập nhỏ trên phần mềm/thiết bị (learningGuide.step2Practice).
     * Bước 3 · Áp dụng vào sản phẩm: Triển khai trực tiếp trên dự án "${dreamName}" (learningGuide.step3Apply).
     * Bước 4 · Kiểm tra kết quả: Đối chiếu tiêu chí quan sát được (learningGuide.step4Verify).
     * Bước 5 · Lưu minh chứng: Lưu tệp nguồn và video/ảnh kết quả (learningGuide.step5Evidence).
   - Danh sách các nhiệm vụ tuần tự kèm Checkbox cập nhật tiến độ (lưu vào localStorage với key 'future_me_tasks_v1').
3. MỞ KHI CẦN (ACCORDION "CON CẦN CHUẨN BỊ GÌ?"):
   - Kiến thức con sẽ học (K-xx).
   - Kỹ năng con sẽ rèn (S-xx).
   - Công cụ cần chuẩn bị.
4. DÀNH CHO PHỤ HUYNH & THẦY CÔ (ACCORDION "TIÊU CHÍ ĐÁNH GIÁ & MINH CHỨNG"):
   - Tiêu chí nghiệm thu có thể quan sát được (Ví dụ: Chuyển động bắt đầu/kết thúc rõ ràng, không che khuất dòng chữ, màu sắc dễ đọc).
   - Sản phẩm & Minh chứng cần nộp.
   - Mã năng lực học thuật và trạng thái xác minh.

## BIDIRECTIONAL TRACEABILITY (LIÊN KẾT HAI CHIỀU HOÀN HẢO)
* Tab 1 ➔ Tab 2: Bấm vào bất kỳ Năng lực K/S/C, Công cụ hoặc Dự án nào ở Tab 1 sẽ chuyển sang Tab 2, tự động chọn chặng và mở đúng chức năng liên quan.
* Tab 2 ➔ Tab 1: Trong mỗi chức năng ở Tab 2, có nút "Xem năng lực bồi dưỡng ở Hồ sơ tương lai" để quay lại đúng vị trí ở Tab 1.

---

# 4. VISUAL DESIGN & RESPONSIVE LAYOUT
- Màu chủ đạo: Mint-teal (#1a8a7d, #0d9488, #14b8a6) kết hợp nền sạch sẽ, thoáng mát.
- Bo góc mềm (rounded-3xl cho tiểu học, rounded-2xl cho THCS), shadow nhẹ, typography sắc nét 'Plus Jakarta Sans'.
- Responsive: Desktop 2 cột khoa học, Mobile 1 cột tinh gọn thân thiện cảm ứng.

---

# 5. TECHNICAL REQUIREMENTS
Stack: React + TypeScript + Tailwind CSS + Lucide React.
* Website chạy được ngay.
* Hai tab chuyển đổi thật (state activeTab: 'profile' | 'roadmap').
* Dữ liệu lấy từ JSON an toàn được cấp, không hardcode.
* Các card mở chi tiết thật bằng Modal hoặc Drawer.
* Nút chuyển từ Profile sang Roadmap hoạt động chuẩn xác theo ID.
* Checkbox nhiệm vụ lưu trạng thái với versioned localStorage key 'future_me_tasks_v1'.
* Hộp thoại Modal "Quản lý dữ liệu & Lưu tiến độ" hỗ trợ Xuất JSON và Nhập JSON tiến độ.
* Responsive hoàn hảo và hỗ trợ keyboard accessibility.

---

# 6. DATA INTEGRITY RULES
Nguồn sự thật duy nhất là APPROVED_FUTURE_ME_DATA.
Bảo toàn:
* Tên hiển thị ("${answers.name || 'Nhà Sáng Tạo'}").
* Cấp học, Lĩnh vực, Chuyên môn.
* Tên Dream Project ("${dreamName}").
* Mục đích, Đối tượng sử dụng, Chức năng.
* Các mục tiêu K/S/C (K-01..K-04, S-01..S-04, C-01..C-03).
* Bốn dự án P1–P4 và quan hệ Project → Feature → Task.
Không tự đổi tên dự án.
Không tự thêm chứng chỉ, công ty, giải thưởng, nhận xét giả hay đánh giá 5 sao.
Phân biệt 3 trạng thái:
- FUTURE_TARGET: Mục tiêu con muốn đạt (mặc định cho toàn bộ portfolio).
- IN_PROGRESS: Đang thực hiện.
- VERIFIED: Đã có sản phẩm/minh chứng và được xác nhận thực tế.

---

# 7. DELIVERABLES
Tạo ứng dụng hoàn chỉnh với:
* Đúng hai tab hoạt động: TAB 1 (Hồ sơ năng lực tương lai - 6 Core Zones, Quick Snapshot, Mini Nav) và TAB 2 (Hành trình thực hành - 2-Column Navigator, 3 Levels, 4 Tầng trải nghiệm & Hướng dẫn 5 bước).
* Visual Grounding: Hiển thị đúng ảnh chân dung học sinh và prototype P4/P1-P3, có khung mockup mỹ thuật khi thiếu asset tĩnh.
* Giao diện Portfolio công khai sang trọng, tách biệt công cụ dữ liệu JSON vào modal quản lý riêng.
* Bidirectional Capability Tracing hoạt động 2 chiều.
* Local task progress và JSON backup/import.
Generate the complete working application now.`;

  const assetSummaryText = imageManifest.assets.map(a =>
    `- [${a.assetId}] Tệp: "${a.fileName}" | Loại: ${a.type}${a.projectId ? ` (${a.projectId})` : ''} | Miêu tả: "${a.alt}" | Nguồn: ${a.source} | Ý nghĩa: ${a.representation} ${a.dataUrl ? '(Đã nhúng Data URL trong safePayload)' : `(URL: ${a.url})`}`
  ).join('\n');

  const fullPrompt = `${masterPromptInstructions}

---

# 8. INPUT DATA

## DỮ LIỆU HỒ SƠ DUYỆT ĐỂ DỰNG WEBSITE ({{APPROVED_FUTURE_ME_DATA_JSON}}):
${JSON.stringify(safePayload, null, 2)}

## DANH MỤC HÌNH ẢNH ĐƯỢC CẤP PHÉP ({{APPROVED_IMAGE_ASSETS}}):
Các tệp ảnh được đính kèm cùng dự án (dữ liệu chi tiết nằm trong trường safePayload.imageManifest):
${assetSummaryText}
`;

  return { safePayload, fullPrompt };
}


/**
 * Xây dựng câu lệnh tạo ảnh AI (Image Generation Prompt) chuẩn 16:9 cho Hero Banner Profile
 * Tuân thủ nguyên tắc: Reference-Optional, Generation-Mandatory.
 * Không bao giờ dừng lại đòi ảnh tham chiếu, tự động fallback theo độ tuổi, lĩnh vực, dự án mơ ước.
 */
export function buildSafeImageGenerationPrompt(answers: Partial<JourneyAnswers>): string {
  const isPrimary = answers.grade
    ? parseInt(answers.grade, 10) <= 5
    : (!answers.gradeBand || ['1-2', '3-5'].includes(answers.gradeBand));
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

  // Giới tính nhân vật (Nam, Nữ, Khác) phục vụ tạo ảnh
  const rawGender = answers.gender || 'male';
  const genderLabel = rawGender === 'female' ? 'Nữ (Female)' : rawGender === 'other' ? 'Khác / Trung tính (Gender-neutral)' : 'Nam (Male)';
  const genderArchetype = rawGender === 'female'
    ? (isPrimary ? 'young Vietnamese schoolgirl' : 'young Vietnamese female secondary student')
    : rawGender === 'other'
    ? (isPrimary ? 'young Vietnamese elementary student' : 'young Vietnamese secondary student')
    : (isPrimary ? 'young Vietnamese schoolboy' : 'young Vietnamese male secondary student');

  const characterPronoun = rawGender === 'female' ? 'girl' : rawGender === 'other' ? 'child' : 'boy';
  const characterOutfit = rawGender === 'female'
    ? 'neat school-age girl outfit in white, mint-teal, and soft accent colors (e.g. cheerful polo/shirt with skirt or comfortable trousers, neat hair)'
    : rawGender === 'male'
    ? 'neat school-age boy outfit in white, mint-teal, and soft accent colors (e.g. smart polo/shirt with shorts or trousers, friendly short hair)'
    : 'comfortable student outfit in white, mint-teal, and soft warm accent colors';

  const characterDesign = isPrimary
    ? `Create an original fictional Grade ${gradeNum} ${genderArchetype} named "${studentName}".
Gender: ${genderLabel}.
Do not claim resemblance to any real child.
The ${characterPronoun} should look cheerful, curious, proud, and excited about their creation.
Outfit: ${characterOutfit}.
Keep the character proportions chibi and age-appropriate.
Show the child interacting naturally with their creation (guiding, pointing, or interacting via a small tablet).`
    : `Create an original fictional Grade ${gradeNum} secondary school ${genderArchetype} named "${studentName}".
Gender: ${genderLabel}.
Do not claim resemblance to any real child.
The student (${genderLabel}) should look confident, creative, innovative, and focused on building technology.
Modern youth casual attire (${rawGender === 'female' ? 'e.g. stylish modern hoodie or jacket with tech details, neat hair' : rawGender === 'male' ? 'e.g. comfortable modern hoodie or jacket with tech details' : 'comfortable modern youth outfit'}).
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
- Character gender: ${genderLabel}
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
  targetCapabilities: {
    knowledge: CapabilityTarget[];
    skills: CapabilityTarget[];
    competencies: CapabilityTarget[];
  };
  familyAlignment: {
    studentAspiration: string;
    parentObservation: string;
    agreedPoints: string[];
    differingPoints: string[];
    confirmedDecision: "keep_direction" | "adjust_pacing" | "need_discussion";
    confirmedDecisionLabel: string;
    consensusSummary: string;
  };
  triangulation: {
    studentAspiration: string;
    parentObservation: string;
    agreedPoints: string[];
    differingPoints: string[];
    confirmedDecision: "keep_direction" | "adjust_pacing" | "need_discussion";
    confirmedDecisionLabel: string;
    consensusSummary: string;
    alignmentPercent?: number;
  };
  standards: {
    code: string;
    label: string;
    domainSummary: string;
  }[];
}

/**
 * Trích xuất dữ liệu Hướng nghiệp RIASEC & Đối chiếu Gia đình (Family Alignment)
 * từ các bước tương tác 01–04, 03, 14, 16.
 * Tuân thủ P0: Không tự tạo tỷ lệ % phù hợp nghề nghiệp hay % đồng thuận.
 * Ghi nhận quyết định hành động thực tế của gia đình.
 */
export function extractRIASECProfile(answers: JourneyAnswers): RIASECProfileData {
  const isPrimary = Boolean(!answers.gradeBand || ['1-2', '3-5'].includes(answers.gradeBand) || (answers.grade && parseInt(answers.grade, 10) <= 5));
  const domain = (answers.domain as "robotics" | "game_programming" | "multimedia") || 'robotics';

  // Xác định quyết định hành động thực tế từ bước Family Review (16-family-review)
  const rawChoice = answers.familyConflict || 'keep_direction';
  const confirmedDecision: "keep_direction" | "adjust_pacing" | "need_discussion" =
    rawChoice === 'adjust_pacing' || rawChoice === 'different'
      ? 'adjust_pacing'
      : rawChoice === 'need_discussion' || rawChoice === 'not_sure'
      ? 'need_discussion'
      : 'keep_direction';

  const confirmedDecisionLabel =
    confirmedDecision === 'keep_direction'
      ? 'Giữ hướng công nghệ và Dream Project con đã chọn'
      : confirmedDecision === 'adjust_pacing'
      ? 'Giữ ước mơ của con, điều chỉnh lộ trình hoặc điều kiện thực hiện'
      : 'Còn thông tin cần trao đổi trước khi xác nhận lộ trình';

  const targetCaps = getDomainCapabilityTargets(domain, isPrimary);

  if (domain === 'robotics') {
    const studentAspiration = answers.dreamPurpose || 'Chế tạo robot thông minh hỗ trợ cuộc sống và bảo vệ cộng đồng';
    const parentObservation = answers.parentMoment || 'Ở nhà con rất kiên nhẫn khi lắp ráp mô hình, luôn tò mò muốn biết các thiết bị điện tử hoạt động như thế nào.';
    const agreedPoints = [
      'Gia đình đồng thuận ủng hộ niềm đam mê chế tạo mô hình và khám phá thiết bị phần cứng của con',
      `Ủng hộ ý tưởng sản phẩm "${answers.projectName || 'Robot Thông Minh'}" giải quyết mục tiêu thiết thực`
    ];
    const differingPoints =
      confirmedDecision === 'keep_direction'
        ? ['Cả nhà cùng góc nhìn; sẽ kiểm chứng mức độ chủ động làm việc độc lập của con trong Dự án 1']
        : confirmedDecision === 'adjust_pacing'
        ? ['Ba mẹ muốn cân đối lịch học hợp lý và hỗ trợ thêm khi con gặp bài toán cơ khí khó']
        : ['Gia đình muốn trải nghiệm buổi học thực tế đầu tiên trước khi chốt lịch sinh hoạt công nghệ'];

    const consensusSummary =
      confirmedDecision === 'keep_direction'
        ? 'Gia đình đã thống nhất giữ nguyên hướng đi Robot - AI - IoT và hỗ trợ con bắt đầu từ Dự án 1.'
        : confirmedDecision === 'adjust_pacing'
        ? 'Gia đình ủng hộ ước mơ robot của con, ưu tiên điều chỉnh thời gian và chuẩn bị thiết bị linh hoạt.'
        : 'Gia đình lưu riêng hai góc nhìn để đối chiếu và trao đổi kỹ hơn qua buổi trải nghiệm đầu tiên.';

    const familyAlignmentObj = {
      studentAspiration,
      parentObservation,
      agreedPoints,
      differingPoints,
      confirmedDecision,
      confirmedDecisionLabel,
      consensusSummary
    };

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
      targetCapabilities: targetCaps,
      familyAlignment: familyAlignmentObj,
      triangulation: familyAlignmentObj,
      standards: [
        { code: 'CSTA-ALGO', label: 'CSTA K-12 (Tham chiếu mục tiêu)', domainSummary: 'Thuật toán điều khiển tuần tự & vòng lặp phản hồi cảm biến' },
        { code: 'ISTE-INNOVATIVE', label: 'ISTE Standards (Tham chiếu mục tiêu)', domainSummary: 'Thiết kế nguyên mẫu sáng tạo & cải tiến cơ khí liên tục' },
        { code: 'NLS-DIGITAL-MASTERY', label: 'Khung NLS (Tham chiếu mục tiêu)', domainSummary: 'Làm chủ thiết bị phần cứng số & giải pháp an toàn' }
      ]
    };
  }

  if (domain === 'game_programming') {
    const studentAspiration = answers.dreamPurpose || 'Phát triển phần mềm và thế giới game tương tác mang lại niềm vui và giá trị giáo dục';
    const parentObservation = answers.parentMoment || 'Ở nhà con rất tập trung khi làm việc với máy tính, có khả năng tự mò mẫm các luật chơi và giải quyết bài toán.';
    const agreedPoints = [
      'Gia đình đồng thuận ủng hộ sở thích tư duy logic và sáng tạo phần mềm tương tác của con',
      `Đồng hành cùng mục tiêu phát triển dự án "${answers.projectName || 'Game Sáng Tạo'}" có tính giáo dục`
    ];
    const differingPoints =
      confirmedDecision === 'keep_direction'
        ? ['Gia đình thống nhất hướng đi; kiểm chứng khả năng tự phân bổ thời gian trước màn hình qua Dự án 1']
        : confirmedDecision === 'adjust_pacing'
        ? ['Ba mẹ muốn đặt giới hạn thời gian máy tính mỗi tuần và theo dõi nhịp độ học tập']
        : ['Cần thảo luận thêm để thống nhất về thời gian biểu trước khi bước vào các dự án chính thức'];

    const consensusSummary =
      confirmedDecision === 'keep_direction'
        ? 'Gia đình đã thống nhất giữ nguyên định hướng Lập trình & AI và bắt đầu xây dựng dự án đầu tiên.'
        : confirmedDecision === 'adjust_pacing'
        ? 'Gia đình ủng hộ ước mơ làm game của con, chủ động sắp xếp thời gian biểu cân bằng với việc học.'
        : 'Gia đình lưu riêng hai góc nhìn để cùng con thống nhất kế hoạch cụ thể sau buổi trải nghiệm đầu tiên.';

    const familyAlignmentObj = {
      studentAspiration,
      parentObservation,
      agreedPoints,
      differingPoints,
      confirmedDecision,
      confirmedDecisionLabel,
      consensusSummary
    };

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
      targetCapabilities: targetCaps,
      familyAlignment: familyAlignmentObj,
      triangulation: familyAlignmentObj,
      standards: [
        { code: 'CSTA-ALGO', label: 'CSTA K-12 (Tham chiếu mục tiêu)', domainSummary: 'Cấu trúc rẽ nhánh, biến số & vòng lặp phức hợp' },
        { code: 'ISTE-INNOVATIVE', label: 'ISTE Standards (Tham chiếu mục tiêu)', domainSummary: 'Xây dựng giải pháp phần mềm số tương tác đa chiều' },
        { code: 'NLS-DIGITAL-MASTERY', label: 'Khung NLS (Tham chiếu mục tiêu)', domainSummary: 'Sáng tạo sản phẩm nội dung số có tính tương tác cao' }
      ]
    };
  }

  // domain === 'multimedia'
  const studentAspiration = answers.dreamPurpose || 'Tạo ra các tác phẩm đa phương tiện và mô hình 3D tôn vinh văn hóa, truyền cảm hứng nghệ thuật';
  const parentObservation = answers.parentMoment || 'Ở nhà con rất thích vẽ vời, phối màu và tự sáng tạo các câu chuyện bằng hình ảnh, luôn quan tâm đến vẻ đẹp của mọi vật.';
  const agreedPoints = [
    'Gia đình đồng thuận ủng hộ năng khiếu mỹ thuật số và tư duy thẩm mỹ không gian 3D của con',
    `Ủng hộ con hoàn thiện tác phẩm sáng tạo "${answers.projectName || 'Không Gian Di Sản 3D'}" mang giá trị văn hóa`
  ];
  const differingPoints =
    confirmedDecision === 'keep_direction'
      ? ['Cả nhà thống nhất; sẽ kiểm chứng độ kiên trì khi con chuyển từ vẽ tay sang dựng hình 3D ở Dự án 1']
      : confirmedDecision === 'adjust_pacing'
      ? ['Gia đình ưu tiên hỗ trợ thiết bị đồ họa và sắp xếp thời gian hợp lý']
      : ['Cần trải nghiệm thêm công cụ thiết kế số để con tự tin lựa chọn lộ trình chuyên sâu'];

  const consensusSummary =
    confirmedDecision === 'keep_direction'
      ? 'Gia đình đã thống nhất giữ nguyên định hướng Multimedia & 3D, sẵn sàng đồng hành cùng con.'
      : confirmedDecision === 'adjust_pacing'
      ? 'Gia đình ủng hộ khát vọng nghệ thuật số của con, linh hoạt nhịp học theo điều kiện thực tế.'
      : 'Gia đình ghi nhận sự hào hứng của con và sẽ trao đổi kỹ lưỡng hơn qua buổi trải nghiệm đầu tiên.';

  const familyAlignmentObj = {
    studentAspiration,
    parentObservation,
    agreedPoints,
    differingPoints,
    confirmedDecision,
    confirmedDecisionLabel,
    consensusSummary
  };

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
    targetCapabilities: targetCaps,
    familyAlignment: familyAlignmentObj,
    triangulation: familyAlignmentObj,
    standards: [
      { code: 'CSTA-ALGO', label: 'CSTA K-12 (Tham chiếu mục tiêu)', domainSummary: 'Mô hình hóa dữ liệu không gian & thiết kế giao diện số' },
      { code: 'ISTE-INNOVATIVE', label: 'ISTE Standards (Tham chiếu mục tiêu)', domainSummary: 'Sáng tạo nghệ thuật số kết hợp công nghệ hiện đại' },
      { code: 'NLS-DIGITAL-MASTERY', label: 'Khung NLS (Tham chiếu mục tiêu)', domainSummary: 'Sản xuất và biên tập sản phẩm truyền thông số chuẩn mực' }
    ]
  };
}
