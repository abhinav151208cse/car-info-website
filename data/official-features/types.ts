export type FeatureCategory =
  | "exterior"
  | "interior"
  | "entertainment"
  | "safety"
  | "comfort"
  | "convenience"
  | "adas";

export type TrimFeaturePack = Partial<Record<FeatureCategory, string[]>>;

export type CarFeatureConfig = {
  /** Applied to every variant of this model */
  standard: TrimFeaturePack;
  /** Ordered from base to top; cumulative merge up to matched trim */
  trimOrder: string[];
  /** Features added at each trim (cumulative) */
  trimAdditions: Record<string, TrimFeaturePack>;
  /** Parallel trim lines that branch from a base trim (e.g. GTX from HTX) */
  branches?: Record<
    string,
    { fromTrim: string; trimOrder: string[]; trimAdditions: Record<string, TrimFeaturePack> }
  >;
};

export const FEATURE_CATEGORY_LABELS: Record<FeatureCategory, string> = {
  exterior: "Exterior",
  interior: "Interior",
  entertainment: "Entertainment & Connectivity",
  safety: "Safety",
  comfort: "Comfort",
  convenience: "Convenience",
  adas: "ADAS & Driver Assistance",
};
