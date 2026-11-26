export type Role = {
  id: string;
  title: string;
  partner: string;
  city: string;
  remote: boolean;
  skills: string[];
  languages: string[];
  minYears: number;
  summary: string;
};

export type Profile = {
  skills: string[];
  languages: string[];
  years: number;
  wantsRemote: boolean;
};

export type Match = {
  role: Role;
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  reasons: string[];
};

export const SKILLS = [
  "Civil engineering", "AutoCAD", "Project management", "Nursing", "Patient care",
  "Pharmacy", "Teaching", "Curriculum design", "Accounting", "Excel",
  "Python", "JavaScript", "Data analysis", "Electrical wiring", "Welding",
  "Customer service", "Translation", "Logistics", "Agronomy", "Graphic design",
];

export const LANGUAGES = ["English", "Arabic", "French", "Swahili", "Dari", "Ukrainian", "Spanish", "Tigrinya"];

export const ROLES: Role[] = [
  { id: "r1", title: "Junior Site Engineer", partner: "Meridian Build Co.", city: "Nairobi", remote: false, skills: ["Civil engineering", "AutoCAD", "Project management"], languages: ["English"], minYears: 2, summary: "Support site supervision on mid-rise residential projects." },
  { id: "r2", title: "Care Assistant (Nurse Bridging Track)", partner: "Hope Valley Clinics", city: "Kampala", remote: false, skills: ["Nursing", "Patient care"], languages: ["English", "Swahili"], minYears: 1, summary: "Paid role while completing local nursing re-certification." },
  { id: "r3", title: "Data Analyst", partner: "OpenLedger Fintech", city: "Remote", remote: true, skills: ["Data analysis", "Python", "Excel"], languages: ["English"], minYears: 2, summary: "Build dashboards and reports for a payments platform." },
  { id: "r4", title: "Frontend Developer", partner: "Kinetic Labs", city: "Remote", remote: true, skills: ["JavaScript", "Graphic design"], languages: ["English"], minYears: 1, summary: "Ship web features for an education product." },
  { id: "r5", title: "STEM Teacher", partner: "Brightpath Schools", city: "Amman", remote: false, skills: ["Teaching", "Curriculum design"], languages: ["Arabic", "English"], minYears: 3, summary: "Teach maths and science to secondary students." },
  { id: "r6", title: "Bookkeeper", partner: "Unity Cooperative Bank", city: "Kigali", remote: false, skills: ["Accounting", "Excel"], languages: ["French", "English"], minYears: 2, summary: "Manage accounts for small member businesses." },
  { id: "r7", title: "Logistics Coordinator", partner: "TransAfrica Freight", city: "Addis Ababa", remote: false, skills: ["Logistics", "Excel", "Customer service"], languages: ["English", "Tigrinya"], minYears: 1, summary: "Coordinate shipments across regional warehouses." },
  { id: "r8", title: "Community Interpreter", partner: "Global Aid Partners", city: "Remote", remote: true, skills: ["Translation", "Customer service"], languages: ["Arabic", "Dari", "English"], minYears: 0, summary: "Interpret for health and legal appointments." },
  { id: "r9", title: "Electrical Technician", partner: "SunGrid Energy", city: "Nairobi", remote: false, skills: ["Electrical wiring", "Welding"], languages: ["English"], minYears: 2, summary: "Install and maintain solar mini-grids." },
  { id: "r10", title: "Agricultural Field Officer", partner: "GreenRoots Farms", city: "Lusaka", remote: false, skills: ["Agronomy", "Project management"], languages: ["English"], minYears: 2, summary: "Advise smallholder farmers on crop yields." },
];

/**
 * Score out of 100: skills 70, languages 15, experience 10, work-style 5.
 * Roles with no matching skill are never shown.
 */
export function scoreRole(profile: Profile, role: Role): Match {
  const matchedSkills = role.skills.filter((s) => profile.skills.includes(s));
  const missingSkills = role.skills.filter((s) => !profile.skills.includes(s));
  const langHit = role.languages.filter((l) => profile.languages.includes(l));
  const reasons: string[] = [];

  const skillPts = (matchedSkills.length / role.skills.length) * 70;
  const langPts = langHit.length > 0 ? 15 : 0;
  const expPts = profile.years >= role.minYears ? 10 : (profile.years / Math.max(role.minYears, 1)) * 10;
  const stylePts = profile.wantsRemote === role.remote ? 5 : 0;

  if (matchedSkills.length) reasons.push(`You have ${matchedSkills.length} of ${role.skills.length} required skills`);
  if (langHit.length) reasons.push(`You speak ${langHit.join(", ")}`);
  if (profile.years >= role.minYears) reasons.push(`Your ${profile.years} years meet the ${role.minYears}-year requirement`);
  if (stylePts) reasons.push(role.remote ? "Remote, as you prefer" : "On-site, as you prefer");

  return { role, score: Math.round(skillPts + langPts + expPts + stylePts), matchedSkills, missingSkills, reasons };
}

export function findMatches(profile: Profile, roles: Role[] = ROLES): Match[] {
  return roles
    .map((r) => scoreRole(profile, r))
    .filter((m) => m.matchedSkills.length > 0)
    .sort((a, b) => b.score - a.score);
}
