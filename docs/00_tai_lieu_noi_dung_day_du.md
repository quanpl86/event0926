# Future Me – Bộ nội dung triển khai V3

> **Trạng thái:** Hoàn thiện nội dung thiết kế và bộ dữ liệu để lập trình, **chưa kiểm định học thuật/thử trên người dùng thật**, chưa chạy WebApp hoặc Google AI Studio trong lượt này. Mây và Nova là dữ liệu giả lập.

## 1. Trải nghiệm được chia thành hai giọng nói

Bản Tiểu học xưng “con”, chọn hình ảnh trước, một việc mỗi lần; bản THCS xưng “bạn”, có ngữ cảnh, lý do và phần đọc sâu. Phụ huynh nhận lời giải thích riêng: điều đang hỏi, thông tin ghi nhận, giới hạn, nguồn tham chiếu. Không để tên ULO/SIO, bảng chuẩn hoặc mã kỹ thuật ở trang của trẻ.

| Thứ tự | Tiểu học | THCS | Mục đích thực tế |
|---:|---|---|---|
| 1 | Làm quen | Khởi tạo hồ sơ | Xác định cấp học và quyền tự chủ, không chấm điểm. |
| 2 | Con thích điều gì? | Khám phá hướng công nghệ | Chọn 1 trong 3 bộ môn và nhánh, không đánh giá kỹ năng. |
| 3 | Sản phẩm trong mơ | Lên ý tưởng dự án | Ghi nhận ước mơ và lý do; các chuẩn ngoài chỉ định hướng nội dung, không chứng nhận đạt. |
| 4 | Con đã biết gì rồi? | Tìm hiểu điểm xuất phát | Thu thập bằng chứng giới hạn từ tình huống, phân biệt tự báo cáo và kết quả tương tác. |
| 5 | Ba mẹ cùng chia sẻ | Gia đình bổ sung thông tin | Nhận xét có ví dụ, không cho phụ huynh chấm chuẩn kỹ thuật. |
| 6 | Hành trình của con | Hồ sơ và lộ trình | Phân tách current/future, truy vết từng nhận định tới dữ liệu và nguồn. |
| 7 | Tạo góc riêng của con | Tạo website cá nhân | Chỉ xuất dữ liệu tối thiểu, không xuất thông tin phụ huynh nhạy cảm. |

## 2. Nội dung chính xác của 20 bước

Các câu dưới đây là **copy giao diện được viết lại từ V2**; ID/mã chỉ để nhóm triển khai theo dõi, không hiện cho học sinh. Mỗi bước dùng tiêu chuẩn tại `01_noi_dung_webapp_hoan_chinh.json`.

### 01. 00-identity
**Tiểu học:** Con muốn Kitten gọi mình là gì?. Chọn tên gọi và lớp của con. Không cần nhập họ tên thật.  **Nút:** Bắt đầu nào!.
**THCS:** Bạn muốn dùng tên nào trên hồ sơ?. Chọn tên hiển thị và lớp. Không cần chia sẻ tên thật hoặc trường học.  **Nút:** Bắt đầu khám phá.
**Ai trả lời:** học sinh. **Thông tin được lưu:** student.displayName, student.grade, educationLevel.

### 02. 01-student-interest
**Tiểu học:** Con thích tạo ra điều gì?. Nhìn ba bức tranh và chọn những điều con muốn thử. Có thể chọn hơn một.  **Nút:** Chọn điều con thích.
**THCS:** Bạn muốn tạo sản phẩm gì?. Chọn những sản phẩm khiến bạn tò mò, kể cả khi bạn chưa từng làm thử.  **Nút:** Lưu lựa chọn.
**Ai trả lời:** học sinh. **Thông tin được lưu:** interest.studentChoices.

### 03. 02-interest-scenarios
**Tiểu học:** Một buổi sáng tạo của con. Nếu được dành cả buổi để làm một sản phẩm, con muốn làm phần nào nhất?  **Nút:** Chọn việc con muốn làm.
**THCS:** Bạn thích phần nào của quá trình sáng tạo?. Giả sử cùng nhóm thực hiện một sản phẩm, bạn muốn đảm nhận công việc nào?  **Nút:** Chọn hoạt động.
**Ai trả lời:** học sinh. **Thông tin được lưu:** interest.studentScenarioPreferences.

### 04. 03-parent-interest
**Tiểu học:** Ba mẹ thấy con thích làm gì?. Trong vài tuần gần đây, con hay tự chọn hoạt động nào? Ba mẹ kể một ví dụ thật nhé.  **Nút:** Gửi lời chia sẻ.
**THCS:** Phụ huynh quan sát điều gì?. Gần đây con chủ động làm hoạt động nào? Hãy nêu một tình huống cụ thể, không cần đánh giá con giỏi hay chưa.  **Nút:** Lưu quan sát.
**Ai trả lời:** phụ huynh. **Thông tin được lưu:** interest.parentObservations.

### 05. 04-domain-choice
**Tiểu học:** Cả nhà chọn điểm đến đầu tiên. Con muốn bắt đầu với lập trình, robot hay sáng tạo hình ảnh? Mình vẫn có thể khám phá hướng khác sau này.  **Nút:** Con chọn hướng này.
**THCS:** Chọn hướng công nghệ muốn khám phá. Xem lại điều bạn chọn và nhận xét từ gia đình. Quyết định hướng thử sức trước; hướng khác vẫn được giữ lại.  **Nút:** Xác nhận hướng khám phá.
**Ai trả lời:** gia đình. **Thông tin được lưu:** technologyDomain, alternativeDomains.

### 06. 05-specialization
**Tiểu học:** Con muốn tạo sản phẩm nào?. Trong thế giới vừa chọn, điều gì làm con muốn bắt tay vào làm nhất?  **Nút:** Chọn sản phẩm.
**THCS:** Bạn muốn đi sâu vào sản phẩm nào?. Trong lĩnh vực đã chọn, bạn muốn xây dựng loại sản phẩm nào?  **Nút:** Chọn nhánh sản phẩm.
**Ai trả lời:** học sinh. **Thông tin được lưu:** specialization.

### 07. 06-dream-purpose
**Tiểu học:** Mình làm sản phẩm này để làm gì?. Con muốn giúp ai? Người đó đang cần điều gì?  **Nút:** Tiếp tục tưởng tượng.
**THCS:** Dự án này giải quyết việc gì?. Hãy nghĩ về người sẽ dùng sản phẩm và điều bạn muốn giúp họ làm tốt hơn.  **Nút:** Tiếp tục.
**Ai trả lời:** học sinh. **Thông tin được lưu:** dreamProject.purpose, dreamProject.audience.

### 08. 07-dream-features
**Tiểu học:** Cho ý tưởng của con thêm phép màu!. Chọn hình dáng, câu chuyện và những việc con muốn sản phẩm làm được.  **Nút:** Xem ý tưởng của con.
**THCS:** Phác họa dự án bạn muốn làm. Chọn tính năng, cách sử dụng, hình thức và mô tả ngắn về trải nghiệm mong muốn.  **Nút:** Xem bản phác thảo.
**Ai trả lời:** học sinh. **Thông tin được lưu:** dreamProject.features, dreamProject.appearance, dreamProject.story.

### 09. 08-dream-confirm
**Tiểu học:** Đây có đúng là ý tưởng của con?. Đặt tên cho dự án. Nếu muốn đổi điều gì, con cứ sửa nhé.  **Nút:** Giữ ý tưởng này.
**THCS:** Chốt ý tưởng của bạn. Đặt tên, đọc lại mục đích và các chức năng. Điều chỉnh trước khi lưu.  **Nút:** Xác nhận ý tưởng.
**Ai trả lời:** học sinh. **Thông tin được lưu:** dreamProject.name, dreamProject.confirmed.

### 10. 09-self-experience
**Tiểu học:** Con đã từng thử làm gì rồi?. Con đã từng vẽ ý tưởng, làm mô hình hay tạo sản phẩm nào? Chưa thử cũng không sao.  **Nút:** Kể về trải nghiệm.
**THCS:** Bạn đã có trải nghiệm nào?. Bạn từng làm, thử sửa, thiết kế hoặc giới thiệu sản phẩm nào? Hãy ghi đúng mức độ bạn tự thực hiện.  **Nút:** Lưu trải nghiệm.
**Ai trả lời:** học sinh. **Thông tin được lưu:** selfReport.priorActivities.

### 11. 10-knowledge-sio
**Tiểu học:** Cùng xem con hiểu thế nào nhé. Xem một tình huống nhỏ và chọn điều con nghĩ sẽ xảy ra. Không cần dùng phần mềm.  **Nút:** Trả lời câu hỏi.
**THCS:** Thử giải thích một tình huống. Đọc tình huống liên quan đến dự án và giải thích cách bạn hiểu vấn đề. Không cần dùng công cụ lập trình.  **Nút:** Gửi câu trả lời.
**Ai trả lời:** học sinh. **Thông tin được lưu:** evidence.knowledge.

### 12. 11-skill-sio
**Tiểu học:** Con thử sắp xếp cách làm nhé. Kéo các tấm thẻ vào thứ tự con muốn làm. Con có thể đổi lại.  **Nút:** Kiểm tra cách làm.
**THCS:** Sắp xếp phương án thực hiện. Sắp các bước hoặc bộ phận thành một cách làm có lý do. Bạn có thể chỉnh sửa trước khi gửi.  **Nút:** Kiểm tra phương án.
**Ai trả lời:** học sinh. **Thông tin được lưu:** evidence.skills.

### 13. 12-problem-sio
**Tiểu học:** Nếu sản phẩm chưa như ý thì sao?. Hãy chọn điều con sẽ kiểm tra hoặc thay đổi đầu tiên, rồi nói vì sao.  **Nút:** Gửi cách của con.
**THCS:** Bạn sẽ xử lý thế nào khi gặp lỗi?. Chọn một giả thuyết, cách kiểm tra và điều bạn sẽ quan sát để biết giải pháp có hiệu quả.  **Nút:** Gửi cách giải quyết.
**Ai trả lời:** học sinh. **Thông tin được lưu:** evidence.problemSolving.

### 14. 13-self-reflection
**Tiểu học:** Điều nào con muốn học thêm?. Con thấy phần nào dễ hình dung? Phần nào con muốn có người giúp?  **Nút:** Hoàn thành phần của con.
**THCS:** Nhìn lại phần mình vừa làm. Điều nào bạn thấy rõ nhất? Kiến thức hoặc kỹ năng nào bạn muốn được hỗ trợ thêm?  **Nút:** Lưu tự nhận xét.
**Ai trả lời:** học sinh. **Thông tin được lưu:** selfReport.reflection, selfReport.supportNeeded.

### 15. 14-parent-competency
**Tiểu học:** Ba mẹ đã thấy con làm được gì?. Ba mẹ nhớ một việc cụ thể con đã thử: con tự làm, làm cùng người khác, hay chưa có dịp thử?  **Nút:** Lưu điều ba mẹ quan sát.
**THCS:** Phụ huynh bổ sung trải nghiệm thực tế. Bạn từng quan sát con làm sản phẩm nào? Con thực hiện độc lập hay có hỗ trợ? Hãy đưa một ví dụ.  **Nút:** Lưu phản hồi.
**Ai trả lời:** phụ huynh. **Thông tin được lưu:** parentEvidence.observations, parentEvidence.examples.

### 16. 15-parent-support
**Tiểu học:** Nhà mình có thể dành bao nhiêu thời gian?. Chọn thời gian mỗi tuần, thiết bị có sẵn và cách ba mẹ muốn đồng hành.  **Nút:** Lưu kế hoạch gia đình.
**THCS:** Chọn điều kiện học phù hợp với gia đình. Gia đình có thể dành bao nhiêu giờ mỗi tuần? Có thể sử dụng thiết bị nào? Ai có thể hỗ trợ khi cần?  **Nút:** Lưu điều kiện.
**Ai trả lời:** phụ huynh. **Thông tin được lưu:** familySupport.timePerWeek, familySupport.devices, familySupport.supportMode.

