import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Clock, MapPin } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useApp } from "@/lib/i18n";
import { ALERTS, type Severity } from "@/lib/mock-data";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Weather & Disaster Alerts — Aman AI" },
      {
        name: "description",
        content: "Live flood, storm and heat alerts with watch, warning and critical severity badges.",
      },
      { property: "og:title", content: "Weather & Disaster Alerts — Aman AI" },
      { property: "og:description", content: "Active flood, storm and heat advisories near you." },
    ],
  }),
  component: AlertsPage,
});

const badge: Record<Severity, string> = {
  watch: "bg-safe/15 text-safe border-safe/40",
  warning: "bg-caution/20 text-caution-foreground border-caution",
  critical: "bg-emergency text-emergency-foreground border-emergency",
};

function AlertsPage() {
  const { t, lang } = useApp();
  return (
    <AppShell title={t("weatherAlerts")} back="/home">
      <ul className="grid gap-3">
        {ALERTS.map((a) => (
          <li key={a.id} className="surface p-4">
            <div className="flex items-center justify-between gap-2">
              <span
                className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${badge[a.severity]}`}
              >
                {t(a.severity)}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="size-3.5" aria-hidden />
                <span dir="ltr">{a.time}</span>
              </span>
            </div>
            <h2 className="mt-3 flex items-start gap-2 font-bold">
              <AlertTriangle className="mt-1 size-4 shrink-0 text-caution" aria-hidden />
              {lang === "en" ? a.title : a.titleUr}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {lang === "en" ? a.body : a.bodyUr}
            </p>
            <p className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3.5" aria-hidden />
              {a.area}
            </p>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
