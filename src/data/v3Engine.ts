import contentData from './v3/contentV3.json';
import stepsConfigData from './v3/stepsConfigV3.json';
import type { JourneyAnswers } from '@/types/journey';
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
  const projectImages = [
    isPrimary ? '/assets/activity-world-building.png' : '/assets/activity-problem-solving.png',
    isPrimary ? '/assets/activity-robotics.png' : '/assets/activity-nature-observation.png',
    isPrimary ? '/assets/activity-visual-storytelling.png' : '/assets/activity-communication.png',
    '/assets/activity-world-building.png'
  ];

  // ── XÁC ĐỊNH TÍNH NĂNG TƯƠNG TÁC VÀ CÁC TÍNH NĂNG ĐÃ DUYỆT TỪ DỮ LIỆU ──
  const interactiveFeatureCandidate = dreamFeatures.find(f =>
    f.toLowerCase().includes('bấm') ||
    f.toLowerCase().includes('mở') ||
    f.toLowerCase().includes('xoay') ||
    f.toLowerCase().includes('chạm') ||
    f.toLowerCase().includes('điều khiển') ||
    f.toLowerCase().includes('tương tác') ||
    f.toLowerCase().includes('nút') ||
    f.toLowerCase().includes('chuyển cảnh')
  );

  const interactionFeature = interactiveFeatureCandidate || dreamFeatures[0] || (
    answers.dreamPurpose?.toLowerCase().includes('thiệp') || answers.productFormat?.toLowerCase().includes('thiệp')
      ? 'Bấm nút để mở thiệp và kích hoạt hiệu ứng 3D'
      : domain === 'robotics'
      ? 'Điều khiển vận hành qua nút bấm hoặc cảm biến'
      : 'Tương tác phím bấm điều khiển chuyển động'
  );

  const remainingFeatures = dreamFeatures.filter(f => f !== interactionFeature);
  const experienceFeature = remainingFeatures[0] || (dreamFeatures[1] && dreamFeatures[1] !== interactionFeature ? dreamFeatures[1] : (dreamFeatures[0] !== interactionFeature ? dreamFeatures[0] : 'Trải nghiệm thông điệp và nội dung'));
  const extensionFeature = remainingFeatures[1] || (dreamFeatures[2] && dreamFeatures[2] !== interactionFeature && dreamFeatures[2] !== experienceFeature ? dreamFeatures[2] : 'Tính năng mở rộng và nâng cấp phiên bản');

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

  const p1Features: ProjectFeature[] = [
    {
      id: 'F-P1-01',
      name: 'Khởi tạo môi trường & Cơ chế vận hành cơ bản',
      description: `Thiết lập môi trường làm việc ban đầu và làm chủ các thao tác kỹ thuật nền tảng để sẵn sàng cho ${dreamName}.`,
      knowledgeIds: ['K-01'],
      skillIds: ['S-01'],
      competencyIds: [],
      tasks: [
        {
          id: 'T-P1-01-A',
          description: isPrimary
            ? 'Làm quen với bảng điều khiển và kiểm tra kết nối thiết bị / phần mềm.'
            : 'Thiết lập môi trường phát triển và cấu hình thông số kỹ thuật ban đầu.',
          knowledgeIds: ['K-01'],
          skillIds: ['S-01'],
          competencyIds: []
        },
        {
          id: 'T-P1-01-B',
          description: 'Thực hành thao tác mẫu và chạy thử lệnh khởi động cơ bản.',
          knowledgeIds: ['K-01'],
          skillIds: ['S-01'],
          competencyIds: []
        }
      ],
      deliverable: 'Mô hình / Bản chạy thử nghiệm đầu tiên hoạt động ổn định',
      successCriteria: ['Thiết bị/phần mềm nhận lệnh chính xác', 'Không có cảnh báo lỗi kết nối'],
      evidenceArtifacts: ['Ảnh chụp hoặc video ghi lại thao tác khởi động thành công'],
      scope: 'mvp',
      implementationMode: defaultMode
    },
    {
      id: 'F-P1-02',
      name: `Thử nghiệm nguyên mẫu ban đầu cho ${dreamName}`,
      description: `Tạo phiên bản phác thảo kỹ thuật mô phỏng ý tưởng cốt lõi của "${dreamName}".`,
      knowledgeIds: ['K-03'],
      skillIds: ['S-03'],
      competencyIds: ['C-02'],
      tasks: [
        {
          id: 'T-P1-02-A',
          description: `Vẽ phác thảo hoặc sơ đồ khối cơ chế phục vụ mục tiêu "${dreamPurpose}".`,
          knowledgeIds: ['K-03'],
          skillIds: ['S-03'],
          competencyIds: ['C-02']
        },
        {
          id: 'T-P1-02-B',
          description: 'Chạy thử nghiệm bản phác thảo và ghi chép nhật ký các điểm cần hoàn thiện.',
          knowledgeIds: ['K-03'],
          skillIds: ['S-03'],
          competencyIds: ['C-02']
        }
      ],
      deliverable: 'Bản mô hình nguyên mẫu thử nghiệm sơ bộ',
      successCriteria: ['Vận hành được luồng thao tác căn bản', 'Ghi nhận được nhật ký thử nghiệm ban đầu'],
      evidenceArtifacts: ['Sơ đồ khối thiết kế', 'Nhật ký thử nghiệm bản v0.1'],
      scope: 'mvp',
      implementationMode: defaultMode
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
      'Làm quen với công cụ thiết kế/kỹ thuật nền tảng',
      `Thực hành tạo các thành phần cốt lõi của ${productFormat}`,
      `Tạo bản phác thảo nguyên mẫu ban đầu lấy cảm hứng từ ý tưởng ${dreamName}`
    ] as [string, string, string],
    deliverable: `Bản phác thảo nguyên mẫu thử nghiệm đầu tiên của ${dreamName}`,
    completionCheck: 'Vận hành thành công bản mẫu thử nghiệm đầu tiên',
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

  const p2Features: ProjectFeature[] = [
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
      p2Base.tasks?.[0] || 'Thiết kế cấu trúc logic',
      `Lập trình / thiết kế cơ chế mô phỏng tính năng "${firstFeature}"`,
      'Chạy thử và tối ưu phản hồi khi tương tác với người dùng'
    ] as [string, string, string],
    deliverable: `Mô-đun chức năng ${firstFeature} vận hành ổn định`,
    completionCheck: p2Base.completionCheck || 'Mô-đun chạy trơn tru không lỗi',
    isDreamProject: false,
    adaptedFromLibraryId: p2Title,
    sioIds: (p2Base as any).sioIds || [],
    image: projectImages[1]
  };

  // ── DỰ ÁN 3 (P3): Phát triển chức năng bổ sung, tích hợp hoặc thử nghiệm phù hợp ──
  // Cá nhân hóa theo chuyên môn, KHÔNG cố định là "tối ưu giao diện"
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
          deliverable: 'Cơ chế né vật cản an toàn hoạt động tự động',
          successCriteria: ['Robot luôn dừng cách chướng ngại vật an toàn, không va chạm'],
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
          deliverable: `Nguyên mẫu robot tích hợp hoàn chỉnh dành cho ${dreamAudience}`,
          successCriteria: ['Người dùng thực tế thao tác thuận tiện và an tâm'],
          evidenceArtifacts: ['Phiếu nhận xét đóng góp từ người dùng thử'],
          scope: 'mvp',
          implementationMode: 'physical'
        }
      ]
    : domain === 'game_programming'
    ? [
        {
          id: 'F-P3-01',
          name: 'Máy trạng thái đối thủ AI (Finite State Machine) & Màn chơi thử thách',
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
          deliverable: 'Màn chơi hoàn chỉnh có đối thủ AI thông minh',
          successCriteria: ['AI đối thủ phản xạ tự nhiên, không bị giật lag'],
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
          deliverable: 'Bản game tối ưu hóa trải nghiệm người dùng',
          successCriteria: ['Người chơi hiểu luật chơi ngay trong 60 giây đầu tiên'],
          evidenceArtifacts: ['Video ghi lại màn chơi thử nghiệm thực tế'],
          scope: 'mvp',
          implementationMode: 'software'
        }
      ]
    : [
        {
          id: 'F-P3-01',
          name: 'Hoạt họa chuyển động 3D & Hiệu ứng ánh sáng môi trường',
          description: 'Tạo hoạt hình keyframe sinh động và bố trí ánh sáng tôn vinh chủ đề tác phẩm.',
          knowledgeIds: ['K-02', 'K-03'],
          skillIds: ['S-02'],
          competencyIds: ['C-01', 'C-02'],
          tasks: [
            {
              id: 'T-P3-01-A',
              description: 'Thiết lập Timeline chuyển động cho các nhân vật và mô hình.',
              knowledgeIds: ['K-02'],
              skillIds: ['S-02'],
              competencyIds: ['C-01']
            },
            {
              id: 'T-P3-01-B',
              description: 'Tinh chỉnh nguồn sáng 3 điểm (Key, Fill, Rim) để tạo chiều sâu ấn tượng.',
              knowledgeIds: ['K-02', 'K-03'],
              skillIds: ['S-02'],
              competencyIds: ['C-02']
            }
          ],
          deliverable: 'Đoạn hoạt hình 3D hoàn chỉnh hiệu ứng chuyển động',
          successCriteria: ['Khung hình chuyển động mượt mà và ánh sáng hài hòa'],
          evidenceArtifacts: ['Video kết xuất Render 3D độ nét cao'],
          scope: 'mvp',
          implementationMode: 'design'
        },
        {
          id: 'F-P3-02',
          name: `Kể chuyện đa phương tiện & Thử nghiệm tiếp nhận cùng ${dreamAudience}`,
          description: `Lồng ghép âm thanh, thuyết minh và trình chiếu thử nghiệm cho ${dreamAudience}.`,
          knowledgeIds: ['K-03'],
          skillIds: ['S-03'],
          competencyIds: ['C-01', 'C-03'],
          tasks: [
            {
              id: 'T-P3-02-A',
              description: 'Biên tập âm nhạc nền và hiệu ứng âm thanh Sound FX phù hợp câu chuyện.',
              knowledgeIds: ['K-03'],
              skillIds: ['S-03'],
              competencyIds: ['C-01']
            },
            {
              id: 'T-P3-02-B',
              description: `Thu nhận cảm xúc và ý kiến đánh giá từ ${dreamAudience}.`,
              knowledgeIds: [],
              skillIds: ['S-03'],
              competencyIds: ['C-03']
            }
          ],
          deliverable: 'Tác phẩm đa phương tiện hoàn chỉnh âm thanh và hình ảnh',
          successCriteria: ['Thông điệp văn hóa/giáo dục được truyền tải rõ ràng'],
          evidenceArtifacts: ['Bản trình chiếu tương tác kèm nhận xét'],
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
        : 'Thiết lập hoạt họa keyframe và ánh sáng 3D',
      `Mời ${dreamAudience} trải nghiệm thử và ghi nhận phản hồi`,
      'Điều chỉnh cơ chế vận hành dựa trên góp ý thực tế'
    ] as [string, string, string],
    deliverable: `Bản hoàn thiện thử nghiệm thực tế với ${dreamAudience}`,
    completionCheck: `Ít nhất một người thuộc nhóm ${dreamAudience} thử nghiệm và đánh giá tích cực`,
    isDreamProject: false,
    adaptedFromLibraryId: p3Title,
    sioIds: (p1Base as any).sioIds || [],
    image: projectImages[2]
  };

  // ── DỰ ÁN 4 (P4): DỰ ÁN ƯỚC MƠ (DREAM PROJECT) — GIỮ NGUYÊN TÊN ƯỚC MƠ! ──
  const p4Features: ProjectFeature[] = [
    {
      id: 'F-P4-01',
      name: `Chức năng tương tác: ${interactionFeature}`,
      description: `Xây dựng và lập trình cơ chế tương tác trực tiếp "${interactionFeature}" cho sản phẩm ${dreamName}, giúp ${dreamAudience} có thể chủ động thao tác và kích hoạt phản hồi sinh động.`,
      knowledgeIds: ['K-02'],
      skillIds: ['S-02'],
      competencyIds: ['C-01', 'C-03'],
      tasks: [
        {
          id: 'T-P4-01-A',
          description: `Thiết kế và gắn bộ điều khiển / sự kiện tương tác (click / chạm / cảm biến) để kích hoạt chuyển động "${interactionFeature}".`,
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
      deliverable: `Mô-đun tương tác [${interactionFeature}] hoàn chỉnh vận hành trong ${dreamName}`,
      successCriteria: [`Người dùng (${dreamAudience}) thao tác "${interactionFeature}" mượt mà và phản hồi diễn ra chính xác`],
      evidenceArtifacts: ['Video quay lại thao tác tương tác thực tế', 'Tài liệu hướng dẫn thao tác tương tác cho người dùng'],
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
      deliverable: `Trải nghiệm nội dung [${experienceFeature}] hoàn thiện trong sản phẩm ${dreamName}`,
      successCriteria: [`${dreamAudience} tiếp nhận rõ ràng thông điệp và đánh giá cao trải nghiệm sản phẩm mang lại`],
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

  // Whitelist payload strictly for Google AI Studio React + TypeScript + Tailwind SPA generator
  const safePayload = {
    displayName: answers.name?.trim() || 'Nhà Sáng Tạo',
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
      productFormat: answers.productFormat?.trim() || (
        dreamPurpose.toLowerCase().includes('thiệp') ? 'Thiệp điện tử 3D tương tác' :
        answers.domain === 'multimedia' ? 'Tác phẩm đồ họa 3D' :
        answers.domain === 'robotics' ? 'Mô hình robot thông minh' : 'Ứng dụng trò chơi tương tác'
      ),
      audience: dreamAudience,
      purpose: dreamPurpose,
      features: dreamFeatures,
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

  const instructions = `Bạn là chuyên gia thiết kế trải nghiệm học tập và kỹ sư phần mềm web frontend hàng đầu. Hãy tạo một website Single-Page Application (SPA) hoàn chỉnh sử dụng **React + TypeScript + Tailwind CSS** và Lucide Icons từ hồ sơ JSON bên dưới.

BẢN CHẤT SẢN PHẨM:
- Đây là "FUTURE CAPABILITY PORTFOLIO" (Hồ Sơ Năng Lực Tương Lai Mục Tiêu) mà học sinh và gia đình đã thống nhất hướng tới theo lĩnh vực công nghệ ${riasec.techSector}.
- Đây KHÔNG phải là bảng đánh giá năng lực hiện tại hay cấp chứng chỉ, mà là hồ sơ mục tiêu năng lực và lộ trình thực hiện chi tiết đến từng chức năng sản phẩm.
- Bốn dự án (P1 đến P4) phục vụ trực tiếp cho Dream Project, trong đó P4 giữ nguyên tên dự án "${dreamName}" đã được học sinh xác nhận.

YÊU CẦU KỸ THUẬT BẮT BUỘC:
1. CÔNG NGHỆ: Single-page Web App xây dựng bằng React, TypeScript và Tailwind CSS. Sử dụng các component React tương tác mượt mà, lưu trạng thái hoàn thành vào state/localStorage.
2. HỆ THỐNG BIỂU TƯỢNG & PHÔNG CHỮ:
   - Sử dụng Lucide Icons (React: import { ... } from 'lucide-react').
   - Phông chữ hiện đại Google Font 'Plus Jakarta Sans'.
3. THIẾT KẾ THEO NGUYÊN TẮC PROGRESSIVE DISCLOSURE:
   - Profile Hero nổi bật Chân dung Tương lai, Tuyên ngôn và Dream Project.
   - Không nhồi nhét quá nhiều chữ trong một khối. Dùng các card tương tác, modal hoặc drawer để mở chi tiết sâu.
4. LỘ TRÌNH 3 CẤP ĐỘ (FUNCTION-LEVEL ROADMAP NAVIGATION):
   - Cấp 1: Overall Development Roadmap (P1 -> P2 -> P3 -> P4 với vai trò rõ ràng của từng chặng).
   - Cấp 2: Project Roadmap (Chi tiết từng dự án, danh sách chức năng MVP và Phần mở rộng).
   - Cấp 3: Function-Level Roadmap (Xem sâu từng chức năng: Mục tiêu K/S/C, Nhiệm vụ cụ thể, Sản phẩm đầu ra, Tiêu chí hoàn thành, Minh chứng cần nộp).
5. ĐIỀU HƯỚNG HAI CHIỀU (BIDIRECTIONAL TRACING):
   - Nhấn vào mục tiêu năng lực (K-xx, S-xx, C-xx) trong Future Profile sẽ mở/highlight đúng Dự án và Chức năng liên quan trong Roadmap.
   - Chiều ngược lại: Xem chức năng trong Roadmap có thể xem các mục tiêu năng lực mà chức năng đó bồi dưỡng.
6. FAMILY REVIEW THỰC CHẤT:
   - Tuyệt đối không tự tạo tỷ lệ phần trăm đồng thuận hay tỷ lệ tương thích nghề nghiệp.
   - Thể hiện 3 nội dung: Điểm thống nhất, Điểm nhìn khác biệt để kiểm chứng qua Dự án 1, và Quyết định hành động xác nhận ("${riasec.familyAlignment.confirmedDecisionLabel}").
7. BẢO MẬT & CHUẨN THAM CHIẾU:
   - Tuyệt đối không xuất thông tin cá nhân nhạy cảm (SĐT, họ tên đầy đủ thật, địa chỉ nhà).
   - Không tuyên bố học sinh đạt chuẩn CSTA, ISTE hoặc NLS từ bài tương tác ngắn; chỉ dùng làm chuẩn tham chiếu mục tiêu bồi dưỡng.`;

  const fullPrompt = `# TẠO WEBSITE PORTFOLIO FUTURE ME & FUNCTION-LEVEL ROADMAP (REACT + TS + TAILWIND)

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
