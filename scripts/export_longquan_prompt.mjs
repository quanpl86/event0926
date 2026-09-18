import fs from 'fs';
import path from 'path';
import {
  generatePersonalizedProjects,
  buildSafeAIStudioPrompt
} from '../src/data/v3Engine.ts';

const longQuanAnswers = {
  name: 'Long Quân',
  gender: 'male',
  grade: '4',
  gradeBand: '3-5',
  avatar: 'creator',
  avatarSource: 'custom',
  customAvatarData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  domain: 'multimedia',
  branch: 'design_2d',
  projectName: 'Bộ tranh kể chuyện',
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

// Output directory
const outDir = path.resolve('public/exported-prompt');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. Write full prompt
fs.writeFileSync(path.join(outDir, 'master-prompt-longquan.txt'), fullPrompt, 'utf-8');

// 2. Write data contract json
fs.writeFileSync(path.join(outDir, 'payload-longquan.json'), JSON.stringify(safePayload, null, 2), 'utf-8');

console.log('✅ Exported master-prompt-longquan.txt (' + fullPrompt.length + ' chars)');
console.log('✅ Exported payload-longquan.json');
