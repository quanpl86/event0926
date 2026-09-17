# BẢNG ĐỐI CHIẾU & RÀ SOÁT ÁNH XẠ HỌC THUẬT (ACADEMIC MAPPING AUDIT)
### DỰ ÁN: FUTURE ME V3 — 51 TÌNH HUỐNG SIO & 17 NHÁNH

---

## 1. Các Lỗi Ánh Xạ Đã Phát Hiện & Đề Xuất Sửa Đổi Cụ Thể

| Mã tình huống / Nhánh | Câu hỏi thực tế | Ánh xạ lỗi hiện tại trong V3 | Nguyên nhân sai lệch | Đề xuất sửa đổi chuẩn xác | Trạng thái duyệt |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **`FM-P-MUL-SIO-01`**<br>*(Tiểu học • design_3d)* | "Con muốn làm ngôi nhà từ hình khối. Khối nào làm thân nhà? Con nghĩ sao? Hãy nói cách con làm." | Tham chiếu: `ISTE-1.6.c`, `NLS25-3.1`<br>*(Chọn bố cục/hình ảnh để truyền đạt thông điệp)* | Dùng chung 1 mã SIO cho cả 4 nhánh Multimedia khiến câu hỏi **nhận biết hình khối 3D** bị gán nhầm sang kỹ năng **bố cục hình ảnh 2D**. | Tách thành **`FM-P-MUL-3D-01`**:<br>• Tiêu chí: *Nhận biết và lựa chọn hình khối không gian phù hợp với bộ phận kiến trúc*<br>• Tham chiếu: `ISTE-1.4.a` (Innovative Designer) & `NLS25-3.1` | 🟡 Chờ Academic Lead duyệt |
| **`FM-P-MUL-SIO-02`**<br>*(Tiểu học • design_3d)* | "Làm sao ghép các khối để ngôi nhà đứng cân đối và không hở? Con nghĩ sao? Hãy nói cách con làm." | Tham chiếu: `ISTE-1.4.a`, `ISTE-1.6.c`<br>*(Phác họa hình khối/góc nhìn)* | Gán thừa `ISTE-1.6.c` (Truyền đạt thông điệp) trong khi đây thuần túy là kỹ năng lắp ghép hình học không gian. | Chuẩn hóa **`FM-P-MUL-3D-02`**:<br>• Tiêu chí: *Tư duy ghép nối và cân bằng vật thể 3D*<br>• Tham chiếu: `ISTE-1.4.a` & `NGSS 3-5-ETS1-2` | 🟡 Chờ Academic Lead duyệt |
| **`FM-S-MUL-SIO-03`**<br>*(THCS • design_3d)* | "Ở góc nhìn cạnh có khoảng hở. Bạn sẽ tìm và khắc phục bằng cách nào? Bạn hãy nêu phương án và giải thích ngắn lý do." | Tham chiếu: `ISTE-1.6.b`, `NLS25-3.3`<br>*(Nhận biết cách dùng tư liệu có bản quyền và trình bày ý tưởng nguyên gốc)* | **Sai lệch nghiêm trọng**: Câu hỏi kỹ thuật về **sửa lỗi hở lưới mô hình 3D (Mesh gap debugging)** lại bị gán vào chuẩn **bản quyền tác giả (Copyright)**! | Tách thành **`FM-S-MUL-3D-03`**:<br>• Tiêu chí: *Phát hiện lỗi ghép nối không gian đa chiều và đưa ra giải pháp khắc phục hình học*<br>• Tham chiếu: `ISTE-1.4.c` (Cải tiến thiết kế) & `NLS25-3.2` | 🔴 Cần sửa ngay |
| **`FM-P-PRG-SIO-03`**<br>*(Tiểu học • interactive_app)* | "Nút 'Tiếp tục' không chuyển câu hỏi. Con sẽ thử kiểm tra chỗ nào trước?" | Tham chiếu chung: `CSTA26-ALGO`<br>*(Algorithms & Design)* | Câu hỏi kiểm tra tư duy gỡ lỗi sự kiện người dùng (Event-driven debugging), gán vào Algo chung chưa đủ sát. | Bổ sung tham chiếu: `CSTA-PROG` & `NLS25-3.4` (Gỡ lỗi phần mềm mức độ cơ bản). | 🟢 Đã đối soát |

---

## 2. Quy Tắc Gắn Nhãn Minh Bạch Học Thuật Trên Giao Diện

