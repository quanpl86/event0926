import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, '..', 'src', 'data', 'v3', 'contentV3.json');

const raw = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(raw);

// ==================== PRIMARY BRANCHES REFINEMENT ====================

// 1. game
if (data.branches.primary.game) {
  const b = data.branches.primary.game;
  b.sioInteractions[0].question = "Trong trò chơi, nhân vật muốn mở cánh cửa bí mật thì cần tìm thấy chìa khóa trước. Theo con, điều gì cần xảy ra để nhân vật nhặt được chìa khóa?";
  b.sioInteractions[0].suggestedAnswers = [
    "Cho nhân vật di chuyển chạm vào chìa khóa trên màn hình",
    "Khi chạm vào thì chìa khóa biến mất và hiện thông báo 'Đã nhận chìa khóa'",
    "Phải nhảy vượt qua chướng ngại vật trước rồi mới lấy được chìa khóa"
  ];

  b.sioInteractions[1].question = "Để nhân vật vượt ải nhặt đủ 3 ngôi sao trên đường đi, con sẽ sắp xếp các khối lệnh theo thứ tự như thế nào?";
  b.sioInteractions[1].suggestedAnswers = [
    "Bước 1: Đi tới -> Bước 2: Nhảy lên chạm sao -> Bước 3: Đếm số sao tăng lên 1",
    "Tạo vòng lặp: Mỗi khi chạm vào 1 ngôi sao thì phát tiếng ting ting và cộng điểm",
    "Vẽ đường đi có 3 ngôi sao ở các độ cao khác nhau để người chơi nhảy qua"
  ];

  b.sioInteractions[2].question = "Nếu người chơi điều khiển nhân vật chạm vào chìa khóa rồi nhưng cửa vẫn không chịu mở ra, con sẽ kiểm tra điều gì đầu tiên?";
  b.sioInteractions[2].suggestedAnswers = [
    "Kiểm tra khối lệnh 'Nếu chạm vào cửa và đã có chìa khóa' xem có bị thiếu không",
    "Xem lại biến 'Số lượng chìa khóa' đã được cộng thêm 1 hay chưa",
    "Kiểm tra xem nhân vật đã chạm đúng vào vị trí cánh cửa chưa"
  ];
}

// 2. interactive_app
if (data.branches.primary.interactive_app) {
  const b = data.branches.primary.interactive_app;
  b.sioInteractions[0].question = "Khi làm một ứng dụng học từ vựng tiếng Anh vui nhộn, con muốn màn hình đầu tiên xuất hiện những hình ảnh và nút bấm nào để bạn dễ dùng?";
  b.sioInteractions[0].suggestedAnswers = [
    "Hình ảnh chủ đề sinh động (Động vật, Màu sắc) và nút bấm 'Bắt đầu học'",
    "Một nhân vật hoạt hình chào đón kèm nút chọn mức độ Dễ hoặc Vừa",
    "Danh sách các từ vựng kèm hình minh họa và nút bấm nghe phát âm"
  ];

  b.sioInteractions[1].question = "Khi người dùng bấm chọn một đáp án trong câu đố, con muốn ứng dụng phản hồi lại như thế nào theo thứ tự?";
  b.sioInteractions[1].suggestedAnswers = [
    "Nếu đúng: Hiện dấu tích xanh, phát âm thanh chúc mừng và cộng 1 điểm",
    "Nếu sai: Hiện gợi ý đáp án và cho bạn cơ hội chọn lại lần nữa",
    "Đổi màu nút bấm và tự động chuyển sang câu đố tiếp theo sau 2 giây"
  ];

  b.sioInteractions[2].question = "Nếu người dùng bấm vào nút 'Tiếp tục' mà màn hình không chuyển sang câu hỏi mới, con sẽ kiểm tra điều gì?";
  b.sioInteractions[2].suggestedAnswers = [
    "Kiểm tra khối lệnh 'Khi bấm vào nút Tiếp tục thì đổi sang phông nền mới'",
    "Xem lại nút bấm có bị che khuất hoặc câu hỏi tiếp theo chưa được tải lên không",
    "Chạy thử lại chương trình từ đầu để xem nút bấm có nhận lệnh nhấp chuột không"
  ];
}

