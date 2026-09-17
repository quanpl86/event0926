export type GradeBand = "1-2" | "3-5" | "6-7" | "8-9";
export type AgeTier = "g12" | "g35" | "g67" | "g89";

export type Option = {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
};

export type FutureProject = {
  id: string;
  title: string;
  description: string;
  actions: string[];
  image: string;
};

export type StandardRef = {
  code: string;
  label: string;
  whyWeAsk?: string;
};

export type JourneyStep = {
  id: string;
  stageIndex: number; // 1 to 7
  phase: string;
  phasePrimary?: string;
  phaseSecondary?: string;
  title: string;
  titleSecondary?: string;
  description: string;
  descriptionSecondary?: string;
  type: "identity" | "multi" | "bag" | "single" | "scenario" | "project" | "handoff" | "parent" | "family" | "profile" | "pathway" | "showcase";
  minutes: number;
  buddy: string;
  buddySecondary?: string;
  standard?: StandardRef;
  trackFilter?: string; // e.g. "robot" | "game" | "design" | "digital-world"
  gradeScope?: "primary" | "secondary" | "all";
  options?: Option[];
};

export type JourneyAnswers = {
  name: string;
  gradeBand: string; // "1-2" | "3-5" | "6-7" | "8-9"
  grade?: string; // "1" .. "9"
  avatar: string;
  projectName: string;
  futureSelf: string;
  favoriteColor: string;
  characterStyle: string;
  signatureGear: string;
  confirmedTraits: string[];
  portraitAgree?: "" | "yes" | "almost" | "not-yet";
  parentPortraitFit?: "" | "very" | "partly" | "not-yet";
  portraitMode?: "buddy" | "self";
  parentMoment?: string;
  consent: boolean;
  selections: Record<string, string[]>;

  // V3 20-step fields
  domain?: string;
  branch?: string;
  dreamAudience?: string;
  dreamPurpose?: string;
  dreamFeatures?: string[];
  dreamAppearance?: string;
  dreamStory?: string;
  knowledgeResponse?: string;
  skillResponse?: string;
  problemResponse?: string;
  selfReflection?: string[];
  parentObservedTask?: string;
  parentObservedExample?: string;
  hoursPerWeek?: number | null;
  availableResources?: string[];
  supportMode?: string[];
  familyConflict?: string;
  familyReviewConfirmed?: boolean;
  parentApprovesExternalTransfer?: boolean;

  // Custom Avatar support
  avatarSource?: "system" | "custom";
  customAvatarData?: string;
  avatarExportConsent?: boolean;
};
