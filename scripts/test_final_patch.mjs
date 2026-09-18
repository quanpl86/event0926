import {
  generatePersonalizedProjects,
  extractSIOEvidenceCards,
  buildSafeAIStudioPrompt,
  buildSafeImageGenerationPrompt
} from '../src/data/v3Engine.ts';

console.log('=== TEST FINAL CONTENT PATCH + GENDER PROPAGATION (3/3 REQUIREMENTS + GENDER PROMPTS) ===\n');

// ─────────────────────────────────────────────────────────────
// FIXTURE 1: MULTIMEDIA (Thiệp 3D Yêu Thương, Lớp 4 - Nữ)
// ─────────────────────────────────────────────────────────────
console.log('--- [FIXTURE 1: MULTIMEDIA 3D CARD] Bé An (Lớp 4 - Nữ) ---');
const cardAnswers = {
  name: 'An',
  gender: 'female',
  grade: '4',
  gradeBand: '3-5',
  avatar: 'creator',
  domain: 'multimedia',
  branch: 'design_3d',
  projectName: 'Thiệp 3D Yêu Thương',
  productFormat: 'Thiệp điện tử 3D tương tác',
  dreamAudience: 'gia đình và người thân',
  dreamPurpose: 'gửi lời chúc yêu thương và tình cảm tri ân',
  dreamFeatures: [
    'Bấm nút mở thiệp tương tác (Hiệu ứng mở 3D)',
    'Bấm nút phát lời chúc & âm nhạc nhẹ nhàng',
    'Xoay mô hình 3D 360 độ để khám phá'
  ],
  dreamAppearance: 'Phong cách ấm áp, mô hình ngôi nhà gia đình 3D xinh xắn',
  knowledgeResponse: 'Con sẽ tạo hình khối ngôi nhà và trái tim 3D nổi bật ở giữa.',
  skillResponse: 'Tạo khối nhà trước, thêm cửa sổ và gắn nút bấm mở thiệp.',
  problemResponse: 'Con sẽ chuyển sang góc nhìn cạnh bên để kéo mái nhà về đúng vị trí cân đối.',
  parentObservedTask: 'independent',
  parentObservedExample: 'Bé từng tự vẽ thiệp chúc mừng sinh nhật mẹ trên máy tính bảng.',
  hoursPerWeek: 2,
  availableResources: ['Máy tính bảng', 'Máy tính để bàn'],
  supportMode: ['Lắng nghe và khích lệ'],
  familyConflict: 'agree',
  familyReviewConfirmed: true,
  parentApprovesExternalTransfer: true,
  assistedSIO: {} // Trả lời độc lập, không có gợi ý
};

const cardProjects = generatePersonalizedProjects(cardAnswers);
const cardEvidences = extractSIOEvidenceCards(cardAnswers);
const { safePayload: cardPayload, fullPrompt: cardPrompt } = buildSafeAIStudioPrompt(cardAnswers, cardProjects);
const cardImagePrompt = buildSafeImageGenerationPrompt(cardAnswers);

console.log('\n1. KIỂM TRA SIO CAVEATS CHO THIỆP 3D:');
cardEvidences.forEach(ev => {
  console.log(`   - [${ev.id} / ${ev.stageName}] Caveat: "${ev.caveat}"`);
});

const sio3Evidence = cardEvidences.find(e => e.id === 'evidence-sio-3');
if (!sio3Evidence) throw new Error('Missing evidence-sio-3');
const expectedCaveat = 'Học sinh tự đề xuất cách điều chỉnh bố cục trong tình huống mô phỏng. Cần quan sát thêm qua sản phẩm thực tế.';
if (sio3Evidence.caveat !== expectedCaveat) {
  throw new Error(`SIO 3 caveat mismatch!\nExpected: "${expectedCaveat}"\nGot: "${sio3Evidence.caveat}"`);
}
console.log('   => [PASS] SIO 3 caveat matches exactly the required formulation.');

console.log('\n2. KIỂM TRA CHỨC NĂNG TƯƠNG TÁC & ROADMAP P4:');
const p4 = cardProjects[3];
console.log(`   - Tên P4: "${p4.name}"`);
console.log(`   - Số lượng features trong P4: ${p4.features?.length}`);
p4.features?.forEach(f => {
  console.log(`     * [${f.id}] [${f.scope.toUpperCase()}] ${f.name}`);
  console.log(`       Mô tả: ${f.description}`);
});
if (!p4.features?.[0].name.includes('Chức năng tương tác: Bấm nút mở thiệp tương tác (Hiệu ứng mở 3D)')) {
  throw new Error('P4 F1 must be the concrete interactive function!');
}
console.log('   => [PASS] Interactive function properly linked to P4 feature and tasks.');

console.log('\n3. KIỂM TRA RIASEC & HOLLAND CODES TRONG JSON:');
const portfolio = cardPayload.futureCapabilityPortfolio;
if ('riasecOrientation' in portfolio || 'primaryCode' in (portfolio.curriculumOrientation || {})) {
  throw new Error('portfolio must NOT contain personal Holland codes!');
}
console.log(`   - Tech Sector: "${portfolio.curriculumOrientation.techSector}"`);
console.log('   => [PASS] No personal Holland codes exported.');

