import { ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { PhoneFrame } from "./PhoneFrame";
import { Home, Compass, BarChart3, QrCode } from "lucide-react";

export function AppShell({ children, showNav = true }: { children: ReactNode; showNav?: boolean }) {
  const { pathname } = useLocation();
  const items = [
    { to: "/", icon: Home, label: "Home" },
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
            {items.map(({ to, icon: Icon, label }) => {
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