### 17. 16-family-review
**Tiểu học:** Cả nhà cùng xem lại nhé. Có điều nào con và ba mẹ nhớ khác nhau? Mình giữ cả hai lời kể và thử kiểm chứng trong dự án đầu tiên.  **Nút:** Xác nhận thông tin.
**THCS:** Cùng đối chiếu thông tin. Nếu con và phụ huynh có cách nhớ khác nhau, hãy giữ cả hai và chọn một nhiệm vụ để kiểm chứng sau.  **Nút:** Xác nhận thông tin.
**Ai trả lời:** gia đình. **Thông tin được lưu:** familyReview.conflicts, familyReview.confirmed.

### 18. 17-profile
**Tiểu học:** Con hôm nay và ước mơ mai sau. Xem điều con thích, điều đã thể hiện và ước mơ con muốn hướng tới. Con được đổi mục tiêu.  **Nút:** Xem hành trình của con.
**THCS:** Hồ sơ hiện tại và mục tiêu của bạn. Xem sở thích, những điều đã thể hiện qua tình huống, điều chưa có đủ thông tin và mục tiêu muốn đạt.  **Nút:** Xem kế hoạch phát triển.
**Ai trả lời:** gia đình. **Thông tin được lưu:** currentProfile, futureProfile, evidenceSummary.

### 19. 18-project-roadmap
**Tiểu học:** Bốn chặng để biến ước mơ thành thật. Mỗi chặng có việc nhỏ cần làm, sản phẩm mang về và cách biết mình đã hoàn thành.  **Nút:** Khám phá bốn chặng.
**THCS:** Bốn dự án đưa bạn tới mục tiêu. Xem sản phẩm cần tạo, kiến thức cần học, từng việc phải làm, thời gian và cách kiểm tra kết quả.  **Nút:** Xem lộ trình.
**Ai trả lời:** gia đình. **Thông tin được lưu:** projects, roadmap, milestones.

### 20. 19-privacy-prompt
**Tiểu học:** Mang hành trình của con về nhà. Ba mẹ xem lại thông tin sẽ chia sẻ. Sau đó sao chép lời hướng dẫn để tạo website riêng cho con.  **Nút:** Xem và sao chép lời hướng dẫn.
**THCS:** Tạo website hành trình của bạn. Kiểm tra thông tin cá nhân, xem lại nội dung sẽ đưa sang Google AI Studio rồi sao chép hướng dẫn.  **Nút:** Kiểm tra và sao chép.
**Ai trả lời:** gia đình. **Thông tin được lưu:** prompt.safeProfile, prompt.generated.

## 3. Chọn hướng công nghệ: công bằng giữa ba bộ môn

Cả ba bộ môn phải có bối cảnh cụ thể và hình ảnh tương đương về độ hấp dẫn. Có lựa chọn “Mình chưa biết/ muốn xem thêm”, có thể chọn hai sở thích; con xác nhận hướng chính và có quyền đổi. Người lớn không ghi đè. RIASEC chỉ là tham chiếu định hướng câu hỏi chứ không sinh mã nghề/điểm phù hợp.

### Tiểu học: 7 nhánh sản phẩm

**Trò chơi tương tác** (`game`) – Con tạo thế giới có nhân vật, luật chơi và thử thách.  
Gợi mở sở thích: “Trong một buổi sáng, con thích nghĩ ra luật chơi cho game, chế tạo robot hay kể chuyện bằng hình ảnh?”  
Bước ước mơ: “Con muốn người chơi vui hoặc học được điều gì?”  
Khả năng con có thể hình dung: Nhân vật điều khiển được; Có nhiệm vụ hoặc điểm số; Có màn chơi tiếp theo.

**Ứng dụng tương tác** (`interactive_app`) – Con tạo sản phẩm giúp người khác học, ghi nhớ hoặc khám phá.  
Gợi mở sở thích: “Con muốn tạo ứng dụng giúp bạn học, làm game hay điều khiển robot?”  
Bước ước mơ: “Ai sẽ dùng ứng dụng và họ đang cần điều gì?”  
Khả năng con có thể hình dung: Có nút chọn câu trả lời; Đưa ra gợi ý khi cần; Hiện lời chúc khi hoàn thành.

**Lắp ráp và điều khiển robot** (`robot_build_and_block_control`) – Con tạo robot có thể chuyển động và hoàn thành nhiệm vụ.  
Gợi mở sở thích: “Nếu được tạo một sản phẩm, con thích lắp một chú robot, làm trò chơi hay thiết kế hình ảnh?”  
Bước ước mơ: “Con muốn chú robot giúp ai và làm được việc gì?”  
Khả năng con có thể hình dung: Di chuyển theo đường; Mang vật nhẹ; Dừng khi gặp vật cản.

**Thiết kế hình ảnh 2D** (`design_2d`) – Con kể chuyện và truyền thông điệp bằng hình ảnh phẳng.  
Gợi mở sở thích: “Nếu được trang trí cho ngày hội trường, con thích vẽ một tấm áp phích, làm robot hay lập trình trò chơi?”  
Bước ước mơ: “Con muốn người xem hiểu điều gì khi nhìn hình của con?”  
Khả năng con có thể hình dung: Có hình minh họa chính; Có dòng chữ ngắn dễ đọc; Có màu sắc theo chủ đề.

**Thiết kế mô hình 3D** (`design_3d`) – Con tạo đồ vật và nhân vật có chiều cao, rộng, sâu.  
Gợi mở sở thích: “Con thích tạo đồ vật có thể nhìn từ nhiều phía, vẽ một bức tranh hay lập trình game?”  
Bước ước mơ: “Con muốn mô hình của mình được dùng để làm gì?”  
Khả năng con có thể hình dung: Nhìn được nhiều mặt; Ghép từ các khối; Có màu sắc theo ý tưởng.

**Hoạt hình 2D** (`animation_2d`) – Con kể chuyện bằng những hình vẽ chuyển động.  
Gợi mở sở thích: “Con muốn vẽ một nhân vật rồi làm bạn ấy chuyển động, chế tạo robot hay làm ứng dụng?”  
Bước ước mơ: “Con muốn nhân vật làm gì để kể được câu chuyện?”  
Khả năng con có thể hình dung: Nhân vật biết đi; Có biểu cảm thay đổi; Có đoạn mở đầu và kết thúc.

**Dựng phim và hiệu ứng** (`video_and_effects`) – Con biến hình ảnh, âm thanh và cảnh quay thành câu chuyện.  
Gợi mở sở thích: “Con muốn ghép một video kể chuyện, vẽ poster hay chế tạo robot?”  
Bước ước mơ: “Con muốn người xem thấy điều gì sau khi xem video?”  
Khả năng con có thể hình dung: Có lời dẫn dễ hiểu; Có nhiều cảnh nối tiếp; Có nhạc hoặc hiệu ứng vừa đủ.

### THCS: 10 nhánh sản phẩm

**Thiết kế và lập trình game 3D** (`game_3d`) – Bạn xây dựng một thế giới ba chiều có luật chơi và tương tác.  
Gợi mở sở thích: “Giữa game 3D, ứng dụng quản lý, website, robot và thiết kế hình ảnh, bạn muốn trực tiếp tạo sản phẩm nào?”  
Bước ước mơ: “Bạn muốn người chơi trải nghiệm điều gì và vì sao?”  
Khả năng con có thể hình dung: Nhân vật di chuyển 3D; Có nhiệm vụ và vật cản; Có màn thắng hoặc thua.

**Ứng dụng máy tính** (`desktop_app`) – Bạn tạo ứng dụng giúp người dùng quản lý hoặc xử lý công việc.  
Gợi mở sở thích: “Bạn muốn tạo ứng dụng cho máy tính, một game 3D, website hay sản phẩm khác?”  
Bước ước mơ: “Ứng dụng của bạn sẽ giúp người dùng giải quyết khó khăn nào?”  
Khả năng con có thể hình dung: Nhập và tìm thông tin; Lưu được nội dung; Thống kê đơn giản.

**Thiết kế và lập trình website** (`web`) – Bạn xây dựng website để truyền thông, cung cấp thông tin và tương tác.  
Gợi mở sở thích: “Bạn muốn tạo một website tương tác, game, ứng dụng máy tính hay sản phẩm hình ảnh?”  
Bước ước mơ: “Website này dành cho ai và giúp họ thực hiện việc gì?”  
Khả năng con có thể hình dung: Thẻ nội dung lọc theo chủ đề; Nhiệm vụ có thể đánh dấu; Tiến độ lưu trên thiết bị.

**Thiết bị thông minh** (`smart_device`) – Bạn tạo thiết bị nhận biết tình huống và đưa ra phản hồi.  
Gợi mở sở thích: “Bạn muốn chế tạo thiết bị có cảm biến, hệ thống tự động hay một sản phẩm công nghệ khác?”  
Bước ước mơ: “Thiết bị sẽ nhận biết điều gì và giúp ai?”  
Khả năng con có thể hình dung: Đọc dữ liệu môi trường; Báo hiệu khi vượt ngưỡng; Hiển thị thông tin rõ ràng.

**Hệ thống tự động** (`automation`) – Bạn tạo một quy trình nhận tín hiệu và tự điều khiển thiết bị.  
Gợi mở sở thích: “Bạn muốn hệ thống tự làm một việc lặp lại, tạo thiết bị cảnh báo hay thiết kế sản phẩm khác?”  
Bước ước mơ: “Bạn muốn công việc nào được tự động hóa và vì sao?”  
Khả năng con có thể hình dung: Tự bật hoặc tắt; Có quy tắc theo thời gian; Có chế độ điều khiển bằng tay.

**Hệ thống thiết bị kết nối** (`connected_system`) – Bạn xây giải pháp nhiều bộ phận trao đổi thông tin.  
Gợi mở sở thích: “Bạn muốn kết nối các thiết bị để theo dõi từ xa, làm thiết bị độc lập hay một website?”  
Bước ước mơ: “Bạn muốn nhận thông tin ở đâu và để làm gì?”  
Khả năng con có thể hình dung: Xem dữ liệu từ xa; Nhận thông báo; Có chế độ hoạt động khi mất kết nối.

**Thiết kế 2D** (`design_2d`) – Bạn xây dựng sản phẩm hình ảnh truyền đạt thông điệp cho đúng người xem.  
Gợi mở sở thích: “Bạn thích thiết kế chiến dịch bằng hình ảnh, dựng video, làm mô hình 3D hay một sản phẩm khác?”  
Bước ước mơ: “Bạn muốn khán giả hiểu hoặc làm gì sau khi xem?”  
Khả năng con có thể hình dung: Poster chính; Bộ bài đăng cùng phong cách; Biểu tượng và thông tin ngắn.

**Thiết kế 3D** (`design_3d`) – Bạn phát triển mô hình ba chiều phục vụ câu chuyện hoặc mục đích sử dụng.  
Gợi mở sở thích: “Bạn muốn tạo nhân vật/mô hình 3D, thiết kế poster, phim hoạt hình hay một sản phẩm khác?”  
Bước ước mơ: “Mô hình của bạn được dùng để làm gì và có yêu cầu nào?”  
Khả năng con có thể hình dung: Đúng tỉ lệ giữa các bộ phận; Nhìn tốt từ nhiều phía; Sẵn sàng trình bày hoặc in mẫu.

