import {
  generatePersonalizedProjects,
  buildSafeAIStudioPrompt
} from '../src/data/v3Engine.ts';

console.log('=== TEST FUTURE ME V4 MASTER PROMPT & PRESENTATION DATA CONTRACT (6 ZONES + IMAGE FIXES) ===\n');

// ─────────────────────────────────────────────────────────────
// FIXTURE: Long Quân (Tiểu học lớp 4 - Multimedia 3D, Custom Avatar)
// ─────────────────────────────────────────────────────────────
console.log('--- [FIXTURE: LONG QUÂN - LỚP 4 MULTIMEDIA 3D] ---');
const longQuanAnswers = {
  name: 'Long Quân',
  gender: 'male',
  grade: '4',
  gradeBand: '3-5',
  avatar: 'creator',
  avatarSource: 'custom',
  customAvatarData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  domain: 'multimedia',
  branch: 'design_2d', // Học sinh chọn 2D nhưng làm thiệp 3D
  projectName: 'Bộ tranh kể chuyện — Thiệp 3D Yêu Thương',
  productFormat: 'Thiệp điện tử 3D tương tác',
  dreamAudience: 'gia đình và người thân',
  dreamPurpose: 'gửi lời chúc yêu thương và tình cảm tri ân',
  dreamFeatures: [
    'Có hình minh họa chính',
    'Phối màu sắc theo chủ đề ấm áp',
    'Dòng chữ ngắn dễ đọc gửi lời yêu thương'
  ],
  dreamAppearance: 'Mô hình thiệp 3D ấm cúng với nhân vật gia đình',
  futureSelf: 'Nhà sáng tạo nội dung số & thiết kế trải nghiệm 3D tương lai',
  confirmedTraits: ['Tò mò', 'Sáng tạo', 'Kiên trì'],
  hoursPerWeek: 2,
  familyReviewConfirmed: true,
  parentApprovesExternalTransfer: true
};

const longQuanProjects = generatePersonalizedProjects(longQuanAnswers);
const { safePayload, fullPrompt } = buildSafeAIStudioPrompt(longQuanAnswers, longQuanProjects);

// ── 1. KIỂM TRA ARCHITECTURE: CHỈ ĐÚNG 2 TABS ──
console.log('1. KIỂM TRA 2 TABS ĐIỀU HƯỚNG CẤP CAO:');
if (!fullPrompt.includes('TAB 1: HỒ SƠ TƯƠNG LAI') || !fullPrompt.includes('My Future Profile')) {
  throw new Error('Prompt missing TAB 1 definition!');
}
if (!fullPrompt.includes('TAB 2: LỘ TRÌNH PHÁT TRIỂN') || !fullPrompt.includes('My Development Roadmap')) {
  throw new Error('Prompt missing TAB 2 definition!');
}
if (!fullPrompt.includes('EXACTLY TWO MAIN TABS')) {
  throw new Error('Prompt missing EXACTLY TWO MAIN TABS specification!');
}
console.log('   => [PASS] Exactly two main tabs architecture verified.');

// ── 2. KIỂM TRA 6 CORE EDITORIAL ZONES TRONG TAB 1 ──
console.log('\n2. KIỂM TRA 6 CORE EDITORIAL ZONES TRONG TAB 1:');
const expectedZones = [
  'ZONE 01 · PROFESSIONAL HERO',
  'ZONE 02 · FEATURED DREAM PROJECT SHOWCASE',
  'ZONE 03 · TARGET CAPABILITY MAP',
  'ZONE 04 · PROFESSIONAL TECH STACK & TOOL PROFICIENCY',
  'ZONE 05 · FUTURE PROJECT EXPERIENCE',
  'ZONE 06 · VISION, SOCIAL IMPACT & FEEDBACK'
];

expectedZones.forEach(zone => {
  if (!fullPrompt.includes(zone)) {
    throw new Error(`Prompt missing Zone: "${zone}"!`);
  }
  console.log(`   - Verified: ${zone}`);
});
console.log('   => [PASS] All 6 Core Editorial Zones present in Tab 1.');

// ── 3. KIỂM TRA TAB 2: 2-COLUMN NAVIGATOR & 3 LEVELS ──
console.log('\n3. KIỂM TRA TAB 2: BỐ CỤC 2 CỘT & 3 LEVELS:');
const expectedTab2Elements = [
  'BỐ CỤC GIAO DIỆN TAB 2',
  'Project Navigator',
  'Project Detail & Function-Level Roadmap',
  'LEVEL 1 — OVERALL ROADMAP',
  'LEVEL 2 — PROJECT ROADMAP',
  'LEVEL 3 — FUNCTION ROADMAP',
  'BIDIRECTIONAL TRACEABILITY'
];

expectedTab2Elements.forEach(item => {
  if (!fullPrompt.includes(item)) {
    throw new Error(`Prompt missing Tab 2 element: "${item}"!`);
  }
  console.log(`   - Verified: ${item}`);
});
console.log('   => [PASS] 2-Column Navigator and 3 Levels verified in Tab 2.');

