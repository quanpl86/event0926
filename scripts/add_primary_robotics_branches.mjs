import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, '..', 'src', 'data', 'v3', 'contentV3.json');

const raw = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(raw);

const smartDevicePrimary = {
  domain: "robotics_iot",
  specialization: "smart_device_primary",
  label: "Thiết bị thông minh & Cảm biến vui nhộn",
  about: "Con chế tạo các đồ dùng thông minh như đèn tự sáng khi trời tối, thùng rác tự mở nắp hay chuông báo động mini.",
  interestPrompt: "Con có muốn tạo ra một chiếc đèn tự bật khi trời tối hay thùng rác tự mở nắp khi đưa tay lại gần không?",
  dreamPurposePrompt: "Con muốn thiết bị thông minh này giúp ích cho ai trong gia đình hoặc lớp học?",
  featureChoices: [
    "Cảm biến nhận biết khoảng cách / ánh sáng",
    "Tự động mở nắp hoặc bật đèn khi có người đến gần",
    "Phát âm thanh vui nhộn hoặc đổi màu đèn LED thông minh"
  ],
  appearancePrompt: "Thiết bị thông minh của con có hình dáng thế nào, đặt ở đâu trong nhà?",
  projects: [
    {
      id: "P1",
      title: "Đèn học thông minh chống cận",
      goal: "Làm một chiếc đèn tự bật sáng khi trời tối và nhắc nhở khi con ngồi quá gần sách.",
      tasks: [
        "Lắp khung đèn và gắn bóng LED tiết kiệm điện",
        "Gắn cảm biến ánh sáng và cảm biến khoảng cách",
        "Thử nghiệm đèn tự bật khi che tối cảm biến"
      ],
      deliverable: "Mô hình đèn học thông minh mini",
      completionCheck: "Đèn tự phát sáng khi ánh sáng phòng mờ và con nói được chức năng cảm biến.",
      prerequisite: "Không cần biết trước phần mềm hay bộ công cụ cụ thể.",
      evidence: [
        "Hình ảnh hoặc video đèn tự sáng",
        "Lời con kể về cách đèn nhận biết ánh sáng",
        "Ghi nhận con tự làm hay có người hỗ trợ"
      ],
      status: "planned",
      estimatedHours: 6,
      timeNote: "Chỉ là thời lượng ước tính; cần gia đình xác nhận lịch trước khi bắt đầu."
    },
    {
      id: "P2",
      title: "Thùng rác tự động mở nắp",
      goal: "Chế tạo thùng rác tự mở nắp khi có người đưa tay lại gần và tự đóng lại sau vài giây.",
      tasks: [
        "Lắp cơ cấu nắp lật bằng động cơ servo",
        "Gắn mắt thần siêu âm phát hiện tay người",
        "Chạy thử đóng mở 3 lần liên tiếp và tinh chỉnh"
      ],
      deliverable: "Mô hình thùng rác tự động hợp vệ sinh",
      completionCheck: "Nắp mở khi tay cách 10cm và tự đóng sau 3 giây không bị kẹt.",
      prerequisite: "Hoàn thành chặng trước hoặc được hướng dẫn bắt đầu.",
      evidence: [
        "Video chạy thử thùng rác tự đóng mở",
        "Bản vẽ hoặc ảnh chụp vị trí gắn cảm biến"
      ],
      status: "planned",
      estimatedHours: 6,
      timeNote: "Chỉ là thời lượng ước tính; cần gia đình xác nhận lịch trước khi bắt đầu."
    },
    {
      id: "P3",
      title: "Chuông báo chống trộm mini",
      goal: "Hệ thống phát còi báo hoặc nhấp nháy đèn khi có người bước qua cửa phòng.",
      tasks: [
        "Đặt cảm biến phát hiện chuyển động trước cửa mô hình",
        "Lập trình khối lệnh kích hoạt còi báo và đèn hiệu",
        "Thử nghiệm các góc quét để báo động chính xác"
      ],
      deliverable: "Thiết bị cảnh báo an ninh mini",
      completionCheck: "Còi kêu khi có vật di chuyển qua và dừng lại khi phòng an toàn.",
      prerequisite: "Hoàn thành chặng trước hoặc được hướng dẫn bắt đầu.",
      evidence: [
        "Video mô phỏng tình huống có người bước qua",
        "Nhật ký thử nghiệm các khoảng cách phát hiện"
      ],
      status: "planned",
      estimatedHours: 6,
      timeNote: "Chỉ là thời lượng ước tính; cần gia đình xác nhận lịch trước khi bắt đầu."
    },
    {
      id: "P4",
      title: "Ngôi Nhà Thông Minh Mini",
      goal: "Tích hợp đèn thông minh, cửa tự động và chuông báo vào một mô hình nhà tiện ích.",
      tasks: [
        "Phác thảo sơ đồ mặt bằng ngôi nhà thông minh",
        "Kết nối đồng bộ các cảm biến và mạch điều khiển",
        "Trình diễn các tiện ích thông minh cho cả nhà xem"
      ],
      deliverable: "Mô hình sa bàn Smart Home hoàn chỉnh",
      completionCheck: "Các thiết bị hoạt động đồng bộ và con giải thích được nguyên lý tự động.",
      prerequisite: "Hoàn thành chặng trước hoặc được hướng dẫn bắt đầu.",
      evidence: [
        "Hình ảnh sa bàn ngôi nhà và video trình diễn",
        "Lời thuyết trình của con về ngôi nhà trong mơ"
      ],
      status: "planned",
      estimatedHours: 6,
      timeNote: "Chỉ là thời lượng ước tính; cần gia đình xác nhận lịch trước khi bắt đầu."
    }
  ],
  learningTopics: [
    "Cảm biến ánh sáng & khoảng cách",
    "Động cơ điều khiển góc quay (Servo)",
    "Quy tắc Đầu vào - Xử lý - Đầu ra",
    "Ứng dụng công nghệ phục vụ đời sống"
  ],
  toolExamplesAfterAssessment: [
    "Mạch điều khiển vi xử lý mini",
    "Cảm biến siêu âm và quang trở",
    "Phần mềm lập trình kéo thả khối lệnh"
  ],
  sioInteractions: [
    {
      id: "FM-P-SMART-SIO-01",
      observable: "Nhận biết vai trò của cảm biến và bộ phát tín hiệu",
      standardRefs: [
        "CSTA26-SYSTEM",
        "NGSS-35-ETS1-1"
      ],
      question: "Đèn học thông minh muốn tự bật khi phòng bị tối thì cần dùng cảm biến gì để nhận biết? Con nghĩ sao? Hãy chia sẻ cách làm của con.",
      responseType: "scenario_explanation",
      evidencePolicy: "Chỉ ghi nhận điều thể hiện trong câu trả lời; chưa kết luận đạt chuẩn hay thao tác thực tế.",
      parentExplanation: "Chúng tôi muốn quan sát khả năng liên hệ giữa cảm biến đầu vào và thiết bị đầu ra của trẻ.",
      childWhy: "Mình muốn hiểu cách con hình dung cảm biến giúp đồ vật trở nên thông minh như thế nào.",
      nonScoringRubric: {
        observed: "Câu trả lời nêu được cảm biến ánh sáng hoặc mắt nhìn nhận biết tối sáng.",
        emerging: "Có ý tưởng về đèn tự bật nhưng chưa rõ bộ phận nào giúp nhận biết.",
        not_observed: "Chưa thấy dấu hiệu của chỉ báo trong câu trả lời này.",
        insufficient_evidence: "Bỏ qua hoặc chưa đủ dữ liệu."
      }
    },
    {
      id: "FM-P-SMART-SIO-02",
      observable: "Mô tả quy trình nhận tín hiệu và kích hoạt hành động",
      standardRefs: [
        "CSTA26-ALG",
        "CSTA26-SYSTEM"
      ],
      question: "Khi đưa tay lại gần thùng rác, tín hiệu truyền đến động cơ như thế nào để nắp mở ra? Con hãy nói các bước theo thứ tự nhé.",
      responseType: "sequence_or_visual_plan",
      evidencePolicy: "Chỉ ghi nhận điều thể hiện trong câu trả lời; chưa kết luận đạt chuẩn hay thao tác thực tế.",
      parentExplanation: "Chúng tôi muốn quan sát tư duy quy trình và thứ tự xử lý của thiết bị.",
      childWhy: "Mình muốn xem cách con sắp xếp các bước vận hành của một đồ dùng thông minh.",
      nonScoringRubric: {
        observed: "Nêu được trình tự: Cảm biến phát hiện tay -> Báo mạch điều khiển -> Động cơ quay mở nắp.",
        emerging: "Nêu được một phần của quy trình nhưng thiếu bước trung gian.",
        not_observed: "Chưa thấy dấu hiệu của chỉ báo trong câu trả lời này.",
        insufficient_evidence: "Bỏ qua hoặc chưa đủ dữ liệu."
      }
    },
    {
      id: "FM-P-SMART-SIO-03",
      observable: "Xử lý và gỡ lỗi khi thiết bị phản hồi không đúng",
      standardRefs: [
        "NGSS-35-ETS1-2",
        "ISTE-1.4.a"
      ],
      question: "Nếu thùng rác không tự mở nắp khi đưa tay lại gần, con sẽ kiểm tra phần dây cắm, mắt cảm biến hay động cơ trước?",
      responseType: "problem_hypothesis",
      evidencePolicy: "Chỉ ghi nhận điều thể hiện trong câu trả lời; chưa kết luận đạt chuẩn hay thao tác thực tế.",
      parentExplanation: "Chúng tôi muốn quan sát phản xạ tìm nguyên nhân khi sản phẩm công nghệ gặp trục trặc.",
      childWhy: "Mình muốn xem phản xạ gỡ lỗi và sự kiên nhẫn của con khi máy móc chưa chạy đúng.",
      nonScoringRubric: {
        observed: "Đề xuất được phương án kiểm tra cụ thể và nêu lý do vì sao kiểm tra phần đó.",
        emerging: "Có ý định thử lại nhưng chưa rõ cách kiểm tra từng bộ phận.",
        not_observed: "Chưa thấy dấu hiệu của chỉ báo trong câu trả lời này.",
        insufficient_evidence: "Bỏ qua hoặc chưa đủ dữ liệu."
      }
    }
  ],
  parentObservationPrompt: "Gần đây ba mẹ có thấy con tò mò về các đồ dùng tự động trong nhà (như vòi nước tự chảy, đèn tự bật) không? Kể một lần cụ thể nhé.",
  parentCompetencyPrompt: "Ba mẹ đã từng thấy con mày mò tự lắp hay sửa một đồ dùng nhỏ trong nhà chưa? Khi đó con làm thế nào?",
  visualBrief: "Minh họa mô hình thiết bị thông minh ngộ nghĩnh, đèn bàn và thùng rác mini cho học sinh Tiểu học.",
  contentStatus: "proposed_internal_content_not_piloted"
};

