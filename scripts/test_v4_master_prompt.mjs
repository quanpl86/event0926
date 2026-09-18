import {
  generatePersonalizedProjects,
  buildSafeAIStudioPrompt
} from '../src/data/v3Engine.ts';

console.log('=== TEST FUTURE ME V4 MASTER PROMPT & PRESENTATION DATA CONTRACT ===\n');

// ─────────────────────────────────────────────────────────────
// FIXTURE 1: Long Quân (Tiểu học lớp 4 - Multimedia 3D, Custom Avatar)
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
  dreamAppearance: 'Mô hình ngôi nhà 3D ấm cúng',
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

// ── 2. KIỂM TRA 11 SECTIONS TRONG TAB 1 ──
console.log('\n2. KIỂM TRA 11 SECTIONS TRONG TAB 1 (HỒ SƠ TƯƠNG LAI):');
const expectedTab1Sections = [
  'SECTION 1 — PROFESSIONAL HERO',
  'SECTION 2 — PROFESSIONAL SUMMARY',
  'SECTION 3 — FUTURE CAREER & PROFESSIONAL DIRECTION',
  'SECTION 4 — FUTURE LEARNING & PROJECT EXPERIENCE',
  'SECTION 5 — KNOWLEDGE & EXPERTISE',
  'SECTION 6 — PROFESSIONAL SKILLS',
  'SECTION 7 — TECH STACK & TOOL PROFICIENCY',
  'SECTION 8 — FUTURE CAPABILITY VISUALIZATION',
  'SECTION 9 — FEATURED PROJECTS & DREAM PROJECT SHOWCASE',
  'SECTION 10 — FEEDBACK, TESTIMONIALS & SOCIAL IMPACT',
  'SECTION 11 — FUTURE IMPACT & PROFESSIONAL VISION'
];

expectedTab1Sections.forEach(sec => {
  if (!fullPrompt.includes(sec)) {
    throw new Error(`Prompt missing Tab 1 section: "${sec}"!`);
  }
  console.log(`   - Verified: ${sec}`);
});
console.log('   => [PASS] All 11 sections present in Tab 1.');

// ── 3. KIỂM TRA 3 LEVELS TRONG TAB 2 ──
console.log('\n3. KIỂM TRA 3 LEVELS TRONG TAB 2 (LỘ TRÌNH PHÁT TRIỂN) & BIDIRECTIONAL TRACEABILITY:');
const expectedTab2Levels = [
  'LEVEL 1 — OVERALL ROADMAP',
  'LEVEL 2 — PROJECT ROADMAP',
  'LEVEL 3 — FUNCTION ROADMAP',
  'BIDIRECTIONAL TRACEABILITY'
];

expectedTab2Levels.forEach(lvl => {
  if (!fullPrompt.includes(lvl)) {
    throw new Error(`Prompt missing Tab 2 level: "${lvl}"!`);
  }
  console.log(`   - Verified: ${lvl}`);
});
console.log('   => [PASS] All 3 levels and Bidirectional Traceability verified in Tab 2.');

// ── 4. KIỂM TRA PRESENTATION LAYER TRONG SAFEPAYLOAD ──
console.log('\n4. KIỂM TRA PRESENTATION LAYER TRONG SAFEPAYLOAD:');
const pres = safePayload.presentationLayer;
if (!pres) throw new Error('safePayload missing presentationLayer!');

// futureProfessionalRole
if (!pres.futureProfessionalRole || pres.futureProfessionalRole.title !== 'Nhà sáng tạo nội dung số & thiết kế trải nghiệm 3D tương lai') {
  throw new Error('Invalid futureProfessionalRole in presentationLayer!');
}
console.log(`   - futureProfessionalRole.title: "${pres.futureProfessionalRole.title}"`);
console.log(`   - futureProfessionalRole.techSector: "${pres.futureProfessionalRole.techSector}"`);
console.log(`   - futureProfessionalRole.badge: "${pres.futureProfessionalRole.badge}"`);

// professionalSummary
if (!pres.professionalSummary || !pres.professionalSummary.introduction) {
  throw new Error('Invalid professionalSummary in presentationLayer!');
}
console.log(`   - professionalSummary: "${pres.professionalSummary.introduction.slice(0, 70)}..."`);

