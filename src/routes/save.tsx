import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useEffect, useState } from "react";
import { ArrowLeft, Mail, User, ShieldCheck, CheckCircle2, Send } from "lucide-react";
import { getProfile, saveProfile } from "@/lib/profile";

export const Route = createFileRoute("/save")({
  head: () => ({
    meta: [
      { title: "Save your results" },
      { name: "description", content: "Email your personalized fair dashboard." },
    ],
  }),
  component: Save,
});

function Save() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const p = getProfile();
    setIsUser(p.account === "user");
    if (p.email) setEmail(p.email);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isUser && !email.includes("@")) return;
    if (email) saveProfile({ email });
    setSent(true);
  };

  if (isUser && !sent) {
    return (
      <AppShell showNav={false}>
        <div className="flex flex-col h-full px-6 pt-4 pb-8 animate-fade-in">
          <button
            onClick={() => navigate({ to: "/dashboard" })}
            className="tap-feedback w-10 h-10 rounded-full bg-muted flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-primary-soft flex items-center justify-center mb-5">
              <Send className="w-9 h-9 text-primary" />
            </div>
            <h1 className="text-2xl font-bold leading-tight">Send my results to my email</h1>
            <p className="mt-2 text-sm text-muted-foreground max-w-[280px]">
              You're logged in. We'll deliver your personalized dashboard straight to your inbox.
            </p>
          </div>
          <button
            onClick={() => {
              if (!email) saveProfile({ email: "you@school.fr" });
              setSent(true);
            }}
            className="tap-feedback flex items-center justify-center gap-2 w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold shadow-soft"
          >
            <Send className="w-4 h-4" /> Send my dashboard
          </button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell showNav={false}>
      <div className="flex flex-col h-full px-6 pt-4 pb-8 animate-fade-in">
        <button
          onClick={() => navigate({ to: "/dashboard" })}
          className="tap-feedback w-10 h-10 rounded-full bg-muted flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {sent ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-slide-up">
            <div className="w-20 h-20 rounded-full bg-primary-soft flex items-center justify-center mb-5">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Check your inbox!</h1>
            <p className="mt-2 text-sm text-muted-foreground max-w-[280px]">
              Your personalized dashboard is on its way to <span className="font-semibold text-foreground">{email}</span>.
            </p>
            <button
              onClick={() => navigate({ to: "/dashboard" })}
              className="mt-8 tap-feedback h-12 px-6 rounded-2xl bg-primary text-primary-foreground font-semibold"
            >
              Back to dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex-1 flex flex-col">
            <div className="mt-4">
              <h1 className="text-2xl font-bold leading-tight">
                Save your results & receive personalized guidance
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                We'll email your dashboard with school matches and next steps.
              </p>
            </div>

            <div className="mt-7 space-y-4">
              <label className="block">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Email <span className="text-primary">*</span>
                </span>
                <div className="mt-1.5 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full h-13 py-4 pl-11 pr-4 rounded-2xl bg-muted border border-transparent focus:border-primary focus:bg-card outline-none text-sm transition-colors"
                  />
                </div>
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  First name <span className="text-muted-foreground/60 font-normal normal-case">(optional)</span>
                </span>
                <div className="mt-1.5 relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jules"
                    className="w-full py-4 pl-11 pr-4 rounded-2xl bg-muted border border-transparent focus:border-primary focus:bg-card outline-none text-sm transition-colors"
                  />
                </div>
              </label>
            </div>

            <div className="mt-5 flex gap-2 p-3 rounded-xl bg-primary-soft/60">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                We respect your data and will only use it to improve your orientation experience.
              </p>
            </div>

            <div className="flex-1" />

            <button
              type="submit"
              className="tap-feedback flex items-center justify-center w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold shadow-soft"
            >
              Send me my dashboard
            </button>
          </form>
        )}
      </div>
    </AppShell>
  );
}
