import { createContext, useContext, useReducer, useState, type ReactNode } from "react";
import { toast } from "sonner";
import {
  activityReducer,
  DEFAULT_PROFILE,
  INITIAL_ACTIVITY,
  type Activity,
  type TalentProfile,
} from "@/lib/demo";

type DemoContextValue = {
  profile: TalentProfile;
  setProfile: (profile: TalentProfile) => void;
  activity: Activity;
  toggleSave: (roleId: string) => void;
  apply: (roleId: string, note: string) => void;
  withdraw: (roleId: string) => void;
  reset: () => void;
};
const DemoContext = createContext<DemoContextValue | null>(null);
export function DemoProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [activity, dispatch] = useReducer(activityReducer, INITIAL_ACTIVITY);
  const toggleSave = (roleId: string) => {
    const saved = activity.saved.includes(roleId);
    dispatch({ type: "save", roleId });
    toast.success(saved ? "Role removed from saved jobs" : "Role added to saved jobs");
  };
  const apply = (roleId: string, note: string) => {
    dispatch({
      type: "apply",
      application: { roleId, note, submittedAt: new Date().toISOString(), status: "Submitted" },
    });
    toast.success("Application submitted", {
      description: "Your demo application is now in My applications.",
    });
  };
  const withdraw = (roleId: string) => {
    dispatch({ type: "withdraw", roleId });
    toast.success("Application withdrawn");
  };
  const reset = () => {
    setProfile(DEFAULT_PROFILE);
    dispatch({ type: "reset" });
    toast.success("Demo reset to Esther’s profile");
  };
  return (
    <DemoContext.Provider
      value={{ profile, setProfile, activity, toggleSave, apply, withdraw, reset }}
    >
      {children}
    </DemoContext.Provider>
  );
}
export function useDemo() {
  const value = useContext(DemoContext);
  if (!value) throw new Error("DemoProvider is required");
  return value;
}
