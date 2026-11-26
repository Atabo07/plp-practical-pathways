import { useState } from "react";
import { Check, ChevronDown, Download, Plus, RotateCcw, Save, ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DEMO_PROFILES, type TalentProfile } from "@/lib/demo";
import { LANGUAGES, SKILLS } from "@/lib/matching";
import { useDemo } from "./demo-provider";

export function ProfileEditor({ compact = false }: { compact?: boolean }) {
  const { profile, setProfile } = useDemo();
  const [draft, setDraft] = useState(profile);
  const [expanded, setExpanded] = useState(!compact);
  const [preset, setPreset] = useState("analyst");
  const update = <K extends keyof TalentProfile>(key: K, value: TalentProfile[K]) => {
    const next = { ...draft, [key]: value };
    setDraft(next);
    if (compact) setProfile(next);
  };
  const toggle = (key: "skills" | "languages", value: string) =>
    update(
      key,
      draft[key].includes(value) ? draft[key].filter((s) => s !== value) : [...draft[key], value],
    );
  const loadPreset = (value: string) => {
    const next = DEMO_PROFILES[value];
    if (!next) return;
    setPreset(value);
    setDraft(next);
    setProfile(next);
    toast.success(`${next.name}’s profile loaded`);
  };
  const download = () => {
    const content = `${profile.name}\n${profile.title}\n${profile.city}\n${profile.email}\n\n${profile.bio}\n\nSkills: ${profile.skills.join(", ")}\nLanguages: ${profile.languages.join(", ")}\nExperience: ${profile.years} years\nWork preference: ${profile.wantsRemote ? "Remote" : "On-site"}\n\nSelf-reported demo profile — not a verified qualification.`;
    const url = URL.createObjectURL(new Blob([content], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "bridgework-skills-profile.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Skills profile downloaded");
  };
  return (
    <form
      className={`profile-editor ${compact ? "compact-editor" : ""}`}
      onSubmit={(e) => {
        e.preventDefault();
        setProfile(draft);
        toast.success("Profile saved", {
          description: "Your matches now reflect your updated skills.",
        });
      }}
    >
      <div className="editor-title">
        <h2>{compact ? "Your skills profile" : "Personal information"}</h2>
        <ShieldCheck size={20} className="text-teal" />
      </div>
      <div className="preset-picker">
        <label htmlFor="demo-profile">Example profile</label>
        <select id="demo-profile" value={preset} onChange={(e) => loadPreset(e.target.value)}>
          <option value="analyst">Esther · Data analyst</option>
          <option value="engineer">Daniel · Civil engineer</option>
          <option value="nurse">Layla · Nursing professional</option>
        </select>
      </div>
      {!compact && (
        <>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="profile-name">Full name</label>
              <Input
                id="profile-name"
                required
                value={draft.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="profile-title">Professional title</label>
              <Input
                id="profile-title"
                required
                value={draft.title}
                onChange={(e) => update("title", e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="profile-email">Email address</label>
              <Input
                id="profile-email"
                required
                type="email"
                value={draft.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="profile-city">Location</label>
              <Input
                id="profile-city"
                required
                value={draft.city}
                onChange={(e) => update("city", e.target.value)}
              />
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="profile-bio">About you</label>
            <textarea
              id="profile-bio"
              rows={3}
              value={draft.bio}
              onChange={(e) => update("bio", e.target.value)}
            />
          </div>
        </>
      )}
      <div className="editor-section">
        <div className="section-label">
          <label>
            Your skills <span>{draft.skills.length} selected</span>
          </label>
          {compact && (
            <Button type="button" variant="ghost" size="sm" onClick={() => setExpanded(!expanded)}>
              {expanded ? "Show less" : "Add skills"}
              {expanded ? <ChevronDown /> : <Plus />}
            </Button>
          )}
        </div>
        <div className="selection-chips">
          {(expanded ? SKILLS : draft.skills).map((s) => (
            <Button
              type="button"
              key={s}
              variant="outline"
              className={draft.skills.includes(s) ? "chip chip-on" : "chip"}
              aria-pressed={draft.skills.includes(s)}
              onClick={() => toggle("skills", s)}
            >
              {s}
              {draft.skills.includes(s) && (expanded ? <Check size={12} /> : <X size={12} />)}
            </Button>
          ))}
        </div>
      </div>
      <div className="editor-section">
        <label className="field-label">Languages</label>
        <div className="selection-chips">
          {LANGUAGES.map((l) => (
            <Button
              key={l}
              type="button"
              variant="outline"
              className={draft.languages.includes(l) ? "chip chip-on" : "chip"}
              aria-pressed={draft.languages.includes(l)}
              onClick={() => toggle("languages", l)}
            >
              {l}
              {draft.languages.includes(l) && <Check size={12} />}
            </Button>
          ))}
        </div>
      </div>
      <div className="editor-section">
        <label className="section-label" htmlFor="experience">
          Years of experience<strong>{draft.years} years</strong>
        </label>
        <input
          id="experience"
          type="range"
          min={0}
          max={15}
          value={draft.years}
          onChange={(e) => update("years", Number(e.target.value))}
          aria-label="Years of experience"
          className="experience-range"
        />
        <div className="range-labels">
          <span>Just starting</span>
          <span>15+ years</span>
        </div>
      </div>
      <div className="editor-section">
        <label className="field-label">Preferred work style</label>
        <div className="work-style-control">
          <Button
            type="button"
            variant="ghost"
            className={draft.wantsRemote ? "work-selected" : ""}
            aria-pressed={draft.wantsRemote}
            onClick={() => update("wantsRemote", true)}
          >
            Remote
          </Button>
          <Button
            type="button"
            variant="ghost"
            className={!draft.wantsRemote ? "work-selected" : ""}
            aria-pressed={!draft.wantsRemote}
            onClick={() => update("wantsRemote", false)}
          >
            On-site
          </Button>
        </div>
      </div>
      {!compact && (
        <div className="editor-actions">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setDraft(profile);
              toast.success("Unsaved changes discarded");
            }}
          >
            <RotateCcw />
            Discard changes
          </Button>
          <Button type="submit">
            <Save />
            Save profile
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            title="Download skills profile"
            aria-label="Download skills profile"
            onClick={download}
          >
            <Download />
          </Button>
        </div>
      )}
    </form>
  );
}
