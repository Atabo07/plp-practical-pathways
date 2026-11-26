import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCheck,
  Clock3,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import community from "@/assets/community.png";
const resources = [
  {
    id: "interview",
    category: "career",
    title: "Tell your story with confidence",
    type: "Interview preparation",
    time: "10 minutes",
    icon: BookOpen,
    steps: [
      "Name a specific challenge you faced at work.",
      "Explain what you did, using the skills the role needs.",
      "Share a measurable result and what you learned.",
      "Practice your example aloud, then adapt it to your next interview.",
    ],
  },
  {
    id: "skills",
    category: "learning",
    title: "Build a stronger skills portfolio",
    type: "Skills development",
    time: "15 minutes",
    icon: GraduationCap,
    steps: [
      "Choose a small project that reflects your strongest skill.",
      "Describe the goal, your approach, and your contribution.",
      "Include evidence: a sample, a photo, or a written case study.",
      "Explain the outcome and the skills your project demonstrates.",
    ],
  },
  {
    id: "rights",
    category: "career",
    title: "Prepare for your local work pathway",
    type: "Work readiness",
    time: "8 minutes",
    icon: ShieldCheck,
    steps: [
      "Check work authorization rules with a qualified local advisor.",
      "For regulated professions, ask the relevant professional body about licensing.",
      "Gather any records you have; ask about alternative skills assessments.",
      "Confirm contracts, pay terms, and workplace protections before accepting a role. This is general guidance, not legal advice.",
    ],
  },
];
export function ResourcesPage() {
  const [tab, setTab] = useState("all");
  const [selected, setSelected] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const resource = resources.find((r) => r.id === selected);
  return (
    <main className="page-content">
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            <span />
            KEEP MOVING FORWARD
          </div>
          <h1>Small steps. Stronger futures.</h1>
          <p>A little support for the next big thing.</p>
        </div>
        <span className="count-label">
          <CheckCheck size={16} />
          {completed.length} completed
        </span>
      </div>
      <div className="resources-intro">
        <img src={community} alt="A welcoming group of professionals collaborating" />
        <div>
          <ShieldCheck size={25} className="text-teal" />
          <h2>Your potential doesn’t stop at a match.</h2>
          <p>
            Prepare for interviews, showcase your expertise, and understand your next steps toward
            meaningful work.
          </p>
          <span className="small-label">Free guided activities · At your pace</span>
        </div>
      </div>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="line-tabs">
          <TabsTrigger value="all">All resources</TabsTrigger>
          <TabsTrigger value="learning">Skills development</TabsTrigger>
          <TabsTrigger value="career">Career readiness</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="resource-grid">
        {resources
          .filter((r) => tab === "all" || r.category === tab)
          .map((r) => (
            <article className="resource-card" key={r.id}>
              <span className="stat-icon stat-teal">
                <r.icon size={22} />
              </span>
              <span className="eyebrow">{r.type}</span>
              <h2>{r.title}</h2>
              <p>
                <Clock3 size={14} />
                {r.time} · Guided activity
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelected(r.id);
                  setStep(0);
                }}
              >
                {completed.includes(r.id) ? (
                  <>
                    <Check />
                    Review activity
                  </>
                ) : (
                  <>
                    Start activity
                    <ArrowRight />
                  </>
                )}
              </Button>
            </article>
          ))}
      </div>
      <div className="matching-note">
        <ShieldCheck size={16} />
        Guidance is illustrative and not a qualification, legal service, or accredited course.
      </div>
      <Dialog
        open={selected !== null}
        onOpenChange={(v) => {
          if (!v) setSelected(null);
        }}
      >
        <DialogContent>
          <DialogTitle>{resource?.title}</DialogTitle>
          <DialogDescription>
            {step >= (resource?.steps.length ?? 0)
              ? "Activity completed"
              : `Step ${step + 1} of ${resource?.steps.length ?? 0}`}
          </DialogDescription>
          {resource &&
            (step < resource.steps.length ? (
              <>
                <div className="lesson-step">
                  <span>{String(step + 1).padStart(2, "0")}</span>
                  <p>{resource.steps[step]}</p>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}>
                    Back
                  </Button>
                  <Button
                    onClick={() => {
                      const next = step + 1;
                      setStep(next);
                      if (next === resource.steps.length && !completed.includes(resource.id))
                        setCompleted([...completed, resource.id]);
                    }}
                  >
                    {step === resource.steps.length - 1 ? "Complete activity" : "Next step"}
                    <ArrowRight />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="success-symbol">
                  <CheckCheck size={32} />
                </div>
                <h3 className="text-xl font-semibold">Another step forward.</h3>
                <p className="text-sm text-muted-foreground">
                  You’ve completed this guided activity. Put these ideas into practice as you
                  prepare for your next opportunity.
                </p>
                <Button onClick={() => setSelected(null)}>Done</Button>
              </>
            ))}
        </DialogContent>
      </Dialog>
    </main>
  );
}
