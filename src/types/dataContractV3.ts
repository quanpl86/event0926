/**
 * Future Me Data Contract V3
 * Tuân thủ nghiêm ngặt theo docs/02_hop_dong_du_lieu_va_quy_tac.json
 */

export type EducationLevel = "primary" | "secondary";
export type PrimaryGrade = "1" | "2" | "3" | "4" | "5";
export type SecondaryGrade = "6" | "7" | "8" | "9";
export type GradeBand = "1-2" | "3-5" | "6-7" | "8-9";

export type DomainId = "robotics" | "game_programming" | "multimedia";

export type PrimaryBranchId =
  | "game"
  | "interactive_app"
  | "robot_build_and_block_control"
  | "design_2d"
  | "design_3d"
  | "animation_2d"
  | "video_and_effects";

export type SecondaryBranchId =
  | "game_3d"
  | "desktop_app"
  | "web"
  | "smart_device"
  | "automation"
  | "connected_system"
  | "design_2d"
  | "design_3d"
  | "animation_2d"
  | "video_and_effects";

export type BranchId = PrimaryBranchId | SecondaryBranchId;

export type EvidenceStatus = "observed" | "emerging" | "insufficient_evidence" | "parent_reported";

export type SIOEvidenceRecord = {
  sioId: string;
  stepId: string;
  questionId: string;
  questionPrompt: string;
  studentResponse: string;
  evidenceCriteria: string;
  evidenceType: "situation_response" | "self_report" | "parent_observation";
  status: EvidenceStatus;
  standardRefs: string[];
  limitations: string;
};

export type DreamProjectBrief = {
  name: string;
  audience: string;
  purpose: string;
  features: string[];
  appearance: string;
  confirmedByStudent: boolean;
};

export interface CapabilityTarget {
  id: string; // "K-01", "S-01", "C-01"
  type: "knowledge" | "skill" | "competency";
  name: string;
  description: string;
  projectIds: Array<"P1" | "P2" | "P3" | "P4">;
  featureIds: string[];
  outcomeCriteria: string[];
  standardRef?: string;
}

export interface ProjectFeatureTask {
  id: string;
  description: string;
  knowledgeIds: string[];
  skillIds: string[];
  competencyIds: string[];
}

export interface FeatureLearningGuide {
  step1Learn: string;       // 1. Học kiến thức cốt lõi
  step2Practice: string;    // 2. Luyện thao tác kỹ thuật
  step3Apply: string;       // 3. Áp dụng vào sản phẩm
  step4Verify: string;      // 4. Kiểm tra tiêu chí quan sát được
  step5Evidence: string;    // 5. Lưu minh chứng sản phẩm
}

export interface ProjectFeature {
  id: string;
  name: string;
  description: string;
  knowledgeIds: string[];
  skillIds: string[];
  competencyIds: string[];
  tasks: ProjectFeatureTask[];
  learningGuide?: FeatureLearningGuide;
  deliverable: string;
  successCriteria: string[];
  evidenceArtifacts: string[];
  scope: "mvp" | "extension";
  implementationMode: "physical" | "simulation" | "software" | "design";
}

export type PersonalizedProject = {
  projectNumber: 1 | 2 | 3 | 4;
  title: string;
  objective: string;
  adaptedFromLibraryId: string;
  tasks: [string, string, string]; // Đúng 3 việc cụ thể
  expectedDeliverable: string;
  isDreamProjectMilestone: boolean;
  features?: ProjectFeature[];
};

export interface DetailedPersonalizedProject {
  id: "P1" | "P2" | "P3" | "P4";
  projectNumber: 1 | 2 | 3 | 4;
  name: string;
  roleDescription: string;
  goal: string;
  features: ProjectFeature[];
  tasks: [string, string, string];
  deliverable: string;
  completionCheck: string;
  isDreamProject: boolean;
  adaptedFromLibraryId?: string;
  sioIds?: string[];
  image: string;
}

export type FamilySupportConfig = {
  timePerWeekHours: number | null; // null = chưa chốt lịch
  pacingMode: "flexible" | "weekly_scheduled";
  supportRole: string[];
  devicesAvailable: string[];
};

export type PrivacyConsentRecord = {
  reviewed: boolean;
  omitIdentifiers: true; // Bắt buộc true
  parentApprovesExternalTransfer: boolean;
  parentApprovesSupabaseStorage: boolean;
  timestamp: string;
};

/**
 * Payload xuất an toàn sang Google AI Studio
 * BẮT BUỘC chỉ chứa các trường được phép, loại bỏ 100% PII
 */
export type AIStudioExportPayload = {
  schemaVersion: "3.1.0";
  displayName: string; // Tên thân mật/bí danh, KHÔNG họ tên thật
  educationLevel: EducationLevel;
  gradeBand: GradeBand;
  archetype: string;
  dreamProject: {
    name: string;
    purpose: string;
    audience: string;
    features: string[];
    appearance: string;
  };
  fourPersonalizedProjects: PersonalizedProject[];
  observedStrengths: {
    criteria: string;
    evidenceSource: string;
  }[];
  parentHighlight: string;
  familyPacingNotice: string;
  consentConfirmed: true;
};

/**
 * Hợp đồng dữ liệu hoàn chỉnh của một phiên tương tác V3
 */
export type FutureMeSessionSubmissionV3 = {
  schemaVersion: "3.0.0";
  sessionId: string;
  displayName: string;
  grade: string;
  educationLevel: EducationLevel;
  studentInterest: {
    selectedDomains: DomainId[];
    scenarioPreferences: string[];
  };
  parentInterest: {
    observedInterests: string[];
  };
  domainConfirmation: {
    selectedDomain: DomainId;
    specialization: BranchId;
    selectedByStudent: boolean;
    confirmedByFamily: boolean;
  };
  dreamProject: DreamProjectBrief;
  studentObservations: {
    selfReport: string[];
    sioEvidence: SIOEvidenceRecord[];
  };
  parentCompetency: {
    observations: string[];
    supports: string[];
    realLifeMoment: string;
  };
  familySupport: FamilySupportConfig;
  fourProjects: [PersonalizedProject, PersonalizedProject, PersonalizedProject, PersonalizedProject];
  privacyConsent: PrivacyConsentRecord;
};

export interface FutureCapabilityPortfolioData {
  identity: {
    roleTitle: string;
    roleSubtitle: string;
    avatarSource: string;
    displayName: string;
    grade: string;
    educationLevel: EducationLevel;
    motto: string;
    aboutMe: string;
  };
  vision: {
    techSector: string;
    techSectorDescription: string;
    dreamQuote: string;
    confirmedTraits: string[];
  };
  dreamProject: DreamProjectBrief;
  targetCapabilities: {
    knowledge: CapabilityTarget[];
    skills: CapabilityTarget[];
    competencies: CapabilityTarget[];
  };
  targetTechStack: {
    category: string;
    items: { name: string; level: 'Tiểu học' | 'THCS' | 'Tiểu học & THCS' }[];
  }[];
  projects: DetailedPersonalizedProject[];
  familyAlignment: {
    studentAspiration: string;
    parentObservation: string;
    agreedPoints: string[];
    differingPoints: string[];
    confirmedDecision: "keep_direction" | "adjust_pacing" | "need_discussion";
    confirmedDecisionLabel: string;
  };
  futureImpact: {
    beneficiary: string;
    socialPurpose: string;
    appliedValue: string;
  };
  academicReferences: {
    code: string;
    label: string;
    domainSummary: string;
  }[];
}
