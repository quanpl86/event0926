# Future Creator Journey

Trải nghiệm khám phá tương lai dành cho học sinh và phụ huynh, được xây dựng bằng Next.js, React, Tailwind CSS và Supabase.

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

## Netlify

Kết nối repository với Netlify, thêm các biến môi trường trong `.env.example`, sau đó deploy. Netlify tự nhận diện Next.js.