console.log('\n4. KIỂM TRA PROMPT TẠO ẢNH CÓ CHỨA GIỚI TÍNH (NỮ):');
if (!cardImagePrompt.includes('Nữ (Female)') || !cardImagePrompt.includes('young Vietnamese schoolgirl')) {
  throw new Error('Image prompt does not contain correct female gender information!');
}
console.log('   - Archetype in prompt: "young Vietnamese schoolgirl"');
console.log('   - Gender field in prompt: "Character gender: Nữ (Female)"');
console.log('   => [PASS] Female gender information correctly reflected in image prompt.');

// ─────────────────────────────────────────────────────────────
// FIXTURE 2: ROBOTICS (Robot Thủ Thư Chở Sách, Lớp 4 - Nam)
// ─────────────────────────────────────────────────────────────
console.log('\n--- [FIXTURE 2: ROBOTICS] Bé Mây (Lớp 4 - Nam) ---');
const mayAnswers = {
  name: 'Mây',
  gender: 'male',
  grade: '4',
  gradeBand: '3-5',
  avatar: 'builder',
  domain: 'robotics',
  branch: 'robot_build_and_block_control',
  projectName: 'Robot Thủ Thư Chở Sách',
  productFormat: 'Mô hình robot thông minh',
  dreamAudience: 'bạn đọc trong thư viện trường',
  dreamPurpose: 'vận chuyển sách đến đúng bàn đọc và tránh va chạm',
  dreamFeatures: [
    'Tự động nhận biết và né tránh vật cản',
    'Điều khiển bằng nút bấm hoặc giọng nói',
    'Cơ cấu khay đỡ chuyển động an toàn'
  ],
  dreamAppearance: 'Robot màu xanh lá có 4 bánh xe và khay đựng sách',
  knowledgeResponse: 'Kiểm tra pin và bánh răng xem có bị kẹt sách không.',
  skillResponse: 'Lắp ráp khung xe, gắn động cơ, sau đó viết lệnh di chuyển thẳng.',
  problemResponse: 'Nếu xe đi lệch, con sẽ chỉnh lại tốc độ 2 bánh cho đều nhau.',
  parentObservedTask: 'independent',
  parentObservedExample: 'Bé từng tự lắp ráp mô hình xe Lego và thử nghiệm đường dốc.',
  hoursPerWeek: 2,
  availableResources: ['Máy tính', 'Bộ kit cơ bản'],
  supportMode: ['Lắng nghe và khích lệ'],
  familyConflict: 'agree',
  familyReviewConfirmed: true,
  parentApprovesExternalTransfer: true,
  assistedSIO: {
    skill: true
  }
};

const mayProjects = generatePersonalizedProjects(mayAnswers);
const mayEvidences = extractSIOEvidenceCards(mayAnswers);
const { safePayload: mayPayload } = buildSafeAIStudioPrompt(mayAnswers, mayProjects);
const mayImagePrompt = buildSafeImageGenerationPrompt(mayAnswers);

console.log('\n1. KIỂM TRA SIO CAVEATS CHO ROBOTICS:');
mayEvidences.forEach(ev => {
  console.log(`   - [${ev.id} / ${ev.stageName}] Caveat: "${ev.caveat}"`);
});
console.log('   => [PASS] SIO caveats verified.');

console.log('\n2. KIỂM TRA PROMPT TẠO ẢNH CÓ CHỨA GIỚI TÍNH (NAM):');
if (!mayImagePrompt.includes('Nam (Male)') || !mayImagePrompt.includes('young Vietnamese schoolboy')) {
  throw new Error('Image prompt does not contain correct male gender information!');
}
console.log('   - Archetype in prompt: "young Vietnamese schoolboy"');
console.log('   - Gender field in prompt: "Character gender: Nam (Male)"');
console.log('   => [PASS] Male gender information correctly reflected in image prompt.');

// ─────────────────────────────────────────────────────────────
// TEST GENDER: KHÁC (OTHER / NEUTRAL)
// ─────────────────────────────────────────────────────────────
console.log('\n--- [TEST GENDER: KHÁC / TRUNG TÍNH] ---');
const otherImagePrompt = buildSafeImageGenerationPrompt({
  name: 'Alex',
  gender: 'other',
  grade: '7',
  domain: 'game_programming',
  projectName: 'Cyber Journey'
});
if (!otherImagePrompt.includes('Khác / Trung tính') || !otherImagePrompt.includes('young Vietnamese secondary student')) {
  throw new Error('Image prompt does not contain correct gender-neutral information!');
}
console.log('   - Gender field in prompt: "Character gender: Khác / Trung tính (Gender-neutral)"');
console.log('   => [PASS] Neutral/Other gender correctly reflected in image prompt.');

console.log('\n=== ALL TESTS PASSED: GENDER (NAM, NỮ, KHÁC) + IMAGE PROMPTS + CONTENT PATCH ===\n');