**Hoạt hình 2D** (`animation_2d`) – Bạn thiết kế chuyển động và kể chuyện bằng hình ảnh theo thời gian.  
Gợi mở sở thích: “Bạn muốn tạo một phim hoạt hình, vẽ bộ poster, dựng video hay xây mô hình 3D?”  
Bước ước mơ: “Câu chuyện của bạn cần người xem cảm nhận điều gì?”  
Khả năng con có thể hình dung: Nhân vật thể hiện cảm xúc; Chuyển động tự nhiên; Có nhịp kể và cao trào.

**Dựng phim và hiệu ứng** (`video_and_effects`) – Bạn kể chuyện qua lựa chọn cảnh, nhịp dựng, tiếng và hiệu ứng.  
Gợi mở sở thích: “Bạn muốn làm video kể chuyện, animation, poster hay sản phẩm 3D?”  
Bước ước mơ: “Bạn muốn video giúp người xem hiểu vấn đề hoặc thay đổi điều gì?”  
Khả năng con có thể hình dung: Có mở đầu gây chú ý; Phỏng vấn hoặc lời dẫn; Có hiệu ứng hỗ trợ câu chuyện.

## 4. Mỗi nhánh có đủ ba tương tác để hiểu điểm xuất phát

Đây là quan sát rất ngắn về điều con trả lời trong tình huống; không phải bài thi công cụ hay chứng nhận đạt chuẩn. Với câu hỏi mở, hệ thống nên giữ phản hồi dạng văn bản/giọng nói và chuyển cho người hướng dẫn khi cần; không chấm tuyệt đối bằng AI hoặc từ khóa.

### Tiểu học – Trò chơi tương tác

**Tình huống 1:** Nhân vật muốn lấy chìa khóa để mở cửa. Con nghĩ cần điều gì xảy ra trước? Con nghĩ sao? Hãy nói cách con làm.  
Điều cần ghi nhận (nội bộ): Sắp xếp hành động theo trình tự. Chỉ báo `FM-P-PRG-SIO-01`, tham chiếu: CSTA26-ALG, NLS25-3.4, ISTE-1.5.d.

**Tình huống 2:** Nhân vật muốn nhặt ba ngôi sao. Con sẽ sắp xếp các bước ra sao? Con nghĩ sao? Hãy nói cách con làm.  
Điều cần ghi nhận (nội bộ): Nhận biết khi nào cần lặp hoặc lựa chọn hành động theo tình huống. Chỉ báo `FM-P-PRG-SIO-02`, tham chiếu: CSTA26-PROG, ISTE-1.5.d.

**Tình huống 3:** Người chơi chạm chìa khóa nhưng cửa không mở. Con muốn kiểm tra điều gì đầu tiên? Con nghĩ sao? Hãy nói cách con làm.  
Điều cần ghi nhận (nội bộ): Nêu cách kiểm tra hành vi chưa đúng. Chỉ báo `FM-P-PRG-SIO-03`, tham chiếu: CSTA26-PROG, NLS25-5.1.

### Tiểu học – Ứng dụng tương tác

**Tình huống 1:** Bạn nhỏ muốn học từ vựng. Con sẽ đưa việc gì lên màn hình đầu? Con nghĩ sao? Hãy nói cách con làm.  
Điều cần ghi nhận (nội bộ): Sắp xếp hành động theo trình tự. Chỉ báo `FM-P-PRG-SIO-01`, tham chiếu: CSTA26-ALG, NLS25-3.4, ISTE-1.5.d.

**Tình huống 2:** Người dùng chọn một đáp án. Điều gì cần xảy ra tiếp theo? Con nghĩ sao? Hãy nói cách con làm.  
Điều cần ghi nhận (nội bộ): Nhận biết khi nào cần lặp hoặc lựa chọn hành động theo tình huống. Chỉ báo `FM-P-PRG-SIO-02`, tham chiếu: CSTA26-PROG, ISTE-1.5.d.

**Tình huống 3:** Nút “Tiếp tục” không chuyển câu hỏi. Con sẽ thử kiểm tra chỗ nào? Con nghĩ sao? Hãy nói cách con làm.  
Điều cần ghi nhận (nội bộ): Nêu cách kiểm tra hành vi chưa đúng. Chỉ báo `FM-P-PRG-SIO-03`, tham chiếu: CSTA26-PROG, NLS25-5.1.

### Tiểu học – Lắp ráp và điều khiển robot

**Tình huống 1:** Robot chở sách cần bánh xe và chỗ đặt sách. Con nghĩ mỗi bộ phận giúp gì? Con nghĩ sao? Hãy nói cách con làm.  
Điều cần ghi nhận (nội bộ): Liên hệ bộ phận robot với chức năng. Chỉ báo `FM-P-ROB-SIO-01`, tham chiếu: CSTA26-SYSTEM, NGSS-35-ETS1-1.

**Tình huống 2:** Từ bàn đến kệ sách, robot cần làm những việc gì theo thứ tự? Con nghĩ sao? Hãy nói cách con làm.  
Điều cần ghi nhận (nội bộ): Mô tả tín hiệu đầu vào → phản hồi đầu ra. Chỉ báo `FM-P-ROB-SIO-02`, tham chiếu: CSTA26-ALG, CSTA26-SYSTEM.

**Tình huống 3:** Robot đi lệch đường. Con sẽ thay đổi một điều gì rồi thử lại thế nào? Con nghĩ sao? Hãy nói cách con làm.  
Điều cần ghi nhận (nội bộ): So sánh hai phương án chỉnh robot theo yêu cầu. Chỉ báo `FM-P-ROB-SIO-03`, tham chiếu: NGSS-35-ETS1-2, ISTE-1.4.a.

### Tiểu học – Thiết kế hình ảnh 2D

**Tình huống 1:** Làm poster tiết kiệm nước. Con muốn mọi người nhìn thấy hình gì đầu tiên? Con nghĩ sao? Hãy nói cách con làm.  
Điều cần ghi nhận (nội bộ): Chọn bố cục/hình ảnh để truyền đạt thông điệp. Chỉ báo `FM-P-MUL-SIO-01`, tham chiếu: ISTE-1.6.c, NLS25-3.1.

**Tình huống 2:** Con sẽ đặt hình và chữ ở đâu để bạn đọc được nhanh? Con nghĩ sao? Hãy nói cách con làm.  
Điều cần ghi nhận (nội bộ): Phác họa hình khối/góc nhìn hoặc trình tự chuyển động theo nhánh. Chỉ báo `FM-P-MUL-SIO-02`, tham chiếu: ISTE-1.4.a, ISTE-1.6.c.

**Tình huống 3:** Bạn nói chữ quá nhỏ. Con sẽ thay đổi gì mà vẫn giữ thông điệp? Con nghĩ sao? Hãy nói cách con làm.  
Điều cần ghi nhận (nội bộ): Giải thích chỉnh sửa theo phản hồi của người xem. Chỉ báo `FM-P-MUL-SIO-03`, tham chiếu: ISTE-1.1.c, NLS25-3.2.

### Tiểu học – Thiết kế mô hình 3D

**Tình huống 1:** Con muốn làm ngôi nhà từ hình khối. Khối nào làm thân nhà? Con nghĩ sao? Hãy nói cách con làm.  
Điều cần ghi nhận (nội bộ): Chọn bố cục/hình ảnh để truyền đạt thông điệp. Chỉ báo `FM-P-MUL-SIO-01`, tham chiếu: ISTE-1.6.c, NLS25-3.1.

**Tình huống 2:** Làm sao ghép các khối để ngôi nhà đứng cân đối và không hở? Con nghĩ sao? Hãy nói cách con làm.  
Điều cần ghi nhận (nội bộ): Phác họa hình khối/góc nhìn hoặc trình tự chuyển động theo nhánh. Chỉ báo `FM-P-MUL-SIO-02`, tham chiếu: ISTE-1.4.a, ISTE-1.6.c.

**Tình huống 3:** Nhìn từ mặt bên thấy mái bị lệch. Con sẽ quan sát và sửa ở đâu? Con nghĩ sao? Hãy nói cách con làm.  
Điều cần ghi nhận (nội bộ): Giải thích chỉnh sửa theo phản hồi của người xem. Chỉ báo `FM-P-MUL-SIO-03`, tham chiếu: ISTE-1.1.c, NLS25-3.2.

### Tiểu học – Hoạt hình 2D

**Tình huống 1:** Chú mèo đứng rồi nhảy. Con cần những hình nào để người xem hiểu? Con nghĩ sao? Hãy nói cách con làm.  
Điều cần ghi nhận (nội bộ): Chọn bố cục/hình ảnh để truyền đạt thông điệp. Chỉ báo `FM-P-MUL-SIO-01`, tham chiếu: ISTE-1.6.c, NLS25-3.1.

**Tình huống 2:** Con sẽ xếp ba khung hình theo thứ tự nào? Con nghĩ sao? Hãy nói cách con làm.  
Điều cần ghi nhận (nội bộ): Phác họa hình khối/góc nhìn hoặc trình tự chuyển động theo nhánh. Chỉ báo `FM-P-MUL-SIO-02`, tham chiếu: ISTE-1.4.a, ISTE-1.6.c.

**Tình huống 3:** Nhân vật trông như biến mất giữa hai hình. Con sẽ sửa điều gì? Con nghĩ sao? Hãy nói cách con làm.  
Điều cần ghi nhận (nội bộ): Giải thích chỉnh sửa theo phản hồi của người xem. Chỉ báo `FM-P-MUL-SIO-03`, tham chiếu: ISTE-1.1.c, NLS25-3.2.

### Tiểu học – Dựng phim và hiệu ứng

**Tình huống 1:** Con muốn kể một buổi trồng cây. Cảnh nào nên xuất hiện đầu tiên? Con nghĩ sao? Hãy nói cách con làm.  
Điều cần ghi nhận (nội bộ): Chọn bố cục/hình ảnh để truyền đạt thông điệp. Chỉ báo `FM-P-MUL-SIO-01`, tham chiếu: ISTE-1.6.c, NLS25-3.1.

**Tình huống 2:** Con sắp ba cảnh thế nào để bạn hiểu câu chuyện? Con nghĩ sao? Hãy nói cách con làm.  
Điều cần ghi nhận (nội bộ): Phác họa hình khối/góc nhìn hoặc trình tự chuyển động theo nhánh. Chỉ báo `FM-P-MUL-SIO-02`, tham chiếu: ISTE-1.4.a, ISTE-1.6.c.

**Tình huống 3:** Bạn xem bảo âm thanh lấn lời kể. Con sẽ sửa thế nào? Con nghĩ sao? Hãy nói cách con làm.  
Điều cần ghi nhận (nội bộ): Giải thích chỉnh sửa theo phản hồi của người xem. Chỉ báo `FM-P-MUL-SIO-03`, tham chiếu: ISTE-1.1.c, NLS25-3.2.

### THCS – Thiết kế và lập trình game 3D

**Tình huống 1:** Người chơi cần tìm chìa khóa rồi mới mở cửa. Bạn sẽ phân chia cơ chế thành những phần nào? Bạn hãy nêu phương án và giải thích ngắn lý do.  
Điều cần ghi nhận (nội bộ): Phân rã tính năng sản phẩm thành các thành phần. Chỉ báo `FM-S-PRG-SIO-01`, tham chiếu: CSTA26-ALG, ISTE-1.5.c.

**Tình huống 2:** Với hai điều kiện có chìa khóa và đứng gần cửa, hành vi mở cửa được quyết định thế nào? Bạn hãy nêu phương án và giải thích ngắn lý do.  
Điều cần ghi nhận (nội bộ): Xây dựng logic điều kiện/trình tự và dự đoán kết quả. Chỉ báo `FM-S-PRG-SIO-02`, tham chiếu: CSTA26-PROG, NLS25-3.4, ISTE-1.5.d.