// 3. robot_build_and_block_control
if (data.branches.primary.robot_build_and_block_control) {
  const b = data.branches.primary.robot_build_and_block_control;
  b.sioInteractions[0].question = "Chú robot thủ thư giao sách cần có bánh xe di chuyển và khay chở sách. Theo con, mỗi bộ phận này giúp robot hoàn thành công việc thế nào?";
  b.sioInteractions[0].suggestedAnswers = [
    "Bánh xe giúp robot tự chạy trên sàn, còn khay chở giúp giữ sách không bị rơi",
    "Động cơ gắn vào bánh xe để điều khiển hướng đi, khay sách đặt ở giữa để cân bằng",
    "Cần thêm cảm biến phía trước để robot nhận biết khi đến gần kệ sách"
  ];

  b.sioInteractions[1].question = "Giả sử chú robot thủ thư cần chở sách từ bàn đọc đến kệ sách. Theo con, robot cần thực hiện những bước di chuyển nào theo thứ tự để đến đúng nơi?";
  b.sioInteractions[1].suggestedAnswers = [
    "Bước 1: Nhận sách tại bàn -> Bước 2: Đi thẳng theo vạch kẻ -> Bước 3: Dừng trước kệ sách",
    "Đi thẳng 3 bước -> Rẽ phải vào lối đi -> Dừng lại và phát tín hiệu đã đến nơi",
    "Dò theo đường vẽ trên sàn nhà để đi thẳng tới kệ sách mà không va vào bàn ghế"
  ];

  b.sioInteractions[2].question = "Nếu chú robot bị đi lệch khỏi đường đi dự kiến hoặc va vào mép bàn, con sẽ kiểm tra và điều chỉnh như thế nào?";
  b.sioInteractions[2].suggestedAnswers = [
    "Kiểm tra tốc độ của 2 bánh xe xem có bánh nào quay nhanh hơn bánh kia không",
    "Chỉnh lại góc rẽ của robot hoặc gắn thêm cảm biến mắt thần nhận diện vạch kẻ",
    "Chỉnh lại vị trí bánh xe để robot cân bằng hơn trên mặt sàn"
  ];
}

// 4. smart_device_primary
if (data.branches.primary.smart_device_primary) {
  const b = data.branches.primary.smart_device_primary;
  b.sioInteractions[0].question = "Đèn học thông minh muốn tự bật sáng khi phòng bị tối thì cần dùng cảm biến gì để nhận biết? Con hãy chia sẻ suy nghĩ của mình nhé.";
  b.sioInteractions[0].suggestedAnswers = [
    "Dùng cảm biến ánh sáng: Khi phòng tối đi thì cảm biến báo cho đèn tự phát sáng",
    "Dùng cảm biến có thể đo độ sáng, nếu trời tối dưới mức quy định thì đèn tự bật",
    "Gắn thêm cảm biến nhận biết có người ngồi vào bàn học thì mới bật đèn để tiết kiệm điện"
  ];

  b.sioInteractions[1].question = "Khi con đưa tay lại gần thùng rác thông minh, tín hiệu truyền đến động cơ như thế nào để nắp mở ra? Con hãy kể các bước theo thứ tự nhé.";
  b.sioInteractions[1].suggestedAnswers = [
    "Bước 1: Mắt thần cảm biến thấy tay -> Bước 2: Báo mạch xử lý -> Bước 3: Động cơ quay mở nắp",
    "Cảm biến đo khoảng cách dưới 15cm thì kích hoạt mô-tơ kéo nắp thùng rác mở lên",
    "Nắp mở ra trong 3 giây để bỏ rác, sau đó động cơ tự quay ngược lại để đóng nắp"
  ];

  b.sioInteractions[2].question = "Nếu thùng rác không tự mở nắp khi con đưa tay lại gần, con sẽ kiểm tra phần dây cắm, mắt cảm biến hay động cơ trước?";
  b.sioInteractions[2].suggestedAnswers = [
    "Kiểm tra dây cắm nguồn pin xem thùng rác đã có điện hay chưa",
    "Lau sạch bề mặt mắt cảm biến xem có bị bụi che khuất tầm nhìn không",
    "Kiểm tra trục quay động cơ có bị kẹt rác hoặc thanh nối có bị tuột không"
  ];
}

// 5. automation_primary
if (data.branches.primary.automation_primary) {
  const b = data.branches.primary.automation_primary;
  b.sioInteractions[0].question = "Để thanh chắn barie tự động nâng lên hạ xuống thật mượt mà, con sẽ gắn motor vào trục xoay bánh răng như thế nào?";
  b.sioInteractions[0].suggestedAnswers = [
    "Gắn motor vào một bánh răng nhỏ ăn khớp với bánh răng lớn để trợ lực nâng thanh chắn",
    "Gắn thanh chắn trực tiếp vào trục motor servo có thể quay 90 độ nâng lên hạ xuống",
    "Thêm một đối trọng nhẹ ở đuôi thanh chắn để motor nâng lên nhẹ nhàng không tốn sức"
  ];

  b.sioInteractions[1].question = "Con hãy kể thứ tự các bước tự động diễn ra: Khi xe ô tô đến cổng barie -> Cảm biến phát hiện -> Cổng sẽ làm những gì tiếp theo?";
  b.sioInteractions[1].suggestedAnswers = [
    "Bước 1: Cảm biến thấy xe -> Bước 2: Nâng thanh chắn lên -> Bước 3: Xe đi qua -> Bước 4: Hạ thanh chắn xuống",
    "Khi có xe: Bật đèn xanh và mở cổng -> Xe qua an toàn: Đèn đỏ và đóng cổng lại",
    "Nếu xe chưa qua hết mà cổng chuẩn bị hạ thì cảm biến an toàn sẽ giữ cổng mở tiếp"
  ];

  b.sioInteractions[2].question = "Nếu băng chuyền vận chuyển đồ chơi quay chậm hoặc bị kẹt bánh răng, con sẽ kiểm tra điểm nào trước để khắc phục?";
  b.sioInteractions[2].suggestedAnswers = [
    "Kiểm tra xem dây đai cao su có bị trơn tuột hoặc bị chùng không",
    "Xem các bánh răng có bị kẹt vật lạ hoặc các trục xoay có bị ép quá chặt không",
    "Kiểm tra nguồn pin xem motor có đủ điện để kéo đồ vật nặng không"
  ];
}