Để không gây hiểu nhầm cho phụ huynh và học sinh:
1. **Các mã `FM-*` (Future Me SIO)**:
   * Hiển thị: `"Chỉ báo khám phá nội bộ (FM-P-xxx / FM-S-xxx)"`.
   * Chú thích: *"Đây là chỉ báo do Hội đồng học thuật Future Me đề xuất nhằm quan sát phản xạ tự nhiên của học sinh, chưa phải khung chuẩn hóa quốc gia"*.
2. **Các mã `CSTA26-*`**:
   * Hiển thị: `"Nhóm khái niệm định hướng CSTA 2026 (Hoa Kỳ)"`.
   * Chú thích: *"Nhóm khái niệm tham chiếu từ bản dự thảo CSTA 2026, dùng làm cơ sở thiết kế tình huống"*
3. **Bằng chứng từ phụ huynh**:
   * Ghi nhận: Luôn đính kèm nhãn `"Theo quan sát độc lập từ gia đình"`, tuyệt đối không dùng để chứng thực đạt chuẩn năng lực.

---

## 3. Danh Mục 18 Nhóm Chỉ Báo SIO Minh Họa Sau Hiệu Chỉnh

### 💻 Bộ môn Lập trình (Programming)
* **Tiểu học**:
  1. `FM-P-PRG-01`: Sắp xếp hành động theo trình tự logic (CSTA Algorithms, NLS 3.4).
  2. `FM-P-PRG-02`: Nhận biết hành động lặp lại và điều kiện rẽ nhánh (CSTA Algorithms, ISTE 1.5.d).
  3. `FM-P-PRG-03`: Nêu cách kiểm tra và sửa lỗi khi chương trình chưa chạy đúng (CSTA Programming, NLS 3.4).
* **THCS**:
  1. `FM-S-PRG-01`: Phân rã tính năng ứng dụng/game thành các khối chức năng (CSTA Algorithms, ISTE 1.5.c).
  2. `FM-S-PRG-02`: Xây dựng điều kiện kết hợp và dự đoán trạng thái hệ thống (CSTA Programming, NLS 3.4).
  3. `FM-S-PRG-03`: Phân tích nguyên nhân lỗi logic và đề xuất phương án cô lập lỗi (CSTA Debugging, ISTE 1.5.d, NLS 5.1).

### 🤖 Bộ môn Robotics & IoT
* **Tiểu học**:
  1. `FM-P-ROB-01`: Liên hệ bộ phận của robot với chức năng cơ bản (CSTA Systems, NGSS ETS1).
  2. `FM-P-ROB-02`: Mô tả chuỗi hành động di chuyển tuần tự của cỗ máy (CSTA Algorithms, NLS 3.4).
  3. `FM-P-ROB-03`: Thử nghiệm thay đổi một thông số kỹ thuật khi robot đi lệch (CSTA Systems, NGSS ETS1).
* **THCS**:
  1. `FM-S-IOT-01`: Nhận biết chu trình cảm biến $\rightarrow$ xử lý $\rightarrow$ đầu ra của thiết bị thông minh (CSTA Systems, NGSS MS-ETS1).
  2. `FM-S-IOT-02`: Đặt điều kiện ưu tiên khi xử lý dữ liệu và điều khiển tự động (CSTA Systems, NLS 3.4).
  3. `FM-S-IOT-03`: Phân tích hiện tượng lỗi cảm biến sát ngưỡng và đề xuất giải pháp lọc nhiễu (CSTA Data, NGSS MS-ETS1-3).

### 🎨 Bộ môn Multimedia (2D, 3D, Animation, Video)
* **Tiểu học**:
  1. `FM-P-MUL-01`: Chọn bố cục/hình ảnh truyền tải thông điệp (2D/Video) hoặc nhận diện hình khối (3D) (ISTE 1.4/1.6, NLS 3.1).
  2. `FM-P-MUL-02`: Phác họa trình tự chuyển động hoặc lắp ráp các phần cân đối (ISTE 1.4.a, NLS 3.1).
  3. `FM-P-MUL-03`: Giải thích cách chỉnh sửa chi tiết theo phản hồi của người xem (ISTE 1.1.c, NLS 3.2).
* **THCS**:
  1. `FM-S-MUL-01`: Đề xuất bố cục, góc nhìn và nhịp điệu phù hợp đối tượng khán giả (ISTE 1.6.c, NLS 3.1).
  2. `FM-S-MUL-02`: Phân tích tỉ lệ hình học, chuyển động keyframe và phương án cải tiến (ISTE 1.4.c, NLS 3.2).
  3. `FM-S-MUL-03`: Khắc phục lỗi kỹ thuật mô hình/âm thanh và ý thức sử dụng tư liệu có bản quyền (ISTE 1.4.c / ISTE 1.6.b, NLS 3.3).
