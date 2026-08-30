import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Map as MapIcon, List, Phone, Navigation, Clock, MapPin } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useApp } from "@/lib/i18n";
import { HOSPITALS } from "@/lib/mock-data";

export const Route = createFileRoute("/hospitals")({
  head: () => ({
    meta: [
      { title: "Hospital Locator — Aman AI" },
      {
        name: "description",
        content: "Find nearby hospitals with distance, specialty tags, one-tap calling and directions.",
      },
      { property: "og:title", content: "Hospital Locator — Aman AI" },
      { property: "og:description", content: "Nearest emergency-capable hospitals, mapped and listed." },
    ],
  }),
  component: HospitalsPage,
});

function HospitalsPage() {
  const { t, lang } = useApp();
  const [view, setView] = useState<"map" | "list">("list");
  const [selected, setSelected] = useState(HOSPITALS[0]!.id);
  const active = HOSPITALS.find((h) => h.id === selected)!;

  return (
    <AppShell title={t("hospitals")} back="/home">
      <div className="flex gap-2 rounded-xl bg-muted p-1 lg:hidden">
        {(["map", "list"] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={`tap flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${
              view === v ? "bg-card shadow-sm" : "text-muted-foreground"
            }`}
          >
            {v === "map" ? <MapIcon className="size-4" aria-hidden /> : <List className="size-4" aria-hidden />}
            {v === "map" ? t("mapView") : t("listView")}
          </button>
        ))}
      </div>

      <div className="lg:grid lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-6">
        <div className={`mt-4 lg:sticky lg:top-28 ${view === "map" ? "" : "hidden lg:block"}`}>
          <div className="relative h-72 overflow-hidden rounded-xl border border-border bg-muted lg:h-[32rem]">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <span className="absolute left-1/2 top-1/2 flex size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-4 ring-primary/30" />
            {HOSPITALS.map((h) => (
              <button
                key={h.id}
                type="button"
                onClick={() => setSelected(h.id)}
                aria-label={h.name}
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
                className={`tap absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-1 ${
                  selected === h.id ? "text-emergency" : "text-primary"
                }`}
              >
                <MapPin className="size-7 drop-shadow" aria-hidden />
              </button>
            ))}
          </div>
          <div className="lg:hidden">
            <HospitalCard hospital={active} lang={lang} t={t} />
          </div>
        </div>

        <ul
          className={`mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-1 ${
            view === "list" ? "" : "hidden lg:grid"
          }`}
        >
          {HOSPITALS.map((h) => (
            <li key={h.id}>
              <HospitalCard hospital={h} lang={lang} t={t} />
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  );
}

function HospitalCard({
  hospital: h,
  lang,
  t,
}: {
  hospital: (typeof HOSPITALS)[number];
  lang: string;
  t: (k: string) => string;
}) {
  const tags = lang === "en" ? h.tags : h.tagsUr;
  return (
    <div className="surface mt-3 p-4">
      <h2 className="font-bold leading-snug">{lang === "en" ? h.name : h.nameUr}</h2>
      <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="size-3.5" aria-hidden />
          {h.area} • {h.distanceKm} {t("km")}
        </span>
        {h.open24 && (
          <span className="flex items-center gap-1 text-safe">
            <Clock className="size-3.5" aria-hidden />
            {t("open24")}
          </span>
        )}
      </p>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <li key={tag} className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
            {tag}
          </li>
        ))}
      </ul>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <a
          href={`tel:${h.phone.replace(/\s/g, "")}`}
          className="tap flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-3 text-sm font-semibold text-primary-foreground"
        >
          <Phone className="size-4" aria-hidden />
          {t("call")}
        </a>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(h.name)}`}
          target="_blank"
          rel="noreferrer"
          className="tap flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-3 text-sm font-semibold"
        >
          <Navigation className="size-4" aria-hidden />
          {t("directions")}
        </a>
      </div>
    </div>
  );
}