// 6. design_2d
if (data.branches.primary.design_2d) {
  const b = data.branches.primary.design_2d;
  b.sioInteractions[0].question = "Khi thiết kế một tấm áp phích cổ động tiết kiệm nước sạch, con muốn người xem nhìn thấy hình ảnh nổi bật nào đầu tiên?";
  b.sioInteractions[0].suggestedAnswers = [
    "Một giọt nước trong veo mỉm cười hoặc bàn tay nâng niu giọt nước",
    "Hình ảnh Trái Đất xanh tươi bên cạnh vòi nước được khóa chặt",
    "Một dòng tiêu đề lớn thật to: 'Mỗi giọt nước - Một mầm xanh'"
  ];

  b.sioInteractions[1].question = "Con sẽ sắp xếp hình vẽ chính, tiêu đề và lời nhắn nhủ trên tờ áp phích như thế nào để người đọc nhìn rõ và hiểu nhanh nhất?";
  b.sioInteractions[1].suggestedAnswers = [
    "Tiêu đề to ở trên cùng -> Hình vẽ ấn tượng ở giữa -> Lời kêu gọi hành động ở dưới",
    "Hình ảnh chính thật lớn chiếm trung tâm, chữ ngắn gọn đặt ở góc dễ nhìn",
    "Dùng màu sắc tương phản nổi bật để người đi từ xa cũng đọc được thông điệp"
  ];

  b.sioInteractions[2].question = "Nếu bạn của con nhận xét rằng chữ trên áp phích hơi nhỏ và khó đọc, con sẽ chỉnh sửa lại thế nào mà vẫn giữ được bức tranh đẹp?";
  b.sioInteractions[2].suggestedAnswers = [
    "Tăng cỡ chữ tiêu đề lên to hơn và đổi màu chữ tương phản với nền",
    "Rút ngắn câu chữ lại cho cô đọng, chỉ giữ lại những từ ngữ quan trọng nhất",
    "Tạo thêm một dải viền màu sáng dưới chân chữ để chữ nổi bật trên hình vẽ"
  ];
}

// 7. design_3d
if (data.branches.primary.design_3d) {
  const b = data.branches.primary.design_3d;
  b.sioInteractions[0].question = "Khi dựng mô hình một ngôi nhà 3D từ các khối hình học, con sẽ chọn khối nào làm thân nhà và khối nào làm mái nhà?";
  b.sioInteractions[0].suggestedAnswers = [
    "Khối hộp chữ nhật lớn làm thân nhà, khối lăng trụ tam giác làm mái ngói",
    "Khối lập phương làm phòng khách, khối chóp nhọn làm tháp mái che",
    "Khối trụ tròn làm các cột đỡ hiên nhà và khối dẹt làm sàn nhà"
  ];

  b.sioInteractions[1].question = "Làm thế nào để ghép các khối hình lại với nhau thật khít, cân đối và không bị hở khi xoay nhìn từ nhiều phía?";
  b.sioInteractions[1].suggestedAnswers = [
    "Dùng tính năng bắt dính (snap) để các mặt phẳng của khối chạm khít vào nhau",
    "Xoay camera 3D nhìn từ mặt trước, mặt bên và từ trên xuống để kiểm tra các góc",
    "Căn giữa các khối theo cùng một trục tọa độ để ngôi nhà thẳng hàng cân đối"
  ];

  b.sioInteractions[2].question = "Khi xoay camera nhìn từ mặt bên, con thấy phần mái nhà bị lệch sang một bên. Con sẽ làm thế nào để chỉnh lại cho đều?";
  b.sioInteractions[2].suggestedAnswers = [
    "Chuyển sang góc nhìn thẳng cạnh bên (Side View) để kéo mái nhà về đúng vị trí giữa",
    "Nhập lại thông số tọa độ trục X và Y để mái khớp với thân nhà",
    "Bật lưới tọa độ (Grid) để so sánh khoảng cách hai bên mái nhà cho cân xứng"
  ];
}

