import { describe, expect, it } from "vitest";
import { activityReducer, INITIAL_ACTIVITY } from "./demo";
describe("local demo activity", () => {
  it("saves and unsaves a role locally", () => {
    const saved = activityReducer(INITIAL_ACTIVITY, { type: "save", roleId: "r3" });
    expect(saved.saved).toEqual(["r3"]);
    expect(activityReducer(saved, { type: "save", roleId: "r3" }).saved).toEqual([]);
  });
  it("keeps a submitted application and prevents duplicates", () => {
    const application = {
      roleId: "r3",
      note: "I have Python experience",
      submittedAt: "2026-11-26",
      status: "Submitted" as const,
    };
    const submitted = activityReducer(INITIAL_ACTIVITY, { type: "apply", application });
    expect(submitted.applications).toEqual([application]);
    expect(activityReducer(submitted, { type: "apply", application }).applications).toHaveLength(1);
    expect(activityReducer(submitted, { type: "withdraw", roleId: "r3" }).applications).toEqual([]);
  });
});
