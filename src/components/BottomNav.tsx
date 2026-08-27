import { Link } from "@tanstack/react-router";
import { Home, FileWarning, HeartPulse, Hospital, Wind, Mic } from "lucide-react";
import { useApp } from "@/lib/i18n";

const items = [
  { to: "/home", icon: Home, key: "home" },
  { to: "/report", icon: FileWarning, key: "report" },
  { to: "/first-aid", icon: HeartPulse, key: "firstAid" },
  { to: "/hospitals", icon: Hospital, key: "hospitals" },
  { to: "/aqi", icon: Wind, key: "aqi" },
  { to: "/voice", icon: Mic, key: "voice" },
] as const;

export function BottomNav() {
  const { t } = useApp();
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-between px-1 pb-[env(safe-area-inset-bottom)]">
        {items.map(({ to, icon: Icon, key }) => (
          <li key={to} className="flex-1">
            <Link
              to={to}
              className="tap flex flex-col items-center justify-center gap-1 px-1 py-2 text-[0.65rem] font-medium text-muted-foreground transition-colors"
              activeProps={{ className: "!text-primary" }}
            >
              <Icon className="size-6" aria-hidden />
              <span className="truncate">{t(key)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
