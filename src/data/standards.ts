export type StandardDetail = {
  code: string;
  name: string;
  organization: string;
  version: string;
  description: string;
  scope: string;
  criteria: string;
  evidence: string;
  limitations: string;
  sourceUrl: string;
};

export const STANDARDS_DB: Record<string, StandardDetail> = {
  "CSTA-ALGO": {
    code: "CSTA 2026 – Algorithms & Design",
    name: "Tư duy Thuật toán & Thiết kế Trình tự",
    organization: "Computer Science Teachers Association (CSTA, Hoa Kỳ)",
    version: "2026 Standards",
    description: "Khả năng phân rã bài toán, xây dựng các bước giải quyết tuần tự và nhận biết cấu trúc lặp hoặc điều kiện rẽ nhánh.",
    scope: "Tiểu học (Lớp 1–5) & THCS (Lớp 6–8)",
    criteria: "Quan sát cách học sinh sắp xếp các thao tác logic để điều khiển robot hoặc nhân vật đến đích mà không bị lỗi.",
    evidence: "Học sinh chọn đúng trình tự các bước di chuyển hoặc giải thích được nguyên nhân một bước bị đặt sai vị trí.",
    limitations: "Tình huống trắc nghiệm mô phỏng trên giao diện; chưa khẳng định năng lực lập trình code độc lập trên máy tính.",
    sourceUrl: "https://csteachers.org"
  },
  "CSTA-PROG": {
    code: "CSTA 2026 – Programming & Logic",
    name: "Lập trình, Thử nghiệm & Gỡ lỗi (Debugging)",
    organization: "Computer Science Teachers Association (CSTA, Hoa Kỳ)",
    version: "2026",
    description: "Nhận biết cách phần mềm phản hồi lệnh và biết thử lại bằng cách cô lập chi tiết nghi ngờ bị lỗi.",
    scope: "Tiểu học & THCS",
    criteria: "Quan sát phản xạ của học sinh khi hệ thống gặp trục trặc: đổi phương án, tìm kiếm gợi ý hoặc hỏi đồng đội.",
    evidence: "Lựa chọn phương án gỡ lỗi tuần tự thay vì bỏ cuộc hoặc thử ngẫu nhiên không có định hướng.",
    limitations: "Đánh giá xu hướng tư duy giải quyết vấn đề, không chấm điểm cú pháp ngôn ngữ lập trình.",
    sourceUrl: "https://csteachers.org"
  },
  "CSTA-SYS": {
    code: "CSTA 2026 – Systems & Devices",
    name: "Hệ thống Phần cứng & Thiết bị Thông minh",
    organization: "Computer Science Teachers Association (CSTA, Hoa Kỳ)",
    version: "2026",
    description: "Hiểu mối quan hệ giữa các bộ phận phần cứng (cảm biến, vi xử lý, động cơ) và chu trình cảm biến → xử lý → đầu ra.",
    scope: "Robotics & IoT (Tiểu học & THCS)",
    criteria: "Nhận biết chức năng của từng linh kiện hoặc bộ phận robot trong đời sống.",
    evidence: "Xác định đúng bộ phận đóng vai trò thu thập thông tin (cảm biến) và bộ phận hành động (bánh xe, còi, màn hình).",
    limitations: "Đo lường sự hiểu biết khái niệm ban đầu; chưa đánh giá kỹ năng đấu nối mạch điện hay hàn cơ khí.",
    sourceUrl: "https://csteachers.org"
  },
  "NLS-3.4": {
    code: "NLS 3.4 – Lập trình & Thuật toán",
    name: "Khung Năng Lực Số: Lập trình & Thuật toán",
    organization: "Bộ Giáo dục & Đào tạo Việt Nam",
    version: "Khung NLS 2025",
    description: "Hiểu và phát triển chuỗi hướng dẫn máy tính thực hiện nhiệm vụ hoặc giải quyết vấn đề cụ thể.",
    scope: "Học sinh phổ thông Việt Nam",
    criteria: "Khả năng tư duy logic theo từng bước, diễn đạt ý tưởng thành các khối lệnh hoặc chuỗi thao tác.",
    evidence: "Học sinh sắp xếp chuỗi hành vi của robot hoặc cơ chế hoạt động của game theo thứ tự hợp lý.",
    limitations: "Tình huống trực quan kích thích tò mò; không dùng để xếp loại học lực môn Tin học.",
    sourceUrl: "https://thuvienphapluat.vn"
  },
  "NLS-3.1": {
    code: "NLS 3.1 – Sáng tạo Nội dung Số",
    name: "Phát triển Nội dung & Đồ họa Số",
    organization: "Bộ Giáo dục & Đào tạo Việt Nam",
    version: "Khung NLS 2025",
    description: "Tạo và chỉnh sửa nội dung số ở các định dạng khác nhau, thể hiện bản thân qua các phương tiện kỹ thuật số.",
    scope: "Toàn cấp học",
    criteria: "Lựa chọn phong cách thị giác, bố cục, màu sắc và thông điệp cho nhân vật hoặc sản phẩm tương tác.",
    evidence: "Học sinh chọn hình tượng, phong cách 2D/3D và diễn đạt câu chuyện cho dự án tương lai của mình.",
    limitations: "Đo lường khiếu thẩm mỹ và ý tưởng sáng tạo cá nhân, không đánh giá độ thành thạo phần mềm đồ họa chuyên nghiệp.",
    sourceUrl: "https://thuvienphapluat.vn"
  },
  "NLS-5.1": {
    code: "NLS 5.1 – Giải quyết Vấn đề Kỹ thuật",
    name: "Xác định Nhu cầu & Giải pháp Công nghệ",
    organization: "Bộ Giáo dục & Đào tạo Việt Nam",
    version: "Khung NLS 2025",
    description: "Nhận biết các cơ hội dùng công nghệ để giải quyết vấn đề đời sống (gia đình, trường học, môi trường, cộng đồng).",
    scope: "Học sinh phổ thông",
    criteria: "Học sinh lựa chọn đối tượng và mục đích có ý nghĩa khi xây dựng dự án công nghệ của mình.",
    evidence: "Xác định rõ người hưởng lợi từ dự án (giúp gia đình, làm bạn học vui hơn, bảo vệ môi trường).",
    limitations: "Phản ánh ý thức xã hội và động lực sáng tạo, không phải báo cáo tính khả thi kinh tế kỹ thuật.",
    sourceUrl: "https://thuvienphapluat.vn"
  },
  "ISTE-1.4": {
    code: "ISTE 1.4 – Innovative Designer",
    name: "Nhà Thiết kế Đổi mới Sáng tạo",
    organization: "International Society for Technology in Education (ISTE)",
    version: "2024–2026 Standards",
    description: "Sử dụng quy trình thiết kế cân nhắc nhu cầu người dùng để tạo ra giải pháp mới hoặc cải tiến sản phẩm.",
    scope: "Chuẩn quốc tế học sinh K-12",
    criteria: "Khả năng lên ý tưởng sản phẩm trong mơ với tên gọi, tính năng chính và đối tượng phục vụ rõ ràng.",
    evidence: "Học sinh phác thảo Dream Project Brief hoàn chỉnh qua các bước tương tác chọn lọc.",
    limitations: "Ghi nhận tiềm năng ý tưởng; cần trải nghiệm làm đồ án thực tế tại workshop để hoàn thiện sản phẩm.",
    sourceUrl: "https://iste.org"
  },
  "ISTE-1.5": {
    code: "ISTE 1.5 – Computational Thinker",
    name: "Tư duy Tính toán & Phân rã Vấn đề",
    organization: "International Society for Technology in Education (ISTE)",
    version: "2024–2026 Standards",
    description: "Phát triển và ứng dụng chiến lược để hiểu và giải quyết vấn đề bằng cách tận dụng sức mạnh công nghệ.",
    scope: "Học sinh K-12",
    criteria: "Khả năng phân tích một hệ thống thành các thành phần nhỏ hơn để dễ dàng chế tạo hoặc sửa lỗi.",
    evidence: "Lựa chọn phương án kiểm tra từng phần (dây, pin, cảm biến) khi sản phẩm chưa hoạt động.",
    limitations: "Khám phá phong cách tư duy tự nhiên; không đại diện cho toàn bộ năng lực toán học hay thuật toán nâng cao.",
    sourceUrl: "https://iste.org"
  },
  "NGSS-ETS1": {
    code: "NGSS Engineering Design (ETS1)",
    name: "Tiêu chuẩn Thiết kế Kỹ thuật",
    organization: "Next Generation Science Standards (NGSS)",
    version: "NGSS K-12",
    description: "Xác định tiêu chí và giới hạn của bài toán kỹ thuật, so sánh nhiều phương án thiết kế khả thi.",
    scope: "Tiểu học (3-5-ETS1) & THCS (MS-ETS1)",
    criteria: "Học sinh hiểu rằng một cỗ máy cần có đầu vào (cảm biến), bộ xử lý và đầu ra (chuyển động, đèn báo).",
    evidence: "Phân biệt được nguyên lý hoạt động của robot khi gặp chướng ngại vật.",
    limitations: "Tình huống nhận thức nền tảng; không thay thế cho kiểm tra kỹ thuật phòng thí nghiệm.",
    sourceUrl: "https://nextgenscience.org"
  },
  "RIASEC-FUTURE": {
    code: "RIASEC & Future Me Taxonomy",
    name: "Mô hình Sở thích Hoạt động & Hệ Phân loại TEKY",
    organization: "O*NET Interest Profiler & TEKY Academic Board",
    version: "Future Me Framework",
    description: "Khám phá xu hướng hoạt động tự nhiên (Tạo dựng, Khám phá, Nghệ thuật, Xã hội) kết nối vào 3 bộ môn: Lập trình, Robotics, Multimedia.",
    scope: "Khám phá giáo dục cho học sinh 6–15 tuổi",
    criteria: "Học sinh tự do lựa chọn lĩnh vực khiến mình tò mò mà không bị áp đặt nghề nghiệp tương lai.",
    evidence: "Tổ hợp các lựa chọn thế giới công nghệ, phong cách sáng tạo và balo công cụ ưa thích.",
    limitations: "Sở thích ở lứa tuổi này là tín hiệu khơi gợi trải nghiệm, có thể thay đổi liên tục theo quá trình lớn lên của con.",
    sourceUrl: "https://onetcenter.org"
  },
  "UNESCO-AI": {
    code: "UNESCO AI & Privacy First",
    name: "Đạo đức AI & Bảo vệ Quyền Riêng Tư Trẻ Em",
    organization: "UNESCO & Global Child Privacy Guidelines",
    version: "2024 Recommendation",
    description: "Sử dụng trí tuệ nhân tạo có trách nhiệm, không thu thập dữ liệu sinh trắc học khuôn mặt và chỉ lưu trữ khi gia đình đồng thuận.",
    scope: "Toàn bộ trải nghiệm tạo website AI",
    criteria: "Hệ thống sinh nhân vật minh họa hoạt hình mô phỏng, không dùng ảnh thật; dữ liệu gửi lên mây chỉ khi ba mẹ chủ động đồng ý.",
    evidence: "Phụ huynh tự kiểm soát quyền consent; prompt AI được rà soát không chứa thông tin định danh cá nhân nhạy cảm.",
    limitations: "Google AI Studio là dịch vụ bên thứ ba; phụ huynh và học sinh cùng đồng hành khi dán prompt tạo website.",
    sourceUrl: "https://unesco.org"
  },
  "NLS25-5.2": {
    code: "NLS 5.2 – Sáng tạo Giải pháp Số",
    name: "Khung Năng Lực Số: Đề xuất Giải pháp Công nghệ",
    organization: "Bộ Giáo dục & Đào tạo Việt Nam",
    version: "Khung NLS 2025",
    description: "Sử dụng các công cụ và khái niệm công nghệ số để thiết kế giải pháp cho bài toán thực tiễn.",
    scope: "Tiểu học & THCS",
    criteria: "Học sinh tự chọn mục đích và tính năng có ý nghĩa cho dự án công nghệ của mình.",
    evidence: "Lựa chọn đối tượng thụ hưởng và giải pháp công nghệ cụ thể trong Dream Project Brief.",
    limitations: "Khám phá ý tưởng sáng tạo; cần workshop thực hành để kiểm chứng khả năng hiện thực hóa.",
    sourceUrl: "https://thuvienphapluat.vn"
  },
  "NLS25-5.4": {
    code: "NLS 5.4 – Tự đánh giá & Phát triển Năng lực Số",
    name: "Khung Năng Lực Số: Nhận thức Năng lực Cá nhân",
    organization: "Bộ Giáo dục & Đào tạo Việt Nam",
    version: "Khung NLS 2025",
    description: "Tự nhận thức về sở thích, điểm mạnh và nhu cầu học tập công nghệ của bản thân để định hướng phát triển.",
    scope: "Học sinh phổ thông",
    criteria: "Khả năng tự phản ánh về trải nghiệm thực tế đã từng làm hoặc mong muốn thử sức.",
    evidence: "Học sinh tự tin chia sẻ kinh nghiệm trước đó và thái độ sẵn sàng đón nhận thử thách mới.",
    limitations: "Tự thuật (Self-report) mang tính chủ quan; cần đối chiếu đa chiều cùng phụ huynh và tình huống SIO.",
    sourceUrl: "https://thuvienphapluat.vn"
  },
  "NLS25-4.2": {
    code: "NLS 4.2 – Bảo vệ Dữ liệu Cá nhân & Quyền Riêng Tư",
    name: "Khung Năng Lực Số: Bảo vệ Thông tin & Danh tính Số",
    organization: "Bộ Giáo dục & Đào tạo Việt Nam",
    version: "Khung NLS 2025",
    description: "Hiểu rủi ro khi chia sẻ dữ liệu trực tuyến; biết bảo vệ thông tin nhận dạng cá nhân (PII) trên môi trường số.",
    scope: "Học sinh phổ thông",
    criteria: "Không bắt buộc cung cấp họ tên thật, trường lớp hay ảnh sinh trắc học; phụ huynh nắm quyền kiểm soát dữ liệu.",
    evidence: "Prompt AI được ẩn danh hóa (PII-sanitized) và chỉ lưu trữ khi có sự xác nhận của cha mẹ.",
    limitations: "Đòi hỏi sự đồng hành của phụ huynh khi tương tác với các nền tảng AI công cộng.",
    sourceUrl: "https://thuvienphapluat.vn"
  },
  "NLS25-6.2": {
    code: "NLS 6.2 – Nhận thức về AI & Tự Động Hóa",
    name: "Khung Năng Lực Số: Hiểu biết Trí tuệ Nhân tạo",
    organization: "Bộ Giáo dục & Đào tạo Việt Nam",
    version: "Khung NLS 2025",
    description: "Nhận biết AI là công cụ hỗ trợ con người sáng tạo, không thay thế tư duy và bản sắc cá nhân.",
    scope: "Học sinh K-12",
    criteria: "Học sinh sử dụng AI để tạo website dựa trên chính ý tưởng và nhân vật do mình lựa chọn.",
    evidence: "Sử dụng prompt có cấu trúc rõ ràng để điều khiển công cụ AI sinh trang web cá nhân.",
    limitations: "Trải nghiệm tạo web nhanh bằng AI Studio; chưa bao gồm huấn luyện mô hình máy học sâu.",
    sourceUrl: "https://thuvienphapluat.vn"
  },
  "NLS25-6.3": {
    code: "NLS 6.3 – Đạo đức Sử dụng Trí Tuệ Nhân Tạo",
    name: "Khung Năng Lực Số: Ứng xử Có Trách nhiệm với AI",
    organization: "Bộ Giáo dục & Đào tạo Việt Nam",
    version: "Khung NLS 2025",
    description: "Sử dụng AI một cách trung thực, có trách nhiệm, tôn trọng bản quyền và sự an toàn của cộng đồng.",
    scope: "Học sinh K-12",
    criteria: "Không sao chép nội dung vi phạm, tôn trọng quyền sở hữu trí tuệ và bảo vệ dữ liệu gia đình.",
    evidence: "Bộ quy tắc đạo đức AI được tích hợp trong prompt hướng dẫn học sinh.",
    limitations: "Cần duy trì giám sát của phụ huynh khi con học tập trên môi trường mạng.",
    sourceUrl: "https://thuvienphapluat.vn"
  },
  "ISTE-1.1.a": {
    code: "ISTE 1.1.a – Empowered Learner (Mục tiêu Học tập)",
    name: "Chủ động Thiết lập Mục tiêu Học tập Cá nhân",
    organization: "International Society for Technology in Education (ISTE)",
    version: "2024–2026",
    description: "Học sinh thể hiện sự chủ động khi chọn lĩnh vực, đặt tên dự án và tự xác nhận định hướng mong muốn.",
    scope: "Học sinh K-12",
    criteria: "Học sinh tự ra quyết định về dự án và hồ sơ tương lai của mình thay vì bị áp đặt.",
    evidence: "Hành động xác nhận ước mơ và chủ động chọn avatar đại diện thể hiện cá tính riêng.",
    limitations: "Định hướng sơ khởi cần nuôi dưỡng thông qua việc hoàn thành các sản phẩm thực tế.",
    sourceUrl: "https://iste.org"
  },
  "ISTE-1.1.c": {
    code: "ISTE 1.1.c – Empowered Learner (Tiếp nhận Phản hồi)",
    name: "Tiếp nhận Phản hồi & Tinh chỉnh Định hướng",
    organization: "International Society for Technology in Education (ISTE)",
    version: "2024–2026",
    description: "Học sinh biết lắng nghe góc nhìn từ gia đình và phản hồi từ hệ thống để điều chỉnh kế hoạch học tập.",
    scope: "Học sinh K-12",
    criteria: "Sẵn sàng thảo luận cùng ba mẹ ở bước Family Alignment để tìm tiếng nói chung cho lộ trình học.",
    evidence: "Gia đình và con thống nhất chọn dự án chặng 1 phù hợp với cả sở thích của con và kỳ vọng của cha mẹ.",
    limitations: "Đòi hỏi không khí cởi mở, lắng nghe tôn trọng giữa phụ huynh và con.",
    sourceUrl: "https://iste.org"
  },
  "ISTE-1.2.a": {
    code: "ISTE 1.2.a – Digital Citizen (Danh tính Số An toàn)",
    name: "Xây dựng Danh tính Số Tích cực & An toàn",
    organization: "International Society for Technology in Education (ISTE)",
    version: "2024–2026",
    description: "Học sinh hiểu cách thể hiện bản thân trực tuyến an toàn qua bí danh, avatar đồ họa sáng tạo.",
    scope: "Học sinh K-12",
    criteria: "Khuyến khích dùng tên gọi thân mật / bí danh và ảnh hoạt hình sáng tạo, không dùng ảnh nhận diện nhạy cảm.",
    evidence: "Học sinh lựa chọn ảnh đại diện Kitten Bot hoặc ảnh nhân vật tự tạo thay vì ảnh căn cước.",
    limitations: "Nhận thức công dân số bước đầu, cần rèn luyện liên tục trong kỷ nguyên số.",
    sourceUrl: "https://iste.org"
  },
  "ISTE-1.4.c": {
    code: "ISTE 1.4.c – Innovative Designer (Cải tiến Thiết kế)",
    name: "Thử nghiệm, Lặp lại & Cải tiến Thiết kế",
    organization: "International Society for Technology in Education (ISTE)",
    version: "2024–2026",
    description: "Phát triển, kiểm thử và tinh chỉnh các mẫu thiết kế như một phần của quy trình giải quyết vấn đề mang tính lặp.",
    scope: "Học sinh K-12",
    criteria: "Biết tìm ra điểm chưa hoàn thiện trong mô hình hoặc ứng dụng và đề xuất giải pháp sửa chữa.",
    evidence: "Lựa chọn phương án xử lý khi gặp tình huống sản phẩm hoạt động chưa như ý muốn.",
    limitations: "Tình huống quan sát tư duy; hoàn thiện năng lực qua thực hành dự án Maker/Coding thực tế.",
    sourceUrl: "https://iste.org"
  },
  "ISTE-1.5.c": {
    code: "ISTE 1.5.c – Computational Thinker (Phân rã Bài toán)",
    name: "Phân rã Vấn đề Phức tạp thành Bộ phận Nhỏ",
    organization: "International Society for Technology in Education (ISTE)",
    version: "2024–2026",
    description: "Phân chia các vấn đề phức tạp thành các phần nhỏ hơn để phân tích và tìm ra phương án xử lý khả thi.",
    scope: "Học sinh K-12",
    criteria: "Tư duy bóc tách một hệ thống (game, robot, website) thành các thành phần cấu thành độc lập.",
    evidence: "Học sinh phân biệt được phần cứng, phần mềm, đồ họa và kịch bản hoạt động của sản phẩm.",
    limitations: "Quan sát phản xạ nhận thức; chưa đánh giá kỹ năng kiến trúc phần mềm chuyên sâu.",
    sourceUrl: "https://iste.org"
  },
  "ISTE-1.5.d": {
    code: "ISTE 1.5.d – Computational Thinker (Gỡ lỗi Logic)",
    name: "Tư duy Thuật toán & Gỡ lỗi Hệ thống",
    organization: "International Society for Technology in Education (ISTE)",
    version: "2024–2026",
    description: "Hiểu cách hoạt động của thuật toán và vận dụng quy trình gỡ lỗi tuần tự để sửa chữa sai sót.",
    scope: "Học sinh K-12",
    criteria: "Học sinh kiểm tra từng giả định khi gặp trục trặc thay vì thử mù quáng ngẫu nhiên.",
    evidence: "Học sinh chọn cách cô lập nguyên nhân (kiểm tra dây cắm, kiểm tra khối lệnh, kiểm tra tham số).",
    limitations: "Tình huống trực quan kích thích tư duy giải quyết vấn đề.",
    sourceUrl: "https://iste.org"
  },
  "ISTE-1.6.c": {
    code: "ISTE 1.6.c – Creative Communicator (Truyền tải Ý tưởng)",
    name: "Truyền thông Sáng tạo bằng Công nghệ Số",
    organization: "International Society for Technology in Education (ISTE)",
    version: "2024–2026",
    description: "Giao tiếp rõ ràng và thể hiện bản thân một cách sáng tạo cho các mục đích khác nhau bằng nền tảng số.",
    scope: "Học sinh K-12",
    criteria: "Khả năng mô tả tính năng nổi bật của sản phẩm và câu chuyện truyền cảm hứng phía sau sản phẩm.",
    evidence: "Học sinh tự chọn tên gọi dự án và các tính năng đặc biệt mà sản phẩm đem lại cho cuộc sống.",
    limitations: "Ý tưởng khởi đầu, cần biến thành sản phẩm cụ thể tại workshop công nghệ.",
    sourceUrl: "https://iste.org"
  },
  "FM-INTEREST": {
    code: "FM-INTEREST – Khám phá Sở thích Tự nhiên",
    name: "Chỉ báo Nội bộ: Khám phá Xu hướng Sở thích & Tò mò Công nghệ",
    organization: "Dự án Future Me · TEKY",
    version: "Khung Năng Lực Future Me",
    description: "Chỉ báo nội bộ nhằm quan sát phản xạ tự nhiên của học sinh với các chủ đề công nghệ, không xếp loại hay áp đặt nghề nghiệp.",
    scope: "Tiểu học (Lớp 1–5) & THCS (Lớp 6–9)",
    criteria: "Ghi nhận sự hào hứng tự nhiên của học sinh khi chọn thế giới công nghệ (Lập trình, Robotics, Multimedia).",
    evidence: "Lựa chọn tự nguyện của học sinh ở các bước khám phá sở thích và tình huống đời thường.",
    limitations: "Sở thích lứa tuổi này là gợi ý trải nghiệm, có thể biến chuyển theo thời gian và môi trường sống.",
    sourceUrl: "https://teky.edu.vn"
  },
  "FM-PARENT": {
    code: "FM-PARENT – Bằng chứng Quan sát Gia đình",
    name: "Chỉ báo Quan sát Độc lập từ Cha Mẹ",
    organization: "Dự án Future Me · TEKY",
    version: "Khung Năng Lực Future Me",
    description: "Ghi nhận góc nhìn và quan sát sinh hoạt thực tế của cha mẹ ở nhà: con hay tò mò điều gì, phản ứng ra sao khi gặp khó khăn.",
    scope: "Phụ huynh có con 6–15 tuổi",
    criteria: "Cung cấp góc nhìn bổ trợ khách quan từ gia đình, không dùng để chứng thực đạt chuẩn năng lực hay xếp hạng.",
    evidence: "Phụ huynh chia sẻ hành vi thường thấy ở nhà và mức độ sẵn sàng đồng hành cùng con.",
    limitations: "Dữ liệu quan sát tự nhiên của gia đình, mang giá trị đồng hành và thấu hiểu hơn là khảo thí.",
    sourceUrl: "https://teky.edu.vn"
  },
  "FM-DREAM": {
    code: "FM-DREAM – Phác thảo Ý tưởng Sáng tạo",
    name: "Chỉ báo Phác thảo Dự án Ước mơ Nguyên bản",
    organization: "Dự án Future Me · TEKY",
    version: "Khung Năng Lực Future Me",
    description: "Tổng hợp ý tưởng độc lập của con về sản phẩm công nghệ con muốn tự tay làm ra để giúp ích cho đời sống.",
    scope: "Học sinh Tiểu học & THCS",
    criteria: "Tôn trọng tuyệt đối quyền tác giả ý tưởng của học sinh (Dream Project Brief).",
    evidence: "Hồ sơ dự án gồm tên gọi, mục đích xã hội, tính năng độc đáo và tạo hình nhân vật.",
    limitations: "Bản phác thảo sơ khởi, là kim chỉ nam để con hiện thực hóa qua các đồ án học tập.",
    sourceUrl: "https://teky.edu.vn"
  },
  "FM-ULO-SIO": {
    code: "FM-ULO-SIO – Tình huống Năng lực Thực tế",
    name: "Chỉ báo Tình huống Năng lực Ứng dụng (SIO Evidence)",
    organization: "Dự án Future Me · TEKY",
    version: "Khung Năng Lực Future Me",
    description: "51 tình huống SIO đa dạng theo 17 chuyên ngành giúp học sinh bộc lộ tư duy giải quyết vấn đề một cách tự nhiên.",
    scope: "17 chuyên ngành Lập trình, Robotics, Multimedia",
    criteria: "Quan sát cách học sinh phản xạ khi gặp bài toán thực tế: phân tích nguyên nhân, thử nghiệm giải pháp, đề xuất sáng kiến.",
    evidence: "Câu trả lời và lựa chọn hành vi của học sinh trong tình huống mô phỏng theo chuẩn CSTA & ISTE.",
    limitations: "Tình huống trắc nghiệm và tương tác nhanh, không thay thế cho đánh giá đồ án thực hành tại xưởng.",
    sourceUrl: "https://teky.edu.vn"
  },
  "FM-PATH": {
    code: "FM-PATH – Lộ trình Đồ án Cá nhân hóa",
    name: "Khung Lộ trình Đồ án Thực nghiệm 4 Chặng",
    organization: "Dự án Future Me · TEKY",
    version: "Khung Năng Lực Future Me",
    description: "Chuyển hóa ước mơ và năng lực quan sát được thành lộ trình học tập thực tế: Chặng 1 Khám phá → Chặng 2 Nền tảng → Chặng 3 Đột phá → Chặng 4 Chuyên sâu.",
    scope: "Cá nhân hóa theo độ tuổi và chuyên môn",
    criteria: "Mỗi chặng gắn liền với một sản phẩm thực tế có thể nhìn thấy, chạm vào và chia sẻ cùng ba mẹ.",
    evidence: "Lộ trình động gợi ý môn học, mục tiêu đạt được và tiêu chí kiểm chứng năng lực cụ thể.",
    limitations: "Lộ trình mở, phụ huynh và con hoàn toàn có thể điều chỉnh sau buổi trải nghiệm workshop thực tế.",
    sourceUrl: "https://teky.edu.vn"
  }
};

