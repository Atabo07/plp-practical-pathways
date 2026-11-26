import { describe, expect, it } from "vitest";
import { findMatches, scoreRole, ROLES } from "./matching";

const engineer = ROLES.find((r) => r.id === "r1")!;

describe("skills-first matching", () => {
  it("gives a full 100 when every requirement is met", () => {
    const m = scoreRole({ skills: ["Civil engineering", "AutoCAD", "Project management"], languages: ["English"], years: 3, wantsRemote: false }, engineer);
    expect(m.score).toBe(100);
  });

  it("hides roles that share no skill with the person", () => {
    const res = findMatches({ skills: ["Nursing"], languages: ["English"], years: 5, wantsRemote: false });
    expect(res.map((m) => m.role.id)).toEqual(["r2"]);
  });

  it("lists missing skills as gaps", () => {
    const m = scoreRole({ skills: ["AutoCAD"], languages: [], years: 0, wantsRemote: true }, engineer);
    expect(m.missingSkills).toEqual(["Civil engineering", "Project management"]);
  });
});