// 8. animation_2d
if (data.branches.primary.animation_2d) {
  const b = data.branches.primary.animation_2d;
  b.sioInteractions[0].question = "Để vẽ một đoạn phim hoạt hình chú mèo nhảy lên cao, con nghĩ cần có những tư thế chuyển động chính nào để người xem hiểu?";
  b.sioInteractions[0].suggestedAnswers = [
    "3 tư thế: Chú mèo nhún chân lấy đà -> Bay lên không trung -> Tiếp đất an toàn",
    "Tư thế mèo chuẩn bị nhảy, tư thế vươn dài thân mình trên cao, và tư thế đáp chân xuống sàn",
    "Vẽ thêm chuyển động của chiếc đuôi uốn lượn theo nhịp nhảy của chú mèo"
  ];

  b.sioInteractions[1].question = "Con sẽ sắp xếp các khung hình vẽ chuyển động theo thứ tự thời gian như thế nào để bước nhảy của chú mèo trông mượt mà nhất?";
  b.sioInteractions[1].suggestedAnswers = [
    "Đặt các khung hình lấy đà chậm rãi, khung hình bay vút nhanh, rồi tiếp đất nhịp nhàng",
    "Thêm các khung hình trung gian (Inbetween) giữa lúc nhảy và lúc tiếp đất để không bị giật",
    "Xem thử ở tốc độ 12 hoặc 24 khung hình/giây để kiểm tra độ trơn tru của chuyển động"
  ];

  b.sioInteractions[2].question = "Nếu khi xem thử, con thấy chú mèo nhảy bị giật hoặc biến mất một thoáng giữa màn hình, con sẽ kiểm tra và sửa điều gì?";
  b.sioInteractions[2].suggestedAnswers = [
    "Kiểm tra xem có khung hình nào bị trống hoặc thứ tự các bức vẽ có bị đảo lộn không",
    "Xem lại khoảng cách di chuyển giữa 2 khung hình liền nhau có bị cách xa nhau quá không",
    "Vẽ thêm một nét mờ chuyển động (motion blur) để nối liền 2 vị trí của chú mèo"
  ];
}

// 9. video_and_effects
if (data.branches.primary.video_and_effects) {
  const b = data.branches.primary.video_and_effects;
  b.sioInteractions[0].question = "Khi làm một video ngắn kể về buổi trồng cây xanh ở trường, con muốn cảnh quay nào xuất hiện đầu tiên để gây ấn tượng với người xem?";
  b.sioInteractions[0].suggestedAnswers = [
    "Cảnh các bạn học sinh hào hứng cầm xẻng và xô tưới nước bước vào vườn trường",
    "Cảnh cận cảnh một mầm cây xanh nhỏ bé đang rung rinh trong ánh nắng sớm",
    "Hình ảnh toàn cảnh sân trường rộn rã tiếng cười cùng dòng chữ giới thiệu ý nghĩa"
  ];

  b.sioInteractions[1].question = "Con sẽ ghép nối các cảnh quay, lời kể và tiếng nhạc nền như thế nào để người xem cảm nhận được niềm vui của buổi trồng cây?";
  b.sioInteractions[1].suggestedAnswers = [
    "Xếp cảnh chuẩn bị -> Cảnh tự tay đào đất trồng cây -> Cảnh tưới nước ngắm nhìn thành quả",
    "Để tiếng nói của các bạn rõ ràng ở đoạn đầu, nhạc nền vui tươi vang lên khi cây được trồng xong",
    "Chèn hiệu ứng chuyển cảnh nhẹ nhàng và thêm dòng chữ ghi nhớ thông điệp bảo vệ môi trường"
  ];

  b.sioInteractions[2].question = "Nếu người xem góp ý rằng tiếng nhạc nền hơi to làm lấn át tiếng các bạn nói chuyện, con sẽ chỉnh sửa phần âm thanh như thế nào?";
  b.sioInteractions[2].suggestedAnswers = [
    "Giảm âm lượng của bài nhạc nền xuống khoảng 20-30% khi có người đang nói chuyện",
    "Tăng âm lượng mic thu âm giọng nói của các bạn lên rõ ràng hơn",
    "Sử dụng tính năng tự động hạ nhạc nền (Audio Ducking) mỗi khi xuất hiện lời thoại"
  ];
}


// ==================== SECONDARY BRANCHES REFINEMENT ====================

// 1. game_3d
if (data.branches.secondary.game_3d) {
  const b = data.branches.secondary.game_3d;
  b.sioInteractions[0].question = "Trong một tựa game 3D, khi người chơi cần tìm chìa khóa để mở cổng thoát hiểm, bạn sẽ phân chia cơ chế logic này thành những phần nào?";
  b.sioInteractions[0].suggestedAnswers = [
    "Tách làm 3 module: Nhận diện va chạm chìa khóa, Quản lý túi đồ (Inventory), và Điều kiện mở cổng",
    "Tạo biến trạng thái hasKey = true khi nhặt được và kiểm tra điều kiện này khi nhân vật tương tác với cánh cổng",
    "Thêm hiệu ứng âm thanh và hoạt ảnh nhặt đồ kèm gợi ý hướng dẫn đường đi tới cổng"
  ];

  b.sioInteractions[1].question = "Với điều kiện kép 'Đã có chìa khóa' VÀ 'Đang đứng trong phạm vi tương tác của cổng', thuật toán sẽ quyết định hành vi mở cửa ra sao?";
  b.sioInteractions[1].suggestedAnswers = [
    "Dùng câu lệnh điều kiện IF (hasKey && inRange) THEN kích hoạt animation mở cổng và chuyển màn",
    "Nếu thiếu chìa khóa nhưng đứng gần cổng: Hiện thông báo 'Bạn cần tìm chìa khóa trước'",
    "Khóa tạm thời bàn phím người chơi trong 1 giây để chạy hoạt cảnh mở cửa an toàn"
  ];

  b.sioInteractions[2].question = "Nếu nhân vật bị lỗi đi xuyên qua mép tường ở một góc hẹp, bạn sẽ thực hiện những bước nào để kiểm tra và khắc phục?";
  b.sioInteractions[2].suggestedAnswers = [
    "Kiểm tra lại vùng va chạm (Collider) của bức tường xem có bị hở hoặc quá mỏng hay không",
    "Bật tính năng Continuous Collision Detection trên Rigidbody của nhân vật để tránh xuyên tường khi đi nhanh",
    "Điều chỉnh lại lưới va chạm (Mesh Collider) để bo kín góc tiếp giáp giữa các khối tường"
  ];
}

