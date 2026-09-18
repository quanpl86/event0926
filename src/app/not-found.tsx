import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h2 className="text-2xl font-bold mb-2">Trang không tồn tại</h2>
      <p className="text-gray-600 mb-4">Rất tiếc, trang bạn đang tìm kiếm không có sẵn.</p>
      <Link href="/" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
        Về trang chủ
      </Link>
    </div>
  );
}
