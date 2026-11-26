import type { Profile } from "./matching";

export type TalentProfile = Profile & {
  name: string;
  title: string;
  email: string;
  city: string;
  bio: string;
};
export const DEFAULT_PROFILE: TalentProfile = {
  name: "Esther Atabo Elimlim",
  title: "Data Analyst",
  email: "talent@example.com",
  city: "Nairobi, Kenya",
  bio: "Data professional with three years of experience turning complex information into clear, useful insights. Passionate about making a difference through technology.",
  skills: ["Data analysis", "Python", "Excel"],
  languages: ["English", "Arabic"],
  years: 3,
  wantsRemote: true,
};
export const DEMO_PROFILES: Record<string, TalentProfile> = {
  analyst: DEFAULT_PROFILE,
  engineer: {
    ...DEFAULT_PROFILE,
    name: "Daniel Okello",
    title: "Civil Engineer",
    email: "daniel.okello@example.com",
    skills: ["Civil engineering", "AutoCAD", "Project management"],
    languages: ["English", "Swahili"],
    years: 5,
    wantsRemote: false,
  },
  nurse: {
    ...DEFAULT_PROFILE,
    name: "Layla Ahmed",
    title: "Nursing Professional",
    email: "layla.ahmed@example.com",
    skills: ["Nursing", "Patient care", "Customer service"],
    languages: ["English", "Swahili", "Arabic"],
    years: 4,
    wantsRemote: false,
  },
};
export type Application = {
  roleId: string;
  note: string;
  submittedAt: string;
  status: "Submitted" | "In review";
};
export type Activity = { saved: string[]; applications: Application[] };
export type ActivityAction =
  | { type: "save"; roleId: string }
  | { type: "apply"; application: Application }
  | { type: "withdraw"; roleId: string }
  | { type: "reset" };
export const INITIAL_ACTIVITY: Activity = { saved: [], applications: [] };
export function activityReducer(state: Activity, action: ActivityAction): Activity {
  switch (action.type) {
    case "save":
      return {
        ...state,
        saved: state.saved.includes(action.roleId)
          ? state.saved.filter((id) => id !== action.roleId)
          : [...state.saved, action.roleId],
      };
    case "apply":
      return state.applications.some((a) => a.roleId === action.application.roleId)
        ? state
        : { ...state, applications: [...state.applications, action.application] };
    case "withdraw":
      return {
        ...state,
        applications: state.applications.filter((a) => a.roleId !== action.roleId),
      };
    case "reset":
      return INITIAL_ACTIVITY;
  }
}
export const ROLE_DETAILS: Record<
  string,
  { salary: string; type: string; initials: string; tone: string; sector: string }
> = {
  r1: {
    salary: "$850 – $1,200 / month",
    type: "Full-time",
    initials: "M",
    tone: "company-rose",
    sector: "Engineering",
  },
  r2: {
    salary: "$600 – $900 / month",
    type: "Full-time",
    initials: "HV",
    tone: "company-teal",
    sector: "Healthcare",
  },
  r3: {
    salary: "$1,500 – $2,200 / month",
    type: "Full-time",
    initials: "OL",
    tone: "company-teal",
    sector: "Technology",
  },
  r4: {
    salary: "$1,200 – $2,000 / month",
    type: "Full-time",
    initials: "K",
    tone: "company-rose",
    sector: "Technology",
  },
  r5: {
    salary: "$900 – $1,400 / month",
    type: "Full-time",
    initials: "B",
    tone: "company-gold",
    sector: "Education",
  },
  r6: {
    salary: "$700 – $1,100 / month",
    type: "Full-time",
    initials: "U",
    tone: "company-blue",
    sector: "Finance",
  },
  r7: {
    salary: "$800 – $1,200 / month",
    type: "Full-time",
    initials: "TA",
    tone: "company-gold",
    sector: "Operations",
  },
  r8: {
    salary: "$15 – $25 / hour",
    type: "Part-time",
    initials: "GA",
    tone: "company-blue",
    sector: "Community",
  },
  r9: {
    salary: "$850 – $1,300 / month",
    type: "Full-time",
    initials: "SG",
    tone: "company-gold",
    sector: "Engineering",
  },
  r10: {
    salary: "$800 – $1,250 / month",
    type: "Full-time",
    initials: "GR",
    tone: "company-teal",
    sector: "Agriculture",
  },
};
