import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { PhoneFrame } from "./PhoneFrame";
import { Home, Compass, BarChart3, QrCode } from "lucide-react";
import { getSession, logout, type SessionState } from "@/lib/session";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function HomeNavControl({ pathname }: { pathname: string }) {
  const navigate = useNavigate();
  const [session, setSession] = useState<SessionState>({ kind: "none" });
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setSession(getSession());
  }, [pathname, dialogOpen]);

  const active = pathname === "/";
  const needsConfirm = session.kind === "guest" || session.kind === "registered";

  const onHomePress = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (needsConfirm) {
      setDialogOpen(true);
      return;
    }
    navigate({ to: "/" });
  };

  const exploreStayConnected = () => {
    setDialogOpen(false);
    navigate({ to: "/" });
  };

  const disconnect = () => {
    logout();
    setDialogOpen(false);
    setSession(getSession());
    navigate({ to: "/welcome" });
  };

  return (
    <>
      <li>
        <button
          type="button"
          onClick={onHomePress}
          className={cn(
            "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl tap-feedback w-full",
            active ? "text-primary" : "text-muted-foreground",
          )}
        >
          <Home className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Home</span>
        </button>
      </li>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent className="rounded-2xl max-w-[min(92vw,380px)]">
          <AlertDialogHeader>
            <AlertDialogTitle>Accueil</AlertDialogTitle>
            <AlertDialogDescription>
              Retourner à l’exploration sans te déconnecter, ou te déconnecter de cet appareil ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
            <Button type="button" className="w-full rounded-xl" onClick={exploreStayConnected}>
              Voir l’accueil exploration
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="w-full rounded-xl"
              onClick={disconnect}
            >
              Me déconnecter
            </Button>
            <AlertDialogCancel className="w-full rounded-xl mt-0">Annuler</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export function AppShell({ children, showNav = true }: { children: ReactNode; showNav?: boolean }) {
  const { pathname } = useLocation();
  const restItems = [
    { to: "/journey", icon: Compass, label: "Journey" },
    { to: "/quiz", icon: QrCode, label: "Quiz" },
    { to: "/dashboard", icon: BarChart3, label: "Results" },
  ] as const;

  return (
    <PhoneFrame>
      <div className="h-9 flex items-center justify-between px-8 pt-3 text-xs font-semibold text-foreground shrink-0">
        <span>9:41</span>
        <span className="flex items-center gap-1">
          <span className="w-4 h-2 border border-foreground rounded-sm relative">
            <span className="absolute inset-0.5 bg-foreground rounded-[1px]" />
          </span>
        </span>
      </div>
      <main className="flex-1 overflow-y-auto overflow-x-hidden">{children}</main>
      {showNav && (
        <nav className="shrink-0 border-t border-border bg-card/80 backdrop-blur-md px-2 py-2 pb-4">
          <ul className="flex justify-around">
            <HomeNavControl pathname={pathname} />
            {restItems.map(({ to, icon: Icon, label }) => {
              const active = pathname === to;
              return (
                <li key={to}>
                  <Link
                    to={to}
                    className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl tap-feedback ${
                      active ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
                    <span className="text-[10px] font-medium">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </PhoneFrame>
  );
}
