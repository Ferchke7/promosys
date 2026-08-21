export type IconName =
  | "analytics"
  | "bank"
  | "boxes"
  | "briefcase"
  | "chart"
  | "check"
  | "clock"
  | "factory"
  | "gauge"
  | "headphones"
  | "layers"
  | "people"
  | "refresh"
  | "route"
  | "settings"
  | "shield"
  | "target"
  | "truck"
  | "warehouse"
  | "wallet";

export interface NavItem {
  label: string;
  href: string;
}

export interface ContentCard {
  title: string;
  description: string;
  icon: IconName;
}

export interface FeatureItem extends ContentCard {
  code: string;
  preview: "bars" | "grid" | "line" | "ring" | "pipeline" | "cash" | "report" | "team";
  span?: "wide";
}

export interface WorkflowStep {
  number: string;
  title: string;
  label: string;
  icon: IconName;
}

export interface ResultItem {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description: string;
}

export interface AudienceItem extends ContentCard {
  number: string;
  tags: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContactInfo {
  phone: string;
  phoneHref: string;
  email: string;
  telegram: string;
  telegramUsername: string;
}

export interface LeadFormData {
  name: string;
  company: string;
  phone: string;
  consent: boolean;
}

export type LeadFormErrors = Partial<Record<keyof LeadFormData, string>>;