const automationPrimary = {
  domain: "robotics_iot",
  specialization: "automation_primary",
  label: "Mô hình Tự động hóa & Cơ cấu máy",
  about: "Con thiết kế các cỗ máy tự động làm việc như cổng barie thông minh, quạt cảm ứng hay băng chuyền vận chuyển đồ chơi.",
  interestPrompt: "Con có thích nhìn những cỗ máy tự động mở cổng khi xe đến hoặc băng chuyền tự chuyển hàng hóa không?",
  dreamPurposePrompt: "Cỗ máy tự động này sẽ giúp giảm sức lao động cho ai hoặc hỗ trợ việc gì trong cuộc sống?",
  featureChoices: [
    "Cần gạt barie hoặc cánh tay cơ học nâng hạ tự động",
    "Băng chuyền vận chuyển đồ vật liên tục",
    "Tự động dừng lại khi xong việc hoặc khi gặp vật cản"
  ],
  appearancePrompt: "Mô hình tự động của con có màu sắc thế nào, gồm những chi tiết bánh răng và thanh trượt gì?",
  projects: [
    {
      id: "P1",
      title: "Cổng Barie thông minh",
      goal: "Chế tạo cổng barie tự động nâng lên khi xe đến gần và tự hạ xuống khi xe đã qua an toàn.",
      tasks: [
        "Lắp thanh chắn barie và trục xoay bánh răng",
        "Gắn cảm biến phát hiện xe đến trước cổng",
        "Chạy thử nghiệm chu trình nâng hạ thanh chắn"
      ],
      deliverable: "Mô hình cổng chắn giao thông tự động",
      completionCheck: "Thanh chắn nâng lên khi xe tới và hạ xuống sau 2 giây an toàn.",
      prerequisite: "Không cần biết trước phần mềm hay bộ công cụ cụ thể.",
      evidence: [
        "Video xe chạy qua và barie tự nâng hạ",
        "Hình ảnh con điều chỉnh trục quay bánh răng"
      ],
      status: "planned",
      estimatedHours: 6,
      timeNote: "Chỉ là thời lượng ước tính; cần gia đình xác nhận lịch trước khi bắt đầu."
    },
    {
      id: "P2",
      title: "Quạt gió cảm ứng nhiệt độ",
      goal: "Chế tạo quạt mini tự động quay khi thời tiết nóng và tự dừng khi phòng mát mẻ.",
      tasks: [
        "Lắp cánh quạt, motor và lồng bảo vệ an toàn",
        "Kết nối cảm biến nhiệt độ hoặc nút bấm thông minh",
        "Thử nghiệm quạt tự quay khi nhiệt độ tăng"
      ],
      deliverable: "Quạt làm mát tự động thông minh",
      completionCheck: "Quạt quay đều êm ái khi nhận tín hiệu nhiệt và tự ngắt khi mát.",
      prerequisite: "Hoàn thành chặng trước hoặc được hướng dẫn bắt đầu.",
      evidence: [
        "Video quạt tự quay khi nhận tín hiệu",
        "Nhật ký ghi lại mức nhiệt độ quạt bắt đầu chạy"
      ],
      status: "planned",
      estimatedHours: 6,
      timeNote: "Chỉ là thời lượng ước tính; cần gia đình xác nhận lịch trước khi bắt đầu."
    },
    {
      id: "P3",
      title: "Băng chuyền phân loại mini",
      goal: "Làm một băng chuyền chạy liên tục để vận chuyển đồ chơi qua các trạm xử lý.",
      tasks: [
        "Lắp dây đai cao su và con lăn truyền động",
        "Lập trình motor kéo băng chuyền quay đều",
        "Thử nghiệm đặt đồ vật lên băng chuyền không bị rơi"
      ],
      deliverable: "Băng chuyền vận chuyển mini",
      completionCheck: "Đồ vật di chuyển mượt mà từ đầu đến cuối băng chuyền.",
      prerequisite: "Hoàn thành chặng trước hoặc được hướng dẫn bắt đầu.",
      evidence: [
        "Video đồ chơi di chuyển trên băng chuyền",
        "Ảnh chụp các khớp nối và con lăn truyền động"
      ],
      status: "planned",
      estimatedHours: 6,
      timeNote: "Chỉ là thời lượng ước tính; cần gia đình xác nhận lịch trước khi bắt đầu."
    },
    {
      id: "P4",
      title: "Nhà Máy Tự Động Hóa Tương Lai",
      goal: "Kết hợp barie, đèn báo và băng chuyền thành một dây chuyền làm việc tự động hoàn chỉnh.",
      tasks: [
        "Dựng sa bàn mô phỏng nhà máy sản xuất mini",
        "Ghép nối các hệ thống cơ khí và cảm biến",
        "Thuyết trình cách nhà máy vận hành tự động"
      ],
      deliverable: "Sa bàn nhà máy tự động hóa mini",
      completionCheck: "Dây chuyền vận hành trơn tru và con nói rõ vai trò tự động hóa.",
      prerequisite: "Hoàn thành chặng trước hoặc được hướng dẫn bắt đầu.",
      evidence: [
        "Sa bàn hoàn thiện và video vận hành toàn tuyến",
        "Bài thuyết trình giới thiệu của con"
      ],
      status: "planned",
      estimatedHours: 6,
      timeNote: "Chỉ là thời lượng ước tính; cần gia đình xác nhận lịch trước khi bắt đầu."
    }
  ],
  learningTopics: [
    "Cơ cấu truyền động bánh răng & dây đai",
    "Nguyên lý nâng hạ và đòn bẩy cơ khí",
    "Tự động hóa chu trình lặp lại",
    "An toàn trong thiết kế máy móc"
  ],
  toolExamplesAfterAssessment: [
    "Bộ chi tiết cơ khí bánh răng và thanh nối",
    "Motor truyền động và cảm biến",
    "Môi trường lập trình khối lệnh trực quan"
  ],
  sioInteractions: [
    {
      id: "FM-P-AUTO-SIO-01",
      observable: "Hiểu cơ chế chuyển động và truyền lực cơ khí",
      standardRefs: [
        "CSTA26-SYSTEM",
        "NGSS-35-ETS1-1"
      ],
      question: "Để thanh chắn barie nâng lên hạ xuống mượt mà, con sẽ gắn motor vào trục xoay như thế nào? Con nghĩ sao? Hãy chia sẻ cách con làm nhé.",
      responseType: "scenario_explanation",
      evidencePolicy: "Chỉ ghi nhận điều thể hiện trong câu trả lời; chưa kết luận đạt chuẩn hay thao tác thực tế.",
      parentExplanation: "Chúng tôi muốn quan sát hiểu biết của trẻ về cơ cấu chuyển động cơ khí đơn giản.",
      childWhy: "Mình muốn xem cách con tưởng tượng các bộ phận ăn khớp để tạo nên chuyển động.",
      nonScoringRubric: {
        observed: "Nêu được gắn trực tiếp vào trục hoặc qua bánh răng để truyền lực.",
        emerging: "Có ý tưởng làm thanh chắn quay nhưng chưa rõ cách nối với motor.",
        not_observed: "Chưa thấy dấu hiệu của chỉ báo trong câu trả lời này.",
        insufficient_evidence: "Bỏ qua hoặc chưa đủ dữ liệu."
      }
    },
    {
      id: "FM-P-AUTO-SIO-02",
      observable: "Mô tả chu trình hoạt động lặp lại theo quy tắc",
      standardRefs: [
        "CSTA26-ALG",
        "CSTA26-SYSTEM"
      ],
      question: "Con hãy kể thứ tự các việc xảy ra: Khi xe đến cổng -> Cảm biến phát hiện -> Barie làm gì tiếp theo?",
      responseType: "sequence_or_visual_plan",
      evidencePolicy: "Chỉ ghi nhận điều thể hiện trong câu trả lời; chưa kết luận đạt chuẩn hay thao tác thực tế.",
      parentExplanation: "Chúng tôi muốn quan sát tư duy logic chu trình tự động hóa.",
      childWhy: "Mình muốn xem con sắp xếp các hành động của cỗ máy theo trình tự thời gian.",
      nonScoringRubric: {
        observed: "Nêu đủ: Xe đến -> Cảm biến nhận -> Nâng thanh chắn -> Xe qua -> Hạ thanh chắn.",
        emerging: "Nêu được thanh chắn nâng lên nhưng quên bước hạ xuống.",
        not_observed: "Chưa thấy dấu hiệu của chỉ báo trong câu trả lời này.",
        insufficient_evidence: "Bỏ qua hoặc chưa đủ dữ liệu."
      }
    },
    {
      id: "FM-P-AUTO-SIO-03",
      observable: "Tìm nguyên nhân khi cơ cấu chuyển động bị kẹt",
      standardRefs: [
        "NGSS-35-ETS1-2",
        "ISTE-1.4.a"
      ],
      question: "Nếu băng chuyền quay chậm hoặc bị kẹt bánh răng, con sẽ kiểm tra điểm nào trước để khắc phục?",
      responseType: "problem_hypothesis",
      evidencePolicy: "Chỉ ghi nhận điều thể hiện trong câu trả lời; chưa kết luận đạt chuẩn hay thao tác thực tế.",
      parentExplanation: "Chúng tôi muốn quan sát phản xạ gỡ rối cơ học và kỹ năng quan sát của trẻ.",
      childWhy: "Mình muốn xem cách con tìm lỗi cơ khí và kiên trì khắc phục khi máy bị kẹt.",
      nonScoringRubric: {
        observed: "Nêu kiểm tra xem bánh răng có bị kênh, dây đai có bị chùng hoặc motor có bị vướng vật lạ.",
        emerging: "Biết là bị kẹt nhưng chưa chỉ rõ chỗ cần kiểm tra.",
        not_observed: "Chưa thấy dấu hiệu của chỉ báo trong câu trả lời này.",
        insufficient_evidence: "Bỏ qua hoặc chưa đủ dữ liệu."
      }
    }
  ],
  parentObservationPrompt: "Ở nhà con có thích nhìn các chi tiết máy móc như quạt, xe đạp hay đồ chơi chạy pin không? Ba mẹ kể một lần con chăm chú quan sát nhé.",
  parentCompetencyPrompt: "Ba mẹ từng thấy con tự lắp được một mô hình có bánh xe hoặc cơ cấu chuyển động chưa?",
  visualBrief: "Minh họa cổng barie giao thông và băng chuyền cơ khí mini sinh động cho học sinh Tiểu học.",
  contentStatus: "proposed_internal_content_not_piloted"
};

// Add to branches.primary
data.branches.primary.smart_device_primary = smartDevicePrimary;
data.branches.primary.automation_primary = automationPrimary;

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully added smart_device_primary and automation_primary to contentV3.json!');
console.log('Primary branches now:', Object.keys(data.branches.primary));
