import { Link } from "@tanstack/react-router";
import {
  Home,
  FileWarning,
  HeartPulse,
  Hospital,
  Wind,
  Mic,
  Settings as Cog,
  ShieldCheck,
} from "lucide-react";
import { useApp } from "@/lib/i18n";

const items = [
  { to: "/home", icon: Home, key: "home" },
  { to: "/report", icon: FileWarning, key: "report" },
  { to: "/first-aid", icon: HeartPulse, key: "firstAid" },
  { to: "/hospitals", icon: Hospital, key: "hospitals" },
  { to: "/aqi", icon: Wind, key: "aqi" },
  { to: "/voice", icon: Mic, key: "voice" },
  { to: "/settings", icon: Cog, key: "settings" },
] as const;

export function SideNav() {
  const { t } = useApp();
  return (
    <aside
      aria-label="Primary"
      className="fixed inset-y-0 start-0 z-40 hidden w-64 flex-col border-e border-border bg-card lg:flex"
    >
      <div className="flex items-center gap-2 px-5 py-5">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <ShieldCheck className="size-6" aria-hidden />
        </span>
        <span className="truncate text-lg font-bold">{t("appName")}</span>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 pb-6">
        <ul className="grid gap-1">
          {items.map(({ to, icon: Icon, key }) => (
            <li key={to}>
              <Link
                to={to}
                className="tap flex items-center gap-3 rounded-xl px-3 py-3 font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                activeProps={{ className: "!bg-primary/10 !text-primary" }}
              >
                <Icon className="size-5 shrink-0" aria-hidden />
                <span className="truncate">{t(key)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