// 2. desktop_app
if (data.branches.secondary.desktop_app) {
  const b = data.branches.secondary.desktop_app;
  b.sioInteractions[0].question = "Một ứng dụng máy tính dùng để quản lý thư viện sách cần những trường thông tin và chức năng cốt lõi nào?";
  b.sioInteractions[0].suggestedAnswers = [
    "Trường dữ liệu: Tên sách, Tác giả, Thể loại, Năm xuất bản và Trạng thái còn/đã mượn",
    "Chức năng cốt lõi: Tìm kiếm nhanh theo từ khóa, Thêm sách mới và Cập nhật trạng thái",
    "Giao diện phân chia bảng danh sách và biểu mẫu nhập liệu trực quan"
  ];

  b.sioInteractions[1].question = "Khi người dùng nhấn nút 'Thêm sách mới', ứng dụng cần kiểm tra những điều kiện dữ liệu nào trước khi lưu vào hệ thống?";
  b.sioInteractions[1].suggestedAnswers = [
    "Kiểm tra các trường bắt buộc (Tên sách, Mã sách) không được để trống",
    "Kiểm tra mã sách không bị trùng lặp với các đầu sách đã có sẵn trong cơ sở dữ liệu",
    "Định dạng đúng năm xuất bản (là số nguyên hợp lệ và không lớn hơn năm hiện tại)"
  ];

  b.sioInteractions[2].question = "Nếu người dùng phát hiện có hai bản ghi sách bị trùng lặp mã định danh, bạn sẽ truy vết và xử lý như thế nào?";
  b.sioInteractions[2].suggestedAnswers = [
    "Kiểm tra lại logic ràng buộc khóa chính (Primary Key) trong cơ sở dữ liệu để ngăn trùng lặp",
    "Mở cửa sổ xác nhận cho người dùng chọn gộp bản ghi hoặc xóa bản ghi dư thừa",
    "Bổ sung thông báo cảnh báo ngay khi người dùng gõ trùng mã sách đang tồn tại"
  ];
}

// 3. web
if (data.branches.secondary.web) {
  const b = data.branches.secondary.web;
  b.sioInteractions[0].question = "Khi thiết kế một website truyền thông về 'Lối sống xanh', bạn sẽ phân chia bố cục và cấu trúc các thành phần như thế nào?";
  b.sioInteractions[0].suggestedAnswers = [
    "Thanh điều hướng (Navbar) trên cùng -> Banner thông điệp chính -> Lưới thẻ bài viết -> Chân trang (Footer)",
    "Khu vực giới thiệu thử thách sống xanh kèm nút tham gia tương tác nổi bật",
    "Bố cục dạng lưới responsive linh hoạt, tự động co giãn đẹp mắt trên máy tính và điện thoại"
  ];

  b.sioInteractions[1].question = "Khi người dùng hoàn thành một thử thách sống xanh và bấm nút xác nhận, trang web cần cập nhật dữ liệu và giao diện theo quy tắc nào?";
  b.sioInteractions[1].suggestedAnswers = [
    "Cập nhật trạng thái hoàn thành trong LocalStorage hoặc cơ sở dữ liệu và cộng điểm tích lũy",
    "Đổi màu nút bấm thành màu xanh lá kèm biểu tượng dấu tích 'Đã hoàn thành'",
    "Kích hoạt hiệu ứng pháo hoa chúc mừng và cập nhật thanh tiến độ tổng thể"
  ];

  b.sioInteractions[2].question = "Nếu người dùng nhấp đúp chuột liên tục vào nút nhận thưởng làm hệ thống cộng điểm hai lần, bạn sẽ đề xuất cách sửa ra sao?";
  b.sioInteractions[2].suggestedAnswers = [
    "Vô hiệu hóa (disable) nút bấm ngay sau lần click đầu tiên để ngăn bấm nhiều lần",
    "Thêm kỹ thuật Debounce/Throttle trên sự kiện click của nút bấm",
    "Kiểm tra điều kiện ở phía backend/logic: Nếu thử thách đã nhận thưởng rồi thì từ chối cộng thêm"
  ];
}