**Tình huống 3:** Nhân vật đi xuyên tường ở một góc. Bạn sẽ thử những trường hợp nào để tìm nguyên nhân? Bạn hãy nêu phương án và giải thích ngắn lý do.  
Điều cần ghi nhận (nội bộ): Chọn cách thử và lý giải thay đổi nhằm sửa lỗi. Chỉ báo `FM-S-PRG-SIO-03`, tham chiếu: CSTA26-PROG, NLS25-5.1.

### THCS – Ứng dụng máy tính

**Tình huống 1:** Ứng dụng quản lý sách cần những phần thông tin nào? Bạn hãy nêu phương án và giải thích ngắn lý do.  
Điều cần ghi nhận (nội bộ): Phân rã tính năng sản phẩm thành các thành phần. Chỉ báo `FM-S-PRG-SIO-01`, tham chiếu: CSTA26-ALG, ISTE-1.5.c.

**Tình huống 2:** Khi thêm một cuốn sách, bạn cần kiểm tra gì trước khi ghi nhận? Bạn hãy nêu phương án và giải thích ngắn lý do.  
Điều cần ghi nhận (nội bộ): Xây dựng logic điều kiện/trình tự và dự đoán kết quả. Chỉ báo `FM-S-PRG-SIO-02`, tham chiếu: CSTA26-PROG, NLS25-3.4, ISTE-1.5.d.

**Tình huống 3:** Người dùng thấy hai bản ghi trùng. Bạn sẽ kiểm tra dữ liệu và thao tác thế nào? Bạn hãy nêu phương án và giải thích ngắn lý do.  
Điều cần ghi nhận (nội bộ): Chọn cách thử và lý giải thay đổi nhằm sửa lỗi. Chỉ báo `FM-S-PRG-SIO-03`, tham chiếu: CSTA26-PROG, NLS25-5.1.

### THCS – Thiết kế và lập trình website

**Tình huống 1:** Website sống xanh cần trang giới thiệu, thẻ và thử thách. Bạn sẽ chia các thành phần ra sao? Bạn hãy nêu phương án và giải thích ngắn lý do.  
Điều cần ghi nhận (nội bộ): Phân rã tính năng sản phẩm thành các thành phần. Chỉ báo `FM-S-PRG-SIO-01`, tham chiếu: CSTA26-ALG, ISTE-1.5.c.

**Tình huống 2:** Người dùng chọn chủ đề và đánh dấu hoàn thành. Trang web cần phản hồi theo quy tắc gì? Bạn hãy nêu phương án và giải thích ngắn lý do.  
Điều cần ghi nhận (nội bộ): Xây dựng logic điều kiện/trình tự và dự đoán kết quả. Chỉ báo `FM-S-PRG-SIO-02`, tham chiếu: CSTA26-PROG, NLS25-3.4, ISTE-1.5.d.

**Tình huống 3:** Một thử thách bấm hai lần tạo hai huy hiệu. Bạn đề xuất cách kiểm tra và sửa ra sao? Bạn hãy nêu phương án và giải thích ngắn lý do.  
Điều cần ghi nhận (nội bộ): Chọn cách thử và lý giải thay đổi nhằm sửa lỗi. Chỉ báo `FM-S-PRG-SIO-03`, tham chiếu: CSTA26-PROG, NLS25-5.1.

### THCS – Thiết bị thông minh

**Tình huống 1:** Một thiết bị nhắc chăm cây cần thông tin đầu vào nào? Bạn hãy nêu phương án và giải thích ngắn lý do.  
Điều cần ghi nhận (nội bộ): Mô tả luồng cảm biến → xử lý → đầu ra. Chỉ báo `FM-S-IOT-SIO-01`, tham chiếu: CSTA26-SYSTEM, CSTA26-ALG.

**Tình huống 2:** Khi dữ liệu vượt ngưỡng, thiết bị nên phản hồi thế nào? Bạn hãy nêu phương án và giải thích ngắn lý do.  
Điều cần ghi nhận (nội bộ): Nêu tiêu chí, giới hạn khi thiết kế thiết bị thông minh. Chỉ báo `FM-S-IOT-SIO-02`, tham chiếu: NGSS-MS-ETS1-1, NLS25-5.2.

**Tình huống 3:** Thiết bị báo liên tục dù điều kiện bình thường. Bạn sẽ kiểm tra giả thuyết nào? Bạn hãy nêu phương án và giải thích ngắn lý do.  
Điều cần ghi nhận (nội bộ): So sánh giải pháp từ kết quả thử nghiệm được cung cấp. Chỉ báo `FM-S-IOT-SIO-03`, tham chiếu: NGSS-MS-ETS1-2, NGSS-MS-ETS1-3, CSTA26-DATA.

### THCS – Hệ thống tự động

**Tình huống 1:** Một mô hình bật đèn khi tối cần những phần nào? Bạn hãy nêu phương án và giải thích ngắn lý do.  
Điều cần ghi nhận (nội bộ): Mô tả luồng cảm biến → xử lý → đầu ra. Chỉ báo `FM-S-IOT-SIO-01`, tham chiếu: CSTA26-SYSTEM, CSTA26-ALG.

**Tình huống 2:** Nếu người dùng muốn tắt thủ công, quy tắc nào được ưu tiên? Bạn hãy nêu phương án và giải thích ngắn lý do.  
Điều cần ghi nhận (nội bộ): Nêu tiêu chí, giới hạn khi thiết kế thiết bị thông minh. Chỉ báo `FM-S-IOT-SIO-02`, tham chiếu: NGSS-MS-ETS1-1, NLS25-5.2.

**Tình huống 3:** Đèn bật tắt liên tục sát ngưỡng. Bạn muốn kiểm tra và điều chỉnh gì? Bạn hãy nêu phương án và giải thích ngắn lý do.  
Điều cần ghi nhận (nội bộ): So sánh giải pháp từ kết quả thử nghiệm được cung cấp. Chỉ báo `FM-S-IOT-SIO-03`, tham chiếu: NGSS-MS-ETS1-2, NGSS-MS-ETS1-3, CSTA26-DATA.

### THCS – Hệ thống thiết bị kết nối

**Tình huống 1:** Trạm cây xanh gửi nhiệt độ đến bảng theo dõi. Cần các bộ phận và luồng thông tin nào? Bạn hãy nêu phương án và giải thích ngắn lý do.  
Điều cần ghi nhận (nội bộ): Mô tả luồng cảm biến → xử lý → đầu ra. Chỉ báo `FM-S-IOT-SIO-01`, tham chiếu: CSTA26-SYSTEM, CSTA26-ALG.

**Tình huống 2:** Khi đường truyền gián đoạn, hệ thống nên hiển thị hoặc lưu gì? Bạn hãy nêu phương án và giải thích ngắn lý do.  
Điều cần ghi nhận (nội bộ): Nêu tiêu chí, giới hạn khi thiết kế thiết bị thông minh. Chỉ báo `FM-S-IOT-SIO-02`, tham chiếu: NGSS-MS-ETS1-1, NLS25-5.2.

**Tình huống 3:** Dữ liệu đến chậm gây cảnh báo sai. Bạn dự kiến kiểm tra những điểm nào? Bạn hãy nêu phương án và giải thích ngắn lý do.  
Điều cần ghi nhận (nội bộ): So sánh giải pháp từ kết quả thử nghiệm được cung cấp. Chỉ báo `FM-S-IOT-SIO-03`, tham chiếu: NGSS-MS-ETS1-2, NGSS-MS-ETS1-3, CSTA26-DATA.

### THCS – Thiết kế 2D

**Tình huống 1:** Poster giảm rác nhựa phải gây chú ý trong ba giây. Yếu tố nào nên nổi bật? Bạn hãy nêu phương án và giải thích ngắn lý do.  
Điều cần ghi nhận (nội bộ): Đề xuất bố cục/nhịp kể phù hợp người xem và mục tiêu. Chỉ báo `FM-S-MUL-SIO-01`, tham chiếu: ISTE-1.6.c, ISTE-1.6.d, NLS25-3.1.

**Tình huống 2:** Bạn sẽ sắp hình, tiêu đề và lời kêu gọi theo thứ tự nhìn như thế nào? Bạn hãy nêu phương án và giải thích ngắn lý do.  
Điều cần ghi nhận (nội bộ): Phân tích hình khối hoặc chuỗi chuyển động và lựa chọn cách cải tiến. Chỉ báo `FM-S-MUL-SIO-02`, tham chiếu: ISTE-1.4.a, ISTE-1.4.c, NLS25-3.2.

**Tình huống 3:** Người xem hiểu sai thông điệp. Bạn sẽ hỏi lại và chỉnh gì? Bạn hãy nêu phương án và giải thích ngắn lý do.  
Điều cần ghi nhận (nội bộ): Nhận biết cách dùng tư liệu có bản quyền và trình bày ý tưởng nguyên gốc. Chỉ báo `FM-S-MUL-SIO-03`, tham chiếu: ISTE-1.6.b, NLS25-3.3.

### THCS – Thiết kế 3D

**Tình huống 1:** Mô hình xe robot có thân và bánh. Bạn sẽ chia vật thể thành các phần như thế nào? Bạn hãy nêu phương án và giải thích ngắn lý do.  
Điều cần ghi nhận (nội bộ): Đề xuất bố cục/nhịp kể phù hợp người xem và mục tiêu. Chỉ báo `FM-S-MUL-SIO-01`, tham chiếu: ISTE-1.6.c, ISTE-1.6.d, NLS25-3.1.

**Tình huống 2:** Khi thiết kế, làm sao đặt các phần cân đối và đúng vị trí? Bạn hãy nêu phương án và giải thích ngắn lý do.  
Điều cần ghi nhận (nội bộ): Phân tích hình khối hoặc chuỗi chuyển động và lựa chọn cách cải tiến. Chỉ báo `FM-S-MUL-SIO-02`, tham chiếu: ISTE-1.4.a, ISTE-1.4.c, NLS25-3.2.

**Tình huống 3:** Ở góc nhìn cạnh có khoảng hở. Bạn sẽ tìm và khắc phục bằng cách nào? Bạn hãy nêu phương án và giải thích ngắn lý do.  
Điều cần ghi nhận (nội bộ): Nhận biết cách dùng tư liệu có bản quyền và trình bày ý tưởng nguyên gốc. Chỉ báo `FM-S-MUL-SIO-03`, tham chiếu: ISTE-1.6.b, NLS25-3.3.

### THCS – Hoạt hình 2D

**Tình huống 1:** Nhân vật chuyển từ ngồi sang đứng. Bạn cần các tư thế chính nào? Bạn hãy nêu phương án và giải thích ngắn lý do.  
Điều cần ghi nhận (nội bộ): Đề xuất bố cục/nhịp kể phù hợp người xem và mục tiêu. Chỉ báo `FM-S-MUL-SIO-01`, tham chiếu: ISTE-1.6.c, ISTE-1.6.d, NLS25-3.1.

**Tình huống 2:** Bạn sẽ đặt các khung trung gian ra sao để chuyển động dễ hiểu? Bạn hãy nêu phương án và giải thích ngắn lý do.  
Điều cần ghi nhận (nội bộ): Phân tích hình khối hoặc chuỗi chuyển động và lựa chọn cách cải tiến. Chỉ báo `FM-S-MUL-SIO-02`, tham chiếu: ISTE-1.4.a, ISTE-1.4.c, NLS25-3.2.

**Tình huống 3:** Động tác bị giật ở đoạn giữa. Bạn muốn kiểm tra nhịp và hình nào? Bạn hãy nêu phương án và giải thích ngắn lý do.  
Điều cần ghi nhận (nội bộ): Nhận biết cách dùng tư liệu có bản quyền và trình bày ý tưởng nguyên gốc. Chỉ báo `FM-S-MUL-SIO-03`, tham chiếu: ISTE-1.6.b, NLS25-3.3.

