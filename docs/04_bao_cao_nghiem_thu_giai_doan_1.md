# BÁO CÁO NGHIỆM THU KỸ THUẬT GIAI ĐOẠN 1: DATA & CONTRACTS
### DỰ ÁN: FUTURE ME (EVENT0926) — BẢN TRÌNH HỘI ĐỒNG THẨM ĐỊNH & PRODUCT LEAD
**Ngày hoàn thành:** 17/09/2026  
**Trạng thái đề xuất:** Đã hoàn thành 100% điều kiện tiên quyết — Xin phê duyệt chuyển sang Giai đoạn 2 (UI & Interaction Flow).

---

## I. TỔNG HỢP XỬ LÝ 6 ĐIỂM YÊU CẦU HIỆU CHỈNH (P0 & P1)

| Mức độ | Điểm yêu cầu hiệu chỉnh từ Hội đồng | Kết quả xử lý & Cam kết kỹ thuật của Team | Minh chứng kỹ thuật |
| :---: | :--- | :--- | :--- |
| **P0** | **Bỏ cả biểu đồ 5 trục** (kể cả phiên bản định tính). Dùng thẻ ghi nhận theo từng SIO thực sự được hỏi. | **ĐÃ TIẾP THU TRIỆT ĐỂ**: Xóa bỏ hoàn toàn Radar Chart (cả điểm số 1–10 và các nhãn định tính "Tín hiệu rõ nét"). Thay thế bằng **Evidence Cards (Thẻ Bằng Chứng)** ghi rõ câu hỏi, hành động của học sinh, giới hạn quan sát và nhãn phân định nguồn bằng chứng (*"Theo quan sát của phụ huynh"*, *"Chưa đủ thông tin"*). | `src/types/dataContractV3.ts`<br>(Kiểu `SIOEvidenceRecord`, `EvidenceStatus`) |
| **P0** | **Cá nhân hóa thực sự 4 dự án** theo Dream Project, không chỉ chọn 4 mẫu tĩnh từ 68 dự án. | **ĐÃ THIẾT KẾ ENGINE CÁ NHÂN HÓA**: Dự án 1–3 lấy khung từ thư viện nhưng biến đổi tiêu đề, mục tiêu, 3 nhiệm vụ theo ý tưởng dự án của học sinh. **Dự án số 4 giữ nguyên 100% tên và ước mơ của học sinh**, chia làm 2 giai đoạn: bản MVP khả thi (v1) và tính năng mở rộng (v2). | `src/types/dataContractV3.ts`<br>(Kiểu `PersonalizedProject`, `DreamProjectBrief`) |
| **P0** | **Rà soát ánh xạ Question → SIO → ULO → Standard** trước khi đưa dữ liệu vào engine. | **ĐÃ LẬP BẢNG ĐỐI CHIẾU HỌC THUẬT**: Phát hiện và xử lý 3 lỗi sai lệch nghiêm trọng ở nhánh Multimedia 3D (lỗi gán câu hỏi nhận biết hình khối 3D sang chuẩn bản quyền/truyền thông 2D). Thiết lập quy tắc gắn nhãn minh bạch: phân biệt rõ *"Chỉ báo nội bộ"* với *"Chuẩn tham chiếu quốc tế"*. | [docs/academic_mapping_audit.md](file:///Users/mac/Downloads/EVENT0926/docs/academic_mapping_audit.md) |
| **P0** | **Kiểm tra Schema SQL & RLS Supabase**, không kết luận vội vã "không cần migration". | **ĐÃ SOÁT SCHEMA VÀ VIẾT MIGRATION 002**: Phát hiện chính sách cũ chỉ cấp quyền `INSERT` (mù quáng), không thể đọc lại để tiếp tục phiên dở, không thể xóa khi thu hồi consent. Đã bổ sung `session_token`, trường `consent_status`, phân tách `actor` (học sinh vs phụ huynh) và cấp đủ RLS `SELECT`, `UPDATE`, `DELETE`. | [supabase/migrations/002_v3_session_rls.sql](file:///Users/mac/Downloads/EVENT0926/supabase/migrations/002_v3_session_rls.sql) |
| **P1** | **Tạo payload xuất riêng cho Google AI Studio**, phụ huynh xem trước và xác nhận rõ ràng. | **ĐÃ TÁCH BIỆT EXPORT PAYLOAD**: Không chỉ dùng regex lọc chuỗi. Tạo kiểu `AIStudioExportPayload` chỉ gồm các trường whitelist an toàn (biệt danh, cấp học, 4 dự án cá nhân hóa, điểm sáng quan sát), hiển thị modal cho phụ huynh duyệt trước khi cho phép sao chép prompt. | `src/types/dataContractV3.ts`<br>(Kiểu `AIStudioExportPayload`) |
| **P1** | **Bổ sung bộ kiểm thử E2E Acceptance Testing** cho WebApp thực tế, không chỉ checklist file 03. | **ĐÃ THIẾT KẾ 6 KỊCH BẢN E2E ĐẶC THÙ**: Bao gồm kiểm thử học sinh nhỏ tuổi (Lớp 1–2: chữ to, icon trực quan), học sinh lớn (Lớp 9: đối sánh chuẩn THCS), khôi phục phiên dở bằng `session_token`, và quy trình phụ huynh thu hồi dữ liệu. | `implementation_plan.md` & Phần IV bên dưới |

---

## II. BÁO CÁO TƯƠNG THÍCH SCHEMA & KIỂM TRA DỮ LIỆU TỰ ĐỘNG

Script kiểm tra tự động độc lập ([scripts/verify_v3_data.mjs](file:///Users/mac/Downloads/EVENT0926/scripts/verify_v3_data.mjs)) đã được thực thi với kết quả thành công tuyệt đối 100%:

```text
=== FUTURE ME V3 DATA & SCHEMA COMPATIBILITY AUDIT ===

[PASS] Source Data 01 Version: 3.0.0
[PASS] Screen Config 09 Version: 3.1.0
[PASS] Step Count in 09: 20 (Expected: 20, Step 00 -> 19)
[PASS] Primary Branches (7): game, interactive_app, robot_build_and_block_control, design_2d, design_3d, animation_2d, video_and_effects
[PASS] Secondary Branches (10): game_3d, desktop_app, web, smart_device, automation, connected_system, design_2d, design_3d, animation_2d, video_and_effects
[PASS] Total Situational SIO Questions: 51 (Expected: 51 = 17 branches x 3)
[PASS] Total Catalog Project Templates: 68 (Expected: 68 = 17 branches x 4)
[PASS] Total Standards in Registry: 41 (Expected: 41)

=== ALL SCHEMA COMPATIBILITY & CROSS-REFERENCE CHECKS PASSED ===
```

### Phân định vai trò 2 tệp nguồn dữ liệu:
* **`docs/09_cau_hinh_man_hinh_20_buoc.json` (v3.1.0)**: Là **Nguồn sự thật duy nhất (Single Source of Truth) về luồng giao diện**: quy định thứ tự 20 bước (00 đến 19), loại tương tác (single_select, multi_select, text_input, review), điều kiện chuyển màn và văn phong giao tiếp của Kitten Bot theo cấp học.
* **`docs/01_noi_dung_webapp_hoan_chinh.json` (v3.0.0)**: Là **Ngân hàng dữ liệu học thuật**: cung cấp chi tiết 17 nhánh chuyên sâu, 51 câu hỏi tình huống SIO, 68 dự án mẫu, và từ điển 41 tiêu chuẩn đánh giá.

---

## III. BÁO CÁO SCHEMA SUPABASE & QUYỀN TRUY CẬP (RLS)

### 1. Phân tích điểm yếu của Schema ban đầu
* Ban đầu, team nhận định "các bảng dùng JSONB nên không cần migration". Tuy nhiên, sau khi rà soát kỹ thuật thực tế:
  * **Thiếu khả năng tiếp tục phiên dở**: Người dùng ẩn danh (anon) chỉ có quyền `INSERT`. Khi học sinh tải lại trang hoặc mở lại link, ứng dụng không thể `SELECT` lại dữ liệu đã nhập mà không dùng Service Role Key (nguy cơ lộ bí mật API).
  * **Không phân biệt người nhập**: Dữ liệu phụ huynh (Bước 05, Bước 16) bị trộn lẫn với câu trả lời học sinh.
  * **Không thể thực thi quyền riêng tư**: Phụ huynh không có cơ chế thu hồi quyền đồng ý (`revoke consent`) hoặc xóa hồ sơ.

### 2. Giải pháp tại Migration 002 ([supabase/migrations/002_v3_session_rls.sql](file:///Users/mac/Downloads/EVENT0926/supabase/migrations/002_v3_session_rls.sql))
1. Thêm `session_token text not null` được tạo tự động phía client/DB và lưu vào `localStorage` của trình duyệt gia đình.
2. Thêm cột `actor text check (actor in ('student', 'parent', 'family'))` và `step_index` vào bảng `interaction_history`.
3. Bổ sung các chính sách RLS chi tiết:
   * `profile_select_own_session`: Cho phép đọc lại hồ sơ nếu phiên chưa bị thu hồi consent.
   * `profile_update_own_session`: Cho phép cập nhật thông tin từng bước trong quá trình trải nghiệm.
   * `profile_delete_own_session`: Cho phép xóa phiên khi phụ huynh bấm yêu cầu hủy dữ liệu.

---

## IV. BỘ TIÊU CHÍ NGHIỆM THU E2E TOÀN DIỆN (ACCEPTANCE TEST MATRIX)

Bổ sung ngoài checklist cấu trúc tĩnh của File 03:

| Mã Test | Đối tượng & Kịch bản | Trọng tâm kiểm thử | Tiêu chí đạt (Pass Criteria) |
| :---: | :--- | :--- | :--- |
| **TC-01** | **Tiểu học (Lớp 4) — Bé Mây**<br>Nhánh: Robot & Tự động hóa | Luồng 20 bước, 3 tình huống SIO Robot, nhập Dream Project "Robot thủ thư chở sách". | • 4 dự án đầu ra hiển thị đúng tính năng chở sách.<br>• Dự án 4 giữ nguyên tên "Robot thủ thư" với mốc v1 & v2.<br>• Không có radar 5 trục, chỉ có thẻ quan sát SIO. |
| **TC-02** | **THCS (Lớp 7) — Bạn Nova**<br>Nhánh: Lập trình Web | Nhập Dream Project "Website đổi rác lấy cây xanh". | • Dự án thể hiện rõ tính năng phân loại rác và tích điểm đổi quà.<br>• Gắn đúng chuẩn thuật toán & thiết kế giao diện web. |
| **TC-03** | **Tiểu học Nhỏ (Lớp 1–2)** | Giao diện tối giản, chữ to, nhịp độ ngắn gọn, Kitten Bot nói chuyện gần gũi. | • Không bị quá tải chữ.<br>• Nút bấm kích thước lớn dễ chạm trên máy tính bảng. |
| **TC-04** | **THCS Lớn (Lớp 9)** | Đối sánh chuẩn học thuật nâng cao, định hướng nghề nghiệp công nghệ. | • Thể hiện rõ các khái niệm chuyên sâu (hệ thống kết nối, tối ưu hóa thuật toán). |
| **TC-05** | **Khôi phục phiên làm dở** | Đang làm đến Bước 11 thì đóng tab trình duyệt, mở lại. | • Ứng dụng đọc `session_token` từ `localStorage` và tiếp tục đúng Bước 11 với đầy đủ câu trả lời trước đó. |
| **TC-06** | **Quyền riêng tư & AI Studio Prompt** | Phụ huynh bấm xem trước dữ liệu xuất khẩu sang AI Studio. | • Modal hiển thị danh sách trường: tuyệt đối không có họ tên thật, SĐT, email.<br>• Nút chép prompt chỉ sáng sau khi phụ huynh bấm nút đồng ý. |

---

## V. ĐỀ XUẤT HÀNH ĐỘNG TIẾP THEO

Với toàn bộ hồ sơ kỹ thuật Giai đoạn 1 đã được chuẩn hóa, hoàn tất và kiểm tra tự động thành công (TypeScript compilation 100% pass):

👉 **Đề xuất Hội đồng thẩm định và Product Lead chính thức phê duyệt mở Giai đoạn 2 (UI State Machine & 17 Nhánh Chuyên Môn)** để team bắt đầu tích hợp giao diện tương tác 20 bước hoàn chỉnh.
