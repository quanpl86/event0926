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

export type JourneyStep = {
  id: string;
  phase: string;
  title: string;
  description: string;
  type: "identity" | "multi" | "bag" | "single" | "scenario" | "project" | "handoff" | "parent" | "family" | "profile" | "pathway" | "showcase";
  minutes: number;
  buddy: string;
  options?: Option[];
};

export type JourneyAnswers = {
  name: string;
  gradeBand: string;
  avatar: string;
  projectName: string;
  futureSelf: string;
  favoriteColor: string;
  characterStyle: string;
  signatureGear: string;
  confirmedTraits: string[];
  portraitAgree: "" | "yes" | "almost" | "not-yet";
  parentPortraitFit: "" | "very" | "partly" | "not-yet";
  portraitMode: "buddy" | "self";
  parentMoment: string;
  consent: boolean;
  selections: Record<string, string[]>;
};