### THCS – Dựng phim và hiệu ứng

**Tình huống 1:** Video giới thiệu thư viện cần thu hút trong mười giây đầu. Chọn cảnh nào và vì sao? Bạn hãy nêu phương án và giải thích ngắn lý do.  
Điều cần ghi nhận (nội bộ): Đề xuất bố cục/nhịp kể phù hợp người xem và mục tiêu. Chỉ báo `FM-S-MUL-SIO-01`, tham chiếu: ISTE-1.6.c, ISTE-1.6.d, NLS25-3.1.

**Tình huống 2:** Bạn sẽ ghép ba cảnh, lời dẫn và âm thanh như thế nào cho mạch lạc? Bạn hãy nêu phương án và giải thích ngắn lý do.  
Điều cần ghi nhận (nội bộ): Phân tích hình khối hoặc chuỗi chuyển động và lựa chọn cách cải tiến. Chỉ báo `FM-S-MUL-SIO-02`, tham chiếu: ISTE-1.4.a, ISTE-1.4.c, NLS25-3.2.

**Tình huống 3:** Nhạc át tiếng nói và chuyển cảnh quá nhanh. Bạn muốn đo/quan sát và sửa gì? Bạn hãy nêu phương án và giải thích ngắn lý do.  
Điều cần ghi nhận (nội bộ): Nhận biết cách dùng tư liệu có bản quyền và trình bày ý tưởng nguyên gốc. Chỉ báo `FM-S-MUL-SIO-03`, tham chiếu: ISTE-1.6.b, NLS25-3.3.

## 5. Thư viện 4 dự án theo mỗi nhánh

Đây là các **mẫu có đủ nhiệm vụ và tiêu chí**, không được tự gán cho học sinh chưa chọn. Dự án cụ thể phải được chỉnh theo ý tưởng của con sau khi hỏi xong, không thay tên ước mơ của con. Chưa có số giờ/tuần thì lịch hiển thị “Chưa chốt”, tuyệt đối không tự đặt ngày.

### Tiểu học – Trò chơi tương tác

**P1: Nhân vật của con** – Tạo một nhân vật có thể làm theo các hành động cơ bản.
Việc thực hiện: (1) Vẽ nhân vật và chọn mục tiêu; (2) Tạo những hành động đi, dừng, quay; (3) Cho người khác thử và sửa một điểm.
Sản phẩm: Nhân vật chuyển động theo cách con dự định.  
Cách biết hoàn thành: Người thử có thể điều khiển nhân vật và con nói được điều mình đã sửa.  
Kiến thức cần tìm hiểu: Trình tự hành động.

**P2: Cuộc săn ngôi sao** – Thiết kế luật nhặt vật phẩm và phản hồi cho người chơi.
Việc thực hiện: (1) Vẽ vị trí vật phẩm; (2) Tạo phản hồi khi nhân vật chạm vật phẩm; (3) Thử hai trường hợp rồi sửa lỗi.
Sản phẩm: Trò chơi nhặt vật phẩm có phản hồi.  
Cách biết hoàn thành: Nhặt đúng thì có phản hồi, chạm sai không ghi nhận nhầm.  
Kiến thức cần tìm hiểu: Sự kiện và phản hồi.

**P3: Vượt cửa bí mật** – Kết hợp luật chơi và hai tình huống khác nhau.
Việc thực hiện: (1) Nêu điều kiện mở cửa; (2) Thêm lựa chọn đúng/sai và thử từng cách; (3) Mời bạn chơi và ghi lại góp ý.
Sản phẩm: Màn chơi có thử thách và đích.  
Cách biết hoàn thành: Người chơi hiểu nhiệm vụ, luật mở cửa hoạt động đúng trong tình huống thử.  
Kiến thức cần tìm hiểu: Điều kiện đơn giản.

**P4: Thế giới game của con** – Ghép những phần đã tạo thành game hoàn chỉnh.
Việc thực hiện: (1) Chọn câu chuyện và bố trí màn chơi; (2) Ghép các phần và kiểm tra từ đầu đến cuối; (3) Giới thiệu bản chơi, nhận góp ý và cải tiến.
Sản phẩm: Game ngắn có mở đầu, thử thách, kết thúc.  
Cách biết hoàn thành: Con chơi được từ đầu đến cuối và giải thích một điều đã cải tiến.  
Kiến thức cần tìm hiểu: Thử, sửa và kể lại cách làm.

### Tiểu học – Ứng dụng tương tác

**P1: Ứng dụng đầu tiên** – Phác thảo một màn hình giúp người dùng làm việc nhỏ.
Việc thực hiện: (1) Chọn người dùng và việc cần giúp; (2) Vẽ một màn hình, đặt các nút; (3) Cho người dùng thử cách sử dụng.
Sản phẩm: Sơ đồ và màn hình ứng dụng.  
Cách biết hoàn thành: Người dùng biết bấm đâu và hoàn thành một việc nhỏ.  
Kiến thức cần tìm hiểu: Xác định nhu cầu.

**P2: Câu hỏi vui** – Tạo hoạt động hỏi và nhận phản hồi.
Việc thực hiện: (1) Viết ba câu hỏi phù hợp; (2) Tạo nút chọn và phản hồi cho từng lựa chọn; (3) Thử đáp án đúng/sai.
Sản phẩm: Ứng dụng hỏi–đáp nhỏ.  
Cách biết hoàn thành: Mỗi lựa chọn có phản hồi phù hợp và nội dung dễ hiểu.  
Kiến thức cần tìm hiểu: Trình tự sử dụng.

**P3: Trợ lý học tập** – Tổ chức nội dung thành các bước và gợi ý.
Việc thực hiện: (1) Chia việc học thành ba bước; (2) Thêm nút gợi ý và xem kết quả; (3) Nhờ bạn trải nghiệm và thay đổi.
Sản phẩm: Ứng dụng có các bước và gợi ý.  
Cách biết hoàn thành: Người dùng có thể làm theo từng bước và quay lại khi cần.  
Kiến thức cần tìm hiểu: Phản hồi theo lựa chọn.

**P4: Ứng dụng của riêng con** – Hoàn thiện sản phẩm theo nhu cầu đã chọn.
Việc thực hiện: (1) Chọn các tính năng thực sự cần; (2) Ghép, kiểm tra và chỉnh sửa; (3) Giới thiệu sản phẩm và nhận góp ý.
Sản phẩm: Ứng dụng tương tác hoàn chỉnh ở phạm vi nhỏ.  
Cách biết hoàn thành: Người dùng hoàn thành được mục đích chính và con nêu một thay đổi sau khi thử.  
Kiến thức cần tìm hiểu: Kiểm tra trải nghiệm.

### Tiểu học – Lắp ráp và điều khiển robot

**P1: Xe giao sách mini** – Làm một mẫu xe chở vật nhẹ và quan sát độ ổn định.
Việc thực hiện: (1) Vẽ xe và chọn chỗ đặt sách; (2) Lắp mẫu, thử trên sàn phẳng; (3) Sửa một chi tiết và kể lý do.
Sản phẩm: Xe mẫu và hình ảnh trước/sau.  
Cách biết hoàn thành: Xe di chuyển được với vật mẫu an toàn; con chỉ ra chức năng hai bộ phận.  
Kiến thức cần tìm hiểu: Cấu tạo và chức năng.

**P2: Robot đi đúng đường** – Giúp robot đi từ điểm bắt đầu đến điểm nhận sách.
Việc thực hiện: (1) Vẽ tuyến đường và xếp thẻ chỉ dẫn; (2) Tạo các bước điều khiển theo tuyến; (3) Thử ba lần, quan sát và chỉnh.
Sản phẩm: Robot và sơ đồ đường đi.  
Cách biết hoàn thành: Robot đến đích ít nhất một lần ở điều kiện đã chọn; con giải thích trình tự.  
Kiến thức cần tìm hiểu: Đầu vào – phản hồi – đầu ra.

**P3: Robot biết dừng** – Thiết kế cách dừng trước vật cản hoặc mô phỏng tín hiệu.
Việc thực hiện: (1) Nêu vị trí vật cản và cách dừng an toàn; (2) Tạo phản hồi từ tín hiệu hoặc nút mô phỏng; (3) Thử ba lượt, ghi lại điều chỉnh.
Sản phẩm: Video đường chạy và nhật ký thử.  
Cách biết hoàn thành: Robot dừng theo tín hiệu có sẵn; phần mô phỏng được ghi rõ, không nhận là cảm biến thật.  
Kiến thức cần tìm hiểu: Trình tự điều khiển.

**P4: Thủ Thư Nhí** – Ghép các chức năng khả thi thành robot thư viện mô phỏng.
Việc thực hiện: (1) Chốt tiêu chí thành công và bản phác thảo; (2) Ghép các chức năng đã thử được; (3) Trình diễn, lấy góp ý và cải tiến.
Sản phẩm: Robot mẫu, video trình diễn và lời giải thích.  
Cách biết hoàn thành: Con trình diễn được chức năng đã làm thật và phân biệt chức năng dự kiến.  
Kiến thức cần tìm hiểu: Thử nghiệm và cải tiến.

### Tiểu học – Thiết kế hình ảnh 2D

**P1: Thông điệp bằng một hình** – Tạo hình chính thể hiện một ý tưởng.
Việc thực hiện: (1) Chọn điều muốn nói và người xem; (2) Vẽ ba phác thảo nhỏ, chọn một; (3) Hỏi người khác xem họ hiểu gì.
Sản phẩm: Phác thảo hình minh họa.  
Cách biết hoàn thành: Người xem nhận ra ý chính mà không cần giải thích dài.  
Kiến thức cần tìm hiểu: Người xem và thông điệp.

**P2: Tấm áp phích rõ ràng** – Kết hợp hình, chữ, màu theo thứ tự dễ nhìn.
Việc thực hiện: (1) Viết câu ngắn và chọn hình; (2) Sắp vị trí và thử kích cỡ chữ; (3) Nhờ một bạn xem, sửa điều khó đọc.
Sản phẩm: Áp phích hoàn chỉnh.  
Cách biết hoàn thành: Thông điệp đọc rõ, hình ảnh hỗ trợ nội dung.  
Kiến thức cần tìm hiểu: Bố cục và tương phản.

**P3: Bộ hình đồng nhất** – Tạo ba hình cùng chủ đề có phong cách chung.
Việc thực hiện: (1) Chọn bảng màu và kiểu hình; (2) Thiết kế ba hình với bố cục khác nhau; (3) Kiểm tra sự thống nhất và chỉnh.
Sản phẩm: Bộ ba hình cùng chủ đề.  
Cách biết hoàn thành: Các hình dễ nhận biết cùng bộ và có thông điệp riêng.  
Kiến thức cần tìm hiểu: Màu sắc có chủ đích.

**P4: Bộ tranh kể chuyện** – Hoàn thiện bộ hình mang thông điệp đến cộng đồng.
Việc thực hiện: (1) Chọn câu chuyện và người xem; (2) Ghép bộ hình và phần giới thiệu; (3) Trưng bày, lấy góp ý, điều chỉnh.
Sản phẩm: Bộ tranh và lời giới thiệu.  
Cách biết hoàn thành: Người xem hiểu ý chính; con giải thích được thay đổi sau phản hồi.  
Kiến thức cần tìm hiểu: Góp ý và chỉnh sửa.

### Tiểu học – Thiết kế mô hình 3D