// 4. smart_device
if (data.branches.secondary.smart_device) {
  const b = data.branches.secondary.smart_device;
  b.sioInteractions[0].question = "Một thiết bị thông minh theo dõi sức khỏe cây cảnh cần thu thập những dữ liệu môi trường nào để đưa ra đánh giá chính xác?";
  b.sioInteractions[0].suggestedAnswers = [
    "Độ ẩm của đất, Cường độ ánh sáng mặt trời và Nhiệt độ môi trường xung quanh",
    "Mức nước còn lại trong bình chứa tự động để nhắc nhở người chăm sóc bổ sung",
    "Tần suất nhận dữ liệu định kỳ mỗi 15 phút một lần để tiết kiệm năng lượng"
  ];

  b.sioInteractions[1].question = "Khi độ ẩm của đất giảm xuống dưới ngưỡng an toàn, thiết bị nên đưa ra phản hồi và hành động cụ thể nào?";
  b.sioInteractions[1].suggestedAnswers = [
    "Nhấp nháy đèn LED màu cam cảnh báo và phát âm thanh 'bíp' ngắn nhắc nhở",
    "Tự động kích hoạt van bơm nước mini tưới cho cây trong 5 giây rồi kiểm tra lại độ ẩm",
    "Gửi thông báo đẩy về ứng dụng di động của người dùng: 'Cây của bạn đang cần thêm nước'"
  ];

  b.sioInteractions[2].question = "Nếu thiết bị liên tục phát chuông báo động dù độ ẩm đất vẫn đang ở mức đủ ẩm, bạn sẽ đặt ra những giả thuyết nào để kiểm tra?";
  b.sioInteractions[2].suggestedAnswers = [
    "Kiểm tra chân cắm cảm biến độ ẩm xem có bị lỏng, oxy hóa hoặc tiếp xúc kém với đất không",
    "Xem lại ngưỡng cài đặt trong code: Có thể ngưỡng cảnh báo đang bị đặt quá cao",
    "Đọc giá trị điện áp thô (analog value) từ cảm biến để kiểm tra xem cảm biến có bị hỏng không"
  ];
}

// 5. automation
if (data.branches.secondary.automation) {
  const b = data.branches.secondary.automation;
  b.sioInteractions[0].question = "Một hệ thống chiếu sáng tự động thông minh cho khu phố cần có những bộ phận và cơ chế điều khiển nào?";
  b.sioInteractions[0].suggestedAnswers = [
    "Cảm biến quang trở đo ánh sáng trời, rơ-le đóng ngắt dòng điện và bộ hẹn giờ thời gian thực",
    "Cảm biến phát hiện chuyển động PIR để tăng độ sáng đèn khi có người hoặc phương tiện đi qua",
    "Mạch điều khiển trung tâm lập trình theo kịch bản: Tối mờ bật 50% công suất, có người bật 100%"
  ];

  b.sioInteractions[1].question = "Nếu người quản lý muốn chuyển sang chế độ bật/tắt thủ công (Manual Override), hệ thống cần ưu tiên xử lý lệnh như thế nào?";
  b.sioInteractions[1].suggestedAnswers = [
    "Lệnh điều khiển thủ công được gán mức ưu tiên cao nhất, tạm ngắt tín hiệu tự động của cảm biến",
    "Hiển thị rõ trạng thái 'Đang điều khiển thủ công' trên bảng điều khiển để tránh nhầm lẫn",
    "Có chế độ tự động khôi phục về lịch trình tự động sau một khoảng thời gian quy định"
  ];

  b.sioInteractions[2].question = "Nếu đèn đường bị hiện tượng nhấp nháy bật tắt liên tục vào lúc hoàng hôn (khi trời chập choạng tối), bạn sẽ khắc phục bằng cách nào?";
  b.sioInteractions[2].suggestedAnswers = [
    "Áp dụng thuật toán trễ (Hysteresis): Ngưỡng bật đèn và ngưỡng tắt đèn phải cách nhau một khoảng",
    "Thêm bộ lọc độ trễ thời gian (Delay): Chỉ bật đèn khi ánh sáng tối liên tục trong 10 giây",
    "Che chắn cảm biến để tránh nhận ánh sáng phản chiếu ngược từ chính bóng đèn khi vừa bật lên"
  ];
}

// 6. connected_system
if (data.branches.secondary.connected_system) {
  const b = data.branches.secondary.connected_system;
  b.sioInteractions[0].question = "Để kết nối trạm quan trắc thời tiết mini gửi dữ liệu nhiệt độ, độ ẩm về màn hình giám sát trung tâm, cần các luồng thông tin nào?";
  b.sioInteractions[0].suggestedAnswers = [
    "Trạm cảm biến đọc dữ liệu -> Đóng gói bản tin JSON/MQTT -> Truyền qua sóng Wi-Fi/Bluetooth -> Màn hình nhận và hiển thị",
    "Thiết lập cơ chế bắt tay kết nối (Handshake) để xác thực trạm cảm biến gửi dữ liệu đúng địa chỉ",
    "Màn hình trung tâm lưu trữ lịch sử dữ liệu vào cơ sở dữ liệu để vẽ biểu đồ diễn biến thời tiết"
  ];

  b.sioInteractions[1].question = "Khi đường truyền mạng bị mất kết nối tạm thời, trạm quan trắc nên xử lý việc lưu trữ dữ liệu như thế nào để không bị mất mát?";
  b.sioInteractions[1].suggestedAnswers = [
    "Tạm thời lưu trữ các bản tin đo được vào bộ nhớ đệm (Flash/EEPROM) tại chỗ của vi điều khiển",
    "Bật đèn báo trạng thái 'Mất mạng' trên thiết bị để người dùng nhận biết",
    "Khi mạng kết nối lại: Tự động gửi đồng bộ các dữ liệu đã lưu trữ trong hàng đợi về máy chủ"
  ];

  b.sioInteractions[2].question = "Nếu dữ liệu nhiệt độ gửi về bị trễ nhiều phút dẫn đến cảnh báo hiển thị sai lệch, bạn sẽ kiểm tra những yếu tố nào?";
  b.sioInteractions[2].suggestedAnswers = [
    "Kiểm tra tốc độ và độ ổn định của đường truyền mạng không dây tại vị trí đặt trạm",
    "Xem lại tần suất gửi dữ liệu có bị quá dày gây nghẽn hàng đợi (Buffer Overflow) hay không",
    "Đo thời gian xử lý của vi điều khiển xem có bị treo vòng lặp trong quá trình đọc cảm biến không"
  ];
}