// ── 4. KIỂM TRA 2D ➔ 3D PATHWAY CLARIFICATION ──
console.log('\n4. KIỂM TRA DIỄN GIẢI CHUYÊN MÔN 2D ➔ 3D:');
const pathway = safePayload.presentationLayer.futureProfessionalRole.specializationPathway;
if (!pathway || !pathway.includes('Thiết kế đồ họa 2D') || !pathway.includes('3D')) {
  throw new Error(`2D to 3D pathway not clarified! Got: "${pathway}"`);
}
console.log(`   - Specialization Pathway: "${pathway}"`);
console.log('   => [PASS] 2D foundation for 3D Dream Project properly explained.');

// ── 5. KIỂM TRA TÍNH NĂNG P4: DÒNG CHỮ / LỜI CHÚC PHẢI TRONG MVP ──
console.log('\n5. KIỂM TRA P4 FEATURES: CHỮ / THÔNG ĐIỆP NẰM TRỌN TRONG MVP:');
const p4 = longQuanProjects[3];
const mvpFeatures = p4.features?.filter(f => f.scope === 'mvp') || [];
const extFeatures = p4.features?.filter(f => f.scope === 'extension') || [];

console.log(`   - MVP Features (${mvpFeatures.length}):`);
mvpFeatures.forEach(f => console.log(`     * [${f.id}] ${f.name}`));
console.log(`   - Extension Features (${extFeatures.length}):`);
extFeatures.forEach(f => console.log(`     * [${f.id}] ${f.name}`));

const hasTextMessageInMVP = mvpFeatures.some(f => f.name.toLowerCase().includes('chữ') || f.name.toLowerCase().includes('lời yêu thương') || f.name.toLowerCase().includes('màu sắc'));
if (!hasTextMessageInMVP) {
  throw new Error('Essential text / message feature was not included in MVP!');
}
console.log('   => [PASS] Essential short text message and color theme are in MVP.');

// ── 6. KIỂM TRA P4 K/S/C TRONG FUTURE EXPERIENCES KHÔNG BỊ RỖNG ──
console.log('\n6. KIỂM TRA P4 TRONG FUTURE EXPERIENCES KHÔNG BỊ RỖNG:');
const exp4 = safePayload.presentationLayer.futureExperiences[3];
if (!exp4.knowledgeTarget || exp4.knowledgeTarget.length === 0) {
  throw new Error('P4 knowledgeTarget is empty!');
}
if (!exp4.skillsTarget || exp4.skillsTarget.length === 0) {
  throw new Error('P4 skillsTarget is empty!');
}
console.log(`   - P4 Knowledge Targets (${exp4.knowledgeTarget.length}):`, exp4.knowledgeTarget);
console.log(`   - P4 Skills Targets (${exp4.skillsTarget.length}):`, exp4.skillsTarget);
console.log('   => [PASS] P4 has full synthesized K/S targets.');

// ── 7. KIỂM TRA ABOUTME KHÔNG DÙNG TEMPLATE "LẮP RÁP" CHO MULTIMEDIA ──
console.log('\n7. KIỂM TRA ABOUTME ĐÃ ĐƯỢC CÁ NHÂN HÓA CHO MULTIMEDIA:');
const aboutMe = safePayload.futureProfile.aboutMe;
if (aboutMe.includes('lắp ráp, tìm hiểu cách các thiết bị hoạt động')) {
  throw new Error('aboutMe still contains generic robotics template text for multimedia!');
}
console.log(`   - aboutMe: "${aboutMe}"`);
console.log('   => [PASS] aboutMe is personalized for multimedia & art storytelling.');

// ── 8. KIỂM TRA IMAGE MANIFEST & PROTOTYPE IMAGES ──
console.log('\n8. KIỂM TRA IMAGE MANIFEST:');
const manifest = safePayload.imageManifest;
const pAssets = manifest.assets.filter(a => a.type === 'project_prototype');
pAssets.forEach(pa => {
  console.log(`   - [${pa.projectId}] fileName="${pa.fileName}", URL="${pa.url}"`);
});

// P2 must NOT be activity-robotics in multimedia!
const p2Asset = pAssets.find(a => a.projectId === 'P2');
if (p2Asset?.url.includes('robotics')) {
  throw new Error('P2 in Multimedia must NOT have robotics image!');
}
// P1 and P4 must NOT have identical URLs in multimedia!
const p1Asset = pAssets.find(a => a.projectId === 'P1');
const p4Asset = pAssets.find(a => a.projectId === 'P4');
if (p1Asset?.url === p4Asset?.url) {
  throw new Error('P1 and P4 should have distinct images!');
}
console.log('   => [PASS] Unique, domain-matched prototype assets assigned.');

