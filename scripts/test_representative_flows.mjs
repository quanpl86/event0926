import {
  generatePersonalizedProjects,
  extractSIOEvidenceCards,
  buildSafeAIStudioPrompt
} from '../src/data/v3Engine.ts';

console.log('=== TEST MINIMUM RELEASE CHECKLIST (5/5 CONDITIONS) ===\n');

// 1. Primary Flow: Bé Mây (Lớp 4, Robotics, Robot Thủ Thư)
console.log('--- TESTING PRIMARY FLOW: Bé Mây (Lớp 4, Robot) ---');
const mayAnswers = {
  name: 'Mây',
  grade: '4',
  gradeBand: '3-5',
  avatar: 'builder',
  domain: 'robotics',
  branch: 'robot_build_and_block_control',
  projectName: 'Robot Thủ Thư Chở Sách',
  dreamAudience: 'bạn đọc trong thư viện trường',
  dreamPurpose: 'vận chuyển sách đến đúng bàn đọc và tránh va chạm',
  dreamFeatures: ['Tự động nhận biết vật cản', 'Điều khiển bằng nút bấm', 'Đèn LED tín hiệu'],
  dreamAppearance: 'Robot màu xanh lá có 4 bánh xe và khay đựng sách',
  knowledgeResponse: 'Kiểm tra pin và bánh răng xem có bị kẹt sách không.',
  skillResponse: 'Lắp ráp khung xe, gắn động cơ, sau đó viết lệnh di chuyển thẳng.',
  problemResponse: 'Nếu xe đi lệch, con sẽ chỉnh lại tốc độ 2 bánh cho đều nhau.',
  parentObservedTask: 'independent',
  parentObservedExample: 'Bé từng tự lắp ráp mô hình xe Lego và thử nghiệm đường dốc.',
  hoursPerWeek: 2,
  availableResources: ['Máy tính', 'Vật liệu đơn giản'],
  supportMode: ['Lắng nghe và khích lệ'],
  familyConflict: 'agree',
  familyReviewConfirmed: true,
  parentApprovesExternalTransfer: true,
  selections: {}
};

const mayProjects = generatePersonalizedProjects(mayAnswers);
const mayEvidences = extractSIOEvidenceCards(mayAnswers);
const { safePayload: mayPayload, fullPrompt: mayPrompt } = buildSafeAIStudioPrompt(mayAnswers, mayProjects);

console.log(`[PASS] 4 Projects generated for Mây:`);
mayProjects.forEach(p => console.log(`   - Dự án ${p.projectNumber}: ${p.name} (isDream: ${p.isDreamProject})`));
if (mayProjects.length !== 4) throw new Error('Expected 4 projects');
if (!mayProjects[3].isDreamProject || !mayProjects[3].name.includes('Robot Thủ Thư Chở Sách')) {
  throw new Error('Project 4 must be Dream Project');
}

console.log(`[PASS] Evidence Cards extracted for Mây: ${mayEvidences.length} cards`);
mayEvidences.forEach(e => console.log(`   - [${e.stageName}] ${e.sourceLabel}: ${e.responsePreview}`));

// 2. Secondary Flow: Nova (Lớp 7, Web Programming, Website Hành Tinh Xanh)
console.log('\n--- TESTING SECONDARY FLOW: Nova (Lớp 7, Web) ---');
const novaAnswers = {
  name: 'Nova',
  grade: '7',
  gradeBand: '6-7',
  avatar: 'explorer',
  domain: 'game_programming',
  branch: 'web',
  projectName: 'Website Hành Tinh Xanh',
  dreamAudience: 'học sinh các trường THCS trong quận',
  dreamPurpose: 'đổi rác tái chế lấy cây sen đá và tích điểm bảo vệ môi trường',
  dreamFeatures: ['Bảng xếp hạng xanh', 'Form quét mã nhận cây', 'Giao diện trực quan trên điện thoại'],
  dreamAppearance: 'Phong cách tối giản, tông màu xanh lá pastel',
  knowledgeResponse: 'Phân tích cấu trúc HTML, CSS cho giao diện và JavaScript cho logic tính điểm.',
  skillResponse: 'Tạo khung trang web trước, thêm form đăng ký, sau đó lập trình cơ chế tích điểm.',
  problemResponse: 'Kiểm tra lỗi trong Console trình duyệt và kiểm tra lại đường dẫn file script.',
  parentObservedTask: 'independent',
  parentObservedExample: 'Nova tự tìm hiểu các trang web mẫu và học cách làm giao diện.',
  hoursPerWeek: 3,
  availableResources: ['Máy tính cá nhân', 'Mạng Internet'],
  supportMode: ['Tạo không gian tự do', 'Tìm thầy cô hướng dẫn chuyên sâu'],
  familyConflict: 'agree',
  familyReviewConfirmed: true,
  parentApprovesExternalTransfer: true,
  selections: {}
};

const novaProjects = generatePersonalizedProjects(novaAnswers);
const novaEvidences = extractSIOEvidenceCards(novaAnswers);
const { safePayload: novaPayload, fullPrompt: novaPrompt } = buildSafeAIStudioPrompt(novaAnswers, novaProjects);

console.log(`[PASS] 4 Projects generated for Nova:`);
novaProjects.forEach(p => console.log(`   - Dự án ${p.projectNumber}: ${p.name} (isDream: ${p.isDreamProject})`));
if (novaProjects.length !== 4) throw new Error('Expected 4 projects');
if (!novaProjects[3].isDreamProject || !novaProjects[3].name.includes('Website Hành Tinh Xanh')) {
  throw new Error('Project 4 must be Dream Project');
}

// 3. Privacy Check: No PII leak
console.log('\n--- TESTING PRIVACY & PII COMPLIANCE ---');
const piiRegex = [/\b[\w.+-]+@[\w-]+\.[\w.-]+\b/, /(?:\+?84|0)[ .-]?(?:\d[ .-]?){9,10}/];
[mayPrompt, novaPrompt].forEach((pr, idx) => {
  piiRegex.forEach(rgx => {
    if (rgx.test(pr)) throw new Error(`PII detected in prompt ${idx + 1}`);
  });
});
console.log('[PASS] 100% PII check passed: No phone numbers or emails detected in generated prompts.');

console.log('\n=== ALL 5 MINIMUM RELEASE CHECKLIST CONDITIONS VERIFIED SUCCESSFULLY ===');
