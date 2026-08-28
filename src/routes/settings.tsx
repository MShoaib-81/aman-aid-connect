import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Phone, Plus, Moon, Type } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { LANGS, useApp, type Lang } from "@/lib/i18n";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Aman AI" },
      {
        name: "description",
        content: "Switch between Urdu, English and Sindhi, manage emergency contacts, notifications and text size.",
      },
      { property: "og:title", content: "Settings — Aman AI" },
      { property: "og:description", content: "Language, contacts, alerts and accessibility preferences." },
    ],
  }),
  component: SettingsPage,
});

const CONTACTS = [
  { name: "Rescue 1122", phone: "1122" },
  { name: "Edhi Ambulance", phone: "115" },
  { name: "Ayesha (sister)", phone: "+92 300 2214477" },
];

function SettingsPage() {
  const { t, lang, setLang, dark, setDark, fontScale, setFontScale } = useApp();
  const [toggles, setToggles] = useState({ alerts: true, aqi: true, nearby: false });

  return (
    <AppShell title={t("settings")} back="/home" showSettings={false}>
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {t("language")}
        </h2>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => setLang(l.code as Lang)}
              className={`tap rounded-xl border-2 px-2 py-3 text-base font-semibold ${
                lang === l.code ? "border-primary bg-primary/10 text-primary" : "border-border bg-card"
              }`}
            >
              {l.native}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-7">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {t("emergencyContacts")}
        </h2>
        <ul className="mt-3 grid gap-2">
          {CONTACTS.map((c) => (
            <li key={c.phone} className="surface flex items-center gap-3 p-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Phone className="size-5" aria-hidden />
              </span>
              <span className="flex-1">
                <span className="block font-semibold">{c.name}</span>
                <span className="block text-sm text-muted-foreground" dir="ltr">
                  {c.phone}
                </span>
              </span>
              <a
                href={`tel:${c.phone.replace(/\s/g, "")}`}
                className="tap flex items-center rounded-lg bg-primary px-4 font-semibold text-primary-foreground"
              >
                {t("call")}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="tap mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-3 font-semibold text-muted-foreground"
        >
          <Plus className="size-5" aria-hidden />
          {t("addContact")}
        </button>
      </section>

      <section className="mt-7">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {t("notifications")}
        </h2>
        <ul className="surface mt-3 divide-y divide-border">
          {(
            [
              ["alerts", t("alertNotifications")],
              ["aqi", t("aqiNotifications")],
              ["nearby", t("nearbyIncidents")],
            ] as const
          ).map(([key, label]) => (
            <li key={key} className="flex items-center justify-between gap-3 p-4">
              <span className="font-medium">{label}</span>
              <button
                type="button"
                role="switch"
                aria-checked={toggles[key]}
                aria-label={label}
                onClick={() => setToggles((s) => ({ ...s, [key]: !s[key] }))}
                className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
                  toggles[key] ? "bg-primary" : "bg-muted-foreground/40"
                }`}
              >
                <span
                  className={`absolute top-1 size-5 rounded-full bg-card transition-all ${
                    toggles[key] ? "start-6" : "start-1"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-7">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          <Type className="size-4" aria-hidden />
          {t("textSize")}
        </h2>
        <div className="surface mt-3 p-4">
          <input
            type="range"
            min={15}
            max={22}
            step={1}
            value={fontScale}
            onChange={(e) => setFontScale(Number(e.target.value))}
            aria-label={t("textSize")}
            className="w-full accent-[var(--primary)]"
          />
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>{t("small")}</span>
            <span>{fontScale}px</span>
            <span>{t("large")}</span>
          </div>
        </div>
      </section>

      <section className="mt-7">
        <div className="surface flex items-center justify-between p-4">
          <span className="flex items-center gap-2 font-medium">
            <Moon className="size-5" aria-hidden />
            {t("darkMode")}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={dark}
            aria-label={t("darkMode")}
            onClick={() => setDark(!dark)}
            className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
              dark ? "bg-primary" : "bg-muted-foreground/40"
            }`}
          >
            <span
              className={`absolute top-1 size-5 rounded-full bg-card transition-all ${
                dark ? "start-6" : "start-1"
              }`}
            />
          </button>
        </div>
      </section>
    </AppShell>
  );
}