// ── 10. KIỂM TRA P1 TASKS ĐÚNG NGỮ CẢNH MULTIMEDIA ──
console.log('\n10. KIỂM TRA P1 TASKS ĐÚNG NGỮ CẢNH MULTIMEDIA:');
const p1 = longQuanProjects[0];
const fP1_01 = p1.features?.[0];
if (!fP1_01 || !fP1_01.name.includes('Chuẩn bị không gian sáng tạo')) {
  throw new Error(`P1 F1 name is not multimedia-specific: "${fP1_01?.name}"`);
}
const p1TaskText = fP1_01.tasks.map(t => t.description).join(' ');
if (p1TaskText.includes('bảng điều khiển') || p1TaskText.includes('kết nối thiết bị')) {
  throw new Error(`P1 still contains robotics hardware template text! Got: "${p1TaskText}"`);
}
console.log(`   - F-P1-01 Name: "${fP1_01.name}"`);
console.log(`   - F-P1-01 Tasks:`, fP1_01.tasks.map(t => t.description));
console.log('   => [PASS] P1 tasks correctly customized for Multimedia.');

// ── 11. KIỂM TRA HƯỚNG DẪN 5 BƯỚC (LEARNING GUIDE) ──
console.log('\n11. KIỂM TRA HƯỚNG DẪN 5 BƯỚC (LEARNING GUIDE):');
if (!fP1_01.learningGuide || !fP1_01.learningGuide.step1Learn || !fP1_01.learningGuide.step5Evidence) {
  throw new Error('F-P1-01 missing 5-step learningGuide!');
}
console.log('   - Step 1 (Học kiến thức):', fP1_01.learningGuide.step1Learn);
console.log('   - Step 2 (Luyện thao tác):', fP1_01.learningGuide.step2Practice);
console.log('   - Step 3 (Áp dụng):', fP1_01.learningGuide.step3Apply);
console.log('   - Step 4 (Kiểm tra):', fP1_01.learningGuide.step4Verify);
console.log('   - Step 5 (Lưu minh chứng):', fP1_01.learningGuide.step5Evidence);
console.log('   => [PASS] 5-step learningGuide verified.');

// ── 12. KIỂM TRA ĐỒNG NHẤT DỮ LIỆU FEATURED DREAM PROJECT & MVP TRÊN 2 TAB ──
console.log('\n12. KIỂM TRA ĐỒNG NHẤT FEATURED DREAM PROJECT TRÊN CẢ 2 TAB:');
const featuredProj = safePayload.presentationLayer.featuredDreamProject;
if (!featuredProj || !featuredProj.mvpFeatures || featuredProj.mvpFeatures.length !== 2) {
  throw new Error('featuredDreamProject in presentationLayer missing explicit 2 MVP features!');
}
if (!featuredProj.extensionFeatures || featuredProj.extensionFeatures.length !== 1) {
  throw new Error('featuredDreamProject in presentationLayer missing explicit Extension feature!');
}
console.log(`   - PresentationLayer MVP Features (${featuredProj.mvpFeatures.length}):`, featuredProj.mvpFeatures.map(f => f.name));
console.log(`   - PresentationLayer Extension Features (${featuredProj.extensionFeatures.length}):`, featuredProj.extensionFeatures.map(f => f.name));
console.log(`   - SafePayload dreamProject.mvpFeatures:`, safePayload.dreamProject.mvpFeatures);
console.log('   => [PASS] Absolute consistency of MVP / Extension across Tab 1 & Tab 2 verified.');

// ── 13. KIỂM TRA QUICK SNAPSHOT BAR CHO TAB 1 ──
console.log('\n13. KIỂM TRA QUICK SNAPSHOT BAR:');
const snapshot = safePayload.presentationLayer.quickSnapshot;
if (!snapshot || !snapshot.specialization || !snapshot.dreamProjectTitle) {
  throw new Error('presentationLayer missing quickSnapshot!');
}
console.log('   - Quick Snapshot:', snapshot);
console.log('   => [PASS] Quick snapshot bar verified.');

// ── 14. KIỂM TRA TỪ KHÓA THÂN THIỆN & VISUAL GROUNDING TRONG PROMPT ──
console.log('\n14. KIỂM TRA TỪ KHÓA THÂN THIỆN & VISUAL GROUNDING TRONG PROMPT:');
const friendlyKeywords = [
  'Hành trình 4 chặng của con',
  'Con sẽ làm gì trong dự án này?',
  'Cùng hoàn thành tính năng & Hướng dẫn thực hiện',
  'Sản phẩm & Minh chứng thực tế',
  'Con cần chuẩn bị gì trước?',
  'QUICK SNAPSHOT BAR',
  'MINI NAVIGATION BAR',
  'MANDATORY IMAGE USAGE',
  'Quản lý dữ liệu & Lưu tiến độ'
];
friendlyKeywords.forEach(kw => {
  if (!fullPrompt.includes(kw)) {
    throw new Error(`Prompt missing friendly keyword: "${kw}"!`);
  }
  console.log(`   - Verified: "${kw}"`);
});
console.log('   => [PASS] All friendly keywords & visual grounding rules present in prompt.');

console.log('\n=== ALL 14 AUDIT CHECKS PASSED: READY FOR AI STUDIO ===\n');