**P1: Bộ sưu tập hình khối** – Khám phá hình khối và các góc nhìn.
Việc thực hiện: (1) Quan sát ba đồ vật và chỉ khối cơ bản; (2) Ghép một đồ vật từ hai–ba khối; (3) Xoay nhìn các phía và sửa chỗ lệch.
Sản phẩm: Một đồ vật ba chiều nhỏ.  
Cách biết hoàn thành: Mô hình có hình dáng nhận ra được ở nhiều góc nhìn.  
Kiến thức cần tìm hiểu: Hình khối và không gian.

**P2: Ngôi nhà nhỏ** – Tạo công trình bằng các bộ phận có tỉ lệ hợp lý.
Việc thực hiện: (1) Phác mặt trước và mặt bên; (2) Ghép thân, mái, cửa và màu; (3) Xem từ ba góc và chỉnh các phần.
Sản phẩm: Ngôi nhà ba chiều.  
Cách biết hoàn thành: Các phần chính đúng vị trí, mô hình ổn định ở hình thức đã chọn.  
Kiến thức cần tìm hiểu: Các góc nhìn.

**P3: Nhân vật của con** – Tạo nhân vật 3D có nét riêng.
Việc thực hiện: (1) Vẽ hai góc nhìn và chọn đặc điểm; (2) Ghép đầu, thân, chân và phụ kiện; (3) Kiểm tra tỉ lệ và chỉnh.
Sản phẩm: Nhân vật 3D.  
Cách biết hoàn thành: Nhân vật có đủ bộ phận chính, thể hiện ý tưởng từ nhiều phía.  
Kiến thức cần tìm hiểu: Tỉ lệ và vị trí.

**P4: Thế giới mô hình** – Ghép một bối cảnh hoàn chỉnh để trưng bày.
Việc thực hiện: (1) Chọn chủ đề và bố trí vật thể; (2) Tạo các đồ vật rồi sắp bối cảnh; (3) Cho người khác xem và sửa.
Sản phẩm: Mô hình bối cảnh 3D.  
Cách biết hoàn thành: Các vật thể bố trí có mục đích, con mô tả được sự thay đổi.  
Kiến thức cần tìm hiểu: Xem, sửa và trình bày.

### Tiểu học – Hoạt hình 2D

**P1: Ba khung hình đầu tiên** – Kể một hành động đơn giản qua hình nối tiếp.
Việc thực hiện: (1) Chọn hành động và vẽ ba tư thế; (2) Sắp thứ tự hình; (3) Cho người khác xem và giải thích.
Sản phẩm: Dải ba khung hình.  
Cách biết hoàn thành: Người xem nhận ra hành động và thứ tự hợp lý.  
Kiến thức cần tìm hiểu: Trình tự khung hình.

**P2: Nhân vật chuyển động** – Tạo đoạn chuyển động ngắn liên tục.
Việc thực hiện: (1) Chọn điểm bắt đầu và kết thúc; (2) Thêm các hình trung gian; (3) Xem lại nhịp và sửa chỗ giật.
Sản phẩm: Đoạn hoạt hình ngắn.  
Cách biết hoàn thành: Hành động được nhận ra và chuyển động có sự nối tiếp.  
Kiến thức cần tìm hiểu: Biểu cảm và chuyển động.

**P3: Một câu chuyện nhỏ** – Ghép các hành động thành câu chuyện có ý nghĩa.
Việc thực hiện: (1) Viết ba ý: mở đầu, sự việc, kết thúc; (2) Thiết kế các cảnh và chuyển động; (3) Thử với người xem và chỉnh.
Sản phẩm: Phim hoạt hình ngắn.  
Cách biết hoàn thành: Người xem kể lại được câu chuyện theo thứ tự.  
Kiến thức cần tìm hiểu: Nhịp kể chuyện.

**P4: Bộ phim đầu tay** – Hoàn thiện chuyện, âm thanh và lời giới thiệu phù hợp.
Việc thực hiện: (1) Chọn cảnh cần giữ và bỏ; (2) Ghép cảnh, kiểm tra hình và tiếng; (3) Chiếu thử và sửa một điểm.
Sản phẩm: Bộ phim 2D và phần giới thiệu.  
Cách biết hoàn thành: Phim có mở đầu–kết thúc, nội dung dễ hiểu và ghi nguồn tư liệu nếu có.  
Kiến thức cần tìm hiểu: Xem lại và chỉnh sửa.

### Tiểu học – Dựng phim và hiệu ứng

**P1: Câu chuyện ba cảnh** – Lập thứ tự các cảnh quay.
Việc thực hiện: (1) Chọn chủ đề và người xem; (2) Vẽ hoặc quay ba cảnh cần có; (3) Sắp cảnh, kể lại câu chuyện.
Sản phẩm: Bản kể ba cảnh.  
Cách biết hoàn thành: Người xem hiểu mở đầu, việc chính và kết thúc.  
Kiến thức cần tìm hiểu: Kịch bản và cảnh quay.

**P2: Video rõ lời** – Kết hợp hình và âm thanh dễ theo dõi.
Việc thực hiện: (1) Chuẩn bị lời dẫn ngắn; (2) Ghép cảnh và âm thanh; (3) Nghe thử và sửa độ rõ.
Sản phẩm: Video ngắn có lời dẫn.  
Cách biết hoàn thành: Nghe rõ ý chính, hình và lời không mâu thuẫn.  
Kiến thức cần tìm hiểu: Trình tự và nhịp dựng.

**P3: Hiệu ứng có mục đích** – Dùng chuyển cảnh và chữ để hỗ trợ thông điệp.
Việc thực hiện: (1) Chọn điểm chuyển cần thiết; (2) Thêm nhãn và hiệu ứng vừa phải; (3) Mời bạn xem, lược bỏ chi tiết gây rối.
Sản phẩm: Bản dựng có hiệu ứng.  
Cách biết hoàn thành: Hiệu ứng hỗ trợ câu chuyện, không che khuất nội dung chính.  
Kiến thức cần tìm hiểu: Âm thanh và tính dễ hiểu.

**P4: Phim ngắn của con** – Xuất bản riêng tư một phim có đủ thông điệp.
Việc thực hiện: (1) Chốt kịch bản và danh sách cảnh; (2) Hoàn thiện hình, tiếng và chú thích; (3) Chiếu thử, kiểm tra quyền sử dụng tư liệu.
Sản phẩm: Phim ngắn và lời giới thiệu.  
Cách biết hoàn thành: Người xem hiểu nội dung; tư liệu phù hợp và con kể được lần sửa sau phản hồi.  
Kiến thức cần tìm hiểu: Sử dụng tư liệu có trách nhiệm.

### THCS – Thiết kế và lập trình game 3D

**P1: Bản thiết kế thế giới** – Xác định mục tiêu người chơi và bố cục không gian.
Việc thực hiện: (1) Viết một tình huống chơi và cách thắng; (2) Vẽ sơ đồ khu vực, nhân vật và vật cản; (3) Nhờ bạn thử bản giấy, cập nhật luật.
Sản phẩm: Tài liệu ý tưởng và sơ đồ màn chơi.  
Cách biết hoàn thành: Người thử hiểu mục tiêu và ít nhất một điều chỉnh được lý giải.  
Kiến thức cần tìm hiểu: Không gian và thiết kế màn chơi.

**P2: Nhân vật khám phá** – Tạo màn chơi cho phép nhân vật di chuyển và quan sát.
Việc thực hiện: (1) Thiết kế đường đi và camera; (2) Tạo thế giới đơn giản và chuyển động; (3) Kiểm tra va chạm, ghi lỗi và sửa.
Sản phẩm: Màn chơi di chuyển được.  
Cách biết hoàn thành: Nhân vật đi tới đích mà không xuyên vật cản chính trong các ca thử.  
Kiến thức cần tìm hiểu: Trạng thái và sự kiện.

**P3: Luật chơi và thử thách** – Phát triển nhiệm vụ có điều kiện và phản hồi.
Việc thực hiện: (1) Mô tả quy tắc vật phẩm–cửa–đích; (2) Triển khai chức năng và thông báo; (3) Thử điều kiện đúng/sai, sửa lỗi.
Sản phẩm: Một màn chơi có luật.  
Cách biết hoàn thành: Các điều kiện hoạt động theo quy tắc và kết quả thử được ghi lại.  
Kiến thức cần tìm hiểu: Va chạm, điều kiện, vòng lặp.

**P4: Game 3D của bạn** – Ghép, tối ưu ở mức cần thiết và trình bày bản chơi.
Việc thực hiện: (1) Chốt phạm vi bản thử; (2) Tích hợp màn chơi, giao diện, âm thanh phù hợp; (3) Cho người khác trải nghiệm và điều chỉnh.
Sản phẩm: Game 3D bản trình diễn.  
Cách biết hoàn thành: Chơi được hành trình chính, có hướng dẫn, báo cáo lỗi và một vòng cải tiến.  
Kiến thức cần tìm hiểu: Kiểm thử và phản hồi.

### THCS – Ứng dụng máy tính

**P1: Hiểu người dùng** – Mô tả tình huống và chức năng cần có.
Việc thực hiện: (1) Phỏng vấn giả định người dùng và liệt kê nhu cầu; (2) Vẽ sơ đồ màn hình, luồng sử dụng; (3) Cho một bạn đọc và sửa chức năng khó hiểu.
Sản phẩm: Bản mô tả và phác thảo giao diện.  
Cách biết hoàn thành: Luồng chính rõ ràng, phạm vi sản phẩm cụ thể.  
Kiến thức cần tìm hiểu: Phân tích nhu cầu.

**P2: Giao diện thao tác** – Tạo ứng dụng có nhập và phản hồi dữ liệu tạm.
Việc thực hiện: (1) Xác định ô nhập, nút và thông báo; (2) Tạo màn hình, xử lý thao tác; (3) Thử nhập thiếu/sai, sửa phản hồi.
Sản phẩm: Ứng dụng giao diện chạy được.  
Cách biết hoàn thành: Người dùng thực hiện thao tác chính và được thông báo khi nhập chưa phù hợp.  
Kiến thức cần tìm hiểu: Luồng sự kiện và kiểm tra đầu vào.

**P3: Quản lý dữ liệu** – Tổ chức dữ liệu, tìm và cập nhật hợp lý.
Việc thực hiện: (1) Thiết kế các trường thông tin tối thiểu; (2) Thêm xem sửa xóa và tìm kiếm; (3) Kiểm tra trùng và khôi phục dữ liệu.
Sản phẩm: Ứng dụng quản lý thông tin.  
Cách biết hoàn thành: Thực hiện được chu trình dữ liệu, dữ liệu mẫu không chứa thông tin cá nhân.  
Kiến thức cần tìm hiểu: Cấu trúc dữ liệu và lưu trữ.

**P4: Ứng dụng hoàn thiện** – Tích hợp tính năng và hướng dẫn sử dụng.
Việc thực hiện: (1) Chốt các chức năng bắt buộc; (2) Ghép giao diện, dữ liệu và kiểm thử; (3) Cho người khác sử dụng, sửa và viết hướng dẫn.
Sản phẩm: Ứng dụng máy tính và hướng dẫn.  
Cách biết hoàn thành: Có bản chạy được, thao tác chính ổn định với các tình huống kiểm tra.  
Kiến thức cần tìm hiểu: Thử nghiệm và hướng dẫn.

### THCS – Thiết kế và lập trình website

**P1: Bản đồ ý tưởng và phác thảo** – Làm rõ người xem và bố trí các khu vực.
Việc thực hiện: (1) Nêu ba nhu cầu người dùng không lấy thông tin cá nhân; (2) Vẽ trang và luồng xem trên điện thoại, máy tính; (3) Mời hai người thử bản phác, thay đổi một điểm.
Sản phẩm: Sơ đồ trang, bản phác và phản hồi.  
Cách biết hoàn thành: Người thử tìm được thử thách; có ít nhất một điều chỉnh có lý do.  
Kiến thức cần tìm hiểu: Nhu cầu và cấu trúc trang.

