import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Waves,
  Flame,
  HeartPulse,
  Car,
  CircleEllipsis,
  MapPin,
  Camera,
  Mic,
  Check,
  CheckCircle2,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useApp } from "@/lib/i18n";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Report an Emergency — Aman AI" },
      {
        name: "description",
        content: "Report flood, fire, medical or accident emergencies with location, description and photo evidence.",
      },
      { property: "og:title", content: "Report an Emergency — Aman AI" },
      { property: "og:description", content: "Send a geo-tagged emergency report to nearby responders in seconds." },
    ],
  }),
  component: ReportPage,
});

const CATEGORIES = [
  { id: "flood", icon: Waves },
  { id: "fire", icon: Flame },
  { id: "medical", icon: HeartPulse },
  { id: "accident", icon: Car },
  { id: "other", icon: CircleEllipsis },
] as const;

function ReportPage() {
  const { t } = useApp();
  const [category, setCategory] = useState<string>("flood");
  const [location, setLocation] = useState("Block 6, Gulshan-e-Iqbal, Karachi");
  const [desc, setDesc] = useState("");
  const [recording, setRecording] = useState(false);
  const [photo, setPhoto] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  if (submittedId) {
    return (
      <AppShell title={t("reportSubmitted")} back="/home" maxWidth="max-w-lg md:max-w-2xl lg:max-w-3xl">
        <div className="surface flex flex-col items-center p-6 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-safe text-safe-foreground">
            <CheckCircle2 className="size-9" aria-hidden />
          </span>
          <h2 className="mt-4 text-xl font-bold">{t("reportSubmitted")}</h2>
          <p className="mt-3 text-sm text-muted-foreground">{t("reportId")}</p>
          <p className="text-2xl font-extrabold tracking-wider text-primary">{submittedId}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t("responderNote")}</p>
          <div className="mt-6 grid w-full gap-2">
            <Link
              to="/history"
              className="tap flex items-center justify-center rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground"
            >
              {t("viewHistory")}
            </Link>
            <Link
              to="/home"
              className="tap flex items-center justify-center rounded-lg border border-border px-4 py-3 font-medium"
            >
              {t("backHome")}
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title={t("reportEmergency")} back="/home" maxWidth="max-w-lg md:max-w-2xl lg:max-w-3xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmittedId(`AMN-${Math.floor(80000 + Math.random() * 19999)}`);
        }}
      >
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {t("selectCategory")}
        </h2>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {CATEGORIES.map(({ id, icon: Icon }) => {
            const active = category === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setCategory(id)}
                className={`tap flex flex-col items-center gap-2 rounded-xl border-2 px-2 py-4 text-sm font-semibold ${
                  active ? "border-primary bg-primary/10 text-primary" : "border-border bg-card"
                }`}
              >
                <Icon className="size-6" aria-hidden />
                <span className="text-center leading-tight">{t(id)}</span>
              </button>
            );
          })}
        </div>

        <label className="mt-6 block text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {t("location")}
        </label>
        <div className="surface mt-2 flex items-center gap-2 p-3">
          <MapPin className="size-5 shrink-0 text-primary" aria-hidden />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="tap w-full bg-transparent text-base outline-none"
            aria-label={t("location")}
          />
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{t("autoDetected")}</p>

        <label className="mt-6 block text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {t("description")}
        </label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={4}
          placeholder={t("describePlaceholder")}
          className="surface mt-2 w-full resize-none p-3 text-base outline-none focus:ring-2 focus:ring-ring"
        />

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setRecording((r) => !r)}
            className={`tap flex items-center justify-center gap-2 rounded-lg border-2 px-3 py-3 text-sm font-semibold ${
              recording ? "border-emergency bg-emergency/10 text-emergency" : "border-border bg-card"
            }`}
          >
            <Mic className="size-5" aria-hidden />
            {recording ? t("recording") : t("recordVoice")}
          </button>
          <button
            type="button"
            onClick={() => setPhoto(true)}
            className={`tap flex items-center justify-center gap-2 rounded-lg border-2 px-3 py-3 text-sm font-semibold ${
              photo ? "border-safe bg-safe/10 text-safe" : "border-border bg-card"
            }`}
          >
            {photo ? <Check className="size-5" aria-hidden /> : <Camera className="size-5" aria-hidden />}
            {photo ? t("photoAttached") : t("attachPhoto")}
          </button>
        </div>

        <button
          type="submit"
          className="tap mt-6 w-full rounded-xl bg-emergency px-4 py-4 text-lg font-bold text-emergency-foreground"
        >
          {t("submitReport")}
        </button>
      </form>
    </AppShell>
  );
}
