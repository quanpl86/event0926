# Future Me — Bộ nội dung hoàn chỉnh V3

Mục đích: dùng làm đầu vào triển khai WebApp hoạt động khám phá giữa học sinh và phụ huynh. Đây là hoàn thiện NỘI DUNG, không phải sản phẩm WebApp đã được viết/chạy, không phải công cụ đánh giá chuẩn hóa.

## Đọc theo thứ tự

- `00_tai_lieu_noi_dung_day_du.md`: nội dung giao diện, lời dẫn 20 bước, bối cảnh tất cả nhánh, câu hỏi và 4 dự án cho mỗi nhánh.
- `01_noi_dung_webapp_hoan_chinh.json`: dữ liệu có cấu trúc dùng để render, 20 bước × 2 cấp học, 17 nhánh sản phẩm, 51 tương tác tình huống, 68 mẫu dự án, 41 mục tiêu chuẩn/tiêu chí tham chiếu.
- `02_hop_dong_du_lieu_va_quy_tac.json`: trường dữ liệu cần thu và quy tắc không suy diễn.
- `03_danh_sach_kiem_thu.md`: kiểm tra nội dung và giới hạn.
- `04_bao_cao_2_cap_hoc_minh_hoa.md`: bản trả kết quả tự nhiên cho hai gia đình giả định.
- `05_ho_so_mau_primary.json` và `05_ho_so_mau_secondary.json`: dữ liệu đầu vào giả định cho generator.
- `06_prompt_google_ai_studio_primary.txt` và `06_prompt_google_ai_studio_secondary.txt`: hai prompt hoàn chỉnh có thể sao chép thử tạo web.
- `07_prompt_template_dong.txt`: template cho generator thực tế, phải chèn hồ sơ đã xác nhận và loại riêng tư.
- `08_manifest_kiem_tra.json`: số lượng, kết quả kiểm tra tự động.
- `09_cau_hinh_man_hinh_20_buoc.json`: 20 màn đủ trường nhập, các lựa chọn, điều kiện chuyển bước, popup tham chiếu.
- `10_noi_dung_20_man_chi_tiet.md`: dạng văn bản để duyệt từng câu hỏi trước khi lập trình.

## Ghi chú quan trọng

Các mã FM-* là chỉ báo do Future Me đề xuất, chưa được duyệt với chương trình chính thức. Các mã CSTA26-* trong Blueprint là nhóm khái niệm nội bộ, không phải mã chuẩn chi tiết của CSTA. Mỗi liên kết nguồn cần QA thủ công trước khi public. RIASEC chỉ tham chiếu sở thích, không chấm mã nghề hay điểm nghề.

Mây và Nova là người giả định. Giờ học 24/48 và tuần 12/16 chỉ là lịch ví dụ theo nguồn mô phỏng, không phải định mức áp dụng cho tất cả nhánh. 15 nhánh còn lại không có giờ chốt sẵn. Một số chuyên môn cần người hướng dẫn và điều kiện an toàn thiết bị.

Không mang nguyên văn dữ liệu phụ huynh, ảnh trẻ, tên thật, thông tin liên lạc sang AI Studio. Khi dùng prompt thật, học sinh và phụ huynh phải xác nhận nội dung và đồng ý chuyển dữ liệu.

## Tạo prompt thật từ dữ liệu gia đình đã xác nhận

`11_prompt_generator.py` là ví dụ CLI để sinh prompt từ một hồ sơ có đồng ý rõ ràng của phụ huynh, đúng bốn dự án và giới hạn dữ liệu truyền đi. Chạy: `python 11_prompt_generator.py approved_profile.json output_prompt.txt`. Nếu thiếu đồng ý, thiếu dự án, sai nhánh/cấp hoặc nhận thấy email/số điện thoại trong phần văn bản cho phép, mã sẽ dừng. Cơ chế phát hiện thông tin cá nhân chỉ là biện pháp hỗ trợ: vẫn phải có bước phụ huynh đọc lại trước khi sao chép. Đây chưa phải hệ thống bảo mật cho ứng dụng triển khai thật.
