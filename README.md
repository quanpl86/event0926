# Future Creator Journey

Trải nghiệm khám phá tương lai dành cho học sinh và phụ huynh, được xây dựng bằng Next.js, React, Tailwind CSS và Supabase.

## Luồng trải nghiệm

- Timeline workshop 60 phút: chào mừng, hiểu về con, Future Profile, tạo website, hiệu chỉnh và chia sẻ.
- 14 mảnh ghép tương tác, gồm lượt của học sinh, hai lượt quan sát của phụ huynh và một lượt cả nhà cùng đối chiếu.
- Future Buddy tổng hợp chân dung từ sở thích, cách sáng tạo, tình huống giải quyết vấn đề, dự án và quan sát thực tế của ba mẹ.
- Học sinh có thể dùng character brief được gợi ý hoặc tự chọn hình tượng, phong cách, màu và vật phẩm từ các phương án liên quan đến hành trình trước đó.
- Kết quả gồm Future Creator Profile, Future Project Showcase, Exploration Journey và prompt tạo website Future Me trong Google AI Studio.

## Chạy local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Mở `http://localhost:3000`.

## Supabase

1. Mở SQL Editor trong Supabase.
2. Chạy toàn bộ file `supabase/schema.sql`.
3. Điền `SUPABASE_SECRET_KEY` trong `.env.local` nếu sau này bổ sung API quản trị phía server. Phiên bản hiện tại chỉ dùng publishable key và RLS insert-only từ client.

Nếu Supabase chưa có schema hoặc chưa được cấu hình, hành trình vẫn hoạt động và lưu tạm bằng `localStorage`.

`discovery_results` lưu structured discovery data, character brief và website prompt. Ứng dụng chỉ gửi dữ liệu khi phụ huynh chủ động bật đồng ý ở bước cuối.

## Netlify

Kết nối repository với Netlify, thêm các biến môi trường trong `.env.example`, sau đó deploy. Netlify tự nhận diện Next.js.
