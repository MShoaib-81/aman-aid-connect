import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MapPin,
  HeartPulse,
  Hospital,
  Mic,
  MessagesSquare,
  History,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useApp } from "@/lib/i18n";
import { ALERTS, AQI_BY_CITY, aqiBand } from "@/lib/mock-data";
import { BAND_BG } from "@/lib/tokens";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Home — Aman AI Emergency Dashboard" },
      {
        name: "description",
        content: "SOS calling, live air quality, active flood and weather alerts, and quick access to first aid.",
      },
      { property: "og:title", content: "Aman AI Emergency Dashboard" },
      {
        property: "og:description",
        content: "Live air quality, active alerts and one-tap emergency help.",
      },
    ],
  }),
  component: HomePage,
});

const tiles = [
  { to: "/first-aid", icon: HeartPulse, key: "firstAid" },
  { to: "/hospitals", icon: Hospital, key: "hospitals" },
  { to: "/voice", icon: Mic, key: "voice" },
  { to: "/triage", icon: MessagesSquare, key: "aiTriage" },
  { to: "/history", icon: History, key: "incidentHistory" },
  { to: "/alerts", icon: AlertTriangle, key: "alerts" },
] as const;

function HomePage() {
  const { t, lang, rtl } = useApp();
  const aqi = AQI_BY_CITY["Karachi"] ?? 150;
  const band = aqiBand(aqi);
  const alert = ALERTS[0]!;
  const Chevron = rtl ? ChevronLeft : ChevronRight;

  return (
    <AppShell title={t("appName")}>
      <p className="flex items-center gap-1 text-sm text-muted-foreground">
        <MapPin className="size-4" aria-hidden />
        {t("currentLocation")}: Gulshan-e-Iqbal, Karachi
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link
          to="/report"
          className="flex w-full flex-col items-center justify-center gap-1 rounded-2xl bg-emergency px-6 py-8 text-emergency-foreground shadow-lg transition-transform active:scale-[0.99]"
        >
          <span className="text-4xl font-extrabold tracking-wider lg:text-5xl">{t("sos")}</span>
          <span className="text-sm opacity-90">{t("reportEmergency")}</span>
        </Link>

        <Link
          to="/alerts"
          className={`flex items-start gap-3 rounded-xl border-s-4 p-4 lg:col-span-2 lg:p-6 ${
            alert.severity === "critical"
              ? "border-s-emergency bg-emergency/10"
              : "border-s-caution bg-caution/10"
          }`}
        >
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-emergency" aria-hidden />
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-bold uppercase tracking-wide text-emergency">
              {t("activeAlert")} • {t(alert.severity)}
            </span>
            <span className="mt-1 block font-semibold">
              {lang === "en" ? alert.title : alert.titleUr}
            </span>
            <span dir="ltr" className="mt-1 block text-sm text-muted-foreground rtl:text-end">
              {alert.time}
            </span>
          </span>
          <Chevron className="mt-1 size-5 shrink-0 text-muted-foreground" aria-hidden />
        </Link>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link to="/aqi" className="surface flex items-center gap-4 p-4 lg:flex-col lg:items-start lg:p-6">
          <span
            className={`flex size-20 shrink-0 flex-col items-center justify-center rounded-full ${BAND_BG[band.token]}`}
          >
            <span className="text-2xl font-extrabold">{aqi}</span>
            <span className="text-[0.6rem] font-semibold uppercase">AQI</span>
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-muted-foreground">{t("liveAqi")}</span>
            <span className="mt-0.5 block font-bold">
              {lang === "en" ? band.label : band.labelUr}
            </span>
            <span className="mt-1 block text-sm text-muted-foreground">
              {lang === "en" ? band.advice : band.adviceUr}
            </span>
          </span>
        </Link>

        <section className="lg:col-span-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {t("quickAccess")}
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
            {tiles.map(({ to, icon: Icon, key }) => (
              <Link
                key={to}
                to={to}
                className="surface flex min-h-24 flex-col justify-between p-4 transition-colors hover:bg-accent active:bg-accent"
              >
                <Icon className="size-7 text-primary" aria-hidden />
                <span className="mt-2 font-semibold leading-snug">{t(key)}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