// Aliases mapping for various formats in stepsConfigV3
const ALIAS_MAP: Record<string, string> = {
  "RIASEC": "RIASEC-FUTURE",
  "CSTA26-ALG": "CSTA-ALGO",
  "CSTA26-ALGO": "CSTA-ALGO",
  "CSTA26-PROG": "CSTA-PROG",
  "CSTA26-SYSTEM": "CSTA-SYS",
  "CSTA26-SYS": "CSTA-SYS",
  "NLS25-3.1": "NLS-3.1",
  "NLS25-3.4": "NLS-3.4",
  "NLS25-5.1": "NLS-5.1",
  "NGSS-K2-ETS1-1": "NGSS-ETS1",
  "NGSS-35-ETS1-2": "NGSS-ETS1",
  "NGSS-MS-ETS1-2": "NGSS-ETS1",
  "UNESCO-AI24": "UNESCO-AI",
  "ISTE-1.4": "ISTE-1.4",
  "ISTE-1.5": "ISTE-1.5"
};

export function resolveStandardCode(rawCode: string): string {
  if (STANDARDS_DB[rawCode]) return rawCode;
  if (ALIAS_MAP[rawCode] && STANDARDS_DB[ALIAS_MAP[rawCode]]) return ALIAS_MAP[rawCode];
  // Check prefix match
  for (const key of Object.keys(STANDARDS_DB)) {
    if (rawCode.startsWith(key) || key.startsWith(rawCode)) return key;
  }
  return rawCode;
}

