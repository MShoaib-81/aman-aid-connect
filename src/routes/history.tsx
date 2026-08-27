import { createFileRoute } from "@tanstack/react-router";
import { FileText, MapPin } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useApp } from "@/lib/i18n";
import { INCIDENTS, type IncidentStatus } from "@/lib/mock-data";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "My Reports — Aman AI Incident History" },
      {
        name: "description",
        content: "Track your submitted emergency reports and their status: submitted, in review or resolved.",
      },
      { property: "og:title", content: "My Reports — Aman AI" },
      { property: "og:description", content: "Status tracking for every emergency you reported." },
    ],
  }),
  component: HistoryPage,
});

const badge: Record<IncidentStatus, string> = {
  submitted: "bg-primary/15 text-primary",
  inReview: "bg-caution/20 text-caution-foreground",
  resolved: "bg-safe/15 text-safe",
};

function HistoryPage() {
  const { t, lang } = useApp();
  return (
    <AppShell title={t("myReports")} back="/home">
      <ul className="grid gap-3">
        {INCIDENTS.map((i) => (
          <li key={i.id} className="surface flex items-start gap-3 p-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent">
              <FileText className="size-5 text-primary" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="font-bold">{lang === "en" ? i.category : i.categoryUr}</p>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badge[i.status]}`}>
                  {t(i.status)}
                </span>
              </div>
              <p className="mt-1 flex items-center gap-1 truncate text-sm text-muted-foreground">
                <MapPin className="size-3.5 shrink-0" aria-hidden />
                {i.location}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {i.id} • {i.date}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
