import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ShieldCheck, Check } from "lucide-react";
import { AmbientBackground } from "@/components/AmbientBackground";
import { LANGS, useApp, type Lang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aman AI — Emergency Assistance in Urdu, English & Sindhi" },
      {
        name: "description",
        content:
          "Aman AI is a multilingual emergency platform: SOS calling, incident reporting, first aid guidance, hospital locator, AQI and disaster alerts.",
      },
      { property: "og:title", content: "Aman AI — Multilingual Emergency Assistance" },
      {
        property: "og:description",
        content: "SOS, first aid, hospitals, air quality and disaster alerts in Urdu, English and Sindhi.",
      },
    ],
  }),
  component: Splash,
});

function Splash() {
  const { lang, setLang, t } = useApp();
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-between px-6 py-10">
      <AmbientBackground />
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="flex size-20 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-lg">
          <ShieldCheck className="size-11" aria-hidden />
        </div>
        <h1 className="mt-5 text-3xl font-extrabold tracking-tight">{t("appName")}</h1>
        <p className="mt-2 max-w-xs text-muted-foreground">{t("tagline")}</p>
      </div>

      <div className="w-full max-w-md">
        <h2 className="mb-3 text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {t("chooseLanguage")}
        </h2>
        <div className="grid gap-3">
          {LANGS.map((l) => {
            const active = l.code === lang;
            return (
              <button
                key={l.code}
                type="button"
                onClick={() => setLang(l.code as Lang)}
                dir={l.rtl ? "rtl" : "ltr"}
                className={`tap flex items-center justify-between rounded-xl border-2 px-4 py-4 text-start transition-colors ${
                  active ? "border-primary bg-primary/10" : "border-border bg-card"
                }`}
              >
                <span
                  className={`text-xl font-semibold ${l.code === "ur" ? "nastaliq" : ""}`}
                >
                  {l.native}
                </span>
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  {l.label}
                  {active && <Check className="size-5 text-primary" aria-hidden />}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => navigate({ to: "/home" })}
          className="tap mt-5 w-full rounded-xl bg-primary px-4 py-4 text-lg font-bold text-primary-foreground"
        >
          {t("continue")}
        </button>
      </div>
    </div>
  );
}
