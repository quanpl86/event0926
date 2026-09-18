import {
  generatePersonalizedProjects,
  extractSIOEvidenceCards,
  buildSafeAIStudioPrompt
} from '../src/data/v3Engine.ts';

console.log('=== TEST FINAL CONTENT PATCH (3/3 REQUIREMENTS) ===\n');

// ─────────────────────────────────────────────────────────────
// FIXTURE 1: MULTIMEDIA (Thiệp 3D Yêu Thương, Lớp 4)
// ─────────────────────────────────────────────────────────────
console.log('--- [FIXTURE 1: MULTIMEDIA 3D CARD] Bé An (Lớp 4) ---');
const cardAnswers = {
  name: 'An',
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

// Check that no caveat claims natural logic or certified competence
cardEvidences.forEach(ev => {
  if (ev.caveat.includes('Biểu hiện tư duy logic tự nhiên')) {
    throw new Error(`Forbidden phrase found in caveat: ${ev.caveat}`);
  }
  if (ev.sourceType === 'student_situation' && !ev.caveat.includes('Cần quan sát thêm qua sản phẩm thực tế.')) {
    throw new Error(`Caveat does not conclude with observation note: ${ev.caveat}`);
  }
});
console.log('   => [PASS] All student SIO caveats describe only concrete behavior and conclude with observation note.');

console.log('\n2. KIỂM TRA CHỨC NĂNG TƯƠNG TÁC & ROADMAP P4:');
const p4 = cardProjects[3];
console.log(`   - Tên P4: "${p4.name}"`);
console.log(`   - Số lượng features trong P4: ${p4.features?.length}`);
p4.features?.forEach(f => {
  console.log(`     * [${f.id}] [${f.scope.toUpperCase()}] ${f.name}`);
  console.log(`       Mô tả: ${f.description}`);
  f.tasks.forEach(t => console.log(`         - Task [${t.id}]: ${t.description}`));
  console.log(`       Tiêu chí: ${f.successCriteria.join('; ')}`);
});

const p4f1 = p4.features?.[0];
if (!p4f1 || !p4f1.name.includes('Chức năng tương tác: Bấm nút mở thiệp tương tác (Hiệu ứng mở 3D)')) {
  throw new Error(`P4 F1 must be the concrete interactive function! Got: ${p4f1?.name}`);
}
if (p4.name !== 'Thiệp 3D Yêu Thương') {
  throw new Error(`P4 name must be 'Thiệp 3D Yêu Thương'! Got: ${p4.name}`);
}
if (p4f1.name.includes('Bản Thử Nghiệm Khả Thi (MVP) -')) {
  throw new Error('P4 F1 still uses generic MVP title!');
}
console.log('   => [PASS] Interactive function is linked to concrete P4 feature, tasks, and criteria (no generic titles).');

console.log('\n3. KIỂM TRA RIASEC & HOLLAND CODES TRONG JSON:');
const portfolio = cardPayload.futureCapabilityPortfolio;
if ('riasecOrientation' in portfolio) {
  throw new Error('portfolio must NOT contain riasecOrientation!');
}
if (!portfolio.curriculumOrientation) {
  throw new Error('portfolio must contain curriculumOrientation!');
}
if ('primaryCode' in portfolio.curriculumOrientation || 'secondaryCodes' in portfolio.curriculumOrientation) {
  throw new Error('curriculumOrientation must NOT contain primaryCode or secondaryCodes!');
}
console.log(`   - Tech Sector: "${portfolio.curriculumOrientation.techSector}"`);
console.log(`   - Reference Notice: "${portfolio.curriculumOrientation.curriculumReferenceNotice}"`);
console.log('   => [PASS] No personal Holland codes or secondary RIASEC arrays exported in payload.');

// ─────────────────────────────────────────────────────────────
// FIXTURE 2: ROBOTICS (Robot Thủ Thư Chở Sách, Lớp 4)
// ─────────────────────────────────────────────────────────────
console.log('\n--- [FIXTURE 2: ROBOTICS] Bé Mây (Lớp 4) ---');
const mayAnswers = {
  name: 'Mây',
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
    skill: true // SIO 2 có gợi ý
  }
};

const mayProjects = generatePersonalizedProjects(mayAnswers);
const mayEvidences = extractSIOEvidenceCards(mayAnswers);
const { safePayload: mayPayload } = buildSafeAIStudioPrompt(mayAnswers, mayProjects);

console.log('\n1. KIỂM TRA SIO CAVEATS CHO ROBOTICS:');
mayEvidences.forEach(ev => {
  console.log(`   - [${ev.id} / ${ev.stageName}] Caveat: "${ev.caveat}"`);
});
const maySio2 = mayEvidences.find(e => e.id === 'evidence-sio-2');
if (!maySio2?.caveat.includes('Học sinh chọn quy trình gợi ý trong tình huống mô phỏng')) {
  throw new Error(`Assisted SIO 2 caveat unexpected: ${maySio2?.caveat}`);
}
console.log('   => [PASS] Assisted vs Independent caveats verified correctly.');

console.log('\n2. KIỂM TRA CHỨC NĂNG TƯƠNG TÁC & ROADMAP P4 CHO ROBOTICS:');
const mayP4 = mayProjects[3];
console.log(`   - Tên P4: "${mayP4.name}"`);
mayP4.features?.forEach(f => {
  console.log(`     * [${f.id}] [${f.scope.toUpperCase()}] ${f.name}`);
});
if (!mayP4.features?.[0].name.includes('Chức năng tương tác:')) {
  throw new Error(`Robotics P4 F1 must be interactive function! Got: ${mayP4.features?.[0].name}`);
}
console.log('   => [PASS] Robotics P4 features properly named and structured.');

console.log('\n3. KIỂM TRA CURRICULUM ORIENTATION CHO ROBOTICS:');
const mayPortfolio = mayPayload.futureCapabilityPortfolio;
if ('riasecOrientation' in mayPortfolio || 'primaryCode' in (mayPortfolio.curriculumOrientation || {})) {
  throw new Error('Robotics payload contains Holland personal code!');
}
console.log(`   - Tech Sector: "${mayPortfolio.curriculumOrientation.techSector}"`);
console.log('   => [PASS] Clean curriculum orientation for Robotics.');

console.log('\n=== ALL 3 FINAL CONTENT PATCH REQUIREMENTS FULLY VERIFIED ON BOTH FIXTURES ===\n');
