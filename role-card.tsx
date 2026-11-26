import { useState } from "react";
import {
  ArrowRight,
  Bookmark,
  Check,
  CheckCheck,
  Clock3,
  MapPin,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { ROLE_DETAILS } from "@/lib/demo";
import { scoreRole, type Match, type Role } from "@/lib/matching";
import { useDemo } from "./demo-provider";

export function RoleCard({ role, match }: { role: Role; match?: Match }) {
  const { profile, activity, toggleSave, apply } = useDemo();
  const [open, setOpen] = useState(false);
  const [applying, setApplying] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [note, setNote] = useState("I would love to bring my skills and experience to your team.");
  const [email, setEmail] = useState(profile.email);
  const info = ROLE_DETAILS[role.id];
  const saved = activity.saved.includes(role.id);
  const applied = activity.applications.some((a) => a.roleId === role.id);
  const score = match ?? scoreRole(profile, role);
  const close = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setApplying(false);
      setSubmitted(false);
    }
  };
  return (
    <>
      <article className="role-card">
        <div className="role-card-header">
          <span className={`company-logo ${info?.tone ?? "company-teal"}`}>
            {info?.initials ?? role.partner[0]}
          </span>
          <div className="role-heading">
            <h3>
              <Button variant="link" onClick={() => setOpen(true)}>
                {role.title}
              </Button>
            </h3>
            <p>
              {role.partner} <ShieldCheck size={13} className="text-teal" />
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label={`${saved ? "Unsave" : "Save"} ${role.title}`}
            title={saved ? "Remove saved job" : "Save job"}
            className={`save-button ${saved ? "is-saved" : ""}`}
            onClick={() => toggleSave(role.id)}
          >
            <Bookmark fill={saved ? "currentColor" : "none"} size={18} />
          </Button>
        </div>
        <div className="role-meta">
          <span>
            <MapPin size={13} />
            {role.remote ? "Remote · Worldwide" : role.city}
          </span>
          <span>
            <Clock3 size={13} />
            {info?.type ?? "Full-time"}
          </span>
        </div>
        <p className="role-summary">{role.summary}</p>
        <div className="skill-tags">
          {role.skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className={profile.skills.includes(skill) ? "skill-matched" : ""}
            >
              {profile.skills.includes(skill) && <Check size={11} />}
              {skill}
            </Badge>
          ))}
        </div>
        <div className="role-card-footer">
          {match ? (
            <div className="match-score">
              <span className="score-icon">
                <CheckCheck size={16} />
              </span>
              <strong>{match.score}% match</strong>
              <span className="match-explanation">with your skills</span>
            </div>
          ) : (
            <span className="salary-label">{info?.salary}</span>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="details-button"
            onClick={() => setOpen(true)}
          >
            {applied ? "Applied" : "View role"}
            <ArrowRight size={14} />
          </Button>
        </div>
      </article>
      <Dialog open={open} onOpenChange={close}>
        <DialogContent className="role-dialog">
          {submitted ? (
            <>
              <div className="success-symbol">
                <CheckCheck size={32} />
              </div>
              <DialogTitle>One step closer, {profile.name.split(" ")[0]}.</DialogTitle>
              <DialogDescription>
                Your demo application for {role.title} at {role.partner} has been submitted.
              </DialogDescription>
              <p className="text-sm text-muted-foreground">
                No information was sent to an employer. You can see this application in My
                applications.
              </p>
              <Button onClick={() => close(false)}>Done</Button>
            </>
          ) : applying ? (
            <>
              <DialogTitle>Apply for {role.title}</DialogTitle>
              <DialogDescription>
                {role.partner} · {role.city}
              </DialogDescription>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  apply(role.id, note);
                  setSubmitted(true);
                }}
              >
                <div className="form-field">
                  <label htmlFor="application-name">Full name</label>
                  <Input id="application-name" value={profile.name} readOnly />
                </div>
                <div className="form-field">
                  <label htmlFor="application-email">Contact email</label>
                  <Input
                    id="application-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="application-note">A note to the hiring team</label>
                  <textarea
                    id="application-note"
                    required
                    rows={4}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Share what you would bring to this role"
                  />
                </div>
                <div className="application-profile">
                  <ShieldCheck size={18} />
                  <span>Your skills profile will be included. No CV required.</span>
                </div>
                <label className="checkbox-row">
                  <input type="checkbox" required />I understand this is a demo application, not a
                  real job submission.
                </label>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setApplying(false)}>
                    Back
                  </Button>
                  <Button type="submit">
                    Submit application
                    <ArrowRight />
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className={`company-logo ${info?.tone ?? "company-teal"}`}>{info?.initials}</div>
              <DialogTitle className="text-2xl">{role.title}</DialogTitle>
              <DialogDescription>
                {role.partner} · {role.remote ? "Remote · Worldwide" : role.city}
              </DialogDescription>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="detail-meta">
                  <Wallet size={16} />
                  {info?.salary}
                </span>
                <span className="detail-meta">
                  <Clock3 size={16} />
                  {info?.type}
                </span>
              </div>
              <p className="text-sm leading-relaxed">
                {role.summary} Collaborate with a supportive team that values your expertise,
                regardless of where you gained it.
              </p>
              <div>
                <h4 className="mb-2 font-semibold">Why this could be your next step</h4>
                <ul className="match-reasons">
                  {score.reasons.map((r) => (
                    <li key={r}>
                      <Check size={15} />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">Skills for this role</h4>
                <div className="skill-tags">
                  {role.skills.map((s) => (
                    <Badge key={s} variant="secondary">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
              {score.missingSkills.length > 0 && (
                <div className="gap-note">
                  <strong>Room to grow</strong>
                  <p>
                    {score.missingSkills.join(", ")}. You can still express interest while
                    developing these skills.
                  </p>
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                {role.minYears}+ years of experience · {role.languages.join(" / ")}
                <br />
                Example employer and salary. Local work authorization and professional licensing may
                apply.
              </p>
              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  disabled={applied}
                  onClick={() => {
                    setEmail(profile.email);
                    setApplying(true);
                  }}
                >
                  {applied ? (
                    <>
                      <Check />
                      Application submitted
                    </>
                  ) : (
                    <>
                      Apply for this role
                      <ArrowRight />
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={() => toggleSave(role.id)}>
                  <Bookmark fill={saved ? "currentColor" : "none"} />
                  {saved ? "Saved" : "Save"}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