**P2: Website xanh rõ ràng** – Xây các trang và thẻ nội dung dễ đọc.
Việc thực hiện: (1) Chuyển bản phác thành các khu vực; (2) Tạo dữ liệu minh họa và các thẻ; (3) Kiểm tra hai cỡ màn hình, sửa chỗ tràn.
Sản phẩm: Website có giao diện nhiều trang hoặc khu vực.  
Cách biết hoàn thành: Điều hướng rõ, nội dung đọc được trên hai màn hình đã chọn.  
Kiến thức cần tìm hiểu: Bố cục và tính dễ sử dụng.

**P3: Thử thách có tương tác** – Thêm bộ lọc và trạng thái hoàn thành.
Việc thực hiện: (1) Mô tả trạng thái khi lọc và đánh dấu; (2) Phát triển tương tác, phản hồi người dùng; (3) Thử bấm nhiều lần và không có dữ liệu.
Sản phẩm: Bản website có thể lọc và ghi trạng thái.  
Cách biết hoàn thành: Một thử thách không bị tính trùng và trạng thái khớp thao tác.  
Kiến thức cần tìm hiểu: Tương tác và trạng thái.

**P4: Hành Tinh Xanh hoàn chỉnh** – Tích hợp, lưu tiến độ và giới thiệu sản phẩm.
Việc thực hiện: (1) Chốt chức năng và kiểm tra quyền riêng tư; (2) Lưu trạng thái trên thiết bị, chuẩn bị sao lưu; (3) Mời thử, sửa và giới thiệu bản hoàn thiện.
Sản phẩm: Website bản trình diễn và tài liệu ngắn.  
Cách biết hoàn thành: Có thể khôi phục dữ liệu mẫu sau tải lại/nhập sao lưu, nêu rõ giới hạn lưu cục bộ.  
Kiến thức cần tìm hiểu: Lưu dữ liệu, kiểm thử và riêng tư.

### THCS – Thiết bị thông minh

**P1: Vấn đề cần giải quyết** – Xác định nhu cầu, tiêu chí và giới hạn của thiết bị.
Việc thực hiện: (1) Chọn tình huống thực tế và người dùng; (2) Định nghĩa thông tin đầu vào và kết quả mong muốn; (3) So sánh hai ý tưởng theo tiêu chí.
Sản phẩm: Bản mô tả giải pháp và sơ đồ.  
Cách biết hoàn thành: Tiêu chí thành công đo/quan sát được, chỉ ra giới hạn nguồn lực.  
Kiến thức cần tìm hiểu: Cảm biến–xử lý–đầu ra.

**P2: Đọc và phản hồi** – Xây nguyên mẫu nhận tín hiệu và phản hồi.
Việc thực hiện: (1) Lập sơ đồ tín hiệu và phản hồi; (2) Kết nối thiết bị ở mức an toàn với người hướng dẫn; (3) Thử các trường hợp và ghi dữ liệu.
Sản phẩm: Nguyên mẫu đầu vào–đầu ra.  
Cách biết hoàn thành: Thiết bị phản hồi đúng với ít nhất hai tình huống đã kiểm tra.  
Kiến thức cần tìm hiểu: Tiêu chí và giới hạn.

**P3: Cảnh báo thông minh** – Xây quy tắc cảnh báo và giảm báo sai.
Việc thực hiện: (1) Định nghĩa ngưỡng/điều kiện; (2) Tạo logic thông báo và chỉ báo; (3) Thử dữ liệu biên, phân tích báo sai.
Sản phẩm: Bản demo cảnh báo.  
Cách biết hoàn thành: Phân biệt được hai tình huống và giải thích một cải tiến sau thử nghiệm.  
Kiến thức cần tìm hiểu: Điều kiện điều khiển.

**P4: Thiết bị của bạn** – Hoàn thiện nguyên mẫu và hướng dẫn sử dụng an toàn.
Việc thực hiện: (1) Chốt trường hợp sử dụng và điều kiện an toàn; (2) Tích hợp các chức năng đã thử; (3) Trình diễn, lấy phản hồi, sửa.
Sản phẩm: Thiết bị demo và nhật ký thử.  
Cách biết hoàn thành: Đạt tiêu chí thử đã chọn, không tuyên bố chức năng chưa kiểm chứng.  
Kiến thức cần tìm hiểu: Thử nghiệm và an toàn mạch.

### THCS – Hệ thống tự động

**P1: Quy trình hiện tại** – Phân tích việc cần tự động và trường hợp người dùng can thiệp.
Việc thực hiện: (1) Quan sát quy trình thủ công giả định; (2) Vẽ sơ đồ các trạng thái; (3) Nêu tiêu chí và rủi ro.
Sản phẩm: Sơ đồ quy trình.  
Cách biết hoàn thành: Thể hiện được tình huống hoạt động và cách người dùng dừng.  
Kiến thức cần tìm hiểu: Quy trình và trạng thái.

**P2: Mạch phản hồi** – Tạo hệ thống đáp ứng tín hiệu ở mức an toàn.
Việc thực hiện: (1) Chọn đầu vào–đầu ra phù hợp; (2) Làm nguyên mẫu cùng hướng dẫn an toàn; (3) Thử ít nhất hai tình huống.
Sản phẩm: Nguyên mẫu tự động.  
Cách biết hoàn thành: Phản hồi đúng với tình huống mô phỏng hoặc thiết bị đã có.  
Kiến thức cần tìm hiểu: Tín hiệu và điều khiển.

**P3: Điều khiển tin cậy** – Giải quyết xung đột giữa tự động và điều khiển tay.
Việc thực hiện: (1) Thiết kế quy tắc ưu tiên; (2) Tạo chế độ thủ công và tự động; (3) Thử trạng thái biên, sửa vấn đề.
Sản phẩm: Bản demo hai chế độ.  
Cách biết hoàn thành: Có thể chuyển chế độ rõ ràng và tránh hành vi lặp ngoài ý muốn ở ca thử.  
Kiến thức cần tìm hiểu: Ưu tiên và trường hợp biên.

**P4: Mô hình tự động hoàn chỉnh** – Tổng hợp quy trình và trình diễn theo tiêu chí an toàn.
Việc thực hiện: (1) Kiểm tra lại sơ đồ và điều kiện giới hạn; (2) Tích hợp các bộ phận; (3) Trình diễn, lưu dữ liệu thử và cải tiến.
Sản phẩm: Hệ thống demo và tài liệu.  
Cách biết hoàn thành: Chạy được quy trình đã chọn, có cách dừng và giải thích rủi ro còn lại.  
Kiến thức cần tìm hiểu: Thử nghiệm an toàn.

### THCS – Hệ thống thiết bị kết nối

**P1: Hành trình dữ liệu** – Mô tả nơi dữ liệu được tạo, gửi và xem.
Việc thực hiện: (1) Nêu người dùng và thông tin tối thiểu; (2) Vẽ luồng cảm biến–thiết bị–màn hình; (3) Xem lại giới hạn quyền riêng tư và nguồn lực.
Sản phẩm: Sơ đồ hệ thống.  
Cách biết hoàn thành: Nêu đúng luồng dữ liệu, chỗ cần kiểm tra và rủi ro thông tin.  
Kiến thức cần tìm hiểu: Luồng dữ liệu.

**P2: Trạm dữ liệu** – Thu nhận và hiển thị thông tin trên thiết bị hoặc mạng thử nghiệm.
Việc thực hiện: (1) Lựa chọn tín hiệu và cách hiển thị; (2) Tạo nguyên mẫu với người hướng dẫn; (3) Đối chiếu giá trị gửi/nhận qua ca thử.
Sản phẩm: Bản demo đọc và hiển thị.  
Cách biết hoàn thành: Dữ liệu mẫu hiển thị phù hợp ca thử; không gửi thông tin cá nhân.  
Kiến thức cần tìm hiểu: Kết nối và trạng thái.

**P3: Kết nối ổn định** – Xử lý tình huống mất hoặc chậm kết nối.
Việc thực hiện: (1) Nêu các trạng thái kết nối; (2) Thiết kế thông báo và dự phòng đơn giản; (3) Thử ngắt kết nối rồi phục hồi.
Sản phẩm: Bản demo các trạng thái.  
Cách biết hoàn thành: Người xem không nhầm dữ liệu cũ là dữ liệu mới; trạng thái được hiển thị.  
Kiến thức cần tìm hiểu: Cập nhật dữ liệu.

**P4: Hệ thống kết nối của bạn** – Tích hợp và đánh giá một kịch bản thực tế.
Việc thực hiện: (1) Chốt tiêu chí chức năng và riêng tư; (2) Ghép dữ liệu, hiển thị và cảnh báo; (3) Trình diễn với dữ liệu giả, sửa.
Sản phẩm: Hệ thống kết nối bản thử.  
Cách biết hoàn thành: Có luồng dữ liệu hoạt động trong điều kiện đã kiểm tra, giới hạn được nêu rõ.  
Kiến thức cần tìm hiểu: Bảo vệ thông tin và kiểm thử.

### THCS – Thiết kế 2D

**P1: Ý tưởng truyền thông** – Xác định thông điệp và đối tượng.
Việc thực hiện: (1) Chọn người xem và hành động mong muốn; (2) Tìm hình ảnh chủ đạo và phác thảo; (3) Thử người xem nhận ra thông điệp gì.
Sản phẩm: Bản định hướng thiết kế.  
Cách biết hoàn thành: Thông điệp và người xem được nêu rõ, có thay đổi từ phản hồi.  
Kiến thức cần tìm hiểu: Thông điệp và khán giả.

**P2: Poster chính** – Tạo bố cục rõ, màu sắc có chủ đích.
Việc thực hiện: (1) Lập sơ đồ thứ tự nhìn; (2) Thiết kế hình và chữ với tương phản; (3) Kiểm tra đọc ở hai kích thước.
Sản phẩm: Poster kỹ thuật số.  
Cách biết hoàn thành: Thông điệp và lời kêu gọi dễ nhận ra ở hai cách xem.  
Kiến thức cần tìm hiểu: Thứ tự thị giác.

**P3: Bộ thiết kế đồng nhất** – Tạo bộ hình phù hợp nhiều nơi hiển thị.
Việc thực hiện: (1) Chốt nguyên tắc màu, chữ, hình; (2) Tạo ba phiên bản phù hợp mục đích; (3) So sánh tính nhất quán, sửa.
Sản phẩm: Bộ hình nhiều định dạng.  
Cách biết hoàn thành: Các hình có nhận diện chung và nội dung thích hợp vị trí đăng.  
Kiến thức cần tìm hiểu: Tương phản và tính nhất quán.

**P4: Chiến dịch của bạn** – Hoàn thiện một bộ sản phẩm có thuyết minh.
Việc thực hiện: (1) Chọn hình cuối và kiểm tra nguồn tư liệu; (2) Xuất bộ thiết kế và lời giải thích; (3) Cho người xem thử, đánh giá và điều chỉnh.
Sản phẩm: Bộ thiết kế và bản trình bày.  
Cách biết hoàn thành: Thông điệp nhất quán, nguồn tư liệu được ghi và có cải tiến rõ.  
Kiến thức cần tìm hiểu: Bản quyền và phản hồi.

### THCS – Thiết kế 3D

**P1: Bản vẽ nhiều góc** – Làm rõ vật thể và hình khối chính.
Việc thực hiện: (1) Nêu công dụng, kích thước tương đối; (2) Vẽ mặt trước và bên; (3) So sánh hai góc và chỉnh chỗ chưa khớp.
Sản phẩm: Bản phác hai góc.  
Cách biết hoàn thành: Cùng một vật thể được mô tả nhất quán giữa các góc.  
Kiến thức cần tìm hiểu: Hình khối và tỉ lệ.

