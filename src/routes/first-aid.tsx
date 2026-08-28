import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Search,
  Droplet,
  Flame,
  Heart,
  Wind,
  Bone,
  Waves,
  Volume2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useApp } from "@/lib/i18n";
import { FIRST_AID, type FirstAidTopic } from "@/lib/mock-data";

export const Route = createFileRoute("/first-aid")({
  head: () => ({
    meta: [
      { title: "First Aid Guidance — Aman AI" },
      {
        name: "description",
        content: "Step-by-step first aid for bleeding, burns, CPR, choking, fractures and drowning, with voice guidance.",
      },
      { property: "og:title", content: "First Aid Guidance — Aman AI" },
      { property: "og:description", content: "Clear numbered first aid steps you can follow under stress." },
    ],
  }),
  component: FirstAidPage,
});

const ICONS: Record<string, typeof Droplet> = {
  droplet: Droplet,
  flame: Flame,
  heart: Heart,
  wind: Wind,
  bone: Bone,
  waves: Waves,
};

const FILTERS = ["all", "trauma", "cardiac", "airway"] as const;

function FirstAidPage() {
  const { t, lang, rtl } = useApp();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const [open, setOpen] = useState<FirstAidTopic | null>(null);
  const [playing, setPlaying] = useState(false);
  const Chevron = rtl ? ChevronLeft : ChevronRight;

  const list = useMemo(
    () =>
      FIRST_AID.filter(
        (f) =>
          (filter === "all" || f.category === filter) &&
          (f.title.toLowerCase().includes(query.toLowerCase()) ||
            f.titleUr.includes(query)),
      ),
    [query, filter],
  );

  if (open) {
    const Icon = ICONS[open.icon] ?? Heart;
    const steps = lang === "en" ? open.steps : open.stepsUr;
    return (
      <AppShell title={lang === "en" ? open.title : open.titleUr} back="/first-aid" showSettings={false}>
        <button
          type="button"
          onClick={() => setOpen(null)}
          className="tap mb-3 text-sm font-semibold text-primary"
        >
          ← {t("firstAid")}
        </button>
        <div className="surface flex items-center gap-3 p-4">
          <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="size-6" aria-hidden />
          </span>
          <h2 className="text-lg font-bold">{lang === "en" ? open.title : open.titleUr}</h2>
        </div>

        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="tap mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground"
        >
          <Volume2 className="size-5" aria-hidden />
          {playing ? t("playingVoiceGuide") : t("playVoiceGuide")}
        </button>

        <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {t("steps")}
        </h3>
        <ol className="mt-3 grid gap-3">
          {steps.map((s, i) => (
            <li key={i} className="surface flex gap-3 p-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                {i + 1}
              </span>
              <p className="leading-relaxed">{s}</p>
            </li>
          ))}
        </ol>
      </AppShell>
    );
  }

  return (
    <AppShell title={t("firstAid")} back="/home">
      <div className="surface flex items-center gap-2 p-3">
        <Search className="size-5 text-muted-foreground" aria-hidden />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchScenarios")}
          className="tap w-full bg-transparent text-base outline-none"
          aria-label={t("searchScenarios")}
        />
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`tap shrink-0 rounded-full border px-4 py-2 text-sm font-semibold capitalize ${
              filter === f ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="mt-4 grid gap-3">
        {list.map((f) => {
          const Icon = ICONS[f.icon] ?? Heart;
          return (
            <li key={f.id}>
              <button
                type="button"
                onClick={() => setOpen(f)}
                className="surface flex w-full items-center gap-3 p-4 text-start"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-6" aria-hidden />
                </span>
                <span className="flex-1 font-semibold">{lang === "en" ? f.title : f.titleUr}</span>
                <Chevron className="size-5 text-muted-foreground" aria-hidden />
              </button>
            </li>
          );
        })}
        {list.length === 0 && (
          <li className="py-10 text-center text-muted-foreground">{t("noResults")}</li>
        )}
      </ul>
    </AppShell>
  );
}