// 7. design_2d
if (data.branches.secondary.design_2d) {
  const b = data.branches.secondary.design_2d;
  b.sioInteractions[0].question = "Một poster truyền thông kêu gọi giảm rác thải nhựa cần thu hút sự chú ý trong 3 giây đầu tiên. Yếu tố hình ảnh nào nên làm tâm điểm?";
  b.sioInteractions[0].suggestedAnswers = [
    "Hình ảnh tương phản mạnh: Chú rùa biển bị mắc trong túi nilon hoặc chai nhựa biến dạng",
    "Một hình tượng đồ họa độc đáo kèm gam màu xanh dương và cam tương phản ấn tượng",
    "Dòng thông điệp ngắn gọn, sắc bén đặt ở vị trí điểm vàng thị giác 1/3 khung hình"
  ];

  b.sioInteractions[1].question = "Bạn sẽ phân cấp thị giác giữa Tiêu đề chính, Hình ảnh trung tâm và Lời kêu gọi hành động (Call to Action) như thế nào?";
  b.sioInteractions[1].suggestedAnswers = [
    "Mắt người nhìn: Cụm hình ảnh ấn tượng đầu tiên -> Tiêu đề giải thích vấn đề -> Lời kêu gọi hành động ở chân poster",
    "Sử dụng độ đậm nhạt và kích thước chữ khác biệt rõ rệt để dẫn dắt hướng nhìn của mắt",
    "Dành khoảng trống thở (White Space) hợp lý để các yếu tố chính không bị chen chúc, rối mắt"
  ];

  b.sioInteractions[2].question = "Nếu người xem phản hồi rằng họ thấy poster đẹp nhưng chưa hiểu rõ họ cần phải làm gì cụ thể, bạn sẽ điều chỉnh phần nào?";
  b.sioInteractions[2].suggestedAnswers = [
    "Làm nổi bật lời kêu gọi hành động (CTA): Ví dụ 'Mang bình nước cá nhân ngay hôm nay' thay vì khẩu hiệu chung chung",
    "Thêm mã QR quét nhanh dẫn đến cẩm nang sống xanh hoặc bản đồ các điểm đổi rác tái chế",
    "Đơn giản hóa hình ảnh phụ để người xem tập trung trọn vẹn vào thông điệp hành động chính"
  ];
}

// 8. design_3d
if (data.branches.secondary.design_3d) {
  const b = data.branches.secondary.design_3d;
  b.sioInteractions[0].question = "Khi thiết kế mô hình 3D cho một chiếc xe tự hành khám phá sao Hỏa, bạn sẽ phân chia kết cấu của xe thành những cụm chi tiết nào?";
  b.sioInteractions[0].suggestedAnswers = [
    "Cụm thân vỏ chính (Chassis), Cụm hệ thống 6 bánh xe vượt địa hình (Rocker-Bogie), và Cụm cánh tay robot",
    "Tách biệt các khối chức năng: Tấm pin năng lượng mặt trời, Cảm biến radar và Camera quan sát",
    "Tạo các chi tiết theo dạng linh kiện lắp ghép (Modular) để dễ dàng tinh chỉnh và nâng cấp"
  ];

  b.sioInteractions[1].question = "Trong không gian 3D, làm thế nào để đảm bảo các bộ phận của xe cân đối đúng tỉ lệ kỹ thuật và ăn khớp chính xác với nhau?";
  b.sioInteractions[1].suggestedAnswers = [
    "Sử dụng các bản vẽ kỹ thuật 2D (Blueprint) đặt làm hình nền tham chiếu ở các góc chiếu Orthographic",
    "Áp dụng công cụ đo kích thước chính xác và gán ràng buộc hình học (Constraints) giữa các khớp nối",
    "Thiết lập tỷ lệ khung gầm dựa trên kích thước của bánh xe để xe giữ được trọng tâm vững chắc"
  ];

  b.sioInteractions[2].question = "Khi xoay mô hình sang góc nghiêng, bạn phát hiện phần khớp xoay của bánh xe bị hở hoặc lẹm vào thân xe. Bạn sẽ xử lý thế nào?";
  b.sioInteractions[2].suggestedAnswers = [
    "Chuyển sang chế độ xem dây khung (Wireframe) để kiểm tra các điểm đỉnh (Vertex) và đường cạnh (Edge) tiếp giáp",
    "Sử dụng công cụ căn lề (Align) và bắt dính điểm (Vertex Snap) để khóa khớp nối vào đúng tâm xoay",
    "Kiểm tra lại vùng chuyển động (Pivot Point) của bánh xe xem có đặt đúng trục quay hay không"
  ];
}