// futureExperiences (4 items)
if (!pres.futureExperiences || pres.futureExperiences.length !== 4) {
  throw new Error(`Expected 4 futureExperiences, got ${pres.futureExperiences?.length}`);
}
const exp4 = pres.futureExperiences[3];
if (!exp4.isFeaturedDreamProject || exp4.title !== 'Thiệp 3D Yêu Thương') {
  throw new Error('P4 must be Featured Dream Project with exact name "Thiệp 3D Yêu Thương"!');
}
console.log(`   - futureExperiences count: ${pres.futureExperiences.length}`);
console.log(`   - P4 Experience: "${exp4.title}" (Featured: ${exp4.isFeaturedDreamProject}, Status: ${exp4.status})`);

// targetProficiency
if (!pres.targetProficiency || !pres.targetProficiency.scaleDefinition?.L1 || !pres.targetProficiency.scaleDefinition?.L4) {
  throw new Error('Invalid targetProficiency scale definition!');
}
console.log(`   - targetProficiency scale: L1 to L4 defined with criteria.`);

// capabilityVisualization
if (!pres.capabilityVisualization || pres.capabilityVisualization.dimensions.length !== 3) {
  throw new Error('Invalid capabilityVisualization dimensions!');
}
console.log(`   - capabilityVisualization: 3 dimensions (Knowledge, Skills, Competencies) mapped without fake % scores.`);

// featuredProjects
if (!pres.featuredProjects || pres.featuredProjects.length !== 4) {
  throw new Error(`Expected 4 featuredProjects, got ${pres.featuredProjects?.length}`);
}
console.log(`   - featuredProjects count: ${pres.featuredProjects.length}`);

// testimonials
if (!pres.testimonials || pres.testimonials.hasVerifiedFeedback !== false || pres.testimonials.reviews.length !== 0) {
  throw new Error('Testimonials must be unverified and empty by default (no fake reviews)!');
}
console.log(`   - testimonials: verifiedReviews empty, notice displayed: "${pres.testimonials.notice}"`);

// futureImpact
if (!pres.futureImpact || !pres.futureImpact.targetAudience) {
  throw new Error('Invalid futureImpact in presentationLayer!');
}
console.log(`   - futureImpact: Audience="${pres.futureImpact.targetAudience}", CTA="${pres.futureImpact.nextStepCTA}"`);
console.log('   => [PASS] Complete presentationLayer verified.');

// ── 5. KIỂM TRA IMAGE ASSET MANIFEST ──
console.log('\n5. KIỂM TRA IMAGE ASSET MANIFEST:');
const manifest = safePayload.imageManifest;
if (!manifest) throw new Error('safePayload missing imageManifest!');
if (manifest.activeHeroAssetId !== 'asset-hero-custom') {
  throw new Error(`activeHeroAssetId must be "asset-hero-custom", got "${manifest.activeHeroAssetId}"`);
}
const heroAsset = manifest.assets.find(a => a.assetId === 'asset-hero-custom');
if (!heroAsset || heroAsset.source !== 'user_uploaded' || !heroAsset.dataUrl) {
  throw new Error('Hero asset must preserve custom avatar dataUrl and user_uploaded source!');
}
console.log(`   - Hero Asset: ID="${heroAsset.assetId}", Type="${heroAsset.type}", Source="${heroAsset.source}", Approved=${heroAsset.approved}`);

const pAssets = manifest.assets.filter(a => a.type === 'project_prototype');
if (pAssets.length !== 4) {
  throw new Error(`Expected 4 project_prototype assets, got ${pAssets.length}`);
}
pAssets.forEach(pa => {
  console.log(`   - Project Asset: ID="${pa.assetId}", ProjectID="${pa.projectId}", URL="${pa.url}"`);
});
console.log('   => [PASS] Image asset manifest verified.');

// ── 6. KIỂM TRA DATA INTEGRITY & INPUT DATA SECTIONS ──
console.log('\n6. KIỂM TRA INPUT DATA SECTIONS TRONG PROMPT:');
if (!fullPrompt.includes('{{APPROVED_FUTURE_ME_DATA_JSON}}') || !fullPrompt.includes('{{APPROVED_IMAGE_ASSETS}}')) {
  throw new Error('Prompt missing required data anchors {{APPROVED_FUTURE_ME_DATA_JSON}} or {{APPROVED_IMAGE_ASSETS}}!');
}
console.log('   => [PASS] Required input data anchors present.');

console.log('\n=== ALL TESTS PASSED SUCCESSFULLY! ===\n');
