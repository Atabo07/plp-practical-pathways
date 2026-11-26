import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bookmark,
  BriefcaseBusiness,
  Check,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { findMatches, ROLES } from "@/lib/matching";
import { ROLE_DETAILS } from "@/lib/demo";
import { useDemo } from "./demo-provider";
import { RoleCard } from "./role-card";
import { ProfileEditor } from "./profile-editor";

export function MatchingPage() {
  const { profile } = useDemo();
  const matches = findMatches(profile);
  const [mode, setMode] = useState("all");
  const shown = mode === "remote" ? matches.filter((m) => m.role.remote) : matches;
  return (
    <main className="page-content">
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            <span />
            POTENTIAL MEETS POSSIBILITY
          </div>
          <h1>Made for your skills.</h1>
          <p>Discover where your experience can take you next.</p>
        </div>
        <span className="count-label">
          <Sparkles size={16} />
          {matches.length} matches
        </span>
      </div>
      <div className="matching-layout">
        <ProfileEditor compact />
        <section>
          <div className="section-heading">
            <h2>{shown.length} matching opportunities</h2>
            <span className="small-label">Highest match first</span>
          </div>
          <Tabs value={mode} onValueChange={setMode}>
            <TabsList className="line-tabs">
              <TabsTrigger value="all">All matches</TabsTrigger>
              <TabsTrigger value="remote">Remote only</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="roles-stack">
            {shown.map((m) => (
              <RoleCard key={m.role.id} role={m.role} match={m} />
            ))}
            {shown.length === 0 && (
              <EmptyState
                icon="match"
                title="Your next match starts with a skill"
                text="Add a skill to your profile, or try all work styles."
              />
            )}
          </div>
          <div className="scoring-explanation">
            <ShieldCheck size={20} />
            <div>
              <h3>No black box. Just your strengths.</h3>
              <p>
                Skills: 70 points · Languages: 15 · Experience: 10 · Work style: 5. A role appears
                when you share at least one required skill. A match is not a guarantee of
                eligibility or employment.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
export function ExplorePage({ savedOnly = false }: { savedOnly?: boolean }) {
  const { activity } = useDemo();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("all");
  const [sector, setSector] = useState("all");
  const [sort, setSort] = useState("default");
  const roles = ROLES.filter(
    (r) =>
      (!savedOnly || activity.saved.includes(r.id)) &&
      `${r.title} ${r.partner} ${r.skills.join(" ")}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (location === "all" || (location === "remote" ? r.remote : !r.remote)) &&
      (sector === "all" || ROLE_DETAILS[r.id]?.sector === sector),
  ).sort((a, b) => (sort === "title" ? a.title.localeCompare(b.title) : 0));
  const reset = () => {
    setSearch("");
    setLocation("all");
    setSector("all");
  };
  return (
    <main className="page-content">
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            <span />
            {savedOnly ? "KEEP YOUR POSSIBILITIES CLOSE" : "YOUR NEXT OPPORTUNITY"}
          </div>
          <h1>{savedOnly ? "Good things, saved." : "Explore opportunities."}</h1>
          <p>
            {savedOnly
              ? "A shortlist of roles that caught your eye."
              : "Find teams that see your skills, not just your paperwork."}
          </p>
        </div>
        <span className="count-label">
          <BriefcaseBusiness size={16} />
          {savedOnly ? activity.saved.length : ROLES.length} roles
        </span>
      </div>
      <div className="explore-toolbar">
        <div className="search-field">
          <Search size={18} />
          <Input
            aria-label="Search jobs"
            placeholder="Search by role, skill, or company"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Clear search"
              onClick={() => setSearch("")}
            >
              <X />
            </Button>
          )}
        </div>
        <select
          aria-label="Filter work location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="all">All locations</option>
          <option value="remote">Remote</option>
          <option value="onsite">On-site</option>
        </select>
        <select
          aria-label="Filter industry"
          value={sector}
          onChange={(e) => setSector(e.target.value)}
        >
          <option value="all">All industries</option>
          {[
            "Technology",
            "Healthcare",
            "Engineering",
            "Education",
            "Finance",
            "Operations",
            "Community",
            "Agriculture",
          ].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="results-heading">
        <span>
          <strong>{roles.length}</strong> opportunities {savedOnly ? "saved" : "available"}
        </span>
        <div className="flex items-center gap-2">
          {(search || location !== "all" || sector !== "all") && (
            <Button variant="link" size="sm" onClick={reset}>
              Clear filters
            </Button>
          )}
          <select aria-label="Sort jobs" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">Featured first</option>
            <option value="title">Job title A–Z</option>
          </select>
        </div>
      </div>
      <div className="explore-grid">
        {roles.map((r) => (
          <RoleCard key={r.id} role={r} />
        ))}
      </div>
      {roles.length === 0 && (
        <EmptyState
          icon="save"
          title={
            savedOnly && activity.saved.length === 0
              ? "Your shortlist is waiting"
              : "No opportunities found"
          }
          text={
            savedOnly && activity.saved.length === 0
              ? "Save a role you love and find it here when you’re ready."
              : "Try a different skill or broaden your filters."
          }
        />
      )}
      <div className="matching-note">
        <ShieldCheck size={16} />
        Demo opportunities and example salaries. No real employer submissions.
      </div>
    </main>
  );
}
export function ApplicationsPage() {
  const { activity, withdraw } = useDemo();
  const [tab, setTab] = useState("all");
  const [selected, setSelected] = useState<string | null>(null);
  const apps = activity.applications.filter((a) => tab === "all" || a.status === "Submitted");
  const selectedApp = activity.applications.find((a) => a.roleId === selected);
  const selectedRole = ROLES.find((r) => r.id === selected);
  return (
    <main className="page-content">
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            <span />
            EVERY STEP COUNTS
          </div>
          <h1>Your journey, in motion.</h1>
          <p>Keep track of the opportunities you’ve reached for.</p>
        </div>
        <Button asChild>
          <Link to="/roles">
            Explore more roles
            <ArrowRight />
          </Link>
        </Button>
      </div>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="line-tabs">
          <TabsTrigger value="all">
            All applications <span>{activity.applications.length}</span>
          </TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="application-list">
        {apps.map((a) => {
          const r = ROLES.find((r) => r.id === a.roleId);
          if (!r) return null;
          const info = ROLE_DETAILS[r.id];
          return (
            <article className="application-row" key={r.id}>
              <span className={`company-logo ${info?.tone}`}>{info?.initials}</span>
              <div className="application-heading">
                <h2>{r.title}</h2>
                <p>
                  {r.partner} · {r.city}
                </p>
              </div>
              <div className="application-status">
                <span>
                  <span />
                  {a.status}
                </span>
                <small>
                  {new Date(a.submittedAt).toLocaleDateString("en", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </small>
              </div>
              <Button variant="outline" onClick={() => setSelected(r.id)}>
                View application
                <ArrowRight />
              </Button>
            </article>
          );
        })}
      </div>
      {apps.length === 0 && (
        <EmptyState
          icon="apply"
          title="Your next chapter is one application away"
          text="Explore your matches and apply when you find a role that feels right."
        />
      )}
      <Dialog
        open={selected !== null}
        onOpenChange={(v) => {
          if (!v) setSelected(null);
        }}
      >
        <DialogContent>
          <DialogTitle>{selectedRole?.title}</DialogTitle>
          <DialogDescription>{selectedRole?.partner} · Demo application</DialogDescription>
          <div className="application-timeline">
            <span>
              <Check size={16} />
            </span>
            <div>
              <strong>Application submitted</strong>
              <p>Your skills profile and note have been recorded in this workspace.</p>
            </div>
          </div>
          <div className="gap-note">
            <strong>Your note</strong>
            <p>{selectedApp?.note}</p>
          </div>
          <p className="text-sm text-muted-foreground">
            This is a local demo. No employer has received this application.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              if (selected) withdraw(selected);
              setSelected(null);
            }}
          >
            Withdraw application
          </Button>
        </DialogContent>
      </Dialog>
    </main>
  );
}
export function ProfilePage() {
  const { profile } = useDemo();
  return (
    <main className="page-content">
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            <span />
            YOUR EXPERIENCE BELONGS HERE
          </div>
          <h1>Your skills passport.</h1>
          <p>A story of what you can do — not just where you’ve been.</p>
        </div>
        <span className="count-label">
          <ShieldCheck size={16} />
          Skills-first profile
        </span>
      </div>
      <div className="profile-page-layout">
        <ProfileEditor />
        <aside className="profile-side-note">
          <span className="avatar avatar-xl">
            {profile.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </span>
          <h2>{profile.name}</h2>
          <p>{profile.title}</p>
          <span className="detail-meta">
            <MapPin size={14} />
            {profile.city}
          </span>
          <div className="sidebar-divider" />
          <h3>Your experience is valuable.</h3>
          <p>
            Skills learned at work, in your community, or through study all count. Your profile
            helps employers see your potential.
          </p>
          <div className="notice-item">
            <ShieldCheck className="text-teal" />
            <p>
              Self-reported profile. No certificates are required to find matches. Professional
              licensing may still apply.
            </p>
          </div>
          <Button asChild className="w-full">
            <Link to="/match">
              See my matches
              <ArrowRight />
            </Link>
          </Button>
        </aside>
      </div>
    </main>
  );
}
function EmptyState({
  icon,
  title,
  text,
}: {
  icon: "save" | "apply" | "match";
  title: string;
  text: string;
}) {
  const Icon = icon === "save" ? Bookmark : icon === "apply" ? BriefcaseBusiness : Sparkles;
  return (
    <div className="empty-state">
      <Icon size={32} />
      <h3>{title}</h3>
      <p>{text}</p>
      <Button asChild variant="outline">
        <Link to="/roles">
          Explore opportunities
          <ArrowRight />
        </Link>
      </Button>
    </div>
  );
}