**P2: Mô hình khối cơ bản** – Dựng khối chính với vị trí, tỉ lệ phù hợp.
Việc thực hiện: (1) Phân tách vật thể thành bộ phận; (2) Ghép khối và căn vị trí; (3) Kiểm tra ba góc và sửa.
Sản phẩm: Mô hình ba chiều đầu tiên.  
Cách biết hoàn thành: Các phần chính đúng vị trí, không có lỗi rõ trong các góc kiểm tra.  
Kiến thức cần tìm hiểu: Góc nhìn và bố cục 3D.

**P3: Chi tiết và chất liệu** – Bổ sung đặc điểm có lý do thay vì trang trí ngẫu nhiên.
Việc thực hiện: (1) Chọn chi tiết thể hiện công dụng; (2) Hoàn thiện màu và bề mặt; (3) So sánh với bản phác, chỉnh.
Sản phẩm: Mô hình có chi tiết và màu.  
Cách biết hoàn thành: Chi tiết giúp nhận biết sản phẩm, cấu trúc vẫn rõ ràng.  
Kiến thức cần tìm hiểu: Cấu trúc bộ phận.

**P4: Mô hình hoàn chỉnh** – Chuẩn bị mô hình để sử dụng hoặc trưng bày.
Việc thực hiện: (1) Kiểm tra kích thước, bố trí và mục tiêu; (2) Chuẩn bị bản xuất phù hợp nhu cầu; (3) Trưng bày, nhận phản hồi và cải tiến.
Sản phẩm: Mô hình và hình ảnh các góc.  
Cách biết hoàn thành: Mô hình thể hiện đúng thiết kế và người xem xác nhận được các đặc điểm chính.  
Kiến thức cần tìm hiểu: Kiểm tra và hoàn thiện.

### THCS – Hoạt hình 2D

**P1: Câu chuyện bằng khung hình** – Viết câu chuyện ngắn bằng bản vẽ liên tiếp.
Việc thực hiện: (1) Chọn thông điệp và nhân vật; (2) Vẽ bảng cảnh có đầu–giữa–cuối; (3) Đọc thử bằng hình, sửa đoạn khó hiểu.
Sản phẩm: Bảng cảnh.  
Cách biết hoàn thành: Người xem hiểu mạch chuyện mà không cần lời giải thích dài.  
Kiến thức cần tìm hiểu: Bố cục thời gian.

**P2: Bài chuyển động đầu tiên** – Xây chuyển động có tư thế chính và khung nối.
Việc thực hiện: (1) Chọn hai tư thế chính; (2) Tạo hình trung gian và thời lượng; (3) Xem thử và chỉnh chỗ giật.
Sản phẩm: Đoạn chuyển động ngắn.  
Cách biết hoàn thành: Chuyển động liên tục theo chủ ý, có ghi điều đã sửa.  
Kiến thức cần tìm hiểu: Tư thế chính, khung nối.

**P3: Nhân vật biết kể chuyện** – Ghép biểu cảm, hành động và bố cục cảnh.
Việc thực hiện: (1) Xác định cảm xúc từng cảnh; (2) Tạo biểu cảm và hành động tương ứng; (3) Thử nhịp và phản hồi người xem.
Sản phẩm: Một cảnh kể chuyện hoàn chỉnh.  
Cách biết hoàn thành: Người xem nhận ra cảm xúc và sự kiện chính.  
Kiến thức cần tìm hiểu: Biểu cảm và nhịp.

**P4: Phim 2D của bạn** – Hoàn thiện phim ngắn có âm thanh phù hợp.
Việc thực hiện: (1) Chọn bản dựng và kiểm tra nguồn âm/hình; (2) Ghép các cảnh, tiếng và tiêu đề; (3) Chiếu thử, ghi nhận và chỉnh.
Sản phẩm: Phim 2D, bảng cảnh, nhật ký.  
Cách biết hoàn thành: Nội dung nhất quán, tư liệu hợp lệ và có ít nhất một lần cải tiến.  
Kiến thức cần tìm hiểu: Nguồn tư liệu và kiểm thử.

### THCS – Dựng phim và hiệu ứng

**P1: Ý tưởng và kịch bản** – Xác định thông điệp, người xem và kế hoạch cảnh.
Việc thực hiện: (1) Viết mục tiêu và đề cương ba phần; (2) Vẽ bảng cảnh và lịch quay; (3) Nhờ người xem góp ý trước khi quay.
Sản phẩm: Kịch bản và danh sách cảnh.  
Cách biết hoàn thành: Mạch truyện rõ ràng và kế hoạch có thể thực hiện với nguồn lực sẵn có.  
Kiến thức cần tìm hiểu: Thông điệp và kịch bản.

**P2: Bản dựng thô** – Chọn và nối cảnh tạo nội dung có đầu–cuối.
Việc thực hiện: (1) Chọn tư liệu phù hợp và kiểm tra quyền dùng; (2) Ghép cảnh theo bảng cảnh; (3) Xem thử và bỏ cảnh thừa.
Sản phẩm: Video bản dựng đầu tiên.  
Cách biết hoàn thành: Người xem hiểu câu chuyện theo trình tự đã chọn.  
Kiến thức cần tìm hiểu: Nhịp và nối cảnh.

**P3: Âm thanh và hiệu ứng** – Bổ sung tiếng và hiệu ứng với mục đích rõ.
Việc thực hiện: (1) Xác định nơi cần lời, nhạc hoặc hiệu ứng; (2) Cân tiếng và chuyển cảnh; (3) Xem trên hai thiết bị, sửa chỗ khó nghe/nhìn.
Sản phẩm: Video có tiếng và hiệu ứng.  
Cách biết hoàn thành: Lời chính nghe rõ, hiệu ứng không làm rối thông điệp.  
Kiến thức cần tìm hiểu: Âm thanh/hiệu ứng.

**P4: Phim hoàn chỉnh** – Xuất bản riêng tư, thu phản hồi và cải tiến.
Việc thực hiện: (1) Kiểm tra bản quyền và thông tin cá nhân; (2) Hoàn thiện chú thích và xuất bản riêng; (3) Chiếu thử, sửa và trình bày lựa chọn dựng.
Sản phẩm: Phim ngắn và nhật ký dựng.  
Cách biết hoàn thành: Video đạt mục đích truyền đạt, tư liệu hợp lệ, có phản hồi và lần sửa.  
Kiến thức cần tìm hiểu: Quyền riêng tư, bản quyền, phản hồi.

## 6. Phụ huynh: hỏi đúng điều có thể quan sát

**Lúc chọn sở thích:** “Gần đây con tự chọn hoạt động sáng tạo gì? Ba mẹ nhớ một lần cụ thể không? Nếu chưa quan sát được, chọn Chưa rõ.” Không hỏi phụ huynh con đã đạt chuẩn hay giỏi bộ môn nào.

**Sau khi con hình dung dự án và trả lời tình huống:** “Ba mẹ đã từng thấy con làm sản phẩm tương tự chưa? Con tự làm phần nào, ai giúp và phần nào con chưa thử?” Giữ lời kể hai bên riêng biệt.

**Điều kiện đồng hành:** “Gia đình có thể dành khoảng bao nhiêu giờ mỗi tuần? Con có thiết bị gì sẵn có? Ai có thể cùng con xem lại sản phẩm?” Không suy ra năng lực từ thiết bị.

**Khi khác biệt:** “Con và ba mẹ nhớ khác nhau về mức độ tự thực hiện. Mình sẽ thử một nhiệm vụ nhỏ ở dự án đầu để hiểu rõ hơn.”

## 7. Tên gọi, trạng thái và cách giải thích kết quả

| Viết trong hệ thống | Viết cho gia đình |
|---|---|
| ULO / SIO | Điều con đang tập làm / Điều chúng mình muốn quan sát |
| Current Me | Điều con đã thể hiện hôm nay |
| Future Me | Điều con muốn làm được |
| Dream Project Brief | Bản phác thảo sản phẩm con mơ ước |
| Rubric / acceptance | Làm sao biết mình đã hoàn thành? |
| Evidence | Sản phẩm, ảnh, lời kể hoặc đường dẫn |
| Skill gap | Điều con cần tìm hiểu thêm |
| Roadmap | Bản đồ hành trình / Kế hoạch từng bước |
| insufficient evidence | Chưa đủ thông tin |

**Câu an toàn mặc định:** “Qua tình huống vừa rồi, con đã ...”; “Theo điều ba mẹ quan sát ...”; “Con kể rằng ...”; “Phần này mình sẽ thử tiếp trong dự án đầu.” Không viết “con giỏi nhất”, “chắc chắn phù hợp”, “đạt chuẩn CSTA/ISTE”, hoặc tạo phần trăm nghề nghiệp.

## 8. Cửa sổ xem cơ sở tham chiếu

Bên cạnh mỗi bước có nút phù hợp độ tuổi: trẻ “Vì sao mình hỏi câu này?”, THCS “Vì sao có câu hỏi này?”, phụ huynh “Xem cơ sở tham chiếu”. Nội dung mở ra: tình huống và mục đích → loại thông tin ghi nhận → tên chuẩn/bộ tiêu chí và tổ chức nguồn → mã chi tiết (nếu có, tách nội bộ/ngoài) → giới hạn kết luận → đường dẫn gốc. Các chuẩn trong bảng registry chưa được đơn vị nguồn chứng nhận áp dụng cho Future Me. Đặc biệt CSTA-2026-ALG/PROG/SYSTEM/DATA là mã nhóm **nội bộ**, không phải mã grade-level chính thức.

## 9. Báo cáo kết quả và website sinh ra

Có hai mặt của hồ sơ: “Điều con đã thể hiện” chỉ hiển thị thông tin có ghi nguồn, và “Điều con muốn làm được” là mục tiêu; không dùng ảnh dự án minh họa như bằng chứng đã hoàn thành. Mỗi gia đình nhận 4 dự án nối tiếp, có 3 việc/dự án, sản phẩm, cách tự kiểm tra, loại minh chứng, tiến độ, timeline chỉ khi biết nguồn lực. Công cụ học tập chỉ xuất hiện sau khi có hướng đã chọn và yêu cầu dự án, không hỏi hay chấm con sử dụng phần mềm nào.

### Ví dụ kiểm thử đã có

- **Mây, lớp 4:** robot Thủ Thư Nhí; 4 chặng với mốc minh họa 12 tuần và 2 giờ/tuần. Từ câu trả lời ngắn có thể nói con nêu được bộ phận, trình tự và ý tưởng thử lại; không khẳng định con tự lắp robot thật.
- **Nova, lớp 7:** Hành Tinh Xanh; 4 chặng với mốc minh họa 16 tuần và 3 giờ/tuần. Bạn đã mô tả tình huống phân chia trang, lọc nội dung, tránh trùng; chưa xác minh tự làm được website.

## 10. Về tính đầy đủ và giới hạn

**Nội dung sẵn sàng cho đội xây dựng:** 20 bước với 2 phiên bản lời dẫn; 17 nhánh sản phẩm; mỗi nhánh có 3 tình huống và 4 dự án gồm 3 nhiệm vụ; liên kết tham chiếu, quy tắc phản hồi, hai hồ sơ giả định và prompt chi tiết.

**Chưa được coi là hoàn thành triển khai thực tế:** đối sánh mã CSTA theo từng lớp, danh mục ULO/SIO chính thức của chương trình, thẩm định chuyên gia, thử với trẻ và phụ huynh thật, kiểm tra giao diện WebApp sống, Google AI Studio, bảo mật backend. Không gán “đã kiểm định” hay “sẵn sàng chứng nhận”.