export function getStandardDetail(code: string): StandardDetail {
  const resolved = resolveStandardCode(code);
  return STANDARDS_DB[resolved] ?? {
    code,
    name: "Chỉ báo năng lực định hướng",
    organization: "Dự án Future Me · TEKY",
    version: "Khung Khám Phá Năng Lực",
    description: "Tiêu chuẩn hướng dẫn thiết kế câu hỏi khám phá năng lực và tư duy công nghệ phù hợp lứa tuổi.",
    scope: "Tiểu học & THCS",
    criteria: "Khám phá phản xạ tự nhiên của học sinh trong tình huống giải quyết vấn đề.",
    evidence: "Lựa chọn hành vi của học sinh trong bài tương tác.",
    limitations: "Dùng để định hướng trải nghiệm học tập, không chẩn đoán hay xếp loại.",
    sourceUrl: "https://teky.edu.vn"
  };
}

/**
 * Returns the most appropriate primary academic standard for display from an array of standardRefs.
 * Prioritizes international and national standards over internal FM codes for external clarity.
 */
export function getPrimaryDisplayStandard(refs: string[] | undefined): string {
  if (!refs || refs.length === 0) return "FM-INTEREST";
  
  // Prefer authoritative standards first: CSTA, ISTE, NLS, RIASEC, UNESCO, NGSS
  const priorityList = [
    (c: string) => c.includes("CSTA"),
    (c: string) => c.includes("ISTE"),
    (c: string) => c.includes("NLS"),
    (c: string) => c.includes("RIASEC"),
    (c: string) => c.includes("UNESCO"),
    (c: string) => c.includes("NGSS"),
    (c: string) => c.startsWith("FM-")
  ];

  for (const matcher of priorityList) {
    const match = refs.find(matcher);
    if (match) return match;
  }

  return refs[0];
}