// 9. animation_2d
if (data.branches.secondary.animation_2d) {
  const b = data.branches.secondary.animation_2d;
  b.sioInteractions[0].question = "Khi diễn hoạt một nhân vật từ trạng thái ngồi đứng bật dậy thể hiện sự ngạc nhiên, bạn cần thiết kế những tư thế chính (Keyframe) nào?";
  b.sioInteractions[0].suggestedAnswers = [
    "3 tư thế chính: Ngồi yên tĩnh -> Nhún người chuẩn bị (Anticipation) -> Đứng vút thẳng dậy vươn hai tay",
    "Tư thế nhún người tạo đà lấy lực, tư thế bật người cực đại (Extreme Pose), và tư thế hãm đà (Overshoot)",
    "Thay đổi biểu cảm khuôn mặt từ thư thả sang mắt mở to ngạc nhiên theo nhịp đứng dậy"
  ];

  b.sioInteractions[1].question = "Bạn sẽ phân bố khoảng cách và thời gian giữa các khung hình trung gian (Inbetween) ra sao để diễn tả đúng lực và cảm xúc giật mình?";
  b.sioInteractions[1].suggestedAnswers = [
    "Áp dụng nguyên lý Giảm tốc / Tăng tốc (Slow In & Slow Out): Động tác lấy đà nhanh và dừng lại có quán tính",
    "Khung hình chuẩn bị nhún người giữ lại vài frame, khung bật dậy chỉ diễn ra trong 2-3 frame thật nhanh",
    "Kéo giãn nhẹ hình thể nhân vật (Squash & Stretch) ở khung hình chuyển động nhanh để tạo cảm giác uyển chuyển"
  ];

  b.sioInteractions[2].question = "Nếu chuyển động của nhân vật khi xem lại bị cảm giác giật cục và thiếu tự nhiên ở đoạn dừng lại, bạn sẽ kiểm tra và tinh chỉnh gì?";
  b.sioInteractions[2].suggestedAnswers = [
    "Kiểm tra đồ thị đường cong chuyển động (Graph Editor) để làm mượt đường cong vận tốc",
    "Thêm 1-2 khung hình dao động nhẹ (Settling) sau khi đứng dậy để tạo độ trễ quán tính tự nhiên",
    "Xem lại khoảng cách di chuyển giữa các frame xem có đoạn nào bị nhảy bước đột ngột không"
  ];
}

// 10. video_and_effects
if (data.branches.secondary.video_and_effects) {
  const b = data.branches.secondary.video_and_effects;
  b.sioInteractions[0].question = "Một video ngắn giới thiệu câu lạc bộ sáng tạo công nghệ cần cuốn hút người xem ngay từ 10 giây đầu tiên. Bạn sẽ lựa chọn mở đầu như thế nào?";
  b.sioInteractions[0].suggestedAnswers = [
    "Một chuỗi các khoảnh khắc gay cấn (Cold Open): Robot lăn bánh, dòng code chạy, nụ cười chiến thắng đập tay",
    "Một câu hỏi gợi mở đầy thử thách: 'Bạn đã từng mơ tự chế tạo một cỗ máy thông minh?' kèm nhạc nền lôi cuốn",
    "Cảnh quay góc nhìn thứ nhất (FPV) lướt qua phòng thí nghiệm hiện đại với ánh đèn LED công nghệ"
  ];

  b.sioInteractions[1].question = "Bạn sẽ phối hợp nhịp dựng cắt cảnh (Pacing), âm thanh hiệu ứng (SFX) và bài nhạc nền như thế nào để tạo mạch cảm xúc cao trào?";
  b.sioInteractions[1].suggestedAnswers = [
    "Cắt chuyển cảnh trùng khớp với nhịp trống (Beat drop) của bài nhạc nền để tạo cảm giác năng động",
    "Chèn hiệu ứng âm thanh nhỏ (Whoosh, Click, Beep) vào đúng thời điểm xuất hiện đồ họa hoặc chữ nổi bật",
    "Xây dựng cấu trúc: Khởi đầu tò mò -> Cao trào thử nghiệm vượt khó -> Kết thúc truyền cảm hứng mạnh mẽ"
  ];

  b.sioInteractions[2].question = "Nếu trong bản dựng thử, nhạc nền lấn át giọng nói của nhân vật và các cảnh cắt quá nhanh khiến người xem không kịp đọc thông tin, bạn sẽ sửa thế nào?";
  b.sioInteractions[2].suggestedAnswers = [
    "Hạ âm lượng bài nhạc nền xuống khoảng -18dB khi có giọng thoại và áp dụng EQ cắt tần số trung",
    "Kéo dài thời lượng hiển thị các khung hình chứa thông tin chữ quan trọng ít nhất 3-4 giây",
    "Thêm phụ đề chữ (Subtitle) có nền viền mờ tương phản để người xem tiện theo dõi ngay cả khi tắt tiếng"
  ];
}

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated all SIO questions and tailored suggestion chips across all 19 branches!');
