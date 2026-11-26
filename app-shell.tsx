import { Link, useLocation } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  Bell,
  Bookmark,
  BriefcaseBusiness,
  ChevronDown,
  CircleHelp,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Network,
  RotateCcw,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useDemo } from "./demo-provider";

const navigation = [
  { to: "/" as const, label: "Overview", icon: LayoutDashboard },
  { to: "/match" as const, label: "My matches", icon: Sparkles },
  { to: "/roles" as const, label: "Explore opportunities", icon: BriefcaseBusiness },
  { to: "/saved" as const, label: "Saved jobs", icon: Bookmark },
  { to: "/applications" as const, label: "My applications", icon: Network },
  { to: "/resources" as const, label: "Learning & support", icon: GraduationCap },
];
export function AppShell({ children }: { children: ReactNode }) {
  const { profile, activity, reset } = useDemo();
  const { pathname } = useLocation();
  const [menu, setMenu] = useState(false);
  const [help, setHelp] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
  const title =
    pathname === "/profile"
      ? "My profile"
      : (navigation.find((n) => n.to === pathname)?.label ?? "Bridgework");
  return (
    <div className="app-layout">
      {menu && <div className="mobile-scrim" onClick={() => setMenu(false)} />}
      <aside className={`sidebar ${menu ? "sidebar-open" : ""}`}>
        <Link to="/" className="brand" onClick={() => setMenu(false)}>
          <span className="brand-mark">
            <Network size={24} strokeWidth={2.3} />
          </span>
          bridgework<span className="brand-dot">.</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="mobile-close"
          onClick={() => setMenu(false)}
          aria-label="Close navigation"
        >
          <X />
        </Button>
        <div className="workspace-label">YOUR NEXT CHAPTER</div>
        <nav className="sidebar-nav" aria-label="Main navigation">
          {navigation.map(({ to, label, icon: Icon }) => (
            <Button
              key={to}
              variant="ghost"
              asChild
              className={`nav-item ${pathname === to ? "nav-active" : ""}`}
            >
              <Link to={to} onClick={() => setMenu(false)}>
                <Icon size={18} />
                {label}
                {to === "/saved" && activity.saved.length > 0 && (
                  <span className="nav-count">{activity.saved.length}</span>
                )}
              </Link>
            </Button>
          ))}
        </nav>
        <div className="sidebar-divider" />
        <Button
          variant="ghost"
          asChild
          className={`nav-item ${pathname === "/profile" ? "nav-active" : ""}`}
        >
          <Link to="/profile" onClick={() => setMenu(false)}>
            <UserRound size={18} />
            My profile
          </Link>
        </Button>
        <Button variant="ghost" className="nav-item" onClick={() => setHelp(true)}>
          <CircleHelp size={18} />
          Help & guidance
        </Button>
        <div className="sidebar-bottom">
          <div className="purpose-block">
            <span className="purpose-icon">
              <Sparkles size={20} />
            </span>
            <strong>Talent beyond borders.</strong>
            <p>
              Your skills. Your potential.
              <br />A world of possibilities.
            </p>
            <span className="sdg-label">
              SDG 8 · 10 · 17 <ArrowUpRight size={13} />
            </span>
          </div>
          <Button variant="ghost" className="reset-button" onClick={() => setResetOpen(true)}>
            <RotateCcw size={14} />
            Reset demo
          </Button>
          <div className="sidebar-footer">© 2026 Bridgework</div>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="menu-button"
              aria-label="Open navigation"
              onClick={() => setMenu(true)}
            >
              <Menu />
            </Button>
            <span className="topbar-title">{title}</span>
          </div>
          <div className="topbar-actions">
            <span className="demo-label">
              <span />
              Demo workspace
            </span>
            <span className="topbar-divider" />
            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
              title="Notifications"
              className="notification-button"
              onClick={() => setNotifications(true)}
            >
              <Bell size={19} />
              <span className="notification-dot" />
            </Button>
            <Button variant="ghost" asChild className="account-button">
              <Link to="/profile">
                <span className="avatar">{initials}</span>
                <span className="account-name">
                  {profile.name}
                  <small>Talent account</small>
                </span>
                <ChevronDown size={14} />
              </Link>
            </Button>
          </div>
        </header>
        {children}
        <footer className="page-footer">
          <span>Built around your skills. Open to your potential.</span>
          <span>
            Skills-first. People-first. <Network size={13} />
          </span>
        </footer>
      </div>
      <Dialog open={help} onOpenChange={setHelp}>
        <DialogContent>
          <DialogTitle>We’re here for your next step</DialogTitle>
          <DialogDescription>
            Bridgework connects refugee professionals to opportunities based on their skills.
          </DialogDescription>
          <div className="space-y-4 text-sm">
            <p>
              <strong>Finding the right role</strong>
              <br />
              Update your skills, languages, and experience in My profile. Your matches include
              transparent scores and the skills you can build next.
            </p>
            <p>
              <strong>Your qualifications matter</strong>
              <br />
              You do not need certificates to build a profile. Regulated professions may require
              local licensing before employment.
            </p>
            <p className="text-muted-foreground">
              This is a demonstration workspace. Employers, salaries, courses, and applications are
              examples, not live opportunities. Changes last while this workspace is open;
              refreshing resets the demo.
            </p>
          </div>
          <Button onClick={() => setHelp(false)}>Got it</Button>
        </DialogContent>
      </Dialog>
      <Dialog open={notifications} onOpenChange={setNotifications}>
        <DialogContent>
          <DialogTitle>Your updates</DialogTitle>
          <DialogDescription>What’s happening in your workspace</DialogDescription>
          <div className="notice-item">
            <Sparkles className="text-teal" />
            <div>
              <strong>Your matches are ready</strong>
              <p>Explore opportunities selected for your skills.</p>
            </div>
          </div>
          {activity.applications.length > 0 && (
            <div className="notice-item">
              <BriefcaseBusiness className="text-primary" />
              <div>
                <strong>
                  {activity.applications.length} application
                  {activity.applications.length === 1 ? "" : "s"} submitted
                </strong>
                <p>Track them in My applications.</p>
              </div>
            </div>
          )}
          <Button asChild onClick={() => setNotifications(false)}>
            <Link to="/match">View my matches</Link>
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog open={resetOpen} onOpenChange={setResetOpen}>
        <DialogContent>
          <DialogTitle>Start a fresh demo?</DialogTitle>
          <DialogDescription>
            This will restore Esther’s profile and clear your saved jobs and applications.
          </DialogDescription>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setResetOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                reset();
                setResetOpen(false);
              }}
            >
              Reset demo
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
