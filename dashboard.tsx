import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  BriefcaseBusiness,
  Check,
  Globe2,
  Network,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { findMatches, ROLES } from "@/lib/matching";
import community from "@/assets/community.png";
import { useDemo } from "./demo-provider";
import { RoleCard } from "./role-card";

export function Dashboard() {
  const { profile, activity } = useDemo();
  const [tab, setTab] = useState("recommended");
  const matches = findMatches(profile);
  const displayed = tab === "remote" ? matches.filter((m) => m.role.remote) : matches;
  const stats = [
    {
      label: "Matching opportunities",
      value: matches.length,
      caption: "Aligned with your skills",
      icon: Sparkles,
      tone: "stat-rose",
      to: "/match" as const,
    },
    {
      label: "Saved jobs",
      value: activity.saved.length,
      caption: "Your next possibilities",
      icon: Bookmark,
      tone: "stat-blue",
      to: "/saved" as const,
    },
    {
      label: "Applications sent",
      value: activity.applications.length,
      caption: "Steps toward your future",
      icon: BriefcaseBusiness,
      tone: "stat-teal",
      to: "/applications" as const,
    },
    {
      label: "Hiring partners",
      value: ROLES.length,
      caption: "Open to your potential",
      icon: Globe2,
      tone: "stat-gold",
      to: "/roles" as const,
    },
  ];
  return (
    <main className="page-content dashboard-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            <span />
            YOUR TALENT, RECOGNIZED
          </div>
          <h1>
            Welcome back, {profile.name.split(" ")[0]}
            <span className="greeting-dot">.</span>
          </h1>
          <p>Your next opportunity starts with what you can do.</p>
        </div>
        <Button variant="outline" asChild className="profile-cta">
          <Link to="/profile">
            <UserProfileIcon />
            Edit my profile
          </Link>
        </Button>
      </div>
      <section className="opportunity-banner">
        <div>
          <span className="banner-eyebrow">
            <Sparkles size={14} />
            SKILLS FIRST. POSSIBILITIES NEXT.
          </span>
          <h2>
            A new chapter.
            <br />
            Built on your strengths.
          </h2>
          <p>
            Your experience matters — wherever you gained it.
            <br className="desktop-break" /> Let’s connect it to an opportunity that fits.
          </p>
          <Button asChild className="banner-button">
            <Link to="/match">
              Discover my matches
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
        <div className="banner-art" aria-hidden="true">
          <div className="bridge-arch arch-one" />
          <div className="bridge-arch arch-two" />
          <div className="bridge-arch arch-three" />
          <div className="banner-note">
            <ShieldCheck size={18} />
            <span>
              Skills over paperwork.
              <br />
              <strong>People over labels.</strong>
            </span>
          </div>
        </div>
      </section>
      <section className="stats-grid" aria-label="Your workspace at a glance">
        {stats.map(({ label, value, caption, icon: Icon, tone, to }) => (
          <Link to={to} key={label} className="stat-card">
            <div className="stat-top">
              <span>{label}</span>
              <span className={`stat-icon ${tone}`}>
                <Icon size={18} />
              </span>
            </div>
            <strong>{String(value).padStart(2, "0")}</strong>
            <div className="stat-bottom">
              <span>{caption}</span>
              <ArrowUpRight size={14} />
            </div>
          </Link>
        ))}
      </section>
      <div className="dashboard-columns">
        <section className="matches-section">
          <div className="section-heading">
            <div>
              <h2>Opportunities for you</h2>
              <p>A good fit isn’t a guess. It’s in your skills.</p>
            </div>
            <Button asChild variant="link">
              <Link to="/match">
                View all
                <ArrowRight />
              </Link>
            </Button>
          </div>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="line-tabs">
              <TabsTrigger value="recommended">
                Recommended <span>{matches.length}</span>
              </TabsTrigger>
              <TabsTrigger value="remote">Remote opportunities</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="roles-stack">
            {displayed.slice(0, 3).map((m) => (
              <RoleCard key={m.role.id} role={m.role} match={m} />
            ))}
            {displayed.length === 0 && (
              <div className="empty-state">
                <Sparkles />
                <h3>A fresh start for your matches</h3>
                <p>Add skills to your profile to discover opportunities.</p>
                <Button asChild>
                  <Link to="/match">Update my skills</Link>
                </Button>
              </div>
            )}
          </div>
          <div className="matching-note">
            <ShieldCheck size={16} />
            <span>Matched on skills, languages, experience, and your work preference.</span>
          </div>
        </section>
        <aside className="dashboard-aside">
          <section className="profile-summary">
            <div className="section-heading">
              <h2>Your skills passport</h2>
              <ShieldCheck size={19} className="text-teal" />
            </div>
            <div className="passport-person">
              <span className="avatar avatar-large">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <div>
                <h3>{profile.name}</h3>
                <p>{profile.title}</p>
                <span>{profile.city}</span>
              </div>
            </div>
            <div className="profile-progress-label">
              <span>Profile readiness</span>
              <strong>
                {profile.skills.length > 0 && profile.languages.length > 0
                  ? "Ready to match"
                  : "Add your skills"}
              </strong>
            </div>
            <div className="profile-progress">
              <span
                className={profile.skills.length > 0 && profile.languages.length > 0 ? "ready" : ""}
              />
            </div>
            <div className="passport-checks">
              <span>
                <Check />
                {profile.skills.length} skills added
              </span>
              <span>
                <Check />
                {profile.languages.length} languages
              </span>
              <span>
                <Check />
                {profile.years} years of experience
              </span>
            </div>
            <Button asChild variant="outline" className="w-full">
              <Link to="/profile">
                View my profile
                <ArrowRight />
              </Link>
            </Button>
            <p className="passport-caption">
              <ShieldCheck size={12} />
              Self-reported skills · No certificates needed
            </p>
          </section>
          <section className="community-panel">
            <img
              src={community}
              alt="Professionals sharing ideas around a laptop in a bright workspace"
            />
            <div className="community-copy">
              <span className="eyebrow">GROW, TOGETHER</span>
              <h2>
                You bring the talent.
                <br />
                We help open doors.
              </h2>
              <p>Build your skills and take your next step with confidence.</p>
              <Button asChild variant="link">
                <Link to="/resources">
                  Learning & support
                  <ArrowUpRight />
                </Link>
              </Button>
            </div>
          </section>
          <div className="fair-hiring-note">
            <Network size={21} />
            <div>
              <strong>Fair opportunities. Real potential.</strong>
              <p>Supporting decent work, inclusion, and partnerships.</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
function UserProfileIcon() {
  return <TrendingUp size={16} />;
}
