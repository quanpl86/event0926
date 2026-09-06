export type Option = {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
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
  portraitMode: "buddy" | "self";
  parentMoment: string;
  consent: boolean;
  selections: Record<string, string[]>;
};
